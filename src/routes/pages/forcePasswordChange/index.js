import { h, Component } from 'preact';
import style from './style';

export default class ForcePasswordChange extends Component {
  render() {
    return (
      <div class={`${style.home} page has-text-center`}>
        <div class='text-black m-b-20'>
          <h3> Forced Password Change</h3>
        </div>
        <div >
          <h3> Added security measure, system prompts user <br/> to create a new password after a period of time.</h3>
        </div>
      </div>
    );
  }
}
