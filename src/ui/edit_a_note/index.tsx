import { h, render, Component  } from 'preact';
import * as Rx from 'rxjs';
import * as Datetime from 'react-datetime';
import * as moment from 'moment';
import storeNote from '../../persistence/store_note';
import { Note, default as ReopenableNote } from '../view_a_note/Note';
import './NoteTime.scss';

ReopenableNote.reopen.constructor.push(
  makeNoteTextEditable,
  installStoreNoteOnTextChange
);

ReopenableNote.reopen.renderTime.push(
  makeNoteTimeEditable
);

function makeNoteTextEditable(this : Note, constructor : any) {
  if (this.noteText !== undefined) {
    this.noteText.setAttribute('contenteditable', 'true');
  }
  return constructor;
};

function installStoreNoteOnTextChange(this : Note, constructor : any) {
  if (this.noteText !== undefined) {
    const inputs = Rx.Observable.fromEvent<Event>(this.noteText, 'input');
    inputs
    .debounceTime(1000)
    .subscribe((e : Event) => {
      const text = (e.target as Element).innerHTML;
      this.props.note.text = text + '!';
      storeNote(this.props.note);
    });
  }
  return constructor;
};

function makeNoteTimeEditable(this : Note, renderTime : any) {
  return function (this : Note & {onNoteTimeChanged : Function}) {
    const onChangeSubject = new Rx.Subject<moment.Moment>();
    onChangeSubject
    .debounceTime(1000)
    .subscribe((time : moment.Moment) => {
      this.props.note.time = time.toISOString();
      storeNote(this.props.note);
    });
    return (
      <div
        className="note-time"
      >
        <DateTime
          value={moment(this.props.note.time)}
          ref={(el : Element) => this.noteTime = el}
          onChange={(time : moment.Moment) => onChangeSubject.next(time)}
        />
      </div>
    )
  }.bind(this);
}

// @ts-ignore
const DateTime = (props) => <Datetime {...props} />
