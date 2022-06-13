import { h, Component } from 'preact';
import style from './style';

export default class Maintenance extends Component {
  render() {
    return (
      <div class={`${style.home} page has-text-center`}>
        <div >
          <h3>Application is down for maintenance</h3>
        </div>
      </div>
    );
  }
}
