import { h, render } from 'preact';
import { AllNotesList } from './ui';
import './app.scss';

// @ts-ignore : waat
render(h(AllNotesList, {}), document.getElementById('app'));



//
// import { Database } from './persistence';
// setTimeout(() => {
//   console.log('put it 1');
//   const doc = {
//     text: Math.random().toString(),
//     time: (new Date()).toJSON(),
//     tags: ['ewer', 'wer']
//   };
//   // @ts-ignore: lol
//   Database.post(doc);
// }, 1000);
//
// setTimeout(() => {
//   console.log('put it 2');
//   // @ts-ignore: lol
//   console.log(Database.post({
//     text: Math.random().toString(),
//     time: (new Date()).toJSON(),
//     tags: ['werwerwe', 'wer']
//   }));
// }, 2000);
