require("dotenv").config();

const grpc = require("@grpc/grpc-js");
const services = require("./proto/user_grpc_pb");

const API = require("./api");
const connectDB = require("./utils/db");

let api = null;

async function main() {
  const db = await connectDB();
  api = new API(db, grpc);

  let server = new grpc.Server();
  server.addService(services.UserServiceService, {
    signup: api.signup,
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
