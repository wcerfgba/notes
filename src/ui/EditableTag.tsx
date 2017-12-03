import { h, render, Component  } from 'preact';
import { PersistentNote, Database } from '../persistence';
import SingleLineTextField from './components/SingleLineTextField';

export default class EditableTag extends Component<EditableTagProps, EditableTagState> {
  render() {
    if (this.state.editing) {
      return (
        <SingleLineTextField
          className={`note-tag note-tag-${this.value}-editing`}
          autoFocus={true}
          onChange={this.updateTag}
          onBlur={() => this.setState({
            editing: false
          })}
          value={this.value}
        />
      );
    } else {
      return (
        <div
          className={`note-tag note-tag-${this.value}`}
          onClick={() => this.setState({
            editing: true
          })}
        >
          {this.value}
        </div>
      );
    }
  }

  get value() {
    return this.props.note.tags[
      this.props.tagIndex
    ];
  }

  updateTag = (tag : string) => {
    const tags = this.props.note.tags;
    tags[this.props.tagIndex] = tag;
    this.setState({
      editing: false
    }, () => {
      Database.put({
        ...this.props.note,
        tags: tags.filter((tag : string) => tag && true)
      })
    })
  };
}

export type EditableTagProps = {
  note : PersistentNote,
  tagIndex : number
};

export type EditableTagState = {
  editing : boolean
};
