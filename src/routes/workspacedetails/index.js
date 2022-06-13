import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import { route } from "preact-router";
import Dayplanworkspace from "../../components/dayplanworkspace";
import SemiDetailView from "../../components/semiDetailView";
import CallsSemiDetailView from "../../components/callsSemiDetailView";
import CourierSemiDetailView from "../../components/courierSemiDetailView";
import VisitSemiDetailView from "../../components/visitSemiDetailView";
import InboxSemiDetailView from "../../components/inboxSemiDetailView";
import Callsworkspace from "../../components/callsworkspace";
import Inboxworkspace from "../../components/inboxworkspace";
import Courierworkspace from "../../components/courier";
import Visitworkspace from "../../components/visitWorkspace";
import { Modal, ModalBody } from '../../components/rightDrawer';
import { setItem, getItem, removeAll } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import { getInitials, getDay, getMonth } from '../../lib/utils';
import {RightInfoPanel} from "../../components/rightInfoPanel";
import MobileBottomNavigation from '../../components/mobileBottomNavigation';
/*
          modified by Vihang
          modified at 13/05/2022
          modification : mobile bottom Navigation fo workspace detail pages
    */
const Workspacedetails = (props) => {
  let userInfo = getItem('userinfo');

  let [selectedAction, setSelectedAction] = useState("");
  let [userDisplayName, setUserDisplayName] = useState(userInfo.displayName);
  let [userRoleName, setUserRoleName] = useState(userInfo.userRoleName ? userInfo.userRoleName : '');
  let [userBranchName, setUserBranchName] = useState(userInfo.userBranchName ? userInfo.userBranchName : '');
  let [currentRow, setCurrentRow] = useState({});
  let [newNotification, setNewNotification] = useState(false);
  let [isFormUpdated, setIsFormUpdated] = useState(false);
  let [updateNextTask, setUpdateNextTask] = useState(false);
  let [showSemiDetailView,setShowSemiDetailView] = useState(false);

  useEffect(() => {
    setSelectedAction(props.type);
    console.log(props.type, 'props.typeprops.typeprops.typeprops.type');
  },[props.type]);

  useEffect(() => {
    setCurrentRow(currentRow);
  },[isFormUpdated]);

  async function toggleTaskEdit(row, nextRow) {
    console.log("rrrrrrrrrr",row, nextRow);
    if (selectedAction === "dayPlanWorkspace") {
      let current = getItem("currentRowID");
      let taskDetails = await axios.get(`${CONSTANTS.API_URL}/api/v1/taskDetails?taskID=${current.uuid}`);
      if (taskDetails.data) {

        await setCurrentRow(taskDetails.data);
        // await setItem("currentRowID", row);
        // if (nextRow) {
        //   await setItem("nextRowID", nextRow);
        // }
        await setUpdateNextTask(!updateNextTask);
        await setIsFormUpdated(!isFormUpdated);
      }
    } else {
      await setCurrentRow(row);
      console.log(row, 'rowwwwwwwwwwwwwwwwwwwwwwwwww');
      await setIsFormUpdated(!isFormUpdated);
    }
  }

  {/*
          modified by Vihang
          modified at 04/05/2022
          modification : responsive changes for dayplan view
    */}
  function triggerNotifications(e) {
    // e.preventDefault();
    setNewNotification(!newNotification);
  }
  console.log(selectedAction, 'selectedActionselectedActionselectedAction');
  return (
    <div class="mainBodyContainer" style="overflow: hidden">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 p-r-0">
          {selectedAction === "callsWorkspace" && <Callsworkspace toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} />}
          {selectedAction === "inboxWorkspace" && <Inboxworkspace toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} />}
          {selectedAction === "courierWorkspace" && <Courierworkspace toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} />}
          {selectedAction === "visitWorkspace" && <Visitworkspace toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} />}

          {(selectedAction === "dayPlanWorkspace" && !showSemiDetailView) && <Dayplanworkspace toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} updateNextTask={updateNextTask} showSemiDetailView={showSemiDetailView} setShowSemiDetailView={setShowSemiDetailView} />}
          {(currentRow && currentRow.uuid && selectedAction === "dayPlanWorkspace" && showSemiDetailView) && <SemiDetailView currentRow={currentRow} typeOfWorkspace="dayPlanWorkspace" toggleTaskEdit={toggleTaskEdit} updateNextTask={updateNextTask} triggerNotifications={e => triggerNotifications(e)}  setShowSemiDetailView={setShowSemiDetailView}/>}
          {/*
                    modified by Vihang
                    modified at 13/05/2022
                    modification : mobile bottom Navigation fo workspace detail pages
              */}
          <MobileBottomNavigation props={props} />
        </div>
        <div class="is-hide-mobile col-sm-9 col-md-7 col-lg-7 p-r-0">
          {(currentRow && currentRow.uuid && selectedAction === "dayPlanWorkspace") && <SemiDetailView currentRow={currentRow} typeOfWorkspace="dayPlanWorkspace" toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} setShowSemiDetailView={setShowSemiDetailView} />}
          {currentRow && currentRow.uuid && selectedAction === "callsWorkspace" && <CallsSemiDetailView currentRow={currentRow} typeOfWorkspace="callsWorkspace" toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} />}
          {currentRow && currentRow.uuid && selectedAction === "courierWorkspace" && <CourierSemiDetailView currentRow={currentRow} typeOfWorkspace="courierWorkspace" toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} />}
          {currentRow && currentRow.uuid && selectedAction === "inboxWorkspace" && <InboxSemiDetailView currentRow={currentRow} typeOfWorkspace="inboxWorkspace" toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} />}
          {currentRow && currentRow.uuid && selectedAction === "visitWorkspace" && <VisitSemiDetailView currentRow={currentRow} typeOfWorkspace="visitWorkspace" toggleTaskEdit={toggleTaskEdit} triggerNotifications={e => triggerNotifications(e)} />}
        </div>
        <div class="col-xs-0 col-sm-0 col-md-2 col-lg-2 right-info-panel-container" style="width:100%; padding: 0" >
          <RightInfoPanel newNotification={newNotification} />
        </div>
      </div>
    </div>
  );
};

export default Workspacedetails;
