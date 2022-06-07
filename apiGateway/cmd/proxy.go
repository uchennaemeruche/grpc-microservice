package cmd

import (
	"context"
	"flag"
	"log"
	"net/http"
	"os"

	gw "github.com/uchennaemeruche/grpc-microservice/protos/api"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/joho/godotenv"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
)

var proxyCmd = &cobra.Command{
	Use:   "proxy",
	Short: "proxy to test the api server",
	RunE:  proxy,
}

func proxy(cmd *cobra.Command, args []string) error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Could not load .env file")
	}

	// Register gRPC server endpoint here
	// Be sure the gRPC server is up and running and accessible
	mux := http.NewServeMux()
	g, err := newGateway(ctx)
	if err != nil {
		return err
	}
	mux.Handle("/", g)

	// Handle swagger UI Here
	// mux.HandleFunc("swagger")

	proxyPort := ":" + os.Getenv("PROXY_PORT")
	log.Println("Starting proxy server at: " + proxyPort)
	return http.ListenAndServe(proxyPort, mux)
}

func newGateway(ctx context.Context) (http.Handler, error) {
	grpcServerAddr := os.Getenv("HOST") + ":" + os.Getenv("PORT")
	grpcServerEndpoint := flag.String("grpc-server-endpoint", grpcServerAddr, "gRPC server endpoint")
	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}
	err := gw.RegisterAPIHandlerFromEndpoint(ctx, mux, *grpcServerEndpoint, opts)
	if err != nil {
		return nil, err
	}
	return mux, nil
}
