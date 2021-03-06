import { h, Component } from 'preact';

// modified by Vihang
// modified on 19/02/2022
// modification: toast1 working class added new logo for slow internet

export default class SlowInternetSpeed extends Component {

  refreshPage() {
    location.reload();
  }

  render({}, {}) {
    return (
      <div class="online-offline row">
        <section class="col-xs-6">
          <div class="toast1 displayed" style="bottom: 0px;">
            <div class="body nointernet display-flex justify-center">
              <svg class="leftImg" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M12,4C7.31,4,3.07,5.9,0,8.98L12,21l5-5.01V8h5.92C19.97,5.51,16.16,4,12,4z"/><rect height="2" width="2" x="19" y="18"/><rect height="6" width="2" x="19" y="10"/></g></g></svg>
              <p class="m-l-10">Your internet connection seems slow.</p>
            </div>
            {/* <img src="/assets/icons/dashboard/Placeholder.svg" class="leftImg" style="top:13px; width:15px;" />
            <img src="/assets/icons/dashboard/Placeholder.svg" class="rightImg" style="top:13px; width:15px;" /> */}
          </div>
        </section>
      </div>
    );
  }
}
