import { Database } from './';

type PersistentNote = PouchDB.Core.ExistingDocument<{
  text : string,
  tags : Array<string>,
  // TODO: use refinement type for time string
  time : string,
}>;
export default PersistentNote;
