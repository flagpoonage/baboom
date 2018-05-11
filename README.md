# baboom
Baboom is a wrapper for the [Boom](https://github.com/hapijs/boom) error library which simplifies the delivery of custom payloads. Rather than a message and data object, you can simply pass the payload to the constructor, or to one of Boom's static constructor methods.

##Constructor Example

```js
const Baboom = require('baboom');

throw new Baboom({
  
  someKey: 'customValue',
  someData: {
    someBool: false
  }

}, {

  statusCode: 502

});
```

##Static Example

```js
const Baboom = require('baboom');

throw Baboom.internal({
  message: 'If a message property is provided, it will also be used in constructed the Error object',
  someValue: 'The payload you specify here will be the exact JSON output.',
  someArray: [1,2,3,4]
});
```