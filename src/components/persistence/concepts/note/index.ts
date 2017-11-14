import * as PouchDB from 'pouchdb';

type Note = PouchDB.Core.ExistingDocument<{
  text : string,
  tags : Array<string>,
  time : DateString,
}>;
export default Note;

// NOTE: hell yeah, refinement types
type DateString = string;
function isDateString(s : DateString) : s is DateString {
  return s === (new Date(s)).toJSON();
}