const Boom = require('boom');

class Baboom extends Boom {

  constructor(payload, options = {}) {
    super('EMPTY', options);
    this.output.payload = payload;
  }

  static isBoom (error) {
    return Boom.isBoom(error) || (error instanceof Baboom);
  }

}

const methods = [

  'badData',
  'badGateway',
  'badImplementation',
  'badRequest',
  'clientTimeout',
  'conflict',
  'entityTooLarge',
  'expectationFailed',
  'failedDependency',
  'forbidden',
  'gatewayTimeout',
  'illegal',
  'internal',
  'lengthRequired',
  'locked',
  'methodNotAllowed',
  'notAcceptable',
  'notFound',
  'notImplemented',
  'paymentRequired',
  'preconditionFailed',
  'preconditionRequired',
  'proxyAuthRequired',
  'rangeNotSatisfiable',
  'resourceGone',
  'serverUnavailable',
  'teapot',
  'tooManyRequests',
  'unauthorized',
  'unsupportedMediaType',
  'uriTooLong',

].forEach(methodName => {

  Baboom[methodName] = (...args) => {
    const error = Boom[methodName](...args);
    error.output.payload = args[0];

    if (args[0] instanceof Error) {
      error.output.payload = {
        message: args[0].message,
        stack: args[0].stack
      };g
    }

    return error;
  }

});

module.exports = Baboom;