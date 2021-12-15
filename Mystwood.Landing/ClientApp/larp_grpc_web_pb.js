**
 * @fileoverview gRPC-Web generated client stub for larp
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.larp = require('./larp_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.larp.LarpClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.larp.LarpPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.larp.InitiateLoginRequest,
 *   !proto.larp.InitiateLoginResponse>}
 */
const methodDescriptor_Larp_InitiateLogin = new grpc.web.MethodDescriptor(
  '/larp.Larp/InitiateLogin',
  grpc.web.MethodType.UNARY,
  proto.larp.InitiateLoginRequest,
  proto.larp.InitiateLoginResponse,
  /**
   * @param {!proto.larp.InitiateLoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.larp.InitiateLoginResponse.deserializeBinary
);


/**
 * @param {!proto.larp.InitiateLoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.larp.InitiateLoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.larp.InitiateLoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.larp.LarpClient.prototype.initiateLogin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/larp.Larp/InitiateLogin',
      request,
      metadata || {},
      methodDescriptor_Larp_InitiateLogin,
      callback);
};


/**
 * @param {!proto.larp.InitiateLoginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.larp.InitiateLoginResponse>}
 *     Promise that resolves to the response
 */
proto.larp.LarpPromiseClient.prototype.initiateLogin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/larp.Larp/InitiateLogin',
      request,
      metadata || {},
      methodDescriptor_Larp_InitiateLogin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.larp.ConfirmLoginRequest,
 *   !proto.larp.ConfirmLoginResponse>}
 */
const methodDescriptor_Larp_ConfirmLogin = new grpc.web.MethodDescriptor(
  '/larp.Larp/ConfirmLogin',
  grpc.web.MethodType.UNARY,
  proto.larp.ConfirmLoginRequest,
  proto.larp.ConfirmLoginResponse,
  /**
   * @param {!proto.larp.ConfirmLoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.larp.ConfirmLoginResponse.deserializeBinary
);


/**
 * @param {!proto.larp.ConfirmLoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.larp.ConfirmLoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.larp.ConfirmLoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.larp.LarpClient.prototype.confirmLogin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/larp.Larp/ConfirmLogin',
      request,
      metadata || {},
      methodDescriptor_Larp_ConfirmLogin,
      callback);
};


/**
 * @param {!proto.larp.ConfirmLoginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.larp.ConfirmLoginResponse>}
 *     Promise that resolves to the response
 */
proto.larp.LarpPromiseClient.prototype.confirmLogin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/larp.Larp/ConfirmLogin',
      request,
      metadata || {},
      methodDescriptor_Larp_ConfirmLogin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.larp.UpdateProfileRequest,
 *   !proto.larp.UpdateProfileResponse>}
 */
const methodDescriptor_Larp_UpdateProfile = new grpc.web.MethodDescriptor(
  '/larp.Larp/UpdateProfile',
  grpc.web.MethodType.UNARY,
  proto.larp.UpdateProfileRequest,
  proto.larp.UpdateProfileResponse,
  /**
   * @param {!proto.larp.UpdateProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.larp.UpdateProfileResponse.deserializeBinary
);


/**
 * @param {!proto.larp.UpdateProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.larp.UpdateProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.larp.UpdateProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.larp.LarpClient.prototype.updateProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/larp.Larp/UpdateProfile',
      request,
      metadata || {},
      methodDescriptor_Larp_UpdateProfile,
      callback);
};


/**
 * @param {!proto.larp.UpdateProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.larp.UpdateProfileResponse>}
 *     Promise that resolves to the response
 */
proto.larp.LarpPromiseClient.prototype.updateProfile =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/larp.Larp/UpdateProfile',
      request,
      metadata || {},
      methodDescriptor_Larp_UpdateProfile);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.larp.GetProfileRequest,
 *   !proto.larp.GetProfileResponse>}
 */
const methodDescriptor_Larp_GetProfile = new grpc.web.MethodDescriptor(
  '/larp.Larp/GetProfile',
  grpc.web.MethodType.UNARY,
  proto.larp.GetProfileRequest,
  proto.larp.GetProfileResponse,
  /**
   * @param {!proto.larp.GetProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.larp.GetProfileResponse.deserializeBinary
);


/**
 * @param {!proto.larp.GetProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.larp.GetProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.larp.GetProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.larp.LarpClient.prototype.getMyProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/larp.Larp/GetProfile',
      request,
      metadata || {},
      methodDescriptor_Larp_GetProfile,
      callback);
};


/**
 * @param {!proto.larp.GetProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.larp.GetProfileResponse>}
 *     Promise that resolves to the response
 */
proto.larp.LarpPromiseClient.prototype.getMyProfile =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/larp.Larp/GetProfile',
      request,
      metadata || {},
      methodDescriptor_Larp_GetProfile);
};


module.exports = proto.larp;

