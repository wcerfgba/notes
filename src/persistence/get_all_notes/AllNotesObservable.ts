import * as Rx from 'rxjs';
import Note from '../note';
import getDatabase from '../get_database';
import { default as getAllNotes, AllNotes } from '../get_all_notes';

const getAllNotesObservable : () => Rx.Observable<AllNotes> = () => {
  console.log('getAllNotesObservable');
  return Rx.Observable.concat(
    Rx.Observable.fromPromise(getAllNotes()),
    Rx.Observable.fromEvent(
      getDatabase()
      .changes({
        live: true,
        since: 'now',
      }),
      'change'
    )
    .concatMap(change => getAllNotes())
  );
};
export default getAllNotesObservable;