import * as PouchDB from 'pouchdb';
import Note from '../../concepts/note';

const getDatabase : () => PouchDB.Database<Note> = (() => {
  let DATABASE;
  return () => DATABASE = DATABASE || newDatabase()
})();
export default getDatabase;

export const newDatabase = () => {
  console.log('new db yall');
  return new PouchDB('notes');
};