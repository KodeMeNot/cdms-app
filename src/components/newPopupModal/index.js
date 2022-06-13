// modified by Vihang
// modifield on 18/02/2022
// modfication:created newpopup modal

/*
  Modified By: Vihang
  Modified On: 23 May 2022
  Modification: enquiry form modal mobile responsive changes
*/
export const NewPopupModal = ({ onClose, title,modalHeight, modalDisplay,children,modalWidth,modalScroll, classes}) => {
  return (

    <div class='orgChartModal'>
      <div id="formModal" className={"org-chart-modal " + modalDisplay}>
        { /* Modified By: Vihang
      Modified On: 16 March 2022
      Modification: added new width props
      */}
        <div class={`card org-chart-modal-content org-chart-width ${classes ? classes : ""}`} id='courierModal' style={`height:95%;width:${modalWidth};padding:0;`}>
          {/*<div style="position:sticky">*/}
          <div class="right-drawer-label" onClick={onClose}>
            <div class="right-drawer-close-btn" title="Close">
              <div class="right-drawer-close-btn-inner" />
            </div>
          </div>
          {/*</div>*/}
          <div style={`height:100%;border-radius:8px; position:relative; ${modalScroll ? "overflow:hidden auto" : ""}`}>
            {children}
          </div>
        </div>
      </div>
    </div>

  );
};

export const NewPopupModalBody = ({children}) => {
  return (
    <div class="org-chart-modal-body background-transparent">
      {children}
    </div>

  );
};
