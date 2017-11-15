import * as PouchDB from 'pouchdb';
import Note from '../note';

const getDatabase : () => PouchDB.Database<Note> = (() => {
  let DATABASE : PouchDB.Database<Note>;
  return () => {
    DATABASE = DATABASE || newDatabase();
    console.log('getDatabase');
    return DATABASE;
  };
})();
export default getDatabase;

export const newDatabase = () => {
  console.log('new db yall');
  return new PouchDB('notes');
};