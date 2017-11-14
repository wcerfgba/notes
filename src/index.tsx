import { h, render } from 'preact';
import AllNotesList from './components/ui/capabilities/list_all_notes/AllNotesList';
import getDatabase from './components/persistence/capabilities/get_database';

render(<AllNotesList />, document.querySelector('#app'));

setTimeout(() => {
  console.log('put it 1');
  console.log(getDatabase().put({
    _id: '123',
    _rev: undefined,
    text: 'ererwer',
    time: (new Date()).toJSON(),
    tags: []
  }));
}, 1000);

setTimeout(() => {
  console.log('put it 2');
  console.log(getDatabase().post({
    _id: undefined,
    _rev: undefined,
    text: 'ererwer',
    time: (new Date()).toJSON(),
    tags: []
  }));
}, 2000);