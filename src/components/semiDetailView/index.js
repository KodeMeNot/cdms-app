import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { getItem, setItem, removeAll } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import ApexCharts from 'apexcharts';
import { formatDateTime, getFormattedAmount, applyAclForFeedAndChat } from '../../lib/utils';
import { CountryCode } from '../../components/countryCode';
import { Popup, PopupBody } from '../../components/popup';
import PDFSTYLE from "../../lib/pdfGenerationConfig";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import hyundaiLogo from "../../assets/images/crystal-honda.png"
import hyundaiX from "../../assets/images/hyundaiX.jpeg"
import hyundai from "../../assets/images/hyundaiHeader.jpg"
import hyundaiCover from "../../assets/images/docketCover.jpg"
import financeKothariLogo from "../../assets/images/korthariFinanceLogo.jpeg"
import Axios from 'axios';
import { css } from 'jquery';
import { EditorState, Plugin } from "prosemirror-state";
import { EditorView, Decoration, DecorationSet } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import ChecklistComponent from "../../components/checklist";
import SelectCar from "../../components/selectCar";
import { getInitials, getDay, getMonth } from '../../lib/utils';
import { WorkspaceCard } from '../../components/workspaceCard';
import { WorkspaceSubCard } from '../../components/workspaceSubCard';
import ChatComment from "../../components/chatComment";
import ListSingleCard from '../../components/listSingleCard';
import FormWizard from '../../components/formWizard';
import { NewPopupModal, NewPopupModalBody } from '../../components/newPopupModal';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';
import moment from "moment";
import TaskListDetailHeader from "../../components/taskListDetailHeader";
import TaskListDetailTags from "../../components/taskListDetailTags";
import toastr from "toastr";
import { CountUp } from 'countup.js';
import pincodeDirectory from 'india-pincode-lookup';
import { State, City }  from 'country-state-city';
// var loc = require('list-of-cars');
import imageCompression from 'browser-image-compression';

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

const SemiDetailView = (props) => {
  let userInfo = getItem('userinfo');
  const todaysDate = new Date();
  let [cartNumber, setCartNumber] = useState(0);
  let [cartValue, setCartValue] = useState(0);
  let [availableStock, setAvailableStock] = useState(0);
  let [progress, setProgress] = useState(0);
  let [actions, setActions] = useState([{
    dynamicProps: []
  }]);
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);
  let [taskCheckListItems, setTaskCheckListItems] = useState([]);
  let [totalTaskCheckListItems, setTotalTaskCheckListItems] = useState(0);
  let [totalTaskCheckListItemsProgress, setTotalTaskCheckListItemsProgress] = useState(0);
  let isMobileView = window.screen.availWidth <= 425 ? true : false;
  let [activeFilter, setActiveFilter] = useState('');
  let [currentRow, setCurrentRow] = useState({});
  let [testDriveQueue, setTestDriveQueue] = useState(0);
  let [activePageTabItem, setActivePageTabItem] = useState('TASKS TO DO');
  let [isOpenFormPopover, setIsOpenFormPopover] = useState(false);
  let [taskDetails, setTaskDetails] = useState({});
  let [contactDetails, setContactDetails] = useState({});
  let [dynamicProps, setDynamicProps] = useState([]);
  let [dynamicPropsWithValues, setDynamicPropsWithValues] = useState([]);
  let [taskComments, setTaskComment] = useState([]);
  let [selectedActionIndex, setSelectedActionIndex] = useState(0);
  let [currentAction, setCurrentAction] = useState({});
  let [isFormUpdated, setIsFormUpdated] = useState(false);
  let [contactData, setContactData] = useState({})
  let [createdContactID, setCreatedContactID] = useState('')
  let [visitList, setVisitList] = useState([])
  let [commericalDataSetCount, setCommericalDataSetCount] = useState(null)
  let [nonCommericalDataSetCount, setNonCommericalDataSetCount] = useState(null)
  let [commercialVisitDataSet, setCommercialVisitDataSet] = useState({ columns: [], rows: [] });
  let [nonCommercialVisitDataSet, setNonCommercialVisitDataSet] = useState({ columns: [], rows: [] });
  let [isNextDisable, setIsNextDisable] = useState(false)
  // modified by Vihang
  // modified at 25 May 2022
  // modification : next form modal disabled state
  let [isNextModalDisable, setIsNextModalDisable] = useState(false)
  const [isOpenProformaFormPopover, setIsOpenProformaFormPopover] = useState(false);
  const [isOpenAssignUsersTriggeredTask, setIsOpenAssignUsersTriggeredTask] = useState(false);
  const [isOpenAssignApprovalUsersTriggeredTask, setIsOpenAssignApprovalUsersTriggeredTask] = useState(false);
  let [triggeredUnassignedTaskList, setTriggeredUnassignedTaskList] = useState([])
  let [triggeredUnassignedApprovalTaskList, setTriggeredUnassignedApprovalTaskList] = useState([])
  let [assignToUserList, setAssignToUserList] = useState([]);
  let [assignToApprovalUserList, setAssignToApprovalUserList] = useState([]);
  let [quotationData, setQuotationData] = useState({});
  let [selectedProducts, setSelectedProducts] = useState([]);
  let [cartProducts, setCartProducts] = useState([]);
  let [selectedColor, setSelectedColor] = useState('');
  let [selectedDisplayColor, setSelectedDisplayColor] = useState('');
  let [exchangEvaluators, setExchangeEvaluators] = useState([]);
  let [financeExecutives, setFinanceExecutives] = useState([]);
  let [offers, setOffers] = useState([]);
  let [schemes, setSchemes] = useState([]);
  let [lastQuotation, setLastQuotation] = useState({});
  let [selectedModel, setSelectedModel] = useState('')
  let [selectedVariantName, setSelectedVariantName] = useState('')
  let [variantList, setVariantList] = useState([])
	let [lat,setcurrentCarLat] = useState(0);
	let [lng,setcurrentCarLong] = useState(0);
	let [interactionObj, setInteraction] = useState({});
	let [areaList, setAreaList] = useState([]);
	let [catalogoueItemList, setCatalogoueItemList] = useState([])
	let [answeredCount, setAnsweredCount] = useState(0);
  let [courierData, setCourierData] = useState({});
  let [uploadImgArray, setUploadImgArry] = useState([]);
  let [isHandoverDocket, setIsHandoverDocket] = useState(false);
  let [courierImgDelete, setCourierImgDelete] = useState(false)
  let [allUserList, setAllUserList] = useState([])
  let [isEditDocket, setIsEditDocket] = useState(false);
  let [stateList, setStateList] = useState(State.getStatesOfCountry('IN'));
  let [cityList, setCityList] = useState([]);
  let [testDriveCars, setTestDriveCars] = useState([]);
  let [listofManufacturers, setListOfManufacturers] = useState([])
  let [listOfModels, setListOfModels] = useState([])
  let [notOkChecklistItems, setNotOkChecklistItems] = useState([])
  let [isRepairRequestFormOpen, setRepairRequestFormOpen] = useState(false);
  let [lobbyHostesses, setLobbyHostesses] = useState([]);
  let [selectedLobbyHostes, setSelectedLobbyHostes] = useState({});
  let [ccmRemarks, setCCMRemarks] = useState('');
  let [assignToType, setAssignToType] = useState('');
  let [departments, setDepartments] = useState([]);
  let [selectedDepartment, setSelectedDepartment] = useState('');
  let [users, setUsers] = useState([]);
  let [selectedUser, setSelectedUser] = useState('');
  let [interactionForPdf, setInteractionForPdf] = useState({});
  let [customerDetailsForPdf, setCustomerDetailsForPdf] = useState({});
  let [carModelVariantPdf, setCarModelVariantPdf] = useState({});
  let [checklistItemSelected, setChecklistItemSelected] = useState(false);
  let [currentTask, setCurrentTask] = useState({})
  let [scDetails, setScDetails] = useState({})
  let [assignUserList, setAssignUserList] = useState([])
  let [quotationDataForPdf, setQuotationDataForPdf] = useState({});
  let [financeQuotation, setFinanceQuotation] = useState({});
  let [financeOptions, setFinanceOptions] = useState([]);
  let [isFinanceFormOpen, setIsFinanceFormOpen] = useState(false);
  let [bankList, setBankList] = useState([]);
  let [selectedBankObj, setSelectedBankObj] = useState({});
  let [processingFeeList, setProcessingFeeList] = useState([]);
  let [processingFeeObj, setProcessingFeeObj] = useState({});
  let [stampDutyList, setStampDutyList] = useState([]);
  let [stampDutyObj, setStampDutyObj] = useState({});
  let [emi, setEmi] = useState(0);
  let [calculatedEMI, setCalculatedEMI] = useState(0);
  let [numberOfYears, setNumberofYears] = useState(7);
  let [rateofInterest, setRateOfInterest] = useState(7.7);
  /*
    modified by Vihang
    modified at 25/05/2022
    modification : code retained to be used another day if required
  */
  // let [actionsArraySet, setActionsArraySet] = useState([]);
  // let [actionsArraySetCount, setActionsArraySetCount] = useState(0);
  // let [actionsArraySetTotal, setActionsArratSetTotal] = useState(0);
  /*
    modified by Vihang
    modified at 25/05/2022
    modification : scroll bottom, next and save disable states
  */
  let [isScrolledToTheBottom, setIsScrolledToTheBottom] = useState(false);
  let [isSaveModalDisable, setIsSaveModalDisable] = useState(false)
  // modified by Vihang
  // modified at 26/05/2022
  // modification : back buton disable state added
  let [isBackModalDisable, setIsBackModalDisable] = useState(false)
  // modified by Vihang
  // modified at 28/04/2022
  // modification : enquiry pdf data binding
  let formValidation = false;

  let modelMapping = {
    venue: 'Venue',
    santro: 'Santro',
    grandi10nios: 'Grand i10 Nios',
    allnewi20: 'All New i20',
    i20nline: 'i20 N Line',
    alcazar: 'Alcazar',
    xcentprime: 'Xcent Prime',
    nextgenverna: "Next Gen Verna",
    aura: 'Aura',
    newcreta: 'New Creta',
    tucson: 'Tucson',
    konaev: 'Kona EV'
  };

  // modified by Vihang
  // modified at 28/04/2022
  // modification : enquiry pdf data binding
  useEffect(async()=> {
    if(currentRow.interactionID) {
      let Interaction = await axios.get(`${CONSTANTS.API_URL}/api/v1/interaction?uuids=${currentRow.interactionID}`);
      await setInteractionForPdf(Interaction.data[0])
      if(Interaction.data[0]["dynamicProperties_selectedVariant"]) {
        let carModelAndVariant = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue?uuids=${Interaction.data[0]["dynamicProperties_selectedVariant"]}`);
        await setCarModelVariantPdf(carModelAndVariant.data[0])
      } else if (Interaction.data[0]["dynamicProperties_selectedModel"]) {
        let carModelAndVariant = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue?uuids=${Interaction.data[0]["dynamicProperties_selectedModel"]}`);
        await setCarModelVariantPdf(carModelAndVariant.data[0])
      }
      // modified by Vihang
      // modified at 03/05/2022
      // modification :get quotation data for docket pdf
      let quotationForPdf = await axios.get(`${CONSTANTS.API_URL}/api/v1/quotation?interactionID=${currentRow.interactionID}`);
      setQuotationDataForPdf(quotationForPdf.data)
    }
    if(currentRow.assignedUserID) {
      let scName = await axios.get(`${CONSTANTS.API_URL}/api/v1/users?uuids=${currentRow.assignedUserID}`);
      setScDetails(scName.data[0])
      customerDetailsForPdf.ScName = scName.data[0].displayName;
      customerDetailsForPdf.dateOfEnquiry = moment(currentRow.createdAt).format('DD/MM/YYYY');
      await setCustomerDetailsForPdf(customerDetailsForPdf)
    }
  },[currentRow])

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
    console.log("curerrrrrrrrrrrrrrrrrrr");
    setCurrentRow(props.currentRow);
		if (props.currentRow && props.currentRow.contactID) {
			setContactDetails(props.currentRow.contactDetails);
		}

		if (props.currentRow.containerType === "Checklist") {
      getTaskCheckList()
		} else {
      let taskDetails = await axios.get(`${CONSTANTS.API_URL}/api/v1/taskDetails?taskID=${props.currentRow.uuid}`);
      if (taskDetails.data) {
        setCurrentTask(taskDetails.data)
    }
  }
    if (['Receive Courier','Handover Courier'].includes(props.currentRow['displayName'])) {
      let courierResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/courier?uuids=${props.currentRow['courierID']}`);
      await setCourierData(courierResponse.data[0])
      await getUsersList()
    }
    console.log("props.currentRow.displayName",props.currentRow,props.currentRow.containerType);
    if (props.currentRow.displayName !== "Repair Request" && props.currentRow.displayName !== "Handover Courier" && (props.currentRow.containerType === "Form" || props.currentRow.containerType === "Form and Approval" || props.currentRow.containerType === "Approval")) {
      console.log("formmmmmmmmmmmmm");
      let actionsObj
      if(currentRow.masterTaskID) {
    	   actionsObj = await axios.get(`${CONSTANTS.API_URL}/api/v1/action?taskID=${currentRow.masterTaskID}`);
      }
      if ( actionsObj && actionsObj.data &&  actionsObj.data.length) {
				await Promise.all(actionsObj.data.map(async (action) => {
					let dynamicPropsAction = await axios.get(`${CONSTANTS.API_URL}/api/v1/properties?propertyType=dynamicProperty&actionID=${action.uuid}`);
          console.log(dynamicPropsAction.data, '111111111dynamicPropsAction.datadynamicPropsAction.datadynamicPropsAction.data');
          if (dynamicPropsAction.data.Properties.length) {
            action['dynamicProps'] = dynamicPropsAction.data.Properties;
            action['dynamicPropsData'] = dynamicPropsAction.data.PropertiesByGroup;
            console.log("dfkjssssssssssssssssskhdskjfds",action['dynamicPropsData']);
            await Promise.all(action.dynamicProps.map(async (prop) => {
              if (prop.formType && prop.formType === "select") {
                // dynamicProp.dependentEnum
                if (prop.dependentEnum && prop.dependentEnum.length && prop.dependentEnum[0]['nameOfProp'] === 'mainSource') {
                  await Promise.all(prop.dependentEnum.map((dependentEnumObj) => {
                    if (dependentEnumObj['valueOfProp'] === interactionObj['dynamicProperties_mainSource']) {
                      dependentEnumObj['isSelected'] = true
                    } else {
                      dependentEnumObj['isSelected'] = false
                    }
                  }));
                }
                // setActions(actionsObj);
              }
            }))
					}
				}));
        /*
              modified by Vihang
              modified at 27/05/2022
              modification : code kept to use it for another day if required
        */
          // actionsArraySet = actionsObj.data[0].dynamicProps.slice(0,5);
          // setActionsArraySet(actionsArraySet)
          // actionsArraySetTotal = Math.ceil(actionsObj.data[0].dynamicProps.length / 5)
          // setActionsArratSetTotal(actionsArraySetTotal)
          // setActionsArraySetCount(0)

				await setActions(actionsObj.data);
				await setSelectedActionIndex(0);
			} else {
        console.log("master taskssssss,", currentRow.masterTaskID);
				await axios.get(`${CONSTANTS.API_URL}/api/v1/properties?propertyType=dynamicProperty&taskID=${currentRow.masterTaskID}`).then(async (response) => {
          if (response.data.length) {
            await setDynamicProps(response.data)
          } else {
            //Checklisttttttttttt
          }
          setActions([]);
				});
        await setActions([]);
			}
		}
    if (props.currentRow.displayName === "Repair Request") {
      let NotOkChecklistItem = await axios.get(`${CONSTANTS.API_URL}/api/v1/notOkChecklistItem?taskID=${props.currentRow.triggeredByTaskID}`);
      if (NotOkChecklistItem.data.length) {
        setNotOkChecklistItems(NotOkChecklistItem.data);
        let designation = 'SHOWROOM HOSTESS';
        let lobbyHostesses = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?designation=${designation}&branchID=${userInfo.userBranchID}`);
        setLobbyHostesses(lobbyHostesses.data);
        let departlist = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping?branchID=${userInfo.userBranchID}&dealershipID=${userInfo.dealership}`)
        setDepartments(departlist.data)
      }
    }
  },[props]);

  useEffect(async () => {
    if (currentAction.displayName === "Need Assessment") {
      let designation = 'FINANCE MANAGER';
      let financeExecutives = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?designation=${designation}&branchID=${userInfo.userBranchID}`);
      setFinanceExecutives(financeExecutives.data)
      let listOfCars = await axios.get(`${CONSTANTS.API_URL}/api/v1/listofcars`);
      let toBeRemoveValues = [
        'Cadillac',
        'Acura',
        'Chrysler',
        'Buick',
        'INFINITI',
        'GMC',
        'Genesis',
        'Dodge',
        'Lincoln',
        'MAZDA',
        'Ram',
        'Subaru',
        'Alfa Romeo',
        'Freightliner',
        'Tesla',
        'smart',
        'Lotus',
        'Scion',
        'SRT',
        'Fisker',
        'Mercury',
        'Saab',
        'Pontiac',
        'Saturn',
        'Panoz',
        'Oldsmobile',
        'Plymouth',
        'Eagle',
        'Geo',
        'Daihatsu'
      ];
      let Response = listOfCars.data.filter(item => {
        return !toBeRemoveValues.includes(item);
      });
      console.log(listOfCars.data, 'innnnnnnnnnnnnnnnn', Response);
      setListOfManufacturers(Response);
    }
    if (currentAction.displayName === "Exchange Detail" || currentAction.displayName === "Vehicle Details" || currentAction.displayName === "Need Assessment") {
      let designation = 'SOURCING EXECUTIVE';
      let exchangEvaluators = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?designation=${designation}&branchID=${userInfo.userBranchID}`);
      setExchangeEvaluators(exchangEvaluators.data);
      // let listOfCars = loc.getCarMakes();
      let listOfCars = await axios.get(`${CONSTANTS.API_URL}/api/v1/listofcars`);
      let toBeRemoveValues = [
        'Cadillac',
        'Acura',
        'Chrysler',
        'Buick',
        'INFINITI',
        'GMC',
        'Genesis',
        'Dodge',
        'Lincoln',
        'MAZDA',
        'Ram',
        'Subaru',
        'Alfa Romeo',
        'Freightliner',
        'Tesla',
        'smart',
        'Lotus',
        'Scion',
        'SRT',
        'Fisker',
        'Mercury',
        'Saab',
        'Pontiac',
        'Saturn',
        'Panoz',
        'Oldsmobile',
        'Plymouth',
        'Eagle',
        'Geo',
        'Daihatsu'
      ];
      let Response = listOfCars.data.filter(item => {
        return !toBeRemoveValues.includes(item);
      });
      console.log(listOfCars.data, 'innnnnnnnnnnnnnnnn', Response);
      setListOfManufacturers(Response);
      // if (interactionObj['dynamicProperties_manufacturer']) {
      //   let listOfModels = await axios.get(`${CONSTANTS.API_URL}/api/v1/listofcarModels?manufacturer=${interactionObj['dynamicProperties_manufacturer']}`);
      //   setListOfModels(listOfModels.data);
      // }
    } else if (currentAction.displayName === "Offers and Schemes" || currentAction.displayName === "Booking Details") {
      let offers = await axios.get(`${CONSTANTS.API_URL}/api/v1/offer`);
      setOffers(offers.data)

      let schemes = await axios.get(`${CONSTANTS.API_URL}/api/v1/schemes`);
      if (selectedProducts[0]) {
        let res = schemes.data.filter(d => d.catalogueItemName === selectedProducts[0]['model'].toLowerCase());
        setSchemes(res)
      } else if (interactionObj['dynamicProperties_selectedVariant']) {
        let res = schemes.data.filter(d => d.catalogueItemName === interactionObj['dynamicProperties_selectedVariant'].split(" ")[0].toLowerCase());
        setSchemes(res)
      }
    } else if (currentAction.displayName === "Summary") {
      let quotations = await axios.get(`${CONSTANTS.API_URL}/api/v1/quotation?interactionID=${currentRow.interactionID}`);
      setLastQuotation(quotations.data);
    } else  if (currentAction.displayName === "Product Selection" || currentAction.displayName === "Test Drive Detail" || currentAction.displayName  === "Price Details") {
      let catalogoueItemResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue`);
      let array = catalogoueItemResponse.data
      const result = [];
      const map = new Map();
      for (const item of array) {
        if (!map.has(item.displayName)) {
          map.set(item.displayName, true);    // set any value to Map
          result.push({
            ...item
          });
        }
      }
      await setCatalogoueItemList(result)
      if (interactionObj['dynamicProperties_modelName']) {
        let testDriveCarsList = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem?typeOfStockItem=testDrive&model=${interactionObj['dynamicProperties_modelName'].model}`);
        if (testDriveCarsList.data.length) {
          setTestDriveCars(testDriveCarsList.data);
        } else {
          setTestDriveCars([]);
        }
      }
      // if (selectedProducts && selectedProducts.length) {

      // }
    }
  }, [currentAction])

/*
      modified by Vihang
      modified at 25/05/2022
      modification : passed props.current row to fix the current row empty issue in mobile view
*/
	useEffect(async () => {
    if (actions.length) {
      setActions(actions);
      setSelectedActionIndex(selectedActionIndex);
      setCurrentRow(props.currentRow);
      setInteraction(interactionObj);
      let payload = currentRow;
      console.log("saveFormInputsaveFormInputsaveFormInput",interactionObj);
      if (isFormUpdated) {
        let Response = await Axios.put(`${CONSTANTS.API_URL}/api/v2/task/${currentRow.uuid}/updateForm`, payload);
      }
    }
    setIsFormUpdated(false);
  }, [isFormUpdated])

  useEffect(async () => {
    if (selectedDepartment) {
      let users = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?branchID=${userInfo.userBranchID}&departmentName=${selectedDepartment}`);
      if (users.data.length) {
        setUsers(users.data);
      } else {
        setUsers([]);
      }
    }
  },[selectedDepartment])

  /*
        modified by Vihang
        modified at 25/05/2022
        modification : scroll button function to check if form modal container is scrolled at the bottom
  */
  /*
        modified by Vihang
        modified at 26/05/2022
        modification : box shadow added for form modal container until it is scrolled to the bottom and back button disable state added
  */
  useEffect(async()=> {
    let element = await document.getElementById("formModalContainer");
    if (element && (element.offsetHeight + element.scrollTop < element.scrollHeight)) {
      //element.style.boxShadow = "inset 3px -14px 11px -10px rgb(0 0 0 / 20%)";
      await setIsScrolledToTheBottom(false);
    }
    async function checkScrolledBottom () {
      if(element.offsetHeight + element.scrollTop >= element.scrollHeight) {
        await setIsScrolledToTheBottom(true)
        await setIsSaveModalDisable(false)
        await setIsNextModalDisable(false)
        await setIsBackModalDisable(false)
        element.style.boxShadow = "none";
     } else {
       await setIsScrolledToTheBottom(false)
       //element.style.boxShadow = "inset 3px -14px 11px -10px rgb(0 0 0 / 20%)";
     }
    }
    element.addEventListener("scroll",checkScrolledBottom);

    return () => {
        element.removeEventListener("scroll", checkScrolledBottom);
    }
  },[currentAction])

  /*
        modified by Vihang
        modified at 02/05/2022
        modification : separate function to checklist item added to pass it to the checklist component
  */

  async function getTaskCheckList() {
    await axios.get(`${CONSTANTS.API_URL}/api/v1/getTaskWithCheckList?uuids=${props.currentRow.uuid}`).then(async (res) => {
      // setIsUpdate(false)
      if (res && res.data) {
        setCurrentTask(res.data.task[0])
        await setTaskCheckListItems(res.data.checkList);
        await setTotalTaskCheckListItems(res.data.checkList.length)
        let answeredCount = 0;
        await Promise.all(res.data.checkList.map((item) => {
          if (item.isOkSelected || item.isNotOkSelected) {
            answeredCount += 1;
          }
        }))
        answeredCount ? await setAnsweredCount(answeredCount) : await setAnsweredCount(0)

        let percentage = ((answeredCount / res.data.checkList.length) * 100).toFixed(0);
        if (isNaN(percentage)) {
          await setTotalTaskCheckListItemsProgress(0)
        } else {
          await setTotalTaskCheckListItemsProgress(percentage)
        }

      }
    });
  }

  // modified by Vihang
  // modified at 25 May 2022
  // modification :  next button is diabled initially when quotation for is opened

  async function toggleFormPopover() {
    if (isOpenFormPopover) {
      await setIsOpenFormPopover(!isOpenFormPopover);

      await setAssignToType('');
      await setSelectedDepartment('');
      return;
    }
    await setSelectedModel('');
    await setVariantList([]);
    await setCartNumber(0);
    await setCurrentAction('');
    await setDynamicProps([]);
    if (currentRow.interactionID) {
      let Interaction = await axios.get(`${CONSTANTS.API_URL}/api/v1/interaction?uuids=${currentRow.interactionID}`);
      if (Interaction.data.length) {
        setInteraction(Interaction.data[0]);
        if (Interaction.data[0]['dynamicProperties_pincode']) {
          getAreaByPincode(Interaction.data[0]['dynamicProperties_pincode'], "pincode");
        } else if (Interaction.data[0]['dynamicProperties_companyPincode']) {
          getAreaByPincode(Interaction.data[0]['dynamicProperties_companyPincode'], "companyPincode");
        }
        if (Interaction.data[0]['dynamicProperties_state']) {
          getCityList(Interaction.data[0]['dynamicProperties_state']);
        }
  			if (Interaction.data[0]['dynamicProperties_selectedModel'] && Interaction.data[0]['dynamicProperties_selectedModel'] !== 'NA') {
          setSelectedModel(Interaction.data[0]['dynamicProperties_selectedModel']);
          getVariantForSelectedModel(Interaction.data[0]['dynamicProperties_selectedModel']);
        }
      }
      if (currentRow.selectedTestDriveCarID) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/track/vehicle/${currentRow.selectedTestDriveCarID}`).then(async (res) => {
          if (res.data) {
            setcurrentCarLat(res.data.lat);
            setcurrentCarLong(res.data.lng);
          }
        });
        // setcurrentCarLat
        // setcurrentCarLong
      }
  		if (props.currentRow.displayName !== "Repair Request" && props.currentRow.displayName !== "Handover Courier" && props.currentRow.containerType === "Form" || props.currentRow.containerType === "Form and Approval" || props.currentRow.containerType === "Approval") {
        let actions;
        if(currentRow.masterTaskID) {
          actions = await axios.get(`${CONSTANTS.API_URL}/api/v1/action?taskID=${currentRow.masterTaskID}`);
        }
        if (actions && actions.data && actions.data.length) {
          let totalProps = 0;
  				await Promise.all(actions.data.map(async (action, index) => {
  					let dynamicPropsAction = await axios.get(`${CONSTANTS.API_URL}/api/v1/properties?propertyType=dynamicProperty&actionID=${action.uuid}`);
            console.log(dynamicPropsAction.data, 'dynamicPropsAction.datadynamicPropsAction.datadynamicPropsAction.data');
  					if (dynamicPropsAction.data.Properties.length) {
  						action['dynamicProps'] = dynamicPropsAction.data.Properties;
  						action['dynamicPropsData'] = dynamicPropsAction.data.PropertiesByGroup;
              totalProps = totalProps + dynamicPropsAction.data.length;
              await Promise.all(action.dynamicProps.map(async (prop) => {
                if (Interaction.data[0]["dynamicProperties_" + prop.name] && Interaction.data[0]["dynamicProperties_" + prop.name] !== "NA") {
                  currentRow["dynamicProperties_" + prop.name] = Interaction.data[0]["dynamicProperties_" + prop.name];
                }
                if (prop.formType && prop.formType === "select") {
                  // dynamicProp.dependentEnum
                  if (prop.dependentEnum && prop.dependentEnum.length && prop.dependentEnum[0]['nameOfProp'] === 'mainSource') {
                    await Promise.all(prop.dependentEnum.map((dependentEnumObj) => {
                      if (dependentEnumObj['valueOfProp'] === interactionObj['dynamicProperties_mainSource']) {
                        dependentEnumObj['isSelected'] = true
                      } else {
                        dependentEnumObj['isSelected'] = false
                      }
                    }));
                  }
                  // setActions(actions);
                } else if (prop.formType && prop.formType === 'file' && (Interaction.data[0]['dynamicProperties_'+prop.name] && Interaction.data[0]['dynamicProperties_'+prop.name] !== "NA")) {
                  prop.signedUrl = await getImageSignedUrl(prop.name, Interaction.data[0],props.currentRow);
                  console.log("ffffffffffff",Interaction.data[0]['dynamicProperties_'+prop.name]);
                }
              }));
              setCurrentRow(currentRow);
  					}
  				}));
  				await setActions(actions.data);
          await Promise.all(actions.data.map(async (action, index) => {
            if (action.dynamicProps && action.dynamicProps.length) {
              await Promise.all(action.dynamicProps.map(async (prop) => {
                let fieldName = prop.name;
                let indexField = dynamicPropsWithValues.findIndex((d) => d.name === fieldName);
                if (indexField === -1 && Interaction.data[0]["dynamicProperties_"+fieldName] && (Interaction.data[0]["dynamicProperties_"+fieldName] !== "NA" && Interaction.data[0]["dynamicProperties_"+fieldName] !== "")) {
                  dynamicPropsWithValues.push({
                    name: fieldName
                  });
                  setDynamicPropsWithValues(dynamicPropsWithValues);
                  progress = dynamicPropsWithValues.length / (totalProps);
                  setProgress(progress);
                }
              }))
            }

          }))
          await setCurrentAction(actions.data[0]);
          if (currentAction.displayName === "Product Selection" || currentAction.displayName === "Test Drive Detail" || currentAction.displayName  === "Price Details") {
            let catalogoueItemResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue`);
            let array = catalogoueItemResponse.data
            const result = [];
            const map = new Map();
            for (const item of array) {
              if (!map.has(item.displayName)) {
                map.set(item.displayName, true);    // set any value to Map
                result.push({
                  ...item
                });
              }
            }
            await setCatalogoueItemList(result)
            if (selectedProducts && selectedProducts[0]) {
              let testDriveCarsList = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem?typeOfStockItem=testDrive&model=${selectedProducts[0]['model']}`);
              if (testDriveCarsList.data.length) {
                setTestDriveCars(testDriveCarsList.data);
              } else {
                setTestDriveCars([]);
              }
            }
          }
  				await setSelectedActionIndex(0);
  			} else {
  				await axios.get(`${CONSTANTS.API_URL}/api/v1/properties?propertyType=dynamicProperty&taskID=${currentRow.masterTaskID}`).then(async (response) => {
            await Promise.all(response.data.Properties.map(async (prop) => {
              if (Interaction.data[0]["dynamicProperties_" + prop.name] && Interaction.data[0]["dynamicProperties_" + prop.name] !== "NA") {
                currentRow["dynamicProperties_" + prop.name] = Interaction.data[0]["dynamicProperties_" + prop.name];
                await Promise.all(response.data.Properties.map(async (prop) => {
                  if (prop.formType && prop.formType === 'file' && (Interaction.data[0]['dynamicProperties_'+prop.name] && Interaction.data[0]['dynamicProperties_'+prop.name] !== "NA")) {
                    prop.signedUrl = await getImageSignedUrl(prop.name, Interaction.data[0],props.currentRow);
                    console.log("sssssssssss",prop.signedUrl);
                  }
                  let fieldName = prop.name;
                  let indexField = dynamicPropsWithValues.findIndex((d) => d.name === fieldName);
                  if (indexField === -1 && Interaction.data[0]["dynamicProperties_"+fieldName] && (Interaction.data[0]["dynamicProperties_"+fieldName] !== "NA" && Interaction.data[0]["dynamicProperties_"+fieldName] !== "")) {
                    dynamicPropsWithValues.push({
                      name: fieldName
                    });
                    setDynamicPropsWithValues(dynamicPropsWithValues);
                    progress = dynamicPropsWithValues.length / (response.data.length);
                    setProgress(progress);
                  }
                }))
              }
            }));
            await setDynamicProps(response.data.Properties);
            await setActions([]);
            setCurrentRow(currentRow);
  				});
  			}
  		}
      await setIsOpenFormPopover(!isOpenFormPopover);
    }
		if (currentRow.displayName === "Repair Request") {
      await setRepairRequestFormOpen(!isRepairRequestFormOpen);
    }
    if (!currentRow.interactionID) {
      await setCurrentRow(currentRow);
      await setIsOpenFormPopover(!isOpenFormPopover);
    }

    /*
          modified by Vihang
          modified at 26/05/2022
          modification :if scrollexits then disabled next,back and next button else enabled when modal is opened
    */
    let formModalContainerElement =  await document.getElementById("formModalContainer")
    if(formModalContainerElement.scrollHeight > formModalContainerElement.clientHeight) {
      formModalContainerElement.scrollTo({
       top: 0,
       behavior: 'smooth',
     })
      setTimeout(async () => {
         await setIsNextModalDisable(true);
         await setIsSaveModalDisable(true);
         await setIsBackModalDisable(true);
      }, 0)
    } else {
         await setIsScrolledToTheBottom(true)
         await setIsNextModalDisable(false);
         await setIsSaveModalDisable(false);
         await setIsBackModalDisable(false);
    }
  }

  async function setFormValueInput(e, fieldName) {
    e.preventDefault();
    if (fieldName === 'discount') {
      currentRow['dynamicProperties_discountToBeAdjusted'] = e.target.value;
      interactionObj['dynamicProperties_discountToBeAdjusted'] = e.target.value;
    }
    // if (fieldName.substring(0, 8) === 'adjusted') {
    //   let adjustedDiscount = Number(interactionObj['dynamicProperties_'+fieldName.charAt(8).toLowerCase()+fieldName.substring(9)]) - Number(e.target.value);
    //   let remainingDiscount = Number(interactionObj['dynamicProperties_discountToBeAdjusted']) - adjustedDiscount;
    //   if (remainingDiscount >= 0) {
    //     interactionObj['dynamicProperties_discountToBeAdjusted'] = remainingDiscount;
    //     currentRow['dynamicProperties_' + fieldName] = e.target.value;
    //     interactionObj['dynamicProperties_' + fieldName] = e.target.value;
    //   }
    // } else {
      currentRow['dynamicProperties_' + fieldName] = e.target.value;
      interactionObj['dynamicProperties_' + fieldName] = e.target.value;
    // }
    if (document.getElementById(fieldName)) {
      if ((fieldName === "addressLine1" || fieldName === "companyAddress") && e.target.value.length < 4) {
        document.getElementById(fieldName).style.borderBottom = "2px solid red";
        let spanNode = document.getElementById("error-"+fieldName);
        if (spanNode) {
          spanNode.style.display ="block";
          spanNode.innerHTML = "Address should be greater than 4 characters"
        }
      } else if ((fieldName === "addressLine1" || fieldName === "companyAddress") && e.target.value.length > 50) {
        document.getElementById(fieldName).style.borderBottom = "2px solid red";
        let spanNode = document.getElementById("error-"+fieldName);
        if (spanNode) {
          spanNode.style.display ="block";
          spanNode.innerHTML = "Address should be less than 50 characters"
        }
      } else {
        //document.getElementById(fieldName).style.borderBottom = "1px solid #9e9e9e";
        let node = document.getElementById("error-"+fieldName);
        if (node) {
          node.style.display = "none";
        }
      }

    }
    if (fieldName === "pincode" || fieldName === "companyPincode") {
      getAreaByPincode(e.target.value,fieldName);
    }
    let index = dynamicPropsWithValues.findIndex((d) => d.name === fieldName);
    if (index === -1) {
      dynamicPropsWithValues.push({
        name: fieldName
      });
      setDynamicPropsWithValues(dynamicPropsWithValues);
      progress = dynamicPropsWithValues.length / dynamicProps.length;
      setProgress(progress);
    }
    setIsFormUpdated(true);
  }
  async function saveFormInputRadioDefault(e, fieldName) {
    console.log('innnnnnnnnnnnn', e, fieldName)
    currentRow['dynamicProperties_' + fieldName] = e.target.value;
    interactionObj['dynamicProperties_' + fieldName] = e.target.value;
    let payload = {};
    payload[fieldName] = currentRow['dynamicProperties_' + fieldName];
    // await updateTask(payload);
    // if (e.target.value && document.getElementById(fieldName)) {
    //   document.getElementById(fieldName).style.border = "1px solid #d1d1d1";
    // }
    setIsFormUpdated(true);

  }

 async function dynamicButtonClicked(e, buttonName) {
    e.preventDefault();
    if (buttonName === "Call") {
      await axios.post(`${CONSTANTS.API_URL}/api/v1/originateCall`, {
        userID: userInfo.uuid,
        mobileNumber: interactionObj['dynamicProperties_mobile'],
        taskID: currentRow.uuid
      });
    } else if ((buttonName === "Register Request") || (buttonName === "Schedule")) {
      let TestDriveResponse = await axios.put(`${CONSTANTS.API_URL}/api/v1/scheduleTestDrive/${currentRow.uuid}`, {
        cartProducts
      });
      if (TestDriveResponse.data.testDriveQueueNumber) {
        setTestDriveQueue(TestDriveResponse.data.testDriveQueueNumber);
      }
    } else if (buttonName === "Approve") {
      let payload = currentRow;
      currentRow['status'] = "Approved";
      let Response = await Axios.put(`${CONSTANTS.API_URL}/api/v2/task/${currentRow.uuid}/markComplete`, payload)
      let notificationObj = {
        typeOfNotification: "push",
        message: "Task " + currentRow.displayName + " approved",
        taskID: currentRow.uuid,
        group: "task",
        isSent: true,
        isRead: false,
        sendTo: userInfo.uuid
      };
      if (Response.data.triggeredTaskList.length) {
        await setTriggeredUnassignedTaskList(Response.data.triggeredTaskList);
        await toggleOpenAssignUsersTriggeredTask();
      }
      if (Response.data.triggeredTaskListForApproval.length) {
        await setTriggeredUnassignedApprovalTaskList(Response.data.triggeredTaskListForApproval);
        await toggleOpenAssignApprovalUsersTriggeredTask();
      }
      let taskCompletionMessage = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, notificationObj);
      if (taskCompletionMessage.status === 200) {
        props.triggerNotifications(true)
      }
      toastr.success('Task ' + currentRow.displayName + " approved");
      if (Response.data.messageResponses && Response.data.messageResponses.length) {
        await Promise.all(Response.data.messageResponses.map(async (messageObj) => {
          if (messageObj.sendTo) {
            let messageNotification = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, messageObj);
            if (messageNotification.status === 200) {
              props.triggerNotifications(true)
            }
            toastr.info(messageObj.message);
          } else {
            toastr.info(messageObj.message);
          }
        }))
      }
      await toggleFormPopover();

      // let ApproveTask = await axios.put(`${CONSTANTS.API_URL}/api/v2/task/${currentRow.uuid}/approve`, {
      //   status: 'Approved'
      // });
      // props.triggerNotifications(true)
      // toastr.info(`${currentRow.displayName} Approved`);
      // if (Response.data.messageResponses && ApproveTask.data.messageResponses.length) {
      //   await Promise.all(ApproveTask.data.messageResponses.map(async (messageObj) => {
      //     if (messageObj.sendTo) {
      //       let messageNotification = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, messageObj);
      //       if (messageNotification.status === 200) {
      //         props.triggerNotifications(true)
      //       }
      //       toastr.info(messageObj.message);
      //     } else {
      //       toastr.info(messageObj.message);
      //     }
      //   }))
      // }
    } else if (buttonName === "Reject") {
      let payload = currentRow;
      currentRow['status'] = "Rejected";
      let Response = await Axios.put(`${CONSTANTS.API_URL}/api/v2/task/${currentRow.uuid}/markComplete`, payload)
      // let notificationObj = {
      //   typeOfNotification: "push",
      //   message: "Task " + currentRow.displayName + " rejected",
      //   taskID: currentRow.uuid,
      //   group: "task",
      //   isSent: true,
      //   isRead: false,
      //   sendTo: userInfo.uuid
      // };
      // let taskCompletionMessage = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, notificationObj);
      // if (taskCompletionMessage.status === 200) {
      //   props.triggerNotifications(true)
      // }
      if (Response.data.messageResponses && Response.data.messageResponses.length) {
        await Promise.all(Response.data.messageResponses.map(async (messageObj) => {
          if (messageObj.sendTo) {
            let messageNotification = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, messageObj);
            if (messageNotification.status === 200) {
              props.triggerNotifications(true)
            }
            toastr.info(messageObj.message);
          } else {
            toastr.info(messageObj.message);
          }
        }))
      }
      await toggleFormPopover();

      // let ApproveTask = await axios.put(`${CONSTANTS.API_URL}/api/v2/task/${currentRow.uuid}/approve`, {
      //   status: 'Approved'
      // });
      // props.triggerNotifications(true)
      // toastr.info(`${currentRow.displayName} Approved`);
      // if (Response.data.messageResponses && ApproveTask.data.messageResponses.length) {
      //   await Promise.all(ApproveTask.data.messageResponses.map(async (messageObj) => {
      //     if (messageObj.sendTo) {
      //       let messageNotification = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, messageObj);
      //       if (messageNotification.status === 200) {
      //         props.triggerNotifications(true)
      //       }
      //       toastr.info(messageObj.message);
      //     } else {
      //       toastr.info(messageObj.message);
      //     }
      //   }))
      // }
    } else if (buttonName === "Request Feedback") {
        props.triggerNotifications(true)
        toastr.info('Feedback link sent to the Customer');
    } else if (buttonName === "Send Link for Digital Signature") {
      props.triggerNotifications(true)
      toastr.success('Docket Sent to Customer for e-Signature successfully');
      let buttonElement = document.getElementById(e.target.id);
      buttonElement.setAttribute("disabled", true);
    } else if (buttonName === "Push to NDMS") {
      props.triggerNotifications(true)
      toastr.info('Booking is being pushed to NDMS');
      let buttonElement = document.getElementById(e.target.id);
      buttonElement.setAttribute("disabled", true);
    } else if (buttonName === "Finance Quotation") {
      let payload = {
        taskID: currentRow.uuid,
        interactionID: currentRow.interactionID,
        customerName: interactionForPdf && interactionForPdf["dynamicProperties_customerName"] ? interactionForPdf["dynamicProperties_customerName"] : '',
        customerAddress: interactionForPdf && interactionForPdf && interactionForPdf["dynamicProperties_addressLine1"] && interactionForPdf["dynamicProperties_addressLine2"] && interactionForPdf["dynamicProperties_state"] && interactionForPdf["dynamicProperties_city"] && interactionForPdf["dynamicProperties_pincode"] ?  (interactionForPdf["dynamicProperties_addressLine1"] + " " + interactionForPdf["dynamicProperties_addressLine2"] + ", " +  interactionForPdf["dynamicProperties_state"] + ", " + interactionForPdf["dynamicProperties_city"] + ", " + interactionForPdf["dynamicProperties_pincode"]).charAt(0).toUpperCase() + (interactionForPdf["dynamicProperties_addressLine1"] + " " + interactionForPdf["dynamicProperties_addressLine2"] + ", " +  interactionForPdf["dynamicProperties_state"] + ", " + interactionForPdf["dynamicProperties_city"] + ", " + interactionForPdf["dynamicProperties_pincode"]).slice(1): "",
        customerMobile: interactionForPdf && interactionForPdf["dynamicProperties_mobile"] ? interactionForPdf["dynamicProperties_mobile"] : '',
        // modelID: currentRow.modelID,
        modelName: interactionForPdf && interactionForPdf["dynamicProperties_selectedModelName"] ?  interactionForPdf["dynamicProperties_selectedModelName"] : "",
        color: interactionForPdf && interactionForPdf["dynamicProperties_selectedColor"] ?  interactionForPdf["dynamicProperties_selectedColor"] : "",
        bankID: 'ec840b45-7eba-4366-a0a9-32f043e130a9',
        // onRoadPrice: interactionForPdf && interactionForPdf['dynamicProperties_onRoadPrice'] ? interactionForPdf['dynamicProperties_onRoadPrice'] : 0,
        exShowroomPrice: interactionForPdf && interactionForPdf['dynamicProperties_exShowroom'] ? interactionForPdf['dynamicProperties_exShowroom'] : 0,
        emi: 22000,
        tenure: 60,
        selectedConfigIDForStampDuty: 'ab848fdc-c78f-4305-97db-c264b022fed2',
        selectedConfigIDForProcessingFee: '636e98fb-538d-4752-8aa9-a54e0713ea98',
        selectedModelID: interactionForPdf['dynamicProperties_selectedModel'],
        selectedVariantID: interactionForPdf['dynamicProperties_selectedVariant']
      }
      let onRoadPrice = 0;
      if (interactionForPdf && interactionForPdf['dynamicProperties_exShowroom']) {
        onRoadPrice = onRoadPrice + interactionForPdf['dynamicProperties_exShowroom'];
      }
      if (interactionForPdf && interactionForPdf['dynamicProperties_exShowroom'] > 1000000) {
        onRoadPrice = onRoadPrice + interactionForPdf['dynamicProperties_tcsOnExShowroom'];
      }
      if (interactionForPdf && interactionForPdf['dynamicProperties_rtoIndividual']) {
        onRoadPrice = onRoadPrice + interactionForPdf['dynamicProperties_rtoIndividual'];
      }
      if (interactionForPdf && interactionForPdf['dynamicProperties_insuranceCalculatedl']) {
        onRoadPrice = onRoadPrice + interactionForPdf['dynamicProperties_insuranceCalculated'];
      }
      payload['onRoadPrice'] = onRoadPrice;
      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/financeQuotation`, payload);
    }
  }
 async function getCityList(stateName) {
   let stateObj = stateList.find(state => state.name === stateName);
   if (stateObj) {
     let countryCode = stateObj.countryCode ? stateObj.countryCode : '';
     let stateCode = stateObj.isoCode ? stateObj.isoCode : '';
     let cityList = City.getCitiesOfState(countryCode, stateCode);
     setCityList(cityList);
   }
 }
  async function saveSelectedVariant(e) {
    setSelectedVariantName(e.target.value);
    interactionObj['dynamicProperties_selectedVariant'] = e.target.value;
    let Index = await catalogoueItemList.findIndex(d => d.uuid === e.target.value);
    if (Index > -1) {
      interactionObj['dynamicProperties_variantName'] = catalogoueItemList[Index];
      currentRow['dynamicProperties_variantName'] = catalogoueItemList[Index];
    }
    currentRow['dynamicProperties_selectedVariant'] = e.target.value;
    setIsFormUpdated(true);
  }
  async function saveSelectedTestDriveModel(e) {
		getVariantForSelectedModel(e.target.value);
		setSelectedModel(e.target.value);
		interactionObj['dynamicProperties_selectedTestDriveModel'] = e.target.value;
		currentRow['dynamicProperties_selectedTestDriveModel'] = e.target.value;
    let modelName = catalogoueItemList.filter(d => d.uuid === e.target.value);
    if (modelName.length) {
      let testDriveCarsList = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem?typeOfStockItem=testDrive&model=${modelMapping[modelName[0].displayName]}`);
      if (testDriveCarsList.data.length) {
        setTestDriveCars(testDriveCarsList.data);
      } else {
        setTestDriveCars([]);
      }
    }

		setIsFormUpdated(true);
	}
  async function saveSelectedTestDriveVariant(e) {
    setSelectedVariantName(e.target.value);
    interactionObj['dynamicProperties_selectedTestDriveVariant'] = e.target.value;
    currentRow['dynamicProperties_selectedTestDriveVariant'] = e.target.value;
    setIsFormUpdated(true);
  }
  async function saveSelectedTestDriveCar(e) {
    interactionObj['dynamicProperties_selectedTestDriveCarID'] = e.target.value;
    currentRow['dynamicProperties_selectedTestDriveCarID'] = e.target.value;
    setIsFormUpdated(true);
  }

	async function updateQuantity(e, item) {
		let indexOfSelectedItem = selectedProducts.findIndex(d => d.productID === item.uuid);
		if (indexOfSelectedItem > -1 && Number(e.target.value)) {
			let oldQuantity = selectedProducts[indexOfSelectedItem]['quantity'];
			selectedProducts[indexOfSelectedItem]['quantity'] = Number(e.target.value);
			setSelectedProducts([...selectedProducts]);
			let indexOfCartItem = cartProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor));
			if (indexOfCartItem > -1) {
				cartProducts[indexOfCartItem]['quantity'] = selectedProducts[indexOfSelectedItem]['quantity'];
				cartNumber = cartNumber - oldQuantity + selectedProducts[indexOfSelectedItem]['quantity'];
			} else {
				let obj = {
					productID: item.uuid,
					model: item.model,
					variant: item.variant,
					quantity: selectedProducts[indexOfSelectedItem]['quantity'],
					totalIndividual: item.totalIndividual,
          exShowroom: item.exShowroom,
          basicAccessoriesKit: item.basicAccessoriesKit,
          rsa: item.rsa,
          rmk: item.rmk,
          sheildOfTrust: item.sheildOfTrust,
          fourthAnd5thYearExtendedWarranty: item.fourthAnd5thYearExtendedWarranty,
					totalCompany: item.totalCompany,
					waitingPeriodMin: item.waitingPeriodMin,
					waitingPeriodMax: item.waitingPeriodMax,
					bookingAmount: item.bookingAmount
				};
				cartProducts.push(obj);
				cartNumber = cartNumber + selectedProducts[indexOfSelectedItem]['quantity'];
			}
			setCartProducts(cartProducts);
			calculateCartValue();
			setCartNumber(cartNumber);
		} else if (indexOfSelectedItem > -1 && !Number(e.target.value)) {
			let oldQuantity = selectedProducts[indexOfSelectedItem]['quantity'];
			selectedProducts[indexOfSelectedItem]['quantity'] = 0;
			setSelectedProducts([...selectedProducts]);
			let indexOfCartItem = cartProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor));
			if (indexOfCartItem > -1) {
				cartProducts.splice(indexOfCartItem, 1);
				cartNumber = cartNumber - oldQuantity;
			}
			setCartProducts(cartProducts);
			calculateCartValue();
			setCartNumber(cartNumber);
		} else {
			let obj = {
				productID: item.uuid,
				model: item.model,
				variant: item.variant,
				quantity: Number(e.target.value),
				totalIndividual: item.totalIndividual,
        exShowroom: item.exShowroom,
        basicAccessoriesKit: item.basicAccessoriesKit,
        rsa: item.rsa,
        rmk: item.rmk,
        sheildOfTrust: item.sheildOfTrust,
        fourthAnd5thYearExtendedWarranty: item.fourthAnd5thYearExtendedWarranty,
        fourthAnd5thYearExtendedWarranty: item.fourthAnd5thYearExtendedWarranty,
				totalCompany: item.totalCompany,
        waitingPeriodMin: item.waitingPeriodMin,
        waitingPeriodMax: item.waitingPeriodMax,
        bookingAmount: item.bookingAmount
			};
			cartProducts.push(obj);
			cartNumber = cartNumber + Number(e.target.value);
			selectedProducts.push(obj);
			setSelectedProducts([...selectedProducts]);
			setCartProducts(cartProducts);
			calculateCartValue();
			setCartNumber(cartNumber);
		}

		let minusBtn = document.getElementById("qty-count--minus");
		// let addBtn = document.getElementById("qty-count--add");
		let qty = Number(e.target.value);

		if (isNaN(qty) || qty <= 1) {
			e.target.value = 1;
			minusBtn.disabled = true;
		} else {
			minusBtn.disabled = false;
		}
		//   if(qty >= 1000){
		//     e.target.value = 1000;
		//     addBtn.disabled = true;
		//   } else {
		//     e.target.value = qty;
		//     addBtn.disabled = false;
		//   }
		// }
	}

	async function addQuantity(e, item, index) {
		let indexOfSelectedItem = selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor);
		if (indexOfSelectedItem > -1) {
			if (selectedProducts[indexOfSelectedItem]['quantity']) {
				selectedProducts[indexOfSelectedItem]['quantity'] = selectedProducts[indexOfSelectedItem]['quantity'] + 1;
				let elem = document.getElementById('product-qty' + index);
				if (elem) {
					elem.value = selectedProducts[indexOfSelectedItem]['quantity'];
				}
				let indexOfCartItem = cartProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor));
				if (indexOfCartItem > -1) {
					cartProducts[indexOfCartItem]['quantity'] = selectedProducts[indexOfSelectedItem]['quantity'];
					cartNumber = cartNumber + 1;
				} else {
					let obj = {
						productID: item.uuid,
						model: item.model,
						variant: item.variant,
						color: selectedProducts[indexOfSelectedItem]['color'],
						quantity: selectedProducts[indexOfSelectedItem]['quantity'],
						totalIndividual: item.totalIndividual,
            exShowroom: item.exShowroom,
            basicAccessoriesKit: item.basicAccessoriesKit,
            rsa: item.rsa,
            rmk: item.rmk,
            sheildOfTrust: item.sheildOfTrust,
            fourthAnd5thYearExtendedWarranty: item.fourthAnd5thYearExtendedWarranty,
						totalCompany: item.totalCompany,
  					waitingPeriodMin: item.waitingPeriodMin,
  					waitingPeriodMax: item.waitingPeriodMax,
  					bookingAmount: item.bookingAmount
					};
					cartProducts.push(obj);
					cartNumber = cartNumber + selectedProducts[indexOfSelectedItem]['quantity'];
				}
			} else {
				selectedProducts[indexOfSelectedItem]['quantity'] = 1;
				let elem = document.getElementById('product-qty' + index);
				if (elem) {
					elem.value = 1;
				}
				let indexOfCartItem = cartProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor));
				if (indexOfCartItem > -1) {
					cartProducts[indexOfCartItem]['quantity'] = selectedProducts[indexOfSelectedItem]['quantity'];
					cartNumber = cartNumber + 1;
				} else {
					let obj = {
						productID: item.uuid,
						model: item.model,
						variant: item.variant,
						quantity: selectedProducts[indexOfSelectedItem]['quantity'],
						color: selectedProducts[indexOfSelectedItem]['color'],
						totalIndividual: item.totalIndividual,
            exShowroom: item.exShowroom,
            basicAccessoriesKit: item.basicAccessoriesKit,
            rsa: item.rsa,
            rmk: item.rmk,
            sheildOfTrust: item.sheildOfTrust,
            fourthAnd5thYearExtendedWarranty: item.fourthAnd5thYearExtendedWarranty,
						totalCompany: item.totalCompany,
  					waitingPeriodMin: item.waitingPeriodMin,
  					waitingPeriodMax: item.waitingPeriodMax,
  					bookingAmount: item.bookingAmount
					};
					cartProducts.push(obj);
					cartNumber = cartNumber + selectedProducts[indexOfSelectedItem]['quantity'];
				}
			}
			setSelectedProducts([...selectedProducts]);
			setCartProducts(cartProducts);
			calculateCartValue();
			setCartNumber(cartNumber);
      // modified by Vihang
      // modified at 25 May 2022
      // modification : next form modal button enabled when product is selected
      setIsNextModalDisable(false)
		} else {
			let obj = {
				productID: item.uuid,
				model: item.model,
				variant: item.variant,
				quantity: 1,
				color: selectedProducts[indexOfSelectedItem]['color'],
				totalIndividual: item.totalIndividual,
        exShowroom: item.exShowroom,
        basicAccessoriesKit: item.basicAccessoriesKit,
        rsa: item.rsa,
        rmk: item.rmk,
        sheildOfTrust: item.sheildOfTrust,
        fourthAnd5thYearExtendedWarranty: item.fourthAnd5thYearExtendedWarranty,
				totalCompany: item.totalCompany,
        waitingPeriodMin: item.waitingPeriodMin,
        waitingPeriodMax: item.waitingPeriodMax,
        bookingAmount: item.bookingAmount
			};
			let elem = document.getElementById('product-qty' + index);
			if (elem) {
				elem.value = 1;
			}
			selectedProducts.push(obj);
			cartProducts.push(obj);
			setSelectedProducts([...selectedProducts]);
			setCartProducts(cartProducts);
			calculateCartValue();
			cartNumber = cartNumber + 1;
			setCartNumber(cartNumber);
      // modified by Vihang
      // modified at 25 May 2022
      // modification : next form modal button enabled when product is selected
      setIsNextModalDisable(false)
		}

		// let qty = Number(elem.value);
		// qty += 1;
		// if (qty >= 0 + 1) {
		//   document.getElementById("qty-count--minus"+ index).disabled = false;
		// }

		// if (qty >= 1000) {
		//   e.target.disabled = true;
		// }
	}

  // modified by Vihang
  // modified at 25 May 2022
  // modification : disabled the next button if the count of cartnumber is 0

	async function removeQuantity(e, item, index) {
		let indexOfSelectedItem = selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor);
		if (indexOfSelectedItem > -1) {
			if (selectedProducts[indexOfSelectedItem]['quantity'] > 1) {
				selectedProducts[indexOfSelectedItem]['quantity'] = selectedProducts[indexOfSelectedItem]['quantity'] - 1;
				let elem = document.getElementById('product-qty' + index);
				elem.value = selectedProducts[indexOfSelectedItem]['quantity'];
				let indexOfCartItem = cartProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor));
				if (indexOfCartItem > -1) {
					cartProducts[indexOfCartItem]['quantity'] = selectedProducts[indexOfSelectedItem]['quantity'];
					cartNumber = cartNumber - 1;
				}
			} else if (selectedProducts[indexOfSelectedItem]['quantity'] === 1) {
				selectedProducts[indexOfSelectedItem]['quantity'] = selectedProducts[indexOfSelectedItem]['quantity'] - 1;
				let elem = document.getElementById('product-qty' + index);
				elem.value = selectedProducts[indexOfSelectedItem]['quantity'];
				let indexOfCartItem = cartProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor));
				if (indexOfCartItem > -1) {
					cartProducts.splice(indexOfCartItem, 1);
					cartNumber = cartNumber - 1;
				}
			}
			setSelectedProducts([...selectedProducts]);
			setCartProducts(cartProducts);
			calculateCartValue();
			setCartNumber(cartNumber);
      cartNumber == 0 ? setIsNextModalDisable(true): null
		}
		// let elem = document.getElementById('product-qty'+ index);
		// let qty = Number(elem.value);
		// qty = qty < 1 ? 0 : (qty -= 1);

		if (selectedProducts[indexOfSelectedItem]['quantity'] === 0) {
			e.target.disabled = true;
		}

		// if (qty < 1000) {
		//   document.getElementById("qty-count--add"+ index).disabled = false;
		// }
		// elem.value = qty;
	}

	async function addToCartList(e, index, item) {
		let elem = document.getElementById('product-qty' + index);
		let qty = Number(elem.value);
		let count = addedVariantCount + qty;
		elem.value = qty;
		// addedVariantIndex.map((a) => {
		//   if (a)
		// })
		addedVariantIndex.push(index)
		setAddedVariantIndex(addedVariantIndex)
		setAddedVariantCount(count)

	}

	async function removeFromCartList(e, index, item) {
		let elem = document.getElementById('product-qty' + index);
		let qty = Number(elem.value);
		let count = addedVariantCount - qty;
		elem.value = 0;
		// addedVariantIndex.map((a) => {
		//   if (a)
		// })
		// addedVariantIndex.push(index)
		let newArray = addedVariantIndex.filter(function (ele) {
			return ele != index;
		});
		setAddedVariantIndex(newArray)
		setAddedVariantCount(count)

	}
	async function setSelectedProduct(e, item, selectedExtraItem) {
		let indexOfSelectedItem = selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor);
		if (indexOfSelectedItem > -1) {
			selectedProducts[indexOfSelectedItem][selectedExtraItem] = e.target.checked;
			let indexOfCartItem = cartProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor));
			if (indexOfCartItem > -1) {
				cartProducts[indexOfCartItem][selectedExtraItem] = e.target.checked;
			}
      cartProducts['totalOnRoadPrice'] = cartProducts[indexOfCartItem]['exShowroom'] ? cartProducts[indexOfCartItem]['exShowroom']: 0;
      if (selectedExtraItem === "isOptedForAccessories") {
        cartProducts[indexOfCartItem]['totalOnRoadPrice'] = cartProducts[indexOfCartItem]['totalIndividual'] + (cartProducts[indexOfCartItem]['basicAccessoriesKit'] ?cartProducts[indexOfCartItem]['basicAccessoriesKit'] : 0);
      }
      if (selectedExtraItem === "isOptedForRsa") {
        cartProducts[indexOfCartItem]['totalOnRoadPrice'] = cartProducts[indexOfCartItem]['totalIndividual'] + (cartProducts[indexOfCartItem]['rsa'] ? cartProducts[indexOfCartItem]['rsa']: 0);
      }
      if (selectedExtraItem === "isOptedForSheildOfTrust") {
        cartProducts[indexOfCartItem]['totalOnRoadPrice'] = cartProducts[indexOfCartItem]['totalIndividual'] + (cartProducts[indexOfCartItem]['sheildOfTrust'] ? cartProducts[indexOfCartItem]['sheildOfTrust']: 0);
      }
      if (selectedExtraItem === "isOptedForExtendedWarranty") {
        cartProducts[indexOfCartItem]['totalOnRoadPrice'] = cartProducts[indexOfCartItem]['totalIndividual'] + (cartProducts[indexOfCartItem]['fourthAnd5thYearExtendedWarranty'] ? cartProducts[indexOfCartItem]['fourthAnd5thYearExtendedWarranty']: 0);
      }
			setSelectedProducts([...selectedProducts]);
			setCartProducts(cartProducts);
		} else {
			let obj = {
				productID: item.uuid,
				model: item.model,
				variant: item.variant
			};
			obj[selectedExtraItem] = e.target.checked;
			selectedProducts.push(obj);
			setSelectedProducts([...selectedProducts]);
		}
	}
	async function setSelectedProductColor(e, item, color) {
		if (selectedColor && item.uuid + "-" + color !== selectedColor) {
			let oldColorDiv = document.getElementById(selectedColor);
			if (oldColorDiv) {
				oldColorDiv.style.border = 'none';
			}
		}
		let colorDiv = document.getElementById(item.uuid + "-" + color);
		if (colorDiv && colorDiv.style.border && colorDiv.style.border === "none") {
			colorDiv.style.border = '2px dashed green';
			selectedColor = item.uuid + "-" + color;
			let stockItems = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem/count?variant=${item.variant}&color=${color.split("-").join(" ")}`);
			if (stockItems.data.COUNT) {
				setAvailableStock(stockItems.data.COUNT);
			} else {
				setAvailableStock(0);
			}
			// setSelectedColor(selectedColor);
			setSelectedDisplayColor(color)
			let indexOfSelectedItem = selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor);
			if (indexOfSelectedItem > -1) {
				selectedProducts[indexOfSelectedItem]['color'] = color.split("-").join(" ");
				// setSelectedProducts([...selectedProducts]);
			} else {
				let obj = {
					productID: item.uuid,
					model: item.model,
					variant: item.variant
				};
				obj['color'] = color.split("-").join(" ");

				selectedColor = item.uuid + "-" + color;
				// setSelectedColor(selectedColor);
				setSelectedDisplayColor(color)
				selectedProducts.push(obj);
			}
		} else if (colorDiv && colorDiv.style.border && colorDiv.style.border !== "none") {
			colorDiv.style.border = 'none';
			selectedColor = '';
			setAvailableStock(0);
		}
		setSelectedProducts([...selectedProducts]);
		setSelectedColor(selectedColor);
		// setSelectedDisplayColor('')

	}
	async function generateQuotation() {
		let quotation = await axios.put(`${CONSTANTS.API_URL}/api/v1/generateQuotation/${currentRow.interactionID}`, { selectedProducts: cartProducts });
		if (quotation.data) {
			quotationData = quotation.data;
			await setQuotationData(quotationData);
			// await toggleProformaFormPopover();
			// await DownloadProformaInvoice();
		}
	}
	async function calculateCartValue() {
		cartValue = 0;
		if (cartProducts.length && cartProducts.length > 1) {
			await Promise.all(cartProducts.map(async (product) => {
				if (product.totalCompany && product.quantity >= 1) {
					cartValue = cartValue + (product.totalCompany * product.quantity);
				}
			}));
		} else if (cartProducts.length && cartProducts.length === 1) {
			if (cartProducts[0]['quantity']) {
				cartValue = cartValue + (cartProducts[0]['totalIndividual'] * cartProducts[0]['quantity']);
			} else {
				cartValue = cartValue + cartProducts[0]['totalIndividual']
			}
		}
		setCartValue(cartValue);
	}
	async function submitFormNew(e) {
    e.preventDefault();
    // if(document.getElementById(fields.name).style.borderBottom="1px solid red")
    //   document.getElementById(fields.name).style.border= "1px solid #d1d1d1";
    // }
        delete currentRow.interaction;
        if (currentAction.name === "summary") {
          await generateQuotation();
        }
        let payload = currentRow;
        currentRow['status'] = "Completed";
        let Response = await Axios.put(`${CONSTANTS.API_URL}/api/v2/task/${currentRow.uuid}/markComplete`, payload)
        let notificationObj = {
          typeOfNotification: "push",
          message: "Task " + currentRow.displayName + " completed",
          taskID: currentRow.uuid,
          group: "task",
          isSent: true,
          isRead: false,
          sendTo: userInfo.uuid
        };

        if (Response.data.triggeredTaskList.length) {
          await setTriggeredUnassignedTaskList(Response.data.triggeredTaskList);
          await toggleOpenAssignUsersTriggeredTask();
        }
        if (Response.data.triggeredTaskListForApproval.length) {
          await setTriggeredUnassignedApprovalTaskList(Response.data.triggeredTaskListForApproval);
          await toggleOpenAssignApprovalUsersTriggeredTask();
        }
        let taskCompletionMessage = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, notificationObj);
        if (taskCompletionMessage.status === 200) {
          props.triggerNotifications(true)
        }
        await axios.post(`${CONSTANTS.API_URL}/api/v1/whatsappText`, {
          number: "9130399605",
          message: "Task " + currentRow.displayName + " completed",
        });
        toastr.success('Task ' + currentRow.displayName + " completed");
        if (Response.data.messageResponses && Response.data.messageResponses.length) {
          await Promise.all(Response.data.messageResponses.map(async (messageObj) => {
            await axios.post(`${CONSTANTS.API_URL}/api/v1/whatsappText`, {
              number: "9130399605",
              message: messageObj.message,
            });
            if (messageObj.sendTo) {
              let messageNotification = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, messageObj);
              if (messageNotification.status === 200) {
                props.triggerNotifications(true)
              }
              toastr.info(messageObj.message);
            } else {
              toastr.info(messageObj.message);
            }
          }))
        }
        await toggleFormPopover();
  }

	async function saveFormInput(e, fieldName, formType, index, propIndex) {
    e.preventDefault();
    if (fieldName.substring(0, 8) === 'adjusted') {
      let adjustedDiscount = Number(interactionObj['dynamicProperties_'+fieldName.charAt(8).toLowerCase()+fieldName.substring(9)]) - Number(e.target.value);
      let remainingDiscount = Number(interactionObj['dynamicProperties_discountToBeAdjusted']) - adjustedDiscount;
      if (remainingDiscount >= 0) {
        interactionObj['dynamicProperties_discountToBeAdjusted'] = remainingDiscount;
        currentRow['dynamicProperties_' + fieldName] = e.target.value;
        interactionObj['dynamicProperties_' + fieldName] = e.target.value;
      }
    } else {
      currentRow['dynamicProperties_' + fieldName] = e.target.value;
      interactionObj['dynamicProperties_' + fieldName] = e.target.value;
    }

    let payload = {};
    payload[fieldName] = currentRow['dynamicProperties_' + fieldName];
    // await updateTask(payload);
    let indexField = dynamicPropsWithValues.findIndex((d) => d.name === fieldName);
    if (indexField === -1) {
      dynamicPropsWithValues.push({
        name: fieldName
      });
      setDynamicPropsWithValues(dynamicPropsWithValues);
      if (dynamicProps.length) {
        progress = dynamicPropsWithValues.length / dynamicProps.length;
      } else if (actions[index] && actions[index]['dynamicProps'] && actions[index]['dynamicProps'].length) {
        progress = dynamicPropsWithValues.length / actions[index]['dynamicProps'].length;
      }
      setProgress(progress);
    }
    if (formType && formType === "select") {
      // dynamicProp.dependentEnum
      if (actions.length) {
        await Promise.all(actions[index]['dynamicProps'].map(async (prop) => {
          if (prop.dependentEnum && prop.dependentEnum.length && prop.dependentEnum[0]['nameOfProp'] === fieldName) {
            await Promise.all(prop.dependentEnum.map((dependentEnumObj) => {
              if (dependentEnumObj['valueOfProp'] === e.target.value) {
                dependentEnumObj['isSelected'] = true
              } else {
                dependentEnumObj['isSelected'] = false
              }
            }));
          }
        }));
      } else if (dynamicProps.length) {
        await Promise.all(dynamicProps.map(async (prop) => {
          console.log("++++++++++++",prop.dependentEnum);
          if (prop.dependentEnum && prop.dependentEnum.length && prop.dependentEnum[0]['nameOfProp'] === fieldName) {
            await Promise.all(prop.dependentEnum.map((dependentEnumObj) => {
              if (dependentEnumObj['valueOfProp'] === e.target.value) {
                dependentEnumObj['isSelected'] = true
              } else {
                dependentEnumObj['isSelected'] = false
              }
            }));
          }
        }));
      }

      // setActions(actions);
    }
    if (fieldName === "interestedModel") {
      currentRow['dynamicProperties_' + fieldName] = e.target.value;
      interactionObj['dynamicProperties_' + fieldName] = e.target.value;
      payload[fieldName] = currentRow['dynamicProperties_' + fieldName];
    }
    if (fieldName === "pincode" || fieldName === "companyPincode") {
      getAreaByPincode(e.target.value,fieldName);
    }
    setIsFormUpdated(true);
  }

  async function saveFormInputRadio(e, fieldName, value, index) {
    if (fieldName === "selectedScheme") {
      interactionObj["dynamicProperties_schemeDiscount"] = interactionObj["dynamicProperties_schemeDiscount"] ? interactionObj["dynamicProperties_schemeDiscount"] + schemes[index]['discountAfterGST'] : schemes[index]['discountAfterGST'];
      currentRow["dynamicProperties_schemeDiscount"] = interactionObj["dynamicProperties_schemeDiscount"] ? interactionObj["dynamicProperties_schemeDiscount"] + schemes[index]['discountAfterGST'] : schemes[index]['discountAfterGST'];
    }
    if (value) {
      currentRow['dynamicProperties_' + fieldName] = value;
      interactionObj['dynamicProperties_' + fieldName] = value;
    } else {
      currentRow['dynamicProperties_' + fieldName] = value;
      interactionObj['dynamicProperties_' + fieldName] = value;
    }
    let payload = {};
    payload[fieldName] = currentRow['dynamicProperties_' + fieldName];
    setIsFormUpdated(true);

    // await updateTask(payload);
  }

  async function saveFormInputCheckbox(e, fieldName, value) {
    if (e.target.checked && !currentRow['dynamicProperties_' + fieldName].split(",").includes(e.target.id.split("-")[1])) {
      currentRow['dynamicProperties_' + fieldName] = currentRow['dynamicProperties_' + fieldName] + ',' + e.target.id.split("-")[1];
      interactionObj['dynamicProperties_' + fieldName] = interactionObj['dynamicProperties_' + fieldName] + ',' + e.target.id.split("-")[1];
    } else if (!e.target.checked && currentRow['dynamicProperties_' + fieldName].split(",").includes(e.target.id.split("-")[1])) {
      let idx = currentRow['dynamicProperties_' + fieldName].split(",").findIndex(d => d === e.target.id.split("-")[1]);
      let tempArr = currentRow['dynamicProperties_' + fieldName].split(",");
      let deleted = tempArr.splice(idx,1);
      currentRow['dynamicProperties_' + fieldName] = tempArr.join(",");
      interactionObj['dynamicProperties_' + fieldName] = currentRow['dynamicProperties_' + fieldName];
    }
    // currentRow['dynamicProperties_' + fieldName] = e.target.value;
    let payload = {};
    payload[fieldName] = currentRow['dynamicProperties_' + fieldName];
    // await updateTask(payload);
    setIsFormUpdated(true);
  }
	async function checkAction(action, index, button) {
	 if (action.name === "exchange detail" && currentRow['dynamicProperties_typeOfBuyer'] !== "Exchange Buyer") {
		 setSelectedActionIndex(button === "back" ? selectedActionIndex - 2: selectedActionIndex + 2)
		 setCurrentAction(button === "back" ? actions[selectedActionIndex - 2]: actions[selectedActionIndex + 2])
	 }
	 if (action.displayName === "Test Drive Detail") {
		 if (selectedProducts.length > 0) {
       console.log("productssssssssssssssssssssssssssssss",selectedProducts);
			 interactionObj['dynamicProperties_modelName'] = selectedProducts[0]['model'];
			 interactionObj['dynamicProperties_variantName'] = selectedProducts[0]['variant'];
			 interactionObj['dynamicProperties_color'] = selectedProducts[0]['color'];
			 interactionObj['dynamicProperties_selectedModel'] = selectedProducts[0]['productID'];
			 currentRow['dynamicProperties_modelName'] = selectedProducts[0]['model'];
			 currentRow['dynamicProperties_variantName'] = selectedProducts[0]['variant'];
			 currentRow['dynamicProperties_color'] = selectedProducts[0]['color'];
			 currentRow['dynamicProperties_selectedModel'] = selectedProducts[0]['productID'];
			 currentRow['dynamicProperties_isOptedForAccessories'] = selectedProducts[0]['isOptedForAccessories'];
			 currentRow['dynamicProperties_isOptedForRsa'] = selectedProducts[0]['isOptedForRsa'];
			 currentRow['dynamicProperties_isOptedFor3M'] = selectedProducts[0]['isOptedFor3M'];
			 currentRow['dynamicProperties_isOptedForSheildOfTrust'] = selectedProducts[0]['isOptedForSheildOfTrust'];
			 currentRow['dynamicProperties_isOptedForExtendedWarranty'] = selectedProducts[0]['isOptedForExtendedWarranty'];
			 setIsFormUpdated(true);
		 }
	 }
 }

	async function getAreaByPincode(pincode,field) {
	 let areaList = pincodeDirectory.lookup(pincode);
	 await setAreaList(areaList);
	 await saveArea(areaList[0].officeName,field.includes("company") ? "companyArea" : "area");
 }
 async function saveArea(area,field) {
	 interactionObj['dynamicProperties_'+ field] = area
 }
 async function saveAreaFromForm(e, name) {
   console.log("nnnnnnn",name);
	 interactionObj['dynamicProperties_' + name] = e.target.value;
   currentRow['dynamicProperties_' + name] = e.target.value;
	 setIsFormUpdated(true);
 }
 // modified by Vihang
 // modified at 11 May 2022
 // modification : quoatation pdf fixes and updations


 // modified by Vihang
 // modified at 24 May 2022
 // modification : removed the margins header to fit the quotation pdf in one page

 function DownloadProformaInvoice(e, type) {
    let pdfName = "Kothari_Hyundai_Quotation" + ".pdf"
    let docDefinition = {
      pageSize: 'A4',
      pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
      pageMargins: [20, 10, 20, 10],
      watermark: { text: 'Kothari Cars Pvt. Ltd.', opacity: 0.15 },
      footer(currentPage, pageCount, page) {
        if (page > 1)
          return {
            style: "pageFooter",
            columns: [
              {
                text: [{ text: "Created by KDMS\n", width: 50 }]
              },

              { text: currentPage.toString() + " of " + pageCount, alignment: "right" }
            ]
          }
      },
      content: [{
        style: 'tableExample',
        fontSize: 9,
        table: {

          body: [
            [
              {
                image: hyundaiLogo,
                width: 80,
                rowSpan: 5,
                margin: [0, 40, 0, 0],
                border: [false, false, false, false]

              },
              {
                text: "Kothari Cars Pvt. Ltd.",
                border: [false, false, false, false],
                color: "#0c2568",
                bold: true,
                fontSize: 18,
                alignment: "center",
                margin: [0, 0, 85, 0]

              }
            ],
            [
              {},
              {
                margin: [5, 0, 0, 0],
                columns: [
                  {
                    text: "Shankarsheth Road - ",
                    width: 70,
                    bold: true,
                    fontSize: 6
                  },
                  {
                    text: " CTS No. 45/1B/A Shankarsheth Road, Next to Kumar Pacific Mall,Gultekdi,Pune 411037 Ph No : 020-24338600",
                    width: "*",
                    fontSize: 6
                  }
                ],
                border: [true, false, false, false]
              }
            ]
            ,
            [
              {},
              {
                margin: [5, 0, 0, 0],
                columns: [
                  {
                    text: "Kharadi - ",
                    width: 70,
                    fontSize: 6,
                    bold: true
                  },
                  {
                    text: " Plot No. 13/1A, Mundhwa-Kharadi Bypass, Kharadi, Pune - 411014. Sales Ph: 020-27071100, Service Ph.: 020-27071125",
                    width: "*",
                    fontSize: 6
                  }
                ],
                border: [true, false, false, false]
              }
            ],
            [
              {},
              {
                margin: [5, 0, 0, 0],
                columns: [
                  {
                    text: "Khed Shivapur - ",
                    width: 70,
                    bold: true,
                    fontSize: 6
                  },
                  {
                    text: " At Post Velu, Near Joshi Wadewale, Khed , Shivapur, Tal : Bhor Dist : Pune 412205",
                    width: "*",
                    fontSize: 6
                  }
                ],
                border: [true, false, false, false]
              }
            ], [
              {},
              {
                margin: [5, 0, 0, 0],
                columns: [
                  {
                    text: "Aundh - ",
                    width: 70,
                    fontSize: 6,
                    bold: true
                  },
                  {
                    text: " 1, Sylvan Heights, A, Opp. Hotel Seasons Apartment, Sanewadi, Aundh, Pune- 07 Ph. 020-27702770",
                    width: "*",
                    fontSize: 6
                  }
                ],
                border: [true, false, false, false]
              }
            ],
          ]
        },

      },
      {
        style: 'tableExample',
        table: {
          headerRows: 0,
          widths: ["*", "*", "*"],
          body: [
            [{ text: '', style: 'tableHeader' }, { text: '', style: 'tableHeader' }, { text: '', style: 'tableHeader' }],
            [{ text: '', alignment: "center" }, { text: 'QUOTATION', alignment: "center", fontSize: 12, bold: true }, { text: `Sr. No. :- ${quotationData.uniqueID ? quotationData.uniqueID : "KH-SSR/05-22/Q-00001"}`, fontSize: 12, bold: true, alignment: "right" }],
          ]
        },
        layout: 'noBorders'
      },
      {
        style: 'tableExample',
        fontSize: 9,
        table: {
          widths: [20, 10, 50, 10, 1, 15, "auto", 5, 70, 40, 33, "*"],

          body: [
            [
              { text: 'GST No. : 27AABCK1768P1ZZ', colSpan: 9, bold: true },
              { text: '' },
              {},
              { text: '' },
              { text: '' },
              { text: " " },
              { text: "" },
              {},
              {},
              { text: "DATE: " + formatDateTime(new Date()), colSpan: 3, bold: true },
              {},
              {}



            ],
            [
              {
                text: "Name of Customer: " + (interactionForPdf && interactionForPdf["dynamicProperties_customerName"] ? interactionForPdf["dynamicProperties_customerName"] : ""),
                colSpan: 12
              },
              {
                text: ""

              },
              {},
              {
                text: "",
              },
              {
                text: "",
              },
              {
                text: "",
              },
              {
                text: "",
              },
              {},
              {},
              {
                text: "",
              },
              {},
              {}


            ],
            [
              { text: 'Address', colSpan: 4 },
              { text: '' },
              {},
              { text: "" },
              { text: interactionForPdf && interactionForPdf && interactionForPdf["dynamicProperties_addressLine1"] && interactionForPdf["dynamicProperties_addressLine2"] && interactionForPdf["dynamicProperties_state"] && interactionForPdf["dynamicProperties_city"] && interactionForPdf["dynamicProperties_pincode"] ?  (interactionForPdf["dynamicProperties_addressLine1"] + " " + interactionForPdf["dynamicProperties_addressLine2"] + ", " +  interactionForPdf["dynamicProperties_state"] + ", " + interactionForPdf["dynamicProperties_city"] + ", " + interactionForPdf["dynamicProperties_pincode"]).charAt(0).toUpperCase() + (interactionForPdf["dynamicProperties_addressLine1"] + " " + interactionForPdf["dynamicProperties_addressLine2"] + ", " +  interactionForPdf["dynamicProperties_state"] + ", " + interactionForPdf["dynamicProperties_city"] + ", " + interactionForPdf["dynamicProperties_pincode"]).slice(1): "", colSpan: 8, bold: true },
              { text: "" },
              {},
              {},
              {},
              { text: "" },
              {},
              {}


            ],
            [
              {
                text: 'Phone No \n ( Resi /off )( Resi /off )',
                alignment: "center",
                colSpan: 4
              },
              {
                text: '-'
              },
              {},
              { text: '' },

              { text: '', colSpan: 5 },

              { text: '' },

              { text: '' },
              {},
              {},
              { text: 'Mobile :-', margin: [5, 5, 0, 0] },
              { text: contactDetails.mobile, colSpan: 2, bold: true },
              {}


            ],
            [
              { text: '', colSpan: 4 },
              { text: '' },
              {},
              {},
              { text: '', colSpan: 2 },

              { text: '' },
              { text: 'MODEL', colSpan: 4 },
              {},

              {},
              {},
              { text: quotationData && quotationData.selectedProducts[0] &&  quotationData.selectedProducts[0].model ?  quotationData.selectedProducts[0].model.charAt(0).toUpperCase() + quotationData.selectedProducts[0].model.slice(1) : "" , colSpan: 2, bold: true },
              {}

            ],
            [
              { text: '', colSpan: 6 },
              { text: '' },
              {},
              {},
              { text: '' },
              { text: '' },
              { text: 'VARIANT', colSpan: 4 },
              {},

              {},
              {},
              { text:quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].variant ?  quotationData.selectedProducts[0].variant.charAt(0).toUpperCase() + quotationData.selectedProducts[0].variant.slice(1): "", colSpan: 2, bold: true },
              {}

            ],
            [
              { text: '' },
              { text: '', colSpan: 5 },
              {},
              {},
              { text: '' },
              { text: '' },
              { text: 'COLOR', colSpan: 4 },
              {},

              {},
              {},
              { text:quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].color ?  quotationData.selectedProducts[0].color.charAt(0).toUpperCase() +  quotationData.selectedProducts[0].color.slice(1) : "", colSpan: 2, bold: true },
              {}

            ],
            [
              { text: "1", alignment: "center" },
              { text: "EX SHOWROOM", colSpan: 9 },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] &&  quotationData.selectedProducts[0].exShowroom ? quotationData.selectedProducts[0].exShowroom : ""), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}

            ],
            [
              { text: "2", alignment: "center" },
              { text: "TCS @ 1% ON EX SHOWROOM", colSpan: 9 },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].exShowroom >= 1000000 ? getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].tcsOnExShowroom) : getFormattedAmount(0), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}

            ],
            [
              { text: "3", rowSpan: 3, alignment: "center", margin: [0, 22, 0, 0] },
              { text: "INSURANCE", rowSpan: 3, colSpan: 2, alignment: "center", margin: [0, 22, 0, 0] },
              { text: '' },
              { text: "Comprehensive + ' O ' Dept", colSpan: 7 },
              { text: '' },

              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].insuranceCalculated), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}

            ],
            [
              { text: "", margin: [5, 5, 5, 5] },
              { text: "" },
              { text: "" },
              {
                text: "Additional Premium for Engine Protection (EP) &Consumable (CM)",
                colSpan: 7

              },
              { text: '' },

              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].additionalPremiumForEngineProtection), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}



            ],
            [
              { text: "" },
              { text: "" },
              { text: '' },
              {
                text: "Additional Premium for Return to Invoice( RTI)",
                colSpan: 7
              },
              { text: '' },

              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].additionalPremiumForRTI), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}


            ],
            [
              { text: "4", alignment: "center" },
              { text: "RTO TAX + REG FEE + FAST TAG FOR INDIVIDUAL", colSpan: 9 },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].rtoIndividual), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}

            ],
            [
              { text: "5", alignment: "center" },
              { text: "RTO TAX + REG FEE + FAST TAG FOR COMPANY", colSpan: 9 },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: "-", colSpan: 2 },
              {}

            ],
            //           [
            //             {text:"6",alignment:"center"},
            //             {text:"OTHER CHARGES",colSpan:9},
            //             {text:""},
            //             {text:''},
            //             {text:''},
            //             {},
            //             {},
            //             {},
            //             {},
            //             {},
            //             {text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].miscellaneousExpenses),colSpan:2,alignment:"right",bold:true, fontSize:9},
            // {}
            //
            //        ],
            [
              { text: "6", alignment: "center" },
              { text: "EXTENDED WARRANTY : (4th Yr) OR (4th + 5th Yr)", colSpan: 9 },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].fourthAnd5thYearExtendedWarranty), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}

            ],
            [
              { text: "7", alignment: "center" },
              { text: "RMK", colSpan: 9 },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].rmk), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}

            ],
            [
              { text: "8", alignment: "center" },
              { text: "RSA", colSpan: 9 },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].rsa), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}

            ],
            [
              { text: "9", alignment: "center" },
              { text: "ACCESSORIES", colSpan: 9 },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].basicAccessoriesKit), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}

            ],
            [
              { text: "10", alignment: "center" },
              { text: "SHIELD OF TRUST", colSpan: 9 },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].sheildOfTrust), colSpan: 2, alignment: "right", bold: true, fontSize: 9 },
              {}

            ],
            [
              { text: "On Road Price", colSpan: 10, margin: [100, 0, 0, 0], fillColor: "#C0C0C0" },
              { text: "" },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].totalIndividual), colSpan: 2, fillColor: "#C0C0C0", alignment: "right", bold: true, fontSize: 9 },
              {}


            ],
            [
              { text: "11", rowSpan: 2, margin: [0, 8, 0, 0], alignment: "center" },
              { text: "DISCOUNT", rowSpan: 2, margin: [0, 8, 0, 0], alignment: "center", colSpan: 2 },

              { text: '' },
              { text: "NATIONAL SCHEME", colSpan: 7 },
              { text: '' },

              {},
              {},
              {},
              {},
              {},
              { text: "NA", colSpan: 2, alignment: 'right', bold: true },
              {}


            ],
            [
              {},
              { text: "", colSpan: 2 },
              { text: "" },
              { text: "CASH DISCOUNT", colSpan: 7 },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text:"NA", colSpan: 2, alignment: 'right', bold: true },
              {}


            ],
            [
              { text: "Net On Road Price", colSpan: 10, margin: [100, 0, 0, 0], fillColor: "#C0C0C0" },
              { text: "" },
              { text: "" },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              { text: getFormattedAmount(quotationData && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].totalIndividual), colSpan: 2, fillColor: "#C0C0C0", alignment: "right", bold: true, fontSize: 9 },
              {},

            ],
            [
              {
                text: "* ONLY FOR BANK PURPOSE\n* NO VERBAL COMMUNICATION WILL BE ENTERTAINED",
                bold: true,
                colSpan: 12
              },
              { text: "", },
              { text: "" },
              { text: '' },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              {}

            ],

            [
              { text: "Mode of Purchase -", colSpan: 5, margin: [10, 3, 0, 0] },
              {},

              { text: '' },

              { text: '' },

              { text: '' },
              {
                table: {
                  widths: ["auto", 30, 10, "auto", 30, 10, "auto", 30],
                  body: [
                    [
                      {
                        text: 'In-house Finance', border: [false, false, false, false]
                      }
                      ,
                      {text: interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] === "In-house" ? "Y" : "",alignment:"center"},
                      {
                        text: "",
                        border: [false, false, false, false]

                      },
                      {
                        text: "Cash",
                        border: [false, false, false, false]

                      },
                      {text: interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] === "Cash" ? "Y" : "" ,alignment:"center"},
                      {
                        text: "",
                        border: [false, false, false, false]

                      },
                      {
                        text: 'Out-house Finance', border: [false, false, false, false]
                      },
                      {text: interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] === "Outside" ? "Y" : "",alignment:"center" },
                    ]
                  ]
                },

                colSpan: 7
              },
              {},

              {},
              {},
              {},
              {},
              {}

            ],
            [
              { text: "Bank Name", colSpan: 5, margin: [10, 0, 0, 0] },
              {},

              { text: '' },

              { text: '' },

              { text: '' },
              { text: interactionForPdf && interactionForPdf["dynamicProperties_bankName"], colSpan: 7, bold: true },
              { text: "" },
              {},
              {},
              {},
              {},
              {}

            ],
            [
              { text: "Branch Name", colSpan: 5, margin: [10, 0, 0, 0] },
              {},

              { text: '' },

              { text: '' },

              { text: '' },

              { text: interactionForPdf && interactionForPdf["dynamicProperties_bankBranch"], colSpan: 7, bold: true },
              { text: "" },
              {},
              {},
              {},
              {},
              {}

            ],
            [
              { text: "Bank Person Name", colSpan: 5, margin: [10, 0, 0, 0] },
              {},

              { text: '' },

              { text: '' },

              { text: '' },

              { text: "", colSpan: 5, bold: true },
              { text: "" },
              {},
              {},

              {},
              { text: "Number" },
              {}

            ],
            [
              { text: "Finance Person Name", colSpan: 5, margin: [10, 0, 0, 0] },
              {},

              { text: '' },

              { text: '' },

              { text: '' },

              { text: "NA", colSpan: 5, bold: true },
              {},
              {},
              {},

              {},
              { text: "Number" },
              {}

            ],
            [
              {

                margin: [10, 0, 0, 0],
                fontSize: 5,
                bold: true,
                table: {

                  body: [
                    ["Note:\n1. Payment by DD/PO to be drawn in the name of KOTHARI CARS PVT.LTD payable at Pune.\n2. Customer request not to pay any advance / part payment in cash to the consultant. Any such transactions done will be at the customer's own risk for which the company will not be responsible.\n3. The prices mentioned are  subject to change without  prior notice and will be charged as applicable  at the time of Registration / delivery.\n5. Delivery - Subject to realisation of  DD / Cheque.\n7. Subject to jurisdiction of Pune Judistion only.\n8. Two schemes cannot be clubbed together.\n9. Hyundai Motor India Ltd. reserves the right to change the booking procedure,model specifications,colour,feature and discontinue models without notice.\n10. Force majeure clause would be applicable to all deliveries.\n11.The retail schemes (If Any) given along with this price list will be applicable on the physical stock and scheme period only. \n12. Retail scheme,Price applicable will be valid only on receipt of full Ex showroom price.\n13. The Insurance premium is calculated @ 95 %of Ex Showroom Price and includes Comprehensive + 0%dep + Consumable + KP + PB + 3 Years Third Party Only if all add on  opted.)\n14. Incase of cancellation of booking Cancellation charges will be charged.\n15. Income tax Pan no and address proof in original are necessary at the time of Booking.\n16. Value of discount given shall be netted off from the vehicle invoice amount, insurance and registration.\n17. 4th& 5th year Extended warranty amount includes GST tax.\n18. Outside Maharashtra Vehicle CRTM charges of Rs 2000/ applicable.\n19. Extended Warranty  amount includes GST @ 18%.\n20. Purchase of Insurance Policy and Accessories from Dealer are optional.\n21. RTO tax 2% charged extra as per intimated by RTO department will be applied as per confirmation received by RTO department as the time registration Incase if form 20 not received within 3 days once generated from Vahan portal."]
                  ]
                },
                colSpan: 12,
                layout: "noBorders"
              },
              {},
              { text: '' },
              { text: '' },
              { text: '' },
              { text: "" },
              {},
              {},
              {},
              {},
              { text: "" },
              { text: "" }
              // {
              //
              //
              //
              //
              //                     text:[
              //                         {text:"For Kothari Cars Pvt. Ltd.\n\n\n\n\n" },
              //                         {text:"Authorised Signatory"}
              //                     ],
              //              alignment:"center",
              //              margin:[0,30,0,0],
              //              bold:true,
              //              fontSize:12,
              //                     rowSpan:3
              //
              //
              //
              // }
            ],

            [
              { text: "Name of SC.", colSpan: 3, margin: [10, 0, 0, 0], bold: true },
              {},

              { text: '' },

              { text: customerDetailsForPdf && customerDetailsForPdf.ScName, colSpan: 8, bold: true },

              { text: "" },

              { text: "" },
              { text: "" },
              {},
              {},
              {},
              {},
              {}

            ],
            [
              { text: "Con. No. -", colSpan: 3, margin: [10, 0, 0, 0], bold: true },
              {},

              { text: '' },

              { text: scDetails && scDetails.mobile ? scDetails.mobile : "", colSpan: 8 },

              { text: '' },

              { text: "" },
              { text: "" },
              {},
              {},
              {},
              {},
              {}

            ],
            [
              {
                text: `* This is a digitally generated document and does not require any signature\n* Validity of this quotation is up to ${formatDateTime(quotationData.validUpto)}`,
                bold: true,
                color: 'red',
                colSpan: 12
              },
              { text: "", },
              { text: "" },
              { text: '' },
              { text: '' },
              { text: '' },
              {},
              {},
              {},
              {},
              {},
              {}

            ]
          ]
        }
      }],
      styles: PDFSTYLE.styles,
      defaultStyle: {
        fontSize: 10
      }
    }
    if (type === 'download') {
      pdfMake.createPdf(docDefinition).open();
    } else {
      const customerDetails = {
        customerEmail: contactDetails.email,
        customerName: contactDetails.firstName,
        attachmentFor: 'Kothari Hyundai Quotation',
        attachmentName: pdfName
      };
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBase64(async data => {
        let payload = {
          attachment: data,
          customerDetails,
          quotationData
        }
        let emailAttachment = await axios.put(`${CONSTANTS.API_URL}/api/v1/sendEmailWithAttachment`, payload);
        if (emailAttachment.data === 200) {
          toastr.success('Quotation email sent sucessfully');
        }
      });
    }
    // pdfMake.createPdf(docDefinition).download(pdfName);
  }
	async function saveSelectedModel(e) {
		getVariantForSelectedModel(e.target.value);
		setSelectedModel(e.target.value);
		interactionObj['dynamicProperties_selectedModel'] = e.target.value;
		let Index = await catalogoueItemList.findIndex(d => d.uuid === e.target.value);
		if (Index > -1) {
			interactionObj['dynamicProperties_modelName'] = catalogoueItemList[Index].model;
			currentRow['dynamicProperties_modelName'] = catalogoueItemList[Index].model;
		}
		currentRow['dynamicProperties_selectedModel'] = e.target.value;
		setIsFormUpdated(true);
	}
  async function setSelectedMake(e) {
    // let listOfModels = await axios.get(`${CONSTANTS.API_URL}/api/v1/listofcarModels?manufacturer=${e.target.value}`);
    // setListOfModels(listOfModels.data);
		interactionObj['dynamicProperties_manufacturer'] = e.target.value;
		currentRow['dynamicProperties_manufacturer'] = e.target.value;
		setIsFormUpdated(true);
	}
  async function setSelectedExchangeModel(e) {
		interactionObj['dynamicProperties_exchangeCarModel'] = e.target.value;
		currentRow['dynamicProperties_exchangeCarModel'] = e.target.value;
		setIsFormUpdated(true);
	}

	async function submitFormOnStep(e) {
    e.preventDefault();
    // if(document.getElementById(fields.name).style.borderBottom="1px solid red")
    //   document.getElementById(fields.name).style.border= "1px solid #d1d1d1";
    // }
    // if (currentRow.status && currentRow.status.toLowerCase() !== "completed") {
      let field;
       Promise.all(
        actions[selectedActionIndex].dynamicProps.map((fields) => {
          if(fields.isRequired && (interactionObj["dynamicProperties_"+ fields.name] === "" || !interactionObj["dynamicProperties_"+ fields.name])) {
            console.log(fields.name, interactionObj["dynamicProperties_"+ fields.name]);
            if(!formValidation) {
                formValidation = true;
                field = fields.name;
                // if(fields.formType === "radio") {
                //
                // } else {
                // }
            } else {
              formValidation = false;
            }
            if(fields.formType === "radio") {
              // document.getElementById(fields.name).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                // document.getElementById(fields.name).classList.add("border-red-radio")
            } else {
              if (document.getElementById(fields.name)) {
                document.getElementById(fields.name).style.borderBottom = "2px solid red";
                let spanNode = document.getElementById("error-"+fields.name);
                if (spanNode) {
                  spanNode.style.display ="block";
                }
              }
            }

            // setTimeout(() => {
            //   if(fields.formType === "radio") {
            //     // document.getElementById(fields.name).classList.remove("border-red-radio")
            //   } else {
            //     document.getElementById(fields.name).style.border="1px solid rgb(118, 118, 118)";
            //   }
            // }, 1000)
          }
        })
          ).then(async() => {
            console.log("fofffffffff", formValidation);
            if(!formValidation) {
              // if (actions[selectedActionIndex+1].name === "discount adjustment") {
              //   interactionObj['dynamicProperties_discountToBeAdjusted'] = interactionObj['dynamicProperties_discountToBeAdjusted'] ? interactionObj['dynamicProperties_discountToBeAdjusted'] : interactionObj['dynamicProperties_discount']
              //   setIsFormUpdated(true);
              // }

              await setSelectedActionIndex(selectedActionIndex + 1)
              await setCurrentAction(actions[selectedActionIndex + 1])
              await checkAction(actions[selectedActionIndex + 1],selectedActionIndex, 'next' )
              if (actions[selectedActionIndex + 1].name === "summary") {
                await generateQuotation();
              }

              // modified by Vihang
              // modified at 26 May 2022
              // modification : scrolled the formmodal to the top and disabled the buttons if it has scroll else buttons are enabled
              let formModalContainerElement =  await document.getElementById("formModalContainer")
                if(formModalContainerElement.scrollHeight > formModalContainerElement.clientHeight) {
                  await formModalContainerElement.scrollTo({
                   top: 0,
                   behavior: 'smooth',
                 })
                  setTimeout(async () => {
                     await setIsScrolledToTheBottom(false);
                     await setIsNextModalDisable(true);
                     await setIsSaveModalDisable(true);
                     await setIsBackModalDisable(true);
                  }, 100)
                } else {
                     await setIsNextModalDisable(false);
                     await setIsSaveModalDisable(false);
                     await setIsBackModalDisable(false);
                }


              let payload = currentRow;
              let Response = await Axios.put(`${CONSTANTS.API_URL}/api/v2/task/${currentRow.uuid}/updateForm`, payload)
            } else {
              if (document.getElementById(field)) {
                document.getElementById(field).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
              }

            }
          }).catch((err) => console.log(err))
    // } else {
    //   setSelectedActionIndex(selectedActionIndex + 1)
    //   setCurrentAction(actions[selectedActionIndex + 1])
    //   checkAction(actions[selectedActionIndex + 1],selectedActionIndex, 'next' );
    // }


  }
	// async function submitFormNew(e) {
  //   e.preventDefault();
  //   let payload = currentRow;
  //   currentRow['status'] = "Completed";
  //   let Response = await Axios.put(`${CONSTANTS.API_URL}/api/v2/task/${currentRow.uuid}/markComplete`, payload)
  //   let notificationObj = {
  //     typeOfNotification: "push",
  //     message: "Task " + currentRow.displayName + " completed",
  //     taskID: currentRow.uuid,
  //     group: "task",
  //     isSent: true,
  //     isRead: false,
  //     sendTo: userInfo.uuid
  //   };
  //   if (Response.data.triggeredTaskList.length) {
  //     setTriggeredUnassignedTaskList(Response.data.triggeredTaskList);
  //     toggleOpenAssignUsersTriggeredTask();
  //   }
  //   let taskCompletionMessage = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, notificationObj);
  //   if (taskCompletionMessage.status === 200) {
  //     props.triggerNotifications(true)
  //   }
  //   toastr.success('Task ' + currentRow.displayName + " completed");
  //   if (Response.data.messageResponses && Response.data.messageResponses.length) {
  //     await Promise.all(Response.data.messageResponses.map(async (messageObj) => {
  //       if (messageObj.sendTo) {
  //         let messageNotification = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, messageObj);
  //         if (messageNotification.status === 200) {
  //           props.triggerNotifications(true)
  //         }
  //         toastr.info(messageObj.message);
  //       } else {
  //         toastr.info(messageObj.message);
  //       }
  //     }))
  //   }
  // }

	async function getVariantForSelectedModel(id) {
    await axios.get((`${CONSTANTS.API_URL}/api/v1/catalogue/variants?selectedCatalogueItemID=${id}`)).then((response) => {
      let variantReponse = response.data;
      const result = [];
      const map = new Map();
      // for (const item of variantReponse) {
      variantReponse.map(item => {
        let veriantColorArray = [];
        veriantColorArray.push()
        if (!map.has(item.variant)) {
          item['colors'] = [];
          let color = (item.oemColor === '$color' || !item.oemColor) ? item.color.split(' ').join('-') : item.oemColor.split(' ').join('-')
          item.colors.push(color);
          map.set(item.variant, true);    // set any value to Map
          result.push(item);
        } else {
          let idx = result.findIndex(d => d.variant === item.variant);
          let color = (item.oemColor === '$color' || !item.oemColor) ? item.color.split(' ').join('-') : item.oemColor.split(' ').join('-')
          result[idx]['colors'].push(color);
        }
      })
      setVariantList(result)
      // if (InteractionData) {
      //   console.log("+++++++++++++++++++++++++++++++++++++++=",InteractionData);
      //   if (InteractionData['dynamicProperties_selectedVariant'] && InteractionData['dynamicProperties_selectedVariant'] !== 'NA') {
      //     let selectedVariantIndex = variantReponse.findIndex(d => d.uuid === InteractionData['dynamicProperties_selectedVariant']);
      //     console.log("yesssssssssssssssssssss",selectedVariantIndex);
      //     if (selectedVariantIndex > -1 ) {
      //       let obj = {
      // 				productID: variantReponse[selectedVariantIndex].uuid,
      // 				model: variantReponse[selectedVariantIndex].model,
      // 				variant: variantReponse[selectedVariantIndex].variant,
      // 				quantity: 1,
      // 				totalIndividual: variantReponse[selectedVariantIndex].totalIndividual,
      //         exShowroom: variantReponse[selectedVariantIndex].exShowroom,
      //         basicAccessoriesKit: variantReponse[selectedVariantIndex].basicAccessoriesKit,
      //         rsa: variantReponse[selectedVariantIndex].rsa,
      //         rmk: variantReponse[selectedVariantIndex].rmk,
      //         sheildOfTrust: variantReponse[selectedVariantIndex].sheildOfTrust,
      //         fourthAnd5thYearExtendedWarranty: variantReponse[selectedVariantIndex].fourthAnd5thYearExtendedWarranty,
      //         sheildOfTrust: variantReponse[selectedVariantIndex].sheildOfTrust,
      //         fourthAnd5thYearExtendedWarranty: variantReponse[selectedVariantIndex].fourthAnd5thYearExtendedWarranty,
      // 				totalCompany: variantReponse[selectedVariantIndex].totalCompany
      // 			};
      //       selectedProducts.push({obj});
      //       console.log(obj,"oooooooooooooooooo");;
      //       setSelectedProducts(selectedProducts)
      //     }
      //   }
      // }
    })
  }

  async function getVariantDetails(id) {
    let variantReponse = await axios.get((`${CONSTANTS.API_URL}/api/v1/catalogue/variant?selectedVariantID=${id}`))
    await setSelectedVariant(variantReponse.data)
  }
	async function toggleProformaFormPopover() {
    if (!isOpenProformaFormPopover) {
      await generateQuotation();
    }
    setIsOpenProformaFormPopover(!isOpenProformaFormPopover)
  }
	function toggleOpenAssignUsersTriggeredTask() {
    setIsOpenAssignUsersTriggeredTask(!isOpenAssignUsersTriggeredTask)
  }
	function toggleOpenAssignApprovalUsersTriggeredTask() {
    setIsOpenAssignApprovalUsersTriggeredTask(!isOpenAssignApprovalUsersTriggeredTask)
  }
  function handleAssignToUserChange(e, triggeredTask) {
    let assigneToIndex = assignToUserList.findIndex(task => task.taskID === triggeredTask.taskID);
    if (assigneToIndex > -1) {
      assignToUserList[assigneToIndex].userID = e.target.value;
      setAssignToUserList(assignToUserList);
    } else {
      assignToUserList.push({
        userID: e.target.value,
        taskID: triggeredTask.taskID
      });
      setAssignToUserList(assignToUserList);
    }
  }

  async function saveAssignToUserChange(e) {
    let payload = {
      assignToUserList
    }
    let Response = await axios.put(`${CONSTANTS.API_URL}/api/v1/assignUserToTriggeredTasks`, payload);
    if (Response.data.messageResponses && Response.data.messageResponses.length) {
      await Promise.all(Response.data.messageResponses.map(async (messageObj) => {
        if (messageObj.sendTo) {
          let messageNotification = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, messageObj);
          if (messageNotification.status === 200) {
            props.triggerNotifications(true)
          }
          toastr.info(messageObj.message);
        } else {
          toastr.info(messageObj.message);
        }
      }));
      await toggleOpenAssignUsersTriggeredTask();
    }
  }

  function handleAssignApprovalToUserChange(e, triggeredTask) {
    let assigneToIndex = assignToApprovalUserList.findIndex(task => task.taskID === triggeredTask.taskID);
    if (assigneToIndex > -1) {
      assignToApprovalUserList[assigneToIndex].userID = e.target.value;
      setAssignToUserList(assignToApprovalUserList);
    } else {
      assignToApprovalUserList.push({
        userID: e.target.value,
        taskID: triggeredTask.taskID
      });
      setAssignToApprovalUserList(assignToApprovalUserList);
    }
  }

  async function saveAssignApprovalToUserChange(e) {
    let payload = {
      assignToUserList: assignToApprovalUserList
    }
    let Response = await axios.put(`${CONSTANTS.API_URL}/api/v1/assignUserToTriggeredTasks`, payload);
    if (Response.data.messageResponses && Response.data.messageResponses.length) {
      await Promise.all(Response.data.messageResponses.map(async (messageObj) => {
        if (messageObj.sendTo) {
          let messageNotification = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, messageObj);
          if (messageNotification.status === 200) {
            props.triggerNotifications(true)
          }
          toastr.info(messageObj.message);
        } else {
          toastr.info(messageObj.message);
        }
      }));
      await toggleOpenAssignApprovalUsersTriggeredTask();
    }
  }

  async function inputClicked(e) {
    let textBox = document.getElementById(e.target.id);
    if (textBox) {
      await textBox.focus();
      await textBox.select();
    }
  }
  async function getCompressedImageFile(fileToBeUploaded) {
    let imageFileToBeCompressed = fileToBeUploaded.files[0];
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 900
    };
    let compressedFile = await imageCompression(imageFileToBeCompressed, options);
    let fileData = '';
    let fileObj = {};
    if (fileToBeUploaded.files[0].size > 30000) {
      fileData = compressedFile;
      fileObj.name= compressedFile.name;
      fileObj.size= compressedFile.size;
      fileObj.type= imageFileToBeCompressed.type;
      fileObj.value= fileToBeUploaded.value;
    } else {
      fileData = imageFileToBeCompressed;
      fileObj.name= imageFileToBeCompressed.name;
      fileObj.size= imageFileToBeCompressed.size;
      fileObj.type= imageFileToBeCompressed.type;
      fileObj.value= fileToBeUploaded.value;
    }
    return Promise.resolve(fileData);
  }
  async function uploadFile(e, fieldName) {

    console.log(e.target.files,"fileeeeeeee");
    const file = {
      name: e.target.files[0].name,
      size: e.target.files[0].size,
      type: e.target.files[0].type,
      value: e.target.files[0].name,
    };
    let payload = {
      file,
      interactionID: interactionObj.uuid
    }
      let fileDetails
      await Axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payload).then(async res => {
        if (res && res.data) {
          fileDetails = res.data;
          try {
            //  Save File on S3
            const opts = {
              headers: {
                name: 'Content-Type',
                value: 'multipart/form-data',
              }
            };
            let fileData = await getCompressedImageFile(e.target);
            const fileUpload = await Axios.put(fileDetails.signedURL, fileData, opts);

            currentRow['dynamicProperties_'+fieldName] = fileDetails.uuid;
            interactionObj['dynamicProperties_'+fieldName] = fileDetails.uuid;
            await setIsFormUpdated(!isFormUpdated);

          } catch (e) {
            console.error(e);
          }
        }
      });
  }

  async function deleteUploadedFile(e, fieldName) {
    console.log("interactionObjinteractionObj",interactionObj);
    let payload = {
      interactionID: interactionObj.uuid,
      fieldName
    };
    // let DeletedInteractionObj = await axios.put(`${CONSTANTS.API_URL}/api/v1/interaction/removeField/${interactionObj['uuid']}`, payload);
    interactionObj['dynamicProperties_'+fieldName] = '';
    currentRow['dynamicProperties_'+fieldName] = '';
    // let Response = await axios.put(`${CONSTANTS.API_URL}/api/v1/file/remove/${interactionObj['dynamicProperties_'+fieldName]}`, payload);
    setIsFormUpdated(!isFormUpdated);
  }
  async function uploadPackageImage(e,type) {
    uploadImgArray.push(e.target.files);
    await setUploadImgArry(uploadImgArray)
    await preview_image(e,type)
  }
  async function getImageSignedUrl(name,interactionObj, currentRow) {
    console.log("nnnnnnnnnnnn",currentRow['dynamicProperties_'+name]);
    if ((typeof currentRow['dynamicProperties_'+name] === "object" && currentRow['dynamicProperties_'+name].length) || (typeof currentRow['dynamicProperties_'+name] === "string" && currentRow['dynamicProperties_'+name])) {
      let file = await axios.get(`${CONSTANTS.API_URL}/api/v1/file/getFileFromS3?courierID=${interactionObj.uuid}&fileID=${currentRow['dynamicProperties_'+name]}&s3KeyFor=case`)
      console.log(file,"ffffffffffff");
      if (file.data[0]) {
        return file.data[0].signedUrl;
      } else {
        return null;
      }
    }

  }
  async function preview_image(event,type) {
    // if (type === 'packagePhoto') {
      for (let i = 0; i < event.target.files.length; i++) {
        let reader = new FileReader();
        let outer_perview_div
        if(type==='handOverPhoto') {
          outer_perview_div = document.getElementById('uploadHandoverPhotoPreview')
        }else{
          outer_perview_div = document.getElementById('uploadPackagePhotoPreview')
        }
        let inside_perview_div = document.createElement('div');
        let crossTip_span = document.createElement('span');
        let output = document.createElement('img');
        inside_perview_div.setAttribute('class', 'courierImg')
        inside_perview_div.setAttribute('id', `uploadImg${event.target.files[i].name}`)
        crossTip_span.setAttribute('class', 'crossTip')
        crossTip_span.innerHTML = '×'
        crossTip_span.setAttribute('id', `${event.target.files[i].name}`)
        crossTip_span.addEventListener('click', async (e) => removeImg(e))
        output.setAttribute('class', 'w-80 h-80  m-all border-black  min-h-80 min-w-100')
        inside_perview_div.append(output)
        inside_perview_div.append(crossTip_span)
        outer_perview_div.append(inside_perview_div)
        reader.onload = function () {
          output.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    // }
  }
  async function getUsersList() {
    let responseAllUser = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?userName=${props.currentRow.whomTo}`);
    await setAllUserList(responseAllUser.data)
  }
  function removeImg(e) {
   let removeIndex
   let remainingImg = uploadImgArray.filter(async (img, index) => {
     if (img[0].name === e.target.id) {
       removeIndex = index
     }
   })
   if (removeIndex || removeIndex === 0) {
     uploadImgArray.splice(removeIndex, 1)
      setUploadImgArry(uploadImgArray)
     document.getElementById(`uploadImg${e.target.id}`).remove()
   } else {
     return
   }

 }
 function viewAllImages(e,id, index) {
   // modified by Vihang
   // modified at 2 May 2022
   // modification : increased the z index to view the image above the modal

   // modified by Vihang
   // modified at 16/05/2022
   // modification : remove rotate and flip options from image viewer

   let options = {
    zIndex:99999,
    rotatable:false,
    scalable:false
   }
   const gallery = new Viewer(document.getElementById(`image-${index}-${id}`),options);
   gallery.show();
 }
 async function assignRepairRequestTask() {
   let payload = {
     assignedUserID: selectedUser ? selectedUser : selectedLobbyHostes,
     ccmRemarks,
     assignToType
   };
   let responseMessage = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateRepairRequestTask/${currentRow.uuid}`, payload);
   if (responseMessage.data.length) {
     console.log("responseMessageresponseMessage",responseMessage.data);
     await props.triggerNotifications(true)
     await toastr.success(responseMessage.data[0]['message']);
     setRepairRequestFormOpen(!isRepairRequestFormOpen);
   }
 }


 //Modified by Vihang
 //Modified at: 27/04/2022
 //modification: Customer Follow up pdf created

   function DownloadCustomerFollowUp() {
      let pdfName = "CustomerFollowUp" + ".pdf"
      let docDefinition = {
        pageSize: 'A4',
        pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
        pageMargins: [20, 10, 20, 10],
        content: [
            {
              alignment: 'center',
              columns: [
                {
                  image: hyundaiLogo,
                  width: 120,
                  height: 40,
                },
                {
                  text:"KOTHARI CARS PVT. LTD.",
                  bold:true,
                  color:"#0c2568",
                  alignment:"center",
                  fontSize:18,
                  margin:[0,10,0,0]
                },
                {
                  image:hyundaiX,
                  width: 120,
                  height: 40,
                }
              ]
        },
        {
          text:"Customer Follow-up Details",
          fontSize:14,
          alignment:"center",
          margin:[0,10,0,0]
        },
        {
          style: 'tableExample',
          margin:[0,20,0,0],
          table: {
            widths:["auto"],
            body: [
              [{text:'Sales Consultant Followup',style:"tableHeaderTag",
              border:[true,true,true,false]}]
            ]
          }
        },
        {
          style: 'tableExample',
          layout:{
            paddingLeft: function (i, node) { return 0; },
            paddingBottom: function (i, node) { return 0; }

          },
          table: {
            widths:["*"],
            body: [
              [{
                border:[true,true,true,false],
                layout: {
                  paddingBottom: function (i, node) { return 0; },
                  paddingTop: function (i, node) { return 0; },
                  hLineStyle: function () {
           					return {dash: {length: 2, space: 2}};
           				}
                },
                table: {
                  headerRows: 1,
                  widths:["auto",5,"auto",5,"auto",5,"auto",5,"auto"],
                  body: [
                    [{text: 'S. No.',border:[false,false,false,false],margin:[0,10,0,5]},{text:"",border:[false,false,false,false], margin:[0,10,0,5]},{text: 'Date of Followup',border:[false,false,false,false],margin:[0,10,0,5]},{text:"",border:[false,false,false,false],margin:[0,10,0,5]}, {text: "Customer's Comments (VOC)",border:[false,false,false,false],margin:[0,10,0,5]},{text:"",border:[false,false,false,false],margin:[0,10,0,5]},{text: "Tentative Date of Purchase",border:[false,false,false,false],margin:[0,10,0,5]},{text:"",border:[false,false,false,false],margin:[0,10,0,5]},{text: "Next Follow Up Date",border:[false,false,false,false],margin:[0,10,0,5]}],
                    [{text: '1',border:[false,false,false,false],alignment:"center"},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                    [{text:'2',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                    [{text:'3',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                    [{text:'4',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                    [{text:'5',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                   [{text:'6',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                   [{text:'7',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                   [{text:'8',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                   [{text:'9',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                   [{text:'10',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]}],
                     [{text:'',border:[false,false,false,false],alignment:"center",margin:[0,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,false]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,false]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,false]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,false]}],
                  ]
                },
              }],
              [
              {
                border:[true,false,true,true],
                style: 'tableExample',
                table: {
                  widths:["auto"],
                  body: [
                    [{text:'Team Leader/SM Followup',style:"tableHeaderTag",
                    border:[false,true,true,false]}]
                  ]
                }
              },
            ]
            ]
          },
        },
       {
          layout:{
            paddingLeft: function (i, node) { return 0; },
            paddingBottom: function (i, node) { return 0; }
          },
        table: {
          widths:["*"],
          body: [
            [{
              border:[true,true,true,false],
              margin:[0,20,10,10],
              table: {
                headerRows: 1,
                widths:[23,5,80,5,130,5,115,5,90],
                body: [
                  [{text: '1',border:[false,false,false,false],alignment:"center",margin:[6,0,0,0]},{text:"",border:[false,false,false,false],margin:[10,0,0,0]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true],margin:[0,0,5,0]}],
                  [{text:'2',border:[false,false,false,false],alignment:"center",margin:[6,10,0,0]},{text:"",border:[false,false,false,false],margin:[10,0,0,0]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true],margin:[0,0,5,0]}],
                  [{text:'3',border:[false,false,false,false],alignment:"center",margin:[6,10,0,0]},{text:"",border:[false,false,false,false],margin:[10,0,0,0]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true],margin:[0,0,5,0]}],
                  [{text:'4',border:[false,false,false,false],alignment:"center",margin:[6,10,0,0]},{text:"",border:[false,false,false,false],margin:[10,0,0,0]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true],margin:[0,0,5,0]}],
                  [{text:'5',border:[false,false,false,false],alignment:"center",margin:[6,10,0,0]},{text:"",border:[false,false,false,false],margin:[10,0,0,0]},{text: '',border:[false,false,false,true]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,true],margin:[0,0,5,0]}],
                    [{text:'',border:[false,false,false,false],alignment:"center",margin:[6,10,0,0]},{text:"",border:[false,false,false,false]},{text: '',border:[false,false,false,false]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,false]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,false]},{text:"",border:[false,false,false,false]},{text: "",border:[false,false,false,false],margin:[0,0,5,0]}],
                ]
              },
              layout: {
                hLineStyle: function () {
                  return {dash: {length: 2, space: 2}};
                },
                paddingBottom: function (i, node) { return 0; },
                paddingTop: function (i, node) { return 0; }
              }
            }],
            [
            {
              border:[true,false,true,true],
              style: 'tableExample',
              table: {
                widths:["auto"],
                body: [
                  [{text:'Lost Case Analysis',style:"tableHeaderTag",
                  border:[false,true,true,false]}]
                ]
              }
            },
          ]
          ]
        }
      },
      {
         layout:{
           paddingLeft: function (i, node) { return 0; },
           paddingBottom: function (i, node) { return 0; }
         },
       table: {
         widths:["*"],
         body: [
           [{
             border:[true,true,true,false],
             margin:[10,20,10,20],
             layout:{
               paddingLeft: function (i, node) { return 0; },
               paddingBottom: function (i, node) { return 0; }
             },
             table: {
               headerRows: 1,
               widths:[20,"*",10,20,"*",10,20,"*"],
               body: [
                   [
                     {text: ''},
                     {text:"Lost to Co-dealer",border:[false,false,false,false],margin:[10,0,0,0]},
                     {text: '',border:[false,false,false,false]},
                     {text: ''},
                     {text:"Lost to Competition",border:[false,false,false,false],margin:[10,0,0,0]},
                     {text: '',border:[false,false,false,false]},
                     {text: ""},
                     {text:"Deferred Enquiry",border:[false,false,false,false],margin:[10,0,0,0]}
                   ],
                   [
                     {text:"Dealer",border:[false,false,false,false],margin:[0,10,0,0],colSpan:2},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                     {text:"Dealer",border:[false,false,false,false],margin:[0,10,0,0],colSpan:2},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                     {text:"Dealer",border:[false,false,false,false],margin:[0,10,0,0],colSpan:2},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]}
                 ],
                 [
                   {text:"",margin:[0,0,0,10],border:[true,true,false,true]},
                   {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                   {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                   {text:"",margin:[0,0,0,10],border:[true,true,false,true]},
                   {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                   {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                   {text:"",margin:[0,0,0,10],border:[true,true,false,true]},
                   {text:"",margin:[0,0,0,10],border:[false,true,true,true]}
                 ],
                 [
                   {text:"Model",border:[false,false,false,false],margin:[0,10,0,0],colSpan:2},
                   {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                   {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                   {text:"Model",border:[false,false,false,false],margin:[0,10,0,0],colSpan:2},
                   {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                   {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                   {text:"Model",border:[false,false,false,false],margin:[0,10,0,0],colSpan:2},
                   {text:"",border:[false,false,false,false],margin:[0,10,0,10]}
                 ],
                   [
                     {text:"",margin:[0,0,0,10],border:[true,true,false,true]},
                     {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                     {text:"",margin:[0,0,0,10],border:[true,true,false,true]},
                     {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                     {text:"",margin:[0,0,0,10],border:[true,true,false,true]},
                     {text:"",margin:[0,0,0,10],border:[false,true,true,true]}
                   ],[
                     {text:"Reason",border:[false,false,false,false],margin:[0,10,0,0],colSpan:2},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                     {text:"Reason",border:[false,false,false,false],margin:[0,10,0,0],colSpan:2},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]},
                     {text:"Reason",border:[false,false,false,false],margin:[0,10,0,0],colSpan:2},
                     {text:"",border:[false,false,false,false],margin:[0,10,0,10]}
                 ],
                 [
                   {text:"",margin:[0,0,0,10],border:[true,true,false,true]},
                   {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                   {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                   {text:"",margin:[0,0,0,10],border:[true,true,false,true]},
                   {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                   {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                   {text:"",margin:[0,0,0,10],border:[true,true,false,true]},
                   {text:"",margin:[0,0,0,10],border:[false,true,true,true]}
                 ]
               ]
             }
           }],
           [
           {
             border:[true,false,true,true],
             style: 'tableExample',
             table: {
               widths:["auto"],
               body: [
                 [{text:'Signatures',style:"tableHeaderTag",
                 border:[false,true,true,false]}]
               ]
             }
           },
         ]
         ]
       }
     },
     {
      table: {
        widths:["*"],
        body: [
          [{
            margin:[0,20,10,0],
            border:[true,true,true,false],
            layout: {
              hLineStyle: function () {
                 return {dash: {length: 2, space: 2}};
               },
               paddingBottom: function (i, node) { return 0; },
               paddingTop: function (i, node) { return 0; }
            },
            table: {
              headerRows: 1,
              widths:["auto","*","auto","*","auto","*"],
              body: [
                [{text:"",border:[false,false,false,false],margin:[0,20,0,0]}, {text: "",border:[false,false,false,false],margin:[0,20,0,0]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,false],margin:[0,20,0,0]},{text:"",border:[false,false,false,false]}, {text: "",border:[false,false,false,false],margin:[0,20,0,0]}],
                [{text:"Sales Consultant",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"Team Leader/Sales Manager",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]},{text:"Sales Head",border:[false,false,false,false]}, {text: "",border:[false,false,false,true]}]
              ]
            }
          }],
            [{text:"",border:[true,false,true,true]}]
        ]
      }
       }
      ],
        styles: PDFSTYLE.styles,
        defaultStyle: {
          fontSize: 10
        }
      }
        pdfMake.createPdf(docDefinition).open();

      // pdfMake.createPdf(docDefinition).download(pdfName);
    }
    // modified by Vihang
    // modified at 28/04/2022
    // modification : enquiry pdf data binding
    // modified by Vihang
    // modified at 24/05/2022
    // modification : fixed the spaces between the tables in enquiry pdf
    function DownloadEnquiryForm() {
       let pdfName = "customerEnquiry" + ".pdf"
       let docDefinition = {
         pageSize: 'A4',
         pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
         pageMargins: [20, 10, 20, 20],
         footer(currentPage, pageCount, page) {
             return {
               style: "pageFooter",
               columns: [
                 {
                   text: [{ text: `Generated by ${userInfo && userInfo.displayName ? userInfo.displayName : ""}, ${userInfo && userInfo.userBranchName ? userInfo.userBranchName : ""} , ${moment(new Date()).format("DD/MM/YYYY, h:mm a")},  ${currentRow && currentRow.caseID ? currentRow.caseID : ""}, NDMS ID \n`,width:"*" ,alignment:"left"}]
                 },

                 { text: currentPage.toString() + " of " + pageCount, alignment: "right" ,width:50}
               ]
             }
         },
         content: [
           {
             alignment: 'center',
             columns: [
               {
                 image: hyundaiLogo,
                 width: 120,
                 height: 40,
               },
               {
                 text:"KOTHARI CARS PVT. LTD.",
                 bold:true,
                 color:"#0c2568",
                 alignment:"center",
                 fontSize:18,
                 margin:[0,10,0,0]
               },
               {
                 image:hyundaiX,
                 width: 120,
                 height: 40,
               }
             ]
       },
       {
         text:"New Car Enquiry Form",
         fontSize:14,
         alignment:"center",
         margin:[0,5,0,0]
       },
         {
           margin:[0,5,0,-5],
           style: 'tableExample',
           layout:{
             paddingLeft: function (i, node) { return 0; },
             paddingBottom: function (i, node) { return 0; }

           },
           fontSize:7,
           table: {
             widths:["*"],
             body: [
               [{
                 border:[true,true,true,false],
                 margin:[10,0,10,0],
                 table: {
                   headerRows: 1,
                   widths:["auto","*",5,150,"*",5,"auto","*"],
                   heights:[10,10,10,10,10,10,10,10],
                   body: [
                       [
                         {text:"Customer ID",border:[false,false,false,false],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"SC Name",border:[false,false,false,false],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"Date Of Enquiry",border:[false,false,false,false],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                     ],
                     [
                       {text:"",margin:[5,0,0,0],border:[true,true,false,true],fontSize:8,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,0],border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:customerDetailsForPdf && customerDetailsForPdf.ScName ? customerDetailsForPdf.ScName.charAt(0).toUpperCase() + customerDetailsForPdf.ScName.slice(1) : "",margin:[5,0,0,0],border:[true,true,false,true],fontSize:8,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,0],border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:customerDetailsForPdf && customerDetailsForPdf.dateOfEnquiry ? customerDetailsForPdf.dateOfEnquiry : "",margin:[5,0,0,0],border:[true,true,false,true],fontSize:8,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,10],border:[false,true,true,true]}
                     ],

                   ]
                 }
               }],
               [
               {
                 border:[true,false,true,false],
                 style: 'tableExample',
                 layout: {
                  paddingLeft: function (i, node) { return 0; },
                  paddingRight: function (i, node) { return 0; },
                  paddingTop: function (i, node) { return 0; },
                  paddingBottom: function (i, node) { return 0; },
                },
                margin:[0,0,0,-2],
                 table: {
                   widths:["auto",20],
                   heights:[20,20],
                   body: [
                     [{text:'Customer Details',style:"tableHeaderTag",
                     border:[false,true,false,false],margin:[5,5,0,0]},{
                       svg: `<svg viewBox="0 0 100 100" fill="#696969" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><polygon points="0 0, 100 100, 0 100"/></svg>`,
                       border:[false,false,false,false]
                     }]
                   ]
                 }
               },
             ]
             ]
           }
         },
         {
           style: 'tableExample',
           layout:{
             paddingLeft: function (i, node) { return 0; },
             paddingBottom: function (i, node) { return 0; }
           },
           fontSize:7,
           table: {
             widths:["*"],
             body: [
               [{
                 border:[true,true,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 table: {
                   headerRows: 1,
                   widths:[150,"*",5,"auto","*",5,"auto","*"],
                   heights:[10,10,10,10,10,10,10,10],
                   body: [
                       [
                         {text:"Name",border:[false,false,false,false],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"Mobile No.",border:[false,false,false,false],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"Alternate Mobile No.",border:[false,false,false,false],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                     ],
                     [
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_customerName"] )? interactionForPdf["dynamicProperties_customerName"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_customerName"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                       {text:"",border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false]},
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_mobile"] )? interactionForPdf["dynamicProperties_mobile"] : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                       {text:"",border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false]},
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_alternateMobile"] )? interactionForPdf["dynamicProperties_alternateMobile"] : "",margin:[5,0,0,0],border:[true,true,false,true],fontSize:8,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,10],border:[false,true,true,true]}
                     ],

                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 table: {
                   headerRows: 1,
                   widths:["auto","*"],
                   heights:[10,10],
                   body: [
                       [
                         {text:"Residential",border:[false,false,false,false]},
                         {text:(interactionForPdf && interactionForPdf["dynamicProperties_addressLine1"] )? interactionForPdf["dynamicProperties_addressLine1"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_addressLine1"].slice(1) : "",margin:[5,0,0,0],color:"#153ca4",bold:true,fontSize:8},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 table: {
                   headerRows: 1,
                   widths:[35,"*"],
                   heights:[10,10],
                   body: [
                       [
                         {text:"Address",border:[false,false,false,false]},
                         {text:(interactionForPdf && interactionForPdf["dynamicProperties_addressLine2"] )? interactionForPdf["dynamicProperties_addressLine2"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_addressLine2"].slice(1): "",margin:[5,0,0,0],color:"#153ca4",bold:true,fontSize:8},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 table: {
                   headerRows: 1,
                   widths:["auto","*",5,"auto","*",5,"auto","*",5,100,"*"],
                   heights:[10,10,10,10,10,10,10,10,10,100,10],
                   body: [
                       [
                         {text:"City",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"State",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"Pin Code",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"Email",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                     ],
                     [
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_city"] )? interactionForPdf["dynamicProperties_city"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_city"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_state"] )? interactionForPdf["dynamicProperties_state"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_state"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_pincode"] )? interactionForPdf["dynamicProperties_pincode"] : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_email"] )? interactionForPdf["dynamicProperties_email"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_email"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,10],border:[false,true,true,true]}
                     ],

                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 table: {
                   headerRows: 1,
                   widths:[35,"*",5,155,"*",5,"auto","*",5,"*","*"],
                   heights:[10,10,10,10,10,10,10,10,10,10,10],
                   body: [
                       [
                         {text:"Occupation",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"Company Name",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"City",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                     ],
                     [
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_occupation"] )? interactionForPdf["dynamicProperties_occupation"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_occupation"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],fontSize:8,colSpan:2,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_companyName"] )? interactionForPdf["dynamicProperties_companyName"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_companyName"].slice(1)  : "",margin:[5,0,0,0],border:[true,true,true,true],fontSize:8,colSpan:2,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:(interactionForPdf && interactionForPdf["dynamicProperties_city"] )? interactionForPdf["dynamicProperties_city"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_city"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],fontSize:8,colSpan:2,color:"#153ca4",bold:true},
                       {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",margin:[0,0,0,10],border:[false,false,false,false]},
                       {text:"",margin:[0,0,0,10],border:[false,false,false,false]}
                     ],

                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 table: {
                   widths:["auto","*"],
                   heights:[10,10],
                   body: [
                       [
                         {text:"Office Address",border:[false,false,false,false]},
                         {text:(interactionForPdf && interactionForPdf["dynamicProperties_companyAddress"] )? interactionForPdf["dynamicProperties_companyAddress"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_companyAddress"].slice(1) : "",margin:[5,0,0,0],color:"#153ca4",bold:true,fontSize:8},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 table: {
                   headerRows: 1,
                   widths:["auto","*",5,"auto","*",5,"auto","*",5,100,"*"],
                   heights:[10,10,10,10,10,10,10,10,10,10,10],
                   body: [
                       [
                         {text:"Age",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"Gender",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"Type Of Enquiry",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                         {text:" Official Email",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                         {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                     ],
                     [
                       {text:interactionForPdf && interactionForPdf["dynamicProperties_age"] ? interactionForPdf["dynamicProperties_age"] : "",margin:[5,0,0,0],border:[true,true,false,true],fontSize:8,color:"#153ca4",bold:true},
                       {text:"",border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false]},
                       {text:interactionForPdf && interactionForPdf["dynamicProperties_gender"] ? interactionForPdf["dynamicProperties_gender"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_gender"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                       {text:"",border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false]},
                       {text:interactionForPdf && interactionForPdf["dynamicProperties_typeOfEnquiry"] ? interactionForPdf["dynamicProperties_typeOfEnquiry"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_typeOfEnquiry"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                       {text:"",border:[false,true,true,true]},
                       {text:"",border:[false,false,false,false]},
                       {text:interactionForPdf && interactionForPdf["dynamicProperties_officeEmail"] ? interactionForPdf["dynamicProperties_officeEmail"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_officeEmail"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                       {text:"",border:[false,true,true,true]}
                     ],

                   ]
                 }
               }],
               [
                 {
                   border:[true,false,true,true],
                   style: 'tableExample',
                   layout: {
                    paddingLeft: function (i, node) { return 0; },
                    paddingRight: function (i, node) { return 0; },
                    paddingTop: function (i, node) { return 0; },
                    paddingBottom: function (i, node) { return 0; },
                  },
                  margin:[0,0,0,-1],
                   table: {
                     widths:["auto",20],
                     heights:[20,20],
                     body: [
                       [{text:'Needs Assessment',style:"tableHeaderTag",
                       border:[false,true,false,false],margin:[5,5,0,0]},{
                         svg: `<svg viewBox="0 0 100 100" fill="#696969" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><polygon points="0 0, 100 100, 0 100"/></svg>`,
                         border:[false,false,false,false]
                       }]
                     ]
                   }
                 },
             ],

             ]
           }
         },
         {
           style: 'tableExample',
           layout:{
             paddingLeft: function (i, node) { return 0; },
             paddingBottom: function (i, node) { return 0; }
           },
           margin:[0,-15,0,0],
           fontSize:7,
           table: {
             widths:["*"],
             body: [
               [{
                 border:[true,false,true,false],
                 margin:[10,5,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[5,160,10,60,5,10,75,5,10,"auto"],
                   body: [
                       [
                         {text:"1",border:[false,false,false,false]},
                         {text:"Please Choose one option",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_typeOfBuyer"] && interactionForPdf["dynamicProperties_typeOfBuyer"] === "First Time Buyer"  ? "Y" : "",margin:[5,0,0,0],border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true,alignment:"center"},
                         {text:"First Time Buyer",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_typeOfBuyer"] && interactionForPdf["dynamicProperties_typeOfBuyer"] === "Exchange Buyer"  ? "Y" : "",margin:[5,0,0,0],border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true,alignment:"center"},
                         {text:"Exchange Buyer",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_typeOfBuyer"] && interactionForPdf["dynamicProperties_typeOfBuyer"] === "Additional Buyer"  ? "Y" : "",margin:[5,0,0,0],border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true,alignment:"center"},
                         {text:"Additional Car Buyer",border:[false,false,false,false],margin:[5,0,0,0]},

                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[5,160,10,60,5,10,75,5,10,60,5,10,"auto"],
                   body: [
                       [
                         {text:"2",border:[false,false,false,false]},
                         {text:"How many kilometers you drive in a month?",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_kmsInaMonth"] && interactionForPdf["dynamicProperties_kmsInaMonth"] === "500 to 1000"  ? "Y" : "",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true,alignment:"center"},
                         {text:"500 to 1000",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_kmsInaMonth"] && interactionForPdf["dynamicProperties_kmsInaMonth"] === "1000 to 1500"  ? "Y" : "",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true,alignment:"center"},
                         {text:"1000 to 1500",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_kmsInaMonth"] && interactionForPdf["dynamicProperties_kmsInaMonth"] === "1500 to 2000"  ? "Y" : "",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true,alignment:"center"},
                         {text:"1500 to 2000",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_kmsInaMonth"] && interactionForPdf["dynamicProperties_kmsInaMonth"] === "> 2000"  ? "Y" : "",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true,alignment:"center"},
                         {text:"> 2000",border:[false,false,false,false],margin:[5,0,0,0]},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[5,160,10,60,5,10,75,5,10,60,5,10,"auto"],
                   body: [
                       [
                         {text:"3",border:[false,false,false,false]},
                         {text:"How many members are there in your family?",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_familySize"] && interactionForPdf["dynamicProperties_familySize"] === "2"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"2",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_familySize"] && interactionForPdf["dynamicProperties_familySize"] === "3 to 5"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"3 to 5",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_familySize"] && interactionForPdf["dynamicProperties_familySize"] === "6 to 7"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"6 to 7",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_familySize"] && interactionForPdf["dynamicProperties_familySize"] === "More than 7"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"More than 7",border:[false,false,false,false],margin:[5,0,0,0]},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[5,160,10,60,5,10,75,5,10,60,5,10,"auto"],
                   body: [
                       [
                         {text:"4",border:[false,false,false,false]},
                         {text:"What is your top most expectation from the car?",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_expectations"] && interactionForPdf["dynamicProperties_expectations"].split(',').includes("Features") ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"Features",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_expectations"] && interactionForPdf["dynamicProperties_expectations"].split(',').includes("Looks") ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"Looks",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_expectations"] && interactionForPdf["dynamicProperties_expectations"].split(',').includes("Performance") ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"Performace",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_expectations"] && interactionForPdf["dynamicProperties_expectations"].split(',').includes("Value For Money") ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"Value For Money",border:[false,false,false,false],margin:[5,0,0,0]},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[5,160,10,60,5,10,75,5,10,"auto"],
                   body: [
                       [
                         {text:"5",border:[false,false,false,false]},
                         {text:"By when are expecting to finalize your new car?",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_typeOfEnquiry"] && interactionForPdf["dynamicProperties_typeOfEnquiry"] === "Hot"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"<= 15 Days (Hot)",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_typeOfEnquiry"] && interactionForPdf["dynamicProperties_typeOfEnquiry"] === "Warm"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"16 to 30 Days(Warm)",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_typeOfEnquiry"] && interactionForPdf["dynamicProperties_typeOfEnquiry"] === "Cold"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"> 30 Days (Cold)",border:[false,false,false,false],margin:[5,0,0,0]}
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[5,160,10,60,5,10,75,5,10,60,5,10,"auto"],
                   body: [
                       [
                         {text:"6",border:[false,false,false,false]},
                         {text:"What will be your mode of purchase?",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] && interactionForPdf["dynamicProperties_modeOfPurchase"] === "Cash"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"Cash",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] && interactionForPdf["dynamicProperties_modeOfPurchase"] === "Finance"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"Finance",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] && interactionForPdf["dynamicProperties_modeOfPurchase"] === "Self Arranged Finance"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"Self Arranged Finance",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] && interactionForPdf["dynamicProperties_modeOfPurchase"] === "Company Finance"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"Company Finance",border:[false,false,false,false],margin:[5,0,0,0]},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[5,160,10,60,5,10,75,5,10,60,5,10,"auto"],
                   body: [
                       [
                         {text:"7",border:[false,false,false,false]},
                         {text:"What is your appropriate household income(INR)?",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_annualHouseholdIncome"] && interactionForPdf["dynamicProperties_annualHouseholdIncome"] === "< 2.5 Lacs"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"< 2.5 lacs",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_annualHouseholdIncome"] && interactionForPdf["dynamicProperties_annualHouseholdIncome"] === "2.5 Lacs to 5 Lacs"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"2.5 lacs to 5 lacs",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_annualHouseholdIncome"] && interactionForPdf["dynamicProperties_annualHouseholdIncome"] === "5 Lacs to 10 Lacs"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"5 lacs to 10 lacs",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_annualHouseholdIncome"] && interactionForPdf["dynamicProperties_annualHouseholdIncome"] === "< 10 Lacs"  ? "Y" : "",alignment:"center",border:[true,true,true,true],fontSize:8,color:"#153ca4",bold:true},
                         {text:"< 10 lacs",border:[false,false,false,false],margin:[5,0,0,0]},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 table: {
                   headerRows: 1,
                   widths:["auto","auto","*"],
                   heights:[10,10,10],
                   body: [
                       [
                         {text:"8",border:[false,false,false,false]},
                         {text:"Which Model are you interested in?",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_interestedModel"] ? interactionForPdf["dynamicProperties_interestedModel"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_interestedModel"].slice(1)  : "",margin:[5,0,0,0],fontSize:8,color:"#153ca4",bold:true},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 table: {
                   headerRows: 1,
                   widths:["auto","auto","*"],
                   heights:[10,10,10],
                   body: [
                       [
                         {text:"9",border:[false,false,false,false]},
                         {text:"Which Other Cars are you considering?",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_otherCars"] ? interactionForPdf["dynamicProperties_otherCars"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_otherCars"].slice(1) : "",margin:[5,0,0,0],fontSize:8,color:"#153ca4",bold:true},
                     ],
                   ]
                 }
               }],

               [
                 {
                   border:[true,false,true,true],
                   style: 'tableExample',
                   layout: {
                    paddingLeft: function (i, node) { return 0; },
                    paddingRight: function (i, node) { return 0; },
                    paddingTop: function (i, node) { return 0; },
                    paddingBottom: function (i, node) { return 0; },
                  },
                  margin:[0,0,0,-1],
                   table: {
                     widths:["auto",20],
                     heights:[20,20],
                     body: [
                       [{text:'Test Drive Details',style:"tableHeaderTag",
                       border:[false,true,false,false],margin:[5,5,0,0]},{
                         svg: `<svg viewBox="0 0 100 100" fill="#696969" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><polygon points="0 0, 100 100, 0 100"/></svg>`,
                         border:[false,false,false,false]
                       }]
                     ]
                   }
                 },
             ],

             ]
           }
         },
         {
           style: 'tableExample',
           layout:{
             paddingLeft: function (i, node) { return 0; },
             paddingBottom: function (i, node) { return 0; }
           },
           margin:[0,-5,0,0],
           fontSize:7,
           table: {
             widths:["*"],
             body: [
               [{
                 border:[true,false,true,false],
                 margin:[10,10,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:["auto",10,"auto",10,"auto",5,"auto",10,"auto",10,"auto"],
                   body: [
                       [
                         {text:"Test Drive Offered",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_isTestDriveOffered"] && interactionForPdf["dynamicProperties_isTestDriveOffered"] ? "Y" : "",alignment:"center",fontSize:8,color:"#153ca4",bold:true},
                         {text:"Y",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_isTestDriveOffered"] && interactionForPdf["dynamicProperties_isTestDriveOffered"] ? "" : "N",alignment:"center",fontSize:8,color:"#153ca4",bold:true},
                         {text:"N",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:"",border:[false,false,false,false]},
                         {text:"Test Drive taken",border:[false,false,false,false]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_isTestDrivetaken"] && interactionForPdf["dynamicProperties_isTestDrivetaken"] ? "Y" : "",alignment:"center",fontSize:8,color:"#153ca4",bold:true},
                         {text:"Y",border:[false,false,false,false],margin:[5,0,0,0]},
                         {text:interactionForPdf && interactionForPdf["dynamicProperties_isTestDrivetaken"] && interactionForPdf["dynamicProperties_isTestDrivetaken"] ? "" : "N",alignment:"center",fontSize:8,color:"#153ca4",bold:true},
                         {text:"N",border:[false,false,false,false],margin:[5,0,0,0]},
                     ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[20,"*",10,180,"*",10,20,"*"],
                   heights:[10,10,10,10,10,10,10,10],
                   body: [
                     [
                       {text:"Date/Time",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Model",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Duration(Time/Kms)",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                   ],
                   [
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_testDriveDate"] ? interactionForPdf["dynamicProperties_testDriveDate"] : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_selectedModelName"] ? interactionForPdf["dynamicProperties_selectedModelName"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_selectedModelName"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,border:[true,true,true,true],color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_testDriveTime"] ? interactionForPdf["dynamicProperties_testDriveTime"] : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]}
                   ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[30,"*",10,180,"*",10,20,"*"],
                   heights:[10,10,10,10,10,10,10,10],
                   body: [
                     [
                       {text:"Location(Where TD Conducted)",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Reasons if test drive not given",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                   ],
                   [
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_testDriveLocation"] ? interactionForPdf["dynamicProperties_testDriveLocation"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_testDriveLocation"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_reasonForNoTestDrive"] ? interactionForPdf["dynamicProperties_reasonForNoTestDrive"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_reasonForNoTestDrive"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:5,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,false,true]},
                     {text:"",border:[false,true,false,true]},
                     {text:"",border:[false,true,false,true]},
                     {text:"",border:[false,true,true,true]}
                   ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[20,"*",10,180,"*",10,20,"*"],
                   heights:[10,10,10,10,10,10,10,10],
                   body: [
                     [
                       {text:"Feedback Taken (Y/N)",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Entered in GDMS (Y/N)",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                   ],
                   [
                     {text:"",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",margin:[0,0,0,0],border:[true,true,true,true]},
                     {text:"",border:[false,false,false,false],margin:[0,0,0,0]},
                     {text:"",margin:[5,0,0,0],border:[true,true,true,true],colSpan:5,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",margin:[0,0,0,0],border:[true,true,true,true]},
                     {text:"",border:[true,true,true,true],margin:[0,0,0,0]},
                     {text:"",margin:[0,0,0,0],border:[true,true,true,true]},
                     {text:"",margin:[0,0,0,0],border:[true,true,true,true]}
                   ],
                   ]
                 }
               }],

               [
                 {
                   border:[true,false,true,true],
                   style: 'tableExample',
                   layout: {
                    paddingLeft: function (i, node) { return 0; },
                    paddingRight: function (i, node) { return 0; },
                    paddingTop: function (i, node) { return 0; },
                    paddingBottom: function (i, node) { return 0; },
                  },
                  margin:[0,0,0,-1],
                   table: {
                     widths:["auto",20],
                     heights:[20,20],
                     body: [
                       [{text:'Exchange Details',style:"tableHeaderTag",
                       border:[false,true,false,false],margin:[5,5,0,0]},{
                         svg: `<svg viewBox="0 0 100 100" fill="#696969" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><polygon points="0 0, 100 100, 0 100"/></svg>`,
                         border:[false,false,false,false]
                       }]
                     ]
                   }
                 },
             ],

             ]
           }
         },
         {
           style: 'tableExample',
           layout:{
             paddingLeft: function (i, node) { return 0; },
             paddingBottom: function (i, node) { return 0; }
           },
           fontSize:7,
           margin:[0,-5,0,0],
           table: {
             widths:["*"],
             body: [
               [{
                 border:[true,false,true,false],
                 margin:[10,5,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:["auto","*",5,"auto","*",5,"auto","*",5,"auto","*"],
                   heights:[10,10,10,10,10,10,10,10,10,10,10],
                   body: [
                     [
                       {text:"Vehicle Details",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Manufacturer",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Make",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Purchase Month / Year",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                   ],
                   [
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_exchangeCarModel"] ? interactionForPdf["dynamicProperties_exchangeCarModel"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_exchangeCarModel"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_manufacturer"] ? interactionForPdf["dynamicProperties_manufacturer"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_manufacturer"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:"",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_purchaseMonthYear"] ? interactionForPdf["dynamicProperties_purchaseMonthYear"] : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]}
                   ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:["auto","*",5,"auto","*",5,"auto","*",5,"auto","*"],
                   heights:[10,10,10,10,10,10,10,10,10,10,10],
                   body: [
                     [
                       {text:"Owner",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Loan Completion Month / Year (if any)",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Kms Done",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Finance Name",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                   ],
                   [
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_owner"] ? interactionForPdf["dynamicProperties_owner"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_owner"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_loanCompletionMonthYear"] ? interactionForPdf["dynamicProperties_loanCompletionMonthYear"] : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_kmsDone"] ? interactionForPdf["dynamicProperties_kmsDone"] : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_financerName"] ? interactionForPdf["dynamicProperties_financerName"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_financerName"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]}
                   ],
                   ]
                 }
               }],
               [{
                 border:[true,false,true,false],
                 margin:[10,0,10,0],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:[20,"*",10,"auto","*",10,100,"*"],
                   heights:[10,10,10,10,10,10,10,10],
                   body: [
                     [
                       {text:"Expected Price (INR) (A)",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Quoted Price (INR) (B)",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"GAP (INR) (A-B)",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                   ],
                   [
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_expectedPrice"] ? getFormattedAmount(interactionForPdf["dynamicProperties_expectedPrice"]) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_quotedPrice"] ? getFormattedAmount(interactionForPdf["dynamicProperties_quotedPrice"]) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",margin:[0,0,0,10],border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_expectedPrice"]  && interactionForPdf["dynamicProperties_quotedPrice"] ? getFormattedAmount(Number(interactionForPdf["dynamicProperties_expectedPrice"]) - Number(interactionForPdf["dynamicProperties_quotedPrice"])) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",margin:[0,0,0,10],border:[false,true,true,true]}
                   ],
                   ]
                 }
               }],

               [
                 {
                   border:[true,false,true,true],
                   style: 'tableExample',
                   layout: {
                    paddingLeft: function (i, node) { return 0; },
                    paddingRight: function (i, node) { return 0; },
                    paddingTop: function (i, node) { return 0; },
                    paddingBottom: function (i, node) { return 0; },
                  },
                  margin:[0,0,0,-1],
                   table: {
                     widths:["auto",20],
                     heights:[20,20],
                     body: [
                       [{text:'Summary',style:"tableHeaderTag",
                       border:[false,true,false,false],margin:[5,5,0,0]},{
                         svg: `<svg viewBox="0 0 100 100" fill="#696969" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><polygon points="0 0, 100 100, 0 100"/></svg>`,
                         border:[false,false,false,false]
                       }]
                     ]
                   }
                 },
             ],

             ]
           }
         },
         {
           style: 'tableExample',
           layout:{
             paddingLeft: function (i, node) { return 0; },
             paddingBottom: function (i, node) { return 0; }
           },
           margin:[0,-5,0,0],
           fontSize:7,
           table: {
             widths:["*"],
             body: [
               [{
                 border:[true,false,true,true],
                 margin:[10,5,10,10],
                 layout:{
                   paddingLeft: function (i, node) { return 0; },
                   paddingBottom: function (i, node) { return 0; }
                 },
                 fontSize:7,
                 table: {
                   headerRows: 1,
                   widths:["auto","*",5,"auto","*",5,"auto","*",5,"auto","*"],
                   heights:[10,10,10,10,10,10,10,10,10,10,10],
                   body: [
                     [
                       {text:"Status(Booked/Lost)",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Model & Variant Enquired",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Model & Variant Booked",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]},
                       {text:"Date Of Booking",border:[false,false,false,false],margin:[0,0,0,0],colSpan:2},
                       {text:"",border:[false,false,false,false],margin:[0,0,0,10]}
                   ],
                   [
                     {text:"",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text: interactionForPdf && interactionForPdf["dynamicProperties_selectedModelName"] && interactionForPdf["dynamicProperties_selectedVariantName"] ? interactionForPdf["dynamicProperties_selectedModelName"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_selectedModelName"].slice(1) + "-" + interactionForPdf["dynamicProperties_selectedVariantName"].charAt(0).toUpperCase() + interactionForPdf["dynamicProperties_selectedVariantName"].slice(1) : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:"",border:[true,true,false,true]},
                     {text:"",border:[false,true,true,true]},
                     {text:"",border:[false,false,false,false]},
                     {text:interactionForPdf && interactionForPdf["dynamicProperties_bookingDate"] ? moment(interactionForPdf["dynamicProperties_bookingDate"]).format("DD/MM/YYYY") : "",margin:[5,0,0,0],border:[true,true,true,true],colSpan:2,fontSize:8,color:"#153ca4",bold:true},
                     {text:"",border:[false,true,true,true]}
                   ],
                   ]
                 }
               }],

             ]
           }
         },
       ],
         styles: PDFSTYLE.styles,
         defaultStyle: {
           fontSize: 10
         }
       }
         pdfMake.createPdf(docDefinition).open();

       // pdfMake.createPdf(docDefinition).download(pdfName);
     }

     function DownloadDocket(type) {
       console.log(type, 'typetype');
       let pdfName = "Hyundai_Docket_2022" + ".pdf"
       let docDefinition = {
           pageSize: 'A4',
           pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
           pageMargins: PDFSTYLE.pageSetup.pageMargins,
           background: function (page) {
               if(page > 1)
               return {

                       columns: [
                         { image:hyundai, width: 600, height:1000},
                       ]
               };
           },
           footer(currentPage, pageCount,page) {
             if(page > 1)
               return {
                   style: "pageFooter",
                   columns: [
                     {
                       text: [{ text: `Generated by ${userInfo && userInfo.displayName ? userInfo.displayName : ""}, ${userInfo && userInfo.userBranchName ? userInfo.userBranchName : ""} , ${moment(new Date()).format("DD/MM/YYYY, h:mm a")},  ${currentRow && currentRow.caseID ? currentRow.caseID : ""}`,width:"*" ,alignment:"left"}]
                     },

                       { text: currentPage.toString() + " of " + pageCount, alignment: "right" }
                   ]
               }
           },
           content: [
             { image:hyundaiCover, width:600,height:850, absolutePosition: { x: 0, y: 0 }, pageBreak: 'after'},
              {
                 style:"cont",
                   text: [
                       {text:"Dear Customer,\n\n\n", bold:true},
                       "Heartiest congratulations on booking your new car with us. We welcome you to the Hyundai Motor India Family and Thank you for showing trust in brand Hyundai\n\n\n",
                       "This 'Customer Docket' is an initiative by Hyundai Motor India Limited to ensure that you have an exceptional new car purchase experience with us. The docket will assist you at each step of the new car buying process.\n\n\n",
                       "Once again, we would like to extend our gratitude for giving us an opportunity to serve you.\n\n\n",
                       "Wishing you a great Hyundai Experience!\n\n\n\n",
                       ],
              },
              {
                columns: [
                              {}
                              ,
                      {

                      },
                      {
                        text: 'With Best Wishes & Regards\n\n\n\n\n'
                      }
               ]
             },
             {
               columns: [
                             {}
                             ,
                     {

                     },
                     {
                       text: 'Dealer Principal',
                       margin:[55,0,0,0],
                       pageBreak:'after'
                     }
              ]
            },
            {
             text: 'ORDER BOOKING FORM',marginTop:10,alignment:"center",fontSize:14
           },
           {
             text: 'THIS IS NOT A SUBSTITUTE TO RECEIPT',
             color:"red",
             alignment:"center",
             fontSize:14
           },
           // { image:hyundaiAd, width: 410, height:320, margin: [50, 90, 50,10], pageBreak: 'after', background:false},
           {
             style: 'tableExample',
             fontSize:8,
             table: {
               widths:["*"],
               body: [
                 [  {
                     style: 'tableExample',
                     fontSize:8,
                     layout: {
                       paddingLeft: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       paddingRight: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       paddingTop: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       paddingBottom: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       hLineWidth: function(i, node) {
                         return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                       },
                     },
                     margin:[5,5,5,5],
                     table: {
                       widths:["auto","*"],
                       body: [
                         [{text:'Dealer Name/Address:',border:[false,false,false,false]},
                          {text:"Kothari Cars Pvt. Ltd.",border:[false,false,false,true],color:"#153ca4"}]
                       ]
                      },
                   }
                 ]
               ]
              },
           },
           {
             style: 'tableExample',
             fontSize:8,
             margin:[0,-10,0,0],
             table: {
               widths:["*"],
               body: [
                 [  {
                     style: 'tableExample',
                     fontSize:8,
                     layout: {
                       paddingLeft: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       paddingRight: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       paddingTop: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       paddingBottom: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       hLineWidth: function(i, node) {
                         return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                       },
                     },
                     margin:[5,5,5,5],
                     table: {
                       widths:["auto","*","auto","*"],
                       body: [
                         [{text:'For Dealer Use Only: Date (DD/MM/YYYY):' ,border:[false,false,false,false]},{text:(interactionForPdf && interactionForPdf["dynamicProperties_bookingDate"] ?  interactionForPdf["dynamicProperties_bookingDate"] : "") ,color:"#153ca4",border:[false,false,false,true]},{text:'Booking Reference Number:' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_bookingRefernceNumber"] && interactionForPdf["dynamicProperties_bookingRefernceNumber"] !== "NA" ?  interactionForPdf["dynamicProperties_bookingRefernceNumber"] : "#KH-SSR-22-BKG-00027") ,border:[false,false,false,true],color:"#153ca4"}]
                       ]
                      },
                   }
                 ]
               ]
              },
           },
           {
             style: 'tableExample',
             fontSize:8,
             margin:[0,5,0,0],
             table: {
               widths:["*"],
               body: [
                 [  {
                     style: 'tableExample',
                     fontSize:8,
                     layout: {
                       paddingLeft: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       paddingRight: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       paddingTop: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       paddingBottom: function (i) {
                         return i === 0 ? 0 : 0;
                       },
                       hLineWidth: function(i, node) {
                         return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                       },
                     },
                     margin:[5,5,5,5],
                     table: {
                       widths:["auto","*","auto","*","auto","*","auto","*"],
                       body: [
                         [
                           {text:'Model Preference:Model: ' ,border:[false,false,false,false]},
                           {text:(interactionForPdf && interactionForPdf["dynamicProperties_selectedModelName"] ?  interactionForPdf["dynamicProperties_selectedModelName"] : "") ,border:[false,false,false,true],color:"#153ca4"},
                           {text:'Color: ' ,border:[false,false,false,false],alignment:"left"},
                           {text:(interactionForPdf && interactionForPdf["dynamicProperties_selectedColor"] ?  interactionForPdf["dynamicProperties_selectedColor"] : "") ,border:[false,false,false,true],color:"#153ca4"},
                           {text:'Variant: ' ,border:[false,false,false,false]},
                           {text:(interactionForPdf && interactionForPdf["dynamicProperties_selectedVariantName"] ?  interactionForPdf["dynamicProperties_selectedVariantName"] : "")  ,border:[false,false,false,true],color:"#153ca4"},
                           {text:'Year Of Manufacturing: ' ,border:[false,false,false,false],alignment:"left"},
                           {text:(interactionForPdf && interactionForPdf["dynamicProperties_yearOfManufacturing"] ?  interactionForPdf["dynamicProperties_yearOfManufacturing"] : "") ,border:[false,false,false,true],color:"#153ca4"}
                         ]
                       ]
                      },
                   }
                 ]
               ]
              },
           },
          {
            style: 'tableExample',
            fontSize:8,
               margin:[0,5,0,0],
               layout: {
                   hLineWidth: function(i, node) {
                     return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                   },
                   paddingLeft: function (i) {
                     return i === 0 ? 0 : 0;
                   },
                   paddingBottom: function (i) {
                     return i === 0 ? 0 : 0;
                   },
                },
                table: {
                 widths:["auto","*"],
                 body: [
                    [{text:'(1) Full Name (Mr./Ms./M/S)' ,border:[false,false,false,false],alignment:"left"},{text: interactionForPdf && interactionForPdf["dynamicProperties_customerName"] ?  interactionForPdf["dynamicProperties_customerName"] : "" ,alignment:"left",border:[false,false,false,true],color:"#153ca4"}]
                 ],
              },
          },
          {
             style: 'tableExample',
             fontSize:8,
              margin:[0,5,0,0],
              layout: {
                  hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                  },
                  paddingLeft: function (i) {
                    return i === 0 ? 0 : 0;
                  },
                  paddingBottom: function (i) {
                    return i === 0 ? 0 : 0;
                  },
               },
               table: {
                widths:["auto","*"],
                 body: [
                   [{text:'(2) S/0,W/o,D/o(Mr./Ms./M/S)' ,border:[false,false,false,false],alignment:"left"},{text:'' ,alignment:"left",border:[false,false,false,true],color:"#153ca4"}]
                 ],
              },
           },
          {
             style: 'tableExample',
             fontSize:8,
             margin:[0,5,0,0],
             layout: {
                 hLineWidth: function(i, node) {
                   return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                 },
                 paddingLeft: function (i) {
                   return i === 0 ? 0 : 0;
                 },
                 paddingBottom: function (i) {
                   return i === 0 ? 0 : 0;
                 },
              },
              table: {
                 widths:["auto","*"],
                body: [
                  [{text:'(3) Address For Correspondence' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_addressLine1"] ?  interactionForPdf["dynamicProperties_addressLine1"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"}]
                ],
              },
            },
          {
             style: 'tableExample',
             fontSize:8,
            margin:[0,5,0,0],
            layout: {
                hLineWidth: function(i, node) {
                  return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                },
                paddingLeft: function (i) {
                  return i === 0 ? 0 : 0;
                },
                paddingBottom: function (i) {
                  return i === 0 ? 0 : 0;
                },
             },
             table: {
                widths:["auto","*","auto","*","auto","*","auto","*"],
               body: [
                 [
                   {text:'City' ,border:[false,false,false,false],alignment:"left",margin:[12,0,0,0]},{text:(interactionForPdf && interactionForPdf["dynamicProperties_city"] ?  interactionForPdf["dynamicProperties_city"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"},
                   {text:'State' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_state"] ?  interactionForPdf["dynamicProperties_state"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"},
                   {text:'PinCode' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_pincode"] ?  interactionForPdf["dynamicProperties_pincode"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"},
                   {text:'Telephone No(Office)' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_telephoneNoOffice"] ?  interactionForPdf["dynamicProperties_telephoneNoOffice"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"}
                 ]
               ],
             },
           },
          {
            style: 'tableExample',
            fontSize:8,
             margin:[0,5,0,0],
             layout: {
                 hLineWidth: function(i, node) {
                   return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
                 },
                 paddingLeft: function (i) {
                   return i === 0 ? 0 : 0;
                 },
                 paddingBottom: function (i) {
                   return i === 0 ? 0 : 0;
                 },
              },
              table: {
               widths:["auto","*"],
               body: [
                  [
                    {text:'(4) Address For Registration' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_addressForRegistration"] ?  interactionForPdf["dynamicProperties_addressForRegistration"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"},
                  ]
              ],
            },
          },
          {
           style: 'tableExample',
           fontSize:8,
          margin:[0,5,0,0],
          layout: {
              hLineWidth: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
              },
              paddingLeft: function (i) {
                return i === 0 ? 0 : 0;
              },
              paddingBottom: function (i) {
                return i === 0 ? 0 : 0;
              },
           },
           table: {
              widths:["auto","*","auto","*","auto","*","auto",60,"auto",80],
             body: [
               [
                 {text:'City' ,border:[false,false,false,false],alignment:"left",margin:[12,0,0,0]},{text:(interactionForPdf && interactionForPdf["dynamicProperties_cityForRegistration"] ?  interactionForPdf["dynamicProperties_cityForRegistration"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"},
                 {text:'State' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_stateForRegistration"] ?  interactionForPdf["dynamicProperties_stateForRegistration"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"},
                 {text:'PinCode' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_pincodeForRegistration"] ?  interactionForPdf["dynamicProperties_pincodeForRegistration"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"},
                 {text:'Telephone No(Residence)' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_telephoneNoResidence"] ?  interactionForPdf["dynamicProperties_telephoneNoResidence"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"},
                 {text:'Mobile No' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_mobile"] ?  interactionForPdf["dynamicProperties_mobile"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"}
               ]
             ],
           },
         },
         {
         style: 'tableExample',
         fontSize:8,
          margin:[0,5,0,0],
          layout: {
              hLineWidth: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
              },
              paddingLeft: function (i) {
                return i === 0 ? 0 : 0;
              },
              paddingBottom: function (i) {
                return i === 0 ? 0 : 0;
              },
           },
           table: {
            widths:["auto","*"],
            body: [
               [
                 {text:'(5) PAN/GIR No.' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_pan"] ?  interactionForPdf["dynamicProperties_pan"] : "") ,alignment:"left",border:[false,false,false,true],color:"#153ca4"},
               ]
           ],
         },
       },
         {
         style: 'tableExample',
         fontSize:8,
          margin:[0,5,0,0],
          layout: {
              hLineWidth: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
              },
              paddingLeft: function (i) {
                return i === 0 ? 0 : 0;
              },
              paddingBottom: function (i) {
                return i === 0 ? 0 : 0;
              },
           },
           table: {
            widths:["auto","*"],
            body: [
               [
                 {text:'(6) Deal Commitment' ,border:[false,false,false,false],alignment:"left"},
                 {text:(interactionForPdf && interactionForPdf["dynamicProperties_dealCommitment"] ?  interactionForPdf["dynamicProperties_dealCommitment"] : ""),alignment:"left",border:[false,false,false,true],color:"#153ca4"}
               ]
           ],
         },
       },
         {
           alignment: 'justify',
           margin:[0,5,0,0],
           columns: [
             {
               style: 'tableExample',
               fontSize:8,
               margin:[2.5,0,0,0],
                 table: {
                  widths:["*","auto","auto"],
                  body: [
                     ["Transaction Details",{text:"Applicable\n(Y/N)",alignment:"center"},"Payable Amount"],
                     [{text:"Receivable From The Customer",colSpan:3,alignment:"center"},"",""],
                     [
                       {text:"Ex Showroom Price"},
                       {text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedExShowroom'] ?  "Y" : "N"),color:"#153ca4",alignment:"center"},
                       {text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedExShowroom'] ? "₹" + interactionForPdf['dynamicProperties_adjustedExShowroom'] : "₹" + "0"),color:"#153ca4"}
                     ],
                     [{text:"Comprehensive Insurance*"},
                     {text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedInsuranceCalculated'] ?  "Y" : "N"),color:"#153ca4",alignment:"center"},
                     {text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedInsuranceCalculated'] ? "₹" + interactionForPdf['dynamicProperties_adjustedInsuranceCalculated'] :  "₹" + "0"),color:"#153ca4"}],
                     [{text:"Road Tax & Registration Charges"},
                     {text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedRtoIndividual'] ? "Y" : "N"),color:"#153ca4",alignment:"center"},
                     {text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedRtoIndividual'] ? "₹" + (Number(interactionForPdf['dynamicProperties_adjustedRtoIndividual']) + Number(interactionForPdf['dynamicProperties_adjustedRegistrationFee'])) :  "₹" + "0"),color:"#153ca4"}],
                     [{text:"Extended Warranty Charges"},
                     {text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedFourthAnd5thYearExtendedWarranty'] ? "Y" : "N"),color:"#153ca4",alignment:"center"},
                     {text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedFourthAnd5thYearExtendedWarranty'] ? "₹" + interactionForPdf['dynamicProperties_adjustedFourthAnd5thYearExtendedWarranty'] :  "₹" + "0"),color:"#153ca4"}
                     ],
                     [{text:"Accessories Cost*"},
                     {text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedBasicAccessoriesKit'] ?  "Y" : "N"),color:"#153ca4",alignment:"center"}
                     ,{text:(interactionForPdf && interactionForPdf['dynamicProperties_adjustedBasicAccessoriesKit'] ? "₹" + interactionForPdf['dynamicProperties_adjustedBasicAccessoriesKit'] : "₹" + "0"),color:"#153ca4"}],
                     [{text:"Essential Kit"},"",""],
                     [{text:"(Others)............"},"",""],
                     [{text:"Total"},"",{text:(interactionForPdf && interactionForPdf['dynamicProperties_finalAmount'] ? "₹" + (Number(interactionForPdf['dynamicProperties_finalAmount'])-Number(interactionForPdf['dynamicProperties_quotedPrice'])-Number(interactionForPdf["dynamicProperties_balanceBookingAmount"])) : "₹" + "0"),color:"#153ca4"}]
                 ],
               },
             },
             {
               style: 'tableExample',
               fontSize:8,
               margin:[2.5,0,0,0],
                 table: {
                  widths:["*","auto","auto"],
                  body: [
                    ["Transaction Details",{text:"Applicable\n(Y/N)",alignment:"center"},"Payable Amount"],
                    [{text:"Deductions/Discounts given to the customer",colSpan:3,alignment:"center"},"",""],
                    [
                      {text:"Exchange Discount"},
                      {text:(interactionForPdf && interactionForPdf['dynamicProperties_exchangeBonus'] ?  "Y" : "N"),color:"#153ca4",alignment:"center"},
                      {text:(interactionForPdf && interactionForPdf['dynamicProperties_exchangeBonus'] ? "₹" + interactionForPdf['dynamicProperties_exchangeBonus'] : "₹" + "0"),color:"#153ca4"}
                    ],
                    [
                      {text:"Corporate Discount"},
                      {text:(interactionForPdf && interactionForPdf['dynamicProperties_schemeDiscount'] ?  "Y" : "N"),color:"#153ca4",alignment:"center"},
                      {text:(interactionForPdf && interactionForPdf['dynamicProperties_schemeDiscount'] ? "₹" + interactionForPdf['dynamicProperties_schemeDiscount'] : "₹" + "0"),color:"#153ca4"}
                    ],
                    [{text:"Loyalty Discount"},  {text:"",color:"#153ca4",alignment:"center"},  {text:"",color:"#153ca4"}],
                    [{text:"Pre-Owned Car Exchange Value"},
                    {text:(interactionForPdf && interactionForPdf['dynamicProperties_quotedPrice'] ?  "Y" : "N"),color:"#153ca4",alignment:"center"},
                    {text:(interactionForPdf && interactionForPdf['dynamicProperties_quotedPrice'] ? "₹" + interactionForPdf['dynamicProperties_quotedPrice'] : "₹" + "0"),color:"#153ca4"}],
                    [{text:"Accessories"},  {text:"",alignment:"center"},  {text:""}],
                    [{text:"(Others)............"},"",""],
                    [{text:"(Others)............"},"",""],
                    [{text:"(Others)............"},"",""],
                    [{text:"(Others)............"},"",""],
                    [{text:"(Others)............"},"",""]
                 ],
               },
             }
           ]
         },
         {text:"*Purchase of Insurance Policy & accessories from dealer are optional",bold:true,margin:[10,0,0,0]},
         {
           style: 'tableExample',
           fontSize:8,
           margin:[5,5,5,0],
             table: {
              widths:["*","*","*","*"],
              body: [
                [{text:"Booking Amount",alignment:"left",border:[false,false,false,false]},{text:"₹" + (interactionForPdf && interactionForPdf["dynamicProperties_paidBookingAmount"] ?  interactionForPdf["dynamicProperties_paidBookingAmount"] : "0"),color:"#153ca4",alignment:"left"},{text:"Balance Amount",alignment:"left",border:[false,false,false,false],margin:[5,0,0,0]},{text:"₹"+ (interactionForPdf && interactionForPdf["dynamicProperties_balanceBookingAmount"] ?  interactionForPdf["dynamicProperties_balanceBookingAmount"] : "0"),color:"#153ca4",alignment:"left"}],
             ],
           },
         },
         {
          style: 'tableExample',
          fontSize:8,
           margin:[0,5,0,0],
            table: {
             widths:["*"],
             body: [
                [
                  {text:'(7) Mode of payment' ,alignment:"left",border:[false,false,false,false]}
                ]
            ],
          },
        },
         {
          style: 'tableExample',
          fontSize:8,
           margin:[12,5,0,0],
            table: {
             widths:[5,"*",5,"*",5,"*",5,"*",5,"*"],
             body: [
                [
                  {text:(interactionForPdf && interactionForPdf["dynamicProperties_modeOfPayment"] && interactionForPdf["dynamicProperties_modeOfPayment"] === "Cash"  ? "Y" : ""),color:"#153ca4",alignment:"center"}, {text:'Cash' ,border:[false,false,false,false],alignment:"left"},
                  {text:(interactionForPdf && interactionForPdf["dynamicProperties_modeOfPayment"] && interactionForPdf["dynamicProperties_modeOfPayment"] === "Payorder" ?  "Y" : ""),color:"#153ca4",alignment:"center"}, {text:'Payorder' ,border:[false,false,false,false],alignment:"left"},
                  {text:(interactionForPdf && interactionForPdf["dynamicProperties_modeOfPayment" === "Demand Draft"] ?  "Y" : ""),color:"#153ca4",alignment:"center"}, {text:'Demand Draft' ,border:[false,false,false,false],alignment:"left"},
                  {text:(interactionForPdf && interactionForPdf["dynamicProperties_modeOfPayment"] && interactionForPdf["dynamicProperties_modeOfPayment"] === "Cheque" ?  "Y" : ""),color:"#153ca4",alignment:"center"}, {text:'Cheque' ,border:[false,false,false,false],alignment:"left"},
                  {text:(interactionForPdf && interactionForPdf["dynamicProperties_modeOfPayment"] && interactionForPdf["dynamicProperties_modeOfPayment"]  === "NEFT/RTGS"?  "Y" : ""),color:"#153ca4",alignment:"center"}, {text:'NEFT/RTGS' ,border:[false,false,false,false],alignment:"left"}
                ]
            ],
          },
        },
         {
         style: 'tableExample',
         fontSize:8,
        margin:[0,5,0,0],
        layout: {
            hLineWidth: function(i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            paddingLeft: function (i) {
              return i === 0 ? 0 : 0;
            },
            paddingBottom: function (i) {
              return i === 0 ? 0 : 0;
            },
         },
         table: {
            widths:["auto","*","auto","*","auto","*"],
           body: [
             [
               {text:'Payorder/ Demand Draft/ Cheque No.' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_chequeNumber"] ?  interactionForPdf["dynamicProperties_chequeNumber"] : ""),color:"#153ca4" ,alignment:"left",border:[false,false,false,true]},
               {text:'Date' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_dateOfBooking"] ?  interactionForPdf["dynamicProperties_dateOfBooking"] : ""),color:"#153ca4" ,alignment:"left",border:[false,false,false,true]},
               {text:'Amount' ,border:[false,false,false,false],alignment:"left"},{text: "",alignment:"left",border:[false,false,false,true],color:"#153ca4"},
             ]
           ],
         },
       },
       {
       style: 'tableExample',
       fontSize:8,
       margin:[0,5,0,0],
       layout: {
            hLineWidth: function(i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
            },
            paddingLeft: function (i) {
              return i === 0 ? 0 : 0;
            },
            paddingBottom: function (i) {
              return i === 0 ? 0 : 0;
            },
         },
             table: {
                widths:["auto","*","auto","*"],
               body: [
                 [
                   {text:'Bank Name & Branch' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_bankBranch"] && interactionForPdf["dynamicProperties_bankName"] ?  interactionForPdf["dynamicProperties_bankName"] + " " +  interactionForPdf["dynamicProperties_bankBranch"] : ""),color:"#153ca4"  ,alignment:"left",border:[false,false,false,true]},
                   {text:'Loan Amount' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_loanAmount"] ?  interactionForPdf["dynamicProperties_loanAmount"] : ""),color:"#153ca4"  ,alignment:"left",border:[false,false,false,true]},
                 ]
               ],
             },
           },
           {
           style: 'tableExample',
           fontSize:8,
          margin:[0,5,0,0],
          layout: {
              hLineWidth: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
              },
              paddingLeft: function (i) {
                return i === 0 ? 0 : 0;
              },
              paddingBottom: function (i) {
                return i === 0 ? 0 : 0;
              },
           },
           table: {
              widths:["auto","*","auto","*"],
             body: [
               [
                 {text:'Payment Receipt No.' ,border:[false,false,false,false],alignment:"left"},{text:'' ,alignment:"left",color:"#153ca4",border:[false,false,false,true]},
                 {text:'Date' ,border:[false,false,false,false],alignment:"left"},{text:'' ,color:"#153ca4",alignment:"left",border:[false,false,false,true]}
               ]
             ],
           },
         },
         {
           style: 'tableExample',
           fontSize:8,
          margin:[0,5,0,0],
          layout: {
              hLineWidth: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
              },
              paddingLeft: function (i) {
                return i === 0 ? 0 : 0;
              },
              paddingBottom: function (i) {
                return i === 0 ? 0 : 0;
              },
           },
           table: {
              widths:["auto","*"],
             body: [
               [
                 {text:'(8) Name & Financer /Bank' ,border:[false,false,false,false],alignment:"left"},{text:(interactionForPdf && interactionForPdf["dynamicProperties_financerName"] ?  interactionForPdf["dynamicProperties_financerName"] : ""),color:"#153ca4" ,alignment:"left",border:[false,false,false,true]}
               ]
             ],
           },
         },
         {text:"Refer checklist for documents required",fontSize:7,margin:[0,5,0,0]},
         {
           style: 'tableExample',
           fontSize:8,
          margin:[0,5,0,0],
           table: {
              widths:["auto","*"],
             body: [
               [
                 {text:'Expected Date Of Delivery\n(Subject to completion of all financial and documentation requirements by customer)',bold:true,fontSize:8 ,alignment:"left"},{text:'',color:"#153ca4" ,alignment:"left"}
               ]
             ],
           },
         },
         {
           style: 'tableExample',
           fontSize:8,
          margin:[0,5,0,0],
          layout: {
              hLineWidth: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
              },
              paddingLeft: function (i) {
                return i === 0 ? 0 : 0;
              },
              paddingBottom: function (i) {
                return i === 0 ? 0 : 0;
              },
           },
           table: {
              widths:["auto",120],
             body: [
               [
                 {text:'Quote Valid Till' ,border:[false,false,false,false],alignment:"left"},{text:'' ,color:"#153ca4",alignment:"left",border:[false,false,false,true]}
               ]
             ],
           },
         },
         {
           style: 'tableExample',
           fontSize:8,
          margin:[0,5,0,0],
          layout: {
              paddingLeft: function (i) {
                return i === 0 ? 0 : 0;
              },
              paddingRight: function (i) {
                return i === 0 ? 0 : 0;
              }
            },
           table: {
              widths:["*"],
             body: [
               [
                 {text:"I/We have carefully read, understood the terms & conditions, printed on the face and/or reverse side of on this form and agree to all of them. I/We understand that any incorrect information or improper filling will render the order void.",border:[false,false,false,false],fontSize:8 ,alignment:"left"}
               ]
             ],
           },
         },
         {
         style: 'tableExample',
         fontSize:8,
        margin:[0,5,0,0],

         table: {
            widths:["auto","*",10,"*",10,"*",10,"*"],
           body: [
             [
               {text:'Signature:',fontSize:8 ,alignment:"left",border:[false,false,false,false],margin:[0,0,5,0]},
               {text:'',border:[false,false,false,true]},
               {text:'',border:[false,false,false,false]},
               {text:'',border:[false,false,false,true]},
               {text:'',border:[false,false,false,false]},
               {text:'',border:[false,false,false,true]},
               {text:'',border:[false,false,false,false]},
               {text:'',border:[false,false,false,true]}
             ]
           ],
         },
         layout: {
             // paddingLeft: function (i) {
             //   return i === 0 ? 0 : 0;
             // },
             // paddingBottom: function (i) {
             //   return i === 0 ? 0 : 0;
             // },
            //  hLineWidth: function (i, node) {
     				// 	return (i === 0 || i === node.table.body.length) ? 0.1: 0.1;
     				// },
            hLineStyle: function (i, node) {
              return {dash: {length: 2, space: 2}};
            },
          },
       },
       {
       style: 'tableExample',
       fontSize:8,
      margin:[0,0,0,0],
      layout: {
          paddingLeft: function (i) {
            return i === 0 ? 0 : 0;
          },
          paddingBottom: function (i) {
            return i === 0 ? 0 : 0;
          }
       },
       table: {
          widths:[40,"*",10,"*",10,"*",10,"*"],
         body: [
           [
             {text:'',fontSize:8 ,alignment:"left",border:[false,false,false,false],margin:[0,0,5,0]},
             {text:'Sales Consultant',border:[false,false,false,false],alignment:"center"},
             {text:'',border:[false,false,false,false]},
             {text:'Customer Care Manager',border:[false,false,false,false],alignment:"center"},
             {text:'',border:[false,false,false,false]},
             {text:'Sales Head',border:[false,false,false,false],alignment:"center"},
             {text:'',border:[false,false,false,false]},
             {text:'Customer',border:[false,false,false,false],alignment:"center"}
           ]
         ],
       },
     },
       {text:"Note 1: Order Booking form is not a substitute to receipt, please collect your payment receipt from accounts for money paid to Dealership.",       margin:[0,5,0,0],fontSize:8},
       {text:"Note 2: For Booking cancellation policy, please refer the terms & conditions printed on the reverse side of this form.",fontSize:8,pageBreak:"after"},
         {
                   style: 'tableInfo',
                   fillColor:'#eef2f4',
                   table: {
                     widths: ["*","*"],
                     heights: ['auto', 'auto'],
                     headerRows:0,
                     body: [
                       [{text: 'CUSTOMER NAME',color:'black',  bold: true,margin:[10,5,5,5]}, {text: (interactionForPdf && interactionForPdf["dynamicProperties_customerName"] ?  interactionForPdf["dynamicProperties_customerName"] : ""),color:'black',margin:[5,5,5,5]}],
                       [{text: 'CAR MODEL',color:'black',   bold: true,margin:[10,5,5,5]}, {text:(interactionForPdf && interactionForPdf["dynamicProperties_model"] ?  interactionForPdf["dynamicProperties_model"] : "") ,color:'black', margin:[5,5,5,5]}],
                       [{text: 'BOOKING REF NO.',color:'black',  bold: true,margin:[10,5,5,5]}, {text: (interactionForPdf && interactionForPdf["dynamicProperties_bookingRefernceNumber"] && interactionForPdf["dynamicProperties_bookingRefernceNumber"] !== "NA" ?  interactionForPdf["dynamicProperties_bookingRefernceNumber"] : "#KH-SSR-22-BKG-00027"),color:'black',margin:[5,5,5,5]}],
                       [{text: 'CONTACT DETAILS',color:'black',    bold: true,margin:[10,5,5,5]}, {text: (interactionForPdf && interactionForPdf["dynamicProperties_mobile"] ?  interactionForPdf["dynamicProperties_mobile"] : ""),color:'black',margin:[5,5,5,5]}],
                       [{text: 'SALES CONSULTANT NAME',color:'black', bold: true,margin:[10,5,5,5]}, {text: (customerDetailsForPdf && customerDetailsForPdf.ScName ? customerDetailsForPdf.ScName :""),color:'black',margin:[5,5,5,5]}],
                       [{text: 'DEALER NAME/ADDRESS',color:'black',bold: true,margin:[10,5,5,5]}, {text: (interactionForPdf && interactionForPdf["dynamicProperties_dealershipName"] ?  interactionForPdf["dynamicProperties_dealershipName"] : ""),color:'black',margin:[5,5,5,5]}]
                     ]
                   },
                   layout:'noBorders',
                   pageBreak:"after"
                 },
         {
             style: 'tableInfo',
             fillColor:"#efeeec",
             table: {
               widths:["*"],
               heights:[600],
               body: [
                 [
                   [
                     {
                       style:"innerTable",
                       table: {
                         widths:["*"],
                         heights:[300],
                         body: [
                           [{
                             margin:[50,50,0,0],
                             fontSize:12,
                             lineHeight: 1.3,
                             text: [
                                 {text:"For Queries/Feedback/Suggestions,\n\n\n", bold:true},
                                 {text:"For Sales: Please contact our Customer Care Manager\n", bold:true},
                                 "Name:-Yashvi Chaudhary\n",
                                 'Contact No:- 8654567545\n',
                                 'E-mail ID:- yashvi@gmail.com\n\n\n',
                                 {text:"For Service: Please contact our Customer Relationship Manager\n", bold:true},
                                 "Name:-Yashvi Chaudhary\n",
                                 'Contact No:- 8654567545\n',
                                 'E-mail ID:- yashvi@gmail.com\n\n\n',
                                 ]
                           }]
                         ]
                       },
                        layout:'noBorders',
                     },
                     {
                       margin:[50,100,0,0],
                       lineHeight: 1.3,
                       text:[
                         "Important Contact Details\n",
                         'Hyundai Call Centre: 1-800-11-4645 (Toll Free) & 098-7356-4645\n',
                         'Hyundai 24X7 Road Assistance: 1-800-102-4645(Toll Free) & 0124-2564645\n',
                         'Sale Support: CRSales@hmil.net Service Support: CRService@hmil.net'
                       ]
                     }
                   ]

                 ]
               ]
             },
              layout:'noBorders',
              pageBreak:"after"
           },
         {
                style: 'tableInfo',
                color: '#444',
                table: {
                  widths: ["*", "*"],
                  heights: ["auto", 'auto'],
                  headerRows: 1,
                    body: [
                      [{text: 'Order Booking/Commitment Checklist', style: 'infoTableHeader', colSpan: 2, alignment: 'center',color:'white',  fillColor: 'gray'}, {}],
                      [{text: 'Issue Date :- March 04,2021',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Customer Copy (This is not a cash receipt)',color:'gray',   bold: true,margin:[5,5,5,5]}]
                    ]
                },
                layout:'noBorders'
              },
         {
                   style: 'tableInfo2',
                   color: '#444',
                   table: {
                     widths: ["*", "*", "*", "*"],
                     heights: ["auto", 'auto','auto','auto'],
                     headerRows: 1,
                       body: [
                         [{text: 'Customer Information', style: 'infoTableHeader', colSpan: 4, alignment: 'center',color:'white',  fillColor: 'gray'}, {},{},{}],
                         [{text: 'Customer ID :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'C2021030022',color:'gray',margin:[5,5,5,5]},{text: 'Customer Type :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Individual',color:'gray', margin:[5,5,5,5]}],
                         [{text: 'Customer Name :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Rutuja Dahatonde',color:'gray',margin:[5,5,5,5]},{text: 'S/D/W Of :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Vaibhav',color:'gray', margin:[5,5,5,5]}],
                         [{text: 'Mobile Number : ',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '9860781601',color:'gray',margin:[5,5,5,5]},{text: 'Email ID :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'rutuja@gmail.com',color:'gray', margin:[5,5,5,5]}],
                         [{text: 'DOB :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '25/05/2000',color:'gray',margin:[5,5,5,5]},{text: 'PAN :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'AIFPP3593E',color:'gray', margin:[5,5,5,5]}],
                         [{text: 'GST Number :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '07AAWFR0503R1ZK',color:'gray',margin:[5,5,5,5]},{text: 'Enquiry No :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'E202102618',color:'gray', margin:[5,5,5,5]}],
                         [{text: 'Booking No :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'B202103241',color:'gray',margin:[5,5,5,5]},{text: 'Booking Date :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '01/03/2021',color:'gray', margin:[5,5,5,5]}],
                         [{}, {},{text: 'Re-Booking Date :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '10/04/2021',color:'gray',margin:[5,5,5,5]}],
                       ]
                   },
                   layout:'noBorders'
                 },
         {
                      style: 'tableInfo2',
                      color: '#444',
                      table: {
                        widths: ["*", "*", "*", "*"],
                        heights: ["auto", 'auto','auto','auto'],
                        headerRows: 1,
                        body: [
                          [{text: 'Address Details (Bill To)', style: 'infoTableHeader', colSpan: 4, alignment: 'center',color:'white',  fillColor: 'gray'}, {},{},{}],
                          [{text: 'Name :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Rutuja Dahatonde',color:'gray', margin:[5,5,5,5]},{text: 'Address :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Kothrud',color:'gray', margin:[5,5,5,5]}],
                          [{text: 'City :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Pune',color:'gray', margin:[5,5,5,5]},{text: 'District :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Pune',color:'gray', margin:[5,5,5,5]}],
                          [{text: 'State : ',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Maharashtra',color:'gray', margin:[5,5,5,5]},{text: 'Pin Code :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '411038',color:'gray', margin:[5,5,5,5]}]
                        ]
                      },
                      layout:'noBorders'
                    },
         {
                         style: 'tableInfo2',
                         color: '#444',
                         table: {
                           widths: ["*", "*", "*", "*"],
                           heights: ["auto", 'auto','auto','auto'],
                           headerRows: 1,
                           body: [
                             [{text: 'Vehicle Details', style: 'infoTableHeader', colSpan: 4, alignment: 'center',color:'white',  fillColor: 'gray'}, {},{},{}],
                             [{text: 'Model :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Verna',color:'gray', margin:[5,5,5,5]},{text: 'Variant :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Kothrud',color:'Verna SX 1.5 VTVT', margin:[5,5,5,5]}],
                             [{text: 'Fuel :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Petrol',color:'gray', margin:[5,5,5,5]},{text: 'Transmission :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Manual',color:'gray', margin:[5,5,5,5]}],
                             [{text: 'Exterior Color :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Titan Grey',color:'gray', margin:[5,5,5,5]},{text: 'Interior Color :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Black',color:'gray', margin:[5,5,5,5]}],
                             [{text: 'Color Type :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Metallic',color:'gray', margin:[5,5,5,5]},{text: 'Tentative Waiting Period :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '4 ~ 10 weeks',color:'gray', margin:[5,5,5,5]}]
                           ]
                         },
                         layout:'noBorders'
                       },
         {
             text:"Disclaimer: The tentative waiting period is applicable for all fresh bookings at trim level. Depending on the actual color, the waiting period may differ.",
             color:'gray',
             bold: true,
             margin:[5,0,0,0],
             pageBreak:"after"
           },
         {
                style: 'tableInfo',
                table: {
                  widths: ["*", "*", "*", "*"],
                  heights: ["*", 'auto','auto','auto'],
                  headerRows: 1,
                  body: [
                    [{text: 'Price Details', style: 'infoTableHeader', colSpan: 4, alignment: 'center',color:'white',  fillColor: 'gray'}, {},{},{}],
                    [{text: 'Ex-Showroom Price :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '9,28,600',color:'gray', margin:[5,5,5,5]},{},{}],
                    [{text: 'Taxes :',color:'gray',   bold: true, fontSize:12,margin:[5,5,5,5]}, {},{text: 'Charges :',color:'gray', fontSize:12,  bold: true,margin:[5,5,5,5]},{}],
                    [{text: 'TCS :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '10,913',color:'gray', margin:[5,5,5,5]},{text: 'Insurance :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '58,853',color:'gray', margin:[5,5,5,5]}],
                    [{text: 'RTO Charges (Road Tax) :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '210,324',color:'gray', margin:[5,5,5,5]},{text: 'Extended Warranty :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '26,532',color:'gray', margin:[5,5,5,5]}],
                    [{text: 'Local Body Charges :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '0',color:'gray', margin:[5,5,5,5]},{text: 'Fast Tag :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '500',color:'gray', margin:[5,5,5,5]}],
                    [{text: 'Accessory :',color:'gray',   bold: true,fontSize:12,margin:[5,5,5,5]}, {},{text: 'Promotional Offers :',color:'gray',   bold: true ,fontSize:12,margin:[5,5,5,5]},{}],
                    [{text: 'Basic Kit :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '13,173',color:'gray', margin:[5,5,5,5]},{text: 'Consumer Offer :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '0',color:'gray', margin:[5,5,5,5]}],
                    [{text: 'Other Accessory :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '0',color:'gray', margin:[5,5,5,5]},{text: 'Miscellaneous :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '0',color:'gray', margin:[5,5,5,5]}],
                    [{}, {},{text: 'Other Benefits :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '0',color:'gray', margin:[5,5,5,5]}],
                    [{text: 'Total Vehicle Price :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '10,01,000',color:'gray', margin:[5,5,5,5]},{},{}]

                  ]
                },
                layout:'noBorders'
              },
         {
            text:"Rupees Seventeen Lakhs Seventy Five Thousands Two Hundred Ninety Five Only",
            color:'gray',
            bold: true,
            margin:[5,0,0,15]
          },
         {
               style: 'tableInfo2',
               color: '#444',
               table: {
                 widths: ["*", "*", "*", "*", "*", "*"],
                 heights: ["auto", 'auto','auto','auto','auto','auto'],
                 headerRows: 1,
                 body: [
                   [{text: 'Exchange Vehicle Details', style: 'infoTableHeader', colSpan: 6, alignment: 'center',color:'white',  fillColor: 'gray'}, {},{},{},{},{}],
                   [{text: 'Make :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Hyundai',color:'gray', margin:[5,5,5,5]},{text: 'Model :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Hyundai Venue E 1.2 Petrol',color:'gray', margin:[5,5,5,5]},{text: 'Year :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '2020',color:'gray', margin:[5,5,5,5]}],
                   [{text: 'Expected Price :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '0',color:'gray', margin:[5,5,5,5]},{text: 'Quoted Price :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '0',color:'gray', margin:[5,5,5,5]},{},{}]
                 ]
               },
               layout:'noBorders'
             },
         {
              style: 'tableInfo2',
              color: '#444',
              table: {
                widths: ["*", "*", "*", "*"],
                heights: ["auto", 'auto','auto','auto'],
                headerRows: 1,
                body: [
                  [{text: 'Finance Requirement', style: 'infoTableHeader', colSpan: 4, alignment: 'center',color:'white',  fillColor: 'gray'}, {},{},{}],
                  [{text: 'Financier Require (Y/N) :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'N',color:'gray', margin:[5,5,5,5]},{text: 'Mode of Purchase :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Cash',color:'gray', margin:[5,5,5,5]}],
                  [{text: 'Financier :',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Vaibhav',color:'gray', margin:[5,5,5,5]},{text: 'Finance Amount :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '0',color:'gray', margin:[5,5,5,5]}],
                  [{text: 'Rate of Interest : ',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: '0',color:'gray', margin:[5,5,5,5]},{text: 'Tenure :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: '0',color:'gray', margin:[5,5,5,5]}],
                  [{text: 'Branch Name : ',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Bank of India',color:'gray', margin:[5,5,5,5]},{text: 'DSA Name :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Yashvi',color:'gray', margin:[5,5,5,5]}]
                ]
              },
              layout:'noBorders',
              pageBreak:"after"
            },
         {
                 style: 'tableInfo',
                 table: {
                   widths: ['*'],
                   headerRows: 1,
                   body: [
                     [{text: 'Accessories Details\n(To be fitted as per given order by the customer at the time of delivery)', style: 'infoTableHeader', alignment: 'center',color:'white',  fillColor: 'gray'}],
                   ]
                 },
                 layout:'noBorders'
             },
         {
                 style: 'tableInfo2',
                 color: '#444',
                 table: {
                   widths: [45, 100, 160, 30, '*'],
                   heights: ['auto', 'auto','auto','auto','auto'],
                   body: [
                     [{text: 'Sr.No. ',color:'gray',   bold: true,margin:[5,5,5,5]}, {text: 'Part.No.e',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Part Desc. :',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Qty.',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Amount(INR)',color:'gray',   bold: true,margin:[5,5,5,5]}],
                     [{text: 'Total Accessory Cost ',color:'gray',colSpan: 4,margin:[5,5,5,15]}, {},{},{},{text: '0',color:'gray',   bold: true,margin:[5,5,5,15]}],
                   ]
                 }
               },
         {
              style: 'tableInfo2',
              table: {
                widths: ["*"],
                headerRows: 1,
                body: [
                  [{text: 'Receipt Details', style: 'infoTableHeader', alignment: 'center',color:'white',  fillColor: 'gray'}],
                ]
              },
              layout:'noBorders'
          },
         {
               style: 'tableInfo2',
               color: '#444',
               table: {
                 widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
                 heights: ['auto', 'auto','auto','auto','auto','auto','auto','auto'],
                 body: [
                   [{text: 'Sr.No.',color:'gray',   bold: true,margin:[0,5,0,0]}, {text: 'Mode',color:'gray',   bold: true,margin:[5,5,5,0]},{text: 'Cheque/DD Number',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Date',color:'gray',   bold: true,margin:[5,5,5,0]},{text: 'Payment Type',color:'gray',   bold: true,margin:[5,5,5,5]},{text: 'Receipt Number',color:'gray',   bold: true,margin:[0,5,0,0]},{text: 'Drawn on',color:'gray',   bold: true,margin:[0,5,0,0]},{text: 'Amount(INR)',color:'gray',   bold: true,margin:[0,5,0,0]}],
                   [{text: '1.',color:'gray', margin:[5,5,5,15]}, {text: 'Booking',color:'gray',   margin:[5,5,5,15]},{text: '1001',color:'gray',   margin:[5,5,5,15]},{text: '01/03/2021',color:'gray', margin:[2,5,2,15]},{text: 'Online',color:'gray', margin:[5,5,5,15]},{text: 'PR2021003260',color:'gray',   margin:[2,5,2,15]},{text: 'HDFC Bank Ltd',color:'gray',margin:[2,5,2,15]},{text: '25000',color:'gray', margin:[5,5,5,15]}],
                 ]
               },
               pageBreak:"after"
             },
         {
               margin:[0,10,0,10],
                table: {
                  widths: ['*'],
                  headerRows: 1,
                  body: [
                    [{text: 'TERMS & CONDITIONS FOR SALE OF "HYUNDAI" CAR', style: 'infoTableHeader', alignment: 'center',color:'white',  fillColor: 'gray'}],
                  ]
                },
                layout:'noBorders'
            },
         {
              style:"paragraphs",
              columns:[
                {
                  text:'1.',
                  width:30
                },
                {
                  text:'The order Booking Form (hereinafter"Form") should be filled only in English in CAPITAL LETTERS, using a Ball Point Pen.',
                  width:"*"
                }
              ],
            },
         {
              style:"paragraphs",
              columns:[
                {
                  text:'2.',
                  width:30
                },
                {
                  text:'Order for only ONE model car of Hyundai (Car) can be made perform.',
                  width:"*"
                }
              ]
            },
         {
              style:"paragraphs",
              columns:[
                {
                  text:'3.',
                  width:30
                },
                {
                  text:'Order for more than one CAR shall be made using a separate form for each car.',
                  width:"*"
                }
              ]
            },
         {
              style:"paragraphs",
              columns:[
                {
                  text:'4.',
                  width:30
                },
                {
                  text:'Cars can be ordered by individuals/firms/companies.',
                  width:"*"
                }
              ]
            },
         {
               style:"paragraphs",
                columns:[
                {
                  text:'5.',
                  width:30
                },
                {
                  text:'Please obtain the customer copy of Car order form duly stamped by the DEALER.',
                  width:"*"
                }
              ]
            },
         {
               style:"paragraphs",
               columns:[
                {
                  text:'6.',
                  width:30
                },
                {
                  text:'In case the payment falls short of the specified amount for any reason whatsoever, the order will automatically stand rejected. In such an event, Booking cancellation charges @Rs.3000/- per car will be applicable. No interest will be paid in such cases.',
                  width:"*"
                }
              ]
            },
         {
               style:"paragraphs",
               columns:[
                {
                  text:'7.',
                  width:30
                },
                {
                  text:"Hyundai Motor India Limited (HMIL) and its Dealers reserve the right to deliver cars to the Customer at their discretion and priority even if such customer's order is not on a seniority of payment basis.",
                  width:"*"
                }
              ]
            },
         {
               style:"paragraphs",
               columns:[
                {
                  text:'8.',
                  width:30
                },
                {
                  text:'For color and variant preference, customer, is requested to opt one color choice for a particular variant only. In case of any subsequent change in either color or variant preference,the old Booking Reference Number shall cease and a new Booking Reference Number will be allotted.',
                  width:"*"
                }
              ]
            },
         {
               style:"paragraphs",
               columns:[
                {
                  text:'9.',
                  width:30
                },
                {
                  text:'Payments',
                  width:"*"
                }
              ]
            },
         {
              style:"paragraphs",
              columns:[
               {
                 text:'',
                 width:30
               },
               {
                 text:"a.",
                 width:20
               },
               {
                 text:"For placing order, Customer is required to pay the specified Order Acceptance Price as may be prevalentat the time of Order Acceptance.Payment of specified order acceptance price is to be made by Demand Draft/ Pay order/ Cheque or Transfer from Savings / Current Account through NEFT/RTGS payable in favour of DEALER. if payment is through NEFT/RTGS,Customer has to provide valid proof to DEALER that the or transfer made from the account is pertaining to the Customer.No receipt is valid unless stamping obtained on DEALER's official receipt.",
                 width:"*"
               }
             ]
           },
         {
             style:"paragraphs",
             columns:[
              {
                text:'',
                width:30
              },
              {
                text:"b.",
                width:20
              },
              {
                text:'The balance amount towards the price of the car is payable to DEALER within 10 days of the intimation to customer.',
                width:"*"
              }
            ]
          },
         {
            style:"paragraphs",
            columns:[
             {
               text:'',
               width:30
             },
             {
               text:"c.",
               width:20
             },
             {
               text:"If a customer fails to pay the balance amount within this time frame, the car would be allocated to the next customer.Depending on the date of receipt of balance amount from the customer, the Customer's Booking Reference Number would change and it shall be the next on the delivery order list, matching with the variant and colour preferred by the customer,meaning that the next available car of that variant and color will be delivered to the Customer.",
               width:"*"
             }
           ]
         },
         {
                 style:"paragraphs",
                 columns:[
                  {
                    text:'',
                    width:30
                  },
                  {
                    text:"d.",
                    width:20
                  },
                  {
                    text:'The Vehicle specification & price including statutory levies (Import Duty, Excise Duty, Taxes and other levies) will be applicable as prevailing on the date of invoice issued by Dealer to the Customer.',
                    width:"*"
                  }
                ]
              },
         {
                style:"paragraphs",
                columns:[
                 {
                   text:'',
                   width:30
                 },
                 {
                   text:"e.",
                   width:20
                 },
                 {
                   text:'Customer irrevocably instruct and authorise the Dealer to make all correspondence and take all instructions relating to the order made in this form, including cancellation transfer and change of address only form Finance Company/Bank, financing the loan without clearance from the Customer.',
                   width:"*"
                 }
               ]
             },
         {
               style:"paragraphs",
               columns:[
                {
                  text:'',
                  width:30
                },
                {
                  text:"f.",
                  width:20
                },
                {
                  text:'Loans shall be disbursedat the sole discretion of the Bank/NBFC/Financing Company, financing the loan and HMIL/ DEALER shall not be responsible in the event of delay or rejection of Loan by the Bank/NBFC/Finance Company. The Loan Agreement that may be executed between the customer and the Bank/NBFC/Financing Company shall be exclusively between them and shall bind them only. HMIL and/or DEALER have no association of any kind whatsoever concerning such Loan Agreement or its terms and conditions.',
                  width:"*"
                }
              ]
            },
         {
              style:"paragraphs",
              columns:[
               {
                 text:'10.',
                 width:30
               },
               {
                 text:'Delivery',
                 width:"*"
               }
             ]
           },
         {
             style:"paragraphs",
             columns:[
              {
                text:'',
                width:30
              },
              {
                text:"a.",
                width:20
              },
              {
                text:"The Booking Reference Number (depending on vehicle model, variant and Color) of the Customer is assigned by the Dealer at the time of order acceptance. The delivery of Car is according to seniority of order Acceptance Price deposited by Customer with the DEALER and is subject to clause 10. 10(d) below.",
                width:"*"
              }
            ]
          },
         {
            style:"paragraphs",
            columns:[
             {
               text:'',
               width:30
             },
             {
               text:"b.",
               width:20
             },
             {
               text:'Car Registration & Delivery shall be given after realization of full payment on the Bank account of the DEALER and is subject to production and supply of car from HMIL.',
               width:"*"
             }
           ]
         },
         {
           style:"paragraphs",
           columns:[
            {
              text:'',
              width:30
            },
            {
              text:"c.",
              width:20
            },
            {
              text:"Customer shall pay Rs.3,000/-(inclusiveof Taxes) as Handling Charges to the Dealer, for which separate Invoice will be given by the Dealer.",
              width:"*"
            }
          ]
        },
         {
              style:"paragraphs",
              columns:[
               {
                 text:'',
                 width:30
               },
               {
                 text:"d.",
                 width:20
               },
               {
                 text:'The delivery of the Car shall be made after registration number is allotted on payment receipt by the Transport Department.',
                 width:"*"
               }
             ]
           },
         {
           style:"paragraphs",
           columns:[
            {
              text:'',
              width:30
            },
            {
              text:"e.",
              width:20
            },
            {
              text:'Documents required for registration of the car have to be submitted as per the policy, rules & regulation of the transport authority of the concerned State Government.',
              width:"*"
            }
          ]
        },
         {
            style:"paragraphs",
            columns:[
             {
               text:'11.',
               width:30
             },
             {
               text:'Transfer-The order is transferable by the customer only to the nominee mentioned in the Order Form.',
               width:"*"
             }
           ]
         },
         {
            style:"paragraphs",
            columns:[
             {
               text:'12.',
               width:30
             },
             {
               text:'Cancellation:',
               width:"*"
             }
           ]
         },
         {
           style:"paragraphs",
           columns:[
            {
              text:'',
              width:30
            },
            {
              text:"a.",
              width:20
            },
            {
              text:"Notice of cancellation should be sent to the DEALER together with the original customer copy of the Order Booking Form and the original payment receipt.",
              width:"*"
            }
          ]
        },
         {
            style:"paragraphs",
            columns:[
             {
               text:'',
               width:30
             },
             {
               text:"b.",
               width:20
             },
             {
               text:'Once cancelled,customer order cannot be reinstated at the same Booking Reference Number.',
               width:"*"
             }
           ]
         },
         {
           style:"paragraphs",
           columns:[
            {
              text:'',
              width:30
            },
            {
              text:"c.",
              width:20
            },
            {
              text:"In the case of financed orders, cancellation request shall be sent to the DEALER through the financing entity and refunds will be made by the DEALER to the concerned financing entity only.",
              width:"*"
            }
          ]
        },
         {
          style:"paragraphs",
          columns:[
           {
             text:'',
             width:30
           },
           {
             text:"d.",
             width:20
           },
           {
             text:'Booking cancellation charges @Rs. 3000/-per car would be applicable.',
             width:"*"
           }
         ]
       },
         {
             style:"paragraphs",
             columns:[
              {
                text:'13.',
                width:30
              },
              {
                text:'HMIL reserves the right to change model, specifications and features without prior notice.',
                width:"*"
              }
            ]
          },
         {
            style:"paragraphs",
            columns:[
             {
               text:'14.',
               width:30
             },
             {
               text:'Customer is advised to quote the Booking Reference number & the date there of for any enquiry regarding delivery position.',
               width:"*"
             }
           ]
         },
         {
             style:"paragraphs",
             columns:[
              {
                text:'15.',
                width:30
              },
              {
                text:'In case of disputes, the same will be subject to the exclusive jurisdiction of the Courts of the City of the DEALER to whom Order form for Car is submitted.',
                width:"*"
              }
            ]
          },
         {
              style:"paragraphs",
              columns:[
               {
                 text:'16.',
                 width:30
               },
               {
                 text:'Value of Car for exchange may vary. Actual price will be determined based on condition of old car, at the time of handing over old car by Customer to the DEALER.',
                 width:"*"
               }
             ]
           },
         {
             style:"paragraphs",
             columns:[
              {
                text:'17.',
                width:30
              },
              {
                text:"Customer making claim under any promotional schemes viz., Exchange Bonus, Loyalty Bonus etc. as notified by HMIL/ Dealer from time to time, shall fulfil Criteria/conditions applicable for such Schemes and submit claim along with the required documents to the DEALER within the time specified, falling which Customer's claim will be summarily rejected and no correspondence will be entertained in this regard.",
                width:"*"
              }
            ]
          },
         {
            style:"paragraphs",
            columns:[
             {
               text:'18.',
               width:30
             },
             {
               text:"Delivery Date indicated is tentative only and is subject to 'force majeure' conditions and/or Clause 10 above. The term 'force majeure' means any circumstances which are unusual, unforeseeable and are beyond the control of HMIL and/or DEALER concerned, the consequence of which could not have been avoided even if all due care had been exercised, including but not limited to acts of god, war or threat of war, riot, civil strife}, hostilities, political unrest. government action, industrial dispute, natural or other disaster, nuclear incident, terrorist activity, sabotage, blockage, embargo, weather conditons, transport strike, fire, flood, typhoon, tempest, drought, short supply of labour, fuel, raw material, or manufactured produce, or otherwise preventing or hindering the manutfacture or delivery of the car and all similar events beyond the control of HMIL and/or DEALER concerned.",
               width:"*"
             }
           ]
         },
         {
             style:"paragraphs",
             columns:[
              {
                text:'19.',
                width:30
              },
              {
                text:"Customer undertakes to take delivery of the Car after registration by the transport authority concerned and understands that the registration of the Car is at the sole discretion of the transport authority concerned.",
                width:"*"
              }
            ]
          },
         {
            style:"paragraphs",
            columns:[
             {
               text:'20.',
               width:30
             },
             {
               text:'Customer further understands that the agreement of sale of the car mentioned in the Form is exclusively between Customer & DEALER only and that Hyundai Motor India Limited, which is operating with the DEALER concerned on principal to principal basis relationship,is not bound by such terms in any manner whatsoever.',
               width:"*"
             }
           ]
         },
         {
             style:"paragraphs",
             columns:[
              {
                text:'21.',
                width:30
              },
              {
                text:'Customer agrees that this Form and the terms & conditions mentioned there in shall bind on his/her/theirlegal heirs, executors,legal representatives, administrators, successors and assigns as the case may be.',
                width:"*"
              }
            ]
          },
         {
            style:"paragraphs",
            columns:[
             {
               text:'22.',
               width:30
             },
             {
               text:'Customer hereby expressly consents HMIL to store/transfer the personal data (ie. personaly identifiable data) that voluntarily supplied herein and process and use it by HMIL or its affiliates/ associates/ Dealers/ Agencies/ Representatives to contact the Customer through outbound call by Telephone / Mobile Numbers or send SMS or Email for offers, marketing and/or promotions, product related information, newsletter, market survey, poll, research, study., programs, enquiries about offerings, services and other legitimate purposes.',
               width:"*"
             }
           ]
         },
         {
           style:"paragraphs",
           columns:[
            {
              text:'23.',
              width:30
            },
            {
              text:"All personal data accumulated will be acquired, processed, and used according to the applicable regulations governing the protection of personal data for the sole purpose of managing and maintaining HMIL's own legitimate business interests.",
              width:"*"
            }
          ]
        },
         {
            style:"paragraphs",
            columns:[
             {
               text:'24.',
               width:30
             },
             {
               text:"Personal Data furnished in the Form may be used by HMIL as it deems appropriate or shared with third parties viz., affiliates, auditors, dealers, legal advisers and marketing partners, representatives, etc. contacted to provide services on HMILL's behalf. HMIL may disclose information if required to do so by any law enforcing agency.",
               width:"*"
             }
           ]
         },
         {
           style:"paragraphs",
           columns:[
            {
              text:'25.',
              width:30
            },
            {
              text:'Although HMIL takes reasonable measures to safeguard against unauthorized disclosures of information, it cannot assure that Personal Data that Customer provides will never be disclosed in a manner that is inconsistent with the Policy.',
              width:"*"
            }
          ]
        },
         {
          style:"paragraphs",
          columns:[
           {
             text:'26.',
             width:30
           },
           {
             text:'After sales service of KONA EV will be available only at limited cities with selected dealers, kindly visit at www.hyundai.com/in for more details and update.',
             width:"*"
           }
         ]
       },
         {
           style: 'undertakingTable',
           table: {
               widths: ['*'],
             body: [
               [{text:'UNDERTAKING FOR PRICE CHANGE CONFIRMATION', style:"undertakingHeader"}],
               [
                         {
                           text: `Date: ${moment(new Date()).format("DD/MM/YYYY")}`,
                           alignment:"right",
                           border:[true,false,true,false]
                         }
                       ],
               [{text:'To,', margin:[0,30,0,0],border:[true,false,true,false]}],
               [{text:`Dear ${interactionForPdf['dynamicProperties_customerName']}`,border:[true,false,true,false]}],
               [{text:"Subject: Undertaking for Price Change Confirmation",bold:true,border:[true,false,true,false],margin:[0,10,0,0]}],
                   [{text:`Note: The prices mentioned are subject to change without prior notice & will be charged as applicable. Price and scheme(s) will be applicable at the time of delivery. As per the company norms, in such circumstances I will not cancel my booking with you. I am ready to wait for ${interactionForPdf['dynamicProperties_selectedModelName']} for ${interactionForPdf['dynamicProperties_waitingPeriodMin']} to ${interactionForPdf['dynamicProperties_waitingPeriodMax']} days.`,border:[true,false,true,false],margin:[0,10,0,0]}],
                         [	{
           alignment: 'justify',
           border:[true,false,true,false],
           margin:[0,10,0,0],
           columns: [
             {
               text: `Sales Consultant: ${interactionForPdf['dynamicProperties_salesConsultant']}`
             },
             {
               text: 'Sign:'
             }
           ]
         },
         ],

         [{
           alignment: 'justify',
           border:[true,false,true,false],
           margin:[0,10,0,0],
           columns: [
             {
               text: `Date: ${moment(new Date()).format("DD/MM/YYYY, h:mm a")}`
             },
             {
               text: `Date: ${moment(new Date()).format("DD/MM/YYYY, h:mm a")}`
             }
           ]
         }]
         ,
                         [{text:"* Kindly Acknowlege the Same",margin:[0,10,0,10], border:[true,false,true,true]}]
             ]
           }
         },
         {
           style: 'undertakingTable',
           table: {
             widths: ['*'],
             body: [
               [{text:'UNDERTAKING FOR SPECIAL NUMBER', style:"undertakingHeader", pageBreak:'before'}],
               [
                         {
                           text: `Date: ${moment(new Date()).format("DD/MM/YYYY")}`,
                           alignment:"right",
                           border:[true,false,true,false]
                         }
                       ],
               [{text:'To,', margin:[0,30,0,0],border:[true,false,true,false]}],
               [{text:`Dear ${interactionForPdf['dynamicProperties_customerName']}`,border:[true,false,true,false]}],
               [{text:"Subject: Undertaking for Special Number",bold:true,border:[true,false,true,false],margin:[0,10,0,0]}],
                   [{text:"This is to inform you that, if you are applying for special Registration No form R.T.O. You are requested to produce the Special No. Receipt before registration of your car. None of the car would be delivered  without registration for any purpose and without registration No. Also Dealership will be not responsible for any special / Specific R.T.O. Registration No.",border:[true,false,true,false],margin:[0,10,0,0]}],
                   [{text:"Please take note of this before booking this vehicle",margin:[0,10,0,0],border:[true,false,true,false]}],
                         [	{
           alignment: 'justify',
           border:[true,false,true,false],
           margin:[0,10,0,0],
           columns: [
             {
               text: ''
             },
             {
               text: 'Sign:'
             }
           ]
         },
         ],

         [{
           alignment: 'justify',
           border:[true,false,true,false],
           margin:[0,10,0,0],
           columns: [
             {
               text: ''
             },
             {
               text: `Date: ${moment(new Date()).format("DD/MM/YYYY, h:mm a")}`
             }
           ]
         }]
         ,
                         [{text:"* Kindly Acknowlege the Same",margin:[0,10,0,10], border:[true,false,true,true]}]
             ]
           }
         },
         {
           style: 'undertakingTable',
           table: {
             widths: ['*'],
             body: [
               [{text:'UNDERTAKING FOR NEW CAR INSURANCE', style:"undertakingHeader",pageBreak:'before'}],
               [
                         {
                           text: `Date: ${moment(new Date()).format("DD/MM/YYYY")}`,
                           alignment:"right",
                           border:[true,false,true,false]
                         }
                       ],
               [{text:'To,', margin:[0,30,0,0],border:[true,false,true,false]}],
               [{text:"KOTHARI CARS PVT LTD",border:[true,false,true,false]}],
               [{text:"Subject: Hyundai New Car Insurance Policy With Addon Features",bold:true,border:[true,false,true,false],margin:[0,10,0,0]}],
                         [{
                             border:[true,false,true,false],
                             margin:[0,10,0,0],
                       ol: [
                         `I am going for Hyundai new car insurance policy which includes "0%" Depreciation Insurance + Consumbles + Key Protection + Personal Belongings covered. For which I am ready to pay ${getFormattedAmount(Number(interactionForPdf['dynamicProperties_insuranceCalculated']))}. I am interested going for RTI/ENGINE PROTECTION covered under Insurance for which I am ready to pay Additional ${getFormattedAmount(Number(interactionForPdf['dynamicProperties_additionalPremiumForRTI']) + Number(interactionForPdf['dynamicProperties_additionalPremiumForEngineProtection']))}`
                       ]
                     }],
                         [	{
           alignment: 'justify',
           border:[true,false,true,false],
           margin:[0,10,0,0],
           columns: [
             {
               text: `${interactionForPdf['dynamicProperties_customerName']}`
             },
             {
               text: 'Sign:'
             }
           ]
         },
         ],

         [{
           alignment: 'justify',
           border:[true,false,true,false],
           margin:[0,10,0,0],
           columns: [
             {
               text: ''
             },
             {
               text: `Date: ${moment(new Date()).format("DD/MM/YYYY, h:mm a")}`
             }
           ]
         }]
         ,
                         [{text:"* Kindly Acknowlege the Same",margin:[0,10,0,10], border:[true,false,true,true]}]
             ]
           }
         }
            ] ,
           styles: PDFSTYLE.styles,
           defaultStyle: {
               fontSize: 10
           }
       }
       if (!type) {
         // pdfMake.createPdf(docDefinition).open()
         pdfMake.createPdf(docDefinition).download(pdfName);
       } else {
         const customerDetails = {
           customerEmail: interactionForPdf.dynamicProperties_email,
           customerName: interactionForPdf.dynamicProperties_customerName,
           attachmentFor: 'Kothari Hyundai Docket',
           attachmentName: pdfName
         };
         const quotationData = {
           selectedProducts: [
             {
               model: interactionForPdf["dynamicProperties_selectedModelName"] ? interactionForPdf["dynamicProperties_selectedModelName"] : '-',
               variant: interactionForPdf["dynamicProperties_selectedColor"] ? interactionForPdf["dynamicProperties_selectedColor"] : '-',
               color: interactionForPdf["dynamicProperties_selectedVariantName"] ? interactionForPdf["dynamicProperties_selectedVariantName"] : '-',
               totalIndividual: interactionForPdf["dynamicProperties_totalIndividual"] ? interactionForPdf["dynamicProperties_totalIndividual"] : '-'
             }
           ]
         }
         const pdfDocGenerator = pdfMake.createPdf(docDefinition);
         pdfDocGenerator.getBase64(async data => {
           let stringLength = data.length - 'data:image/png;base64,'.length;

           let sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
           let payload = {
             file: {
               name: pdfName,
               size: sizeInBytes,
               type: 'PDF',
               value: pdfName,
             },
             courierID: currentRow.uuid
           }
           let fileDetails
           await axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payload).then(async res => {
             if (res && res.data) {
               fileDetails = res.data;
               try {
                 //  Save File on S3
                 const opts = {
                   headers: {
                     name: 'Content-Type',
                     value: 'multipart/form-data',
                   }
                 };
                 console.log(fileDetails, 'fileDetailsfileDetails');
                 const fileUpload = await axios.put(fileDetails.signedURL, data, opts);
                 let payloadAttachment = {
                   // attachment: data,
                   taskID: currentRow.uuid,
                   fileID: fileDetails.uuid,
                   customerDetails,
                   quotationData
                 }
                 let emailAttachment = await axios.put(`${CONSTANTS.API_URL}/api/v1/sendDocketEmailWithAttachment`, payloadAttachment);
                 if (emailAttachment.data === 200) {
                   toastr.success('Docket email sent sucessfully');
                 }
               } catch (e) {
                 console.error(e);
               }
             }
           });
         });
       }
     }
     function DownloadPolicyCancellation(type) {
       console.log(contactDetails, 'contactDetailscontactDetails');
         let pdfName = "Policy_Cancellation_Letter" + ".pdf"
         let docDefinition = {
             pageSize: 'A4',
             pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
             pageMargins: PDFSTYLE.pageSetup.pageMargins,
             background: function (page) {
                 if(page > 1)
                 return {

                         columns: [
                           { image:hyundai, width: 600, height:1000},
                         ]
                 };
             },
             footer(currentPage, pageCount,page) {
               if(page > 1)
                 return {
                     style: "pageFooter",
                     columns: [
                         {
                           text: [{ text: `Generated by ${userInfo && userInfo.displayName ? userInfo.displayName : ""}, ${userInfo && userInfo.userBranchName ? userInfo.userBranchName : ""} , ${moment(new Date()).format("DD/MM/YYYY, h:mm a")},  ${currentRow && currentRow.caseID ? currentRow.caseID : ""}`,width:"*" ,alignment:"left"}]
                         },

                         { text: currentPage.toString() + " of " + pageCount, alignment: "right" }
                     ]
                 }
             },
             content: [
               {
                 style: 'undertakingTable',
                 table: {
                     widths: ['*'],
                   body: [
                     [{text:'Policy Cancellation Letter', style:"undertakingHeader"}],
                     [
                               {
                                 text: `Date: ${moment(new Date()).format("DD/MM/YYYY")}`,
                                 alignment:"right",
                                 border:[true,false,true,false]
                               }
                             ],
                     [{text:'To,', margin:[0,30,0,0],border:[true,false,true,false]}],
                     [{text:`Dear ${interactionForPdf['dynamicProperties_customerName']}`,border:[true,false,true,false]}],
                     [{text:"Subject: Policy Cancellation Letter",bold:true,border:[true,false,true,false],margin:[0,10,0,0]}],
                         [{text:"This is to inform you that, if you are applying for Policy Cancellation refund. ",border:[true,false,true,false],margin:[0,10,0,0]}],
                         [{text:"Please take the necessary action",margin:[0,10,0,0],border:[true,false,true,false]}],
                               [	{
                 alignment: 'justify',
                 border:[true,false,true,false],
                 margin:[0,10,0,0],
                 columns: [
                   {
                     text: ''
                   },
                   {
                     text: 'Sign:'
                   }
                 ]
               },
               ],

               [{
                 alignment: 'justify',
                 border:[true,false,true,false],
                 margin:[0,10,0,0],
                 columns: [
                   {
                     text: ''
                   },
                   {
                     text: `Date: ${moment(new Date()).format("DD/MM/YYYY, h:mm a")}`
                   }
                 ]
               }]
               ,
                               [{text:"* Kindly Acknowlege the Same",margin:[0,10,0,10], border:[true,false,true,true]}]
                   ]
                 }
               }
             ],
             styles: PDFSTYLE.styles,
             undertakingTable: {
               margin: [0, 0, 0, 10],
             },
             undertakingHeader: {
               fontSize: 18,
                 bold:true,
                 alignment:"center"
             },
         }
         if (!type) {
           pdfMake.createPdf(docDefinition).download(pdfName);
         } else {
           const customerDetails = {
             customerEmail: interactionForPdf['dynamicProperties_customerEmail'],
             customerName: interactionForPdf['dynamicProperties_customerName'],
             attachmentFor: 'Policy Cancellation Letter',
             attachmentName: pdfName
           };
           const pdfDocGenerator = pdfMake.createPdf(docDefinition);
           pdfDocGenerator.getBase64(async data => {
             let payload = {
               attachment: data,
               customerDetails
             }
             let emailAttachment = await axios.put(`${CONSTANTS.API_URL}/api/v1/sendEmailWithAttachment`, payload);
             if (emailAttachment.data === 200) {
               toastr.success('Policy Cancellation Letter email sent sucessfully');
             }
           });
         }
         // pdfMake.createPdf(docDefinition).download(pdfName);
   }
  function DownloadUndertakingForSpecialNumber() {

        let pdfName = "KH_UNDERTAKING_FOR_SPECIAL_NUMBER" + ".pdf"
        let docDefinition = {
            pageSize: 'A4',
            pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
            pageMargins: PDFSTYLE.pageSetup.pageMargins,
            background: function (page) {
                if(page > 1)
                return {

                        columns: [
                          { image:hyundai, width: 600, height:1000},
                        ]
                };
            },
            footer(currentPage, pageCount,page) {
              if(page > 1)
                return {
                    style: "pageFooter",
                    columns: [
                        {
                          text: [{ text: `Generated by ${userInfo && userInfo.displayName ? userInfo.displayName : ""}, ${userInfo && userInfo.userBranchName ? userInfo.userBranchName : ""} , ${moment(new Date()).format("DD/MM/YYYY, h:mm a")},  ${currentRow && currentRow.caseID ? currentRow.caseID : ""}`,width:"*" ,alignment:"left"}]
                        },

                        { text: currentPage.toString() + " of " + pageCount, alignment: "right" }
                    ]
                }
            },
            content: [
              {
                style: 'undertakingTable',
                table: {
                    widths: ['*'],
                  body: [
                    [{text:'UNDERTAKING FOR SPECIAL NUMBER', style:"undertakingHeader"}],
                    [
                              {
                                text: `Date: ${moment(new Date()).format("DD/MM/YYYY")}`,
                                alignment:"right",
                                border:[true,false,true,false]
                              }
                            ],
                    [{text:'To,', margin:[0,30,0,0],border:[true,false,true,false]}],
                    [{text:`Dear ${interactionForPdf['dynamicProperties_customerName']}`,border:[true,false,true,false]}],
                    [{text:"Subject: Undertaking for Special Number",bold:true,border:[true,false,true,false],margin:[0,10,0,0]}],
                        [{text:"This is to inform you that, if you are applying for special Registration No form R.T.O. You are requested to produce the Special No. Receipt before registration of your car. None of the car would be delivered  without registration for any purpose and without registration No. Also Dealership will be not responsible for any special / Specific R.T.O. Registration No.",border:[true,false,true,false],margin:[0,10,0,0]}],
                        [{text:"Please take note of this before booking this vehicle",margin:[0,10,0,0],border:[true,false,true,false]}],
                              [	{
                alignment: 'justify',
                border:[true,false,true,false],
                margin:[0,10,0,0],
                columns: [
                  {
                    text: ''
                  },
                  {
                    text: 'Sign:'
                  }
                ]
              },
              ],

              [{
                alignment: 'justify',
                border:[true,false,true,false],
                margin:[0,10,0,0],
                columns: [
                  {
                    text: ''
                  },
                  {
                    text: `Date: ${moment(new Date()).format("DD/MM/YYYY, h:mm a")}`
                  }
                ]
              }]
              ,
                              [{text:"* Kindly Acknowlege the Same",margin:[0,10,0,10], border:[true,false,true,true]}]
                  ]
                }
              }
            ],
            styles: PDFSTYLE.styles,
            undertakingTable: {
              margin: [0, 0, 0, 10],
            },
            undertakingHeader: {
              fontSize: 18,
                bold:true,
                alignment:"center"
            },
        }
        pdfMake.createPdf(docDefinition).open()
        // pdfMake.createPdf(docDefinition).download(pdfName);
  }
  function DownloadUndertakingForNewCarInsurance() {

    let pdfName = "KH_UNDERTAKING_FOR_NEW_CAR_INSURANCE" + ".pdf"
    let docDefinition = {
        pageSize: 'A4',
        pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
        pageMargins: PDFSTYLE.pageSetup.pageMargins,
        background: function (page) {
            if(page > 1)
            return {

                    columns: [
                      { image:hyundai, width: 600, height:1000},
                    ]
            };
        },
        footer(currentPage, pageCount,page) {
          if(page > 1)
            return {
                style: "pageFooter",
                columns: [
                  {
                    text: [{ text: `Generated by ${userInfo && userInfo.displayName ? userInfo.displayName : ""}, ${userInfo && userInfo.userBranchName ? userInfo.userBranchName : ""} , ${moment(new Date()).format("DD/MM/YYYY, h:mm a")},  ${currentRow && currentRow.caseID ? currentRow.caseID : ""}`,width:"*" ,alignment:"left"}]
                  },

                    { text: currentPage.toString() + " of " + pageCount, alignment: "right" }
                ]
            }
        },
        content: [
          {
            style: 'undertakingTable',
            table: {
                widths: ['*'],
              body: [
                [{text:'UNDERTAKING FOR NEW CAR INSURANCE', style:"undertakingHeader"}],
                [
                          {
                            text: `Date: ${moment(new Date()).format("DD/MM/YYYY")}`,
                            alignment:"right",
                            border:[true,false,true,false]
                          }
                        ],
                [{text:'To,', margin:[0,30,0,0],border:[true,false,true,false]}],
                [{text:"KOTHARI CARS PVT LTD",border:[true,false,true,false]}],
                [{text:"Subject: Hyundai New Car Insurance Policy With Addon Features",bold:true,border:[true,false,true,false],margin:[0,10,0,0]}],
                          [{
                              border:[true,false,true,false],
                              margin:[0,10,0,0],
                        ol: [
                          `I am going for Hyundai new car insurance policy which includes "0%" Depreciation Insurance + Consumbles + Key Protection + Personal Belongings covered. For which I am ready to pay ${getFormattedAmount(Number(interactionForPdf['dynamicProperties_insuranceCalculated']))}. I am interested going for RTI/ENGINE PROTECTION covered under Insurance for which I am ready to pay Additional ${getFormattedAmount(Number(interactionForPdf['dynamicProperties_additionalPremiumForRTI']) + Number(interactionForPdf['dynamicProperties_additionalPremiumForEngineProtection']))}`
                        ]
                      }],
                          [	{
            alignment: 'justify',
            border:[true,false,true,false],
            margin:[0,10,0,0],
            columns: [
              {
                text: `${interactionForPdf['dynamicProperties_customerName']}`
              },
              {
                text: 'Sign:'
              }
            ]
          },
          ],

          [{
            alignment: 'justify',
            border:[true,false,true,false],
            margin:[0,10,0,0],
            columns: [
              {
                text: ''
              },
              {
                text: `Date: ${moment(new Date()).format("DD/MM/YYYY, h:mm a")}`
              }
            ]
          }]
          ,
                          [{text:"* Kindly Acknowlege the Same",margin:[0,10,0,10], border:[true,false,true,true]}]
              ]
            }
          }
        ],
        styles: PDFSTYLE.styles,
        undertakingTable: {
          margin: [0, 0, 0, 10],
        },
        undertakingHeader: {
          fontSize: 18,
            bold:true,
            alignment:"center"
        },
    }
    pdfMake.createPdf(docDefinition).open()
    // pdfMake.createPdf(docDefinition).download(pdfName);
  }
  function DownloadUndertakingForPriceChangeConfirmation() {

  let pdfName = "KH_UNDERTAKING_FOR_PRICE_CHANGE_CONFIRMATION" + ".pdf"
  let docDefinition = {
      pageSize: 'A4',
      pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
      pageMargins: PDFSTYLE.pageSetup.pageMargins,
      background: function (page) {
          if(page > 1)
          return {

                  columns: [
                    { image:hyundai, width: 600, height:1000},
                  ]
          };
      },
      footer(currentPage, pageCount,page) {
        if(page > 1)
          return {
              style: "pageFooter",
              columns: [
                {
                  text: [{ text: `Generated by ${userInfo && userInfo.displayName ? userInfo.displayName : ""}, ${userInfo && userInfo.userBranchName ? userInfo.userBranchName : ""} , ${moment(new Date()).format("DD/MM/YYYY, h:mm a")},  ${currentRow && currentRow.caseID ? currentRow.caseID : ""}`,width:"*" ,alignment:"left"}]
                },

                  { text: currentPage.toString() + " of " + pageCount, alignment: "right" }
              ]
          }
      },
      content: [
        {
          style: 'undertakingTable',
          table: {
              widths: ['*'],
            body: [
              [{text:'UNDERTAKING FOR PRICE CHANGE CONFIRMATION', style:"undertakingHeader"}],
              [
                        {
                          text: `Date: ${moment(new Date()).format("DD/MM/YYYY")}`,
                          alignment:"right",
                          border:[true,false,true,false]
                        }
                      ],
              [{text:'To,', margin:[0,30,0,0],border:[true,false,true,false]}],
              [{text:`Dear ${interactionForPdf['dynamicProperties_customerName']}`,border:[true,false,true,false]}],
              [{text:"Subject: Undertaking for Price Change Confirmation",bold:true,border:[true,false,true,false],margin:[0,10,0,0]}],
                  [{text:`Note: The prices mentioned are subject to change without prior notice & will be charged as applicable. Price and scheme(s) will be applicable at the time of delivery. As per the company norms, in such circumstances I will not cancel my booking with you. I am ready to wait for ${interactionForPdf['dynamicProperties_selectedModelName']} for ${interactionForPdf['dynamicProperties_waitingPeriodMin']} to ${interactionForPdf['dynamicProperties_waitingPeriodMax']} days.`,border:[true,false,true,false],margin:[0,10,0,0]}],
                        [	{
          alignment: 'justify',
          border:[true,false,true,false],
          margin:[0,10,0,0],
          columns: [
            {
              text: `Sales Consultant: ${interactionForPdf['dynamicProperties_salesConsultant']}`
            },
            {
              text: 'Sign:'
            }
          ]
        },
        ],

        [{
          alignment: 'justify',
          border:[true,false,true,false],
          margin:[0,10,0,0],
          columns: [
            {
              text: `Date: ${moment(new Date()).format("DD/MM/YYYY, h:mm a")}`
            },
            {
              text: `Date: ${moment(new Date()).format("DD/MM/YYYY, h:mm a")}`
            }
          ]
        }]
        ,
                        [{text:"* Kindly Acknowlege the Same",margin:[0,10,0,10], border:[true,false,true,true]}]
            ]
          }
        },
      ],
      styles: PDFSTYLE.styles,
      undertakingTable: {
        margin: [0, 0, 0, 10],
      },
      undertakingHeader: {
        fontSize: 18,
          bold:true,
          alignment:"center"
      },
  }
  pdfMake.createPdf(docDefinition).open()
  // pdfMake.createPdf(docDefinition).download(pdfName);
  }

  function groupBy(arr, n) {
    var group = [];
    for (var i = 0, end = arr.length / n; i < end; ++i)
      group.push(arr.slice(i * n, (i + 1) * n));
    return group;
  }

  // modified by Vihang
  // modified at 18 May 2022
  // modification: Finance QUOTATION pdf created

  {/*   modified by Vihang
     modified on 26/05/2022
     modification: Finance quoatation pdf spacing issues fixed
 */}
  async function DownloadFinanceQuotation() {
    console.log("interactionObj",interactionObj);
    let FinanceQuotation = await axios.get(`${CONSTANTS.API_URL}/api/v1/financeQuotation?interactionID=${currentRow.interactionID}&typeOfQuotation=valid`);
    console.log("FinanceQuotationFinanceQuotation",FinanceQuotation);
    let FinanceOptions;

    let tableDataArray = [];
    let n = 3;

    if (FinanceQuotation.data.length) {
      setFinanceQuotation(FinanceQuotation.data[0]);
      console.log(FinanceQuotation.data,'FinanceQuotation.data[0]FinanceQuotation.data[0]FinanceQuotation.data[0]');
      FinanceOptions = await axios.get(`${CONSTANTS.API_URL}/api/v1/financeOptions?financeQuotationID=${FinanceQuotation.data[0]['uuid']}`);
      console.log("FinanceOptionsFinanceOptions",FinanceOptions);
      if (FinanceOptions.data.length) {

        let FinanceData = await groupBy(FinanceOptions.data, n  )
        console.log(FinanceData,'FinanceDataFinanceDataFinanceData');
        setFinanceOptions(FinanceOptions.data)
        await Promise.all( FinanceData.map(async (element, index) => {
          let array = [];
          let widths = []
          if (element.length === 1) {
            widths = [10,"*",300];
          }if (element.length === 2) {
            widths = [10,"*",150, 150];
          }if (element.length === 3) {
            widths = [10,"*",100, 100, 100];
          }

          let tableObject = {
            style: 'tableExample',
            border:[true,false,true,false],
            table: {
                // headerRows: 1,
                widths,
              body: []
            }
          };
          // let tableHead = [{text:"",bold:true,border:[false,true,true,true],colSpan:2,margin:[0,5,0,5]},
          // {text:"",bold:true,margin:[0,5,0,5]},
          // ]

          let tableHead = []
          if (index === 1) {
            tableHead.push({text:"",bold:true, pageBreak:'before', border:[false,true,true,true],colSpan:2,margin:[0,5,0,5]});
            tableHead.push({text:"", pageBreak:'before', bold:true,margin:[0,5,0,5]});
          } else {
            tableHead.push({text:"",bold:true,border:[false,true,true,true],colSpan:2,margin:[0,5,0,5]});
            tableHead.push({text:"",bold:true,margin:[0,5,0,5]});
          }
          let rowA = [{text:"A]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},{text:"On Road Price",bold:true,margin:[0,5,0,5]},
          ]
          let rowB = [{text:"B]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},
          {text:"Ex-Showroom/Ex-Depot Price",bold:true,margin:[0,5,0,5]},];

          let rowC = [{text:"C]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},{text:"Amount Financed",bold:true,margin:[0,5,0,5]},]

          let rowD = [{text:"D]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},{text:"Initial Payment",bold:true,margin:[0,5,0,5]}]

          let rowE = [{text:"E]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},{text:"EMI (Equated Monthly Installment)",bold:true,margin:[0,5,0,5]}]

          let rowF = [{text:"F]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},{text:"Stamp Duty",bold:true,margin:[0,5,0,5]}]

          let rowG = [{text:"G]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},{text:"Processing Fees",bold:true,margin:[0,5,0,5]}]

          let rowH = [{text:"H]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},{text:"Total Down Payment",bold:true,margin:[0,5,0,5]}]

          let rowI = [{text:"I]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},{text:"Tenure (Months)",bold:true,margin:[0,5,0,5]}]

          await Promise.all( element.map(async (item, idx) => {

              // tableHead.push({text:`OPTION ${idx + 1}`,bold:true,margin:[0,5,0,5],alignment:"center"})
              // tableObject['table']['body'].push(tableHead);

              if (index > 0) {
                tableHead.push({text:`OPTION ${(idx + 1) + (index * n)}`,pageBreak:'before', bold:true,margin:[0,5,0,5],alignment:"center"})
                tableObject['table']['body'].push(tableHead);

              } else {
                tableHead.push({text:`OPTION ${(idx + 1) + (index * n)}`,bold:true,margin:[0,5,0,5],alignment:"center"})
                tableObject['table']['body'].push(tableHead);

              }

              rowA.push({text:`${getFormattedAmount(item['onRoadPrice'])}`,bold:true,margin:[0,5,0,5]})
              tableObject['table']['body'].push(rowA);


              rowB.push({text:`${getFormattedAmount(item['exShowroomPrice'])}`,bold:true,margin:[0,5,0,5]})
              tableObject['table']['body'].push(rowB);


              rowC.push({text:`${getFormattedAmount(item['amountFinanced'])}`,bold:true,margin:[0,5,0,5]})
              tableObject['table']['body'].push(rowC);


              rowD.push({text:`${getFormattedAmount(item['initialPayment'])}`,bold:true,margin:[0,5,0,5]})
              tableObject['table']['body'].push(rowD);


              rowE.push({text:`${getFormattedAmount(item['emi'])}`,bold:true,margin:[0,5,0,5]})
              tableObject['table']['body'].push(rowE);


              rowF.push({text:`${getFormattedAmount(item['stampDuty'])}`,bold:true,margin:[0,5,0,5]})
              tableObject['table']['body'].push(rowF);


              rowG.push({text:`${getFormattedAmount(item['processingFees'])}`,bold:true,margin:[0,5,0,5]})
              tableObject['table']['body'].push(rowG);


              rowH.push({text:`${getFormattedAmount(item['totalDownPayment'])}`,bold:true,margin:[0,5,0,5]})
              tableObject['table']['body'].push(rowH);



              rowI.push({text:`${item['tenure']}`,bold:true,margin:[0,5,0,5]})
              tableObject['table']['body'].push(rowI);

          }))
          tableObject.table.body.splice(0, tableObject.table.body.length - 10);
          array.push(tableObject)

          tableDataArray.push(array)
          // let tableHead = [{text:"",bold:true,border:[false,true,true,true],colSpan:2,margin:[0,5,0,5]},
          // {text:"",bold:true,margin:[0,5,0,5]},
          // {text:`OPTION ${index + 1}`,bold:true,margin:[0,5,0,5],alignment:"center"},
          // {text:"OPTION 2",bold:true,margin:[0,5,0,5],alignment:"center"},
          // {text:"OPTION 3",bold:true ,margin:[0,5,0,5],alignment:"center",border:[true,true,false,true]}]
          // tableObject['table']['body'].push(tableHead);

          // let rowA = [{text:"A]",border:[false,true,true,true],bold:true,margin:[0,5,0,5],alignment:"center"},{text:"On Road Price",bold:true,margin:[0,5,0,5]},{text:`${getFormattedAmount(FinanceOptions.data[0]['onRoadPrice'])}`,bold:true,margin:[0,5,0,5]},{text:"₹99999999",bold:true,margin:[0,5,0,5]},{text:"₹999999",bold:true,margin:[0,5,0,5],border:[true,true,false,true]}]
          // tableObject['table']['body'].push(rowA);


        }))
        console.log(tableDataArray,'tableDataArraytableDataArraytableDataArray');


      }
    }
    let pdfName = "KAF_Quotation" + ".pdf";
    let docDefinition = {
      pageSize: 'A4',
      pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
      pageMargins: [ 20, 30, 20, 30 ],
      watermark: { text: 'Kothari Auto Finance', opacity: 0.15 },
      content: [
        {
    fontSize:10,
    layout:{
        paddingLeft: function(i, node) { return 0; },
       paddingRight: function(i, node) { return 0; },
       paddingTop: function(i, node) { return 0; },
       paddingBottom: function(i, node) { return 0; },
    },
    table: {
              widths:["*"],

      body: [
        [
              {
                  margin:[5,5,5,5],
                  alignment: 'justify',
                  columns: [
                    {
                            image: financeKothariLogo,
                            width: 60
                          },
                  {
                    text: "KOTHARI AUTO FINANCE",
                    margin:[110,10,0,0],
                    bold:true,
                    fontSize:18,
                    width:"*"
                  }
                ]
            }
        ],
        [
            {
                  border:[true,false,true,false],
                  margin:[5,10,5,10],
                  columns: [
                              {
                                text: 'Tilak Road:',width:70,bold:true
                              },
                              {
                                text: '458/284, Sadashiv Peth, Tilak Road, Pune-411 030 Tol: 020 30118500 \nFax: (020) 2433 7503 E-mail: finance@kotharthyundal.co.inn'
                              },
                 ]
            }
        ],
        [
              {
                  border:[true,false,true,false],
                   margin:[5,0,5,5],
                    columns: [
                                {
                                  text: 'Shankarsheth Road:',width:70,bold:true
                                },
                                {
                                  text: 'CTS No. 45/1B/A Shankarsheth Road, Next to Kumar Pacific Mall,Gultekdi,Pune 411037 Ph No : 020-24338600'
                                },
                    ]
              }
      ],
        [
              {
                  border:[true,false,true,false],
                   margin:[5,0,5,5],
                    columns: [
                                {
                                  text: 'Kharadi:',width:70,bold:true
                                },
                                {
                                  text: 'Plot No. 13/1A, Mundhwa-Kharadi Bypass, Kharadi, Pune - 411014. Sales Ph: 020-27071100, Service Ph.: 020-27071125'
                                },
                    ]
              }
      ],
      [
        {
            border:[true,false,true,false],
             margin:[5,0,5,5],
              columns: [
                          {
                            text: 'Aundh:',width:70,bold:true
                          },
                          {
                            text: "1, Sylvan Heights, A, Opp. Hotel Seasons Apartment, Sanewadi, Aundh, Pune- 07 Ph. 020-27702770"
                          },
             ]
        }
    ],
    [{text:"FINANCE QUOTATION",alignment:"center",fontSize:16,bold:true,margin:[0,10,0,10],decoration:"underline"}],
            [
              {
                                 margin:[5,5,5,5],
                                    style: 'tableExample',
                                    layout: 'noBorders',
                                    table: {
                                        widths:[60,"*"],
                                      body: [
                                          [{text:"DATE",bold:true},{text:`: ${formatDateTime(FinanceQuotation.data[0].quotationDate)}`}]
                                      ]
                                    }
                                  }
            ],
                 [
                   {
                      margin:[5,5,5,5],
                                    style: 'tableExample',
                                    layout: 'noBorders',
                                    table: {
                                        widths:[60,"*"],
                                      body: [
                                          [{text:"NAME",bold:true},{text:`: ${FinanceQuotation.data[0]['customerName']}`}]
                                      ]
                                    }
                            }

                ],
                 [               {
                      margin:[5,5,5,5],
                                    style: 'tableExample',
                                    layout: 'noBorders',
                                    table: {
                                        widths:[60,"*"],
                                      body: [
                                          [{text:"ADDRESS",bold:true},{text:`: ${FinanceQuotation.data[0]['customerAddress']}`}]
                                      ]
                                    }
                                  }

                ],
                 [               {
                      margin:[5,5,5,5],
                                    style: 'tableExample',
                                    layout: 'noBorders',
                                    table: {
                                        widths:[60,"*"],
                                      body: [
                                          [{text:"Mobile. No",bold:true},{text:`: ${FinanceQuotation.data[0]['customerMobile']}`}]
                                      ]
                                    }
                                  }

                ],
                 [               {
                      margin:[5,5,5,5],
                                    style: 'tableExample',
                                    layout: 'noBorders',
                                    table: {
                                        widths:[60,"*"],
                                      body: [
                                          [{text:"MODEL",bold:true},{text:`: ${FinanceQuotation.data[0]['modelName'].charAt(0).toUpperCase() + FinanceQuotation.data[0]['modelName'].slice(1)}`}]
                                      ]
                                    }
                                  }

                ],
                [               {
                     margin:[5,5,5,5],
                     border:[true,false,true,false],

                                    style: 'tableExample',
                                    layout: 'noBorders',
                                    table: {
                                        widths:[60,"*"],
                                      body: [
                                          [{text:"COLOUR",bold:true},{text:`: ${FinanceQuotation.data[0]['color'].charAt(0).toUpperCase() + FinanceQuotation.data[0]['color'].slice(1)}`}]
                                      ]
                                    }
                                  }

                ],
                ...tableDataArray,

                 [               {
                     text:"*CREDIT WILL BE AT SOLE DISCRETION OF FINANCE COMPANY/ BANK DOCUMENTS REQUIRED.",
                     bold:true,
                     margin:[5,5,5,2],
                     border:[true,false,true,false]
                                  }

                ],
                  [               {
                     text:"DOCUMENTS REQUIRED",
                     bold:true,
                     fontSize:12,
                     margin:[20,0,5,30],
                     border:[true,false,true,false]

                                  }

                ],
                 [               {
                   border:[true,false,true,false],

                                    style: 'tableExample',
                                    table: {

                                                headerRows: 1,

                                        widths:["*","*"],
                                      body: [
                                          [{text:"Name",bold:true,border:[false,true,true,true]},{text:"Tel No",bold:true,border:[true,true,false,true]}],
                                                  [{text:"",margin:[0,0,0,30],border:[false,true,true,true]},{text:"",border:[true,true,false,true]}],


                                      ]
                                    }
                                  }

                ],


      ]
    }
  },
  ]

  }
   pdfMake.createPdf(docDefinition).open();
}

    async function setNextTask(nextTask) {
      await setItem("currentRowID", nextTask);
      console.log("ggggggggggggggggggggggg",getItem("currentRowID"));
      props.toggleTaskEdit(currentRow, nextTask);
      // setTimeout(() => {
      //   window.location.reload();
      // },1000)
    }

    {/*
            modified by Vihang
            modified at 04/05/2022
            modification : responsive changes for semidetail view
      */}
  async function getSelectedTypeUserList(value) {
    currentRow['dynamicProperties_testDriveApprovalRole'] = value;
    interactionObj['dynamicProperties_testDriveApprovalRole'] = value;
    setIsFormUpdated(true);
    let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/userorganizations?dealershipIDs=${userInfo.dealership}&designation=${value}&branchIDs=${userInfo.userBranchID}`);
    // let userList = response.data.filter((user) => user.roleName === value)
    await setAssignUserList(response.data)
  }

  async function toggleFinanceQuotationForm() {
    await setIsFinanceFormOpen(!isFinanceFormOpen);
    console.log(isFinanceFormOpen, 'isFinanceFormOpenisFinanceFormOpen');
    if (!isFinanceFormOpen) {
      let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/thirdParty?type=Bank`);
      setBankList(response.data);
    }
  }

  async function setSelectedBank(e) {
    let bankID = e.target.value;
    if (bankID) {
      let bankObj = bankList.find(bank => bank.uuid === bankID);
      await setSelectedBankObj(bankObj);
      let responseStamp = await axios.get(`${CONSTANTS.API_URL}/api/v1/thirdPartyConfig?thirdPartyID=${bankID}&typeOfConfig=stampDuty`);
      await setStampDutyList(responseStamp.data);
      console.log(responseStamp.data, 'responseStamp.dataresponseStamp.data');
      let responseProcessingFee = await axios.get(`${CONSTANTS.API_URL}/api/v1/thirdPartyConfig?thirdPartyID=${bankObj.uuid}&typeOfConfig=processingFee`);
      await setProcessingFeeList(responseProcessingFee.data);
      console.log(responseProcessingFee.data, 'responseProcessingFee.dataresponseProcessingFee.data');
    }
  }

  async function setSelectedStampDuty(e) {
    let stampDutyID = e.target.value;
    if (stampDutyID) {
      let stampDutyObject = stampDutyList.find(stampDuty => stampDuty.uuid === stampDutyID);
      await setStampDutyObj(stampDutyObject);
    } else {
      await setStampDutyObj({});
    }
  }

  async function setSelectedProcessingFee(e) {
    let processingFeeID = e.target.value;
    if (processingFeeID) {
      let processingFeeObject = processingFeeList.find(processingFee => processingFee.uuid === processingFeeID);
      await setProcessingFeeObj(processingFeeObject);
    } else {
      await setProcessingFeeObj({});
    }
  }

  async function setEMI(e) {
    let EMI = e.target.value;
    if (EMI) {
      await setEmi(EMI);
    } else {
      await setEmi(0);
    }
  }

  async function generateFinanceQuotationDefaultOption(e) {
    e.preventDefault();
    console.log('Well this worked!', currentTask.financeOptions);
    let payload = {
      taskID: currentRow.uuid,
      interactionID: currentRow.interactionID,
      customerName: interactionForPdf && interactionForPdf["dynamicProperties_customerName"] ? interactionForPdf["dynamicProperties_customerName"] : '',
      customerAddress: interactionForPdf && interactionForPdf && interactionForPdf["dynamicProperties_addressLine1"] && interactionForPdf["dynamicProperties_addressLine2"] && interactionForPdf["dynamicProperties_state"] && interactionForPdf["dynamicProperties_city"] && interactionForPdf["dynamicProperties_pincode"] ?  (interactionForPdf["dynamicProperties_addressLine1"] + " " + interactionForPdf["dynamicProperties_addressLine2"] + ", " +  interactionForPdf["dynamicProperties_state"] + ", " + interactionForPdf["dynamicProperties_city"] + ", " + interactionForPdf["dynamicProperties_pincode"]).charAt(0).toUpperCase() + (interactionForPdf["dynamicProperties_addressLine1"] + " " + interactionForPdf["dynamicProperties_addressLine2"] + ", " +  interactionForPdf["dynamicProperties_state"] + ", " + interactionForPdf["dynamicProperties_city"] + ", " + interactionForPdf["dynamicProperties_pincode"]).slice(1): "",
      customerMobile: interactionForPdf && interactionForPdf["dynamicProperties_mobile"] ? interactionForPdf["dynamicProperties_mobile"] : '',
      // modelID: currentRow.modelID,
      modelName: interactionForPdf && interactionForPdf["dynamicProperties_selectedModelName"] ?  interactionForPdf["dynamicProperties_selectedModelName"] : "",
      color: interactionForPdf && interactionForPdf["dynamicProperties_selectedColor"] ?  interactionForPdf["dynamicProperties_selectedColor"] : "",
      bankID: selectedBankObj.uuid,
      // onRoadPrice: interactionForPdf && interactionForPdf['dynamicProperties_onRoadPrice'] ? interactionForPdf['dynamicProperties_onRoadPrice'] : 0,
      exShowroomPrice: interactionForPdf && interactionForPdf['dynamicProperties_exShowroom'] ? interactionForPdf['dynamicProperties_exShowroom'] : 0,
      emi: emi ? emi : 0,
      tenure: numberOfYears ? (numberOfYears * 12): 60,
      selectedConfigIDForStampDuty: stampDutyObj.uuid,
      selectedConfigIDForProcessingFee: processingFeeObj.uuid,
      selectedModelID: interactionForPdf['dynamicProperties_selectedModel'],
      selectedVariantID: interactionForPdf['dynamicProperties_selectedVariant'],
      rateofInterest
    }
    if (currentTask.financeOptions && currentTask.financeOptions.length > 0) {
      payload['financeQuotationID'] = currentTask.financeQuotation.uuid;
      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/financeOptions`, payload);
      console.log(response.data, 'financeOptions');
      toastr.success('Option added in the Finance Quotation');
    } else {
      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/financeQuotation`, payload);
      console.log(response.data, 'responseeeeeeeeeeeeeee');
      toastr.success('Finance Quotation Generated With Default Option 1');
    }
    await setIsFinanceFormOpen(!isFinanceFormOpen);
    await setBankList([]);
    await setSelectedBankObj({});
    await setStampDutyList([]);
    await setProcessingFeeList([]);
    await setEmi(0);
    await setStampDutyObj({});
    await setProcessingFeeObj({});

  }

  /*
        modified by Vihang
        modified at 25/05/2022
        modification : reusable function to scroll the element to the bottom
  */
  function scrollToTheBottom(elementName) {
      let element = document.getElementById(elementName);
      // element.scrollTop = element.scrollHeight;
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth',
      })
  }

  return (
    <div>
      <div class="isMobile">
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
            <div class="overflow-hidden pos-relative h-full-vh">
              {
                props.currentRow && (props.currentRow.containerType !== "") && (
                  <div>
                    <div class='semi-detail-tags cursor-pointer m-t-0 p-t-10'>
                      <div class='row w-full'>
                        <div class="col-xs-1 p-l-0 p-r-0 display-flex align-center">
                         {!checklistItemSelected && (
                            <span onClick={(e)=> props.setShowSemiDetailView(false)}>
                              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 20 4 12 12 4 13.425 5.4 7.825 11H20V13H7.825L13.425 18.6Z"/></svg>
                            </span>
                          )}
                        </div>
                        <div class="col-xs-11 p-l-0">
                          <TaskListDetailHeader currentRow={props.currentRow} DownloadEnquiryForm={DownloadEnquiryForm} DownloadDocket={DownloadDocket} DownloadUndertakingForSpecialNumber={DownloadUndertakingForSpecialNumber} DownloadUndertakingForNewCarInsurance={DownloadUndertakingForNewCarInsurance} DownloadUndertakingForPriceChangeConfirmation={DownloadUndertakingForPriceChangeConfirmation} DownloadFinanceQuotation={DownloadFinanceQuotation} DownloadProformaInvoice={DownloadProformaInvoice}
                          taskCheckListItems={taskCheckListItems} answeredCount={answeredCount}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row w-full h-auto">
                      <div class="col-xs-12 p-l-0 display-flex">
                        <TaskListDetailTags currentRow={currentTask} typeOfWorkspace={props.typeOfWorkspace} />

                      </div>
                    </div>
                    {(props.currentRow && props.currentRow.containerType !== 'Checklist' && props.currentRow.containerType !== 'Select Cars') &&
  										<div class="Overviewworkshop col-xs-12 col-sm-12 col-md-12 col-lg-12">
  	                    <div class="row p-t-10 semi-detail-summary h-inherit overflow-y">
  	                      <div class="col-xs-12 p-l-0 p-r-0">
  	                        {props.currentRow && (props.currentRow.caseID || props.currentRow.uniqueID) && props.currentRow.displayName !== "Discount Approval" && (
  	                          <div class="col-xs-12 p-l-0 p-r-0">
  	                            <ListSingleCard interactionObj={interactionObj} taskData={props.currentRow} typeOfCard={'caseDetails'} caseIcon={<img src="/assets/images/folder.png" class="h-full w-full" />} stageIcon={<img src="/assets/images/folder.png" class="h-full w-full" />} />
  	                          </div>
  	                        )}
                            {props.currentRow && props.currentRow.displayName === "Handover Courier" && (
                                <div class="col-xs-12 p-l-0 p-r-0">
    	                            <ListSingleCard taskData={props.currentRow} typeOfCard={'courierDetails'} caseIcon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808080"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>} />
    	                          </div>
                            )}
                            {props.currentRow && props.currentRow.displayName === "Repair Request" && (
                                <div class="col-xs-12 p-l-0 p-r-0">
    	                            <ListSingleCard taskData={props.currentRow} notOkChecklistItems={notOkChecklistItems} typeOfCard={'repairRequest'} caseIcon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808080"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>} />
    	                          </div>
                            )}
                            {props.currentRow && props.currentRow.displayName === "Discount Approval" && (
                                <div class="col-xs-12 p-l-0 p-r-0">
    	                            <ListSingleCard taskData={currentRow} notOkChecklistItems={notOkChecklistItems} typeOfCard={'discountApproval'} caseIcon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808080"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>} />
    	                          </div>
                            )}
  	                        {/*
  	                          currentRow && currentRow.description && (
  	                            <p class='fs-14 f-w-500 first-letter-capital text-primary'>Dear {userDisplayName},<br />
  	                              {
  	                                currentRow.description.split('.').map((desc) => (
  	                                  <span class="f-w-400 text-secondary">{desc}{desc.length ? '.' : ''}<br /></span>
  	                                ))
  	                              }
  	                            </p>
  	                          )
  	                        }
  	                        {
  	                          currentRow && currentRow.customerName && (
  	                            <div>
  	                              <p class="m-t-10 text-capitalize fs-15 f-w-600 text-primary"><span>Customer Name: </span></p>
  	                              <p class="m-t-5 text-capitalize text-secondary">{currentRow && currentRow.customerName}</p>
  	                            </div>
  	                          )
  	                        }
  	                        {
  	                          currentRow && currentRow.selectedTestDriveCarID && (
  	                            <div>
  	                              <p class="m-t-10 text-capitalize fs-15 f-w-600"><span>Test drive map will be shown here</span></p>
  	                            </div>
  	                          )
  	                        */}
  	                      </div>
  	                    </div>
  	                    <div class="row semi-detail-footer">

                        {/*<button onClick={(e)=> DownloadEnquiryForm()}> DownloadEnquiryForm</button>
                        <button onClick={(e)=> DownloadCustomerFollowUp()}> DownloadCustomerFollowUp</button>
  	                      <div class="col-xs-12">
  	                        {currentRow && (currentRow.containerType === "Form and Approval" || currentRow.containerType === "Approval") ? (
  	                          <div>
  	                            <button class="primary-button m-t-20 m-l-20 float-right">Approve</button>
  	                            <button class="primary-button m-t-20 m-l-20 float-right">Submit for Approval</button>
  	                            <button class="primary-button m-t-20 m-l-20 float-right">Reject</button>
  	                          </div>
  	                        ) : (
  	                          <button onclick={(e) => toggleFormPopover(e)} class="primary-button m-t-20 m-b-20 float-right">{currentRow && currentRow.displayName}</button>
  	                        )}
  	                      </div>*/}
                          {/*
                                  modified by Vihang
                                  modified at 02/05/2022
                                  modification : getTaskCheckList passed  to the checklist component
                            */}

                          {
                            currentTask && (currentTask.assignedUserID === userInfo.uuid) && (
                              <div class="col-xs-12">
                                {
                                  currentTask && currentTask.status !== "Completed" && (!currentTask.incompleteTasks || currentTask.incompleteTasks.length === 0) && (
                                    <button onclick={(e) => toggleFormPopover(e)} class="primary-button m-t-20 m-b-20 float-right">{currentTask && currentTask.displayName}</button>
                                  )
                                }
                                {
                                  currentTask && currentTask.status === "Completed" && currentTask.nextTask && currentTask.nextTask.status.toLowerCase() !== "completed"  && (!currentTask.incompleteTasks || currentTask.incompleteTasks.length === 0) && (
                                    <button onclick={(e) => setNextTask(currentTask.nextTask)} class="primary-button m-t-20 m-b-20 float-right">{`Go to ` + currentTask.nextTask.displayName}</button>
                                  )
                                }

                                {
                                  currentTask && currentTask.status === "Completed" && currentTask.nextTask && currentTask.nextTask.status.toLowerCase() === "completed" && (!currentTask.incompleteTasks || currentTask.incompleteTasks.length === 0) && (
                                    <button onclick={(e) => toggleFormPopover(currentTask.nextTask)} class="primary-button m-t-20 m-b-20 float-right">{currentTask && currentTask.displayName}</button>
                                  )
                                }
                                {
                                  currentTask && currentTask.status === "Completed" && !currentTask.nextTask && (
                                    <button onclick={(e) => toggleFormPopover(e)} class="primary-button m-t-20 m-b-20 float-right">{currentTask.displayName}</button>
                                  )
                                }
                                {
                                  currentTask && !currentTask.areDependentTasksCompleted && currentTask.incompleteTasks && currentTask.incompleteTasks.length > 0 && currentTask.status !== "Completed" && (
                                    <button class="primary-button m-t-20 m-b-20 float-right">{currentTask && currentTask.displayName}</button>
                                  )
                                }
      	                      </div>
                            )
                          }

  	                    </div>
  	                    {/*<div class="row" style="overflow-y:auto">
  	                      <div class="col-xs-12">
  	                        <div class="p-r-15 p-t-10 p-b-20">
  	                          <div>
  	                            {
  	                              taskComments.map((item, index) => (
  	                                <div class="display-flex m-all">
  	                                  <div class="round_icons m-t-5 m-l-5 ">Test drive map will be shown here. Test drive map will be shown here Test drive map will be shown here
  	                                    <p class="fs-10">{getInitials(item.commentByName)}</p>
  	                                  </div>
  	                                  <div style="font-size:1em;">
  	                                    <p>
  	                                      {item.commentByName}
  	                                      <span class="p-l-20 fs-15">{moment(item.createdAt).fromNow()}</span>
  	                                    </p>
  	                                    <p>
  	                                      <span class='p-l-5' style='display: inline-flex;' id={'comment' + index}>{getTaskComment(item.comment, index)}</span>
  	                                    </p>
  	                                  </div>
  	                                </div>
  	                              ))
  	                            }
  	                          </div>
  	                        </div>
  	                      </div>
  	                    </div>
  	                    <ChatComment onHandleEditorComment={(comment) => handleEditorComment(comment, 'task')} selectedTask={currentRow} />*/}
  	                  </div>
  									}

                  {/*
                          modified by Vihang
                          modified at 02/05/2022
                          modification : getTaskCheckList passed  to the checklist component
                    */}

  									{
  			              props.currentRow && props.currentRow.containerType === "Checklist" && (
  			                <ChecklistComponent
                        setChecklistItemSelected={setChecklistItemSelected}
                        getTaskCheckList={getTaskCheckList} triggerNotifications={props.triggerNotifications} taskCheckListItems={taskCheckListItems} currentRow={currentTask} totalTaskCheckListItemsProgress={totalTaskCheckListItemsProgress} answeredCount={answeredCount} setNextTask={setNextTask}/>
  			              )
  			            }
  			            {
  			              props.currentRow && props.currentRow.containerType === "Select Cars" && (
  			                <SelectCar triggerNotifications={props.triggerNotifications} taskCheckListItems={taskCheckListItems} currentRow={currentTask} totalTaskCheckListItemsProgress={totalTaskCheckListItemsProgress} />
  			              )
  			            }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div class="isDesktop">
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
            <div class="overflow-hidden pos-relative h-full-vh">
              {
                currentRow && (currentRow.containerType !== "") && (
                  <div>
                    <div class='semi-detail-tags cursor-pointer m-t-0 p-t-10'>
                      <div class='row w-full'>
                        <div class="col-xs-12 p-l-0">
                          <TaskListDetailHeader currentRow={currentRow} DownloadEnquiryForm={DownloadEnquiryForm} DownloadPolicyCancellation={DownloadPolicyCancellation} DownloadDocket={DownloadDocket} DownloadUndertakingForSpecialNumber={DownloadUndertakingForSpecialNumber} DownloadUndertakingForNewCarInsurance={DownloadUndertakingForNewCarInsurance} DownloadUndertakingForPriceChangeConfirmation={DownloadUndertakingForPriceChangeConfirmation} DownloadFinanceQuotation={DownloadFinanceQuotation} DownloadProformaInvoice={DownloadProformaInvoice}/>
                        </div>
                      </div>
                    </div>
                    <div class="row w-full h-auto">
                      <div class="col-xs-12 p-l-0 display-flex">
                        <TaskListDetailTags currentRow={currentTask} typeOfWorkspace={props.typeOfWorkspace} />

                      </div>
                    </div>
                    {(currentRow && currentRow.containerType !== 'Checklist' && currentRow.containerType !== 'Select Cars') &&
                      <div class="Overviewworkshop col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="row p-t-10 semi-detail-summary">
                          <div class="col-xs-12 p-l-0 p-r-0">
                            <div class="row">
                              <div class="col-xs-12 p-l-0 p-r-0">
                                <span class="TaskListDetailHeaderDisplayName is-hide-mobile"> {props.currentRow.displayName}</span>
                                  {props.currentRow.description &&
                                    <div class="tooltip-box tooltip m-l-5 is-hide-mobile">
                                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#6c6c6c"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                      <span class="tooltiptext fs-12">{props.currentRow.description}</span>
                                    </div>
                                  }
                                  </div>
                            </div>
                            {currentRow && (currentRow.caseID || currentRow.uniqueID) && currentRow.displayName !== "Discount Approval" && (
                              <div class="col-xs-12 p-l-0 p-r-0">
                                <ListSingleCard interactionObj={interactionObj} taskData={currentRow} typeOfCard={'caseDetails'} caseIcon={<img src="/assets/images/folder.png" class="h-full w-full" />} stageIcon={<img src="/assets/images/folder.png" class="h-full w-full" />} />
                              </div>
                            )}
                            {currentRow && currentRow.displayName === "Handover Courier" && (
                                <div class="col-xs-12 p-l-0 p-r-0">
                                  <ListSingleCard taskData={currentRow} typeOfCard={'courierDetails'} caseIcon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808080"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>} />
                                </div>
                            )}
                            {currentRow && currentRow.displayName === "Repair Request" && (
                                <div class="col-xs-12 p-l-0 p-r-0">
                                  <ListSingleCard taskData={currentRow} notOkChecklistItems={notOkChecklistItems} typeOfCard={'repairRequest'} caseIcon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808080"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>} />
                                </div>
                            )}
                            {currentRow && currentRow.displayName === "Discount Approval" && (
                                <div class="col-xs-12 p-l-0 p-r-0">
                                  <ListSingleCard taskData={currentRow} notOkChecklistItems={notOkChecklistItems} typeOfCard={'discountApproval'} caseIcon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808080"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>} />
                                </div>
                            )}
                            {/*
                              currentRow && currentRow.description && (
                                <p class='fs-14 f-w-500 first-letter-capital text-primary'>Dear {userDisplayName},<br />
                                  {
                                    currentRow.description.split('.').map((desc) => (
                                      <span class="f-w-400 text-secondary">{desc}{desc.length ? '.' : ''}<br /></span>
                                    ))
                                  }
                                </p>
                              )
                            }
                            {
                              currentRow && currentRow.customerName && (
                                <div>
                                  <p class="m-t-10 text-capitalize fs-15 f-w-600 text-primary"><span>Customer Name: </span></p>
                                  <p class="m-t-5 text-capitalize text-secondary">{currentRow && currentRow.customerName}</p>
                                </div>
                              )
                            }
                            {
                              currentRow && currentRow.selectedTestDriveCarID && (
                                <div>
                                  <p class="m-t-10 text-capitalize fs-15 f-w-600"><span>Test drive map will be shown here</span></p>
                                </div>
                              )
                            */}
                          </div>
                        </div>
                        <div class="row semi-detail-footer">

                        {/*<button onClick={(e)=> DownloadEnquiryForm()}> DownloadEnquiryForm</button>
                        <button onClick={(e)=> DownloadCustomerFollowUp()}> DownloadCustomerFollowUp</button>
                          <div class="col-xs-12">
                            {currentRow && (currentRow.containerType === "Form and Approval" || currentRow.containerType === "Approval") ? (
                              <div>
                                <button class="primary-button m-t-20 m-l-20 float-right">Approve</button>
                                <button class="primary-button m-t-20 m-l-20 float-right">Submit for Approval</button>
                                <button class="primary-button m-t-20 m-l-20 float-right">Reject</button>
                              </div>
                            ) : (
                              <button onclick={(e) => toggleFormPopover(e)} class="primary-button m-t-20 m-b-20 float-right">{currentRow && currentRow.displayName}</button>
                            )}
                          </div>*/}
                          {/*
                                  modified by Vihang
                                  modified at 13/05/2022
                                  modification : incompleteTasks exists validation added
                            */}

                          {
                            currentTask && (currentTask.assignedUserID === userInfo.uuid) && (
                              <div class="col-xs-12">
                                {
                                  currentTask && currentTask.status !== "Completed" && (!currentTask.incompleteTasks || currentTask.incompleteTasks.length === 0) && (
                                    <button onclick={(e) => toggleFormPopover(e)} class="primary-button m-t-20 m-b-20 float-right">{currentTask && currentTask.displayName}</button>
                                  )
                                }
                                {
                                  currentTask && currentTask.displayName === 'Finance Enquiry' && (!currentTask.incompleteTasks || currentTask.incompleteTasks.length === 0) && (
                                    <button onclick={(e) => toggleFinanceQuotationForm(e)} class="primary-button m-t-20 m-b-20 m-l-5 float-right">{(currentTask.financeOptions && currentTask.financeOptions.length === 0) ? 'Generate Finance Quotation' : 'Add Finance Options'}</button>
                                  )
                                }
                                {
                                  currentTask && currentTask.status === "Completed" && currentTask.nextTask && currentTask.nextTask.status.toLowerCase() !== "completed" && (!currentTask.incompleteTasks || currentTask.incompleteTasks.length === 0) && (
                                    <button onclick={(e) => setNextTask(currentTask.nextTask)} class="primary-button m-t-20 m-b-20 float-right">{`Go to ` + currentTask.nextTask.displayName}</button>
                                  )
                                }
                                {
                                  currentTask && currentTask.status === "Completed" && currentTask.nextTask && currentTask.nextTask.status.toLowerCase() === "completed" && (!currentTask.incompleteTasks || currentTask.incompleteTasks.length === 0) && (
                                    <button onclick={(e) => toggleFormPopover(currentTask.nextTask)} class="primary-button m-t-20 m-b-20 float-right">{currentTask && currentTask.displayName}</button>
                                  )
                                }
                                {
                                  currentTask && currentTask.status === "Completed" && !currentTask.nextTask && (
                                    <button onclick={(e) => toggleFormPopover(e)} class="primary-button m-t-20 m-b-20 float-right">{currentTask.displayName}</button>
                                  )
                                }
                                {
                                  currentTask && !currentTask.areDependentTasksCompleted && currentTask.incompleteTasks && currentTask.incompleteTasks.length > 0 && currentTask.status !== "Completed" && (
                                    <button class="primary-button m-t-20 m-b-20 float-right">{currentTask && currentTask.displayName}</button>
                                  )
                                }
      	                      </div>
                            )
                          }
                        </div>
                        {/*<div class="row" style="overflow-y:auto">
                          <div class="col-xs-12">
                            <div class="p-r-15 p-t-10 p-b-20">
                              <div>
                                {
                                  taskComments.map((item, index) => (
                                    <div class="display-flex m-all">
                                      <div class="round_icons m-t-5 m-l-5 ">Test drive map will be shown here. Test drive map will be shown here Test drive map will be shown here
                                        <p class="fs-10">{getInitials(item.commentByName)}</p>
                                      </div>
                                      <div style="font-size:1em;">
                                        <p>
                                          {item.commentByName}
                                          <span class="p-l-20 fs-15">{moment(item.createdAt).fromNow()}</span>
                                        </p>
                                        <p>
                                          <span class='p-l-5' style='display: inline-flex;' id={'comment' + index}>{getTaskComment(item.comment, index)}</span>
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <ChatComment onHandleEditorComment={(comment) => handleEditorComment(comment, 'task')} selectedTask={currentRow} />*/}
                      </div>
                    }

                  {/*
                          modified by Vihang
                          modified at 02/05/2022
                          modification : getTaskCheckList passed  to the checklist component
                    */}

                    {
                      currentRow && currentRow.containerType === "Checklist" && (
                        <ChecklistComponent
                        setChecklistItemSelected={setChecklistItemSelected}
                        getTaskCheckList={getTaskCheckList} triggerNotifications={props.triggerNotifications} taskCheckListItems={taskCheckListItems} currentRow={currentTask} totalTaskCheckListItemsProgress={totalTaskCheckListItemsProgress} answeredCount={answeredCount} setNextTask={setNextTask} />
                      )
                    }
                    {
                      currentRow && currentRow.containerType === "Select Cars" && (
                        <SelectCar triggerNotifications={props.triggerNotifications} taskCheckListItems={taskCheckListItems} currentRow={currentTask} totalTaskCheckListItemsProgress={totalTaskCheckListItemsProgress} setNextTask={setNextTask} />
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>

      {/* Modified By: Vihang
          Modified On: 23-25 May 2022
          Modification: all the forms modal mobile responsive changes
      */}
      {
        // <NewPopupModal classes="formModal" modalWidth={"65%"} modalDisplay={(isOpenFormPopover ? 'show-formPopover' : 'hide-formPopover')} onClose={(e) => toggleFormPopover(e)}>
        //   <div class="enquiryForm background-transparent">
        //     <div class="row p-t-10 p-l-30 p-r-30 p-b-10" style="background:#f7f7f7;border-bottom:1px solid lightgrey">
        //       <span class="formHeader display-flex p-l-5">
  			// 				<h4>{currentRow && currentRow.displayName}</h4>
  			// 				{currentRow && currentRow.caseID && (
        //         	<h4> | {currentRow.caseID}</h4>
  			// 				)}
  			// 			</span>
        //       {
        //         currentRow && currentRow.description && (
        //           <div class="display-flex align center flex-direction-column p-l-10">
        //             <p class="fs-10">{currentRow.description} </p>
        //           </div>
        //         )
        //       }
        //       {
        //         currentAction && currentAction.name === "product selection" && (
        //           <div class="display-flex flex-direction-column">
        //
        //             <span class="pos-absolute" style="right: 0px;top: 0px;">
        //               <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 24 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
        //
        //             </span>
        //             <p style="right: 3px;top: 5px;z-index: 1;" class="pos-absolute datecircletemp">{cartNumber}</p>
        //           </div>
        //         )
        //       }
        //     </div>
        //     <div>
        //       <LinearProgress progress={progress} barcolor="#63e0f3" />
        //       {/*
        //             modified by Vihang
        //             modified at 25/05/2022
        //             modification : new class name for form modal
        //       */}
        //       <div id="formModalContainer" class="formModalContainer">
  			// 			{
  			// 				((actions.length === 1 && !actions[0].displayName && actions[0]['dynamicProps'].length === 0) || actions.length === 0) && (
  			// 					<div class="w-full">
  			// 						{
  			// 							dynamicProps && dynamicProps.length !== 0 && dynamicProps.map((dynamicProp, propIndex) => (
        //                 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
  			// 									<div >
        //                     {
        //                       dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.formType !== "radio" && dynamicProp.formType !== "checkbox" && !dynamicProp.dependentProp && (
        //                         <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
        //                       )
        //                     }
        //                     {
        //                       (dynamicProp.formType === "radio" || dynamicProp.formType === "checkbox") && !dynamicProp.dependentProp && (
        //                         <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
        //                       )
        //                     }
  			// 										{
  			// 											((dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && !dynamicProp.dependentProp) && (
  			// 												<input class="first-letter-capital" disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => setFormValueInput(e, dynamicProp.name)} onFocusout={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //
        //                     {
        //                       dynamicProp.name === "licenseNumber" && (
        //                         <div>
        //                           <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
        //                           <input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => inputClicked(e)} maxlength="15" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj['dynamicProperties_'+dynamicProp.name]} onInput={(e) => setFormValueInput(e, dynamicProp.name)} />
        //                         </div>
        //                       )
        //                     }
  			// 										{
  			// 											(dynamicProp.formType === "date" || dynamicProp.formType === "time") && !dynamicProp.dependentProp && (
  			// 												<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class="w-30" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name] || moment(new Date()).format('YYYY-MM-DD')} onInput={(e) => setFormValueInput(e, dynamicProp.name)} onFocusout={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "file") && (!dynamicProp.dependentProp && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA"))) && (
  			// 						               <input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => uploadFile(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //                     {
        //                       dynamicProp.formType === "file" && !dynamicProp.dependentProp && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && (
        //                         <div class="uploaded-image">
        //                           <img id={`image-0-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,0)}/>
        //                           <p class="delete-file-icon" title="Delete file" onClick={(e) => deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
        //                         </div>
        //                       )
        //                     }
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && !dynamicProp.dependentProp && (
  			// 												<div class="display-flex p-r-10 align-center">
  			// 													<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-Yes`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "yes" ? true : false} value="yes" onChange={(e) => saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>Yes </label>
  			// 													<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-No`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "no" ? true : false} value="no" onChange={(e) => saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>No </label>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
  			// 												<div class="display-flex align-center">
  			// 													{
  			// 														dynamicProp.enum.map((enumVal) => (
  			// 															<div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-${enumVal}`}>{enumVal}</label></div>
  			// 														))
  			// 													}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "checkbox" && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
  			// 												<div class="formCheckbox display-flex">
  			// 													{
  			// 														dynamicProp.enum.map((enumVal) => (
  			// 															<div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} defaultChecked={interactionObj["dynamicProperties_"+dynamicProp.name] ? interactionObj["dynamicProperties_"+dynamicProp.name].split(",").includes(enumVal) : ""} onChange={(e) => saveFormInputCheckbox(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>{enumVal}</label></div>
  			// 														))
  			// 													}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											((dynamicProp.name === "area" || dynamicProp.name === "companyArea") && (!dynamicProp.dependentEnum || dynamicProp.dependentEnum.length === 0) && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={(e) => saveAreaFromForm(e, dynamicProp.name)} >
  			// 														{
  			// 															areaList.map((enumVal) => (
  			// 																<option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal.officeName} value={enumVal.officeName}>{enumVal.officeName}</option>
  			// 															))
  			// 														}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser")  && dynamicProp.formType === "select" && (dynamicProp.dependentProp && dynamicProp.dependentPropValue) && (dynamicProp.enum && dynamicProp.enum.length !== 0)) &&(interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<div>
  			// 													<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
  			// 													<div class="display-flex">
  			// 														<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={(e) => saveFormInput(e, dynamicProp.name, "select", 0)} >
  			// 															<option value=''>Select {dynamicProp.displayName}</option>
  			// 															{
  			// 																dynamicProp.enum.map((enumVal) => (
  			// 																	<option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
  			// 																))
  			// 															}
  			// 														</select>
  			// 													</div>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser")  && dynamicProp.formType === "select" && (!dynamicProp.dependentEnum || dynamicProp.dependentEnum.length === 0) && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
  			// 												<div>
  			// 													<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
  			// 													<div class="display-flex">
  			// 														<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={(e) => saveFormInput(e, dynamicProp.name, "select", 0)} >
  			// 															<option value=''>Select {dynamicProp.displayName}</option>
  			// 															{
  			// 																dynamicProp.enum.map((enumVal) => (
  			// 																	<option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
  			// 																))
  			// 															}
  			// 														</select>
  			// 													</div>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser")  && dynamicProp.formType === "select" && (dynamicProp.dependentEnum && dynamicProp.dependentEnum.length !== 0) && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && (dynamicProp.dependentEnum.findIndex((d) => d.isSelected) > -1) && !dynamicProp.dependentProp && (
  			// 												<div>
  			// 													<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
  			// 													<div class="display-flex">
  			// 														<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={(e) => saveFormInput(e, dynamicProp.name)} >
  			// 															<option value=''>Select {dynamicProp.displayName}</option>
  			// 															{
  			// 																dynamicProp.dependentEnum[dynamicProp.dependentEnum.findIndex((d) => d.isSelected)].dependentEnums.map((enumVal) => (
  			// 																	<option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
  			// 																))
  			// 															}
  			// 														</select>
  			// 													</div>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}<span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
  			// 											)
  			// 										}
  			// 										{
  			// 											dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.dependentProp && !dynamicProp.dependentPropValue && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
  			// 												<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}<span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
  			// 											)
  			// 										}
  			// 										{
  			// 											dynamicProp.formType === "file" && dynamicProp.dependentProp  && dynamicProp.dependentPropValue && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA")) && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<input required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} onChange={(e) => uploadFile(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //
        //                     {
        //                       dynamicProp.formType === "file" && dynamicProp.dependentProp  && dynamicProp.dependentPropValue && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
        //                         <div class="uploaded-image">
        //                           <img id={`image-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
        //                           <p class="delete-file-icon" title="Delete file" onClick={(e) => deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
        //                         </div>
        //                       )
        //                     }
        //                     {
  			// 											dynamicProp.formType === "file" && dynamicProp.dependentProp  && !dynamicProp.dependentPropValue && ((interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA") || !interactionObj['dynamicProperties_'+dynamicProp.name]) && ((dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp]))) && (
  			// 												<input required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} onChange={(e) => uploadFile(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //
        //                     {
        //                       dynamicProp.formType === "file" && dynamicProp.dependentProp  && !dynamicProp.dependentPropValue && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && ((dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp]))) && (
        //                         <div class="uploaded-image">
        //                           <img id={`image-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
        //                           <p class="delete-file-icon" title="Delete file" onClick={(e) => deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
        //                         </div>
        //                       )
        //                     }
  			// 										{
  			// 											(dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => setFormValueInput(e, dynamicProp.name)}  onFocusout={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && dynamicProp.dependentPropValues && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
  			// 												<input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => setFormValueInput(e, dynamicProp.name)}  onFocusout={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "date" || dynamicProp.formType === "time") && dynamicProp.dependentProp && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<input class="w-30" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name] || moment(new Date()).format('YYYY-MM-DD')} onChange={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && dynamicProp.dependentProp && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<div class="display-flex p-r-10 align-center">
  			// 													<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-Yes`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "yes" ? true : false} value="yes" onChange={(e) => saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>Yes </label>
  			// 													<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-No`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "no" ? true : false} value="no" onChange={(e) => saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>No </label>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (dynamicProp.enum || dynamicProp.enum.length !== 0)) && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<div class="display-flex formRadioButtons">
  			// 													{
  			// 														dynamicProp.enum.map((enumVal) => (
  			// 															<div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-${enumVal}`}>{enumVal}</label></div>
  			// 														))
  			// 													}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (dynamicProp.enum || dynamicProp.enum.length !== 0)) && dynamicProp.dependentProp && dynamicProp.dependentPropValues && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
  			// 												<div class="display-flex formRadioButtons">
  			// 													{
  			// 														dynamicProp.enum.map((enumVal) => (
  			// 															<div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>{enumVal}</label></div>
  			// 														))
  			// 													}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.name === "interestedModel" && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													{/*<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={model} onChange={e => {
  			// 																	getVariantForSelectedModel(e.target.value)
  			// 																	setModel(e.target.value)
  			// 																	saveFormInput(e, dynamicProp.name)
  			// 																	}
  			// 																	}>
  			// 																	<option style="text-transform:capitalize" value="" selected>Select Model</option>
  			// 																	{catalogoueItemList.map((item)=>(
  			// 																		<option style="text-transform:capitalize;" value={item.uuid}>{item.displayName}</option>
  			// 																	))}
  			// 																	</select>
  			// 																	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 m-0" >
  			// 																		<div class="row">
  			// 																				<div class="col-xs-12 p-l-0">
  			// 																					<p class="fs-15 p-b-3">{dynamicProp.displayName}</p>
  			// 																				</div>
  			// 																		</div>
  			// 																</div>*/}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{/*
  			// 														(dynamicProp.name === "interestedModel" && dynamicProp.formType === "select") && model && variantList && (
  			// 															<div class="display-flex">
  			// 																<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id='variant' value={variant} onChange={e => {
  			// 																	getVariantDetails(e.target.value)
  			// 																	setVariant(e.target.value)
  			// 																	saveFormInput(e, dynamicProp.name)
  			// 																}}>
  			// 																	<option value="" selected>Select Variant</option>
  			// 																	{
  			// 																		variantList.map((variant)=>(
  			// 																			<option style="text-transform:capitalize" value={variant.uuid}>{variant.variant}</option>
  			// 																		))
  			// 																	}
  			// 																</select>
  			// 															</div>
  			// 														)
  			// 													*/}
  			// 										{
  			// 											(dynamicProp.name === "exchangeEvaluator" && dynamicProp.formType === "select") && (
  			// 												<div class="display-block">
  			// 													<p class="fs-15 formLabel">Exchange Evaluator</p>
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_exchangeEvaluator']} onChange={e => {
  			// 														saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" selected>Select Exchange Evaluator</option>
  			// 														{exchangEvaluators.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.userID} value={item.userID}>{item.userName}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.name === "selectedScheme" && dynamicProp.formType === "select") && (
  			// 												<div class="display-block">
  			// 													<p class="formLabel fs-15 first-letter-capital">{dynamicProp.displayName + " "  }</p>
        //                           {
        //                             schemes.map((scheme, index) => (
        //                               <div class="display-flex">
        //                                 <input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} type="checkbox" value={scheme.uuid} defaultChecked={interactionObj["dynamicProperties_"+dynamicProp.name] === scheme.uuid} default={interactionObj["dynamicProperties_" + dynamicProp.name]} disabled={(scheme.displayName.includes("Exchange") && interactionObj["dynamicProperties_typeOfBuyer"] !== "Exchange Buyer")} onChange={(e) => saveFormInputRadio(e, dynamicProp.name, scheme.uuid, index)} />
        //                                 <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>{scheme.displayName + " - " + getFormattedAmount(scheme.discountAfterGST)  }</label>
        //                               </div>
        //                             ))
        //                           }
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.name === "selectedOffer" && dynamicProp.formType === "select") && (
  			// 												<div class="display-block">
  			// 													<p class="formLabel fs-15">Dealer Offer</p>
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_selectedOffer']} onChange={e => {
  			// 														saveFormInput(e, dynamicProp.name);
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" selected>Select Offer</option>
  			// 														{offers.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.uuid} value={item.uuid}>{item.displayName}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "manufacturer" && dynamicProp.formType === "select") && (
  			// 												<div>
        //                           <p class="formLabel fs-15">Select Manufacturer</p>
        //
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_manufacturer']} onChange={e => {
  			// 														setSelectedMake(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Manufacturer</option>
  			// 														{listofManufacturers.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_manufacturer'] === item} value={item}>{item}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "otherCars" && dynamicProp.formType === "select") && (
  			// 												<div>
        //                           <p class="formLabel fs-15">{dynamicProp.displayName}</p>
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_otherCars']} onChange={e => {
  			// 														// setSelectedMake(e)
  			// 														saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Manufacturer</option>
  			// 														{listofManufacturers.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_otherCars'] === item} value={item}>{item}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {/*
        //                       (dynamicProp.name === "exchangeCarModel" && dynamicProp.formType === "select") && (
        //                         <div class="display-flex">
        //                           <select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_exchangeCarModel']} onChange={e => {
        //                             setSelectedExchangeModel(e)
        //                             // saveFormInput(e, dynamicProp.name)
        //                           }
        //                           }>
        //                             <option style="text-transform:capitalize;font-size:16px" value="" >Select Model</option>
        //                             {listOfModels && listOfModels.map((item) => (
        //                               <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_exchangeCarModel'] === item.Model + " - " + item.Category + " - " + item.Year} value={item.Model + " - " + item.Category + " - " + item.Year}>{item.Model + " - " + item.Category + " - " + item.Year}</option>
        //                             ))}
        //                           </select>
        //                         </div>
        //                       )
        //                     */}
        //
  			// 										{
  			// 											(dynamicProp.name === "selectedModel" && (!dynamicProp.dependentProp || (dynamicProp.dependentProp && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue))) && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
  			// 														saveSelectedModel(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Model</option>
  			// 														{catalogoueItemList.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedModel'] === item.uuid} value={item.uuid}>{modelMapping[item.displayName.toLowerCase()]}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "selectedVariant" && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
  			// 														saveSelectedVariant(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Variant</option>
  			// 														{variantList.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedVariant'] === item.uuid} value={item.uuid}>{item.variant}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "selectedTestDriveModel"  && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
  			// 														saveSelectedTestDriveModel(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Model</option>
  			// 														{catalogoueItemList.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={(interactionObj['dynamicProperties_selectedModel'] === item.uuid) || (interactionObj['dynamicProperties_selectedTestDriveModel'] === item.uuid)} value={item.uuid}>{modelMapping[item.displayName.toLowerCase()]}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "selectedTestDriveVariant" && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
  			// 														saveSelectedTestDriveVariant(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Variant</option>
  			// 														{variantList.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedTestDriveVariant'] === item.uuid} value={item.uuid}>{item.variant}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "selectedTestDriveCarID" && (interactionObj["dynamicProperties_typeOfTestDriveCar"] === "Test Drive Car") && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj["dynamicProperties_selectedTestDriveCarID"]} onChange={e => {
  			// 														saveSelectedTestDriveCar(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Car</option>
  			// 														{testDriveCars.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" value={item.uuid}>{item.variant + " - " + item.registrationNumber}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "testDriveApprovalRole" && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
        //                           <p class="formLabel fs-15 p-b-3"> Select Responsible Role</p>
        //                           <select class="text-4b4d51 background-white border-none" type="text" id="employee2" value={interactionObj['dynamicProperties_testDriveApprovalRole']} onChange={e => {
        //                             getSelectedTypeUserList(e.target.value)
        //                           }}
        //                           style="text-shadow:none"
        //                           >
        //                             <option selected value=''>{'Select Responsible Role'}</option>
        //                             <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'BRANCH MANAGER'} value={'BRANCH MANAGER'}>{'Branch Manager'}</option>
        //                             <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'SALES MANAGER'} value={'SALES MANAGER'}>{'Sales Manager'}</option>
        //                             <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'ASST.SALES MANAGER'} value={'ASST.SALES MANAGER'}>{'Sales Assistant Manager'}</option>
        //                           </select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "testDriveAssignedUser" && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
        //                           <p class="formLabel fs-15 p-b-3"> Select Responsible Person</p>
        //                           <select type="text" id="employee" class="m-t-10  first-letter-capital background-white border-none text-4b4d51" onChange={(e => saveFormInput(e, dynamicProp.name, "select", index))} style="text-shadow:none">
        //                             <option class="first-letter-capital" value='' selected>{`Select ${interactionObj['dynamicProperties_testDriveApprovalRole']}`}</option>
        //                             { assignUserList.map((user) => (
        //                               <option selected={interactionObj['dynamicProperties_testDriveAssignedUser'] === user.userID } value={user.userID}>{user.userName}</option>
        //                             ))}
        //                           </select>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											selectedModel && currentAction.name === "product selection" && (
  			// 												variantList && variantList.map((item, index) => (
  			// 													<div class="listCard fadeAnimationText m-b-5" >
  			// 														<div class='p-l-10 p-r-10 p-t-10 p-b-10 msgContainer cursor-pointer animatedHover'>
  			// 															<div class='row'>
  			// 																<div class='col-xs-12 col-lg-5'>
  			// 																	<div class='display-flex m-all'>
  			// 																		<div>
  			// 																			<p style='text-transform: capitalize;font-size:15px;'>{item.variant}</p>
  			// 																		</div>
  			// 																		<div>
        //
  			// 																		</div>
  			// 																	</div>
  			// 																	{
  			// 																		<div class="fp-b-10 flex-w">
  			// 																			{item.colors && item.colors.map((color) => (
  			// 																				<span title={color.split("-").join(" ")} class='p-r-10 cursor-pointer inline-block' onClick={e => setSelectedProductColor(e, item, color)} >
  			// 																					<div id={item.uuid + "-" + color} style="border:none;height:34px;">
  			// 																						{/*<img src={`https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}/Color/${color}.jpg`} width='30' height='30' />*/}
  			// 																							<img class="border-grey" src={`https://api.hyundai.co.in/service/download/colors/${color}.jpg`} width='30' height='30' />
  			// 																					</div>
  			// 																				</span>
  			// 																			))}
  			// 																		</div>
  			// 																	}
  			// 																</div>
  			// 																<div class='col-xs-5 col-lg-3'>
  			// 																	<div class=" p-b-10 m-all" >
  			// 																		{
  			// 																			((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1) && (selectedProducts[selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor))]['quantity'] === 0 || !selectedProducts[selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor))]['quantity'])) && (
  			// 																				<div >
  			// 																					{
  			// 																						((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
  			// 																							<span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>{selectedDisplayColor.split('-').join(' ')}</span>
        //
  			// 																						)
  			// 																					}
  			// 																					{
  			// 																						((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
  			// 																							<span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>Available Cars: <span style="font-size: 15px;color:#2a457e;font-weight:600">{availableStock}</span></span>
  			// 																						)
  			// 																					}
  			// 																					<button class="cart-add-btn" onClick={(e) => addQuantity(e, item, index)
  			// 																					}>Add</button>
  			// 																				</div>
  			// 																			)
  			// 																		}
  			// 																		{
  			// 																			(selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor) > -1 && selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)]['quantity'] > 0) && (
  			// 																				<div >
  			// 																					{
  			// 																						((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
  			// 																							<span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>{selectedDisplayColor.split('-').join(' ')}</span>
  			// 																						)
  			// 																					}
  			// 																					{
  			// 																						((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
  			// 																							<span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>Available Cars: <span style="font-size: 15px;color:#2a457e;font-weight:600">{availableStock}</span></span>
  			// 																						)
  			// 																					}
  			// 																					<div class="qty-input">
  			// 																						<button class="qty-count qty-count--minus m-r-5" style="color:grey" id={'qty-count--minus' + index} type="button" onclick={(e) => removeQuantity(e, item, index)}>-</button>
  			// 																						<input class="product-qty" type="number" style="color:green" name="product-qty" id={'product-qty' + index} min="0" max="10000" value={selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)]['quantity'] : 0} onChange={(e) => updateQuantity(e, item)} />
  			// 																						<button class="qty-count qty-count--add m-l-5" style="color:green" id={'qty-count--add' + index} type="button" onclick={(e) => addQuantity(e, item, index)}>+</button>
  			// 																					</div>
  			// 																				</div>
  			// 																			)
  			// 																		}
        //
  			// 																	</div>
  			// 																</div>
  			// 																<div class='col-xs-7 col-lg-4'>
  			// 																	<div class=" p-b-10 m-all" >
  			// 																		<span class='display-flex p-r-10 align-center'>
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForAccessories'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForAccessories'] : false} onChange={e => setSelectedProduct(e, item, "isOptedForAccessories")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Accessories</label>
  			// 																		</span>
  			// 																		<span class='display-flex p-r-10 align-center'>
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForRsa'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForRsa'] : false} onChange={e => setSelectedProduct(e, item, "isOptedForRsa")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>RSA</label>
  			// 																		</span>
  			// 																		<span class='display-flex p-r-10 align-center'>
        //
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedFor3M'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedFor3M'] : false} onChange={e => setSelectedProduct(e, item, "isOptedFor3M")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>3M</label>
  			// 																		</span>
  			// 																		<span class='display-flex p-r-10 align-center'>
        //
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForSheildOfTrust'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForSheildOfTrust'] : false} onChange={e => setSelectedProduct(e, item, "isOptedForSheildOfTrust")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Shield of Trust Warranty</label>
  			// 																		</span>
  			// 																		<span class='display-flex p-r-10 align-center'>
        //
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForExtendedWarranty'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForExtendedWarranty'] : false} onChange={e => setSelectedProduct(e, item, "isOptedForExtendedWarranty")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Extended Warranty</label>
  			// 																		</span>
  			// 																	</div>
        //
        //
  			// 																	{/*
  			// 																					selectedProducts.findIndex(d => d.productID === item.uuid) > -1 && selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid)]['quantity'] > 0 && (
  			// 																						<div class='display-flex m-t-5' style='float: right'>
  			// 																							<button class="primary-button" onclick={(e) => removeQuantity(e, item, index)}>Remove</button>
  			// 																						</div>
  			// 																					)
  			// 																					*/}
        //
  			// 																</div>
  			// 															</div>
  			// 														</div>
  			// 													</div>
  			// 												))
  			// 											)
  			// 										}
        //                     {
        //                       (currentAction.displayName === "Need Assessment" && (propIndex === action.dynamicProps.length - 1)) && (
        //                         <div class="display-block">
        //                           <p class="formLabel fs-15">Finance Manager</p>
        //                           <select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_financeExecutive']} onChange={e => {
        //                             saveFormInput(e, "financeExecutive")
        //                           }
        //                           }>
        //                             <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Finance Manager</option>
        //                             {financeExecutives.map((item) => (
        //                               <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_financeExecutive"] === item.userID} value={item.userID}>{item.userName}</option>
        //                             ))}
        //                           </select>
        //                         </div>
        //                       )
        //                     }
        //                     <span id={`error-`+dynamicProp.name} class="text-color-red fs-10" style="display:none;">Please enter {dynamicProp.displayName}</span>
  			// 									</div>
  			// 								</div>
  			// 							))
  			// 						}
  			// 						{
  			// 							currentRow && currentRow.buttons && currentRow.buttons.length !== 0 && currentRow.buttons.map((button) => (
  			// 								<button id={button} class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => dynamicButtonClicked(e, button)}>{button}</button>
  			// 							))
  			// 						}
  			// 						{
  			// 							currentRow.containerType === 'Form and Approval' && (currentRow.displayName !== "Handover Courier") && (currentRow.displayName !== "Close Visit") && (
  			// 								<div class="taskDetailsSection" style="overflow-y:auto">
  			// 									<button id="approve-button" class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => dynamicButtonClicked(e, "Approve")}>Approve</button>
  			// 									{!currentRow.quorum || currentRow.quorum === 1 && <button class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => dynamicButtonClicked(e, "Submit")}>Submit for Approval {currentRow.quorum}</button>}
  			// 									<button id="reject-button" class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => dynamicButtonClicked(e, "Reject")}>Reject</button>
  			// 								</div>
  			// 							)
  			// 						}
  			// 					</div>
  			// 				)
  			// 			}
  			// 			{
  			// 				currentAction.name !== "summary" && (actions && actions.length > 0) && [actions[selectedActionIndex]].map((action, index) => (
  			// 					<div class="row">
        //             <p style="color:#7a7a7a; width: 100%;">{action.displayName}</p>
        //             {
        //               action.displayName === 'Discount Adjustment' && (
        //                 <div class="row" style="width:100%">
        //                 <div className={`col-xs-12 m-t-15 ${action.displayName === 'Discount Adjustment' ? 'col-sm-6 col-md-6 col-lg-6' : 'col-sm-12 col-md-12 col-lg-12'}`}>
        //                   <p>Discount Amount: <span style='margin-left: 10px; font-weight:600'> { interactionObj['dynamicProperties_discount'] ? getFormattedAmount(interactionObj['dynamicProperties_discount']) : '₹ 0' }</span></p>
        //                 </div>
        //                 <div className={`col-xs-12 m-t-15 ${action.displayName === 'Discount Adjustment' ? 'col-sm-6 col-md-6 col-lg-6' : 'col-sm-12 col-md-12 col-lg-12'}`}>
        //                   <p>Discount to Adjust Amount: <span style='margin-left: 10px; font-weight:600'> { interactionObj['dynamicProperties_discountToBeAdjusted'] ? getFormattedAmount(interactionObj['dynamicProperties_discountToBeAdjusted']) : interactionObj['dynamicProperties_discount'] ? getFormattedAmount(interactionObj['dynamicProperties_discount']) : '₹ 0' }</span></p>
        //                 </div>
        //                 </div>
        //               )
        //             }
  			// 						{
        //
  			// 							action.dynamicProps && action.dynamicProps.length !== 0 && action.dynamicProps.map((dynamicProp, propIndex) => (
  			// 								<div className={`col-xs-12 m-t-15 ${action.displayName === 'Discount Adjustment' ? 'col-sm-6 col-md-6 col-lg-6' : 'col-sm-12 col-md-12 col-lg-12'}`}>
        //                   <div>
  			// 										{
  			// 											dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.formType !== "radio" && dynamicProp.formType !== "checkbox" && !dynamicProp.dependentProp && (
  			// 												<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "radio" || dynamicProp.formType === "checkbox") && !dynamicProp.dependentProp && (
  			// 												<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
  			// 											)
  			// 										}
  			// 										{
  			// 											((dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && !dynamicProp.dependentProp) && (
  			// 												<input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => setFormValueInput(e, dynamicProp.name)} onFocusout={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //
        //                     {
        //                       dynamicProp.name === "licenseNumber" && (
        //                         <div>
        //                           <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
        //                           <input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => inputClicked(e)} maxlength="15" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj['dynamicProperties_'+dynamicProp.name]} onInput={(e) => setFormValueInput(e, dynamicProp.name)} />
        //                         </div>
        //                       )
        //                     }
  			// 										{
  			// 											(dynamicProp.formType === "date" || dynamicProp.formType === "time") && !dynamicProp.dependentProp && (
  			// 												<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} className={`${action.displayName === 'Discount Adjustment' ? '' : 'w-30'}`} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name] || moment(new Date()).format('YYYY-MM-DD')} onInput={(e) => setFormValueInput(e, dynamicProp.name)} onFocusout={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "file") && (!dynamicProp.dependentProp && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA"))) && (
  			// 						               <input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => uploadFile(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //                     {
        //                       dynamicProp.formType === "file" && !dynamicProp.dependentProp && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && (
        //                         <div class="uploaded-image">
        //                           <img id={`image-${index}-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
        //                           <p class="delete-file-icon" title="Delete file" onClick={(e) => deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
        //                         </div>
        //                       )
        //                     }
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && !dynamicProp.dependentProp && (
  			// 												<div class="display-flex p-r-10 align-center">
  			// 													<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-Yes`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "yes" ? true : false} value="yes" onChange={(e) => saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>Yes </label>
  			// 													<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-No`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "no" ? true : false} value="no" onChange={(e) => saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>No </label>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
  			// 												<div class="display-flex formRadioButtons">
  			// 													{
  			// 														dynamicProp.enum.map((enumVal) => (
  			// 															<div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-${enumVal}`}>{enumVal}</label></div>
  			// 														))
  			// 													}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "checkbox" && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
  			// 												<div class="formCheckbox display-flex">
  			// 													{
  			// 														dynamicProp.enum.map((enumVal) => (
  			// 															<div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} defaultChecked={interactionObj["dynamicProperties_"+dynamicProp.name] ? interactionObj["dynamicProperties_"+dynamicProp.name].split(",").includes(enumVal) : ""} onChange={(e) => saveFormInputCheckbox(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>{enumVal}</label></div>
  			// 														))
  			// 													}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											((dynamicProp.name === "area" || dynamicProp.name === "companyArea") && (!dynamicProp.dependentEnum || dynamicProp.dependentEnum.length === 0) && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={(e) => saveAreaFromForm(e,dynamicProp.name)} >
  			// 														{
  			// 															areaList.map((enumVal) => (
  			// 																<option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal.officeName} value={enumVal.officeName}>{enumVal.officeName}</option>
  			// 															))
  			// 														}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser")  && dynamicProp.formType === "select" && (!dynamicProp.dependentEnum || dynamicProp.dependentEnum.length === 0) && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
  			// 												<div>
  			// 													<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
  			// 													<div class="display-flex">
  			// 														<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={(e) => saveFormInput(e, dynamicProp.name, "select", index)} >
  			// 															<option value=''>Select {dynamicProp.displayName}</option>
  			// 															{
  			// 																dynamicProp.enum.map((enumVal) => (
  			// 																	<option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
  			// 																))
  			// 															}
  			// 														</select>
  			// 													</div>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser") && dynamicProp.formType === "select" && (dynamicProp.dependentEnum && dynamicProp.dependentEnum.length !== 0) && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && (dynamicProp.dependentEnum.findIndex((d) => d.isSelected) > -1) && !dynamicProp.dependentProp && (
  			// 												<div>
  			// 													<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
  			// 													<div class="display-flex">
  			// 														<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={(e) => saveFormInput(e, dynamicProp.name)} >
  			// 															<option value=''>Select {dynamicProp.displayName}</option>
  			// 															{
  			// 																dynamicProp.dependentEnum[dynamicProp.dependentEnum.findIndex((d) => d.isSelected)].dependentEnums.map((enumVal) => (
  			// 																	<option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
  			// 																))
  			// 															}
  			// 														</select>
  			// 													</div>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.dependentProp && dynamicProp.dependentPropValue && dynamicProp.dependentPropValue !== "NA" && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}<span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
  			// 											)
  			// 										}
  			// 										{
  			// 											dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.dependentProp && !dynamicProp.dependentPropValue && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
  			// 												<p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}<span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
  			// 											)
  			// 										}
  			// 										{
  			// 											dynamicProp.formType === "file" && dynamicProp.dependentProp  && dynamicProp.dependentPropValue && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA")) && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} onChange={(e) => uploadFile(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //
        //
        //                     {
        //                       dynamicProp.formType === "file" && dynamicProp.dependentProp  && dynamicProp.dependentPropValue && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
        //                         <div class="uploaded-image">
        //                           <img id={`image-${index}-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
        //                           <p class="delete-file-icon" title="Delete file" onClick={(e) => deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
        //                         </div>
        //                       )
        //                     }
        //                     {
  			// 											dynamicProp.formType === "file" && dynamicProp.dependentProp  && !dynamicProp.dependentPropValue && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA") || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name].length === 0)) && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp]) && (
  			// 												<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} onChange={(e) => uploadFile(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //                     {
        //                       dynamicProp.formType === "file" && dynamicProp.dependentProp  && !dynamicProp.dependentPropValue && (interactionObj['dynamicProperties_'+dynamicProp.name] && (interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA" && interactionObj['dynamicProperties_'+dynamicProp.name].length !== 0)) && (
        //                         <div class="uploaded-image">
        //                           <img id={`image-${index}-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
        //                           <p class="delete-file-icon" title="Delete file" onClick={(e) => deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
        //                         </div>
        //                       )
        //                     }
  			// 										{
  			// 											(dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => setFormValueInput(e, dynamicProp.name)}  onFocusout={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && dynamicProp.dependentPropValues && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
  			// 												<input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => setFormValueInput(e, dynamicProp.name)}  onFocusout={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
        //                     {
        //                       (dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && !dynamicProp.dependentPropValue && dynamicProp.dependentPropValues && interactionObj["dynamicProperties_" + dynamicProp.dependentProp] && (
        //                         (interactionObj["dynamicProperties_" + dynamicProp.dependentProp].indexOf(dynamicProp.dependentPropValues.toString()) > -1)
        //                         || (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp].substring(1)))
        //                         || (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp].split(',')[1]))
        //                         ) && (
        //                         <div>
        //                           <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
        //                           <input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => setFormValueInput(e, dynamicProp.name)}  onFocusout={(e) => saveFormInput(e, dynamicProp.name)} />
        //                         </div>
        //                       )
        //                     }
  			// 										{
  			// 											(dynamicProp.formType === "date" || dynamicProp.formType === "time") && dynamicProp.dependentProp && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class="w-30" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name] || moment(new Date()).format('YYYY-MM-DD')} onChange={(e) => saveFormInput(e, dynamicProp.name)} />
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && dynamicProp.dependentProp && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<div class="display-flex p-r-10 align-center">
  			// 													<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-Yes`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "yes" ? true : false} value="yes" onChange={(e) => saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>Yes </label>
  			// 													<input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-No`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "no" ? true : false} value="no" onChange={(e) => saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>No </label>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (dynamicProp.enum || dynamicProp.enum.length !== 0)) && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
  			// 												<div class="display-flex formRadioButtons">
  			// 													{
  			// 														dynamicProp.enum.map((enumVal) => (
  			// 															<div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-${enumVal}`}>{enumVal}</label></div>
  			// 														))
  			// 													}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.formType === "radio" && (dynamicProp.enum || dynamicProp.enum.length !== 0)) && dynamicProp.dependentProp && dynamicProp.dependentPropValues && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
  			// 												<div class="display-flex formRadioButtons">
  			// 													{
  			// 														dynamicProp.enum.map((enumVal) => (
  			// 															<div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>{enumVal}</label></div>
  			// 														))
  			// 													}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.name === "interestedModel" && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													{/*<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={model} onChange={e => {
  			// 																	getVariantForSelectedModel(e.target.value)
  			// 																	setModel(e.target.value)
  			// 																	saveFormInput(e, dynamicProp.name)
  			// 																	}
  			// 																	}>
  			// 																	<option style="text-transform:capitalize" value="" selected>Select Model</option>
  			// 																	{catalogoueItemList.map((item)=>(
  			// 																		<option style="text-transform:capitalize;" value={item.uuid}>{item.displayName}</option>
  			// 																	))}
  			// 																	</select>
  			// 																	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 m-0" >
  			// 																		<div class="row">
  			// 																				<div class="col-xs-12 p-l-0">
  			// 																					<p class=" fs-15 p-b-3">{dynamicProp.displayName}</p>
  			// 																				</div>
  			// 																		</div>
  			// 																</div>*/}
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{/*
  			// 														(dynamicProp.name === "interestedModel" && dynamicProp.formType === "select") && model && variantList && (
  			// 															<div class="display-flex">
  			// 																<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id='variant' value={variant} onChange={e => {
  			// 																	getVariantDetails(e.target.value)
  			// 																	setVariant(e.target.value)
  			// 																	saveFormInput(e, dynamicProp.name)
  			// 																}}>
  			// 																	<option value="" selected>Select Variant</option>
  			// 																	{
  			// 																		variantList.map((variant)=>(
  			// 																			<option style="text-transform:capitalize" value={variant.uuid}>{variant.variant}</option>
  			// 																		))
  			// 																	}
  			// 																</select>
  			// 															</div>
  			// 														)
  			// 													*/}
  			// 										{
  			// 											(dynamicProp.name === "exchangeEvaluator" && dynamicProp.formType === "select") && (
  			// 												<div class="display-block">
  			// 													<p class="formLabel fs-15">Exchange Evaluator</p>
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_exchangeEvaluator']} onChange={e => {
  			// 														saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" selected>Select Exchange Evaluator</option>
  			// 														{exchangEvaluators.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.userID} value={item.userID}>{item.userName}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.name === "selectedScheme" && dynamicProp.formType === "select") && (
  			// 												<div class="display-block">
  			// 													<p class="fs-15 first-letter-capital">{dynamicProp.displayName + " " }</p>
        //                           {
        //                             schemes.map((scheme, index) => (
        //                               <div class="display-flex">
        //                                 <input type="checkbox" value={scheme.uuid} defaultChecked={interactionObj["dynamicProperties_"+dynamicProp.name] === scheme.uuid} default={interactionObj["dynamicProperties_" + dynamicProp.name]} disabled={(scheme.displayName.includes("Exchange") && interactionObj["dynamicProperties_typeOfBuyer"] !== "Exchange Buyer")} onChange={(e) => saveFormInputRadio(e, dynamicProp.name, scheme.uuid, index)} />
        //                                 <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>{scheme.displayName + " - " + getFormattedAmount(scheme.discountAfterGST)  }</label>
        //                               </div>
        //                             ))
        //                           }
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											(dynamicProp.name === "selectedOffer" && dynamicProp.formType === "select") && (
  			// 												<div class="display-block">
  			// 													<p class="formLabel fs-15">Dealer Offer</p>
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_selectedOffer']} onChange={e => {
  			// 														saveFormInput(e, dynamicProp.name);
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" selected>Select Offer</option>
  			// 														{offers.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.uuid} value={item.uuid}>{item.displayName}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "manufacturer" && dynamicProp.formType === "select") && (
  			// 												<div>
        //                         <p class="formLabel fs-15">Select Manufacturer</p>
        //
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_manufacturer']} onChange={e => {
  			// 														setSelectedMake(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Manufacturer</option>
  			// 														{listofManufacturers.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_manufacturer'] === item} value={item}>{item}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //
        //                     {
  			// 											(dynamicProp.name === "otherCars" && dynamicProp.formType === "select") && (
  			// 												<div>
        //                         <p class="formLabel fs-15">{dynamicProp.displayName}</p>
        //
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_otherCars']} onChange={e => {
  			// 														// setSelectedMake(e)
  			// 														saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Manufacturer</option>
  			// 														{listofManufacturers.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_otherCars'] === item} value={item}>{item}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {/*
        //                       (dynamicProp.name === "exchangeCarModel" && dynamicProp.formType === "select") && (
        //                         <div class="display-flex">
        //                           <select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_exchangeCarModel']} onChange={e => {
        //                             setSelectedExchangeModel(e)
        //                             // saveFormInput(e, dynamicProp.name)
        //                           }
        //                           }>
        //                             <option style="text-transform:capitalize;font-size:16px" value="" >Select Model</option>
        //                             {listOfModels && listOfModels.map((item) => (
        //                               <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_exchangeCarModel'] === item.Model + " - " + item.Category + " - " + item.Year} value={item.Model + " - " + item.Category + " - " + item.Year}>{item.Model + " - " + item.Category + " - " + item.Year}</option>
        //                             ))}
        //                           </select>
        //                         </div>
        //                       )
        //                     */}
        //
  			// 										{
  			// 											(dynamicProp.name === "selectedModel" && (!dynamicProp.dependentProp || (dynamicProp.dependentProp && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue))) && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
  			// 														saveSelectedModel(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Model</option>
  			// 														{catalogoueItemList.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedModel'] === item.uuid} value={item.uuid}>{modelMapping[item.displayName.toLowerCase()]}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "selectedVariant" && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
  			// 														saveSelectedVariant(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Variant</option>
  			// 														{variantList.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedVariant'] === item.uuid} value={item.uuid}>{item.variant}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "selectedTestDriveModel"  && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
  			// 														saveSelectedTestDriveModel(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Model</option>
  			// 														{catalogoueItemList.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={(interactionObj['dynamicProperties_selectedModel'] === item.uuid) || (interactionObj['dynamicProperties_selectedTestDriveModel'] === item.uuid)} value={item.uuid}>{modelMapping[item.displayName.toLowerCase()]}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "selectedTestDriveVariant" && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
  			// 														saveSelectedTestDriveVariant(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Variant</option>
  			// 														{variantList.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedTestDriveVariant'] === item.uuid} value={item.uuid}>{item.variant}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "selectedTestDriveCarID" && (interactionObj["dynamicProperties_typeOfTestDriveCar"] === "Test Drive Car") && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
  			// 													<select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj["dynamicProperties_selectedTestDriveCarID"]} onChange={e => {
  			// 														saveSelectedTestDriveCar(e)
  			// 														// saveFormInput(e, dynamicProp.name)
  			// 													}
  			// 													}>
  			// 														<option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Car</option>
  			// 														{testDriveCars.map((item) => (
  			// 															<option style="text-transform:capitalize;font-size:16px;" value={item.uuid}>{item.variant + " - " + item.registrationNumber}</option>
  			// 														))}
  			// 													</select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "testDriveApprovalRole" && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
        //                           <p class="formLabel fs-15 p-b-3"> Select Responsible Role</p>
        //                           <select class="text-4b4d51 background-white border-none" type="text" id="employee2" value={interactionObj['dynamicProperties_testDriveApprovalRole']} onChange={e => {
        //                             getSelectedTypeUserList(e.target.value)
        //                           }}
        //                           style="text-shadow:none"
        //                           >
        //                             <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] == "NA"} value=''>{'Select Responsible Role'}</option>
        //                             <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'Branch Manager'} value={'BRANCH MANAGER'}>{'Branch Manager'}</option>
        //                             <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'Sales Manager'} value={'SALES MANAGER'}>{'Sales Manager'}</option>
        //                             <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'Assistant Sales Manager'} value={'ASST.SALES MANAGER'}>{'Assistant Sales Manager'}</option>
        //                           </select>
  			// 												</div>
  			// 											)
  			// 										}
        //                     {
  			// 											(dynamicProp.name === "testDriveAssignedUser" && dynamicProp.formType === "select") && (
  			// 												<div class="display-flex">
        //                           <p class="formLabel fs-15 p-b-3"> Select Responsible Person</p>
        //                           <select type="text" id="employee" class="m-t-10  first-letter-capital background-white border-none text-4b4d51" onChange={(e => saveFormInput(e, dynamicProp.name, "select", index))} style="text-shadow:none">
        //                             <option class="first-letter-capital" value='' selected>{`Select ${interactionObj['dynamicProperties_testDriveApprovalRole']}`}</option>
        //                             { assignUserList.map((user) => (
        //                               <option selected={interactionObj['dynamicProperties_testDriveAssignedUser'] === user.userID } value={user.userID}>{user.userName}</option>
        //                             ))}
        //                           </select>
  			// 												</div>
  			// 											)
  			// 										}
  			// 										{
  			// 											selectedModel && currentAction.name === "product selection" && (
  			// 												variantList && variantList.map((item, index) => (
  			// 													<div class="listCard fadeAnimationText m-b-5" >
  			// 														<div class='p-l-10 p-r-10 p-t-10 p-b-10 msgContainer cursor-pointer animatedHover'>
  			// 															<div class='row'>
  			// 																<div class='col-xs-12 col-sm-5 col-md-5 col-lg-5'>
  			// 																	<div class='display-flex m-all'>
  			// 																		<div>
  			// 																			<p style='text-transform: capitalize;font-size:15px;'>{item.variant}</p>
  			// 																		</div>
  			// 																		<div>
        //
  			// 																		</div>
  			// 																	</div>
  			// 																	{
  			// 																		<div class="fp-b-10 flex-w">
  			// 																			{item.colors && item.colors.map((color) => (
  			// 																				<span title={color.split("-").join(" ")} class='p-r-10 cursor-pointer inline-block' onClick={e => setSelectedProductColor(e, item, color)} >
  			// 																					<div id={item.uuid + "-" + color} style="border:none;height:34px;">
  			// 																						{/*<img src={`https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}/Color/${color}.jpg`} width='30' height='30' />*/}
  			// 																							<img class="border-grey" src={`https://api.hyundai.co.in/service/download/colors/${color}.jpg`} width='30' height='30' />
  			// 																					</div>
  			// 																				</span>
  			// 																			))}
  			// 																		</div>
  			// 																	}
  			// 																</div>
  			// 																<div class='col-xs-5 col-sm-3 col-md-3 col-lg-3'>
  			// 																	<div class=" p-b-10 m-all" >
  			// 																		{
  			// 																			((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1) && (selectedProducts[selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor))]['quantity'] === 0 || !selectedProducts[selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor))]['quantity'])) && (
  			// 																				<div >
  			// 																					{
  			// 																						((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
  			// 																							<span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>{selectedDisplayColor.split('-').join(' ')}</span>
        //
  			// 																						)
  			// 																					}
  			// 																					{
  			// 																						((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
  			// 																							<span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>Available Cars: <span style="font-size: 15px;color:#2a457e;font-weight:600">{availableStock}</span></span>
  			// 																						)
  			// 																					}
  			// 																					<button class="cart-add-btn" onClick={(e) => addQuantity(e, item, index)
  			// 																					}>Add</button>
  			// 																				</div>
  			// 																			)
  			// 																		}
  			// 																		{
  			// 																			(selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor) > -1 && selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)]['quantity'] > 0) && (
  			// 																				<div >
  			// 																					{
  			// 																						((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
  			// 																							<span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>{selectedDisplayColor.split('-').join(' ')}</span>
  			// 																						)
  			// 																					}
  			// 																					{
  			// 																						((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
  			// 																							<span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>Available Cars: <span style="font-size: 15px;color:#2a457e;font-weight:600">{availableStock}</span></span>
  			// 																						)
  			// 																					}
  			// 																					<div class="qty-input">
  			// 																						<button class="qty-count qty-count--minus m-r-5" style="color:grey" id={'qty-count--minus' + index} type="button" onclick={(e) => removeQuantity(e, item, index)}>-</button>
  			// 																						<input class="product-qty" type="number" style="color:green" name="product-qty" id={'product-qty' + index} min="0" max="10000" value={selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)]['quantity'] : 0} onChange={(e) => updateQuantity(e, item)} />
  			// 																						<button class="qty-count qty-count--add m-l-5" style="color:green" id={'qty-count--add' + index} type="button" onclick={(e) => addQuantity(e, item, index)}>+</button>
  			// 																					</div>
  			// 																				</div>
  			// 																			)
  			// 																		}
        //
  			// 																	</div>
  			// 																</div>
  			// 																<div class='col-xs-7 col-sm-4 col-md-4 col-lg-4'>
  			// 																	<div class=" p-b-10 m-all" >
  			// 																		<span class='display-flex p-r-10 align-center'>
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForAccessories'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForAccessories'] : false} onChange={e => setSelectedProduct(e, item, "isOptedForAccessories")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Accessories</label>
  			// 																		</span>
  			// 																		<span class='display-flex p-r-10 align-center'>
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForRsa'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForRsa'] : false} onChange={e => setSelectedProduct(e, item, "isOptedForRsa")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>RSA</label>
  			// 																		</span>
  			// 																		<span class='display-flex p-r-10 align-center'>
        //
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedFor3M'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedFor3M'] : false} onChange={e => setSelectedProduct(e, item, "isOptedFor3M")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>3M</label>
  			// 																		</span>
  			// 																		<span class='display-flex p-r-10 align-center'>
        //
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForSheildOfTrust'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForSheildOfTrust'] : false} onChange={e => setSelectedProduct(e, item, "isOptedForSheildOfTrust")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Shield of Trust Warranty</label>
  			// 																		</span>
  			// 																		<span class='display-flex p-r-10 align-center'>
        //
  			// 																			<input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForExtendedWarranty'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForExtendedWarranty'] : false} onChange={e => setSelectedProduct(e, item, "isOptedForExtendedWarranty")} />
  			// 																			<label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Extended Warranty</label>
  			// 																		</span>
  			// 																	</div>
        //
        //
  			// 																	{/*
  			// 																					selectedProducts.findIndex(d => d.productID === item.uuid) > -1 && selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid)]['quantity'] > 0 && (
  			// 																						<div class='display-flex m-t-5' style='float: right'>
  			// 																							<button class="primary-button" onclick={(e) => removeQuantity(e, item, index)}>Remove</button>
  			// 																						</div>
  			// 																					)
  			// 																					*/}
        //
  			// 																</div>
  			// 															</div>
  			// 														</div>
  			// 													</div>
  			// 												))
  			// 											)
  			// 										}
        //                     {
        //                       (currentAction.displayName === "Need Assessment" && (propIndex === action.dynamicProps.length - 1)) && (
        //                         <div class="display-block">
        //                           <p class="formLabel fs-15">Finance Manager</p>
        //                           <select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_financeExecutive']} onChange={e => {
        //                             saveFormInput(e, "financeExecutive")
        //                           }
        //                           }>
        //                             <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Finance Manager</option>
        //                             {financeExecutives.map((item) => (
        //                               <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_financeExecutive"] === item.userID} value={item.userID}>{item.userName}</option>
        //                             ))}
        //                           </select>
        //                         </div>
        //                       )
        //                     }
        //                     <span id={`error-`+dynamicProp.name} class="text-color-red fs-10" style="display:none;">Please enter {dynamicProp.displayName}</span>
  			// 									</div>
  			// 								</div>
  			// 							))
  			// 						}
  			// 					</div>
  			// 				))
  			// 			}
        //
  			// 			{
  			// 				currentAction.name === "summary" && (
  			// 					<div class="display-block">
  			// 						<p style="color:#7a7a7a">Summary</p>
  			// 						{
  			// 							cartProducts && cartProducts.length !== 0 && cartProducts.map((cartItem, index) => (
  			// 								<div class="quotationCarSummary row">
  			// 									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10" style="background: #bfe1ff;">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/car.png" class="m-r-5" height="20" style="height: 20px; width: 20px;"/>*/}
  			// 												<span class="color-darkgrey">
        //                           <span class="first-letter-capital">{cartItem.variant}</span>
        //                           <span class="color-black p-l-5 p-r-5 m-l-10 first-letter-capital">{cartItem.color.toLowerCase()}</span><br/>
  			// 													{/*<span class="color-black p-l-5 p-r-5 m-l-10 first-letter-capital">Ex-showroom</span>*/}
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 														<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.quantity}</span></span>
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{/*getFormattedAmount(cartItem.exShowroom ? cartItem.exShowroom : 1000000)*/}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
        //                   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
  			// 												<span class="color-darkgrey">
  			// 													EX SHOWROOM
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 														<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.exShowroom ? cartItem.exShowroom : 1000000)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
        //                   {
        //                     cartItem.exShowroom >= 1000000 && (
        //                       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
      	// 												<div class="row">
      	// 													<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
      	// 														{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
      	// 														<span class="color-darkgrey">
      	// 															TCS @ 1% ON EX SHOWROOM
      	// 														</span>
      	// 													</div>
      	// 													<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
      	// 														<div class="row">
      	// 															<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
      	// 																<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
      	// 															</div>
      	// 															<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
      	// 																<span class="color-darkgrey f-600 p-t-10 p-b-10">{quotationData.selectedProducts &&  quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].tcsOnExShowroom) : '-'}</span>
      	// 															</div>
      	// 														</div>
      	// 													</div>
      	// 												</div>
      	// 											</div>
        //                     )
        //                   }
        //
        //                   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
  			// 												<span class="color-darkgrey">
  			// 													Comprehensive + ' O ' Dept
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 														<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].insuranceCalculated) : '-'}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
        //                   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}{/*
  			// 												<span class="color-darkgrey">
  			// 													Additional Premium for Engine Protection (EP) &Consumable (CM)
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 														<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].additionalPremiumForEngineProtection) : '-'}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
        //                   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
  			// 												<span class="color-darkgrey">
  			// 													Additional Premium for Return to Invoice( RTI)
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 														<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].additionalPremiumForRTI) : '-'}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
        //                   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
  			// 												<span class="color-darkgrey">
  			// 													RTO TAX + REG FEE + FAST TAG FOR INDIVIDUAL
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 														<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].rtoIndividual) : '-'}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
        //                   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
  			// 												<span class="color-darkgrey">
  			// 													EXTENDED WARRANTY : (4th Yr) OR (4th + 5th Yr)
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 														<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].fourthAnd5thYearExtendedWarranty) : '-'}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
  			// 									{/*<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>
  			// 												<span class="color-darkgrey">
  			// 													<span class="f-600"> #{index + 1}.11 </span>
  			// 													| EXTENDED WARRANTY : (4th Yr) OR (4th + 5th Yr)
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													{
  			// 														cartItem.quantity && (
  			// 															<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 																<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedForExtendedWarranty ? cartItem.quantity : 0}</span></span>
  			// 															</div>
  			// 														)
  			// 													}
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedForExtendedWarranty ? cartItem.fourthAnd5thYearExtendedWarranty ? cartItem.fourthAnd5thYearExtendedWarranty : 10000 : 0)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>*/}
  			// 									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/> */}
  			// 												<span class="color-darkgrey">
  			// 													Basic Accessories Kit
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													{
  			// 														cartItem.quantity && (
  			// 															<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 																<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedForAccessories ? cartItem.quantity : 0}</span></span>
  			// 															</div>
  			// 														)
  			// 													}
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedForAccessories ? cartItem.basicAccessoriesKit ? cartItem.basicAccessoriesKit : 20000 : 0)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
  			// 									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
  			// 												<span class="color-darkgrey">
  			// 													RSA
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													{
  			// 														cartItem.quantity && (
  			// 															<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 																<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedForRsa ? cartItem.quantity : 0}</span></span>
  			// 															</div>
  			// 														)
  			// 													}
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedForRsa ? cartItem.rsa ? cartItem.rsa : 2300 : 0)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
  			// 									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
  			// 												<span class="color-darkgrey">
  			// 													3M
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													{
  			// 														cartItem.quantity && (
  			// 															<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 																<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedFor3M ? cartItem.quantity : 0}</span></span>
  			// 															</div>
  			// 														)
  			// 													}
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedFor3M ? cartItem.rsa ? cartItem.rsa : 10000 : 0)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
  			// 									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												{/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
  			// 												<span class="color-darkgrey">
  			// 													Shield of Trust
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													{
  			// 														cartItem.quantity && (
  			// 															<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 																<span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedForSheildOfTrust ? cartItem.quantity : 0}</span></span>
  			// 															</div>
  			// 														)
  			// 													}
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedForSheildOfTrust ? cartItem.sheildOfTrust ? cartItem.sheildOfTrust : 12999 : 0)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
  			// 									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10" style="background: #bfe1ff;">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												<span class="color-darkgrey">
  			// 													<span class="first-letter-capital">Sub Total</span>
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.totalOnRoadPrice ? cartItem.totalOnRoadPrice : cartItem.totalIndividual)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
  			// 								</div>
  			// 							))
  			// 						}
  			// 						<div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
  			// 							{
  			// 								currentRow['dynamicProperties_selectedOffer'] && (
  			// 									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												<span class="color-darkgrey">
  			// 													Offer Discount
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0">
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(currentRow['dynamicProperties_selectedOffer'] ? 10000 : 0)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
  			// 								)
  			// 							}
  			// 							{
  			// 								currentRow['dynamicProperties_selectedScheme'] && (
  			// 									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												<span class="color-darkgrey">
  			// 													Scheme Discount
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0">
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(interactionObj['dynamicProperties_schemeDiscount'] ? interactionObj['dynamicProperties_schemeDiscount'] : 0)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
  			// 								)
  			// 							}
  			// 							{
  			// 								(currentRow['dynamicProperties_discount'] !== 0) && (
  			// 									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 										<div class="row">
  			// 											<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
  			// 												<span class="color-darkgrey">
  			// 													Cash Discount (Approval under Process)
  			// 												</span>
  			// 											</div>
  			// 											<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
  			// 												<div class="row">
  			// 													<div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0">
  			// 													</div>
  			// 													<div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0 display-flex justify-flex-end">
  			// 														<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(currentRow['dynamicProperties_discount'] ? currentRow['dynamicProperties_discount'] : 0)}</span>
  			// 													</div>
  			// 												</div>
  			// 											</div>
  			// 										</div>
  			// 									</div>
  			// 								)
  			// 							}
  			// 						</div>
  			// 						<div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
  			// 							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 								<div class="row">
  			// 									<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-0 display-flex">
  			// 										<span class="color-darkgrey p-t-10 p-b-10">
  			// 											Booking Amount
  			// 										</span>
  			// 									</div>
  			// 									<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-r-10 display-flex justify-flex-end">
  			// 										<span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartProducts[0].bookingAmount)}</span>
  			// 									</div>
  			// 									<div class="waitingPeriodText col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 display-flex" style="border-left: 1px solid #e2e2e2">
  			// 										<span class="color-darkgrey p-t-10 p-b-10">
  			// 											Waiting Period
  			// 										</span>
  			// 									</div>
  			// 									<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-r-10 display-flex justify-flex-end">
  			// 										<span class="color-darkgrey f-600 p-t-10 p-b-10">{`${cartProducts[0].waitingPeriodMin} to ${cartProducts[0].waitingPeriodMax} Days`}</span>
  			// 									</div>
  			// 								</div>
  			// 							</div>
  			// 						</div>
  			// 						<div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
  			// 							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 								<div class="row">
  			// 									<div class="col-xs-2 col-sm-4 col-md-4 col-lg-4 m-0 p-0 display-flex">
  			// 										<span class="color-darkgrey p-t-10 p-b-10">
  			// 											Quotation
  			// 										</span>
  			// 									</div>
  			// 									<div class="col-xs-10 col-sm-8 col-md-8 col-lg-8 m-0 display-flex quotationCarSummary">
  			// 										<button class="primary-button m-l-5 m-t-10" onClick={(e) => toggleProformaFormPopover(e)}>
  			// 											Generate
  			// 										</button>
  			// 										<button class="primary-button m-l-5 m-t-10" disabled={!quotationData.uuid} onClick={(e) => DownloadProformaInvoice(e)}>
  			// 											Send Email
  			// 										</button>
  			// 										<button class="whatsAppButton primary-button m-l-5 m-t-10 display-flex align-center justify-center" disabled>
  			// 											<p class="is-hide-mobile">Send Via WhatsApp</p>
        //                       <svg class="is-hide-Desktop" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"/></svg>
  			// 										</button>
  			// 									</div>
  			// 								</div>
  			// 							</div>
  			// 						</div>
  			// 						<div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
  			// 							<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-l-10 display-flex">
  			// 								<span class="color-darkgrey p-t-10 p-b-10">
  			// 									Last generated By:
  			// 								</span>
  			// 							</div>
  			// 							<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 display-flex justify-flex-end">
  			// 								<span class="color-darkgrey f-600 p-t-10 p-b-10">{lastQuotation.generatedBy}</span>
  			// 							</div>
  			// 							<div class="p-l-10 lastGeneratedText col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 display-flex" style="border-left: 1px solid #e2e2e2">
  			// 								<span class="color-darkgrey p-t-10 p-b-10">
  			// 									Last generated On:
  			// 								</span>
  			// 							</div>
  			// 							<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 display-flex justify-flex-end text-end">
  			// 								<span class="color-darkgrey f-600 p-t-10 p-b-10">{`${formatDateTime(lastQuotation.generatedOn, true)}. Valid Upto ${formatDateTime(lastQuotation.validUpto)}`}</span>
  			// 							</div>
  			// 						</div>
  			// 						<div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
  			// 							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 								<div class="row">
  			// 									<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-0 display-flex">
  			// 										<span class="color-darkgrey p-t-10 p-b-10">
  			// 											Exchange Selected?
  			// 										</span>
  			// 									</div>
  			// 									<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-t-10 display-flex">
  			// 										<input disabled type="checkbox" checked={interactionObj['dynamicProperties_exchangeEvaluator']} />
  			// 									</div>
  			// 									<div class="financeText col-xs-6 col-sm-3 col-md-3 col-lg-3 display-flex" style="border-left: 1px solid #e2e2e2">
  			// 										<span class="color-darkgrey p-t-10 p-b-10">
  			// 											Finance Selected?
  			// 										</span>
  			// 									</div>
  			// 									<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-t-10 display-flex">
  			// 										<input disabled type="checkbox" checked={interactionObj['dynamicProperties_financeExecutive']} />
  			// 									</div>
  			// 								</div>
  			// 							</div>
  			// 						</div>
        //             <div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
  			// 							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
  			// 								<div class="row">
  			// 									<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-0 display-flex">
  			// 										<span class="color-darkgrey p-t-10 p-b-10">
  			// 											Customer wants to pay booking amount?
  			// 										</span>
  			// 									</div>
  			// 									<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-t-10 display-flex align-center">
        //                     <input name="customerChoseToBook" id={`$customerChoseToBook-Yes`} type="radio" checked={interactionObj['dynamicProperties_customerChoseToBook'] === "yes" ? true : false} value="yes" onChange={(e) => saveFormInputRadioDefault(e, "customerChoseToBook")} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>Yes </label>
        //                     <input name="customerChoseToBook" id={`$customerChoseToBook-No`} type="radio" checked={interactionObj['dynamicProperties_customerChoseToBook'] === "no" ? true : false} value="no" onChange={(e) => saveFormInputRadioDefault(e, "customerChoseToBook")} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>No </label>
  			// 									</div>
  			// 								</div>
  			// 							</div>
  			// 						</div>
        //
  			// 					</div>
  			// 				)
  			// 			}
        //
  			// 			{
  			// 				currentAction && currentAction.buttons && currentAction.buttons.length !== 0 && currentAction.buttons.map((button) => (
  			// 					<button id={button} class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => dynamicButtonClicked(e, button)}>{button}</button>
  			// 				))
  			// 			}
        //       {/*
        //         currentRow.displayName === 'Finance Enquiry' && (actions && actions.length !== 0 && (selectedActionIndex === actions.length - 1)) && (
        //           <div class="taskDetailsSection" style="overflow-y:auto">
        //             <button id="approve-button" class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" disabled={currentRow.status === 'Pending'} onClick={e => dynamicButtonClicked(e, "Finance Quotation")}>Generate Finance Quotation</button>
        //           </div>
        //         )
        //       */}
  			// 			{
  			// 				testDriveQueue > 0 &&
  			// 				<div>
  			// 					<label>Test Drive Queue Number:</label><span>{testDriveQueue}</span>
  			// 				</div>
  			// 			}
        //       {
        //         (currentRow && currentRow.displayName == "Handover Courier") && (
        //           <div>
        //           <div class="row">
        //             <div class="m-b-10">
        //             <div class="fw-600 fs-1rem p-b-10" >
        //                 <label>Received From</label>
        //                 <input type="text" value={courierData.receivedFrom} disabled/>
        //               </div>
        //               <div class="fw-600 fs-1rem p-b-10" >
        //                 <label>Description</label>
        //                 <div class="display-flex">
        //                   <input type="radio" name="courierDescription" id="courierDescription" placeholder="Courier description" disabled={isHandoverDocket} checked={(courierData && courierData.courierDescription === "Envelop") ? true: false } value={courierData && courierData.courierDescription ? courierData.courierDescription : ''} onChange={(e) => {
        //                     setCourierData({
        //                       ...courierData,
        //                       courierDescription: e.target.value
        //                     });
        //                   }}/><label> Envelop</label>
        //                 </div>
        //                 <div class="display-flex">
        //                   <input type="radio" name="courierDescription" id="courierDescription" placeholder="Courier description" disabled={isHandoverDocket} checked={(courierData && courierData.courierDescription === "Parcel") ? true: false } value={courierData && courierData.courierDescription ? courierData.courierDescription : ''} onChange={(e) => {
        //                     setCourierData({
        //                       ...courierData,
        //                       courierDescription: e.target.value
        //                     });
        //                   }}/><label> Parcel</label>
        //                 </div>
        //               </div>
        //               <div class="fw-600 fs-1rem p-b-10" >
        //                 <label>Upload Hand Over photo</label>
        //                 <input type="file" id='uploadHandoverPhotoIDs' onChange={async (e) => uploadPackageImage(e, "handOverPhoto")} />
        //               </div>
        //               <div class="fw-600 fs-1rem p-b-10 display-flex" id='uploadHandoverPhotoPreview'>
        //
        //               </div>
        //               {
        //                 courierData.uploadHandoverPhotoSrc && courierData.uploadHandoverPhotoSrc.length !== 0 ? <div class="fw-600 fs-1rem p-b-10 min-h-80 min-w-100" >
        //                   <div class="fw-600 fs-1rem p-b-10 display-flex flex-direction-row flex-wrap-wrap" >
        //                     {
        //                       courierData.uploadHandoverPhotoSrc.map((handoverPhotoSrc) => (
        //                         <div className='courierImg'>
        //                           <img id='uploadHandoverPhotoSrc' src={handoverPhotoSrc} className='w-80 h-80 m-all border-black ' />
        //                           <span className={isHandoverDocket ? "crossTip" : 'crossTipNone'} id={handoverPhotoSrc} onClick={(e) => {
        //                             if (isHandoverDocket) {
        //                               let uploadHandoverPhotoID = e.target.id.split('/')[5]
        //                               let remainingUploadHandoverPhotoSrc = courierData.uploadHandoverPhotoSrc.filter((handoverPhotoSrc) => handoverPhotoSrc !== e.target.id)
        //                               let remainingUploadHandoverPhotoIDs = courierData.uploadHandoverPhotoIDs.filter((handoverPhotoIDs) => handoverPhotoIDs !== uploadHandoverPhotoID)
        //                               setCourierImgDelete(true)
        //                               setCourierData({
        //                                 ...courierData,
        //                                 uploadHandoverPhotoSrc: remainingUploadHandoverPhotoSrc,
        //                                 uploadHandoverPhotoIDs: remainingUploadHandoverPhotoIDs
        //                               })
        //                             }
        //                           }}>×</span>
        //                         </div>
        //
        //                       ))
        //                     }
        //                   </div>
        //                 </div> : ''
        //               }
        //
        //             </div>
        //           </div>
        //           <div class="row">
        //             <div class="m-b-10">
        //               <div class="p-b-10" >
        //                 <select type="text" id="orderSource" disabled={(isHandoverDocket)} value={courierData.handOverTo} onChange={(e) => {
        //                   setCourierData({
        //                     ...courierData,
        //                     handOverTo: e.target.value
        //                   });
        //                 }}>
        //                   <option value="" selected={(!isHandoverDocket && !isEditDocket)}>Handed over to</option>
        //                   {allUserList.map((user) => (
        //                     <option value={user.uuid}>{user.userName  }</option>
        //                   ))}
        //                 </select>
        //               </div>
        //             </div>
        //           </div>
        //           <div class="row">
        //             <div class="m-b-10">
        //               <div class="p-b-10" >
        //                 <input type="time" id="timeOfHandOver" disabled={(isHandoverDocket)} value={courierData.timeOfHandOver} onChange={(e) => {
        //                   setCourierData({
        //                     ...courierData,
        //                     timeOfHandOver: e.target.value
        //                   });
        //                 }} />
        //               </div>
        //             </div>
        //             </div>
        //             <div class="row">
        //
        //             <div class="m-b-10">
        //               <div class="p-b-10" >
        //                 <input type="text" id="name" placeholder="Remarks" disabled={(isHandoverDocket)} value={courierData.remarks} onChange={(e) => {
        //                   setCourierData({
        //                     ...courierData,
        //                     remarks: e.target.value
        //                   });
        //                 }} />
        //               </div>
        //             </div>
        //             </div>
        //           </div>
        //         )
        //       }
        //
        //
        //       </div>
        //     </div>
  			// 		<div class="button-container display-flex p-l-30 p-r-30 m-t-10 p-b-10 pos-absolute w-full justify-flex-end" style='bottom: 10px;'>
        //     {/*
        //           modified by Vihang
        //           modified at 26/05/2022
        //           modification : back button disabled state added
        //     */}
        //       {
        //         actions && actions.length !== 0 && selectedActionIndex !== 0 && (
        //           <button class="primary-button" disabled={isBackModalDisable} onClick={(e) => {
        //             setSelectedActionIndex(selectedActionIndex - 1)
        //             setCurrentAction(actions[selectedActionIndex - 1])
        //             checkAction(actions[selectedActionIndex - 1],selectedActionIndex, 'back' )
        //           }
        //           }>Back</button>
        //         )
        //       }
        //       {
        //         actions && actions.length !== 0 && (selectedActionIndex !== actions.length - 1) && (
        //           <button class="primary-button m-l-10" disabled={isNextModalDisable} type="submit" onClick={(e) => {
        //             submitFormOnStep(e)
        //           }
        //           }>Next</button>
        //         )
        //       }
        //       {/*<button class="primary-button">Back</button>
        //           <button class="primary-button m-l-10">Next</button> */}
        //       <button onClick={(e) => submitFormNew(e)} class="primary-button m-l-10" disabled={isSaveModalDisable}>Save</button>
        //     </div>
        //     {
        //       currentAction.displayName === "Product Selection" && cartProducts && cartProducts.length > 0 && (
        //         <div class="carCart">
        //           <div class='row'>
        //             <div class='col-xs-4 col-sm-4 col-md-4 col-lg-4' >
        //               <span class="selectedText">Selected</span> <span class="selectedCarCount">{cartNumber}</span>
        //             </div>
        //             <div class='col-xs-5 col-sm-5 col-md-5 col-lg-5' >
        //               <span class="carCost">Cost<span class="cartValue">{getFormattedAmount(cartValue)}</span> </span>
        //             </div>
        //             <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 display-flex justify-center' >
        //               <span class="viewCart"><p>View Cart </p><span class="m-l-5 h-24px" style="right: 0px;top: 0px;">
        //                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
        //               </span></span>
        //             </div>
        //           </div>
        //
        //         </div>
        //       )
        //     }
        //     {/*
        //           modified by Vihang
        //           modified at 25/05/2022
        //           modification : scroll button to inidcate that page is not ful;y scrolled to the bottom
        //     */}
        //     {/*
        //           modified by Vihang
        //           modified at 26/05/2022
        //           modification : added cursor pointer for scroll button
        //     */}
        //       {!isScrolledToTheBottom &&
        //         <svg class="scrollButton bounceAnimation cursor-pointer pos-absolute" onClick={(e)=> scrollToTheBottom("formModalContainer")} fill="#808080" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M20 25.542 27.292 18.208 25.333 16.292 20 21.583 14.667 16.292 12.708 18.208ZM20 36.667Q16.5 36.667 13.458 35.375Q10.417 34.083 8.167 31.833Q5.917 29.583 4.625 26.542Q3.333 23.5 3.333 20Q3.333 16.5 4.625 13.458Q5.917 10.417 8.167 8.167Q10.417 5.917 13.458 4.625Q16.5 3.333 20 3.333Q23.5 3.333 26.542 4.625Q29.583 5.917 31.833 8.167Q34.083 10.417 35.375 13.458Q36.667 16.5 36.667 20Q36.667 23.5 35.375 26.542Q34.083 29.583 31.833 31.833Q29.583 34.083 26.542 35.375Q23.5 36.667 20 36.667Z"/></svg>
        //       }
        //   </div>
        // </NewPopupModal>
        // <NewPopupModal classes="formModal" modalWidth={"65%"} modalDisplay={(isOpenFormPopover ? 'show-formPopover' : 'hide-formPopover')} onClose={(e) => toggleFormPopover(e)}>
        // </NewPopupModal>
      }
      {isOpenFormPopover &&
        <FormWizard
        modelMapping={modelMapping}
        isScrolledToTheBottom={isScrolledToTheBottom}
        cartNumber={cartNumber}
        progress={progress}
        actions={actions}
        dynamicProps={dynamicProps}
        areaList={areaList}
        exchangEvaluators={exchangEvaluators}
        schemes={schemes}
        offers={offers}
        interactionObj={interactionObj}
        listofManufacturers={listofManufacturers}
        catalogoueItemList={catalogoueItemList}
        variantList={variantList}
        testDriveCars={testDriveCars}
        cartProducts={cartProducts}
        assignUserList={assignUserList}
        selectedModel={selectedModel}
        currentAction={currentAction}
        currentRow={currentRow}
        courierData={courierData}
        testDriveQueue={testDriveQueue}
        selectedProducts={selectedProducts}
        selectedColor={selectedColor}
        availableStock={availableStock}
        allUserList={allUserList}
        isHandoverDocket={isHandoverDocket}
        isEditDocket={isEditDocket}
        setCourierImgDelete={setCourierImgDelete}
        setSelectedActionIndex={setSelectedActionIndex}
        selectedActionIndex={selectedActionIndex}
        setCurrentAction={setCurrentAction}
        isBackModalDisable={isBackModalDisable}
        isNextModalDisable={isNextModalDisable}
        isSaveModalDisable={isSaveModalDisable}
        financeExecutives={financeExecutives}

        checkAction={checkAction}
        DownloadProformaInvoice={DownloadProformaInvoice}
        toggleProformaFormPopover={toggleProformaFormPopover}
        toggleFormPopover={toggleFormPopover}
        scrollToTheBottom={scrollToTheBottom}
        setIsScrolledToTheBottom={setIsScrolledToTheBottom}
        setIsSaveModalDisable={setIsSaveModalDisable}
        setIsNextModalDisable={setIsNextModalDisable}
        setIsBackModalDisable={setIsBackModalDisable}
        submitFormNew={submitFormNew}
        setFormValueInput={setFormValueInput}
        saveFormInput={saveFormInput}
        inputClicked={inputClicked}
        deleteUploadedFile={deleteUploadedFile}
        saveFormInputCheckbox={saveFormInputCheckbox}
        saveAreaFromForm={saveAreaFromForm}
        uploadFile={uploadFile}
        viewAllImages={viewAllImages}
        dynamicButtonClicked={dynamicButtonClicked}
        setSelectedMake={setSelectedMake}
        saveSelectedVariant={saveSelectedVariant}
        saveSelectedTestDriveModel={saveSelectedTestDriveModel}
        saveSelectedTestDriveVariant={saveSelectedTestDriveVariant}
        saveSelectedTestDriveCar={saveSelectedTestDriveCar}
        getSelectedTypeUserList={getSelectedTypeUserList}
        submitFormOnStep={submitFormOnStep}
        saveFormInputRadio={saveFormInputRadio}
        saveFormInputRadioDefault={saveFormInputRadioDefault}
      />
      }
      {/*
         modified by Vihang
         modified at 11 May 2022
         modification : quoatation pdf fixes and updations
      */}
      <NewPopupModal modalWidth={"50%"} modalDisplay={(isOpenProformaFormPopover ? 'show-formPopover' : 'hide-formPopover')} modalScroll={true} onClose={(e) => toggleProformaFormPopover(e)}>
        <div class="p-l-15 p-r-15 p-t-15 p-b-15 pos-relative">
          <div class="display-flex flex-direction-column align-center">
            <button onclick={(e) => DownloadProformaInvoice(e, 'download')} class="button-10 m-t-20 m-b-20">Download</button>
            <h6 class="f-w-600">Kothari Cars Pvt. Ltd.</h6>
            <div class="display-flex">
              <div style="width: 30%;">
                <img src="../assets/images/Hyundai-logo.jpg" height="80" style="width:100%" />
              </div>
              <div class="display-flex flex-direction-column justify-center p-l-10" style="border-left:1px solid #000">
                <div class="display-flex">
                  <p class=" f-w-600" style="font-size:9.5px;width:100px">Shankarsheth Road:</p>
                  <p class="" style="font-size:9.5px">CTS No. 45/1B/A Shankarsheth Road, Next to Kumar Pacifc Mall,Gultekdi,Pune 411037 PhNo : 020-24338600</p>
                </div>
                <div class="display-flex">
                  <p class=" f-w-600" style="font-size:9.5px">Kharadi:</p>
                  <p class=" m-l-5" style="font-size:9.5px">Plot No. 13/1A, Mundhwa-Kharadi Bypass, Kharadi, Pune - 411014. Sales Ph: 020-27071100, Service Ph.: 020-27071125</p>
                </div>
                <div class="display-flex">
                  <p class=" f-w-600" style="font-size:9.5px">Khed Shivapur:</p>
                  <p class=" m-l-5" style="font-size:9.5px">At Post Velu, Near Joshi Wadewale, Khed , Shivapur, Tal : Bhor Dist : Pune 412205</p>
                </div>
                <div class="display-flex">
                  <p class=" f-w-600" style="font-size:9.5px">Aundh:</p>
                  <p class=" m-l-5" style="font-size:9.5px">1, Sylvan Heights, A, Opp. Hotel Seasons Apartment, Sanewadi, Aundh, Pune- 07 Ph. 020-27702770</p>
                </div>
              </div>
            </div>
            <div class="display-flex flex-direction-column w-full align-center">
              <h6 class="f-w-600">QUOTATION</h6>
              <h6 class="f-w-600" style="align-self: flex-end">Sr. No. :- {quotationData.uniqueID ? quotationData.uniqueID : "KH-SSR/05-22/Q-00001"}</h6>
            </div>
            <div class="w-full">
              <table>
                <tr>
                  <td colSpan="8" class="fs-10 p-5">G S T NO : 27AABCK1768P1ZZ:</td>
                  <td colSpan="6" class="fs-10 p-5">DATE: <span>{formatDateTime(new Date())}</span></td>
                </tr>
                <tr>
                  <td class="fs-10 p-5" colspan="14">Name of Customer:  <span style="text-transform: capitalize">{interactionForPdf && interactionForPdf["dynamicProperties_customerName"]? interactionForPdf["dynamicProperties_customerName"] : ""}</span></td>
                </tr>
                <tr>
                  <td class="fs-10 p-5" colspan="2">Address</td>
                  <td colspan="12"><span style="text-transform: capitalize">{interactionForPdf && interactionForPdf && interactionForPdf["dynamicProperties_addressLine1"] && interactionForPdf["dynamicProperties_addressLine2"] && interactionForPdf["dynamicProperties_state"] && interactionForPdf["dynamicProperties_city"] && interactionForPdf["dynamicProperties_pincode"] ?  interactionForPdf["dynamicProperties_addressLine1"] + " " + interactionForPdf["dynamicProperties_addressLine2"] + ", " +  interactionForPdf["dynamicProperties_state"] + ", " + interactionForPdf["dynamicProperties_city"] + ", " + interactionForPdf["dynamicProperties_pincode"] : ""}</span></td>
                </tr>
                <tr>
                  <td class="fs-10 p-5" colspan="2" style="text-align:center">Phone No  ( Resi /off )( Resi /off )</td>
                  <td colspan="6">-</td>
                  <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;" >Mobile</td>
                  <td colspan="5" >{(contactDetails && contactDetails.mobile) ? contactDetails.mobile : '' }</td>
                </tr>
                <tr>
                  <td colspan="2"></td>
                  <td></td>
                  <td class="fs-10 p-5" colspan="6">Model</td>
                  <td colspan="5 first-letter-capital">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? modelMapping[quotationData.selectedProducts[0].model.toLowerCase() ] : '-'}</td>
                </tr>
                <tr>
                  <td colspan="3"></td>
                  <td class="fs-10 p-5" colspan="6">Variant</td>
                  <td colspan="5 first-letter-capital">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? quotationData.selectedProducts[0].variant.charAt(0).toUpperCase() + quotationData.selectedProducts[0].variant.slice(1)  : '-'}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colspan="2"></td>
                  <td class="fs-10 p-5" colspan="6">Color</td>
                  <td colspan="5 first-letter-capital">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? quotationData.selectedProducts[0].color.charAt(0).toUpperCase()  + quotationData.selectedProducts[0].color.slice(1) : '-'}</td>
                </tr>
                <tr>
                  <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;">1</td>
                  <td class="fs-10 p-5" colspan="8">EX SHOWROOM</td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].exShowroom) : '-'}</td>

                </tr>
                {
                  quotationData.selectedProducts && quotationData.selectedProducts[0] && quotationData.selectedProducts && quotationData.selectedProducts[0]['exShowroom'] >= 1000000 && (
                    <tr>
                      <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;">2</td>
                      <td class="fs-10 p-5" colspan="8">TCS @ 1% ON EX SHOWROOM</td>
                      <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].tcsOnExShowroom) : '-'}</td>
                    </tr>
                  )
                }

                <tr>
                  <td class="fs-10 p-5" rowSpan="3" style="text-align: center;vertical-align: middle;">3</td>
                  <td class="fs-10 p-5" colspan="2" rowSpan="3" style="text-align: center;vertical-align: middle;">INSURANCE</td>
                  <td class="fs-10 p-5" colspan="6">
                    Comprehensive + ' O ' Dept
                  </td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].insuranceCalculated) : '-'}</td>
                </tr>
                <tr>
                  <td class="fs-10 p-5" colspan="6">
                    Additional Premium for Engine Protection (EP) &Consumable (CM)
                  </td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].additionalPremiumForEngineProtection) : '-'}</td>
                </tr>
                <tr>
                  <td class="fs-10 p-5" colspan="6">
                    Additional Premium for Return to Invoice( RTI)
                  </td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].additionalPremiumForRTI) : '-'}</td>
                </tr>

                <tr>
                  <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;">4</td>
                  <td class="fs-10 p-5" colspan="8">RTO TAX + REG FEE + FAST TAG FOR INDIVIDUAL</td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].rtoIndividual) : '-'}</td>

                </tr>
                {/*<tr>
                  <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;">6</td>
                 <td class="fs-10 p-5"  colspan="8">OTHER CHARGES</td>
                 <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].miscellaneousExpenses) : '-'}</td>

                </tr>*/}
                <tr>
                  <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;">6</td>
                  <td class="fs-10 p-5" colspan="8">EXTENDED WARRANTY : (4th Yr) OR (4th + 5th Yr)</td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].fourthAnd5thYearExtendedWarranty) : '-'}</td>

                </tr>
                <tr>
                  <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;">7</td>
                  <td class="fs-10 p-5" colspan="8">RMK</td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].rmk) : '-'}</td>

                </tr>
                <tr>
                  <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;">8</td>
                  <td class="fs-10 p-5" colspan="8">RSA</td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].rsa) : '-'}</td>

                </tr>
                <tr>
                  <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;">9</td>
                  <td class="fs-10 p-5" colspan="8">ACCESSORIES11</td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].basicAccessoriesKit) : '-'}</td>

                </tr>
                <tr>
                  <td class="fs-10 p-5" style="text-align: center;vertical-align: middle;">10</td>
                  <td class="fs-10 p-5" colspan="8">SHIELD OF TRUST</td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].sheildOfTrust) : '-'}</td>

                </tr>
                <tr style="background:lightgrey">
                  <td class="fs-10 p-5" style="text-align: center;" colspan="9">On Road Price</td>
                  <td colspan="5" style="text-align: end;">{quotationData.selectedProducts && quotationData.selectedProducts[0] ? getFormattedAmount(quotationData.selectedProducts[0].totalIndividual) : '-'}</td>
                </tr>
                <tr>
                  <td rowSpan="2" class="fs-10 p-5" style="text-align: center;vertical-align: middle;">11</td>
                  <td class="fs-10 p-5" colspan="2" rowSpan="2" style="text-align: center;vertical-align: middle;">DISCOUNT</td>
                  <td class="fs-10 p-5" colspan="6">
                    NATIONAL SCHEME
                  </td>
                  <td colspan="5">NA</td>
                </tr>
                <tr>
                  <td class="fs-10 p-5" colspan="6">
                    CASH DISCOUNT
                  </td>
                  <td colspan="5">NA</td>
                </tr>
                <tr style="background:lightgrey">
                  <td class="fs-10 p-5" style="text-align: center;" colspan="9">Net On Road Price</td>
                   <td colspan="5" style="text-align: end;">{getFormattedAmount(quotationData && quotationData.selectedProducts && quotationData.selectedProducts[0] && quotationData.selectedProducts[0].totalIndividual)}</td>
                </tr>
                <tr >
                  <td class="fs-10 f-w-600 p-5" colspan="14">* ONLY FOR BANK PURPOSE<br /> * NO VERBAL COMMUNICATION WILL BE ENTERTAINED</td>
                </tr>
                <tr >
                  <td class="fs-10 p-5" colspan="3">Mode of Purchase:-</td>
                  <td class="fs-10 p-5" colspan="11">
                    <div class="display-flex align-center">
                      <div class="display-flex align-center">
                        <p>In-house Finance</p>
                        <div class="m-l-5 display-flex align-center justify-center" style="width:50px;height:20px;border:1px solid #000"> {interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] === "In-house" ? "Y" : ""}</div>
                      </div>
                      <div class="display-flex align-center m-l-30">
                        <p>Out-house Finance</p>
                        <div class="m-l-5 display-flex align-center justify-center" style="width:50px;height:20px;border:1px solid #000">{interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] === "Outside" ? "Y" : ""}</div>
                      </div>
                      <div class="display-flex align-center m-l-30">
                        <p>Cash</p>
                        <div class="m-l-5 display-flex align-center justify-center" style="width:50px;height:20px;border:1px solid #000">{interactionForPdf && interactionForPdf["dynamicProperties_modeOfPurchase"] === "Cash" ? "Y" : ""}</div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr >
                  <td class="fs-10 p-5" colspan="3">Bank Name</td>
                  <td colspan="11">{interactionForPdf && interactionForPdf["dynamicProperties_bankName"]}</td>
                </tr>
                <tr >
                  <td class="fs-10 p-5" colspan="3">Branch Name</td>
                  <td colspan="11">{interactionForPdf && interactionForPdf["dynamicProperties_bankBranch"]}</td>
                </tr>
                <tr >
                  <td class="fs-10 p-5" colspan="3">Bank Person Name</td>
                  <td colspan="7">{interactionForPdf && interactionForPdf["dynamicProperties_bankName"]}</td>
                  <td class="fs-10 p-5">Number</td>
                  <td colspan="4">NA</td>

                </tr>
                <tr >
                  <td class="fs-10 p-5" colspan="3">Finance Person Name</td>
                  <td colspan="7">{interactionForPdf && interactionForPdf["dynamicProperties_financerName"]}</td>
                  <td class="fs-10 p-5">Number</td>
                  <td colspan="4">NA</td>

                </tr>
                <tr >
                  <td class="fs-9 p-5" colspan="14">
                    <p>1. Payment by DD/PO to be drawn in the name of KOTHARI CARS PVT.LTD payable at Pune.</p>
                    <p>2. Customer request not to pay any advance / part payment in cash to the consultant. Any such transactions done will be at the customer's own risk for which the company will not be responsible.</p>
                    <p>3. The prices mentioned are  subject to change without  prior notice and will be charged as applicable  at the time of Registration / delivery.</p>
                    <p>5. Delivery - Subject to realisation of  DD / Cheque.</p>
                    <p>7. Subject to jurisdiction of Pune Judistion only.</p>
                    <p>8. Two schemes cannot be clubbed together.</p>
                    <p>9. Hyundai Motor India Ltd. reserves the right to change the booking procedure,model specifications,colour,feature and discontinue models without notice.</p>
                    <p>10. Force majeure clause would be applicable to all deliveries.</p>
                    <p>11. The retail schemes (If Any) given along with this price list will be applicable on the physical stock and scheme period only. </p>
                    <p>12. Retail scheme,Price applicable will be valid only on receipt of full Ex showroom price.</p>
                    <p>13. The Insurance premium is calculated @ 95 %of Ex Showroom Price and includes Comprehensive + 0%dep + Consumable + KP + PB + 3 Years Third Party Only if all add on  opted.)</p>
                    <p>14. Incase of cancellation of booking Cancellation charges will be charged.</p>
                    <p>15. Income tax Pan no and address proof in original are necessary at the time of Booking.</p>
                    <p>16. Value of discount given shall be netted off from the vehicle invoice amount, insurance and registration.</p>
                    <p>17. 4th& 5th year Extended warranty amount includes GST tax.</p>
                    <p>18. Outside Maharashtra Vehicle CRTM charges of Rs 2000/ applicable.</p>
                    <p>19. Extended Warranty  amount includes GST @ 18%.</p>
                    <p>20. Purchase of Insurance Policy and Accessories from Dealer are optional.</p>
                    <p>21. RTO tax 2% charged extra as per intimated by RTO department will be applied as per confirmation received by RTO department as the time registration Incase if form 20 not received within 3 days once generated from Vahan portal.</p>
                  </td>
                </tr>
                <tr >
                  <td class="fs-10 p-5" colspan="2">Name of SC.</td>
                  <td colspan="12">{scDetails && scDetails.displayName ? scDetails.displayName : ""}</td>
                </tr>
                <tr >
                  <td class="fs-10 p-5" colspan="2">Con. No. -</td>
                  <td colspan="12">{scDetails && scDetails.mobile ? scDetails.mobile : ""}</td>
                </tr>
                <tr >
                  <td class="fs-10 f-w-600 p-5 text-color-red" colspan="14">* This is a digitally generated document and does not require any signature<br />* Validity of this quotation is up to {formatDateTime(quotationData.validUpto)}</td>
                </tr>
                <tr>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                  <td style="border:none"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </NewPopupModal>
      <NewPopupModal modalWidth={"50%"} modalDisplay={(isOpenAssignUsersTriggeredTask ? 'show-formPopover' : 'hide-formPopover')} modalScroll={true} onClose={(e) => toggleOpenAssignUsersTriggeredTask(e)}>
        <div class="p-l-15 p-r-15 p-t-15 p-b-15 pos-relative">
          <div class="display-flex flex-direction-column align-center">
            <h4 class="f-w-600">Task Assignment</h4>
            <div class="row">
              {
                triggeredUnassignedTaskList && triggeredUnassignedTaskList.length > 0 && triggeredUnassignedTaskList.map(triggeredTask => (
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <p class="first-letter-capital">{triggeredTask.taskName}</p>
                    <select onChange={(e) => handleAssignToUserChange(e, triggeredTask)}>
                      <option value=''>
                        Select User
                      </option>
                      {triggeredTask.assignToUsersList && triggeredTask.assignToUsersList.map(user => (
                        <option value={user.displayName ?user.uuid: user.userID} name={user.displayName ? user.displayName: user.userName} selected={assignToUserList.findIndex(task => ((task.taskID === triggeredTask.taskID) && (task.userID === user.uuid))) > -1}>
                          {user.displayName ? user.displayName: user.userName}
                        </option>
                      ))}
                    </select>
                  </div>
                ))
              }
            </div>
            <button onClick={(e) => saveAssignToUserChange(e)} class="primary-button m-l-10">Save</button>
          </div>
        </div>
      </NewPopupModal>
      <NewPopupModal modalWidth={"50%"} modalDisplay={(isOpenAssignApprovalUsersTriggeredTask ? 'show-formPopover' : 'hide-formPopover')} modalScroll={true} onClose={(e) => toggleOpenAssignApprovalUsersTriggeredTask(e)}>
        <div class="p-l-15 p-r-15 p-t-15 p-b-15 pos-relative">
          <div class="display-flex flex-direction-column align-center">
            <h4 class="f-w-600">Send Tasks for Approval</h4>
            <div class="row">
              {
                triggeredUnassignedApprovalTaskList && triggeredUnassignedApprovalTaskList.length > 0 && triggeredUnassignedApprovalTaskList.map(triggeredTask => (
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <p class="first-letter-capital">{triggeredTask.taskName}</p>
                    <select onChange={(e) => handleAssignApprovalToUserChange(e, triggeredTask)}>
                      <option value=''>
                        Select User
                      </option>
                      {triggeredTask.assignToUsersList && triggeredTask.assignToUsersList.map(user => (
                        <option value={user.displayName ? user.uuid: user.userID} name={user.displayName ? user.displayName: user.userName} selected={assignToApprovalUserList.findIndex(task => ((task.taskID === triggeredTask.taskID) && (task.userID === user.uuid))) > -1}>
                          {user.displayName ? user.displayName: user.userName}
                        </option>
                      ))}
                    </select>
                  </div>
                ))
              }
            </div>
            <button onClick={(e) => saveAssignApprovalToUserChange(e)} class="primary-button m-l-10">Save</button>
          </div>
        </div>
      </NewPopupModal>
      <NewPopupModal modalWidth={"50%"} modalDisplay={(isRepairRequestFormOpen ? 'show-formPopover' : 'hide-formPopover')} modalScroll={true} onClose={(e) => toggleFormPopover(e)}>
        <div class="p-l-15 p-r-15 p-t-15 p-b-15 pos-relative">
          <div class="display-flex flex-direction-column align-center">
            <h4 class="f-w-600">Assign Task</h4>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15 p-r-5 p-l-0 m-r-0">
                {
                  (notOkChecklistItems && notOkChecklistItems.length !== 0) && notOkChecklistItems.map((item, index) => (
                    <div class="flex-sb borderteambottom align-items-center">
                      <span class="fs-14">{index+1}. {item.displayName}</span><br/>
                      <div class="display-flex text-right">
                        {item.uploadFileSrc && item.uploadFileSrc.map((imgSrc,id) => (
                          <div style="margin-left: calc(1rem + 5px)">
                            <img id={`image-${index}-${id}`} class="cursor-pointer object-fit-contain w-half" src={imgSrc} width="100" height="100" onClick={(e)=> viewAllImages(e,id, index)}/>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15 p-r-5 p-l-0 m-r-0">
                <p class="fs-15">Remarks<span class="star-mandatory-entry p-l-2">*</span></p>
                <input type="text" value={ccmRemarks} onInput={(e) => setCCMRemarks(e.target.value)} />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15 p-r-5 p-l-0 m-r-0">
                <p class="fs-15">Assign to</p>
                <div class="display-flex">
                  <input type="radio" checked={assignToType === "Showroom Hostess" ? true: false} value={assignToType} onChange={(e) => setAssignToType("Showroom Hostess")} name="assignToType" /><label>Showroom Hostess</label>
                  <input type="radio" checked={assignToType === "Other" ? true: false} value={assignToType} onChange={(e) => setAssignToType("Other")} name="assignToType" /><label>Other</label>
                </div>
              </div>
            </div>
            {
              assignToType === "Showroom Hostess" && (
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15 p-r-5 p-l-0 m-r-0">
                    <p class="fs-15">Assign to</p>
                    <select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedLobbyHostes} onChange={e => {
                      setSelectedLobbyHostes(e.target.value)
                    }
                    }>
                      <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Showroom Hostes</option>
                      {lobbyHostesses.map((item) => (
                        <option style="text-transform:capitalize;font-size:16px;" selected={selectedLobbyHostes === item.userID} value={item.userID}>{item.userName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )
            }
            {
              assignToType === "Other" && (
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15 p-r-5 p-l-0 m-r-0">
                    <p class="fs-15">Department</p>
                    <select class='select first-letter-capital' style="text-transform:capitalize" type="text" id="orderSource" value={selectedDepartment} onChange={e => {
                      setSelectedDepartment(e.target.value)
                    }
                    }>
                      <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Department</option>
                      {departments.map((item) => (
                        <option style="text-transform:capitalize;font-size:16px;" selected={selectedDepartment === item.displayName} value={item.displayName}>{item.displayName.toLowerCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )
            }
            {
              selectedDepartment && (
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15 p-r-5 p-l-0 m-r-0">
                    <p class="fs-15">Select Person</p>
                    <select disabled={(dynamicProp.isDisabled || (props.currentRow.status && props.currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedUser} onChange={e => {
                      setSelectedUser(e.target.value)
                    }
                    }>
                      <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Person</option>
                      {users.map((item) => (
                        <option style="text-transform:capitalize;font-size:16px;" selected={selectedUser === item.userID} value={item.userID}>{item.userName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )
            }
            <button onClick={(e) => assignRepairRequestTask(e)} class="primary-button m-l-10 m-t-10">Assign</button>
          </div>
        </div>
      </NewPopupModal>
      <NewPopupModal modalWidth={"50%"} modalDisplay={(isFinanceFormOpen ? 'show-formPopover' : 'hide-formPopover')} modalScroll={true} onClose={(e) => toggleFinanceQuotationForm(e)}>
        <div class="background-transparent">
          <div class="row p-t-10 p-l-30 p-r-30 p-b-10" style="background:#f7f7f7;border-bottom:1px solid lightgrey">
            <span class="display-flex p-l-5">
              <h4>Generate Finance Quotation </h4>
              {currentRow && currentRow.caseID && (
                <h4> | {currentRow.caseID}</h4>
              )}
            </span>
            <div class="display-flex align flex-direction-column p-l-10">
              <p class="fs-12">Select Bank and enter Stamp Duty and Processing Fee</p>
            </div>
          </div>
          <div>
            <div class="p-l-30 p-r-30 p-t-10 p-b-10" style="border-top:1px solid lightgrey; overflow:hidden auto;height:65vh;">
              <div class="w-full">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                  <div class="row">
                    <div class="col-xs-12 m-t-15 col-sm-12 col-md-12 col-lg-12">
                      <p class="fs-15 p-b-3">Select Bank<span class="star-mandatory-entry p-l-2">*</span></p>
                      <select onChange={(e) => setSelectedBank(e)}>
                        <option value=''>
                          Select Bank
                        </option>
                        {
                          bankList && bankList.length > 0 && bankList.map(bank => (
                            <option value={bank.uuid} selected={selectedBankObj.uuid === bank.uuid}>
                              {bank.displayName}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    {selectedBankObj && selectedBankObj.uuid &&
                      <div class="col-xs-12 m-t-15 col-sm-12 col-md-12 col-lg-12 m-0 p-0">
                        <div class="row">
                          <div class="col-xs-12 m-t-15 col-sm-12 col-md-12 col-lg-12">
                            <p class="fs-15 p-b-3">Select Stamp Duty Option<span class="star-mandatory-entry p-l-2">*</span></p>
                            <select onChange={(e) => setSelectedStampDuty(e)}>
                              <option value=''>
                                Select Stamp Duty Option
                              </option>
                              {
                                stampDutyList && stampDutyList.length > 0 && stampDutyList.map(stampDuty => (
                                  <option value={stampDuty.uuid} selected={stampDutyObj.uuid === stampDuty.uuid}>
                                    {stampDuty.displayName}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                          <div class="col-xs-12 m-t-15 col-sm-12 col-md-12 col-lg-12">
                            <p class="fs-15 p-b-3">Select Proceesing Fee Option<span class="star-mandatory-entry p-l-2">*</span></p>
                            <select onChange={(e) => setSelectedProcessingFee(e)}>
                              <option value=''>
                                Select Proceesing Fee Option
                              </option>
                              {
                                processingFeeList && processingFeeList.length > 0 && processingFeeList.map(processingFee => (
                                  <option value={processingFee.uuid} selected={processingFeeObj.uuid === processingFee.uuid}>
                                    {processingFee.displayName}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                          <div class="col-xs-12 m-t-15 col-sm-12 col-md-12 col-lg-12">
                            <p class="fs-15 p-b-3">Enter number of years<span class="star-mandatory-entry p-l-2">*</span></p>
                            <input class="first-letter-capital" onClick={(e) => inputClicked()} required name="numberOfYears" id="numberOfYears" type="number" value={numberOfYears} onInput={(e) => setNumberofYears(e.target.value)}/>
                          </div>
                          <div class="col-xs-12 m-t-15 col-sm-12 col-md-12 col-lg-12">
                            <p class="fs-15 p-b-3">Enter Rate of Interest<span class="star-mandatory-entry p-l-2">*</span></p>
                            <input class="first-letter-capital" onClick={(e) => inputClicked()} required name="rateofInterest" id="rateofInterest" type="number" value={rateofInterest} onInput={(e) => setRateOfInterest(e.target.value)}/>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="button-container display-flex p-l-30 p-r-30 m-t-10 p-b-10 pos-absolute w-full justify-flex-end" style='bottom: 10px;'>
            <button disabled={(selectedBankObj && !selectedBankObj.uuid) || (stampDutyObj && !stampDutyObj.uuid) || (processingFeeObj && !processingFeeObj.uuid) } onClick={(e) => generateFinanceQuotationDefaultOption(e)} class="primary-button m-l-10">Save</button>
          </div>
        </div>
      </NewPopupModal>
    </div>
  );
};

export default SemiDetailView;
