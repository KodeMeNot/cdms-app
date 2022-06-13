import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { getItem, setItem, removeAll } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import ApexCharts from 'apexcharts';
import { formatDateTime, getFormattedAmount, applyAclForFeedAndChat } from '../../lib/utils';
import { CountryCode } from '../countryCode';
import { Popup, PopupBody } from '../popup';
import PDFSTYLE from "../../lib/pdfGenerationConfig";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import hyundaiLogo from "../../assets/images/crystal-honda.png";
import hyundaiX from "../../assets/images/hyundaiX.jpeg";
import Axios from 'axios';
import { css } from 'jquery';
import { EditorState, Plugin } from "prosemirror-state";
import { EditorView, Decoration, DecorationSet } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import ChecklistComponent from "../checklist";
import SelectCar from "../selectCar";
import { getInitials, getDay, getMonth } from '../../lib/utils';
import { WorkspaceCard } from '../workspaceCard';
import { WorkspaceSubCard } from '../workspaceSubCard';
import ChatComment from "../chatComment";
import ListCard from '../listCard';
import { NewPopupModal, NewPopupModalBody } from '../newPopupModal';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';
import moment from "moment";
import TaskListDetailHeader from "../taskListDetailHeader";
import TaskListDetailTags from "../taskListDetailTags";
import toastr from "toastr";
import { CountUp } from 'countup.js';

