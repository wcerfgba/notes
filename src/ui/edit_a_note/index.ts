import { h, render, Component  } from 'preact';
import * as Rx from 'rxjs';
import { Note, default as LowerOrderNote } from '../view_a_note/Note';
import storeNote from '../../persistence/store_note';
import { Event } from '_debugger';

LowerOrderNote.reopen.componentDidMount = [];

LowerOrderNote.reopen.componentDidMount.push(
  function (this : Note) {
    console.log('editablifying', this);
    makeNoteTextEditable.call(this);
    installStoreNoteOnTextChange.call(this);
  }
);

function makeNoteTextEditable(this : Note) {
  if (this.noteText !== undefined) {
    this.noteText.setAttribute('contenteditable', 'true');
  }
};

function installStoreNoteOnTextChange(this : Note) {
  // @ts-ignore
  console.log(`installing change`, this);
  // @ts-ignore
  if (this.noteText !== undefined) {
    // @ts-ignore
    const inputs = Rx.Observable.fromEvent(this.noteText, 'input');
    inputs
    .debounceTime(1000)
    .subscribe(e => {
      // @ts-ignore
      const text = e.target.innerHTML;
      // @ts-ignore
      this.props.note.text = text + '!';
      // @ts-ignore
      storeNote(this.props.note);
    });
  }
};