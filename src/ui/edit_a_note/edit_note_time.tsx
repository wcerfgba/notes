import { h, render, Component  } from 'preact';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import * as Datetime from 'react-datetime';
import * as moment from 'moment';
import storeNote from '../../persistence/store_note';
import PersistentNote from '../../persistence/note';
import { Note, default as ReopenableNote } from '../view_a_note/Note';

ReopenableNote.reopen.render.push(
  makeNoteTimeEditable
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