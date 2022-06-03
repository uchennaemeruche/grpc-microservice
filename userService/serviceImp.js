const bcrypt = require("bcrypt");
const auth = require("./auth");
const messages = require("./proto/user_pb");

module.exports = class UserServiceImp {
  constructor(db, grpc) {
    this.db = db;
    this.grpc = grpc;
  }

  signup = (_, callback) => {
    const users = this.db.collection("users");
    bcrypt.hash(_.request.getPassword(), 10, (err, hash) => {
      let user = {
        name: _.request.getName(),
        email: _.request.getEmail(),
        password: hash,
      };
      // gender: _.request.getGender(),
      users.insertOne(user).then((r) => {
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
    const users = this.db.collection("users");
    const user = await users.findOne({ email: _.request.getEmail() });
    if (!user)
      return callback({
        code: this.grpc.status.UNAUTHORIZED,
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
};
