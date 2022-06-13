import { h, Component } from 'preact';
import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import { route } from "preact-router";
import { CountUp } from 'countup.js';
import moment from "moment";
import { getItem, removeAll } from '../../lib/myStore';
import { getInitials, getDay, getMonth } from '../../lib/utils';
import CONSTANTS from '../../lib/constants';
import {Notification} from "../notification";
import Profilemodal from "../../components/profilemodal";
import { Modal, ModalBody } from '../../components/rightDrawer';
import Icons from "../icons";

export const RightInfoPanel = (props) => {
  let iconClass = 'primary'; // primary, secondary, soft-red
  let userInfo = getItem('userinfo');
  const todaysDate = new Date();
  let [isProfileDetailOpen,setProfileDetailVisibility]= useState(false);
  let [isVisitModalOpen, setVisitModalVisibility] = useState(false);
  let [isCourierModalOpen, setCourierModalVisibility] = useState(false);
  let [newNotification, setNewNotification] = useState(false);
  let [userDisplayName, setUserDisplayName] = useState(userInfo.displayName);
  let [userBranchName, setUserBranchName] = useState(userInfo.userBranchName ? userInfo.userBranchName : '');
  let [userRoleName, setUserRoleName] = useState(userInfo.userRoleName ? userInfo.userRoleName : '');
  let [userDesignation, setUserDesignation] = useState(userInfo.userDesignation ? userInfo.userDesignation : '');
  let [notificationList, setNotificationList] = useState([]);

  useEffect(async()=>{
    // let taskToDoElement = document.getElementById("summaryTaskToDo");
    // taskToDoElement.innerText = "0";
    // let taskToTrackElement = document.getElementById("summaryTaskToTrack");
    // taskToTrackElement.innerText = "0";

    // let taskTaskCompletedElement = document.getElementById("summaryTaskCompleted");
    // taskTaskCompletedElement.innerText = "0";

    // let summaryIncomingCallsElement = document.getElementById("summaryIncomingCalls");
    // summaryIncomingCallsElement.innerText = "0";


    // let summaryOutgoingCallsElement = document.getElementById("summaryOutgoingCalls");
    // summaryOutgoingCallsElement.innerText = "0";

    // let summaryMissedCallsElement = document.getElementById("summaryMissedCalls");
    // summaryMissedCallsElement.innerText = "0";
  }, []);

  useEffect(() => {
    let CountUpOptions = {
      duration: 3,
      startVal: 0
    };

    let taskToDoElement = document.getElementById("summaryTaskToDo");
    const countUpToDo = new CountUp(taskToDoElement,0,CountUpOptions);
    countUpToDo.start();

    let taskToTrackElement = document.getElementById("summaryTaskToTrack");
    const countUpToTrack = new CountUp(taskToTrackElement,0,CountUpOptions);
    countUpToTrack.start();

    let taskTaskCompletedElement = document.getElementById("summaryTaskCompleted");
    const countUpTaskCompleted = new CountUp(taskTaskCompletedElement,0,CountUpOptions);
    countUpTaskCompleted.start();

    let summaryIncomingCallsElement = document.getElementById("summaryIncomingCalls");
    const countUpSummaryIncomingCalls = new CountUp(summaryIncomingCallsElement,0,CountUpOptions);
    countUpSummaryIncomingCalls.start();

    let summaryOutgoingCallsElement = document.getElementById("summaryOutgoingCalls");
    const countSummaryOutgoingCalls = new CountUp(summaryOutgoingCallsElement,0,CountUpOptions);
    countSummaryOutgoingCalls.start();

    let summaryMissedCallsElement = document.getElementById("summaryMissedCalls");
    const countUpSummaryMissedCalls = new CountUp(summaryMissedCallsElement,0,CountUpOptions);
    countUpSummaryMissedCalls.start();

    setTimeout(() => {
      let inbox = document.getElementsByClassName("flip-card-inner")[0];
      inbox ? inbox.style.transform = "rotateY(0deg)" : '';
    }, 10);
    getTaskData();
  }, []);

  async function getTaskData() {
    let taskResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/taskListCount`);
    let todoCount = await taskResponse.data.filter((task) => ((task.assignedUserID === userInfo.uuid) && task.status === "Pending"));
    let taskResponseTaskTrack = await axios.get(`${CONSTANTS.API_URL}/api/v1/taskListCount?type=taskTrack`);

    let taskToTrackDataRows = taskResponseTaskTrack.data;

    let completedCount = await taskResponse.data.filter((task) => (task.status.toLowerCase() === "completed"));

    let callsIncomingResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/callslist?typeOfCall=Incoming`);
    let incomingCalls = callsIncomingResponse.data.length;

    let callsOutgoingResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/callslist?typeOfCall=Outgoing`);
    let outgoingCalls = callsOutgoingResponse.data.length;

    let callsMissedCallResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/callslist?disposition=No answer`);
    let missedCalls = callsMissedCallResponse.data.length;
    setCounts(todoCount.length, taskToTrackDataRows.length, completedCount.length, incomingCalls, outgoingCalls, missedCalls);
  }

  async function setCounts(todoCount, toTrackCount, completedCount, incomingCalls, outgoingCalls, missedCalls) {
    let CountUpOptions = {
      duration: 3
    };

    let taskToDoElement = document.getElementById("summaryTaskToDo");
    const countUpToDo = new CountUp(taskToDoElement,todoCount,CountUpOptions);
    countUpToDo.start();

    let taskToTrackElement = document.getElementById("summaryTaskToTrack");
    const countUpToTrack = new CountUp(taskToTrackElement,toTrackCount,CountUpOptions);
    countUpToTrack.start();

    let taskTaskCompletedElement = document.getElementById("summaryTaskCompleted");
    const countUpTaskCompleted = new CountUp(taskTaskCompletedElement,completedCount,CountUpOptions);
    countUpTaskCompleted.start();

    let summaryIncomingCallsElement = document.getElementById("summaryIncomingCalls");
    const countUpSummaryIncomingCalls = new CountUp(summaryIncomingCallsElement, incomingCalls, CountUpOptions);
    countUpSummaryIncomingCalls.start();

    let summaryOutgoingCallsElement = document.getElementById("summaryOutgoingCalls");
    const countSummaryOutgoingCalls = new CountUp(summaryOutgoingCallsElement, outgoingCalls, CountUpOptions);
    countSummaryOutgoingCalls.start();

    let summaryMissedCallsElement = document.getElementById("summaryMissedCalls");
    const countUpSummaryMissedCalls = new CountUp(summaryMissedCallsElement, missedCalls, CountUpOptions);
    countUpSummaryMissedCalls.start();
  }

  useEffect(async () => {
    await getNotification();
  }, [newNotification, props.newNotification]);

  function handleNotification() {
    route('/workspacedetails/inboxWorkspace');
    setNewNotification(false);
  }

  function VisitModalVisibility(e) {
    e.preventDefault();
    setProfileDetailVisibility(true);
  }

  function closeProfileDetailModal(e) {
    e.preventDefault();
    setProfileDetailVisibility(false);
  }
  async function getNotification() {
    let notificationResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/notification?sortBy=createdAt&pageSize=10&pageNo=1`);
    await setNotificationList(notificationResponse.data);
  }
  const logout = async () => {
    let res = await axios.post(`${CONSTANTS.API_URL}/api/v1/logout`);
    let email = getItem('userinfo').email;
    await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'logout', typeOfVisit: 'success', email });
    if (res) {
      await removeAll();
      await route(`/`);
    }
  };

  return (
    <div style='width:100%'>
      <div class="" style='overflow: hidden;width:100%'>
        <div style='padding: 0 1rem; width:100%'>
          <div class="right-profile-box p-b-8 align-center">
            <div class='display-flex'>
              <div title="Click to view the notifications" class={`w-24px h-24px cursor-pointer ${newNotification ? "bell" : ""}`} onClick={(e)=> handleNotification()}>
                <div class={newNotification ? "bell-border" : ""} />
                <svg class={newNotification ? "btn-bell" : ""}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
              </div>
            </div>
            <span title="Click to view the workspace" class="cursor-pointer w-24px h-24px" onClick={() => route(`/workspace`)}>
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M6,15c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S4.9,15,6,15 M6,13c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S8.2,13,6,13z M12,5 c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S10.9,5,12,5 M12,3C9.8,3,8,4.8,8,7s1.8,4,4,4s4-1.8,4-4S14.2,3,12,3z M18,15 c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S16.9,15,18,15 M18,13c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S20.2,13,18,13z"/></g></g></svg>
            </span>
            <div class="display-flex justify-space-between">
              <div class="right-profile-name-box cursor-pointer" onClick={(e) => VisitModalVisibility(e)}>
                <p class="fs-12 first-letter-capital f-w-600">{userDisplayName.split(' ')[0]}</p>
                <p class="fs-10 first-letter-capital" style="text-align: end;">{userRoleName}</p>
              </div>
              <Icons userDisplayName={userDisplayName} title={userDisplayName} classes={`${iconClass} fs-10 m-0`}/>
            </div>
            <span class="cursor-pointer m-l-5 w-24px h-24px" onClick={() => logout()}>
              <em class="cursor-pointer icon icon-sign-out w-24px h-24px text-white fs-24" />
            </span>
          </div>
          <div class="calenderworkshop">
            <p class="fs-12 text-align-right text-white"><span> {userBranchName} Branch, </span><span>Pune</span></p>
          </div>
          <div class="calenderworkshop">
            <p class="fs-15 text-white"><span> {getDay(todaysDate)}, </span><span>{todaysDate.getDate()} {getMonth(todaysDate)}</span></p>
            <div class="workspacedate display-flex ">
              <div>
                <p class="fs-13 datecircletemp">30</p>
                <p class="display-flex fs-12 justify-center m-t-5">S</p>
              </div>
              <div>
                <p class="fs-13 datecircletemp">31</p>
                <p class="display-flex fs-12 justify-center m-t-5">M</p>
              </div>
              <div>
                <p class="fs-13 datecircletemp">01</p>
                <p class="display-flex fs-12 justify-center m-t-5">T</p>
              </div>
              <div>
                <p class="fs-13 datecircletemp">02</p>
                <p class="display-flex fs-12 justify-center m-t-5">W</p>
              </div>
              <div>
                <p class="fs-13 datecircletemp">03</p>
                <p class="display-flex fs-12 justify-center m-t-5">T</p>
              </div>
              <div>
                <p class="fs-13 datecircletemp">04</p>
                <p class="display-flex fs-12 justify-center m-t-5">F</p>
              </div>
              <div>
                <p class="fs-13 datecircletempActive">05</p>
                <p class="display-flex fs-12 justify-center m-t-5">S</p>
              </div>

            </div>
          </div>
          <div title="Click to view today's plan" class="cursor-pointer count-headerdayplan dayplanworkspace" data-label="DAY PLAN" onClick={(e)=>route('/workspacedetails/dayPlanWorkspace')}>
            <div class="dayplanworkspacetext display-flex" >
              <p style="width: 50px;"><img class="w-17px" src='/assets/images/add_task_white_24dp.svg' />
                <span id="summaryTaskToDo" class='p-l-5 p-r-5 fs-18 zoomOutAnimationNumber'/>
              </p>
              <p style="width: 50px;"><img class="w-17px" src='/assets/images/task_white_24dp.svg' />
                <span id="summaryTaskToTrack" class='p-l-5 p-r-5 fs-18 zoomOutAnimationNumber'/>
              </p>
              <p style="width: 50px;"><img class="w-17px" src='/assets/images/task_alt_white_24dp.svg' />
                <span id="summaryTaskCompleted" class='p-l-5 p-r-5 fs-18 zoomOutAnimationNumber'/>
              </p>
            </div>
          </div>
          <div title="Click to view call logs" class="cursor-pointer count-headercall callworkspace" data-label="CALLS" onClick={(e)=>route('/workspacedetails/callsWorkspace')}>
            <div class="dayplanworkspacetext display-flex" >
              <p style="width: 50px;"><img class="w-17px" src='/assets/images/phone_callback_white_24dp.svg' />
                <span id="summaryIncomingCalls" class='p-l-5 p-r-5 fs-18 zoomOutAnimationNumber' />
              </p>
              <p style="width: 50px;"><img class="w-17px" src='/assets/images/phone_forwarded_white_24dp.svg' />
                <span id="summaryOutgoingCalls" class='p-l-5 p-r-5 fs-18 zoomOutAnimationNumber' />
              </p>
              <p style="width: 50px;"><img class="w-17px" src='/assets/images/phone_missed_white_24dp.svg' />
                <span id="summaryMissedCalls" class='p-l-5 p-r-5 fs-18 zoomOutAnimationNumber' />
              </p>
            </div>
          </div>
        </div>
        <div class="activityworkshop h-60 cursor-pointer" style='padding: 1rem'>
          <p class='fs-12 m-b-10'>RECENT ACTIVITIES</p>
          <div class="recent-activities-container" onClick={(e)=>route('/workspacedetails/inboxWorkspace')}>
            {notificationList && notificationList.length > 0 && notificationList.map((notification) => (
              <div class="col-xs-12 col-lg-12 p-l-0 p-r-0" title="Click to view the notification">
                <Notification profileIcon={notification.userName} statusIcon={notification.message.includes("Case") ? <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#74fac8"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg> : notification.message.includes("completed") ? <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#63e0f3"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#f79256"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={notification.message.includes('completed') ? "Task Completed" : notification.message.includes('Case') ? "New Case" : notification.message === "Visit created" ? "New Visit": "New Task"} statusTextColor={notification.message.includes('completed') ? "#63e0f3" : notification.message.includes('Case') ? "#74fac8" : notification.message === "Visit created" ? "#f79256": "#f79256"} assigneeName={notification.userName} notificationText={notification.message}  notificationTime={moment(notification.createdAt).fromNow()} iconClass={iconClass}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div class="profilemodalslide">
        <Modal title={userDisplayName} modalSize="is-full-height" isProfileModal
          modalDisplay={(isProfileDetailOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => closeProfileDetailModal(e)} closeID={'userProfileMenu'}>
          {
            isProfileDetailOpen && (
              <Profilemodal open={isProfileDetailOpen} onClose={(e) => closeProfileDetailModal(e)} />
            )
          }
        </Modal>
      </div>
    </div>
  );
};
