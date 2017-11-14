import * as Rx from 'rxjs';
import { h, render, Component } from 'preact';
import { AllNotes } from '../../../persistence/capabilities/get_all_notes';
import AllNotesObservable from '../../../persistence/capabilities/get_all_notes/AllNotesObservable';
import PersistentNote from '../../../persistence/concepts/note';
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
        || AllNotesObservable.subscribe(this.allNotesObserver)
    });
  }

  allNotesObserver : Rx.Observer<AllNotes> = {
    next: allNotes => { console.log(allNotes); this.setState({ allNotes }) },
    error: err => ({}),
    complete: () => ({}),
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
  allNotesSubscription : Rx.Subscription,
  allNotes : Array<PersistentNote>
};