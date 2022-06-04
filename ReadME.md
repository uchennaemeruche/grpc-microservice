<!-- compiling protobuf files in the protos/user directory -->

# protoc --go_out=. --go_opt=module=github.com/uchennaemeruche/grpc-microservice ./protos/user/\*.proto

protoc --go_out=. --go-grpc_out=. --go_opt=module=github.com/uchennaemeruche/grpc-microservice --go-grpc_opt=module=github.com/uchennaemeruche/grpc-microservice ./protos/user/\*.proto
