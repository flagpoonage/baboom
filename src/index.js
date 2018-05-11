const Boom = require('boom');
const transforms = [];

const makeStandardPayload = (payload = {}, boomObject) => {
  transforms.reduce((acc, transformFunction) => {
    return transformFunction(payload, boomObject);
  }, payload);
};

const makeErrorPayload = e => ({
  message: e.message,
  stack: e.stack
});

class Baboom extends Boom {

  constructor(payload = {}, options = {}) {
    if (typeof payload === 'string') {
      super(payload, options);
    }
    else if (payload instanceof Error) {
      super(payload, options);
      this.output.payload = makeErrorPayload(payload);
    }
    else {
      super(payload.message || 'No message supplied', options);
      this.output.payload = makeStandardPayload(payload, this);
    }
  }

  static isBoom (error) {
    return Boom.isBoom(error) || (error instanceof Baboom);
  }

  static addTransform (tFn) {
    transforms.push(tFn);
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
    
    if (typeof payload === 'string') {
      return Boom[methodName](payload, ...args);
    }
    else if (payload instanceof Error) {
      const error = Boom[methodName](payload, ...args);
      error.output.payload = makeErrorPayload(payload);
      return error;
    }
    
    const error = Boom[methodName](payload.message || 'No message supplied', ...args);
    error.output.payload = makeStandardPayload(payload, error);
    
    return error;
  };

});

module.exports = Baboom;