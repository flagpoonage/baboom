const Baboom = require('./index');

let newE = Baboom.badRequest({ test: 'value' });

console.log('Outgoing payload', newE.output.payload);
console.log('Is Boom', Baboom.isBoom(newE));