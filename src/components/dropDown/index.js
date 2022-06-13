import { h } from 'preact';

export const DropDown = ({ children, position, fileSelectClass }) => {
  return (
    <section class={fileSelectClass ? 'drop-down-component-bulkupload ':'drop-down-component ' + (position ? position : '')}>
      { children }
    </section>
  );
};
