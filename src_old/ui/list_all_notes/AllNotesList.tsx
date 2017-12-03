import * as Rx from 'rxjs';
import { h, render, Component } from 'preact';
import { AllNotes } from '../../persistence/get_all_notes';
import getAllNotesObservable from '../../persistence/get_all_notes/AllNotesObservable';
import PersistentNote from '../../persistence/note';
import NotesList from './NotesList';

export default class AllNotesList extends Component<AllNotesListProps, AllNotesListState> {
  state : AllNotesListState = {
    allNotes: [],
    allNotesSubscription: undefined
  };

  componentWillMount() {
    this.setState({
      allNotesSubscription: 
        this.state.allNotesSubscription 
        || getAllNotesObservable().subscribe(this.allNotesObserver)
    });
  }

  allNotesObserver : Rx.Observer<AllNotes> = {
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