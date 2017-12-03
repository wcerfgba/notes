import { h, render, Component  } from 'preact';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import storeNote from '../../persistence/store_note';
import PersistentNote from '../../persistence/note';
import { Note, default as ReopenableNote } from '../view_a_note/Note';

ReopenableNote.reopen.render.push(
  makeNoteTextEditable
);

function makeNoteTextEditable(this : Note, render : () => JSX.Element) {
  return () => {
    const result = render.apply(this);
    const noteTextChildIndex = R.findIndex(R.propEq('key', 'note-text'), result.children);
    result.children[noteTextChildIndex] = (
      <EditableNoteText
        note={this.props.note}
      />
    );
    return result;
  }
}

const EditableNoteText = (props : { note : PersistentNote }) => (
  <div
    className="note-text"
    key="note-text"
  >
    <textarea
    value={props.note.text}
      ref={(el : Element | undefined) => {
        if (el != undefined) {
          const inputs = Rx.Observable.fromEvent<Event>(el, 'input');
          return inputs
            .debounceTime(333)
            .subscribe((e : Event) => {
              const text = (el as HTMLTextAreaElement).value;
              storeNote({
                ...props.note,
                text: text + '!'
              });
            });
        }
      }}
    >
    </textarea>
  </div>
);
