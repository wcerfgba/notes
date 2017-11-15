import Note from '../note';
import getDatabase from '../get_database';

export default function storeNote(note : Note) {
  return getDatabase().put(note);
}