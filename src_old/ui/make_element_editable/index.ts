import * as Rx from 'rxjs';

const makeElementEditable = (
  element : HTMLElement,
  inputCallback : (content : string) => any
) => {
  element.setAttribute('contenteditable', 'true');
  const inputs = Rx.Observable.fromEvent<Event>(element, 'input');
  return inputs
    .debounceTime(1000)
    .subscribe((e : Event) => {
      const innerHTML = element.innerHTML;
      inputCallback(innerHTML);
    });
};
export default makeElementEditable;