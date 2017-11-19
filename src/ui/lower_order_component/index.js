import { h, render, Component } from 'preact';

// TypeScript not able to handle my shit
// type AnyComponent = Component<any, any>;
// type MonadicConstructor<P, T> = (_ : P) => T;
// type AnyComponentConstructor = MonadicConstructor<any, AnyComponent>;
// type HigherOrderComponent = MonadicConstructor<AnyComponent, AnyComponent>;

// export default function lowerOrderComponent(WrappedComponent) {
//   WrappedComponent.decorators = [];
//   const originalComponentDidMount = searchProto(WrappedComponent, 'componentDidMount');
//   WrappedComponent.prototype.componentDidMount = function () {
//     originalComponentDidMount && originalComponentDidMount();
//     WrappedComponent.decorators.forEach(decorator => decorator(this));
//   };
//   return WrappedComponent;
// }

const findProp = (o, p) => {
  while (o != null) {
    if ( o.hasOwnProperty(p) ) { return o[p]; }
    o = o.prototype;
  }
  return null;
};


const reopenable = (klass) => {
  klass.reopen = {};
  const origProto = klass.prototype;
  const handler = {
    get: (target, propKey, receiver) => {
      if (propKey === 'prototype') { return origProto; }
      const origProp = findProp(origProto, propKey);

      // if (propKey === 'componentDidMount') {
      //   console.log(`get ${propKey} : `, origProp, receiver, target);
      // }
      
      klass.reopen[propKey] = klass.reopen[propKey] || [];
      // TODO: dodgy, undefined if not found but should be function :/
      if (typeof origProp === 'function') {
        return (...args) => {
          return klass.reopen[propKey].reduce((acc, next) => next.call(receiver, acc), origProp.apply(receiver, args));
        };
      } else {
        return klass.reopen[propKey].reduce((acc, next) => next.call(receiver, acc), origProp);
      }
    }
  };
  const protoProxy = new Proxy(origProto, handler);
  klass.prototype = protoProxy;
  return klass;
};
export default reopenable;


// Random shit we don't need but lol
const newProp = (o) => {
  const Gp = () => Math.random().toString();
  let p;
  while ( o.hasOwnProperty( p = Gp() ) );
  return p;
};