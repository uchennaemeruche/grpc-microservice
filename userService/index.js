require("dotenv").config();

const grpc = require("@grpc/grpc-js");
const services = require("./proto/user_grpc_pb");

const UserServiceImp = require("./serviceImp");
const connectDB = require("./utils/db");

async function main() {
  const db = await connectDB();
  const userServiceImp = new UserServiceImp(db, grpc);

  let server = new grpc.Server();
  server.addService(services.UserServiceService, {
    signup: userServiceImp.signup,
    login: userServiceImp.login,
    verifyUser: userServiceImp.verifyUser,
    getUser: userServiceImp.getUser,
  });

  server.bindAsync(
    `${process.env.HOST}:${process.env.PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log(
        `Server is running at: ${process.env.HOST}:${process.env.PORT}`
      );
    }
  );
}

main();
