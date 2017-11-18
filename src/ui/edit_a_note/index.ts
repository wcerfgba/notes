import { h, render, Component  } from 'preact';
import { Note, default as LowerOrderNote } from '../view_a_note/Note';
import storeNote from '../../persistence/store_note';

LowerOrderNote.decorators.push(
  function (this : Note) {
    makeNoteTextEditable.apply(this);
    installStoreNoteOnTextChange.apply(this);
  }
);

// TODO: fix types
function makeNoteTextEditable(this : Note) {
  if (this.noteText !== undefined) {
    this.noteText.setAttribute('contenteditable', 'true');
  }
}

function installStoreNoteOnTextChange(this : Note) {
  if (this.noteText !== undefined) {
    this.noteText.addEventListener('input', (e) => {
      const text = (<HTMLDivElement>e.target).innerHTML;
      this.props.note.text = text;
      storeNote({
        ...this.props.note,
        text
      })
      .then(response => {
        this.props.note._rev = response.rev;
      });
    });
  }
}