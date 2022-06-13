import { h } from 'preact';
import Header from '../../components/header';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { getItem, removeAll } from '../../lib/myStore';
import { Modal, ModalBody } from '../../components/rightDrawer';
import CONSTANTS from '../../lib/constants';
import { formatDateTime } from '../../../src/lib/utils';
import { Pagination } from '../../components/pagination';
import { Table } from '../../components/table';
import Tabs from '../../components/tabs';
import { Timeline } from '../../components/timeline';
import Axios from 'axios';
// ModifiedBy: Vihang Kale
// Date: 15/03/2021
// Modification: case header and modal added
import {CaseCardHeader} from '../../components/caseCardHeader';
import { Modal2, ModalBody2 } from '../../components/rightDrawer2';
import { getFormattedAmount } from '../../../src/lib/utils';

// ModifiedBy: Vihang Kale
// Date: 22/12/2021
// Modification: added catalogue link and catalogue image and changes on line 113,
// 2405 line update catalogue item with link and image srcs in aws,changes in line 2499,
// changes in line 2479 - function for clearing preview images,changes in line 2767,
// line 2959 to save catalogue item with link and image srcs in aws,changes in line 5195 to
// remove image,on line 5219-5278:preview image and upload image functions to remove image
//for uploading and previwing images,line 7221-7272 added fields for image and links with previw image
//7221 - 8723 changes
const SiloAdministration = () => {
  // You can also pass a callback to the setter
  const pathname = window.location.pathname;
  const userInfo = getItem('userinfo');
  let [isRefreshpage, setRefreshpage] = useState(false);
  let [isRefreshpageUpdate, setRefreshpageUpdate] = useState(false);
  let [mainTabOptions, setMainTabOptions] = useState([]);
  let [moreTabOptions, setMoreTabOptions] = useState([]);
  let [menuDropdownPositions, setMenuDropdownPositions] = useState({});
  let [isTabsConfigurable, setIsTabsConfigurable] = useState(true);
  let [activePageTabItem, setActivePageTabItem] = useState('Third Party');
  let [currentPageNo, setCurrentPageNo] = useState(1);
  let [pageSize, setPageSize] = useState(50);
  let [totalPages, setTotalPages] = useState(0);
  let [dataset, setDataSet] = useState([]);
  let [isAddProductModalNewOpen, setAddProductModalNewVisibility] = useState(false);
  let [isSearchFilterPopup, setSearchFilterPopup] = useState(false);
  let [isSettingsDropdownOpen, setSettingsDropdownVisibility] = useState(false);
  let [isAddDropdownOpen, setAddDropdownVisibility] = useState(false);
  let [isStatusDropdownOpen, setStatusDropdownVisibility] = useState(false);
  let [isEdit, setIsEditable] = useState(false);
  let [filter, setFilter] = useState("");
  let [sort, setSort] = useState("");
  let [action, setAction] = useState("");
  let [uuid, setThirdPartyID] = useState("");
  let [selectedCatalogueID, setSelectedCatalogueID] = useState("");
  let [filteredCatalogueItem, setFilteredCatalogueItem] = useState([]);
  let [selectedCatalogueData, setSelectedCatalogueData] = useState({});
  let [selectedFinanceData, setSelectedFinanceData] = useState({});
  let [selectedCatalogueItemData, setSelectedCatalogueItemData] = useState({});
  let [thirdPartyList, setThirdPartyList] = useState([]);
  let [thirdPartyData, setThirdPartyData] = useState({
    name: "",
    displayName: "",
    shortName: "",
    type: "",
    subType: "",
    dmsPresent: false,
    isInHouse: false,
    dmsName: "",
    address: "",
    gstin: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonMobile: '',
    logo: "",
    brandingColor: "",
    headOfficeName: "",
    person: [{
      personName: "",
      email: "",
      contactNumber: "",
      designation: "",
      dateOfBirth: "",
      anniversaryDate: "",
      office: "",
    }
    ]
  });
  let [isAddThirdPartyModalOpen, setAddThirdPartyModalVisibility] = useState(false);
  let [isThirdPartyDetailsModalOpen, setThirdPartyDetailsModalVisibility] = useState(false);
  let [isThirdPartyHistoryModalOpen, setThirdPartyHistoryModalVisibility] = useState(false);
  let [selectedThirdPartyHistory, setSelectedThirdPartyHistory] = useState({});
  let [thirdPartyHistoryList, setThirdPartyHistoryList] = useState([]);
  let [allUsers, setAllUsers] = [];
  let [isThirdPartyHistoryEmpty, setThirdPartyHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteThirdPartyOpen, setDeleteThirdParty] = useState(false);
  let [isThirdPartyCreate, setIsThirdPartyCreate] = useState(false);

  let [financeList, setFinanceList] = useState([]);
  let [financeData, setFinanceData] = useState({});
  let [isAddFinanceModalOpen, setAddFinanceModalVisibility] = useState(false);
  let [isFinanceDetailsModalOpen, setFinanceDetailsModalVisibility] = useState(false);
  let [isFinanceCreate, setIsFinanceCreate] = useState(false);
  let [isFinanceHistoryModalOpen, setFinanceHistoryModalVisibility] = useState(false);
  let [selectedFinanceHistory, setSelectedFinanceHistory] = useState({});
  let [financeHistoryList, setFinanceHistoryList] = useState([]);
  let [isFinanceHistoryEmpty, setFinanceHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteFinanceOpen, setDeleteFinance] = useState(false);


  let [catalogueList, setCatalogueList] = useState([]);
  let [catalogueData, setCatalogueData] = useState({});
  let [isAddCatalogueModalOpen, setAddCatalogueModalVisibility] = useState(false);
  let [isCatalogueDetailsModalOpen, setCatalogueDetailsModalVisibility,] = useState(false);
  let [iscatalogueCreate, setIsCatalogueCreate] = useState(false);
  let [isCatalogueHistoryModalOpen, setCatalogueHistoryModalVisibility] = useState(false);
  let [selectedCatalogueHistory, setSelectedCatalogueHistory] = useState({});
  let [catalogueHistoryList, setCatalogueHistoryList] = useState([]);
  let [isCatalogueHistoryEmpty, setCatalogueHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteCatalogueOpen, setDeleteCatalogue] = useState(false);
  let [dealershipList, setDealershipList] = useState([]);

  let [catalogueItemList, setCatalogueItemList] = useState([]);
  let [catalogueItemData, setCatalogueItemData] = useState({});
  let [catalogueImgDelete, setCatalogueImgDelete] = useState(false);
  let [uploadImgArray, setUploadImgArry] = useState([]);
  const imageTypeExtension = ['png', 'jpg', 'jpeg'];

  let [isAddCatalogueItemModalOpen, setAddCatalogueItemModalVisibility] = useState(false);
  let [isCatalogueItemDetailsModalOpen, setCatalogueItemDetailsModalVisibility] = useState(false);
  let [isCatalogueItemCreate, setIsCatalogueItemCreate] = useState(false);
  let [isCatalogueItemHistoryModalOpen, setCatalogueItemHistoryModalVisibility] = useState(false);
  let [selectedCatalogueItemHistory, setSelectedCatalogueItemHistory] = useState({});
  let [catalogueItemHistoryList, setCatalogueItemHistoryList] = useState([]);
  let [isCatalogueItemHistoryEmpty, setCatalogueItemHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteCatalogueItemOpen, setDeleteCatalogueItem] = useState(false);
  let [schemesList, setSchemesList] = useState([])
  let [offerList, setOfferList] = useState([])

  let [stockList, setStockList] = useState([]);
  let [stockData, setStockData] = useState({});
  let [isAddStockModalOpen, setAddStockModalVisibility] = useState(false);
  let [isStockDetailsModalOpen, setStockDetailsModalVisibility] = useState(false);
  let [isStockCreate, setIsStockCreate] = useState(false);
  let [isStockHistoryModalOpen, setStockHistoryModalVisibility] = useState(false);
  let [selectedStockHistory, setSelectedStockHistory] = useState({});
  let [stockHistoryList, setStockHistoryList] = useState([]);
  let [isStockHistoryEmpty, setStockHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteStockOpen, setDeleteStock] = useState(false);

  let [stockItemList, setStockItemList] = useState([]);
  let [stockItemData, setStockItemData] = useState({});
  let [isAddStockItemModalOpen, setAddStockItemModalVisibility] = useState(false);
  let [isStockItemCreate, setIsStockItemCreate] = useState(false);
  let [isDeleteStockItemOpen, setDeleteStockItem] = useState(false);
  let [dropDownComponent, setDropDownComponent] = useState("");
  let [isStockItemDetailsModalOpen, setStockItemDetailsModalVisibility] = useState(false);
  let [isStockItemHistoryModalOpen, setStockItemHistoryModalVisibility] = useState(false);
  let [selectedStockItemHistory, setSelectedStockItemHistory] = useState({});
  let [stockItemHistoryList, setStockItemHistoryList] = useState([]);
  let [isStockItemHistoryEmpty, setStockItemHistoryEmptyModalVisibility] = useState(false);

  let [schemesData, setSchemesData] = useState({});
  let [isAddSchemesModalOpen, setAddSchemesModalVisibility] = useState(false);
  let [isSchemesDetailsModalOpen, setSchemesDetailsModalVisibility] = useState(false);
  let [isSchemesCreate, setIsSchemesCreate] = useState(false);
  let [isSchemesHistoryModalOpen, setSchemesHistoryModalVisibility] = useState(false);
  let [selectedSchemesHistory, setSelectedSchemesHistory] = useState({});
  let [schemesHistoryList, setSchemesHistoryList] = useState([]);
  let [isSchemesHistoryEmpty, setSchemesHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteSchemesOpen, setDeleteSchemes] = useState(false);

  let [offerData, setOfferData] = useState({});
  let [isAddOfferModalOpen, setAddOfferModalVisibility] = useState(false);
  let [isOfferDetailsModalOpen, setOfferDetailsModalVisibility] = useState(false);
  let [isOfferCreate, setIsOfferCreate] = useState(false);
  let [isOfferHistoryModalOpen, setOfferHistoryModalVisibility] = useState(false);
  let [selectedOfferHistory, setSelectedOfferHistory] = useState({});
  let [offerHistoryList, setOfferHistoryList] = useState([]);
  let [isOfferHistoryEmpty, setOfferHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteOfferOpen, setDeleteOffer] = useState(false);

  let [tenantList, setTenantList] = useState([]);
  let [tenantData, setTenantData] = useState({});
  let [isAddTenantModalOpen, setAddTenantModalVisibility] = useState(false);
  let [isTenantDetailsModalOpen, setTenantDetailsModalVisibility] = useState(false);
  let [isBranchHistoryModalOpen, setBranchHistoryModalVisibility] = useState(false);
  let [selectedBranchHistory, setSelectedBranchHistory] = useState({});
  let [tenantHistoryList, setBranchHistoryList] = useState([]);
  let [isBranchHistoryEmpty, setBranchHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteTenantOpen, setDeleteTenant] = useState(false);
  let [fileUploadObj, setFileUploadObj] = useState({});
  /*
    ModifiedBy: Vihang
    Modified On: 4 May 2022
    Modification: fileUploadObj state variable added
  */
  // let [currentPageNo, setCurrentPageNo] = useState(1);
  // let [pageSize, setPageSize] = useState(5);

  let [thirdPartyTableData, setThirdPartyTableData] = useState({
    columns: [],
    rows: []
  });
  let [financeTableData, setFinanceTableData] = useState({
    columns: [],
    rows: []
  });
  let [catalogueTableData, setCatalogueTableData] = useState({
    columns: [],
    rows: []
  });
  let [catalogueItemTableData, setCatlogueItemTableData] = useState({
    columns: [],
    rows: []
  });
  let [stockTableData, setStockTableData] = useState({
    columns: [],
    rows: []
  });
  let [stockItemTableData, setStockItemTableData] = useState({
    columns: [],
    rows: []
  });
  let [schemesTableData, setSchemesTableData] = useState({
    columns: [],
    rows: []
  });
  let [offerTableData, setOfferTableData] = useState({
    columns: [],
    rows: []
  });
  let [tenantTableData, setTenantTableData] = useState({
    columns: [],
    rows: []
  });

  let [oemList, setOemList] = useState([]);
  let [isPriceBreakup ,setPriceBreakup] = useState(false);

  //Dummy data for lead
  let leadDataset = {
    columns: [
      {
        label: 'Leads',
        field: 'name',
        sort: 'asc',
      }, {
        label: 'Stage',
        field: 'stage',
        sort: 'asc',
      }/*{
      label: 'Last Name',
      field: 'lastName',
      sort: 'desc',
      },{
      label: 'Email',
      field: 'email',
      sort: 'asc',
      },{
      label: 'Email Type',
      field: 'emailType',
      sort: 'desc',
    },*/, {
        label: 'Responsible',
        field: 'phoneNumber',
        sort: 'asc',
      },/*{
      label: 'Phone Number Type',
      field: 'phoneNumberType',
      sort: 'desc',
      },{
      label: 'Designation',
      field: 'designation',
      sort: 'desc',
    },*/{
        label: 'Company Name',
        field: 'companyName',
        sort: 'asc',
      }, {
        label: 'Amount',
        field: 'amount',
        sort: 'asc',
      },/*{
      label: 'Currency',
      field: 'currency',
      sort: 'asc',
      },{
      label: 'Website',
      field: 'website',
      sort: 'desc',
      },{
      label: 'Website Type',
      field: 'websiteType',
      sort: 'desc',
    },*/{
        label: 'Source',
        field: 'source',
        sort: 'asc',
      }, {
        label: 'Created',
        field: 'createdOn',
        sort: 'asc',
      },/*{
      label: 'Source Information',
      field: 'sourceInformation',
      sort: 'asc',
      },{
      label: 'Comment',
      field: 'comment',
      sort: 'asc',
      },{
      label: 'Date Of Birth',
      field: 'dateOfBirth',
      sort: 'asc',
      },{
      label: 'Middle Name',
      field: 'middleName',
      sort: 'desc',
    }*/
    ],
    rows: [
      {
        name: 'Lead #1',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'unassigned'
      }, {
        name: 'Lead #2',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'inprogress'
      }, {
        name: 'Lead #3',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'junk'
      }, {
        name: 'Lead #4',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'processed'
      }, {
        name: 'Lead #5',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'completed'
      },
      {
        name: 'Lead #1',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'unassigned'
      }, {
        name: 'Lead #2',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'inprogress'
      }, {
        name: 'Lead #3',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'junk'
      }, {
        name: 'Lead #4',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'processed'
      }, {
        name: 'Lead #5',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'completed'
      },
      {
        name: 'Lead #1',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'unassigned'
      }, {
        name: 'Lead #2',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'inprogress'
      }, {
        name: 'Lead #3',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'junk'
      }, {
        name: 'Lead #4',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'processed'
      }, {
        name: 'Lead #5',
        lastName: 'Kelgaonkar',
        middleName: '-',
        email: 'pallavi@technative.in',
        emailType: 'Work',
        phoneNumber: '9857485896',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '9,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '25-02-2021',
        stage: 'completed'
      },
    ]
  }

  //Dummy data for deal
  let dealDataset = {
    columns: [
      {
        label: 'Deals',
        field: 'name',
        sort: 'asc',
      },/*{
      label: 'Last Name',
      field: 'lastName',
      sort: 'desc',
      },{
      label: 'Email',
      field: 'email',
      sort: 'asc',
      },{
      label: 'Email Type',
      field: 'emailType',
      sort: 'desc',
    },*/{
        label: 'Stage',
        field: 'stage',
        sort: 'asc',
      }, {
        label: 'Company Name',
        field: 'companyName',
        sort: 'asc',
      }, {
        label: 'Responsible',
        field: 'phoneNumber',
        sort: 'asc',
      },/*{
      label: 'Phone Number Type',
      field: 'phoneNumberType',
      sort: 'desc',
      },{
      label: 'Designation',
      field: 'designation',
      sort: 'desc',
    },*/{
        label: 'Amount',
        field: 'amount',
        sort: 'asc',
      },/*{
      label: 'Currency',
      field: 'currency',
      sort: 'asc',
      },{
      label: 'Website',
      field: 'website',
      sort: 'desc',
      },{
      label: 'Website Type',
      field: 'websiteType',
      sort: 'desc',
      },{
      label: 'Messenger',
      field: 'messenger',
      sort: 'asc',
      },{
      label: 'Messenger Type',
      field: 'messengerType',
      sort: 'desc',
    },*/{
        label: 'Source',
        field: 'source',
        sort: 'asc',
      }, {
        label: 'Created',
        field: 'createdOn',
        sort: 'asc',
      },/*{
      label: 'Source Information',
      field: 'sourceInformation',
      sort: 'asc',
      },{
      label: 'Comment',
      field: 'comment',
      sort: 'asc',
      },{
      label: 'Date Of Birth',
      field: 'dateOfBirth',
      sort: 'asc',
      },{
      label: 'Middle Name',
      field: 'middleName',
      sort: 'desc',
    }*/
    ],
    rows: [
      {
        name: 'Deal #1',
        lastName: 'Dahatonde',
        middleName: '-',
        email: 'rutuja@technative.in',
        emailType: 'Work',
        phoneNumber: '8569874521',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '3,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '2-02-2021',
        stage: 'new'
      }, {
        name: 'Deal #2',
        lastName: 'Dahatonde',
        middleName: '-',
        email: 'rutuja@technative.in',
        emailType: 'Work',
        phoneNumber: '8569874521',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '3,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '2-02-2021',
        stage: 'requirementAnalysis'
      }, {
        name: 'Deal #3',
        lastName: 'Dahatonde',
        middleName: '-',
        email: 'rutuja@technative.in',
        emailType: 'Work',
        phoneNumber: '8569874521',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '3,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '2-02-2021',
        stage: 'productSelection'
      }, {
        name: 'Deal #4',
        lastName: 'Dahatonde',
        middleName: '-',
        email: 'rutuja@technative.in',
        emailType: 'Work',
        phoneNumber: '8569874521',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '3,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '2-02-2021',
        stage: 'testDrive'
      }, {
        name: 'Deal #5',
        lastName: 'Dahatonde',
        middleName: '-',
        email: 'rutuja@technative.in',
        emailType: 'Work',
        phoneNumber: '8569874521',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '3,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Email',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '2-02-2021',
        stage: 'exchangeOrFinance'
      }, {
        name: 'Deal #6',
        lastName: 'Dahatonde',
        middleName: '-',
        email: 'rutuja@technative.in',
        emailType: 'Work',
        phoneNumber: '8569874521',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '3,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Email',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '2-02-2021',
        stage: 'booking'
      }, {
        name: 'Deal #7',
        lastName: 'Dahatonde',
        middleName: '-',
        email: 'rutuja@technative.in',
        emailType: 'Work',
        phoneNumber: '8569874521',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        amount: '3,00,000',
        currency: 'India Rupee',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Email',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995',
        createdOn: '2-02-2021',
        stage: 'backOffice'
      }
    ]
  }

  //Dummy data for Contacts
  let contactDataset = {
    columns: [
      {
        label: 'Contact',
        field: 'name',
        sort: 'asc',
      },/*{
      label: 'Last Name',
      field: 'lastName',
      sort: 'desc',
    },*/{
        label: 'Email',
        field: 'email',
        sort: 'asc',
      },/*{
      label: 'Email Type',
      field: 'emailType',
      sort: 'desc',
    },*/{
        label: 'Responsible',
        field: 'phoneNumber',
        sort: 'asc',
      },/*{
      label: 'Phone Number Type',
      field: 'phoneNumberType',
      sort: 'desc',
    },*/{
        label: 'Designation',
        field: 'designation',
        sort: 'desc',
      }, {
        label: 'Company Name',
        field: 'companyName',
        sort: 'asc',
      }, {
        label: 'Address',
        field: 'address',
        sort: 'asc',
      },/*{
      label: 'Details',
      field: 'details',
      sort: 'asc',
    },{
      label: 'Website',
      field: 'website',
      sort: 'desc',
      },{
      label: 'Website Type',
      field: 'websiteType',
      sort: 'desc',
    },*/{
        label: 'Contact Type',
        field: 'contactType',
        sort: 'desc',
      }, {
        label: 'Source',
        field: 'source',
        sort: 'asc',
      },/*{
      label: 'Source Information',
      field: 'sourceInformation',
      sort: 'asc',
      },{
      label: 'Description',
      field: 'description',
      sort: 'asc',
      },{
      label: 'Date Of Birth',
      field: 'dateOfBirth',
      sort: 'asc',
      },{
      label: 'Middle Name',
      field: 'middleName',
      sort: 'desc',
    }*/
    ],
    rows: [
      {
        name: 'Manohar',
        lastName: 'Sule',
        middleName: '-',
        email: 'manohar@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        description: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      }, {
        name: 'Manohar',
        lastName: 'Sule',
        middleName: '-',
        email: 'manohar@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        description: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      }, {
        name: 'Manohar',
        lastName: 'Sule',
        middleName: '-',
        email: 'manohar@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        description: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      }, {
        name: 'Manohar',
        lastName: 'Sule',
        middleName: '-',
        email: 'manohar@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        description: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      }, {
        name: 'Manohar',
        lastName: 'Sule',
        middleName: '-',
        email: 'manohar@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        designation: 'Software Developer',
        companyName: 'Technative',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        description: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      },
    ]
  }

  //Dummy data for Company
  let companyDataset = {
    columns: [
      {
        label: 'Company',
        field: 'name',
        sort: 'desc',
      }, {
        label: 'Email',
        field: 'email',
        sort: 'asc',
      },/*{
      label: 'Email Type',
      field: 'emailType',
      sort: 'desc',
      },{
      label: 'Company Type',
      field: 'companyType',
      sort: 'desc',
    },*/{
        label: 'Responsible',
        field: 'phoneNumber',
        sort: 'asc',
      }, {
        label: 'Industry',
        field: 'industry',
        sort: 'desc',
      }, {
        label: 'Address',
        field: 'address',
        sort: 'asc',
      },/*{
      label: 'Details',
      field: 'details',
      sort: 'asc',
    },*/{
        label: 'Annual Revenue',
        field: 'annualRevenue',
        sort: 'asc',
      },/*{
      label: 'Currency',
      field: 'currency',
      sort: 'asc',
      },{
      label: 'Website',
      field: 'website',
      sort: 'desc',
      },{
      label: 'Website Type',
      field: 'websiteType',
      sort: 'desc',
      },{
      label: 'Messenger',
      field: 'messenger',
      sort: 'asc',
      },{
      label: 'Messenger Type',
      field: 'messengerType',
      sort: 'desc',
      },{
      label: 'Source',
      field: 'source',
      sort: 'asc',
      },{
      label: 'Source Information',
      field: 'sourceInformation',
      sort: 'asc',
      },{
      label: 'Comment',
      field: 'comment',
      sort: 'asc',
    }*/
    ],
    rows: [
      {
        name: 'Kothari',
        email: 'kothari@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        companyType: 'Client',
        annualRevenue: '4,00,00,000',
        currency: 'Indian Rupee',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        industry: 'Manufacturing',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      }, {
        name: 'K Kothari',
        email: 'kothari@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        companyType: 'Client',
        annualRevenue: '4,00,00,000',
        currency: 'Indian Rupee',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        industry: 'Manufacturing',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      }, {
        name: 'Kothari Honda',
        email: 'kothari@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        companyType: 'Client',
        annualRevenue: '4,00,00,000',
        currency: 'Indian Rupee',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        industry: 'Manufacturing',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      }, {
        name: 'Kothari Hyundai',
        email: 'kothari@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        companyType: 'Client',
        annualRevenue: '4,00,00,000',
        currency: 'Indian Rupee',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        industry: 'Manufacturing',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      }, {
        name: 'Kothari K',
        email: 'kothari@technative.in',
        emailType: 'Work',
        phoneNumber: '9863214589',
        phoneNumberType: 'Corporate',
        companyType: 'Client',
        annualRevenue: '4,00,00,000',
        currency: 'Indian Rupee',
        address: 'Baner, Pune',
        details: 'Lorem Ipsum',
        contactType: 'Supplier',
        industry: 'Manufacturing',
        website: 'www.technative.in',
        websiteType: 'Corporate',
        messenger: 'Messenger',
        messengerType: 'Facebook',
        source: 'Website',
        sourceInformation: 'Lorem Ipsum',
        comment: 'Lorem Ipsum',
        dateOfBirth: '25-01-1995'
      },
    ]
  }

  let [variantList ,setVariantList]=useState([])
  let [selectedVariant,setSelectedVariant]= useState([])



  useEffect(async () => {
    let mainTabOptions = [{
      label: 'Third Party',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Catalogue',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    },
    {
      label: 'Finance',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true,
    },
    {
      label: 'Catalogue Item',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true,
    }, {
      label: 'Stock',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Stock Item',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Schemes',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Offers',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Tenant',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }];

    let moreTabOptions = [{
      label: 'Contacts',
      isAddItem: true,
      isCounter: true,
      isEditable: true,
      isDraggable: true,
      counter: 4,
    }, {
      label: 'Companies',
      isAddItem: true,
      isCounter: true,
      isEditable: true,
      isDraggable: true,
      counter: 1
    }];

    let menuDropdownPositions = {
      arrow: {
        top: '62px',
        right: '14px',
        bottom: 'auto',
        left: 'auto'
      },
      menu: {
        top: '131px',
        right: '24px',
        bottom: 'auto',
        left: 'auto'
      }
    };

    await setMainTabOptions(mainTabOptions);
    await setMoreTabOptions(moreTabOptions);
    await setMenuDropdownPositions(menuDropdownPositions);
    await getThirdPartylistByCondition();
    await getFinancelistByCondition()
    await getCataloguelistByCondition()
    await getCatalogueItemlistByCondition()
    await getOemList();
    await getStocklistByCondition()
    await getStockItemlistByCondition()
    await getSchemeslistByCondition()
    await getOfferlistByCondition()
    await getTenantList()
    await getUserCount()

  }, [isRefreshpage, sort, filter]);

  async function getRowsListForThirdParty(data) {
    const colList = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'Display Name',
        field: 'displayName',
        sort: 'asc'
      },
      {
        label: 'Type',
        field: 'type',
        sort: 'asc'
      },
      {
        label: 'Sub Type',
        field: 'subType',
        sort: 'asc'
      },
      {
        label: 'GSTIN Number ',
        field: 'gstin',
        sort: 'asc'
      },
      {
        label: 'Vendor Code',
        field: 'vendorCode',
        sort: 'asc'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc'
      },
      {
        label: 'View',
        field: 'extraModal',
        sort: 'asc'
      }
    ];

    const rowList = data.map((p) => {
      let obej = p
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }

  async function getOemList() {
    let response = await axios.get((`${CONSTANTS.API_URL}/api/v1/oem`));
    if (response) {
      setOemList(response.data);
    }
  }

  async function getThirdPartylistByCondition() {
    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/thirdParty?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setThirdPartyList(response.data);
        const tableDataList = await getRowsListForThirdParty(response.data);
        thirdPartyTableData = tableDataList;
        await setThirdPartyTableData(thirdPartyTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/thirdParty?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setThirdPartyList(response.data);
        const tableDataList = await getRowsListForThirdParty(response.data);
        thirdPartyTableData = tableDataList;
        await setThirdPartyTableData(thirdPartyTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/thirdParty?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setThirdPartyList(response.data);
        const tableDataList = await getRowsListForThirdParty(response.data);
        thirdPartyTableData = tableDataList;
        await setThirdPartyTableData(thirdPartyTableData);
      } else {
        let params = await getSearchParams();
        let responce = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/thirdParty?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setThirdPartyList(responce.data);
        const tableDataList = await getRowsListForThirdParty(responce.data);
        thirdPartyTableData = tableDataList;
        await setThirdPartyTableData(thirdPartyTableData);
      }
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, {
        action: "ThirdParty List",
        email: userInfo.email,
      });

      await setIsThirdPartyCreate(false);
      // console.log(
      //   "outer-container-div",
      //   document.getElementById("container").offsetHeight,
      //   document.getElementById("outer-container-div").offsetHeight
      // );
      let top;
      if (
        document.getElementById("container").offsetHeight <
        document.getElementById("outer-container-div").offsetHeight
      ) {
        top = document.getElementById("container").offsetHeight / 2;
      } else {
        top = document.getElementById("outer-container-div").offsetHeight / 2;
      }
      let leftArrow = document.getElementById("left");
      leftArrow.style.top = top + "px";
      leftArrow.style.transform = "translateY(-50%)";
      leftArrow.style.display = "block";
      let rightArrow = document.getElementById("right");
      rightArrow.style.top = top + "px";
      rightArrow.style.transform = "translateY(-50%)";
      rightArrow.style.display = "block";
    } catch (HTTPException) {

      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "ThirdParty List",
          typeOfVisit: "error",
          errorCode: HTTPException.response.data.statusCode,
          errorMessage: HTTPException.response.data.message,
          email: userInfo.email,
        }
      );
    }
  }

  async function updateThirdParty(e) {
    e.preventDefault();
    try {
      let uuid = thirdPartyData.uuid;
      delete thirdPartyData.uuid;
      delete thirdPartyData.status;
      delete thirdPartyData.updatedAt;
      delete thirdPartyData.updatedBy;
      delete thirdPartyData._id;
      thirdPartyData.person.map((persom, i) => {
        delete thirdPartyData.person[i]._id;
      })
      delete thirdPartyData.createdBy;
      delete thirdPartyData.createdAt;
      delete thirdPartyData.deletedAt;
      delete thirdPartyData.__v;

      delete thirdPartyData.version;
      console.log(thirdPartyData)
      let response = await axios.put(
        `${CONSTANTS.API_URL}/api/v1/thirdParty/${uuid}`,
        thirdPartyData
      );
      if (response) {
        const res = await axios.put(
          `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
          { action: "update ThirdParty ", email: userInfo.email }
        );
        console.log(res)
        setIsThirdPartyCreate(true);
        setThirdPartyDetailsModalVisibility(false);
        await getThirdPartylistByCondition()
      }
    } catch (HTTPException) {
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Update ThirdParty",
          typeOfVisit: "error",
          errorCode: HTTPException.response.data.statusCode,
          errorMessage: HTTPException.response.data.message,
          email: userInfo.email,
        }
      );
    }
  }

  function addField(e) {
    e.preventDefault()
    // const values = [...personField]
    // values.push({value:null})
    // setPersonField(values)

    const valuesThirdpartyPerson = [...thirdPartyData.person]
    const objPerson = {
      personName: "",
      email: "",
      contactNumber: "",
      designation: "",
      dateOfBirth: "",
      anniversaryDate: "",
      office: "",
    }
    valuesThirdpartyPerson.push(objPerson)
    setThirdPartyData({ ...thirdPartyData, person: valuesThirdpartyPerson })
    console.log(thirdPartyData.person)
    // console.log(personField)
  }

  useEffect(()=>{
    console.log('useeffect')
  },[thirdPartyData.person])

  function removeFields(e,i){
    thirdPartyData.person.splice(i,1)
    setThirdPartyData({ ...thirdPartyData, person: thirdPartyData.person })
  }

  async function checkValidation(e,type,addOn){
    if(!type || !e.target.value) return

    let regEx
    let val
    if(type==="GSTIN"){
        val = e.target.value.toUpperCase()
       regEx = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
    }else if(type==="EMAIL"){
      val = e.target.value
       regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]{2,}\.)+[a-zA-Z]{2,}))$/;
    }else if(type==="MOBILE NUMBER"){
      val = e.target.value
       regEx = /^[0]?[6789]\d{9}$/
    }else if(type==="PANCARD"){
      val = e.target.value.toUpperCase()
      regEx = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    }else if(type==='IFSC'){
      val = e.target.value.toUpperCase()
      regEx=/[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/
    }else if(type==="WEBSITE"){
      val = e.target.value
      regEx = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    }else if(type==="ZIPCODE"){
      val = e.target.value
      regEx = /^[1-9][0-9]{5}$/
    }

      if(!regEx.test(val)){
        e.target.style.border = '2px solid red'
        // setTimeout(()=>{
        //   e.target.style.border = "0.1rem solid #d1d1d1"
        // },2000)
      }else{
        if(addOn && addOn==="person"){
          handleSavePerson(e.target.name,e.target.id,e)
        }else if(addOn && addOn==='Tenant'){
          let fieldName = e.target.name
          tenantData[fieldName] = val
          await setTenantData(tenantData);
        }else{
          let fieldName = e.target.name
          thirdPartyData[fieldName] = val
          await setThirdPartyData(thirdPartyData);
        }
        e.target.style.border = "0.1rem solid #d1d1d1"
      }

  }

  function handleSavePerson(field, index, e) {
    const valuesThirdpartyPerson = [...thirdPartyData.person];
    let personsObj = valuesThirdpartyPerson[index];
    personsObj = { ...personsObj, [field]: e.target.value }
    valuesThirdpartyPerson[index] = personsObj;
    setThirdPartyData({ ...thirdPartyData, person: valuesThirdpartyPerson });
    console.log(thirdPartyData.person, thirdPartyData);
  }
  async function toggleAddThirdPartyModalVisibility() {
    setThirdPartyData({
      name: "",
      displayName: "",
      shortName: "",
      type: "",
      subType: "",
      dmsPresent: false,
      isInHouse: false,
      dmsName: "",
      address: "",
      gstin: "",
      contactPersonName: "",
      contactPersonEmail: "",
      contactPersonMobile: '',
      logo: "",
      brandingColor: "",
      headOfficeName: "",
      person: [],
      pan: "",
      websiteAddress: "",
      registeredAddress: "",
      officeAddress: "",
      latitude: "",
      longitude: "",
      accountNumber: "",
      bankName: "",
      baneficieryName: "",
      ifsc: "",
      bankAddress: "",
      shopactLicenseNumber: "",
      rating: "",
      vendorCode: "",
    })
    setAddThirdPartyModalVisibility(!isAddThirdPartyModalOpen);

  }

  async function toggleThirdPartyDetailsModalVisibilityClosed(e) {
    setThirdPartyDetailsModalVisibility(!isThirdPartyDetailsModalOpen);
      thirdPartyData ={
        name: "",
        displayName: "",
        shortName: "",
        type: "",
        subType: "",
        dmsPresent: false,
        isInHouse: false,
        dmsName: "",
        address: "",
        gstin: "",
        contactPersonName: "",
        contactPersonEmail: "",
        contactPersonMobile: '',
        logo: "",
        brandingColor: "",
        headOfficeName: "",
        person: [],
        pan: "",
        websiteAddress: "",
        registeredAddress: "",
        officeAddress: "",
        latitude: "",
        longitude: "",
        accountNumber: "",
        bankName: "",
        baneficieryName: "",
        ifsc: "",
        bankAddress: "",
        shopactLicenseNumber: "",
        rating: "",
        vendorCode: "",
      }
    await setThirdPartyData(thirdPartyData)
  }


  async function toggleThirdPartyDetailsModalVisibility(e) {
    setThirdPartyDetailsModalVisibility(!isThirdPartyDetailsModalOpen);
  }

   function getThirdPartyDetails(thirdParty) {
    console.log(thirdParty, 'thirdParty')
     setThirdPartyData(thirdParty);
    toggleThirdPartyDetailsModalVisibility();
  }

  async function getSelectedThirdPartyAndOpenHistoryModal(thirdParty) {
    try {
      if (!isThirdPartyHistoryModalOpen) {
        selectedThirdPartyHistory = thirdParty;
        setSelectedThirdPartyHistory(thirdParty);
        const response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/object/${selectedThirdPartyHistory.uuid}/history?objectType=thirdParty`
        );
        thirdPartyHistoryList = response.data;

        if (thirdPartyHistoryList.hasOwnProperty("token")) {
          setThirdPartyHistoryEmptyModalVisibility(!isThirdPartyHistoryEmpty);
        } else {
          setThirdPartyHistoryList(thirdPartyHistoryList);
          setThirdPartyHistoryModalVisibility(!isThirdPartyHistoryModalOpen);
        }
      }
      return "response.data";
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleThirdPartyHistoryModal(data) {
    getSelectedThirdPartyAndOpenHistoryModal(data)
    setThirdPartyHistoryModalVisibility(!isThirdPartyHistoryModalOpen);
    setThirdPartyHistoryList([]);
  }

  async function toggleThirdPartyHistoryEmptyModal(e) {
    setThirdPartyHistoryEmptyModalVisibility(!isThirdPartyHistoryEmpty);
  }
  async function saveThirdParty(e) {
    e.preventDefault();
    try {

      let createThirdParty = await axios.post(
        `${CONSTANTS.API_URL}/api/v1/thirdParty`,
        thirdPartyData
      );
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        { action: "Save ThirdParty ", email: userInfo.email }
      );
      setIsThirdPartyCreate(true);
      setRefreshpage(true);
    } catch (HTTPException) {
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Save ThirdParty",
          typeOfVisit: "error",
          errorCode: HTTPException.response.data.statusCode,
          errorMessage: HTTPException.response.data.message,
          email: userInfo.email,
        }
      );
    }

    setAddThirdPartyModalVisibility(false);
    await getThirdPartylistByCondition()
  }


  // *************************************** Finance *************************************//
  async function getRowsListForFinance(data) {
    const colList = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'Sub Type',
        field: 'isSubType',
        sort: 'asc'
      },
      {
        label: 'Parent Finance Type',
        field: 'parentFinanceTypeID',
        sort: 'asc'
      },
      {
        label: 'View',
        field: 'extraModal',
        sort: 'asc'
      }
    ];

    const rowList = data.map((p) => {
      let name = p.displayName;
      let isSubType = p.isSubType;
      let parentFinanceTypeID = p.parentFinanceTypeID;
      let uuid = p.uuid
      let obej = { name, isSubType, parentFinanceTypeID, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }


  async function getFinancelistByCondition() {
    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/finance?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setFinanceList(response.data);
        const tableDataList = await getRowsListForFinance(response.data);
        financeTableData = tableDataList;
        await setFinanceTableData(financeTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/finance?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setFinanceList(response.data);
        const tableDataList = await getRowsListForFinance(response.data);
        financeTableData = tableDataList;
        await setFinanceTableData(financeTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/finance?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setFinanceList(response.data);
        const tableDataList = await getRowsListForFinance(response.data);
        financeTableData = tableDataList;
        await setFinanceTableData(financeTableData);
      } else {
        let params = await getSearchParams();
        let responce = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/finance?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setFinanceList(responce.data);
        const tableDataList = await getRowsListForFinance(responce.data);
        financeTableData = tableDataList;
        await setFinanceTableData(financeTableData);
      }


      await setIsFinanceCreate(false);
      // console.log(
      //   "outer-container-div",
      //   document.getElementById("container").offsetHeight,
      //   document.getElementById("outer-container-div").offsetHeight
      // );
      let top;
      if (
        document.getElementById("container").offsetHeight <
        document.getElementById("outer-container-div").offsetHeight
      ) {
        top = document.getElementById("container").offsetHeight / 2;
      } else {
        top = document.getElementById("outer-container-div").offsetHeight / 2;
      }
      let leftArrow = document.getElementById("left");
      leftArrow.style.top = top + "px";
      leftArrow.style.transform = "translateY(-50%)";
      leftArrow.style.display = "block";
      let rightArrow = document.getElementById("right");
      rightArrow.style.top = top + "px";
      rightArrow.style.transform = "translateY(-50%)";
      rightArrow.style.display = "block";
    } catch (HTTPException) {

      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Finance List",
          typeOfVisit: "error",
          errorCode: HTTPException.response.status,
          errorMessage: HTTPException.response.message,
          email: userInfo.email,
        }
      );
    }


  }

  async function updateFinance(e) {
    e.preventDefault();
    try {
      let uuid = financeData.uuid;
      delete financeData.name;
      delete financeData.updatedAt;
      delete financeData.updatedBy;
      delete financeData._id;
      delete financeData.createdBy;
      delete financeData.createdAt;
      delete financeData.deletedAt;
      delete financeData.__v;
      delete financeData.status;
      delete financeData.uuid;
      let response = await axios.put(
        `${CONSTANTS.API_URL}/api/v1/updateFinance/${uuid}`,
        financeData
      );
      if (response) {
        await axios.put(
          `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
          { action: "Update Finance ", email: userInfo.email }
        );
        setIsFinanceCreate(true);
        setFinanceDetailsModalVisibility(
          !isFinanceDetailsModalOpen
        );
        await getFinancelistByCondition()
      }
    } catch (HTTPException) {
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Update Finance",
          typeOfVisit: "error",
          errorCode: HTTPException.response.data.statusCode,
          errorMessage: HTTPException.response.data.message,
          email: userInfo.email,
        }
      );
    }
  }

  async function getFinanceDetails(finance) {
    await setFinanceData({
      displayName: "",
      isSubType: "",
      parentFinanceTypeID: "",
      address: {}
    });
    await setFinanceData(finance);
    toggleFinanceDetailsModalVisibility();
  }

  async function toggleFinanceHistoryModal(data) {
    setSelectedFinanceData(data)
    // getSelectedFinanceAndOpenHistoryModal(data)
    setFinanceHistoryModalVisibility(
      !isFinanceHistoryModalOpen
    );
    setFinanceHistoryList([]);
  }

  async function toggleFinanceHistoryEmptyModal(e) {
    setFinanceHistoryEmptyModalVisibility(
      !isFinanceHistoryEmpty
    );
  }

  async function saveFinance(e) {
    e.preventDefault();
    try {
      let createFinance = await axios.post(
        `${CONSTANTS.API_URL}/api/v1/finance`,
        financeData
      );
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        { action: "Save Finance ", email: userInfo.email }
      );
      setRefreshpage(true);
      setIsFinanceCreate(true);
    } catch (HTTPException) {
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Save Finance",
          typeOfVisit: "error",
          errorCode: HTTPException.response.status,
          errorMessage: HTTPException.response.message,
          email: userInfo.email,
        }
      );
    }

    setAddFinanceModalVisibility(false);
    await getFinancelistByCondition()
  }
  // *************************************** Catalogue *************************************//

  async function getRowsListForCatalogue(data) {
    const colList = [
      {
        label: 'Type Of Catalogue',
        field: 'typeOfCatalogue',
        sort: 'asc'
      },
      {
        label: 'Type Of Product',
        field: 'typeOfProduct',
        sort: 'asc'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc'
      },
      {
        label: 'View',
        field: 'extraModal',
        sort: 'asc'
      }
    ];

    const rowList = data.map((p) => {
      let typeOfCatalogue = p.typeOfCatalogue;
      let typeOfProduct = p.typeOfProduct;
      let dealershipID = p.dealershipID;
      let dealershipName = p.dealershipName;
      let status = p.status;
      let uuid = p.uuid
      let obej = { typeOfCatalogue, typeOfProduct, dealershipID, status, dealershipName, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }


  async function getCataloguelistByCondition() {
    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/productcatalogue?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setCatalogueList(response.data);
        const tableDataList = await getRowsListForCatalogue(response.data);
        catalogueTableData = tableDataList;
        await setCatalogueTableData(catalogueTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/productcatalogue?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setCatalogueList(response.data);
        const tableDataList = await getRowsListForCatalogue(response.data);
        catalogueTableData = tableDataList;
        await setCatalogueTableData(catalogueTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/productcatalogue?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setCatalogueList(response.data);
        const tableDataList = await getRowsListForCatalogue(response.data);
        catalogueTableData = tableDataList;
        await setCatalogueTableData(catalogueTableData);
      } else {
        let params = await getSearchParams();
        let responce = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/productcatalogue?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setCatalogueList(responce.data);
        const tableDataList = await getRowsListForCatalogue(responce.data);
        catalogueTableData = tableDataList;
        await setCatalogueTableData(catalogueTableData);
      }
      let dealershipResponse = await axios.get(
        `${CONSTANTS.API_URL}/api/v1/getDealership`
      );
      setDealershipList(dealershipResponse.data);

      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, {
        action: "ProductCatalogue List",
        email: userInfo.email,
      });
      await setIsCatalogueCreate(false);
      // console.log(
      //   "outer-container-div",
      //   document.getElementById("container").offsetHeight,
      //   document.getElementById("outer-container-div").offsetHeight
      // );
      let top;
      if (
        document.getElementById("container").offsetHeight <
        document.getElementById("outer-container-div").offsetHeight
      ) {
        top = document.getElementById("container").offsetHeight / 2;
      } else {
        top = document.getElementById("outer-container-div").offsetHeight / 2;
      }
      let leftArrow = document.getElementById("left");
      leftArrow.style.top = top + "px";
      leftArrow.style.transform = "translateY(-50%)";
      leftArrow.style.display = "block";
      let rightArrow = document.getElementById("right");
      rightArrow.style.top = top + "px";
      rightArrow.style.transform = "translateY(-50%)";
      rightArrow.style.display = "block";
    } catch (HTTPException) {

      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "ProductCatalogue List",
          typeOfVisit: "error",
          errorCode: HTTPException.response.status,
          errorMessage: HTTPException.response.message,
          email: userInfo.email,
        }
      );
    }


  }

  async function getSelectedCatalogueAndOpenHistoryModal(productCatalogue) {
    try {
      if (!isCatalogueHistoryModalOpen) {
        selectedCatalogueHistory = productCatalogue;
        setSelectedCatalogueHistory(productCatalogue);
        const response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/object/${selectedCatalogueHistory.uuid}/history?objectType=productCatalogue`
        );
        catalogueHistoryList = response.data;

        console.log(catalogueHistoryList);
        if (catalogueHistoryList.hasOwnProperty("token")) {
          setCatalogueHistoryEmptyModalVisibility(
            !isCatalogueHistoryEmpty
          );
        } else {
          // ProductCatalogueHistoryList.map( async (history)=>{
          //   history.userName = await getUserName(history.createdBy);
          // });
          setCatalogueHistoryList(catalogueHistoryList);
          setCatalogueHistoryModalVisibility(
            !isCatalogueHistoryModalOpen
          );
        }
      }
      return "response.data";
    } catch (e) {
      console.log(e);
    }
  }

  async function updateCatalogue(e) {
    e.preventDefault();
    try {
      let uuid = catalogueData.uuid;

      delete catalogueData.updatedAt;
      delete catalogueData.updatedBy;
      delete catalogueData._id;
      delete catalogueData.createdBy;
      delete catalogueData.createdAt;
      delete catalogueData.deletedAt;
      delete catalogueData.__v;
      delete catalogueData.status;
      delete catalogueData.dealershipName
      delete catalogueData.uuid;
      let response = await axios.put(
        `${CONSTANTS.API_URL}/api/v1/productcatalogue/${uuid}`,
        catalogueData
      );
      if (response) {
        await axios.put(
          `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
          { action: "update Catalogue ", email: userInfo.email }
        );
        setIsCatalogueCreate(true);
        setCatalogueDetailsModalVisibility(
          !isCatalogueDetailsModalOpen
        );
        setCatalogueData({})
        await getCataloguelistByCondition()
      }
    } catch (HTTPException) {
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Update Catalogue",
          typeOfVisit: "error",
          errorCode: HTTPException.response.data.statusCode,
          errorMessage: HTTPException.response.data.message,
          email: userInfo.email,
        }
      );
    }
  }

  async function getCatalogueDetails(productcatalogue) {
    await setCatalogueData({
      typeOfCatalogue: "",
      typeOfProduct: "",
      dealershipID: "",
      OemID: ''
    });
    await setCatalogueData(productcatalogue);
    toggleCatalogueDetailsModalVisibility();
  }

  async function toggleCatalogueHistoryModal(data) {
    setSelectedCatalogueData(data)
    // getSelectedCatalogueAndOpenHistoryModal(data)
    setCatalogueHistoryModalVisibility(
      !isCatalogueHistoryModalOpen
    );
    setCatalogueHistoryList([]);
  }

  async function toggleCatalogueHistoryEmptyModal(e) {
    setCatalogueHistoryEmptyModalVisibility(
      !isCatalogueHistoryEmpty
    );
  }

  async function saveCatalogue(e) {
    e.preventDefault();
    try {
      let createProductCatalogue = await axios.post(
        `${CONSTANTS.API_URL}/api/v1/productcatalogue`,
        catalogueData
      );

      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        { action: "Save ProductCatalogue ", email: userInfo.email }
      );
      setRefreshpage(true);
      setIsCatalogueCreate(true);
    } catch (HTTPException) {
      console.log(HTTPException);
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Save ProductCatalogue",
          typeOfVisit: "error",
          errorCode: HTTPException.response.status,
          errorMessage: HTTPException.response.message,
          email: userInfo.email,
        }
      );
    }

    setAddCatalogueModalVisibility(false);
    await getCataloguelistByCondition()
  }
  // *************************************** Catalogue Item *************************************//
  async function getRowsListForCatalogueItem(data) {
    const colList = [
      // {
      //   label: 'Name',
      //   field: 'name',
      //   sort: 'asc'
      // },
      {
        label: 'Model Name',
        field: 'displayName',
        sort: 'asc'
      },
      {
        label: 'Variant',
        field: 'variant',
        sort: 'asc'
      },
      {
        label: 'Ex-showroom Price',
        field: 'exShowroom',
        sort: 'asc'
      },
      {
        label: 'Total Individual',
        field: 'totalIndividual',
        sort: 'asc'
      },
      {
        label: 'Catalogue Name',
        field: 'catalogueName',
        sort: 'asc'
      },
      {
        label: 'Type',
        field: 'type',
        sort: 'asc'
      },
      {
        label: 'View',
        field: 'extraModal',
        sort: 'asc'
      }
    ];

    const rowList = data.map((p) => {
      // let name = p.name;
      let displayName = p.displayName;
      let catalogueName = p.catalogueName;
      let thirdPartyName = p.thirdPartyName
      let type = p.type;
      let status = p.status;
      let uuid = p.uuid
      let obej = { displayName, catalogueName, thirdPartyName, type, status, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    return listObj;
  }

  async function getCatalogueItemlistByCondition() {
    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/catalogue?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setCatalogueItemList(response.data);
        const tableDataList = await getRowsListForCatalogueItem(response.data);
        catalogueItemTableData = tableDataList;
        await setCatlogueItemTableData(catalogueItemTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/catalogue?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setCatalogueItemList(response.data);
        const tableDataList = await getRowsListForCatalogueItem(response.data);
        catalogueItemTableData = tableDataList;
        await setCatlogueItemTableData(catalogueItemTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/catalogue?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setCatalogueItemList(response.data);
        const tableDataList = await getRowsListForCatalogueItem(response.data);
        catalogueItemTableData = tableDataList;
        await setCatlogueItemTableData(catalogueItemTableData);
      } else {
        let params = await getSearchParams();
        let responce = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/catalogue?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setCatalogueItemList(responce.data);
        const tableDataList = await getRowsListForCatalogueItem(responce.data);
        catalogueItemTableData = tableDataList;
        await setCatlogueItemTableData(catalogueItemTableData);
      }
      //   let dealershipResponse = await axios.get(
      //     `${CONSTANTS.API_URL}/api/v1/getDealership`
      //   );
      //   setDealershipList(dealershipResponse.data);

      let catalogueResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/productcatalogue`);
      setCatalogueList(catalogueResponse.data);

      let thirdPartyResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/thirdParty`);
      setThirdPartyList(thirdPartyResponse.data);

      let schemesResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/schemes`);
      console.log(schemesResponse.data,"scheme dataaaaaaaaaaaaaaaaaaaaaa")
      setSchemesList(schemesResponse.data);

      let offerResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/offer`);
      setOfferList(offerResponse.data);


      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, {
        action: "CatalogueItem List",
        email: userInfo.email,
      });
      await setIsCatalogueItemCreate(false);
      // console.log(
      //   "outer-container-div",
      //   document.getElementById("container").offsetHeight,
      //   document.getElementById("outer-container-div").offsetHeight
      // );
      let top;
      if (
        document.getElementById("container").offsetHeight <
        document.getElementById("outer-container-div").offsetHeight
      ) {
        top = document.getElementById("container").offsetHeight / 2;
      } else {
        top = document.getElementById("outer-container-div").offsetHeight / 2;
      }
      let leftArrow = document.getElementById("left");
      leftArrow.style.top = top + "px";
      leftArrow.style.transform = "translateY(-50%)";
      leftArrow.style.display = "block";
      let rightArrow = document.getElementById("right");
      rightArrow.style.top = top + "px";
      rightArrow.style.transform = "translateY(-50%)";
      rightArrow.style.display = "block";
    } catch (HTTPException) {

      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "CatalogueItem List",
          typeOfVisit: "error",
          errorCode: HTTPException.response.status,
          errorMessage: HTTPException.response.message,
          email: userInfo.email,
        }
      );
    }
  }

  async function updateCatalogueItem(e) {
    e.preventDefault();
      let fileArr = []
      let fileDetailArry = []
      if (uploadImgArray.length !== 0) {
       for (let i = 0; i < uploadImgArray.length; i++) {
        let files = uploadImgArray[i][0]
        if (!files) return;
        const fileName = files.name;
        const extension = fileName.split('.').pop();
        if (imageTypeExtension.includes(extension.toLowerCase())) {
          const fileObj = {
            name: files.name,
            size: files.size,
            type: files.type,
            value: files.name,
          };
          fileArr.push(fileObj)
          fileDetailArry.push(files)
        } else {
          alert('Looks like the file you tried to upload did not match the system. Kindly upload only a .png, .jpg, .jpeg file');
        }
      }
    }
      Promise.all(fileArr.map(async (file, index) => {
         delete file.fileDetails
        let payload = {
          file: file,
          courierID: catalogueItemData.uuid
        }

        let fileDetails
        await axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payload).then(async res => {
          if (res && res.data) {
            fileDetails = res.data;
            let catalogueImageIds = catalogueItemData.catalogueImageIds ? catalogueItemData.catalogueImageIds : []
            await catalogueImageIds.push(fileDetails.uuid);
            catalogueItemData.catalogueImageIds = await catalogueImageIds

            try {
              //  Save File on S3
              const opts = {
                headers: {
                  name: 'Content-Type',
                  value: 'multipart/form-data',
                }
              };
              const fileUpload = await axios.put(fileDetails.signedURL, fileDetailArry[index], opts);
            } catch (e) {
              console.error(e);
            }
          }
        });
      })).then(async () => {
      let uuid = catalogueItemData.uuid;
      delete catalogueItemData.uuid
      delete catalogueItemData.updatedAt;
      delete catalogueItemData.updatedBy;
      delete catalogueItemData._id;
      delete catalogueItemData.createdBy;
      delete catalogueItemData.createdAt;
      delete catalogueItemData.deletedAt;
      delete catalogueItemData.__v;
      delete catalogueItemData.status;
      delete catalogueItemData.thirdPartyName;
      delete catalogueItemData.catalogueName;
      delete catalogueItemData.offerName
      delete catalogueItemData.schemeName
      delete catalogueItemData.catalogueImageSrc
      let responseUpdateCatalogue = await axios.put(
        `${CONSTANTS.API_URL}/api/v1/catalogue/${uuid}`,
        catalogueItemData
      );

      try {
        if (responseUpdateCatalogue) {
          await axios.put(
            `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
            { action: "update CatalogueItem ", email: userInfo.email }
          );
          setIsCatalogueItemCreate(true);
          setCatalogueItemDetailsModalVisibility(
            !isCatalogueItemDetailsModalOpen
          );
          await getCatalogueItemlistByCondition()
        }
      } catch (HTTPException) {
          await axios.put(
            `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
            {
              action: "Update CatalogueItem",
              typeOfVisit: "error",
              errorCode: HTTPException.response.data.statusCode,
              errorMessage: HTTPException.response.data.message,
              email: userInfo.email,
            }
          );
      }
      if (responseUpdateCatalogue.status === 200) {
        await ClearPreviewImages("update");
        uploadImgArray.length = 0;
        await setUploadImgArry(uploadImgArray);

        /* ModifiedBy: Vihang Kale
            Date: 15/03/2021
            Modification: new fields added */
        await setCatalogueItemData({
         name: "",
         displayName: "",
         catalogueID: '',
         descripton: '',
         catalogueLink:'',
         catalogueImageIds:[],
         thirdPartyID: "",
         exShowroomPrice: "",
         tcsOnExShowroomPercent: "",
         tcsOnExShowroomAmount: "",
         insurance: 0,
         rtoTaxIndividual: "",
         rtoTaxCompany: "",
         roadSideAssistance: "",
         rubberMattingKit: "",
         fourthFifthYearExtendedWarranty: "",
         additionalPremiumOnEngineProtection: "",
         additionalPremiumOnReturnToInvoice: "",
         fiveYearsorSixtyKmShiedOfTrust: "",
         totalIndividualOnRoad: "",
         totalCompanyOnRoad: "",
         basicAccessoriesKit: 0,
         postOffer: {
           exShowroomPrice: "",
           tcsOnExShowroomPercent: "",
           tcsOnExShowroomAmount: "",
           insurance: "",
           rtoTaxIndividual: "",
           rtoTaxCompany: "",
           roadSideAssistance: "",
           rubberMattingKit: "",
           fourthFifthYearExtendedWarranty: "",
           additionalPremiumOnEngineProtection: "",
           additionalPremiumOnReturnToInvoice: "",
           fiveYearsorSixtyKmShiedOfTrust: "",
           totalIndividualOnRoad: "",
           totalCompanyOnRoad: "",
           basicAccessoriesKit: "",
         },
         discounted: {
           exShowroomPrice: "",
           tcsOnExShowroomPercent: "",
           tcsOnExShowroomAmount: "",
           insurance: "",
           rtoTaxIndividual: "",
           rtoTaxCompany: "",
           roadSideAssistance: "",
           rubberMattingKit: "",
           fourthFifthYearExtendedWarranty: "",
           additionalPremiumOnEngineProtection: "",
           additionalPremiumOnReturnToInvoice: "",
           fiveYearsorSixtyKmShiedOfTrust: "",
           totalIndividualOnRoad: "",
           totalCompanyOnRoad: "",
           basicAccessoriesKit: "",
         },
         interDealershipTransfer: {
           exShowroomPrice: "",
           tcsOnExShowroomPercent: "",
           tcsOnExShowroomAmount: "",
           insurance: "",
           rtoTaxIndividual: "",
           rtoTaxCompany: "",
           roadSideAssistance: "",
           rubberMattingKit: "",
           fourthFifthYearExtendedWarranty: "",
           additionalPremiumOnEngineProtection: "",
           additionalPremiumOnReturnToInvoice: "",
           fiveYearsorSixtyKmShiedOfTrust: "",
           totalIndividualOnRoad: "",
           totalCompanyOnRoad: "",
           basicAccessoriesKit: ""
         },
         exStockyard:0,
         freight:0,
         igstPercentage:0,
         cessPercentage:0,
         tcsPercentage:0,
         dealerCommision:0,
         gstPercentage:0,
         cess2Percentage:0,
         tcsOnExShowroomPercentage:0,
         insurancePerc1:0,
         insurancePerc2:0,
         insuranceAdditionalAmount:0,
         insuranceAmount2Perc:0,
         miscellaneousExpenses:0,
         rsa:0,
         rmk:0,
         rtoIndividualPercentage:0,
         registrationFee:0,
         fourthAnd5thYearExtendedWarrantyOnAmount:0,
         fourthAnd5thYearExtendedWarrantyPercentage:0,
         rtoCompanyPercentage:0,
         additionalPremiumForEngineProtectionPercentage1:0,
         additionalPremiumForEngineProtectionPercentage2:0,
         additionalPremiumForRTIPercentage1:0,
         additionalPremiumForRTIPercentage2:0,
         sheildOfTrustAmount:0,
         sheildOfTrustPercentage:0
        })
        let catalogueResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue`);
        const tableDataList = await getRowsListForCatalogueItem(catalogueResponse.data);
        await setCatlogueItemTableData(tableDataList);
        await setCatalogueImgDelete(false);
        await setCatalogueItemDetailsModalVisibility(false);
        await getCatalogueItemlistByCondition()
      }
    }).catch((err) => {
      console.log(err)
    })
}

  async function getCatalogueItemDetails(catalogueItem) {
    await setStockItemData({
      name: "",
      displayName: "",
      dealershipID: '',
      type: '',
      descripton: '',
      modelCategory: '',
      modelName: '',
      variant: '',
      modelSubVariant: '',
      colorCode: '',
      acCompressor: '',
      fuelType: '',
      classOfVehicle: '',
      color: '',
      interiorColor: '',
      exteriorColor: '',
      grossVehicleWeight: 0,
      unladenWeight: 0,
      numberOfCylinders: 0,
      horsePowerCC: 0,
      seatingCapacity: 0,
      typeOfBody: '',
      variantCode: '',
      emissionType: '',
      hsnCode: '',
      margin: 0,
      totalCost: 0,
      discountThreshold: 0,
      purchaseFinancer: '',
      purchaseFinanceInterestRate: 0,
      purchaseFinanceAmount: 0,
      purchaseFinanceAccountNumber: '',
      compatibilityWith: '',
      thirdPartyID: "",
      vehicleIdentificationNumber: '',
      exShowroomPrice: "",
      tcsOnExShowroomPercent: "",
      tcsOnExShowroomAmount: "",
      insurance: "",
      rtoTaxIndividual: "",
      rtoTaxCompany: "",
      roadSideAssistance: "",
      rubberMattingKit: "",
      fourthFifthYearExtendedWarranty: "",
      additionalPremiumOnEngineProtection: "",
      additionalPremiumOnReturnToInvoice: "",
      fiveYearsorSixtyKmShiedOfTrust: "",
      totalIndividualOnRoad: "",
      totalCompanyOnRoad: "",
      basicAccessoriesKit: "",
      postOffer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      discounted: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      interDealershipTransfer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      }
    });
    await setCatalogueItemData(catalogueItem);
    toggleCatalogueItemDetailsModalVisibility();
  }

  async function getSelectedCatalogueItemAndOpenHistoryModal(
    catalogueItem
  ) {
    try {
      if (!isCatalogueItemHistoryModalOpen) {
        selectedCatalogueItemHistory = catalogueItem;
        setSelectedCatalogueItemHistory(catalogueItem);
        const response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/object/${selectedCatalogueItemHistory.uuid}/history?objectType=catalogue`
        );
        catalogueItemHistoryList = response.data;

        if (catalogueItemHistoryList.hasOwnProperty("token")) {
          setCatalogueItemHistoryEmptyModalVisibility(
            !isCatalogueItemHistoryEmpty
          );
        } else {
          // CatalogueItemHistoryList.map( async (history)=>{
          //   history.userName = await getUserName(history.createdBy);
          // });
          setCatalogueItemHistoryList(catalogueItemHistoryList);
          setCatalogueItemHistoryModalVisibility(
            !isCatalogueItemHistoryModalOpen
          );
        }
      }
      return "response.data";
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleCatalogueItemHistoryModal(data) {
    // getSelectedCatalogueItemAndOpenHistoryModal(data)
     console.log(data)
    setSelectedCatalogueItemData(data)
    setCatalogueItemHistoryModalVisibility(
      !isCatalogueItemHistoryModalOpen
    );
    setCatalogueItemHistoryList([]);
  }

  async function toggleCatalogueItemHistoryEmptyModal(e) {
    setCatalogueItemHistoryEmptyModalVisibility(
      !isCatalogueItemHistoryEmpty
    );
  }

  async function ClearPreviewImages(type) {
  if(uploadImgArray.length) {
    for (let i = 0; i < uploadImgArray.length; i++) {
    let files = uploadImgArray[i][0]
      if (!files) return;
      console.log(files.name,"file nameeeeeeeeeeeeeeeee");
      const fileName = files.name;
      if(type === "update") {
        console.log(document.getElementById(`uploadImg${fileName}`).remove());
      }
      document.getElementById(`uploadImg${fileName}`).remove();

      }

    }
      document.getElementById("catalogueImageIds").value = null;
      document.getElementById("catalogueImageIdsUpdate").value = null;
  }

  async function toggleAddCatalogueItemModalVisibility() {
    await setCatalogueImgDelete(false);
    await ClearPreviewImages();
    uploadImgArray.length = 0;
    await setUploadImgArry(uploadImgArray);

    await setAddCatalogueItemModalVisibility(!isAddCatalogueItemModalOpen);
    /* ModifiedBy: Vihang Kale
      Date: 15/03/2021
      Modification: new catalogue items fields added */
    await setCatalogueItemData({
      name: "",
      displayName: "",
      catalogueID: '',
      descripton: '',
      catalogueLink:'',
      catalogueImageIds:[],
      catalogueImageSrc:[],
      thirdPartyID: "",
      exShowroomPrice: "",
      tcsOnExShowroomPercent: "",
      tcsOnExShowroomAmount: "",
      insurance: 0,
      rtoTaxIndividual: "",
      rtoTaxCompany: "",
      roadSideAssistance: "",
      rubberMattingKit: "",
      fourthFifthYearExtendedWarranty: "",
      additionalPremiumOnEngineProtection: "",
      additionalPremiumOnReturnToInvoice: "",
      fiveYearsorSixtyKmShiedOfTrust: "",
      totalIndividualOnRoad: "",
      totalCompanyOnRoad: "",
      basicAccessoriesKit: 0,
      postOffer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      discounted: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      interDealershipTransfer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: ""
      },
      exStockyard:0,
      freight:0,
      igstPercentage:0,
      cessPercentage:0,
      tcsPercentage:0,
      dealerCommision:0,
      gstPercentage:0,
      cess2Percentage:0,
      tcsOnExShowroomPercentage:0,
      insurancePerc1:0,
      insurancePerc2:0,
      insuranceAdditionalAmount:0,
      insuranceAmount2Perc:0,
      miscellaneousExpenses:0,
      rsa:0,
      rmk:0,
      rtoIndividualPercentage:0,
      registrationFee:0,
      fourthAnd5thYearExtendedWarrantyOnAmount:0,
      fourthAnd5thYearExtendedWarrantyPercentage:0,
      rtoCompanyPercentage:0,
      additionalPremiumForEngineProtectionPercentage1:0,
      additionalPremiumForEngineProtectionPercentage2:0,
      additionalPremiumForRTIPercentage1:0,
      additionalPremiumForRTIPercentage2:0,
      sheildOfTrustAmount:0,
      sheildOfTrustPercentage:0
    });

  }

  async function toggleCatalogueItemDetailsModalVisibilityClosed(e) {
    await setCatalogueImgDelete(false)
    await ClearPreviewImages("update");
    uploadImgArray.length = 0;
    await setUploadImgArry(uploadImgArray);

   //await setUploadImgArry([])

    await setCatalogueItemDetailsModalVisibility(
      !isCatalogueItemDetailsModalOpen
    );
     /* ModifiedBy: Vihang Kale
      Date: 15/03/2021
      Modification: new catalogue items fields added */
    await setCatalogueItemData({
      name: "",
      displayName: "",
      catalogueID: '',
      descripton: '',
      catalogueLink:'',
      catalogueImageIds:[],
      catalogueImageSrc:[],
      thirdPartyID: "",
      exShowroomPrice: "",
      tcsOnExShowroomPercent: "",
      tcsOnExShowroomAmount: "",
      insurance: 0,
      rtoTaxIndividual: "",
      rtoTaxCompany: "",
      roadSideAssistance: "",
      rubberMattingKit: "",
      fourthFifthYearExtendedWarranty: "",
      additionalPremiumOnEngineProtection: "",
      additionalPremiumOnReturnToInvoice: "",
      fiveYearsorSixtyKmShiedOfTrust: "",
      totalIndividualOnRoad: "",
      totalCompanyOnRoad: "",
      basicAccessoriesKit: 0,
      postOffer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      discounted: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      interDealershipTransfer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: ""
      },
      exStockyard:0,
      freight:0,
      igstPercentage:0,
      cessPercentage:0,
      tcsPercentage:0,
      dealerCommision:0,
      gstPercentage:0,
      cess2Percentage:0,
      tcsOnExShowroomPercentage:0,
      insurancePerc1:0,
      insurancePerc2:0,
      insuranceAdditionalAmount:0,
      insuranceAmount2Perc:0,
      miscellaneousExpenses:0,
      rsa:0,
      rmk:0,
      rtoIndividualPercentage:0,
      registrationFee:0,
      fourthAnd5thYearExtendedWarrantyOnAmount:0,
      fourthAnd5thYearExtendedWarrantyPercentage:0,
      rtoCompanyPercentage:0,
      additionalPremiumForEngineProtectionPercentage1:0,
      additionalPremiumForEngineProtectionPercentage2:0,
      additionalPremiumForRTIPercentage1:0,
      additionalPremiumForRTIPercentage2:0,
      sheildOfTrustAmount:0,
      sheildOfTrustPercentage:0
    });

  }

  async function toggleCatalogueItemDetailsModalVisibility(e) {
    setCatalogueItemDetailsModalVisibility(
      !isCatalogueItemDetailsModalOpen
    );
  }


  async function saveCatalogueItem(e) {
    e.preventDefault();
    try {
      delete catalogueItemData.catalogueImageSrc
      let createCatalogueItem = await axios.post(
        `${CONSTANTS.API_URL}/api/v1/catalogue`,
        catalogueItemData
      );
      let fileArr = []
      let fileDetailArry = []

      for (let i = 0; i < uploadImgArray.length; i++) {
        let files = uploadImgArray[i][0]
        if (!files) return;
        const fileName = files.name;
        const extension = fileName.split('.').pop();
        if (imageTypeExtension.includes(extension.toLowerCase())) {
          const fileObj = {
            name: files.name,
            size: files.size,
            type: files.type,
            value: files.name,
          };
          fileArr.push(fileObj)
          fileDetailArry.push(files)
        } else {
          alert('Looks like the file you tried to upload did not match the system. Kindly upload only a .png, .jpg, .jpeg file');
        }
      }
      Promise.all(fileArr.map(async (file, index) => {
         delete file.fileDetails
        let payload = {
          file: file,
          courierID: createCatalogueItem.data.uuid
        }

        let fileDetails
        await axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payload).then(async res => {
          if (res && res.data) {
            fileDetails = res.data;
            let catalogueImageIds = catalogueItemData.catalogueImageIds ? catalogueItemData.catalogueImageIds : []
            await catalogueImageIds.push(fileDetails.uuid);
            catalogueItemData.catalogueImageIds = await catalogueImageIds

            try {
              //  Save File on S3
              const opts = {
                headers: {
                  name: 'Content-Type',
                  value: 'multipart/form-data',
                }
              };
              const fileUpload = await axios.put(fileDetails.signedURL, fileDetailArry[index], opts);
            } catch (e) {
              console.error(e);
            }
          }
        });
      })).then(async () => {

        delete catalogueItemData.uuid;
        delete catalogueItemData.updatedAt;
        delete catalogueItemData.updatedBy;
        delete catalogueItemData._id;
        delete catalogueItemData.createdBy;
        delete catalogueItemData.createdAt;
        delete catalogueItemData.deletedAt;
        delete catalogueItemData.__v;
        delete catalogueItemData.version;
        delete catalogueItemData.catalogueImageSrc;

        let responseUpdateCatalogue = await axios.put(`${CONSTANTS.API_URL}/api/v1/catalogue/${createCatalogueItem.data.uuid}`, catalogueItemData);
        if (responseUpdateCatalogue.status === 200) {
          let catalogueResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue`);
          const tableDataList = await getRowsListForCatalogueItem(catalogueResponse.data);
          await setCatlogueItemTableData(tableDataList);
          await setCatalogueImgDelete(false)
        }
      }).catch((err) => {
        console.log(err)
      })

      /* ModifiedBy: Vihang Kale
            Date: 15/03/2021
            Modification: new fields added */
      if (createCatalogueItem.status === 200) {
        setAddCatalogueItemModalVisibility(false)
        await setCatalogueItemData({
         name: "",
        displayName: "",
        catalogueID: '',
        descripton: '',
        catalogueLink:'',
        catalogueImageIds:[],
        thirdPartyID: "",
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: 0,
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: 0,
        postOffer: {
          exShowroomPrice: "",
          tcsOnExShowroomPercent: "",
          tcsOnExShowroomAmount: "",
          insurance: "",
          rtoTaxIndividual: "",
          rtoTaxCompany: "",
          roadSideAssistance: "",
          rubberMattingKit: "",
          fourthFifthYearExtendedWarranty: "",
          additionalPremiumOnEngineProtection: "",
          additionalPremiumOnReturnToInvoice: "",
          fiveYearsorSixtyKmShiedOfTrust: "",
          totalIndividualOnRoad: "",
          totalCompanyOnRoad: "",
          basicAccessoriesKit: "",
        },
        discounted: {
          exShowroomPrice: "",
          tcsOnExShowroomPercent: "",
          tcsOnExShowroomAmount: "",
          insurance: "",
          rtoTaxIndividual: "",
          rtoTaxCompany: "",
          roadSideAssistance: "",
          rubberMattingKit: "",
          fourthFifthYearExtendedWarranty: "",
          additionalPremiumOnEngineProtection: "",
          additionalPremiumOnReturnToInvoice: "",
          fiveYearsorSixtyKmShiedOfTrust: "",
          totalIndividualOnRoad: "",
          totalCompanyOnRoad: "",
          basicAccessoriesKit: "",
        },
        interDealershipTransfer: {
          exShowroomPrice: "",
          tcsOnExShowroomPercent: "",
          tcsOnExShowroomAmount: "",
          insurance: "",
          rtoTaxIndividual: "",
          rtoTaxCompany: "",
          roadSideAssistance: "",
          rubberMattingKit: "",
          fourthFifthYearExtendedWarranty: "",
          additionalPremiumOnEngineProtection: "",
          additionalPremiumOnReturnToInvoice: "",
          fiveYearsorSixtyKmShiedOfTrust: "",
          totalIndividualOnRoad: "",
          totalCompanyOnRoad: "",
          basicAccessoriesKit: ""
        },
        exStockyard:0,
        freight:0,
        igstPercentage:0,
        cessPercentage:0,
        tcsPercentage:0,
        dealerCommision:0,
        gstPercentage:0,
        cess2Percentage:0,
        tcsOnExShowroomPercentage:0,
        insurancePerc1:0,
        insurancePerc2:0,
        insuranceAdditionalAmount:0,
        insuranceAmount2Perc:0,
        miscellaneousExpenses:0,
        rsa:0,
        rmk:0,
        rtoIndividualPercentage:0,
        registrationFee:0,
        fourthAnd5thYearExtendedWarrantyOnAmount:0,
        fourthAnd5thYearExtendedWarrantyPercentage:0,
        rtoCompanyPercentage:0,
        additionalPremiumForEngineProtectionPercentage1:0,
        additionalPremiumForEngineProtectionPercentage2:0,
        additionalPremiumForRTIPercentage1:0,
        additionalPremiumForRTIPercentage2:0,
        sheildOfTrustAmount:0,
        sheildOfTrustPercentage:0
        })
        let catalogueResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue`);
        const tableDataList = await getRowsListForCatalogueItem(catalogueResponse.data);
        await setCatlogueItemTableData(tableDataList);
      }
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        { action: "Save CatalogueItem ", email: userInfo.email }
      );

      setIsCatalogueItemCreate(true);
      setRefreshpage(true);

    } catch (HTTPException) {
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Save CatalogueItem",
          typeOfVisit: "error",
          errorCode: HTTPException.response.status,
          errorMessage: HTTPException.response.message,
          email: userInfo.email,
        }
      );
    }

    setAddCatalogueItemModalVisibility(false);
    await getCatalogueItemlistByCondition()
  }

  // *************************************** Stock *************************************//
  async function getRowsListForStock(data) {
    const colList = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'Display Name',
        field: 'displayName',
        sort: 'asc'
      },
      {
        label: 'Dealership',
        field: 'dealershipName',
        sort: 'asc'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc'
      },
      {
        label: 'View',
        field: 'extraModal',
        sort: 'asc'
      }
    ];

    const rowList = data.map((p) => {
      let name = p.name;
      let displayName = p.displayName;
      let dealershipID = p.dealershipID;
      let status = p.status;
      let uuid = p.uuid
      let obej = { name, displayName, dealershipID, status, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }


  async function getStocklistByCondition() {

    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/stock?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setStockList(response.data);
        const tableDataList = await getRowsListForStock(response.data);
        stockTableData = tableDataList;
        await setStockTableData(stockTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/stock?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setStockList(response.data);
        const tableDataList = await getRowsListForStock(response.data);
        stockTableData = tableDataList;
        await setStockTableData(stockTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/stock?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setStockList(response.data);
        const tableDataList = await getRowsListForStock(response.data);
        stockTableData = tableDataList;
        await setStockTableData(stockTableData);
      } else {
        let params = await getSearchParams();
        let responce = await axios.get(`${CONSTANTS.API_URL}/api/v1/stock?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setStockList(responce.data);
        const tableDataList = await getRowsListForStock(responce.data);
        stockTableData = tableDataList;
        await setStockTableData(stockTableData);
      }
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Stock List', email: userInfo.email });

      let dealershipResponse = await axios.get(
        `${CONSTANTS.API_URL}/api/v1/getDealership`
      );
      setDealershipList(dealershipResponse.data);

      await setIsStockCreate(false);
      console.log('outer-container-div', document.getElementById('container').offsetHeight, document.getElementById('outer-container-div').offsetHeight);
      let top;
      if (document.getElementById('container').offsetHeight < document.getElementById('outer-container-div').offsetHeight) {
        top = (document.getElementById('container').offsetHeight) / 2;
      } else {
        top = (document.getElementById('outer-container-div').offsetHeight) / 2;
      }
      let leftArrow = document.getElementById('left');
      leftArrow.style.top = top + 'px';
      leftArrow.style.transform = 'translateY(-50%)';
      leftArrow.style.display = 'block';
      let rightArrow = document.getElementById('right');
      rightArrow.style.top = top + 'px';
      rightArrow.style.transform = 'translateY(-50%)';
      rightArrow.style.display = 'block';
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: 'Stock List', typeOfVisit: 'error',
          errorCode: HTTPException.response.data.statusCode,
          errorMessage: HTTPException.response.data.message,
          email: userInfo.email
        });
    }
  }

  async function updateStock(e) {
    e.preventDefault();
    try {
      let stockID = stockData.uuid;
      delete stockData.uuid;
      delete stockData.status;
      delete stockData.updatedAt;
      delete stockData.updatedBy;
      delete stockData._id;
      delete stockData.createdBy;
      delete stockData.createdAt;
      delete stockData.deletedAt;
      delete stockData.__v;
      delete stockData.version;
      delete stockData.dealershipName;
      let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateStock/${stockID}`, stockData);
      if (response) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'update Stock ', email: userInfo.email });
        setIsStockCreate(true);
        setStockDetailsModalVisibility(!isStockDetailsModalOpen);
        await getStocklistByCondition()
      }

    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Stock', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function getStockDetails(stock) {
    await setStockData({})
    await setStockData(stock);
    toggleStockDetailsModalVisibility();
  }
  async function getSelectedStockAndOpenHistoryModal(stock) {
    try {
      if (!isStockHistoryModalOpen) {
        selectedStockHistory = stock;
        setSelectedStockHistory(stock);
        const response = await axios.get(`${CONSTANTS.API_URL}/api/v1/object/${selectedStockHistory.uuid}/history?objectType=stock`);
        stockHistoryList = response.data;

        console.log(stockHistoryList);
        if (stockHistoryList.hasOwnProperty('token')) {
          setStockHistoryEmptyModalVisibility(!isStockHistoryEmpty);
        }
        else {
          setStockHistoryList(stockHistoryList);
          setStockHistoryModalVisibility(!isStockHistoryModalOpen);
        }
      }
      return 'response.data';
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleStockHistoryModal(data) {
    getSelectedStockAndOpenHistoryModal(data)
    setStockHistoryModalVisibility(!isStockHistoryModalOpen);
    setStockHistoryList([]);
  }

  async function toggleStockHistoryEmptyModal(e) {
    setStockHistoryEmptyModalVisibility(!isStockHistoryEmpty);
  }



  async function saveStock(e) {
    e.preventDefault();
    try {
      let createStock = await axios.post(`${CONSTANTS.API_URL}/api/v1/stock`, stockData);
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save Stock ', email: userInfo.email });
      setIsStockCreate(true)
      setRefreshpage(true);
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save Stock', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
    setAddStockModalVisibility(false);
    await getStocklistByCondition()
  }

  // *************************************** Stock Item *************************************//
  async function getRowsListForStockItem(data) {
    const colList = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'Display Name',
        field: 'displayName',
        sort: 'asc'
      },
      {
        label: 'Catalogue Item Name',
        field: 'catalogueItemName',
        sort: 'asc'
      },
      {
        label: 'Type',
        field: 'type',
        sort: 'asc'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc'
      },
      {
        label: 'View',
        field: 'extraModal',
        sort: 'asc'
      }
    ];

    const rowList = data.map((p) => {
      let name = p.name;
      let displayName = p.displayName;
      let catalogueItemName = p.catalogueItemName;
      let type = p.type;
      let status = p.status;

      let uuid = p.uuid
      let obej = { name, displayName, catalogueItemName, type, status, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    return listObj;
  }


  async function getStockItemlistByCondition() {
    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/stockItem?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setStockItemList(response.data);
        const tableDataList = await getRowsListForStockItem(response.data);
        stockItemTableData = tableDataList;
        await setStockItemTableData(stockItemTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/stockItem?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setStockItemList(response.data);
        const tableDataList = await getRowsListForStockItem(response.data);
        stockItemTableData = tableDataList;
        await setStockItemTableData(stockItemTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/stockItem?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setStockItemList(response.data);
        const tableDataList = await getRowsListForStockItem(response.data);
        stockItemTableData = tableDataList;
        await setStockItemTableData(stockItemTableData);
      } else {
        let params = await getSearchParams();
        let responce = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/stockItem?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`
        );
        await setStockItemList(responce.data);
        const tableDataList = await getRowsListForStockItem(responce.data);
        stockItemTableData = tableDataList;
        await setStockItemTableData(stockItemTableData);
      }
      let dealershipResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership`);
      setDealershipList(dealershipResponse.data);

      let catalogueResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue`);
      setCatalogueItemList(catalogueResponse.data);

      let thirdPartyResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/thirdParty`);
      setThirdPartyList(thirdPartyResponse.data);

      let schemesResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/schemes`);
      setSchemesList(schemesResponse.data);

      let offerResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/offer`);
      setOfferList(offerResponse.data);


      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, {
        action: "StockItem List",
        email: userInfo.email
      });
      await setIsStockItemCreate(false);

      /*
      ModifiedBy: Haresh
      Modified On: 20 July 2021
      Modification: Scroll Arrow.
      */

      // console.log(
      //   "outer-container-div",
      //   document.getElementById("container").offsetHeight,
      //   document.getElementById("outer-container-div").offsetHeight
      // );
      let top;
      if (
        document.getElementById("container").offsetHeight <
        document.getElementById("outer-container-div").offsetHeight
      ) {
        top = document.getElementById("container").offsetHeight / 2;
      } else {
        top = document.getElementById("outer-container-div").offsetHeight / 2;
      }
      let leftArrow = document.getElementById("left");
      leftArrow.style.top = top + "px";
      leftArrow.style.transform = "translateY(-50%)";
      leftArrow.style.display = "block";
      let rightArrow = document.getElementById("right");
      rightArrow.style.top = top + "px";
      rightArrow.style.transform = "translateY(-50%)";
      rightArrow.style.display = "block";
    } catch (HTTPException) {
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "StockItem List",
          typeOfVisit: "error",
          errorCode: HTTPException.response.status,
          errorMessage: HTTPException.response.message,
          email: userInfo.email
        }
      );
    }
  }
  async function updateStockItem(e) {
    e.preventDefault();
    try {
      let stockItemID = stockItemData.uuid;

      delete stockItemData['uuid']
      delete stockItemData.updatedAt;
      delete stockItemData.updatedBy;
      delete stockItemData._id;
      delete stockItemData.createdBy;
      delete stockItemData.createdAt;
      delete stockItemData.deletedAt;
      delete stockItemData.__v;
      delete stockItemData.status;
      delete stockItemData.thirdPartyName;
      delete stockItemData.dealershipCode;
      delete stockItemData.thirdPartyName;
      delete stockItemData.schemeName;
      delete stockItemData.offerName;
      delete stockItemData.catalogueItemName;

      let response = await axios.put(
        `${CONSTANTS.API_URL}/api/v1/stockItem/${stockItemID}`,
        stockItemData
      );
      if (response) {
        await axios.put(
          `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
          { action: "update StockItem ", email: userInfo.email }
        );
        setIsStockItemCreate(true);
        setStockItemDetailsModalVisibility(
          !isStockItemDetailsModalOpen
        );
        await getStockItemlistByCondition()
      }
    } catch (HTTPException) {
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Update StockItem",
          typeOfVisit: "error",
          errorCode: HTTPException.response.data.statusCode,
          errorMessage: HTTPException.response.data.message,
          email: userInfo.email,
        }
      );
    }
  }

  async function getSelectedStockItemAndOpenHistoryModal(stockItem) {
    try {
      if (!isStockItemHistoryModalOpen) {
        selectedStockItemHistory = stockItem;
        setSelectedStockItemHistory(stockItem);
        const response = await axios.get(
          `${CONSTANTS.API_URL}/api/v1/object/${selectedStockItemHistory.uuid}/history?objectType=stockItem`
        );
        stockItemHistoryList = response.data;

        if (stockItemHistoryList.hasOwnProperty("token")) {
          setStockItemHistoryEmptyModalVisibility(
            !isStockItemHistoryEmpty
          );
        } else {
          // stockItemHistoryList.map( async (history)=>{
          //   history.userName = await getUserName(history.createdBy);
          // });
          setStockItemHistoryList(stockItemHistoryList);
          setStockItemHistoryModalVisibility(
            !isStockItemHistoryModalOpen
          );
        }
      }
      return "response.data";
    } catch (e) {
      console.log(e);
    }
  }

  async function getStockItemDetails(stockItem) {
    await setStockItemData({
      name: "",
      displayName: "",
      dealershipID: '',
      type: '',
      description: '',
      modelCategory: '',
      modelName: '',
      variant: '',
      modelSubVariant: '',
      colorCode: '',
      acCompressor: '',
      fuelType: '',
      classOfVehicle: '',
      color: '',
      interiorColor: '',
      exteriorColor: '',
      grossVehicleWeight: 0,
      unladenWeight: 0,
      numberOfCylinders: 0,
      horsePowerCC: 0,
      seatingCapacity: 0,
      typeOfBody: '',
      variantCode: '',
      emissionType: '',
      hsnCode: '',
      margin: 0,
      totalCost: 0,
      discountThreshold: 0,
      purchaseFinancer: '',
      purchaseFinanceInterestRate: 0,
      purchaseFinanceAmount: 0,
      purchaseFinanceAccountNumber: '',
      compatibilityWith: '',
      thirdPartyID: "",
      vehicleIdentificationNumber: '',
      exShowroomPrice: "",
      tcsOnExShowroomPercent: "",
      tcsOnExShowroomAmount: "",
      insurance: "",
      rtoTaxIndividual: "",
      rtoTaxCompany: "",
      roadSideAssistance: "",
      rubberMattingKit: "",
      fourthFifthYearExtendedWarranty: "",
      additionalPremiumOnEngineProtection: "",
      additionalPremiumOnReturnToInvoice: "",
      fiveYearsorSixtyKmShiedOfTrust: "",
      totalIndividualOnRoad: "",
      totalCompanyOnRoad: "",
      basicAccessoriesKit: "",
      postOffer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      discounted: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      interDealershipTransfer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      }
    });
    await setStockItemData(stockItem);
    toggleStockItemDetailsModalVisibility();
  }

  async function toggleStockItemHistoryModal(data) {
    getSelectedStockItemAndOpenHistoryModal(data)
    setStockItemHistoryModalVisibility(
      !isStockItemHistoryModalOpen
    );
    setStockItemHistoryList([]);
  }

  async function toggleStockItemHistoryEmptyModal(e) {
    setStockItemHistoryEmptyModalVisibility(
      !isStockItemHistoryEmpty
    );
  }

  async function toggleAddStockItemModalVisibility() {
    setAddStockItemModalVisibility(!isAddStockItemModalOpen);
    setStockItemData({
      name: "",
      displayName: "",
      dealershipID: '',
      type: '',
      descripton: '',
      modelCategory: '',
      modelName: '',
      variant: '',
      modelSubVariant: '',
      colorCode: '',
      acCompressor: '',
      fuelType: '',
      classOfVehicle: '',
      color: '',
      interiorColor: '',
      exteriorColor: '',
      grossVehicleWeight: 0,
      unladenWeight: 0,
      numberOfCylinders: 0,
      horsePowerCC: 0,
      seatingCapacity: 0,
      typeOfBody: '',
      variantCode: '',
      emissionType: '',
      hsnCode: '',
      margin: 0,
      totalCost: 0,
      discountThreshold: 0,
      purchaseFinancer: '',
      purchaseFinanceInterestRate: 0,
      purchaseFinanceAmount: 0,
      purchaseFinanceAccountNumber: '',
      compatibilityWith: '',
      thirdPartyID: "",
      vehicleIdentificationNumber: '',
      exShowroomPrice: "",
      tcsOnExShowroomPercent: "",
      tcsOnExShowroomAmount: "",
      insurance: "",
      rtoTaxIndividual: "",
      rtoTaxCompany: "",
      roadSideAssistance: "",
      rubberMattingKit: "",
      fourthFifthYearExtendedWarranty: "",
      additionalPremiumOnEngineProtection: "",
      additionalPremiumOnReturnToInvoice: "",
      fiveYearsorSixtyKmShiedOfTrust: "",
      totalIndividualOnRoad: "",
      totalCompanyOnRoad: "",
      basicAccessoriesKit: "",
      postOffer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      discounted: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      interDealershipTransfer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      }
    });
  }

  async function toggleStockItemDetailsModalVisibilityClosed(e) {
    setStockItemDetailsModalVisibility(
      !isStockItemDetailsModalOpen
    );
    setStockItemData({
      name: "",
      displayName: "",
      dealershipID: '',
      type: '',
      descripton: '',
      modelCategory: '',
      modelName: '',
      variant: '',
      modelSubVariant: '',
      colorCode: '',
      acCompressor: '',
      fuelType: '',
      classOfVehicle: '',
      color: '',
      interiorColor: '',
      exteriorColor: '',
      grossVehicleWeight: 0,
      unladenWeight: 0,
      numberOfCylinders: 0,
      horsePowerCC: 0,
      seatingCapacity: 0,
      typeOfBody: '',
      variantCode: '',
      emissionType: '',
      hsnCode: '',
      margin: 0,
      totalCost: 0,
      discountThreshold: 0,
      purchaseFinancer: '',
      purchaseFinanceInterestRate: 0,
      purchaseFinanceAmount: 0,
      purchaseFinanceAccountNumber: '',
      compatibilityWith: '',
      thirdPartyID: "",
      vehicleIdentificationNumber: '',
      exShowroomPrice: "",
      tcsOnExShowroomPercent: "",
      tcsOnExShowroomAmount: "",
      insurance: "",
      rtoTaxIndividual: "",
      rtoTaxCompany: "",
      roadSideAssistance: "",
      rubberMattingKit: "",
      fourthFifthYearExtendedWarranty: "",
      additionalPremiumOnEngineProtection: "",
      additionalPremiumOnReturnToInvoice: "",
      fiveYearsorSixtyKmShiedOfTrust: "",
      totalIndividualOnRoad: "",
      totalCompanyOnRoad: "",
      basicAccessoriesKit: "",
      postOffer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      discounted: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      },
      interDealershipTransfer: {
        exShowroomPrice: "",
        tcsOnExShowroomPercent: "",
        tcsOnExShowroomAmount: "",
        insurance: "",
        rtoTaxIndividual: "",
        rtoTaxCompany: "",
        roadSideAssistance: "",
        rubberMattingKit: "",
        fourthFifthYearExtendedWarranty: "",
        additionalPremiumOnEngineProtection: "",
        additionalPremiumOnReturnToInvoice: "",
        fiveYearsorSixtyKmShiedOfTrust: "",
        totalIndividualOnRoad: "",
        totalCompanyOnRoad: "",
        basicAccessoriesKit: "",
      }
    });
  }
  async function toggleStockItemDetailsModalVisibility(e) {
    setStockItemDetailsModalVisibility(
      !isStockItemDetailsModalOpen
    );
  }

  async function saveStockItem(e) {
    e.preventDefault();
    console.log(stockItemData)
    try {
      let createStockItem = await axios.post(
        `${CONSTANTS.API_URL}/api/v1/stockItem`,
        stockItemData
      );
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        { action: "Save StockItem ", email: userInfo.email }
      );

      setIsStockItemCreate(true);
      setRefreshpage(true);
    } catch (HTTPException) {
      console.log(HTTPException);
      await axios.put(
        `${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
        {
          action: "Save StockItem",
          typeOfVisit: "error",
          errorCode: HTTPException.response.status,
          errorMessage: HTTPException.response.message,
          email: userInfo.email,
        }
      );
    }

    setAddStockItemModalVisibility(false);
    await getStockItemlistByCondition()
  }


  // ***************************************Schemes *************************************//
  async function getRowsListForSchemes(data) {
    const colList = [
      // {
      //   label: 'Name',
      //   field: 'name',
      //   sort: 'asc'
      // },
      {
        label: 'Name',
        field: 'displayName',
        sort: 'asc'
      },
      {
        label: 'Catalogue Name',
        field: 'catalogueName',
        sort: 'asc'
      },
      {
        label: 'Code',
        field: 'code',
        sort: 'asc'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc'
      },
      {
        label: 'View',
        field: 'extraModal',
        sort: 'asc'
      }
    ];

    const rowList = data.map((p) => {
      // let name = p.name;
      let displayName = p.displayName;
      let catalogueName = p.catalogueName;
      let code = p.code;
      let status = p.status;
      let uuid = p.uuid
      let obej = { displayName, catalogueName, code, status, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }

  async function getSchemeslistByCondition() {

    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/schemes?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setSchemesList(response.data);
        const tableDataList = await getRowsListForSchemes(response.data);
        schemesTableData = tableDataList;
        await setSchemesTableData(schemesTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/schemes?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setSchemesList(response.data);
        const tableDataList = await getRowsListForSchemes(response.data);
        schemesTableData = tableDataList;
        await setSchemesTableData(schemesTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/schemes?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setSchemesList(response.data);
        const tableDataList = await getRowsListForSchemes(response.data);
        schemesTableData = tableDataList;
        await setSchemesTableData(schemesTableData);
      } else {
        let params = await getSearchParams();
        let responce = await axios.get(`${CONSTANTS.API_URL}/api/v1/schemes?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setSchemesList(responce.data);
        const tableDataList = await getRowsListForSchemes(responce.data);
        schemesTableData = tableDataList;
        await setSchemesTableData(schemesTableData);
      }
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Oem List', email: userInfo.email });

      let catalogueResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/productcatalogue`);
      setCatalogueList(catalogueResponse.data);
      // Uncomment once stockItem CRUD done

      // let stockItemResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem`);
      // setStockItemList(stockItemResponse.data);

      let catalogueItemResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue`);
      setCatalogueItemList(catalogueItemResponse.data);

      let thirdPartyResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/thirdParty`);
      setThirdPartyList(thirdPartyResponse.data);


      await setIsSchemesCreate(false);
      console.log('outer-container-div', document.getElementById('container').offsetHeight, document.getElementById('outer-container-div').offsetHeight);
      let top;
      if (document.getElementById('container').offsetHeight < document.getElementById('outer-container-div').offsetHeight) {
        top = (document.getElementById('container').offsetHeight) / 2;
      } else {
        top = (document.getElementById('outer-container-div').offsetHeight) / 2;
      }
      let leftArrow = document.getElementById('left');
      leftArrow.style.top = top + 'px';
      leftArrow.style.transform = 'translateY(-50%)';
      leftArrow.style.display = 'block';
      let rightArrow = document.getElementById('right');
      rightArrow.style.top = top + 'px';
      rightArrow.style.transform = 'translateY(-50%)';
      rightArrow.style.display = 'block';
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Schemes List', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function updateSchemes(e) {
    e.preventDefault();
    try {
      let schemesID = schemesData.uuid;
      delete schemesData.uuid;
      delete schemesData.status;
      delete schemesData.updatedAt;
      delete schemesData.updatedBy;
      delete schemesData._id;
      delete schemesData.createdBy;
      delete schemesData.createdAt;
      delete schemesData.deletedAt;
      delete schemesData.__v;
      delete schemesData.version;
      delete schemesData.stockItemName;
      delete schemesData.thirdPartyName;
      delete schemesData.catalogueName;
      delete schemesData.catalogueItemName;
      let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateSchemes/${schemesID}`, schemesData);
      if (response) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'update Schemes ', email: userInfo.email });
        setIsSchemesCreate(true);
        setSchemesDetailsModalVisibility(!isSchemesDetailsModalOpen);
        await getSchemeslistByCondition()
      }

    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Schemes', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }


  async function getSelectedSchemesAndOpenHistoryModal(schemes) {
    try {
      if (!isSchemesHistoryModalOpen) {
        selectedSchemesHistory = schemes;
        setSelectedSchemesHistory(schemes);
        const response = await axios.get(`${CONSTANTS.API_URL}/api/v1/object/${selectedSchemesHistory.uuid}/history?objectType=schemes`);
        schemesHistoryList = response.data;
        // setSchemesHistoryList(schemesHistoryList);
        console.log(schemesHistoryList);
        if (schemesHistoryList.hasOwnProperty('token')) {
          setSchemesHistoryEmptyModalVisibility(!isSchemesHistoryEmpty);
        }
        else {

          setSchemesHistoryList(schemesHistoryList);
          setSchemesHistoryModalVisibility(!isSchemesHistoryModalOpen);
        }
      }
      return 'response.data';
    } catch (e) {
      console.log(e);
    }
  }
  async function getSchemesDetails(schemes) {
    setSchemesData({
      name: '',
      displayName: '',
      catalogueItemID: '',
      variantID: '',
      typeOfFuel: '',
      HMILShare: 0,
      dealerShare: 0,
      discountBeforeGST: 0,
      discountAfterGST: 0,
      thirdPartyID: '',
      startDate: '',
      endDate: '',
      requireDocuments: ''
      //shortName: '',
      //type: '',
      //subType: '',
      // stockItemID: '',
      // catalogueID: '',
      //code: '',
      //discount: '',
      //duration: '',
      //schemesStatus: '',
      //validity: '',
    });
    console.log(schemes,"schemessssss")
    await setSchemesData(schemes);
    toggleSchemesDetailsModalVisibility();
  }

  async function toggleSchemesHistoryModal(data) {
    getSelectedSchemesAndOpenHistoryModal(data)
    setSchemesHistoryModalVisibility(!isSchemesHistoryModalOpen);
    setSchemesHistoryList([]);
  }

  async function toggleSchemesHistoryEmptyModal(e) {
    setSchemesHistoryEmptyModalVisibility(!isSchemesHistoryEmpty);
  }
  async function toggleAddSchemesModalVisibility() {
    setAddSchemesModalVisibility(!isAddSchemesModalOpen);
    setSchemesData({
      name: '',
      displayName: '',
      catalogueItemID: '',
      variantID: '',
      typeOfFuel: '',
      HMILShare: 0,
      dealerShare: 0,
      discountBeforeGST: 0,
      discountAfterGST: 0,
      thirdPartyID: '',
      startDate: '',
      endDate: '',
      requireDocuments: ''
    });
  }

  function toggleSchemesDetailsModalVisibilityClosed(e) {
    setSchemesDetailsModalVisibility(!isSchemesDetailsModalOpen);
    setSchemesData({
      name: '',
      displayName: '',
      catalogueItemID: '',
      variantID: '',
      typeOfFuel: '',
      HMILShare: 0,
      dealerShare: 0,
      discountBeforeGST: 0,
      discountAfterGST: 0,
      thirdPartyID: '',
      startDate: '',
      endDate: '',
      requireDocuments: ''
    });
  }
  async function toggleSchemesDetailsModalVisibility(e) {
    setSchemesDetailsModalVisibility(!isSchemesDetailsModalOpen);
  }


    /*
      ModifiedBy: Vihang
      Modified On: 4 May 2022
      Modification: getting signed url for schema file ids
    */
  async function saveSchemes(e) {
    e.preventDefault();
    let createSchemes
    try {
      createSchemes = await axios.post(`${CONSTANTS.API_URL}/api/v1/schemes`, schemesData);
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'save Schemes ', email: userInfo.email });
      setIsSchemesCreate(true)
      setRefreshpage(true);
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'save Schemes', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }

    setAddSchemesModalVisibility(false);
    await getSchemeslistByCondition()

    let fileImgObj;
    if (fileUploadObj.length > 0) {
      let files = fileUploadObj[0]
      if (!files) return;
      const fileName = files.name;
      //const extension = fileName.split('.').pop();
        const fileObj = {
          name: files.name,
          size: files.size,
          type: files.type,
          value: files.name,
        };
        fileImgObj = fileObj
    }

      let payload = {
        file: fileImgObj,
        schemeID: createSchemes.data.uuid
      }

      let fileDetails
      axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payload).then(async res => {
        if (res && res.data) {
          fileDetails = res.data;
          let schemeObj = {
            fileID :fileDetails.uuid
          }
          try {
            //  Save File on S3
            const opts = {
              headers: {
                name: 'Content-Type',
                value: 'multipart/form-data',
              }
            };

            const fileUpload = await axios.put(fileDetails.signedURL, fileUploadObj[0], opts);
            if(fileUpload.status === 200) {
              let responseUpdateSchema = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateSchemes/${createSchemes.data.uuid}`, schemeObj);
              await getSchemeslistByCondition()
            }
          } catch (e) {
            console.error(e);
          }
        }
      })
  }

  async function getVariantForSelectedModel(id){
    await axios.get((`${CONSTANTS.API_URL}/api/v1/catalogue/variants?selectedCatalogueItemID=${id}`)).then( (response) => {
      let variantReponse = response.data;
      const result = [];
    const map = new Map();
    // for (const item of variantReponse) {
      variantReponse.map( item => {
        if(!map.has(item.variant)){
            map.set(item.variant, true);    // set any value to Map
            result.push(item);
        }
      })
    setVariantList(result)
    })
  }

  async function getVariantDetails(id){
    let variantReponse = await axios.get((`${CONSTANTS.API_URL}/api/v1/catalogue/variant?selectedVariantID=${id}`))
    console.log(variantReponse,'variantReponse')
    await setSelectedVariant(variantReponse.data)
  }

  // *************************************** Offer *************************************//
  async function getRowsListForOffer(data) {
    const colList = [
      // {
      //   label: 'Name',
      //   field: 'name',
      //   sort: 'asc'
      // },
      {
        label: 'Name',
        field: 'displayName',
        sort: 'asc'
      },
      {
        label: 'Offer Type',
        field: 'offerType',
        sort: 'asc'
      },
      {
        label: 'Code',
        field: 'code',
        sort: 'asc'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc'
      },
      {
        label: 'View',
        field: 'extraModal',
        sort: 'asc'
      }
    ];

    const rowList = data.map((p) => {
      // let name = p.name;
      let displayName = p.displayName;
      let offerType = p.offerType;
      let code = p.code;
      let status = p.status
      let uuid = p.uuid
      let obej = { displayName, offerType, code, status, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    return listObj;
  }

  async function getOfferlistByCondition() {

    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/offer?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setOfferList(response.data);
        const tableDataList = await getRowsListForOffer(response.data);
        offerTableData = tableDataList;
        await setOfferTableData(offerTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/offer?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setOfferList(response.data);
        const tableDataList = await getRowsListForOffer(response.data);
        offerTableData = tableDataList;
        await setOfferTableData(offerTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/offer?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setOfferList(response.data);
        const tableDataList = await getRowsListForOffer(response.data);
        offerTableData = tableDataList;
        await setOfferTableData(offerTableData);
      } else {
        let params = await getSearchParams();
        let responce = await axios.get(`${CONSTANTS.API_URL}/api/v1/offer?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setOfferList(responce.data);
        const tableDataList = await getRowsListForOffer(responce.data);
        offerTableData = tableDataList;
        await setOfferTableData(offerTableData);
      }
      let catalogueResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/productcatalogue`);
      setCatalogueList(catalogueResponse.data);

      // Uncomment once stockItem CRUD done

      // let stockItemResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem`);
      // setStockItemList(stockItemResponse.data);

      let catalogueItemResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue`);
      setCatalogueItemList(catalogueItemResponse.data);

      let dealershipResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership`);
      setDealershipList(dealershipResponse.data);

      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Offer List', email: userInfo.email });

      await setIsOfferCreate(false);
      console.log('outer-container-div', document.getElementById('container').offsetHeight, document.getElementById('outer-container-div').offsetHeight);
      let top;
      if (document.getElementById('container').offsetHeight < document.getElementById('outer-container-div').offsetHeight) {
        top = (document.getElementById('container').offsetHeight) / 2;
      } else {
        top = (document.getElementById('outer-container-div').offsetHeight) / 2;
      }
      let leftArrow = document.getElementById('left');
      leftArrow.style.top = top + 'px';
      leftArrow.style.transform = 'translateY(-50%)';
      leftArrow.style.display = 'block';
      let rightArrow = document.getElementById('right');
      rightArrow.style.top = top + 'px';
      rightArrow.style.transform = 'translateY(-50%)';
      rightArrow.style.display = 'block';
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Offer List', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function updateOffer(e) {
    e.preventDefault();
    try {
      let offerID = offerData.uuid;
      delete offerData.uuid;
      delete offerData.status;
      delete offerData.updatedAt;
      delete offerData.updatedBy;
      delete offerData._id;
      delete offerData.createdBy;
      delete offerData.createdAt;
      delete offerData.deletedAt;
      delete offerData.__v;
      delete offerData.version;
      delete offerData.stockItemName;
      delete offerData.dealershipName;
      delete offerData.catalogueName;
      delete offerData.catalogueItemName;
      let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateOffer/${offerID}`, offerData);
      if (response) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'update Offer ', email: userInfo.email });
        setIsOfferCreate(true);
        setOfferDetailsModalVisibility(!isOfferDetailsModalOpen);
        await getOfferlistByCondition()
      }

    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Offer', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function getSelectedOfferAndOpenHistoryModal(offer) {
    try {
      if (!isOfferHistoryModalOpen) {
        selectedOfferHistory = offer;
        setSelectedOfferHistory(offer);
        const response = await axios.get(`${CONSTANTS.API_URL}/api/v1/object/${selectedOfferHistory.uuid}/history?objectType=offer`);
        offerHistoryList = response.data;

        console.log(offerHistoryList);
        if (offerHistoryList.hasOwnProperty('token')) {
          setOfferHistoryEmptyModalVisibility(!isOfferHistoryEmpty);
        }
        else {

          setOfferHistoryList(offerHistoryList);
          setOfferHistoryModalVisibility(!isOfferHistoryModalOpen);
        }
      }
      return 'response.data';
    } catch (e) {
      console.log(e);
    }
  }
  async function getOffersDetails(offer) {
    await setOfferData({
      name: '',
      displayName: '',
      offerType: '',
      stockItemID: '',
      catalogueID: '',
      catalogueItemID: '',
      variantID: '',
      typeOfFuel: '',
      color: '',
      dealershipID: '',
      // offerStatus: '',
      schemeOfferedBy: '',
      aging: '',
      couponCode: '',
      discount: '',
      duration: '',
      startDate: '',
      endDate: '',
      validity: '',
      vinNumber: '',
    });
    await setOfferData(offer);
    toggleOfferDetailsModalVisibility();
  }

  async function toggleOfferHistoryModal(data) {
    getSelectedOfferAndOpenHistoryModal(data)
    setOfferHistoryModalVisibility(!isOfferHistoryModalOpen);
    setOfferHistoryList([]);
  }

  async function toggleOfferHistoryEmptyModal(e) {
    setOfferHistoryEmptyModalVisibility(!isOfferHistoryEmpty);
  }

  async function toggleAddOfferModalVisibility() {
    setAddOfferModalVisibility(!isAddOfferModalOpen);
    setOfferData({
      name: '',
      displayName: '',
      offerType: '',
      stockItemID: '',
      catalogueID: '',
      catalogueItemID: '',
      variantID: '',
      typeOfFuel: '',
      color: '',
      dealershipID: '',
      // offerStatus: '',
      schemeOfferedBy: '',
      aging: '',
      couponCode: '',
      discount: '',
      duration: '',
      startDate: '',
      endDate: '',
      validity: '',
      vinNumber: '',
    });
  }

  function toggleOfferDetailsModalVisibilityClosed(e) {
    setOfferDetailsModalVisibility(!isOfferDetailsModalOpen);
    setOfferData({
      name: '',
      displayName: '',
      offerType: '',
      stockItemID: '',
      catalogueID: '',
      catalogueItemID: '',
      variantID: '',
      typeOfFuel: '',
      color: '',
      dealershipID: '',
      // offerStatus: '',
      schemeOfferedBy: '',
      aging: '',
      couponCode: '',
      discount: '',
      duration: '',
      startDate: '',
      endDate: '',
      validity: '',
      vinNumber: '',
    });
  }


  async function toggleOfferDetailsModalVisibility(e) {
    setOfferDetailsModalVisibility(!isOfferDetailsModalOpen);
  }

  async function saveOffer(e) {
    console.log(offerData,'offerDataofferDataofferData');
    e.preventDefault();
    try {
      let createOffer = await axios.post(`${CONSTANTS.API_URL}/api/v1/offer`, offerData);
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save Offer ', email: userInfo.email });

      setIsOfferCreate(true)
      setRefreshpage(true);
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save Offer', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
    setAddOfferModalVisibility(false);
    await getOfferlistByCondition()
  }

  function getDifferenceInDays(type, date) {
    console.log(offerData,'offerDataofferData');
    if ((type === 'startDate' && offerData.endDate) || (type === 'endDate' && offerData.startDate)) {
      let startDate;
      let endDate;
      if (type === 'startDate') {
        startDate = new Date(date);
        endDate = new Date(offerData.endDate);
      }
      if (type === 'endDate') {
        startDate = new Date(offerData.startDate);
        endDate = new Date(date);;
      }
      console.log(endDate,' endDate')
      console.log(startDate,'startDate')

      const diffInMs = Math.abs(endDate - startDate);
      let days = diffInMs / (1000 * 60 * 60 * 24);
      console.log(days,'daysdaysdays');
      setOfferData({
        ...offerData,
        validity: days,
      });
    }

  }

  // *************************************** Tenant *************************************//
  async function getRowsListForTenant(data) {
    const colList = [
      {
        label: 'Name',
        field: 'displayName',
        sort: 'asc'
      },
      // {
      //   label: 'Address Line1',
      //   field: 'addressLine1',
      //   sort: 'asc'
      // },
      // {
      //   label: 'Address Line2',
      //   field: 'addressLine2',
      //   sort: 'asc'
      // },
      // {
      //   label: 'Address City',
      //   field: 'addressCity',
      //   sort: 'asc'
      // },
      // {
      //   label: 'Address State',
      //   field: 'addressState',
      //   sort: 'asc'
      // },
      {
        label: 'Address Zipcode',
        field: 'addressZipcode',
        sort: 'asc'
      },
      {
        label: 'Contact Name',
        field: 'contactPersonName',
        sort: 'asc'
      },
      {
        label: 'Contact Email',
        field: 'contactPersonEmail',
        sort: 'asc'
      },
      {
        label: 'Contact No',
        field: 'contactPersonMobile',
        sort: 'asc'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc'
      },
      {
        label: 'View',
        field: 'extraModal',
        sort: 'asc'
      }
    ];

    const rowList = data.map((p) => {
      let displayName = p.displayName;
      // let addressLine1 = p.addressLine1;
      // let addressLine2 = p.addressLine2;
      // let addressCity = p.addressCity;
      // let addressState = p.addressState;
      let addressZipcode = p.addressZipcode;
      let contactPersonName = p.contactPersonName;
      let contactPersonEmail = p.contactPersonEmail;
      let contactPersonMobile = p.contactPersonMobile;
      let status = p.status;
      let history = "View"
      let uuid = p.uuid
      let obej = { displayName, addressZipcode, contactPersonName, contactPersonEmail, contactPersonMobile, status, history, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }

  async function getTenantList() {
    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/tenants?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setTenantList(response.data);
        const tableDataList = await getRowsListForTenant(response.data);
        tenantTableData = tableDataList;
        await setTenantTableData(tenantTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/tenants?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setTenantList(response.data);
        const tableDataList = await getRowsListForTenant(response.data);
        tenantTableData = tableDataList;
        await setTenantTableData(tenantTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/tenants?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setTenantList(response.data);
        const tableDataList = await getRowsListForTenant(response.data);
        tenantTableData = tableDataList;
        await setTenantTableData(tenantTableData);
      } else {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/tenants?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setTenantList(response.data);
        const tableDataList = await getRowsListForTenant(response.data);
        tenantTableData = tableDataList;
        await setTenantTableData(tenantTableData);
      }
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Get Tenant List', email: userInfo.email });
      /*
            ModifiedBy: Haresh
            Modified On: 20 July 2021
            Modification: Scroll Arrow.
            */
      console.log(
        "outer-container-div",
        document.getElementById("container").offsetHeight,
        document.getElementById("outer-container-div").offsetHeight
      );
      let top;
      if (
        document.getElementById("container").offsetHeight <
        document.getElementById("outer-container-div").offsetHeight
      ) {
        top = document.getElementById("container").offsetHeight / 2;
      } else {
        top = document.getElementById("outer-container-div").offsetHeight / 2;
      }
      let leftArrow = document.getElementById("left");
      leftArrow.style.top = top + "px";
      leftArrow.style.transform = "translateY(-50%)";
      leftArrow.style.display = "block";
      let rightArrow = document.getElementById("right");
      rightArrow.style.top = top + "px";
      rightArrow.style.transform = "translateY(-50%)";
      rightArrow.style.display = "block";
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update role', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function getSelectedTenantAndOpenHistoryModal(tenant) {
    try {
      if (!isBranchHistoryModalOpen) {
        selectedBranchHistory = tenant;
        setSelectedBranchHistory(tenant);
        const response = await axios.get(`${CONSTANTS.API_URL}/api/v1/object/${selectedBranchHistory.uuid}/history?objectType=tenant`);
        tenantHistoryList = response.data;
        // setTenantHistoryList(tenantHistoryList);
        console.log(tenantHistoryList);
        if (tenantHistoryList.hasOwnProperty('token')) {
          setBranchHistoryEmptyModalVisibility(!isBranchHistoryEmpty);
        }
        else {
          // tenantHistoryList.map( async (history)=>{
          //   history.userName = await getUserName(history.createdBy);
          // });
          setBranchHistoryList(tenantHistoryList);
          setBranchHistoryModalVisibility(!isBranchHistoryModalOpen);
        }
      }
      return 'response.data';
    } catch (e) {
      console.log(e);
    }
  }
  async function getTenantDetails(teanat) {
    await setTenantData({
      name: '',
      displayName: '',
      addressLine1: '',
      addressLine2: '',
      addressCity: '',
      addressState: '',
      addressZipcode: '',
      contactPersonName: '',
      contactPersonEmail: '',
      contactPersonMobile: '',
      keyPersonName: '',
      keyPersonEmail: '',
      keyPersonMobile: '',
      keyPersonAddress: ''
    })
    await setTenantData(teanat);
    toggleTenantDetailsModalVisibility();
  }

  async function toggleTenantHistoryModal(data) {
    getSelectedTenantAndOpenHistoryModal(data)
    setBranchHistoryModalVisibility(!isBranchHistoryModalOpen);
    setBranchHistoryList([]);
  }

  async function toggleTenantHistoryEmptyModal(e) {
    setBranchHistoryEmptyModalVisibility(!isBranchHistoryEmpty);
  }
  async function toggleAddTenantModalVisibility() {
    setAddTenantModalVisibility(!isAddTenantModalOpen);
    setTenantData({
      name: '',
      displayName: '',
      addressLine1: '',
      addressLine2: '',
      addressCity: '',
      addressState: '',
      addressZipcode: '',
      contactPersonName: '',
      contactPersonEmail: '',
      contactPersonMobile: '',
      keyPersonName: '',
      keyPersonEmail: '',
      keyPersonMobile: '',
      keyPersonAddress: ''
    })
  }

  async function toggleTenantDetailsModalVisibilityClosed() {
    setTenantDetailsModalVisibility(!isTenantDetailsModalOpen);
    setTenantData({
      name: '',
      displayName: '',
      addressLine1: '',
      addressLine2: '',
      addressCity: '',
      addressState: '',
      addressZipcode: '',
      contactPersonName: '',
      contactPersonEmail: '',
      contactPersonMobile: '',
      keyPersonName: '',
      keyPersonEmail: '',
      keyPersonMobile: '',
      keyPersonAddress: ''
    })
  }

  async function toggleTenantDetailsModalVisibility() {
    setTenantDetailsModalVisibility(!isTenantDetailsModalOpen);
  }

  async function updateTenant(e) {
    e.preventDefault();
    try {
      let updateObj = {
        name: tenantData.name,
        displayName: tenantData.displayName,
        addressLine1: tenantData.addressLine1,
        addressLine2: tenantData.addressLine2,
        addressCity: tenantData.addressCity,
        addressState: tenantData.addressState,
        addressZipcode: tenantData.addressZipcode,
        contactPersonName: tenantData.contactPersonName,
        contactPersonEmail: tenantData.contactPersonEmail,
        contactPersonMobile: tenantData.contactPersonMobile,
        keyPersonName: tenantData.keyPersonName,
        keyPersonEmail: tenantData.keyPersonEmail,
        keyPersonMobile: tenantData.keyPersonMobile,
        keyPersonAddress: tenantData.keyPersonAddress
      }
      let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/tenant/${tenantData.uuid}`, updateObj);
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'update tenant', email: userInfo.email });
      isRefreshpage = true;
      setRefreshpage(isRefreshpage);
      setTenantData({});
      setTenantDetailsModalVisibility(false);
      await getTenantList()
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'save tenant', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function saveTenant(e) {
    e.preventDefault();
    try {
      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/tenant`, tenantData);
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'save tenant', email: userInfo.email });
      isRefreshpage = true;
      setRefreshpage(isRefreshpage);
      setTenantData({});
      setAddTenantModalVisibility(false);
      await getTenantList()
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'save tenant', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function createDataset(data) {
    let datasetObj = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        }, {
          label: 'Display Name',
          field: 'displayName',
          sort: 'desc',
        }, {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        }, {
          label: 'Mobile',
          field: 'mobile',
          sort: 'asc',
        }, {
          label: 'Designation',
          field: 'designation',
          sort: 'desc',
        }, {
          label: 'Department Name',
          field: 'departmentName',
          sort: 'asc',
        }, {
          label: 'Branch Name',
          field: 'branchName',
          sort: 'asc',
        }, {
          label: 'Role Name',
          field: 'roleName',
          sort: 'desc',
        }, {
          label: 'History',
          field: 'status',
          sort: 'asc',
        }
      ],
      rows: data
    }
    dataset = datasetObj;
    await setDataSet(dataset);
  }

  async function getCount() {
    console.log("GetCount method")
    if (activePageTabItem === "Third Party") {
      const TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/thirdParty/count?activationStatus=all`);
      console.log("ThirdParty Count--->", TOTAL.data.COUNT)
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Finance") {
      const TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/finance/count?activationStatus=all`);
      console.log("Finance Count--->", TOTAL.data.COUNT)
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Catalogue") {
      const TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/productcatalogue/count?activationStatus=all`);
      console.log("Catalogue Count--->", TOTAL.data.COUNT)
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Catalogue Item") {
      const TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue/count?activationStatus=all`);
      console.log("Catalogue Item Count--->", TOTAL.data.COUNT)
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Stock") {
      const TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/stock/count?activationStatus=all`);
      console.log("Stock Count--->", TOTAL.data.COUNT)
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Stock Item") {
      const TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem/count?activationStatus=all`);
      console.log("StockItem Count--->", TOTAL.data.COUNT)
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Schemes") {
      const TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/schemes/count?activationStatus=all`);
      console.log("Scheme Count--->", TOTAL.data.COUNT)
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Offers") {
      const TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/offer/count?activationStatus=all`);
      console.log("Offers Count--->", TOTAL.data.COUNT)
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Tenant") {
      const TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/tenants/count?activationStatus=all`);
      console.log("Tenant Count--->", TOTAL.data.COUNT)
      return TOTAL.data.COUNT;
    }
  }

  async function onChangePageClick(pageNo) {
    currentPageNo = pageNo;
    await setCurrentPageNo(currentPageNo);
    if (activePageTabItem === "Third Party") {
      console.log("Third Party");
      await getThirdPartylistByCondition();
    }
    else if (activePageTabItem === "Catalogue") {
      console.log("Catalogue");
      await getCataloguelistByCondition();
    }
    else if (activePageTabItem === "Catalogue Item") {
      console.log("Catalogue ITem");
      await getCatalogueItemlistByCondition();
    }
    else if (activePageTabItem === "Stock") {
      console.log("Stock");
      await getStocklistByCondition();
    }
    else if (activePageTabItem === "Stock Item") {
      console.log("StockItem");
      await getStockItemlistByCondition();
    }
    else if (activePageTabItem === "Schemes") {
      console.log("Schemes");
      await getSchemeslistByCondition();
    }
    else if (activePageTabItem === "Offers") {
      console.log("Offers");
      await getOfferlistByCondition();
    }
    else if (activePageTabItem === "Tenant") {
      console.log("Tenant");
      await getTenantList();
    }
    await getUserCount();
  }

  async function onPageSizeChange(newPageSize) {
    pageSize = newPageSize;
    if (totalPages > 0 && currentPageNo > Math.ceil(totalPages / pageSize)) {
      currentPageNo = Math.ceil(totalPages / pageSize)
      await setCurrentPageNo(currentPageNo);
    }
    // console.log("currentPageNo = ",currentPageNo , "ttotalPages=",totalPages, " pageSize = ",newPageSize)
    // if (currentPageNo > Math.ceil(totalPages / pageSize)) {
    //   currentPageNo = Math.ceil(totalPages / pageSize)
    //   await setCurrentPageNo(currentPageNo);
    // }
    await setPageSize(pageSize);
    if (activePageTabItem === "Third Party") {
      // console.log("Third Party");
      await getThirdPartylistByCondition();
    }
    else if (activePageTabItem === "Catalogue") {
      // console.log("Catalogue");
      await getCataloguelistByCondition();
    }
    else if (activePageTabItem === "Catalogue Item") {
      // console.log("Catalogue ITem");
      await getCatalogueItemlistByCondition();
    }
    else if (activePageTabItem === "Stock") {
      // console.log("Stock");
      await getStocklistByCondition();
    }
    else if (activePageTabItem === "Stock Item") {
      // console.log("StockItem");
      await getStockItemlistByCondition();
    }
    else if (activePageTabItem === "Schemes") {
      // console.log("Schemes");
      await getSchemeslistByCondition();
    }
    else if (activePageTabItem === "Offers") {
      // console.log("Offers");
      await getOfferlistByCondition();
    }
    else if (activePageTabItem === "Tenant") {
      // console.log("Tenant");
      await getTenantList();
    }
    await getUserCount();
  }

  async function getUserCount() {
    try {
      let totalcount;
      let params = await getSearchParams();
      delete params.pageNo;
      delete params.pageSize;
      // startLoader();
      // console.log(activePageTabItem,"Inside getUserCount================")
      if (activePageTabItem === "Third Party") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/thirdParty/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Catalogue") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/productcatalogue/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Finance") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/finance/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Catalogue Item") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/catalogue/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Stock") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/stock/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Stock Item") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/stockItem/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Schemes") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/schemes/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Offers") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/offer/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Tenant") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/tenants/count?activationStatus=all`, params);
        // return totalcount
      }
      // console.log("Total Pages ---- > ",totalcount.data.COUNT)
      await setTotalPages(totalcount.data.COUNT);
    } catch (err) {
      console.log(err)
      // console.error(HTTPException);
    }
  }

  async function getSearchParams() {
    let params = {};
    params.pageSize = pageSize;
    if (currentPageNo) {
      if (currentPageNo === 0 || (!Number(currentPageNo))) {
        currentPageNo = 1;
      }
      params['pageNo'] = currentPageNo;
    }
    return params;
  }

  async function toggleAddModalVisibility(type, e) {
    if (type === 'add') {
      await setIsEditable(false);
    }
    if (activePageTabItem === 'Third Party') {
      await toggleAddThirdPartyModalVisibility(!isAddThirdPartyModalOpen);
    } else if (activePageTabItem === 'Catalogue') {
      await toggleAddCatalogueModalVisibility(!isAddCatalogueModalOpen);
    } else if (activePageTabItem === 'Finance') {
      await toggleAddFinanceModalVisibility(!isAddFinanceModalOpen);
    } else if (activePageTabItem === 'Catalogue Item') {
      await toggleAddCatalogueItemModalVisibility(!isAddCatalogueItemModalOpen);
    } else if (activePageTabItem === 'Stock') {
      await toggleAddStockModalVisibility(!isAddStockModalOpen);
    } else if (activePageTabItem === 'Stock Item') {
      await toggleAddStockItemModalVisibility(!isAddStockItemModalOpen);
    } else if (activePageTabItem === 'Schemes') {
      await toggleAddSchemesModalVisibility(!isAddSchemesModalOpen);
    } else if (activePageTabItem === 'Offers') {
      await toggleAddOfferModalVisibility(!isAddOfferModalOpen);
    } else if (activePageTabItem === 'Tenant') {
      await toggleAddTenantModalVisibility(!isAddTenantModalOpen);
    }
  }



  async function toggleAddFinanceModalVisibility() {
    setAddFinanceModalVisibility(!isAddFinanceModalOpen);
    setFinanceData({
      displayName: "",
      isSubType: "",
      parentFinanceTypeID: "",
      address: {}
    });
  }
  async function toggleAddCatalogueModalVisibility() {
    setAddCatalogueModalVisibility(!isAddCatalogueModalOpen);
    setCatalogueData({
      typeOfCatalogue: "",
      typeOfProduct: "",
      dealershipID: "",
      OemID: ''
    });
  }

  async function toggleCatalogueDetailsModalVisibilityClosed(e) {
    setCatalogueDetailsModalVisibility(
      !isCatalogueDetailsModalOpen
    );
    setCatalogueData({
      typeOfCatalogue: "",
      typeOfProduct: "",
      dealershipID: "",
      OemID:''
    });
  }
  async function toggleCatalogueDetailsModalVisibility(e) {
    setCatalogueDetailsModalVisibility(
      !isCatalogueDetailsModalOpen
    );
  }

  async function toggleFinanceDetailsModalVisibility(e) {
    setFinanceDetailsModalVisibility(
      !isFinanceDetailsModalOpen
    );
  }





  async function toggleAddStockModalVisibility() {
    setAddStockModalVisibility(!isAddStockModalOpen);
    setStockData({
      name: '',
      displayName: '',
      dealershipID: ''
    });
  }

  function toggleStockDetailsModalVisibilityClosed(e) {
    setStockDetailsModalVisibility(!isStockDetailsModalOpen);
    setStockData({
      name: '',
      displayName: '',
      dealershipID: ''
    });
  }

  async function toggleStockDetailsModalVisibility(e) {
    setStockDetailsModalVisibility(!isStockDetailsModalOpen);
  }



  async function toggleEditProductModalNewVisibility() {
    await setIsEditable(!isEdit);
    await toggleAddModalVisibility('edit');
  }


  function toggleSearchFilterPopup(e) {
    e.preventDefault();
    setSearchFilterPopup(!isSearchFilterPopup);
  }
  function toggleSettingsDropdown(e) {
    e.preventDefault();
    setSettingsDropdownVisibility(!isSettingsDropdownOpen);
  }
  function toggleStatusDropDown(e) {
    e.preventDefault();
    setStatusDropdownVisibility(!isStatusDropdownOpen);
  }
  async function changeActiveTab(tabName) {
    if (tabName !== 'More') {
      setActivePageTabItem(tabName)
    }
    await setCurrentPageNo(1)
  }

  async function getCatalogueForFilter(catalogue) {
    setSelectedCatalogueID(catalogue.uuid)
    document.getElementById('Catalogue Item').click();
  }

  // async function getFilteredCatalogueItem(catalogueID) {
  //   let getFilteredCatalogueItem = catalogueItemList && catalogueItemList.length && catalogueItemList.filter((ele)=>ele.catalogueID === catalogueID);
  //   console.log(getFilteredCatalogueItem)
  //   setFilteredCatalogueItem(getFilteredCatalogueItem)
  // }

  // useEffect(async()=>{
  //   if(selectedCatalogueID)
  //     await getFilteredCatalogueItem(selectedCatalogueID)
  //   else{
  //     await setFilteredCatalogueItem(catalogueItemList)
  //   }
  //   const tableDataList = await getRowsListForCatalogueItem(filteredCatalogueItem);
  //   catalogueItemTableData = tableDataList;
  //   await setCatlogueItemTableData(catalogueItemTableData);
  // },[selectedCatalogueID,catalogueItemList])

  // useEffect(async ()=>{

  // },[currentPageNo]);

  useEffect(async () => {
    function initAccordion(elem, option) {
      document.addEventListener('click', (e) => {
        // Daca elementul nu este .acc-title, nu fa nimic
        console.log(e.target.matches(elem + ' .acc-title'), elem, e.target);
        if (!e.target.matches(elem + ' .acc-title')) return;

        // Daca parintele (.acc-container) lui .acc-title are clasa .acc-active
        if (!e.target.parentElement.classList.contains('acc-active')) {
          // Daca option==true, sterge clasa .acc-active pentru celelalte elemente
          if (option === true) {
            let elementList = document.querySelectorAll(elem + ' .acc-container');
            Array.prototype.forEach.call(elementList, (e) => {
              e.classList.remove('acc-active');
            });
          }
          // Daca nu are clasa .acc-active, adauga clasa .acc-active
          e.target.parentElement.classList.add('acc-active');
        } else {
          // Daca are clasa .acc-active, remove clasa .acc-active
          e.target.parentElement.classList.remove('acc-active');
        }

      });
    }
    initAccordion('.accordion.acc-single-open', true)
  }, [activePageTabItem]);

  async function removeImg(e,type) {
    let removeIndex
    let remainingImg = uploadImgArray.filter(async (img, index) => {
      if (img[0].name === e.target.id) {
        removeIndex = index
      }
    })
    if (removeIndex || removeIndex === 0) {
      uploadImgArray.splice(removeIndex, 1)
      await setUploadImgArry(uploadImgArray)

    if(type === "update") {
      console.log(document.getElementById(`uploadImg${e.target.id}`).remove())
      document.getElementById("catalogueImageIdsUpdate").value = null;
    }
      document.getElementById(`uploadImg${e.target.id}`).remove()
      document.getElementById("catalogueImageIds").value = null;
    } else {
      return
    }

}


  async function preview_image(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      let reader = new FileReader();
      let outer_perview_div = document.getElementById('uploadPackagePhotoPreview')
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

  }

  async function preview_image_update(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      let reader = new FileReader();
      let outer_perview_div = document.getElementById('uploadPackagePhotoPreviewUpdate')
      let inside_perview_div = document.createElement('div');
      let crossTip_span = document.createElement('span');
      let output = document.createElement('img');
      inside_perview_div.setAttribute('class', 'catalogueImgUpdate')
      inside_perview_div.setAttribute('id', `uploadImg${event.target.files[i].name}`)
      crossTip_span.setAttribute('class', 'crossTipUpdate')
      crossTip_span.innerHTML = '×'
      crossTip_span.setAttribute('id', `${event.target.files[i].name}`)
      crossTip_span.addEventListener('click', async (e) => removeImg(e,"update"))
      output.setAttribute('class', 'w-80 h-80  m-all border-black  min-h-80 min-w-100')
      inside_perview_div.append(output)
      inside_perview_div.append(crossTip_span)
      outer_perview_div.append(inside_perview_div)
      reader.onload = function () {
        output.src = reader.result;
      }
      reader.readAsDataURL(event.target.files[i]);

    }

  }

  async function uploadCatalogueImage(e,type) {
    uploadImgArray.push(e.target.files);
    await setUploadImgArry(uploadImgArray)
    await preview_image(e);
    if(type === "update") {
      await preview_image_update(e)
    }
  }

  function togglePriceBreakup() {
    setPriceBreakup(!isPriceBreakup);
  }

  return (
    <div>
      {
        mainTabOptions && mainTabOptions.lentgh !== 0 && (
          <Tabs mainTabOptions={mainTabOptions}
            moreTabOptions={moreTabOptions}
            menuDropdownPositions={menuDropdownPositions}
            isMenuDropDownConfigurable={isTabsConfigurable}
            activePageTabItem={activePageTabItem}
            changeActiveTab={changeActiveTab}
          />
        )
      }
      <div class="main-header">
        <div class="main-header-container">
          <div class="header-title">
            <span class="header-title-name" title={activePageTabItem}>{activePageTabItem}</span>
            <span class="header-title-star active" title="Add page to left menu" />
            {/*<span class="header-title-star deactive" title="Remove page from left menu"></span>
          <img class="header-title-star" title="Add page to left menu" src="/assets/images/deactiveStar.svg"></img>
          <img class="header-title-star" title="Remove page from left menu" src="/assets/images/activeStar.svg"></img>*/}
          </div>
          <div class="header-filter-search-flexible">
            <div class="header-filter-search" onClick={(e) => toggleSearchFilterPopup(e)}>
              <div class="inner-search">
                <div class="text">
                  All in progress (28)
                </div>
                <div class="cross" />
              </div>
              <input class="search-input inner-search color-theme" type="text" placeholder="Enter keyword to search" title="Search" />
              <div class="search-cross">
                <div class="search-icon" />
                <div class="cross-icon" />
              </div>
            </div>
            {
              isSearchFilterPopup && (
                <div class="search-popup-main-body">
                  <div class="search-popup-outer">
                    <div class="search-popup-inner">
                      <div class="search-popup-inner-padding">
                        <div class="search-popup-inner-filter-container">
                          <div class="filter-header">
                            <h5>FILTERS</h5>
                          </div>
                          <div class="filter-content">
                            <div class="filter-content-item filter-selected-item">
                              {/*<span class="filter-item-icons filter-icon-drag" />*/}
                              <span class="filter-item-container">
                                <span class="filter-item-text" style="font-weight:300">leads in progress</span>
                              </span>
                              {/*<span class="filter-item-icons filter-icon-pin" />
                              <span class="filter-item-icons filter-icon-edit" />
                              <span class="filter-item-icons filter-icon-delete" />*/}
                              <div class="filter-item-settings filter-item-settings-selected" />
                            </div>
                            <div class="filter-content-item">
                              {/*<span class="filter-item-icons filter-icon-drag" />*/}
                              <span class="filter-item-container">
                                <span class="filter-item-text" style="font-weight:300">All in progress</span>
                              </span>
                              {/*<span class="filter-item-icons filter-icon-pin" />
                              <span class="filter-item-icons filter-icon-edit" />
                              <span class="filter-item-icons filter-icon-delete" />*/}
                              <div class="filter-item-settings" />
                            </div>
                            <div class="filter-content-item">
                              {/*<span class="filter-item-icons filter-icon-drag" />*/}
                              <span class="filter-item-container">
                                <span class="filter-item-text" style="font-weight:300">All closed</span>
                              </span>
                              {/*<span class="filter-item-icons filter-icon-pin" />
                              <span class="filter-item-icons filter-icon-edit" />
                              <span class="filter-item-icons filter-icon-delete" />*/}
                              <div class="filter-item-settings" />
                            </div>
                          </div>
                        </div>
                        <div class="filter-create-container">
                          <div>
                            <div class="field-container field-title-position">
                              <span class="field-title">Name</span>
                              <input class="input-field" value="Rutuja" />
                              <div class="clear-input-field-container">
                                <span class="clear-input-icon" />
                              </div>
                              <span class="field-delete-icon" />
                              <span class="field-drag-icon" />
                            </div>
                            <div class="field-container field-title-position">
                              <span class="field-title">Communication</span>
                              <div class="field-style field-select-div" />
                              <span class="field-delete-icon" />
                              <span class="field-drag-icon" />
                            </div>
                            <div class="field-container field-title-position">
                              <span class="field-title" >Status</span>

                              <div onClick={(e) => toggleStatusDropDown(e)} class="field-style field-select-div" />
                              <span class="field-delete-icon" />
                              <span class="field-drag-icon" />
                              {
                                isStatusDropdownOpen && (
                                  <div style='position: relative;border:1px solid #e2e2e2'>
                                    <label style="font-size:12px; font-weight: 100; margin-top:5px;margin-bottom:5px;">
                                      <input type="checkbox" /> Enquiry
                                    </label>
                                    <label style="font-size:12px; font-weight: 100; margin-top:5px;margin-bottom:5px;">
                                      <input type="checkbox" /> Test Drive
                                    </label>
                                    <label style="font-size:12px; font-weight: 100; margin-top:5px;margin-bottom:5px;">
                                      <input type="checkbox" /> Booking
                                    </label>
                                    <label style="font-size:12px; font-weight: 100; margin-top:5px;margin-bottom:5px;">
                                      <input type="checkbox" /> Retail
                                    </label>
                                    <label style="font-size:12px; font-weight: 100; margin-top:5px;margin-bottom:5px;">
                                      <input type="checkbox" /> Delivery
                                    </label>
                                  </div>
                                )}
                            </div>
                            <div class="field-container field-title-position">
                              <span class="field-title">Source</span>
                              <div class="field-style field-select-div" />
                              <span class="field-delete-icon" />
                              <span class="field-drag-icon" />
                            </div>


                          </div>
                        </div>
                        <div class="popup-footer">
                          <div class="save-filter">
                            <span class="title">Save filter</span>
                            <span class="gear" />
                            <span class="reset-filter">Reset Filter</span>
                          </div>
                          <div class="buttons-container">
                            <div class="buttons-inner">
                              <button class="search-button" style="font-size:12px;padding: 0 20px;"><img src="/assets/images/search.svg" />Search</button>
                              <button class="reset-button" style="font-size:12px;padding: 0 20px;">Reset</button>
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
          {activePageTabItem === 'Catalogue Item' &&
            <div class="text" style="width:150px;margin-right:15px">
              <select value={selectedCatalogueID} onChange={(e) => { setSelectedCatalogueID(e.target.value) }}>
                <option value="">Select Catalogue</option>
                {catalogueList.map((catalogue) => {
                  return <option value={catalogue.uuid}>{`${catalogue.typeOfCatalogue}-${catalogue.typeOfProduct}`}</option>
                })}
              </select>
            </div>
          }
          <div class="header-right-buttons">
            <button class="primary-button" onclick={(e) => toggleSettingsDropdown(e)}>
              <svg version="1.1" width="16px" height="16px" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" class="table-icon">
                <g>
                  <path d="M500.6,212.6l-59.9-14.7c-3.3-10.5-7.5-20.7-12.6-30.6l30.6-51c3.6-6,2.7-13.5-2.1-18.3L414,55.4    c-4.8-4.8-12.3-5.7-18.3-2.1l-51,30.6c-9.9-5.1-20.1-9.3-30.6-12.6l-14.4-59.9C297.9,4.8,291.9,0,285,0h-60    c-6.9,0-12.9,4.8-14.7,11.4l-14.4,59.9c-10.5,3.3-20.7,7.5-30.6,12.6l-51-30.6c-6-3.6-13.5-2.7-18.3,2.1L53.4,98    c-4.8,4.8-5.7,12.3-2.1,18.3l30.6,51c-5.1,9.9-9.3,20.1-12.6,30.6l-57.9,14.7C4.8,214.1,0,220.1,0,227v60    c0,6.9,4.8,12.9,11.4,14.4l57.9,14.7c3.3,10.5,7.5,20.7,12.6,30.6l-30.6,51c-3.6,6-2.7,13.5,2.1,18.3L96,458.6    c4.8,4.8,12.3,5.7,18.3,2.1l51-30.6c9.9,5.1,20.1,9.3,30.6,12.6l14.4,57.9c1.8,6.6,7.8,11.4,14.7,11.4h60    c6.9,0,12.9-4.8,14.7-11.4l14.4-57.9c10.5-3.3,20.7-7.5,30.6-12.6l51,30.6c6,3.6,13.5,2.7,18.3-2.1l42.6-42.6    c4.8-4.8,5.7-12.3,2.1-18.3l-30.6-51c5.1-9.9,9.3-20.1,12.6-30.6l59.9-14.7c6.6-1.5,11.4-7.5,11.4-14.4v-60    C512,220.1,507.2,214.1,500.6,212.6z M255,332c-41.4,0-75-33.6-75-75c0-41.4,33.6-75,75-75c41.4,0,75,33.6,75,75    C330,298.4,296.4,332,255,332z" fill="#fff" data-original="#000000" style="" />
                </g>
              </svg>
            </button>
            <div class="header-right-right-buttons">
              <button class="primary-button" onClick={(e) => toggleAddModalVisibility('add')}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-t-20" >
        <div class="col-lg-12 no-padding">
          {thirdPartyTableData && thirdPartyTableData.columns && activePageTabItem === 'Third Party' && (
            <Table entityName='Third Party' dataset={thirdPartyTableData} editEntity={getThirdPartyDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleThirdPartyHistoryModal} />
          )}
          {financeTableData && financeTableData.columns && activePageTabItem === 'Finance' && (
            <Table entityName='Finance' dataset={financeTableData} editEntity={getFinanceDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleFinanceHistoryModal} />
          )}
          {catalogueTableData && catalogueTableData.columns && activePageTabItem === 'Catalogue' && (
            <Table entityName='Catalogue' dataset={catalogueTableData} editEntity={getCatalogueDetails} getEntityDetail={getCatalogueForFilter} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleCatalogueHistoryModal} />
          )}
          {catalogueItemTableData && catalogueItemTableData.columns && activePageTabItem === 'Catalogue Item' && (
            <Table entityName='Catalogue Item' dataset={catalogueItemTableData} editEntity={getCatalogueItemDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleCatalogueItemHistoryModal} />
          )}
          {stockTableData && stockTableData.columns && activePageTabItem === 'Stock' && (
            <Table entityName='Stock' dataset={stockTableData} editEntity={getStockDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleStockHistoryModal} />
          )}
          {stockItemTableData && stockItemTableData.columns && activePageTabItem === 'Stock Item' && (
            <Table entityName='Stock Item' dataset={stockItemTableData} editEntity={getStockItemDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleStockItemHistoryModal} />
          )}
          {schemesTableData && schemesTableData.columns && activePageTabItem === 'Schemes' && (
            <Table entityName='Schemes' dataset={schemesTableData} editEntity={getSchemesDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleSchemesHistoryModal} />
          )}
          {offerTableData && offerTableData.columns && activePageTabItem === 'Offers' && (
            <Table entityName='Offers' dataset={offerTableData} editEntity={getOffersDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleOfferHistoryModal} />
          )}
          {tenantTableData && tenantTableData.columns && activePageTabItem === 'Tenant' && (
            <Table entityName='Tenant' dataset={tenantTableData} editEntity={getTenantDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleTenantHistoryModal} />
          )}
          {activePageTabItem && (
            <div class="col-lg-12 no-padding" >
              <Pagination count={totalPages} getCount={(e) => getCount(e)} currentPageNo={currentPageNo} currentPageSize={pageSize} onPageSizeChange={(e) => onPageSizeChange(e)} onChangePageClick={(e) => onChangePageClick(e)} activePageTabItem={activePageTabItem} />
            </div>
          )}
        </div>
      </div>
      <Modal title="Add Third Party" modalSize="is-full-height"
        modalDisplay={(isAddThirdPartyModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddThirdPartyModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveThirdParty(e)} className='saveForm' >
            <div class="row" style="height:80vh; overflow:scroll">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" required value={thirdPartyData.name} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={thirdPartyData.displayName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Short Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="shortName" required value={thirdPartyData.shortName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          shortName: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="type" required value={thirdPartyData.type} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          type: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Sub Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="subType" required value={thirdPartyData.subType} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          subType: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Is In House<sup class="star-mandatory-entry">*</sup></p>
                      <input type="checkbox" checked={thirdPartyData.dmsPresent ? true : false} name="isInHouse" id="isInHouse-yes" onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          isInHouse: true
                        });
                      }} value="true" /> <label for="isInHouse-yes">Yes</label>
                        <input type="checkbox" checked={thirdPartyData.isInHouse ? false : true} name="isInHouse" id="isInHouse-no" onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          isInHouse: false
                        });
                      }} value="false" /> <label for="isInHouse-no">No</label>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">DMS Present<sup class="star-mandatory-entry">*</sup></p>
                      <input type="checkbox" checked={thirdPartyData.dmsPresent ? true : false} name="dmsPresent" id="dmsPresent-yes" onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          dmsPresent: true
                        });
                      }} value="true" /> <label for="dmsPresent-yes">Yes</label>
                        <input type="checkbox" checked={thirdPartyData.dmsPresent ? false : true} name="dmsPresent" id="dmsPresent-no" onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          dmsPresent: false
                        });
                      }} value="false" /> <label for="dmsPresent-no">No</label>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">DMS Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="dmsName" required value={thirdPartyData.dmsName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          dmsName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="address" required value={thirdPartyData.address} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          address: e.target.value,
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">GSTIN Number<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"  style='text-transform:uppercase' name="gstin"  required value={thirdPartyData.gstin}  onInput={((e)=>checkValidation(e,'GSTIN'))} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="contactPersonName" required value={thirdPartyData.contactPersonName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          contactPersonName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Email<sup class="star-mandatory-entry">*</sup></p>
                      <input type="email" name="contactPersonEmail" required value={thirdPartyData.contactPersonEmail} onInput={((e)=>checkValidation(e,'EMAIL'))}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Mobile<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number" name="contactPersonMobile" required value={thirdPartyData.contactPersonMobile} onInput={((e)=>checkValidation(e,'MOBILE NUMBER'))}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Logo</p>
                      <input type="text" name="logo" value={thirdPartyData.logo} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          logo: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Branding Color</p>
                      <input type="text" name="brandingColor" value={thirdPartyData.brandingColor} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          brandingColor: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Head Office Name</p>
                      <input type="text" name="headOfficeName" value={thirdPartyData.headOfficeName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          headOfficeName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <button type="button" class="button button-action" onClick={(e) => addField(e)}>Person +{thirdPartyData.person ? thirdPartyData.person.length : ''}</button>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                    {
                      thirdPartyData.person.map((person, i) => (
                        <div className='form_person_div'>
                           <div style="margin:8px 0;" className='person_title' key={`${i}`} >
                            <h4>Person {i+1}</h4>
                            <p class="form-label"  onClick={(e) => removeFields(e,i)} >&times;</p>
                          </div>
                          <div style="margin:8px 0;" key={`${i}`} >
                            <p class="form-label">Person Name</p>
                            <input type="text" name="personName" value={person.personName} id={i}  onChange={(e) => handleSavePerson('personName', i, e)} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Email</p>
                            <input type="email" name="email" value={person.email} id={i} onInput={((e)=>checkValidation(e,'EMAIL','person'))} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Contact Number</p>
                            <input type="number" name="contactNumber" value={person.contactNumber} id={i} onInput={((e)=>checkValidation(e,'MOBILE NUMBER','person'))} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Designation</p>
                            <input type="text" name="designation" value={person.designation} onChange={(e) => handleSavePerson('designation', i, e)} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Date Of Birth</p>
                            <input type="date" name="dateOfBirth" value={person.dateOfBirth} onChange={(e) => handleSavePerson('dateOfBirth', i, e)} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Anniversary Date</p>
                            <input type="date" name="anniversaryDate" value={person.anniversaryDate} onChange={(e) => handleSavePerson('anniversaryDate', i, e)} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Office</p>
                            <input type="text" name="office" value={person.office} onChange={(e) => handleSavePerson('office', i, e)} />
                          </div>
                        </div>
                      ))}
                    <div style="margin:8px 0;">
                      <p class="form-label">Pan Number</p>
                      <input type="text" name="pan" value={thirdPartyData.pan} style='text-transform:uppercase' onInput={(e)=> checkValidation(e,"PANCARD")}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Website Address</p>
                      <input type="text" name="websiteAddress" value={thirdPartyData.websiteAddress} onInput={(e)=> checkValidation(e,"WEBSITE")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Registered Address</p>
                      <input type="text" name="registeredAddress" value={thirdPartyData.registeredAddress} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          registeredAddress: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Office Address</p>
                      <input type="text" name="officeAddress" value={thirdPartyData.officeAddress} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          officeAddress: e.target.value,
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">Latitude</p>
                      <input type="text" name="latitude" value={thirdPartyData.latitude} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          latitude: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Longitude</p>
                      <input type="text" name="longitude" value={thirdPartyData.longitude} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          longitude: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Account Number</p>
                      <input type="number" name="accountNumber" value={thirdPartyData.accountNumber} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          accountNumber: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Bank Name</p>
                      <input type="text" name="bankName" value={thirdPartyData.bankName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          bankName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Beneficiery Name</p>
                      <input type="text" name="baneficieryName" value={thirdPartyData.baneficieryName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          baneficieryName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">IFSC Code</p>
                      <input type="text" name="ifsc" style='text-transform:uppercase' value={thirdPartyData.ifsc} onInput={(e)=> checkValidation(e,"IFSC")}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Bank Address</p>
                      <input type="text" name="bankAddress" value={thirdPartyData.bankAddress} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          bankAddress: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Shopact License Number</p>
                      <input type="text" name="shopactLicenseNumber" value={thirdPartyData.shopactLicenseNumber} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          shopactLicenseNumber: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Rating</p>
                      <input type="text" name="rating" value={thirdPartyData.rating} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          rating: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Vendor Code</p>
                      <input type="text" name="vendorCode" value={thirdPartyData.vendorCode} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          vendorCode: e.target.value,
                        });
                      }} />
                    </div>
                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" style="margin-right:5px" type='submit'>Save</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleAddThirdPartyModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Third Party Details" modalSize="is-full-height"
        modalDisplay={(isThirdPartyDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleThirdPartyDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateThirdParty(e)}>
            <div class="row" style="height:80vh; overflow:scroll">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" required value={thirdPartyData.name} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={thirdPartyData.displayName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Short Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="shortName" required value={thirdPartyData.shortName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          shortName: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="type" required value={thirdPartyData.type} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          type: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Sub Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="subType" required value={thirdPartyData.subType} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          subType: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">DMS Present<sup class="star-mandatory-entry">*</sup></p>
                      <input type="checkbox" checked={thirdPartyData.dmsPresent ? true : false} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          dmsPresent: true
                        });
                      }} value="true" /> Yes
                        <input type="checkbox" checked={thirdPartyData.dmsPresent ? false : true} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          dmsPresent: false
                        });
                      }} value="false" /> No
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">DMS Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="dmsName" required value={thirdPartyData.dmsName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          dmsName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="address" required value={thirdPartyData.address} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          address: e.target.value,
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">GSTIN Number<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="gstin" required value={thirdPartyData.gstin} style='text-transform:uppercase' onInput={(e)=> checkValidation(e,"GSTIN")}/>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="contactPersonName" required value={thirdPartyData.contactPersonName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          contactPersonName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Email<sup class="star-mandatory-entry">*</sup></p>
                      <input type="email" name="contactPersonEmail" value={thirdPartyData.contactPersonEmail} required onInput={(e)=> checkValidation(e,"EMAIL")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Mobile<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number" name="contactPersonMobile" required value={thirdPartyData.contactPersonMobile} onInput={(e)=> checkValidation(e,"MOBILE NUMBER")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Logo</p>
                      <input type="text" name="logo" value={thirdPartyData.logo} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          logo: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Branding Color</p>
                      <input type="text" name="brandingColor" value={thirdPartyData.brandingColor} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          brandingColor: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Head Office Name</p>
                      <input type="text" name="headOfficeName" value={thirdPartyData.headOfficeName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          headOfficeName: e.target.value,
                        });
                      }} />
                    </div>
                    {
                      thirdPartyData.person.map((person, i) => (
                        <div>
                          <div style="margin:8px 0;" key={`${i}`} >
                            <p class="form-label">Person Name</p>
                            <input type="text" name="personName" value={person.personName} onChange={(e) => handleSavePerson('personName', i, e)} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Email</p>
                            <input type="email" name="email" value={person.email} id={i} onInput={(e)=> checkValidation(e,"EMAIL",'person')}/>
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Contact Number</p>
                            <input type="number" name="contactNumber" value={person.contactNumber} id={i} onInput={(e)=> checkValidation(e,"MOBILE NUMBER",'person')} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Designation</p>
                            <input type="text" name="designation" value={person.designation} onChange={(e) => handleSavePerson('designation', i, e)} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Date Of Birth</p>
                            <input type="date" name="dateOfBirth" value={person.dateOfBirth} onChange={(e) => handleSavePerson('dateOfBirth', i, e)} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Anniversary Date</p>
                            <input type="date" name="anniversaryDate" value={person.anniversaryDate} onChange={(e) => handleSavePerson('anniversaryDate', i, e)} />
                          </div>
                          <div style="margin:8px 0;">
                            <p class="form-label">Person Office</p>
                            <input type="text" name="office" value={person.office} onChange={(e) => handleSavePerson('office', i, e)} />
                          </div>
                        </div>
                      ))}
                    <div style="margin:8px 0;">
                      <p class="form-label">Pan Number</p>
                      <input type="text" name="pan" value={thirdPartyData.pan} style='text-transform:uppercase'  onInput={(e)=> checkValidation(e,"PANCARD")}/>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">Website Address</p>
                      <input type="text" name="websiteAddress" value={thirdPartyData.websiteAddress} onInput={(e)=> checkValidation(e,"WEBSITE")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Registered Address</p>
                      <input type="text" name="registeredAddress" value={thirdPartyData.registeredAddress} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          registeredAddress: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Office Address</p>
                      <input type="text" name="officeAddress" value={thirdPartyData.officeAddress} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          officeAddress: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Latitude</p>
                      <input type="text" name="latitude" value={thirdPartyData.latitude} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          latitude: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Longitude</p>
                      <input type="text" name="longitude" value={thirdPartyData.longitude} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          longitude: e.target.value,
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">Account Number</p>
                      <input type="text" name="accountNumber" value={thirdPartyData.accountNumber} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          accountNumber: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Bank Name</p>
                      <input type="text" name="bankName" value={thirdPartyData.bankName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          bankName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Beneficiery Name</p>
                      <input type="text" name="baneficieryName" value={thirdPartyData.baneficieryName} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          baneficieryName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">IFSC Code</p>
                      <input type="text" name="ifsc" value={thirdPartyData.ifsc} style='text-transform:uppercase' onInput={(e)=> checkValidation(e,"IFSC")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Bank Address</p>
                      <input type="text" name="bankAddress" value={thirdPartyData.bankAddress} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          bankAddress: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Shopact License Number</p>
                      <input type="text" name="shopactLicenseNumber" value={thirdPartyData.shopactLicenseNumber} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          shopactLicenseNumber: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Rating</p>
                      <input type="text" name="rating" value={thirdPartyData.rating} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          rating: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Vendor Code</p>
                      <input type="text" name="vendorCode" value={thirdPartyData.vendorCode} onChange={(e) => {
                        setThirdPartyData({
                          ...thirdPartyData,
                          vendorCode: e.target.value,
                        });
                      }} />
                    </div>

                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" style="margin-right:5px" type='submit'>Update</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleThirdPartyDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isThirdPartyHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleThirdPartyHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      thirdPartyHistoryList.map((attachment, index) => (
                        <div class={'container-report ' + ((index % 2 === 0) ? 'left-report' : 'right-report')}>
                          <div class="content-report">
                            <p class="event-title">Changed Attribute: {attachment.changedAttribute}</p>
                            <p class="event-title">New Value: {attachment.newValue}</p>
                            <p class="event-title">Old Value: {attachment.oldValue}</p>
                            <p class="event-timestamp">By {attachment.userName} on &nbsp;
                            <em>{formatDateTime(attachment.updatedAt)} @ {formatDateTime(attachment.updatedAt, true).split(',')[1]}</em></p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleThirdPartyHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isThirdPartyHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleThirdPartyHistoryEmptyModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    No updates
                </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleThirdPartyHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal title="Add Finance" modalSize="is-full-height"
        modalDisplay={(isAddFinanceModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddFinanceModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveFinance(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >

                    <div style="margin:8px 0;">
                      <p>Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={financeData.displayName} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>


                    <div style="margin:8px 0;">
                      <p>Sub Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="isSubType" required value={financeData.isSubType} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          isSubType: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Parent Finance Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="parentFinanceTypeID" required value={financeData.parentFinanceTypeID} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          parentFinanceTypeID: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Address Line1<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="addressLine1" value={financeData.address && financeData.address.line1} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            line1: e.target.value
                          }
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Address Line2<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="addressLine2" value={financeData.address && financeData.address.line2} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            line2: e.target.value
                          }
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>City<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="city" value={financeData.address && financeData.address.city} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            city: e.target.value
                          }
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>State<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="state" value={financeData.address && financeData.address.state} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            state: e.target.value
                          }
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Pincode<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="pincode" value={financeData.address && financeData.address.pincode} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            pincode: e.target.value
                          }
                        });
                      }} />
                    </div>


                  </div>
                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">

                    <button class="button button-action" style="margin-right:5px" type='submit'>Save</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleAddFinanceModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Finance Details" modalSize="is-full-height"
        modalDisplay={(isFinanceDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleFinanceDetailsModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateFinance(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >


                    <div style="margin:8px 0;">
                      <p>Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={financeData.displayName} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>


                    <div style="margin:8px 0;">
                      <p>Sub Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="isSubType" required value={financeData.isSubType} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          isSubType: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Parent Finance Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="parentFinanceTypeID" required value={financeData.parentFinanceTypeID} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          parentFinanceTypeID: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Address Line1<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="addressLine1" value={financeData.address && financeData.address.line1} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            line1: e.target.value
                          }
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Address Line2<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="addressLine2" value={financeData.address && financeData.address.line2} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            line2: e.target.value
                          }
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>City<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="city" value={financeData.address && financeData.address.city} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            city: e.target.value
                          }
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>State<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="state" value={financeData.address && financeData.address.state} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            state: e.target.value
                          }
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Pincode<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="pincode" value={financeData.address && financeData.address.pincode} onChange={(e) => {
                        setFinanceData({
                          ...financeData,
                          address: {
                            ...financeData.address,
                            pincode: e.target.value
                          }
                        });
                      }} />
                    </div>

                  </div>
                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" style="margin-right:5px" type='submit'>Update</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleFinanceDetailsModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isStockHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleStockHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      stockHistoryList.map((attachment, index) => (
                        <div class={'container-report ' + ((index % 2 === 0) ? 'left-report' : 'right-report')}>
                          <div class="content-report">
                            <p class="event-title">Changed Attribute: {attachment.changedAttribute}</p>
                            <p class="event-title">New Value: {attachment.newValue}</p>
                            <p class="event-title">Old Value: {attachment.oldValue}</p>
                            <p class="event-timestamp">By {attachment.userName} on &nbsp;
                              <em>{formatDateTime(attachment.updatedAt)} @ {formatDateTime(attachment.updatedAt, true).split(',')[1]}</em></p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleStockHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        title="Add Catalogue"
        modalSize="is-full-height"
        modalDisplay={
          isAddCatalogueModalOpen ? "show-modal" : "hide-modal"
        }
        onClose={(e) => toggleAddCatalogueModalVisibility(e)}
      >
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveCatalogue(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p class="form-label">
                        Type Of Catalogue
                          <sup class="star-mandatory-entry">*</sup>
                      </p>
                      <select
                        value={catalogueData.typeOfCatalogue}
                        required
                        onChange={(e) => {
                          setCatalogueData({
                            ...catalogueData,
                            typeOfCatalogue: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue
                          </option>
                        <option
                          name="OEM"
                          value="OEM"
                          selected={
                            catalogueData.typeOfCatalogue === "OEM"
                          }
                        >
                          OEM
                          </option>
                        <option
                          name="Dealership"
                          value="Dealership"
                          selected={
                            catalogueData.typeOfCatalogue ===
                            "Dealership"
                          }
                        >
                          Dealership
                          </option>
                        <option
                          name="Vendor"
                          value="Vendor"
                          selected={
                            catalogueData.typeOfCatalogue === "Vendor"
                          }
                        >
                          Vendor
                          </option>
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">
                        Type Of Product
                          <sup class="star-mandatory-entry">*</sup>
                      </p>
                      <select
                        required
                        value={catalogueData.typeOfProduct}
                        onChange={(e) => {
                          setCatalogueData({
                            ...catalogueData,
                            typeOfProduct: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Product
                          </option>
                        <option
                          name="Product"
                          value="Product"
                          selected={
                            catalogueData.typeOfProduct === "Product"
                          }
                        >
                          Product
                          </option>
                        <option
                          name="Service"
                          value="Service"
                          selected={
                            catalogueData.typeOfProduct === "Service"
                          }
                        >
                          Service
                          </option>
                      </select>
                    </div>
                    {
                      catalogueData.typeOfCatalogue === "Dealership" && (
                        <div style="margin:8px 0;">
                          <p class="form-label">Dealership</p>
                          <select
                            name="dealershipID"
                            value={catalogueData.dealershipID}
                            onChange={(e) => {
                              setCatalogueData({
                                ...catalogueData,
                                dealershipID: e.target.value,
                              });
                            }}
                          >
                            <option value="" selected>
                              Select Dealership
                            </option>
                            {dealershipList &&
                              dealershipList.map((dealership) => (
                                <option value={dealership.uuid}>
                                  {dealership.name}
                                </option>
                              ))}
                          </select>
                        </div>

                      )
                    }
                    {
                      catalogueData.typeOfCatalogue === "OEM" && (
                        <div style="margin:8px 0;">
                          <p class="form-label">OEM</p>
                          <select
                            name="OemID"
                            value={catalogueData.OemID}
                            onChange={(e) => {
                              setCatalogueData({
                                ...catalogueData,
                                OemID: e.target.value,
                              });
                            }}
                          >
                            <option value="" selected>
                              Select OEM
                            </option>
                            {oemList &&
                              oemList.map((oem) => (
                                <option value={oem.uuid}>
                                  {oem.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      )
                    }

                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button
                      class="button button-action"
                      style="margin-right:5px"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      class="button button-cancel"
                      style="margin-left:5px"
                      onClick={(e) =>
                        toggleAddCatalogueModalVisibility(e)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal
        title="Catalogue Details"
        modalSize="is-full-height"
        modalDisplay={
          isCatalogueDetailsModalOpen ? "show-modal" : "hide-modal"
        }
        onClose={(e) => toggleCatalogueDetailsModalVisibilityClosed(e)}
      >
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateCatalogue(e)}>
            <div class="row" style="height:80vh; overflow:scroll">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">
                        Type Of Catalogue
                          <sup class="star-mandatory-entry">*</sup>
                      </p>
                      <select
                        value={catalogueData.typeOfCatalogue}
                        onChange={(e) => {
                          setCatalogueData({
                            ...catalogueData,
                            typeOfCatalogue: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue
                          </option>
                        <option
                          name="OEM"
                          value="OEM"
                          selected={
                            catalogueData.typeOfCatalogue === "OEM"
                          }
                        >
                          OEM
                          </option>
                        <option
                          name="Dealership"
                          value="Dealership"
                          selected={
                            catalogueData.typeOfCatalogue ===
                            "Dealership"
                          }
                        >
                          Dealership
                          </option>
                        <option
                          name="Vendor"
                          value="Vendor"
                          selected={
                            catalogueData.typeOfCatalogue === "Vendor"
                          }
                        >
                          Vendor
                          </option>
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">
                        Type Of Product
                          <sup class="star-mandatory-entry">*</sup>
                      </p>
                      <select
                        value={catalogueData.typeOfProduct}
                        onChange={(e) => {
                          setCatalogueData({
                            ...catalogueData,
                            typeOfProduct: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Product
                          </option>
                        <option
                          name="Product"
                          value="Product"
                          selected={
                            catalogueData.typeOfProduct === "Product"
                          }
                        >
                          Product
                          </option>
                        <option
                          name="Service"
                          value="Service"
                          selected={
                            catalogueData.typeOfProduct === "Service"
                          }
                        >
                          Service
                          </option>
                      </select>
                    </div>
                    {catalogueData.typeOfCatalogue === "Dealership" && (
                      <div style="margin:8px 0;">
                        <p class="form-label">
                          Dealership<sup class="star-mandatory-entry">*</sup>
                        </p>
                        <select
                          name="dealershipID"
                          required
                          value={catalogueData.dealershipID}
                          onChange={(e) => {
                            setCatalogueData({
                              ...catalogueData,
                              dealershipID: e.target.value,
                            });
                          }}
                        >
                          <option value="" selected>
                            Select Dealership
                          </option>
                          {dealershipList &&
                            dealershipList.map((dealership) => (
                              <option value={dealership.uuid}>
                                {dealership.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                    {
                      catalogueData.typeOfCatalogue === "OEM" && (
                        <div style="margin:8px 0;">
                          <p class="form-label">OEM</p>
                          <select
                            name="OemID"
                            value={catalogueData.OemID}
                            onChange={(e) => {
                              setCatalogueData({
                                ...catalogueData,
                                OemID: e.target.value,
                              });
                            }}
                          >
                            <option value="">
                              Select OEM
                            </option>
                            {oemList &&
                              oemList.map((oem) => (
                                <option value={oem.uuid} selected={
                                  catalogueData.OemID === oem.uuid
                                }>
                                  {oem.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button
                      class="button button-action"
                      style="margin-right:5px"
                      type="submit"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      class="button button-cancel"
                      style="margin-left:5px"
                      onClick={(e) =>
                        toggleCatalogueDetailsModalVisibilityClosed(e)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Catalogue Details" modalSize="is-full-height"
        modalDisplay={(isCatalogueHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleCatalogueHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-8">
              <div class="row">
                <div class="col-xs-12" style="background-color:white;height:max-content;margin-top:20px;padding:10px;">
                  <label style="margin-bottom:5px;">Type of Catalogue : </label>
                  <span>{selectedCatalogueData.typeOfCatalogue}</span>
                  <label style="margin-top:10px;margin-bottom:5px;">Type of Product : </label>
                  <span>{selectedCatalogueData.typeOfProduct}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12" style="background-color:white;height:max-content;margin-top:20px;padding:10px;">
                  <label style="margin-bottom:10px">Catalogue Items</label>
                  {/* {catalogueItemList.filter((ele)=>ele.catalogueID === selectedCatalogueData.uuid).map((ele=>{ */}
                  <Table entityName='Catalogue Item' dataset={catalogueItemTableData} editEntity={() => { }} getEntityDetail={() => { }} />
                  {/* }))} */}
                </div>
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="background-color:white;margin-top:20px;padding:10px;">
              <label style="margin-bottom:10px">Status</label>
              <span>{selectedCatalogueData.status}</span>
            </div>
            <div class="col-xs-12" style="background-color:#e2e2e2;margin-left:10px;margin-top:20px">
              <div class="col-xs-12 p-l-0 p-r-0 m-t-15">
                <div class="row">
                  <div class="col-xs-6 analytics-right-half-section" style="min-height:auto !important">
                    <div class="row accordian-row" style="overflow:auto; padding:5px">
                      <div class="accordion acc-single-open">
                        <div class="acc-container">
                          <div class="acc-title row">
                            <div class="col-xs-8">
                              <p>TimeLine</p>
                            </div>
                          </div>
                          <div class="acc-content" style="padding-left: 0px;">
                            <div>
                              <Timeline title="Contact">
                                <div class="timeline-container-content">
                                  <div class="timeline-container-list">
                                    <div class="timeline-section timeline-section-new">
                                      <div class="timeline-section-icon timeline-section-icon-new"></div>
                                      <div class="timeline-section-content">
                                        <div class="main-buttons">
                                          <div class="main-buttons-inner-container" style="height: 39px;">
                                            <div class="buttons-item buttons-item-active">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">Comment</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span><span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">Wait</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span><span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">Call</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span>
                                                <span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">SMS</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item " draggable="true" tabindex="-1">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span><span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">E-mail</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span><span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">Task</span>
                                                </span>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="timeline-content-new-detail">
                                          <textarea rows="1" class="timeline-content-new-comment-textarea" placeholder="Leave a comment" style="display: block;"></textarea>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div class="timeline-section-fixed-anchor"></div>
                                    </div>
                                    <div class="timeline-section timeline-section-live-im">
                                      <div class="timeline-section-icon timeline-section-icon-live-im"></div>
                                      <div class="timeline-section-content">
                                        <div class="timeline-content-event">
                                          <div class="timeline-content-live-im-detail">
                                            <div class="timeline-live-im-users">
                                              <div class="timeline-live-im-user-avatars">
                                                <span class="timeline-live-im-user-avatar ui-icon ui-icon-common-user">
                                                  <i style="background-image: url('/assets/images/profile.jpg');"></i>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="timeline-live-im-user-counter"></div>
                                            <div class="timeline-live-im-separator"></div>
                                            <div class="timeline-live-im-messanger timeline-live-im-message-show">
                                              <div class="timeline-live-im-time">15:54</div>
                                              <div class="timeline-live-im-message">
                                                <div class="timeline-live-im-message-text"> discussion chat created</div>
                                              </div>
                                              <div class="timeline-live-im-message-counter" style="display: none;">0</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div class="timeline-section timeline-section-planned-label">
                                        <div class="timeline-section-content">
                                          <div class="timeline-planned-label">Planned</div>
                                        </div>
                                      </div>
                                      <div class="timeline-section timeline-section-planned timeline-section-notTask">
                                        <div class="timeline-section-icon timeline-section-icon-info timeline-section-counter"></div>
                                        <div class="timeline-section-content">
                                          <div class="timeline-content-event">
                                            <div class="timeline-content-detail">You don't have any scheduled activities. Move the status, plan an activity or engage a wait.
                                                </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="timeline-section timeline-section-today-label">
                                      <div class="timeline-section-content">
                                        <div class="timeline-today-label">today</div>
                                        <button class="timeline-filter-label">Filter</button>
                                      </div>
                                    </div>
                                    <div class="timeline-section timeline-section-history timeline-section-createEntity timeline-section-last">
                                      <div class="timeline-section-icon timeline-section-icon-info"></div>
                                      <div class="timeline-section-content">
                                        <div class="timeline-content-event">
                                          <div class="timeline-content-header">
                                            <div class="timeline-content-event-title">
                                              <a href="#"> created</a>
                                            </div>
                                            <span class="timeline-content-event-time">13:34</span>
                                          </div>
                                          <div class="timeline-content-detail">
                                            <span> #38</span><br />
                                            <span>Source: Call</span>
                                          </div>
                                          <a class="ui-icon ui-icon-common-user timeline-content-detail-employee" target="_blank" title="+919623451923">
                                            <i style="background-image: url('/assets/images/profile.jpg'); background-size: 21px;"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*</div>*/}
                              </Timeline>
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
        </ModalBody>
      </Modal>
      {/* <Modal
        title="Transaction and History"
        modalSize="is-full-height"
        modalDisplay={
          isCatalogueHistoryModalOpen ? "show-modal" : "hide-modal"
        }
        onClose={(e) => toggleCatalogueHistoryModal(e)}
      >
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {catalogueHistoryList.map((attachment, index) => (
                      <div
                        class={
                          "container-report " +
                          (index % 2 === 0 ? "left-report" : "right-report")
                        }
                      >
                        <div class="content-report">
                          <p class="event-title">
                            Changed Attribute: {attachment.changedAttribute}
                          </p>
                          <p class="event-title">
                            New Value: {attachment.newValue}
                          </p>
                          <p class="event-title">
                            Old Value: {attachment.oldValue}
                          </p>
                          <p class="event-timestamp">
                            By {attachment.userName} on &nbsp;
                            <em>
                              {formatDateTime(attachment.updatedAt)} @{" "}
                              {
                                formatDateTime(
                                  attachment.updatedAt,
                                  true
                                ).split(",")[1]
                              }
                            </em>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button
                    type="button"
                    class="button button-cancel"
                    onClick={(e) => toggleCatalogueHistoryModal(e)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      {/* <Modal
        title="Transaction and History"
        modalSize="is-full-height"
        modalDisplay={
          isCatalogueHistoryEmpty ? "show-modal" : "hide-modal"
        }
        onClose={(e) => toggleCatalogueHistoryEmptyModal(e)}
      >
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">No updates</div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button
                    type="button"
                    class="button button-cancel"
                    onClick={(e) => toggleCatalogueHistoryModal(e)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal title="Add Catalogue Item" modalSize="is-full-height"
        modalDisplay={(isAddCatalogueItemModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddCatalogueItemModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveCatalogueItem(e)}>
            <div class="row" style="height:80vh; overflow:scroll">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >

                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" required value={catalogueItemData.name} onChange={(e) => {
                        setCatalogueItemData({
                          ...catalogueItemData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name</p>
                      <input type="text" name="displayName" value={catalogueItemData.displayName} onChange={(e) => {
                        setCatalogueItemData({
                          ...catalogueItemData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Catalogue</p>
                      <select
                        name="catalogueID"

                        value={catalogueItemData.catalogueID}
                        onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            catalogueID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue
                          </option>
                        {catalogueList &&
                          catalogueList.map((catalogue) => (
                            <option value={catalogue.uuid} >
                              {catalogue.typeOfCatalogue}
                            </option>
                          ))}
                      </select>
                    </div>


                    <div style="margin:8px 0;">
                      <p class="form-label">Third Party</p>
                      <select
                        name="thirdPartyID"

                        value={catalogueItemData.thirdPartyID}
                        onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            thirdPartyID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Third Party
                          </option>
                        {thirdPartyList &&
                          thirdPartyList.map((thirdParty) => (
                            <option value={thirdParty.uuid} >
                              {thirdParty.displayName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Type</p>
                      <select
                        value={catalogueItemData.type}
                        onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            type: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Type
                          </option>
                        <option
                          name="Product"
                          value="Product"
                          selected={
                            catalogueItemData.type === "Product"
                          }
                        >
                          Product
                          </option>
                        <option
                          name="Service"
                          value="Service"
                          selected={
                            catalogueItemData.type ===
                            "Service"
                          }
                        >
                          Service
                          </option>
                        <option
                          name="Accessories"
                          value="Accessories"
                          selected={
                            catalogueItemData.type === "Accessories"
                          }
                        >
                          Accessories
                          </option>
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Description</p>
                      <input type="text" name="descripton" value={catalogueItemData.descripton} onChange={(e) => {
                        setCatalogueItemData({
                          ...catalogueItemData,
                          descripton: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Link</p>
                      <input
                      type="url"
                      name="catalogueLink"
                      value={catalogueItemData.catalogueLink} onChange={(e) => {
                        setCatalogueItemData({
                          ...catalogueItemData,
                          catalogueLink: e.target.value,
                        });
                      }}
                      />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Image</p>
                      <input
                      id="catalogueImageIds"
                      type="file"
                      onChange={(e) => uploadCatalogueImage(e)}
                      />

                  </div>
                        {/* ModifiedBy: Vihang Kale
                        Date: 15/03/2021
                        Modification: new catalogue items fields added */}
                       <div style="margin:8px 0;">
                      <p>ExStockyard</p>
                      <input type="number" name="exStockyard" value={catalogueItemData.exStockyard} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          exStockyard: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Freight</p>
                      <input type="number" name="freight" value={catalogueItemData.freight} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          freight: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>IGST Percentage</p>
                      <input type="number" name="igstPercentage" value={catalogueItemData.igstPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          igstPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Cess Percentage</p>
                      <input type="number" name="cessPercentage" value={catalogueItemData.cessPercentage}  onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          cessPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>TCS Percentage</p>
                      <input type="number" name="tcsPercentage" value={catalogueItemData.tcsPercentage}  onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          tcsPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Dealer Commision</p>
                      <input type="number" name="dealerCommision" value={catalogueItemData.dealerCommision}  onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          dealerCommision: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>GST Percentage</p>
                      <input type="number" name="gstPercentage" value={catalogueItemData.gstPercentage}  onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          gstPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Cess 2 Percentage</p>
                      <input type="number" name="cess2Percentage"  value={catalogueItemData.cess2Percentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          cess2Percentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Tcs On Ex Showroom Percentage</p>
                      <input type="number" name="tcsOnExShowroomPercentage"  value={catalogueItemData.tcsOnExShowroomPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          tcsOnExShowroomPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Insurance Perc 1</p>
                      <input type="number" name="insurancePerc1"  value={catalogueItemData.insurancePerc1} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          insurancePerc1: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Insurance Perc 2</p>
                      <input type="number" name="insurancePerc2"  value={catalogueItemData.insurancePerc2} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          insurancePerc2: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Insurance Additional Amount</p>
                      <input type="number" name="insuranceAdditionalAmount"  value={catalogueItemData.insuranceAdditionalAmount} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          insuranceAdditionalAmount: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Insurance Amount 2 Perc</p>
                      <input type="number" name="insuranceAmount2Perc"  value={catalogueItemData.insuranceAmount2Perc} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          insuranceAmount2Perc: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Miscellaneous Expenses</p>
                      <input type="number" name="miscellaneousExpenses"  value={catalogueItemData.miscellaneousExpenses} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          miscellaneousExpenses: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>RSA</p>
                      <input type="number" name="rsa"  value={catalogueItemData.rsa} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          rsa: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>RMK</p>
                      <input type="number" name="rmk"  value={catalogueItemData.rmk} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          rmk: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Rto Individual Percentage</p>
                      <input type="number" name="rtoIndividualPercentage"  value={catalogueItemData.rtoIndividualPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          rtoIndividualPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Registration Fee</p>
                      <input type="number" name="registrationFee"  value={catalogueItemData.registrationFee} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          registrationFee: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Fourth And 5th Year Extended Warranty On Amount</p>
                      <input type="number" name="fourthAnd5thYearExtendedWarrantyOnAmount"  value={catalogueItemData.fourthAnd5thYearExtendedWarrantyOnAmount} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          fourthAnd5thYearExtendedWarrantyOnAmount: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Fourth And 5th Year Extended Warranty Percentage</p>
                      <input type="number" name="fourthAnd5thYearExtendedWarrantyPercentage"  value={catalogueItemData.fourthAnd5thYearExtendedWarrantyPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          fourthAnd5thYearExtendedWarrantyPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Rto Company Percentage</p>
                      <input type="number" name="rtoCompanyPercentage"  value={catalogueItemData.rtoCompanyPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          rtoCompanyPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Additional Premium For Engine Protection Percentage1</p>
                      <input type="number" name="additionalPremiumForEngineProtectionPercentage1"  value={catalogueItemData.additionalPremiumForEngineProtectionPercentage1} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          additionalPremiumForEngineProtectionPercentage1: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Additional Premium For Engine Protection Percentage2</p>
                      <input type="number" name="additionalPremiumForEngineProtectionPercentage2"  value={catalogueItemData.additionalPremiumForEngineProtectionPercentage2} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          additionalPremiumForEngineProtectionPercentage2: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Additional Premium For RTI Percentage1</p>
                      <input type="number" name="additionalPremiumForRTIPercentage1"  value={catalogueItemData.additionalPremiumForRTIPercentage1} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          additionalPremiumForRTIPercentage1: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Additional Premium For RTI Percentage2</p>
                      <input type="number" name="additionalPremiumForRTIPercentage2"  value={catalogueItemData.additionalPremiumForRTIPercentage2} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          additionalPremiumForRTIPercentage2: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Sheild Of Trust Amount</p>
                      <input type="number" name="sheildOfTrustAmount"  value={catalogueItemData.sheildOfTrustAmount} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          sheildOfTrustAmount: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Sheild Of Trust Percentage</p>
                      <input type="number" name="sheildOfTrustPercentage"  value={catalogueItemData.sheildOfTrustPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          sheildOfTrustPercentage: e.target.value,
                        });
                      }} />
                    </div>

                  <div class="fw-600 fs-1rem p-b-10 display-flex" id='uploadPackagePhotoPreview'>
                  </div>
                  {
                    catalogueItemData.catalogueImageSrc && catalogueItemData.catalogueImageSrc.length !== 0 &&
                    <div class="fw-600 fs-1rem p-b-10 " >
                      <div class="fw-600 fs-1rem p-b-10 display-flex flex-direction-row flex-wrap-wrap" >
                        {
                          catalogueItemData.catalogueImageSrc.map((cataloguePhotoSrc) => (
                            <div className='courierImg'>
                              <img id='catalogueImageSrc' src={cataloguePhotoSrc} className='w-80 h-80  m-all border-black ' />
                              <span className="crossTip" id={cataloguePhotoSrc} onClick={(e) => {
                                  let uploadCataloguePhotoID = e.target.id.split('/')[5]
                                  let remainingUploadCataloguePhotoSrc = catalogueItemData.catalogueImageSrc.filter((cataloguePhotoSrc) => cataloguePhotoSrc !== e.target.id)
                                  let remainingUploadCataloguePhotoIDs = catalogueItemData.catalogueImageIds.filter((cataloguePhotoIDs) => cataloguePhotoIDs !== uploadCataloguePhotoID)
                                  setCatalogueImgDelete(true)
                                  setCatalogueItemData({
                                    ...catalogueItemData,
                                    catalogueImageSrc: remainingUploadCataloguePhotoSrc,
                                    catalogueImageIds: remainingUploadCataloguePhotoIDs
                                  })

                              }} >×</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
              }
                  </div>


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                      <div style="margin:8px 0;">
                        <p class="form-label">Model Category</p>
                        <input type="text" name="modelCategory" value={catalogueItemData.modelCategory} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            modelCategory: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Model Name</p>
                        <input type="text" name="modelName" value={catalogueItemData.modelName} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            modelName: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Variant</p>
                        <input type="text" name="variant" value={catalogueItemData.variant} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            variant: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Model Sub Variant</p>
                        <input type="text" name="modelSubVariant" value={catalogueItemData.modelSubVariant} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            modelSubVariant: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Color Code</p>
                        <input type="text" name="colorCode" value={catalogueItemData.colorCode} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            colorCode: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Variant Code</p>
                        <input type="text" name="variantCode" value={catalogueItemData.variantCode} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            variantCode: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">HSN Code</p>
                        <input type="text" name="hsnCode" value={catalogueItemData.hsnCode} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            hsnCode: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px ;border:4px solid #003468;' >
                      <div style="margin:8px 0;">
                        <p class="form-label">Fuel Type</p>
                        <input type="text" name="fuelType" value={catalogueItemData.fuelType} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            fuelType: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Class Of Vehicle</p>
                        <input type="text" name="classOfVehicle" value={catalogueItemData.classOfVehicle} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            classOfVehicle: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Color</p>
                        <input type="text" name="color" value={catalogueItemData.color} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            color: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Interior Color</p>
                        <input type="text" name="interiorColor" value={catalogueItemData.interiorColor} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interiorColor: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">ExteriorColor</p>
                        <input type="text" name="exteriorColor" value={catalogueItemData.exteriorColor} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            exteriorColor: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Gross Vehicle Weight</p>
                        <input type="number" name="grossVehicleWeight" value={catalogueItemData.grossVehicleWeight} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            grossVehicleWeight: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Unladen Weight</p>
                        <input type="number" name="unladenWeight" value={catalogueItemData.unladenWeight} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            unladenWeight: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Number Of Cylinders</p>
                        <input type="number" name="numberOfCylinders" value={catalogueItemData.numberOfCylinders} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            numberOfCylinders: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Horse PowerCC</p>
                        <input type="number" name="horsePowerCC" value={catalogueItemData.horsePowerCC} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            horsePowerCC: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Seating Capacity</p>
                        <input type="number" name="horsePowerCC" value={catalogueItemData.seatingCapacity} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            seatingCapacity: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Type Of Body</p>
                        <input type="text" name="typeOfBody" value={catalogueItemData.typeOfBody} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            typeOfBody: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Emission Type</p>
                        <input type="text" name="emissionType" value={catalogueItemData.emissionType} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            emissionType: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}

                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Basic</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={catalogueItemData.exShowroomPrice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            exShowroomPrice: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={catalogueItemData.tcsOnExShowroomPercent} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            tcsOnExShowroomPercent: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={catalogueItemData.tcsOnExShowroomAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            tcsOnExShowroomAmount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={catalogueItemData.insurance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            insurance: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={catalogueItemData.rtoTaxIndividual} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            rtoTaxIndividual: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={catalogueItemData.rtoTaxCompany} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            rtoTaxCompany: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={catalogueItemData.roadSideAssistance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            roadSideAssistance: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={catalogueItemData.rubberMattingKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            rubberMattingKit: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={catalogueItemData.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            fourthFifthYearExtendedWarranty: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={catalogueItemData.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            additionalPremiumOnEngineProtection: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={catalogueItemData.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            additionalPremiumOnReturnToInvoice: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={catalogueItemData.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            fiveYearsorSixtyKmShiedOfTrust: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={catalogueItemData.totalIndividualOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            totalIndividualOnRoad: e.target.value,
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={catalogueItemData.totalCompanyOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            totalCompanyOnRoad: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={catalogueItemData.basicAccessoriesKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            basicAccessoriesKit: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Margin</p>
                        <input type="number" name="margin" value={catalogueItemData.margin} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            margin: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Cost</p>
                        <input type="number" name="color" value={catalogueItemData.totalCost} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            totalCost: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Discount Threshold</p>
                        <input type="number" name="color" value={catalogueItemData.discountThreshold} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discountThreshold: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Financer</p>
                        <input type="text" name="purchaseFinancer" value={catalogueItemData.purchaseFinancer} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            purchaseFinancer: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Interest Rate</p>
                        <input type="number" name="purchaseFinanceInterestRate" value={catalogueItemData.purchaseFinanceInterestRate} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            purchaseFinanceInterestRate: e.target.value,
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Amount</p>
                        <input type="number" name="purchaseFinanceAmount" value={catalogueItemData.purchaseFinanceAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            purchaseFinanceAmount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Account Number</p>
                        <input type="number" name="purchaseFinanceAccountNumber" value={catalogueItemData.purchaseFinanceAccountNumber} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            purchaseFinanceAccountNumber: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Post Offer</p>
                      <hr />

                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={catalogueItemData.postOffer && catalogueItemData.postOffer.exShowroomPrice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={catalogueItemData.postOffer && catalogueItemData.postOffer.tcsOnExShowroomPercent} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={catalogueItemData.postOffer && catalogueItemData.postOffer.tcsOnExShowroomAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={catalogueItemData.postOffer && catalogueItemData.postOffer.insurance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={catalogueItemData.postOffer && catalogueItemData.postOffer.rtoTaxIndividual} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={catalogueItemData.postOffer && catalogueItemData.postOffer.rtoTaxCompany} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={catalogueItemData.postOffer && catalogueItemData.postOffer.roadSideAssistance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={catalogueItemData.postOffer && catalogueItemData.postOffer.rubberMattingKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={catalogueItemData.postOffer && catalogueItemData.postOffer.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={catalogueItemData.postOffer && catalogueItemData.postOffer.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={catalogueItemData.postOffer && catalogueItemData.postOffer.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={catalogueItemData.postOffer && catalogueItemData.postOffer.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={catalogueItemData.postOffer && catalogueItemData.postOffer.totalIndividualOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={catalogueItemData.postOffer && catalogueItemData.postOffer.totalCompanyOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={catalogueItemData.postOffer && catalogueItemData.postOffer.basicAccessoriesKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (

                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Schemes</p>
                        <select
                          name="schemeID"

                          value={catalogueItemData.schemeID}
                          onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              schemeID: e.target.value,

                            });
                          }}
                        >
                          <option value="" selected>
                            Select Scheme
                          </option>
                          {schemesList &&
                            schemesList.map((schemes) => (
                              <option value={schemes.uuid} >
                                {schemes.displayName}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Offer</p>
                        <select
                          name="offerID"

                          value={catalogueItemData.offerID}
                          onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              offerID: e.target.value,

                            });
                          }}
                        >
                          <option value="" selected>
                            Select Offer
                          </option>
                          {offerList &&
                            offerList.map((offer) => (
                              <option value={offer.uuid} >
                                {offer.displayName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Oem To Dealership Discount</p>
                        <input type="number" name="oemToDealershipDiscount" value={catalogueItemData.oemToDealershipDiscount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            oemToDealershipDiscount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Justification</p>
                        <input type="text" name="justification" value={catalogueItemData.justification} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            justification: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Is Reconciliation Candidate</p>
                        <input type="checkbox" checked={catalogueItemData.isReconciliationCandidate ? true : false} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            isReconciliationCandidate: true
                          });
                        }} value="true" /> Yes
                        <input type="checkbox" checked={catalogueItemData.isReconciliationCandidate ? false : true} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            isReconciliationCandidate: false
                          });
                        }} value="false" /> No
                    </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (

                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Inter Dealership Transfer</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.exShowroomPrice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.tcsOnExShowroomPercent} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.tcsOnExShowroomAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.insurance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.rtoTaxIndividual} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.rtoTaxCompany} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.roadSideAssistance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.rubberMattingKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.totalIndividualOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.totalCompanyOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.basicAccessoriesKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}

                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Discounted</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={catalogueItemData.discounted && catalogueItemData.discounted.exShowroomPrice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={catalogueItemData.discounted && catalogueItemData.discounted.tcsOnExShowroomPercent} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={catalogueItemData.discounted && catalogueItemData.discounted.tcsOnExShowroomAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={catalogueItemData.discounted && catalogueItemData.discounted.insurance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={catalogueItemData.discounted && catalogueItemData.discounted.rtoTaxIndividual} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={catalogueItemData.discounted && catalogueItemData.discounted.rtoTaxCompany} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={catalogueItemData.discounted && catalogueItemData.discounted.roadSideAssistance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={catalogueItemData.discounted && catalogueItemData.discounted.rubberMattingKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={catalogueItemData.discounted && catalogueItemData.discounted.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={catalogueItemData.discounted && catalogueItemData.discounted.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={catalogueItemData.discounted && catalogueItemData.discounted.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={catalogueItemData.discounted && catalogueItemData.discounted.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={catalogueItemData.discounted && catalogueItemData.discounted.totalIndividualOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={catalogueItemData.discounted && catalogueItemData.discounted.totalCompanyOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={catalogueItemData.discounted && catalogueItemData.discounted.basicAccessoriesKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {
                    catalogueItemData.type === "Accessories" && (
                      <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                        <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Accessories</p>
                        <hr />

                        <div style="margin:8px 0;">
                          <p class="form-label">Serial Number</p>
                          <input type="text" name="serialNumber" value={catalogueItemData.serialNumber} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              serialNumber: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">HSN Code</p>
                          <input type="text" name="hsnCode" value={catalogueItemData.hsnCode} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              hsnCode: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Number</p>
                          <input type="text" name="partNumber" value={catalogueItemData.partNumber} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              partNumber: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Name</p>
                          <input type="text" name="partName" value={catalogueItemData.partName} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              partName: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Model</p>
                          <input type="text" name="model" value={catalogueItemData.model} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              model: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Type</p>
                          <input type="text" name="partType" value={catalogueItemData.partType} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              partType: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Price</p>
                          <input type="number" name="price" value={catalogueItemData.price} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              price: e.target.value,
                            });
                          }} />
                        </div>
                      </div>
                    )}


                  {
                    catalogueItemData.type === "Service" && (
                      <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                        <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Service</p>
                        <hr />
                        <div style="margin:8px 0;">
                          <p class="form-label">cost</p>
                          <input type="text" name="cost" value={catalogueItemData.cost} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              cost: e.target.value,
                            });
                          }} />
                        </div>
                        <div style="margin:8px 0;">
                          <p class="form-label">Margin</p>
                          <input type="number" name="margin" value={catalogueItemData.margin} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              margin: e.target.value,
                            });
                          }} />
                        </div>
                        <div style="margin:8px 0;">
                          <p class="form-label">Discount Threshold</p>
                          <input type="number" name="discountThreshold" value={catalogueItemData.discountThreshold} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              discountThreshold: e.target.value,
                            });
                          }} />
                        </div>
                      </div>
                    )}


                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" style="margin-right:5px" type='submit'>Save</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleAddCatalogueItemModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Catalogue Item Details" modalSize="is-full-height"
        modalDisplay={(isCatalogueItemDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleCatalogueItemDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateCatalogueItem(e)}>
            <div class="row" style="height:80vh; overflow:scroll">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >

                    <div style="margin:8px 0;">
                      <p class="form-label">Name</p>
                      <input type="text" name="name" value={catalogueItemData.name} onChange={(e) => {
                        setCatalogueItemData({
                          ...catalogueItemData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name</p>
                      <input type="text" name="displayName" value={catalogueItemData.displayName} onChange={(e) => {
                        setCatalogueItemData({
                          ...catalogueItemData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Catalogue</p>
                      <select
                        name="catalogueID"

                        value={catalogueItemData.catalogueID}
                        onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            catalogueID: e.target.value,

                          });
                        }}
                      >
                        <option value={catalogueItemData.catalogueID} selected>
                          {catalogueItemData.catalogueName}
                        </option>
                        {catalogueList &&
                          catalogueList.map((catalogue) => (
                            <option value={catalogue.uuid} >
                              {catalogue.typeOfCatalogue}
                            </option>
                          ))}
                      </select>
                    </div>


                    <div style="margin:8px 0;">
                      <p class="form-label">Third Party</p>
                      <select
                        name="thirdPartyID"

                        value={catalogueItemData.thirdPartyID}
                        onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            thirdPartyID: e.target.value,

                          });
                        }}
                      >
                        <option value={catalogueItemData.thirdPartyID} selected>
                          {catalogueItemData.thirdPartyName}
                        </option>
                        {thirdPartyList &&
                          thirdPartyList.map((thirdParty) => (
                            <option value={thirdParty.uuid} >
                              {thirdParty.displayName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Type</p>
                      <select
                        value={catalogueItemData.type}
                        onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            type: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Type
                         </option>
                        <option
                          name="Product"
                          value="Product"
                          selected={
                            catalogueItemData.type === "Product"
                          }
                        >
                          Product
                         </option>
                        <option
                          name="Service"
                          value="Service"
                          selected={
                            catalogueItemData.type ===
                            "Service"
                          }
                        >
                          Service
                         </option>
                        <option
                          name="Accessories"
                          value="Accessories"
                          selected={
                            catalogueItemData.type === "Accessories"
                          }
                        >
                          Accessories
                         </option>
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Description</p>
                      <input type="text" name="descripton" value={catalogueItemData.descripton} onChange={(e) => {
                        setCatalogueItemData({
                          ...catalogueItemData,
                          descripton: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Link</p>
                      <input
                      type="url"
                      name="catalogueLink"
                      value={catalogueItemData.catalogueLink} onChange={(e) => {
                        setCatalogueItemData({
                          ...catalogueItemData,
                          catalogueLink: e.target.value,
                        });
                      }}
                      />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Image</p>
                      <input
                      type="file"
                      id="catalogueImageIdsUpdate"
                      onChange={(e) => uploadCatalogueImage(e,"update")}
                      />

                  </div>
                  <div style="margin:8px 0;">
                      <p class="form-label">Image</p>
                      <input
                      id="catalogueImageIds"
                      type="file"
                      onChange={(e) => uploadCatalogueImage(e)}
                      />

                  </div>

                         {/* ModifiedBy: Vihang Kale
                        Date: 15/03/2021
                        Modification: new catalogue items fields added */}
                       <div style="margin:8px 0;">
                      <p>ExStockyard</p>
                      <input type="number" name="exStockyard" value={catalogueItemData.exStockyard} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          exStockyard: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Freight</p>
                      <input type="number" name="freight" value={catalogueItemData.freight} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          freight: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>IGST Percentage</p>
                      <input type="number" name="igstPercentage" value={catalogueItemData.igstPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          igstPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Cess Percentage</p>
                      <input type="number" name="cessPercentage" value={catalogueItemData.cessPercentage}  onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          cessPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>TCS Percentage</p>
                      <input type="number" name="tcsPercentage" value={catalogueItemData.tcsPercentage}  onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          tcsPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Dealer Commision</p>
                      <input type="number" name="dealerCommision" value={catalogueItemData.dealerCommision}  onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          dealerCommision: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>GST Percentage</p>
                      <input type="number" name="gstPercentage" value={catalogueItemData.gstPercentage}  onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          gstPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Cess 2 Percentage</p>
                      <input type="number" name="cess2Percentage"  value={catalogueItemData.cess2Percentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          cess2Percentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Tcs On Ex Showroom Percentage</p>
                      <input type="number" name="tcsOnExShowroomPercentage"  value={catalogueItemData.tcsOnExShowroomPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          tcsOnExShowroomPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Insurance Perc 1</p>
                      <input type="number" name="insurancePerc1"  value={catalogueItemData.insurancePerc1} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          insurancePerc1: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Insurance Perc 2</p>
                      <input type="number" name="insurancePerc2"  value={catalogueItemData.insurancePerc2} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          insurancePerc2: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Insurance Additional Amount</p>
                      <input type="number" name="insuranceAdditionalAmount"  value={catalogueItemData.insuranceAdditionalAmount} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          insuranceAdditionalAmount: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Insurance Amount 2 Perc</p>
                      <input type="number" name="insuranceAmount2Perc"  value={catalogueItemData.insuranceAmount2Perc} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          insuranceAmount2Perc: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Miscellaneous Expenses</p>
                      <input type="number" name="miscellaneousExpenses"  value={catalogueItemData.miscellaneousExpenses} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          miscellaneousExpenses: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>RSA</p>
                      <input type="number" name="rsa"  value={catalogueItemData.rsa} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          rsa: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>RMK</p>
                      <input type="number" name="rmk"  value={catalogueItemData.rmk} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          rmk: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Rto Individual Percentage</p>
                      <input type="number" name="rtoIndividualPercentage"  value={catalogueItemData.rtoIndividualPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          rtoIndividualPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Registration Fee</p>
                      <input type="number" name="registrationFee"  value={catalogueItemData.registrationFee} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          registrationFee: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Fourth And 5th Year Extended Warranty On Amount</p>
                      <input type="number" name="fourthAnd5thYearExtendedWarrantyOnAmount"  value={catalogueItemData.fourthAnd5thYearExtendedWarrantyOnAmount} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          fourthAnd5thYearExtendedWarrantyOnAmount: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Fourth And 5th Year Extended Warranty Percentage</p>
                      <input type="number" name="fourthAnd5thYearExtendedWarrantyPercentage"  value={catalogueItemData.fourthAnd5thYearExtendedWarrantyPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          fourthAnd5thYearExtendedWarrantyPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Rto Company Percentage</p>
                      <input type="number" name="rtoCompanyPercentage"  value={catalogueItemData.rtoCompanyPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          rtoCompanyPercentage: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Additional Premium For Engine Protection Percentage1</p>
                      <input type="number" name="additionalPremiumForEngineProtectionPercentage1"  value={catalogueItemData.additionalPremiumForEngineProtectionPercentage1} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          additionalPremiumForEngineProtectionPercentage1: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Additional Premium For Engine Protection Percentage2</p>
                      <input type="number" name="additionalPremiumForEngineProtectionPercentage2"  value={catalogueItemData.additionalPremiumForEngineProtectionPercentage2} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          additionalPremiumForEngineProtectionPercentage2: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Additional Premium For RTI Percentage1</p>
                      <input type="number" name="additionalPremiumForRTIPercentage1"  value={catalogueItemData.additionalPremiumForRTIPercentage1} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          additionalPremiumForRTIPercentage1: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Additional Premium For RTI Percentage2</p>
                      <input type="number" name="additionalPremiumForRTIPercentage2"  value={catalogueItemData.additionalPremiumForRTIPercentage2} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          additionalPremiumForRTIPercentage2: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Sheild Of Trust Amount</p>
                      <input type="number" name="sheildOfTrustAmount"  value={catalogueItemData.sheildOfTrustAmount} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          sheildOfTrustAmount: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Sheild Of Trust Percentage</p>
                      <input type="number" name="sheildOfTrustPercentage"  value={catalogueItemData.sheildOfTrustPercentage} onChange={(e) => {
                         setCatalogueItemData({
                          ...catalogueItemData,
                          sheildOfTrustPercentage: e.target.value,
                        });
                      }} />
                    </div>

                      <div class="fw-600 fs-1rem p-b-10 display-flex" id='uploadPackagePhotoPreviewUpdate'>
                      </div>
                      {
                        catalogueItemData.catalogueImageSrc && catalogueItemData.catalogueImageSrc.length !== 0 &&
                        <div class="fw-600 fs-1rem p-b-10 " >
                          <div class="fw-600 fs-1rem p-b-10 display-flex flex-direction-row flex-wrap-wrap" >
                            {
                              catalogueItemData.catalogueImageSrc.map((cataloguePhotoSrc) => (
                                <div className='catalogueImgUpdate'>
                                  <img id='catalogueImageSrc' src={cataloguePhotoSrc} className='w-80 h-80  m-all border-black ' />
                                  <span className="crossTipUpdate" id={cataloguePhotoSrc} onClick={(e) => {
                                      let uploadCataloguePhotoID = e.target.id.split('/')[5]
                                      let remainingUploadCataloguePhotoSrc = catalogueItemData.catalogueImageSrc.filter((cataloguePhotoSrc) => cataloguePhotoSrc !== e.target.id)
                                      let remainingUploadCataloguePhotoIDs = catalogueItemData.catalogueImageIds.filter((cataloguePhotoIDs) => cataloguePhotoIDs !== uploadCataloguePhotoID)
                                      setCatalogueImgDelete(true)
                                      setCatalogueItemData({
                                        ...catalogueItemData,
                                        catalogueImageSrc: remainingUploadCataloguePhotoSrc,
                                        catalogueImageIds: remainingUploadCataloguePhotoIDs
                                      })
                                  }} >×</span>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                  }
                  </div>


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                      <div style="margin:8px 0;">
                        <p class="form-label">Model Category</p>
                        <input type="text" name="modelCategory" value={catalogueItemData.modelCategory} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            modelCategory: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Model Name</p>
                        <input type="text" name="modelName" value={catalogueItemData.modelName} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            modelName: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Variant</p>
                        <input type="text" name="variant" value={catalogueItemData.variant} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            variant: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Model Sub Variant</p>
                        <input type="text" name="modelSubVariant" value={catalogueItemData.modelSubVariant} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            modelSubVariant: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Color Code</p>
                        <input type="text" name="colorCode" value={catalogueItemData.colorCode} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            colorCode: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Variant Code</p>
                        <input type="text" name="variantCode" value={catalogueItemData.variantCode} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            variantCode: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">HSN Code</p>
                        <input type="text" name="hsnCode" value={catalogueItemData.hsnCode} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            hsnCode: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px ;border:4px solid #003468;' >
                      <div style="margin:8px 0;">
                        <p class="form-label">Fuel Type</p>
                        <input type="text" name="fuelType" value={catalogueItemData.fuelType} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            fuelType: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Class Of Vehicle</p>
                        <input type="text" name="classOfVehicle" value={catalogueItemData.classOfVehicle} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            classOfVehicle: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Color</p>
                        <input type="text" name="color" value={catalogueItemData.color} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            color: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Interior Color</p>
                        <input type="text" name="interiorColor" value={catalogueItemData.interiorColor} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interiorColor: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">ExteriorColor</p>
                        <input type="text" name="exteriorColor" value={catalogueItemData.exteriorColor} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            exteriorColor: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Gross Vehicle Weight</p>
                        <input type="number" name="grossVehicleWeight" value={catalogueItemData.grossVehicleWeight} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            grossVehicleWeight: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Unladen Weight</p>
                        <input type="number" name="unladenWeight" value={catalogueItemData.unladenWeight} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            unladenWeight: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Number Of Cylinders</p>
                        <input type="number" name="numberOfCylinders" value={catalogueItemData.numberOfCylinders} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            numberOfCylinders: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Horse PowerCC</p>
                        <input type="number" name="horsePowerCC" value={catalogueItemData.horsePowerCC} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            horsePowerCC: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Seating Capacity</p>
                        <input type="number" name="horsePowerCC" value={catalogueItemData.seatingCapacity} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            seatingCapacity: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Type Of Body</p>
                        <input type="text" name="typeOfBody" value={catalogueItemData.typeOfBody} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            typeOfBody: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Emission Type</p>
                        <input type="text" name="emissionType" value={catalogueItemData.emissionType} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            emissionType: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}

                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Basic</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={catalogueItemData.exShowroomPrice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            exShowroomPrice: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={catalogueItemData.tcsOnExShowroomPercent} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            tcsOnExShowroomPercent: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={catalogueItemData.tcsOnExShowroomAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            tcsOnExShowroomAmount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance"
                        value={catalogueItemData.insurance}
                        onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            insurance: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={catalogueItemData.rtoTaxIndividual} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            rtoTaxIndividual: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={catalogueItemData.rtoTaxCompany} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            rtoTaxCompany: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={catalogueItemData.roadSideAssistance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            roadSideAssistance: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={catalogueItemData.rubberMattingKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            rubberMattingKit: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={catalogueItemData.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            fourthFifthYearExtendedWarranty: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={catalogueItemData.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            additionalPremiumOnEngineProtection: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={catalogueItemData.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            additionalPremiumOnReturnToInvoice: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={catalogueItemData.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            fiveYearsorSixtyKmShiedOfTrust: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={catalogueItemData.totalIndividualOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            totalIndividualOnRoad: e.target.value,
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={catalogueItemData.totalCompanyOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            totalCompanyOnRoad: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={catalogueItemData.basicAccessoriesKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            basicAccessoriesKit: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Margin</p>
                        <input type="number" name="margin" value={catalogueItemData.margin} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            margin: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Cost</p>
                        <input type="number" name="color" value={catalogueItemData.totalCost} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            totalCost: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Discount Threshold</p>
                        <input type="number" name="color" value={catalogueItemData.discountThreshold} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discountThreshold: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Financer</p>
                        <input type="text" name="purchaseFinancer" value={catalogueItemData.purchaseFinancer} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            purchaseFinancer: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Interest Rate</p>
                        <input type="number" name="purchaseFinanceInterestRate" value={catalogueItemData.purchaseFinanceInterestRate} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            purchaseFinanceInterestRate: e.target.value,
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Amount</p>
                        <input type="number" name="purchaseFinanceAmount" value={catalogueItemData.purchaseFinanceAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            purchaseFinanceAmount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Account Number</p>
                        <input type="number" name="purchaseFinanceAccountNumber" value={catalogueItemData.purchaseFinanceAccountNumber} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            purchaseFinanceAccountNumber: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Post Offer</p>
                      <hr />

                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={catalogueItemData.postOffer && catalogueItemData.postOffer.exShowroomPrice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={catalogueItemData.postOffer && catalogueItemData.postOffer.tcsOnExShowroomPercent} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={catalogueItemData.postOffer && catalogueItemData.postOffer.tcsOnExShowroomAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={catalogueItemData.postOffer && catalogueItemData.postOffer.insurance} onChange={(e) => {
                          dzz({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={catalogueItemData.postOffer && catalogueItemData.postOffer.rtoTaxIndividual} onChange={(e) => {
                          dzz({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={catalogueItemData.postOffer && catalogueItemData.postOffer.rtoTaxCompany} onChange={(e) => {
                          dzz({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={catalogueItemData.postOffer && catalogueItemData.postOffer.roadSideAssistance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={catalogueItemData.postOffer && catalogueItemData.postOffer.rubberMattingKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={catalogueItemData.postOffer && catalogueItemData.postOffer.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={catalogueItemData.postOffer && catalogueItemData.postOffer.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={catalogueItemData.postOffer && catalogueItemData.postOffer.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={catalogueItemData.postOffer && catalogueItemData.postOffer.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={catalogueItemData.postOffer && catalogueItemData.postOffer.totalIndividualOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={catalogueItemData.postOffer && catalogueItemData.postOffer.totalCompanyOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={catalogueItemData.postOffer && catalogueItemData.postOffer.basicAccessoriesKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            postOffer: {
                              ...catalogueItemData.postOffer,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (

                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Schemes</p>
                        <select
                          name="schemeID"

                          value={catalogueItemData.schemeID}
                          onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              schemeID: e.target.value,

                            });
                          }}
                        >
                          <option value="" selected>
                            Select Scheme
                         </option>
                          {schemesList &&
                            schemesList.map((schemes) => (
                              <option value={schemes.uuid} >
                                {schemes.displayName}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Offer</p>
                        <select
                          name="offerID"

                          value={catalogueItemData.offerID}
                          onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              offerID: e.target.value,

                            });
                          }}
                        >
                          <option value="" selected>
                            Select Offer
                         </option>
                          {offerList &&
                            offerList.map((offer) => (
                              <option value={offer.uuid} >
                                {offer.displayName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Oem To Dealership Discount</p>
                        <input type="number" name="oemToDealershipDiscount" value={catalogueItemData.oemToDealershipDiscount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            oemToDealershipDiscount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Justification</p>
                        <input type="text" name="justification" value={catalogueItemData.justification} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            justification: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Is Reconciliation Candidate</p>
                        <input type="checkbox" checked={catalogueItemData.isReconciliationCandidate ? true : false} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            isReconciliationCandidate: true
                          });
                        }} value="true" /> Yes
                       <input type="checkbox" checked={catalogueItemData.isReconciliationCandidate ? false : true} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            isReconciliationCandidate: false
                          });
                        }} value="false" /> No
                   </div>
                    </div>
                  )}


                  {catalogueItemData.type === "Product" && (

                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Inter Dealership Transfer</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.exShowroomPrice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.tcsOnExShowroomPercent} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.tcsOnExShowroomAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.insurance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.rtoTaxIndividual} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.rtoTaxCompany} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.roadSideAssistance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.rubberMattingKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.totalIndividualOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.totalCompanyOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={catalogueItemData.interDealershipTransfer && catalogueItemData.interDealershipTransfer.basicAccessoriesKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            interDealershipTransfer: {
                              ...catalogueItemData.interDealershipTransfer,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}

                  {catalogueItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Discounted</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={catalogueItemData.discounted && catalogueItemData.discounted.exShowroomPrice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={catalogueItemData.discounted && catalogueItemData.discounted.tcsOnExShowroomPercent} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={catalogueItemData.discounted && catalogueItemData.discounted.tcsOnExShowroomAmount} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={catalogueItemData.discounted && catalogueItemData.discounted.insurance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={catalogueItemData.discounted && catalogueItemData.discounted.rtoTaxIndividual} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={catalogueItemData.discounted && catalogueItemData.discounted.rtoTaxCompany} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={catalogueItemData.discounted && catalogueItemData.discounted.roadSideAssistance} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={catalogueItemData.discounted && catalogueItemData.discounted.rubberMattingKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={catalogueItemData.discounted && catalogueItemData.discounted.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={catalogueItemData.discounted && catalogueItemData.discounted.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={catalogueItemData.discounted && catalogueItemData.discounted.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={catalogueItemData.discounted && catalogueItemData.discounted.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={catalogueItemData.discounted && catalogueItemData.discounted.totalIndividualOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={catalogueItemData.discounted && catalogueItemData.discounted.totalCompanyOnRoad} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={catalogueItemData.discounted && catalogueItemData.discounted.basicAccessoriesKit} onChange={(e) => {
                          setCatalogueItemData({
                            ...catalogueItemData,
                            discounted: {
                              ...catalogueItemData.discounted,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {
                    catalogueItemData.type === "Accessories" && (
                      <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                        <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Accessories</p>
                        <hr />

                        <div style="margin:8px 0;">
                          <p class="form-label">Serial Number</p>
                          <input type="text" name="serialNumber" value={catalogueItemData.serialNumber} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              serialNumber: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">HSN Code</p>
                          <input type="text" name="hsnCode" value={catalogueItemData.hsnCode} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              hsnCode: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Number</p>
                          <input type="text" name="partNumber" value={catalogueItemData.partNumber} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              partNumber: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Name</p>
                          <input type="text" name="partName" value={catalogueItemData.partName} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              partName: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Model</p>
                          <input type="text" name="model" value={catalogueItemData.model} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              model: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Type</p>
                          <input type="text" name="partType" value={catalogueItemData.partType} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              partType: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Price</p>
                          <input type="number" name="price" value={catalogueItemData.price} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              price: e.target.value,
                            });
                          }} />
                        </div>
                      </div>
                    )}


                  {
                    catalogueItemData.type === "Service" && (
                      <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                        <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Service</p>
                        <hr />
                        <div style="margin:8px 0;">
                          <p class="form-label">cost</p>
                          <input type="number" name="cost" value={catalogueItemData.cost} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              cost: e.target.value,
                            });
                          }} />
                        </div>
                        <div style="margin:8px 0;">
                          <p class="form-label">Margin</p>
                          <input type="number" name="margin" value={catalogueItemData.margin} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              margin: e.target.value,
                            });
                          }} />
                        </div>
                        <div style="margin:8px 0;">
                          <p class="form-label">Discount Threshold</p>
                          <input type="number" name="discountThreshold" value={catalogueItemData.discountThreshold} onChange={(e) => {
                            setCatalogueItemData({
                              ...catalogueItemData,
                              discountThreshold: e.target.value,
                            });
                          }} />
                        </div>
                      </div>
                    )}

                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" style="margin-right:5px" type='submit'>Update</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleCatalogueItemDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Catalogue Item Details" modalSize="is-full-height"
        modalDisplay={(isCatalogueItemHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleCatalogueItemHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:100vh; overflow:auto">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 p-r-0 p-l-0 m-t-20' >
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
                      {/* <div class="row">
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
                      </div> */}
                      <div class ="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-10 p-r-10">
                          <div class ="p-b-10 display-flex m-t-10">
                            <div class="display-flex flex-direction-column w-half">
                              <div class="display-flex">
                                <p class="fs-16" style="color:#90929a">Name of Item</p>
                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                              </div>
                              <p class="fs-20 f-w-600 first-letter-capital"> {selectedCatalogueItemData.displayName}</p>
                            </div>
                            <div class="display-flex flex-direction-column w-half m-l-20">
                              <div class="display-flex">
                                <p class="fs-16" style="color:#90929a">Colour of Items :</p>
                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"/></svg>
                              </div>
                              <p class="fs-20 f-w-r first-letter-capital"> {selectedCatalogueItemData.color}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class ="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-b-10 p-r-10 p-l-10" >
                          <div class ="p-t-10 p-t-10 display-flex" >
                            <div class="display-flex flex-direction-column w-half ">
                              <div class="display-flex">
                                <p class="fs-16" style="color:#90929a">Variant</p>
                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                              </div>
                              <p class="fs-20 f-w-600 first-letter-capital">{selectedCatalogueItemData.variant}</p>
                            </div>
                            <div class="display-flex flex-direction-column w-half m-l-20 ">
                              <div class="display-flex">
                                <p class="fs-16" style="color:#90929a">Variant Code</p>
                                <svg class="m-l-5" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z"/></svg>
                              </div>
                              <p class="fs-20 f-w-600 first-letter-capital">{selectedCatalogueItemData.variantCode}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <button class="fs-12 m-b-15 m-l-15" style="border:1px solid #6799b0">View More</button> */}
                    </div>
                  </div>
                </div>
                <span class="pos-absolute" style="right: 0px;bottom: 0px;">
                <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 6h10.29l1.04 3H5.81l1.04-3zM19 16H5v-4.66l.12-.34h13.77l.11.34V16z"></path><circle cx="7.5" cy="13.5" r="1.5"></circle><circle cx="16.5" cy="13.5" r="1.5"></circle></svg>
                </span>
              </div>
              {/* <div class="row">
                <div class="col-xs-12" style="background-color:white;height:max-content;margin-top:20px;padding:10px;">
                  <label style="margin-bottom:5px;">Name of Item :</label>
                  <span class="first-letter-capital">{selectedCatalogueItemData.displayName}</span>
                  <label style="margin-top:10px;margin-bottom:5px;">Variant :</label>
                  <span class="first-letter-capital">{selectedCatalogueItemData.variant}</span>
                  <label style="margin-top:10px;margin-bottom:5px;">Variant Code :</label>
                  <span class="first-letter-capital">{selectedCatalogueItemData.variantCode}</span>
                  <label style="margin-top:10px;margin-bottom:5px;">Colour of Items :</label>
                  <span class="first-letter-capital">{selectedCatalogueItemData.color}</span>
                </div>*/}
              </div>
              {/* <div class="row">
                <div class="col-xs-12" style="background-color:white;height:max-content;margin-top:20px;padding:10px;">
                  {selectedCatalogueItemData.type === "Product" && (
                    <div>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Basic</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <label class="form-label">EX STOCKYARD</label>
                        <span>{getFormattedAmount(selectedCatalogueItemData.exStockyard)}</span>
                      </div>
                      <div style="margin:8px 0;">
                        <label class="form-label">FREIGHT</label>
                        <span>{selectedCatalogueItemData.tcsOnExShowroomPercent}</span>
                      </div>
                      <div style="margin:8px 0;">
                        <label class="form-label">Tcs On ExShowroom Amount</label>
                        <span>{selectedCatalogueItemData.tcsOnExShowroomAmount}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label class="form-label">Insurance</label>
                        <span>{selectedCatalogueItemData.insurance}</span>
                      </div>
                      <div style="margin:8px 0;">
                        <label class="form-label">RTO Tax Individual</label>
                        <span>{selectedCatalogueItemData.rtoTaxIndividual}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label class="form-label">RTO Tax Company</label>
                        <span>{selectedCatalogueItemData.rtoTaxCompany}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label class="form-label">Road Side Assistance</label>
                        <span>{selectedCatalogueItemData.roadSideAssistance}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label class="form-label">Rubber Matting Kit</label>
                        <span>{selectedCatalogueItemData.rubberMattingKit}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label class="form-label">Fourth Fifth Year Extended Warranty</label>
                        <span>{selectedCatalogueItemData.fourthFifthYearExtendedWarranty}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label class="form-label">Additional Premium On Engine Protection</label>
                        <span>{selectedCatalogueItemData.additionalPremiumOnEngineProtection}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label class="form-label">Additional Premium On Return To Invoice</label>
                        <span>{selectedCatalogueItemData.additionalPremiumOnReturnToInvoice}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label class="form-label">Five Years or Sixty Km Shied Of Trust</label>
                        <span>{selectedCatalogueItemData.fiveYearsorSixtyKmShiedOfTrust}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label class="form-label">Total Individual On Road</label>
                        <span>{selectedCatalogueItemData.totalIndividualOnRoad}</span>
                      </div>


                      <div style="margin:8px 0;">
                        <label class="form-label">Total Company On Road</label>
                        <span>{selectedCatalogueItemData.totalCompanyOnRoad}</span>
                      </div>

                      <div style="margin:8px 0;">
                        <label>Basic Accessories Kit</label>
                        <span>{selectedCatalogueItemData.basicAccessoriesKit}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div> */}
              {/* <div class="row">
                <div class="col-xs-12" style="background-color:white;height:max-content;margin-top:20px;padding:10px;">
                  <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Scheme Detail</p>
                  <hr />
                  <labe class="form-label">Scheme name</labe><br />
                  <span>{selectedCatalogueItemData.schemeName}</span>
                </div>
              </div> */}
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="background-color:white;margin-top:20px;height:570px">
              <img src="/assets/images/Hyundai-Verna.jpg" style="width:100%" />
              {/* <br />
              <br /> */}
              {/* <labe class="form-label" style="margin-top:20px;">Basic Accessories Kit</labe><br />
              <span>{selectedCatalogueItemData.basicAccessoriesKit}</span><br />
              <labe class="form-label">Status</labe><br />
              <span>{selectedCatalogueItemData.status}</span><br />
              <labe class="form-label">Stock on hand</labe><br />
              <span>----</span><br />
              <labe class="form-label">Stock on order</labe><br />
              <span>----</span> */}
            </div>
            {/* ModifiedBy: Vihang Kale
            Date: 15/03/2021
            Modification: price breakup added */}
            <div class="col-xs-4 col-lg-4 m-t-20">
              <div class={`newWorkSpaceCard pos-relative`}
                style={`background:#fff;height:600px;overflow:hidden auto;height:570px`}>
                <div class="p-t-0 p-b-0 display-flex flex-direction-column h-full" >
                  <div>
                  <div className="display-flex flex-direction-column p-l-0">
                <div class="display-flex align-center">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer"  style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                ;">
                  <div class ="display-flex align-center"
            >
                    <p>EX STOCKYARD</p>
                    <span class="tooltip m-l-5" style="with:15px; height:15px;">
                      <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                      <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                          <div class="display-flex flex-direction-column p-l-5 p-r-5">
                            <div class="display-flex space-between">
                              <p>RTO ₹ </p>
                              <p>₹ 1,27,400</p>
                            </div>
                            <div class="display-flex space-between">
                              <p>Total Registration Charges</p>
                              <p> ₹ 1,27,400</p>
                            </div>
                          </div>
                      </div>
                    </span>
                  </div>
                <span> {getFormattedAmount(selectedCatalogueItemData.exStockyard)}</span>
                </span>

              </div>
          <div class ="display-flex align-center m-t-10">
            <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white
            ;">
              <div class ="display-flex align-center">
                <p>FREIGHT</p>
                <span class="tooltip m-l-5" style="with:15px; height:15px">
                  <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                  <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                          <div class="display-flex flex-direction-column p-l-5 p-r-5">
                            <div class="display-flex space-between">
                              <p>RTO ₹ </p>
                              <p>₹ 1,27,400</p>
                            </div>
                            <div class="display-flex space-between">
                              <p>Total Registration Charges</p>
                              <p> ₹ 1,27,400</p>
                            </div>
                          </div>
                      </div>
                </span>
              </div>
            <span>{getFormattedAmount(selectedCatalogueItemData.freight)}</span>
            </span>
          </div>

        <div class ="display-flex align-center m-t-10">
          <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
          ;">
            <div class ="display-flex align-center">
              <p>INSURANCE</p>
              <span class="tooltip m-l-5" style="with:15px; height:15px">
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                          <div class="display-flex flex-direction-column p-l-5 p-r-5">
                            <div class="display-flex space-between">
                              <p>RTO ₹ </p>
                              <p>₹ 1,27,400</p>
                            </div>
                            <div class="display-flex space-between">
                              <p>Total Registration Charges</p>
                              <p> ₹ 1,27,400</p>
                            </div>
                          </div>
                      </div>
              </span>
            </div>
            <span>{getFormattedAmount(selectedCatalogueItemData.insurance)}</span>

          </span>
        </div>

        <div class ="display-flex align-center m-t-10">
          <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
          ;">
            <div class ="display-flex align-center">
              <p>SUBTOTAL</p>
              <span class="tooltip m-l-5" style="with:15px; height:15px">
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                          <div class="display-flex flex-direction-column p-l-5 p-r-5">
                            <div class="display-flex space-between">
                              <p>RTO ₹ </p>
                              <p>₹ 1,27,400</p>
                            </div>
                            <div class="display-flex space-between">
                              <p>Total Registration Charges</p>
                              <p> ₹ 1,27,400</p>
                            </div>
                          </div>
                      </div>
              </span>
            </div>
          <span>{getFormattedAmount(selectedCatalogueItemData.subTotal)}</span>
          </span>

        </div>
        <span class="fs-12 m-l-5 m-t-10 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#4ccbd0;color:white
        ;">
          <div class ="display-flex align-center">
            <p class="fs-15">IGST</p>

          </div>
        <span class="fs-15">{getFormattedAmount(selectedCatalogueItemData.igst)}</span>
        </span>

        <div class ="display-flex align-center m-t-20">
          <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
            <div class ="display-flex align-center">
              <p>CESS</p>
              <span class="tooltip m-l-5" style="with:15px; height:15px">
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                          <div class="display-flex flex-direction-column p-l-5 p-r-5">
                            <div class="display-flex space-between">
                              <p>RTO ₹ </p>
                              <p>₹ 1,27,400</p>
                            </div>
                            <div class="display-flex space-between">
                              <p>Total Registration Charges</p>
                              <p> ₹ 1,27,400</p>
                            </div>
                          </div>
                      </div>
              </span>
            </div>
          <span>{getFormattedAmount(selectedCatalogueItemData.cess)}</span>
          </span>

        </div>
        <div class ="display-flex align-center m-t-10">
          <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
            <div class ="display-flex align-center">
              <p>TCS 0.1%</p>
              <span class="tooltip m-l-5" style="with:15px; height:15px">
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                          <div class="display-flex flex-direction-column p-l-5 p-r-5">
                            <div class="display-flex space-between">
                              <p>RTO ₹ </p>
                              <p>₹ 1,27,400</p>
                            </div>
                            <div class="display-flex space-between">
                              <p>Total Registration Charges</p>
                              <p> ₹ 1,27,400</p>
                            </div>
                          </div>
                      </div>
              </span>
            </div>
          <span>{getFormattedAmount(selectedCatalogueItemData.tcs)}</span>
          </span>

        </div>
        <div class ="display-flex align-center m-t-10">
          <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
            <div class ="display-flex align-center">
              <p>BOOKING PRICE</p>
              <span class="tooltip m-l-5" style="with:15px; height:15px">
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                          <div class="display-flex flex-direction-column p-l-5 p-r-5">
                            <div class="display-flex space-between">
                              <p>RTO ₹ </p>
                              <p>₹ 1,27,400</p>
                            </div>
                            <div class="display-flex space-between">
                              <p>Total Registration Charges</p>
                              <p> ₹ 1,27,400</p>
                            </div>
                          </div>
                      </div>
              </span>
            </div>
            <span>{getFormattedAmount(selectedCatalogueItemData.bookingPrice)}</span>
            </span>

        </div>

          <div class ="display-flex align-center m-t-10">
            <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
              <div class ="display-flex align-center">
                <p>LESS SET OFF IGST</p>
                <span class="tooltip m-l-5" style="with:15px; height:15px">
                  <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                  <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                            <div class="display-flex flex-direction-column p-l-5 p-r-5">
                              <div class="display-flex space-between">
                                <p>RTO ₹ </p>
                                <p>₹ 1,27,400</p>
                              </div>
                              <div class="display-flex space-between">
                                <p>Total Registration Charges</p>
                                <p> ₹ 1,27,400</p>
                              </div>
                            </div>
                        </div>
                </span>
              </div>
            <span>{getFormattedAmount(selectedCatalogueItemData.igstLessSetOff1)}</span>
            </span>

          </div>
          <div class ="display-flex align-center m-t-10">
            <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#FF8080;color:white">
              <div class ="display-flex align-center">
                <p>LESS SET OFF CESS</p>
                <span class="tooltip m-l-5" style="with:15px; height:15px">
                  <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                  <div class="tooltiptext fs-12 m-l-0" style="background:#FF8080;left:-50px;bottom:170%">
                            <div class="display-flex flex-direction-column p-l-5 p-r-5">
                              <div class="display-flex space-between">
                                <p>RTO ₹ </p>
                                <p>₹ 1,27,400</p>
                              </div>
                              <div class="display-flex space-between">
                                <p>Total Registration Charges</p>
                                <p> ₹ 1,27,400</p>
                              </div>
                            </div>
                        </div>
                </span>
              </div>
            <span>{getFormattedAmount(selectedCatalogueItemData.cessLessSetOff2)}</span>
            </span>

          </div>

        </div>
                  <div class="cursor-pointer m-l-5 m-t-10" style="width:80%;background:#4ccbd0;border-radius: 8px;
        display: flex;
        padding:5px;
        justify-content: space-between;" >
                    <span class="fs-15 color-white">LESS SET OFF</span>
                  <span class="fs-15 f-w-600 color-white" style="align-self: baseline;letter-spacing: 0.8px;">{getFormattedAmount(selectedCatalogueItemData.tcsLessSetOff3)}</span>
                  </div>
                  <div class="cursor-pointer m-l-5 m-t-10" style="width:80%;
                  background:#6799b0;
                  border-radius: 8px;
                  display: flex;
                  padding:5px;
                  justify-content: space-between;" >
                  <span class="fs-15 color-white">NET PURCHASE PRICE</span>
                  <span class="fs-15 f-w-600 color-white" style="align-self: baseline;letter-spacing: 0.8px;">{getFormattedAmount(selectedCatalogueItemData.netPurchasePrice)}</span>
                  </div>
                  <div class="cursor-pointer m-l-5 m-t-10" style="width:80%;
        background:#74FAC8;
        border-radius: 8px;
        display: flex;
        padding:5px;
        justify-content: space-between;" >
                    <span class="fs-16 color-white">DEALER COMMISSION</span>
                  <span class="fs-16 f-w-600 color-white" style="align-self: baseline;letter-spacing: 0.8px;">{getFormattedAmount(selectedCatalogueItemData.dealerCommision)}</span>
                  </div>
                  <div class="display-flex m-t-10 align-center">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                  <div class ="display-flex align-center">
                  <p>SUBTOTAL</p>
                    <span class="tooltip m-l-5" style="with:15px; height:15px">
                      <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                      <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                          <div class="display-flex flex-direction-column p-l-5 p-r-5">
                            <div class="display-flex space-between">
                              <p>RTO ₹ </p>
                              <p>₹ 1,27,400</p>
                            </div>
                            <div class="display-flex space-between">
                              <p>Total Registration Charges</p>
                              <p> ₹ 1,27,400</p>
                            </div>
                          </div>
                      </div>
                    </span>
                  </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.subTotal2)}</span>
                  </span>
                </div>
                <div class ="display-flex align-center m-t-10">
          <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
          ;">
            <div class ="display-flex align-center">
              <p>GST</p>
              <span class="tooltip m-l-5" style="with:15px; height:15px">
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                          <div class="display-flex flex-direction-column p-l-5 p-r-5">
                            <div class="display-flex space-between">
                              <p>RTO ₹ </p>
                              <p>₹ 1,27,400</p>
                            </div>
                            <div class="display-flex space-between">
                              <p>Total Registration Charges</p>
                              <p> ₹ 1,27,400</p>
                            </div>
                          </div>
                      </div>
              </span>
            </div>
          <span>{getFormattedAmount(selectedCatalogueItemData.gst)}</span>
          </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>CESS</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.cess2)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>GP%</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.gpPercentage)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>TOTAL</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.total)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>EX SHOWROOM</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.exShowroom)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>TCS 1.0% on EX SHOWROOM</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.tcsOnExShowroom)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>INSURANCE (INCLUDE "0" DEP & CONSUMBALE & KP+PB)</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.insuranceCalculated)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>MISCELLANEOUS EXPENSES</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.miscellaneousExpenses)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>RSA</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.rsa)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>RMK</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.rmk)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>RTO INDIVIDUAL</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.rtoIndividual)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>REG FEE</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.registrationFee)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>4th & 5TH YEAR EXTENDED WARRENTY</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.fourthAnd5thYearExtendedWarranty)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>TOTAL INDIVIDUAL</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.totalIndividual)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>RTO COMPANY</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.rtoCompany)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>TOTAL COMPANY</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.totalCompany)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>ADDL.PREM.FOR 0% DEP INS. POLICY</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.additionalPremiumForZeroDep)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>ADDL PREMIUM FOR ENGINE PROTECTION (EP)</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.additionalPremiumForEngineProtection)}</span>
                  </span>

                </div>
                <div class ="display-flex align-center m-t-10">
                  <span class="fs-12 m-l-5 display-flex align-center justify-between cursor-pointer" style="width:80%;border-radius:6px;padding:5px;background:#6799b0;color:white
                  ;">
                    <div class ="display-flex align-center">
                      <p>ADDL PREMIUM FOR RETURN TO INVOICE (RTI)</p>
                      <span class="tooltip m-l-5" style="with:15px; height:15px">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="white"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                        <div class="tooltiptext fs-12 m-l-0" style="background:#6799b0;left:-50px;bottom:170%">
                                  <div class="display-flex flex-direction-column p-l-5 p-r-5">
                                    <div class="display-flex space-between">
                                      <p>RTO ₹ </p>
                                      <p>₹ 1,27,400</p>
                                    </div>
                                    <div class="display-flex space-between">
                                      <p>Total Registration Charges</p>
                                      <p> ₹ 1,27,400</p>
                                    </div>
                                  </div>
                              </div>
                      </span>
                    </div>
                  <span>{getFormattedAmount(selectedCatalogueItemData.additionalPremiumForRTI)}</span>
                  </span>

                </div>
              </div>
                </div>

                <span class="pos-absolute" style="right: 0px;bottom: 0px;">
                  <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="80px" viewBox="0 0 24 24" width="80px" fill="#ddf0f3"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M13.66,7C13.1,5.82,11.9,5,10.5,5L6,5V3h12v2l-3.26,0c0.48,0.58,0.84,1.26,1.05,2L18,7v2l-2.02,0c-0.25,2.8-2.61,5-5.48,5 H9.77l6.73,7h-2.77L7,14v-2h3.5c1.76,0,3.22-1.3,3.46-3L6,9V7L13.66,7z"/></g></g></svg>
                </span>
              </div>
            </div>
            <div class="col-xs-12" style="display:none;background-color:white;margin-left:10px;margin-top:20px">
              <div class="col-xs-12 p-l-0 p-r-0 m-t-15">
                <div class="row">
                  <div class="col-xs-6 analytics-right-half-section" style="min-height:auto !important">
                    <div class="row accordian-row" style="overflow:auto; padding:5px">
                      <div class="accordion acc-single-open">
                        <div class="acc-container">
                          <div class="acc-title row">
                            <div class="col-xs-8">
                              <p>TimeLine</p>
                            </div>
                          </div>
                          <div class="acc-content" style="padding-left: 0px;">
                            <div>
                              <Timeline title="Contact">
                                <div class="timeline-container-content">
                                  <div class="timeline-container-list">
                                    <div class="timeline-section timeline-section-new">
                                      <div class="timeline-section-icon timeline-section-icon-new"></div>
                                      <div class="timeline-section-content">
                                        <div class="main-buttons">
                                          <div class="main-buttons-inner-container" style="height: 39px;">
                                            <div class="buttons-item buttons-item-active">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">Comment</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span><span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">Wait</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span><span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">Call</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span>
                                                <span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">SMS</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item " draggable="true" tabindex="-1">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span><span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">E-mail</span>
                                                </span>
                                              </a>
                                            </div>
                                            <div class="buttons-item">
                                              <a class="buttons-item-link">
                                                <span class="buttons-item-icon"></span><span class="buttons-item-text">
                                                  <span class="buttons-item-text-title">Task</span>
                                                </span>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="timeline-content-new-detail">
                                          <textarea rows="1" class="timeline-content-new-comment-textarea" placeholder="Leave a comment" style="display: block;"></textarea>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div class="timeline-section-fixed-anchor"></div>
                                    </div>
                                    <div class="timeline-section timeline-section-live-im">
                                      <div class="timeline-section-icon timeline-section-icon-live-im"></div>
                                      <div class="timeline-section-content">
                                        <div class="timeline-content-event">
                                          <div class="timeline-content-live-im-detail">
                                            <div class="timeline-live-im-users">
                                              <div class="timeline-live-im-user-avatars">
                                                <span class="timeline-live-im-user-avatar ui-icon ui-icon-common-user">
                                                  <i style="background-image: url('/assets/images/profile.jpg');"></i>
                                                </span>
                                              </div>
                                            </div>
                                            <div class="timeline-live-im-user-counter"></div>
                                            <div class="timeline-live-im-separator"></div>
                                            <div class="timeline-live-im-messanger timeline-live-im-message-show">
                                              <div class="timeline-live-im-time">15:54</div>
                                              <div class="timeline-live-im-message">
                                                <div class="timeline-live-im-message-text"> discussion chat created</div>
                                              </div>
                                              <div class="timeline-live-im-message-counter" style="display: none;">0</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div class="timeline-section timeline-section-planned-label">
                                        <div class="timeline-section-content">
                                          <div class="timeline-planned-label">Planned</div>
                                        </div>
                                      </div>
                                      <div class="timeline-section timeline-section-planned timeline-section-notTask">
                                        <div class="timeline-section-icon timeline-section-icon-info timeline-section-counter"></div>
                                        <div class="timeline-section-content">
                                          <div class="timeline-content-event">
                                            <div class="timeline-content-detail">You don't have any scheduled activities. Move the status, plan an activity or engage a wait.
                                                </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="timeline-section timeline-section-today-label">
                                      <div class="timeline-section-content">
                                        <div class="timeline-today-label">today</div>
                                        <button class="timeline-filter-label">Filter</button>
                                      </div>
                                    </div>
                                    <div class="timeline-section timeline-section-history timeline-section-createEntity timeline-section-last">
                                      <div class="timeline-section-icon timeline-section-icon-info"></div>
                                      <div class="timeline-section-content">
                                        <div class="timeline-content-event">
                                          <div class="timeline-content-header">
                                            <div class="timeline-content-event-title">
                                              <a href="#"> created</a>
                                            </div>
                                            <span class="timeline-content-event-time">13:34</span>
                                          </div>
                                          <div class="timeline-content-detail">
                                            <span> #38</span><br />
                                            <span>Source: Call</span>
                                          </div>
                                          <a class="ui-icon ui-icon-common-user timeline-content-detail-employee" target="_blank" title="+919623451923">
                                            <i style="background-image: url('/assets/images/profile.jpg'); background-size: 21px;"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*</div>*/}
                              </Timeline>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal
        title="Transaction and History"
        modalSize="is-full-height"
        modalDisplay={
          isCatalogueItemHistoryModalOpen ? "show-modal" : "hide-modal"
        }
        onClose={(e) => toggleCatalogueItemHistoryModal(e)}
      >
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {catalogueItemHistoryList.map((attachment, index) => (
                      <div
                        class={
                          "container-report " +
                          (index % 2 === 0 ? "left-report" : "right-report")
                        }
                      >
                        <div class="content-report">
                          <p class="event-title">
                            Changed Attribute: {attachment.changedAttribute}
                          </p>
                          <p class="event-title">
                            New Value: {attachment.newValue}
                          </p>
                          <p class="event-title">
                            Old Value: {attachment.oldValue}
                          </p>
                          <p class="event-timestamp">
                            By {attachment.userName} on &nbsp;
                            <em>
                              {formatDateTime(attachment.updatedAt)} @{" "}
                              {
                                formatDateTime(
                                  attachment.updatedAt,
                                  true
                                ).split(",")[1]
                              }
                            </em>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button
                    type="button"
                    class="button button-cancel"
                    onClick={(e) => toggleCatalogueItemHistoryModal(e)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      {/* <Modal
        title="Transaction and History"
        modalSize="is-full-height"
        modalDisplay={
          isCatalogueItemHistoryEmpty ? "show-modal" : "hide-modal"
        }
        onClose={(e) => toggleCatalogueItemHistoryEmptyModal(e)}
      >
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">No updates</div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button
                    type="button"
                    class="button button-cancel"
                    onClick={(e) => toggleCatalogueItemHistoryEmptyModal(e)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
       {/* ModifiedBy: Vihang Kale
            Date: 15/03/2021
            Modification: modal added */}
      <Modal title="Add Finace" modalSize="is-full-height"
        modalDisplay={(isAddStockModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddStockModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveStock(e)}>
            <div class="row" style="height:80vh; overflow:scroll">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p>Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="name" required value={stockData.name} onChange={(e) => {
                        setStockData({
                          ...stockData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Display Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="displayName" required value={stockData.displayName} onChange={(e) => {
                        setStockData({
                          ...stockData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Dealership<sup class="star-mandatory-entry">*</sup></p>

                      <select
                        name="dealershipID"
                        value={stockData.dealershipID}
                        onChange={(e) => {
                          setStockData({
                            ...stockData,
                            dealershipID: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Dealership
                                          </option>
                        {dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid}>
                              {dealership.name}
                            </option>
                          ))}
                      </select>
                    </div>



                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 display-flex align-center justify-center">

                    <button class="button button-action" style="margin-right:5px" type='submit'>Save</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleAddStockModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Stock Details" modalSize="is-full-height"
        modalDisplay={(isStockDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleStockDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateStock(e)}>
            <div class="row" style="height:80vh; overflow:scroll">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >


                    <div style="margin:8px 0;">
                      <p>Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" required value={stockData.name} onChange={(e) => {
                        setStockData({
                          ...stockData,
                          name: e.target.value
                        });

                      }} />
                    </div>


                    <div style="margin:8px 0;">
                      <p>Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={stockData.displayName} onChange={(e) => {
                        setStockData({
                          ...stockData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Dealership<sup class="star-mandatory-entry">*</sup></p>
                      <select
                        name="dealershipID"
                        value={stockData.dealershipID}
                        onChange={(e) => {
                          setStockData({
                            ...stockData,
                            dealershipID: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Dealership
                                          </option>
                        {dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid}>
                              {dealership.name}
                            </option>
                          ))}
                      </select>
                    </div>

                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" style="margin-right:5px" type='submit'>Update</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleStockDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isStockHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleStockHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      stockHistoryList.map((attachment, index) => (
                        <div class={'container-report ' + ((index % 2 === 0) ? 'left-report' : 'right-report')}>
                          <div class="content-report">
                            <p class="event-title">Changed Attribute: {attachment.changedAttribute}</p>
                            <p class="event-title">New Value: {attachment.newValue}</p>
                            <p class="event-title">Old Value: {attachment.oldValue}</p>
                            <p class="event-timestamp">By {attachment.userName} on &nbsp;
                              <em>{formatDateTime(attachment.updatedAt)} @ {formatDateTime(attachment.updatedAt, true).split(',')[1]}</em></p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleStockHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isStockHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleStockHistoryEmptyModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    No updates
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleStockHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}

      <Modal title="Add Stock Item" modalSize="is-full-height"
        modalDisplay={(isAddStockItemModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddStockItemModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveStockItem(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >

                    <div style="margin:8px 0;">
                      <p class="form-label">Name</p>
                      <input type="text" name="name" required value={stockItemData.name} onChange={(e) => {
                        setStockItemData({
                          ...stockItemData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name</p>
                      <input type="text" name="displayName" required value={stockItemData.displayName} onChange={(e) => {
                        setStockItemData({
                          ...stockItemData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Dealership</p>
                      <select
                        name="dealershipID"

                        value={stockItemData.dealershipID}
                        onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            dealershipID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Dealership
                          </option>
                        {dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid} >
                              {dealership.displayName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Catalogue Item</p>
                      <select
                        name="catalogueID"

                        value={stockItemData.catalogueItemID}
                        onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            catalogueItemID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue Item
                          </option>
                        {catalogueItemList &&
                          catalogueItemList.map((catalogueItem) => (
                            <option value={catalogueItem.uuid} >
                              {catalogueItem.displayName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Third Party</p>
                      <select
                        name="thirdPartyID"

                        value={stockItemData.thirdPartyID}
                        onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            thirdPartyID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Third Party
                          </option>
                        {thirdPartyList &&
                          thirdPartyList.map((thirdParty) => (
                            <option value={thirdParty.uuid} >
                              {thirdParty.displayName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Type</p>
                      <select
                        value={stockItemData.type}
                        onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            type: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Type
                          </option>
                        <option
                          name="Product"
                          value="Product"
                          selected={
                            stockItemData.type === "Product"
                          }
                        >
                          Product
                          </option>
                        <option
                          name="Service"
                          value="Service"
                          selected={
                            stockItemData.type ===
                            "Service"
                          }
                        >
                          Service
                          </option>
                        <option
                          name="Accessories"
                          value="Accessories"
                          selected={
                            stockItemData.type === "Accessories"
                          }
                        >
                          Accessories
                          </option>
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Description</p>
                      <input type="text" name="descripton" value={stockItemData.descripton} onChange={(e) => {
                        setStockItemData({
                          ...stockItemData,
                          description: e.target.value,
                        });
                      }} />
                    </div>
                  </div>


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                      <div style="margin:8px 0;">
                        <p class="form-label">Model Category</p>
                        <input type="text" name="modelCategory" value={stockItemData.modelCategory} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            modelCategory: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Model Name</p>
                        <input type="text" name="modelName" value={stockItemData.modelName} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            modelName: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Variant</p>
                        <input type="text" name="variant" value={stockItemData.variant} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            variant: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Model Sub Variant</p>
                        <input type="text" name="modelSubVariant" value={stockItemData.modelSubVariant} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            modelSubVariant: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Color Code</p>
                        <input type="text" name="colorCode" value={stockItemData.colorCode} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            colorCode: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Variant Code</p>
                        <input type="text" name="variantCode" value={stockItemData.variantCode} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            variantCode: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">HSN Code</p>
                        <input type="text" name="hsnCode" value={stockItemData.hsnCode} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            hsnCode: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px ;border:4px solid #003468;' >
                      <div style="margin:8px 0;">
                        <p class="form-label">Fuel Type</p>
                        <input type="text" name="fuelType" value={stockItemData.fuelType} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            fuelType: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Class Of Vehicle</p>
                        <input type="text" name="classOfVehicle" value={stockItemData.classOfVehicle} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            classOfVehicle: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Color</p>
                        <input type="text" name="color" value={stockItemData.color} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            color: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Interior Color</p>
                        <input type="text" name="interiorColor" value={stockItemData.interiorColor} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interiorColor: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">ExteriorColor</p>
                        <input type="text" name="exteriorColor" value={stockItemData.exteriorColor} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            exteriorColor: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Gross Vehicle Weight</p>
                        <input type="number" name="grossVehicleWeight" value={stockItemData.grossVehicleWeight} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            grossVehicleWeight: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Unladen Weight</p>
                        <input type="number" name="unladenWeight" value={stockItemData.unladenWeight} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            unladenWeight: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Number Of Cylinders</p>
                        <input type="number" name="numberOfCylinders" value={stockItemData.numberOfCylinders} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            numberOfCylinders: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Horse PowerCC</p>
                        <input type="number" name="horsePowerCC" value={stockItemData.horsePowerCC} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            horsePowerCC: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Seating Capacity</p>
                        <input type="number" name="horsePowerCC" value={stockItemData.seatingCapacity} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            seatingCapacity: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Type Of Body</p>
                        <input type="text" name="typeOfBody" value={stockItemData.typeOfBody} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            typeOfBody: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Emission Type</p>
                        <input type="text" name="emissionType" value={stockItemData.emissionType} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            emissionType: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Vehical Identification Number</p>
                        <input type="text" name="vehicleIdentificationNumber" value={stockItemData.vehicleIdentificationNumber} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            vehicleIdentificationNumber: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}

                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Basic</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={stockItemData.exShowroomPrice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            exShowroomPrice: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={stockItemData.tcsOnExShowroomPercent} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            tcsOnExShowroomPercent: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={stockItemData.tcsOnExShowroomAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            tcsOnExShowroomAmount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={stockItemData.insurance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            insurance: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={stockItemData.rtoTaxIndividual} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            rtoTaxIndividual: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={stockItemData.rtoTaxCompany} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            rtoTaxCompany: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={stockItemData.roadSideAssistance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            roadSideAssistance: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={stockItemData.rubberMattingKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            rubberMattingKit: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={stockItemData.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            fourthFifthYearExtendedWarranty: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={stockItemData.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            additionalPremiumOnEngineProtection: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={stockItemData.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            additionalPremiumOnReturnToInvoice: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={stockItemData.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            fiveYearsorSixtyKmShiedOfTrust: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={stockItemData.totalIndividualOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            totalIndividualOnRoad: e.target.value,
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={stockItemData.totalCompanyOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            totalCompanyOnRoad: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={stockItemData.basicAccessoriesKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            basicAccessoriesKit: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Margin</p>
                        <input type="number" name="margin" value={stockItemData.margin} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            margin: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Cost</p>
                        <input type="number" name="color" value={stockItemData.totalCost} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            totalCost: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Discount Threshold</p>
                        <input type="number" name="color" value={stockItemData.discountThreshold} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discountThreshold: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Financer</p>
                        <input type="text" name="purchaseFinancer" value={stockItemData.purchaseFinancer} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            purchaseFinancer: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Interest Rate</p>
                        <input type="number" name="purchaseFinanceInterestRate" value={stockItemData.purchaseFinanceInterestRate} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            purchaseFinanceInterestRate: e.target.value,
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Amount</p>
                        <input type="number" name="purchaseFinanceAmount" value={stockItemData.purchaseFinanceAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            purchaseFinanceAmount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Account Number</p>
                        <input type="number" name="purchaseFinanceAccountNumber" value={stockItemData.purchaseFinanceAccountNumber} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            purchaseFinanceAccountNumber: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Post Offer</p>
                      <hr />

                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={stockItemData.postOffer && stockItemData.postOffer.exShowroomPrice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={stockItemData.postOffer && stockItemData.postOffer.tcsOnExShowroomPercent} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={stockItemData.postOffer && stockItemData.postOffer.tcsOnExShowroomAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={stockItemData.postOffer && stockItemData.postOffer.insurance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={stockItemData.postOffer && stockItemData.postOffer.rtoTaxIndividual} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={stockItemData.postOffer && stockItemData.postOffer.rtoTaxCompany} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={stockItemData.postOffer && stockItemData.postOffer.roadSideAssistance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={stockItemData.postOffer && stockItemData.postOffer.rubberMattingKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={stockItemData.postOffer && stockItemData.postOffer.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={stockItemData.postOffer && stockItemData.postOffer.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={stockItemData.postOffer && stockItemData.postOffer.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={stockItemData.postOffer && stockItemData.postOffer.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={stockItemData.postOffer && stockItemData.postOffer.totalIndividualOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={stockItemData.postOffer && stockItemData.postOffer.totalCompanyOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={stockItemData.postOffer && stockItemData.postOffer.basicAccessoriesKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (

                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Schemes</p>
                        <select
                          name="schemeID"

                          value={stockItemData.schemeID}
                          onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              schemeID: e.target.value,

                            });
                          }}
                        >
                          <option value="" selected>
                            Select Scheme
                          </option>
                          {schemesList &&
                            schemesList.map((schemes) => (
                              <option value={schemes.uuid} >
                                {schemes.displayName}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Offer</p>
                        <select
                          name="offerID"

                          value={stockItemData.offerID}
                          onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              offerID: e.target.value,

                            });
                          }}
                        >
                          <option value="" selected>
                            Select Offer
                          </option>
                          {offerList &&
                            offerList.map((offer) => (
                              <option value={offer.uuid} >
                                {offer.displayName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Oem To Dealership Discount</p>
                        <input type="number" name="oemToDealershipDiscount" value={stockItemData.oemToDealershipDiscount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            oemToDealershipDiscount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Justification</p>
                        <input type="text" name="justification" value={stockItemData.justification} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            justification: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Is Reconciliation Candidate</p>
                        <input type="checkbox" checked={stockItemData.isReconciliationCandidate ? true : false} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            isReconciliationCandidate: true
                          });
                        }} value="true" /> Yes
                        <input type="checkbox" checked={stockItemData.isReconciliationCandidate ? false : true} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            isReconciliationCandidate: false
                          });
                        }} value="false" /> No
                    </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (

                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Inter Dealership Transfer</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.exShowroomPrice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.tcsOnExShowroomPercent} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.tcsOnExShowroomAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.insurance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.rtoTaxIndividual} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.rtoTaxCompany} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.roadSideAssistance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.rubberMattingKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.totalIndividualOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.totalCompanyOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.basicAccessoriesKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}

                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Discounted</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={stockItemData.discounted && stockItemData.discounted.exShowroomPrice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={stockItemData.discounted && stockItemData.discounted.tcsOnExShowroomPercent} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={stockItemData.discounted && stockItemData.discounted.tcsOnExShowroomAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={stockItemData.discounted && stockItemData.discounted.insurance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={stockItemData.discounted && stockItemData.discounted.rtoTaxIndividual} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={stockItemData.discounted && stockItemData.discounted.rtoTaxCompany} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={stockItemData.discounted && stockItemData.discounted.roadSideAssistance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={stockItemData.discounted && stockItemData.discounted.rubberMattingKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={stockItemData.discounted && stockItemData.discounted.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={stockItemData.discounted && stockItemData.discounted.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={stockItemData.discounted && stockItemData.discounted.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={stockItemData.discounted && stockItemData.discounted.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={stockItemData.discounted && stockItemData.discounted.totalIndividualOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={stockItemData.discounted && stockItemData.discounted.totalCompanyOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={stockItemData.discounted && stockItemData.discounted.basicAccessoriesKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {
                    stockItemData.type === "Accessories" && (
                      <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                        <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Accessories</p>
                        <hr />

                        <div style="margin:8px 0;">
                          <p class="form-label">Serial Number</p>
                          <input type="text" name="serialNumber" value={stockItemData.serialNumber} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              serialNumber: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">HSN Code</p>
                          <input type="text" name="hsnCode" value={stockItemData.hsnCode} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              hsnCode: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Number</p>
                          <input type="text" name="partNumber" value={stockItemData.partNumber} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              partNumber: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Name</p>
                          <input type="text" name="partName" value={stockItemData.partName} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              partName: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Model</p>
                          <input type="text" name="model" value={stockItemData.model} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              model: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Type</p>
                          <input type="text" name="partType" value={stockItemData.partType} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              partType: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Price</p>
                          <input type="number" name="price" value={stockItemData.price} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              price: e.target.value,
                            });
                          }} />
                        </div>
                      </div>
                    )}


                  {
                    stockItemData.type === "Service" && (
                      <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                        <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Service</p>
                        <hr />
                        <div style="margin:8px 0;">
                          <p class="form-label">cost</p>
                          <input type="number" name="cost" value={stockItemData.cost} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              cost: e.target.value,
                            });
                          }} />
                        </div>
                        <div style="margin:8px 0;">
                          <p class="form-label">Margin</p>
                          <input type="number" name="margin" value={stockItemData.margin} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              margin: e.target.value,
                            });
                          }} />
                        </div>
                        <div style="margin:8px 0;">
                          <p class="form-label">Discount Threshold</p>
                          <input type="number" name="discountThreshold" value={stockItemData.discountThreshold} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              discountThreshold: e.target.value,
                            });
                          }} />
                        </div>
                      </div>
                    )}


                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" style="margin-right:5px" type='submit'>Save</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleAddStockItemModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Stock Item Details" modalSize="is-full-height"
        modalDisplay={(isStockItemDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleStockItemDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateStockItem(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >

                    <div style="margin:8px 0;">
                      <p class="form-label">Name</p>
                      <input type="text" name="name" required value={stockItemData.name} onChange={(e) => {
                        setStockItemData({
                          ...stockItemData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name</p>
                      <input type="text" name="displayName" required value={stockItemData.displayName} onChange={(e) => {
                        setStockItemData({
                          ...stockItemData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Catalogue Item</p>
                      <select
                        name="catalogueItem"

                        value={stockItemData.catalogueID}
                        onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            catalogueID: e.target.value,

                          });
                        }}
                      >
                        <option value="" >
                          Select Catalogue Item
                          </option>
                        {catalogueItemList &&
                          catalogueItemList.map((catalogueItem) => (
                            <option value={catalogueItem.uuid} selected={catalogueItem.uuid === stockItemData.catalogueItemID} >
                              {catalogueItem.displayName}
                            </option>
                          ))}
                      </select>
                    </div>


                    <div style="margin:8px 0;">
                      <p class="form-label">Third Party</p>
                      <select
                        name="thirdPartyID"

                        value={stockItemData.thirdPartyID}
                        onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            thirdPartyID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Third Party
                         </option>
                        {thirdPartyList &&
                          thirdPartyList.map((thirdParty) => (
                            <option value={thirdParty.uuid} selected={thirdParty.uuid === stockItemData.thirdParty} >
                              {thirdParty.displayName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Type</p>
                      <select
                        value={stockItemData.type}
                        onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            type: e.target.value,
                          });
                        }}
                      >
                        <option value="" >
                          Select Type
                         </option>
                        <option
                          name="Product"
                          value="Product"
                          selected={
                            stockItemData.type === "Product"
                          }
                        >
                          Product
                         </option>
                        <option
                          name="Service"
                          value="Service"
                          selected={
                            stockItemData.type ===
                            "Service"
                          }
                        >
                          Service
                         </option>
                        <option
                          name="Accessories"
                          value="Accessories"
                          selected={
                            stockItemData.type === "Accessories"
                          }
                        >
                          Accessories
                         </option>
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Descripton</p>
                      <input type="text" name="descripton" value={stockItemData.description} onChange={(e) => {
                        setStockItemData({
                          ...stockItemData,
                          descripton: e.target.value,
                        });
                      }} />
                    </div>
                  </div>


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                      <div style="margin:8px 0;">
                        <p class="form-label">Model Category</p>
                        <input type="text" name="modelCategory" value={stockItemData.modelCategory} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            modelCategory: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Model Name</p>
                        <input type="text" name="modelName" value={stockItemData.modelName} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            modelName: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Variant</p>
                        <input type="text" name="variant" value={stockItemData.variant} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            variant: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Model Sub Variant</p>
                        <input type="text" name="modelSubVariant" value={stockItemData.modelSubVariant} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            modelSubVariant: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Color Code</p>
                        <input type="text" name="colorCode" value={stockItemData.colorCode} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            colorCode: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Variant Code</p>
                        <input type="text" name="variantCode" value={stockItemData.variantCode} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            variantCode: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">HSN Code</p>
                        <input type="text" name="hsnCode" value={stockItemData.hsnCode} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            hsnCode: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px ;border:4px solid #003468;' >
                      <div style="margin:8px 0;">
                        <p class="form-label">Fuel Type</p>
                        <input type="text" name="fuelType" value={stockItemData.fuelType} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            fuelType: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Class Of Vehicle</p>
                        <input type="text" name="classOfVehicle" value={stockItemData.classOfVehicle} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            classOfVehicle: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Color</p>
                        <input type="text" name="color" value={stockItemData.color} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            color: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Interior Color</p>
                        <input type="text" name="interiorColor" value={stockItemData.interiorColor} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interiorColor: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">ExteriorColor</p>
                        <input type="text" name="exteriorColor" value={stockItemData.exteriorColor} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            exteriorColor: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Gross Vehicle Weight</p>
                        <input type="number" name="grossVehicleWeight" value={stockItemData.grossVehicleWeight} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            grossVehicleWeight: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Unladen Weight</p>
                        <input type="number" name="unladenWeight" value={stockItemData.unladenWeight} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            unladenWeight: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Number Of Cylinders</p>
                        <input type="number" name="numberOfCylinders" value={stockItemData.numberOfCylinders} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            numberOfCylinders: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Horse PowerCC</p>
                        <input type="number" name="horsePowerCC" value={stockItemData.horsePowerCC} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            horsePowerCC: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Seating Capacity</p>
                        <input type="number" name="horsePowerCC" value={stockItemData.seatingCapacity} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            seatingCapacity: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Type Of Body</p>
                        <input type="text" name="typeOfBody" value={stockItemData.typeOfBody} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            typeOfBody: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Emission Type</p>
                        <input type="text" name="emissionType" value={stockItemData.emissionType} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            emissionType: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Vehical Identification Number</p>
                        <input type="text" name="vehicleIdentificationNumber" value={stockItemData.vehicleIdentificationNumber} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            vehicleIdentificationNumber: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}

                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Basic</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={stockItemData.exShowroomPrice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            exShowroomPrice: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={stockItemData.tcsOnExShowroomPercent} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            tcsOnExShowroomPercent: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={stockItemData.tcsOnExShowroomAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            tcsOnExShowroomAmount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={stockItemData.insurance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            insurance: e.target.value,
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={stockItemData.rtoTaxIndividual} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            rtoTaxIndividual: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={stockItemData.rtoTaxCompany} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            rtoTaxCompany: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={stockItemData.roadSideAssistance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            roadSideAssistance: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={stockItemData.rubberMattingKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            rubberMattingKit: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={stockItemData.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            fourthFifthYearExtendedWarranty: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={stockItemData.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            additionalPremiumOnEngineProtection: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={stockItemData.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            additionalPremiumOnReturnToInvoice: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={stockItemData.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            fiveYearsorSixtyKmShiedOfTrust: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={stockItemData.totalIndividualOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            totalIndividualOnRoad: e.target.value,
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={stockItemData.totalCompanyOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            totalCompanyOnRoad: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={stockItemData.basicAccessoriesKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            basicAccessoriesKit: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Margin</p>
                        <input type="number" name="margin" value={stockItemData.margin} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            margin: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Cost</p>
                        <input type="number" name="color" value={stockItemData.totalCost} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            totalCost: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Discount Threshold</p>
                        <input type="number" name="color" value={stockItemData.discountThreshold} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discountThreshold: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Financer</p>
                        <input type="text" name="purchaseFinancer" value={stockItemData.purchaseFinancer} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            purchaseFinancer: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Interest Rate</p>
                        <input type="number" name="purchaseFinanceInterestRate" value={stockItemData.purchaseFinanceInterestRate} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            purchaseFinanceInterestRate: e.target.value,
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Amount</p>
                        <input type="number" name="purchaseFinanceAmount" value={stockItemData.purchaseFinanceAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            purchaseFinanceAmount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Purchase Finance Account Number</p>
                        <input type="number" name="purchaseFinanceAccountNumber" value={stockItemData.purchaseFinanceAccountNumber} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            purchaseFinanceAccountNumber: e.target.value,
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Post Offer</p>
                      <hr />

                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={stockItemData.postOffer && stockItemData.postOffer.exShowroomPrice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={stockItemData.postOffer && stockItemData.postOffer.tcsOnExShowroomPercent} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={stockItemData.postOffer && stockItemData.postOffer.tcsOnExShowroomAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={stockItemData.postOffer && stockItemData.postOffer.insurance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={stockItemData.postOffer && stockItemData.postOffer.rtoTaxIndividual} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={stockItemData.postOffer && stockItemData.postOffer.rtoTaxCompany} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={stockItemData.postOffer && stockItemData.postOffer.roadSideAssistance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={stockItemData.postOffer && stockItemData.postOffer.rubberMattingKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={stockItemData.postOffer && stockItemData.postOffer.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={stockItemData.postOffer && stockItemData.postOffer.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={stockItemData.postOffer && stockItemData.postOffer.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={stockItemData.postOffer && stockItemData.postOffer.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={stockItemData.postOffer && stockItemData.postOffer.totalIndividualOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={stockItemData.postOffer && stockItemData.postOffer.totalCompanyOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={stockItemData.postOffer && stockItemData.postOffer.basicAccessoriesKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            postOffer: {
                              ...stockItemData.postOffer,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (

                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Schemes</p>
                        <select
                          name="schemeID"

                          value={stockItemData.schemeID}
                          onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              schemeID: e.target.value,

                            });
                          }}
                        >
                          <option value="" selected>
                            Select Scheme
                         </option>
                          {schemesList &&
                            schemesList.map((schemes) => (
                              <option value={schemes.uuid} selected={schemes.uuid === stockItemData.schemeID} >
                                {schemes.displayName}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Offer</p>
                        <select
                          name="offerID"

                          value={stockItemData.offerID}
                          onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              offerID: e.target.value,

                            });
                          }}
                        >
                          <option value="" >
                            Select Offer
                         </option>
                          {offerList &&
                            offerList.map((offer) => (
                              <option value={offer.uuid} selected={offer.uuid === stockItemData.offerID} >
                                {offer.displayName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <div style="margin:8px 0;">
                        <p class="form-label">Oem To Dealership Discount</p>
                        <input type="number" name="oemToDealershipDiscount" value={stockItemData.oemToDealershipDiscount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            oemToDealershipDiscount: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Justification</p>
                        <input type="text" name="justification" value={stockItemData.justification} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            justification: e.target.value,
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Is Reconciliation Candidate</p>
                        <input type="checkbox" checked={stockItemData.isReconciliationCandidate ? true : false} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            isReconciliationCandidate: true
                          });
                        }} value="true" /> Yes
                       <input type="checkbox" checked={stockItemData.isReconciliationCandidate ? false : true} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            isReconciliationCandidate: false
                          });
                        }} value="false" /> No
                   </div>
                    </div>
                  )}


                  {stockItemData.type === "Product" && (

                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Inter Dealership Transfer</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.exShowroomPrice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.tcsOnExShowroomPercent} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.tcsOnExShowroomAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.insurance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.rtoTaxIndividual} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.rtoTaxCompany} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.roadSideAssistance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.rubberMattingKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.totalIndividualOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>


                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.totalCompanyOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={stockItemData.interDealershipTransfer && stockItemData.interDealershipTransfer.basicAccessoriesKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            interDealershipTransfer: {
                              ...stockItemData.interDealershipTransfer,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}

                  {stockItemData.type === "Product" && (
                    <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                      <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Discounted</p>
                      <hr />
                      <div style="margin:8px 0;">
                        <p class="form-label">Ex Showroom Price</p>
                        <input type="number" name="exShowroomPrice" value={stockItemData.discounted && stockItemData.discounted.exShowroomPrice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              exShowroomPrice: e.target.value
                            }

                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Percent</p>
                        <input type="number" name="tcsOnExShowroomPercent" value={stockItemData.discounted && stockItemData.discounted.tcsOnExShowroomPercent} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              tcsOnExShowroomPercent: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">Tcs On ExShowroom Amount</p>
                        <input type="number" name="tcsOnExShowroomAmount" value={stockItemData.discounted && stockItemData.discounted.tcsOnExShowroomAmount} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              tcsOnExShowroomAmount: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Insurance</p>
                        <input type="number" name="insurance" value={stockItemData.discounted && stockItemData.discounted.insurance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              insurance: e.target.value
                            }
                          });
                        }} />
                      </div>
                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Individual</p>
                        <input type="number" name="rtoTaxIndividual" value={stockItemData.discounted && stockItemData.discounted.rtoTaxIndividual} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              rtoTaxIndividual: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">RTO Tax Company</p>
                        <input type="number" name="rtoTaxCompany" value={stockItemData.discounted && stockItemData.discounted.rtoTaxCompany} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              rtoTaxCompany: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Road Side Assistance</p>
                        <input type="number" name="roadSideAssistance" value={stockItemData.discounted && stockItemData.discounted.roadSideAssistance} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              roadSideAssistance: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Rubber Matting Kit</p>
                        <input type="number" name="rubberMattingKit" value={stockItemData.discounted && stockItemData.discounted.rubberMattingKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              rubberMattingKit: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Fourth Fifth Year Extended Warranty</p>
                        <input type="number" name="fourthFifthYearExtendedWarranty" value={stockItemData.discounted && stockItemData.discounted.fourthFifthYearExtendedWarranty} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              fourthFifthYearExtendedWarranty: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Engine Protection</p>
                        <input type="number" name="additionalPremiumOnEngineProtection" value={stockItemData.discounted && stockItemData.discounted.additionalPremiumOnEngineProtection} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              additionalPremiumOnEngineProtection: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Additional Premium On Return To Invoice</p>
                        <input type="number" name="additionalPremiumOnReturnToInvoice" value={stockItemData.discounted && stockItemData.discounted.additionalPremiumOnReturnToInvoice} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              additionalPremiumOnReturnToInvoice: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Five Years or Sixty Km Shied Of Trust</p>
                        <input type="number" name="fiveYearsorSixtyKmShiedOfTrust" value={stockItemData.discounted && stockItemData.discounted.fiveYearsorSixtyKmShiedOfTrust} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              fiveYearsorSixtyKmShiedOfTrust: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Individual On Road</p>
                        <input type="number" name="totalIndividualOnRoad" value={stockItemData.discounted && stockItemData.discounted.totalIndividualOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              totalIndividualOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Total Company On Road</p>
                        <input type="number" name="totalCompanyOnRoad" value={stockItemData.discounted && stockItemData.discounted.totalCompanyOnRoad} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              totalCompanyOnRoad: e.target.value
                            }
                          });
                        }} />
                      </div>

                      <div style="margin:8px 0;">
                        <p class="form-label">Basic Accessories Kit</p>
                        <input type="number" name="basicAccessoriesKit" value={stockItemData.discounted && stockItemData.discounted.basicAccessoriesKit} onChange={(e) => {
                          setStockItemData({
                            ...stockItemData,
                            discounted: {
                              ...stockItemData.discounted,
                              basicAccessoriesKit: e.target.value
                            }
                          });
                        }} />
                      </div>
                    </div>
                  )}


                  {
                    stockItemData.type === "Accessories" && (
                      <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                        <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Accessories</p>
                        <hr />

                        <div style="margin:8px 0;">
                          <p class="form-label">Serial Number</p>
                          <input type="text" name="serialNumber" value={stockItemData.serialNumber} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              serialNumber: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">HSN Code</p>
                          <input type="text" name="hsnCode" value={stockItemData.hsnCode} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              hsnCode: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Number</p>
                          <input type="text" name="partNumber" value={stockItemData.partNumber} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              partNumber: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Name</p>
                          <input type="text" name="partName" value={stockItemData.partName} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              partName: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Model</p>
                          <input type="text" name="model" value={stockItemData.model} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              model: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Part Type</p>
                          <input type="text" name="partType" value={stockItemData.partType} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              partType: e.target.value,
                            });
                          }} />
                        </div>

                        <div style="margin:8px 0;">
                          <p class="form-label">Price</p>
                          <input type="number" name="price" value={stockItemData.price} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              price: e.target.value,
                            });
                          }} />
                        </div>
                      </div>
                    )}


                  {
                    stockItemData.type === "Service" && (
                      <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                        <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Service</p>
                        <hr />
                        <div style="margin:8px 0;">
                          <p class="form-label">cost</p>
                          <input type="number" name="cost" value={stockItemData.cost} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              cost: e.target.value,
                            });
                          }} />
                        </div>
                        <div style="margin:8px 0;">
                          <p class="form-label">Margin</p>
                          <input type="number" name="margin" value={stockItemData.margin} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              margin: e.target.value,
                            });
                          }} />
                        </div>
                        <div style="margin:8px 0;">
                          <p class="form-label">Discount Threshold</p>
                          <input type="number" name="discountThreshold" value={stockItemData.discountThreshold} onChange={(e) => {
                            setStockItemData({
                              ...stockItemData,
                              discountThreshold: e.target.value,
                            });
                          }} />
                        </div>
                      </div>
                    )}

                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" style="margin-right:5px" type='submit'>Update</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleStockItemDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal
        title="Transaction and History"
        modalSize="is-full-height"
        modalDisplay={
          isStockItemHistoryModalOpen ? "show-modal" : "hide-modal"
        }
        onClose={(e) => toggleStockItemHistoryModal(e)}
      >
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {stockItemHistoryList.map((attachment, index) => (
                      <div
                        class={
                          "container-report " +
                          (index % 2 === 0 ? "left-report" : "right-report")
                        }
                      >
                        <div class="content-report">
                          <p class="event-title">
                            Changed Attribute: {attachment.changedAttribute}
                          </p>
                          <p class="event-title">
                            New Value: {attachment.newValue}
                          </p>
                          <p class="event-title">
                            Old Value: {attachment.oldValue}
                          </p>
                          <p class="event-timestamp">
                            By {attachment.userName} on &nbsp;
                            <em>
                              {formatDateTime(attachment.updatedAt)} @{" "}
                              {
                                formatDateTime(
                                  attachment.updatedAt,
                                  true
                                ).split(",")[1]
                              }
                            </em>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button
                    type="button"
                    class="button button-cancel"
                    onClick={(e) => toggleStockItemHistoryModal(e)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* <Modal
        title="Transaction and History"
        modalSize="is-full-height"
        modalDisplay={
          isStockItemHistoryEmpty ? "show-modal" : "hide-modal"
        }
        onClose={(e) => toggleStockItemHistoryEmptyModal(e)}
      >
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">No updates</div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button
                    type="button"
                    class="button button-cancel"
                    onClick={(e) => toggleStockItemHistoryEmptyModal(e)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      {/*
        ModifiedBy: Vihang
        Modified On: 4 May 2022
        Modification: file upload field added in add scheme form
      */}
      <Modal title="Add Schemes" modalSize="is-full-height"
        modalDisplay={(isAddSchemesModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddSchemesModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveSchemes(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;'>

                    {/*
                    Modified By: Pratik
                    Modified On: 09 Jun 2021
                    added * and required field added to the input boxes and buttons aligned at center
              */}

                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" required value={schemesData.name} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={schemesData.displayName} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>
                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Stock Item</p>
                      <select
                        name="stockItemID"
                        // required
                        value={schemesData.stockItemID}
                        onChange={(e) => {
                          setSchemesData({
                            ...schemesData,
                            stockItemID: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Stock Item
                          </option>
                        {stockItemList &&
                          stockItemList.map((stockItem) => (
                            <option value={stockItem.uuid} >
                              {stockItem.name}
                            </option>
                          ))}
                      </select>
                          </div>*/}
                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Model</p>

                      <select
                        name="catalogueID"
                        // required
                        value={schemesData.catalogueID}
                        onChange={(e) => {

                          setSchemesData({
                            ...schemesData,
                            catalogueID: e.target.value
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Model
                          </option>
                        {catalogueList &&
                          catalogueList.map((catalogue) => (
                            <option value={catalogue.uuid}>
                              {catalogue.typeOfCatalogue}
                            </option>
                          ))}
                      </select>
                          </div>*/}
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Model</p>{/*Removed -  <sup class="star-mandatory-entry">*</sup> */}

                      <select
                        name="catalogueItemID"
                        // required
                        value={schemesData.catalogueItemID}
                        onChange={(e) => {
                          getVariantForSelectedModel(e.target.value)
                          setSchemesData({
                            ...schemesData,
                            catalogueItemID: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Model
                          </option>
                        {catalogueItemList &&
                          catalogueItemList.map((catalogueItem) => (
                            <option value={catalogueItem.uuid} >
                              {catalogueItem.displayName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      {
                        variantList && (
                          <div style="margin:8px 0;">
                            <p class="form-label">Select Model</p>
                          <select style="text-transform:capitalize" type="text" id='variant' value={schemesData.variantID} onChange={e => {
                            // getVariantDetails(e.target.value)
                            setSchemesData({
                              ...schemesData,
                              variantID: e.target.value,
                            });
                          }}>
                            <option value="" selected>Select Variant</option>
                            {/* <option value="GL">GL</option>
                            <option value="L">L</option> */}
                            {
                              variantList.map((variant)=>(
                                <option style="text-transform:capitalize" value={variant.uuid}>{variant.variant}</option>
                              ))
                            }
                          </select>
                        </div>
                        )
                      }
                    </div>

                    <div style="margin:8px 0;">
                            <p class="form-label">Select Fule Type</p>
                          <select type="text" id='typeOfFuel' value={schemesData.typeOfFuel} onChange={e => {
                            setSchemesData({
                              ...schemesData,
                              typeOfFuel: e.target.value,
                            });
                          }}>
                            <option value="" selected>Select Fuel Type</option>
                            <option value="CNG">CNG</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                          </select>
                        </div>



                    <div style="margin:8px 0;">
                      <p class="form-label">Third Party<sup class="star-mandatory-entry">*</sup></p>

                      <select
                        name="thirdPartyID"
                        //required
                        value={schemesData.thirdPartyID}
                        onChange={(e) => {
                          setSchemesData({
                            ...schemesData,
                            thirdPartyID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Third Party
                          </option>
                        {thirdPartyList &&
                          thirdPartyList.map((thirdParty) => (
                            <option value={thirdParty.uuid} >
                              {thirdParty.displayName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Upload File</p>
                      <input type="file" name="Upload File" onChange={(e) => {
                        fileUploadObj = e.target.files
                        console.log(e.target.files,"target filessss")
                        console.log(fileUploadObj,"upload filess")
                        setFileUploadObj(fileUploadObj)

                        // setSchemesData({
                        //   ...schemesData,
                        //   fileID: e.target.files
                        // });
                      }} />
                    </div>

                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Schemes Status<sup class="star-mandatory-entry">*</sup></p>

                      <select
                        value={schemesData.schemesStatus}
                        onChange={(e) => {
                          setSchemesData({
                            ...schemesData,
                            schemesStatus: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Status
                          </option>
                        <option
                          name="Valid"
                          value="Valid"
                          selected={
                            schemesData.schemesStatus === "Valid"
                          }
                        >
                          Valid
                          </option>
                        <option
                          name="Invalid"
                          value="Invalid"
                          selected={
                            schemesData.schemesStatus ===
                            "Invalid"
                          }
                        >
                          Invalid
                          </option>
                        <option
                          name="Draft"
                          value="Draft"
                          selected={
                            schemesData.schemesStatus === "Draft"
                          }
                        >
                          Draft
                          </option>
                      </select>
                        </div>*/}
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">HMIL Share</p>
                      <input type="number" min='0' name="HMILShare" value={schemesData.HMILShare} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          HMILShare: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Dealer Share</p>
                      <input type="number" min='0' name="dealerShare" value={schemesData.dealerShare} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          dealerShare: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Discount After GST</p>
                      <input type="number" min='0' name="discountAfterGST" value={schemesData.discountAfterGST} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          discountAfterGST: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Discount Before GST</p>
                      <input type="number" min='0' name="discountBeforeGST" value={schemesData.discountBeforeGST} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          discountBeforeGST: e.target.value,
                        });
                      }} />
                    </div>
                    {/* <div style="margin:8px 0;">
                      <p class="form-label">Duration<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="duration" required value={schemesData.duration} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          duration: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Is Scheme Claimed<sup class="star-mandatory-entry">*</sup></p>

                      <input type="checkbox" checked={schemesData.isSchemeClaimed ? true : false} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          isSchemeClaimed: true
                        });
                      }} value="true" /> Yes
                        <input type="checkbox" checked={schemesData.isSchemeClaimed ? false : true} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          isSchemeClaimed: false
                        });
                      }} value="false" /> No
                    </div> */}

                    <div style="margin:8px 0;">
                      <p class="form-label">Start Date<sup class="star-mandatory-entry">*</sup></p>

                      <input type="date" name="startDate" required value={schemesData.startDate} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          startDate: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">End Date<sup class="star-mandatory-entry">*</sup></p>

                      <input type="date" name="endDate" required value={schemesData.endDate} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          endDate: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Required Documents</p>

                      <input type="text" name="requireDocuments" required value={schemesData.requireDocuments} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          requireDocuments: e.target.value,
                        });
                      }} />
                    </div>
                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Validity<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="validity" required value={schemesData.validity} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          validity: e.target.value,
                        });
                      }} />
                    </div> */}
                  </div>
                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">   {/* aligned buttons center */}
                    <button class="button button-action" type='submit'>Save</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleAddSchemesModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      {/*
        ModifiedBy: Vihang
        Modified On: 4 May 2022
        Modification: uploaded file link added in update scheme form
      */}
      <Modal title="Schemes Details" modalSize="is-full-height"
        modalDisplay={(isSchemesDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleSchemesDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateSchemes(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;'>

                    {/*
                    Modified By: Pratik
                    Modified On: 09 Jun 2021
                    added * and required field added to the input boxes and buttons aligned at center
                  */}
                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="name" required value={schemesData.name} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="displayName" required value={schemesData.displayName} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Stock Item</p> {/* removed ---> <sup class="star-mandatory-entry">*</sup> */}

                      <select
                        name="stockItemID"
                        // required
                        value={schemesData.stockItemID}
                        onChange={(e) => {
                          setSchemesData({
                            ...schemesData,
                            stockItemID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Stock Item
                          </option>
                        {stockItemList &&
                          stockItemList.map((stockItem) => (
                            <option value={stockItem.uuid} >
                              {stockItem.displayName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Catalogue</p>{/* removed ---> <sup class="star-mandatory-entry">*</sup> */}

                      <select
                        name="catalogueID"
                        // required
                        value={schemesData.catalogueID}
                        onChange={(e) => {
                          setSchemesData({
                            ...schemesData,
                            catalogueID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue
                          </option>
                        {catalogueList &&
                          catalogueList.map((catalogue) => (
                            <option value={catalogue.uuid} >
                              {catalogue.typeOfCatalogue}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Catalogue Item</p>  {/* removed ---> <sup class="star-mandatory-entry">*</sup> */}

                      <select
                        name="catalogueItemID"
                        // required
                        value={schemesData.catalogueItemID}
                        onChange={(e) => {
                          setSchemesData({
                            ...schemesData,
                            catalogueItemID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue Item
                          </option>
                        {catalogueItemList &&
                          catalogueItemList.map((catalogueItem) => (
                            <option value={catalogueItem.uuid} >
                              {catalogueItem.displayName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Third Party<sup class="star-mandatory-entry">*</sup></p>

                      <select
                        name="thirdPartyID"
                        required
                        value={schemesData.thirdPartyID}
                        onChange={(e) => {
                          setSchemesData({
                            ...schemesData,
                            thirdPartyID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue Item
                          </option>
                        {thirdPartyList &&
                          thirdPartyList.map((thirdParty) => (
                            <option value={thirdParty.uuid}>
                              {thirdParty.displayName}
                            </option>
                          ))}
                      </select>
                    </div>
                    {schemesData && schemesData.uploadedFileSrc && (
                      <div style="margin:8px 0;">
                        <p class="form-label">Uploaded File</p>
                        <a href={schemesData.uploadedFileSrc} download>Download file
                        </a>
                        </div>
                    )}
                    <div style="margin:8px 0;">
                      <p class="form-label">Schemes Status<sup class="star-mandatory-entry">*</sup></p>

                      <select
                        value={schemesData.schemesStatus}
                        onChange={(e) => {
                          setSchemesData({
                            ...schemesData,
                            schemesStatus: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Status
                          </option>
                        <option
                          name="Valid"
                          value="Valid"
                          selected={
                            schemesData.schemesStatus === "Valid"
                          }
                        >
                          Valid
                          </option>
                        <option
                          name="Invalid"
                          value="Invalid"
                          selected={
                            schemesData.schemesStatus ===
                            "Invalid"
                          }
                        >
                          Invalid
                          </option>
                        <option
                          name="Draft"
                          value="Draft"
                          selected={
                            schemesData.schemesStatus === "Draft"
                          }
                        >
                          Draft
                          </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">Code<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="displayName" required value={schemesData.code} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          code: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Discount<sup class="star-mandatory-entry">*</sup></p>

                      <input type="number" name="discount" required value={schemesData.discount} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          discount: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Duration<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="duration" required value={schemesData.duration} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          duration: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Is Scheme Claimed<sup class="star-mandatory-entry">*</sup></p>

                      <input type="checkbox" checked={schemesData.isSchemeClaimed ? true : false} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          isSchemeClaimed: true
                        });
                      }} value="true" /> Yes
                        <input type="checkbox" checked={schemesData.isSchemeClaimed ? false : true} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          isSchemeClaimed: false
                        });
                      }} value="false" /> No
                </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Start Date<sup class="star-mandatory-entry">*</sup></p>

                      <input type="date" name="startDate" required value={schemesData.startDate} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          startDate: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">End Date<sup class="star-mandatory-entry">*</sup></p>

                      <input type="date" name="endDate" required value={schemesData.endDate} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          endDate: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Validity<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="validity" required value={schemesData.validity} onChange={(e) => {
                        setSchemesData({
                          ...schemesData,
                          validity: e.target.value,
                        });
                      }} />
                    </div>
                  </div>
                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type='submit'>Update</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleSchemesDetailsModalVisibilityClosed(e)}>Cancel</button>

                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isSchemesHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleSchemesHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      schemesHistoryList.map((attachment, index) => (
                        <div class={'container-report ' + ((index % 2 === 0) ? 'left-report' : 'right-report')}>
                          <div class="content-report">
                            <p class="event-title">Changed Attribute: {attachment.changedAttribute}</p>
                            <p class="event-title">New Value: {attachment.newValue}</p>
                            <p class="event-title">Old Value: {attachment.oldValue}</p>
                            <p class="event-timestamp">By {attachment.userName} on &nbsp;
                              <em>{formatDateTime(attachment.updatedAt)} @ {formatDateTime(attachment.updatedAt, true).split(',')[1]}</em></p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleSchemesHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isSchemesHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleSchemesHistoryEmptyModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    No updates
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleSchemesHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal title="Add Offer" modalSize="is-full-height"
        modalDisplay={(isAddOfferModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddOfferModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveOffer(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;'>

                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="name" required value={offerData.name} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="displayName" required value={offerData.displayName} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                            <p class="form-label">Offer Type</p>
                          <select type="text" id='offerType' value={schemesData.offerType} onChange={e => {
                            setOfferData({
                              ...offerData,
                              offerType: e.target.value,
                            });
                          }}>
                            <option value="" selected>Select Offer Type</option>
                            <option value="CASH DISCOUNT">CASH DISCOUNT</option>
                            <option value="SPOT INCENTIVE">SPOT INCENTIVE</option>
                            <option value="AGEING DISCOUNT ">AGEING DISCOUNT </option>
                            <option value="SPECIAL YEAR END SCHEME ">SPECIAL YEAR END SCHEME </option>
                            <option value="TEST DRIVE ">TEST DRIVE </option>
                            <option value="INSURANCE MATCH ">INSURANCE MATCH </option>
                            <option value="ACCESSORIES">ACCESSORIES</option>
                          </select>
                        </div>
                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Offer Type<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="offerType" required value={offerData.offerType} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          offerType: e.target.value,
                        });
                      }} />
                    </div>*/}

                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Stock Item</p>

                      <select
                        name="stockItemID"
                        // To uncomments once stockItem Crud done
                        // required
                        value={offerData.stockItemID}
                        onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            stockItemID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Stock Item
                      </option>
                        {stockItemList &&
                          stockItemList.map((stockItem) => (
                            <option value={stockItem.uuid} >
                              {stockItem.name}
                            </option>
                          ))}
                      </select>
                          </div>*/}
                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Catalogue</p>

                      <select
                        name="catalogueID"
                        // required
                        value={offerData.catalogueID}
                        onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            catalogueID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue
                      </option>
                        {catalogueList &&
                          catalogueList.map((catalogue) => (
                            <option value={catalogue.uuid} >
                              {catalogue.typeOfCatalogue}
                            </option>
                          ))}
                      </select>
                          </div>*/}
                    <div style="margin:8px 0;">
                      <p class="form-label">Model</p>  {/* removed ---> <sup class="star-mandatory-entry">*</sup> */}

                      <select
                        name="catalogueItemID"
                        required
                        value={offerData.catalogueItemID}
                        onChange={(e) => {
                          getVariantForSelectedModel(e.target.value)
                          setOfferData({
                            ...offerData,
                            catalogueItemID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Model Item
                    </option>
                        {catalogueItemList &&
                          catalogueItemList.map((catalogueItem) => (
                            <option value={catalogueItem.uuid} >
                              {catalogueItem.displayName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      {
                        variantList && (
                          <div style="margin:8px 0;">
                            <p class="form-label">Select Variant</p>
                          <select style="text-transform:capitalize" type="text" id='variant' value={setOfferData.variantID} onChange={e => {
                            // getVariantDetails(e.target.value)
                            setOfferData({
                              ...offerData,
                              variantID: e.target.value,
                            });
                          }}>
                            <option value="" selected>Select Variant</option>
                            {/* <option value="GL">GL</option>
                            <option value="L">L</option> */}
                            {
                              variantList.map((variant)=>(
                                <option style="text-transform:capitalize" value={variant.uuid}>{variant.variant}</option>
                              ))
                            }
                          </select>
                        </div>
                        )
                      }
                    </div>

                    <div style="margin:8px 0;">
                            <p class="form-label">Select Fule Type</p>
                          <select type="text" id='typeOfFuel' value={setOfferData.typeOfFuel} onChange={e => {
                            setOfferData({
                              ...offerData,
                              typeOfFuel: e.target.value,
                            });
                          }}>
                            <option value="" selected>Select Fuel Type</option>
                            <option value="CNG">CNG</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                          </select>
                        </div>
                        <div style="margin:8px 0;">
                      <p class="form-label">Color<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="color" required value={offerData.color} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          color: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Dealership<sup class="star-mandatory-entry">*</sup></p>

                      <select
                        name="dealershipID"
                        required
                        value={offerData.dealershipID}
                        onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            dealershipID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Dealership
                    </option>
                        {dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid} >
                              {dealership.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Vin Number</p> {/* removed ---> <sup class="star-mandatory-entry">*</sup> */}

                      <input type="text" name="vinNumber"
                        //  required
                        value={offerData.vinNumber} onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            vinNumber: e.target.value,
                          });
                        }} />
                    </div>
                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Status<sup class="star-mandatory-entry">*</sup></p>

                      <select
                        value={offerData.offerStatus}
                        onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            offerStatus: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Status
                                              </option>
                        <option
                          name="Valid"
                          value="Valid"
                          selected={
                            offerData.offerStatus === "Valid"
                          }
                        >
                          Valid
                                              </option>
                        <option
                          name="Invalid"
                          value="Invalid"
                          selected={
                            offerData.offerStatus ===
                            "Invalid"
                          }
                        >
                          Invalid
                                              </option>
                        <option
                          name="Draft"
                          value="Draft"
                          selected={
                            offerData.offerStatus === "Draft"
                          }
                        >
                          Draft
                                              </option>
                      </select>
                        </div>*/}
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                  <div style="margin:8px 0;">
                      <p class="form-label">Scheme Offered By<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="schemeOfferedBy" required value={offerData.schemeOfferedBy} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          schemeOfferedBy: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">aging</p>

                      <input type="text" name="aging" required value={offerData.aging} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          aging: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Coupon Code<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="couponCode" required value={offerData.couponCode} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          couponCode: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Discount<sup class="star-mandatory-entry">*</sup></p>

                      <input type="number" name="discount" required value={offerData.discount} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          discount: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Duration<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="duration" required value={offerData.duration} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          duration: e.target.value,
                        });
                      }} />
                    </div>
                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Is Renegotiated<sup class="star-mandatory-entry">*</sup></p>

                      <input type="checkbox" checked={offerData.isRenegotiated ? true : false} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          isRenegotiated: true
                        });
                      }} value="true" /> Yes
                                          <input type="checkbox" checked={offerData.isRenegotiated ? false : true} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          isRenegotiated: false
                        });
                      }} value="false" /> No
                    </div>*/}

                    <div style="margin:8px 0;">
                      <p class="form-label">Start Date<sup class="star-mandatory-entry">*</sup></p>

                      <input type="date" name="startDate" required value={offerData.startDate} onChange={(e) => {
                        getDifferenceInDays('startDate', e.target.value)
                        setOfferData({
                          ...offerData,
                          startDate: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">End Date<sup class="star-mandatory-entry">*</sup></p>

                      <input type="date" name="endDate" required value={offerData.endDate} onChange={(e) => {
                        getDifferenceInDays('endDate', e.target.value)
                        setOfferData({
                          ...offerData,
                          endDate: e.target.value,
                        });
                      }} />
                    </div>
                    {/*<div style="margin:8px 0;">
                      <p class="form-label">Validity<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="validity" required value={offerData.validity} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          validity: e.target.value,
                        });
                      }} />
                    </div>*/}

                  </div>
                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">

                    <button class="button button-action" style="margin-right:5px" type='submit'>Save</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleAddOfferModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Offer Details" modalSize="is-full-height"
        modalDisplay={(isOfferDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleOfferDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateOffer(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;'>


                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="name" required value={offerData.name} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          name: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="displayName" required value={offerData.displayName} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          displayName: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Stock Item</p> {/* removed ---> <sup class="star-mandatory-entry">*</sup> */}

                      <select
                        name="stockItemID"
                        // To uncomments once stockItem Crud done
                        // required
                        value={offerData.stockItemID}
                        onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            stockItemID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Stock Item
                    </option>
                        {stockItemList &&
                          stockItemList.map((stockItem) => (
                            <option value={stockItem.uuid} >
                              {stockItem.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Catalogue
                      {/* <sup class="star-mandatory-entry">*</sup> */}
                      </p>

                      <select
                        name="catalogueID"
                        // required
                        value={offerData.catalogueID}
                        onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            catalogueID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue
                    </option>
                        {catalogueList &&
                          catalogueList.map((catalogue) => (
                            <option value={catalogue.uuid}>
                              {catalogue.typeOfCatalogue}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Catalogue Item
                      {/* <sup class="star-mandatory-entry">*</sup> */}
                      </p>

                      <select
                        name="catalogueItemID"
                        // required
                        value={offerData.catalogueItemID}
                        onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            catalogueItemID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue Item
                    </option>
                        {catalogueItemList &&
                          catalogueItemList.map((catalogueItem) => (
                            <option value={catalogueItem.uuid} >
                              {catalogueItem.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Dealership<sup class="star-mandatory-entry">*</sup></p>

                      <select
                        name="dealershipID"
                        required
                        value={offerData.dealershipID}
                        onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            dealershipID: e.target.value,

                          });
                        }}
                      >
                        <option value="" selected>
                          Select Catalogue Item
                    </option>
                        {dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid} >
                              {dealership.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Status<sup class="star-mandatory-entry">*</sup></p>

                      <select
                        value={offerData.offerStatus}
                        onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            offerStatus: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected>
                          Select Status
                                              </option>
                        <option
                          name="Valid"
                          value="Valid"
                          selected={
                            offerData.offerStatus === "Valid"
                          }
                        >
                          Valid
                                              </option>
                        <option
                          name="Invalid"
                          value="Invalid"
                          selected={
                            offerData.offerStatus ===
                            "Invalid"
                          }
                        >
                          Invalid
                                              </option>
                        <option
                          name="Draft"
                          value="Draft"
                          selected={
                            offerData.status === "Draft"
                          }
                        >
                          Draft
                                              </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">Code<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="displayName" required value={offerData.code} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          code: e.target.value,
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Discount<sup class="star-mandatory-entry">*</sup></p>

                      <input type="number" name="discount" required value={offerData.discount} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          discount: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Duration<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="duration" required value={offerData.duration} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          duration: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Is Renegotiated<sup class="star-mandatory-entry">*</sup></p>

                      <input type="checkbox" checked={offerData.isRenegotiated ? true : false} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          isRenegotiated: true
                        });
                      }} value="true" /> Yes
                                          <input type="checkbox" checked={offerData.isRenegotiated ? false : true} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          isRenegotiated: false
                        });
                      }} value="false" /> No
                                  </div>

                    <div style="margin:8px 0;">
                      <p class="form-label">Start Date<sup class="star-mandatory-entry">*</sup></p>

                      <input type="date" name="startDate" required value={offerData.startDate} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          startDate: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">End Date<sup class="star-mandatory-entry">*</sup></p>

                      <input type="date" name="endDate" required value={offerData.endDate} onChange={(e) => {
                        setOfferData({
                          ...offerData,
                          endDate: e.target.value,
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Vin Number
                      {/* <sup class="star-mandatory-entry">*</sup> */}
                      </p>
                      <input type="text" name="vinNumber"
                        //  required
                        value={offerData.vinNumber} onChange={(e) => {
                          setOfferData({
                            ...offerData,
                            vinNumber: e.target.value,
                          });
                        }} />
                    </div>
                  </div>
                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" style="margin-right:5px" type='submit'>Update</button>
                    <button type="button" class="button button-cancel" style="margin-left:5px" onClick={(e) => toggleOfferDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isOfferHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleOfferHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      offerHistoryList.map((attachment, index) => (
                        <div class={'container-report ' + ((index % 2 === 0) ? 'left-report' : 'right-report')}>
                          <div class="content-report">
                            <p class="event-title">Changed Attribute: {attachment.changedAttribute}</p>
                            <p class="event-title">New Value: {attachment.newValue}</p>
                            <p class="event-title">Old Value: {attachment.oldValue}</p>
                            <p class="event-timestamp">By {attachment.userName} on &nbsp;
                              <em>{formatDateTime(attachment.updatedAt)} @ {formatDateTime(attachment.updatedAt, true).split(',')[1]}</em></p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleOfferHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isOfferHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleOfferHistoryEmptyModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    No updates
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleOfferHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal title="Add Tenant" modalSize="is-full-height"
        modalDisplay={(isAddTenantModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddTenantModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveTenant(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                {/*
                       Modified By: Pratik
                       Modified On: 09 Jun 2021
                       added * and required field added to the input boxes and buttons aligned at center
               */}
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup> </p>
                      <input type="text" name="name" value={tenantData.name} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          name: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" value={tenantData.displayName} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          displayName: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address Line 1<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="addressLine1" value={tenantData.addressLine1} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          addressLine1: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address Line 2</p>
                      <input type="text" name="addressLine2" value={tenantData.addressLine2} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          addressLine2: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address City<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="addressCity" value={tenantData.addressCity} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          addressCity: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address State<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="addressState" value={tenantData.addressState} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          addressState: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address Zipcode<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number"  placeholder="Enter a valid 6 digit Zipcode" name="addressZipcode" value={tenantData.addressZipcode}   onInput={(e)=>checkValidation(e,"ZIPCODE","Tenant")} required />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="contactPersonName" value={tenantData.contactPersonName} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          contactPersonName: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Email<sup class="star-mandatory-entry">*</sup></p>
                      <input type="email" name="contactPersonEmail" value={tenantData.contactPersonEmail} required onInput={(e)=>checkValidation(e,"EMAIL","Tenant")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Mobile<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number" placeholder="Mobile number should be 10 digits only" name="contactPersonMobile" value={tenantData.contactPersonMobile}  onInput={(e)=>checkValidation(e,"MOBILE NUMBER","Tenant")} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Key Person Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="keyPersonName" value={tenantData.keyPersonName} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          keyPersonName: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Key Person Email<sup class="star-mandatory-entry">*</sup></p>
                      <input type="email" name="keyPersonEmail" value={tenantData.keyPersonEmail} onInput={(e)=>checkValidation(e,"EMAIL","Tenant")} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Key Person Mobile<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text"  placeholder="Mobile number should be 10 digits only" name="keyPersonMobile" value={tenantData.keyPersonMobile}  onInput={(e)=>checkValidation(e,"MOBILE NUMBER","Tenant")} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Key Person Address<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="keyPersonAddress" value={tenantData.keyPersonAddress} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          keyPersonAddress: e.target.value
                        });
                      }} required />
                    </div>
                  </div>
                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type="submit" >Save</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleAddTenantModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Tenant Details" modalSize="is-full-height"
        modalDisplay={(isTenantDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleTenantDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateTenant(e)}>
            <div class="row" style="height:80vh; overflow:auto">
              <div class="col-xs-12">
                <div class="row form-elements modal-form">
                  {/*
                       Modified By: Pratik
                       Modified On: 09 Jun 2021
                       added * and required field added to the input boxes and buttons aligned at center
               */}
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="name" value={tenantData.name} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          name: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="displayName" value={tenantData.displayName} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          displayName: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address Line 1<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="addressLine1" value={tenantData.addressLine1} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          addressLine1: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address Line 2</p>

                      <input type="text" name="addressLine2" value={tenantData.addressLine2} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          addressLine2: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address City<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="addressCity" value={tenantData.addressCity} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          addressCity: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address State<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="addressState" value={tenantData.addressState} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          addressState: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Address Zipcode<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number"  placeholder="Enter a valid 6 digit Zipcode" name="addressZipcode" value={tenantData.addressZipcode}   onInput={(e)=>checkValidation(e,"ZIPCODE","Tenant")} required />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p class="form-label">Contact Person Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="contactPersonName" value={tenantData.contactPersonName} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          contactPersonName: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">contact Person Email<sup class="star-mandatory-entry">*</sup></p>

                      <input type="email" name="contactPersonEmail" value={tenantData.contactPersonEmail} onInput={(e)=> checkValidation(e,'EMAIL',"Tenant")} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">contact Person Mobile<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text"  placeholder="Mobile number should be 10 digits only" name="contactPersonMobile" value={tenantData.contactPersonMobile} onInput={(e)=>checkValidation(e,"MOBILE NUMBER","Tenant")} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Key Person Name<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="keyPersonName" value={tenantData.keyPersonName} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          keyPersonName: e.target.value
                        });
                      }} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Key Person Email<sup class="star-mandatory-entry">*</sup></p>

                      <input type="email" name="keyPersonEmail" value={tenantData.keyPersonEmail} onInput={(e)=> checkValidation(e,'EMAIL',"Tenant")} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Key Person Mobile<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" placeholder="Mobile number should be 10 digits only" name="keyPersonMobile" value={tenantData.keyPersonMobile} onInput={(e)=>checkValidation(e,"MOBILE NUMBER","Tenant")} required />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Key Person Address<sup class="star-mandatory-entry">*</sup></p>

                      <input type="text" name="keyPersonAddress" value={tenantData.keyPersonAddress} onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          keyPersonAddress: e.target.value
                        });
                      }} required />
                    </div>
                  </div>
                </div>
                <div class="row form-footer">
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type="submit" >Update</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleTenantDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isBranchHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleTenantHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      tenantHistoryList.map((attachment, index) => (
                        <div class={'container-report ' + ((index % 2 === 0) ? 'left-report' : 'right-report')}>
                          <div class="content-report">
                            <p class="event-title">Changed Attribute: {attachment.changedAttribute}</p>
                            <p class="event-title">New Value: {attachment.newValue}</p>
                            <p class="event-title">Old Value: {attachment.oldValue}</p>
                            <p class="event-timestamp">By {attachment.userName} on &nbsp;
                           <em>{formatDateTime(attachment.updatedAt)} @ {formatDateTime(attachment.updatedAt, true).split(',')[1]}</em></p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleTenantHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isBranchHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleTenantHistoryEmptyModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    No updates
               </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 has-text-right">
              <div class="row form-footer">
                <div class="col-xs-12 has-text-right">
                  <button type="button" class="button button-cancel" onClick={(e) => toggleTenantHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal2 title="Price" modalSize="is-small-right" height="is-small-right "
        modalDisplay={(isPriceBreakup ? 'show-modal' : 'hide-modal')} onClose={(e) => togglePriceBreakup(e)} >
        <ModalBody2 modalPadding="noPadding" modalFullHeight="fullHeight" onClose={(e) => togglePriceBreakup(e)} />
      </Modal2>
    </div>
  );
};

export default SiloAdministration;
