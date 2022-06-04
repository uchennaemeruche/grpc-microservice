// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');

function serialize_user_pkg_GetUserReq(arg) {
  if (!(arg instanceof user_pb.GetUserReq)) {
    throw new Error('Expected argument of type user_pkg.GetUserReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_pkg_GetUserReq(buffer_arg) {
  return user_pb.GetUserReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_pkg_LoginReq(arg) {
  if (!(arg instanceof user_pb.LoginReq)) {
    throw new Error('Expected argument of type user_pkg.LoginReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_pkg_LoginReq(buffer_arg) {
  return user_pb.LoginReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_pkg_SignupReq(arg) {
  if (!(arg instanceof user_pb.SignupReq)) {
    throw new Error('Expected argument of type user_pkg.SignupReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_pkg_SignupReq(buffer_arg) {
  return user_pb.SignupReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_pkg_UserResponse(arg) {
  if (!(arg instanceof user_pb.UserResponse)) {
    throw new Error('Expected argument of type user_pkg.UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_pkg_UserResponse(buffer_arg) {
  return user_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_pkg_VerifyReq(arg) {
  if (!(arg instanceof user_pb.VerifyReq)) {
    throw new Error('Expected argument of type user_pkg.VerifyReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_pkg_VerifyReq(buffer_arg) {
  return user_pb.VerifyReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_pkg_VerifyResponse(arg) {
  if (!(arg instanceof user_pb.VerifyResponse)) {
    throw new Error('Expected argument of type user_pkg.VerifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_pkg_VerifyResponse(buffer_arg) {
  return user_pb.VerifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  login: {
    path: '/user_pkg.UserService/login',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.LoginReq,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_user_pkg_LoginReq,
    requestDeserialize: deserialize_user_pkg_LoginReq,
    responseSerialize: serialize_user_pkg_UserResponse,
    responseDeserialize: deserialize_user_pkg_UserResponse,
  },
  signup: {
    path: '/user_pkg.UserService/signup',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SignupReq,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_user_pkg_SignupReq,
    requestDeserialize: deserialize_user_pkg_SignupReq,
    responseSerialize: serialize_user_pkg_UserResponse,
    responseDeserialize: deserialize_user_pkg_UserResponse,
  },
  verifyUser: {
    path: '/user_pkg.UserService/verifyUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.VerifyReq,
    responseType: user_pb.VerifyResponse,
    requestSerialize: serialize_user_pkg_VerifyReq,
    requestDeserialize: deserialize_user_pkg_VerifyReq,
    responseSerialize: serialize_user_pkg_VerifyResponse,
    responseDeserialize: deserialize_user_pkg_VerifyResponse,
  },
  getUser: {
    path: '/user_pkg.UserService/getUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetUserReq,
    responseType: user_pb.VerifyResponse,
    requestSerialize: serialize_user_pkg_GetUserReq,
    requestDeserialize: deserialize_user_pkg_GetUserReq,
    responseSerialize: serialize_user_pkg_VerifyResponse,
    responseDeserialize: deserialize_user_pkg_VerifyResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
