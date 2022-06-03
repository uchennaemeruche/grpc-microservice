const bcrypt = require("bcrypt");
const auth = require("./auth");
const messages = require("./proto/user_pb");
const ObjectId = require("mongodb").ObjectId;

module.exports = class UserServiceImp {
  constructor(db, grpc) {
    this.db = db;
    this.grpc = grpc;
  }

  signup = (_, callback) => {
    const userCollection = this.db.collection("users");
    bcrypt.hash(_.request.getPassword(), 10, (err, hash) => {
      let user = {
        name: _.request.getName(),
        email: _.request.getEmail(),
        password: hash,
      };
      // gender: _.request.getGender(),
      userCollection.insertOne(user).then((r) => {
        let response = new messages.UserResponse();
        response.setId(user._id.toString());
        response.setName(user.name);
        response.setEmail(user.email);
        // response.setGender(user.gender);
        response.setToken(auth.generateToken(user));
        callback(null, response);
      });
    });
  };

  login = async (_, callback) => {
    const userCollection = this.db.collection("users");
    const user = await userCollection.findOne({ email: _.request.getEmail() });
    if (!user)
      return callback({
        code: this.grpc.status.UNAUTHENTICATED,
        message: "No user found with this email/password combination",
      });

    bcrypt.compare(_.request.getPassword(), user.password, (err, _) => {
      if (err) throw err;

      let response = new messages.UserResponse();
      response.setId(user._id.toString());
      response.setName(user.name);
      response.setEmail(user.email);
      response.setToken(auth.generateToken(user));
      callback(null, response);
    });
  };

  verifyUser = (_, callback) => {
    auth.verify(_.request.getToken(), async (user) => {
      const userCollection = this.db.collection("users");

      if (!user)
        return callback({
          code: this.grpc.status.UNAUTHENTICATED,
          message: "Invalid authentication token",
        });
      const verifiedUser = await userCollection.findOne({ email: user.email });
      if (!verifiedUser)
        return callback({
          code: this.grpc.status.UNAUTHENTICATED,
          message: "No user found/invalid token",
        });
      let response = new messages.VerifyResponse();
      response.setId(verifiedUser._id.toString());
      response.setName(verifiedUser.name);
      response.setEmail(verifiedUser.email);
      callback(null, response);
    });
  };

  getUser = async (_, callback) => {
    const userCollection = this.db.collection("users");

    let userId = ObjectId(_.request.getUserId());
    const user = await userCollection.findOne({ _id: userId });
    if (!user)
      return callback({
        code: this.grpc.status.NOTFOUND,
        message: "No user found with the given ID",
      });

    let response = new messages.VerifyResponse();
    response.setId(user._id.toString());
    response.setName(user.name);
    response.setEmail(user.email);
    callback(null, response);
  };
};
