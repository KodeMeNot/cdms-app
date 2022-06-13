import { h, Component } from 'preact';
import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import CONSTANTS from '../../lib/constants';
import moment from "moment";
import {TaskLogs} from "../taskLogs";




const TaskLogModal = (props) => {
  let iconClass = 'primary';
  let [notificationList, setNotificationList] = useState([]);

  useEffect(async () => {
    await getNotification();
  }, []);


  async function getNotification() {
    let notificationResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/notification?sortBy=createdAt&pageSize=10&pageNo=1`);
    await setNotificationList(notificationResponse.data);
  }



  return (
    <div class="profilemodalslide">
      <div class="profile-modal-container pos-relative" style='overflow: hidden; background: white'>
        <div class="profile-modal">
          <div class="profile-header-container">
            <div class="profile-header">
              <div class="profile-left-header-container">
                <span class="profile-left-header-text p-t-5 font-bold fs-20 text-408b8b" style="height: fit-content;">
                  Task Logs
                </span>
              </div>
            </div>
          </div>
          <div class="profile-content-container" style='overflow: hidden'>

            {/*
                  modified by Vihang
                  modified at 17/05/2022
                  modification : horizontal scroll removed from the taks log modal
            */}
            <div>
              <div class="" style="height: calc( 100vh - 100px ); overflow: hidden auto" >
                {notificationList && notificationList.length > 0 && notificationList.map((notification) => (
                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0" title="Click to view the notification">
                    <TaskLogs profileIcon={notification.userName} statusIcon={notification.message.includes("Case") ? <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#74fac8"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg> : notification.message.includes("completed") ? <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#63e0f3"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#f79256"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={notification.message.includes('completed') ? "Task Completed" : notification.message.includes('Case') ? "New Case" : notification.message === "Visit created" ? "New Visit": "New Task"} statusTextColor={notification.message.includes('completed') ? "#63e0f3" : notification.message.includes('Case') ? "#74fac8" : notification.message === "Visit created" ? "#f79256": "#f79256"} assigneeName={notification.userName} notificationText={notification.message}  notificationTime={moment(notification.createdAt).fromNow()} iconClass={iconClass}/>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default TaskLogModal;