const Courierworkspace = (props) => {
  let userInfo = getItem('userinfo');
  const todaysDate = new Date();
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);
  let [totalTaskCheckListItems, setTotalTaskCheckListItems] = useState(0);
  let [totalTaskCheckListItemsProgress, setTotalTaskCheckListItemsProgress] = useState(0);
  let isMobileView = window.screen.availWidth <= 425 ? true : false;
  let [activeFilter, setActiveFilter] = useState('DAILY TASKS');
  let [currentRow, setCurrentRow] = useState({});

  let [taskData, setTasksData] = useState({columns: [
    {label: 'Name', field: 'displayName', width: '200px', sort: 'asc'},
    {label: 'Active Since', field: 'createdOn', sort: 'asc'},
    {label: 'Deadline', field: 'deadline', sort: 'asc'},
    {label: 'Case ID', field: 'caseID', sort: 'desc'}
  ],
  rows: []
  });

  let [activePageTabItem, setActivePageTabItem] = useState('Un-delivered');
  let [isOpenFormPopover, setIsOpenFormPopover] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isOpenProformaFormPopover, setIsOpenProformaFormPopover] = useState(false);
  let [taskDetails, setTaskDetails] = useState({});
  let [contactDetails, setContactDetails] = useState({});
  let [activeTab, setActiveTab] = useState('list');
  let [courierUndeliveredData, setCourierUndeliveredData] = useState([]);
  let [courierUndeliveredLegalData, setCourierUndeliveredLegalData] = useState([]);
  let [courierUndeliveredHMILData, setCourierUndeliveredHMILData] = useState([]);
  let [courierUndeliveredDirectorData, setCourierUndeliveredDirectorData] = useState([]);

  let [courierDeliveredData, setCourierDeliveredData] = useState([]);
  let [courierDeliveredLegalData, setCourierDeliveredLegalData] = useState([]);
  let [courierDeliveredHMILData, setCourierDeliveredHMILData] = useState([]);
  let [courierDeliveredDirectorData, setCourierDeliveredDirectorData] = useState([]);

  let [courierImportantData, setCourierImportantData] = useState([]);
  let [courierImportantLegalData, setCourierImportantLegalData] = useState([]);
  let [courierImportantHMILData, setCourierImportantHMILData] = useState([]);
  let [courierImportantDirectorData, setCourierImportantDirectorData] = useState([]);

  useEffect(() => {
    let UnDelivered = document.getElementById("UnDelivered");
    UnDelivered.innerText = "0";
    let Delivered = document.getElementById("Delivered");
    Delivered.innerText = "0";
    let Important = document.getElementById("Important");
    Important.innerText = "0";
  }, []);

  useEffect(async() => {
    await getTaskData();
    await setActivePageTabItem("Un-delivered");
  },[]);

  async function getTaskData() {
    let CountUpOptions = {
      startVal: 0,
      duration: 3
    };
    let courierResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/courier`);
    /*
      Modification: Corrected the filter key from UnDelivered to Undelivered to show data
      By: Devang
      Date: 27/05/2022
    */
    let undeliveredCourierData = await courierResponse.data.filter((courier) => (courier.status === "Undelivered" || courier.status === "Active"));
    console.log("undeliveredCourierData",undeliveredCourierData);
    await setCourierUndeliveredData(undeliveredCourierData);
    let UnDeliveredElement = document.getElementById("UnDelivered");
    const UnDeliveredElementCount = await new CountUp(UnDeliveredElement, undeliveredCourierData.length, CountUpOptions);
    await UnDeliveredElementCount.start();

    let deliveredCourierData = await courierResponse.data.filter((courier) => courier.status === "Delivered");
    await setCourierDeliveredData(deliveredCourierData);
    let DeliveredElement = document.getElementById("Delivered");
    const DeliveredElementCount = await new CountUp(DeliveredElement, deliveredCourierData.length, CountUpOptions);
    await DeliveredElementCount.start();

    let importantCourierData = await courierResponse.data.filter((courier) => courier.isImportant === true);
    await setCourierImportantData(importantCourierData);
    let ImportantElement = document.getElementById("Important");
    const ImportantElementCount = await new CountUp(ImportantElement, importantCourierData.length, CountUpOptions);
    await ImportantElementCount.start();
  }

  async function changeActiveTab(tabName) {
    await setActivePageTabItem(tabName);
    if (tabName === "Un-delivered") {
      await setTasksData(courierUndeliveredData);
    } else if (tabName === "Delivered") {
      await setTasksData(courierDeliveredData);
    } else if (tabName === "Important") {
      await setTasksData(courierImportantData);
    }
  }
  async function toggleTaskEdit(row) {
    if (row) {
      await setCurrentRow(row);
      await props.toggleTaskEdit(row);
    }
  }
  return (
    <div class='row'>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0">
            <div class="Workspacehead background-white p-t-2">
              <div class="headerworkspacetext display-flex flex-direction-column">
                <p class="fs-26">Couriers</p>
              </div>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0" style="height: calc(100vh - 65px)">
            <div>
              <div class="row topboxstyleworkspacedayplan m-t-20 p-l-0">
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation p-l-0 p-r-1rem">
                  <WorkspaceCard countId="UnDelivered" changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"Un-delivered"} cardText={"Un-delivered"} cardBgColor="#8ecae6"
	cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg"  height="34px" viewBox="0 0 20 24" width="34px" fill="#e5e5e5"><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8 c1.57,0,3.04,0.46,4.28,1.25l1.45-1.45C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c1.73,0,3.36-0.44,4.78-1.22 l-1.5-1.5C14.28,19.74,13.17,20,12,20z M19,15h-3v2h3v3h2v-3h3v-2h-3v-3h-2V15z" /></svg>}
                  />
                </div>
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation1 p-l-0 p-r-1rem">
                  <WorkspaceCard countId="Delivered" changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"Delivered"} cardText={"Delivered"} cardBgColor="#8ecae6"
	cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg"  height="34px" viewBox="0 0 10 24" width="34px" fill="#e5e5e5"><g /><g><path d="M14,2H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8L14,2z M18,20H6V4h7v5h5V20z M8.82,13.05 L7.4,14.46L10.94,18l5.66-5.66l-1.41-1.41l-4.24,4.24L8.82,13.05z" /></g></svg>}
                  />
                </div>
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation2 p-l-0 p-r-0 p-r-1rem">
                  <WorkspaceCard countId="Important" changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"Important"} cardText={"Important"} cardBgColor="#8ecae6"
	cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg"  height="34px" viewBox="0 0 15 24" width="34px" fill="#e5e5e5"><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z" /></svg>}
                  />
                </div>
              </div>
              <div class="row list-card-scrollable-container">
                <div class="col-lg-12 p-l-0 m-t-0 pos-relative">
                  {taskData  && taskData.length > 0 && (activePageTabItem === 'Un-delivered' || activePageTabItem === 'Delivered' || activePageTabItem === 'Important') && activeTab === 'list' && (
                    <div>
                      <ListCard taskType="Courier" taskData={taskData} taskIcon={<img src="/assets/images/clipboard.png" width="20" />} iconLive={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#2ECC71"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" /></svg>} iconNotLive={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#E74C3C"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" /></svg>} showData={toggleTaskEdit} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courierworkspace;
