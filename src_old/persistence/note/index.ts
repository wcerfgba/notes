import * as PouchDB from 'pouchdb';

type Note = PouchDB.Core.ExistingDocument<{
  text : string,
  tags : Array<string>,
  // TODO: use refinement type for time string
  time : string,
}>;
export default Note;