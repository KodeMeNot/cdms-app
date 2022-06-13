import { h, Component } from 'preact';
import style from './style';

export default class NoInternet extends Component {
  render() {
    return (
      <div class="online-offline row">
        <section class="col-xs-6">
          <div class="toast displayed" style="bottom: 0px;">
            <div class="body nointernet">No Internet connection</div>
            <img src="/assets/icons/dashboard/Placeholder.svg" class="leftImg"/>
            <img src="/assets/icons/dashboard/Placeholder.svg" class="rightImg"/>
          </div>
        </section>
      </div>
    );
  }
}
