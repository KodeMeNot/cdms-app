import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { getItem, setItem } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import Axios from 'axios';
import { WorkspaceCard } from '../../components/workspaceCard';
import { WorkspaceSubCard } from '../../components/workspaceSubCard';
import ListCard from '../../components/listCard';
import toastr from "toastr";
import { CountUp } from 'countup.js';
import creta from "../../assets/images/Hyundai-Creta.jpeg";
import alcazar from "../../assets/images/alcazer.jpg";
import santro from "../../assets/images/santro.jpg";
import aura from "../../assets/images/aura.jpg";
import venue from "../../assets/images/venue.jpeg";
import nextGenVerna from "../../assets/images/verna.jpg";
import allNewi20 from "../../assets/images/i20.jpg";
import elantra from "../../assets/images/verna.jpg";
import grandi10Nios from "../../assets/images/i10.jpg";
import i20Nline from "../../assets/images/i20NLine.jpg";
import hyundaikona from "../../assets/images/kona.jpeg";
import tucson from "../../assets/images/tuscon.jpg";
import HyundaiXcent from "../../assets/images/xcentprime.png";

import hyundaiLogo from "../../assets/images/crystal-honda.png";
import PDFSTYLE from "../../lib/pdfGenerationConfig";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const Dayplanworkspace = (props) => {
  let userInfo = getItem('userinfo');
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
  const todaysDate = new Date();
  let [taskCheckListItems, setTaskCheckListItems] = useState([]);
  let [totalTaskCheckListItems, setTotalTaskCheckListItems] = useState(0);
  let [totalTaskCheckListItemsProgress, setTotalTaskCheckListItemsProgress] = useState(0);
  let [activeFilter, setActiveFilter] = useState('DAILY TASKS');
  let [currentRow, setCurrentRow] = useState({});
  let [taskToDoDaily, setTaskToDoDaily] = useState({ columns: [], rows: [] });
  let [taskToDoFollow, setTaskToDoFollow] = useState({ columns: [], rows: [] });
  let [taskToDoCourier, setTaskToDoCourier] = useState({ columns: [], rows: [] });
  let [taskToDoEscalatedTasks, setTaskToDoEscalatedTasks] = useState({ columns: [], rows: [] });
  let [taskToDoCalls, setTaskToDoCalls] = useState({ columns: [], rows: [] });
  let [taskToTrack, setTaskToTrack] = useState({ columns: [], rows: [] });
  let [taskToTrackDaily, setTaskToTrackDaily] = useState({ columns: [], rows: [] });
  let [taskToTrackFollow, setTaskToTrackFollow] = useState({ columns: [], rows: [] });
  let [taskToTrackCourier, setTaskToTrackCourier] = useState({ columns: [], rows: [] });
  let [taskToTrackEscalatedTasks, setTaskToTrackEscalatedTasks] = useState({ columns: [], rows: [] });
  let [taskToTrackCalls, setTaskToTrackCalls] = useState({ columns: [], rows: [] });
  let [completedTask, setCompletedTask] = useState({ columns: [], rows: [] });
  let [completedTaskDaily, setCompletedTaskDaily] = useState({ columns: [], rows: [] });
  let [completedTaskFollow, setCompletedTaskFollow] = useState({ columns: [], rows: [] });
  let [completedTaskCourier, setCompletedTaskCourier] = useState({ columns: [], rows: [] });
  let [taskData, setTasksData] = useState({});
  let [courierData, setCourierData] = useState({});
  let [activePageTabItem, setActivePageTabItem] = useState('TASKS TO DO');
  let [isOpenFormPopover, setIsOpenFormPopover] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isOpenProformaFormPopover, setIsOpenProformaFormPopover] = useState(false);
  let [taskDetails, setTaskDetails] = useState({});
  let [contactDetails, setContactDetails] = useState({});
  let [dynamicProps, setDynamicProps] = useState([]);
  let [dynamicPropsWithValues, setDynamicPropsWithValues] = useState([]);
  let [taskComments, setTaskComment] = useState([]);
  let [activeTab, setActiveTab] = useState('list');
  let [selectedActionIndex, setSelectedActionIndex] = useState(0);
  let [dayPlanCount, setDayPlanCount] = useState({
    TODO: 0,
    TOTRACK: 0,
    DONE: 0
  });
  let [taskToDoList, setTaskToDoList] = useState([]);
  let [modelVariantName, setModelVariantName] = useState('');

  let [taskToTrackList, setTaskToTrackList] = useState([]);
  let [taskDoneList, setTaskDoneList] = useState([]);
  let [actions, setActions] = useState([{
    dynamicProps: []
  }]);
  let [catalogueCarVariant, setCatalogueCarVariant] = useState([]);
  let [catalogueCarVariantDiesel, setCatalogueCarVariantDiesel] = useState([]);
  let [catalogueCarVariantCNG, setCatalogueCarVariantCNG] = useState([]);
  let [carVariantTableData, setCarVariantTableData] = useState([{text:"PARTICULARS",bold:false}]);
  let [exShowroomTableData, setExShowroomTableData] = useState([{text:"EX - SHOWROOM PRICE",bold:false}]);
  let [tcsExShowroomTableData, setTcsExShowroomTableData] = useState([{text:"TCS 1% EX-SHOWROOM",bold:false}]);
  let [insuranceTableData, setInsuranceTableData] = useState([{text:"INSURANCE (INCLUDE '0' DEP & CONSUMBALE)",bold:false}]);
  let [rtoCompanyTableData, setRtoCompanyTableData] = useState([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Company',bold:false}]);
  let [rtoIndividualTableData, setRtoIndividualTableData] = useState([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Individual',bold:false}]);
  let [fourFifthExtendedWarrantyTableData, setFourFifthExtendedWarrantyTableData] = useState([{text:'4th & 5th YEAR EXTENDED WARRANTY',bold:false}]);
  let [rmkTableData, setRmkTableData] = useState([{text:'RMK',bold:false}]);
  let [basicAccessoriesKitTableData, setBasicAccessoriesKitTableData] = useState([{text:'BASIC ACCESSORIES KIT',bold:false}]);
  let [rsaTableData, setRsaTableData] = useState([{text:'RSA',bold:false}]);
  let [additionalPremiumForEngineProtectionTableData, setAdditionalPremiumForEngineProtectionTableData] = useState([{text:'ADDL PREMIUM FOR ENGINE PROTECTION',bold:false}]);
  let [additionalPremiumforReturnToInvoiceTableData, setAdditionalPremiumforReturnToInvoiceTableData] = useState([{text:'ADDL PREMIUM FOR RETURN TO INVOICE(RTI)',bold:false}]);
  let [totalIndividualTableData, setTotalIndividualTableData] = useState([{text:'TOTAL INDIVIDUAL',bold:false}]);
  let [totalCompanyTableData, setTotalCompanyTableData] = useState([{text:'TOTAL COMPANY',bold:false}]);
  let [sheildOfTrustTableData, setSheildOfTrustTableData] = useState([{text:'T5 YR/60K SHIELD OF TRUST',bold:false}]);
  let [priceListForPmc, setPriceListForPmc] = useState([{text:'PRICE LIST FOR PMC', fontSize:18,bold:false,alignment:"center"}]);
  let [allnewi20tableHeader, setAllNewi20TableHeader] = useState([
    {text:'',alignment:"center",fontSize:18,bold:false}]);
  let [solidColourTableHeader, setSolidColourTableHeader] = useState([{text:'COLOUR : SOLID COLOUR =',bold:false}]);
  let [solidColourDieselTableData, setSolidColourDieselTableData] = useState([{text:'COLOUR : SOLID COLOUR =',bold:false}]);
  let [solidColourCNGTableData, setSolidColourCNGTableData] = useState([{text:'COLOUR : SOLID COLOUR =',bold:false}]);
  let [noCashPaymentTableHeader,setNoCashPaymentTableHeader] = useState([{text:'note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED',bold:false}]);
  let [termsAndConitionsTableHeader,setTermsAndConitionsTableHeader] = useState([{text:'Terms & Conditions Details Overleaf',bold:false}]);
  let [termsAndConditionsTableData,setTermsAndConitionsTableData] = useState([{text:'TERMS & CONDITIONS:    Model Features:   Please refer separate sheet:  No extended warrenty Tourist Taxi',bold:false}]);
  let [termsAndConditionsDetailsTableData,setTermsAndConitionsDetailsTableData] = useState([{
    bold:false,
    fontSize:12,
    ol: [
      'Payment by DD/PO to be drawn in the name of KOTHARI CARS PVT.LTD payable at Pune.',
      "Customer request is not to pay any advance / part payment in cash to the consultant. Any such trasaction's done will be customer at his own risk for which company will not be responsible.",
      "The prices mentioned are  subject to change without  prior notice and will be charged as applicable  at the time of Registration / delivery.",
      "Model specifiction, features & Colours are subject to change without prior notice.",
      "Delivery - Subject to realisation of  DD / Cheque.",
      "RMK=Cost of Rubber Mat kit include GST. +RSA -Road Service assistance include GST for 1 year",
      "Subject to jurisdiction of Pune Court only",
      "Two schemes cannot be clubbed together.",
      "Basic Accessories Kit Not Included Labour Charges",
      "Hyundai Motor India Ltd. reserves the right to change the booking procedure","equipment specifications and discontinue models without notice.",
      "Force majeure clause would be applicable to all deliveries.",
      "The retail schemes (If Any) given alongwith this pricelist will be applicable on the physical stock and scheme period only.",
      "Retail scheme,Price applicable will be valid only on receipt of full Ex showroom price. ",
      "The Insurance premium is calculated @ 95 %of Exshowroom Price.",
      "Incase of cancellation of booking, Cancellation charges will be charged as per written in  booking form",
      "Income tax Pan no and address proof in original are necessary at the time of Booking.",
      "Purchase of Insurance Policy and Accessories from Dealer are optional.",
      "Value of discount given shall be netted off from the vehicle invoice amount, insurance and registration.",
      "Vechicle Register in PCMC or OUT Side area then CRTM Charges Rs. 200 Extra.",
      "Extended Warranty & Miscellaneous Expenses amount includes GST @ 18%",              "RTO tax 2% charged extra as per intinmated by RTO department will be applied as per confirmation receive by RTO department as the time registation.",              "Shield of Trust Price for 5yr/60 km inclusing GST 18% also this product get single year also"
    ]

  }]);
  let [ShowroomITableData,setShowroomITableData] = useState([{text:'Showroom I : CTS No. 45/1B/A,Shankarsheth Road,Near KumarPacific Mall,Gultekdi,Pune - 411037. Phone - 24338600 email : kotharihyundai@hotmail.com.',bold:false}]);
  let [ShowroomIITableData,setShowroomIITableData] = useState([{text:'Showroom II :-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27071100 Fax No 30478506  email : kotharihyundai@hotmail.com.',bold:false}]);
  let [ShowroomIIITableData,setShowroomIIITableData] = useState([{text:'Showroom III: Sylvan heights Opp Seasons Apt Hotel Sanewadi Aundh Pune 411007  email : kotharihyundai@hotmail.com.  Phone No.020-30174100',bold:false}]);
  let [ShowroomIVTableData,setShowroomIVTableData] = useState([{text:'Showroom IV: Gat No. 15,49/1 , Nagar-Pune road, Opp Manikchand Company, Saradwadi, Shirur 412210 Phone 02138-602525',bold:false}]);
  let [ShowroomVTableData,setShowroomVTableData] = useState([{text:"Showroom V: Gat No.414, At Post. Velu, Khed Shivapur, Near Joshi Wadewale, Taluka. Bhor Dist. Pune - 412 205",bold:false}]);
  let [ShowroomVITableData,setShowroomVITableData] = useState([{text:"Showroom VI : Shop No 1 & 2 S.No.461,Tilak Road,Sadashiv Peth,Pune - 411030 Phone - 24338600 email : kotharihyundai@hotmail.com.",bold:false}]);
  let [work1TableData,setWork1TableData] = useState([{text:'Works I : 691/A-2,Pune-Satara Road,Bibwewadi,Pune 411 037 Phone : 30298612 / 24222090/96',bold:false}]);
  let [work2TableData,setWork2TableData] = useState([{text:'Works II : No.2 A / 8 Bhau Patil Road Near Pune IT Park Bopodi Pune 411 003 Phone :  30112740/41  FAX: 25815237  ',bold:false}]);
  let [work3TableData,setWork3TableData] = useState([{text:'Works III:-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27014401/30478500      Fax No 30478506',bold:false}]);
  let [work4TableData,setWork4TableData] = useState([{text:'Works IV:- Sr.18 Dharmavat Corner , Opp Sai Services , Kalyan Mangal Karyalaya , Kondhwa Bk. , Pune - 411048 . Phone : 30402700 ',bold:false}]);
  let [depotTableData,setDepotTableData] = useState([{text:'Depot : Sr. No. 1 / 1 / 1 A  Bhilarewadi , Behind Leyland Petrol Pump , Pune - 411046   Phone  No : 30468600  ',bold:false}]);
  let [carVariantDieselTableData, setCarVariantDieselTableData] = useState([{text:"PARTICULARS",bold:false}]);
  let [exShowroomDieselTableData, setExShowroomDieselTableData] = useState([{text:"EX - SHOWROOM PRICE",bold:false}]);
  let [tcsExShowroomDieselTableData, setTcsExShowroomDieselTableData] = useState([{text:"TCS 1% EX-SHOWROOM",bold:false}]);
  let [insuranceDieselTableData, setInsuranceDieselTableData] = useState([{text:"INSURANCE (INCLUDE '0' DEP & CONSUMBALE)",bold:false}]);
  let [rtoCompanyDieselTableData, setRtoCompanyDieselTableData] = useState([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Company',bold:false}]);
  let [rtoIndividualDieselTableData, setRtoIndividualDieselTableData] = useState([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Individual',bold:false}]);
  let [fourFifthExtendedWarrantyDieselTableData, setFourFifthExtendedWarrantyDieselTableData] = useState([{text:'4th & 5th YEAR EXTENDED WARRANTY',bold:false}]);
  let [rmkDieselTableData, setRmkDieselTableData] = useState([{text:'RMK',bold:false}]);
  let [basicAccessoriesKitDieselTableData, setBasicAccessoriesKitDieselTableData] = useState([{text:'BASIC ACCESSORIES KIT',bold:false}]);
  let [rsaDieselTableData, setRsaDieselTableData] = useState([{text:'RSA',bold:false}]);
  let [additionalPremiumForEngineProtectionDieselTableData, setAdditionalPremiumForEngineProtectionDieselTableData] = useState([{text:'ADDL PREMIUM FOR ENGINE PROTECTION',bold:false}]);
  let [additionalPremiumforReturnToInvoiceDieselTableData, setAdditionalPremiumforReturnToInvoiceDieselTableData] = useState([{text:'ADDL PREMIUM FOR RETURN TO INVOICE(RTI)',bold:false}]);
  let [totalIndividualDieselTableData, setTotalIndividualDieselTableData] = useState([{text:'TOTAL INDIVIDUAL',bold:false}]);
  let [totalCompanyDieselTableData, setTotalCompanyDieselTableData] = useState([{text:'TOTAL COMPANY',bold:false}]);
  let [sheildOfTrustDieselTableData, setSheildOfTrustDieselTableData] = useState([{text:'T5 YR/60K SHIELD OF TRUST',bold:false}]);
  let [modelDieseltableHeader, setModelDieselTableHeader] = useState([{text:'',alignment:"center",fontSize:18,bold:false}]);
  let [carVariantCNGTableData, setCarVariantCNGTableData] = useState([{text:"PARTICULARS",bold:false}]);
  let [exShowroomCNGTableData, setExShowroomCNGTableData] = useState([{text:"EX - SHOWROOM PRICE",bold:false}]);
  let [tcsExShowroomCNGTableData, setTcsExShowroomCNGTableData] = useState([{text:"TCS 1% EX-SHOWROOM",bold:false}]);
  let [insuranceCNGTableData, setInsuranceCNGTableData] = useState([{text:"INSURANCE (INCLUDE '0' DEP & CONSUMBALE)",bold:false}]);
  let [rtoCompanyCNGTableData, setRtoCompanyCNGTableData] = useState([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Company',bold:false}]);
  let [rtoIndividualCNGTableData, setRtoIndividualCNGTableData] = useState([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Individual',bold:false}]);
  let [fourFifthExtendedWarrantyCNGTableData, setFourFifthExtendedWarrantyCNGTableData] = useState([{text:'4th & 5th YEAR EXTENDED WARRANTY',bold:false}]);
  let [rmkCNGTableData, setRmkCNGTableData] = useState([{text:'RMK',bold:false}]);
  let [basicAccessoriesKitCNGTableData, setBasicAccessoriesKitCNGTableData] = useState([{text:'BASIC ACCESSORIES KIT',bold:false}]);
  let [rsaCNGTableData, setRsaCNGTableData] = useState([{text:'RSA',bold:false}]);
  let [additionalPremiumForEngineProtectionCNGTableData, setAdditionalPremiumForEngineProtectionCNGTableData] = useState([{text:'ADDL PREMIUM FOR ENGINE PROTECTION',bold:false}]);
  let [additionalPremiumforReturnToInvoiceCNGTableData, setAdditionalPremiumforReturnToInvoiceCNGTableData] = useState([{text:'ADDL PREMIUM FOR RETURN TO INVOICE(RTI)',bold:false}]);
  let [totalIndividualCNGTableData, setTotalIndividualCNGTableData] = useState([{text:'TOTAL INDIVIDUAL',bold:false}]);
  let [totalCompanyCNGTableData, setTotalCompanyCNGTableData] = useState([{text:'TOTAL COMPANY',bold:false}]);
  let [sheildOfTrustCNGTableData, setSheildOfTrustCNGTableData] = useState([{text:'T5 YR/60K SHIELD OF TRUST',bold:false}]);
  let [modelCNGtableHeader, setModelCNGTableHeader] = useState([{text:'',alignment:"center",fontSize:18,bold:false}]);
  let [isPriceListModalOpen,setIsPriceListModalOpen] = useState(false);
  let [disablePDFButton,setDisablePDFButton] = useState(true);
  let [PDFCarImages,setPDFCarImages] = useState("");
  let [pdfWidthForCarVariant,setPdfWidthForCarVariant] = useState([]);
  let [pdfWidthForCarVariantDiesel,setPdfWidthForCarVariantDiesel] = useState([]);
  let [pdfWidthForCarVariantCNG,setPdfWidthForCarVariantCNG] = useState([]);
  let [petrolCarVariant,setPetrolCarVariant] = useState(false);
  let [dieselCarVariant,setDieselCarVariant] = useState(false);
  let [CNGCarVariant,setCNGCarVariant] = useState(false);
  let [tableLength,setTableLength] = useState(0);

  useEffect(() => {
    let  taskTodoCardCount = document.getElementById("taskTodoCardCount");
    taskTodoCardCount.innerText = "0";
    let  taskToTrackCardCount = document.getElementById("taskToTrackCardCount");
    taskToTrackCardCount.innerText = "0";
    let  taskCompletedCardCount = document.getElementById("taskCompletedCardCount");
    taskCompletedCardCount.innerText = "0";
    let  taskTodoCardCountMobile = document.getElementById("taskTodoCardCountMobile");
    taskTodoCardCountMobile.innerText = "0";
    let  taskToTrackCardCountMobile = document.getElementById("taskToTrackCardCountMobile");
    taskToTrackCardCountMobile.innerText = "0";
    let  taskCompletedCardCountMobile = document.getElementById("taskCompletedCardCountMobile");
    taskCompletedCardCountMobile.innerText = "0";
  }, []);

  useEffect(async() => {
    let CountUpOptions = {
      startVal: 0,
      duration: 3
    };
    let taskResponseToDo = await axios.get(`${CONSTANTS.API_URL}/api/v1/taskListCount?type=pending`);
    let taskResponseTaskTrack = await axios.get(`${CONSTANTS.API_URL}/api/v1/taskListCount?type=taskTrack`);
    let taskResponseDone = await axios.get(`${CONSTANTS.API_URL}/api/v1/taskListCount?type=completed`);
    console.log("taskResponseDonetaskResponseDone",taskResponseDone);
    let countObj = {
      TODO: taskResponseToDo.data.length,
      TOTRACK: taskResponseTaskTrack.data.length,
      DONE: taskResponseDone.data.length
    };
    // modified by Vihang
    // modified at 5 May 2022
    // modification: fixed the issue of data not showing on the list view
    let list = await getRowsListForTask(taskResponseToDo.data);
    await setTaskToDoList(list);
    let taskTodoCardCountElement = document.getElementById("taskTodoCardCount");
    const taskTodoCardCount = await new CountUp(taskTodoCardCountElement,taskResponseToDo.data.length,CountUpOptions);
    await taskTodoCardCount.start();
    let taskTodoCardCountMobileElement = document.getElementById("taskTodoCardCountMobile");
    const taskTodoCardCountMobile = await new CountUp(taskTodoCardCountMobileElement,taskResponseToDo.data.length,CountUpOptions);
    await taskTodoCardCountMobile.start();
    let tasksToTrackList= await getRowsListForTask(taskResponseTaskTrack.data);
    await setTaskToTrackList(tasksToTrackList);
    let taskToTrackCardCountElement = document.getElementById("taskToTrackCardCount");
    const taskToTrackCardCount = await new CountUp(taskToTrackCardCountElement,taskResponseTaskTrack.data.length,CountUpOptions);
    await taskToTrackCardCount.start();
    let taskToTrackCardCountMobileElement = document.getElementById("taskToTrackCardCountMobile");
    const taskToTrackCardCountMobile = await new CountUp(taskToTrackCardCountMobileElement,taskResponseTaskTrack.data.length,CountUpOptions);
    await taskToTrackCardCountMobile.start();
    let tasksDoneList= await getRowsListForTask(taskResponseDone.data);
    await setTaskDoneList(tasksDoneList);
    console.log(taskDoneList, 'taskDoneListtaskDoneList');
    let selectedTab = getItem("selectedTab");
    if (selectedTab === "TASKS TO DO") {
      await setTasksData(list);
    } else if (selectedTab === "TASKS TO TRACK") {
      await setTasksData(tasksToTrackList);
    } else if (selectedTab === "COMPLETED TASKS") {
      await setTasksData(tasksDoneList);
    }
    let taskCompletedCardCountElement = document.getElementById("taskCompletedCardCount");
    const taskCompletedCardCount = await new CountUp(taskCompletedCardCountElement,taskResponseDone.data.length,CountUpOptions);
    await taskCompletedCardCount.start();
    let taskCompletedCardCountMobileElement = document.getElementById("taskCompletedCardCountMobile");
    const taskCompletedCardCountMobile = await new CountUp(taskCompletedCardCountMobileElement,taskResponseDone.data.length,CountUpOptions);
    await taskCompletedCardCountMobile.start();
    await setDayPlanCount(countObj);
    let selectedCurrentItem = getItem("currentRowID");
    let selectedNextItem = getItem("nextRowID");
    console.log("selectedNextItemselectedNextItem",selectedNextItem);
    if (Object.keys(selectedCurrentItem).length) {
      setItem("currentRowID",selectedCurrentItem);
      setItem("nextRowID",selectedNextItem);
      await props.toggleTaskEdit(selectedCurrentItem, selectedNextItem);

    } else if (selectedTab === "TASKS TO DO") {
      setItem("currentRowID",list.rows[0]);
      setItem("nextRowID",list.rows[1]);
      await props.toggleTaskEdit(list.rows[0], list.rows[1]);
    } else if (selectedTab === "TASKS TO TRACK") {
      setItem("currentRowID",list.rows[0]);
      setItem("nextRowID",list.rows[1]);
      await props.toggleTaskEdit(list.rows[0], list.rows[1]);
    } else if (selectedTab === "COMPLETED TASKS") {
      setItem("currentRowID",tasksToTrackList.rows[0]);
      setItem("nextRowID",tasksToTrackList.rows[1]);
      await props.toggleTaskEdit(tasksToTrackList.rows[0], tasksToTrackList.rows[1]);
    } else {
      setItem("currentRowID",tasksDoneList.rows[0]);
      setItem("nextRowID",tasksDoneList.rows[1]);
      await props.toggleTaskEdit(tasksDoneList.rows[0], tasksDoneList.rows[1]);
    }

  },[]);

  useEffect(async () => {
    let currentTask = await getItem("currentRowID");
    console.log("currentTask",currentTask);
    console.log("taskData",taskData);
    if (currentTask && taskData.rows  && taskData.rows.length !== 0) {
      let index = taskData.rows.findIndex((d) => d.uuid === currentTask.uuid);
      console.log("indexindex",index);
      if (index > -1) {
        let nextTask = taskData.rows[index+1];
        console.log("nextTasknextTasknextTask",nextTask);
        if (nextTask) {
          await setItem("nextRowID", nextTask);
        }
      }
    }
  },[props.updateNextTask]);

  async function changeActiveTab(tabName) {
    setItem("selectedTab", tabName);
    // modified by Vihang
    // modified at 17 May 2022
    // modification: fixed the list animation issue while getting the data

    await setTasksData({})
    if (tabName === 'TASKS TO DO' || tabName === 'TASKS TO TRACK' || tabName === 'COMPLETED TASKS') {
      await setActiveFilter('DAILY TASKS');
      activePageTabItem = tabName;
      await setActivePageTabItem(activePageTabItem);
      // if (userInfo.userDesignation === "RECEPTIONIST") {
      if (tabName === "TASKS TO DO") {
        await setTasksData(taskToDoList);
        setItem("currentRowID",taskToDoList.rows[0]);
        setItem("nextRowID",taskToDoList.rows[1]);
        await props.toggleTaskEdit(taskToDoList.rows[0], taskToDoList.rows[1]);
      } else if (tabName === "TASKS TO TRACK") {
        await setTasksData(taskToTrackList);
        setItem("currentRowID",tasksToTrackList.rows[0]);
        setItem("nextRowID",tasksToTrackList.rows[1]);
        await props.toggleTaskEdit(tasksToTrackList.rows[0], tasksToTrackList.rows[1]);
      } else if (tabName === 'COMPLETED TASKS') {
        await setTasksData(taskDoneList);
        setItem("currentRowID",taskDoneList.rows[0]);
        setItem("nextRowID",taskDoneList.rows[1]);
        await props.toggleTaskEdit(taskDoneList.rows[0], taskDoneList.rows[1]);
      }
      // }
      // else if (tabName === "TASKS TO DO") {
      //   let EnquiryTaskList = await getRowsListForTask(taskToDoList.filter((task) => ((task.stageName ? task.stageName === 'Enquiry': !task.stageName))));
      //   let BookingTaskList = await getRowsListForTask(taskToDoList.filter((task) => ((task.stageName ? task.stageName === 'Booking': !task.stageName))));
      //   setTasksData(EnquiryTaskList);
      //   setTaskToDoDaily(EnquiryTaskList);
      //   setTaskToDoFollow(BookingTaskList);
      // } else if (tabName === "TASKS TO TRACK") {
      //   let EnquiryTaskList = await getRowsListForTask(taskToTrackList.filter((task) => ((task.stageName ? task.stageName === 'Enquiry': !task.stageName))));
      //   let BookingTaskList = await getRowsListForTask(taskToTrackList.filter((task) => ((task.stageName ? task.stageName === 'Booking': !task.stageName))));
      //   setTasksData(EnquiryTaskList);
      //   setTaskToDoDaily(EnquiryTaskList);
      //   setTaskToDoFollow(BookingTaskList);
      // } else if (tabName === 'COMPLETED TASKS') {
      //   let EnquiryTaskList = await getRowsListForTask(taskDoneList.filter((task) => ((task.stageName ? task.stageName === 'Enquiry': !task.stageName))));
      //   let BookingTaskList = await getRowsListForTask(taskDoneList.filter((task) => ((task.stageName ? task.stageName === 'Booking': !task.stageName))));
      //   setTasksData(EnquiryTaskList);
      //   setTaskToDoFollow(BookingTaskList);
      //   setTaskToDoDaily(EnquiryTaskList);
      // }
    }
    await setActivePageTabItem(tabName);
  }

  async function setTaskData(filter) {
    setActiveFilter(filter);
    if (userInfo.userDesignation === "RECEPTIONIST") {
      if (activePageTabItem === 'TASKS TO DO') {
        if (filter === "DAILY TASKS") {
          await setTasksData(taskToDoDaily);
        } else if (filter === "FOLLOW UP") {
          await setTasksData(taskToDoFollow);
        } else if (filter === "COURIER") {
          await setTasksData(taskToDoCourier);
        }
        else if (filter === "ESCALATED TASKS") {
          await setTasksData(taskToDoEscalatedTasks);
        }
        else if (filter === "CALLS") {
          await setTasksData(taskToDoCalls);
        }
      } else if (activePageTabItem === "TASKS TO TRACK") {
        if (filter === "DAILY TASKS") {
          await setTasksData(taskToTrackDaily);
        } else if (filter === "FOLLOW UP") {
          await setTasksData(taskToTrackFollow);
        } else if (filter === "COURIER") {
          await setTasksData(taskToTrackCourier);
        }
        else if (filter === "ESCALATED TASKS") {
          await setTasksData(taskToTrackEscalatedTasks);
        }
        else if (filter === "CALLS") {
          await setTasksData(taskToTrackCalls);
        }
      } else if (activePageTabItem === 'COMPLETED TASKS') {
        if (filter === "DAILY TASKS") {
          await setTasksData(completedTaskDaily);
        } else if (filter === "FOLLOW UP") {
          await setTasksData(completedTaskFollow);
        } else if (filter === "COURIER") {
          await setTasksData(completedTaskCourier);
        }
      }
    } else if (activePageTabItem === 'TASKS TO DO') {
      if (filter === 'DAILY TASKS') {
        let EnquiryTaskList = await getRowsListForTask(taskToDoList.filter((task) => ((task.stageName === 'Enquiry'))));
        setTasksData(EnquiryTaskList);
        setTaskToDoDaily(EnquiryTaskList);

      }
      if (filter === 'FOLLOW UP') {
        let BookingTaskList = await getRowsListForTask(taskToDoList.filter((task) => ((task.stageName === 'Booking'))));
        setTasksData(BookingTaskList);
        setTaskToDoFollow(BookingTaskList);

      }

    } else if (activePageTabItem === "TASKS TO TRACK") {
      setTasksData(taskToTrack);
    } else if (activePageTabItem === 'COMPLETED TASKS') {
      setTasksData(completedTask);
    }
  }

  async function getRowsListForTask(data) {
    const colList = [{
      label: 'Name',
      field: 'displayName',
      width: '200px',
      sort: 'asc'
    },
    {
      label: 'Active Since',
      field: 'createdOn',
      sort: 'asc'
    }, {
      label: 'Deadline',
      field: 'deadline',
      sort: 'asc'
    }, {
      label: 'Case ID',
      field: 'caseID',
      sort: 'desc'
    }];
    const listObj = {
      columns: colList, rows: data
    };
    return listObj;
  }

  function addEmptyValuesForRecord(tableData,Tablelength) {
    let newTableData = tableData;
    let TableLength = Tablelength - tableLength;
    setTableLength(TableLength);
    newTableData[0].colSpan = TableLength + 1;
    for (let i = 0 ; i < TableLength ; i++ ) {
      newTableData.push("");
    }

    return newTableData;
  }
  // modified by Vihang
  // modified at 22 April 2022
  // modification: pdfs for petrol diesel and cng variant created

  // modified by Vihang
  // modified at 02 May 2022
  // modification: fixed minor issues in pricelist pdf

  // modified by Vihang
  // modified at 5 May 2022
  // modification: solidcolor data integration for pricelist pdf
  async function priceList() {
    console.log(carVariantTableData,'carVariantTableDatacarVariantTableDatacarVariantTableDatacarVariantTableData');
    let pdfName = "price list" + ".pdf";
    let docDefinition = {
      pageSize: 'A1',
      pageOrientation: PDFSTYLE.pageSetup.pageOrientationPortrait,
      pageMargins: PDFSTYLE.pageSetup.pageMargins,

      // background: function (page) {
      //     if(page > 1)
      //     return {

      //             columns: [
      //               { image:hyundai, width: 600, height:1000},
      //             ]
      //     };
      // },
      // footer(currentPage, pageCount,page) {
      //   if(page > 1)
      //     return {
      //         style: "pageFooter",
      //         columns: [
      //             {
      //                 text: [{ text: "Created by KDMS\n", width: 50 }]
      //             },

      //             { text: currentPage.toString() + " of " + pageCount, alignment: "right" }
      //         ]
      //     }
      // },
      content: [
        {
          alignment: 'justify',
          columns: [
            {
              image:hyundaiLogo,
              width:200,
              height:80
            },
            {
              text: 'KOTHARI CARS PVT LTD\nPRICE LIST W.E.F. 02ND MAR 2022\n' + modelVariantName,
              alignment:"center",
              bold:false,
              fontSize:18
            },
            {
              image:PDFCarImages,
              width:150,
              height:80
            }
          ]
        },
        {
          fontSize:16,
          table: {
            widths: ['*'],
            body: [
              [{
                text: 'PRICE LIST FOR PMC', alignment: 'center'
              }],
              [{
                text: allnewi20tableHeader, alignment: 'center'
              }]
            ]
          }
        },
        (carVariantTableData && carVariantTableData.length > 0) && (
          {
            fontSize:12,
            table: {
              widths:pdfWidthForCarVariant,
              body: [
                carVariantTableData,
                exShowroomTableData,
                tcsExShowroomTableData,
                insuranceTableData,
                rtoCompanyTableData,
                rtoIndividualTableData,
                fourFifthExtendedWarrantyTableData,
                rmkTableData,
                basicAccessoriesKitTableData,
                rsaTableData,
                additionalPremiumForEngineProtectionTableData,
                additionalPremiumforReturnToInvoiceTableData,
                totalIndividualTableData,
                totalCompanyTableData,
                sheildOfTrustTableData
              ]
            }
          }
        ),
        {
          fontSize:12,
          pageBreak: catalogueCarVariantDiesel && catalogueCarVariantDiesel.length > 0 ? "after" : "",
          table: {
            widths:["*"],
            body: [
              solidColourTableHeader,
              noCashPaymentTableHeader,
              termsAndConitionsTableHeader,
              termsAndConditionsTableData,
              termsAndConditionsDetailsTableData ,
              ShowroomITableData,
              ShowroomIITableData,
              ShowroomIIITableData,
              ShowroomIVTableData,
              ShowroomVTableData,
              ShowroomVITableData,
              work1TableData,
              work2TableData,
              work3TableData,
              work4TableData,
              depotTableData
            ]
          }
        },
        (catalogueCarVariantDiesel && catalogueCarVariantDiesel.length > 0) ? ({
          fontSize:16,
          table: {
            widths: ['*'],
            body: [
              [{
                text: 'PRICE LIST FOR PMC', alignment: 'center'
              }],
              [{
                text: modelDieseltableHeader, alignment: 'center'
              }]
            ]
          }
        }) : {},
        (catalogueCarVariantDiesel && catalogueCarVariantDiesel.length > 0) ? (
          {
            fontSize:12,
            table: {
              widths:pdfWidthForCarVariantDiesel,
              body: [
                carVariantDieselTableData,
                exShowroomDieselTableData,
                tcsExShowroomDieselTableData,
                insuranceDieselTableData,
                rtoCompanyDieselTableData,
                rtoIndividualDieselTableData,
                fourFifthExtendedWarrantyDieselTableData,
                rmkDieselTableData,
                basicAccessoriesKitDieselTableData,
                rsaDieselTableData,
                additionalPremiumForEngineProtectionDieselTableData,
                additionalPremiumforReturnToInvoiceDieselTableData,
                totalIndividualDieselTableData,
                totalCompanyDieselTableData,
                sheildOfTrustDieselTableData
              ]
            }
          }
        ) : {},
        (catalogueCarVariantDiesel && catalogueCarVariantDiesel.length > 0) ? ({
          fontSize:12,
          pageBreak: catalogueCarVariantCNG && catalogueCarVariantCNG.length > 0 ? "after" : "",
          table: {
            widths:["*"],
            body: [
              solidColourDieselTableData,
              ["note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED"],
              ["Terms & Conditions Details Overleaf"],
              ["TERMS & CONDITIONS:    Model Features:   Please refer separate sheet:  No extended warrenty Tourist Taxi"],
              [{  ol: [
                'Payment by DD/PO to be drawn in the name of KOTHARI CARS PVT.LTD payable at Pune.',
                "Customer request is not to pay any advance / part payment in cash to the consultant. Any such trasaction's done will be customer at his own risk for which company will not be responsible.",
                "The prices mentioned are  subject to change without  prior notice and will be charged as applicable  at the time of Registration / delivery.",
                "Model specifiction, features & Colours are subject to change without prior notice.",
                "Delivery - Subject to realisation of  DD / Cheque.",
                "RMK=Cost of Rubber Mat kit include GST. +RSA -Road Service assistance include GST for 1 year",
                "Subject to jurisdiction of Pune Court only",
                "Two schemes cannot be clubbed together.",
                "Basic Accessories Kit Not Included Labour Charges",
                "Hyundai Motor India Ltd. reserves the right to change the booking procedure","equipment specifications and discontinue models without notice.",
                "Force majeure clause would be applicable to all deliveries.",
                "The retail schemes (If Any) given alongwith this pricelist will be applicable on the physical stock and scheme period only.",
                "Retail scheme,Price applicable will be valid only on receipt of full Ex showroom price. ",
                "The Insurance premium is calculated @ 95 %of Exshowroom Price.",
                "Incase of cancellation of booking, Cancellation charges will be charged as per written in  booking form",
                "Income tax Pan no and address proof in original are necessary at the time of Booking.",
                "Purchase of Insurance Policy and Accessories from Dealer are optional.",
                "Value of discount given shall be netted off from the vehicle invoice amount, insurance and registration.",
                "Vechicle Register in PCMC or OUT Side area then CRTM Charges Rs. 200 Extra.",
                "Extended Warranty & Miscellaneous Expenses amount includes GST @ 18%",              "RTO tax 2% charged extra as per intinmated by RTO department will be applied as per confirmation receive by RTO department as the time registation.",              "Shield of Trust Price for 5yr/60 km inclusing GST 18% also this product get single year also"
              ]} ],
              ["Showroom I : CTS No. 45/1B/A,Shankarsheth Road,Near KumarPacific Mall,Gultekdi,Pune - 411037. Phone - 24338600 email : kotharihyundai@hotmail.com."],
              ["Showroom II :-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27071100 Fax No 30478506  email : kotharihyundai@hotmail.com."],
              ["Showroom III: Sylvan heights Opp Seasons Apt Hotel Sanewadi Aundh Pune 411007  email : kotharihyundai@hotmail.com.  Phone No.020-30174100"],
              ["Showroom IV: Gat No. 15,49/1 , Nagar-Pune road, Opp Manikchand Company, Saradwadi, Shirur 412210 Phone 02138-602525"],
              ["Showroom V: Gat No.414, At Post. Velu, Khed Shivapur, Near Joshi Wadewale, Taluka. Bhor Dist. Pune - 412 205"],
              ["Showroom VI : Shop No 1 & 2 S.No.461,Tilak Road,Sadashiv Peth,Pune - 411030 Phone - 24338600 email : kotharihyundai@hotmail.com."],
              ["Works I : 691/A-2,Pune-Satara Road,Bibwewadi,Pune 411 037 Phone : 30298612 / 24222090/96"],
              ["Works II : No.2 A / 8 Bhau Patil Road Near Pune IT Park Bopodi Pune 411 003 Phone :  30112740/41  FAX: 25815237 "],
              ["Works III:-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27014401/30478500      Fax No 30478506"],
              ["Works IV:- Sr.18 Dharmavat Corner , Opp Sai Services , Kalyan Mangal Karyalaya , Kondhwa Bk. , Pune - 411048 . Phone : 30402700 "],
              ["Depot : Sr. No. 1 / 1 / 1 A  Bhilarewadi , Behind Leyland Petrol Pump , Pune - 411046   Phone  No : 30468600  "]
            ]
          }
        }) : {},
        (catalogueCarVariantCNG && catalogueCarVariantCNG.length > 0) ? (
          {
            fontSize:16,
            table: {
              widths: ['*'],
              body: [
                [{
                  text: 'PRICE LIST FOR PMC', alignment: 'center'
                }],
                [{
                  text: modelCNGtableHeader, alignment: 'center'
                }]
              ]
            }
          }
        ) : {},
        (catalogueCarVariantCNG && catalogueCarVariantCNG.length > 0) ? (
          {
            fontSize:12,
            table: {
              widths:pdfWidthForCarVariantCNG,
              body: [
                // addEmptyValuesForRecord(priceListForPmc,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(modelCNGtableHeader,catalogueCarVariantCNG.length),
                carVariantCNGTableData,
                exShowroomCNGTableData,
                tcsExShowroomCNGTableData,
                insuranceCNGTableData,
                rtoCompanyCNGTableData,
                rtoIndividualCNGTableData,
                fourFifthExtendedWarrantyCNGTableData,
                rmkCNGTableData,
                basicAccessoriesKitCNGTableData,
                rsaCNGTableData,
                additionalPremiumForEngineProtectionCNGTableData,
                additionalPremiumforReturnToInvoiceCNGTableData,
                totalIndividualCNGTableData,
                totalCompanyCNGTableData,
                sheildOfTrustCNGTableData
                // addEmptyValuesForRecord(solidColourTableHeader,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(noCashPaymentTableHeader,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(termsAndConitionsTableHeader,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(termsAndConditionsTableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(termsAndConditionsDetailsTableData,catalogueCarVariantCNG.length) ,
                // addEmptyValuesForRecord(ShowroomITableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(ShowroomIITableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(ShowroomIIITableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(ShowroomIVTableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(ShowroomVTableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(ShowroomVITableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(work1TableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(work2TableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(work3TableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(work4TableData,catalogueCarVariantCNG.length),
                // addEmptyValuesForRecord(depotTableData,catalogueCarVariantCNG.length)
              ]
            }
          }
        ) : {},
        (catalogueCarVariantCNG && catalogueCarVariantCNG.length > 0) ? (
          {
            fontSize:12,
            table: {
              widths:["*"],
              body: [
                solidColourCNGTableData,
                ["note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED"],
                ["Terms & Conditions Details Overleaf"],
                ["TERMS & CONDITIONS:    Model Features:   Please refer separate sheet:  No extended warrenty Tourist Taxi"],
                [{  ol: [
                  'Payment by DD/PO to be drawn in the name of KOTHARI CARS PVT.LTD payable at Pune.',
                  "Customer request is not to pay any advance / part payment in cash to the consultant. Any such trasaction's done will be customer at his own risk for which company will not be responsible.",
                  "The prices mentioned are  subject to change without  prior notice and will be charged as applicable  at the time of Registration / delivery.",
                  "Model specifiction, features & Colours are subject to change without prior notice.",
                  "Delivery - Subject to realisation of  DD / Cheque.",
                  "RMK=Cost of Rubber Mat kit include GST. +RSA -Road Service assistance include GST for 1 year",
                  "Subject to jurisdiction of Pune Court only",
                  "Two schemes cannot be clubbed together.",
                  "Basic Accessories Kit Not Included Labour Charges",
                  "Hyundai Motor India Ltd. reserves the right to change the booking procedure","equipment specifications and discontinue models without notice.",
                  "Force majeure clause would be applicable to all deliveries.",
                  "The retail schemes (If Any) given alongwith this pricelist will be applicable on the physical stock and scheme period only.",
                  "Retail scheme,Price applicable will be valid only on receipt of full Ex showroom price. ",
                  "The Insurance premium is calculated @ 95 %of Exshowroom Price.",
                  "Incase of cancellation of booking, Cancellation charges will be charged as per written in  booking form",
                  "Income tax Pan no and address proof in original are necessary at the time of Booking.",
                  "Purchase of Insurance Policy and Accessories from Dealer are optional.",
                  "Value of discount given shall be netted off from the vehicle invoice amount, insurance and registration.",
                  "Vechicle Register in PCMC or OUT Side area then CRTM Charges Rs. 200 Extra.",
                  "Extended Warranty & Miscellaneous Expenses amount includes GST @ 18%",              "RTO tax 2% charged extra as per intinmated by RTO department will be applied as per confirmation receive by RTO department as the time registation.",              "Shield of Trust Price for 5yr/60 km inclusing GST 18% also this product get single year also"
                ]} ],
                ["Showroom I : CTS No. 45/1B/A,Shankarsheth Road,Near KumarPacific Mall,Gultekdi,Pune - 411037. Phone - 24338600 email : kotharihyundai@hotmail.com."],
                ["Showroom II :-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27071100 Fax No 30478506  email : kotharihyundai@hotmail.com."],
                ["Showroom III: Sylvan heights Opp Seasons Apt Hotel Sanewadi Aundh Pune 411007  email : kotharihyundai@hotmail.com.  Phone No.020-30174100"],
                ["Showroom IV: Gat No. 15,49/1 , Nagar-Pune road, Opp Manikchand Company, Saradwadi, Shirur 412210 Phone 02138-602525"],
                ["Showroom V: Gat No.414, At Post. Velu, Khed Shivapur, Near Joshi Wadewale, Taluka. Bhor Dist. Pune - 412 205"],
                ["Showroom VI : Shop No 1 & 2 S.No.461,Tilak Road,Sadashiv Peth,Pune - 411030 Phone - 24338600 email : kotharihyundai@hotmail.com."],
                ["Works I : 691/A-2,Pune-Satara Road,Bibwewadi,Pune 411 037 Phone : 30298612 / 24222090/96"],
                ["Works II : No.2 A / 8 Bhau Patil Road Near Pune IT Park Bopodi Pune 411 003 Phone :  30112740/41  FAX: 25815237 "],
                ["Works III:-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27014401/30478500      Fax No 30478506"],
                ["Works IV:- Sr.18 Dharmavat Corner , Opp Sai Services , Kalyan Mangal Karyalaya , Kondhwa Bk. , Pune - 411048 . Phone : 30402700 "],
                ["Depot : Sr. No. 1 / 1 / 1 A  Bhilarewadi , Behind Leyland Petrol Pump , Pune - 411046   Phone  No : 30468600  "]
              ]
            }
          }
        ) : {}

      ],
      styles: PDFSTYLE.styles,
      undertakingTable: {
        margin: [0, 0, 0, 10]
      },
      undertakingHeader: {
        fontSize: 18,
        bold:false,
        alignment:"center"
      }
    };
    await pdfMake.createPdf(docDefinition).open();
    setCatalogueCarVariant([]);
    await setCarVariantTableData([{text:"PARTICULARS", fontSize:12,bold:false}]);
    await setExShowroomTableData([{text:"EX - SHOWROOM PRICE", fontSize:12,bold:false}]);
    await setTcsExShowroomTableData([{text:"TCS 1% EX-SHOWROOM", fontSize:12,bold:false}]);
    await setInsuranceTableData([{text:"INSURANCE (INCLUDE '0' DEP & CONSUMBALE)", fontSize:12,bold:false}]);
    await setRtoCompanyTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Company', fontSize:12,bold:false}]);
    await setRtoIndividualTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Individual', fontSize:12,bold:false}]);
    await setFourFifthExtendedWarrantyTableData([{text:'4th & 5th YEAR EXTENDED WARRANTY', fontSize:12,bold:false}]);
    await setRmkTableData([{text:'RMK', fontSize:12,bold:false}]);
    await setBasicAccessoriesKitTableData([{text:'BASIC ACCESSORIES KIT', fontSize:12,bold:false}]);
    await setRsaTableData([{text:'RSA', fontSize:12,bold:false}]);
    await setAdditionalPremiumForEngineProtectionTableData([{text:'ADDL PREMIUM FOR ENGINE PROTECTION', fontSize:12,bold:false}]);
    await setAdditionalPremiumforReturnToInvoiceTableData([{text:'ADDL PREMIUM FOR RETURN TO INVOICE(RTI)', fontSize:12,bold:false}]);
    await setTotalIndividualTableData([{text:'TOTAL INDIVIDUAL', fontSize:12,bold:false}]);
    await setTotalCompanyTableData([{text:'TOTAL COMPANY', fontSize:12,bold:false}]);
    await setSheildOfTrustTableData([{text:'T5 YR/60K SHIELD OF TRUST', fontSize:12,bold:false}]);
    await  setPriceListForPmc([{text:'PRICE LIST FOR PMC', fontSize:12,bold:false,alignment:"center"}]);
    await setAllNewi20TableHeader([{text:'All New i20',alignment:"center",fontSize:15,bold:false}]);
    await setSolidColourTableHeader([{text:'COLOUR : SOLID COLOUR = ', fontSize:12,bold:false}]);
    await setNoCashPaymentTableHeader([{text:'note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED', fontSize:12,bold:false}]);
    await setTermsAndConitionsTableHeader([{text:'Terms & Conditions Details Overleaf', fontSize:12,bold:false}]);
    await setTermsAndConitionsTableData([{text:'TERMS & CONDITIONS:    Model Features:   Please refer separate sheet:  No extended warrenty Tourist Taxi', fontSize:12,bold:false}]);
    await setTermsAndConitionsDetailsTableData([{
      colSpan:0,
      bold:false,
      ol: [
        'Payment by DD/PO to be drawn in the name of KOTHARI CARS PVT.LTD payable at Pune.',
        "Customer request is not to pay any advance / part payment in cash to the consultant. Any such trasaction's done will be customer at his own risk for which company will not be responsible.",
        "The prices mentioned are  subject to change without  prior notice and will be charged as applicable  at the time of Registration / delivery.",
        "Model specifiction, features & Colours are subject to change without prior notice.",
        "Delivery - Subject to realisation of  DD / Cheque.",
        "RMK=Cost of Rubber Mat kit include GST. +RSA -Road Service assistance include GST for 1 year",
        "Subject to jurisdiction of Pune Court only",
        "Two schemes cannot be clubbed together.",
        "Basic Accessories Kit Not Included Labour Charges",
        "Hyundai Motor India Ltd. reserves the right to change the booking procedure","equipment specifications and discontinue models without notice.",
        "Force majeure clause would be applicable to all deliveries.",
        "The retail schemes (If Any) given alongwith this pricelist will be applicable on the physical stock and scheme period only.",
        "Retail scheme,Price applicable will be valid only on receipt of full Ex showroom price. ",
        "The Insurance premium is calculated @ 95 %of Exshowroom Price.",
        "Incase of cancellation of booking, Cancellation charges will be charged as per written in  booking form",
        "Income tax Pan no and address proof in original are necessary at the time of Booking.",
        "Purchase of Insurance Policy and Accessories from Dealer are optional.",
        "Value of discount given shall be netted off from the vehicle invoice amount, insurance and registration.",
        "Vechicle Register in PCMC or OUT Side area then CRTM Charges Rs. 200 Extra.",
        "Extended Warranty & Miscellaneous Expenses amount includes GST @ 18%",              "RTO tax 2% charged extra as per intinmated by RTO department will be applied as per confirmation receive by RTO department as the time registation.",              "Shield of Trust Price for 5yr/60 km inclusing GST 18% also this product get single year also"
      ]

    }]);
    await setShowroomITableData([{text:'Showroom I : CTS No. 45/1B/A,Shankarsheth Road,Near KumarPacific Mall,Gultekdi,Pune - 411037. Phone - 24338600 email : kotharihyundai@hotmail.com.', fontSize:12,bold:false}]);
    await setShowroomIITableData([{text:'Showroom II :-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27071100 Fax No 30478506  email : kotharihyundai@hotmail.com.', fontSize:12,bold:false}]);
    await setShowroomIIITableData([{text:'Showroom III: Sylvan heights Opp Seasons Apt Hotel Sanewadi Aundh Pune 411007  email : kotharihyundai@hotmail.com.  Phone No.020-30174100', fontSize:12,bold:false}]);
    await setShowroomIVTableData([{text:'Showroom IV: Gat No. 15,49/1 , Nagar-Pune road, Opp Manikchand Company, Saradwadi, Shirur 412210 Phone 02138-602525', fontSize:12,bold:false}]);
    await setShowroomVTableData([{text:'"Showroom V: Gat No.414, At Post. Velu, Khed Shivapur, Near Joshi Wadewale, Taluka. Bhor Dist. Pune - 412 205', fontSize:12,bold:false}]);
    await setShowroomVITableData([{text:'"Showroom VI : Shop No 1 & 2 S.No.461,Tilak Road,Sadashiv Peth,Pune - 411030 Phone - 24338600 email : kotharihyundai@hotmail.com.', fontSize:12,bold:false}]);
    await setWork1TableData([{text:'Works I : 691/A-2,Pune-Satara Road,Bibwewadi,Pune 411 037 Phone : 30298612 / 24222090/96', fontSize:12,bold:false}]);
    await setWork2TableData([{text:'Works II : No.2 A / 8 Bhau Patil Road Near Pune IT Park Bopodi Pune 411 003 Phone :  30112740/41  FAX: 25815237  ', fontSize:12,bold:false}]);
    await setWork3TableData([{text:'Works III:-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27014401/30478500      Fax No 30478506', fontSize:12,bold:false}]);
    await setWork4TableData([{text:'Works IV:- Sr.18 Dharmavat Corner , Opp Sai Services , Kalyan Mangal Karyalaya , Kondhwa Bk. , Pune - 411048 . Phone : 30402700 ', fontSize:12,bold:false}]);
    await setDepotTableData([{text:'Depot : Sr. No. 1 / 1 / 1 A  Bhilarewadi , Behind Leyland Petrol Pump , Pune - 411046   Phone  No : 30468600  ', fontSize:12,bold:false}]);
    await setCarVariantDieselTableData([{text:"PARTICULARS", fontSize:12,bold:false}]);
    await setExShowroomDieselTableData([{text:"EX - SHOWROOM PRICE", fontSize:12,bold:false}]);
    await setTcsExShowroomDieselTableData([{text:"TCS 1% EX-SHOWROOM", fontSize:12,bold:false}]);
    await setInsuranceDieselTableData([{text:"INSURANCE (INCLUDE '0' DEP & CONSUMBALE)", fontSize:12,bold:false}]);
    await setRtoCompanyDieselTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Company', fontSize:12,bold:false}]);
    await setRtoIndividualDieselTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Individual', fontSize:12,bold:false}]);
    await setFourFifthExtendedWarrantyDieselTableData([{text:'4th & 5th YEAR EXTENDED WARRANTY', fontSize:12,bold:false}]);
    await setRmkDieselTableData([{text:'RMK', fontSize:12,bold:false}]);
    await setBasicAccessoriesKitDieselTableData([{text:'BASIC ACCESSORIES KIT', fontSize:12,bold:false}]);
    await setRsaDieselTableData([{text:'RSA', fontSize:12,bold:false}]);
    await setAdditionalPremiumForEngineProtectionDieselTableData([{text:'ADDL PREMIUM FOR ENGINE PROTECTION', fontSize:12,bold:false}]);
    await setAdditionalPremiumforReturnToInvoiceDieselTableData([{text:'ADDL PREMIUM FOR RETURN TO INVOICE(RTI)', fontSize:12,bold:false}]);
    await setTotalIndividualDieselTableData([{text:'TOTAL INDIVIDUAL', fontSize:12,bold:false}]);
    await setTotalCompanyDieselTableData([{text:'TOTAL COMPANY', fontSize:12,bold:false}]);
    await setSheildOfTrustDieselTableData([{text:'T5 YR/60K SHIELD OF TRUST', fontSize:12,bold:false}]);
    await setModelDieselTableHeader([{text:'',alignment:"center",fontSize:12,bold:false}]);
    await setCarVariantCNGTableData([{text:"PARTICULARS", fontSize:12,bold:false}]);
    await setExShowroomCNGTableData([{text:"EX - SHOWROOM PRICE", fontSize:12,bold:false}]);
    await setTcsExShowroomCNGTableData([{text:"TCS 1% EX-SHOWROOM", fontSize:12,bold:false}]);
    await setInsuranceCNGTableData([{text:"INSURANCE (INCLUDE '0' DEP & CONSUMBALE)", fontSize:12,bold:false}]);
    await setRtoCompanyCNGTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Company', fontSize:12,bold:false}]);
    await setRtoIndividualCNGTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Individual', fontSize:12,bold:false}]);
    await setFourFifthExtendedWarrantyCNGTableData([{text:'4th & 5th YEAR EXTENDED WARRANTY', fontSize:12,bold:false}]);
    await setRmkCNGTableData([{text:'RMK', fontSize:12,bold:false}]);
    await setBasicAccessoriesKitCNGTableData([{text:'BASIC ACCESSORIES KIT', fontSize:12,bold:false}]);
    await setRsaCNGTableData([{text:'RSA', fontSize:12,bold:false}]);
    await setAdditionalPremiumForEngineProtectionCNGTableData([{text:'ADDL PREMIUM FOR ENGINE PROTECTION', fontSize:12,bold:false}]);
    await setAdditionalPremiumforReturnToInvoiceCNGTableData([{text:'ADDL PREMIUM FOR RETURN TO INVOICE(RTI)', fontSize:12,bold:false}]);
    await setTotalIndividualCNGTableData([{text:'TOTAL INDIVIDUAL', fontSize:12,bold:false}]);
    await setTotalCompanyCNGTableData([{text:'TOTAL COMPANY', fontSize:12,bold:false}]);
    await setSheildOfTrustCNGTableData([{text:'T5 YR/60K SHIELD OF TRUST', fontSize:12,bold:false}]);
    await setDisablePDFButton(true);
  }
  // modified by Vihang
  // modified at 22 April 2022
  // modification: pdfs for petrol diesel and cng variant created

  // modified by Vihang
  // modified at 02 May 2022
  // modification: fixed minor issues in pricelist pdf

  async function selectedCarModel(model) {
    setDisablePDFButton(true);
    setModelVariantName('');
    // setCatalogueCarVariant([]);
    setCarVariantTableData([{text:"PARTICULARS", fontSize:12,bold:false}]);
    setExShowroomTableData([{text:"EX - SHOWROOM PRICE", fontSize:12,bold:false}]);
    setTcsExShowroomTableData([{text:"TCS 1% EX-SHOWROOM", fontSize:12,bold:false}]);
    setInsuranceTableData([{text:"INSURANCE (INCLUDE '0' DEP & CONSUMBALE)", fontSize:12,bold:false}]);
    setRtoCompanyTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Company', fontSize:12,bold:false}]);
    setRtoIndividualTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Individual', fontSize:12,bold:false}]);
    setFourFifthExtendedWarrantyTableData([{text:'4th & 5th YEAR EXTENDED WARRANTY', fontSize:12,bold:false}]);
    setRmkTableData([{text:'RMK', fontSize:12,bold:false}]);
    setBasicAccessoriesKitTableData([{text:'BASIC ACCESSORIES KIT', fontSize:12,bold:false}]);
    setRsaTableData([{text:'RSA', fontSize:12,bold:false}]);
    setAdditionalPremiumForEngineProtectionTableData([{text:'ADDL PREMIUM FOR ENGINE PROTECTION', fontSize:12,bold:false}]);
    setAdditionalPremiumforReturnToInvoiceTableData([{text:'ADDL PREMIUM FOR RETURN TO INVOICE(RTI)', fontSize:12,bold:false}]);
    setTotalIndividualTableData([{text:'TOTAL INDIVIDUAL', fontSize:12,bold:false}]);
    setTotalCompanyTableData([{text:'TOTAL COMPANY', fontSize:12,bold:false}]);
    setSheildOfTrustTableData([{text:'T5 YR/60K SHIELD OF TRUST', fontSize:12,bold:false}]);
    setPriceListForPmc([{text:'PRICE LIST FOR PMC', fontSize:12,bold:false,alignment:"center"}]);
    setAllNewi20TableHeader([{text:'All New i20',alignment:"center",fontSize:15,bold:false}]);
    setSolidColourTableHeader([{text:'COLOUR : SOLID COLOUR = ', fontSize:12,bold:false}]);
    setNoCashPaymentTableHeader([{text:'note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED', fontSize:12,bold:false}]);
    setTermsAndConitionsTableHeader([{text:'Terms & Conditions Details Overleaf', fontSize:12,bold:false}]);
    setTermsAndConitionsTableData([{text:'TERMS & CONDITIONS:    Model Features:   Please refer separate sheet:  No extended warrenty Tourist Taxi', fontSize:12,bold:false}]);
    setTermsAndConitionsDetailsTableData([{
      colSpan:0,
      bold:false,
      ol: [
        'Payment by DD/PO to be drawn in the name of KOTHARI CARS PVT.LTD payable at Pune.',
        "Customer request is not to pay any advance / part payment in cash to the consultant. Any such trasaction's done will be customer at his own risk for which company will not be responsible.",
        "The prices mentioned are  subject to change without  prior notice and will be charged as applicable  at the time of Registration / delivery.",
        "Model specifiction, features & Colours are subject to change without prior notice.",
        "Delivery - Subject to realisation of  DD / Cheque.",
        "RMK=Cost of Rubber Mat kit include GST. +RSA -Road Service assistance include GST for 1 year",
        "Subject to jurisdiction of Pune Court only",
        "Two schemes cannot be clubbed together.",
        "Basic Accessories Kit Not Included Labour Charges",
        "Hyundai Motor India Ltd. reserves the right to change the booking procedure","equipment specifications and discontinue models without notice.",
        "Force majeure clause would be applicable to all deliveries.",
        "The retail schemes (If Any) given alongwith this pricelist will be applicable on the physical stock and scheme period only.",
        "Retail scheme,Price applicable will be valid only on receipt of full Ex showroom price. ",
        "The Insurance premium is calculated @ 95 %of Exshowroom Price.",
        "Incase of cancellation of booking, Cancellation charges will be charged as per written in  booking form",
        "Income tax Pan no and address proof in original are necessary at the time of Booking.",
        "Purchase of Insurance Policy and Accessories from Dealer are optional.",
        "Value of discount given shall be netted off from the vehicle invoice amount, insurance and registration.",
        "Vechicle Register in PCMC or OUT Side area then CRTM Charges Rs. 200 Extra.",
        "Extended Warranty & Miscellaneous Expenses amount includes GST @ 18%",              "RTO tax 2% charged extra as per intinmated by RTO department will be applied as per confirmation receive by RTO department as the time registation.",              "Shield of Trust Price for 5yr/60 km inclusing GST 18% also this product get single year also"
      ]

    }]);
    setShowroomITableData([{text:'Showroom I : CTS No. 45/1B/A,Shankarsheth Road,Near KumarPacific Mall,Gultekdi,Pune - 411037. Phone - 24338600 email : kotharihyundai@hotmail.com.', fontSize:12,bold:false}]);
    setShowroomIITableData([{text:'Showroom II :-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27071100 Fax No 30478506  email : kotharihyundai@hotmail.com.', fontSize:12,bold:false}]);
    setShowroomIIITableData([{text:'Showroom III: Sylvan heights Opp Seasons Apt Hotel Sanewadi Aundh Pune 411007  email : kotharihyundai@hotmail.com.  Phone No.020-30174100', fontSize:12,bold:false}]);
    setShowroomIVTableData([{text:'Showroom IV: Gat No. 15,49/1 , Nagar-Pune road, Opp Manikchand Company, Saradwadi, Shirur 412210 Phone 02138-602525', fontSize:12,bold:false}]);
    setShowroomVTableData([{text:'"Showroom V: Gat No.414, At Post. Velu, Khed Shivapur, Near Joshi Wadewale, Taluka. Bhor Dist. Pune - 412 205', fontSize:12,bold:false}]);
    setShowroomVITableData([{text:'"Showroom VI : Shop No 1 & 2 S.No.461,Tilak Road,Sadashiv Peth,Pune - 411030 Phone - 24338600 email : kotharihyundai@hotmail.com.', fontSize:12,bold:false}]);
    setWork1TableData([{text:'Works I : 691/A-2,Pune-Satara Road,Bibwewadi,Pune 411 037 Phone : 30298612 / 24222090/96', fontSize:12,bold:false}]);
    setWork2TableData([{text:'Works II : No.2 A / 8 Bhau Patil Road Near Pune IT Park Bopodi Pune 411 003 Phone :  30112740/41  FAX: 25815237  ', fontSize:12,bold:false}]);
    setWork3TableData([{text:'Works III:-  Mundhwa Kharadi Bypass , Near Magar Patta City Next To Zensor Kharadi Pune 411 014  Phone  27014401/30478500      Fax No 30478506', fontSize:12,bold:false}]);
    setWork4TableData([{text:'Works IV:- Sr.18 Dharmavat Corner , Opp Sai Services , Kalyan Mangal Karyalaya , Kondhwa Bk. , Pune - 411048 . Phone : 30402700 ', fontSize:12,bold:false}]);
    setDepotTableData([{text:'Depot : Sr. No. 1 / 1 / 1 A  Bhilarewadi , Behind Leyland Petrol Pump , Pune - 411046   Phone  No : 30468600  ', fontSize:12,bold:false}]);
    setCarVariantDieselTableData([{text:"PARTICULARS", fontSize:12,bold:false}]);
    setExShowroomDieselTableData([{text:"EX - SHOWROOM PRICE", fontSize:12,bold:false}]);
    setTcsExShowroomDieselTableData([{text:"TCS 1% EX-SHOWROOM", fontSize:12,bold:false}]);
    setInsuranceDieselTableData([{text:"INSURANCE (INCLUDE '0' DEP & CONSUMBALE)", fontSize:12,bold:false}]);
    setRtoCompanyDieselTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Company', fontSize:12,bold:false}]);
    setRtoIndividualDieselTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Individual', fontSize:12,bold:false}]);
    setFourFifthExtendedWarrantyDieselTableData([{text:'4th & 5th YEAR EXTENDED WARRANTY', fontSize:12,bold:false}]);
    setRmkDieselTableData([{text:'RMK', fontSize:12,bold:false}]);
    setBasicAccessoriesKitDieselTableData([{text:'BASIC ACCESSORIES KIT', fontSize:12,bold:false}]);
    setRsaDieselTableData([{text:'RSA', fontSize:12,bold:false}]);
    setAdditionalPremiumForEngineProtectionDieselTableData([{text:'ADDL PREMIUM FOR ENGINE PROTECTION', fontSize:12,bold:false}]);
    setAdditionalPremiumforReturnToInvoiceDieselTableData([{text:'ADDL PREMIUM FOR RETURN TO INVOICE(RTI)', fontSize:12,bold:false}]);
    setTotalIndividualDieselTableData([{text:'TOTAL INDIVIDUAL', fontSize:12,bold:false}]);
    setTotalCompanyDieselTableData([{text:'TOTAL COMPANY', fontSize:12,bold:false}]);
    setSheildOfTrustDieselTableData([{text:'T5 YR/60K SHIELD OF TRUST', fontSize:12,bold:false}]);
    setModelDieselTableHeader([{text:'',alignment:"center",fontSize:12,bold:false}]);
    setCarVariantCNGTableData([{text:"PARTICULARS", fontSize:12,bold:false}]);
    setExShowroomCNGTableData([{text:"EX - SHOWROOM PRICE", fontSize:12,bold:false}]);
    setTcsExShowroomCNGTableData([{text:"TCS 1% EX-SHOWROOM", fontSize:12,bold:false}]);
    setInsuranceCNGTableData([{text:"INSURANCE (INCLUDE '0' DEP & CONSUMBALE)", fontSize:12,bold:false}]);
    setRtoCompanyCNGTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Company', fontSize:12,bold:false}]);
    setRtoIndividualCNGTableData([{text:'RTO TAX+REG CHARGES+ FASTAG FOR Individual', fontSize:12,bold:false}]);
    setFourFifthExtendedWarrantyCNGTableData([{text:'4th & 5th YEAR EXTENDED WARRANTY', fontSize:12,bold:false}]);
    setRmkCNGTableData([{text:'RMK', fontSize:12,bold:false}]);
    setBasicAccessoriesKitCNGTableData([{text:'BASIC ACCESSORIES KIT', fontSize:12,bold:false}]);
    setRsaCNGTableData([{text:'RSA', fontSize:12,bold:false}]);
    setAdditionalPremiumForEngineProtectionCNGTableData([{text:'ADDL PREMIUM FOR ENGINE PROTECTION', fontSize:12,bold:false}]);
    setAdditionalPremiumforReturnToInvoiceCNGTableData([{text:'ADDL PREMIUM FOR RETURN TO INVOICE(RTI)', fontSize:12,bold:false}]);
    setTotalIndividualCNGTableData([{text:'TOTAL INDIVIDUAL', fontSize:12,bold:false}]);
    setTotalCompanyCNGTableData([{text:'TOTAL COMPANY', fontSize:12,bold:false}]);
    setSheildOfTrustCNGTableData([{text:'T5 YR/60K SHIELD OF TRUST', fontSize:12,bold:false}]);

    let catalogoueCarVariantPetrolData = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue/carVariant?model=${model}&&fuelType=petrol`);
    await setCatalogueCarVariant(catalogoueCarVariantPetrolData.data);
    let catalogoueCarVariantDieselData = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue/carVariant?model=${model}&&fuelType=diesel`);
    await setCatalogueCarVariantDiesel(catalogoueCarVariantDieselData.data);

    let catalogoueCarVariantCNGData = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue/carVariant?model=${model}&&fuelType=cng`);
    await setCatalogueCarVariantCNG(catalogoueCarVariantCNGData.data);

    console.log(catalogoueCarVariantCNGData,"cnggggg dataaaaaaaaaa");
    if (model === "alcazar") {
      await setPDFCarImages(alcazar);
    } else if (model === "santro") {
      await setPDFCarImages(santro);
    } else if (model === "aura") {
      await setPDFCarImages(aura);
    } else if (model === "venue") {
      await setPDFCarImages(venue);
    } else if (model === "newcreta") {
      await setPDFCarImages(creta);
    } else if (model === "nextgenverna") {
      await setPDFCarImages(nextGenVerna);
    } else if (model === "allnewi20") {
      await setPDFCarImages(allNewi20);
    } else if (model === "elantra") {
      await setPDFCarImages(elantra);
    } else if (model === "grandi10nios") {
      await setPDFCarImages(grandi10Nios);
    } else if (model === "i20nline") {
      await setPDFCarImages(i20Nline);
    } else if (model === "konaev") {
      await setPDFCarImages(hyundaikona);
    } else if (model === "tucson") {
      await setPDFCarImages(tucson);
    } else if (model === "xcentprime") {
      await setPDFCarImages(HyundaiXcent);
    }

    if (catalogoueCarVariantPetrolData.data && catalogoueCarVariantPetrolData.data.length > 0) {
      let pdfWidth = ['auto'];
      catalogoueCarVariantPetrolData.data.map(i => {
        pdfWidth.push('*');
      });
      await setPdfWidthForCarVariant(pdfWidth);
      allnewi20tableHeader[0].text = modelMapping[model] + " Petrol";
      await setAllNewi20TableHeader(allnewi20tableHeader);
      // modified by Vihang
      // modified at 5 May 2022
      // modification: solidcolor data integration for pricelist pdf
      let solidColorOnce = true;
      await catalogoueCarVariantPetrolData.data.map(async(car)=> {
        if (car && car.color) {
          let solidColors = await catalogoueCarVariantPetrolData.data.filter((value, index, self) => index === self.findIndex((t) => t.color === car.color));
          if (solidColorOnce ) {
            let solidColor;
            await solidColors.map((solid)=> {
              solidColor = solid.color[0].toUpperCase() + solid.color.substring(1);
              solidColourTableHeader[0].text = solidColourTableHeader[0].text + solidColor;
              solidColorOnce = false;
            });
          }
        }
        let carVariant;
        if (car && car.variant) {
          carVariant = await car.variant[0].toUpperCase() + car.variant.substring(1);
        }
        carVariantTableData.push(car.variant ?  carVariant :  "0" );
        exShowroomTableData.push(car.exShowroom ? "₹" + car.exShowroom : "₹" + "0" );
        tcsExShowroomTableData.push(car.tcsOnExShowroom ? "₹" + car.tcsOnExShowroom : "₹" + "0" );
        insuranceTableData.push(car.insuranceCalculated ? "₹" +  car.insuranceCalculated : "₹" + "0" );
        rtoCompanyTableData.push(car.rtoCompany ? "₹" + car.rtoCompany : "₹" + "0" );
        rtoIndividualTableData.push(car.rtoIndividual ? "₹" + car.rtoIndividual : "₹" +  "0" );
        fourFifthExtendedWarrantyTableData.push(car.fourthAnd5thYearExtendedWarranty ? "₹" + car.fourthAnd5thYearExtendedWarranty : "₹" + "0");
        rmkTableData.push(car.rmk ?"₹" + car.rmk :  "₹" +"0");
        basicAccessoriesKitTableData.push(car.basicAccessoriesKit ? "₹" + car.basicAccessoriesKit : "₹" + "0");
        rsaTableData.push(car.rsa ? "₹" + car.rsa : "₹" + "0");
        additionalPremiumForEngineProtectionTableData.push(car.additionalPremiumForEngineProtection ? "₹" + car.additionalPremiumForEngineProtection :  "₹" + "0");
        additionalPremiumforReturnToInvoiceTableData.push(car.additionalPremiumForRTI ? "₹" + car.additionalPremiumForRTI : "₹" + "0");
        totalIndividualTableData.push(car.totalIndividual ? "₹" + car.totalIndividual : "₹" + "0");
        totalCompanyTableData.push(car.totalCompany ? "₹" + car.totalCompany : "₹" + "0");
        sheildOfTrustTableData.push(car.sheildOfTrust ? "₹" + car.sheildOfTrust : "₹" + "0");
        await setSolidColourTableHeader(solidColourTableHeader);
        await setCarVariantTableData(carVariantTableData);
        await setExShowroomTableData(exShowroomTableData);
        await setTcsExShowroomTableData(tcsExShowroomTableData);
        await setInsuranceTableData(insuranceTableData);
        await setRtoCompanyTableData(rtoCompanyTableData);
        await setRtoIndividualTableData(rtoIndividualTableData);
        await setFourFifthExtendedWarrantyTableData(fourFifthExtendedWarrantyTableData);
        await setRmkTableData(rmkTableData);
        await setBasicAccessoriesKitTableData(basicAccessoriesKitTableData);
        await setRsaTableData(rsaTableData);
        await setAdditionalPremiumForEngineProtectionTableData(additionalPremiumForEngineProtectionTableData);
        await setAdditionalPremiumforReturnToInvoiceTableData(additionalPremiumforReturnToInvoiceTableData);
        await setTotalIndividualTableData(totalIndividualTableData);
        await setTotalCompanyTableData(totalCompanyTableData);
        await setSheildOfTrustTableData(sheildOfTrustTableData);
      }
      );
    }

    if (catalogoueCarVariantDieselData.data && catalogoueCarVariantDieselData.data.length > 0) {
      let pdfWidth = ['auto'];
      catalogoueCarVariantDieselData.data.map(i => {
        pdfWidth.push('*');
      });
      await setPdfWidthForCarVariantDiesel(pdfWidth);
      modelDieseltableHeader[0].text = modelMapping[model] + " Diesel";
      await setModelDieselTableHeader(modelDieseltableHeader);
      // modified by Vihang
      // modified at 5 May 2022
      // modification: solidcolor data integration for pricelist pdf
      let solidColorOnce = true;
      await catalogoueCarVariantDieselData.data.map(async(car)=> {
        if (car && car.color) {
          let solidColors = await catalogoueCarVariantDieselData.data.filter((value, index, self) => index === self.findIndex((t) => t.color === car.color));
          if (solidColorOnce ) {
            let solidColor;
            await solidColors.map((solid)=> {
              solidColor = solid.color[0].toUpperCase() + solid.color.substring(1);
              solidColourDieselTableData[0].text = solidColourDieselTableData[0].text + " "+ solidColor;
              solidColorOnce = false;
            });
          }
        }
        let carVariant;
        if (car && car.variant) {
          carVariant = await car.variant[0].toUpperCase() + car.variant.substring(1);
        }
        carVariantDieselTableData.push(car.variant ? carVariant : "0");
        exShowroomDieselTableData.push(car.exShowroom ? "₹" + car.exShowroom :  "₹" + "0");
        tcsExShowroomDieselTableData.push(car.tcsOnExShowroom ? "₹" + car.tcsOnExShowroom :  "₹" + "0");
        insuranceDieselTableData.push(car.insuranceCalculated ? "₹" + car.insuranceCalculated :  "₹" + "0");
        rtoCompanyDieselTableData.push(car.rtoCompany ? "₹" + car.rtoCompany :  "₹" + "0");
        rtoIndividualDieselTableData.push(car.rtoIndividual ? "₹" + car.rtoIndividual :  "₹" + "0");
        fourFifthExtendedWarrantyDieselTableData.push(car.fourthAnd5thYearExtendedWarranty ? "₹" + car.fourthAnd5thYearExtendedWarranty :  "₹" + "0");
        rmkDieselTableData.push(car.rmk ? "₹" + car.rmk :  "₹" + "0");
        basicAccessoriesKitDieselTableData.push(car.basicAccessoriesKit ? "₹" + car.basicAccessoriesKit :  "₹" + "0");
        rsaDieselTableData.push(car.rsa ? "₹" + car.rsa :  "₹" + "0");
        additionalPremiumForEngineProtectionDieselTableData.push(car.additionalPremiumForEngineProtection ? "₹" + car.additionalPremiumForEngineProtection :  "₹" + "0");
        additionalPremiumforReturnToInvoiceDieselTableData.push(car.additionalPremiumForRTI ? "₹" + car.additionalPremiumForRTI :  "₹" + "0");
        totalIndividualDieselTableData.push(car.totalIndividual ? "₹" + car.totalIndividual :  "₹" + "0");
        totalCompanyDieselTableData.push(car.totalCompany ? "₹" + car.totalCompany :  "₹" + "0");
        sheildOfTrustDieselTableData.push(car.sheildOfTrust ? "₹" + car.sheildOfTrust :  "₹" + "0");
        await setSolidColourDieselTableData(solidColourDieselTableData);
        await setCarVariantDieselTableData(carVariantDieselTableData);
        await setExShowroomDieselTableData(exShowroomDieselTableData);
        await setTcsExShowroomDieselTableData(tcsExShowroomDieselTableData);
        await setInsuranceDieselTableData(insuranceDieselTableData);
        await setRtoCompanyDieselTableData(rtoCompanyDieselTableData);
        await setRtoIndividualDieselTableData(rtoIndividualDieselTableData);
        await setFourFifthExtendedWarrantyDieselTableData(fourFifthExtendedWarrantyDieselTableData);
        await setRmkDieselTableData(rmkDieselTableData);
        await setBasicAccessoriesKitDieselTableData(basicAccessoriesKitDieselTableData);
        await setRsaDieselTableData(rsaDieselTableData);
        await setAdditionalPremiumForEngineProtectionDieselTableData(additionalPremiumForEngineProtectionDieselTableData);
        await setAdditionalPremiumforReturnToInvoiceDieselTableData(additionalPremiumforReturnToInvoiceDieselTableData);
        await setTotalIndividualDieselTableData(totalIndividualDieselTableData);
        await setTotalCompanyDieselTableData(totalCompanyDieselTableData);
        await setSheildOfTrustDieselTableData(sheildOfTrustDieselTableData);
      });
    }

    if (catalogoueCarVariantCNGData.data && catalogoueCarVariantCNGData.data.length > 0) {
      let pdfWidth = await Array(catalogoueCarVariantCNGData.data.length + 1).fill("*");
      await setPdfWidthForCarVariantCNG(pdfWidth);
      modelCNGtableHeader[0].text = modelMapping[model] + " CNG";
      await setModelCNGTableHeader(modelCNGtableHeader);
      // modified by Vihang
      // modified at 5 May 2022
      // modification: solidcolor data integration for pricelist pdf
      let solidColorOnce = true;
      await catalogoueCarVariantCNGData.data.map(async(car)=> {
        if (car && car.color) {
          let solidColors = await catalogoueCarVariantCNGData.data.filter((value, index, self) => index === self.findIndex((t) => t.color === car.color));
          if (solidColorOnce ) {
            let solidColor;
            await solidColors.map((solid)=> {
              solidColor = solid.color[0].toUpperCase() + solid.color.substring(1);
              solidColourCNGTableData[0].text = solidColourCNGTableData[0].text + solidColor;
              solidColorOnce = false;
            });
          }
        }
        let carVariant;
        if (car && car.variant) {
          carVariant = await car.variant[0].toUpperCase() + car.variant.substring(1);
        }
        carVariantCNGTableData.push(car.variant ? "₹" + carVariant : "0");
        exShowroomCNGTableData.push(car.exShowroom ? "₹" + car.exShowroom : "₹" + "0");
        tcsExShowroomCNGTableData.push(car.tcsOnExShowroom ? "₹" + car.tcsOnExShowroom : "₹" + "0");
        insuranceCNGTableData.push(car.insuranceCalculated ? "₹" + car.insuranceCalculated : "₹" + "0");
        rtoCompanyCNGTableData.push(car.rtoCompany ? "₹" + car.rtoCompany : "₹" + "0");
        rtoIndividualCNGTableData.push(car.rtoIndividual ? "₹" + car.rtoIndividual : "₹" + "0");
        fourFifthExtendedWarrantyCNGTableData.push(car.fourthAnd5thYearExtendedWarranty ? "₹" + car.fourthAnd5thYearExtendedWarranty : "₹" + "0");
        rmkCNGTableData.push(car.rmk ? "₹" + car.rmk : "₹" + "0");
        basicAccessoriesKitCNGTableData.push(car.basicAccessoriesKit ? "₹" + car.basicAccessoriesKit : "₹" + "0");
        rsaCNGTableData.push(car.rsa ? "₹" + car.rsa : "₹" + "0");
        additionalPremiumForEngineProtectionCNGTableData.push(car.additionalPremiumForEngineProtection ? "₹" + car.additionalPremiumForEngineProtection : "₹" + "0");
        additionalPremiumforReturnToInvoiceCNGTableData.push(car.additionalPremiumForRTI ? "₹" + car.additionalPremiumForRTI : "₹" + "0");
        totalIndividualCNGTableData.push(car.totalIndividual ? "₹" + car.totalIndividual : "₹" + "0");
        totalCompanyCNGTableData.push(car.totalCompany ? "₹" + car.totalCompany : "₹" + "0");
        sheildOfTrustCNGTableData.push(car.sheildOfTrust ? "₹" + car.sheildOfTrust : "₹" + "0");
        await setSolidColourCNGTableData(solidColourDieselTableData);
        await setCarVariantCNGTableData(carVariantCNGTableData);
        await setExShowroomCNGTableData(exShowroomCNGTableData);
        await setTcsExShowroomCNGTableData(tcsExShowroomCNGTableData);
        await setInsuranceCNGTableData(insuranceCNGTableData);
        await setRtoCompanyCNGTableData(rtoCompanyCNGTableData);
        await setRtoIndividualCNGTableData(rtoIndividualCNGTableData);
        await setFourFifthExtendedWarrantyCNGTableData(fourFifthExtendedWarrantyCNGTableData);
        await setRmkCNGTableData(rmkCNGTableData);
        await setBasicAccessoriesKitCNGTableData(basicAccessoriesKitCNGTableData);
        await setRsaCNGTableData(rsaCNGTableData);
        await setAdditionalPremiumForEngineProtectionCNGTableData(additionalPremiumForEngineProtectionCNGTableData);
        await setAdditionalPremiumforReturnToInvoiceCNGTableData(additionalPremiumforReturnToInvoiceCNGTableData);
        await setTotalIndividualCNGTableData(totalIndividualCNGTableData);
        await setTotalCompanyCNGTableData(totalCompanyCNGTableData);
        await setSheildOfTrustCNGTableData(sheildOfTrustCNGTableData);
        await setCNGCarVariant(true);
      });
    }


    // await Promise.all( catalogoueCarVariantPetrolData.data.map(async(car)=> {
    //   carVariantTableData.push(car.variant ?  car.variant :  "0" );
    //   exShowroomTableData.push(car.exShowroom ? "₹" + car.exShowroom : "₹" + "0" );
    //   tcsExShowroomTableData.push(car.tcsOnExShowroom ? "₹" + car.tcsOnExShowroom : "₹" + "0" );
    //   insuranceTableData.push(car.insuranceCalculated ? "₹" +  car.insuranceCalculated : "₹" + "0" );
    //   rtoCompanyTableData.push(car.rtoCompany ? "₹" + car.rtoCompany : "₹" + "0" );
    //   rtoIndividualTableData.push(car.rtoIndividual ? "₹" + car.rtoIndividual : "₹" +  "0" );
    //   fourFifthExtendedWarrantyTableData.push(car.fourthAnd5thYearExtendedWarranty ? "₹" + car.fourthAnd5thYearExtendedWarranty : "₹" + "0");
    //   rmkTableData.push(car.rmk ?"₹" + car.rmk :  "₹" +"0");
    //   basicAccessoriesKitTableData.push(car.basicAccessoriesKit ? "₹" + car.basicAccessoriesKit : "₹" + "0");
    //   rsaTableData.push(car.rsa ? "₹" + car.rsa : "₹" + "0");
    //   additionalPremiumForEngineProtectionTableData.push(car.additionalPremiumForEngineProtection ? "₹" + car.additionalPremiumForEngineProtection :  "₹" + "0");
    //   additionalPremiumforReturnToInvoiceTableData.push(car.additionalPremiumForRTI ? "₹" + car.additionalPremiumForRTI : "₹" + "0");
    //   totalIndividualTableData.push(car.totalIndividual ? "₹" + car.totalIndividual : "₹" + "0");
    //   totalCompanyTableData.push(car.totalCompany ? "₹" + car.totalCompany : "₹" + "0");
    //   sheildOfTrustTableData.push(car.sheildOfTrust ? "₹" + car.sheildOfTrust : "₹" + "0");
    // })).then(async () => {
    //   await setCarVariantTableData(carVariantTableData);
    //   await setExShowroomTableData(exShowroomTableData);
    //   await setTcsExShowroomTableData(tcsExShowroomTableData);
    //   await setInsuranceTableData(insuranceTableData);
    //   await setRtoCompanyTableData(rtoCompanyTableData);
    //   await setRtoIndividualTableData(rtoIndividualTableData);
    //   await setFourFifthExtendedWarrantyTableData(fourFifthExtendedWarrantyTableData);
    //   await setRmkTableData(rmkTableData);
    //   await setBasicAccessoriesKitTableData(basicAccessoriesKitTableData);
    //   await setRsaTableData(rsaTableData);
    //   await setAdditionalPremiumForEngineProtectionTableData(additionalPremiumForEngineProtectionTableData);
    //   await setAdditionalPremiumforReturnToInvoiceTableData(additionalPremiumforReturnToInvoiceTableData);
    //   await setTotalIndividualTableData(totalIndividualTableData);
    //   await setTotalCompanyTableData(totalCompanyTableData);
    //   await setSheildOfTrustTableData(sheildOfTrustTableData);
    // }).catch((err) => console.log(err));
    // if (catalogoueCarVariantDieselData.data && catalogoueCarVariantDieselData.data.length > 0) {
    //   await setCatalogueCarVariantDiesel(catalogoueCarVariantDieselData.data);
    //   let pdfWidth = ['auto'];
    //   catalogoueCarVariantDieselData.data.map(i => {
    //     pdfWidth.push('*');
    //   });
    //   await setPdfWidthForCarVariantDiesel(pdfWidth);
    //   modelDieseltableHeader[0].text = modelMapping[model] + " Diesel";
    //   await setModelDieselTableHeader(modelDieseltableHeader);
    //   await Promise.all(catalogoueCarVariantDieselData.data.map(async(car)=> {
    //     carVariantDieselTableData.push(car.variant ? car.variant : "0");
    //     exShowroomDieselTableData.push(car.exShowroom ? "₹" + car.exShowroom :  "₹" + "0");
    //     tcsExShowroomDieselTableData.push(car.tcsOnExShowroom ? "₹" + car.tcsOnExShowroom :  "₹" + "0");
    //     insuranceDieselTableData.push(car.insuranceCalculated ? "₹" + car.insuranceCalculated :  "₹" + "0");
    //     rtoCompanyDieselTableData.push(car.rtoCompany ? "₹" + car.rtoCompany :  "₹" + "0");
    //     rtoIndividualDieselTableData.push(car.rtoIndividual ? "₹" + car.rtoIndividual :  "₹" + "0");
    //     fourFifthExtendedWarrantyDieselTableData.push(car.fourthAnd5thYearExtendedWarranty ? "₹" + car.fourthAnd5thYearExtendedWarranty :  "₹" + "0");
    //     rmkDieselTableData.push(car.rmk ? "₹" + car.rmk :  "₹" + "0");
    //     basicAccessoriesKitDieselTableData.push(car.basicAccessoriesKit ? "₹" + car.basicAccessoriesKit :  "₹" + "0");
    //     rsaDieselTableData.push(car.rsa ? "₹" + car.rsa :  "₹" + "0");
    //     additionalPremiumForEngineProtectionDieselTableData.push(car.additionalPremiumForEngineProtection ? "₹" + car.additionalPremiumForEngineProtection :  "₹" + "0");
    //     additionalPremiumforReturnToInvoiceDieselTableData.push(car.additionalPremiumForRTI ? "₹" + car.additionalPremiumForRTI :  "₹" + "0");
    //     totalIndividualDieselTableData.push(car.totalIndividual ? "₹" + car.totalIndividual :  "₹" + "0");
    //     totalCompanyDieselTableData.push(car.totalCompany ? "₹" + car.totalCompany :  "₹" + "0");
    //     sheildOfTrustDieselTableData.push(car.sheildOfTrust ? "₹" + car.sheildOfTrust :  "₹" + "0");
    //   })).then(async () => {
    //     await setCarVariantDieselTableData(carVariantDieselTableData);
    //     await setExShowroomDieselTableData(exShowroomDieselTableData);
    //     await setTcsExShowroomDieselTableData(tcsExShowroomDieselTableData);
    //     await setInsuranceDieselTableData(insuranceDieselTableData);
    //     await setRtoCompanyDieselTableData(rtoCompanyDieselTableData);
    //     await setRtoIndividualDieselTableData(rtoIndividualDieselTableData);
    //     await setFourFifthExtendedWarrantyDieselTableData(fourFifthExtendedWarrantyDieselTableData);
    //     await setRmkDieselTableData(rmkDieselTableData);
    //     await setBasicAccessoriesKitDieselTableData(basicAccessoriesKitDieselTableData);
    //     await setRsaDieselTableData(rsaDieselTableData);
    //     await setAdditionalPremiumForEngineProtectionDieselTableData(additionalPremiumForEngineProtectionDieselTableData);
    //     await setAdditionalPremiumforReturnToInvoiceDieselTableData(additionalPremiumforReturnToInvoiceDieselTableData);
    //     await setTotalIndividualDieselTableData(totalIndividualDieselTableData);
    //     await setTotalCompanyDieselTableData(totalCompanyDieselTableData);
    //     await setSheildOfTrustDieselTableData(sheildOfTrustDieselTableData);
    //   }).catch((err) => console.log(err));
    // }
    //  if(catalogoueCarVariantCNGData.data && catalogoueCarVariantCNGData.data.length > 0) {
    //     await setCatalogueCarVariantCNG(catalogoueCarVariantCNGData.data);
    //     let pdfWidth = await Array(catalogoueCarVariantCNGData.data.length + 1).fill("*");
    //     await setPdfWidthForCarVariantCNG(pdfWidth)
    //     modelCNGtableHeader[0].text = modelMapping[model] + " CNG";
    //     await setModelCNGTableHeader(modelCNGtableHeader)
    //     await Promise.all( catalogoueCarVariantCNGData.data.map(async(car)=> {
    //       carVariantCNGTableData.push(car.variant ? "₹" + car.variant : "0");
    //       exShowroomCNGTableData.push(car.exShowroom ? "₹" + car.exShowroom : "₹" + "0");
    //       tcsExShowroomCNGTableData.push(car.tcsOnExShowroom ? "₹" + car.tcsOnExShowroom : "₹" + "0")
    //       insuranceCNGTableData.push(car.insuranceCalculated ? "₹" + car.insuranceCalculated : "₹" + "0")
    //       rtoCompanyCNGTableData.push(car.rtoCompany ? "₹" + car.rtoCompany : "₹" + "0");
    //       rtoIndividualCNGTableData.push(car.rtoIndividual ? "₹" + car.rtoIndividual : "₹" + "0");
    //       fourFifthExtendedWarrantyCNGTableData.push(car.fourthAnd5thYearExtendedWarranty ? "₹" + car.fourthAnd5thYearExtendedWarranty : "₹" + "0")
    //       rmkCNGTableData.push(car.rmk ? "₹" + car.rmk : "₹" + "0")
    //       basicAccessoriesKitCNGTableData.push(car.basicAccessoriesKit ? "₹" + car.basicAccessoriesKit : "₹" + "0")
    //       rsaCNGTableData.push(car.rsa ? "₹" + car.rsa : "₹" + "0")
    //       additionalPremiumForEngineProtectionCNGTableData.push(car.additionalPremiumForEngineProtection ? "₹" + car.additionalPremiumForEngineProtection : "₹" + "0")
    //       additionalPremiumforReturnToInvoiceCNGTableData.push(car.additionalPremiumForRTI ? "₹" + car.additionalPremiumForRTI : "₹" + "0");
    //       totalIndividualCNGTableData.push(car.totalIndividual ? "₹" + car.totalIndividual : "₹" + "0");
    //       totalCompanyCNGTableData.push(car.totalCompany ? "₹" + car.totalCompany : "₹" + "0");
    //       sheildOfTrustCNGTableData.push(car.sheildOfTrust ? "₹" + car.sheildOfTrust : "₹" + "0")
    //     })).then(async () => {
    //       await setCarVariantCNGTableData(carVariantCNGTableData);
    //       await setExShowroomCNGTableData(exShowroomCNGTableData);
    //       await setTcsExShowroomCNGTableData(tcsExShowroomCNGTableData);
    //       await setInsuranceCNGTableData(insuranceCNGTableData);
    //       await setRtoCompanyCNGTableData(rtoCompanyCNGTableData)
    //       await setRtoIndividualCNGTableData(rtoIndividualCNGTableData)
    //       await setFourFifthExtendedWarrantyCNGTableData(fourFifthExtendedWarrantyCNGTableData);
    //       await setRmkCNGTableData(rmkCNGTableData)
    //       await setBasicAccessoriesKitCNGTableData(basicAccessoriesKitCNGTableData);
    //       await setRsaCNGTableData(rsaCNGTableData);
    //       await setAdditionalPremiumForEngineProtectionCNGTableData(additionalPremiumForEngineProtectionCNGTableData);
    //       await setAdditionalPremiumforReturnToInvoiceCNGTableData(additionalPremiumforReturnToInvoiceCNGTableData);
    //       await setTotalIndividualCNGTableData(totalIndividualCNGTableData);
    //       await setTotalCompanyCNGTableData(totalCompanyCNGTableData);
    //       await setSheildOfTrustCNGTableData(sheildOfTrustCNGTableData);
    //       await setCNGCarVariant(true)
    //   }).catch((err) => console.log(err))
    // }
    await setDisablePDFButton(false);
  }
  function togglePriceListModal() {
    setIsPriceListModalOpen(!isPriceListModalOpen);
  }

  {/*
          modified by Vihang
          modified at 04/05/2022
          modification : responsive changes for dayplan view
    */}
  return (
    <div>
      <div class="isMobile">
        {!props.showSemiDetailView && (
          <div class='row'>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
              <div class='row'>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0">
                  <div class="Workspacehead background-white p-t-2">
                    <div class="headerworkspacetext display-flex flex-direction-column">
                      <p class="fs-26 headerWorkspaceHeadText">Day Plan</p>
                      {/*<div class="progressbar m-l-0 m-r-0 w-full">
                      <div class="progressbar-value" />
                      <span class="progressbar-percentage">60%</span>
                    </div>*/}
                    </div>
                  </div>
                </div>
              </div>
              {/*
                      modified by Vihang
                      modified at 17/05/2022
                      modification : icon changed for workspace card to track
                */}
              <div class='row'>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0" style="height: calc(100vh - 65px)">
                  <div>
                    <div class="row topboxstyleworkspacedayplan m-t-20 p-l-0">
                      <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation p-l-0 p-r-1rem">
                        <WorkspaceCard countId="taskTodoCardCountMobile" changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"TASKS TO DO"} cardText={"To Do"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 20 24" width="34px" fill="#e5e5e5"><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8 c1.57,0,3.04,0.46,4.28,1.25l1.45-1.45C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c1.73,0,3.36-0.44,4.78-1.22 l-1.5-1.5C14.28,19.74,13.17,20,12,20z M19,15h-3v2h3v3h2v-3h3v-2h-3v-3h-2V15z" /></svg>} />
                      </div>
                      <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation1 p-l-0 p-r-1rem">
                        <WorkspaceCard countId="taskToTrackCardCountMobile" changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"TASKS TO TRACK"} cardText={"To Track"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 24" fill="#fff" height="24" width="24"><path d="M15.3 16.7 11 12.4V7H13V11.6L16.7 15.3ZM2.85 16.075Q2.525 15.35 2.325 14.587Q2.125 13.825 2.05 13H4.075Q4.15 13.55 4.287 14.062Q4.425 14.575 4.625 15.075ZM2.05 11Q2.125 10.175 2.338 9.4Q2.55 8.625 2.875 7.9L4.625 8.9Q4.425 9.4 4.287 9.925Q4.15 10.45 4.075 11ZM6.175 20.15Q5.5 19.65 4.925 19.062Q4.35 18.475 3.85 17.8L5.6 16.8Q5.95 17.25 6.338 17.637Q6.725 18.025 7.175 18.375ZM5.625 7.175 3.85 6.175Q4.35 5.5 4.925 4.925Q5.5 4.35 6.175 3.85L7.175 5.625Q6.725 5.975 6.35 6.35Q5.975 6.725 5.625 7.175ZM11 21.95Q10.175 21.875 9.4 21.663Q8.625 21.45 7.9 21.125L8.9 19.375Q9.4 19.575 9.925 19.712Q10.45 19.85 11 19.925ZM8.9 4.625 7.9 2.875Q8.625 2.55 9.4 2.337Q10.175 2.125 11 2.05V4.075Q10.45 4.15 9.925 4.287Q9.4 4.425 8.9 4.625ZM13 21.95V19.925Q13.55 19.85 14.075 19.712Q14.6 19.575 15.1 19.375L16.1 21.125Q15.375 21.45 14.6 21.663Q13.825 21.875 13 21.95ZM15.1 4.625Q14.6 4.425 14.075 4.287Q13.55 4.15 13 4.075V2.05Q13.825 2.125 14.6 2.337Q15.375 2.55 16.1 2.875ZM17.825 20.15 16.825 18.375Q17.275 18.025 17.65 17.65Q18.025 17.275 18.375 16.825L20.15 17.825Q19.65 18.5 19.075 19.087Q18.5 19.675 17.825 20.15ZM18.375 7.175Q18.025 6.75 17.638 6.362Q17.25 5.975 16.825 5.625L17.825 3.85Q18.475 4.325 19.062 4.912Q19.65 5.5 20.125 6.15ZM19.925 11Q19.85 10.425 19.713 9.912Q19.575 9.4 19.375 8.9L21.125 7.875Q21.45 8.6 21.663 9.387Q21.875 10.175 21.95 11ZM21.125 16.1 19.375 15.1Q19.575 14.6 19.713 14.075Q19.85 13.55 19.925 13H21.95Q21.875 13.825 21.663 14.6Q21.45 15.375 21.125 16.1Z"/></svg>} />
                      </div>
                      <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation2 p-l-0 p-r-0 p-r-1rem">
                        <WorkspaceCard countId="taskCompletedCardCountMobile" changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"COMPLETED TASKS"} cardText={"Done"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 15 24" width="34px" fill="#e5e5e5"><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z" /></svg>} />
                      </div>
                    </div>
                    {/*  {
                    userInfo && userInfo['userDesignation'] === "RECEPTIONIST" && (
                      <div class="subfilterworkspacedayplan m-t-15 m-b-20">
                        {(activePageTabItem === 'TASKS TO DO') && (
                          <div class="subfilterworkspacecalldayplan row">
                            <div class="col-xs-3 col-sm-3 col-lg-3 col-lg-3 align-center cursor-pointer p-l-0" >
                              <WorkspaceSubCard height="40px" countId="toDoEnquiryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Everyday"} cardCount={taskToDoDaily ? taskToDoDaily.rows.length : 10} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-xs-3 col-sm-3 col-lg-3 col-lg-3 align-center cursor-pointer p-l-0">
                              <WorkspaceSubCard height="40px" countId="toDoBookingCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Follow Up"} cardCount={taskToDoFollow ? taskToDoFollow.rows.length : 10} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-xs-3 col-sm-3 col-lg-3 col-lg-3 align-center cursor-pointer p-l-0">
                              <WorkspaceSubCard height="40px" countId="toDoRetailTrackCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Courier"} cardCount={taskToDoCourier ? taskToDoCourier.rows.length : 10} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="col-xs-3 col-sm-3 col-lg-3 col-lg-3 align-center cursor-pointer p-l-0">
                              <WorkspaceSubCard height="40px" countId="toDoDeliveryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Escalated"} cardCount={taskToTrackEscalatedTasks ? taskToTrackEscalatedTasks.rows.length : 10} activeFilterTab={"ESCALATED TASKS"} />
                            </div>
                          </div>
                        )}

                        {(activePageTabItem === 'TASKS TO TRACK') && (
                          <div class="subfilterworkspacedayplan row">
                            <div class=" cursor-pointer col-xs-3 col-sm-3 col-md-3 col-lg-3 p-l-0">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Everyday"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackDaily ? taskToTrackDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class=" cursor-pointer col-xs-3 col-sm-3 col-md-3 col-lg-3 p-l-0">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Follow Up"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackFollow ? taskToTrackFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class=" cursor-pointer col-xs-3 col-sm-3 col-md-3 col-lg-3 p-l-0">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Courier"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackCourier ? taskToTrackCourier.rows.length : ""} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="cursor-pointer col-xs-3 col-sm-3 col-md-3 col-lg-3 p-l-0">
                              <WorkspaceSubCard height="40px" countId="toTrackCalls" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Calls"} cardCount={taskToTrackCalls ? taskToTrackCalls.rows.length : ""} activeFilterTab={"CALLS"} />
                            </div>
                          </div>
                        )}
                        {(activePageTabItem === 'COMPLETED TASKS') && (
                          <div class="subfilterworkspacedayplan row">
                            <div class="col-xs-4 col-sm-4 col-md-3 col-lg-4 p-l-0 cursor-pointer">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Everyday"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskDaily ? completedTaskDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-3 col-lg-4 p-l-0 cursor-pointer">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Follow Up"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskFollow ? completedTaskFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-3 col-lg-4 p-l-0 cursor-pointer">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Courier"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskCourier ? completedTaskCourier.rows.length : ""} activeFilterTab={"COURIER"} />
                            </div>
                          </div>
                        )}

                      </div>
                    )
                  } */}
                    {/* {
                    userInfo && userInfo['userDesignation'] !== "RECEPTIONIST" && (
                      <div class="subfilterworkspacedayplan m-t-15 m-b-20">
                        {(activePageTabItem === 'TASKS TO DO') && (
                          <div class="subfilterworkspacecalldayplan row">
                            <div class="col-xs-3 col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" countId="toDoEnquiryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"ENQUIRY"} cardCount={taskToDoDaily ? taskToDoDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0 p-r-1rem" >
                              <WorkspaceSubCard height="40px" countId="toDoBookingCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"BOOKING"} cardCount={taskToDoFollow ? taskToDoFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0 p-r-1rem" >
                              <WorkspaceSubCard height="40px" countId="toDoRetailTrackCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"RETAIL"} cardCount={taskToDoCourier ? taskToDoCourier.rows.length : ''} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0 p-r-1rem" >
                              <WorkspaceSubCard height="40px" countId="toDoDeliveryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"DELIVERY"} cardCount={taskToDoCalls ? taskToDoCalls.rows.length : ''} activeFilterTab={"ESCALATED TASKS"} />
                            </div>
                          </div>
                        )}
                        {(activePageTabItem === 'TASKS TO TRACK') && (
                          <div class="subfilterworkspacecalldayplan row">
                            <div class="col-xs-3 col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" countId="toDoEnquiryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"ENQUIRY"} cardCount={taskToDoDaily ? taskToDoDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0" style="padding-right:1rem" >
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"BOOKING"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackFollow ? taskToTrackFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0" style="padding-right:1rem" >
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"RETAIL"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackCourier ? taskToTrackCourier.rows.length : ""} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0" style="padding-right:1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"DELIVERY"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackEscalatedTasks ? taskToTrackEscalatedTasks.rows.length : ""} activeFilterTab={"ESCALATED TASKS"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0" style="padding-right:1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"CALLS"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackCalls ? taskToTrackCalls.rows.length : ""} activeFilterTab={"CALLS"} />
                        </div>
                          </div>
                        )}
                        {(activePageTabItem === 'COMPLETED TASKS') && (
                          <div class="subfilterworkspacecalldayplan row">
                            <div class="col-xs-3 col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"ENQUIRY"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskDaily ? completedTaskDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"BOOKING"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskFollow ? completedTaskFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"RETAIL"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskCourier ? completedTaskCourier.rows.length : ""} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"DELIVERY"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackEscalatedTasks ? taskToTrackEscalatedTasks.rows.length : ""} activeFilterTab={"ESCALATED TASKS"} />
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  } */}
                    {/*
                    modified by Vihang
                    modified at 11/05/2022
                    modification : If the list is empty, display message "No Tasks" changes
                  */}
                    {/* modified by Vihang
                     modified at 12/05/2022
                     modification : aligned task cards and list view*/}
                    <div class="row list-card-scrollable-container m-t-10">
                      <div class="col-xs-12 col-lg-12 p-l-0 p-r-10 m-t-0 h-inherit pos-relative">
                        {taskData && (activePageTabItem === 'TASKS TO DO' || activePageTabItem === 'TASKS TO TRACK' || activePageTabItem === 'COMPLETED TASKS') && (
                          <div class="h-inherit">
                            <ListCard updateNextTask={props.updateNextTask} setShowSemiDetailView={props.setShowSemiDetailView} activeFilter={activeFilter} taskType="dayPlanTask" taskData={taskData} showData={props.toggleTaskEdit} taskIcon={<img src="/assets/images/clipboard.png" style='width: 20px !important;' />} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='orgChartModal'>
              <div id="floatingModal" class={`org-chart-modal`} style={`display: ${ isPriceListModalOpen ? "block" : "none"}`}>
                <div class="org-chart-modal-content org-chart-width">
                  <div>
                    <div class="org-chart-modal-header">
                      <span class="org-chart-close" onClick={(e) => togglePriceListModal(e)}>&times;</span>
                    </div>
                    <div class="org-chart-modal-body background-transparent">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                              <label class="modal-label">Price List</label>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                              <img src="/assets/images/undraw_Order_ride_re_372k.svg" class="wizard-imgs" alt="" />
                            </div>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-t-5 display-flex justify-center flex-column">
                          <div class="row">
                            <div class="col-xs-12">
                              <div class="row">
                                <div class="col-xs-12">
                                  <p for="interestedCar" class="form-label">Model</p>
                                  <select style="width:100%" type="text" id="interestedCar" onChange={e => selectedCarModel(e.target.value)}>
                                    <option selected value="">Not selected</option>
                                    <option value="alcazar">Alcazar</option>
                                    <option value="santro">Santro</option>
                                    <option value="aura">Aura</option>
                                    <option value="venue">Venue</option>
                                    <option value="newcreta">New Creta</option>
                                    <option value="nextgenverna">Next Gen Verna</option>
                                    <option value="allnewi20">All New i20</option>
                                    <option value="grandi10nios">Grand i10 Nios</option>
                                    <option value="i20nline">i20 N line</option>
                                    <option value="konaev">konaev</option>
                                    <option value="tucson">Tucson</option>
                                    <option value="xcentprime">Xcent prime</option>
                                  </select>
                                  <button onClick={(e)=> priceList()} disabled={disablePDFButton}>Download PDF</button>
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
        )}
      </div>
      <div class="isDesktop">
        <div class='row'>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0">
            <div class='row'>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0">
                <div class="Workspacehead background-white p-t-2">
                  <div class="headerworkspacetext display-flex flex-direction-column">
                    <p class="fs-26">Day Plan</p>
                    {/*<button onClick={(e)=> togglePriceListModal()}>Price list</button>*/}
                    {/*<div class="progressbar m-l-0 m-r-0 w-full">
                      <div class="progressbar-value" />
                      <span class="progressbar-percentage">60%</span>
                    </div>*/}
                  </div>
                </div>
              </div>
            </div>
            {/*
                    modified by Vihang
                    modified at 17/05/2022
                    modification : icon changed for workspace card to track
              */}
            <div class='row'>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0" style="height: calc(100vh - 65px)">
                <div>
                  <div class="row topboxstyleworkspacedayplan m-t-20 p-l-0">
                    <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation p-l-0 p-r-1rem">
                      <WorkspaceCard countId="taskTodoCardCount" changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"TASKS TO DO"} cardText={"To Do"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 20 24" width="34px" fill="#e5e5e5"><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8 c1.57,0,3.04,0.46,4.28,1.25l1.45-1.45C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c1.73,0,3.36-0.44,4.78-1.22 l-1.5-1.5C14.28,19.74,13.17,20,12,20z M19,15h-3v2h3v3h2v-3h3v-2h-3v-3h-2V15z" /></svg>} />
                    </div>
                    <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation1 p-l-0 p-r-1rem">
                      <WorkspaceCard countId="taskToTrackCardCount" changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"TASKS TO TRACK"} cardText={"To Track"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 24" height="24" width="24"><path d="M15.3 16.7 11 12.4V7H13V11.6L16.7 15.3ZM2.85 16.075Q2.525 15.35 2.325 14.587Q2.125 13.825 2.05 13H4.075Q4.15 13.55 4.287 14.062Q4.425 14.575 4.625 15.075ZM2.05 11Q2.125 10.175 2.338 9.4Q2.55 8.625 2.875 7.9L4.625 8.9Q4.425 9.4 4.287 9.925Q4.15 10.45 4.075 11ZM6.175 20.15Q5.5 19.65 4.925 19.062Q4.35 18.475 3.85 17.8L5.6 16.8Q5.95 17.25 6.338 17.637Q6.725 18.025 7.175 18.375ZM5.625 7.175 3.85 6.175Q4.35 5.5 4.925 4.925Q5.5 4.35 6.175 3.85L7.175 5.625Q6.725 5.975 6.35 6.35Q5.975 6.725 5.625 7.175ZM11 21.95Q10.175 21.875 9.4 21.663Q8.625 21.45 7.9 21.125L8.9 19.375Q9.4 19.575 9.925 19.712Q10.45 19.85 11 19.925ZM8.9 4.625 7.9 2.875Q8.625 2.55 9.4 2.337Q10.175 2.125 11 2.05V4.075Q10.45 4.15 9.925 4.287Q9.4 4.425 8.9 4.625ZM13 21.95V19.925Q13.55 19.85 14.075 19.712Q14.6 19.575 15.1 19.375L16.1 21.125Q15.375 21.45 14.6 21.663Q13.825 21.875 13 21.95ZM15.1 4.625Q14.6 4.425 14.075 4.287Q13.55 4.15 13 4.075V2.05Q13.825 2.125 14.6 2.337Q15.375 2.55 16.1 2.875ZM17.825 20.15 16.825 18.375Q17.275 18.025 17.65 17.65Q18.025 17.275 18.375 16.825L20.15 17.825Q19.65 18.5 19.075 19.087Q18.5 19.675 17.825 20.15ZM18.375 7.175Q18.025 6.75 17.638 6.362Q17.25 5.975 16.825 5.625L17.825 3.85Q18.475 4.325 19.062 4.912Q19.65 5.5 20.125 6.15ZM19.925 11Q19.85 10.425 19.713 9.912Q19.575 9.4 19.375 8.9L21.125 7.875Q21.45 8.6 21.663 9.387Q21.875 10.175 21.95 11ZM21.125 16.1 19.375 15.1Q19.575 14.6 19.713 14.075Q19.85 13.55 19.925 13H21.95Q21.875 13.825 21.663 14.6Q21.45 15.375 21.125 16.1Z"/></svg>} />
                    </div>
                    <div class="col-xs-4 col-lg-4 cursor-pointer fadeMoveUpAnimation2 p-l-0 p-r-0 p-r-1rem">
                      <WorkspaceCard countId="taskCompletedCardCount" changeActiveTab={changeActiveTab} activePageTabItem={activePageTabItem} activeTab={"COMPLETED TASKS"} cardText={"Done"} cardBgColor="#8ecae6" cardHeight={"13vh"} cardIcon={<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 15 24" width="34px" fill="#e5e5e5"><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z" /></svg>} />
                    </div>
                  </div>
                  {/*  {
                    userInfo && userInfo['userDesignation'] === "RECEPTIONIST" && (
                      <div class="subfilterworkspacedayplan m-t-15 m-b-20">
                        {(activePageTabItem === 'TASKS TO DO') && (
                          <div class="subfilterworkspacecalldayplan row">
                            <div class="col-xs-3 col-sm-3 col-lg-3 col-lg-3 align-center cursor-pointer p-l-0" >
                              <WorkspaceSubCard height="40px" countId="toDoEnquiryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Everyday"} cardCount={taskToDoDaily ? taskToDoDaily.rows.length : 10} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-xs-3 col-sm-3 col-lg-3 col-lg-3 align-center cursor-pointer p-l-0">
                              <WorkspaceSubCard height="40px" countId="toDoBookingCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Follow Up"} cardCount={taskToDoFollow ? taskToDoFollow.rows.length : 10} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-xs-3 col-sm-3 col-lg-3 col-lg-3 align-center cursor-pointer p-l-0">
                              <WorkspaceSubCard height="40px" countId="toDoRetailTrackCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Courier"} cardCount={taskToDoCourier ? taskToDoCourier.rows.length : 10} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="col-xs-3 col-sm-3 col-lg-3 col-lg-3 align-center cursor-pointer p-l-0">
                              <WorkspaceSubCard height="40px" countId="toDoDeliveryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Escalated"} cardCount={taskToTrackEscalatedTasks ? taskToTrackEscalatedTasks.rows.length : 10} activeFilterTab={"ESCALATED TASKS"} />
                            </div>
                          </div>
                        )}
                        {(activePageTabItem === 'TASKS TO TRACK') && (
                          <div class="subfilterworkspacedayplan row">
                            <div class=" cursor-pointer col-xs-3 col-sm-3 col-md-3 col-lg-3 p-l-0">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Everyday"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackDaily ? taskToTrackDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class=" cursor-pointer col-xs-3 col-sm-3 col-md-3 col-lg-3 p-l-0">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Follow Up"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackFollow ? taskToTrackFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class=" cursor-pointer col-xs-3 col-sm-3 col-md-3 col-lg-3 p-l-0">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Courier"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackCourier ? taskToTrackCourier.rows.length : ""} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="cursor-pointer col-xs-3 col-sm-3 col-md-3 col-lg-3 p-l-0">
                              <WorkspaceSubCard height="40px" countId="toTrackCalls" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"Calls"} cardCount={taskToTrackCalls ? taskToTrackCalls.rows.length : ""} activeFilterTab={"CALLS"} />
                            </div>
                          </div>
                        )}
                        {(activePageTabItem === 'COMPLETED TASKS') && (
                          <div class="subfilterworkspacedayplan row">
                            <div class="col-xs-4 col-sm-4 col-md-3 col-lg-4 p-l-0 cursor-pointer">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Everyday"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskDaily ? completedTaskDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-3 col-lg-4 p-l-0 cursor-pointer">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Follow Up"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskFollow ? completedTaskFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-3 col-lg-4 p-l-0 cursor-pointer">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"Courier"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskCourier ? completedTaskCourier.rows.length : ""} activeFilterTab={"COURIER"} />
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  }
                  {
                    userInfo && userInfo['userDesignation'] !== "RECEPTIONIST" && (
                      <div class="subfilterworkspacedayplan m-t-15 m-b-20">
                        {(activePageTabItem === 'TASKS TO DO') && (
                          <div class="subfilterworkspacecalldayplan row">
                            <div class="col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" countId="toDoEnquiryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"ENQUIRY"} cardCount={taskToDoDaily ? taskToDoDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-lg-3 p-l-0 p-r-1rem" >
                              <WorkspaceSubCard height="40px" countId="toDoBookingCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"BOOKING"} cardCount={taskToDoFollow ? taskToDoFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-lg-3 p-l-0 p-r-1rem" >
                              <WorkspaceSubCard height="40px" countId="toDoRetailTrackCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"RETAIL"} cardCount={taskToDoCourier ? taskToDoCourier.rows.length : ''} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="col-lg-3 p-l-0 p-r-1rem" >
                              <WorkspaceSubCard height="40px" countId="toDoDeliveryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"DELIVERY"} cardCount={taskToDoCalls ? taskToDoCalls.rows.length : ''} activeFilterTab={"ESCALATED TASKS"} />
                            </div>
                          </div>
                        )}
                        {(activePageTabItem === 'TASKS TO TRACK') && (
                          <div class="subfilterworkspacecalldayplan row">
                            <div class="col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" countId="toDoEnquiryCardCount" inboxTask={false} setTaskData={setTaskData} activeFilter={activeFilter} cardText={"ENQUIRY"} cardCount={taskToDoDaily ? taskToDoDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0" style="padding-right:1rem" >
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"BOOKING"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackFollow ? taskToTrackFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0" style="padding-right:1rem" >
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"RETAIL"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackCourier ? taskToTrackCourier.rows.length : ""} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0" style="padding-right:1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"DELIVERY"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackEscalatedTasks ? taskToTrackEscalatedTasks.rows.length : ""} activeFilterTab={"ESCALATED TASKS"} />
                            </div>
                            <div class="col-xs-3 col-lg-3 p-l-0" style="padding-right:1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"CALLS"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackCalls ? taskToTrackCalls.rows.length : ""} activeFilterTab={"CALLS"} />
                        </div>
                          </div>
                        )}
                        {(activePageTabItem === 'COMPLETED TASKS') && (
                          <div class="subfilterworkspacecalldayplan row">
                            <div class="col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"ENQUIRY"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskDaily ? completedTaskDaily.rows.length : ''} activeFilterTab={"DAILY TASKS"} />
                            </div>
                            <div class="col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"BOOKING"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskFollow ? completedTaskFollow.rows.length : ''} activeFilterTab={"FOLLOW UP"} />
                            </div>
                            <div class="col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"RETAIL"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={completedTaskCourier ? completedTaskCourier.rows.length : ""} activeFilterTab={"COURIER"} />
                            </div>
                            <div class="col-lg-3 p-l-0 p-r-1rem">
                              <WorkspaceSubCard height="40px" inboxTask={false} cardText={"DELIVERY"} setTaskData={setTaskData} activeFilter={activeFilter} cardCount={taskToTrackEscalatedTasks ? taskToTrackEscalatedTasks.rows.length : ""} activeFilterTab={"ESCALATED TASKS"} />
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  }
                  */}
                  {/*
                    modified by Vihang
                    modified at 11/05/2022
                    modification : If the list is empty, display message "No Tasks" changes
                  */}
                  {/* modified by Vihang
                     modified at 12/05/2022
                     modification : aligned task cards and list view*/}
                  <div class="row list-card-scrollable-container m-t-10">
                    <div class="col-lg-12 p-l-0 p-r-10 m-t-0 pos-relative h-inherit">

                      {taskData && taskData.columns && (activePageTabItem === 'TASKS TO DO' || activePageTabItem === 'TASKS TO TRACK' || activePageTabItem === 'COMPLETED TASKS') && (
                        <div class="h-inherit">
                          <ListCard updateNextTask={props.updateNextTask} activeFilter={activeFilter} taskType="dayPlanTask" taskData={taskData} showData={props.toggleTaskEdit} taskIcon={<img src="/assets/images/clipboard.png" style='width: 20px !important;' />} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='orgChartModal'>
            <div id="floatingModal" class={`org-chart-modal`} style={`display: ${ isPriceListModalOpen ? "block" : "none"}`}>
              <div class="org-chart-modal-content org-chart-width">
                <div>
                  <div class="org-chart-modal-header">
                    <span class="org-chart-close" onClick={(e) => togglePriceListModal(e)}>&times;</span>
                  </div>
                  <div class="org-chart-modal-body background-transparent">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                            <label class="modal-label">Price List</label>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                            <img src="/assets/images/undraw_Order_ride_re_372k.svg" class="wizard-imgs" alt="" />
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-t-5 display-flex justify-center flex-column">
                        <div class="row">
                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-12">
                                <p for="interestedCar" class="form-label">Model</p>
                                <select style="width:100%" type="text" id="interestedCar" onChange={e => selectedCarModel(e.target.value)}>
                                  <option selected value="">Not selected</option>
                                  <option value="alcazar">Alcazar</option>
                                  <option value="santro">Santro</option>
                                  <option value="aura">Aura</option>
                                  <option value="venue">Venue</option>
                                  <option value="newcreta">New Creta</option>
                                  <option value="nextgenverna">Next Gen Verna</option>
                                  <option value="allnewi20">All New i20</option>
                                  <option value="grandi10nios">Grand i10 Nios</option>
                                  <option value="i20nline">i20 N line</option>
                                  <option value="konaev">konaev</option>
                                  <option value="tucson">Tucson</option>
                                  <option value="xcentprime">Xcent prime</option>
                                </select>
                                <button onClick={(e)=> priceList()} disabled={disablePDFButton}>Download PDF</button>
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
      </div>
    </div>
  );
};

export default Dayplanworkspace;
