import { h, Component } from 'preact';
import * as Rx from 'rxjs';
import { PersistentNote, Database } from '../persistence';

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
              Database.put({
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

export default EditableNoteText;
