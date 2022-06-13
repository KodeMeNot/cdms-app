import { useState, useEffect } from 'preact/hooks';
import {formatDateTime,getInitials,getFormattedAmount} from '../../lib/utils';
import axios from "axios";
import CONSTANTS from '../../lib/constants';

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

const ListSingleCard = (props) => {
  let [dataSet, setDataset] = useState(props.taskData);
  let [selectedList, setSelectedList] = useState('');
  let [lastQuotation, setLastQuotation] = useState({});

  useEffect(async () => {
    await setDataset(props.taskData);
    console.log(props.taskData, 'props.taskDataprops.taskData');
    if (props.taskData && props.taskData.interactionID) {
      let quotations = await axios.get(`${CONSTANTS.API_URL}/api/v1/quotation?interactionID=${props.taskData.interactionID}`);
      await setLastQuotation(quotations.data);
    }
  },[props.taskData]);

  function handleData(row) {
    setSelectedList(row.uuid);
    props.showData(row);
  }

  function viewAllImages(e,id, index) {
    // modified by Vihang
    // modified at 16/05/2022
    // modification : remove rotate and flip options from image viewer
    let options = {
      rotatable:false,
      scalable:false
    };
    const gallery = new Viewer(document.getElementById(`image-${index}-${id}`),options);
    gallery.show();
  }

  /*
          modified by Vihang
          modified at 04/05/2022
          modification : card padding adjustments
    */
  return (
    <div>
      {props.typeOfCard === 'caseSingleDetails' && dataSet &&
        <div class="listCard fadeAnimationText m-t-5 m-b-5 pos-relative">
          <div class='msgContainer cursor-pointer animatedHover min-h-inherit'>
            <div class='display-flex justify-between align-center m-l-10 min-h-inherit'>
              <div class="display-flex align-center">
                <div class="h-24px w-24px">
                  {props.taskIcon}
                </div>
                <div class="display-flex flex-direction-column m-l-10 m-r-10">
                  <p class='fs-10 f-w-600 text-grey'>{dataSet.caseID ? dataSet.caseID : dataSet.uniqueID ? dataSet.uniqueID : ''}</p>
                  <p class='fs-14 first-letter-capital'>{dataSet.lastCompletedAction}</p>
                </div>
              </div>
              <div class="display-flex flex-direction-column m-l-10 m-r-10">
                <p class='fs-10 f-w-600 text-grey'>Last Quotation</p>
                <p class='fs-14 first-letter-capital'>{lastQuotation ? lastQuotation: "-"}</p>
              </div>
              <div class={'m-r-30 tasks-tags border-blue'}>
                <div class="display-flex flex-direction-column fs-10">
                  <p class="f-w-600">{dataSet.currentStage}</p>
                </div>
              </div>
            </div>
          </div>
          <span class="h-full pos-absolute color-white fs-9 text-center text-uppercase list-card-ribbon" style={`background:${ dataSet.group === "task" ? "#20639B": dataSet.group === "Approval"? "#2F9395":""}`}>{ dataSet.group === "task" ? "Task" :(dataSet.group === "Approval") ? "Approval":""}</span>
        </div>
      }
      {props.typeOfCard === 'caseDetails' && dataSet &&
        <div class="row">
          {/*
            Modification: Removed unnecessary condition of checking if dataSet exists from below code as it is already checked above
            By: Devang
            Date: 26/05/2022
          */}
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-5' >
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.caseIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">{dataSet.caseID ? dataSet.caseID : dataSet.uniqueID ? dataSet.uniqueID : ''}</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Customer Name</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.interaction && dataSet.interaction["dynamicProperties_customerName"]) ? dataSet.interaction["dynamicProperties_customerName"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Source</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.interaction && dataSet.interaction["dynamicProperties_source"]) ? dataSet.interaction["dynamicProperties_source"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Sub Source</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.interaction && dataSet.interaction["dynamicProperties_subSource"]) ? dataSet.interaction["dynamicProperties_subSource"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Area</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.interaction && dataSet.interaction["dynamicProperties_area"]) ? dataSet.interaction["dynamicProperties_area"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Interested Model</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.model ? dataSet.model : (dataSet.interaction && dataSet.interaction['dynamicProperties_selectedModelName']) ? dataSet.interaction['dynamicProperties_selectedModelName']: '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Interested Variant</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.variant ? dataSet.variant : (dataSet.interaction && dataSet.interaction['dynamicProperties_selectedVariantName']) ? dataSet.interaction['dynamicProperties_selectedVariantName']: '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">No. of Visitors</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.visitDetails && dataSet.visitDetails.noOfVisitors ? dataSet.visitDetails.noOfVisitors : '01'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-5 p-r-0'>
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.stageIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">STAGE</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">{dataSet.currentStage ? dataSet.currentStage : '--'}</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.currentStageActiveSince ? dataSet.currentStageActiveSince + ' Days' : '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Next Stage</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.nextStage ? dataSet.nextStage : '--'}</span></span>
                  </div>
                  {(dataSet && dataSet.completedTasks > 0 && dataSet.pendingTasks > 0) &&
                    <div class="flex-sb borderteambottom p-b-8 p-t-8">
                      <div class="flex-sb">
                        <span class="fs-14">{`${dataSet.pendingTasks}  Completed out of /  ${dataSet.completedTasks}`}</span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>



            <div class="workspace-cards fadeMoveUpAnimation" style='margin-top:10px'>
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.stageIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">INFORMATION</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  {
                    (dataSet && dataSet.status !== 'Completed' && (!dataSet.incompleteTasks || dataSet.incompleteTasks.length === 0) && (
                      <span>{`Current state of this task is ${dataSet.status}. Please proceed by clicking ${dataSet.displayName} to complete the task`}</span>

                    ))
                  }
                  {
                    (dataSet && dataSet.status === 'Completed' && (!dataSet.incompleteTasks || dataSet.incompleteTasks.length === 0) && dataSet.nextTask && dataSet.nextTask.status && dataSet.nextTask.status.toLowerCase() !== "completed" && (
                      <span>{`Current state of the task is Complete. Next task to perform is ${dataSet.nextTask.displayName}. Click on the button below to
                      proceed to next task.`}</span>
                    ))
                  }
                  {
                    (dataSet && dataSet.status === 'Completed' && (!dataSet.incompleteTasks || dataSet.incompleteTasks.length === 0) && dataSet.nextTask && dataSet.nextTask.status && dataSet.nextTask.status.toLowerCase() === "completed" && (
                      <span>{`This task has been completed. You can view the form by clicking the ${dataSet.displayName} button below`}</span>
                    ))
                  }
                  {
                    (dataSet && dataSet.status === 'Completed' && (!dataSet.incompleteTasks || dataSet.incompleteTasks.length === 0) && !dataSet.nextTask && (
                      <span>{`This task has been completed. You can view the form by clicking the ${dataSet.displayName} button below`}</span>
                    ))
                  }
                  {/*
                    Modification: Gave condition of incompleteTasks before getting the length, so it won't give any errors and semiDetailView will be shown
                    By: Devang
                    Date: 26/05/2022
                  */}
                  {
                    (dataSet && !dataSet.areDependentTasksCompleted && dataSet.incompleteTasks && dataSet.incompleteTasks.length > 0 && dataSet.status !== "Completed" ) && (
                      <span>{`Current state of the task is Pending. You will not be able to perform this task unless below task(s) are completed:`}</span>
                    )
                  }
                  {
                    (dataSet && !dataSet.areDependentTasksCompleted && dataSet.incompleteTasks && dataSet.incompleteTasks.length > 0 && dataSet.status !== "Completed" ) && (
                      <div class="bor-t">
                        {
                          dataSet.incompleteTasks.map((task, index) => (
                            <span>{index+1}. {task}<br /></span>
                          ))
                        }
                      </div>
                    )
                  }
                  {(dataSet && dataSet.completedTasks > 0 && dataSet.pendingTasks > 0) &&
                    <div class="flex-sb borderteambottom p-b-8 p-t-8">
                      <div class="flex-sb">
                        <span class="fs-14">{`${dataSet.pendingTasks}  Completed out of /  ${dataSet.completedTasks}`}</span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/*
        Modification: Added courierCaseDetails template and integrated with backend response
        By: Devang
        Date: 27/05/2022
      */}
      {props.typeOfCard === 'courierCaseDetails' && dataSet &&
        <div class="row">
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-5' >
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.caseIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">{dataSet.caseID}</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Created By</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.displayName ? dataSet.displayName : "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received Date</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.receivedDate ? formatDateTime(dataSet.receivedDate) : "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received From</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.receivedFrom ? dataSet.receivedFrom : "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Description</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDescription ? dataSet.courierDescription : "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Type Of Courier</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.typeOfCourier ? dataSet.typeOfCourier : "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Department</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.departmentDisplayName ? dataSet.departmentDisplayName : "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Whom To</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.whomTo ? dataSet.whomTo : "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Legal</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.isImportant ? "Yes" : "No"}</span></span>
                  </div>
                  {dataSet.isImportant &&
                    <div class="flex-sb borderteambottom p-b-8 p-t-8">
                      <div class="flex-sb">
                        <span class="fs-14">MD Response</span>
                      </div>
                      <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.acceptOrReject && dataSet.acceptOrReject === "accept" ? "Accepted" : "Rejected"}</span></span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-5 p-r-0 display-flex justify-center align-start'>
            {/*
              Modification: Changed the md size of workspace parent div to 12 to make it responsive
              By: Devang
              Date: 27/05/2022
            */}
            {dataSet.uploadPackagePhotoSrc && dataSet.uploadPackagePhotoSrc.length &&
              <div class='col-xs-12 col-sm-6 col-md-12 col-lg-12 p-l-0 p-r-0 display-flex justify-center align-start'>
                <div class="workspace-cards fadeMoveUpAnimation w-full">
                  <div class="row justify-between align-center">
                    <div class="display-flex">
                      <span class="workspace-cardsnumber fs-16 f-w-500">
                        <div class="h-24px w-24px">
                          {props.stageIcon}
                        </div>
                      </span>
                      <span class="m-l-5 fs-14">Uploaded Images</span>
                    </div>
                  </div>
                  <div class="row m-t-10">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                      {
                        <div class="flex-sb borderteambottom p-b-8 p-t-8 display-flex justify-center align-center">
                          {dataSet.uploadPackagePhotoSrc.map((imgSrc,id) => (
                            <div class="w-full" style="margin: 0 calc(1rem + 5px)">
                              <img id={`image-0-${id}`} class="cursor-pointer object-fit-contain w-full" src={imgSrc} onClick={(e)=> viewAllImages(e,id, 0)} />
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }
      {props.typeOfCard === 'courierDetails' && dataSet &&
        <div class="row">
          {/*
            Modification: Removed unnecessary condition of checking if dataSet exists from below code as it is already checked above
            By: Devang
            Date: 26/05/2022
          */}
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-0' >
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.caseIcon}
                    </div>
                  </span>
                  {/*
                    Modification: Handled dataSet property - an error was returned in console (reading property of undefined)
                    By: Devang
                    Date: 26/05/2022
                  */}
                  <span class="m-l-5 fs-14">{dataSet.courierDetails && dataSet.courierDetails.typeOfCourier}</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received from</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.receivedFrom ? dataSet.courierDetails.receivedFrom : '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Whom To</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.whomTo ? dataSet.courierDetails.whomTo : '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Legal?</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.isImportant ? 'Yes' : 'No'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">MD Accepted?</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.acceptOrReject === "accept" ? 'Yes' : 'No'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received date</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.receivedDate ? formatDateTime(dataSet.courierDetails.receivedDate) : '--'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {props.typeOfCard === 'callDetails' && dataSet &&
        <div class="row">
          {/*
            Modification: Removed unnecessary condition of checking if dataSet exists from below code as it is already checked above
            By: Devang
            Date: 26/05/2022
          */}
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-0' >
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.caseIcon}
                    </div>
                  </span>
                  {/*
                    Modification: Handled dataSet property - an error was returned in console (reading property of undefined)
                    By: Devang
                    Date: 26/05/2022
                  */}
                  <span class="m-l-5 fs-14">{dataSet.courierDetails && dataSet.courierDetails.typeOfCourier}</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received from</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.receivedFrom ? dataSet.courierDetails.receivedFrom : '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Whom To</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.whomTo ? dataSet.courierDetails.whomTo : '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Legal?</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.isImportant ? 'Yes' : 'No'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">MD Accepted?</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.acceptOrReject === "accept" ? 'Yes' : 'No'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received date</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.receivedDate ? formatDateTime(dataSet.courierDetails.receivedDate) : '--'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/*
        Modification: Added inboxCaseDetails template and binded Data
        Date: 26/05/2022
        By: Devang
      */}
      {props.typeOfCard === 'inboxCaseDetails' && dataSet &&
        <div class="row">
          {/*
            Modification: Removed unnecessary condition of checking if dataSet exists from below code as it is already checked above
            By: Devang
            Date: 26/05/2022
          */}
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-5' >
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.caseIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">{dataSet.taskDetails && dataSet.taskDetails.caseID}</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Customer Name</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.taskDetails && dataSet.taskDetails.interaction && dataSet.taskDetails.interaction["dynamicProperties_customerName"]) ? dataSet.taskDetails.interaction["dynamicProperties_customerName"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Source</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.taskDetails && dataSet.taskDetails.interaction && dataSet.taskDetails.interaction["dynamicProperties_source"]) ? dataSet.taskDetails.interaction["dynamicProperties_source"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Sub Source</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.taskDetails && dataSet.taskDetails.interaction && dataSet.taskDetails.interaction["dynamicProperties_subSource"]) ? dataSet.taskDetails.interaction["dynamicProperties_subSource"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Area</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.taskDetails && dataSet.taskDetails.interaction && dataSet.taskDetails.interaction["dynamicProperties_area"]) ? dataSet.taskDetails.interaction["dynamicProperties_area"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Interested Model</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.taskDetails && dataSet.taskDetails.model) ? dataSet.taskDetails.model : (dataSet.taskDetails.interaction && dataSet.taskDetails.interaction['dynamicProperties_selectedModelName']) ? dataSet.taskDetails.interaction['dynamicProperties_selectedModelName']: '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Interested Variant</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.taskDetails && dataSet.taskDetails.variant) ? dataSet.taskDetails.variant : (dataSet.taskDetails.interaction && dataSet.taskDetails.interaction['dynamicProperties_selectedVariantName']) ? dataSet.taskDetails.interaction['dynamicProperties_selectedVariantName']: '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">No. of Visitors</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.taskDetails && dataSet.taskDetails.visitDetails) && dataSet.taskDetails.visitDetails.noOfVisitors ? dataSet.taskDetails.visitDetails.noOfVisitors : '01'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-5 p-r-0'>
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg>
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">Message Details</span>
                </div>
              </div>
              {/*
                Modification: Changed the data for this card and data-key binding
                By: Devang
                Date: 27/05/2022
              */}
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Message</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.message ? dataSet.message : "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received At</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.createdAt ? formatDateTime(dataSet.createdAt) : "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received From</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.userName ? dataSet.userName : "--"}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {props.typeOfCard === 'inboxDetails' && dataSet &&
        <div class="row">
          {/*
            Modification: Removed unnecessary condition of checking if dataSet exists from below code as it is already checked above
            By: Devang
            Date: 26/05/2022
          */}
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-0' >
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.caseIcon}
                    </div>
                  </span>
                  {/*
                    Modification: Handled dataSet property - an error was returned in console (reading property of undefined)
                    By: Devang
                    Date: 26/05/2022
                  */}
                  <span class="m-l-5 fs-14">{dataSet.courierDetails && dataSet.courierDetails.typeOfCourier}</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received from</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.receivedFrom ? dataSet.courierDetails.receivedFrom : '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Whom To</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.whomTo ? dataSet.courierDetails.whomTo : '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Legal?</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.isImportant ? 'Yes' : 'No'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">MD Accepted?</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.acceptOrReject === "accept" ? 'Yes' : 'No'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Received date</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.courierDetails && dataSet.courierDetails.receivedDate ? formatDateTime(dataSet.courierDetails.receivedDate) : '--'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {props.typeOfCard === 'repairRequest' && dataSet &&
        <div class="row">
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-0' >
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.caseIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">Not ok Checklist Items</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  {
                    (props.notOkChecklistItems && props.notOkChecklistItems.length !== 0) && props.notOkChecklistItems.map((checklistItem, index) => (
                      <div class="flex-sb borderteambottom p-b-8 p-t-8">
                        <div class="flex-sb">
                          <span class="fs-14">{index+1}. {checklistItem.displayName}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-0'>
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.stageIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">Uploaded Images</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  {
                    (props.notOkChecklistItems && props.notOkChecklistItems.length !== 0) && props.notOkChecklistItems.map((item, index) => (
                      <div class="flex-sb borderteambottom p-b-8 p-t-8">
                        {item.uploadFileSrc && item.uploadFileSrc.map((imgSrc,id) => (
                          <div style="margin-left: calc(1rem + 5px)">
                            <img id={`image-${index}-${id}`} class="cursor-pointer object-fit-contain" src={imgSrc} width="100" height="100" onClick={(e)=> viewAllImages(e,id, index)} />
                          </div>
                        ))}
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {props.typeOfCard === 'discountApproval' && dataSet &&
        <div class="row">
          {/*
            Modification: Removed unnecessary condition of checking if dataSet exists from below code as it is already checked above
            By: Devang
            Date: 26/05/2022
          */}
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-0' >
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.caseIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">{dataSet.caseID}</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Customer Name</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.interaction && dataSet.interaction["dynamicProperties_customerName"]) ? dataSet.interaction["dynamicProperties_customerName"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Source</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.interaction && dataSet.interaction["dynamicProperties_source"]) ? dataSet.interaction["dynamicProperties_source"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Sub Source</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.interaction && dataSet.interaction["dynamicProperties_subSource"]) ? dataSet.interaction["dynamicProperties_subSource"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Area</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(dataSet.interaction && dataSet.interaction["dynamicProperties_area"]) ? dataSet.interaction["dynamicProperties_area"]: "--"}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Interested Model</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.model ? dataSet.model : (dataSet.interaction && dataSet.interaction['dynamicProperties_selectedModelName']) ? dataSet.interaction['dynamicProperties_selectedModelName']: '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Interested Variant</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.variant ? dataSet.variant : (dataSet.interaction && dataSet.interaction['dynamicProperties_selectedVariantName']) ? dataSet.interaction['dynamicProperties_selectedVariantName']: '--'}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">No. of Visitors</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.visitDetails && dataSet.visitDetails.noOfVisitors ? dataSet.visitDetails.noOfVisitors : '01'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-0'>
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.stageIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">Purchase Details</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Purchase Price</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{getFormattedAmount(700000)}</span></span>
                  </div>
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Age</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">40 Days</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='col-xs-12 col-sm-6 col-md-6 col-lg-6 p-l-0 p-r-0'>
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="workspace-cardsnumber fs-16 f-w-500">
                    <div class="h-24px w-24px">
                      {props.stageIcon}
                    </div>
                  </span>
                  <span class="m-l-5 fs-14">Discount Details</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                  <div class="flex-sb borderteambottom p-b-8 p-t-8">
                    <div class="flex-sb">
                      <span class="fs-14">Requested Discount</span>
                    </div>
                    <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{dataSet.interaction ? getFormattedAmount(dataSet.interaction['dynamicProperties_discount']): getFormattedAmount(0)}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {props.typeOfCard === 'formCard' && props.group && props.groupProps && props.interactionObj &&
        <div class="row">
          {/*
            Modification: Removed unnecessary condition of checking if dataSet exists from below code as it is already checked above
            By: Devang
            Date: 26/05/2022
          */}
          <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-5' >
            <div class="workspace-cards fadeMoveUpAnimation">
              <div class="row justify-between align-center">
                <div class="display-flex">
                  <span class="m-l-5 fs-14">{props.group}</span>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                {
                  props.groupProps && props.groupProps.length > 0 && props.groupProps.map((groupProp) => (
                    <div class="flex-sb borderteambottom p-b-8 p-t-8">
                      <div class="flex-sb">
                        <span class="fs-14">{groupProp.displayName}</span>
                      </div>
                      <span id={groupProp.displayName} class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{props.interactionObj['dynamicProperties_'+ groupProp.name] ? props.interactionObj['dynamicProperties_'+ groupProp.name]: '--'}</span></span>
                    </div>
                  ))
                }

                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {props.typeOfCard === 'customerDetails' && props.interactionObj &&
        <div class="workspace-cards fadeMoveUpAnimation">
          <div class="row justify-between align-center">
            <div class="display-flex">
              <span class="workspace-cardsnumber fs-16 f-w-500">
                <div class="h-24px w-24px">
                  {props.caseIcon}
                </div>
              </span>
              <span class="m-l-5 fs-14">{props.interactionObj.uniqueID}</span>
            </div>
          </div>
          <div class="row m-t-10">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">Customer Name</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj["dynamicProperties_customerName"]) ? props.interactionObj["dynamicProperties_customerName"]: "--"}</span></span>
              </div>
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">Source</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj["dynamicProperties_source"]) ? props.interactionObj["dynamicProperties_source"]: "--"}</span></span>
              </div>
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">Model</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj['dynamicProperties_selectedModelName']) ? props.interactionObj['dynamicProperties_selectedModelName']: '--'}</span></span>
              </div>
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">Variant</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj['dynamicProperties_selectedVariantName']) ? props.interactionObj['dynamicProperties_selectedVariantName']: '--'}</span></span>
              </div>
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">VIN</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj['dynamicProperties_vin']) ? props.interactionObj['dynamicProperties_vin']: '--'}</span></span>
              </div>
            </div>
          </div>
        </div>
      }
      {props.typeOfCard === 'policyDetails' && props.interactionObj &&
        <div class="workspace-cards fadeMoveUpAnimation">
          <div class="row justify-between align-center">
            <div class="display-flex">
              <span class="workspace-cardsnumber fs-16 f-w-500">
                <div class="h-24px w-24px">
                  {props.caseIcon}
                </div>
              </span>
              <span class="m-l-5 fs-14">{props.interactionObj.uniqueID}</span>
            </div>
          </div>
          <div class="row m-t-10">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">Policy Number</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj["dynamicProperties_policyNumber"]) ? props.interactionObj["dynamicProperties_policyNumber"]: "--"}</span></span>
              </div>
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">Policy Issue Date</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj["dynamicProperties_policyIssuedDate"]) ? formatDateTime(props.interactionObj["dynamicProperties_policyIssuedDate"]): "--"}</span></span>
              </div>
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">Policy Issued By</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj['dynamicProperties_policyIssuedBy']) ? props.interactionObj['dynamicProperties_policyIssuedBy']: '--'}</span></span>
              </div>
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">Policy IDV</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj['dynamicProperties_policyIDV']) ? getFormattedAmount(props.interactionObj['dynamicProperties_policyIDV']): '--'}</span></span>
              </div>
              <div class="flex-sb borderteambottom p-b-8 p-t-8">
                <div class="flex-sb">
                  <span class="fs-14">Policy Amount</span>
                </div>
                <span class="color-header-blue p-l-12 p-r-24 f-w-600"><span class="fs-14 first-letter-capital">{(props.interactionObj && props.interactionObj['dynamicProperties_amount']) ? getFormattedAmount(props.interactionObj['dynamicProperties_amount']): '--'}</span></span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ListSingleCard;
