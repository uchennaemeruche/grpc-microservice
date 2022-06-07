package interceptor

import (
	"context"
	"strings"
	"time"

	"github.com/uchennaemeruche/grpc-microservice/protos/user"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

const (
	KeyUserID = "user_id"
)

func needAuthenticate(url string) bool {
	safeUrls := []string{
		"/api.API/LoginUser",
		"/api.API/SignupUser",
	}

	for _, u := range safeUrls {
		if strings.HasPrefix(url, u) {
			return false
		}
	}
	return true
}

func UnaryAuthenticate(userClient user.UserServiceClient) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
		start := time.Now()
		if needAuthenticate(info.FullMethod) {
			userID, err := authenticate(ctx, userClient)
			if err != nil {
				return nil, err
			}
			ctx = context.WithValue(ctx, KeyUserID, userID)
		}
		h, err := handler(ctx, req)
		grpclog.Infof("Request - Method:%s\tDuration:%s\tError:%v\n", info.FullMethod, time.Since(start), err)
		return h, err
	}
}

func authenticate(ctx context.Context, userClient user.UserServiceClient) (string, error) {
	token, err := getAuthFromContext(ctx)
	if err != nil {
		return "", err
	}

	req := user.VerifyReq{Token: token}
	response, err := userClient.VerifyUser(ctx, &req)
	if err != nil {
		return "", status.Errorf(codes.Unauthenticated, err.Error())
	}

	return response.Id, nil
}

func getAuthFromContext(ctx context.Context) (string, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", status.Errorf(codes.InvalidArgument, "Error retrieving metadata")
	}
	authHeader, ok := md["authorization"]
	if !ok {
		return "", status.Errorf(codes.Unauthenticated, "No authorization token supplied")
	}

	bearerToken := strings.Split(authHeader[0], " ")
	return bearerToken[0], nil
}

func GetUserID(ctx context.Context) (string, error) {
	email := ctx.Value(KeyUserID)
	if email == nil {
		return "", status.Errorf(codes.NotFound, "USER ID is not supplied")
	}
	return email.(string), nil
}
