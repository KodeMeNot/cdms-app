import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { getItem } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import Axios from 'axios';
import { WorkspaceCard } from '../../components/workspaceCard';
import { WorkspaceSubCard } from '../../components/workspaceSubCard';
import ListCard from '../../components/listCard';
import { CountUp } from 'countup.js';

const Inboxworkspace = (props) => {
  let userInfo = getItem('userinfo');
  const todaysDate = new Date();
  let [totalTaskCheckListItems, setTotalTaskCheckListItems] = useState(0);
  let [totalTaskCheckListItemsProgress, setTotalTaskCheckListItemsProgress] = useState(0);
  let [activeFilter, setActiveFilter] = useState('New');
  let [activeFilterMain, setActiveFilterMain] = useState('New');
  let [currentRow, setCurrentRow] = useState({});
  let [taskData, setTasksData] = useState({columns: [
    {label: 'Name', field: 'displayName', width: '200px', sort: 'asc'},
    {label: 'Active Since', field: 'createdOn', sort: 'asc'},
    {label: 'Deadline', field: 'deadline', sort: 'asc'},
    {label: 'Case ID', field: 'caseID', sort: 'desc'}
  ],
  rows: []
  });
  let [activePageTabItem, setActivePageTabItem] = useState('New');
  let [isOpenFormPopover, setIsOpenFormPopover] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isOpenProformaFormPopover, setIsOpenProformaFormPopover] = useState(false);
  let [taskDetails, setTaskDetails] = useState({});
  let [contactDetails, setContactDetails] = useState({});
  let [inboxTasks, setInboxTasks] = useState("Task1");
  let [inboxChatFilter, setInboxChatFilter] = useState("New");
  let [inboxChatFilterList, setInboxChatFilterList] = useState([]);
  let [inboxNotificationList, setInboxNotificationList] = useState([]);
  let [newInboxNotificationList, setNewInboxNotificationList] = useState([]);
  let [readInboxNotificationList, setReadInboxNotificationList] = useState([]);
  let [archiveInboxNotificationList, setArchiveInboxNotificationList] = useState([]);
  let [newTaskInboxNotificationList, setNewTaskInboxNotificationList] = useState([]);
  let [newChatInboxNotificationList, setNewChatNotificationList] = useState([]);
  let [newCaseInboxNotificationList, setNewCaseInboxNotificationList] = useState([]);
  let [readTaskInboxNotificationList, setReadTaskInboxNotificationList] = useState([]);
  let [readChatInboxNotificationList, setReadChatNotificationList] = useState([]);
  let [readCaseInboxNotificationList, setReadCaseInboxNotificationList] = useState([]);
  let [archiveTaskInboxNotificationList, setArchiveTaskInboxNotificationList] = useState([]);
  let [archiveChatInboxNotificationList, setArchiveChatInboxNotificationList] = useState([]);
  let [archiveCaseInboxNotificationList, setArchiveCaseInboxNotificationList] = useState([]);
  let [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let New = document.getElementById("New");
    New.innerText = "0";
    let Read = document.getElementById("Read");
    Read.innerText = "0";
    let Archive = document.getElementById("Archive");
    Archive.innerText = "0";
  }, []);
  useEffect(async() => {
    await getUsersList();
    await getInboxData();
    await changeActiveTab("New");
  },[]);

  async function getInboxData() {
    let CountUpOptions = {
      startVal: 0,
      duration: 3
    };
    let notificationResponse = await Axios.get(`${CONSTANTS.API_URL}/api/v1/notification`);
    await setInboxNotificationList(notificationResponse.data);

    let newNotificationsList = await notificationResponse.data.filter((task) => (task.isSent === true));
    await setNewInboxNotificationList(newNotificationsList);
    let newTaskNotificationsList = await newNotificationsList.filter((task) => (task.group === "task"));
    await setNewTaskInboxNotificationList(newTaskNotificationsList);
    let NewElement = document.getElementById("New");
    let NewElementLength = (newTaskNotificationsList.data && newTaskNotificationsList.data.length) ? newTaskNotificationsList.data.length : 0;
    const NewElementCount = await new CountUp(NewElement, NewElementLength, CountUpOptions);
    await NewElementCount.start();
    let newChatNotificationsList = await newNotificationsList.filter((task) => (task.group === "message"));
    await setNewChatNotificationList(newChatNotificationsList);
    let newCaseNotificationsList = await newNotificationsList.filter((task) => (task.group === "case"));
    await setNewCaseInboxNotificationList(newCaseNotificationsList);
    let readNotificationList = await notificationResponse.data.filter((task) => (task.isRead === true));
    await setReadInboxNotificationList(readNotificationList);
    let ReadElement = document.getElementById("Read");
    let ReadElementLength = (readNotificationList.data && readNotificationList.data.length) ? readNotificationList.data.length : 0;
    const ReadElementCount = await new CountUp(ReadElement, ReadElementLength, CountUpOptions);
    await ReadElementCount.start();

    let readTaskNotificationList = await readNotificationList.filter((task) => (task.group === "task"));
    await setReadTaskInboxNotificationList(readTaskNotificationList);
    let readChatNotificationList = await readNotificationList.filter((task) => (task.group === "message"));
    await setReadChatNotificationList(readChatNotificationList);
    let readCaseNotificationList = await readNotificationList.filter((task) => (task.group === "case"));
    await setReadCaseInboxNotificationList(readCaseNotificationList);
    let archiveNotificationList = await notificationResponse.data.filter((task) => (task.deletedAt !== null));
    await setArchiveInboxNotificationList(archiveNotificationList);
    let ArchiveElement = document.getElementById("Archive");
    let ArchiveElementLength = (archiveNotificationList.data && archiveNotificationList.data.length) ? archiveNotificationList.data.length : 0;
    const ArchiveElementCount = await new CountUp(ArchiveElement, ArchiveElementLength, CountUpOptions);
    await ArchiveElementCount.start();

    let archiveTaskNotificationList = await archiveNotificationList.filter((task) => (task.group === "task"));
    await setArchiveTaskInboxNotificationList(archiveTaskNotificationList);
    let archiveChatNotificationList = await archiveNotificationList.filter((task) => (task.group === "message"));
    setArchiveChatInboxNotificationList(archiveChatNotificationList);
    let archiveCaseNotificationList = await archiveNotificationList.filter((task) => (task.group === "case"));
    setArchiveCaseInboxNotificationList(archiveCaseNotificationList);
  }
  async function changeActiveTab(tabName) {
    setActivePageTabItem(tabName);
  }
  async function toggleTaskEdit(row) {
    if (row) {
      await setCurrentRow(row);
      await props.toggleTaskEdit(row);
    }
  }
  async function setTaskData(filter) {
    setActiveFilter(filter);
    if (activePageTabItem === "New") {
      if (filter === "Task") {
        await setInboxNotificationList(newTaskInboxNotificationList);
      } else if (filter === "Chat") {
        await setInboxNotificationList(newChatInboxNotificationList);
      } else if (filter === "Case") {
        await setInboxNotificationList(newCaseInboxNotificationList);
      }
    } else if (activePageTabItem === "Read") {
      if (filter === "Task") {
        await setInboxNotificationList(readTaskInboxNotificationList);
      } else if (filter === "Chat") {
        await setInboxNotificationList(readChatInboxNotificationList);
      } else if (filter === "Case") {
        await setInboxNotificationList(readCaseInboxNotificationList);
      }
    } else if (activePageTabItem === "Archive") {
      if (filter === "Task") {
        await setInboxNotificationList(archiveTaskInboxNotificationList);
      } else if (filter === "Chat") {
        await setInboxNotificationList(archiveChatInboxNotificationList);
      } else if (filter === "Case") {
        await setInboxNotificationList(archiveCaseInboxNotificationList);
      }
    }
  }
  async function setTaskDataMain(filter) {
    setActiveFilterMain(filter);
    if (filter === "New") {
      await setInboxNotificationList(newTaskInboxNotificationList);
    } else if (filter === "Read") {
      await setInboxNotificationList(readCaseInboxNotificationList);
    } else if (filter === "Archive") {
      await setInboxNotificationList(archiveTaskInboxNotificationList);
    }
  }
  async function getUsersList() {
    let response = await axios.get(
      `${CONSTANTS.API_URL}/api/v1/users?dealershipIDs=${userInfo.dealership}`
    );
    await setUsersList(response.data);
  }
  return (
    <div class='row'>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0">
            <div class="Workspacehead background-white p-t-2">
              <div class="headerworkspacetext display-flex flex-direction-column">
                <p class="fs-26">Inbox</p>
              </div>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0" style="height: calc(100vh - 65px)">
            <div>
              <div class="row topboxstyleworkspacedayplan m-t-20 p-l-0">
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation p-l-0 p-r-1rem">
                  <WorkspaceCard countId="New" changeActiveTab={changeActiveTab} setTaskData={setTaskDataMain} activePageTabItem={activePageTabItem} activeTab={"New"} cardText={"New"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 15 38 24" width="55px" fill="#e5e5e5"><path d="M7 40Q5.8 40 4.9 39.1Q4 38.2 4 37V11Q4 9.8 4.9 8.9Q5.8 8 7 8H41Q42.2 8 43.1 8.9Q44 9.8 44 11V37Q44 38.2 43.1 39.1Q42.2 40 41 40ZM24 24.9 7 13.75V37Q7 37 7 37Q7 37 7 37H41Q41 37 41 37Q41 37 41 37V13.75ZM24 21.9 40.8 11H7.25ZM7 13.75V11V13.75V37Q7 37 7 37Q7 37 7 37Q7 37 7 37Q7 37 7 37Z"/></svg>}/>
                </div>
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation1 p-l-0 p-r-1rem">
                  <WorkspaceCard countId="Read" changeActiveTab={changeActiveTab} setTaskData={setTaskDataMain} activePageTabItem={activePageTabItem} activeTab={"Read"} cardText={"Read"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 15 38 24" width="55px" fill="#e5e5e5"><path d="M31.65 44 23.6 35.95 25.75 33.8 31.65 39.7 43.85 27.5 46 29.65ZM23.9 21.65 40.6 11H7.2ZM23.9 24.65 7 13.8V36.4Q7 36.4 7 36.4Q7 36.4 7 36.4H19.8L22.8 39.4H7Q5.8 39.4 4.9 38.5Q4 37.6 4 36.4V11Q4 9.8 4.9 8.9Q5.8 8 7 8H40.85Q42.05 8 42.95 8.9Q43.85 9.8 43.85 11V23.2L40.85 26.2V13.8ZM23.95 25.1Q23.95 25.1 23.95 25.1Q23.95 25.1 23.95 25.1ZM23.9 21.65ZM23.95 24.65Z"/></svg>}/>
                </div>
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation2 p-l-0 p-r-0 p-r-1rem">
                  <WorkspaceCard countId="Archive" changeActiveTab={changeActiveTab} setTaskData={setTaskDataMain} activePageTabItem={activePageTabItem} activeTab={"Archive"} cardText={"Archive"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 15 38 24" width="55px" fill="#e5e5e5"><path d="M9 42Q7.8 42 6.9 41.1Q6 40.2 6 39V12.85Q6 12.1 6.15 11.575Q6.3 11.05 6.7 10.6L9.5 6.8Q9.9 6.35 10.425 6.175Q10.95 6 11.65 6H36.35Q37.05 6 37.55 6.175Q38.05 6.35 38.45 6.8L41.3 10.6Q41.7 11.05 41.85 11.575Q42 12.1 42 12.85V39Q42 40.2 41.1 41.1Q40.2 42 39 42ZM9.85 11.3H38.1L36.3 9H11.65ZM9 39H39Q39 39 39 39Q39 39 39 39V14.3H9V39Q9 39 9 39Q9 39 9 39ZM24 34.5 31.8 26.7 29.8 24.7 25.5 29V18.95H22.5V29L18.2 24.7L16.2 26.7ZM9 39Q9 39 9 39Q9 39 9 39V14.3V39Q9 39 9 39Q9 39 9 39Z"/></svg>}/>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                  {(activePageTabItem === 'New') && (
                    <div class="subfilterworkspacedayplan m-t-15 m-b-20 row">
                      <div class="col-xs-4 col-lg-4 p-l-0" style="padding-right: 1rem;">
                        <WorkspaceSubCard
                          activeFilter={inboxChatFilter} setTaskData={setTaskData} inboxTask={true}
                          cardText={"TASK"} cardCount={newTaskInboxNotificationList ? newTaskInboxNotificationList.length : '0'}  activeFilterTab = {"Task"}
                          //activeSubFilter={"Task"}
                        />
                      </div>
                      <div class=" col-xs-4 col-lg-4 p-l-0" style="padding-right: 1rem;" >
                        <WorkspaceSubCard
                          activeFilter={inboxChatFilter} setTaskData={setTaskData} inboxTask={true}
                          cardText={"CHAT"} cardCount={newChatInboxNotificationList ? newChatInboxNotificationList.length : '0'} activeFilterTab = {"Chat"}
                          //activeSubFilter={"Chat"}
                        />
                      </div>
                      <div class=" col-xs-4 col-lg-4 p-l-0" style="padding-right: 1rem;" >
                        <WorkspaceSubCard
                          activeFilter={inboxChatFilter} setTaskData={setTaskData} inboxTask={true}
                          cardText={"CASE"} cardCount={newCaseInboxNotificationList ? newCaseInboxNotificationList.length : "0"} activeFilterTab = {"Case"}
                          //activeSubFilter={"Case"}
                        />
                      </div>
                    </div>
                  )}
                  {(activePageTabItem === 'Read') && (
                    <div class="subfilterworkspacedayplan m-t-15 m-b-20 row">
                      <div class="col-xs-4 col-lg-4 p-l-0" style="padding-right: 1rem;">
                        <WorkspaceSubCard
                          activeFilter={inboxChatFilter} setTaskData={setTaskData} inboxTask={true}
                          cardText={"TASK"} cardCount={readTaskInboxNotificationList ? readTaskInboxNotificationList.length : '0'}  activeFilterTab = {"Task"}
                          //activeSubFilter={"Task"}
                        />
                      </div>
                      <div class=" col-xs-4 col-lg-4 p-l-0" style="padding-right: 1rem;" >
                        <WorkspaceSubCard
                          activeFilter={inboxChatFilter} setTaskData={setTaskData} inboxTask={true}
                          cardText={"CHAT"} cardCount={readChatInboxNotificationList ? readChatInboxNotificationList.length : '0'} activeFilterTab = {"Chat"}
                          //activeSubFilter={"Chat"}
                        />
                      </div>
                      <div class=" col-xs-4 col-lg-4 p-l-0" style="padding-right: 1rem;" >
                        <WorkspaceSubCard
                          activeFilter={inboxChatFilter} setTaskData={setTaskData} inboxTask={true}
                          cardText={"CASE"} cardCount={readCaseInboxNotificationList ? readCaseInboxNotificationList.length : "0"} activeFilterTab = {"Case"}
                          //activeSubFilter={"Case"}
                        />
                      </div>
                    </div>
                  )}
                  {(activePageTabItem === 'Archive') && (
                    <div class="subfilterworkspacedayplan m-t-15 m-b-20 row">
                      <div class="col-xs-4 col-lg-4 p-l-0" style="padding-right: 1rem;">
                        <WorkspaceSubCard
                          activeFilter={inboxChatFilter} setTaskData={setTaskData} inboxTask={true}
                          cardText={"TASK"} cardCount={archiveTaskInboxNotificationList ? archiveTaskInboxNotificationList.length : '0'}  activeFilterTab = {"Task"}
                          //activeSubFilter={"Task"}
                        />
                      </div>
                      <div class=" col-xs-4 col-lg-4 p-l-0" style="padding-right: 1rem;" >
                        <WorkspaceSubCard
                          activeFilter={inboxChatFilter} setTaskData={setTaskData} inboxTask={true}
                          cardText={"CHAT"} cardCount={archiveChatInboxNotificationList ? archiveChatInboxNotificationList.length : '0'} activeFilterTab = {"Chat"}
                          //activeSubFilter={"Chat"}
                        />
                      </div>
                      <div class=" col-xs-4 col-lg-4 p-l-0" style="padding-right: 1rem;" >
                        <WorkspaceSubCard
                          activeFilter={inboxChatFilter} setTaskData={setTaskData} inboxTask={true}
                          cardText={"CASE"} cardCount={archiveCaseInboxNotificationList ? archiveCaseInboxNotificationList.length : "0"} activeFilterTab = {"Case"}
                          //activeSubFilter={"Case"}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="row list-card-scrollable-container">
                <div class="col-lg-12 p-l-0 m-t-0 pos-relative">
                  {
                    inboxNotificationList && inboxNotificationList.length > 0 && (activePageTabItem === 'New' || activePageTabItem === 'Read' || activePageTabItem === 'Archive') && (
                      <ListCard usersList={usersList} taskType="inboxTask" taskData={inboxNotificationList} showData={toggleTaskEdit} />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inboxworkspace;
