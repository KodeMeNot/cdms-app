import { h } from 'preact';
import { useState, useEffect,useRef } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { startLoader, stopLoader, formatDateTime, getFormattedAmount, applyAclForFeedAndChat } from '../../lib/utils';
import { getItem, setItem, removeAll } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import toastr from "toastr";


const SelectCar = (props) => {
  const imageTypeExtension = ['png', 'jpg', 'jpeg'];
  let [selectedChecklistItem, setSelectedChecklistItem] = useState({});
  let [selectedChecklistItemIndex, setSelectedChecklistItemIndex] = useState(null);
  let [isChecklistItemSelected, setIsChecklistItemSelected] = useState(false);
  let [editorImages, setEditorImages] = useState([]);
  let [notokayModelOpen,setNotokayModal] = useState(false);
  let [selectedNotokayItem,setSelectedNotokayItem] = useState('');
  let [uploadNotokayImgFileSet,setUploadNotokayImgFileSet] = useState([]);
  let [isPreviewModalOpen,setIsPreviewModalOpen] = useState(false);
  let [previewModalDataSet,setPreviewModalDataSet]=useState({});
  let [displayCarsArray, setDisplayCarsArray] = useState([]);
  let [isSelectedCar, setIsSelectedCar] = useState(false);
  let [displayTestDriveCarsArray, setDisplayTestDriveCarsArray] = useState([]);
  let [disableTaskSubmitButton, setDisableTaskSubmitButton] = useState(false);
  let [testDriveCars, setTestDriveCars] = useState([]);
  let [displayCars, setDisplayCars] = useState([]);
  let [testDriveCarIDs, setTestDriveCarIDs] = useState([]);
  let [displayCarIDs, setDisplayCarIDs] = useState([]);
  let [isButtonDisabled, setButtonDisabled] = useState(false);

  {/*modified by Vihang
     modifield on 16/05/2022
     modification: toaster show timer increased to 600ms
  */}
  useEffect(()=>{
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-bottom-left",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "600",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "slideDown",
      "hideMethod": "slideUp"
    };

  },[]);

  useEffect(async () => {
    if (props.currentRow.displayName === "Select Test Drive Car") {
      let testDriveCarsList = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem?typeOfStockItem=testDrive`);
      if (testDriveCarsList.data.length) {
        setTestDriveCars(testDriveCarsList.data);
      }
    } else if (props.currentRow.displayName === "Select Display Car") {
      let displayCarsList = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem?typeOfStockItem=display`);
      if (displayCarsList.data.length) {
        setDisplayCars(displayCarsList.data);
      }
    }
  },[props.currentRow.displayName]);
  function setSelected(e, item, index) {
    setSelectedChecklistItem(item);
    setSelectedChecklistItemIndex(index);
    setIsChecklistItemSelected(!isChecklistItemSelected);
  }
  function checkboxSelectForDisplayCar(e, carType, index, id) {
    e.preventDefault();
    // let carsArray = [];
    if (e.target.checked) {
      displayCarsArray.splice(index, 0, carType);
      displayCarIDs.splice(index, 0, id);
      setDisplayCarsArray(displayCarsArray);
      setDisplayCarIDs(displayCarIDs);
    } else {
      let carIndex = displayCarsArray.indexOf(carType);
      //remove car from the colors array
      displayCarsArray.splice(carIndex, 1);
      displayCarIDs.splice(carIndex, 1);
      setDisplayCarsArray(displayCarsArray);
      setDisplayCarIDs(displayCarIDs);
    }
    if (displayCarsArray.length) {
      setIsSelectedCar(true);
    } else {
      setIsSelectedCar(false);
    }
  }

  function checkboxSelectForTestDriveCar(e, carType, index, id) {
    e.preventDefault();
    // let carsArray = [];
    if (e.target.checked) {
      displayTestDriveCarsArray.splice(index, 0, carType);
      testDriveCarIDs.splice(index, 0, id);
      setDisplayTestDriveCarsArray(displayTestDriveCarsArray);
      setTestDriveCarIDs(testDriveCarIDs);
    } else {
      let carIndex = displayTestDriveCarsArray.indexOf(carType);
      //remove car from the colors array
      displayTestDriveCarsArray.splice(carIndex, 1);
      testDriveCarIDs.splice(carIndex, 1);
      setDisplayTestDriveCarsArray(displayTestDriveCarsArray);
      setTestDriveCarIDs(testDriveCarIDs);
    }
    if (displayTestDriveCarsArray.length) {
      setIsSelectedCar(true);
    } else {
      setIsSelectedCar(false);
    }
  }
  async function submitCarSelection(e) {
    e.preventDefault();
    await axios.put(`${CONSTANTS.API_URL}/api/v1/task/${props.currentRow.uuid}/complete`).then(async (res)=> {
      if (res.status === 200) {
        setDisableTaskSubmitButton(true);
        setTimeout(() => {
          setDisableTaskSubmitButton(false);
        }, 2000);

        if (props.currentRow.displayName === "Select Test Drive Car") {
          await toastr.success('Test dirve car checklists created');
          let testDriveCarsList = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem?typeOfStockItem=testDrive`);
          if (testDriveCarsList.data.length) {
            setTestDriveCars(testDriveCarsList.data);
            //setButtonDisabled(false);
          }
        } else if (props.currentRow.displayName === "Select Display Car") {
          let displayCarsList = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem?typeOfStockItem=display`);
          if (displayCarsList.data.length) {
            setDisplayCars(displayCarsList.data);
            //setButtonDisabled(false);
          }
        }
        await props.triggerNotifications(true);
        window.location.reload();
      }
    }).catch((err) => {
      setIsUpdate(true);
      setDisableTaskSubmitButton(true);
      setTimeout(() => {
        setDisableTaskSubmitButton(false);
      }, 2000);
    });
  }

  async function markAsAvailable(e) {
    e.preventDefault();
    setButtonDisabled(true);
    let payload = {
      displayCars: displayCarsArray,
      displayCarIDs,
      testDriveCars: displayTestDriveCarsArray,
      testDriveCarIDs
    };
    await axios.put(`${CONSTANTS.API_URL}/api/v1/create/receptionTasks`, payload).then(async (res)=> {
      // setIsUpdate(true)
      await submitCarSelection(e);
    });
  }
  async function setNextTask() {
    let nextTask = await getItem("nextRowID");
    props.setNextTask(nextTask);
  }

  /*modified by Vihang
     modifield on 16/05/2022
     modification: display car table headert sticky and height correction
  */
  return (
    <div class="Overviewworkshop cursor-pointer col-xs-12 col-sm-12 col-md-12 col-lg-12">
      {
        props.currentRow.displayName === "Select Display Car" && (
          <div>
            <div class="p-t-10 semi-detail-summary">
              <div class="display-car-container">
                <div class="row h-inherit">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-5 display-flex flex-column h-inherit overflow-y">
                    <div class="row pos-sticky top-5">
                      <div class="col-xs-5 col-sm-5 m-b-10 p-b-10">
                        <label class="fw-600 fs-12">Model</label>
                      </div>
                      <div class="col-xs-4 col-sm-5 m-b-10 p-b-10">
                        <label class="fw-600 fs-12">VIN</label>
                      </div>
                      <div class="col-xs-3 col-sm-2 m-b-10 p-b-10">
                        <label class="fw-600 fs-12">Location</label>
                      </div>
                    </div>
                    <div class="inherit overflow-y">
                      {
                        displayCars && displayCars.length !== 0 && displayCars.map((displayCar, index) => (
                          <div class="row">
                            <div class="col-xs-5 m-b-10 p-b-10">
                              <p class="fs-12 first-letter-capital">{displayCar.variant}</p>
                            </div>
                            <div class="col-xs-4 m-b-10 p-b-10">
                              <p class="fs-12">{displayCar.registrationNumber ? displayCar.registrationNumber: displayCar.vin}</p>
                            </div>
                            <div class="col-xs-3 m-b-10 p-b-10 display-flex justify-between">
                              <p class="fs-12 m-r-5">Shankar Sheth Road</p>
                              <input type="checkbox"  onChange={(e) => checkboxSelectForDisplayCar(e, displayCar.variant, index, displayCar.uuid)}/>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    {/*<div class="m-t-10 m-l-10">
                        <div class="fw-600 fs-1rem p-b-10" >
                          <button disabled={!isSelectedCar} onClick={(e) => markAsAvailable(e)} class="w-full full-width-button">Mark as available{isSelectedCar}</button>
                        </div>
                      </div>*/}
                  </div>
                </div>
              </div>
            </div>
            <div class="semi-detail-footer">
              <div class="col-xs-12 display-flex justify-flex-end align-center">
                <button class="primary-button" onClick={(e) => setNextTask()}>Go to next task</button>
                <button class="primary-button button-10 m-t-20 m-l-10 m-b-20 float-right" disabled={!isSelectedCar || props.currentRow.status === 'Completed' || isButtonDisabled} onClick={(e) => markAsAvailable(e)}>Mark as available</button>
              </div>
            </div>
          </div>
        )
      }
      {
        props.currentRow.displayName === "Select Test Drive Car" && (
          <div>
            <div class="p-t-10 semi-detail-summary">
              <div class="display-car-container">
                <div class="row h-inherit">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-5 display-flex justify-center flex-column h-inherit ">
                    <div class="row pos-sticky top-5">
                      <div class="col-xs-4 col-sm-3 m-b-10 p-b-10">
                        <label class="fw-600 fs-12">Model</label>
                      </div>
                      <div class="col-xs-3 col-sm-3 m-b-10 p-b-10">
                        <label class="fw-600 fs-12">Registration Number / VIN</label>
                      </div>
                      <div class="col-xs-2 col-sm-3 m-b-10 p-b-10">
                        <label class="fw-600 fs-12">Active Test Drive?</label>
                      </div>
                      <div class="col-xs-3 col-sm-2 m-b-10 p-b-10">
                        <label class="fw-600 fs-12">Location</label>
                      </div>
                    </div>
                    <div class="inherit overflow-y">
                      {
                        testDriveCars && testDriveCars.length !== 0 && testDriveCars.map((testDriveCar, index) => (
                          <div class="row">
                            <div class="col-xs-4 m-b-10 p-b-10">
                              <p class="fs-12 first-letter-capital">{testDriveCar.model +  " - " + testDriveCar.variant}</p>
                            </div>
                            <div class="col-xs-3 m-b-10 p-b-10">
                              <p class="fs-12">{testDriveCar.registrationNumber ? testDriveCar.registrationNumber: testDriveCar.vin}</p>
                            </div>
                            <div class="col-xs-2 m-b-10 p-b-10">
                              <p class="fs-12">{testDriveCar.isAllocatedForTestDrive ? "Yes" : "No"}</p>
                            </div>
                            <div class="col-xs-3 m-b-10 p-b-10 display-flex justify-between">
                              <p class="fs-12 m-r-5">Shankar Sheth Road</p>
                              <input type="checkbox"  onChange={(e) => checkboxSelectForTestDriveCar(e, testDriveCar.variant, index, testDriveCar.uuid)}/>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    {/*<div class="m-t-10 m-l-10">
                        <div class="fw-600 fs-1rem p-b-10" >
                          <button disabled={!isSelectedCar} onClick={(e) => markAsAvailable(e)} class="w-full full-width-button">Mark as available</button>
                        </div>
                      </div>*/}
                  </div>
                </div>
              </div>
            </div>
            <div class="row semi-detail-footer">
              <div class="col-xs-12 display-flex justify-flex-end align-center">
                <button class="primary-button" onClick={(e) => setNextTask()}>Go to next task</button>
                <button class="primary-button button-10 m-t-20 m-b-20 m-l-10 float-right" disabled={!isSelectedCar || props.currentRow.status === 'Completed' || isButtonDisabled} onClick={(e) => markAsAvailable(e)}>Mark as available</button>
                {/*<button class="primary-button button-10 m-t-20 m-b-20 float-right">{props.currentRow && props.currentRow.displayName}</button>*/}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default SelectCar;
