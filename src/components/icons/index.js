import { h } from 'preact';
import { getInitials } from '../../lib/utils';

const Icons = (props) => {

  return (
    <div class="display-flex">
      <div class={`round_iconsworkspace m-t-0 ${props.classes ? props.classes : ''}`}>
        <p class={props.classes ? props.classes : ''} title={props.title ? props.title : ''}>{getInitials(props.userDisplayName)}</p>
      </div>
    </div>
  );
};

export default Icons;
