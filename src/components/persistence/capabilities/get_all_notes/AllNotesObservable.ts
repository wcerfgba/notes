import * as Rx from 'rxjs';
import Note from '../../concepts/note';
import getDatabase from '../get_database';
import { default as getAllNotes, AllNotes } from '../get_all_notes';

const AllNotesObservable : Rx.Observable<AllNotes> =
Rx.Observable.concat(
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
export default AllNotesObservable;