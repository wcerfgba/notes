const reopenable = (klass) => {
  klass.reopen = newBadMultiMap();
  const origProto = klass.prototype;
  const handler = {
    get: (target, propKey, receiver) => {
      const args = { klass, origProto, target, propKey, receiver };
      return handlePrototype(args) ||
        handleReopenable(args);
    }
  };
  const protoProxy = new Proxy(origProto, handler);
  klass.prototype = protoProxy;
  return klass;
};
export default reopenable;

const handlePrototype = ({ origProto, propKey }) => {
  if (propKey === 'prototype') { return origProto; }
};

const handleReopenable = ({ origProto, propKey, klass, receiver }) => {
  const origProp = findProp(origProto, propKey);
  return klass.reopen[propKey].reduce(
    (acc, next) => next.call(receiver, acc),
    origProp
  );
};

// Climb up the prototype chain until we find the property with the requested 
// key.
const findProp = (o, p) => {
  while (o != null) {
    if ( o.hasOwnProperty(p) ) { return o[p]; }
    o = o.prototype;
  }
  return undefined;
};

// Dirty implementation of a multimap which assigns an empty array to a key 
// with undefined value on first access
const newBadMultiMap = () => {
  const obj = Object.create(null);
  return new Proxy(obj, {
    get: (target, propKey, receiver) => 
      obj[propKey] === undefined ? 
      obj[propKey] = [] : 
      obj[propKey]
  });
};