import { h, render, Component  } from 'preact';
import * as Rx from 'rxjs';
import { Note, default as LowerOrderNote } from '../view_a_note/Note';
import storeNote from '../../persistence/store_note';
import { Event } from '_debugger';

LowerOrderNote.decorators.push(
  (component : Note) => {
    makeNoteTextEditable(component);
    installStoreNoteOnTextChange(component);
  }
);

const makeNoteTextEditable = (component : Note) => {
  if (component.noteText !== undefined) {
    component.noteText.setAttribute('contenteditable', 'true');
  }
};

const installStoreNoteOnTextChange = (component : Note) => {
  if (component.noteText !== undefined) {
    const inputs = Rx.Observable.fromEvent<InputEvent>(component.noteText, 'input');
    inputs
    .debounceTime(1000)
    .subscribe(e => {
      const text = (<HTMLDivElement>e.target).innerHTML;
      component.props.note.text = text;
      storeNote({
        ...component.props.note,
        text: text + '!'
      });
    });
  }
};

type InputEvent = Event & {
  target : Element
};