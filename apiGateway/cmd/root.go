package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "apiGateway",
	Short: "apiGateway is a gRPC serer to serve my grpc-microservice project",
}

func init() {
	rootCmd.AddCommand(srvCmd)
	rootCmd.AddCommand(proxyCmd)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
