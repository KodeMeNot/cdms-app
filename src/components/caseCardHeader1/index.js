export const CaseCardHeader1 = (props) => {

  // function changeActiveTabCard(tabName) {
  //   props.changeActiveTab(tabName);
  // }

  return (
    <div class={`newWorkSpaceCard pos-relative cursor-pointer ${props.activePageTabItem === props.activeTab ? 'listCard' : ''}`} onClick={() => changeActiveTabCard(props.activeTab)}
      style={`background:${props.cardBgColor};height:${props.cardHeight};`} onClick = {(e) => props.togglePriceBreakup()}>
      <div class="p-t-0 p-b-0 display-flex h-full">
        {
          props.cardText && (
            <div className="display-flex flex-direction-column">
              <h1 class="fs-14 f-w-800 " style="align-self: baseline;letter-spacing: 0.08px;width:100px">{props.cardText}</h1>
              {
                props.cardTextVariant && (
                  // <div  class="display-flex" style="width: 120px;justify-content: space-between;">
                  <p class="fs-12 ">{props.cardTextVariant}</p>
                  // </div>
                )
              }
              {/* <div class="display-flex" style="width: 54%;justify-content:end;align-self: self-end;">
                <input class="fs-10" style="display: block; width: 56px; height: 28px; border-radius: 15px;border:-0.2px solid #696d76" type="number" id="quantitycar" name="quantitycar" min="1" max="100" placeholder="Qty:1"/>
                <span class="fs-10 f-w-600 m-l-10" style="border-radius: 20px; color: white;padding: 5px 10px;background: #4ccbd0;align-self: center;">Booked</span>
                <span class="fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;align-self: center;">Ordered</span>
              </div> */}
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
            <p class="fs-11 m-l-10"><span>{props.cardText2}</span>
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
