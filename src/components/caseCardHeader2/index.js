export const CaseCardHeader2 = (props) => {

    function changeActiveTabCard(tabName) {
      props.changeActiveTab(tabName);
    }

    return (
      <div class={`newWorkSpaceCard pos-relative ${props.activePageTabItem === props.activeTab ? 'listCard' : ''}`} onClick={() => changeActiveTabCard(props.activeTab)}
        style={`background:${props.cardBgColor};height:${props.cardHeight};`}>
        <div class="p-t-0 p-b-0 display-flex justify-between flex-direction-column h-full">
          {
            props.cardText && (
              <div className="display-flex" style="justify-content: space-between;">
              <h1 class="fs-20 f-w-800 " style="align-self: baseline;letter-spacing: 0.08px;">{props.cardText}</h1>
              <div class="display:flex;flex-direction-column">
              <span class="fs-12 f-w-600" style="border-radius:20px;color:#fff;padding:5px;background:#449de0">Sales Executive </span>
              </div>
              </div>
            )
          }
          <div style="display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 19px;">
          <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path></svg>
          <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
          </div>
           {
            props.cardTextVariant && (
              <div  class="display-flex" style="width: 100%;justify-content: space-between; align-self: self-end">
              <p class="fs-12 m-t-5">{props.cardTextVariant}</p>
              <div class="display-flex flex-direction-column fs-10  m-r-32" style="border-radius: 8px;
      color: #444444;
      padding: 5px;
      right: 26px;
      position: absolute;
      bottom: -2px;
      line-height:2.2">
                <span>Approx. DD Of Delivery</span>
                <span class=" fs-13 " style="align-self:left;">22nd March,2022</span>
                </div>

              </div>
            )
          }
          {
            props.cardCount && (
              <h1 class="fs-30 f-w-600 m-t-8" style="align-self: baseline;">{props.cardCount}</h1>
            )
          }

          {
            props.cardText1 && (
              <p class="fs-11 f-w-600 m-t-2" style="align-self: baseline;"><span>{props.cardText1}</span>
              </p>
            )
          }
          {
            props.cardText2 && (
              <p class="fs-11 m-t-2" style="align-self: baseline;"><span>{props.cardText2}</span>
              </p>
            )
          }
          {
            props.cardText3 && (
              <p class="fs-11 f-w-600 m-t-2" style="align-self: baseline;"><span>{props.cardText3}</span>
              </p>
            )
          }


        </div>
        <span class="pos-absolute" style="right: 0px;bottom: 0px;">
          {props.cardIcon}
        </span>
      </div>
    );
  };
