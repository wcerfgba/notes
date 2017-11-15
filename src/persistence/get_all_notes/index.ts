import Note from '../note';
import getDatabase from '../get_database';

// @ts-ignore: If we only store Notes in the DB then every row.doc will be a 
// Note.
const getAllNotes : () => Promise<AllNotes> = () => {
  console.log('getAllNotes');
  return getDatabase()
  .allDocs({
    include_docs: true
  })
  .then(allDocsResponse =>
    allDocsResponse
    .rows
    .map(row => row.doc)
  );
};
export default getAllNotes;

export type AllNotes = Array<Note>;