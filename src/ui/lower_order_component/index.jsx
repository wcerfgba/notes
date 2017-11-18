import { h, render, Component } from 'preact';

// TypeScript not able to handle my shit
// type AnyComponent = Component<any, any>;
// type MonadicConstructor<P, T> = (_ : P) => T;
// type AnyComponentConstructor = MonadicConstructor<any, AnyComponent>;
// type HigherOrderComponent = MonadicConstructor<AnyComponent, AnyComponent>;

export default function lowerOrderComponent(WrappedComponent) {
  const decorators = [];
  // const handler = {
  //   get: (obj, prop) => {
  //     if (prop === 'decorators') {
  //       return decorators;
  //     }
  //     if (prop === 'render') {
  //       return () => {
  //         return decorators
  //           .reduce((acc, next) => next(acc), obj);
  //       }
  //     }
  //     return obj[prop];
  //   }
  // };
  // return new Proxy(component, handler);
  return class extends WrappedComponent {
    static get decorators() {
      return decorators;
    }

    componentDidMount() {
      console.log('mounted in loc');
      console.log(this);
      //super.componentDidMount();
      decorators.forEach(decorator => decorator(this));
    }

    // render() {
    //   const wrapped = super.render();
    //   return decorators
    //     .reduce((acc, next) => next(acc), wrapped);
    // }
  };
}