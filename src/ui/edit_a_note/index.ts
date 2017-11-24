import { h, render, Component  } from 'preact';
import * as Rx from 'rxjs';
import { Note, default as ReopenableNote } from '../view_a_note/Note';
import storeNote from '../../persistence/store_note';

ReopenableNote.reopen.componentDidMount.push(
  makeNoteTextEditable,
  installStoreNoteOnTextChange
);

function makeNoteTextEditable(this : Note) {
  if (this.noteText !== undefined) {
    this.noteText.setAttribute('contenteditable', 'true');
  }
};

function installStoreNoteOnTextChange(this : Note) {
  if (this.noteText !== undefined) {
    const inputs = Rx.Observable.fromEvent<Event>(this.noteText, 'input');
    inputs
    .debounceTime(1000)
    .subscribe((e : Event) => {
      const text = (<HTMLElement>e.target).innerHTML;
      this.props.note.text = text + '!';
      storeNote(this.props.note);
    });
  }
};