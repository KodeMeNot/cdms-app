import { useState, useEffect } from 'preact/hooks';
import {formatDateTime,getInitials} from '../../lib/utils';
import moment from "moment";
import {setItem, getItem } from '../../lib/myStore';

{/*
        modified by Vihang
        modified at 04/05/2022
        modification : responsive changes for list card
  */}
const ListCard = (props) => {
  console.log("ddddddddddd",props);
  let [newDataSet, setDataset] = useState([]);
  let [selectedList, setSelectedList] = useState('');

  /*
    modified by Vihang
    modified at 11/05/2022
    modification : when any of the task cards are selected thier first list is selected by default and show the slected task on semi detail
  */
  useEffect(() => {
    setDataset(props.taskData);
    let currentTask = getItem("currentRowID");
    if (Object.keys(currentTask).length) {
      setSelectedList(currentTask.uuid);
    }
  },[props.taskData]);

  useEffect(()=> {
    if (newDataSet && props.taskType === "dayPlanTask" && newDataSet.rows) {
      let currentTask = getItem("currentRowID");
      if (Object.keys(currentTask).length) {
        setSelectedList(currentTask.uuid);
      }
      props.showData(currentTask);
    }
  },[newDataSet]);

  useEffect(() => {
    setDataset(props.taskData);
    let currentTask = getItem("currentRowID");
    if (Object.keys(currentTask).length) {
      setSelectedList(currentTask.uuid);
    }
  },[props.updateNextTask]);

  async function handleData(row, index) {
    await setSelectedList(row.uuid);
    await setItem("currentRowID", row);
    await props.showData(row, newDataSet[index+1]);
    console.log(row, 'rowrowrowrowrowrowrow');
    if (props.setShowSemiDetailView) {
      props.setShowSemiDetailView(true);
    }
  }

  function deadlineDays(row) {
    if (row['dueDate']) {
      let z = moment(moment(row['dueDate']).format("DD/MM/YYYY"), 'DD-MM-YYYY');
      let y = moment(moment(new Date()).format("DD/MM/YYYY"), 'DD-MM-YYYY');
      let diffDays = y.diff(z, 'days');
      return diffDays;
    }
  }
  /*
      modified by Vihang
      modified at 11/05/2022
      modification : If the list is empty, display message "No Tasks" added
    */
  /*
      modified by Vihang
      modified at 17/05/2022
      modification : selection color of the list changed to #f96e67, tag color changed on selection and text color changed to white
    */
  /*
        modified by Vihang
        modified at 18/05/2022
        modification : all the task pages selection issue fixed
      */
  return (
    <div class="h-inherit">
      {/*
        Modification: removed index from the function call argument as it was not defined and returning error in inboxTask template
        By: Devang
        Date: 26/05/2022
      */}
      {props.taskType === "inboxTask" && newDataSet && newDataSet.length > 0 && newDataSet.map((row) => (
        <div class={`listCard fadeAnimationText m-b-5 pos-relative ${selectedList === row.uuid ? "text-white" : ""}`} onClick={(e) => handleData(row)}>
          <div class='msgContainer cursor-pointer animatedHover min-h-inherit'  style={`${selectedList === row.uuid ? 'background:#f96e67' : ''}`}>
            <div class='display-flex justify-between align-center m-l-10 min-h-inherit'>
              <div class="display-flex align-center">
                <div class="h-24px w-24px">
                  <em className={`icon icon-file-text p-r-5 fs-14`} />
                </div>
                <div class="display-flex flex-direction-column m-l-10 m-r-10">
                  <p class={`fs-10 f-w-600 ${selectedList === row.uuid ? "text-white" : "text-grey"}`}>{row.userName}</p>
                  <p class={`fs-12 first-letter-capital listCardDescription ${selectedList === row.uuid ? "text-white" : ""}`}>{row.message}</p>
                </div>
              </div>
              <div class={`m-r-30 tasks-tags bg-sunset-orange ${selectedList === row.uuid ? "bg-tag-bfbfbf" : ""}`}>
                <div class="display-flex flex-direction-column fs-10">
                  <p class="f-w-600" >{formatDateTime(row.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
          <span class="h-full pos-absolute color-white fs-9 text-center text-uppercase list-card-ribbon" style={`background:${ row.group === "task" ? "#20639B": row.group === "Approval"? "#2F9395":""}`}>{ row.group === "task" ? "Task" :(row.group === "Approval") ? "Approval":""}</span>
        </div>
      ))}
      { props.taskType === "dayPlanTask" && newDataSet && newDataSet.columns && newDataSet.rows.length > 0 && newDataSet.rows.map ((row) => (
        <div class={`listCard fadeAnimationText m-b-5 pos-relative ${selectedList === row.uuid ? "text-white" : ""}`} onClick={(e) => handleData(row)}>
          <div class='msgContainer cursor-pointer animatedHover min-h-inherit'  style={`${selectedList === row.uuid ? 'background:#f96e67' : ''}`}>
            <div class='display-flex justify-between align-center m-l-10 min-h-inherit'>
              <div class="display-flex align-center">
                <div class="h-24px w-24px">
                  {props.taskIcon}
                </div>
                <div class="display-flex flex-direction-column m-l-10 m-r-10">
                  <p class={`fs-10 f-w-600 ${selectedList === row.uuid ? "text-white" : "text-gray"}`}>{row.interactionID ? row.caseID: row.uniqueID}</p>
                  <p class={`fs-12 first-letter-capital listCardDescription ${selectedList === row.uuid ? "text-white" : ""}`}>{row.displayName}</p>
                </div>
              </div>
              <div class={`m-r-30 tasks-tags ${selectedList === row.uuid ? "bg-tag-bfbfbf" : deadlineDays(row) >= 0 ? 'bg-sunset-orange':'bg-yellow'}`}>
                <div class="display-flex flex-direction-column fs-10">
                  <p class="f-w-600" >{deadlineDays(row) >= 0 ? 'Overdue':'Due'}</p>
                  <p class="f-w-600"> {deadlineDays(row) + " Days"}</p>
                </div>
              </div>
            </div>
          </div>
          <span class="h-full pos-absolute color-white fs-9 text-center text-uppercase list-card-ribbon" style={`background:${ row.containerType === "Checklist" || row.containerType === "Select Cars" ? "#20639B": row.containerType === "Form" ? "#F16A43" :row.containerType === "Form and Approval" || row.containerType === "Approval"? "#2F9395":""}`}>{ row.containerType === "Checklist" || row.containerType === "Select Cars" ? "CHK": row.containerType === "Form" ? "Form" :(row.containerType === "Form and Approval" || row.containerType === "Approval") ? "Approval":""}</span>
        </div>
      ))}
      { props.taskType === "callTask" && newDataSet && newDataSet.length > 0 && newDataSet.map ((row) => (
        <div class={`listCard fadeAnimationText m-b-5 pos-relative ${selectedList === row.uuid ? "text-white" : ""}`} onClick={(e) => handleData(row)}>
          <div class='msgContainer cursor-pointer animatedHover min-h-inherit'  style={`${selectedList === row.uuid ? 'background:#f96e67' : ''}`}>
            <div class='display-flex justify-between align-center m-l-10 min-h-inherit'>
              <div class="display-flex align-center">
                <div class="h-24px w-24px">
                  {props.taskIcon}
                </div>
                <div class="display-flex flex-direction-column m-l-10 m-r-10">
                  <p class={`fs-10 f-w-600 ${selectedList === row.uuid ? "text-white" : "text-grey"}`}>{!row.extension ? "Ext: Unknown" : "Ext:" + row.extension}</p>
                  <p class='fs-14 first-letter-capital'>{row.mobileNumber ? row.mobileNumber : "Unknown" }</p>
                </div>
              </div>
              <div class={`m-r-30 tasks-tags bg-sunset-orange ${selectedList === row.uuid ? "bg-tag-bfbfbf" : ""}`}>
                <div class="display-flex flex-direction-column fs-10">
                  <p class="f-w-600" >{row.starttime ? formatDateTime(row.starttime) : '--'}</p>
                </div>
              </div>
            </div>
          </div>
          <span class="h-full pos-absolute color-white fs-9 text-center text-uppercase list-card-ribbon" style={`background:${ row.typeOfCaller === "Employee" ? "#20639B": row.typeOfCaller === "Customer" ? "#F16A43" : row.typeOfCaller === "Other"? "#2F9395":""}`}>{ row.typeOfCaller === "Employee" ? "Employee": row.typeOfCaller === "Customer" ? "Customer" :(row.typeOfCaller === "Others") ? "Others":""}</span>
        </div>
      ))}
      { props.taskType === "Courier" && newDataSet && newDataSet.length > 0 && newDataSet.map ((row) => (
        <div class={`listCard fadeAnimationText m-b-5 pos-relative ${selectedList === row.uuid ? "text-white" : ""}`} onClick={(e) => handleData(row)}>
          <div class='msgContainer cursor-pointer animatedHover min-h-inherit'  style={`${selectedList === row.uuid ? 'background:#f96e67' : ''}`}>
            <div class='display-flex justify-between align-center m-l-10 min-h-inherit'>
              <div class="display-flex align-center">
                <div class="h-24px w-24px">
                  {props.taskIcon}
                </div>
                <div class="display-flex flex-direction-column m-l-10 m-r-10">
                  <p class={`fs-10 f-w-600 ${selectedList === row.uuid ? "text-white" : "text-grey"}`}>{row.caseID}</p>
                  <p class={`fs-12 first-letter-capital listCardDescription ${selectedList === row.uuid ? "text-white" : ""}`}>{row.courierDescription}</p>
                </div>
              </div>
              <div class={`m-r-30 tasks-tags bg-sunset-orange ${selectedList === row.uuid ? "bg-tag-bfbfbf" : ""}`}>
                <div class="display-flex flex-direction-column fs-10">
                  <p class="f-w-600" >{formatDateTime(row.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
          <span class="h-full pos-absolute color-white fs-9 text-center text-uppercase list-card-ribbon" style={`background:${ row.typeOfCourier === "Legal" ? "#F6BE00": row.typeOfCourier === "Director" ? "#F16A43" :row.typeOfCourier === "HMIL" ? "#2F9395":""}`}>{ row.typeOfCourier === "Legal" ? "Legal": row.typeOfCourier === "Director" ? "Director" :row.typeOfCourier === "HMIL" ? "HMIL":""}</span>
        </div>
      ))}
      { props.taskType === "visitTask" && newDataSet && newDataSet.length > 0 && newDataSet.map ((row) => (
        <div class={`listCard fadeAnimationText m-b-5 pos-relative ${selectedList === row.uuid ? "text-white" : ""}`} onClick={(e) => handleData(row)}>
          <div class='msgContainer cursor-pointer animatedHover min-h-inherit'  style={`${selectedList === row.uuid ? 'background:#f96e67' : ''}`}>
            <div class='display-flex justify-between align-center m-l-10 min-h-inherit'>
              <div class="display-flex align-center">
                <div class="h-24px w-24px">
                  {props.taskIcon}
                </div>
                <div class="display-flex flex-direction-column m-l-10 m-r-10">
                  <p class={`fs-10 f-w-600 ${selectedList === row.uuid ? "text-white" : "text-grey"}`}>{!row.uniqueID ? "Unknown" : row.uniqueID}</p>
                  <p class={`fs-12 first-letter-capital listCardDescription ${selectedList === row.uuid ? "text-white" : ""}`}>{row.displayName ? row.displayName : "Unknown" }</p>
                </div>
              </div>
              <div class={`m-r-30 tasks-tags bg-sunset-orange ${selectedList === row.uuid ? "bg-tag-bfbfbf" : ""}`}>
                <div class="display-flex flex-direction-column fs-10">
                  <p class="f-w-600" >{row.createdAt ? formatDateTime(row.createdAt) : '--'}</p>
                </div>
              </div>
            </div>
          </div>
          <span class="h-full pos-absolute color-white fs-9 text-center text-uppercase list-card-ribbon" style={`background:olor-white fs-9 text-center text-uppercase ${ row.type === "Commercial" ? "#20639B": row.type === "Non-Commercial" ? "#F16A43" :""}`}>{ row.type === "Commercial" ? "Commercial": row.type === "Non-Commercial" ? "Non-Commercial" : ""}</span>
        </div>
      ))}
      {newDataSet && (newDataSet.length === 0 || newDataSet.rows && newDataSet.rows.length === 0 ) && (<h1 class="noTasksList f-w-400">No Tasks</h1>)}
    </div>
  );
};

export default ListCard;
