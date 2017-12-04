import { h, Component } from 'preact';
import * as Rx from 'rxjs';
import * as moment from 'moment';
import * as Datetime from 'react-datetime';
import { PersistentNote, Database } from '../persistence';

const EditableNoteTime = (props : {note : PersistentNote}) => {
  const onChangeSubject = new Rx.Subject<moment.Moment>();
  onChangeSubject
    .debounceTime(333)
    .subscribe((time : moment.Moment) => {
      Database.put({
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
export default EditableNoteTime;

// @ts-ignore
const DateTime = (props) => <Datetime {...props} />
