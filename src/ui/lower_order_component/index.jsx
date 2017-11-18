import { h, render, Component } from 'preact';

// TypeScript not able to handle my shit
// type AnyComponent = Component<any, any>;
// type MonadicConstructor<P, T> = (_ : P) => T;
// type AnyComponentConstructor = MonadicConstructor<any, AnyComponent>;
// type HigherOrderComponent = MonadicConstructor<AnyComponent, AnyComponent>;

export default function lowerOrderComponent(WrappedComponent) {
  // const decorators = [];
  // return class extends WrappedComponent {
  //   static get decorators() {
  //     return decorators;
  //   }

  //   componentDidMount() {
  //     console.log('mounted in loc');
  //     console.log(this);
  //     //super.componentDidMount();
  //     decorators.forEach(decorator => decorator(this));
  //   }
  // };

  WrappedComponent.decorators = [];
  const originalComponentDidMount = searchProto(WrappedComponent, 'componentDidMount');
  WrappedComponent.prototype.componentDidMount = function () {
    originalComponentDidMount && originalComponentDidMount();
    WrappedComponent.decorators.forEach(decorator => decorator.apply(this));
  };
  return WrappedComponent;
}

const searchProto = (o, p) => {
  while (o.prototype != null) {
    if ( o.prototype.hasOwnProperty(p) ) { return o.prototype[p]; }
    o = o.prototype;
  }
  return null;
};



// Random shit we don't need but lol
const newProp = (o) => {
  const Gp = () => Math.random().toString();
  let p;
  while ( o.hasOwnProperty( p = Gp() ) );
  return p;
};