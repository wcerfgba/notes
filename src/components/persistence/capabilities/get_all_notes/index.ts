import Note from '../../concepts/note';
import getDatabase from '../get_database';

const getAllNotes : () => Promise<AllNotes> = () =>
getDatabase()
.allDocs({
  include_docs: true
})
.then(allDocsResponse =>
  allDocsResponse
  .rows
  .map(row => row.doc)
);
export default getAllNotes;

export type AllNotes = Array<Note>;