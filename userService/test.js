require("dotenv").config();
const messages = require("./proto/user_pb");
const services = require("./proto/user_grpc_pb");
const grpc = require("@grpc/grpc-js");

const client = new services.UserServiceClient(
  `${process.env.HOST}:${process.env.PORT}`,
  grpc.credentials.createInsecure()
);

const signupTest = () => {
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
};

const loginTest = () => {
  let loginReq = new messages.LoginReq();
  loginReq.setEmail("uche@gmail.com");
  loginReq.setPassword("uche");

  client.login(loginReq, function (err, userResponse) {
    if (err) throw err;
    console.log("Usr Response:", userResponse);
  });
};

const verifyTest = () => {
  let verifyReq = new messages.VerifyReq();
  verifyReq.setToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk5OGViNWQ3ZDlkYWJjMGZhMWFjOTUiLCJuYW1lIjoiVWNoZW5uYSBFIiwiZW1haWwiOiJ1Y2hlQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFM4a3c2b2JhU3lDQ1NyeWNYNW45TmVBVEVrNDJ6eHphdElCaHh5WWJkc2tYdi5VLlJwZkhLIiwiaWF0IjoxNjU0MjM4MTE3LCJleHAiOjE2NTc4MzgxMTd9.h-eUId5Phg20wr4o6PiiD4vL4bp5JCWCowbQOAiW3Lk"
  );
  client.verifyUser(verifyReq, function (err, verifyResponse) {
    if (err) throw err;
    console.log("Verify Response:", verifyResponse);
  });
};

const getUserTest = () => {
  getUserReq = new messages.GetUserReq();
  getUserReq.setUserId("62998eb5d7d9dabc0fa1ac95");
  client.getUser(getUserReq, function (err, userResponse) {
    if (err) throw err;
    console.log("Get User Response:", userResponse);
  });
};

// signupTest();
// loginTest();
// verifyTest();
getUserTest();
