// modified by Vihang
// modifield on 18/02/2022
// modfication:created new case Detail view

import {CaseCardHeader} from '../../components/caseCardHeader';
import {CaseCardHeader1} from '../../components/caseCardHeader1';
import axios from 'axios';
// import { route } from 'preact-router';
import CONSTANTS from '../../lib/constants';
import {CaseCardHeader2} from '../../components/caseCardHeader2';
import ChatComment from "../../components/chatComment";
import { Modal2, ModalBody2 } from '../../components/rightDrawer2';
import { useEffect, useState } from 'preact/hooks';
import ApexCharts from 'apexcharts';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import {CaseCard} from '../../components/casecard';
import Tabs from '../../components/tabs';
import { getFormattedAmount} from '../../lib/utils';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';
import Widget1 from '../../components/widget1';
import {Notification} from "../../components/notification";
import { rateSystem } from "../../lib/rating";


const CaseDetail = () => {
  let [isCollaborator, setIsCollaborator] = useState(false);
  let [editorText, setEditorText] = useState("");
  let [editorImages, setEditorImages] = useState([]);
  let [isCurrentGoal, setIsCurrentGoal] = useState("");
  let [isCurrentGoalType, setIsCurrentGoalType] = useState("");
  let [pointerOffsetTop, setPointerOffsetTop] = useState("");
  let [pointerOffsetLeft, setPointerOffsetLeft] = useState("");
  let [mainTabOptions, setMainTabOptions] = useState([]);
  let [activePageTabItem, setActivePageTabItem] = useState('Summary');
  let [activePageMenu, setActivePageMenu] = useState('Case');
  let [leadType, setLeadType] = useState('Cold');
  let [activeSubTab ,setActiveSubTab] = useState('Summary');
  let [isPriceBreakup ,setPriceBreakup] = useState(false);
  let [searchResults,setSearchResults] = useState([]);
  let [isSearchResultModalOpen ,setIsSearchResultModalOpen] = useState(false);
  let [selectedSearchResult,setSelectedSearchResult] = useState('');
  let [chatModalHeight,setChatModalHeight] = useState("");

  useEffect(() =>{
    let mainTabOptions = [{
      label: 'Summary',
      isAddItem: true,
      isCounter: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Contact Details',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Vehicle Details',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Finance',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Accessories',
      isAddItem: true,
      isCounter: false,
      isEditable: true,
      isDraggable: true
    }];
    setMainTabOptions(mainTabOptions);
  },[]);

  useEffect(() => {
    window.onclick = function (event) {
      console.log(event.target,'event.target');
      if (event.target.matches('.goalimg')) {
        console.log('1111111');
      } else {
        console.log('222222222222');
        setIsCurrentGoal("");
        setIsCurrentGoalType("");
      }

    }.bind(this);
    console.log('yyyyyyyyyyyyyyyy');
  }, []);

  setTimeout(async () => {
    let properties = [
      {
        rating: "0",
        maxRating: "5",
        minRating: "0.5",
        readOnly: "no",
        starImage: `/assets/images/Star_selected.svg`,
        backgroundStarImage: `/assets/images/Star_unselected.svg`,
        starSize: "30",
        step: "0.5"
      }
    ];
    let className = "ratingSystem";
    await rateSystem(
      className,
      properties,
      (rating, ratingTargetElement) => {
        ratingTargetElement.parentElement.parentElement.getElementsByClassName(
          "ratingHolder"
        )[0].innerHTML = rating;
      }
    );
  }, 500);
  // useEffect(async () => {
  //   window.onclick = function (event) {
  //     console.log('aaaaaaaaaaaa');
  //     setIsCurrentGoal("");
  //     setIsCurrentGoalType("");
  //   }.bind(this);
  // }, []);

  function changeActiveTab(tabName) {
    if (tabName !== 'More') {
      setActivePageTabItem(tabName);
    }
  }

  function toggleCollaborator() {
    let header = document.getElementById("chatModalHeader");
    let computed = getComputedStyle(header)
    setChatModalHeight(computed.height)
    setIsCollaborator(!isCollaborator);
  }

  function viewAllImages(e) {
    let imageId = e.target.id;
    const gallery = new Viewer(document.getElementById(imageId));
    gallery.show();
  }

  async function handleEditorComment(comment,img) {
    await setEditorText(comment);
    await setEditorImages(img);
    document.getElementById("editorText").innerHTML = await comment;
    // let payload = {
    //   comment,
    //   typeOfComment: 'message',
    //   taskID: props.currentRow ? props.currentRow.uuid : '',
    //   commentByID: userInfo ? userInfo.uuid : '',
    //   commentByName: userInfo ? userInfo.displayName : ''

    // };
    // await axios.post(`${CONSTANTS.API_URL}/api/v1/comment`, payload)
    //   .then((res) => {
    //     console.log(res);
    //     axios.get(`${CONSTANTS.API_URL}/api/v1/comment?taskID=${props.currentRow.uuid}`)
    //       .then((res) => {
    //         console.log(res.data);
    //         setTaskComment(res.data);
    //       });
    //   });
  }


  function timeTracker(){
    let timeTrackerScroller = document.getElementById("time-tracker-scroller");
    console.log(timeTrackerScroller,"time tracker srolllllllll div");
    console.dir(timeTrackerScroller,"time tracker srolllllllll div");
    timeTrackerScroller.addEventListener("wheel", (event) => {
      event.preventDefault();

      timeTrackerScroller.scrollBy({
        left: event.deltaY < 0 ? -140 : 140
      });
    });

    // this.currentGoal(this.state.isCurrentGoal, "goal-pointer-four");
  }

  function currentGoal(data, goalPointer){
    let position = document.getElementById(goalPointer);
    let scroller = document.getElementById("time-tracker-scroller");
    let mainScrollContainer = document.getElementById("scroll-container-profile");
    let topContainer = document.getElementById("profile-body-container");


    setIsCurrentGoal(data);
    setIsCurrentGoalType(goalPointer);
    setPointerOffsetTop(position.offsetTop);

    // if (mainScrollContainer.scrollWidth + 40 > topContainer.scrollWidth){
    //   this.setState({
    //     pointerOffsetLeft: (position.offsetLeft + 30 - scroller.scrollLeft) - 280
    //   });
    // } else {
    //   this.setState({
    //     pointerOffsetLeft: position.offsetLeft + 30 - scroller.scrollLeft
    //   });
    // }

    // alert(mainScrollContainer.scrollWidth);
    // alert(topContainer.scrollWidth);
  }

  function clickToOpen() {
    // e.preventDefault();
    console.log('innnnnnnnn');
    let acc = document.getElementsByClassName("accordion");
    console.log(acc);
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

  function ActiveTab() {
    setActivePageMenu('Case');
    setActiveSubTab("Summary");
  }

  function togglePriceBreakup() {
    setPriceBreakup(!isPriceBreakup);
  }

  async function toggleSearchResultsModal(e) {
    e.preventDefault();
    setSearchResults([]);
    setIsSearchResultModalOpen(!isSearchResultModalOpen);
    let modal = document.getElementById("searchResultModal");
    if (!isSearchResultModalOpen) {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }


  async function getSearchResults(e) {
    if (!e.target.value){
      setSearchResults([]);
    }
    else {
      console.log(e.target.value);
      let result = await axios.get(`${CONSTANTS.API_URL}/api/v1/searchresults?q=${e.target.value}` );
      console.log(result);
      setSearchResults(result.data);
      console.log("++++++",searchResults);
    }

  }
  return (
    <div class="mainBodyContainer">
      <div class="mainBodyContainerDayplanworkspace">
        <div style="height:100vh">
          <div class='row'>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
              <div style="height:92px;overflow:hidden;">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                    <div class="Workspacehead m-0 h-full w-full">
                      <div class="display-flex w-full align-center">
                        <div class="cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/></svg>
                        </div>
                        <div class="display-flex flex-direction-column">
                          <div class="headerworkspacetext display-flex w-full align-center" style="flex-direction:row;justify-content: space-between;">
                            <p onClick={(e)=> ActiveTab()} class="fs-20 cursor-pointer" style="font-weight: bold;color:#6799B0">Details of </p>
                            <button onClick={e => toggleSearchResultsModal(e)} type="submit" class="p-0" title='Click to search' style="width:24px;height:24px;">
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="gray"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                            </button>
                          </div>
                          <div class="search">
                            {/*<input type="text" onInput={e => getSearchResults(e)} class="searchTerm" placeholder="Whom are you looking for?"   />*/}
                            <span style='white-space: nowrap;overflow: hidden;text-overflow: ellipsis;' class="headerworkspacetext" ><span class="fs-14 f-w-500" style="color:#6799B0" >
                              {selectedSearchResult ? ( selectedSearchResult.entityUniqueID ? (selectedSearchResult.foundIn ? selectedSearchResult.foundIn + selectedSearchResult.entityUniqueID : selectedSearchResult.entityUniqueID) + "" : "") : 'Contact#KH0123'}</span></span>

                          </div>

                        </div>

                        {/* <div class="progressbar display-flex m-l-10 m-r-0 pos-relative align-center" style={`width: 8px;border-radius:2px;height: auto;padding: 0 7px;background: ${leadType === "Hot" ? "orangered" : leadType === "Cold" ? "#72e7d7" : leadType === "Warm" ? "#ee7600" : "" }`} title='Hot'><span class="pos-absolute fs-10 forangeredorangered0;color:#fff">{leadType}</span></div> */}
                      </div>
                    </div>
                    <div>


                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 p-l-0 p-r-0 xs-hideCaseDetail">
                    <div class="row">
                      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 p-l-0 p-r-0">
                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-t-10 p-r-0 p-l-0'>
                          <div class="row">
                            <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 p-r-0 p-l-0'>
                              <div class="display-flex position-relative flex-direction-column newWorkSpaceCard listCard " style={`height:80px;border:0.5px solid ${leadType === "Hot" ? "#FF8080" : leadType === "Cold" ? "#72e7d7" : leadType === "Warm" ? "#ee7600" : "" }`}>
                                { leadType === "Hot" && (
                                  <svg  xmlns="http://www.w3.org/2000/svg" class="position-absolute" style="right:0px;bottom:0px" height="30px" viewBox="0 0 24 24" width="30px" fill="#cd5c5c78"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.57 13.16c-1.36.28-2.17 1.16-2.17 2.41 0 1.34 1.11 2.42 2.49 2.42 2.05 0 3.71-1.66 3.71-3.71 0-1.07-.15-2.12-.46-3.12-.79 1.07-2.2 1.72-3.57 2zM13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM12 20c-3.31 0-6-2.69-6-6 0-1.53.3-3.04.86-4.43 1.01 1.01 2.41 1.63 3.97 1.63 2.66 0 4.75-1.83 5.28-4.43C17.34 8.97 18 11.44 18 14c0 3.31-2.69 6-6 6z"/></svg>
                                )
                                }

                                {leadType === "Cold" && (
                                  <svg xmlns="http://www.w3.org/2000/svg" class="position-absolute" style="right:0px;bottom:0px" height="24px" viewBox="0 0 24 24" width="24px" fill="#4ccbd0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>
                                )
                                }

                                {leadType === "Warm" && (
                                  <svg xmlns="http://www.w3.org/2000/svg" class="position-absolute" style="right:0px;bottom:0px" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#ee7600"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M12.01,12.46c-0.15,0.42-0.15,0.82-0.08,1.28c0.1,0.55,0.33,1.04,0.2,1.6c-0.13,0.59-0.77,1.38-1.53,1.63 c1.28,1.05,3.2,0.37,3.39-1.32C14.16,14.11,12.55,13.67,12.01,12.46z"/><path d="M2,2v20h20V2H2z M12,18c-1.58,0-2.97-1.88-3-3.06c0-0.05-0.01-0.13-0.01-0.22c-0.13-1.73,1-3.2,2.47-4.37 c0.47,1.01,1.27,2.03,2.57,2.92C14.61,13.69,15,14.13,15,15C15,16.65,13.65,18,12,18z M20,20h-2v-2h-2.02 c0.63-0.84,1.02-1.87,1.02-3c0-1.89-1.09-2.85-1.85-3.37C12.2,9.61,13,7,13,7c-6.73,3.57-6.02,7.47-6,8 c0.03,0.96,0.49,2.07,1.23,3H6v2H4V4h16V20z"/></g></g></svg>
                                )
                                }

                                <span class="color-black">Case Type</span>
                                <span  class="color-black">{leadType}</span>
                              </div>
                            </div>
                            <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 p-r-0 p-l-0'>
                              <div class=" display-flex flex-direction-column newWorkSpaceCard listCard h-full m-l-10" style={`height:80px;border:0.5px solid ${leadType === "Hot" ? "#FF8080" : leadType === "Cold" ? "#72e7d7" : leadType === "Warm" ? "#ee7600" : "" }`}>
                                <span class="color-black">Reference</span>
                                <span class="color-black">Yash Na..</span>
                              </div>
                            </div>
                            <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 p-r-0 p-l-0'>
                              <div class=" display-flex flex-direction-column newWorkSpaceCard listCard h-full m-l-10" style={`height:80px;border:0.5px solid ${leadType === "Hot" ? "#FF8080" : leadType === "Cold" ? "#72e7d7" : leadType === "Warm" ? "#ee7600" : "" }`}>
                                <span class="color-black">Dummy</span>
                                <span class="color-black">Data</span>
                              </div>
                            </div>
                            <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 p-r-0 p-l-0'>
                              <div class=" display-flex flex-direction-column newWorkSpaceCard listCard h-full m-l-10" style={`height:80px;border:0.5px solid ${leadType === "Hot" ? "#FF8080" : leadType === "Cold" ? "#72e7d7" : leadType === "Warm" ? "#ee7600" : "" }`}>
                                <span class="color-black">Rating</span>
                                <div class={`ratingSystem`} style="cursor:pointer;color:black;height: 21px;" />
                                <div class="ratingHolder"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 p-r-0 pos-relative">
                        <div id="time-tracker-scroller" onWheel={(e)=>timeTracker()} class="display-flex time-tracker-goals pos-relative">
                          <div id="goal-pointer" onClick={(e)=>currentGoal("1", "goal-pointer")} class="cursor-pointer goal-pointer m-r-100">
                            <svg class='goalimg' style={{transform: `${isCurrentGoalType == "goal-pointer" ? "scale(1.2)" : ""}`}} xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#4ccbd0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                            {/* <img class='goalimg' style={{transform: `${isCurrentGoalType == "goal-pointer" ? "scale(1.2)" : ""}`}} width="24" height="24" src="../assets/images/pin.png"/> */}
                          </div>
                          <div class="progressbar display-flex m-r-100 align-center" style="width: 8px;background: #ff444482;border-radius:2px;height: 30px;padding: 0 7px;" title='Hot' />
                          <div id="goal-pointer-two" onClick={(e)=>currentGoal("1", "goal-pointer-two")} class="display-flex goal-pointer m-r-200">
                            <svg style={`${isCurrentGoalType == "goal-pointer-two" ? "transform : scale(1.2);" : ""}`} xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#4ccbd0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                            {/* <img style={`${isCurrentGoalType == "goal-pointer-two" ? "transform : scale(1.2);" : ""}`}  width="24" height="24" src="../assets/images/pin.png"/> */}
                          </div>
                          <div class="progressbar display-flex m-r-100 align-center" style="width: 8px;background: #ff444482;border-radius:2px;height: 30px;padding: 0 7px;" title='Hot' />
                          <div class="progressbar display-flex m-l-10 m-r-0 pos-absolute align-center" style="left:300;width: 8px;background: #ff444482;border-radius:2px;height: auto;padding: 0 7px;" title='Hot' />
                          <div id="goal-pointer-three" onClick={(e)=>currentGoal("1", "goal-pointer-three")} class="cursor-pointer goal-pointer m-r-200">
                            <svg style={{transform: `${isCurrentGoalType == "goal-pointer-three" ? "scale(1.2)" : ""}`}} xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#4ccbd0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>

                            {/* <img style={{transform: `${isCurrentGoalType == "goal-pointer-three" ? "scale(1.2)" : ""}`}}  width="24" height="24" src="../assets/images/pin.png"/> */}
                          </div>
                          <div class="progressbar display-flex m-r-100 align-center" style="width: 8px;background: #ff444482;border-radius:2px;height: 30px;padding: 0 7px;" title='Hot' />
                          <div id="goal-pointer-four" onClick={(e)=>currentGoal("1", "goal-pointer-four")} class="cursor-pointer goal-pointer m-r-200">
                            <svg style={{transform: `${isCurrentGoalType == "goal-pointer-four" ? "scale(1.2)" : ""}`}}  xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#4ccbd0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                            {/* <img style={{transform: `${isCurrentGoalType == "goal-pointer-four" ? "scale(1.2)" : ""}`}}  width="24" height="24" src="../assets/images/pin.png"/> */}
                          </div>
                          <div class="progressbar display-flex m-r-100 align-center" style="width: 8px;background: #ff444482;border-radius:2px;height: 30px;padding: 0 7px;" title='Hot' />
                          <div id="goal-pointer-five" onClick={(e)=>currentGoal("1", "goal-pointer-five")} class="display-flex goal-pointer m-r-200">
                            <svg style={`${isCurrentGoalType == "goal-pointer-five" ? "transform : scale(1.2); ;" : ""}`}  xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#4ccbd0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                            {/* <img style={`${isCurrentGoalType == "goal-pointer-five" ? "transform : scale(1.2); ;" : ""}`}  width="24" height="24" src="../assets/images/pin.png"/> */}
                          </div>
                          <div class="progressbar display-flex m-r-100 align-center" style="width: 8px;background: #ff444482;border-radius:2px;height: 30px;padding: 0 7px;" title='Hot' />
                          <div id="goal-pointer-six" onClick={(e)=>currentGoal("1", "goal-pointer-six")} class="cursor-pointer goal-pointer m-r-200">
                            <svg style={{transform: `${isCurrentGoalType == "goal-pointer-six" ? "scale(1.2)" : ""}`}}  xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#4ccbd0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>

                            {/* <img style={{transform: `${isCurrentGoalType == "goal-pointer-six" ? "scale(1.2)" : ""}`}}  width="24" height="24" src="../assets/images/pin.png"/> */}
                          </div>
                          <div class="progressbar display-flex m-r-100 align-center" style="width: 8px;background: #ff444482;border-radius:2px;height: 30px;padding: 0 7px;" title='Hot' />
                          <div id="goal-pointer-seven" onClick={(e)=>currentGoal("1", "goal-pointer-seven")} class="cursor-pointer goal-pointer m-r-200">
                            <svg style={{transform: `${isCurrentGoalType == "goal-pointer-seven" ? "scale(1.2)" : ""}`}}  xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#4ccbd0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                            {/* <img style={{transform: `${isCurrentGoalType == "goal-pointer-seven" ? "scale(1.2)" : ""}`}}  width="24" height="24" src="../assets/images/pin.png"/> */}

                          </div>
                        </div>
                        <div class="goal-horizontal-scroll-container">
                          <div class="dotted-date-tracker" />
                          <div class="current-date">
                            <svg width="5" height="55" viewBox="0 0 2 61" fill="#ff444482" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 0V60.5" stroke="#ff444482"/>
                            </svg>
                            <p style="font-size: 9px; color: slategrey; white-space: nowrap">Today 27 Jan</p>
                          </div>

                          <div class="date-pointer space-between display-flex ">
                            <div class="base-width datevisible">
                              <svg class='' width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5 V4.5" stroke="black" title='dfsdfsdfsd'/>
                              </svg>
                              <p style="color:slategrey">18 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="2" height="4" viewBox="0 0 2 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0V4" stroke="#AEAEAE"/>
                              </svg>
                              <p class='inner-date' style="color:slategrey">19 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="2" height="4" viewBox="0 0 2 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0V4" stroke="#AEAEAE"/>
                              </svg>
                              <p class="inner-date" style="color:slategrey">20 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="2" height="4" viewBox="0 0 2 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0V4" stroke="#AEAEAE"/>
                              </svg>
                              <p class="inner-date" style="color:slategrey">21 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">22 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">23 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">24 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">25 Jan</p>
                            </div>


                            <div class="base-width">
                              <svg width="2" height="4" viewBox="0 0 2 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0V4" stroke="#AEAEAE"/>
                              </svg>
                              <p class='inner-date' style="color:slategrey">26 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="2" height="4" viewBox="0 0 2 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0V4" stroke="#AEAEAE"/>
                              </svg>
                              <p class="inner-date" style="color:slategrey">27 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="2" height="4" viewBox="0 0 2 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0V4" stroke="#AEAEAE"/>
                              </svg>
                              <p class="inner-date" style="color:slategrey">28 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">29 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">30 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">31 Jan</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">01 Feb</p>
                            </div>
                            <div class="base-width">
                              <svg width="2" height="4" viewBox="0 0 2 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0V4" stroke="#AEAEAE"/>
                              </svg>
                              <p class="inner-date" style="color:slategrey">02 Feb</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">03 Feb</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">04 Feb</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">05 Feb</p>
                            </div>
                            <div class="base-width">
                              <svg width="1" height="5" viewBox="0 0 1 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0.5V4.5" stroke="black"/>
                              </svg>
                              <p style="color:slategrey">06 Feb</p>
                            </div>
                          </div>
                          {/* <div class="date-list-tracker space-between display-flex">
                        <p class="start-end-date base-width" style="border: 1px solid">Jan 18, 2022</p>
                        <div class="display-flex space-between" style="width: 60%">
                            <p class="start-end-date base-width">Jan 20, 2022</p>
                            <p class="start-end-date base-width">Jan 24, 2022</p>
                            <p class="start-end-date base-width">Jan 28, 2022</p>
                        </div>
                        <p class="start-end-date base-width">Feb 1, 2022</p>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="position:relative;height:calc(100vh - 92px)">
            <div class ="row">
              <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 p-r-0">
                <div class='row'>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0">
                    <div class="row">
                      <div class="col-xs-3 col-sm-3 col-md-12 col-lg-12 p-l-0 m-t-10 l-hideCaseDetail">
                        <Widget1 totalTargetColor="#6799B0" setActivePageMenu={setActivePageMenu}  setActiveSubTab={setActiveSubTab} activeSubTab="Summary"  activeTab="Enquiry" widgetTitle="Enquiry" height="100px" targetFontSize="fs-30" totalTarget="100%" />
                        {/* <div class="card pos-relative" style="min-height:140px; overflow:hidden;background:#3fe0d0;color:#fff" >
                          <div class="display-flex justify-between">
                              <p  onClick={(e)=>setActivePageMenu('enquirySummary')}>Enquiry</p>
                              <p>Status</p>
                          </div>
                      </div> */}
                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-12 col-lg-12 p-l-0 m-t-10 xs-hideCaseDetail sm-hideCaseDetail">
                        <Widget1 isGraph={true} totalTargetColor="#6799B0" setActivePageMenu={setActivePageMenu}  setActiveSubTab={setActiveSubTab} activeSubTab="Summary"  activeTab="Enquiry" widgetTitle="Enquiry" graphColor="#6799B0" height="130px" contentHeight="70%" graphHeight="30%" totalTarget="100%"  target="Completed In" targetDays="20 Days"  data={[1, 2, 0, 1,0, 3, 2, 3,0, 0, 0, 0, 1, 0, 0, 2,3,2,4,5]} label={['2018-09-01', '2018-09-02', '2018-09-03', '2018-09-04','2018-09-05', '2018-09-06', '2018-09-07', '2018-09-08','2018-09-09', '2018-09-10', '2018-09-11', '2018-09-12','2018-09-13', '2018-09-14', '2018-09-15', '2018-09-16','2018-09-17', '2018-09-18', '2018-09-19', '2018-09-20']}  graphID='spark10'  targetFontSize="fs-35"/>
                        {/* <div class="card pos-relative" style="min-height:140px; overflow:hidden;background:#3fe0d0;color:#fff" >
                          <div class="display-flex justify-between">
                              <p  onClick={(e)=>setActivePageMenu('enquirySummary')}>Enquiry</p>
                              <p>Status</p>
                          </div>
                      </div> */}
                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-12 col-lg-12 p-l-0 m-t-10 l-hideCaseDetail">
                        <Widget1 totalTargetColor="#30C192" setActivePageMenu={setActivePageMenu}  setActiveSubTab={setActiveSubTab} activeSubTab="Summary"  activeTab="Booking" widgetTitle="Booking" height="100px" totalTarget="10%" targetFontSize="fs-30"/>
                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-12 col-lg-12 p-l-0 m-t-10 xs-hideCaseDetail sm-hideCaseDetail">
                        <Widget1 isGraph={true} totalTargetColor="#30C192" setActivePageMenu={setActivePageMenu}  setActiveSubTab={setActiveSubTab} activeSubTab="Summary"  activeTab="Booking" widgetTitle="Booking" graphColor="#30C192" height="130px" contentHeight="70%" graphHeight="30%" totalTarget="10%"   target="In Progress Since" targetDays="15 Days"  data={[1,0,5,1,3,2,1,1]} label={['2018-09-01', '2018-09-02', '2018-09-03', '2018-09-04','2018-09-05', '2018-09-06', '2018-09-07', '2018-09-08']}  graphID='spark11' targetFontSize="fs-35" />
                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-12 col-lg-12 p-l-0 m-t-10 l-hideCaseDetail">
                        <Widget1 totalTargetColor="#74FAC8" setActivePageMenu={setActivePageMenu}  setActiveSubTab={setActiveSubTab} activeSubTab="Summary"  activeTab="Retail" widgetTitle="Retail" height="100px" totalTarget="0%" targetFontSize="fs-30"/>
                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-12 col-lg-12 p-l-0 m-t-10 xs-hideCaseDetail sm-hideCaseDetail">
                        <Widget1 isGraph={true} totalTargetColor="#74FAC8" setActivePageMenu={setActivePageMenu}  setActiveSubTab={setActiveSubTab} activeSubTab="Summary"  activeTab="Retail" widgetTitle="Retail" graphColor="#74FAC8" height="130px" contentHeight="70%" graphHeight="30%" totalTarget="0%"   target="Not Yet" targetDays="Initiated"  data={[1,1,1,1,1,1,1,1]} label={['2018-09-01', '2018-09-02', '2018-09-03', '2018-09-04','2018-09-05', '2018-09-06', '2018-09-07', '2018-09-08']}  graphID='spark12' targetFontSize="fs-35"/>
                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-12 col-lg-12 p-l-0 m-t-10 l-hideCaseDetail">
                        <Widget1 totalTargetColor="#4ccbd0" setActivePageMenu={setActivePageMenu}  setActiveSubTab={setActiveSubTab} activeSubTab="Summary"  activeTab="Delivery" widgetTitle="Delivery" height="100px" totalTarget="0%" targetFontSize="fs-30"/>
                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-12 col-lg-12 p-l-0 m-t-10 xs-hideCaseDetail sm-hideCaseDetail">
                        <Widget1 isGraph={true} totalTargetColor="#4ccbd0" setActivePageMenu={setActivePageMenu}  setActiveSubTab={setActiveSubTab} activeSubTab="Summary"  activeTab="Delivery" widgetTitle="Delivery" graphColor="#4ccbd0" height="130px" contentHeight="70%" graphHeight="30%" totalTarget="0%"   target="Not Yet" targetDays="Initiated"  data={[1,1,1,1,1,1,1,1]} label={['2018-09-01', '2018-09-02', '2018-09-03', '2018-09-04','2018-09-05', '2018-09-06', '2018-09-07', '2018-09-08']}  graphID='spark13' targetFontSize="fs-35"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 p-l-0 p-r-0">
                {
                  activePageMenu === 'Case' && (
                    <div class='row'>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 m-t-10">
                        {/* <div class="row">
                            <div class="col-xs-12 p-r-0" style="height:40px">
                                <nav class="tds-tab-o-container tds-tab-list" role="tablist" aria-label="Tabs">
                                  <button onClick={(e) => setActiveSubTab("Summary")} class={activeSubTab === "Summary" ? "tds-tab-active m-r-5 fs-12 f-w-500" : " m-r-5 fs-12 f-w-500"} type="button" style="min-width:130px" >{activePageMenu} Summary</button>
                                  <button onClick={(e) => setActiveSubTab("Contact Details")} class={`${activeSubTab === "Contact Details"? "tds-tab-active m-r-5 m-l-5 fs-12 f-w-500" : "m-r-5 m-l-5 fs-12 f-w-500"}`} type="button" style="min-width:113px">Contact Details</button>
                                  <button onClick={(e) => setActiveSubTab("Vehicle Details")} class={`${activeSubTab === "Vehicle Details"? "tds-tab-active m-r-5 m-l-5fs-12 f-w-500 fs-12 f-w-500" : "m-r-5 m-l-5 fs-12 f-w-500"}`} type="button" style="min-width:110px">Vehicle Details</button>
                                  <button onClick={(e) => setActiveSubTab("Finance Details")} class={`${activeSubTab === "Finance Details"? "tds-tab-active m-r-5 m-l-5fs-12 f-w-500 fs-12 f-w-500" : "m-r-5 m-l-5 fs-12 f-w-500"}`} type="button" style="min-width:114px">Finance Details</button>
                                  <button onClick={(e) => setActiveSubTab("Accessories Details")} class={`${activeSubTab === "Accessories Details"? "tds-tab-active m-r-5 m-l-5 fs-12 f-w-500" : "m-r-5 m-l-5 fs-12 f-w-500"}`} type="button" style="min-width:140px">Accessories Details</button>
                                </nav>
                            </div>
                          </div> */}
                        { activeSubTab === "Summary" && (
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-r-0 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0">
                                  <div class="card text-dark pos-relative" style="height:160px; background:#95cde7;">
                                    <div class="row">
                                      <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 p-l-0 p-r-0 ">
                                        <CaseCardHeader1
                                          cardText="Grand i10 Nios"
                                          cardTextVariant = "VTVT 1.6 SX Option"
                                          cardBgColor="#fff"
                                          cardHeight="65px"
                                          togglePriceBreakup={togglePriceBreakup}
                                          cardText2="Petrol | Manual | Titan Gray"
                                          cardIcon={
                                            <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 6h10.29l1.04 3H5.81l1.04-3zM19 16H5v-4.66l.12-.34h13.77l.11.34V16z"/><circle cx="7.5" cy="13.5" r="1.5"/><circle cx="16.5" cy="13.5" r="1.5"/></svg>
                                          }/>
                                        {/* <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                          <div class ="row">
                                            <div class="col-lg-4 p-l-0 p-r-0">
                                              <span>
                                                <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                              </span>
                                            </div>
                                            <div class="col-lg-8 p-l-0 p-r-0">
                                              <div class="p-t-10 p-b-10">
                                                <div class ="row">
                                                  <div class="col-lg-12 display-flex align-center p-b-10">
                                                    <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                  </div>
                                                </div>
                                                <div class ="row">
                                                  <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                    <div class ="p-t-10 p-b-10 display-flex">
                                                      <div class="display-flex flex-direction-column w-half">
                                                        <p class="fs-10" style="color:#90929a">Address</p>
                                                        <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                      </div>
                                                      <div class="display-flex flex-direction-column w-half m-l-20">
                                                        <p class="fs-10" style="color:#90929a">DOB</p>
                                                        <p class="fs-12"> 4 Mar '87</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                      <div class="display-flex flex-direction-column w-half">
                                                        <p class="fs-10" style="color:#90929a">Email</p>
                                                        <p class="fs-12">vihang@technative.in</p>
                                                      </div>
                                                      <div class="display-flex flex-direction-column w-half m-l-20">
                                                        <p class="fs-10" style="color:#90929a">Phone</p>
                                                        <p class="fs-12"> 0001212987</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                      </div> */}


                                      </div>
                                      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 p-l-0 m-t-10 ">
                                        <CaseCardHeader1
                                          cardText="Finance"
                                          // cardTextVariant = "VTVT 1.6 SX Option"
                                          cardBgColor="#fff"
                                          cardHeight="65px"
                                          togglePriceBreakup={togglePriceBreakup}
                                          //cardText2="Petrol | Manual | Titan Gray"
                                          cardIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="#ddf0f3" width="24px" height="24px" viewBox="0 0 184.906 184.986">
                                            <path id="Money-Bag-Icon-SVG-plkf" d="M15.325,183.9A15.345,15.345,0,0,1,0,168.577a31.311,31.311,0,0,1,9.254-22.32,46.655,46.655,0,0,0,13.734-33.186A80.943,80.943,0,0,1,67.668,40.452L50.2,5.538A3.829,3.829,0,0,1,55.31.39c9.725,4.7,22.752,7.269,36.644,7.269,13.91,0,26.918-2.573,36.643-7.269a3.8,3.8,0,0,1,4.381.746,3.833,3.833,0,0,1,.727,4.4L116.238,40.452a80.944,80.944,0,0,1,44.68,72.619,46.655,46.655,0,0,0,13.734,33.186,31.308,31.308,0,0,1,9.255,22.32A15.345,15.345,0,0,1,168.58,183.9Zm56.1-136.77a73.284,73.284,0,0,0-40.769,65.939A54.313,54.313,0,0,1,14.677,151.68a23.622,23.622,0,0,0-7.015,16.9,7.673,7.673,0,0,0,7.663,7.663H168.58a7.673,7.673,0,0,0,7.663-7.663,23.7,23.7,0,0,0-7.015-16.9,54.309,54.309,0,0,1-15.974-38.608A73.3,73.3,0,0,0,112.5,47.132l-1.493-.746a40.22,40.22,0,0,1-4.421,1.218,42.438,42.438,0,0,1-4.323,1.219c-1.022.176-2.083.176-3.124.294a57.068,57.068,0,0,1-7.191.688,56.453,56.453,0,0,1-7.152-.688C83.74,49,82.66,49,81.638,48.8a39.542,39.542,0,0,1-4.323-1.2,43.544,43.544,0,0,1-4.421-1.218Zm4.107-8.114a31.136,31.136,0,0,0,5.442,1.67c.609.157,1.121.373,1.749.49a54.991,54.991,0,0,0,18.47,0c.608-.118,1.1-.334,1.689-.472a31.973,31.973,0,0,0,5.521-1.689L122.387,11a103.808,103.808,0,0,1-30.434,4.323A103.819,103.819,0,0,1,61.518,11ZM94.841,141.135,73.6,116.3l-.039-4.971h9.981a14.524,14.524,0,0,0,8.134-2.182,9.435,9.435,0,0,0,3.969-5.835H72.462l1.828-6.287H95.549c-1.257-5.07-5.188-7.722-11.749-7.938H72.541L74.408,82.8h37.056l-1.847,6.287h-9.431a16.414,16.414,0,0,1,3.242,7.938h8.036l-1.847,6.287h-6.071c-.491,4.735-2.358,8.311-5.639,10.708-3.3,2.4-7.88,3.576-13.734,3.576l19.766,23.047v.491Z" transform="translate(0.5 0.584)" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
                                          </svg>
                                          }/>
                                      </div>
                                      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 p-l-0 m-t-10 ">
                                        <CaseCardHeader1
                                          cardText="Used Cars"
                                          // cardTextVariant = "VTVT 1.6 SX Option"
                                          cardBgColor="#fff"
                                          cardHeight="65px"
                                          togglePriceBreakup={togglePriceBreakup}
                                          //cardText2="Petrol | Manual | Titan Gray"
                                          cardIcon={<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#ddf0f3"><g><rect fill="none" height="24" width="24"/></g><g><g><g><circle cx="6.5" cy="15.5" r="1.5"/></g><g><circle cx="15.5" cy="15.5" r="1.5"/></g><g><path d="M18,13v5H4v-5H18c-1.91,0-3.63-0.76-4.89-2H4.81l1.04-3h5.44C11.1,7.37,11,6.7,11,6s0.1-1.37,0.29-2H8v2H5.5 C4.84,6,4.29,6.42,4.08,7.01L2,13v8c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-1h12v1c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-8 l-0.09-0.27C19.3,12.9,18.66,13,18,13z"/></g><g><path d="M18,1c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S20.76,1,18,1z M18.5,9h-1V8h1V9z M18.5,7h-1V3h1V7z"/></g></g></g></svg>}/>

                                      </div>
                                      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-t-10 p-l-0 p-r-0">
                                        <CaseCardHeader1
                                          cardText="Accessories"
                                          cardTextVariant = ""
                                          cardBgColor="#fff"
                                          cardHeight="65px"
                                          togglePriceBreakup={togglePriceBreakup}
                                          // cardText2="Petrol | Manual | Titan Gray"
                                          cardIcon={
                                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  width="25px" height="25px"
                                              viewBox="0 0 512 512" fill="#ddf0f3">
                                              <g transform="translate(1 1)">
                                                <g>
                                                  <g>
                                                    <path d="M129.987,329.24c4.267,21.333,23.04,36.693,44.373,36.693c3.413,0,6.827-0.853,9.387-0.853
                                               c24.747-5.12,48.64-7.68,70.827-7.68s46.08,2.56,69.973,7.68c24.747,5.12,48.64-11.093,53.76-35.84
                                               c0.853-2.56,0.853-5.973,1.707-8.533c0.853-6.827,0.853-14.507-0.853-21.333l-24.747-106.667
                                               c-4.267-17.067-17.067-29.867-33.28-34.133c-11.093-3.413-31.573-6.827-58.88-6.827c-3.413,0-5.973,0-5.973,0h-1.707h-2.56
                                               c0,0-2.56,0-5.973,0c-27.307,0-46.933,3.413-58.88,6.827c-17.067,4.267-29.013,17.92-33.28,34.133l-24.747,106.667
                                               c-1.707,7.68-1.707,14.507-0.853,21.333C129.133,324.12,129.133,326.68,129.987,329.24z M146.2,303.64l24.747-106.667
                                               c2.56-10.24,10.24-18.773,20.48-21.333s29.013-5.973,54.613-5.973c3.413,0,5.12,0,5.973,0h2.56h3.413c0,0,2.56,0,5.12,0
                                               c25.6,0,43.52,3.413,55.467,5.973c10.24,2.56,17.92,11.093,20.48,21.333L363.8,303.64c1.707,5.12,1.707,9.387,0.853,14.507
                                               c-0.853,2.56-0.853,5.12-1.707,7.68c-3.224,14.506-17.102,24.439-31.573,22.624v-25.184c0-5.12-3.413-8.533-8.533-8.533
                                               s-8.533,3.413-8.533,8.533v22.106c-5.733-0.941-11.421-1.744-17.067-2.421v-28.218c0-5.12-3.413-8.533-8.533-8.533
                                               c-5.12,0-8.533,3.413-8.533,8.533v26.562c-5.735-0.423-11.425-0.709-17.067-0.851V306.2c0-5.12-3.413-8.533-8.533-8.533
                                               s-8.533,3.413-8.533,8.533v34.244c-5.651,0.142-11.344,0.43-17.067,0.854v-26.565c0-5.12-3.413-8.533-8.533-8.533
                                               c-5.12,0-8.533,3.413-8.533,8.533v28.239c-5.674,0.691-11.366,1.513-17.067,2.477v-22.182c0-5.12-3.413-8.533-8.533-8.533
                                               s-8.533,3.413-8.533,8.533v25.262c-14.797,1.415-27.548-8.429-30.72-22.702c-0.853-2.56-1.707-5.12-1.707-7.68
                                               C144.493,313.88,145.347,308.76,146.2,303.64z"/>
                                                    <path d="M468.76,424.813c0-14.507-5.12-27.307-14.507-35.84c-10.592-9.969-25.272-13.566-35.084-14.783
                                               c5.163-12.957,9.199-28.256,12.044-45.804c1.707-13.653,1.707-27.307-1.707-40.96l-30.72-128.853
                                               c-9.624-30.545-43.456-44.876-75.947-51.555V84.333h23.893c9.387,0,17.92-4.267,21.333-11.093c5.12-7.68,6.827-17.067,3.413-25.6
                                               l-11.093-30.72C356.12,5.827,345.88-1,334.787-1h-161.28c-11.093,0-21.333,6.827-25.6,17.067l-11.093,30.72
                                               c-2.56,8.533-1.707,17.92,3.413,25.6s12.8,11.947,22.187,11.947h23.893v22.642c-32.821,6.72-67.102,21.249-76.8,52.451
                                               l-29.867,128c-3.413,13.653-4.267,27.307-1.707,40.96c2.909,17.942,7.062,33.534,12.393,46.674
                                               c-9.893,1.233-24.037,4.844-34.58,14.766C46.36,399.213,41.24,411.16,41.24,426.52c0,0.83,5.657,79.874,102.4,84.279V511h8.533
                                               h8.533H348.44h8.533h8.533v-0.201C462.25,506.393,467.931,427.302,468.76,424.813z M153.88,63
                                               c-1.707-2.56-1.707-5.973-0.853-9.387l11.093-30.72c0.853-4.267,5.12-6.827,9.387-6.827H335.64c4.267,0,7.68,2.56,9.387,6.827
                                               l11.093,30.72c1.707,3.413,0.853,6.827-0.853,9.387c-1.707,2.56-5.12,4.267-8.533,4.267h-184.32
                                               C159,67.267,155.587,65.56,153.88,63z M203.373,84.333h102.4v19.794c-26.884-3.641-49.398-2.728-51.2-2.728
                                               c-2.144,0-24.501-0.895-51.2,2.7V84.333z M96.707,291.693l29.867-128c11.947-37.547,82.773-45.227,119.467-45.227
                                               c3.413,0,5.973,0,8.533,0c31.573-1.707,115.2,3.413,128,44.373l31.573,128.853c3.413,11.093,3.413,23.04,1.707,34.133
                                               c-2.166,12.996-5.86,29.657-12.243,44.621l-0.557-0.247l-4.267,7.68c-10.578,19.529-23.487,29.739-39.46,30.646
                                               c-9.632-3.474-51.815-16.601-101.733-16.975c-0.34-0.004-0.681-0.006-1.023-0.008c-0.382-0.002-0.761-0.009-1.144-0.009
                                               c-0.105,0-0.209,0.002-0.314,0.003c-0.18,0-0.359-0.003-0.539-0.003c-9.419,0-18.572,0.479-27.298,1.278
                                               c-0.04,0.004-0.081,0.007-0.121,0.011c-0.932,0.086-1.86,0.174-2.783,0.267c-37.478,3.669-66.185,12.773-73.012,15.495
                                               c-0.126-0.002-0.253-0.004-0.379-0.007c-37.287-1.996-50.876-52.124-55.98-82.751C93.293,314.733,94.147,302.787,96.707,291.693z
                                                M58.307,425.667c0-10.24,2.56-17.92,8.533-23.893c10.226-9.374,25.555-10.237,31.546-10.24
                                               c8.445,14.337,18.901,24.296,31.232,29.609c4.476,2.08,9.151,3.596,14.022,4.524v68.267
                                               C63.427,489.667,58.307,428.227,58.307,425.667z M160.707,493.933v-70.827c13.618-4.256,51.006-14.451,93.536-14.504
                                               c0.603,0.001,1.205,0.003,1.805,0.008c0.088,0,0.176,0.001,0.264,0.002c42.38,0.407,79.032,10.668,92.129,14.645v70.676H160.707z
                                                M365.507,493.08v-68.028c18.574-2.633,33.773-14.027,45.254-33.518c5.991,0.002,21.32,0.866,31.546,10.24
                                               c5.973,5.973,8.533,13.653,8.533,23.04C450.84,427.373,446.573,488.813,365.507,493.08z"/>
                                                  </g>
                                                </g>
                                              </g>
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                              <g />
                                            </svg>
                                          }/>

                                      </div>
                                    </div>
                                    <span class="pos-absolute" style="right: 0px;top: 0px;">
                                      <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 24 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-10 p-r-0 p-l-0' >
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0 pos-relative" style="height:250px">
                                    <div class ="row">
                                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <div class="display-flex" >
                                                  <span class="fs-10 f-w-600" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0">First Time Buyer</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0">VIP</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0">Others</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px"> Vaibhav Mathkari</h6>
                                                <p class="fs-14" >Baner, Pune</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
                                                <svg class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Aadhar Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3432 4324 5324</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">PAN Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3234556642</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-b-10 p-r-10 p-l-10" >
                                              <div class ="p-t-10 p-t-10 display-flex" >
                                                <div class="display-flex flex-direction-column w-half ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">CIBIL SCORE</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600">25</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20 ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Source CRM</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> Call Center</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <button class="fs-12 m-b-15 m-l-15" style="border:1px solid #6799b0">View More</button>
                                        </div>
                                      </div>
                                    </div>
                                    <span class="pos-absolute" style="right: 0px;bottom: 0px;">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="100px" viewBox="0 0 10 24" width="100px" fill="#ddf0f3"><rect fill="none" height="24" width="24"/><path d="M13.17,4L18,8.83V20H6V4H13.17 M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2L14,2z M12,14 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z M16,17.43c0-0.81-0.48-1.53-1.22-1.85 C13.93,15.21,12.99,15,12,15c-0.99,0-1.93,0.21-2.78,0.58C8.48,15.9,8,16.62,8,17.43V18h8V17.43z"/></svg>
                                    </span>
                                  </div>

                                  {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                  <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                        <div class="row" >
                                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding display-flex">
                                            <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                            <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row m-t-20" >
                                          <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                            <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                            <div class="display-flex">
                                              <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                            <div class="display-flex">
                                              <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                              <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                              <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                            </div>
                                          </div>
                                          <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                            <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                            <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                            <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                          </div>

                                        </div>
                                        <div class="row m-t-20" >
                                          <div class="col-lg-12 p-r-15 p-l-15">
                                            <div class="display-flex flex-direction-column">
                                              <div class="display-flex">
                                                  <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                  <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                  <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                              </div>
                                              <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row m-t-20" >
                                          <div class="col-sm-12 no-padding">
                                            <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                          </div>
                                          <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                            <div class='accordion' > Detailed Price Info </div>
                                            <div class="panel">
                                              <table style='border: 1px dotted;'>
                                                <thead>
                                                  <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                  <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                  <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                </thead>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                </tr>
                                              </table>
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                    </div>


                                  </div> */}
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="height:200px">
                                    <div class ="row">
                                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <div class="display-flex">
                                                  <span class="fs-10 f-w-600" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Sales Executive</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Omkar Wagh</h6>
                                                <p class="fs-14" >Khed-Shivapur</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>

                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Est. Closing Date</p>

                                                  </div>
                                                  <p class="fs-14 f-w-600">22nd March,2022</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex" style="justify-content: right;margin-top: -24px;">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 10 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>

                                                  </div>

                                                </div>

                                              </div>
                                            </div>
                                          </div>
                                          <button class="fs-12 m-b-15 m-l-15" style="border:1px solid #6799b0">View More</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 ">
                              <div class="row">
                                <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0' >
                                  <CaseCardHeader
                                    cardText="&#8377;17,25,000"
                                    cardBgColor="#fff"
                                    cardHeight="600px"
                                    togglePriceBreakup={togglePriceBreakup}
                                    cardIcon={<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="80px" viewBox="0 0 24 24" width="80px" fill="#ddf0f3"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M13.66,7C13.1,5.82,11.9,5,10.5,5L6,5V3h12v2l-3.26,0c0.48,0.58,0.84,1.26,1.05,2L18,7v2l-2.02,0c-0.25,2.8-2.61,5-5.48,5 H9.77l6.73,7h-2.77L7,14v-2h3.5c1.76,0,3.22-1.3,3.46-3L6,9V7L13.66,7z"/></g></g></svg>
                                    }
                                    status= {true}
                                  />
                                  <div class="card text-dark m-t-10 p-t-0 p-l-0 p-b-0 p-r-0 m-t-10" style="height:150px">
                                    <div class ="row">
                                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <div class="display-flex">
                                                  {/*<span class="fs-10 f-w-600" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Sales Executive</span> */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Current Payment</h6>
                                                {/* <p class="fs-14" >Khed-Shivapur</p> */}
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                {/* <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path></svg>

                                                  <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg> */}
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    {/* <p class="fs-12" style="color:#90929a">Est. Closing Date</p> */}

                                                  </div>
                                                  {/* <p class="fs-14 f-w-600">22nd March,2022</p>  */}
                                                </div>
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex" style="justify-content: right;margin-top: -24px;">
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 10 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg> */}

                                                  </div>

                                                </div>
                                              </div>
                                            </div>
                                          </div>                                                                     <button class="fs-12 m-b-15 m-l-15" style="border:1px solid #6799b0">View More</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0 m-t-15" style="height:150px">
                                    <div class ="row">
                                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <div class="display-flex">
                                                  {/* <span class="fs-10 f-w-600" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Sales Executive</span> */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Down Payment</h6>
                                                {/* <p class="fs-14" >Khed-Shivapur</p> */}
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                {/* <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path></svg>

                                                  <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg> */}
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    {/* <p class="fs-12" style="color:#90929a">Est. Closing Date</p> */}

                                                  </div>
                                                  {/* <p class="fs-14 f-w-600">22nd March,2022</p>  */}
                                                </div>
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex" style="justify-content: right;margin-top: -24px;">
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 10 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>
                                                   */}
                                                  </div>

                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <button class="fs-12 m-b-15 m-l-15" style="border:1px solid #6799b0">View More</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="height:150px">
                                    <div class ="row">
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Booking</h6>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                {/* <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path></svg>

                                                  <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg> */}
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    {/* <p class="fs-12" style="color:#90929a">Est. Closing Date</p>
                                                   */}
                                                  </div>
                                                  {/* <p class="fs-14 f-w-600">22nd March,2022</p> */}
                                                </div>
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex" style="justify-content: right;margin-top: -24px;">
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 10 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>
                                                   */}
                                                  </div>

                                                </div>
                                              </div>
                                            </div>
                                          </div>                                                                   <button class="fs-12 m-b-15 m-l-15" style="border:1px solid #6799b0">View More</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                    <div class="row" >
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="row" style="border-bottom:1px solid lightgrey">
                                          <div class="col-lg-12 p-b-10 p-t-10" >
                                              <h6 class="fs-12">Value Added Customer
                                              </h6>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 6h10.29l1.04 3H5.81l1.04-3zM19 16H5v-4.66l.12-.34h13.77l.11.34V16z"/><circle cx="7.5" cy="13.5" r="1.5"/><circle cx="16.5" cy="13.5" r="1.5"/></svg>
                                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">CAR</p>
                                                <p class="fs-14 f-w-600">Verna SX</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">Insurance</p>
                                                <p class="fs-14 f-w-600">Bajaj</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M19,14V6c0-1.1-0.9-2-2-2H3C1.9,4,1,4.9,1,6v8c0,1.1,0.9,2,2,2h14C18.1,16,19,15.1,19,14z M17,14H3V6h14V14z M10,7 c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S11.66,7,10,7z M23,7v11c0,1.1-0.9,2-2,2H4c0-1,0-0.9,0-2h17V7C22.1,7,22,7,23,7z"/></g></svg>
                                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">Finance</p>
                                                <p class="fs-14 f-w-600">Card</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                                              <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">Accessories</p>
                                                <p class="fs-14 f-w-600">Tires</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                */}
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                    <div class="row" >
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="row" style="border-bottom:1px solid lightgrey">
                                          <div class="col-lg-12 p-b-10 p-t-10" >
                                              <h6 class="fs-16 f-w-600">LCTS Lending</h6>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15">
                                            <div class="display-flex" style="justify-content: space-evenly;">
                                              <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" width="25px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20">
                                                <p class="fs-12" style="color:#90929a; line-height:1">CONTRACT DATE</p>
                                                <p class="fs-14 f-w-600">03/03/2020</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-30">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COD</p>
                                                <p class="fs-14 f-w-600">02/04/2023</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div> */}
                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0' >
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                      <div class="row" >
                                        <div class="col-lg-12 p-l-0 p-r-0">
                                          <div class="row" style="border-bottom:1px solid lightgrey">
                                            <div class="col-lg-12 p-b-10 p-t-10" >
                                                <div class="display-flex justify-between">
                                                  <h6 class="fs-16 f-w-600">Balance</h6>
                                                  <div class="display-flex">
                                                    <p>Settlement</p>
                                                    <p class="m-l-10">Original</p>
                                                  </div>
                                                </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 p-t-10 p-b-10" style="border-bottom:1px solid lightgrey">
                                              <LinearProgress progress={0.8} />
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 p-t-10 p-b-10">
                                              <div class="display-flex align-center" style="justify-content: space-evenly;">
                                                <div class="display-flex flex-direction-column">
                                                  <p class="fs-12" style="color:#90929a">SETTLEMENT</p>
                                                  <p class="fs-20 f-w-600">₹3000</p>
                                                </div>
                                                <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">-</span>
                                                <div class="display-flex flex-direction-column">
                                                  <p class="fs-12" style="color:#90929a">PAID</p>
                                                  <p class="fs-20 f-w-600" >₹1000</p>
                                                </div>
                                                <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">=</span>
                                                <div class="display-flex flex-direction-column">
                                                  <p class="fs-12" style="color:#90929a">BALANCE</p>
                                                  <p class="fs-20 f-w-600">₹2000</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 p-l-0 p-r-0">

                              <div class="row card text-dark">
                                <div class="col-lg-12 display-flex flex-direction-column align-center p-b-10 p-l-10 p-r-10 p-t-10 " style="height:150px">
                                  <div class="display-flex flex-direction-column w-full">
                                    <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Pending Action</h6>
                                    {/* <p class="fs-12" >Khed-Shivapur</p> */}
                                  </div>

                                  <div class="display-flex flex-direction-column h-full w-full">
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                                      <p class="fs-12 m-l-10">upload aadhar card</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                      <p class="fs-12 m-l-10">fill enquiry form</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"/><circle cx="6.5" cy="6.5" r="1.5"/></svg>
                                      <p class="fs-12 m-l-10">ask permission for Discount</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="activityworkshop m-t-15">
                                <p class='fs-12 m-b-10 color-black'>RECENT ACTIVITIES</p>
                                <div class="row" style="height:43vh;overflow: hidden auto">
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6799b0"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#6799b0"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#30c192"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#30c192"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#b59b7c"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#b59b7c"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6799b0"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#6799b0"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#29AB87"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#29AB87"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#b59b7c"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#b59b7c"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        )}

                        { activeSubTab === "Contact Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Vehicle Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:white">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                  <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                  <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                  <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Finance Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Accessories Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  )
                }
                {
                  activePageMenu === 'Enquiry' && (
                    <div class='row'>
                      <div class="col-xs-12 col-sm-12 col -md-12 col-lg-12 p-l-0 m-t-10">
                        { activeSubTab === "Summary" && (
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                  <CaseCardHeader1
                                    cardText="Grand i10 Nios"
                                    cardTextVariant = "VTVT 1.6 SX Option"
                                    cardBgColor="#fff"
                                    cardHeight="100%"
                                    cardText2="Petrol | Manual | Titan Gray"
                                    cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 10 24" width="50px" fill="#ddf0f3"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><path d="M18.92,6.01C18.72,5.42,18.16,5,17.5,5h-11C5.84,5,5.29,5.42,5.08,6.01L3,12v8c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-1 h12v1c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-8L18.92,6.01z M6.85,7h10.29l1.04,3H5.81L6.85,7z M19,17H5v-5h14V17z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></g></g></svg>}/>
                                  {/* <span class="card-header">Contact info</span>
                                    <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                              <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                    </div> */}


                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0 pos-relative" style="height:225px">
                                    <div class ="row">
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <h6 class="fs-12" style="width:30%">Customer Details</h6>
                                                <div class="display-flex" style="width:70%;justify-content:flex-end">
                                                  <span class="fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">First Time Buyer</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">VIP</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Others</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px"> Vaibhav Mathkari</h6>
                                                <p class="fs-14" >Baner, Pune</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
                                                <svg class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Aadhar Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3432 4324 5324</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">PAN Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3234556642</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-b-10 p-r-10 p-l-10" >
                                              <div class ="p-t-10 p-t-10 display-flex" >
                                                <div class="display-flex flex-direction-column w-half ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">CIBIL SCORE</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600">25</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20 ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Source CRM</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> Call Center</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <span class="pos-absolute" style="right: 0px;bottom: 0px;">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="100px" viewBox="0 0 10 24" width="100px" fill="#ddf0f3"><rect fill="none" height="24" width="24"/><path d="M13.17,4L18,8.83V20H6V4H13.17 M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2L14,2z M12,14 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z M16,17.43c0-0.81-0.48-1.53-1.22-1.85 C13.93,15.21,12.99,15,12,15c-0.99,0-1.93,0.21-2.78,0.58C8.48,15.9,8,16.62,8,17.43V18h8V17.43z"/></svg>
                                    </span>
                                  </div>

                                  {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                  <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                        <div class="row" >
                                          <div class="col-lg-12 no-padding display-flex">
                                            <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                            <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row m-t-20" >
                                          <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                            <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                            <div class="display-flex">
                                              <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                            <div class="display-flex">
                                              <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                              <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                              <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                            </div>
                                          </div>
                                          <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                            <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                            <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                            <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                          </div>

                                        </div>
                                        <div class="row m-t-20" >
                                          <div class="col-lg-12 p-r-15 p-l-15">
                                            <div class="display-flex flex-direction-column">
                                              <div class="display-flex">
                                                  <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                  <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                  <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                              </div>
                                              <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row m-t-20" >
                                          <div class="col-sm-12 no-padding">
                                            <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                          </div>
                                          <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                            <div class='accordion' > Detailed Price Info </div>
                                            <div class="panel">
                                              <table style='border: 1px dotted;'>
                                                <thead>
                                                  <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                  <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                  <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                </thead>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                </tr>
                                              </table>
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                    </div>


                                  </div> */}
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="height:150px">
                                    <div class ="row">
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <div class="display-flex" style="width:60%;justify-content:flex-end">

                                                  <span class="fs-10 f-w-600" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Sales Executive</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Omkar Wagh</h6>
                                                <p class="fs-14" >Khed-Shivapur</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>

                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Est. Closing Date</p>

                                                  </div>
                                                  <p class="fs-14 f-w-600">22nd March,2022</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex" style="justify-content: right;margin-top: -24px;">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 10 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>

                                                  </div>

                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                              <div class="row">
                                <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'>
                                  <div class="row">
                                    <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 p-r-0 p-l-0'>
                                      <div class=" display-flex flex-direction-column newWorkSpaceCard listCard " style="border:0.5px solid #FF8080">
                                        <span class="color-black">Case Type </span>
                                        <span class="color-black">HOT</span>
                                      </div>
                                    </div>
                                    <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 p-r-0 p-l-0'>
                                      <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                        <span class="color-black">Reference</span>
                                        <span class="color-black">Yash Na..</span>
                                      </div>
                                    </div>
                                    <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 p-r-0 p-l-0'>
                                      <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                        <span class="color-black">Dummy</span>
                                        <span class="color-black">Data</span>
                                      </div>
                                    </div>
                                    <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 p-r-0 p-l-0'>
                                      <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                        <span class="color-black">Rating</span>
                                        <span class="color-black">25000</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">

                                <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0 m-t-15' >
                                  <CaseCardHeader
                                    cardText="&#8377;17,25,000"
                                    cardBgColor="#fff"
                                    cardHeight="440px"
                                    cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="120px" viewBox="0 0 10 24" width="100px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                    }/>
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                    <div class="row" >
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="row" style="border-bottom:1px solid lightgrey">
                                          <div class="col-lg-12 p-b-10 p-t-10" >
                                              <h6 class="fs-12">Value Added Customer
                                              </h6>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 6h10.29l1.04 3H5.81l1.04-3zM19 16H5v-4.66l.12-.34h13.77l.11.34V16z"/><circle cx="7.5" cy="13.5" r="1.5"/><circle cx="16.5" cy="13.5" r="1.5"/></svg>
                                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">CAR</p>
                                                <p class="fs-14 f-w-600">Verna SX</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">Insurance</p>
                                                <p class="fs-14 f-w-600">Bajaj</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M19,14V6c0-1.1-0.9-2-2-2H3C1.9,4,1,4.9,1,6v8c0,1.1,0.9,2,2,2h14C18.1,16,19,15.1,19,14z M17,14H3V6h14V14z M10,7 c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S11.66,7,10,7z M23,7v11c0,1.1-0.9,2-2,2H4c0-1,0-0.9,0-2h17V7C22.1,7,22,7,23,7z"/></g></svg>
                                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">Finance</p>
                                                <p class="fs-14 f-w-600">Card</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                                              <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">Accessories</p>
                                                <p class="fs-14 f-w-600">Tires</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                */}
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                    <div class="row" >
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="row" style="border-bottom:1px solid lightgrey">
                                          <div class="col-lg-12 p-b-10 p-t-10" >
                                              <h6 class="fs-16 f-w-600">LCTS Lending</h6>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15">
                                            <div class="display-flex" style="justify-content: space-evenly;">
                                              <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" width="25px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20">
                                                <p class="fs-12" style="color:#90929a; line-height:1">CONTRACT DATE</p>
                                                <p class="fs-14 f-w-600">03/03/2020</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-30">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COD</p>
                                                <p class="fs-14 f-w-600">02/04/2023</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div> */}
                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0' >
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                      <div class="row" >
                                        <div class="col-lg-12 p-l-0 p-r-0">
                                          <div class="row" style="border-bottom:1px solid lightgrey">
                                            <div class="col-lg-12 p-b-10 p-t-10" >
                                                <div class="display-flex justify-between">
                                                  <h6 class="fs-16 f-w-600">Balance</h6>
                                                  <div class="display-flex">
                                                    <p>Settlement</p>
                                                    <p class="m-l-10">Original</p>
                                                  </div>
                                                </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 p-t-10 p-b-10" style="border-bottom:1px solid lightgrey">
                                              <LinearProgress progress={0.8} />
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 p-t-10 p-b-10">
                                              <div class="display-flex align-center" style="justify-content: space-evenly;">
                                                <div class="display-flex flex-direction-column">
                                                  <p class="fs-12" style="color:#90929a">SETTLEMENT</p>
                                                  <p class="fs-20 f-w-600">₹3000</p>
                                                </div>
                                                <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">-</span>
                                                <div class="display-flex flex-direction-column">
                                                  <p class="fs-12" style="color:#90929a">PAID</p>
                                                  <p class="fs-20 f-w-600" >₹1000</p>
                                                </div>
                                                <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">=</span>
                                                <div class="display-flex flex-direction-column">
                                                  <p class="fs-12" style="color:#90929a">BALANCE</p>
                                                  <p class="fs-20 f-w-600">₹2000</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">

                              <div class="row card text-dark">
                                <div class="col-lg-12 display-flex flex-direction-column align-center p-b-10 p-l-10 p-r-10 p-t-10 " style="height:150px">
                                  <div class="display-flex flex-direction-column w-full">
                                    <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Pending Action</h6>
                                    {/* <p class="fs-12" >Khed-Shivapur</p> */}
                                  </div>

                                  <div class="display-flex flex-direction-column h-full w-full">
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                                      <p class="fs-12 m-l-10">upload aadhar card</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                      <p class="fs-12 m-l-10">fill enquiry form</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"/><circle cx="6.5" cy="6.5" r="1.5"/></svg>
                                      <p class="fs-12 m-l-10">ask permission for Discount</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="activityworkshop m-t-15 ">
                                <p class='fs-12 m-b-10 color-black'>RECENT ACTIVITIES</p>
                                <div class="row" style="height:43vh;overflow: hidden auto">
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6799b0"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#6799b0"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0fe540"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#0fe540"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#4ccbd0"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#4ccbd0"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#29AB87"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#29AB87"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0fe540"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#0fe540"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#4ccbd0"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#4ccbd0"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                </div>
                              </div>


                            </div>
                          </div>
                        )}
                        { activeSubTab === "Contact Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Vehicle Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                  <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                  <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                  <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Finance Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Accessories Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                  )
                }
                {
                  activePageMenu === 'Booking' && (

                    <div class='row'>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 m-t-10">
                        { activeSubTab === "Summary" && (
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                  <CaseCardHeader1
                                    cardText="Grand i10 Nios"
                                    cardTextVariant = "VTVT 1.6 SX Option"
                                    cardBgColor="#fff"
                                    cardHeight="100px"
                                    cardText2="Petrol | Manual | Titan Gray"
                                    cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 10 24" width="50px" fill="#ddf0f3"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><path d="M18.92,6.01C18.72,5.42,18.16,5,17.5,5h-11C5.84,5,5.29,5.42,5.08,6.01L3,12v8c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-1 h12v1c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-8L18.92,6.01z M6.85,7h10.29l1.04,3H5.81L6.85,7z M19,17H5v-5h14V17z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></g></g></svg>}/>
                                  {/* <span class="card-header">Contact info</span>
                                    <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                              <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                    </div> */}


                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0 pos-relative" style="height:225px">
                                    <div class ="row">
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <h6 class="fs-12" style="width:30%">Customer Details</h6>
                                                <div class="display-flex" style="width:70%;justify-content:flex-end">
                                                  <span class="fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">First Time Buyer</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">VIP</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Others</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px"> Vaibhav Mathkari</h6>
                                                <p class="fs-14" >Baner, Pune</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
                                                <svg class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Aadhar Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3432 4324 5324</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">PAN Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3234556642</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-b-10 p-r-10 p-l-10" >
                                              <div class ="p-t-10 p-t-10 display-flex" >
                                                <div class="display-flex flex-direction-column w-half ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">CIBIL SCORE</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600">25</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20 ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Source CRM</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> Call Center</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <span class="pos-absolute" style="right: 0px;bottom: 0px;">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="100px" viewBox="0 0 10 24" width="100px" fill="#ddf0f3"><rect fill="none" height="24" width="24"/><path d="M13.17,4L18,8.83V20H6V4H13.17 M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2L14,2z M12,14 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z M16,17.43c0-0.81-0.48-1.53-1.22-1.85 C13.93,15.21,12.99,15,12,15c-0.99,0-1.93,0.21-2.78,0.58C8.48,15.9,8,16.62,8,17.43V18h8V17.43z"/></svg>
                                    </span>
                                  </div>

                                  {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                  <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                        <div class="row" >
                                          <div class="col-lg-12 no-padding display-flex">
                                            <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                            <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row m-t-20" >
                                          <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                            <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                            <div class="display-flex">
                                              <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                            <div class="display-flex">
                                              <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                              <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                              <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                            </div>
                                          </div>
                                          <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                            <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                            <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                            <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                          </div>

                                        </div>
                                        <div class="row m-t-20" >
                                          <div class="col-lg-12 p-r-15 p-l-15">
                                            <div class="display-flex flex-direction-column">
                                              <div class="display-flex">
                                                  <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                  <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                  <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                              </div>
                                              <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row m-t-20" >
                                          <div class="col-sm-12 no-padding">
                                            <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                          </div>
                                          <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                            <div class='accordion' > Detailed Price Info </div>
                                            <div class="panel">
                                              <table style='border: 1px dotted;'>
                                                <thead>
                                                  <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                  <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                  <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                </thead>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                </tr>
                                                <tr>
                                                  <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                  <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                  <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                </tr>
                                              </table>
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                    </div>


                                  </div> */}
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="height:150px">
                                    <div class ="row">
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <div class="display-flex">

                                                  <span class="fs-10 f-w-600" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Sales Executive</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Omkar Wagh</h6>
                                                <p class="fs-14" >Khed-Shivapur</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>

                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Est. Closing Date</p>

                                                  </div>
                                                  <p class="fs-14 f-w-600">22nd March,2022</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex" style="justify-content: right;margin-top: -24px;">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 10 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>

                                                  </div>

                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                              <div class="row">
                                <div class='display-flex  col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0 'style="justify-content:space-between" >
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard " style="border:0.5px solid #FF8080">
                                    <span class="color-black">Case Type</span>
                                    <span class="color-black">HOT</span>
                                  </div>
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                    <span class="color-black">Reference</span>
                                    <span class="color-black">Yash Na..</span>
                                  </div>
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                    <span class="color-black">Dummy</span>
                                    <span class="color-black">Data</span>
                                  </div>
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                    <span class="color-black">Rating</span>
                                    <span class="color-black">25000</span>
                                  </div>
                                </div>
                              </div>
                              <div class="row">

                                <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0 m-t-15' >
                                  <CaseCardHeader
                                    cardText="&#8377;17,25,000"
                                    cardBgColor="#fff"
                                    cardHeight="440px"
                                    cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="120px" viewBox="0 0 10 24" width="100px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                    }/>
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                    <div class="row" >
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="row" style="border-bottom:1px solid lightgrey">
                                          <div class="col-lg-12 p-b-10 p-t-10" >
                                              <h6 class="fs-12">Value Added Customer
                                              </h6>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 6h10.29l1.04 3H5.81l1.04-3zM19 16H5v-4.66l.12-.34h13.77l.11.34V16z"/><circle cx="7.5" cy="13.5" r="1.5"/><circle cx="16.5" cy="13.5" r="1.5"/></svg>
                                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">CAR</p>
                                                <p class="fs-14 f-w-600">Verna SX</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">Insurance</p>
                                                <p class="fs-14 f-w-600">Bajaj</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M19,14V6c0-1.1-0.9-2-2-2H3C1.9,4,1,4.9,1,6v8c0,1.1,0.9,2,2,2h14C18.1,16,19,15.1,19,14z M17,14H3V6h14V14z M10,7 c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S11.66,7,10,7z M23,7v11c0,1.1-0.9,2-2,2H4c0-1,0-0.9,0-2h17V7C22.1,7,22,7,23,7z"/></g></svg>
                                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">Finance</p>
                                                <p class="fs-14 f-w-600">Card</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                            <div class="display-flex">
                                              <div class="display-flex align-center" style="width:55px">
                                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                                              <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">Accessories</p>
                                                <p class="fs-14 f-w-600">Tires</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                                <p class="fs-14 f-w-600">₹20000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                */}
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                    <div class="row" >
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="row" style="border-bottom:1px solid lightgrey">
                                          <div class="col-lg-12 p-b-10 p-t-10" >
                                              <h6 class="fs-16 f-w-600">LCTS Lending</h6>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-15 p-b-15">
                                            <div class="display-flex" style="justify-content: space-evenly;">
                                              <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" width="25px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"/></svg>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-20">
                                                <p class="fs-12" style="color:#90929a; line-height:1">CONTRACT DATE</p>
                                                <p class="fs-14 f-w-600">03/03/2020</p>
                                              </div>
                                              <div class="display-flex flex-direction-column m-l-30">
                                                <p class="fs-12" style="color:#90929a; line-height:1">COD</p>
                                                <p class="fs-14 f-w-600">02/04/2023</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div> */}
                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0' >
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                      <div class="row" >
                                        <div class="col-lg-12 p-l-0 p-r-0">
                                          <div class="row" style="border-bottom:1px solid lightgrey">
                                            <div class="col-lg-12 p-b-10 p-t-10" >
                                                <div class="display-flex justify-between">
                                                  <h6 class="fs-16 f-w-600">Balance</h6>
                                                  <div class="display-flex">
                                                    <p>Settlement</p>
                                                    <p class="m-l-10">Original</p>
                                                  </div>
                                                </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 p-t-10 p-b-10" style="border-bottom:1px solid lightgrey">
                                              <LinearProgress progress={0.8} />
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 p-t-10 p-b-10">
                                              <div class="display-flex align-center" style="justify-content: space-evenly;">
                                                <div class="display-flex flex-direction-column">
                                                  <p class="fs-12" style="color:#90929a">SETTLEMENT</p>
                                                  <p class="fs-20 f-w-600">₹3000</p>
                                                </div>
                                                <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">-</span>
                                                <div class="display-flex flex-direction-column">
                                                  <p class="fs-12" style="color:#90929a">PAID</p>
                                                  <p class="fs-20 f-w-600" >₹1000</p>
                                                </div>
                                                <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">=</span>
                                                <div class="display-flex flex-direction-column">
                                                  <p class="fs-12" style="color:#90929a">BALANCE</p>
                                                  <p class="fs-20 f-w-600">₹2000</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                              <div class="row card text-dark">
                                <div class="col-lg-12 display-flex flex-direction-column align-center p-b-10 p-l-10 p-r-10 p-t-10 " style="height:150px">
                                  <div class="display-flex flex-direction-column w-full">
                                    <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Pending Action</h6>
                                    {/* <p class="fs-12" >Khed-Shivapur</p> */}
                                  </div>

                                  <div class="display-flex flex-direction-column h-full w-full">
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                                      <p class="fs-12 m-l-10">upload aadhar card</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                      <p class="fs-12 m-l-10">fill enquiry form</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"/><circle cx="6.5" cy="6.5" r="1.5"/></svg>
                                      <p class="fs-12 m-l-10">ask permission for Discount</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="activityworkshop m-t-15">
                                <p class='fs-12 m-b-10 color-black'>RECENT ACTIVITIES</p>
                                <div class="row" style="height:43vh;overflow: hidden auto">
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#29AB87"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#29AB87"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0fe540"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#0fe540"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#b59b7c"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#b59b7c"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#29AB87"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#29AB87"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0fe540"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#0fe540"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#b59b7c"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#b59b7c"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                </div>
                              </div>


                            </div>
                          </div>
                        )}

                        { activeSubTab === "Contact Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Vehicle Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                  <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                  <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                  <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Finance Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Accessories Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                      <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                          <div>
                                            <div class="row" >
                                              <div class="col-lg-12 no-padding display-flex">
                                                <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                                <div class="display-flex">
                                                  <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                  <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                </div>
                                                <div class="display-flex">
                                                  <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                  <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                                </div>
                                              </div>
                                              <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                                <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                                <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                              </div>

                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-lg-12 p-r-15 p-l-15">
                                                <div class="display-flex flex-direction-column">
                                                  <div class="display-flex">
                                                      <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                      <div class="tooltip m-l-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                        <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                      </div>
                                                      <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                  </div>
                                                  <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row m-t-20" >
                                              <div class="col-sm-12 no-padding">
                                                <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                              </div>
                                              <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                                <div class='accordion' > Detailed Price Info </div>
                                                <div class="panel">
                                                  <table style='border: 1px dotted;'>
                                                    <thead>
                                                      <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                      <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                      <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                    </thead>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                    </tr>
                                                    <tr>
                                                      <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                      <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                      <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                    </tr>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                      </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                }
                {
                  activePageMenu === 'Retail' && (
                    <div class='row'>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 m-t-10">
                        { activeSubTab === "Summary" && (
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                  <CaseCardHeader1
                                    cardText="Grand i10 Nios"
                                    cardTextVariant = "VTVT 1.6 SX Option"
                                    cardBgColor="#fff"
                                    cardHeight="100px"
                                    cardText2="Petrol | Manual | Titan Gray"
                                    cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 10 24" width="50px" fill="#ddf0f3"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><path d="M18.92,6.01C18.72,5.42,18.16,5,17.5,5h-11C5.84,5,5.29,5.42,5.08,6.01L3,12v8c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-1 h12v1c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-8L18.92,6.01z M6.85,7h10.29l1.04,3H5.81L6.85,7z M19,17H5v-5h14V17z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></g></g></svg>}/>
                                  {/* <span class="card-header">Contact info</span>
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                      <div class ="row">
                                        <div class="col-lg-4 p-l-0 p-r-0">
                                          <span>
                                            <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                          </span>
                                        </div>
                                        <div class="col-lg-8 p-l-0 p-r-0">
                                          <div class="p-t-10 p-b-10">
                                            <div class ="row">
                                              <div class="col-lg-12 display-flex align-center p-b-10">
                                                <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                              </div>
                                            </div>
                                            <div class ="row">
                                              <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                <div class ="p-t-10 p-b-10 display-flex">
                                                  <div class="display-flex flex-direction-column w-half">
                                                    <p class="fs-10" style="color:#90929a">Address</p>
                                                    <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                  </div>
                                                  <div class="display-flex flex-direction-column w-half m-l-20">
                                                    <p class="fs-10" style="color:#90929a">DOB</p>
                                                    <p class="fs-12"> 4 Mar '87</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class ="row">
                                            <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                              <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                  <div class="display-flex flex-direction-column w-half">
                                                    <p class="fs-10" style="color:#90929a">Email</p>
                                                    <p class="fs-12">vihang@technative.in</p>
                                                  </div>
                                                  <div class="display-flex flex-direction-column w-half m-l-20">
                                                    <p class="fs-10" style="color:#90929a">Phone</p>
                                                    <p class="fs-12"> 0001212987</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  </div> */}


                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0 pos-relative" style="height:225px">
                                    <div class ="row">
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <h6 class="fs-12" style="width:30%">Customer Details</h6>
                                                <div class="display-flex" style="width:70%;justify-content:flex-end">
                                                  <span class="fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">First Time Buyer</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">VIP</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Others</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px"> Vaibhav Mathkari</h6>
                                                <p class="fs-14" >Baner, Pune</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
                                                <svg class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Aadhar Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3432 4324 5324</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">PAN Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3234556642</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-b-10 p-r-10 p-l-10" >
                                              <div class ="p-t-10 p-t-10 display-flex" >
                                                <div class="display-flex flex-direction-column w-half ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">CIBIL SCORE</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600">25</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20 ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Source CRM</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> Call Center</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <span class="pos-absolute" style="right: 0px;bottom: 0px;">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="100px" viewBox="0 0 10 24" width="100px" fill="#ddf0f3"><rect fill="none" height="24" width="24"/><path d="M13.17,4L18,8.83V20H6V4H13.17 M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2L14,2z M12,14 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z M16,17.43c0-0.81-0.48-1.53-1.22-1.85 C13.93,15.21,12.99,15,12,15c-0.99,0-1.93,0.21-2.78,0.58C8.48,15.9,8,16.62,8,17.43V18h8V17.43z"/></svg>
                                    </span>
                                  </div>

                                  {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                  <div class="">
                                      <div>
                                      <div class="row" >
                                        <div class="col-lg-12 no-padding display-flex">
                                          <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                          <div class="tooltip m-l-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row m-t-20" >
                                        <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                          <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                          <div class="display-flex">
                                            <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                            <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                            </div>
                                          </div>
                                          <div class="display-flex">
                                            <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                            <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                            <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                          </div>
                                        </div>
                                        <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                          <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                          <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                          <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                        </div>

                                      </div>
                                      <div class="row m-t-20" >
                                        <div class="col-lg-12 p-r-15 p-l-15">
                                          <div class="display-flex flex-direction-column">
                                            <div class="display-flex">
                                                <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                                <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                            </div>
                                            <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row m-t-20" >
                                        <div class="col-sm-12 no-padding">
                                          <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                        </div>
                                        <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                          <div class='accordion' > Detailed Price Info </div>
                                          <div class="panel">
                                            <table style='border: 1px dotted;'>
                                              <thead>
                                                <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                              </thead>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                              </tr>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                              </tr>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                              </tr>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                              </tr>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                              </tr>
                                            </table>
                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  </div>


                                </div> */}
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="height:150px">
                                    <div class ="row">
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <div class="display-flex">

                                                  <span class="fs-10 f-w-600" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Sales Executive</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Omkar Wagh</h6>
                                                <p class="fs-14" >Khed-Shivapur</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>

                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Est. Closing Date</p>

                                                  </div>
                                                  <p class="fs-14 f-w-600">22nd March,2022</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex" style="justify-content: right;margin-top: -24px;">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 10 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>

                                                  </div>

                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                              <div class="row">
                                <div class='display-flex  col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0 'style="justify-content:space-between" >
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard " style="border:0.5px solid #FF8080">
                                    <span class="color-black">Case Type </span>
                                    <span class="color-black">HOT</span>
                                  </div>
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                    <span class="color-black">Reference</span>
                                    <span class="color-black">Yash Na..</span>
                                  </div>
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                    <span class="color-black">Dummy</span>
                                    <span class="color-black">Data</span>
                                  </div>
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                    <span class="color-black">Rating</span>
                                    <span class="color-black">25000</span>
                                  </div>
                                </div>
                              </div>
                              <div class="row">

                                <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0 m-t-15' >
                                  <CaseCardHeader
                                    cardText="&#8377;17,25,000"
                                    cardBgColor="#fff"
                                    cardHeight="440px"
                                    cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="120px" viewBox="0 0 10 24" width="100px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                    }/>
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                  <div class="row" >
                                    <div class="col-lg-12 p-l-0 p-r-0">
                                      <div class="row" style="border-bottom:1px solid lightgrey">
                                        <div class="col-lg-12 p-b-10 p-t-10" >
                                            <h6 class="fs-12">Value Added Customer
                                            </h6>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15">
                                          <div class="display-flex">
                                            <div class="display-flex align-center" style="width:55px">
                                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 6h10.29l1.04 3H5.81l1.04-3zM19 16H5v-4.66l.12-.34h13.77l.11.34V16z"/><circle cx="7.5" cy="13.5" r="1.5"/><circle cx="16.5" cy="13.5" r="1.5"/></svg>
                                              <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">CAR</p>
                                              <p class="fs-14 f-w-600">Verna SX</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                              <p class="fs-14 f-w-600">₹20000</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                          <div class="display-flex">
                                            <div class="display-flex align-center" style="width:55px">
                                              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                              <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">Insurance</p>
                                              <p class="fs-14 f-w-600">Bajaj</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                              <p class="fs-14 f-w-600">₹20000</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                          <div class="display-flex">
                                            <div class="display-flex align-center" style="width:55px">
                                              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M19,14V6c0-1.1-0.9-2-2-2H3C1.9,4,1,4.9,1,6v8c0,1.1,0.9,2,2,2h14C18.1,16,19,15.1,19,14z M17,14H3V6h14V14z M10,7 c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S11.66,7,10,7z M23,7v11c0,1.1-0.9,2-2,2H4c0-1,0-0.9,0-2h17V7C22.1,7,22,7,23,7z"/></g></svg>
                                              <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">Finance</p>
                                              <p class="fs-14 f-w-600">Card</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                              <p class="fs-14 f-w-600">₹20000</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                          <div class="display-flex">
                                            <div class="display-flex align-center" style="width:55px">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                                            <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">Accessories</p>
                                              <p class="fs-14 f-w-600">Tires</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                              <p class="fs-14 f-w-600">₹20000</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                              */}
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                  <div class="row" >
                                    <div class="col-lg-12 p-l-0 p-r-0">
                                      <div class="row" style="border-bottom:1px solid lightgrey">
                                        <div class="col-lg-12 p-b-10 p-t-10" >
                                            <h6 class="fs-16 f-w-600">LCTS Lending</h6>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15">
                                          <div class="display-flex" style="justify-content: space-evenly;">
                                            <div>
                                              <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" width="25px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20">
                                              <p class="fs-12" style="color:#90929a; line-height:1">CONTRACT DATE</p>
                                              <p class="fs-14 f-w-600">03/03/2020</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-30">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COD</p>
                                              <p class="fs-14 f-w-600">02/04/2023</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              </div> */}
                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0' >
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                    <div class="row" >
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="row" style="border-bottom:1px solid lightgrey">
                                          <div class="col-lg-12 p-b-10 p-t-10" >
                                              <div class="display-flex justify-between">
                                                <h6 class="fs-16 f-w-600">Balance</h6>
                                                <div class="display-flex">
                                                  <p>Settlement</p>
                                                  <p class="m-l-10">Original</p>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-10 p-b-10" style="border-bottom:1px solid lightgrey">
                                            <LinearProgress progress={0.8} />
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-10 p-b-10">
                                            <div class="display-flex align-center" style="justify-content: space-evenly;">
                                              <div class="display-flex flex-direction-column">
                                                <p class="fs-12" style="color:#90929a">SETTLEMENT</p>
                                                <p class="fs-20 f-w-600">₹3000</p>
                                              </div>
                                              <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">-</span>
                                              <div class="display-flex flex-direction-column">
                                                <p class="fs-12" style="color:#90929a">PAID</p>
                                                <p class="fs-20 f-w-600" >₹1000</p>
                                              </div>
                                              <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">=</span>
                                              <div class="display-flex flex-direction-column">
                                                <p class="fs-12" style="color:#90929a">BALANCE</p>
                                                <p class="fs-20 f-w-600">₹2000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div> */}
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">

                              <div class="row card text-dark">
                                <div class="col-lg-12 display-flex flex-direction-column align-center p-b-10 p-l-10 p-r-10 p-t-10 " style="height:150px">
                                  <div class="display-flex flex-direction-column w-full">
                                    <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Pending Action</h6>
                                    {/* <p class="fs-12" >Khed-Shivapur</p> */}
                                  </div>

                                  <div class="display-flex flex-direction-column h-full w-full">
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                                      <p class="fs-12 m-l-10">upload aadhar card</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                      <p class="fs-12 m-l-10">fill enquiry form</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"/><circle cx="6.5" cy="6.5" r="1.5"/></svg>
                                      <p class="fs-12 m-l-10">ask permission for Discount</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="activityworkshop m-t-15">
                                <p class='fs-12 m-b-10 color-black'>RECENT ACTIVITIES</p>
                                <div class="row" style="height:43vh;overflow: hidden auto">
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#29AB87"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#29AB87"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0fe540"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#0fe540"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#b59b7c"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#b59b7c"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#29AB87"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#29AB87"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0fe540"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#0fe540"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#b59b7c"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#b59b7c"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                </div>
                              </div>


                            </div>
                          </div>
                        )}

                        { activeSubTab === "Contact Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                    <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                    <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                    </div>
                                                    <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>


                                    </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Vehicle Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                  <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                  <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                  <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                    <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                    <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                    </div>
                                                    <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>


                                    </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Finance Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                    <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                    <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                    </div>
                                                    <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>


                                    </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Accessories Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                    <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                    <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                    </div>
                                                    <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>


                                    </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        =
                      </div>
                    </div>

                  )
                }
                {/* <div class='row'>
                      <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                        <span class="card-header">Contact info</span>
                        <div class="card text-dark m-b-20">
                          <div class="row">
                            <div class="col-xs-12">
                              <div class="row p-r-0 m-t-10 m-b-10">
                                <div class="col-xs-6 p-l-0 p-r-0">
                                  <p class="card-label">Phone Number</p>
                                  <p class="card-value">+91 9874586524</p>
                                </div>
                                <div class="col-xs-6 p-l-0 p-r-0">
                                  <p class="card-label">Email</p>
                                  <p class="card-value">yashvi@technative.in</p>
                                </div>
                              </div>
                              <div class="row p-r-0 m-t-10 m-b-10">
                                <div class="col-xs-11 p-l-0 p-r-0">
                                  <p class="card-label">Aadhar Number</p>
                                  <p class="card-value">7528 4852 9548 3568</p>
                                </div>
                                <div class="col-xs-1 p-r-0 display-flex align-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32" fill="none" class="mx-0">
                                    <path d="M16 32C7.17775 32 0 24.8223 0 16C0 7.17775 7.17775 0 16 0C24.8223 0 32 7.17775 32 16C32 24.8223 24.8223 32 16 32Z" fill="#77A984"/>
                                    <path d="M7 18L11.5 22L25 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                              <div class="row p-r-0 m-t-10 m-b-10">
                                <div class="col-xs-11 p-l-0 p-r-0">
                                  <p class="card-label">PAN Number</p>
                                  <p class="card-value">BHP8P98745</p>
                                </div>
                                <div class="col-xs-1 p-r-0 display-flex align-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 32 32" fill="none" class="mx-0">
                                    <path d="M16 32C7.17775 32 0 24.8223 0 16C0 7.17775 7.17775 0 16 0C24.8223 0 32 7.17775 32 16C32 24.8223 24.8223 32 16 32Z" fill="#77A984"/>
                                    <path d="M7 18L11.5 22L25 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <span class="card-header">More info</span>
                        <div class="card text-dark m-b-20">
                          <div class="row">
                            <div class="col-xs-12">
                              <div class="row p-r-0 m-t-10 m-b-10">
                                <div class="col-xs-6 p-l-0 p-r-0">
                                  <p class="card-label">Type of Buyer</p>
                                  <p class="card-value">First Time</p>
                                </div>
                                <div class="col-xs-6 p-l-0 p-r-0">
                                  <p class="card-label">Salary Bracket</p>
                                  <p class="card-value">{`< ${getFormattedAmount(500000)}`}</p>
                                </div>
                              </div>
                              <div class="row p-r-0 m-t-10 m-b-10">
                                <div class="col-xs-6 p-l-0 p-r-0">
                                  <p class="card-label">KMs in a Month</p>
                                  <p class="card-value">500 KMs</p>
                                </div>
                                <div class="col-xs-6 p-l-0 p-r-0">
                                  <p class="card-label">Mode of Purchase</p>
                                  <p class="card-value">Finance</p>
                                </div>
                              </div>
                              <div class="row p-r-0 m-t-10 m-b-10">
                                <div class="col-xs-12 p-l-0 p-r-0">
                                  <p class="card-label">Address</p>
                                  <p class="card-value">Baner, Pune - 411045</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class='row' >
                      <div class='col-xs-12 col-sm-6 col-md-8 ' >
                        <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                        <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 10px;'>
                          <div class="">
                            <div class="m-b-10">
                              <div class="row m-t-20" >
                                <div class="col-lg-12 no-padding">
                                  <p>VERNA 1.5 MPI IVT SX - Petrol</p>
                                </div>
                              </div>F
                              <div class="row m-t-20" >
                                <div class="col-lg-4 no-padding">
                                  <p class='fw-600' style='font-weight: 600;margin-bottom: 10px'>* Ex-Showroom Price</p>
                                  <p class='fw-600' style='font-weight: 600;margin-bottom: 10px'>₹16 30 300</p>
                                </div>
                                <div class="col-lg-8 no-padding">
                                  <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'>* Ex-Showroom PriceBy default Delhi prices are shown</p>
                                  <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'>Booking Amount ₹25 000</p>
                                </div>

                              </div>
                              <div class="row m-t-20" >
                                <div class="col-lg-12 no-padding">
                                  <p><span style='font-weight: 600;margin-bottom: 10px'>* On-Road Price: ₹18 11 887 </span><span style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><div class="tooltip"><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" />
                                    <span class="tooltiptext">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                  </div> (Excluding Basic insurance amount)</span></p>
                                </div>
                              </div>

                            </div>
                          </div>

                        </div>
                      </div>
                      <div class='col-xs-12 col-sm-6 col-md-4' >
                        <p class='m-t-10' style='font-size: 1.3rem;'>Need Analysis</p>
                        <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 10px;height:200px;'>
                          <div class="" />

                        </div>
                      </div>
                    </div>
                    <div class='row' >
                      <div class='col-xs-12 col-sm-6 col-md-8 ' >
                        <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                        <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 10px;'>
                        <div class="">
                            <div class="m-b-10">
                              <div class="row m-t-20" >
                                <div class="col-lg-12 no-padding">
                                  <p>VERNA 1.5 MPI IVT SX - Petrol</p>
                                </div>
                              </div>
                              <div class="row m-t-20" >
                                <div class="col-lg-4 no-padding">
                                  <p class='fw-600' style='font-weight: 600;margin-bottom: 10px'>* Ex-Showroom Price</p>
                                  <p class='fw-600' style='font-weight: 600;margin-bottom: 10px'>₹16 30 300</p>
                                </div>
                                <div class="col-lg-8 no-padding">
                                  <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'>* Ex-Showroom PriceBy default Delhi prices are shown</p>
                                  <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'>Booking Amount ₹25 000</p>
                                </div>

                              </div>
                              <div class="row m-t-20" >
                                <div class="col-lg-12 no-padding">
                                  <p><span style='font-weight: 600;margin-bottom: 10px'>* On-Road Price: ₹18 11 887 </span><span style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><div class="tooltip"><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" />
                                    <span class="tooltiptext">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                  </div> (Excluding Basic insurance amount)</span></p>
                                </div>
                              </div>
                              <div class="row m-t-20" >
                                <div class="col-sm-12 no-padding">
                                  <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                </div>
                                <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                  <div class='accordion' > Detailed Price Info </div>
                                  <div class="panel">
                                    <table style='border: 1px dotted;'>
                                      <thead>
                                        <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                        <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                        <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                      </thead>
                                      <tr>
                                        <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                        <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                        <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                      </tr>
                                      <tr>
                                        <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                        <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                        <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                      </tr>
                                      <tr>
                                        <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                        <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                        <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                      </tr>
                                      <tr>
                                        <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                        <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                        <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                      </tr>
                                      <tr>
                                        <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                        <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                        <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                      </tr>
                                    </table>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>


                        </div>
                      </div>
                      <div class='col-xs-12 col-sm-6 col-md-4' >
                        <p class='m-t-10' style='font-size: 1.3rem;'>Need Analysis</p>
                        <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 10px;height:200px;'>
                          <div class="" />

                        </div>
                      </div>
                    </div> */}
                {
                  activePageMenu === 'Delivery' && (

                    <div class='row'>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 m-t-10">
                        { activeSubTab === "Summary" && (
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                  <CaseCardHeader1
                                    cardText="Grand i10 Nios"
                                    cardTextVariant = "VTVT 1.6 SX Option"
                                    cardBgColor="#fff"
                                    cardHeight="100px"
                                    cardText2="Petrol | Manual | Titan Gray"
                                    cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 10 24" width="50px" fill="#ddf0f3"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><path d="M18.92,6.01C18.72,5.42,18.16,5,17.5,5h-11C5.84,5,5.29,5.42,5.08,6.01L3,12v8c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-1 h12v1c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1v-8L18.92,6.01z M6.85,7h10.29l1.04,3H5.81L6.85,7z M19,17H5v-5h14V17z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></g></g></svg>}/>
                                  {/* <span class="card-header">Contact info</span>
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                      <div class ="row">
                                        <div class="col-lg-4 p-l-0 p-r-0">
                                          <span>
                                            <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                          </span>
                                        </div>
                                        <div class="col-lg-8 p-l-0 p-r-0">
                                          <div class="p-t-10 p-b-10">
                                            <div class ="row">
                                              <div class="col-lg-12 display-flex align-center p-b-10">
                                                <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                              </div>
                                            </div>
                                            <div class ="row">
                                              <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                <div class ="p-t-10 p-b-10 display-flex">
                                                  <div class="display-flex flex-direction-column w-half">
                                                    <p class="fs-10" style="color:#90929a">Address</p>
                                                    <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                  </div>
                                                  <div class="display-flex flex-direction-column w-half m-l-20">
                                                    <p class="fs-10" style="color:#90929a">DOB</p>
                                                    <p class="fs-12"> 4 Mar '87</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class ="row">
                                            <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                              <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                  <div class="display-flex flex-direction-column w-half">
                                                    <p class="fs-10" style="color:#90929a">Email</p>
                                                    <p class="fs-12">vihang@technative.in</p>
                                                  </div>
                                                  <div class="display-flex flex-direction-column w-half m-l-20">
                                                    <p class="fs-10" style="color:#90929a">Phone</p>
                                                    <p class="fs-12"> 0001212987</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  </div> */}


                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0 pos-relative" style="height:225px">
                                    <div class ="row">
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <h6 class="fs-12" style="width:30%">Customer Details</h6>
                                                <div class="display-flex" style="width:70%;justify-content:flex-end">
                                                  <span class="fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">First Time Buyer</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">VIP</span>
                                                  <span class="m-l-10 fs-10 f-w-600 m-l-10" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Others</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px"> Vaibhav Mathkari</h6>
                                                <p class="fs-14" >Baner, Pune</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
                                                <svg class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Aadhar Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3432 4324 5324</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">PAN Card</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> 3234556642</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-b-10 p-r-10 p-l-10" >
                                              <div class ="p-t-10 p-t-10 display-flex" >
                                                <div class="display-flex flex-direction-column w-half ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">CIBIL SCORE</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600">25</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half m-l-20 ">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Source CRM</p>
                                                    <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z"/></svg>
                                                  </div>
                                                  <p class="fs-14 f-w-600"> Call Center</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <span class="pos-absolute" style="right: 0px;bottom: 0px;">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="100px" viewBox="0 0 10 24" width="100px" fill="#ddf0f3"><rect fill="none" height="24" width="24"/><path d="M13.17,4L18,8.83V20H6V4H13.17 M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2L14,2z M12,14 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z M16,17.43c0-0.81-0.48-1.53-1.22-1.85 C13.93,15.21,12.99,15,12,15c-0.99,0-1.93,0.21-2.78,0.58C8.48,15.9,8,16.62,8,17.43V18h8V17.43z"/></svg>
                                    </span>
                                  </div>

                                  {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                  <div class="">
                                      <div>
                                      <div class="row" >
                                        <div class="col-lg-12 no-padding display-flex">
                                          <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                          <div class="tooltip m-l-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row m-t-20" >
                                        <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                          <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                          <div class="display-flex">
                                            <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                            <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                            </div>
                                          </div>
                                          <div class="display-flex">
                                            <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                            <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                            <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                          </div>
                                        </div>
                                        <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                          <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                          <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                          <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                        </div>

                                      </div>
                                      <div class="row m-t-20" >
                                        <div class="col-lg-12 p-r-15 p-l-15">
                                          <div class="display-flex flex-direction-column">
                                            <div class="display-flex">
                                                <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                                <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                            </div>
                                            <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row m-t-20" >
                                        <div class="col-sm-12 no-padding">
                                          <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                        </div>
                                        <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                          <div class='accordion' > Detailed Price Info </div>
                                          <div class="panel">
                                            <table style='border: 1px dotted;'>
                                              <thead>
                                                <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                              </thead>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                              </tr>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                              </tr>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                              </tr>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                              </tr>
                                              <tr>
                                                <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                              </tr>
                                            </table>
                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  </div>


                                </div> */}
                                  <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="height:150px">
                                    <div class ="row">
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="p-t-10 p-b-10">
                                          <div class="row">
                                            <div class="col-lg-12 p-l-0 p-l-10 p-b-10" >
                                              <div class="display-flex align-center w-full">
                                                <div class="display-flex">

                                                  <span class="fs-10 f-w-600" style="border-radius:20px;color: white;padding: 5px 10px;background: #4ccbd0;">Sales Executive</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row">
                                            <div class="col-lg-12 display-flex align-center p-b-10 p-l-10 p-r-10 p-t-10" style="height:50px">
                                              <div class="display-flex flex-direction-column w-full">
                                                <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Omkar Wagh</h6>
                                                <p class="fs-14" >Khed-Shivapur</p>
                                              </div>
                                              <div class="display-flex justify-center h-full">
                                                <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000"><path d="M0 0h24v24H0z" fill="none" /><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>

                                                <svg  class="m-l-15 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22px" viewBox="0 0 24 24" width="22px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><path d="M19.05,4.91C17.18,3.03,14.69,2,12.04,2c-5.46,0-9.91,4.45-9.91,9.91c0,1.75,0.46,3.45,1.32,4.95L2.05,22l5.25-1.38 c1.45,0.79,3.08,1.21,4.74,1.21h0c0,0,0,0,0,0c5.46,0,9.91-4.45,9.91-9.91C21.95,9.27,20.92,6.78,19.05,4.91z M12.04,20.15 L12.04,20.15c-1.48,0-2.93-0.4-4.2-1.15l-0.3-0.18l-3.12,0.82l0.83-3.04l-0.2-0.31c-0.82-1.31-1.26-2.83-1.26-4.38 c0-4.54,3.7-8.24,8.24-8.24c2.2,0,4.27,0.86,5.82,2.42c1.56,1.56,2.41,3.63,2.41,5.83C20.28,16.46,16.58,20.15,12.04,20.15z M16.56,13.99c-0.25-0.12-1.47-0.72-1.69-0.81c-0.23-0.08-0.39-0.12-0.56,0.12c-0.17,0.25-0.64,0.81-0.78,0.97 c-0.14,0.17-0.29,0.19-0.54,0.06c-0.25-0.12-1.05-0.39-1.99-1.23c-0.74-0.66-1.23-1.47-1.38-1.72c-0.14-0.25-0.02-0.38,0.11-0.51 c0.11-0.11,0.25-0.29,0.37-0.43c0.12-0.14,0.17-0.25,0.25-0.41c0.08-0.17,0.04-0.31-0.02-0.43c-0.06-0.12-0.56-1.34-0.76-1.84 c-0.2-0.48-0.41-0.42-0.56-0.43C8.86,7.33,8.7,7.33,8.53,7.33c-0.17,0-0.43,0.06-0.66,0.31C7.65,7.89,7.01,8.49,7.01,9.71 c0,1.22,0.89,2.4,1.01,2.56c0.12,0.17,1.75,2.67,4.23,3.74c0.59,0.26,1.05,0.41,1.41,0.52c0.59,0.19,1.13,0.16,1.56,0.1 c0.48-0.07,1.47-0.6,1.67-1.18c0.21-0.58,0.21-1.07,0.14-1.18S16.81,14.11,16.56,13.99z"/></g></g></g></svg>
                                              </div>
                                            </div>
                                          </div>
                                          <div class ="row">
                                            <div class="col-lg-12 p-l-10 p-r-10">
                                              <div class ="p-b-10 display-flex m-t-10">
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex">
                                                    <p class="fs-12" style="color:#90929a">Est. Closing Date</p>

                                                  </div>
                                                  <p class="fs-14 f-w-600">22nd March,2022</p>
                                                </div>
                                                <div class="display-flex flex-direction-column w-half">
                                                  <div class="display-flex" style="justify-content: right;margin-top: -24px;">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 10 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>

                                                  </div>

                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                              <div class="row">
                                <div class='display-flex  col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0 'style="justify-content:space-between" >
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard " style="border:0.5px solid #FF8080">
                                    <span class="color-black">Case Type </span>
                                    <span class="color-black">HOT</span>
                                  </div>
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                    <span class="color-black">Reference</span>
                                    <span class="color-black">Yash Na..</span>
                                  </div>
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                    <span class="color-black">Dummy</span>
                                    <span class="color-black">Data</span>
                                  </div>
                                  <div class=" display-flex flex-direction-column newWorkSpaceCard listCard" style="border:0.5px solid #FF8080">
                                    <span class="color-black">Rating</span>
                                    <span class="color-black">25000</span>
                                  </div>
                                </div>
                              </div>
                              <div class="row">

                                <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0 m-t-15' >
                                  <CaseCardHeader
                                    cardText="&#8377;17,25,000"
                                    cardBgColor="#fff"
                                    cardHeight="440px"
                                    cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="120px" viewBox="0 0 10 24" width="100px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                    }/>
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                  <div class="row" >
                                    <div class="col-lg-12 p-l-0 p-r-0">
                                      <div class="row" style="border-bottom:1px solid lightgrey">
                                        <div class="col-lg-12 p-b-10 p-t-10" >
                                            <h6 class="fs-12">Value Added Customer
                                            </h6>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15">
                                          <div class="display-flex">
                                            <div class="display-flex align-center" style="width:55px">
                                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 6h10.29l1.04 3H5.81l1.04-3zM19 16H5v-4.66l.12-.34h13.77l.11.34V16z"/><circle cx="7.5" cy="13.5" r="1.5"/><circle cx="16.5" cy="13.5" r="1.5"/></svg>
                                              <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">CAR</p>
                                              <p class="fs-14 f-w-600">Verna SX</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                              <p class="fs-14 f-w-600">₹20000</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                          <div class="display-flex">
                                            <div class="display-flex align-center" style="width:55px">
                                              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                              <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">Insurance</p>
                                              <p class="fs-14 f-w-600">Bajaj</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                              <p class="fs-14 f-w-600">₹20000</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                          <div class="display-flex">
                                            <div class="display-flex align-center" style="width:55px">
                                              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M19,14V6c0-1.1-0.9-2-2-2H3C1.9,4,1,4.9,1,6v8c0,1.1,0.9,2,2,2h14C18.1,16,19,15.1,19,14z M17,14H3V6h14V14z M10,7 c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S11.66,7,10,7z M23,7v11c0,1.1-0.9,2-2,2H4c0-1,0-0.9,0-2h17V7C22.1,7,22,7,23,7z"/></g></svg>
                                              <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">Finance</p>
                                              <p class="fs-14 f-w-600">Card</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                              <p class="fs-14 f-w-600">₹20000</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15" style="border-top:1px solid lightgrey">
                                          <div class="display-flex">
                                            <div class="display-flex align-center" style="width:55px">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                                            <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#009B34"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:130px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">Accessories</p>
                                              <p class="fs-14 f-w-600">Tires</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20" style="width:80px">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COST</p>
                                              <p class="fs-14 f-w-600">₹20000</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                              */}
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                  <div class="row" >
                                    <div class="col-lg-12 p-l-0 p-r-0">
                                      <div class="row" style="border-bottom:1px solid lightgrey">
                                        <div class="col-lg-12 p-b-10 p-t-10" >
                                            <h6 class="fs-16 f-w-600">LCTS Lending</h6>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="col-lg-12 p-t-15 p-b-15">
                                          <div class="display-flex" style="justify-content: space-evenly;">
                                            <div>
                                              <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" width="25px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"/></svg>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-20">
                                              <p class="fs-12" style="color:#90929a; line-height:1">CONTRACT DATE</p>
                                              <p class="fs-14 f-w-600">03/03/2020</p>
                                            </div>
                                            <div class="display-flex flex-direction-column m-l-30">
                                              <p class="fs-12" style="color:#90929a; line-height:1">COD</p>
                                              <p class="fs-14 f-w-600">02/04/2023</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              </div> */}
                                </div>
                              </div>
                              <div class="row">
                                <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0' >
                                  {/* <div class='card p-t-0 p-l-0 p-b-0 p-r-0' style='background-color:#fff; margin-top: 10px;'>
                                    <div class="row" >
                                      <div class="col-lg-12 p-l-0 p-r-0">
                                        <div class="row" style="border-bottom:1px solid lightgrey">
                                          <div class="col-lg-12 p-b-10 p-t-10" >
                                              <div class="display-flex justify-between">
                                                <h6 class="fs-16 f-w-600">Balance</h6>
                                                <div class="display-flex">
                                                  <p>Settlement</p>
                                                  <p class="m-l-10">Original</p>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-10 p-b-10" style="border-bottom:1px solid lightgrey">
                                            <LinearProgress progress={0.8} />
                                          </div>
                                        </div>
                                        <div class="row">
                                          <div class="col-lg-12 p-t-10 p-b-10">
                                            <div class="display-flex align-center" style="justify-content: space-evenly;">
                                              <div class="display-flex flex-direction-column">
                                                <p class="fs-12" style="color:#90929a">SETTLEMENT</p>
                                                <p class="fs-20 f-w-600">₹3000</p>
                                              </div>
                                              <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">-</span>
                                              <div class="display-flex flex-direction-column">
                                                <p class="fs-12" style="color:#90929a">PAID</p>
                                                <p class="fs-20 f-w-600" >₹1000</p>
                                              </div>
                                              <span class="m-l-15 m-r-15 m-b-5" style="align-self: flex-end;">=</span>
                                              <div class="display-flex flex-direction-column">
                                                <p class="fs-12" style="color:#90929a">BALANCE</p>
                                                <p class="fs-20 f-w-600">₹2000</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div> */}
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 ">

                              <div class="row card text-dark">
                                <div class="col-lg-12 display-flex flex-direction-column align-center p-b-10 p-l-10 p-r-10 p-t-10 " style="height:150px">
                                  <div class="display-flex flex-direction-column w-full">
                                    <h6 class="fs-18 f-w-800 " style="letter-spacing:0.8px">Pending Action</h6>
                                    {/* <p class="fs-12" >Khed-Shivapur</p> */}
                                  </div>

                                  <div class="display-flex flex-direction-column h-full w-full">
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                                      <p class="fs-12 m-l-10">upload aadhar card</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/></g></svg>
                                      <p class="fs-12 m-l-10">fill enquiry form</p>
                                    </div>
                                    <div class="display-flex h-full align-center cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z"/><circle cx="6.5" cy="6.5" r="1.5"/></svg>
                                      <p class="fs-12 m-l-10">ask permission for Discount</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="activityworkshop m-t-15">
                                <p class='fs-12 m-b-10 color-black'>RECENT ACTIVITIES</p>
                                <div class="row" style="height:43vh;overflow: hidden auto">
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#29AB87"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#29AB87"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0fe540"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#0fe540"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#b59b7c"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#b59b7c"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#29AB87"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>} statusText={"New Task"} statusTextColor={"#29AB87"} assigneeName={"Vihang Kale"} notificationText={"created new task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0fe540"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} statusText={"Completed Task"} statusTextColor={"#0fe540"}  assigneeName={"Vihang Kale"} notificationText={"Completed task"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                  <div class="col-xs-12 col-lg-12 p-l-0 p-r-0">
                                    <Notification profileIcon={'Rutuja'} statusIcon={<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#b59b7c"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>} statusText={"New Case"} statusTextColor={"#b59b7c"} assigneeName={"Vihang Kale"} notificationText={"New Case created"}  notificationTime={"Today,9:48am"}/>
                                  </div>
                                </div>
                              </div>


                            </div>
                          </div>
                        )}

                        { activeSubTab === "Contact Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                    <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                    <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                    </div>
                                                    <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>


                                    </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Vehicle Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                      <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                  <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                  <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                  <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                  </div>
                                                  <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                    <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                    <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                    </div>
                                                    <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>


                                    </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Finance Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                    <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                    <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                    </div>
                                                    <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>


                                    </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}
                        { activeSubTab === "Accessories Details" && (
                          <div class="row">
                            <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0">
                              <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 p-l-0">
                                  <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <span class="card-header">Contact info</span>
                                      <div class="card text-dark m-b-20 p-t-0 p-l-0 p-b-0 p-r-0" style="background:#f6f5fa;height:180px">
                                        <div class ="row">
                                          <div class="col-lg-4 p-l-0 p-r-0">
                                            <span>
                                              <img src="../assets/images/corporateGirl.jpeg" height="180" style="width:100%;object-fit: cover;border-radius:0.5rem"/>
                                            </span>
                                          </div>
                                          <div class="col-lg-8 p-l-0 p-r-0">
                                            <div class="p-t-10 p-b-10">
                                              <div class ="row">
                                                <div class="col-lg-12 display-flex align-center p-b-10">
                                                  <h6 class="fs-16 f-w-600"> Jenny Silva</h6>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-b-10 display-flex">
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Address</p>
                                                      <p class="fs-12"> 1233, St Fay Circle, Wrolaw Poland</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">DOB</p>
                                                      <p class="fs-12"> 4 Mar '87</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class ="row">
                                                <div class="col-lg-12 p-b-10" style="border-top:1px solid lightgrey;">
                                                  <div class ="p-t-10 p-r-10 p-t-10 display-flex" >
                                                    <div class="display-flex flex-direction-column w-half">
                                                      <p class="fs-10" style="color:#90929a">Email</p>
                                                      <p class="fs-12">vihang@technative.in</p>
                                                    </div>
                                                    <div class="display-flex flex-direction-column w-half m-l-20">
                                                      <p class="fs-10" style="color:#90929a">Phone</p>
                                                      <p class="fs-12"> 0001212987</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 m-t-15' >

                                      {/* <p class='m-t-10' style='font-size: 1.3rem;'>Contact Details</p>
                                    <div class='variantcard' style='background-color:#fff; margin-top: 10px; padding: 15px;'>
                                    <div class="">
                                        <div>
                                          <div class="row" >
                                            <div class="col-lg-12 no-padding display-flex">
                                              <h6 class="fs-16 f-w-600">i20 N Line N6 1.0 Turbo GDI iMT - Petrol</h6>
                                              <div class="tooltip m-l-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                    <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <h6 class='f-w-600 fs-15 m-b-5' >* Ex-Showroom Price</h6>
                                              <div class="display-flex">
                                                <p class='f-w-600 fs-18 m-b-10'>₹990 900</p>
                                                <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                </div>
                                              </div>
                                              <div class="display-flex">
                                                <span class="fs-10" style="color:#fff;padding:5px;background:#449de0">Corp</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#f6af42">Exchange</span>
                                                <span class="m-l-10 fs-10" style="color:#fff;padding:5px;background:#5da24b">Others</span>
                                              </div>
                                            </div>
                                            <div class=" col-sm-6 col-md-6 col-lg-6 p-r-15 p-l-15">
                                              <p class='starBefore fs-12' style=';color: #6c6c6c;'>By default Pune prices are shown</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Booking Amount ₹25 000</p>
                                              <p class='fs-12' style='color: #6c6c6c;'>Benefits upto  ₹25 000</p>
                                            </div>

                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-lg-12 p-r-15 p-l-15">
                                              <div class="display-flex flex-direction-column">
                                                <div class="display-flex">
                                                    <span class="f-w-600 fs-14" >* On-Road Price</span>
                                                    <div class="tooltip m-l-5">
                                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                                      <span class="tooltiptext fs-12">Calculated considering Ex-Showroom price, RTO, Hypothecation charge & TCS. Further details are available under “Detailed Price Info”. Ex-showroom price is indicative and will be applicable as prevailing on the date of invoice.</span>
                                                    </div>
                                                    <p class="fs-12 m-l-5">(Excluding Basic insurance amount)</p>
                                                </div>
                                                <p class="fs-18 f-w-600" >₹18 11 887 </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="row m-t-20" >
                                            <div class="col-sm-12 no-padding">
                                              <p class='fw-600' style='font-size: 0.9rem;margin-bottom: 10px;color: #787878;'><input type='checkbox' />Please tick this box if you wish to add Basic insurance</p>
                                            </div>
                                            <div class="col-sm-12 no-padding detailsInfo" onClick={(e) => clickToOpen(e)}>
                                              <div class='accordion' > Detailed Price Info </div>
                                              <div class="panel">
                                                <table style='border: 1px dotted;'>
                                                  <thead>
                                                    <th style="text-align: center;border: 1px dotted;width: 115px;" />
                                                    <th style="text-align: center;border: 1px dotted;width: 75px;">Actual Amount</th>
                                                    <th style="text-align: center;border: 1px dotted;" >Discount</th>
                                                  </thead>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Ex-Showroom Price </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹16 30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹16 30 300</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>RTO </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 67 830</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 67 830</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Basic Insurance </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹0</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹0</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>Hypothecation Charge </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹1 500</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹1 500</td>
                                                  </tr>
                                                  <tr>
                                                    <td style="border:none !important; width: 175px; vertical-align:middle"><span>TCS </span><span><em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" /></span></td>
                                                    <td style='text-align: right; border:none !important; width: 125px; vertical-align: middle'>+₹30 300</td>
                                                    <td style='text-align: right; border:none !important; width: 145px; vertical-align: middle'>+₹30 300</td>
                                                  </tr>
                                                </table>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>


                                    </div> */}

                                    </div>
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-t-15">
                                  <div class="row" />
                                  <div class="row">

                                    <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                  <div class="row">
                                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0'  />
                                  </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 m-t-15 " />
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="floating-button" class="display-flex align-center" data-toggle="tooltip" data-placement="left" data-original-title="Collaborator"
        onClick={(e) => toggleCollaborator(e)}
        style="width:45px; height:45px;bottom:80px;right:32px;background:#3fe0d0;justify-content:center"  >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
      </div>
         {/* modified by Vihang
                modifield on 14/03/2022
                modification:responsive changes
              */}
      <Modal2 title="Collaborators" modalCustomWidth="modal-w-70" modalSize="is-small-right" height="is-small-right "
        modalDisplay={(isCollaborator ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleCollaborator(e)} >
        <ModalBody2 modalPadding="noPadding" modalFullHeight="fullHeight" onClose={(e) => toggleCollaborator(e)} onRightPosBtn = {true} >
          <div style="background:#f8f8f8;overflow-y:hidden;position:relative;height:100vh">
            <div class="row" style="height:inherit">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="row">
                 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0">
                    <div id="chatModalHeader" class="display-flex flex-direction-row" style=" height:auto;background:#f7f7f7;border-bottom:1px solid lightgrey" >
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
                        <div class="display-flex align center h-full">
                          <div class="row w-full">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 p-l-0 p-r-0" style="border-right:1px solid lightgrey">
                              <div class="display-flex align-center p-r-10 h-full" style="background:#f7f7f7">
                                <h5 style="color:#191919">Booking</h5>
                                <p class="m-l-10" style="color:#7a7a7a">#KH43232</p>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 p-l-0 p-r-0">
                              <div class="display-flex align center flex-direction-column p-l-10 h-full p-t-5 p-b-5" style="justify-content:center">
                                <p style="color:#7a7a7a">Lorem Ipsum has been the industrys standard </p>
                                <p style="color:#7a7a7a">scrambled it to make a type specimen book</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-12 col-sm-12 col-lg-12 p-r-0 p-l-0">
                    <div class="taskDetailsSection"  style={`height:calc(100vh - ${chatModalHeight} - 96px); overflow-y:auto`}>
                      <p class="fs-17">Task Details</p>
                      <div class="display-flex m-t-10">
                        <div class="p-r-15 p-t-10 p-b-20 w-full">
                          <div class="display-flex m-t-10">
                            <div class="display-flex imgBox w-full">
                              <div class="round_icons m-t-5 m-l-5 ">
                                <p class="fs-10">RD</p>
                              </div>
                              <div class="display-flex flex-direction-column w-full">
                                <p class="m-l-5">Vihang</p>
                                <div class="display-flex align-center w-full">
                                  <div class="m-l-5 w-half">
                                    <img
                                      id="image1"
                                      class="galleryImages cursor-pointer w-full"
                                      width="200"
                                      height="130"
                                      src="../assets/images/Hyundai-Verna.jpg"
                                      onClick={(e)=> viewAllImages(e)}
                                      style="border-radius:8px;object-fit:cover"
                                    />
                                  </div>
                                  <div class=" m-l-5 w-half">
                                    <img
                                      id="image2"
                                      class="galleryImages cursor-pointer w-full"
                                      width="200"
                                      height="130"
                                      src="../assets/images/common_bg.jpg"
                                      onClick={(e)=> viewAllImages(e)}
                                      style="border-radius:8px;object-fit:cover"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="display-flex m-t-10">
                              <div class="round_icons m-t-5 m-l-5 ">
                                <p class="fs-10">RD</p>
                              </div>
                              <div class="m-l-5" style="font-size:1em;">
                                <p>
                                Rutuja
                                  <span class="p-l-20 fs-12">1 hour ago</span>
                                </p>
                                <p>
                                  <a>@Yashvi</a> Whats the status on quiz functionality?
                                </p>
                              </div>
                            </div>
                            <div class="display-flex m-t-10">
                              <div class="round_icons m-t-5 m-l-5 ">
                                <p class="fs-10">RD</p>
                              </div>
                              <div class="m-l-5" style="font-size:1em;">
                                <p>
                                Rutuja
                                  <span class="p-l-20 fs-12">1 hour ago</span>
                                </p>
                                <p>
                                  <a>@Yashvi</a> Whats the status on quiz functionality?
                                </p>
                              </div>
                            </div>
                            <div class="display-flex m-t-10">
                              <div class="round_icons m-t-5 m-l-5 ">
                                <p class="fs-10">YD</p>
                              </div>
                              <div class="m-l-5" style="font-size:1em;">
                                <p>
                                Yashvi
                                  <span class="p-l-20 fs-12">45 mins ago</span>
                                </p>
                                <p>
                                  <a>@Rutuja</a> Work in Progress
                                </p>
                              </div>
                            </div>
                            <div class="display-flex m-t-10">
                              <div class="round_icons m-t-5 m-l-5 ">
                                <p class="fs-10">RD</p>
                              </div>
                              <div class="m-l-5" style="font-size:1em;">
                                <p>
                                Rutuja
                                  <span class="p-l-20 fs-12">15 mins ago</span>
                                </p>
                                <p>
                                  <a>@YashvI</a> Okay, let me know if you have any doubt
                                </p>
                              </div>
                            </div>
                            {(editorText !== "" || editorImages.length) > 0 && (
                              <div class="display-flex m-t-10">
                                <div class="round_icons m-t-5 m-l-5 ">
                                  <p class="fs-10">VK</p>
                                </div>
                                <div class="display-flex flex-direction-column">
                                  <p class="m-l-5">
                                Vihang
                                    <span class="p-l-20 fs-12">1 hour ago</span>
                                  </p>
                                  <div id="editorText" class="m-l-5" />
                                  <div class ="row">
                                    <div class="col-lg-3">
                                      {editorImages.length > 0 &&
                                        editorImages.map((img,index) => (
                                          <img
                                            id={"image" + index}
                                            class="cursor-pointer"
                                            width="200"
                                            height="200"
                                            src={"../assets/images/" + img}
                                            onClick={(e) => viewAllImages(e)}
                                          />
                                        ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               {/* modified by Vihang
                modifield on 14/03/2022
                modification:chat image integration fix
              */}

                <div class="row" style="height:96px">
                  <div class="col-xs-12 col-md-12 col-sm-12 col-lg-12 p-l-0 p-r-0 pos-relative">
                    <ChatComment onHandleEditorComment={(comment,img) => handleEditorComment(comment,img)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody2>
      </Modal2>

      <Modal2 title="Price" modalSize="is-small-right" height="is-small-right "
        modalDisplay={(isPriceBreakup ? 'show-modal' : 'hide-modal')} onClose={(e) => togglePriceBreakup(e)} >
        <ModalBody2 modalPadding="noPadding" modalFullHeight="fullHeight" onClose={(e) => togglePriceBreakup(e)} />
      </Modal2>

      <div class='globalModal'>
        <div id="searchResultModal" class="global-modal">
          <div class="global-modal-content global-width" style="padding-top: 0px;margin-top: 2rem;">
            {
              isSearchResultModalOpen && (
                <div>
                  <div class="global-modal-header">
                    <span class="modal-label">Search</span>
                    <span class="global-close" onClick={(e) => toggleSearchResultsModal(e)}>&times;</span>
                  </div>
                  <div class="global-modal-body background-transparent">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                            <div class="wrap">
                              <div class="search">
                                <input type="text" onInput={e => getSearchResults(e)} class="searchTerm" placeholder="Whom are you looking for?"   />

                                <button type="submit" style="padding: 3px;" class="searchButton" title='Click to search'>
                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                                </button>
                              </div>

                              {
                                <div style='max-height: 40vh; overflow-y: auto'>
                                  {
                                    searchResults.length !== 0 && searchResults.map((result) => (
                                      <div class="p-6" onClick={e => {toggleSearchResultsModal(e);setSelectedSearchResult(result);}}>
                                        <div class="grey-on-hover display-flex flex-direction-column cursor-pointer">
                                          <span class="fs-14" >{result.foundIn}{result.entityUniqueID ? result.entityUniqueID : ""}</span>
                                          <span class="fs-12" style="color:#8d8b8a">{result.entityText}</span>
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                              }

                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
