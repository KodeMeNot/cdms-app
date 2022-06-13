import { h, Component } from 'preact';
import style from './style';

export default class DomainNotFound extends Component {
  render() {
    return (
      <div class={`${style.home} page has-text-center`}>
        <div >
          <h3>Client Domain Not Found</h3>
        </div>
      </div>
    );
  }
}
