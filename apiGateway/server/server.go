package server

import (
	"context"

	"github.com/uchennaemeruche/grpc-microservice/protos/user"
)

type Server struct {
	userSrvClient user.UserServiceClient
}

func New(userServiceClient user.UserServiceClient) *Server {
	s := &Server{
		userSrvClient: userServiceClient,
	}
	return s
}

// SignupUser
func (s *Server) SignupUser(ctx context.Context, in *user.SignupReq) (*user.UserResponse, error) {
	return &s.userSrvClient.Signup(ctx, in)
}

// LoginUser redictest to user service login method
func (s *Server) LoginUser(ctx context.Context, in *user.LoginReq) (*user.UserResponse, error) {
	return &s.userSrvClient.Login(ctx, in)
}
