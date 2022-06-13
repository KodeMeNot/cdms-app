import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import { route } from "preact-router";
import { getItem, removeAll } from '../../lib/myStore';
import { getInitials, getDay, getMonth, getFormattedAmount } from '../../lib/utils';
import CONSTANTS from '../../lib/constants';
import ApexCharts from 'apexcharts';
import { CountUp } from 'countup.js';
import moment from "moment";
import {RightInfoPanel} from "../../components/rightInfoPanel";
import Teamsworkspace from "../../components/teamsworkspace";
import ReceptionistWorkspace from "../../components/receptionistWorkspace";
import SalesWorkspace from "../../components/salesWorkspace";
import { Modal, ModalBody } from '../../components/rightDrawer';
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
import toastr from "toastr";
import hyundaiX from "../../assets/images/hyundaiX.jpeg";
import hyundaiLogo from "../../assets/images/crystal-honda.png";
import PDFSTYLE from "../../lib/pdfGenerationConfig";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { NewPopupModal, NewPopupModalBody } from '../../components/newPopupModal';
import MobileBottomNavigation from '../../components/mobileBottomNavigation';
import { formatDateTime, applyAclForFeedAndChat } from '../../lib/utils';
import DraggableTag from "../../components/draggableTag";
import imageCompression from 'browser-image-compression';
import ListSingleCard from '../../components/listSingleCard';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

