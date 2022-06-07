package cmd

import (
	"log"
	"net"
	"os"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"github.com/joho/godotenv"
	"github.com/spf13/cobra"
	"github.com/uchennaemeruche/grpc-microservice/apiGateway/interceptor"
	"github.com/uchennaemeruche/grpc-microservice/apiGateway/server"
	pb "github.com/uchennaemeruche/grpc-microservice/protos/api"
	"github.com/uchennaemeruche/grpc-microservice/protos/user"
	"google.golang.org/grpc"
)

var srvCmd = &cobra.Command{
	Use:   "serve",
	Short: "server serves the api server",
	RunE:  serve,
}

func init() {

}

func serve(cmd *cobra.Command, args []string) error {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := ":" + os.Getenv("PORT")
	listener, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	userAddr := os.Getenv("USER_ADDR")
	log.Println("Connecting to user service on: " + userAddr)
	userConn, err := grpc.Dial(userAddr, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("Could not connect to user service: %v", err)
	}
	defer userConn.Close()
	userSrvClient := user.NewUserServiceClient(userConn)

	unaryInterceptors := []grpc.UnaryServerInterceptor{
		interceptor.UnaryAuthenticate(userSrvClient),
	}

	s := grpc.NewServer(grpc.UnaryInterceptor(grpc_middleware.ChainUnaryServer(unaryInterceptors...)))

	pb.RegisterAPIServer(s, server.New(userSrvClient))

	log.Println("Starting gRPC server at: " + port)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
	return nil

}
