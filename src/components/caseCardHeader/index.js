export const CaseCardHeader = (props) => {

    // function changeActiveTabCard(tabName) {
    //   props.changeActiveTab(tabName);
    // }

    // modified by Vihang
    // modifield on 14/03/2022
    // modification:changes in tooltip message div and minor changes 

    return (
      <div class={`newWorkSpaceCard pos-relative ${props.activePageTabItem === props.activeTab ? 'listCard' : ''}`} 
      //onClick={() => changeActiveTabCard(props.activeTab)}
        style={`background:${props.cardBgColor};height:${props.cardHeight};`}>
        <div class="p-t-0 p-b-0 display-flex flex-direction-column h-full" >
          {
            props.cardText && (
              <div>
              <div className="display-flex flex-direction-column p-l-0">
            <div class="display-flex align-center">
              <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer"  onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
            ;">
              <div class ="display-flex align-center"
        >
                <p>Vehicle</p> 
                <span class="tooltip m-l-5" style="with:15px; height:15px;">
                  <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                  <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
                </span> 
              </div>
            <span>&#8377;15,00,000</span>
            </span>
            { props.status && (
            <p class="m-l-10">Status</p>
            )
          }
          </div>
      <div class ="display-flex align-center m-t-10">
        <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white
        ;">
          <div class ="display-flex align-center">
            <p>Used Cars</p> 
            <span class="tooltip m-l-5" style="with:15px; height:15px">
              <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
              <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
            </span> 
          </div>
        <span>&#8377;0</span>
        </span>
      { props.status && (
        <p class="m-l-10">Status</p>
        )
      }
      </div>

    <div class ="display-flex align-center m-t-10">
      <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
      ;">
        <div class ="display-flex align-center">
          <p>Accessories</p> 
          <span class="tooltip m-l-5" style="with:15px; height:15px">
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
            <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
          </span> 
        </div>
      <span>&#8377;15,00,000</span>
      </span>
      { props.status && (
        <p class="m-l-10">Status</p>
        )
      }
    </div>

    <div class ="display-flex align-center m-t-10">
      <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
      ;">
        <div class ="display-flex align-center">
          <p>VAS</p> 
          <span class="tooltip m-l-5" style="with:15px; height:15px">
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
            <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
          </span> 
        </div>
      <span>&#8377;15,000</span>
      </span>
      { props.status && (
        <p class="m-l-10">Status</p>
        )
      }
    </div>
    <span class="fs-12 m-l-5 m-t-10 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#4ccbd0;color:white
    ;">
      <div class ="display-flex align-center">
        <p class="fs-15">Total</p> 
  
      </div>
     <span class="fs-15">&#8377;15,00,000</span>
    </span>
    
    <div class ="display-flex align-center m-t-20">
      <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
        <div class ="display-flex align-center">
          <p>Cash Discount</p> 
          <span class="tooltip m-l-5" style="with:15px; height:15px">
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
            <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
          </span> 
        </div>
      <span>&#8377;15,00,000</span>
      </span>
      { props.status && (
        <p class="m-l-10">Status</p>
        )
      }
    </div>
    <div class ="display-flex align-center m-t-10">
      <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
        <div class ="display-flex align-center">
          <p>Corporate TCS Discount</p> 
          <span class="tooltip m-l-5" style="with:15px; height:15px">
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
            <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
          </span> 
        </div>
      <span>&#8377;250,000</span>
      </span>
      { props.status && (
        <p class="m-l-10">Status</p>
        )
      }
    </div> 
    <div class ="display-flex align-center m-t-10">
      <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
        <div class ="display-flex align-center">
          <p>Exchange bonus</p> 
          <span class="tooltip m-l-5" style="with:15px; height:15px">
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
            <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
          </span> 
        </div>
      <span>&#8377;25000</span>
      </span>
      { props.status && (
        <p class="m-l-10">Status</p>
        )
      }
    </div>

    <div class ="display-flex align-center m-t-10">
      <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
        <div class ="display-flex align-center">
          <p>Loyalty Bonus</p> 
          <span class="tooltip m-l-5" style="with:15px; height:15px">
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
            <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
          </span> 
        </div>
      <span>&#8377;15,00,000</span>
      </span>
      { props.status && (
        <p class="m-l-10">Status</p>
        )
      }
    </div>
    <div class ="display-flex align-center m-t-10">
      <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
        <div class ="display-flex align-center">
          <p>Festive Offer</p> 
          <span class="tooltip m-l-5" style="with:15px; height:15px">
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
            <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
          </span> 
        </div>
      <span>&#8377;15,00,000</span>
      </span>
      { props.status && (
        <p class="m-l-10">Status</p>
        )
      }
    </div>

              </div>
              <div class="cursor-pointer m-l-5 m-t-10" style="width:80%;background:#4ccbd0;border-radius: 8px;
    display: flex;
    padding:5px;
    justify-content: space-between;"  onClick={(e) => props.togglePriceBreakup(e)}>
                <span class="fs-15 color-white">Total:</span>
              <span class="fs-15 f-w-600 color-white" style="align-self: baseline;letter-spacing: 0.8px;">&#8377;15,00,000</span>
              </div>
              <div class="cursor-pointer m-l-5 m-t-10" style="width:80%;
    background:#6799b0;
    border-radius: 8px;
    display: flex;
    padding:5px;
    justify-content: space-between;"  onClick={(e) => props.togglePriceBreakup(e)}>
                <span class="fs-15 color-white">Received Payment</span>
              <span class="fs-15 f-w-600 color-white" style="align-self: baseline;letter-spacing: 0.8px;">&#8377;10,00,000</span>
              </div>
              <div class="cursor-pointer m-l-5 m-t-10" style="width:80%;
    background:#74FAC8;
    border-radius: 8px;
    display: flex;
    padding:5px;
    justify-content: space-between;"  onClick={(e) => props.togglePriceBreakup(e)}>
                <span class="fs-16 color-white">Grand Total:</span>
              <span class="fs-16 f-w-600 color-white" style="align-self: baseline;letter-spacing: 0.8px;">&#8377;5,00,000</span>
              </div>
              <div class="display-flex m-t-10 align-center">
            <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" onClick={(e) => props.togglePriceBreakup(e)} style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
            ;">
            <div class ="display-flex align-center">
              <p>Finance</p> 
                <span class="tooltip m-l-5" style="with:15px; height:15px">
                  <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                  <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                      <div class="display-flex flex-direction-column p-l-5 p-r-5">
                        <div class="display-flex space-between">
                          <p>RTO ₹ </p> 
                          <p>₹ 1,27,400</p> 
                        </div>
                        <div class="display-flex space-between">
                          <p>Total Registration Charges</p> 
                          <p> ₹ 1,27,400</p> 
                        </div>
                      </div>
                  </div>
                </span> 
              </div>
              <span>&#8377;15,00,000</span>
              </span>
              { props.status && (
        <p class="m-l-10">Status</p>
        )
      }
              </div>
              </div>
              
            )
          }
           {
            props.cardTextVariant && (
              <p class="fs-12" style="align-self: baseline;">{props.cardTextVariant}</p>
            )
          }
          {
            props.cardCount && (
              <h1 class="fs-30 f-w-600" style="align-self: baseline;">{props.cardCount}</h1>
            )
          }

          {
            props.cardText1 && (
              <p class="fs-11 f-w-600" style="align-self: baseline;"><span>{props.cardText1}</span>
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
