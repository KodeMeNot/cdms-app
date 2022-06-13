import { h, Component } from 'preact';
import style from './style';

export default class BrowserNotSupported extends Component {
  render() {
    return (
      <div class={`${style.home} page has-text-center`}>
        <div style="margin-top:150px;">
          <h4> Browser not supported.</h4>
        </div>
        <div >
          <h4> Please use Google Chrome.</h4>
        </div>
      </div>
    );
  }
}
