import { h, render, Component  } from 'preact';

export const SingleLineTextField : (props : SingleLineTextFieldProps) => JSX.Element = (props : SingleLineTextFieldProps) => (
  <input
  className={props.className}
  type="text"
  value={props.value}
  ref={
    props.autoFocus ?
      (el : Element | undefined) => {
        console.log('ewee');
        if (el == undefined) { return; }
        (el as HTMLInputElement).focus();
      }
      :
      undefined
  }
  onChange={
    props.onChange ?
    // @ts-ignore
    (e : Event) => props.onChange((e.target as HTMLInputElement).value)
    :
    undefined
  }
  onKeyDown={
    props.onChange ?
    (e : KeyboardEvent) => {
      if (e.key !== 'Enter') { return; }
      // @ts-ignore
      props.onChange((e.target as HTMLInputElement).value);
    }
    :
    undefined
  }
/>
);
export default SingleLineTextField;

export type SingleLineTextFieldProps = {
  className? : string,
  value? : string,
  autoFocus? : boolean,
  onChange? : (value : string) => void
};