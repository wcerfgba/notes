import * as Rx from 'rxjs';
import { h, render, Component } from 'preact';
import { PersistentNote, AllNotesObservable } from '../persistence';
import { NotesList } from './';

export default class AllNotesList extends Component<AllNotesListProps, AllNotesListState> {
  state : AllNotesListState = {
    allNotes: [],
    allNotesSubscription: undefined
  };

  componentWillMount() {
    this.setState({
      allNotesSubscription:
        this.state.allNotesSubscription
        || AllNotesObservable().subscribe(this.allNotesObserver)
    });
  }

  allNotesObserver : Rx.Observer<Array<PersistentNote>> = {
    next: allNotes => { console.log('next'); this.setState({ allNotes }) },
    error: err => { console.log(err); },
    complete: () => { console.log('complete'); },
  };

  render() {
    return (
      <NotesList
        notes={this.state.allNotes}
      />
    );
  }
}

export type AllNotesListProps = {};
export type AllNotesListState = {
  allNotesSubscription : Rx.Subscription | undefined,
  allNotes : Array<PersistentNote>
};
