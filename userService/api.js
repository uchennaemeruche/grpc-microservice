const bcrypt = require("bcrypt");

module.exports = class API {
  constructor(db, grpc) {
    this.db = db;
    this.grpc = grpc;
  }

  signup = (call, callback) => {
    const users = this.db.collection("users");

    bcrypt.hash(call.request.getPassword(), 10, (err, hash) => {
      let user = {
        name: call.request.getName(),
        email: call.request.getEmail(),
        gender: call.request.getGender(),
        password: hash,
      };
      users.insertOne(user).then((r) => {
        let resp = new messages.UserResponse();
        resp.setId(user._id.toString());
        resp.setName(user.name);
        resp.setEmail(user.email);
        resp.setGender(user.gender);
        resp.setToken(auth.generateToken(user));
        callback(null, resp);
      });
    });
  };
};
