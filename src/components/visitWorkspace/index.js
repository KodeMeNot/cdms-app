import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import CONSTANTS from '../../lib/constants';
import Axios from 'axios';
import { getInitials, getDay, getMonth } from '../../lib/utils';
import { WorkspaceCard } from '../../components/workspaceCard';
import { WorkspaceSubCard } from '../../components/workspaceSubCard';
import ListCard from '../../components/listCard';
import { CountUp } from 'countup.js';
import Createvisitmodal from "../createvisitmodal";
import { Modal, ModalBody } from '../rightDrawer';

const Visitworkspace = (props) => {
  let isMobileView = window.screen.availWidth <= 425 ? true : false;
  let [currentRow, setCurrentRow] = useState({});
  let [activePageTabItem, setActivePageTabItem] = useState('All Visits');
  let [taskDetails, setTaskDetails] = useState({});
  let [visitListData, setVisitListData] = useState([]);
  let [allListData, setallListData] = useState([]);
  let [commercialListData, setCommercialListData] = useState([]);
  let [nonCommercialListData, setNonCommercialListData] = useState([]);
  let [missedCallsData, setMissedCallsData] = useState([]);
  let [isVisitModalOpen, setVisitModalVisibility] = useState(false);

  useEffect(() => {
    let All = document.getElementById("All");
    All.innerText = "0";
    let Commercial = document.getElementById("Commercial");
    Commercial.innerText = "0";
    let NonCommercial = document.getElementById("NonCommercial");
    NonCommercial.innerText = "0";
  }, []);
  useEffect(async() => {
    await getVisitListData();
  },[])

  async function getVisitListData() {
  let CountUpOptions = {
    startVal: 0,
    duration: 3
  }
  let visitListResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/visit`);
  await setallListData(visitListResponse.data)
  await setVisitListData(visitListResponse.data)
  let AllElement = document.getElementById("All");
  const AllElementCount = await new CountUp(AllElement, visitListResponse.data.length, CountUpOptions);
  await AllElementCount.start()

  let CommercialResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/visit?type=Commercial`)
  await setCommercialListData(CommercialResponse.data)
  let CommercialElement = document.getElementById("Commercial");
  const CommercialElementCount = await new CountUp(CommercialElement, CommercialResponse.data.length, CountUpOptions);
  await CommercialElementCount.start()

  let NonCommercialResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/visit?type=Non-Commercial`)
  await setNonCommercialListData(NonCommercialResponse.data)
  let NonCommercialElement = document.getElementById("NonCommercial");
  const NonCommercialElementCount = await new CountUp(NonCommercialElement, NonCommercialResponse.data.length, CountUpOptions);
  await NonCommercialElementCount.start()
}
function setVisitListTask(tabName) {
  if(tabName === "Commercial") {
    setVisitListData(commercialListData)
  } else if(tabName === "Non-Commercial") {
    setVisitListData(nonCommercialListData)
  } else {
    setVisitListData(nonCommercialListData)
  }
}
function closeVisitModal(e) {
  e.preventDefault();
  setVisitModalVisibility(false);
}

 async function changeActiveTab(tabName) {
  setActivePageTabItem(tabName)
 }
async function toggleTaskEdit(row) {
  if (row) {
    await setCurrentRow(row);
  }
}
  return (
    <div class='row'>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0">
            <div class="Workspacehead background-white p-t-2">
              <div class="headerworkspacetext display-flex flex-direction-column">
                <p class="fs-26">Visits</p>
              </div>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0" style="height: calc(100vh - 65px)">
            <div>
              <div class="row topboxstyleworkspacedayplan m-t-20 p-l-0">
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation p-l-0 p-r-1rem">
                  <WorkspaceCard countId="All" callTask={true} setCallTask={setVisitListTask}  changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"All Visits"} cardText={"All Visits"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardCount={commercialListData ? commercialListData.length : ''} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="45px" fill="#e5e5e5"><path d="M20 15.51c-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1zM5.03 5h1.5c.07.89.22 1.76.46 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zM19 18.97c-1.32-.09-2.59-.35-3.8-.75l1.19-1.19c.85.24 1.72.39 2.6.45v1.49zM18 9h-2.59l5.02-5.02-1.41-1.41L14 7.59V5h-2v6h6z"/></svg>} />
                </div>
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation p-l-0 p-r-1rem">
                  <WorkspaceCard countId="Commercial" callTask={true} setCallTask={setVisitListTask}  changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"Commercial"} cardText={"Commercial"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardCount={commercialListData ? commercialListData.length : ''} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="45px" fill="#e5e5e5"><path d="M20 15.51c-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1zM5.03 5h1.5c.07.89.22 1.76.46 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zM19 18.97c-1.32-.09-2.59-.35-3.8-.75l1.19-1.19c.85.24 1.72.39 2.6.45v1.49zM18 9h-2.59l5.02-5.02-1.41-1.41L14 7.59V5h-2v6h6z"/></svg>} />
                </div>
                <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation1 p-l-0 p-r-1rem">
                  <WorkspaceCard countId="NonCommercial" callTask={true} setCallTask={setVisitListTask} changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"Non-Commercial"} cardText={"Non-Comm"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardCount={nonCommercialListData ? nonCommercialListData.length : ''} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="45px" fill="#e5e5e5"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.1-.03-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM5.03 5h1.5c.07.88.22 1.75.45 2.58l-1.2 1.21c-.4-1.21-.66-2.47-.75-3.79zM19 18.97c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51zM18 11l5-5-5-5v3h-4v4h4z"/></svg>} />
                </div>
              </div>
              <div class="row list-card-scrollable-container-extra m-t-15">
                <div class="col-lg-12 p-l-0 m-t-0 pos-relative">
                  {visitListData  && visitListData.length > 0 && (activePageTabItem === 'All Visits' || activePageTabItem === 'Commercial' || activePageTabItem === 'Non-Commercial') && (
                    <div>
                       <ListCard taskType="visitTask" taskData={visitListData} taskIcon={<img src="/assets/images/telephone.png" width="20" />} iconLive={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#2ECC71"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/></svg>} iconNotLive={  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#E74C3C"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/></svg>} showData={toggleTaskEdit}/>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="visitmodalslide">
        <Modal title="New Visit" modalSize="is-large-medium" isProfileModal
          modalDisplay={(isVisitModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => closeVisitModal(e)} closeID={'CustomerVisitMenu'}>
          {
            isVisitModalOpen && (
              <Createvisitmodal triggerNotifications={props.triggerNotifications} open={isVisitModalOpen} onClose={(e) => closeVisitModal(e)} />
            )
          }
        </Modal>
      </div>
    </div>
  );
};

export default Visitworkspace;
