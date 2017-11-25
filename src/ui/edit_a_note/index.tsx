import { h, render, Component  } from 'preact';
import * as Rx from 'rxjs';
import * as Datetime from 'react-datetime';
import * as moment from 'moment';
import storeNote from '../../persistence/store_note';
import { Note, default as ReopenableNote } from '../view_a_note/Note';
import makeElementEditable from '../make_element_editable';
import './NoteTime.scss';

ReopenableNote.reopen.constructor.push(
//  makeNoteTextEditable
);

ReopenableNote.reopen.render.push(
  makeNoteTextEditable2
);

ReopenableNote.reopen.renderTime.push(
  makeNoteTimeEditable
);

function makeNoteTextEditable(this : Note, constructor : any) {
  if (this.noteText !== undefined) {
    makeElementEditable(this.noteText as HTMLElement, (text : string) => {
      this.props.note.text = text + '!';
      storeNote(this.props.note);
    });
  }
  return constructor;
}

function makeNoteTextEditable2(this : Note, render : () => JSX.Element) {
  return () => {
    const result = render.apply(this);
    result.children[1].attributes.ref = (el : HTMLElement) => {
      if (el == null) { return; }
      makeElementEditable(el, (text : string) => {
        this.props.note.text = text + '!';
        storeNote(this.props.note);
      });
    }
    return result;
  };
}

function makeNoteTimeEditable(this : Note, renderTime : any) {
  return () => {
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
          onChange={(time : moment.Moment) => onChangeSubject.next(time)}
        />
      </div>
    )
  };
}

// @ts-ignore
const DateTime = (props) => <Datetime {...props} />