const Workspace = (props) => {
  let userInfo = getItem('userinfo');
  const todaysDate = new Date();
  let [userDisplayName, setUserDisplayName] = useState(userInfo.displayName);
  let [userBranchName, setUserBranchName] = useState(userInfo.userBranchName ? userInfo.userBranchName : '');
  let [userRoleName, setUserRoleName] = useState(userInfo.userRoleName ? userInfo.userRoleName : '');
  let [userDesignation, setUserDesignation] = useState(userInfo.userDesignation ? userInfo.userDesignation : '');
  let [newNotification, setNewNotification] = useState(false);
  let [isFollowUpModalOpen, setFollowUpModalOpen] = useState(false);
  let [isReceivePaymentModalOpen, setReceivePaymentModalOpen] = useState(false);
  let [cases, setCases] = useState([]);
  let [typeOfPayments, setTypeOfPayments] = useState([]);
  let [typeOfPayment, setTypeOfPayment] = useState('');
  let [selectedCase, setSelectedCase] = useState('');
  let [selectedCaseObj, setSelectedCaseObj] = useState({});
  let [selectedRemarkCatagory, setSelectedRemarkCategory] = useState('');
  let [remark, setRemark] = useState('');
  let [typeofFollowup, setTypeofFollowup] = useState('');
  let [followupDate, setFollowupDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  let [isFollowupDone, setIsFollowupDone] = useState(false);
  let [isCallOriginated, setIsCallOriginated] = useState(false);
  let [amountPaid, setAmountPaid] = useState(0);
  let [otp, setOTP] = useState('');
  let [chequeNumber, setChequeNumber] = useState('');
  let [transactionReferenceNumber, setTransactionReferenceNumber] = useState('');
  let [payeeName, setPayeeName] = useState('');
  let [payeeBank, setPayeeBank] = useState('');
  let [modeOfPayment, setModeOfPayment] = useState('');
  const [isOpenAssignUsersTriggeredTask, setIsOpenAssignUsersTriggeredTask] = useState(false);
  let [triggeredUnassignedTaskList, setTriggeredUnassignedTaskList] = useState([])
  let [assignToUserList, setAssignToUserList] = useState([]);
  let [dynamicProps, setDynamicProps] = useState([]);
  let [isOpenFormPopover, setIsOpenFormPopover] = useState(false);
  let [endorsementObj, setEndorsementObj] = useState({
    searchQuery: '',
    endorsementFileID: '',
    endorsementRemark: '',
    ncbCertificateID: '',
    isNoClaimBonus: '',
    typeOfEndorsement: '',
    selectedManagerID: '',
    endorsementFileIDSignedURL: '',
    ncbCertificateIDSignedURL: '',
    reasonForNCBRecovery: '',
    recoveryAmount: 0,
    cancellationReason: '',
    otherCancellationReason: '',
    ncbPercentage: 0
  });
  let [interactionObj, setInteraction] = useState({});
  let [exchangEvaluators, setExchangeEvaluators] = useState([]);
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
  let [modelVariantName, setModelVariantName] = useState('');
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
  let [solidColourTableHeader, setSolidColourTableHeader] = useState([{text:'COLOUR : SOLID COLOUR = ',bold:false}]);
  let [solidColourDieselTableData, setSolidColourDieselTableData] = useState([{text:'COLOUR : SOLID COLOUR = ',bold:false}]);
  let [solidColourCNGTableData, setSolidColourCNGTableData] = useState([{text:'COLOUR : SOLID COLOUR = ',bold:false}]);
  let [noCashPaymentTableHeader,setNoCashPaymentTableHeader] = useState([{text:'Note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED',bold:false}]);
  let [termsAndConitionsTableHeader,setTermsAndConitionsTableHeader] = useState([{text:'Terms & Conditions Details Overleaf',bold:false}]);
  let [termsAndConditionsTableData,setTermsAndConitionsTableData] = useState([{text:'TERMS & CONDITIONS:Model Features:Please refer separate sheet:  No extended warrenty Tourist Taxi',bold:false}]);
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
    setTimeout(() => {
      let inbox = document.getElementsByClassName("flip-card-inner")[0];
      inbox.style.transform = "rotateY(0deg)";
    }, 10);
  },[]);
  useEffect(()=>{
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-bottom-left",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "900",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "slideDown",
      "hideMethod": "slideUp"
    };
  },[]);


  function VisitModalVisibility(e) {
    e.preventDefault();
    setProfileDetailVisibility(true);
  }
  function closeProfileDetailModal(e) {
    e.preventDefault();
    setProfileDetailVisibility(false);
  }
  function triggerNotifications(e) {
    // e.preventDefault();
    setNewNotification(!newNotification);
  }
  function renderIcons() {
    // Move icon
    if (!this.series[0].icon) {
      this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
        .attr({
          stroke: '#303030',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': 2,
          zIndex: 10
        })
        .add(this.series[2].group);
    }
    this.series[0].icon.translate(
      this.chartWidth / 2 - 10,
      this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
      (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
    );

    // Exercise icon
    if (!this.series[1].icon) {
      this.series[1].icon = this.renderer.path(
        ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
          'M', 8, -8, 'L', 16, 0, 8, 8]
      )
        .attr({
          stroke: '#ffffff',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': 2,
          zIndex: 10
        })
        .add(this.series[2].group);
    }
    this.series[1].icon.translate(
      this.chartWidth / 2 - 10,
      this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
      (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
    );

    // Stand icon
    if (!this.series[2].icon) {
      this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
        .attr({
          stroke: '#303030',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': 2,
          zIndex: 10
        })
        .add(this.series[2].group);
    }

    this.series[2].icon.translate(
      this.chartWidth / 2 - 10,
      this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
      (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
    );
  }

  function renderIcons() {

    // Move icon
    if (!this.series[0].icon) {
      this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
        .attr({
          stroke: '#303030',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': 2,
          zIndex: 10
        })
        .add(this.series[2].group);
    }
    this.series[0].icon.translate(
      this.chartWidth / 2 - 10,
      this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
      (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
    );

    // Exercise icon
    if (!this.series[1].icon) {
      this.series[1].icon = this.renderer.path(
        ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
          'M', 8, -8, 'L', 16, 0, 8, 8]
      )
        .attr({
          stroke: '#ffffff',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': 2,
          zIndex: 10
        })
        .add(this.series[2].group);
    }
    this.series[1].icon.translate(
      this.chartWidth / 2 - 10,
      this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
      (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
    );

    // Stand icon
    if (!this.series[2].icon) {
      this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
        .attr({
          stroke: '#303030',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': 2,
          zIndex: 10
        })
        .add(this.series[2].group);
    }

    this.series[2].icon.translate(
      this.chartWidth / 2 - 10,
      this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
      (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
    );
  }

  useEffect(() => {
    setTimeout(() => {
      let inbox = document.getElementsByClassName("flip-card-inner")[0];
      inbox && (inbox.style.transform = "rotateY(0deg)");
    }, 10);

    let timelineOptions = {
      series: [
        {
          data: [
            {
              x: 'Analysis',
              y: [
                new Date('2019-02-27').getTime(),
                new Date('2019-03-04').getTime()
              ],
              fillColor: '#008FFB'
            },
            {
              x: 'Design',
              y: [
                new Date('2019-03-04').getTime(),
                new Date('2019-03-08').getTime()
              ],
              fillColor: '#00E396'
            },
            {
              x: 'Coding',
              y: [
                new Date('2019-03-07').getTime(),
                new Date('2019-03-10').getTime()
              ],
              fillColor: '#775DD0'
            },
            {
              x: 'Testing',
              y: [
                new Date('2019-03-08').getTime(),
                new Date('2019-03-12').getTime()
              ],
              fillColor: '#FEB019'
            },
            {
              x: 'Deployment',
              y: [
                new Date('2019-03-12').getTime(),
                new Date('2019-03-17').getTime()
              ],
              fillColor: '#FF4560'
            }
          ]
        }
      ],
      chart: {
        height: 280,
        type: 'rangeBar'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter(val, opts) {
          let label = opts.w.globals.labels[opts.dataPointIndex];
          let a = 20;
          let b = 30;
          //   var diff = b.diff(a, 'days')
          let diff = b;
          return label + ': ' + diff + (diff > 1 ? ' days' : ' day');
        },
        style: {
          colors: ['#f3f4f5', '#fff']
        }
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        show: false
      },
      grid: {
        row: {
          colors: ['#f3f4f5', '#fff'],
          opacity: 1
        }
      }
    };
    if ( userInfo.userDesignation === "SALES CONSULTANT") {
      let barMarkOptions = {
        series: [
          {
            name: 'Actual',
            color: '#cbcbcb',
            data: [
              {
                x: 'i20 N Line',
                y: 1292,
                goals: [
                  {
                    name: 'Expected',
                    value: 1400,
                    strokeHeight: 5,
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'Alcazar',
                y: 4432,
                goals: [
                  {
                    name: 'Expected',
                    value: 5400,
                    strokeHeight: 5,
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'Santro',
                y: 5423,
                goals: [
                  {
                    name: 'Expected',
                    value: 5200,
                    strokeHeight: 5,
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'Grand i10 Nios',
                y: 6653,
                goals: [
                  {
                    name: 'Expected',
                    value: 6500,
                    strokeHeight: 5,
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'Aura',
                y: 8133,
                goals: [
                  {
                    name: 'Expected',
                    value: 6600,
                    strokeHeight: 13,
                    strokeWidth: 0,
                    strokeLineCap: 'round',
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'All New i20',
                y: 7132,
                goals: [
                  {
                    name: 'Expected',
                    value: 7500,
                    strokeHeight: 5,
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'Venue',
                y: 7332,
                goals: [
                  {
                    name: 'Expected',
                    value: 8700,
                    strokeHeight: 5,
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'Next Gen Verna',
                y: 6553,
                goals: [
                  {
                    name: 'Expected',
                    value: 7300,
                    strokeHeight: 2,
                    strokeDashArray: 2,
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'New Creta',
                y: 7332,
                goals: [
                  {
                    name: 'Expected',
                    value: 8700,
                    strokeHeight: 5,
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'Tucson',
                y: 7332,
                goals: [
                  {
                    name: 'Expected',
                    value: 8700,
                    strokeHeight: 5,
                    strokeColor: '#f08080'
                  }
                ]
              },
              {
                x: 'Kona EV',
                y: 7332,
                goals: [
                  {
                    name: 'Expected',
                    value: 8700,
                    strokeHeight: 5,
                    strokeColor: '#f08080'
                  }
                ]
              }
            ]
          }
        ],
        chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#00E396', '#f08080']
          }
        }
      };
      let barMarksChart = new ApexCharts(document.querySelector("#barMarksChart"), barMarkOptions);
      barMarksChart.render();

      let horizontalbar = {
        series: [{
          name: 'Enquiry',
          data: [50],
          strokeColor: '#f79256'
        }, {
          name: 'Booking',
          data: [10],
          strokeColor: '#63e0f3'
        }],
        chart: {
          type: 'bar',
          height: 200,
          width:200,
          selection: {
            enabled: false
          },
          toolbar:{
            show:false
          }
        },
        fill: {
          colors: ['#f79256', '#63e0f3']
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        colors: ['#f79256','#63e0f3' ],
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          },
          markers: {
            fillColors: ['#f79256', '#63e0f3']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false,
          fixed: {
            enabled: true,
            position: 'topright'
          }
        },
        xaxis: {
          categories: ["Enquiry Vs Booking"]
        },
        yaxis: {
          show: false,
          showAlways: false
        }
      };
      let horibarchart = new ApexCharts(document.querySelector("#horibarchart"), horizontalbar);
      horibarchart.render();

      let donutOptions = {
        series: [50, 30, 15, 5],
        chart: {
          type: 'donut',
          width: 400,
          height: 400
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%'
            }
          }
        },
        labels: ['5 Star', '4 Star', '3 Star', '2 Star'],
        colors: ['#f79256','#666d77' ,'#63e0f3','#f08080'],
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

      let donutChart = new ApexCharts(document.querySelector("#donutChart"), donutOptions);
      donutChart.render();
    }
  }, []);

  async function toggleNewFollowupModal(e) {
    if (!isFollowUpModalOpen) {
      //Get all interactions assigned to the logged in user
      let cases = await axios.get(`${CONSTANTS.API_URL}/api/v1/userCases?userID=${userInfo.uuid}`);
      console.log("casescases",cases);
      if (cases.data.length) {
        setCases(cases.data);
      } else {
        setCases([]);
      }
    } else {
      setSelectedCase('');
      setSelectedRemarkCategory('');
      setRemark('');
      setTypeofFollowup('');
      setFollowupDate(moment(new Date()).format('YYYY-MM-DD'));
      setIsFollowupDone(false);
      setIsCallOriginated(false);
    }
    setFollowUpModalOpen(!isFollowUpModalOpen);
  }

  async function toggleReceivePaymentModal(e) {
    if (!isReceivePaymentModalOpen) {
      //Get all interactions assigned to the logged in user
      let cases = await axios.get(`${CONSTANTS.API_URL}/api/v1/userCases?userID=${userInfo.uuid}`);
      console.log("casescases",cases);
      if (cases.data.length) {
        setCases(cases.data);
      } else {
        setCases([]);
      }
    } else {
      setSelectedCase('');
    }
    setReceivePaymentModalOpen(!isReceivePaymentModalOpen);
  }

  async function originateCall(e) {
    await axios.post(`${CONSTANTS.API_URL}/api/v1/originateCall`, {
      userID: userInfo.uuid,
      mobileNumber: selectedCaseObj['dynamicProperties_mobile']
    });
    setIsCallOriginated(!isCallOriginated);
  }
  async function setCase(value) {
    setSelectedCase(value);
    let selectedCaseObject = cases.find(d => d.uuid === value);
    console.log("selectedCase",selectedCaseObject);
    if (selectedCaseObject) {
      setSelectedCaseObj(selectedCaseObject);
      setTypeOfPayments(['Partial Booking Amount', 'Full Booking Amount','Partial Down Payment', 'Full Down Payment', 'Full Payment'])
    }
  }

  function togglePriceListModal() {
    setIsPriceListModalOpen(!isPriceListModalOpen);
  }

  async function pullFromDMS()  {
    let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/pullFromHondaDMS`, {
      userName: 'BDD27383',
      password:'Pankaj@98'
    });
    console.log(response.data, 'resposeeeeeeeeeeee');
    toastr.info('Bookings pulled from Honda DMS');
    toastr.info('Insurance Cases created for 1 Booking');
  }

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
    setNoCashPaymentTableHeader([{text:'Note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED', fontSize:12,bold:false}]);
    setTermsAndConitionsTableHeader([{text:'Terms & Conditions Details Overleaf', fontSize:12,bold:false}]);
    setTermsAndConitionsTableData([{text:'TERMS & CONDITIONS:Model Features:Please refer separate sheet:  No extended warrenty Tourist Taxi', fontSize:12,bold:false}]);
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
    let catalogoueCarVariantPetrolData;
    let catalogoueCarVariantDieselData;
    let catalogoueCarVariantCNGData;
    if(model === "konaev") {
      catalogoueCarVariantPetrolData = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue/carVariant?model=${model}&&fuelType=electric`);
      await setCatalogueCarVariant(catalogoueCarVariantPetrolData.data);
    } else {
      catalogoueCarVariantPetrolData = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue/carVariant?model=${model}&&fuelType=petrol`);
      await setCatalogueCarVariant(catalogoueCarVariantPetrolData.data);
      catalogoueCarVariantDieselData = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue/carVariant?model=${model}&&fuelType=diesel`);
      await setCatalogueCarVariantDiesel(catalogoueCarVariantDieselData.data);
      catalogoueCarVariantCNGData = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue/carVariant?model=${model}&&fuelType=cng`);
      await setCatalogueCarVariantCNG(catalogoueCarVariantCNGData.data);
    }
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
    let solidColors = [];
    await catalogoueCarVariantPetrolData.data.map((car)=> solidColors.push(car.color));
    let uniqueColors = await Array.from(new Set(solidColors))
    if (catalogoueCarVariantPetrolData && catalogoueCarVariantPetrolData.data && catalogoueCarVariantPetrolData.data.length > 0) {
      let pdfWidth = ['auto'];
      catalogoueCarVariantPetrolData.data.map(i => {
        pdfWidth.push('*');
      });
      await setPdfWidthForCarVariant(pdfWidth);
      allnewi20tableHeader[0].text = modelMapping[model] + (model === "konaev" ? " Electric" : " Petrol") ;
      await setAllNewi20TableHeader(allnewi20tableHeader);
      // modified by Vihang
      // modified at 5 May 2022
      // modification: solidcolor data integration for pricelist pdf

      // modified by Vihang
      // modified at 16 May 2022
      // modification: solidcolor changes for pricelist pdf
      let solidColorOnce = true;
      await catalogoueCarVariantPetrolData.data.map(async(car)=> {
        if (car && car.color) {
          if (solidColorOnce ) {
            let solidColor;
            await uniqueColors.map((colors,index,colorArr)=> {
              solidColor = colors[0].toUpperCase() + colors.substring(1);
              solidColourTableHeader[0].text = solidColourTableHeader[0].text + solidColor + (colorArr.length === 1 || colorArr.length === index + 1 ? "" : ", ");
              solidColorOnce = false;
            });
          }
        }
        let carVariant;
        if (car && car.variant) {
          carVariant = await car.variant[0].toUpperCase() + car.variant.substring(1);
        }
        // modified by Vihang
        // modified at 16/05/2022
        // modification : new amount format added for all the prices and solid color changes
        carVariantTableData.push(car.variant ?  carVariant :  "");
        exShowroomTableData.push(car.exShowroom ? getFormattedAmount(car.exShowroom) : "₹" + "0" );
        tcsExShowroomTableData.push(car.tcsOnExShowroom ? getFormattedAmount(car.tcsOnExShowroom) : "₹" + "0" );
        insuranceTableData.push(car.insuranceCalculated ? getFormattedAmount(car.insuranceCalculated) : "₹" + "0" );
        rtoCompanyTableData.push(car.rtoCompany ? getFormattedAmount(car.rtoCompany + car.registrationFee) : "₹" + "0" );
        rtoIndividualTableData.push(car.rtoIndividual ? getFormattedAmount(car.rtoIndividual+ car.registrationFee) : "₹" +  "0" );
        fourFifthExtendedWarrantyTableData.push(car.fourthAnd5thYearExtendedWarranty ? getFormattedAmount(car.fourthAnd5thYearExtendedWarranty) : "₹" + "0");
        rmkTableData.push(car.rmk ?getFormattedAmount(car.rmk) :  "₹" +"0");
        basicAccessoriesKitTableData.push(car.basicAccessoriesKit ? getFormattedAmount(car.basicAccessoriesKit) : "₹" + "0");
        rsaTableData.push(car.rsa ? getFormattedAmount(car.rsa) : "₹" + "0");
        additionalPremiumForEngineProtectionTableData.push(car.additionalPremiumForEngineProtection ? getFormattedAmount(car.additionalPremiumForEngineProtection) :  "₹" + "0");
        additionalPremiumforReturnToInvoiceTableData.push(car.additionalPremiumForRTI ? getFormattedAmount(car.additionalPremiumForRTI) : "₹" + "0");
        totalIndividualTableData.push(car.totalIndividual ? getFormattedAmount(car.totalIndividual) : "₹" + "0");
        totalCompanyTableData.push(car.totalCompany ? getFormattedAmount(car.totalCompany) : "₹" + "0");
        sheildOfTrustTableData.push(car.sheildOfTrust ? getFormattedAmount(car.sheildOfTrust) : "₹" + "0");
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

    if (catalogoueCarVariantDieselData && catalogoueCarVariantDieselData.data && catalogoueCarVariantDieselData.data.length > 0) {
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
      // modified by Vihang
      // modified at 16 May 2022
      // modification: solidcolor changes for pricelist pdf
      let solidColors = [];
      await catalogoueCarVariantDieselData.data.map((car)=> solidColors.push(car.color));
      let uniqueColors = await Array.from(new Set(solidColors))
      let solidColorOnce = true;
      await catalogoueCarVariantDieselData.data.map(async(car)=> {
        if (car && car.color) {
          if (solidColorOnce ) {
            let solidColor;
            await uniqueColors.map((colors,index,colorArr)=> {
              solidColor = colors[0].toUpperCase() + colors.substring(1);
              solidColourDieselTableData[0].text = solidColourDieselTableData[0].text + solidColor + (colorArr.length === 1 || colorArr.length === index + 1 ? "" : ", ");
              solidColorOnce = false;
            });
          }
        }
        let carVariant;
        if (car && car.variant) {
          carVariant = await car.variant[0].toUpperCase() + car.variant.substring(1);
        }
        // modified by Vihang
        // modified at 16/05/2022
        // modification : new amount format added for all the prices and solid color changes
        carVariantDieselTableData.push(car.variant ? carVariant : "0");
        exShowroomDieselTableData.push(car.exShowroom ? getFormattedAmount(car.exShowroom) :  "₹" + "0");
        tcsExShowroomDieselTableData.push(car.tcsOnExShowroom ? getFormattedAmount(car.tcsOnExShowroom) :  "₹" + "0");
        insuranceDieselTableData.push(car.insuranceCalculated ? getFormattedAmount(car.insuranceCalculated) :  "₹" + "0");
        rtoCompanyDieselTableData.push(car.rtoCompany ? getFormattedAmount(car.rtoCompany + car.registrationFee) :  "₹" + "0");
        rtoIndividualDieselTableData.push(car.rtoIndividual ? getFormattedAmount(car.rtoIndividual+ car.registrationFee) :  "₹" + "0");
        fourFifthExtendedWarrantyDieselTableData.push(car.fourthAnd5thYearExtendedWarranty ? getFormattedAmount(car.fourthAnd5thYearExtendedWarranty) :  "₹" + "0");
        rmkDieselTableData.push(car.rmk ? getFormattedAmount(car.rmk) :  "₹" + "0");
        basicAccessoriesKitDieselTableData.push(car.basicAccessoriesKit ? getFormattedAmount(car.basicAccessoriesKit) :  "₹" + "0");
        rsaDieselTableData.push(car.rsa ? getFormattedAmount(car.rsa) :  "₹" + "0");
        additionalPremiumForEngineProtectionDieselTableData.push(car.additionalPremiumForEngineProtection ? getFormattedAmount(car.additionalPremiumForEngineProtection) :  "₹" + "0");
        additionalPremiumforReturnToInvoiceDieselTableData.push(car.additionalPremiumForRTI ? getFormattedAmount(car.additionalPremiumForRTI) :  "₹" + "0");
        totalIndividualDieselTableData.push(car.totalIndividual ? getFormattedAmount(car.totalIndividual) :  "₹" + "0");
        totalCompanyDieselTableData.push(car.totalCompany ? getFormattedAmount(car.totalCompany) :  "₹" + "0");
        sheildOfTrustDieselTableData.push(car.sheildOfTrust ? getFormattedAmount(car.sheildOfTrust) :  "₹" + "0");
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

    if (catalogoueCarVariantCNGData && catalogoueCarVariantCNGData.data && catalogoueCarVariantCNGData.data.length > 0) {
      let pdfWidth = await Array(catalogoueCarVariantCNGData.data.length + 1).fill("*");
      await setPdfWidthForCarVariantCNG(pdfWidth);
      modelCNGtableHeader[0].text = modelMapping[model] + " CNG";
      await setModelCNGTableHeader(modelCNGtableHeader);
      // modified by Vihang
      // modified at 5 May 2022
      // modification: solidcolor data integration for pricelist pdf
      // modified by Vihang
      // modified at 16 May 2022
      // modification: solidcolor changes for pricelist pdf
      await catalogoueCarVariantCNGData.data.map((car)=> solidColors.push(car.color));
      let uniqueColors = await Array.from(new Set(solidColors))
      let solidColorOnce = true;
      await catalogoueCarVariantCNGData.data.map(async(car)=> {
        if (car && car.color) {
          let solidColors = await catalogoueCarVariantCNGData.data.filter((value, index, self) => index === self.findIndex((t) => t.color === car.color));
          if (solidColorOnce) {
            let solidColor;
            await uniqueColors.map((colors,index,colorArr)=> {
              solidColor = colors[0].toUpperCase() + colors.substring(1);
              solidColourCNGTableData[0].text = solidColourCNGTableData[0].text + solidColor + (colorArr.length === 1 || colorArr.length === index + 1 ? "" : ", ") ;
              solidColorOnce = false;
            });
          }
        }
        let carVariant;
        if (car && car.variant) {
          carVariant = await car.variant[0].toUpperCase() + car.variant.substring(1);
        }
        // modified by Vihang
        // modified at 16/05/2022
        // modification : removed rupees symbol from car variant data in CNG and new amount format added for all the prices
        carVariantCNGTableData.push(car.variant ? carVariant : "0");
        exShowroomCNGTableData.push(car.exShowroom ? getFormattedAmount(car.exShowroom) : "₹" + "0");
        tcsExShowroomCNGTableData.push(car.tcsOnExShowroom ? getFormattedAmount(car.tcsOnExShowroom) : "₹" + "0");
        insuranceCNGTableData.push(car.insuranceCalculated ? getFormattedAmount(car.insuranceCalculated) : "₹" + "0");
        rtoCompanyCNGTableData.push(car.rtoCompany ? getFormattedAmount(car.rtoCompany + car.registrationFee) : "₹" + "0");
        rtoIndividualCNGTableData.push(car.rtoIndividual ? getFormattedAmount(car.rtoIndividual+ car.registrationFee) : "₹" + "0");
        fourFifthExtendedWarrantyCNGTableData.push(car.fourthAnd5thYearExtendedWarranty ? getFormattedAmount(car.fourthAnd5thYearExtendedWarranty) : "₹" + "0");
        rmkCNGTableData.push(car.rmk ? getFormattedAmount(car.rmk) : "₹" + "0");
        basicAccessoriesKitCNGTableData.push(car.basicAccessoriesKit ? getFormattedAmount(car.basicAccessoriesKit) : "₹" + "0");
        rsaCNGTableData.push(car.rsa ? getFormattedAmount(car.rsa) : "₹" + "0");
        additionalPremiumForEngineProtectionCNGTableData.push(car.additionalPremiumForEngineProtection ? getFormattedAmount(car.additionalPremiumForEngineProtection) : "₹" + "0");
        additionalPremiumforReturnToInvoiceCNGTableData.push(car.additionalPremiumForRTI ? getFormattedAmount(car.additionalPremiumForRTI) : "₹" + "0");
        totalIndividualCNGTableData.push(car.totalIndividual ? getFormattedAmount(car.totalIndividual) : "₹" + "0");
        totalCompanyCNGTableData.push(car.totalCompany ? getFormattedAmount(car.totalCompany) : "₹" + "0");
        sheildOfTrustCNGTableData.push(car.sheildOfTrust ? getFormattedAmount(car.sheildOfTrust) : "₹" + "0");
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
    await setDisablePDFButton(false);
  }

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
              ["Note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED"],
              ["Terms & Conditions Details Overleaf"],
              ["TERMS & CONDITIONS:Model Features:Please refer separate sheet:  No extended warrenty Tourist Taxi"],
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
                ["Note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED"],
                ["Terms & Conditions Details Overleaf"],
                ["TERMS & CONDITIONS:Model Features:Please refer separate sheet:  No extended warrenty Tourist Taxi"],
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
    await setNoCashPaymentTableHeader([{text:'Note : NO CASH PAYMENT ABOVE RS 200000/- WILL BE ACCEPTED', fontSize:12,bold:false}]);
    await setTermsAndConitionsTableHeader([{text:'Terms & Conditions Details Overleaf', fontSize:12,bold:false}]);
    await setTermsAndConitionsTableData([{text:'TERMS & CONDITIONS:Model Features:Please refer separate sheet:  No extended warrenty Tourist Taxi', fontSize:12,bold:false}]);
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

  async function setAmount(amount) {
    if (selectedCaseObj['dynamicProperties_amountPaid']) {
      let amountPaid = selectedCaseObj['dynamicProperties_amountPaid'] + amount;
      setAmountPaid(amountPaid);
    } else if (selectedCaseObj['dynamicProperties_bookingAmountPaid']) {
      let amountPaid = selectedCaseObj['dynamicProperties_bookingAmountPaid'] + amount;
      setAmountPaid(amountPaid);
    }
  }
  async function verifyOTP(otp) {
    return;
  }
  async function savePayment(e) {
    e.preventDefault();
    let payload = {
      typeOfPayment,
      amountPaid,
      chequeNumber,
      transactionReferenceNumber,
      payeeName,
      payeeBank,
      modeOfPayment,
    };
    let Response = await axios.post(`${CONSTANTS.API_URL}/api/v1/savePayment/${selectedCaseObj.uuid}`,payload);
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
    if (Response.data.triggeredTaskList.length) {
      await setTriggeredUnassignedTaskList(Response.data.triggeredTaskList);
      await toggleOpenAssignUsersTriggeredTask();
    }
  }
  function toggleOpenAssignUsersTriggeredTask() {
    setIsOpenAssignUsersTriggeredTask(!isOpenAssignUsersTriggeredTask)
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
          toastr.info(messageObj.message);
        } else {
          toastr.info(messageObj.message);
        }
      }));
      await toggleOpenAssignUsersTriggeredTask();
    }
  }
  /*
    Modification: Added and implemented whatsapp user and event creation and all users fetch apis
    By: Devang
    Date: 15/5/2022
  */
  async function sendPriceList(e) {
    // User Creation or Updation
    let res = await axios.post(`${CONSTANTS.API_URL}/api/v1/whatsappUser`, {
      "userId": "0004",
      "phoneNumber": "9823099833",
      "countryCode": "+91",
      "traits": {
        "title": "Mr.",
        "name": "Ashish Kothari",
        "email": "ashkothari00@gmail.com"
      },
      // "tags": ["Shankar Sheth Road"]
    });
    if (res) {
      // Event Creation
      let res = await axios.post(`${CONSTANTS.API_URL}/api/v1/whatsappEvent`, {
        userId: "0004",
        event: "welcomeUser",
        traits: {
          "title": "Mr.",
          "name": "Ashish Kothari",
          "dealership": "Kothari Hyundai",
          "branch": "Shankar Sheth Road",
          "docUrl": ""
        }
      });
    }



    // Fetch all records
    // let res = await axios.get(`${CONSTANTS.API_URL}/api/v1/whatsappUsers`);
    // console.log(res)
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
          toastr.info(messageObj.message);
        } else {
          toastr.info(messageObj.message);
        }
      }));
      await toggleOpenAssignUsersTriggeredTask();
    }
  }

  async function inputClicked(e) {
    let textBox = document.getElementById(e.target.id);
    if (textBox) {
      await textBox.focus();
      await textBox.select();
    }
  }

  async function setFormValueInput(e) {
    await setEndorsementObj({ ...endorsementObj, [event.target.name]: event.target.value });
    console.log(endorsementObj.searchQuery, 'endorsementObjendorsementObjendorsementObj');
  }

  async function createEndorsement(e) {
    e.preventDefault();
    let payload = {
      selectedManagerID: endorsementObj.selectedManagerID,
      interactionID: interactionObj.uuid,
    }
    if (endorsementObj.typeOfEndorsement === 'ncbRecoveryRequest') {
      payload.typeOfTask = "ncbRecoveryRequest";
    } else if (endorsementObj.typeOfEndorsement === 'cancellationApproval') {
      payload.typeOfTask = "cancellationApproval";
    } else {
      payload.typeOfEndorsement = endorsementObj.typeOfEndorsement;
    }
    if (endorsementObj.typeOfEndorsement === 'policy') {
      payload.endorsementFileID = endorsementObj.endorsementFileID;
      payload.endorsementRemark = endorsementObj.endorsementRemark;
    } else if (endorsementObj.typeOfEndorsement === 'ncbCertificate') {
      payload.isNoClaimBonus = endorsementObj.isNoClaimBonus;
      payload.ncbCertificateID = endorsementObj.ncbCertificateID;
      payload.ncbPercentage = endorsementObj.ncbPercentage;
    } else if (endorsementObj.typeOfEndorsement === 'ncbRecoveryRequest') {
      payload.reasonForNCBRecovery = endorsementObj.reasonForNCBRecovery;
      payload.recoveryAmount = endorsementObj.recoveryAmount;
      payload.ncbPercentage = endorsementObj.ncbPercentage;
    } else if (endorsementObj.typeOfEndorsement === 'cancellationApproval') {
      payload.cancellationReason = endorsementObj.cancellationReason;
      if (endorsementObj.cancellationReason === 'Other') {
        payload.otherCancellationReason = endorsementObj.otherCancellationReason;
      }
    }
    console.log(payload, 'payloadpayloadpayload');
    let Response = await axios.put(`${CONSTANTS.API_URL}/api/v1/createEndorsement`, payload);
    if (Response.data.messageResponses && Response.data.messageResponses.length) {
      toastr.info(Response.data.messageResponses[0].message);
      await setEndorsementObj({
        searchQuery: '',
        endorsementFileID: '',
        endorsementRemark: '',
        ncbCertificateID: '',
        isNoClaimBonus: '',
        typeOfEndorsement: endorsementObj.typeOfEndorsement,
        selectedManagerID: '',
        endorsementFileIDSignedURL: '',
        ncbCertificateIDSignedURL: '',
        reasonForNCBRecovery: '',
        recoveryAmount: 0,
        cancellationReason: '',
        otherCancellationReason: '',
        ncbPercentage: 0
      });
      await setInteraction({});
    }
  }

  async function searchCase() {
    let Response = await axios.get(`${CONSTANTS.API_URL}/api/v1/findCase?q=${endorsementObj.searchQuery}`);
    console.log('Well!', Response.data);
    await setInteraction(Response.data[0]);
    await setEndorsementObj({ ...endorsementObj, isNoClaimBonus: Response.data[0]['dynamicProperties_isNoClaimBonus'] ? Response.data[0]['dynamicProperties_isNoClaimBonus'] : '' });
    if (endorsementObj.typeOfEndorsement === 'ncbRecoveryRequest') {
      let designation = 'Insurance Agent';
      let exchangEvaluators = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?designation=${designation}&branchID=${userInfo.userBranchID}`);
      await setExchangeEvaluators(exchangEvaluators.data);
    } else {
      let designation = 'Insurance Team Lead';
      let exchangEvaluators = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?designation=${designation}&branchID=${userInfo.userBranchID}`);
      await setExchangeEvaluators(exchangEvaluators.data);
    }
  }

  function toggleFormPopover(e, type) {
    e.preventDefault();
    setEndorsementObj({
      searchQuery: '',
      endorsementFileID: '',
      endorsementRemark: '',
      ncbCertificateID: '',
      isNoClaimBonus: '',
      typeOfEndorsement: type ? type : '',
      selectedManagerID: '',
      endorsementFileIDSignedURL: '',
      ncbCertificateIDSignedURL: '',
      reasonForNCBRecovery: '',
      recoveryAmount: 0,
      cancellationReason: '',
      otherCancellationReason: '',
      ncbPercentage: 0
    });
    setInteraction({});
    setIsOpenFormPopover(!isOpenFormPopover);
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
            let fileData = await getCompressedImageFile(e.target);
            const fileUpload = await axios.put(fileDetails.signedURL, fileData, opts);

            interactionObj['dynamicProperties_'+fieldName] = fileDetails.uuid;
            await setEndorsementObj({ ...endorsementObj, [fieldName]: fileDetails.uuid, [`${fieldName}SignedURL`]: URL.createObjectURL(e.target.files[0]) });
          } catch (e) {
            console.error(e);
          }
        }
      });
  }

  async function deleteUploadedFile(e, fieldName) {
    console.log("interactionObjinteractionObj",interactionObj);
    interactionObj['dynamicProperties_'+`${fieldName}`] = '';
    await setEndorsementObj({ ...endorsementObj, [fieldName]: '', [`${fieldName}SignedURL`]: '' });
  }

  function viewAllImages(e, fieldName) {
    let options = {
     zIndex:99999,
     rotatable:false,
     scalable:false
    }
    const gallery = new Viewer(document.getElementById(`image-${fieldName}`),options);
    gallery.show();
  }

  return (
    <div class="mainBodyContainerworkspace" style="overflow: hidden">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 innerscrollworkspace">
          <div class="Workspacehead">
            <div class="headerworkspacetext">
              <p class="fs-20">Workspace</p>
            </div>
          </div>
          <div class="Profileworkshop" >
            {/*
                modified by Vihang
                modified at 13/05/2022
                modification : mobile class changed to fit profile info in mobile
          */}
            <div class="row col-xs-10 col-sm-7 col-md-6 col-lg-6 p-l-0 text-align-content">
              <div class="p-r-15 p-b-10 fadeMoveRightAnimation pos-relative align-self-center">
                <p class="fs-28"><span>Hi, </span><span class="f-w-400 text-page-header">{userDisplayName.split(" ")[0]}</span></p>
              </div>
              <div class="p-l-15 l-h-16 display-flex flex-direction-column fadeMoveLeftAnimation justify-evenly border-left">
                <p class="fs-20 text-slategrey">Welcome To Crystal Honda!</p>
                <p class="fs-12 text-slategrey">{userBranchName && <p class="fs-12 text-slategrey">{userBranchName} Branch, Pune</p>}</p>
              </div>
            </div>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 p-l-0 p-r-0 text-align-content display-flex">
              {/*<div class="flex-r flip-card-inner">
                <div class="workspace-cards p-15 cursor-pointer" onClick={(e) => sendPriceList(e)}>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#d5352e"><path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" /></svg>
                    <p class="fs-10">Send Price-List</p>
                  </span>
                </div>
              </div>*/}
              {/*<div class="flex-r flip-card-inner" style='width: 100px;'>
                <div style='width: 110px' class="workspace-cards p-15 cursor-pointer"
                  onClick={(e)=> togglePriceListModal()}
                >
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25" height="25" viewBox="0 0 1627.000000 2400.000000" preserveAspectRatio="xMidYMid meet" fill="#d5352e">
                      <g transform="translate(0.000000,2400.000000) scale(0.100000,-0.100000)" fill="#d5352e" stroke="none">
                      <path d="M7335 23949 c-2502 -5 -4827 -10 -5165 -11 l-614 -3 -777 -1150 c-427 -632 -772 -1152 -767 -1154 6 -2 184 2 397 9 845 28 2176 28 2746 1 1359 -65 2271 -206 3080 -476 1030 -344 1734 -891 2165 -1682 39 -70 70 -133 70 -138 0 -8 -39 -10 -117 -8 -65 2 -471 7 -903 13 -432 6 -1091 15 -1465 20 -1856 27 -3452 50 -3915 56 l-515 6 -702 -1179 c-393 -659 -697 -1179 -690 -1180 6 -1 1258 -9 2782 -18 4017 -22 5878 -35 5882 -38 11 -11 -91 -437 -158 -662 -296 -990 -805 -1757 -1524 -2297 -225 -169 -438 -297 -717 -433 -807 -391 -1790 -599 -3108 -655 -591 -25 -1626 -3 -2350 49 -58 4 -108 5 -111 2 -3 -3 -16 -454 -28 -1001 -12 -547 -22 -1031 -24 -1075 l-2 -80 4340 -5432 4340 -5432 1918 0 c1054 -1 1917 0 1917 2 0 2 -1964 2512 -4365 5578 -2401 3066 -4365 5577 -4365 5580 0 3 80 16 178 28 438 57 1002 162 1423 266 2251 558 3952 1638 4932 3130 192 292 368 625 497 940 167 404 313 938 371 1356 l12 87 181 6 c99 3 618 13 1151 22 534 9 1085 19 1225 22 l254 7 698 1080 c384 594 712 1102 729 1129 l31 49 -634 -7 c-348 -4 -1162 -13 -1808 -21 -646 -8 -1310 -15 -1475 -17 l-300 -2 -3 44 c-38 669 -473 1498 -1211 2305 l-83 90 2029 3 2028 2 720 1126 c396 620 724 1132 728 1140 9 16 -1126 16 -8928 3z"/>
                      </g>
                    </svg>
                    <p class="fs-10">Price List</p>
                  </span>
                </div>
              </div>*/}
              <div class="flex-r flip-card-inner">
                <div style='width: 110px' class="workspace-cards p-15 cursor-pointer" onClick={(e) => pullFromDMS(e)}>
                  <span>
                    {/*<p class="fs-20 p-b-10 f-w-500 text-page-header">12</p>*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 21 21" fill="#d5352e"><g fill="#d5352e" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path stroke="#d5352e" fill="#d5352e" d="m3.5 10.5 4 4 4-4"/><path stroke="#d5352e" fill="#d5352e" d="m7.5 3.5v11"/><path stroke="#d5352e" fill="#d5352e" d="m.5.5h14"/></g></svg>
                    <p class="fs-10">Pull from DMS</p>
                  </span>
                </div>
              </div>
              <div class="flex-r flip-card-inner">
                <div style='width: 110px' class="workspace-cards p-15 cursor-pointer" onClick={(e) => toggleFormPopover(e, 'policy')}>
                  <span>
                    {/*<p class="fs-20 p-b-10 f-w-500 text-page-header">12</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 21 21" fill="#d5352e"><g fill="#d5352e" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path stroke="#d5352e" fill="#d5352e" d="m3.5 10.5 4 4 4-4"/><path stroke="#d5352e" fill="#d5352e" d="m7.5 3.5v11"/><path stroke="#d5352e" fill="#d5352e" d="m.5.5h14"/></g></svg>*/}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#d5352e" viewBox="0 0 32 32" width="30px" height="30px"><path d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z"/></svg>
                    <p class="fs-10">Endorsement</p>
                  </span>
                </div>
              </div>
              <div class="flex-r flip-card-inner">
                <div style='width: 110px' class="workspace-cards p-15 cursor-pointer" onClick={(e) => toggleFormPopover(e, 'ncbCertificate')}>
                  <span>
                    {/*<p class="fs-20 p-b-10 f-w-500 text-page-header">12</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 21 21" fill="#d5352e"><g fill="#d5352e" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path stroke="#d5352e" fill="#d5352e" d="m3.5 10.5 4 4 4-4"/><path stroke="#d5352e" fill="#d5352e" d="m7.5 3.5v11"/><path stroke="#d5352e" fill="#d5352e" d="m.5.5h14"/></g></svg>*/}
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" fill="#d5352e" preserveAspectRatio="xMidYMid meet">
                      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#d5352e" stroke="none">
                        <path d="M2475 4623 c-418 -25 -835 -188 -1165 -455 -132 -106 -207 -178 -294 -282 -203 -239 -353 -540 -421 -841 l-22 -100 -251 -5 -252 -5 -32 -33 c-28 -27 -33 -40 -33 -80 0 -45 10 -62 290 -465 188 -273 299 -424 317 -433 31 -16 66 -18 102 -5 30 12 41 26 359 490 276 402 279 406 240 472 -32 53 -60 59 -288 59 l-208 0 7 38 c30 188 149 454 293 654 352 489 1011 803 1573 749 496 -47 908 -270 1286 -695 l62 -69 53 5 c70 7 109 47 109 111 0 50 -10 67 -117 188 -292 335 -721 582 -1158 668 -99 20 -313 42 -370 39 -16 -1 -52 -3 -80 -5z"/>
                        <path d="M2039 3297 c-48 -32 -67 -89 -46 -139 28 -67 47 -72 262 -78 180 -5 193 -6 240 -31 28 -14 64 -44 84 -70 l34 -44 -275 -5 c-307 -6 -315 -7 -345 -78 -21 -50 -2 -107 46 -139 33 -23 39 -23 302 -23 148 0 269 -3 269 -6 0 -18 -68 -88 -108 -112 -46 -26 -52 -27 -242 -32 -207 -5 -221 -9 -257 -59 -20 -29 -19 -93 2 -127 31 -49 681 -658 719 -673 85 -33 171 47 151 139 -5 23 -65 86 -241 253 l-233 221 67 14 c166 34 324 170 377 327 l19 53 104 4 c103 3 104 3 133 35 37 42 45 75 28 120 -24 62 -56 78 -169 81 l-99 4 -12 36 c-6 21 -20 54 -31 75 l-18 37 122 0 c105 0 128 3 156 20 69 42 79 130 21 186 l-30 29 -498 3 -497 3 -35 -24z"/>
                        <path d="M4393 3195 c-12 -8 -151 -202 -308 -431 -314 -454 -316 -460 -273 -524 39 -57 51 -60 284 -60 l211 0 -14 -60 c-121 -526 -484 -967 -995 -1209 -479 -227 -948 -236 -1428 -26 -268 117 -488 283 -720 543 -59 65 -68 72 -103 72 -80 0 -134 -57 -124 -132 13 -96 319 -394 567 -553 231 -148 526 -259 798 -301 140 -21 392 -21 532 0 817 125 1504 739 1691 1512 17 71 33 135 35 142 3 9 60 12 245 12 209 0 245 2 270 17 37 22 63 76 56 118 -6 35 -538 821 -588 868 -34 31 -100 37 -136 12z"/>
                      </g>
                    </svg>
                    <p class="fs-10">New NCB</p>
                  </span>
                </div>
              </div>
              {
                userDesignation.toLowerCase() === "insurance team lead" &&
                  <div class="flex-r flip-card-inner">
                    <div style='width: 110px' class="workspace-cards p-15 cursor-pointer" onClick={(e) => toggleFormPopover(e, 'ncbRecoveryRequest')}>
                      <span>
                        {/*<p class="fs-20 p-b-10 f-w-500 text-page-header">12</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 21 21" fill="#d5352e"><g fill="#d5352e" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path stroke="#d5352e" fill="#d5352e" d="m3.5 10.5 4 4 4-4"/><path stroke="#d5352e" fill="#d5352e" d="m7.5 3.5v11"/><path stroke="#d5352e" fill="#d5352e" d="m.5.5h14"/></g></svg>*/}
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 64.000000 64.000000" fill="#d5352e" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#d5352e" stroke="none">
                            <path d="M216 604 c-71 -22 -159 -112 -180 -184 -34 -115 -12 -206 73 -291 85 -85 176 -107 291 -73 75 22 162 109 184 184 34 115 12 206 -73 291 -85 84 -180 108 -295 73z m226 -41 c92 -51 146 -155 135 -261 -15 -145 -149 -254 -295 -239 -145 15 -254 149 -239 295 11 102 92 201 191 232 57 17 150 5 208 -27z"/>
                            <path d="M215 536 c-27 -13 -60 -34 -72 -47 -34 -37 -63 -110 -63 -159 0 -65 56 -178 77 -156 4 3 -2 15 -11 25 -23 25 -45 87 -46 126 -1 118 97 215 218 215 17 0 32 5 32 10 0 19 -85 10 -135 -14z"/>
                            <path d="M380 540 c0 -12 28 -25 36 -17 3 3 -4 10 -15 17 -15 7 -21 7 -21 0z"/>
                            <path d="M440 504 c0 -4 13 -21 29 -40 63 -71 65 -198 5 -265 -9 -10 -15 -22 -11 -25 21 -22 77 91 77 156 0 49 -29 122 -62 158 -21 21 -38 29 -38 16z"/>
                            <path d="M230 430 c0 -5 15 -10 34 -10 38 0 66 -21 66 -50 0 -26 -27 -50 -56 -50 -13 0 -24 -3 -24 -6 0 -10 84 -114 92 -114 14 0 8 13 -28 56 -25 31 -31 44 -20 44 8 0 25 14 38 30 12 17 30 30 40 30 10 0 18 5 18 10 0 6 -8 10 -18 10 -9 0 -23 9 -30 20 -11 18 -10 20 18 20 16 0 30 5 30 10 0 6 -33 10 -80 10 -47 0 -80 -4 -80 -10z"/>
                            <path d="M230 370 c0 -5 18 -10 40 -10 22 0 40 5 40 10 0 6 -18 10 -40 10 -22 0 -40 -4 -40 -10z"/>
                            <path d="M201 156 c-8 -9 -11 -19 -7 -23 9 -9 29 13 24 27 -2 8 -8 7 -17 -4z"/>
                            <path d="M400 158 c0 -18 18 -34 28 -24 3 4 -2 14 -11 23 -16 16 -17 16 -17 1z"/>
                            <path d="M250 124 c0 -8 5 -12 10 -9 6 3 10 10 10 16 0 5 -4 9 -10 9 -5 0 -10 -7 -10 -16z"/>
                            <path d="M300 120 c0 -11 5 -20 10 -20 6 0 10 9 10 20 0 11 -4 20 -10 20 -5 0 -10 -9 -10 -20z"/>
                            <path d="M350 131 c0 -6 5 -13 10 -16 6 -3 10 1 10 9 0 9 -4 16 -10 16 -5 0 -10 -4 -10 -9z"/>
                          </g>
                        </svg>
                        <p class="fs-10">NCB Recovery</p>
                      </span>
                    </div>
                  </div>
              }
              {
                (userDesignation.toLowerCase() === "insurance agent" || userDesignation.toLowerCase() === "accounts executive" || userDesignation.toLowerCase() === "insurance team lead") &&
                  <div class="flex-r flip-card-inner">
                    <div style='width: 110px' class="workspace-cards p-15 cursor-pointer" onClick={(e) => toggleFormPopover(e, 'cancellationApproval')}>
                      <span>
                        {/*<p class="fs-20 p-b-10 f-w-500 text-page-header">12</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 21 21" fill="#d5352e"><g fill="#d5352e" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path stroke="#d5352e" fill="#d5352e" d="m3.5 10.5 4 4 4-4"/><path stroke="#d5352e" fill="#d5352e" d="m7.5 3.5v11"/><path stroke="#d5352e" fill="#d5352e" d="m.5.5h14"/></g></svg>*/}
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" fill="#d5352e" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#d5352e" stroke="none">
                            <path d="M695 5030 c-51 -20 -50 1 -53 -654 l-3 -611 81 -80 80 -80 0 638 0 637 1240 0 1239 0 3 -495 3 -494 23 -23 23 -23 494 -3 495 -3 0 -1799 0 -1800 -77 0 -78 0 80 -80 c67 -68 85 -80 113 -80 54 0 98 24 111 60 8 24 11 536 11 1912 0 1613 -2 1883 -14 1906 -18 33 -1042 1055 -1073 1071 -26 13 -2666 15 -2698 1z m3130 -650 l380 -380 -383 0 -382 0 0 380 c0 209 1 380 3 380 1 0 173 -171 382 -380z"/>
                            <path d="M2315 3810 c-396 -80 -716 -328 -896 -692 l-43 -88 54 -55 c30 -30 57 -55 61 -55 4 0 10 12 14 27 3 15 24 62 46 106 148 297 405 508 726 594 89 25 115 27 283 27 172 1 192 -1 284 -27 319 -89 574 -296 721 -587 50 -101 88 -216 105 -322 18 -111 8 -351 -18 -450 -63 -233 -195 -446 -366 -588 -87 -72 -220 -152 -301 -182 -36 -12 -65 -25 -65 -28 0 -3 25 -30 55 -60 l54 -53 66 28 c36 15 112 58 169 96 289 191 490 496 552 838 21 115 20 331 -1 446 -71 396 -329 738 -693 920 -95 47 -232 91 -340 110 -119 21 -352 18 -467 -5z"/>
                            <path d="M2059 3061 c-25 -26 -30 -37 -24 -59 4 -17 82 -103 213 -234 l207 -208 -153 -153 -152 -152 52 -53 53 -52 152 152 153 153 213 -213 c152 -151 220 -212 236 -212 29 0 81 52 81 81 0 16 -61 84 -212 236 l-213 213 207 208 c131 131 209 217 213 234 6 22 1 33 -23 58 -17 16 -41 30 -53 30 -16 0 -84 -61 -236 -212 l-213 -213 -208 207 c-131 131 -217 209 -234 213 -22 6 -33 1 -59 -24z"/>
                          </g>
                        </svg>
                        <p class="fs-10">Cancellation</p>
                      </span>
                    </div>
                  </div>
              }
              {
                userDesignation === "SALES CONSULTANT" && (
                  <div class="flex-r flip-card-inner">
                    <div style='width: 110px' class="workspace-cards p-15 cursor-pointer"
                    //onClick={(e) => route('/commandcenter')}
                    >
                      <span>
                        <p class="fs-20 p-b-10 f-w-500 text-page-header">12</p>
                        <p class="fs-10">Attended Enquiries</p>
                      </span>
                    </div>
                  </div>
                )
              }
              {
                userDesignation === "SALES CONSULTANT" && (
                  <div class="flex-r flip-card-inner">
                    <div style='width: 110px' class="workspace-cards p-15 cursor-pointer"
                    //onClick={(e) => route('/commandcenter')}
                    >
                      <span>
                        <p class="fs-20 p-b-10 f-w-500 text-page-header">05</p>
                        <p class="fs-10">Unattended Enquiries</p>
                      </span>
                    </div>
                  </div>
                )
              }
              {/*
                userDesignation === "SALES CONSULTANT" && (
                  <div class="flex-r flip-card-inner">
                    <div style='width: 110px' class="workspace-cards p-15 cursor-pointer" onClick={(e) => toggleNewFollowupModal(e)}>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#d5352e"><path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" /></svg>
                        <p class="fs-10">New Followup</p>
                      </span>
                    </div>
                  </div>
                )
              */}
              {
                userDesignation === "SALES CONSULTANT" && (
                  <div class="flex-r flip-card-inner">
                    <div style='width: 110px' class="workspace-cards p-15 cursor-pointer" onClick={(e) => toggleReceivePaymentModal(e)}>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#d5352e"><path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" /></svg>
                        <p class="fs-10">Receive Payment</p>
                      </span>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          {
            userDesignation === "RECEPTIONIST" && (
              <ReceptionistWorkspace triggerNotifications={e => triggerNotifications(e)}/>
            )
          }
          {
            userDesignation === "SALES CONSULTANT" && (
              <SalesWorkspace triggerNotifications={e => triggerNotifications(e)}/>
            )
          }
          {
            userDesignation === "TEAM LEADER" && (
              <Teamsworkspace triggerNotifications={e => triggerNotifications(e)}/>
            )
          }
          {
            userDesignation === "Finance Executive" && (
              <SalesWorkspace triggerNotifications={e => triggerNotifications(e)}/>
            )
          }
          {
            userDesignation === "Accessories Executive" && (
              <SalesWorkspace triggerNotifications={e => triggerNotifications(e)}/>
            )
          }
          {
            userDesignation === "Assistant Sales Manager" && (
              <SalesWorkspace triggerNotifications={e => triggerNotifications(e)}/>
            )
          }
          {
            userDesignation === "Sales Manager" && (
              <SalesWorkspace triggerNotifications={e => triggerNotifications(e)}/>
            )
          }
          {
            userDesignation === "Branch Manager" && (
              <SalesWorkspace triggerNotifications={e => triggerNotifications(e)}/>
            )
          }
        </div>
        <div class="col-xs-0 col-sm-0 col-md-3 col-lg-2 right-info-panel-container" style="width:100%; padding: 0" >
          <RightInfoPanel newNotification={newNotification}/>
        </div>
      </div>
      {
        isFollowUpModalOpen && (
          <div class='orgChartModal'>
            <div id="modelCaseModal" style="display:block;" class="org-chart-modal">
              <div class="org-chart-modal-content org-chart-width">
                <div>
                  <div class="org-chart-modal-header">
                    <span class="org-chart-close" onClick={(e) => toggleNewFollowupModal(e)}>&times;</span>
                  </div>
                  <div class="org-chart-modal-body background-transparent">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        {
                          (selectedCaseObj && selectedCaseObj.uuid) && (
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 justify-center">
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Customer Name: </label><a class="form-group w-full fs-1-25rem m-b-15 first-letter-capital">{selectedCaseObj["dynamicProperties_customerName"]}</a>
                                </div>
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Source: </label><a class="form-group w-full fs-1-25rem m-b-15 ">{selectedCaseObj["dynamicProperties_source"]}</a>
                                </div>
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Model: </label><a class="form-group w-full fs-1-25rem m-b-15 ">{selectedCaseObj["modelName"] ? modelMapping[selectedCaseObj["modelName"]]: "--"}</a>
                                </div>
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Variant: </label><a class="form-group w-full fs-1-25rem m-b-15 ">{selectedCaseObj["variantName"] ? selectedCaseObj["variantName"]: "--"}</a>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        {
                          (selectedCaseObj && !selectedCaseObj.uuid) && (
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                                <p>Please select a case to add follow-up</p>
                              </div>
                            </div>
                          )
                        }
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-t-5 display-flex justify-center flex-column">
                        <div class="m-b-10">
                          <div class="p-b-10" >
                            <p> Select Case <span class="star-mandatory-entry p-l-2">*</span></p>
                            <select class="p-l-r-0-2rem text-4b4d51 fs-1rem h-2rem text-4b4d51 background-white border-none" type="text"  name="case" value={selectedCase} onChange={async (e) => {
                              // await setSelectedCase(e.target.value);
                              await setCase(e.target.value);
                            }} style="text-shadow:none">
                              <option value=''>Select Case</option>
                              {
                                cases.map(caseObj => (
                                  <option value={caseObj.uuid}>{caseObj.caseID}</option>
                                ))
                              }
                            </select>
                          </div>
                          {
                            selectedCase && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>Follow-up Date <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <input type="date" value={followupDate} onChange={e => setFollowupDate(e.target.value)} />
                                </div>
                              </div>
                            )
                          }
                          {
                            selectedCase && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>Type of Follow-up <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <select class="p-l-r-0-2rem text-4b4d51 fs-1rem h-2rem text-4b4d51 background-white border-none" type="text"  name="case" value={typeofFollowup} onChange={(e) => setTypeofFollowup(e.target.value)} style="text-shadow:none">
                                    <option value=''>Select Type of Follow-up</option>
                                    <option value='Call'>Call</option>
                                    <option value='Whatsapp'>Whatsapp</option>
                                    <option value='Home Visit'>Home Visit</option>
                                    <option value='Showroom Visit'>Showroom Visit</option>
                                  </select>
                                </div>
                              </div>
                            )
                          }
                          {
                            (selectedCase && typeofFollowup === "Call") && (
                              <div class="p-b-10">
                                {
                                  !isCallOriginated && (
                                    <button class="primary-button m-t-20 m-b-20" onClick={e => originateCall(e)}>Call</button>
                                  )
                                }
                                {
                                  (isCallOriginated && !isFollowupDone) && (
                                    <button class="primary-button m-t-20 m-b-20" onClick={e => setIsFollowupDone(true)}>End Call</button>
                                  )
                                }
                              </div>
                            )
                          }
                          {
                            (selectedCase && typeofFollowup === "Whatsapp") && (
                              <div class="p-b-10">
                                <button class="primary-button m-t-20 m-b-20" onClick={e => setIsFollowupDone(true)}>Send Whatsapp Message</button>
                              </div>
                            )
                          }
                          {
                            (selectedCase && typeofFollowup === "Whatsapp" && isFollowupDone) && (
                              <div class="p-b-10">
                                <p>Please update the following details regarding follow-up</p>
                              </div>
                            )
                          }
                          {
                            selectedCase && isFollowupDone && (
                              <div class="p-b-10" >
                                <p> Remark Category <span class="star-mandatory-entry p-l-2">*</span></p>
                                <select class="p-l-r-0-2rem text-4b4d51 fs-1rem h-2rem text-4b4d51 background-white border-none" type="text"  name="category" value={selectedRemarkCatagory} onChange={(e) => setSelectedRemarkCategory(e.target.value)} style="text-shadow:none">
                                  <option value='' selected>Select Remark Category</option>
                                  <option value="1st Remark">1st Remark</option>
                                  <option value="Planning">Planning</option>
                                  <option value="Payment Confirmation">Payment Confirmation</option>
                                  <option value="Test Drive">Test Drive</option>
                                  <option value="Home Visit">Home Visit</option>
                                  <option value="Lost">Lost</option>
                                  <option value="Drop">Drop</option>
                                </select>
                              </div>
                            )
                          }
                          {
                            selectedCase && isFollowupDone && (
                              <div class="p-b-10" >
                                <p> Remark <span class="star-mandatory-entry p-l-2">*</span></p>
                                <input type="text" value={remark} onInput={e => setRemark(e.target.value)} placeholder="Enter Remark" />
                              </div>
                            )
                          }
                          <div class="p-b-10">
                            <button disabled={!selectedRemarkCatagory && !remark} class="primary-button m-l-10">Save</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        isReceivePaymentModalOpen && (
          <div class='orgChartModal'>
            <div id="modelCaseModal" style="display:block;" class="org-chart-modal">
              <div class="org-chart-modal-content org-chart-width">
                <div>
                  <div class="org-chart-modal-header">
                    <span class="org-chart-close" onClick={(e) => toggleReceivePaymentModal(e)}>&times;</span>
                  </div>
                  <div class="org-chart-modal-body background-transparent" style="height:80vh; overflow:auto">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        {
                          (selectedCaseObj && selectedCaseObj.uuid) && (
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 justify-center">
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Customer Name: </label><a class="form-group w-full fs-1-25rem m-b-15 first-letter-capital">{selectedCaseObj["dynamicProperties_customerName"]}</a>
                                </div>
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Source: </label><a class="form-group w-full fs-1-25rem m-b-15 ">{selectedCaseObj["dynamicProperties_source"]}</a>
                                </div>
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Model: </label><a class="form-group w-full fs-1-25rem m-b-15 ">{selectedCaseObj["dynamicProperties_selectedModelName"] ? modelMapping[selectedCaseObj["dynamicProperties_selectedModelName"]]: "--"}</a>
                                </div>
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Variant: </label><a class="form-group w-full fs-1-25rem m-b-15 ">{selectedCaseObj["dynamicProperties_selectedVariantName"] ? selectedCaseObj["dynamicProperties_selectedVariantName"]: "--"}</a>
                                </div>
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Amount Paid: </label><a class="form-group w-full fs-1-25rem m-b-15 ">{selectedCaseObj["dynamicProperties_typeOfPayment"] === "Full Booking Amount" ? getFormattedAmount(selectedCaseObj["dynamicProperties_amountPaid"]) : selectedCaseObj["dynamicProperties_bookingAmountPaid"] ? getFormattedAmount(selectedCaseObj['dynamicProperties_bookingAmountPaid']) : "--"}</a>
                                </div>
                                <div class="form-flex flex-direction-column align-baseline">
                                  <label class="form-group w-full m-b-0" style="height: fit-content;">Balance Amount: </label><a class="form-group w-full fs-1-25rem m-b-15 ">{selectedCaseObj["dynamicProperties_typeOfPayment"] === "Partial Booking Amount" ? getFormattedAmount(selectedCaseObj["dynamicProperties_balanceBookingAmount"]): selectedCaseObj["dynamicProperties_balanceAmount"] ? getFormattedAmount(selectedCaseObj['dynamicProperties_balanceAmount']) : "--"}</a>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        {
                          (selectedCaseObj && !selectedCaseObj.uuid) && (
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                                <p>Please select a case to receive payment</p>
                              </div>
                            </div>
                          )
                        }
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-t-5 display-flex justify-center flex-column">
                        <div class="m-b-10">
                          <div class="p-b-10" >
                            <p> Select Case <span class="star-mandatory-entry p-l-2">*</span></p>
                            <select class="p-l-r-0-2rem text-4b4d51 fs-1rem h-2rem text-4b4d51 background-white border-none" type="text"  name="case" value={selectedCase} onChange={async (e) => {
                              // await setSelectedCase(e.target.value);
                              await setCase(e.target.value);
                            }} style="text-shadow:none">
                              <option value=''>Select Case</option>
                              {
                                cases.map(caseObj => (
                                  <option value={caseObj.uuid}>{caseObj.caseID}</option>
                                ))
                              }
                            </select>
                          </div>
                          {
                            selectedCase && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>Type of Payment <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <select class="p-l-r-0-2rem text-4b4d51 fs-1rem h-2rem text-4b4d51 background-white border-none" type="text"  name="case" value={typeOfPayment} onChange={async (e) => {
                                    // await setSelectedCase(e.target.value);
                                    await setTypeOfPayment(e.target.value);
                                  }} style="text-shadow:none">
                                    <option value=''>Select Type of Payment</option>
                                    {
                                      typeOfPayments.map(typeOfPayment => (
                                        <option value={typeOfPayment}>{typeOfPayment}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                            )
                          }
                          {
                            typeOfPayment && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>Amount <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <input type="number" value={amountPaid} onInput={(e) => setAmountPaid(e.target.value)} onFocusout={(e) => setAmount(e.target.value)} />
                                </div>
                              </div>
                            )
                          }
                          {
                            typeOfPayment && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>Mode of Payment <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <select class="p-l-r-0-2rem text-4b4d51 fs-1rem h-2rem text-4b4d51 background-white border-none" type="text"  name="modeOfPayment" value={modeOfPayment} onChange={async (e) => {
                                    // await setSelectedCase(e.target.value);
                                    await setModeOfPayment(e.target.value);
                                  }} style="text-shadow:none">
                                  <option value=''>Select Mode of Payment</option>
                                  <option selected={modeOfPayment === "Cash"} value='Cash'>Cash</option>
                                  <option selected={modeOfPayment === "Cheque"} value='Cheque'>Cheque</option>
                                  <option selected={modeOfPayment === "Digital"} value='Digital'>Digital</option>

                                  </select>
                                </div>
                              </div>
                            )
                          }
                          {
                            modeOfPayment === "Cash" && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>OTP <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <input type="number" value={otp} onInput={(e) => setOTP(e.target.value)} onFocusout={(e) => verifyOTP(e.target.value)} />
                                </div>
                              </div>
                            )
                          }
                          {
                            modeOfPayment === "Cheque" && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>Cheque Number <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <input type="number" value={chequeNumber} onInput={(e) => setChequeNumber(e.target.value)} />
                                </div>
                              </div>
                            )
                          }
                          {
                            modeOfPayment === "Digital" && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>Transaction Reference Number <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <input type="number" value={transactionReferenceNumber} onInput={(e) => setTransactionReferenceNumber(e.target.value)} />
                                </div>
                              </div>
                            )
                          }
                          {
                            modeOfPayment && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>Payee Name <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <input type="text" value={payeeName} onInput={(e) => setPayeeName(e.target.value)} />
                                </div>
                              </div>
                            )
                          }{
                            modeOfPayment && (
                              <div class="m-b-10">
                                <div class="p-b-10" >
                                  <p>Payee Bank <span class="star-mandatory-entry p-l-2">*</span></p>
                                  <input type="text" value={payeeBank} onInput={(e) => setPayeeBank(e.target.value)} />
                                </div>
                              </div>
                            )
                          }
                          <div class="p-b-10">
                            <button disabled={!typeOfPayment && !modeOfPayment && !amountPaid} class="primary-button m-l-10" onClick={(e) => savePayment(e)} >Save</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {isOpenFormPopover &&
        <NewPopupModal classes="formModal" modalWidth={"65%"} modalDisplay={('show-formPopover')} onClose={(e) => toggleFormPopover(e)}>
          <div class="enquiryForm background-transparent">
            <div class="row p-t-10 p-l-30 p-r-30 p-b-10" style="background:#f7f7f7;border-bottom:1px solid lightgrey">
              <div class="col-xs-8">
                <span class="formHeader display-flex">
                  <h4 class="m-t-5 m-b-0">{endorsementObj.typeOfEndorsement === 'policy' ? 'New Policy Endorsement' : endorsementObj.typeOfEndorsement === 'ncbCertificate' ? 'New No Claim Bonus' : endorsementObj.typeOfEndorsement === 'cancellationApproval' ? 'Policy Cancellation' : 'New NCB Recovery Request'}</h4>
                </span>
              </div>
              <div class="col-xs-4 display-flex justify-flex-end align-center p-r-2">
                <button onClick={(e) => createEndorsement(e)} class="primary-button m-l-10"
                  disabled={(endorsementObj.typeOfEndorsement === 'policy' && (!endorsementObj.endorsementFileID || !endorsementObj.endorsementRemark || !endorsementObj.selectedManagerID) ||
                    (endorsementObj.typeOfEndorsement === 'ncbCertificate' && (!endorsementObj.ncbPercentage || !endorsementObj.ncbCertificateID || endorsementObj.isNoClaimBonus === "no" || !endorsementObj.selectedManagerID)) ||
                      (endorsementObj.typeOfEndorsement === 'ncbRecoveryRequest' && (!endorsementObj.ncbPercentage || !endorsementObj.reasonForNCBRecovery || !endorsementObj.recoveryAmount || !endorsementObj.selectedManagerID)) ||
                        (endorsementObj.typeOfEndorsement === 'cancellationApproval' && (!endorsementObj.cancellationReason || (endorsementObj.cancellationReason && endorsementObj.cancellationReason === 'Other' && !endorsementObj.otherCancellationReason) || !endorsementObj.selectedManagerID)))}>
                  {(endorsementObj.typeOfEndorsement === 'ncbRecoveryRequest') ? 'Create Recovery Request' : (endorsementObj.typeOfEndorsement === 'cancellationApproval') ? 'Cancel Policy' : 'Create Endorsement'}
                </button>
              </div>
            </div>
            <div id="formModalContainer" class="formModalContainer">
              {(!interactionObj || !interactionObj.dynamicProperties_customerName) ?
                <div class="w-full display-flex">
                  <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 m-t-15">
                    <p class="formLabel fs-15 p-b-3">Search VIN / Mobile No. / Policy No.
                      <span class="star-mandatory-entry p-l-2">*</span>
                    </p>
                    <input class="first-letter-capital"
                      onClick={(e) => inputClicked(e)}
                      name="searchQuery"
                      id="searchQuery"
                      type="text"
                      value={endorsementObj.searchQuery}
                      required="true"
                      onInput={(e) => setFormValueInput(e)}
                    />
                    {/*<span id={`error-`+dynamicProp.name} class="text-color-red fs-10" style="display:none;">Please enter {dynamicProp.displayName}</span>*/}
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 m-t-15" style="align-self: center">
                    <button onClick={(e) => searchCase(e)} class="primary-button m-l-10" disabled={!endorsementObj.searchQuery}>Search Insurance Case</button>
                  </div>
                </div>
                :
                <div class="w-full">
                  <div class="display-flex">
                    <div class="col-xs-12 col-sm-6">
                      <ListSingleCard interactionObj={interactionObj} typeOfCard={'customerDetails'} caseIcon={<img src="/assets/images/folder.png" class="h-full w-full" />} />
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <ListSingleCard interactionObj={interactionObj} typeOfCard={'policyDetails'} caseIcon={<img src="/assets/images/folder.png" class="h-full w-full" />} />
                    </div>
                  </div>
                  {endorsementObj.typeOfEndorsement === 'policy' &&
                    <div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                        <p class="formLabel fs-15 p-b-3">Enter Remark
                          <span class="star-mandatory-entry p-l-2">*</span>
                        </p>
                        <input class="first-letter-capital"
                          onClick={(e) => inputClicked(e)}
                          name="endorsementRemark"
                          id="endorsementRemark"
                          type="text"
                          value={endorsementObj.endorsementRemark}
                          required="true"
                          onInput={(e) => setFormValueInput(e)}
                        />
                        {/*<span class="text-color-red fs-10" style={`display: ${endorsementObj.endorsementRemark ? "none;" : "block"}`}>Please enter Remark</span>*/}
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                        <p class="formLabel fs-15 p-b-3">Upload Invoice / Policy Document
                          <span class="star-mandatory-entry p-l-2">*</span>
                        </p>
                        {
                          (interactionObj && interactionObj['dynamicProperties_endorsementFileID']) ? (
                            <div class="uploaded-image">
                              <img id={`image-endorsementFileID`} class="cursor-pointer object-fit-contain w-half" src={endorsementObj.endorsementFileIDSignedURL} width="100" height="100" onClick={(e)=> viewAllImages(e, "endorsementFileID")}/>
                              <p class="delete-file-icon" title="Delete file" onClick={(e) => deleteUploadedFile(e, "endorsementFileID")}>{'x'}</p>
                            </div>
                          ) : (
                            <input class="first-letter-capital"
                              required="true"
                              name="endorsementFileID"
                              id="endorsementFileID"
                              type="file"
                              onChange={(e) => uploadFile(e, "endorsementFileID")}
                            />
                          )
                        }
                        {/*<span class="text-color-red fs-10" style={`display: ${endorsementObj.endorsementFileID ? "none;" : "block"}`}>Please Upload Invoice / Policy Document</span>*/}
                      </div>
                    </div>
                  }
                  {endorsementObj.typeOfEndorsement === 'ncbCertificate' &&
                    <div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                        <p class="formLabel fs-15 p-b-3">Is No Claim Bonus?
                          <span class="star-mandatory-entry p-l-2">*</span>
                        </p>
                        <div class="display-flex formRadioButtons">
                          <div class="display-flex p-r-10 align-center">
                            <input required="true" name="isNoClaimBonus" id={`isNoClaimBonus-yes`} type="radio" checked={endorsementObj.isNoClaimBonus === "yes" ? true : false} value="yes" onChange={(e) => setFormValueInput(e, "isNoClaimBonus")} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`isNoClaimBonus-yes`}>Yes</label>
                            <input required="true" name="isNoClaimBonus" id={`isNoClaimBonus-no`} type="radio" checked={endorsementObj.isNoClaimBonus === "no" ? true : false} value="no" onChange={(e) => setFormValueInput(e, "isNoClaimBonus")} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`isNoClaimBonus-no`}>No </label>
                          </div>
                        </div>
                        {/*<span class="text-color-red fs-10" style={`display: ${endorsementObj.isNoClaimBonus ? "none;" : "block"}`}>Please select No Claim Bonus</span>*/}
                      </div>
                      {endorsementObj.isNoClaimBonus === "yes" &&
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                          <p class="formLabel fs-15 p-b-3">Upload NCB Certificate
                            <span class="star-mandatory-entry p-l-2">*</span>
                          </p>
                          {
                            (interactionObj && interactionObj['dynamicProperties_ncbCertificateID']) ? (
                              <div class="uploaded-image">
                                <img id={`image-ncbCertificateID`} class="cursor-pointer object-fit-contain w-half" src={endorsementObj.ncbCertificateIDSignedURL} width="100" height="100" onClick={(e)=> viewAllImages(e, "ncbCertificateID")}/>
                                <p class="delete-file-icon" title="Delete file" onClick={(e) => deleteUploadedFile(e, "ncbCertificateID")}>{'x'}</p>
                              </div>
                            ) : (
                              <input class="first-letter-capital"
                                required="true"
                                name="ncbCertificateID"
                                id="ncbCertificateID"
                                type="file"
                                onChange={(e) => uploadFile(e, "ncbCertificateID")}
                              />
                            )
                          }
                          {/*<span class="text-color-red fs-10" style={`display: ${endorsementObj.endorsementFileID ? "none;" : "block"}`}>Please Upload Invoice / Policy Document</span>*/}
                        </div>
                      }
                      {endorsementObj.isNoClaimBonus === "yes" &&
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                          <p class="formLabel fs-15 p-b-3">Enter NCB Percentage
                            <span class="star-mandatory-entry p-l-2">*</span>
                          </p>
                          <input class="first-letter-capital"
                            onClick={(e) => inputClicked(e)}
                            name="ncbPercentage"
                            id="ncbPercentage"
                            type="number"
                            value={endorsementObj.ncbPercentage}
                            required="true"
                            onInput={(e) => setFormValueInput(e)}
                          />
                          {/*<span class="text-color-red fs-10" style={`display: ${endorsementObj.endorsementFileID ? "none;" : "block"}`}>Please Upload Invoice / Policy Document</span>*/}
                        </div>
                      }
                    </div>
                  }
                  {endorsementObj.typeOfEndorsement === 'ncbRecoveryRequest' &&
                    <div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                        <p class="formLabel fs-15 p-b-3">Enter Reason for Recovery
                          <span class="star-mandatory-entry p-l-2">*</span>
                        </p>
                        <input class="first-letter-capital"
                          onClick={(e) => inputClicked(e)}
                          name="reasonForNCBRecovery"
                          id="reasonForNCBRecovery"
                          type="text"
                          value={endorsementObj.reasonForNCBRecovery}
                          required="true"
                          onInput={(e) => setFormValueInput(e)}
                        />
                        {/*<span class="text-color-red fs-10" style={`display: ${endorsementObj.endorsementRemark ? "none;" : "block"}`}>Please enter Remark</span>*/}
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                        <p class="formLabel fs-15 p-b-3">Enter Recovery Amount
                          <span class="star-mandatory-entry p-l-2">*</span>
                        </p>
                        <input class="first-letter-capital"
                          onClick={(e) => inputClicked(e)}
                          name="recoveryAmount"
                          id="recoveryAmountrk"
                          type="number"
                          value={endorsementObj.recoveryAmount}
                          required="true"
                          onInput={(e) => setFormValueInput(e)}
                        />
                        {/*<span class="text-color-red fs-10" style={`display: ${endorsementObj.endorsementFileID ? "none;" : "block"}`}>Please Upload Invoice / Policy Document</span>*/}
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                        <p class="formLabel fs-15 p-b-3">Enter NCB Percentage
                          <span class="star-mandatory-entry p-l-2">*</span>
                        </p>
                        <input class="first-letter-capital"
                          onClick={(e) => inputClicked(e)}
                          name="ncbPercentage"
                          id="ncbPercentage"
                          type="number"
                          value={endorsementObj.ncbPercentage}
                          required="true"
                          onInput={(e) => setFormValueInput(e)}
                        />
                        {/*<span class="text-color-red fs-10" style={`display: ${endorsementObj.endorsementFileID ? "none;" : "block"}`}>Please Upload Invoice / Policy Document</span>*/}
                      </div>
                    </div>
                  }
                  {endorsementObj.typeOfEndorsement === 'cancellationApproval' &&
                    <div>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
      									<p class="formLabel fs-15">Select Policy Cancellation Reason
                          <span class="star-mandatory-entry p-l-2">*</span>
                        </p>
      									<select class='select'
                          style="text-transform:capitalize"
                          type="text"
                          id="cancellationReason"
                          name="cancellationReason"
                          value={endorsementObj.cancellationReason}
                          onChange={e => setFormValueInput(e)}
      									>
      										<option class="first-letter-capital" value="" disabled selected>Select Policy Cancellation Reason</option>
                          <option class="first-letter-capital" selected="Mistake in the policy" value="Mistake in the policy">Mistake in the policy</option>
                          <option class="first-letter-capital" selected="Choice number (as there is window of 7 days for insurance policy for RTO registration)" value="Choice number (as there is window of 7 days for insurance policy for RTO registration)">Choice number (as there is window of 7 days for insurance policy for RTO registration)</option>
                          <option class="first-letter-capital" selected="Delay in RTO passing" value="Delay in RTO passing">Delay in RTO passing</option>
    											<option class="first-letter-capital" selected="Other" value="Other">Other</option>
      									</select>
      								</div>
                      {endorsementObj.cancellationReason && endorsementObj.cancellationReason === 'Other' &&
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                          <p class="formLabel fs-15 p-b-3">Enter Reason
                            <span class="star-mandatory-entry p-l-2">*</span>
                          </p>
                          <input class="first-letter-capital"
                            onClick={(e) => inputClicked(e)}
                            name="otherCancellationReason"
                            id="otherCancellationReason"
                            type="text"
                            value={endorsementObj.otherCancellationReason}
                            required="true"
                            onInput={(e) => setFormValueInput(e)}
                          />
                          {/*<span class="text-color-red fs-10" style={`display: ${endorsementObj.endorsementRemark ? "none;" : "block"}`}>Please enter Remark</span>*/}
                        </div>
                      }
                    </div>
                  }
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
  									<p class="formLabel fs-15">Select {endorsementObj.typeOfEndorsement === "ncbRecoveryRequest" ? "Backoffice Executive" : "Manager"}
                      <span class="star-mandatory-entry p-l-2">*</span>
                    </p>
  									<select class='select'
                      style="text-transform:capitalize"
                      type="text"
                      id="selectedManagerID"
                      name="selectedManagerID"
                      value={endorsementObj.selectedManagerID}
                      onChange={e => setFormValueInput(e)}
  									>
  										<option class="first-letter-capital" value="" disabled selected>Select {endorsementObj.typeOfEndorsement === "ncbRecoveryRequest" ? "Backoffice Executive" : "Manager"}</option>
  										{exchangEvaluators.map((item) => (
  											<option class="first-letter-capital" selected={endorsementObj.selectedManagerID === item.userID} value={item.userID}>{item.userName}</option>
  										))}
  									</select>
  								</div>
                </div>
              }
            </div>
          </div>
        </NewPopupModal>
      }
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

      {/*
              modified by Vihang
              modified at 13/05/2022
              modification : mobile bottom Navigation fo workspace
        */}
      <MobileBottomNavigation props={props}/>
      {/*
        modified by Vihang
        modified on 19/05/2022
        modification: drag and droptag imported
      */}
      <DraggableTag/>
    </div>
  );
};

export default Workspace;
