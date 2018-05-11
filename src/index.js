const Boom = require('boom');

const setPayload = (payload = {}, boomObject) => {
  boomObject.output.payload = payload;

  if (payload instanceof Error) {
    boomObject.output.payload = {
      message: payload.message,
      stack: payload.stack
    };
  }
};

class Baboom extends Boom {

  constructor(payload = {}, options = {}) {
    super(payload.message || 'No message supplied', options);
    setPayload(payload, this);
  }

  static isBoom (error) {
    return Boom.isBoom(error) || (error instanceof Baboom);
  }

}

[

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

  Baboom[methodName] = (payload = {}, ...args) => {
    let message = payload.message || 'No message supplied';

    const error = Boom[methodName](message, ...args);
    setPayload(payload, error);

    return error;
  };

});

module.exports = Baboom;