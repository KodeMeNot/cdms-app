import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getItem, setItem } from '../../lib/myStore';
import axios from 'axios';
import { route } from 'preact-router';
import CONSTANTS from '../../lib/constants';
import Axios from 'axios';
import { WorkspaceCard } from '../../components/workspaceCard';
import { WorkspaceSubCard } from '../../components/workspaceSubCard';
import ListCard from '../../components/listCard';
import { CountUp } from 'countup.js';

const Callworkspace = (props) => {
  console.log(props, 'pppppjdfgsdjgfjhfgj innnnnnnnnnn');
  let isMobileView = window.screen.availWidth <= 425 ? true : false;
  let [currentRow, setCurrentRow] = useState({});
  let [activePageTabItem, setActivePageTabItem] = useState('Incoming Calls');
  let [taskDetails, setTaskDetails] = useState({});
  let [callsData, setCallsData] = useState([]);
  let [incomingCallsData, setIncomingCallsData] = useState([]);
  let [outgoingCallsData, setOutgoingCallsData] = useState([]);
  let [missedCallsData, setMissedCallsData] = useState([]);

  useEffect(() => {
    let Incoming = document.getElementById("Incoming");
    Incoming.innerText = "0";
    let Outgoing = document.getElementById("Outgoing");
    Outgoing.innerText = "0";
    let Missed = document.getElementById("Missed");
    Missed.innerText = "0";
  }, []);

  useEffect(async() => {
    await getCallsData();
  },[]);

  async function getCallsData() {
    let CountUpOptions = {
      startVal: 0,
      duration: 3
    };
    let callsIncomingResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/callslist?typeOfCall=Incoming`);
    await setIncomingCallsData(callsIncomingResponse.data);
    await setCallsData(callsIncomingResponse.data);
    let IncomingElement = document.getElementById("Incoming");
    const IncomingElementCount = await new CountUp(IncomingElement, callsIncomingResponse.data.length, CountUpOptions);
    await IncomingElementCount.start();
    let callsOutgoingResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/callslist?typeOfCall=Outgoing`);
    await setOutgoingCallsData(callsOutgoingResponse.data);
    let OutgoingElement = document.getElementById("Outgoing");
    const OutgoingElementCount = await new CountUp(OutgoingElement, callsOutgoingResponse.data.length, CountUpOptions);
    await OutgoingElementCount.start();
    let callsMissedCallResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/callslist?disposition=No answer`);
    await setMissedCallsData(callsMissedCallResponse.data);
    let MissedElement = document.getElementById("Missed");
    const MissedElementCount = await new CountUp(MissedElement, callsMissedCallResponse.data.length, CountUpOptions);
    await MissedElementCount.start();
    toggleTaskEdit(callsIncomingResponse.data[0]);
  }

  function setCallTask(tabName) {
    if (tabName === "Incoming Calls") {
      setCallsData(incomingCallsData);
    } else if (tabName === "Outgoing Calls") {
      setCallsData(outgoingCallsData);
    } else if (tabName === "Missed Calls") {
      setCallsData(missedCallsData);
    }
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
  return (
    <div class='row'>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0">
            <div class="Workspacehead background-white p-t-2">
              <div class="headerworkspacetext display-flex flex-direction-column">
                <p class="fs-26">Calls</p>
              </div>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0" style="height: calc(100vh - 65px)">
            <div>
              <div class="row topboxstyleworkspacedayplan m-t-20 p-l-0">
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation p-l-0 p-r-1rem">
                  <WorkspaceCard countId="Incoming" callTask={true} setCallTask={setCallTask}   changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"Incoming Calls"} cardText={"Incoming"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="45px" fill="#e5e5e5"><path d="M20 15.51c-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1zM5.03 5h1.5c.07.89.22 1.76.46 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zM19 18.97c-1.32-.09-2.59-.35-3.8-.75l1.19-1.19c.85.24 1.72.39 2.6.45v1.49zM18 9h-2.59l5.02-5.02-1.41-1.41L14 7.59V5h-2v6h6z"/></svg>} />
                </div>
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation1 p-l-0 p-r-1rem">
                  <WorkspaceCard countId="Outgoing" callTask={true} setCallTask={setCallTask}  changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"Outgoing Calls"} cardText={"Outgoing"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="45px" fill="#e5e5e5"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.1-.03-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM5.03 5h1.5c.07.88.22 1.75.45 2.58l-1.2 1.21c-.4-1.21-.66-2.47-.75-3.79zM19 18.97c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51zM18 11l5-5-5-5v3h-4v4h4z"/></svg>} />
                </div>
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation2 p-l-0 p-r-0 p-r-1rem">
                  <WorkspaceCard countId="Missed" callTask={true} setCallTask={setCallTask}  changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"Missed Calls"} cardText={"Missed"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="45px" fill="#e5e5e5"><path d="M23.71 16.67C20.66 13.78 16.54 12 12 12S3.34 13.78.29 16.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.12-.52-.3-.7zm-18.31.56c-.66.37-1.29.8-1.87 1.27l-1.07-1.07c.91-.75 1.9-1.39 2.95-1.9v1.7zm15.08 1.26c-.6-.48-1.22-.9-1.88-1.27v-1.7c1.05.51 2.03 1.15 2.95 1.9l-1.07 1.07zM7 6.43l4.94 4.94 7.07-7.07-1.41-1.42-5.66 5.66L8.4 5H11V3H5v6h2z"/></svg>} />
                </div>
              </div>
              <div class="row list-card-scrollable-container-extra m-t-15">
                <div class="col-lg-12 p-l-0 m-t-0 pos-relative">
                  {callsData  && callsData.length > 0 && (activePageTabItem === 'Incoming Calls' || activePageTabItem === 'Outgoing Calls' || activePageTabItem === 'Missed Calls') && (
                    <div>
                      <ListCard taskType="callTask" showData={toggleTaskEdit} taskData={callsData} taskIcon={<img src="/assets/images/telephone.png" width="20" />} iconLive={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#2ECC71"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/></svg>} iconNotLive={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#E74C3C"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/></svg>} />
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

export default Callworkspace;
