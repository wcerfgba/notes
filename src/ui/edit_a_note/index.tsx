import { h, render, Component  } from 'preact';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import * as Datetime from 'react-datetime';
import * as moment from 'moment';
import storeNote from '../../persistence/store_note';
import PersistentNote from '../../persistence/note';
import { Note, default as ReopenableNote } from '../view_a_note/Note';
import makeElementEditable from '../make_element_editable';
import './Note.scss';

ReopenableNote.reopen.render.push(
  makeNoteTimeEditable,
  makeNoteTextEditable
);

function makeNoteTimeEditable(this : Note, render : () => JSX.Element) {
  return () => {
    const result = render.apply(this);
    const noteTimeChildIndex = R.findIndex(R.propEq('key', 'note-time'), result.children);
    result.children[noteTimeChildIndex] = (
      <EditableNoteTime
        note={this.props.note}
      />
    );
    return result;
  }
}

const EditableNoteTime = (props : {note : PersistentNote}) => {
  const onChangeSubject = new Rx.Subject<moment.Moment>();
  onChangeSubject
    .debounceTime(333)
    .subscribe((time : moment.Moment) => {
      storeNote({
        ...props.note,
        time: time.toISOString()
      });
    });
  const timeMoment = moment(props.note.time);
  return (
    <div
      className="note-time"
      key="note-time"
    >
      <DateTime
        value={timeMoment}
        onChange={(time : moment.Moment) => onChangeSubject.next(time)}
        renderInput={(inputProps : any, openCalendar : () => void) => (
          <div
            className="note-time-inner"
            onClick={openCalendar}
          >
            <div
              className="note-time-date"
            >
              {timeMoment.format('YYYY-MM-DD')}
            </div>
            <div
              className="note-time-time"
            >
              {timeMoment.format('HH:mm')}
            </div>
          </div>
        )}
      />
    </div>
  );
};

// @ts-ignore
const DateTime = (props) => <Datetime {...props} />

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
