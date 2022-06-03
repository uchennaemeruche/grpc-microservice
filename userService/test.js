require("dotenv").config();
const messages = require("./proto/user_pb");
const services = require("./proto/user_grpc_pb");
const grpc = require("@grpc/grpc-js");

function main() {
  const client = new services.UserServiceClient(
    `${process.env.HOST}:${process.env.PORT}`,
    grpc.credentials.createInsecure()
  );

  let signupReq = new messages.SignupReq();
  signupReq.setName("Uchenna E");
  signupReq.setEmail("uche@gmail.com");
  signupReq.setPassword("uche");
  client.signup(signupReq, function (err, response) {
    if (err) {
      console.log("Signup Err:", err);
      throw err;
    }
    console.log("Signup Response", response);
  });
}

main();
