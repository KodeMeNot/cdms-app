import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { getItem, setItem, removeAll } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import { formatDateTime, getFormattedAmount, applyAclForFeedAndChat } from '../../lib/utils';
import { Popup, PopupBody } from '../../components/popup';
import Axios from 'axios';
import { getInitials, getDay, getMonth } from '../../lib/utils';
import ListSingleCard from '../../components/listSingleCard';
import { NewPopupModal, NewPopupModalBody } from '../../components/newPopupModal';
import LinearProgress from 'preact-material-components/LinearProgress';
import moment from "moment";
import TaskListDetailHeader from "../../components/taskListDetailHeader";
import TaskListDetailTags from "../../components/taskListDetailTags";
import toastr from "toastr";
import { CountUp } from 'countup.js';

const VisitSemiDetailView = (props) => {
  let userInfo = getItem('userinfo');
  const todaysDate = new Date();
  let [activeFilter, setActiveFilter] = useState('');
  let [currentRow, setCurrentRow] = useState({});
  let [activePageTabItem, setActivePageTabItem] = useState('TASKS TO DO');
  let [isOpenFormPopover, setIsOpenFormPopover] = useState(false);
  let [contactDetails, setContactDetails] = useState({});
  let [currentAction, setCurrentAction] = useState({});
  let [isFormUpdated, setIsFormUpdated] = useState(false);
  let [isCallModelOpen, setIsCallModelOpen] = useState(false);

  {/*modified by Vihang
     modifield on 16/05/2022
     modification: toaster show timer increased to 600ms
  */}
  useEffect(()=>{
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-bottom-left",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "600",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "slideDown",
      "hideMethod": "slideUp"
    };
  },[]);

  useEffect(async () => {
    console.log("propssssssssssssssssssssssss",props.currentRow);
    setCurrentRow(props.currentRow);
    if (props.currentRow && props.currentRow.contactID) {
      setContactDetails(props.currentRow.contactDetails);
    }
  },[props]);

  async function originateCall(row) {
    axios.post(`${CONSTANTS.API_URL}/api/v1/originateCall`,{
      userID: "a7b885b4-037c-4be3-a8fe-73016926193e",
      mobileNumber: "7755979535",
      taskID: "2c627954-8759-4569-90aa-44988d047c60"
    });
  }

  function toggleIsCallModelOpenModelPopupVisibility() {
    setIsCallModelOpen(!isCallModelOpen);
  }

  return (
    <div>
      <div class='row'>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
          <div class="overflow-hidden pos-relative h-full-vh">
            {
              currentRow && (currentRow.containerType !== "") && (
                <div>
                  <div class='semi-detail-tags cursor-pointer m-t-0 p-t-10'>
                    <div class='row w-full'>
                      <div class="col-xs-12 p-l-0">
                        <TaskListDetailHeader currentRow={currentRow} typeOfWorkspace={props.typeOfWorkspace} />
                      </div>
                    </div>
                  </div>
                  <div class="row w-full h-auto">
                    <div class="col-xs-12 p-l-0 display-flex">
                      <TaskListDetailTags currentRow={currentRow} typeOfWorkspace={props.typeOfWorkspace} />
                    </div>
                  </div>
                  {(currentRow && currentRow.uuid) &&
										<div class="Overviewworkshop col-xs-12 col-sm-12 col-md-12 col-lg-12">
	                    <div class="row p-t-10 semi-detail-summary">
	                      <div class="col-xs-12 p-l-0 p-r-0">
										      {currentRow && currentRow.typeOfCall && (
										        <div class="col-xs-12 p-l-0 p-r-0">
										          <div class="card text-dark pos-relative p-10 m-l-15 m-r-15 m-t-15" onClick={(e)=> toggleIsCallModelOpenModelPopupVisibility()} style="height:auto">
										            <div class="display-flex m-t-10">
										              <div class="display-flex flex-direction-column align-center" style="width:30%;border-right: 0.5px solid lightgray;">
										                <span><img src="/assets/images/femaleicon.svg" width="30" height="30" /></span>
										                <span>{currentRow.callerName}</span>
										                <span class="fs-10 first-letter-capital">{currentRow.typeOfCall === 'Outgoing' ? currentRow.callerDesignation : currentRow.callerProfession}</span>
										              </div>
										              <div class="display-flex flex-direction-column align-center m-t-10 justify-space-around" style="width:40%;justify-content: space-around">
										                <div>
										                  <span class="fs-12">Called At</span>
										                </div>
										                <span class="m-t-10">{moment(currentRow.starttime).format('LLLL')}</span>
										              </div>
										              <div class="display-flex flex-direction-column align-center" style="width:30%;border-left: 0.5px solid lightgray;">
										                <span><img src="/assets/images/femaleicon.svg" width="30" height="30" /></span>
										                <span>{currentRow.receiverName ? currentRow.receiverName : 'Unknown'}</span>
										                <span class="fs-10 first-letter-capital">{currentRow.typeOfCall === 'Outgoing' ? currentRow.receiverProfession : currentRow.receiverDesignation}</span>
										              </div>
										            </div>
										            <div>
										              <div class="display-flex p-t-10 m-t-20" style="border-top: 0.5px solid lightgrey;">
										                <span>Comments/Remarks:</span>
										              </div>
										              <div class="display-flex">
										                <span class="m-t-5 fs-12">{currentRow.remarks ? currentRow.remarks : 'No remarks'}</span>
										              </div>
										            </div>
										          </div>
	                          </div>
										      )}
	                      </div>
	                    </div>
	                    <div class="row semi-detail-footer">
	                      <div class="col-xs-12">
	                        {currentRow && (currentRow.containerType === "Form and Approval" || currentRow.containerType === "Approval") &&
	                          <button onclick={(e) => toggleFormPopover(e)} class="primary-button m-t-20 m-b-20 float-right">{currentRow && currentRow.displayName}</button>
	                        }
	                      </div>
	                    </div>
	                  </div>
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
      {isCallModelOpen && (
        <div class='orgChartModal'>
          <div id="modelCaseModal" style="display:block;" class="org-chart-modal">
            <div class="org-chart-modal-content org-chart-width">
              <div>
                <div class="org-chart-modal-header">
                  <span class="org-chart-close" onClick={(e) => toggleIsCallModelOpenModelPopupVisibility(e)}>&times;</span>
                </div>
                <div class="org-chart-modal-body background-transparent">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                          <img src="/assets/images/undraw_Order_ride_re_372k.svg" class="wizard-imgs" alt="" />
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-t-5 display-flex justify-center flex-column">
                      <div class="m-b-10">
                        <div class="p-b-10" >
                          {currentRow.recordlink && (
                            <audio src = {"http://114.143.17.132:6751" + currentRow.recordlink.split("192.168.55.2:6751")[1]} controls />
                          )}
                        </div>
                      </div>
                      <div class="m-b-10">
                        <div class="p-b-10" >
                          <input type="text" id="name" placeholder="Comment" />
                        </div>
                      </div>
                      <div class="m-b-10">
                        <div class="fw-600 fs-1rem p-b-10" >
                          <span class="w-full full-width-button"
                          //onClick={(e) => {console.log("clicke"); }}
                          >Objection</span>
                        </div>
                      </div>
                      <div class="m-b-10">
                        <div class="fw-600 fs-1rem p-b-10" >
                          <span class="w-full full-width-button"
                          //onClick={(e) => {console.log("clicke"); }}
                          >Appreciate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitSemiDetailView;
