import { h, render } from 'preact';
import AllNotesList from '../ui/list_all_notes/AllNotesList';
import getDatabase from '../persistence/get_database';
import '../ui/canvas/index.scss';

// @ts-ignore: its fiiine
render(h(AllNotesList, {}), document.querySelector('#app') || document);

// setTimeout(() => {
//   console.log('put it 1');
//   const doc = {
//     text: Math.random().toString(),
//     time: (new Date()).toJSON(),
//     tags: ['ewer', 'wer']
//   };
//   // @ts-ignore: lol
//   getDatabase().post(doc);
// }, 1000);

// setTimeout(() => {
//   console.log('put it 2');
//   // @ts-ignore: lol
//   console.log(getDatabase().post({
//     text: Math.random().toString(),
//     time: (new Date()).toJSON(),
//     tags: ['werwerwe', 'wer']
//   }));
// }, 2000);