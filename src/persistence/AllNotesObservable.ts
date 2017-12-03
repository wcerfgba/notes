import * as Rx from 'rxjs';
import { Database, PersistentNote } from './';

const AllNotesObservable : () => Rx.Observable<Array<PersistentNote>> =
  () => Rx.Observable.concat(
    Rx.Observable.fromPromise(Database.getAll()),
    Rx.Observable.fromEvent(
      Database.changes(),
      'change'
    )
    .concatMap(change => Database.getAll())
  );
export default AllNotesObservable;
