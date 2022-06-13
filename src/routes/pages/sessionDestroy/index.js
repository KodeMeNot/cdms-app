import { h, Component } from 'preact';
import style from './style';

export default class SessionDestroy extends Component {
  render() {
    return (
      <div class={`${style.home} page has-text-center`}>
        <div >
          <h3>Session was destroyed,</h3>
        </div>
        <div >
          <h3> Please refresh or return to your home screen.</h3>
        </div>
      </div>
    );
  }
}
