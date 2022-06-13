import { h } from 'preact';
// modified by Vihang
// modified at 06/05/2022
// modification : task status tag and subscribe button added

// modified by Vihang
// modified at 12/05/2022
// modification : display name and description removed

// modified by Vihang
// modified at 17/05/2022
// modification : task header icon changed
const TaskListDetailHeader = (props) => {
  return (
    <div>
      <div class="display-flex justify-between">
        {props.typeOfWorkspace ?
          <p class="display-flex align-center">
            <span style="margin-left: -4px;">
              <img src="/assets/images/taskHeader.png" width="34" height="34"/>
            </span>
            <div class="display-flex flex-direction-column m-l-10">
              {props.typeOfWorkspace === 'inboxWorkspace' &&
                <span class="fw-600 fs-12 m-r-10">{props.currentRow.uniqueID ? props.currentRow.uniqueID : ''}</span>
              }
              {props.typeOfWorkspace === 'visitWorkspace' &&
                <span class="fw-600 fs-12 m-r-10">{props.currentRow.caseID ? props.currentRow.caseID : ''}</span>
              }
              <div class="display-flex">
                {props.typeOfWorkspace === 'callsWorkspace' ?
                  <span>{props.currentRow.typeOfCall ? props.currentRow.typeOfCall : ''}</span>
                  :
                  props.typeOfWorkspace === 'inboxWorkspace' ?
                    <span>{props.currentRow.message ? props.currentRow.message : ''}</span>
                    :
                    <span> {props.currentRow.displayName}</span>
                }
                { /*props.currentRow.description &&
                  <div class="tooltip m-l-5">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                    <span class="tooltiptext fs-12">{props.currentRow.description}</span>
                  </div>
                }*/}
              </div>
            </div>
          </p>
          :
          <p class="display-flex align-center">
            {/*
                  modified by Vihang
                  modified at 17/05/2022
                  modification : loading issue for task icon solved
            */}
            {props.currentRow.uniqueID &&
              <span style="margin-left: -4px;">
                <img class="TaskListDetailHeaderIcon" src="/assets/images/taskHeader.png" width="34" height="34"/>
              </span>
            }
            <div class="display-flex flex-direction-column m-l-10">
              <span class="fw-600 fs-12 m-r-10">{props.currentRow.uniqueID}</span>
              <div class="display-flex">
                {/* <span class="TaskListDetailHeaderDisplayName is-hide-mobile"> {props.currentRow.displayName}</span>
                {props.currentRow.description &&
                  <div class="tooltip m-l-5 is-hide-mobile">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                    <span class="tooltiptext fs-12">{props.currentRow.description}</span>
                  </div>
                }*/}
              </div>
            </div>
          </p>
        }
        <div class="is-hide-mobile align-self-center">
          {(props.currentRow.containerType === 'Checklist' || props.currentRow.containerType === 'Select Cars') &&
          <div class='m-r-10 align-self-center h-fit-content tasks-tags border-blue'>
            <div class="display-flex flex-direction-column fs-10">
              <p class=" first-letter-capital">Daily Task</p>
            </div>
          </div>
          }
          {props.currentRow.branchName &&
            <div class='m-r-10 align-self-center h-fit-content tasks-tags border-blue'>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">{props.currentRow.branchName}</p>
              </div>
            </div>
          }
          {props.currentRow.departmentName &&
            <div class='align-self-center h-fit-content tasks-tags border-blue'>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">{props.currentRow.departmentName}</p>
              </div>
            </div>
          }
          {/*
            // modified by Vihang
            // modified at 28/04/2022
            // modification : enquiry follow up and enquiry for pdf buttons
            */}
          {(props.currentRow.displayName === "Fill Enquiry Form" && props.currentRow.status === "Completed" ) && (
            <div class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadEnquiryForm()}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Download Enquiry Form</p>
              </div>
            </div>
          )}
          {(props.currentRow.displayName === "Quotation" && props.currentRow.status === "Completed" ) && (
            <div class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadProformaInvoice()}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Send Quotation</p>
              </div>
            </div>
          )}
          {(props.currentRow.displayName === "Fill Booking Form" && props.currentRow.status === "Completed" ) && (
            <div class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadDocket()}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Download Docket</p>
              </div>
            </div>
          )}
          {(props.currentRow.displayName === "Fill Booking Form" && props.currentRow.status === "Completed" ) && (
            <div class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadDocket('email')}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Send Docket via mail</p>
              </div>
            </div>
          )}
          {(props.currentRow.displayName === "Policy Cancellation" && props.currentRow.status === "Completed" ) && (
            <div class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadPolicyCancellation()}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Download Cancellation Letter</p>
              </div>
            </div>
          )}
          {(props.currentRow.displayName === "Policy Cancellation" && props.currentRow.status === "Completed" ) && (
            <div class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadPolicyCancellation('email')}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Send Cancellation Letter via mail</p>
              </div>
            </div>
          )}
          {/*(props.currentRow.displayName === "Fill Booking Form" && props.currentRow.status === "Completed" && props.currentRow['dynamicProperties_isSpecialNumberRequired'] === "yes" ) && (
            <div title="Download Special Number Undertaking" class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadUndertakingForSpecialNumber()}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Spcl No.</p>
              </div>
            </div>
          )}
          {(props.currentRow.displayName === "Fill Booking Form" && props.currentRow.status === "Completed" ) && (
            <div title="Download Insurance Undertaking" class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadUndertakingForNewCarInsurance()}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Insurance</p>
              </div>
            </div>
          )}
          {(props.currentRow.displayName === "Fill Booking Form" && props.currentRow.status === "Completed" ) && (
            <div title="Download Price Change Undertaking" class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadUndertakingForPriceChangeConfirmation()}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Price Change</p>
              </div>
            </div>
          )*/}
          {(props.currentRow.displayName === "Finance Enquiry" && props.currentRow.status === "Completed" ) && (
            <div title="Download Price Change Undertaking" class='m-l-10 align-self-center h-fit-content tasks-tags border-blue' onClick={(e)=> props.DownloadFinanceQuotation()}>
              <div class="display-flex flex-direction-column fs-10">
                <p class=" first-letter-capital">Download Quotation</p>
              </div>
            </div>
          )}
        </div>
        {/*
              modified by Vihang
              modified at 05/05/2022
              modification : subscribe button on header tag
        */}
        {props.answeredCount && props.taskCheckListItems && (
          <span class="align-self-center m-l-5 answeredCount tasks-tags border-green h-fit-content fs-10 p-t-b-4-l-r-8"> { "Completed " + props.answeredCount + "/"  + props.taskCheckListItems.length } </span>
        )}
        <button class="align-self-center primary-border- m-l-5 fs-10">Subscribe</button>
      </div>
    </div>
  );
};

export default TaskListDetailHeader;
