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

const CourierSemiDetailView = (props) => {
  console.log(props,"pppppppppppppppppppp");
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
                  {/*
                    Modification: Replaced the UI with courierCaseDetails ListSingleCard template
                    By: Devang
                    Date: 27/05/2022
                  */}
                  {(currentRow && currentRow.uuid) &&
                    <div class="col-xs-12 p-l-0 p-r-0">
                      <ListSingleCard taskData={currentRow} typeOfCard={'courierCaseDetails'} caseIcon={<img src="/assets/images/folder.png" class="h-full w-full" />} stageIcon={<img src="/assets/images/folder.png" class="h-full w-full" />} />
                    </div>
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourierSemiDetailView;
