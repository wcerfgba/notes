import * as PouchDB from 'pouchdb';
import { PersistentNote } from './';

const Database = new class {
  pouchDB : PouchDB.Database<PersistentNote>;

  constructor() {
    this.pouchDB = new PouchDB('notes');
  }

  getAll() : Promise<Array<PersistentNote>> {
    return this.pouchDB
    .allDocs({
      include_docs: true
    })
    .then(allDocsResponse =>
      allDocsResponse
      .rows
      .map(row => row.doc)
      .filter(row => row != undefined) as Array<PersistentNote>
    );
  }

  put(note : PersistentNote) {
    return this.pouchDB.put(note);
  }

  post(note : PersistentNote) {
    return this.pouchDB.post(note);
  }

  changes() {
    return this.pouchDB
    .changes({
      live: true,
      since: 'now'
    });
  }
};
export default Database;
