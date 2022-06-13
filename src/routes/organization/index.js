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
import orgchart from 'orgchart';
import $ from "jquery";

const userInfo = getItem('userinfo');
let setAllBranchesData, setAllDepartmentData, setAllRolesData;

const Organization = () => {
  // You can also pass a callback to the setter
  const imageTypeExtension = ['png', 'jpg', 'jpeg'];
  const pathname = window.location.pathname;
  const userInfo = getItem('userinfo');
  let [isRefreshpage, setRefreshpage] = useState(false);
  let [isRefreshpageUpdate, setRefreshpageUpdate] = useState(false);
  let [mainTabOptions, setMainTabOptions] = useState([]);
  let [moreTabOptions, setMoreTabOptions] = useState([]);
  let [menuDropdownPositions, setMenuDropdownPositions] = useState({});
  let [isTabsConfigurable, setIsTabsConfigurable] = useState(true);
  let [activePageTabItem, setActivePageTabItem] = useState('Organization Chart');
  let [currentPageNo, setCurrentPageNo] = useState(1);
  let [pageSize, setPageSize] = useState(5);
  let [totalPages, setTotalPages] = useState(0);
  let [dataset, setDataSet] = useState([]);
  let [isSearchFilterPopup, setSearchFilterPopup] = useState(false);
  let [isSettingsDropdownOpen, setSettingsDropdownVisibility] = useState(false);
  let [isStatusDropdownOpen, setStatusDropdownVisibility] = useState(false);
  let [isEdit, setIsEditable] = useState(false);
  let [filter, setFilter] = useState("");
  let [sort, setSort] = useState("");
  let [action, setAction] = useState("");
  let [isAddUserModalOpen, setAddUserModalVisibility] = useState(false);
  let [isUserDetailsModalOpen, setUserDetailsModalVisibility] = useState(false);
  let [userData, setUserData] = useState({});
  let [updatedBranchList, setUpdatedBranchList] = useState('');
  let [updatedDepartmentList, setUpdatedDepartmentList] = useState('');
  let [updatedRoleList, setUpdatedRoleList] = useState('');
  let [dealershipList, setDealershipList] = useState([]);
  let [dealershipData, setDealershipData] = useState({});
  let [isAddDealershipModalOpen, setAddDealerModalVisibility] = useState(false);
  let [isDealershipDetailsModalOpen, setDealershipDetailsModalVisibility] = useState(false);
  let [dropDownComponent, setDropDownComponent] = useState('');
  let [isDealershipHistoryModalOpen, setDealershipHistoryModalVisibility] = useState(false);
  let [selectedDealershipHistory, setSelectedDealershipHistory] = useState({});
  let [dealershipHistoryList, setDealershipHistoryList] = useState([]);
  let [allUsers, setAllUsers] = useState([]);
  let [isDealershipHistoryEmpty, setDealershipHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteDealershipOpen, setDeleteDealership] = useState(false);
  let [branchList, setBranchList] = useState([]);
  let [branchData, setBranchData] = useState({});
  let [isAddBranchModalOpen, setAddBranchModalVisibility] = useState(false);
  let [isBranchDetailsModalOpen, setBranchDetailsModalVisibility] = useState(false);
  let [isBranchHistoryModalOpen, setBranchHistoryModalVisibility] = useState(false);
  let [selectedBranchHistory, setSelectedBranchHistory] = useState({});
  let [branchHistoryList, setBranchHistoryList] = useState([]);
  let [isBranchHistoryEmpty, setBranchHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteBranchOpen, setDeleteBranch] = useState(false);
  let [departmentList, setDepartmentList] = useState([]);
  let [filteredBranchList, setFilterBranchList] = useState([]);
  let [departmentData, setDepartmentData] = useState({});
  let [agreement, setAgreement] = useState({});
  let [agreementList, setAgreementList] = useState([]);
  let [isAddDepartmentModalOpen, setAddDepartmentModalVisibility] = useState(false);
  let [isDepartmentDetailsModalOpen, setDepartmentDetailsModalVisibility] = useState(false);
  let [isDepartmentHistoryModalOpen, setDepartmentHistoryModalVisibility] = useState(false);
  let [selectedDepartmentHistory, setSelectedDepartmentHistory] = useState({});
  let [departmentHistoryList, setDepartmentHistoryList] = useState([]);
  let [isDepartmentHistoryEmpty, setDepartmentHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteDepartmentOpen, setDeleteDepartment] = useState(false);
  let [truncateFilteredBranches, setTruncatedFilteredBranches] = useState(false);
  let [roleList, setRoleList] = useState([]);
  let [filteredRoleList, setFilteredRoleList] = useState([])
  let [roleData, setRoleData] = useState({});
  let [filteredDepartmentList, setFilteredDepartmentList] = useState([]);
  let [isAddRoleModalOpen, setAddRoleModalVisibility] = useState(false);
  let [isRoleDetailsModalOpen, setRoleDetailsModalVisibility] = useState(false);
  let [isRoleHistoryModalOpen, setRoleHistoryModalVisibility] = useState(false);
  let [selectedRoleHistory, setSelectedRoleHistory] = useState({});
  let [roleHistoryList, setRoleHistoryList] = useState([]);
  let [isRoleHistoryEmpty, setRoleHistoryEmptyModalVisibility] = useState(false);
  let [isDeleteRoleOpen, setDeleteRole] = useState(false);
  let [isUserHistoryModalOpen, setUserHistoryModalVisibility] = useState(false);
  let [selectedUserHistory, setSelectedUserHistory] = useState({});
  let [userHistoryList, setUserHistoryList] = useState([]);
  let [isUserHistoryEmpty, setUserHistoryEmptyModalVisibility] = useState(false);
  let [dealershipTableData, setDealershipTableData] = useState({
    columns: [],
    rows: []
  });
  let [branchTableData, setBranchTableData] = useState({
    columns: [],
    rows: []
  });
  let [departmentTableData, setDepartmentTableData] = useState({
    columns: [],
    rows: []
  });
  let [roleTableData, setRoleTableData] = useState({
    columns: [],
    rows: []
  });
  let [userTableData, setUserTableData] = useState({
    columns: [],
    rows: []
  });

  let [modalTitle, setModalTitle] = useState('');
  let [entity, setEntity] = useState('');
  let [entityData, setEntityData] = useState({});
  let [entityName, setEntityName] = useState('');
  // let [action, setAction] = useState('');
  let [isAddEntityModalOpen, setAddEntityModalOpen] = useState(false);
  let [isModalOpen, setModalOpen] = useState(false);
  let [AllDealearships, setAllDealearships] = useState([]);
  let [AllBranches, setAllBranches] = useState([]);
  let [AllDepartments, setAllDepartments] = useState([]);
  let [AllRoles, setAllRoles] = useState([]);
  // let [AllUsers, setAllUsers] = useState([]);
  let [userList, setUserList] = useState([]);
  let [filteredUserList, setFilteredUserList] = useState([])

  let [FilteredDealearships, setFilteredDealearships] = useState([]);
  let [FilteredBranches, setFilteredBranches] = useState([]);
  let [FilteredDepartments, setFilteredDepartments] = useState([]);
  let [FilteredRoles, setFilteredRoles] = useState([]);
  let [FilteredUsers, setFilteredUsers] = useState([]);
  let [selectedDealershipID, setSelectedDealershipID] = useState([]);
  let [selectedBranchID, setSelectedBranchID] = useState([]);
  let [selectedDepartmentID, setSelectedDepartmentID] = useState([]);
  let [selectedRoleID, setSelectedRoleID] = useState([]);
  let [isShowTreeNodeModelVisible, setisShowTreeNodeModelVisible] = useState(false);
  let [chartNodeDetails, setChartNodeDetails] = useState();
  // let [dealershipList, setDealershipList] = useState();
  // let [branchList, setBranchList] = useState();
  // let [roleList, setRoleList] = useState();
  // let [departmentList, setDepartmentList] = useState();
  let [createData, setCreateData] = useState({});


  let [isAddOrgUserModalOpen, setAddOrgUserModalVisibility] = useState(false);
  let [orgUserData, setOrgUserData] = useState({});



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

  useEffect(async () => {

    let mainTabOptions = [
      {
        label: 'Organization Chart',
        isAddItem: true,
        isCounter: false,
        isPercentage: false,
        isEditable: true,
        isDraggable: true
      },
      {
        label: 'Dealership',
        isAddItem: true,
        isCounter: false,
        isPercentage: false,
        isEditable: true,
        isDraggable: true
      }, {
        label: 'Branch',
        isAddItem: true,
        isCounter: false,
        isPercentage: false,
        isEditable: true,
        isDraggable: true
      }, {
        label: 'Department',
        isAddItem: true,
        isCounter: false,
        isPercentage: false,
        isEditable: true,
        isDraggable: true,
      }, {
        label: 'Role',
        isAddItem: true,
        isCounter: false,
        isPercentage: false,
        isEditable: true,
        isDraggable: true
      }, {
        label: 'User',
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

    setMainTabOptions(mainTabOptions);
    setMoreTabOptions(moreTabOptions);
    setMenuDropdownPositions(menuDropdownPositions);
    getDealershipListByCondition();
    getAgreementList();
    getBranchList()
    getDepartmentMapping()
    getRoleList()
    getUserList()
    getUserCount()
    getOrgChart();
    getAllList()
  }, [isRefreshpage, sort, filter]);



  /*********************************************************Dealership************************************************* */

  async function getRowsListForDealership(data) {
    const colList = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
      },
      // {
      //   label: 'Name',
      //   field: 'displayName',
      //   sort: 'asc'
      // },
      {
        label: 'Short Name',
        field: 'shortName',
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
      let shortName = p.shortName;
      let type = p.type;
      let subType = p.subType;
      let status = p.status;
      // let history = "View"
      let uuid = p.uuid
      let obej = { displayName, shortName, type, subType, status, uuid, ...p };   //removed name field from obej
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }

  async function getAgreementList() {
    let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/agreements?activationStatus=active`);
    if (response) {
      // console.log(response)
      setAgreementList([...response.data]);
    }
  }

  async function getDealershipListByCondition() {
    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'dealershipList', email: userInfo.email });
        await setDealershipList(response.data);
        const tableDataList = await getRowsListForDealership(response.data);
        dealershipTableData = tableDataList;
        await setDealershipTableData(dealershipTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setDealershipList(response.data);
        const tableDataList = await getRowsListForDealership(response.data);
        dealershipTableData = tableDataList;
        await setDealershipTableData(dealershipTableData);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'dealershipList', email: userInfo.email });
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setDealershipList(response.data);
        const tableDataList = await getRowsListForDealership(response.data);
        dealershipTableData = tableDataList;
        await setDealershipTableData(dealershipTableData);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'dealershipList', email: userInfo.email });
      } else {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setDealershipList(response.data);
        const tableDataList = await getRowsListForDealership(response.data);
        dealershipTableData = tableDataList;
        // console.log("dealershipData ===>",dealershipData)
        await setDealershipTableData(dealershipTableData);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'dealershipList', email: userInfo.email });
      }
      // setDealershipList(response.data);
      setRefreshpage(false);
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Get Dealership', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function saveDealarship(e) {
    e.preventDefault();
    try {
      // delete dealershipData.scannedDocuments
      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createDealership`, dealershipData);
      setDealershipData({});
      if (response.status === 200) {
        //uploadfile to AWS S3

        // console.log(dealershipData,'doc')
        // let files = dealershipData.scannedDocuments[0]
        // let fileObj
        // if (!files) return;
        // const fileName = files.name;
        // const extension = fileName.split('.').pop();
        // if (imageTypeExtension.includes(extension.toLowerCase())) {
        //      fileObj = {
        //     name: files.name,
        //     size: files.size,
        //     type: files.type,
        //     value: files.name,
        //   };
        // } else {
        //   alert('Looks like the file you tried to upload did not match the system. Kindly upload only a .png, .jpg, .jpeg file');
        // }
        // console.log('fileObj=>',fileObj,'**files=>',files)
        // let payload = {
        //     docID:response.data[0].uuid,
        //     file:fileObj
        // }
        // await axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrlForAnyDoc`, payload).then((res)=>{
        //   if (res && res.data) {
        //     fileDetails = res.data;
        //     let obej = {
        //       scannedDocuments:fileDetails.uuid
        //     }
        //     await axios.put(`${CONSTANTS.API_URL}/api/v1/updateDealership/${response.data[0].uuid}`, obej);
        //     try {
        //       //  Save File on S3
        //       const opts = {
        //         headers: {
        //           name: 'Content-Type',
        //           value: 'multipart/form-data',
        //         }
        //       };
        //       const fileUpload = await Axios.put(fileDetails.signedURL, files, opts);
        //     } catch (e) {
        //       console.error(e);
        //     }
        //   }
        // })

        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Dealrship', email: userInfo.email });
        setAgreement({
          ...agreement,
          dealershipID: response.data.uuid,
        })
        let AgreementResponse = await axios.post(`${CONSTANTS.API_URL}/api/v1/agreement`, agreement);
        setAgreement({});
        if (AgreementResponse.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Agreement', email: userInfo.email });
        }
        setRefreshpage(true);
      }
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Dealrship', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
    setAddDealerModalVisibility(false);
    await getDealershipListByCondition()
  }

  async function updateDealarship(e) {
    e.preventDefault();
    try {
      let dealershipID = dealershipData.uuid
      delete dealershipData.uuid;
      delete dealershipData.updatedAt;
      delete dealershipData.updatedBy;
      delete dealershipData._id;
      delete dealershipData.createdBy;
      delete dealershipData.createdAt;
      delete dealershipData.deletedAt;
      delete dealershipData.__v;
      delete dealershipData.version;
      // console.log(dealershipData)
      let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateDealership/${dealershipID}`, dealershipData);
      if (response.status === 200) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Dealrship', email: userInfo.email });
        let agreementID = agreement.uuid;
        delete agreement.uuid;
        agreement.startDate = new Date(agreement.startDate);
        agreement.endDate = new Date(agreement.endDate);
        agreement.renewalDate = new Date(agreement.renewalDate);
        agreement.renewalReminder = new Date(agreement.renewalReminder);
        // console.log(agreement, typeof agreement.startDate);
        let AgreementResponse = await axios.put(`${CONSTANTS.API_URL}/api/v1/agreement/${agreementID}`, agreement);
        if (AgreementResponse.status === 200)
          setRefreshpage(true);
      }
      setDealershipDetailsModalVisibility(false);
      setDealershipData({});
      setAgreement({})
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Dealership', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }

  }
  async function getDealershipDetails(dealership) {
    // console.log(dealership)
    await setAgreement({});
    let selectedAgreement = agreementList.filter((ele) => ele.dealershipID === dealership.uuid);
    // console.log(selectedAgreement)
    if (selectedAgreement.length !== 0) {
      let AgreementData = selectedAgreement[0];
      if (AgreementData.startDate) {
        AgreementData.startDate = AgreementData.startDate.split('T')[0];
      }
      if (AgreementData.endDate) {
        AgreementData.endDate = AgreementData.endDate.split('T')[0];
      }
      if (AgreementData.renewalDate) {
        AgreementData.renewalDate = AgreementData.renewalDate.split('T')[0];
      }
      if (AgreementData.renewalReminder) {
        AgreementData.renewalReminder = AgreementData.renewalReminder.split('T')[0];
      }
      await setAgreement({
        uuid: AgreementData.uuid,
        startDate: AgreementData.startDate,
        endDate: AgreementData.endDate,
        duration: AgreementData.duration,
        renewalDate: AgreementData.renewalDate,
        renewalReminder: AgreementData.renewalReminder,
      })
    } else {
      let AgreementResponse = await axios.post(`${CONSTANTS.API_URL}/api/v1/agreement`, { dealershipID: dealership.uuid });
      if (AgreementResponse.status === 200) {
        // console.log(AgreementResponse.data)
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Agreement', email: userInfo.email });
        await setAgreement({
          uuid: AgreementResponse.data.uuid,
          startDate: '',
          endDate: '',
          duration: '',
          renewalDate: '',
          renewalReminder: ''
        })
      }
    }
    await setDealershipData({
      name: '',
      displayName: '',
      dealerCode: '',
      keyPerson: "",
      location: '',
      noOfBranches: '',
      shortName: '',
      status: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      isSMSConfigured: false,
      isEmailConfigured: false,
      type: '',
      subType: ''
    })
    await setDealershipData(dealership);
    toggleDealershipDetailsModalVisibility();
  }
  async function toggleAddDealershipModalVisibility() {
    setAddDealerModalVisibility(!isAddDealershipModalOpen);
    setDealershipData({
      name: '',
      displayName: '',
      dealerCode: '',
      keyPerson: "",
      location: '',
      noOfBranches: '',
      shortName: '',
      status: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      isSMSConfigured: false,
      isEmailConfigured: false,
      type: '',
      subType: '',


    })
    setAgreement({
      startDate:null,
      endDate:null,
      renewalDate:null,
      renewalReminder:null
    })

  }

  async function toggleDealershipDetailsModalVisibility() {
    setDealershipDetailsModalVisibility(!isDealershipDetailsModalOpen);
  }
  async function toggleDealershipDetailsModalVisibilityClosed() {
    setDealershipDetailsModalVisibility(!isDealershipDetailsModalOpen);
    setDealershipData({
      name: '',
      displayName: '',
      dealerCode: '',
      keyPerson: "",
      location: '',
      noOfBranches: '',
      shortName: '',
      status: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      isSMSConfigured: false,
      isEmailConfigured: false,
      type: '',
      subType: '',
    })
    setAgreement({
      startDate:null,
      endDate:null,
      renewalDate:null,
      renewalReminder:null
    })

  }

  async function getSelectedDealershipAndOpenHistoryModal(dealership) {
    // console.log(dealership)
    try {
      if (!isDealershipHistoryModalOpen) {
        selectedDealershipHistory = dealership;
        setSelectedDealershipHistory(dealership);
        const response = await axios.get(`${CONSTANTS.API_URL}/api/v1/object/${selectedDealershipHistory.uuid}/history?objectType=dealership`);
        dealershipHistoryList = response.data;
        // setDealershipHistoryList(dealershipHistoryList);
        if (dealershipHistoryList.hasOwnProperty('token')) {
          setDealershipHistoryEmptyModalVisibility(!isDealershipHistoryEmpty);
        }
        else {
          //   dealershipHistoryList.map( async (history)=>{
          //     history.userName = await getUserName(history.createdBy);
          //   });
          setDealershipHistoryList(dealershipHistoryList);
          setDealershipHistoryModalVisibility(!isDealershipHistoryModalOpen);
        }
      }
      return 'response.data';
    } catch (e) {
      console.log(e);
    }
  }
  async function toggleDealershipHistoryModal(data) {
    getSelectedDealershipAndOpenHistoryModal(data)
    setDealershipHistoryModalVisibility(!isDealershipHistoryModalOpen);
    setDealershipHistoryList([]);
  }

  async function toggleDealershipHistoryEmptyModal(e) {
    setDealershipHistoryEmptyModalVisibility(!isDealershipHistoryEmpty);
  }


  /*********************************************************Branch************************************************* */

  async function getRowsListForBranch(data) {
    const colList = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
      },
      // {
      //   label: 'Display Name',
      //   field: 'displayName',
      //   sort: 'asc'
      // },
      {
        label: 'Short Name',
        field: 'shortName',
        sort: 'asc'
      },
      {
        label: 'Branch Code',
        field: 'branchCode',
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
      let shortName = p.shortName;
      let branchCode = p.branchCode;
      let status = p.status;
      let uuid = p.uuid
      let obej = { displayName, shortName, branchCode, status, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }

  async function getBranchList() {
    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
          { action: 'Branch List ', typeOfVisit: 'Branch List', email: userInfo.email });
        await setBranchList(response.data);
        const tableDataList = await getRowsListForBranch(response.data);
        branchTableData = tableDataList;
        await setBranchTableData(branchTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
          { action: 'Branch List ', typeOfVisit: 'Branch List', email: userInfo.email });
        await setBranchList(response.data);
        const tableDataList = await getRowsListForBranch(response.data);
        branchTableData = tableDataList;
        await setBranchTableData(branchTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
          { action: 'Branch List ', typeOfVisit: 'Branch List', email: userInfo.email });
        await setBranchList(response.data);
        const tableDataList = await getRowsListForBranch(response.data);
        branchTableData = tableDataList;
        await setBranchTableData(branchTableData);
      } else {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setBranchList(response.data);
        const tableDataList = await getRowsListForBranch(response.data);
        branchTableData = tableDataList;
        await setBranchTableData(branchTableData);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,
          { action: 'Branch List ', typeOfVisit: 'Branch List', email: userInfo.email });
      }
      let dealershipResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership`);
      await setDealershipList(dealershipResponse.data);
      await setRefreshpage(false);
      await setBranchData({});
      // console.log('outer-container-div', document.getElementById('container').offsetHeight, document.getElementById('outer-container-div').offsetHeight);
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
      if(HTTPException && HTTPException.response) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'get Brnach List', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }

    }
  }

  // function updateBranchList(dealershipID) {
  //   let branches = branchList.filter(item => {
  //     if (item.dealershipID === dealershipID) {
  //       return item;
  //     }
  //   });
  //   let departments = departmentList.filter(item => {
  //     if (item.dealershipID === dealershipID) {
  //       return item;
  //     }
  //   });
  //   let roles = roleList.filter(item => {
  //     if (item.dealershipID === dealershipID) {
  //       return item;
  //     }
  //   });
  //   setUpdatedBranchList(branches);
  //   setUpdatedDepartmentList(departments);
  //   setUpdatedRoleList(roles);
  // }


  async function getBranchDetails(branch) {
    await setBranchData({
      name: '',
      displayName: '',
      shortName: '',
      status: '',
      branchCode: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      dealershipID: ''
    });
    await setBranchData(branch);
    toggleBranchDetailsModalVisibility();
  }

  async function saveBranch(e) {
    e.preventDefault();
    try {
      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createBranch`, branchData);
      if (response.status === 200) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Branch ', email: userInfo.email });
        setRefreshpage(true);
        setBranchData({});
        setAddBranchModalVisibility(false);
        await getBranchList()
      }
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'create Branch', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function updateBranch(e) {
    e.preventDefault();
    try {
      let updateObj = {
        name: branchData.name,
        displayName: branchData.displayName,
        shortName: branchData.shortName,
        status: branchData.status,
        branchCode: branchData.branchCode,
        address: {
          line1: branchData.address.line1,
          line2: branchData.address.line1,
          city: branchData.address.city,
          state: branchData.address.state,
          zipcode: branchData.address.zipcode
        },
        dealershipID: branchData.dealershipID
      }
      let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateBranch/${branchData.uuid}`, updateObj);
      if (response.status === 200) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Branch', email: userInfo.email });
        setRefreshpage(true);
        setBranchData({});
        setBranchDetailsModalVisibility(false);
        await getBranchList()
      }
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Branch', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
    toggleBranchDetailsModalVisibility();
  }
  async function toggleAddBranchModalVisibility() {
    setBranchData({
      name: '',
      displayName: '',
      shortName: '',
      status: '',
      branchCode: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      dealershipID: ''
    });
    setAddBranchModalVisibility(!isAddBranchModalOpen);
  }

  async function toggleBranchDetailsModalVisibility() {
    setBranchDetailsModalVisibility(!isBranchDetailsModalOpen);
  }
  async function toggleBranchDetailsModalVisibilityClosed() {
    setBranchDetailsModalVisibility(!isBranchDetailsModalOpen);
    setBranchData({
      name: '',
      displayName: '',
      shortName: '',
      status: '',
      branchCode: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      dealershipID: ''
    });
  }

  async function getSelectedBranchAndOpenHistoryModal(branch) {
    try {
      if (!isBranchHistoryModalOpen) {
        selectedBranchHistory = branch;
        setSelectedBranchHistory(branch);
        const response = await axios.get(`${CONSTANTS.API_URL}/api/v1/object/${selectedBranchHistory.uuid}/history?objectType=branch`);
        branchHistoryList = response.data;
        // setBranchHistoryList(branchHistoryList);
        // console.log(branchHistoryList);
        if (branchHistoryList.hasOwnProperty('token')) {
          setBranchHistoryEmptyModalVisibility(!isBranchHistoryEmpty);
        }
        else {
          // branchHistoryList.map( async (history)=>{
          //   history.userName = await getUserName(history.createdBy);
          // });
          setBranchHistoryList(branchHistoryList);
          setBranchHistoryModalVisibility(!isBranchHistoryModalOpen);
        }
      }
      return 'response.data';
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleBranchHistoryModal(data) {
    getSelectedBranchAndOpenHistoryModal(data)
    setBranchHistoryModalVisibility(!isBranchHistoryModalOpen);
    setBranchHistoryList([]);
  }

  async function toggleBranchHistoryEmptyModal(e) {
    setBranchHistoryEmptyModalVisibility(!isBranchHistoryEmpty);
  }



  /*********************************************************Department************************************************* */

  async function getRowsListForDepartment(data) {
    let branchResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList`);
      setBranchList(branchResponse.data);
    const colList = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
      },
      // {
      //   label: 'Display Name',
      //   field: 'displayName',
      //   sort: 'asc'
      // },
      {
        label: 'Branch Name',
        field: 'branchName',
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
      // let departmentName = getDepatmentDisplayName1(userData.departmentID);
      let branchName = getBranchDisplayName1(p.branchID, branchResponse.data);

      let status = p.status;
      let history = "View"
      let uuid = p.uuid
      let obej = { displayName,branchName, status, history, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }


  async function getDepartmentMapping() {
    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping`);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'departmentList', email: userInfo.email });
        await setDepartmentList(response.data);
        const tableDataList = await getRowsListForDepartment(response.data);
        departmentTableData = tableDataList;
        await setDepartmentTableData(departmentTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping`);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'departmentList', email: userInfo.email });
        await setDepartmentList(response.data);
        const tableDataList = await getRowsListForDepartment(response.data);
        departmentTableData = tableDataList;
        await setDepartmentTableData(departmentTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping`);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'departmentList', email: userInfo.email });
        await setDepartmentList(response.data);
        const tableDataList = await getRowsListForDepartment(response.data);
        departmentTableData = tableDataList;
        await setDepartmentTableData(departmentTableData);
      } else {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping`);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'departmentList', email: userInfo.email });
        await setDepartmentList(response.data);
        const tableDataList = await getRowsListForDepartment(response.data);
        departmentTableData = tableDataList;
        await setDepartmentTableData(departmentTableData);
      }

      setRefreshpage(false);
      let dealershipResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership`);
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'getDealership list', email: userInfo.email });
      setDealershipList(dealershipResponse.data);
      let branchResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList`);
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'getBranchList', email: userInfo.email });
      setBranchList(branchResponse.data);

      /*
           ModifiedBy: Haresh
           Modified On: 21 July 2021
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
      if(HTTPException && HTTPException.response) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Get department', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }

    }

  }
  async function selectDealership(e) {
    if (dealershipList.length) {
      await filterBranches(e.target.value)
      await filterDealershipRole(e.target.value)
    }
  }

  async function filterDealershipRole(dealershipID) {
    let roleResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping`);
      // await setRoleList(roleResponse.data);
      let roleList1 = roleResponse.data;
    let filteredData = roleList1.filter(role => {
      // if (role.dealershipID == dealershipID && !role.departmentID && !role.branchID)
      return role.dealershipID == dealershipID && !role.departmentID && !role.branchID
    });
    setFilteredRoleList(filteredData)
  }

  async function filterBranches(dealerID) {
    let branchResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList`);
      // await setBranchList(branchResponse.data);
    let branchList1 = branchResponse.data;
    let filteredData = branchList1.filter(dealershipbranch => {
      return dealershipbranch.dealershipID === dealerID;
    });
    await setFilterBranchList(filteredData);
  }



  function updateDepartmentList(branchID) {
    let departments = departmentList.filter(item => {
      if (item.branchID === branchID) {
        return item;
      }
    });
    let roles = roleList.filter(item => {
      if (item.branchID === branchID) {
        return item;
      }
    });
    setUpdatedDepartmentList(departments);
    setUpdatedRoleList(roles);
  }

  async function saveDepartment(e) {
    // console.log(departmentData)
    e.preventDefault();
    try {
      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createDepartment`, departmentData);
      if (response.status === 200) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Department', email: userInfo.email });
        setRefreshpage(true);
        setDepartmentData({});
        setAddDepartmentModalVisibility(false);
        await getDepartmentMapping()
      }
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'create Department', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function updateDepartment(e) {
    e.preventDefault();
    try {
      let updateObj = {
        name: departmentData.name,
        displayName: departmentData.displayName,
        dealershipID: departmentData.dealershipID,
        branchID: departmentData.branchID,
        parentDepartmentID: departmentData.parentDepartmentID,
        isSubDepartment: departmentData.isSubDepartment
      }
      let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateDepartment/${departmentData.uuid}`, updateObj);
      if (response.status === 200) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Department', email: userInfo.email });
        setRefreshpage(true);
        setDepartmentData({});
        setDepartmentDetailsModalVisibility(false);
        setTruncatedFilteredBranches(!truncateFilteredBranches);
        setFilterBranchList([])
        await getDepartmentMapping()
      }

    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Department', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function getDepartmentDetails(department) {

    await setDepartmentData({
      name: '',
      displayName: '',
      dealershipID: '',
      branchID: ''
    })
    await setDepartmentData(department);
    await filterBranches(department.dealershipID);
    await filterDepartment(department.branchID);

    await toggleDepartmentDetailsModalVisibility();
  }

  async function toggleDepartmentModalVisibility() {
    setAddDepartmentModalVisibility(!isAddDepartmentModalOpen);
    setDepartmentData({
      name: '',
      displayName: '',
      dealershipID: '',
      branchID: ''
    })
    setFilterBranchList([]);

  }

  async function toggleDepartmentDetailsModalVisibility() {
    // console.log(truncateFilteredBranches)
    if (truncateFilteredBranches) {
      await setFilterBranchList([]);
    }
    setDepartmentDetailsModalVisibility(!isDepartmentDetailsModalOpen);
    setTruncatedFilteredBranches(!truncateFilteredBranches)
  }
  async function toggleDepartmentDetailsModalVisibilityClosed() {
    // console.log(truncateFilteredBranches)
    if (truncateFilteredBranches) {
      await setFilterBranchList([]);
    }
    setDepartmentDetailsModalVisibility(!isDepartmentDetailsModalOpen);
    setTruncatedFilteredBranches(!truncateFilteredBranches)
    setDepartmentData({
      name: '',
      displayName: '',
      dealershipID: '',
      branchID: ''
    })
  }


  async function getSelectedDepartmentAndOpenHistoryModal(department) {
    try {
      if (!isDepartmentHistoryModalOpen) {
        selectedDepartmentHistory = department;
        setSelectedDepartmentHistory(department);
        const response = await axios.get(`${CONSTANTS.API_URL}/api/v1/object/${selectedDepartmentHistory.uuid}/history?objectType=department`);
        departmentHistoryList = response.data;
        // setDepartmentHistoryList(departmentHistoryList);
        if (departmentHistoryList.hasOwnProperty('token')) {
          setDepartmentHistoryEmptyModalVisibility(!isDepartmentHistoryEmpty);
        }
        else {
          // departmentHistoryList.map( async (history)=>{
          //   history.userName = await getUserName(history.createdBy);
          // });
          setDepartmentHistoryList(departmentHistoryList);
          setDepartmentHistoryModalVisibility(!isDepartmentHistoryModalOpen);
        }
      }
      return 'response.data';
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleDepartmentHistoryModal(data) {
    getSelectedDepartmentAndOpenHistoryModal(data)
    setDepartmentHistoryModalVisibility(!isDepartmentHistoryModalOpen);
    setDepartmentHistoryList([]);
  }
  async function toggleDepartmentHistoryEmptyModal(e) {
    setDepartmentHistoryEmptyModalVisibility(!isDepartmentHistoryEmpty);
  }

  // *********************************************** Role ****************************************//

  async function getRowsListForRole(data) {
    let branchResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList`);
      setBranchList(branchResponse.data);
      let departmentResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping`);
      setDepartmentList(departmentResponse.data);
    const colList = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'Branch Name',
        field: 'branchName',
        sort: 'asc'
      },
      {
        label: 'Department Name',
        field: 'departmentName',
        sort: 'asc'
      },
      // {
      //   label: 'Display Name',
      //   field: 'displayName',
      //   sort: 'asc'
      // },
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
      let departmentName = getDepatmentDisplayName1(userData.departmentID, departmentResponse.data);
      let branchName = getBranchDisplayName1(p.branchID, branchResponse.data);
      let status = p.status;
      let history = "View"
      let uuid = p.uuid
      let obej = { displayName,branchName, departmentName,status, history, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    // console.log(listObj, 'listObj');
    return listObj;
  }

  async function getRoleList() {

    try {
      if (filter && sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping`);
        await setRoleList(response.data);
        let filteredData = response.data.filter(role => {
          // if (role.dealershipID == dealershipID && !role.departmentID && !role.branchID)
          return !role.dealershipID
        });
        console.log("filteredDatafilteredDatafilteredData",filteredData);
        setFilteredRoleList(response.data)

        const tableDataList = await getRowsListForRole(response.data);
        roleTableData = tableDataList;
        await setRoleTableData(roleTableData);
      } else if (filter) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping`);
        await setRoleList(response.data);
        const tableDataList = await getRowsListForRole(response.data);
        roleTableData = tableDataList;
        await setRoleTableData(roleTableData);
      } else if (sort) {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping}`);
        await setRoleList(response.data);
        const tableDataList = await getRowsListForRole(response.data);
        roleTableData = tableDataList;
        await setRoleTableData(roleTableData);
      } else {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping?getFor=tenant`);
        await setRoleList(response.data);
        // let filteredData = response.data.filter(role => {
        //   // if (role.dealershipID == dealershipID && !role.departmentID && !role.branchID)
        //   return !role.dealershipID
        // });
        console.log("filteredDatafilteredDatafilteredData",response.data);
        setFilteredRoleList(response.data)
        const tableDataList = await getRowsListForRole(response.data);
        roleTableData = tableDataList;
        await setRoleTableData(roleTableData);
      }

      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'get roles', email: userInfo.email });
      let departmentResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping`);
      setDepartmentList(departmentResponse.data);
      let dealershipResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership`);
      setDealershipList(dealershipResponse.data);
      let branchResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList`);
      setBranchList(branchResponse.data);
      setRefreshpage(false);
      /*
                 ModifiedBy: Haresh
                 Modified On: 21 July 2021
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
      if(HTTPException && HTTPException.response) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'get roles', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }

    }
  }

  function updateRoleList(departmentID) {
    let roles = roleList.filter(item => {
      if (item.departmentID === departmentID) {
        return item;
      }
    });
    setUpdatedRoleList(roles);
  }
  async function saveRole(e) {
    e.preventDefault();
    let response;
    try {
      response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createRole`, roleData);
      if (response.status === 200) {
        let a = await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'save roles', email: userInfo.email });
        // if (a) console.log(a)
        await setAddRoleModalVisibility(false);
        setRefreshpage(true);
        roleData({});
        setFilterBranchList([]);
        await getRoleList()
      }
    } catch (HTTPException) {
      // await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,{action:'get roles',typeOfVisit:'error',errorCode:HTTPException.response.data.statusCode,errorMessage:HTTPException.response.data.message, email:userInfo.email});
    }
  }

  async function updateRole(e) {
    e.preventDefault();
    try {
      let updateObj = {
        name: roleData.name,
        displayName: roleData.displayName,
        dealershipID: roleData.dealershipID,
        departmentID: roleData.departmentID,
        branchID: roleData.branchID
      }
      setRoleDetailsModalVisibility(false);
      let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateRole/${roleData.uuid}`, updateObj);
      if (response.status === 200) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update role', email: userInfo.email });
        setRefreshpage(true);
        setRoleData({});
        setRoleDetailsModalVisibility(false);
        setTruncatedFilteredBranches(!truncateFilteredBranches);
        setFilterBranchList([]);
        await getRoleList()
      }
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update role', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }

  }
  async function selectBranch(branchID) {
    if (dealershipList.length) {
      await filterDepartment(branchID)
      await filterBranchRole(branchID)
      await filterBranchUser(branchID)
    }
  }

  async function filterDepartment(branchId) {
    let departmentResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping`);
    let departmentList1 = departmentResponse.data;
      // await setDepartmentList(departmentResponse.data);
    let filteredData = departmentList1.filter(department => {
      return department.branchID == branchId
    });
    setFilteredDepartmentList(filteredData)
  }

  async function filterBranchRole(branchID) {
    let roleResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping`);
      // await setRoleList(roleResponse.data);
      let roleList1 = roleResponse.data;
      console.log(roleResponse, 'roleResponseroleResponse');
    let filteredData = roleList1.filter(role => {
      // if (role.dealershipID == dealershipID && !role.departmentID && !role.branchID)
      return role.branchID === branchID
    });
    console.log(filteredData, 'filteredDatafilteredDatafilteredData');
    setFilteredRoleList(filteredData)
  }
  async function filterBranchUser(branchID) {
    let filteredData = allUsers.filter(user => {
      return (user.branchID == branchID || (!user.departmentID && !user.branchID))
    });
    setFilteredUserList(filteredData)
  }

  async function getRoleDetails(role) {
    await setRoleData({
      name: '',
      displayName: '',
      dealershipID: '',
      departmentID: '',
      branchID: ''
    })
    await setRoleData(role);
    await filterBranches(role.dealershipID);
    await filterDepartment(role.branchID)
    await toggleRoleDetailsModalVisibility();
  }

  async function toggleAddRoleModalVisibility() {
    setAddRoleModalVisibility(!isAddRoleModalOpen);
    setRoleData({
      name: '',
      displayName: '',
      dealershipID: '',
      departmentID: '',
      branchID: ''
    })
    setFilterBranchList([]);
  }

  async function toggleRoleDetailsModalVisibility() {
    setRoleDetailsModalVisibility(!isRoleDetailsModalOpen);
    // console.log(truncateFilteredBranches);
    if (truncateFilteredBranches) {
      await setFilterBranchList([]);
    }
    setTruncatedFilteredBranches(!truncateFilteredBranches)
  }

  async function toggleRoleDetailsModalVisibilityClosed() {
    setRoleDetailsModalVisibility(!isRoleDetailsModalOpen);
    setRoleData({
      name: '',
      displayName: '',
      dealershipID: '',
      departmentID: '',
      branchID: ''
    })
    // console.log(truncateFilteredBranches);
    if (truncateFilteredBranches) {
      await setFilterBranchList([]);
    }
    setTruncatedFilteredBranches(!truncateFilteredBranches)
  }

  async function getSelectedRoleAndOpenHistoryModal(role) {
    try {
      if (!isRoleHistoryModalOpen) {
        selectedRoleHistory = role;
        setSelectedRoleHistory(role);
        const response = await axios.get(`${CONSTANTS.API_URL}/api/v1/object/${selectedRoleHistory.uuid}/history?objectType=role`);
        roleHistoryList = response.data;
        // setRoleHistoryList(roleHistoryList);
        if (roleHistoryList.hasOwnProperty('token')) {
          setRoleHistoryEmptyModalVisibility(!isRoleHistoryEmpty);
        }
        else {
          // roleHistoryList.map( async (history)=>{
          //   history.userName = await getUserName(history.createdBy);
          // });
          setRoleHistoryList(roleHistoryList);
          setRoleHistoryModalVisibility(!isRoleHistoryModalOpen);
        }
      }
      return 'response.data';
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleRoleHistoryModal(data) {
    getSelectedRoleAndOpenHistoryModal(data)
    setRoleHistoryModalVisibility(!isRoleHistoryModalOpen);
    setRoleHistoryList([]);
  }

  async function toggleRoleHistoryEmptyModal(e) {
    setRoleHistoryEmptyModalVisibility(!isRoleHistoryEmpty);
  }

  // *********************************************** User ****************************************//

  async function getRowsListForUser(data) {
    const colList = [
      {
        label: 'Name',
        field: 'displayName',
        sort: 'asc'
      },
      // {
      //   label: 'Display Name',
      //   field: 'displayName',
      //   sort: 'asc'
      // },
      {
        label: 'Designation',
        field: 'designation',
        sort: 'asc'
      },
      {
        label: 'Employee Code',
        field: 'employeeCode',
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
      let designation = p.designation;
      let employeeCode = p.employeeCode;
      let status = p.status;
      let history = "View"
      let uuid = p.uuid
      let obej = { displayName, designation, employeeCode, status, history, uuid, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    return listObj;
  }

  async function getUserList() {
    try {
      if (filter && sort) {
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/users?activationStatus=${filter}&sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setUserList(response.data);
        const tableDataList = await getRowsListForUser(response.data);
        userTableData = tableDataList;
        await setUserTableData(userTableData);
      } else if (filter && !sort) {
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/users?activationStatus=${filter}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setUserList(response.data);
        const tableDataList = await getRowsListForUser(response.data);
        userTableData = tableDataList;
        await setUserTableData(userTableData);
      } else if (sort && !filter) {
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/users?sortBy=${sort}&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        await setUserList(response.data);
        const tableDataList = await getRowsListForUser(response.data);
        userTableData = tableDataList;
        await setUserTableData(userTableData);
      } else {
        let params = await getSearchParams();
        let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/users?activationStatus=all&pageSize=${params.pageSize}&pageNo=${params.pageNo}`);
        // await setUserList(response.data);
        const tableDataList = await getRowsListForUser(response.data);
        userTableData = tableDataList;
        await setUserTableData(userTableData);
      }
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'get user list', email: userInfo.email });
      let roleResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping`);
      await setRoleList(roleResponse.data);
      let departmentResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping`);
      await setDepartmentList(departmentResponse.data);
      let dealershipResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership`);
      await setDealershipList(dealershipResponse.data);
      let branchResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList`);
      await setBranchList(branchResponse.data);
      await setRefreshpage(false);

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
      if(HTTPException && HTTPException.response) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'get user list', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }

    }
  }
  function getDepatmentDisplayName(depID) {
    let dep = departmentList.filter((dep) => {
      if (depID === dep.uuid) {
        return dep;
      }
    });
    if (dep && dep[0]) {
      return dep[0].displayName;
    }
  }
  function getBranchDisplayName(branchID) {
    let branch = branchList.filter((branch) => {
      if (branchID === branch.uuid) {
        return branch;
      }
    });
    if (branch && branch[0]) {
      return branch[0].displayName;
    }
  }
  function getBranchDisplayName1(branchID, branches) {
    let branch = branches.filter((branch) => {
      if (branchID === branch.uuid) {
        return branch;
      }
    });
    if (branch && branch[0]) {
      return branch[0].displayName;
    }
  }
  function getDepatmentDisplayName1(depID, departments) {
    let dep = departments.filter((dep) => {
      if (depID === dep.uuid) {
        return dep;
      }
    });
    if (dep && dep[0]) {
      return dep[0].displayName;
    }
  }
  function getRoleDisplayName(roleID) {
    let role = roleList.filter((role) => {
      if (roleID === role.uuid) {
        return role;
      }
    });
    if (role && role[0]) {
      return role[0].displayName;
    }
  }
  async function saveUser(e) {
    e.preventDefault();

    try {
      // let dealershipName = getDealershipDisplayName(userData.dealershipID);
      let branchName = getBranchDisplayName(userData.branchID);
      let departmentName = getDepatmentDisplayName(userData.departmentID);
      let roleName = getRoleDisplayName(userData.roleID);
      let payload = Object.assign({}, userData);
      payload['departmentName'] = departmentName ? departmentName : '';
      payload['branchName'] = branchName ? branchName : '';
      payload['roleName'] = roleName ? roleName : '';
      // payload['dealershipName'] = dealershipName ? dealershipName : '';

      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/user`, payload);
      if (response.status === 200) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save User', email: userInfo.email });
        setRefreshpage(true);
        setUserData({});
        setAddUserModalVisibility(false);
        await getUserList()
      }
    } catch (HTTPException) {

      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save User', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function saveOrgUser(e) {
    e.preventDefault();

    try {
      // let dealershipName = getDealershipDisplayName(orgUserData.dealershipID);
      let branchName = getBranchDisplayName(orgUserData.branchID);
      let departmentName = getDepatmentDisplayName(orgUserData.departmentID);
      let roleName = getRoleDisplayName(orgUserData.roleID);
      let payload = Object.assign({}, orgUserData);
      payload['departmentName'] = departmentName ? departmentName : '';
      payload['branchName'] = branchName ? branchName : '';
      payload['roleName'] = roleName ? roleName : '';
      // payload['dealershipName'] = dealershipName ? dealershipName : '';
      console.log(payload,'payloadpayloadpayloadpayloadpayloadpayloadpayloadpayloadpayloadpayload');
      // return;
      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createOrgUser`, payload);
      if (response.status === 200) {
        setRefreshpage(true);
        setOrgUserData({});
        setAddOrgUserModalVisibility(false);
      }
      // return;


      // let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/user`, payload);
      // if (response.status === 200) {
      //   await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save User', email: userInfo.email });
      //   setRefreshpage(true);
      //   setUserData({});
      //   setAddUserModalVisibility(false);
      //   await getUserList()
      // }
    } catch (HTTPException) {

      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save User', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function selectDepartment(e, branchID) {
    if (dealershipList.length) {
      await filterRole(e.target.value, branchID)
      // await filterUser(e.target.value)
    }
  }

  async function filterRole(departmentID, branchID) {
    let roleResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping`);
    // await setRoleList(roleResponse.data);
    console.log(departmentID, branchID, "departmentID, branchID");
    let roleList1 = roleResponse.data;
    console.log(roleResponse.data, 'roleResponseroleResponse');
    let filteredData = roleList1.filter(role => {
      // if (branchID) {
      //   return role.departmentID == departmentID && role.branchID == branchID
      // } else {
        return role.departmentID == departmentID
      // }
    });
    console.log(filteredData, 'filteredDatafilteredData1111111');
    setFilteredRoleList(filteredData)
  }

  async function filterUser(departmentID) {
    let filteredData = allUsers.filter(user => {
      return user.departmentID == departmentID
    });
    setFilteredUserList(filteredData)
  }


  async function getUserDeatils(user) {
    await setUserData({
      name: '',
      displayName: '',
      email: '',
      mobile: '',
      dealershipID: '',
      roleID: '',
      roleName: '',
      departmentID: '',
      departmentName: '',
      branchID: '',
      branchName: '',
      designation: '',
      designationCode: '',
      employeeCode: '',
    })
    await setUserData(user);
    await filterBranches(user.dealershipID)
    await filterDepartment(user.branchID)
    await filterRole(user.departmentID)
    toggleUserDetailsModalVisibility();
  }

  async function updateUser(e) {
    e.preventDefault();
    try {
      let branchName = getBranchDisplayName(userData.branchID);
      let departmentName = getDepatmentDisplayName(userData.departmentID);
      let roleName = getRoleDisplayName(userData.roleID);
      let updateObj = {
        name: userData.name,
        displayName: userData.displayName,
        email: userData.email,
        mobile: userData.mobile,
        dealershipID: userData.dealershipID,
        roleID: userData.roleID,
        departmentID: userData.departmentID,
        branchID: userData.branchID,
        branchName: branchName ? branchName : '',
        departmentName: departmentName ? departmentName : '',
        roleName: roleName ? roleName : '',
        designation: userData.designation,
        designationCode: userData.designationCode,
        employeeCode: userData.employeeCode
      }
      // return;
      let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/user/${userData.uuid}`, updateObj);
      if (response.status === 200) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'update User', email: userInfo.email });
        setRefreshpageUpdate(true);
        setUserData({});
        setUserDetailsModalVisibility(false);
        /*
          Modified By: Sagar Patil
          Modified On: 07-12-2020
          Modification: getUserList
        */
        await getUserList();
      }
    } catch (HTTPException) {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'update User', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }

  async function toggleAddUserModalVisibility() {
    setAddUserModalVisibility(!isAddUserModalOpen);
    setUserData({
      name: '',
      displayName: '',
      email: '',
      mobile: '',
      dealershipID: '',
      roleID: '',
      roleName: '',
      departmentID: '',
      departmentName: '',
      branchID: '',
      branchName: '',
      designation: '',
      designationCode: '',
      employeeCode: '',
    })
  }

  async function toggleAddOrgUserModalVisibility() {
    setAddOrgUserModalVisibility(!isAddOrgUserModalOpen);
    setOrgUserData({
      name: '',
      //displayName: '',
      email: '',
      mobile: '',
      personalEmail: '',
      personalMobile: '',
      designation: '',
      designationCode: '',
      employeeCode: '',
      dealershipID: '',
      roleID: '',
      roleName: '',
      departmentID: '',
      departmentName: '',
      branchID: '',
      branchName: '',
    })
  }

  async function toggleUserDetailsModalVisibility() {
    setUserDetailsModalVisibility(!isUserDetailsModalOpen);
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
      if (tabName === 'Organization Chart') {
        getOrgChart();
      }
    }
    await setCurrentPageNo(1);
  }
  async function getSelectedUserAndOpenHistoryModal(user) {
    try {
      if (!isUserHistoryModalOpen) {
        selectedUserHistory = user;
        setSelectedUserHistory(user);
        const response = await axios.get(`${CONSTANTS.API_URL}/api/v1/object/${selectedUserHistory.uuid}/history?objectType=user`);
        userHistoryList = response.data;
        // setUserHistoryList(userHistoryList);
        if (userHistoryList.hasOwnProperty('token')) {
          setUserHistoryEmptyModalVisibility(!isUserHistoryEmpty);
        }
        else {
          // userHistoryList.map( async (history)=>{
          //   history.userName = await getUserName(history.createdBy);
          // });
          setUserHistoryList(userHistoryList);
          setUserHistoryModalVisibility(!isUserHistoryModalOpen);
        }
      }
      return 'response.data';
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleUserHistoryModal(data) {
    getSelectedUserAndOpenHistoryModal(data)
    setUserHistoryModalVisibility(!isUserHistoryModalOpen);
    setUserHistoryList([]);
  }

  async function toggleUserHistoryEmptyModal(e) {
    setUserHistoryEmptyModalVisibility(!isUserHistoryEmpty);
  }


  // ********************************************** Organization Chart ***********************************************

  function setOrgChartData(chartData) {
    console.log('This is chart data chartData : ', chartData);
    $('#chart-container').empty();
    (($) => {
      $(() => {
        let getId = function () {
          return (new Date().getTime()) * 1000 + Math.floor(Math.random() * 1001);
        };

        let oc = $('#chart-container').orgchart({
          'data': chartData,
          'nodeContent': 'title',
          'pan': false,
          'zoom': false,
          'chartClass': 'edit-state',
          'exportButton': false,
          'exportFilename': 'SportsChart',
          'parentNodeSymbol': 'fa-th-large',
          'newNodeText': 'Add',
          'delNodeText': 'del',
          'verticalLevel': 100,
          'visibleLevel': 5,
          'createNode': ($node, data) => {
            $node[0].id = data.uuid;
            $node[0].entity = data.entity;
            let secondMenuIcon = $('<i>', {
              'title': 'Create',
              'class': 'oci-plus-circle second-menu-icon cursor-pointer',
              click: () => {
                setSelectedBranchID('');
                setSelectedDepartmentID('');
                setSelectedRoleID('');
                setEntityData(data);
                setAction('create');
                addOption(data);
              }
            }); setSelectedDealershipID(data.dealershipID);
            let thirdMenuIcon = $('<i>', {
              'title': 'Edit',
              'class': 'oci-pencil-circle third-menu-icon cursor-pointer',
              click: () => {
                setSelectedBranchID('');
                setSelectedDepartmentID('');
                setSelectedRoleID('');
                setAction('edit');
                setEntityData(data);
                editoption(data);

              }
            });
            // $node.append(secondMenuIcon);
            // $node.append(thirdMenuIcon);
          }
        });
        $('#chart-container').find('.node').on('click', function () {
          let nodeData = ($(this).data('nodeData'));
          console.log("This is node data", nodeData);
          setModalTitle(nodeData.entity);
          setChartNodeDetails(nodeData);
          setCreateData({})
        });

        $('#chart-container').find('.content').on('click', () => {
          toggleShowTreeNodeModalVisibility()
        });


        // oc.$chartContainer.on('click', '.node', function() {
        //   let $this = $(this);
        //   console.log($this.text(),'WWWWWWWWWWWWWWWWW');
        //   console.log($this.find('.title').text(),'WWWWWWWWWWWWWWWWW');
        //   console.log($this.find('.level').text(),'WWWWWWWWWWWWWWWWW');
        //   $('#selected-node').val($this.find('.title').text()).data('node', $this);
        // });

      });
    })($);
  }

  async function getAllList() {
    try {
      let dealershipResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership`);
      setDealershipList(dealershipResponse.data);
      let branchResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList`);
      setBranchList(branchResponse.data);
      let roleResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping`);
      setRoleList(roleResponse.data);
      let departmentResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping`);
      setDepartmentList(departmentResponse.data);

    } catch (error) {
      console.log("error while fetching data----------")
    }
  }

  async function editoption(data) {
    setSelectedDealershipID(data.dealershipID);
    getFilteredBranches(data.dealershipID);
    if (data.branchID) {
      setSelectedBranchID(data.branchID);
      getFilteredDepartment(data.dealershipID, data.branchID);
    }
    if (data.branchID && data.departmentID) {
      setSelectedDepartmentID(data.departmentID);
      getFilteredRole(data.dealershipID, data.branchID, data.departmentID);
      getFilteredUser(data.dealershipID, data.branchID, data.departmentID);
    }


    // if (data.entity === 'Dealership') {
    //   let nodeDealerData = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership?uuids=${data.uuid}`);
    //   await getDealershipDetails(nodeDealerData.data[0]);
    // }
    // if (data.entity === 'Branch') {
    //   let nodeBranchData = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList?uuids=${data.uuid}`);
    //   await getBranchDetails(nodeBranchData.data[0]);
    // }
    // if (data.entity === 'Department') {
    //   let nodeDepartmentData = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping?uuids=${data.uuid}`)
    //   await getDepartmentDetails(nodeDepartmentData.data[0]);
    // }
    // if (data.entity === 'Role') {
    //   let nodeRoleData = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping?uuids=${data.uuid}`)
    //   await getRoleDetails(nodeRoleData.data[0]);
    // }
    // if (data.entity === 'User') {
    //   let nodeUserData = await axios.get(`${CONSTANTS.API_URL}/api/v1/users?uuids=${data.uuid}`);
    //   await getUserDeatils(nodeUserData.data[0]);
    // }

    let title = `Edit ${data.name} ${data.entity}`;
    setModalTitle(title);
    setEntity(data.entity);
    setEntityName(data.name);
    // setAddEntityModalOpen(true);
    setModalOpen(true);

    let modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  async function addOption(data) {
    setSelectedDealershipID(data.dealershipID);
    getFilteredBranches(data.dealershipID);
    if (data.branchID) {
      setSelectedBranchID(data.branchID);
      getFilteredDepartment(data.dealershipID, data.branchID);
    }
    if (data.branchID && data.departmentID) {
      setSelectedDepartmentID(data.departmentID);
      getFilteredRole(data.dealershipID, data.branchID, data.departmentID);
    }

    await setIsEditable(false);
    if (data.entity === 'Dealership') {
      await toggleAddDealershipModalVisibility(!isAddDealershipModalOpen);
    } else if (data.entity === 'Branch') {
      await toggleAddBranchModalVisibility(!isAddBranchModalOpen);
    } else if (data.entity === 'Department') {
      await toggleDepartmentModalVisibility(!isDepartmentDetailsModalOpen);
    } else if (data.entity === 'Role') {
      await toggleAddRoleModalVisibility(!isAddRoleModalOpen);
    } else if (data.entity === 'User') {
      await toggleAddUserModalVisibility(!isUserDetailsModalOpen);
    }

    // let title = `Create ${data.name} ${data.entity}`;
    // setModalTitle(title);
    // // setAddEntityModalOpen(true);
    // setEntity(data.entity);
    // setModalOpen(true);
    // setEntityName('');



    // let modal = document.getElementById("myModal");
    // modal.style.display = "block";
    // setTimeout(() =>{
    //   let input = document.getElementById("addName")
    //   if (input) {
    //     input.select();
    //   }
    // },0)

  }



  async function getOrgChart() {
    try {
      let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/organizationChartV2`);
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'get chart', email: userInfo.email });
      await setOrgChartData(response.data.children[0]);
      if (response.data && response.data.DEALERSHIPS) {
        setAllDealearships(response.data.DEALERSHIPS);
      }
      if (response.data && response.data.BRANCHES) {
        setAllBranches(response.data.BRANCHES);
        setAllBranchesData = response.data.BRANCHES;
      }
      if (response.data && response.data.DEPARTMENTS) {
        setAllDepartments(response.data.DEPARTMENTS);
        setAllDepartmentData = response.data.DEPARTMENTS;
      }
      if (response.data && response.data.ROLES) {
        setAllRoles(response.data.ROLES);
        setAllRolesData = response.data.ROLES;
      }
      if (response.data && response.data.USERS) {
        setAllUsers(response.data.USERS);
      }

    } catch (err) {
      console.log(err)
      // await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'get orgchart', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
    }
  }


  async function getFilteredBranches(uuid) {
    let filteredData = setAllBranchesData.filter(dealershipbranch => {
      return dealershipbranch.dealershipID === uuid;
    });
    setFilteredBranches(filteredData);
  }
  async function getFilteredDepartment(dealershipID, branchID) {
    let filteredData = setAllDepartmentData.filter(dealershipbranch => {
      return dealershipbranch.dealershipID === dealershipID && dealershipbranch.branchID === branchID;
    });
    setFilteredDepartments(filteredData);

  }

  async function getFilteredRole(dealershipID, branchID, departmentID) {
    let filteredData = setAllRolesData.filter(dealershipbranch => {
      return dealershipbranch.dealershipID === dealershipID && dealershipbranch.branchID === branchID && dealershipbranch.departmentID === departmentID;
    });
    setFilteredRoles(filteredData);
  }

  async function getFilteredUser(dealershipID, branchID, departmentID) {
    let nodeUserData = await axios.get(`${CONSTANTS.API_URL}/api/v1/users`);
    let filteredData = nodeUserData.data.filter(dealershipbranch => {
      return dealershipbranch.dealershipID === dealershipID && dealershipbranch.branchID === branchID && dealershipbranch.departmentID === departmentID;
    });
    setFilteredUsers(filteredData);
  }

  // function toggleAddUserModalVisibility() {
  //   setAddEntityModalOpen(false);
  // }

  function modalClose(e) {
    e.preventDefault();
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    setModalOpen(false);
  }
  function changeDealership(e) {
    setSelectedDealershipID(e.target.value);
    getFilteredBranches(e.target.value);
    if (selectedBranchID) {
      getFilteredDepartment(e.target.value, selectedBranchID);
    }
    if (selectedBranchID && selectedDepartmentID) {
      getFilteredRole(e.target.value, selectedBranchID, selectedDepartmentID);
    }
  }

  // function editEntityData(data) {
  //   console.log(data,'000000000000000', entityData);
  // }
  async function editEntityData(e) {
    e.preventDefault();
    if (entityData.entity === "Dealership") {
      try {
        let nodeDealerData = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership?uuids=${entityData.uuid}`);
        let updateDealerData = nodeDealerData.data;
        let updateNodeData = {
          name: entityData.value,
          displayName: entityData.value,
          shortName: updateDealerData[0].shortName,
          status: updateDealerData[0].status,
          address: updateDealerData[0].address,
          isSMSConfigured: updateDealerData[0].isSMSConfigured,
          isEmailConfigured: updateDealerData[0].isEmailConfigured,
          type: updateDealerData[0].type,
          subType: updateDealerData[0].subType
        }
        console.log(updateNodeData, "--------DealerData")
        let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateDealership/${entityData.uuid}`, updateNodeData);

        if (response.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Dealership', email: userInfo.email });
          console.log("Dealership Document Updated Successfully")
          getOrgChart()
          modalClose(e);
        }

      } catch (HTTPException) {
        console.log("Failed to Update Dealership Document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Dealership', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
    }

    if (entityData.entity === "Branch") {

      try {
        let nodeBranchData = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranchList?uuids=${entityData.uuid}`);
        let updateBranchData = nodeBranchData.data;
        let updateNodeData = {
          name: entityData.value,
          displayName: entityData.value,
          shortName: updateBranchData[0].shortName,
          branchCode: updateBranchData[0].branchCode,
          status: updateBranchData[0].status,
          address: updateBranchData[0].address,
          dealershipID: entityData.dealershipID
        }
        let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateBranch/${entityData.uuid}`, updateNodeData);

        if (response.status === 200) {
          console.log("Branch Document updated successfully ")
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Branch', email: userInfo.email });
          getOrgChart()
          modalClose(e);
        }

      } catch (HTTPException) {
        console.log("Failed to update Branch Document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Branch', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
    }
    if (entityData.entity === "Department") {
      try {
        let nodeDepartmentData = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping?uuids=${entityData.uuid}`)
        let updateDepartmentData = nodeDepartmentData.data;
        console.log(nodeDepartmentData, "--------")
        let updateNodeData = {
          name: entityData.value,
          displayName: entityData.value,
          dealershipID: entityData.dealershipID,
          branchID: entityData.branchID
        }
        console.log(updateNodeData, "----------Department Updated Data")
        let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateDepartment/${entityData.uuid}`, updateNodeData);
        if (response.status === 200) {
          console.log("Department Document updated successfully ")
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Department', email: userInfo.email });
          getOrgChart()
          modalClose(e);
        }
      } catch (HTTPException) {
        console.log("error while updating Department Document");
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Department', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });

      }
    }

    if (entityData.entity === "Role") {
      try {
        let nodeRoleData = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRoleMapping?uuids=${entityData.uuid}`)
        let updateRoleData = nodeRoleData.data;
        console.log(updateRoleData, "+++++++++++++++++++")
        let updateNodeData = {
          name: entityData.value,
          displayName: entityData.value,
          dealershipID: entityData.dealershipID,
          branchID: entityData.branchID,
          departmentID: entityData.departmentID
        }
        console.log(updateNodeData, "---------Role Updated Data")

        let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateRole/${entityData.uuid}`, updateNodeData)
        if (response.status === 200) {
          console.log("Role Document updated successfully ")
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Role', email: userInfo.email });
          getOrgChart()
          modalClose(e);
        }
      } catch (HTTPException) {
        console.log("Error while updating Role Document", error)
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update Role', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });

      }
    }
    if (entityData.entity === "User") {
      try {
        let nodeUserData = await axios.get(`${CONSTANTS.API_URL}/api/v1/users?uuids=${entityData.uuid}`);
        let updateUserData = nodeUserData.data;
        console.log(updateUserData, "+++++++++++++++");
        let updateNodeData = {
          name: entityData.value,
          displayName: entityData.value,
          email: updateUserData[0].email,
          mobile: updateUserData[0].mobile,
          dealershipID: entityData.dealershipID,
          roleID: entityData.roleID,
          roleName: entityData.roleName,
          departmentID: entityData.departmentID,
          departmentName: entityData.departmentName,
          branchID: entityData.branchID,
          branchName: entityData.branchName,
          designation: updateUserData[0].designation,
          designationCode: updateUserData[0].designationCode,
          employeeCode: updateUserData[0].employeeCode
        }
        console.log(updateNodeData, "-----------------User Updated Data")

        let response = await axios.put(`${CONSTANTS.API_URL}/api/v1/user/${entityData.uuid}`, updateNodeData);
        if (response.status == 200) {
          console.log("User Document updated successfully ")
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update User', email: userInfo.email });
          getOrgChart()
          modalClose(e);
        }
      } catch (error) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Update User', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
    }




  }
  async function createEntityData(e) {
    e.preventDefault();
    console.log(modalTitle, 'modalTitlemodalTitlemodalTitle', entityData)
    await setIsEditable(false);
    if (entityData.entity === 'Dealership') {
      await toggleAddDealershipModalVisibility(!isAddDealershipModalOpen);
    } else if (entityData.entity === 'Branch') {
      await toggleAddBranchModalVisibility(!isAddBranchModalOpen);
    } else if (entityData.entity === 'Department') {
      await toggleDepartmentModalVisibility(!isDepartmentDetailsModalOpen);
    } else if (entityData.entity === 'Role') {
      await toggleAddRoleModalVisibility(!isAddRoleModalOpen);
    } else if (entityData.entity === 'User') {
      await toggleAddUserModalVisibility(!isUserDetailsModalOpen);
    }
    // async function toggleAddModalVisibility(type, e) {
      if (type === 'add') {
        await setIsEditable(false);
      }
      if (activePageTabItem === 'Dealership') {
        await toggleAddDealershipModalVisibility(!isAddDealershipModalOpen);
      } else if (activePageTabItem === 'Branch') {
        await toggleAddBranchModalVisibility(!isAddBranchModalOpen);
      } else if (activePageTabItem === 'Department') {
        await toggleDepartmentModalVisibility(!isDepartmentDetailsModalOpen);
      } else if (activePageTabItem === 'Role') {
        await toggleAddRoleModalVisibility(!isAddRoleModalOpen);
      } else if (activePageTabItem === 'User') {
        await toggleAddUserModalVisibility(!isUserDetailsModalOpen);
      }
    // }
    return;
    if (modalTitle === "Dealership") {

      delete createData.branchCode,
        delete createData.dealershipID,
        delete createData.branchID,
        delete createData.departmentID
      delete createData.designation,
        delete createData.designationCode,
        delete createData.employeeCode
      delete createData.branchName,
        delete createData.departmentName,
        delete createData.email,
        delete createData.mobile,
        delete createData.role,
        delete createData.roleName
      try {
        console.log("This is the dealership data --->", createData)
        let response = await Axios.post(`${CONSTANTS.API_URL}/api/v1/createDealership`, createData);

        if (response.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Dealership', email: userInfo.email });
          console.log("Dealership successfully Created")
          getOrgChart()
        }
      } catch (HTTPException) {
        console.log("Failed to insert dealership document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Dealrship', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
      toggleShowTreeNodeModalVisibility();
    }
    if (modalTitle === "Branch") {

      delete createData.subType;
      delete createData.type;
      delete createData.isSMSConfigured;
      delete createData.isEmailConfigured;
      delete createData.branchID,
        delete createData.departmentID
      delete createData.designation,
        delete createData.designationCode,
        delete createData.employeeCode
      delete createData.branchName,
        delete createData.departmentName,
        delete createData.email,
        delete createData.mobile,
        delete createData.role,
        delete createData.roleName
      console.log("This is the Branch data --->", createData)

      try {
        let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createBranch`, createData);
        if (response.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Branch ', email: userInfo.email });
          console.log("Branch successfully Created")
        }
      } catch (HTTPException) {
        console.log("Failed to insert branch document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'create Branch', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
      toggleShowTreeNodeModalVisibility();
    }
    if (modalTitle === "Department") {

      delete createData.status;
      delete createData.subType;
      delete createData.type;
      delete createData.isSMSConfigured;
      delete createData.isEmailConfigured;
      delete createData.shortName;
      delete createData.branchCode;
      delete createData.address;
      delete createData.departmentID
      delete createData.designation,
        delete createData.designationCode,
        delete createData.employeeCode
      delete createData.branchName,
        delete createData.departmentName,
        delete createData.email,
        delete createData.mobile,
        delete createData.role,
        delete createData.roleName

      console.log("This is department Data------->", createData)
      try {
        let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createDepartment`, createData);
        if (response.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Department', email: userInfo.email });
          console.log("Department successfully created")
        }
      } catch (HTTPException) {
        console.log("Failed to insert department document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'create Department', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
      toggleShowTreeNodeModalVisibility();
    }
    if (modalTitle === "Role") {

      delete createData.status;
      delete createData.subType;
      delete createData.type;
      delete createData.isSMSConfigured;
      delete createData.isEmailConfigured;
      delete createData.shortName;
      delete createData.branchCode;
      delete createData.address;

      console.log("This is Role Data------->", createData)
      try {

        let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createRole`, createData);
        if (response.status === 200) {
          console.log("Role successfully created")
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'save roles', email: userInfo.email });

        }
      } catch (HTTPException) {
        console.log("Failed to insert Role document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'get roles', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
      toggleShowTreeNodeModalVisibility();
    }
    if (modalTitle === "User") {

      delete createData.status,
        delete createData.type,
        delete createData.subType,
        delete createData.isSMSConfigured,
        delete createData.isEmailConfigured,
        delete createData.shortName,
        delete createData.address,
        delete createData.branchCode,

        console.log("This is User Data------->", createData)

      try {
        let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/user`, createData);
        if (response.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save User', email: userInfo.email });
          console.log("User successfully created");


        }
      } catch (HTTPException) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save User', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
        console.log("Failed to insert User's document");
      }
      toggleShowTreeNodeModalVisibility();
    }




  }

  function toggleShowTreeNodeModalVisibility() {
    setisShowTreeNodeModelVisible(!isShowTreeNodeModelVisible);
    setCreateData({
      status: '',
      type: '',
      subType: '',
      isSMSConfigured: 'false',
      isEmailConfigured: 'false',
      name: '',
      displayName: '',
      shortName: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipcode: ''
      },
      branchCode: '',
      dealershipID: '',
      branchID: '',
      departmentID: '',
      designation: '',
      designationCode: '',
      employeeCode: '',
      branchName: '',
      departmentName: '',
      email: '',
      mobile: '',
      role: '',
      roleName: ''
    })
  }

  function handleReset() {
    document.getElementById("myForm").reset();
    document.getElementById("myForm1").reset();
    document.getElementById("myForm2").reset();
  }

  async function handleCreate() {

    if (modalTitle === "Dealership") {

      delete createData.branchCode,
        delete createData.dealershipID,
        delete createData.branchID,
        delete createData.departmentID
      delete createData.designation,
        delete createData.designationCode,
        delete createData.employeeCode
      delete createData.branchName,
        delete createData.departmentName,
        delete createData.email,
        delete createData.mobile,
        delete createData.role,
        delete createData.roleName
      try {
        console.log("This is the dealership data --->", createData)
        let response = await Axios.post(`${CONSTANTS.API_URL}/api/v1/createDealership`, createData);

        if (response.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Dealership', email: userInfo.email });
          console.log("Dealership successfully Created")
          getOrgChart()
        }
      } catch (HTTPException) {
        console.log("Failed to insert dealership document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Dealrship', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
      toggleShowTreeNodeModalVisibility();
    }
    if (modalTitle === "Branch") {

      delete createData.subType;
      delete createData.type;
      delete createData.isSMSConfigured;
      delete createData.isEmailConfigured;
      delete createData.branchID,
        delete createData.departmentID
      delete createData.designation,
        delete createData.designationCode,
        delete createData.employeeCode
      delete createData.branchName,
        delete createData.departmentName,
        delete createData.email,
        delete createData.mobile,
        delete createData.role,
        delete createData.roleName
      console.log("This is the Branch data --->", createData)

      try {
        let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createBranch`, createData);
        if (response.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Branch ', email: userInfo.email });
          console.log("Branch successfully Created")
        }
      } catch (HTTPException) {
        console.log("Failed to insert branch document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'create Branch', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
      toggleShowTreeNodeModalVisibility();
    }
    if (modalTitle === "Department") {

      delete createData.status;
      delete createData.subType;
      delete createData.type;
      delete createData.isSMSConfigured;
      delete createData.isEmailConfigured;
      delete createData.shortName;
      delete createData.branchCode;
      delete createData.address;
      delete createData.departmentID
      delete createData.designation,
        delete createData.designationCode,
        delete createData.employeeCode
      delete createData.branchName,
        delete createData.departmentName,
        delete createData.email,
        delete createData.mobile,
        delete createData.role,
        delete createData.roleName

      console.log("This is department Data------->", createData)
      try {
        let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createDepartment`, createData);
        if (response.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Create Department', email: userInfo.email });
          console.log("Department successfully created")
        }
      } catch (HTTPException) {
        console.log("Failed to insert department document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'create Department', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
      toggleShowTreeNodeModalVisibility();
    }
    if (modalTitle === "Role") {

      delete createData.status;
      delete createData.subType;
      delete createData.type;
      delete createData.isSMSConfigured;
      delete createData.isEmailConfigured;
      delete createData.shortName;
      delete createData.branchCode;
      delete createData.address;

      console.log("This is Role Data------->", createData)
      try {

        let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/createRole`, createData);
        if (response.status === 200) {
          console.log("Role successfully created")
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'save roles', email: userInfo.email });

        }
      } catch (HTTPException) {
        console.log("Failed to insert Role document")
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'get roles', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
      }
      toggleShowTreeNodeModalVisibility();
    }
    if (modalTitle === "User") {

      delete createData.status,
        delete createData.type,
        delete createData.subType,
        delete createData.isSMSConfigured,
        delete createData.isEmailConfigured,
        delete createData.shortName,
        delete createData.address,
        delete createData.branchCode,

        console.log("This is User Data------->", createData)

      try {
        let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/user`, createData);
        if (response.status === 200) {
          await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save User', email: userInfo.email });
          console.log("User successfully created");


        }
      } catch (HTTPException) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'Save User', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email: userInfo.email });
        console.log("Failed to insert User's document");
      }
      toggleShowTreeNodeModalVisibility();
    }




  }


  async function getCount() {
    if (activePageTabItem === "Dealership") {
      let TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership/count?activationStatus=all`);
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Branch") {
      let TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranch/count?activationStatus=all`);
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Department") {
      let TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartment/count?activationStatus=all`);
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "Role") {
      let TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRole/count?activationStatus=all`);
      return TOTAL.data.COUNT;
    }
    if (activePageTabItem === "User") {
      let TOTAL = await axios.get(`${CONSTANTS.API_URL}/api/v1/users/count?activationStatus=all`);
      return TOTAL.data.COUNT;
    }
  }

  async function onChangePageClick(pageNo) {
    currentPageNo = pageNo;
    await setCurrentPageNo(currentPageNo);
    if (activePageTabItem === "Dealership") {
      await getDealershipListByCondition();
    }
    if (activePageTabItem === "Branch") {
      await getBranchList();
    }
    if (activePageTabItem === "Department") {
      // console.log("Department Next");
      await getDepartmentMapping();
    }
    if (activePageTabItem === "Role") {
      await getRoleList();
    }
    if (activePageTabItem === "User") {
      await getUserList();
    }
    await getUserCount()
  }

  async function onPageSizeChange(newPageSize) {
    pageSize = newPageSize;
    if (totalPages > 0 && currentPageNo > Math.ceil(totalPages / pageSize)) {
      currentPageNo = Math.ceil(totalPages / pageSize)
      await setCurrentPageNo(currentPageNo);
    }
    // if (currentPageNo > Math.ceil(totalPages / pageSize)) {
    //   currentPageNo = Math.ceil(totalPages / pageSize)
    //   await setCurrentPageNo(currentPageNo);
    // }
    await setPageSize(pageSize);
    if (activePageTabItem === "Dealership") {
      await getDealershipListByCondition();
    }
    if (activePageTabItem === "Branch") {
      await getBranchList();
    }
    if (activePageTabItem === "Department") {
      await getDepartmentMapping();
    }
    if (activePageTabItem === "Role") {
      await getRoleList();
    }
    if (activePageTabItem === "User") {
      await getUserList();
    }
    await getUserCount()
  }

  async function getUserCount() {
    try {
      let totalcount;
      let params = await getSearchParams();
      delete params.pageNo;
      delete params.pageSize;
      // startLoader();
      if (activePageTabItem === "Dealership") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Branch") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/getBranch/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Department") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartment/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "Role") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/getRole/count?activationStatus=all`, params);
        // return totalcount
      }
      if (activePageTabItem === "User") {
        totalcount = await axios.get(`${CONSTANTS.API_URL}/api/v1/users/count?activationStatus=all`, params);
        // return totalcount
      }
      // console.log("Total Count =================> ",totalcount.data.COUNT)
      if (totalcount && totalcount.data) {

        await setTotalPages(totalcount.data.COUNT);
      }
    } catch (HTTPException) {
      // console.log(err)
      console.error(HTTPException);
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
    if (activePageTabItem === 'Organization Chart') {
      await toggleAddOrgUserModalVisibility(!isAddOrgUserModalOpen);
    }
    if (activePageTabItem === 'Dealership') {
      await toggleAddDealershipModalVisibility(!isAddDealershipModalOpen);
    } else if (activePageTabItem === 'Branch') {
      await toggleAddBranchModalVisibility(!isAddBranchModalOpen);
    } else if (activePageTabItem === 'Department') {
      await toggleDepartmentModalVisibility(!isDepartmentDetailsModalOpen);
    } else if (activePageTabItem === 'Role') {
      await toggleAddRoleModalVisibility(!isAddRoleModalOpen);
    } else if (activePageTabItem === 'User') {
      await toggleAddUserModalVisibility(!isUserDetailsModalOpen);
    }
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
        if(addOn && addOn==="DealershipAddress"){
          let fieldName = e.target.name
          setDealershipData({...dealershipData,address: {...dealershipData.address,[fieldName]: val}});
        }else if(addOn && addOn==='BranchAddress'){
          let fieldName = e.target.name
          setBranchData({...branchData,address: {...branchData.address,[fieldName]: e.target.value}});
        }else if(addOn && addOn==='User'){
          let fieldName = e.target.name
          userData[fieldName] = val
          await setUserData(userData);
        }else if(addOn && addOn==='OrgUser'){
          let fieldName = e.target.name
          orgUserData[fieldName] = val
          await setOrgUserData(orgUserData);
        }
        e.target.style.border = "0.1rem solid #d1d1d1"
      }

  }

  async function toggleEditProductModalNewVisibility() {
    await setIsEditable(!isEdit);
    await toggleAddModalVisibility('edit');
  }

  // async function uploadBrowsedFile(e) {
  //   e.preventDefault();
  //   let allowedFileType = ['pdf','docs','jpeg'];
  //   let files = e.target.files[0];
  //   if (!files) return;
  //   let fileName = files.name;
  //   let extension = fileName.split('.').pop();

  //   if (allowedFileType.includes(extension.toLowerCase())) {
  //     await uploadMedia(files);
  //   } else {
  //     alert('Looks like the file you tried to upload did not match the system. Kindly upload only a .pdf, .docs file')
  //     return;
  //   }
  // }

  // async function uploadMedia(fileData) {
  //   console.log(fileData)
  //   const fileObj = {
  //     name: fileData.name,
  //     size: fileData.size,
  //     type: fileData.type,
  //     value: fileData.name
  //   };

  //   let fileDetails;
  //   await axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, {
  //     file: fileObj,
  //   }).then((res) => {
  //     if (res && res.data) {
  //       console.log(res.data)
  //       fileDetails = res.data;
  //     }
  //   });

  //   if (!fileDetails) {
  //     return;
  //   }

  //   try {
  //     //Save File on S3
  //     const opts = {
  //       headers: [{
  //         name: 'Content-Type',
  //         value: 'multipart/form-data'
  //       }]
  //     };

  //     let fileUpload = await axios.put(fileDetails.signedURL, fileData, opts);

  //     if (fileUpload) {
  //       console.log(fileUpload)
  //     }

  //   } catch (e) {
  //     console.error(e);
  //   }
  //   console.log(fileDetails)
  // }
  function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
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
          {
            activePageTabItem === "Organization Chart" ? <div class="header-right-right-buttons">
            <button class="add-button" onClick={(e) => toggleAddModalVisibility('add')}>+</button>
          </div> :
              <div class="header-right-buttons">
                <button class="settings-button" onclick={(e) => toggleSettingsDropdown(e)}>
                  <svg version="1.1" width="16px" height="16px" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" class="table-icon">
                    <g>
                      <path d="M500.6,212.6l-59.9-14.7c-3.3-10.5-7.5-20.7-12.6-30.6l30.6-51c3.6-6,2.7-13.5-2.1-18.3L414,55.4    c-4.8-4.8-12.3-5.7-18.3-2.1l-51,30.6c-9.9-5.1-20.1-9.3-30.6-12.6l-14.4-59.9C297.9,4.8,291.9,0,285,0h-60    c-6.9,0-12.9,4.8-14.7,11.4l-14.4,59.9c-10.5,3.3-20.7,7.5-30.6,12.6l-51-30.6c-6-3.6-13.5-2.7-18.3,2.1L53.4,98    c-4.8,4.8-5.7,12.3-2.1,18.3l30.6,51c-5.1,9.9-9.3,20.1-12.6,30.6l-57.9,14.7C4.8,214.1,0,220.1,0,227v60    c0,6.9,4.8,12.9,11.4,14.4l57.9,14.7c3.3,10.5,7.5,20.7,12.6,30.6l-30.6,51c-3.6,6-2.7,13.5,2.1,18.3L96,458.6    c4.8,4.8,12.3,5.7,18.3,2.1l51-30.6c9.9,5.1,20.1,9.3,30.6,12.6l14.4,57.9c1.8,6.6,7.8,11.4,14.7,11.4h60    c6.9,0,12.9-4.8,14.7-11.4l14.4-57.9c10.5-3.3,20.7-7.5,30.6-12.6l51,30.6c6,3.6,13.5,2.7,18.3-2.1l42.6-42.6    c4.8-4.8,5.7-12.3,2.1-18.3l-30.6-51c5.1-9.9,9.3-20.1,12.6-30.6l59.9-14.7c6.6-1.5,11.4-7.5,11.4-14.4v-60    C512,220.1,507.2,214.1,500.6,212.6z M255,332c-41.4,0-75-33.6-75-75c0-41.4,33.6-75,75-75c41.4,0,75,33.6,75,75    C330,298.4,296.4,332,255,332z" fill="#fff" data-original="#000000" style="" />
                    </g>
                  </svg>
                </button>
                <div class="header-right-right-buttons">
                  <button class="add-button" onClick={(e) => toggleAddModalVisibility('add')}>+</button>
                </div>
              </div>

          }

        </div>
      </div>
      <div class="row m-t-20" >
        <div class="col-lg-12 no-padding">
          {dealershipTableData && dealershipTableData.columns && activePageTabItem === 'Dealership' && (
            <Table entityName='Dealership' dataset={dealershipTableData} editEntity={getDealershipDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleDealershipHistoryModal} />
          )}
          {branchTableData && branchTableData.columns && activePageTabItem === 'Branch' && (
            <Table entityName='Branch' dataset={branchTableData} editEntity={getBranchDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleBranchHistoryModal} />
          )}
          {departmentTableData && departmentTableData.columns && activePageTabItem === 'Department' && (
            <Table entityName='Department' dataset={departmentTableData} editEntity={getDepartmentDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleDepartmentHistoryModal} />
          )}
          {roleTableData && roleTableData.columns && activePageTabItem === 'Role' && (
            <Table entityName='Role' dataset={roleTableData} editEntity={getRoleDetails} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleRoleHistoryModal} />
          )}
          {userTableData && userTableData.columns && activePageTabItem === 'User' && (
            <Table entityName='User' dataset={userTableData} editEntity={getUserDeatils} searchFilterHeader="false" actionFooter="true" settings='true' checkboxes='true' extraModalName='View' extraModal={toggleUserHistoryModal} />
          )}
          {activePageTabItem && activePageTabItem !== "Organization Chart" && (
            <div class="col-lg-12 no-padding" >
              <Pagination count={totalPages} getCount={(e) => getCount(e)} currentPageNo={currentPageNo} currentPageSize={pageSize} onPageSizeChange={(e) => onPageSizeChange(e)} onChangePageClick={(e) => onChangePageClick(e)} activePageTabItem={activePageTabItem} />
            </div>
          )}
          {
            activePageTabItem === "Organization Chart" ? <div>
              <div>
                <div id="chart-container"/>
              </div>
              <div class='orgChartModal'>
                <div id="myModal" class="org-chart-modal">

                  <div class="org-chart-modal-content">
                    {
                      isModalOpen && (
                        <div>
                          <div class="org-chart-modal-header">
                            <span class="org-chart-close" onClick={(e) => modalClose(e)}>&times;</span>
                            <p style='text-transform: capitalize;'>{action}{' '}{modalTitle}</p>
                          </div>
                          {
                            action && (action === 'edit' || action === 'create') && (
                              <div class="org-chart-modal-body">
                                <div class="m-b-10">
                                  <div style="font-size:14px;font-weight:bold;padding-bottom:8px"><label for="NAME">{entity} name</label></div>
                                  {
                                    action === 'edit' && (
                                      <div>
                                      <input type="text" value={action === 'edit' ? entityData.value : ''} name="NAME" id="NAME" style="width:100%;font-size:14px;border:1px #c8c8c8 solid;"
                                    onChange={(e) => {
                                      setEntityData({
                                        ...entityData,
                                        value: e.target.value
                                      })
                                    }}
                                  />
                                  </div>
                                    )
                                  }

                                  {
                                    action === 'create' && (
                                      <div>
                                      <input type="text" value={entityData.value} name="NAME" id="addName" style="width:100%;font-size:14px;border:1px #c8c8c8 solid;"
                                    onChange={(e) => {
                                      setEntityData({
                                        ...entityData,
                                        value: e.target.value
                                      })
                                    }}
                                  />
                                  </div>
                                    )
                                  }
                                </div>
                                {
                                  entity !== 'Dealership' && (
                                    <div class="m-b-10">
                                      <div style="font-size:14px;font-weight:bold;padding-bottom:8px"><label for="DEALERSHIP">Parent Dealership</label></div>
                                      <select name="DEALERSHIP" id="DEALERSHIP" style="width:100%;font-size:14px;border:1px #c8c8c8 solid;" onChange={(e) => {
                                        changeDealership(e);
                                        // setChartNodeDetails({
                                        //   ...chartNodeDetails,
                                        //   dealershipID:e.target.value
                                        // })
                                        setEntityData({
                                          ...entityData,
                                          dealershipID: e.target.value,
                                        })
                                      }}>
                                        {/* <option value='' >Dealership List</option> */}
                                        {
                                          AllDealearships && AllDealearships.map((dealership) => (
                                            <option value={dealership.uuid} selected={entityData.dealershipID === dealership.uuid}>{dealership.displayName}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                  )
                                }
                                {
                                  (entity === 'Department' || entity === 'Role' || entity === 'User') && (
                                    <div class="m-b-10">
                                      <div style="font-size:14px;font-weight:bold;padding-bottom:8px"><label for="BRANCH">Parent Branch</label></div>
                                      <select name="BRANCH" id="BRANCH" style="width:100%;font-size:14px;border:1px #c8c8c8 solid;" onChange={(e) => {
                                        // setChartNodeDetails({
                                        //   ...chartNodeDetails,
                                        //   branchID:e.target.value
                                        // })
                                        // console.log(FilteredBranches, "These are the filtered branches");

                                        let nameOfBranch;
                                        FilteredBranches.map(branch => {
                                          if (branch.uuid == e.target.value) nameOfBranch = branch.displayName
                                        })
                                        getFilteredDepartment(entityData.dealershipID, e.target.value);
                                        if (entity === "User") {
                                          setEntityData({
                                            ...entityData,
                                            branchID: e.target.value,
                                            branchName: nameOfBranch
                                          })
                                        }
                                        if (entity !== "User") {
                                          setEntityData({
                                            ...entityData,
                                            branchID: e.target.value
                                          })
                                        }
                                      }}>
                                        {/* <option value='' >Branch List</option> */}
                                        {
                                          FilteredBranches && FilteredBranches.map((branch) => (
                                            <option value={branch.uuid} selected={entityData.branchID === branch.uuid}>{branch.displayName}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                  )
                                }
                                {
                                  (entity === 'Role' || entity === 'User') && (
                                    <div class="m-b-10">
                                      <div style="font-size:14px;font-weight:bold;padding-bottom:8px"><label for="DEPARTMENT">Parent Department</label></div>
                                      <select name="DEPARTMENT" id="DEPARTMENT" style="width:100%;font-size:14px;border:1px #c8c8c8 solid;" onChange={(e) => {
                                        // setChartNodeDetails({
                                        //   ...chartNodeDetails,
                                        //   departmentId:e.target.value

                                        // })
                                        let nameOfDepartment;
                                        FilteredDepartments.map(department => {
                                          if (department.uuid === e.target.value) {
                                            nameOfDepartment = department.name;
                                          }
                                        })
                                        if (entity === "User") {
                                          setEntityData({
                                            ...entityData,
                                            departmentID: e.target.value,
                                            departmentName: nameOfDepartment
                                          })
                                        }
                                        getFilteredRole(entityData.dealershipID, entityData.branchID, e.target.value);
                                        if (entity !== "User") {
                                          setEntityData({
                                            ...entityData,
                                            departmentID: e.target.value
                                          })
                                        }
                                      }}>
                                        {<option value='' >Department List</option>}
                                        {
                                          FilteredDepartments && FilteredDepartments.map((department) => (
                                            <option value={department.uuid} selected={entityData.departmentID === department.uuid}>{department.displayName}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                  )
                                }
                                {
                                  entity === 'User' && (
                                    <div class="m-b-10">
                                      <div style="font-size:14px;font-weight:bold;padding-bottom:8px"><label for="ROLE">Parent Role</label></div>
                                      <select name="ROLE" id="ROLE" style="width:100%;font-size:14px;border:1px #c8c8c8 solid;" onChange={(e) => {
                                        // setChartNodeDetails({
                                        //   ...chartNodeDetails,
                                        //   roleID:e.target.value

                                        // })
                                        let nameOfRole;
                                        FilteredRoles.map(role => {
                                          if (role.uuid === e.target.value) {
                                            nameOfRole = role.displayName;
                                          }
                                        })
                                        setEntityData({
                                          ...entityData,
                                          roleID: e.target.value,
                                          roleName: nameOfRole
                                        })
                                      }} >
                                        <option value='' >Role List</option>
                                        {
                                          FilteredRoles && FilteredRoles.map((Role) => (
                                            <option value={Role.uuid} selected={entityData.roleID === Role.uuid}>{Role.displayName}</option>
                                          ))
                                        }
                                      </select>
                                    </div>
                                  )
                                }
                                {
                                  entity === 'User' && (
                                    <div style="margin:8px 0;">
                                      <p>Select Reporting Manager</p>
                                      <select name="reportmanagerId" value={userData.reportingManagerID} onChange={(e) => {
                                        setUserData({
                                          ...userData,
                                          reportingManagerID: e.target.value
                                        });
                                      }}>
                                        <option value='' selected>Select Reporting Manager</option>
                                        {/* {
                                            roleList &&
                                            roleList.map((role) => (
                                              <option value={role.uuid} selected={userData.roleID === role.uuid}>{role.name}</option>
                                            ))
                                          } */}
                                        {
                                          FilteredUsers &&
                                          FilteredUsers.map((User) => (
                                            <option value={User.uuid} selected={userData.reportingManagerID === User.uuid}>{User.name}</option>
                                          ))
                                        }

                                      </select>

                                    </div>
                                  )
                                }
                              </div>

                            )
                          }
                          <div class="org-chart-modal-footer">
                            <div class="org-chart-buttons">
                              {
                                action && action === 'edit' && (
                                  <span class="org-chart-button org-chart-button-accept" id="" onClick={(e) => editEntityData(e)} >Save</span>
                                )
                              }
                              {
                                action && action === 'create' && (
                                  <span class="org-chart-button org-chart-button-accept" id="" onClick={(e) => createEntityData(e)}>Add</span>
                                )
                              }

                              <span class="org-chart-button org-chart-button-link org-chart-button-link-cancel" onClick={(e) => modalClose(e)}>Close</span>
                            </div>
                          </div>
                        </div>

                      )
                    }
                  </div>

                </div>


              </div>


              <Modal title={modalTitle} modalSize="is-full-height"
                modalDisplay={(isAddEntityModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddUserModalVisibility(e)}>
                <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
                  <form >
                    <div class="row" style="margin-top: 20px;">
                      <div class="col-lg-8 col-md-8 col-sm-8">
                        <div style="background-color:#fff; padding:15px">
                          <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">About Company</p>
                          <hr />
                          <form>
                            <div style="margin:8px 0;">
                              <p for="Company Name" class="form-label"> Company Name <span style="color:red;">*</span></p>
                              <input type="text" id="companyName" />
                            </div>
                            <div style="margin:8px 0;">
                              <p for="companyType" class="form-label">Company Type</p>
                              <select id="companyType" >
                                <option>Not Selected</option>
                                <option>Client</option>
                                <option>Supplier</option>
                                <option>Competitor</option>
                                <option>Partner</option>
                                <option>Other</option>
                              </select>
                            </div>
                            <div style="margin:8px 0;">
                              <p for="industry" class="form-label">Industry</p>
                              <select id="industry" >
                                <option>Not Selected</option>
                                <option>Information Technology</option>
                                <option>Telecommunication</option>
                                <option>Manufacturing</option>
                                <option>Banking Services</option>
                                <option>Consulting</option>
                                <option>Finance</option>
                                <option>Government</option>
                                <option>Delivery</option>
                                <option>Entertainment</option>
                                <option>Non-profit</option>
                                <option>Other</option>
                              </select>
                            </div>
                            <div>
                              <p for="companyAddress" class="form-label">Details</p>
                              <div style="border:1px solid lightgray; padding:10px;">
                                <a href="javascript:void(0)">Add</a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </form>
                </ModalBody>
              </Modal>

              <Modal title={modalTitle} modalSize="is-full-height" isProfileModal
                modalDisplay={(isShowTreeNodeModelVisible ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleShowTreeNodeModalVisibility(e)} >
                <form id="myForm">
                  <div class="profile-modal-container">
                    <div class="profile-modal">
                      <div class="profile-header-container">
                        <div class="profile-header">
                          <div class="profile-left-header-container">
                            <div>
                              <span class="profile-left-header-text">
                                {modalTitle}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="profile-content-container">
                        <div class="profile-content-inner">
                          <div class="profile-content-inner-content-container">
                            <div class="profile-content-inner-left" >
                              {(modalTitle !== "Department" && modalTitle !== "Role") &&
                                <div class="profile-container">
                                  <div class="appreciation-header">
                                    <div >
                                      <span> Status </span>
                                    </div>
                                  </div>
                                  <div class="appreciation-content" style="padding-top:15px; padding-bottom:15px">
                                    {(modalTitle !== "User") &&
                                      <div style="margin-bottom:15px">
                                        <div style="color:#a3a9b1">
                                          <label style="font-size:12px !important">Status</label>
                                          <div>
                                            <input type="text" name="status" required placeholder="enter status" value={createData.status}
                                              onChange={e => {
                                                setCreateData({
                                                  ...createData,
                                                  status: e.target.value
                                                });
                                                // console.log(e.target.value)
                                              }} />
                                          </div>
                                        </div>
                                      </div>
                                    }
                                    {(modalTitle === "Dealership") && (
                                      <div>
                                        <div style="margin-bottom:15px">
                                          <div style="color:#a3a9b1">
                                            <label style="font-size:12px !important">Type</label>
                                            <div>
                                              <input type="text" name="type" required placeholder="enter type" value={createData.type}
                                                onChange={e => {
                                                  setCreateData({
                                                    ...createData,
                                                    type: e.target.value
                                                  })
                                                }} />
                                            </div>
                                          </div>
                                        </div>
                                        <div style="margin-bottom:15px">
                                          <div style="color:#a3a9b1">
                                            <label style="font-size:12px !important">Sub Type</label>
                                            <div>
                                              <input type="text" name="subType" required placeholder="enter sub-type" value={createData.subType}
                                                onChange={e => {
                                                  setCreateData({
                                                    ...createData,
                                                    subType: e.target.value
                                                  })
                                                }} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    {modalTitle === "Branch" &&
                                      <div style="margin-bottom:15px">
                                        <div style="color:#a3a9b1">
                                          <label style="font-size:12px !important">Branch Code</label>
                                          <div>
                                            <input type="text" name="branchCode" placeholder="enter branch code" value={createData.branchCode}
                                              onChange={e => {
                                                setCreateData({
                                                  ...createData,
                                                  branchCode: e.target.value
                                                })

                                              }} />
                                          </div>
                                        </div>
                                      </div>
                                    }
                                    {(modalTitle === "User") &&
                                      <div>
                                        <div style="margin-bottom:15px">
                                          <div style="color:#a3a9b1">
                                            <label style="font-size:12px !important">Designation</label>
                                            <div>
                                              <input type="text" name="designation" required placeholder="enter designation" value={createData.designation}
                                                onChange={e => {
                                                  setCreateData({
                                                    ...createData,
                                                    designation: e.target.value
                                                  })
                                                }} />
                                            </div>
                                          </div>
                                        </div>
                                        <div style="margin-bottom:15px">
                                          <div style="color:#a3a9b1">
                                            <label style="font-size:12px !important">Designation Code</label>
                                            <div>
                                              <input type="text" name="designationCode" placeholder="enter designation code" value={createData.designationCode}
                                                onChange={e => {
                                                  setCreateData({
                                                    ...createData,
                                                    designationCode: e.target.value
                                                  })
                                                }} />
                                            </div>
                                          </div>
                                        </div>
                                        <div style="margin-bottom:15px">
                                          <div style="color:#a3a9b1">
                                            <label style="font-size:12px !important">Employee Code</label>
                                            <div>
                                              <input type="text" name="employeeCode" required placeholder="enter employee code" value={createData.employeeCode}
                                                onChange={e => {
                                                  setCreateData({
                                                    ...createData,
                                                    employeeCode: e.target.value
                                                  })
                                                }} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    }


                                  </div>
                                </div>
                              }


                              <div class="profile-container">
                                <div class="appreciation-header">
                                  <div >
                                    <span>{modalTitle === "Dealership" ? "Configuration" : "Select Option"}</span>
                                  </div>
                                </div>
                                <div class="appreciation-content" style="padding-top:15px; padding-bottom:15px">
                                  <div style="margin-bottom:15px">
                                    {modalTitle === "Dealership" &&
                                      <div style="margin-bottom:25px; padding:15px">
                                        <div style="color:#a3a9b1">
                                          <div>
                                            <label style="font-size:12px !important">Sms Configured</label>
                                          </div>
                                          <div>
                                            <input type="radio" name="isSMSConfigured" checked={createData.isSMSConfigured ? true : false}
                                              onChange={e => {
                                                setCreateData({
                                                  ...createData,
                                                  isSMSConfigured: true
                                                })

                                              }} />
                                            <label style="display:inline; font-size:12px "> Yes  </label>
                                            <input type="radio" name="isSMSConfigured" value="false" checked={createData.isSMSConfigured ? false : true}
                                              onChange={e => {
                                                setCreateData({
                                                  ...createData,
                                                  isSMSConfigured: false
                                                })

                                              }} />
                                            <label style="display:inline; font-size:12px "> No</label>
                                          </div>
                                        </div>
                                        <div style="margin-bottom:15px">
                                          <div style="color:#a3a9b1">
                                            <div style="margin-top:20px">
                                              <label style="font-size:12px !important">Email Configured</label>
                                            </div>
                                            <div>
                                              <input type="radio" name="isEmailConfigured" value="true" checked={createData.isEmailConfigured ? true : false}
                                                onChange={e => {
                                                  setCreateData({
                                                    ...createData,
                                                    isEmailConfigured: true
                                                  })

                                                }} />
                                              <label style="display:inline; font-size:12px "> Yes  </label>
                                              <input type="radio" name="isEmailConfigured" value="false" checked={createData.isEmailConfigured ? false : true}
                                                onChange={e => {
                                                  setCreateData({
                                                    ...createData,
                                                    isEmailConfigured: false
                                                  })

                                                }} />
                                              <label style="display:inline; font-size:12px "> No</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    }
                                    {(modalTitle === "Department" || modalTitle === "Branch" || modalTitle === "Role" || modalTitle === "User") &&
                                      <div style="color:#a3a9b1; padding-bottom:15px">
                                        <div>
                                          <label style="font-size:12px !important">Select Dealership</label>
                                        </div>
                                        <select name="selectDealership" id="selectDealership" onChange={e => {
                                          changeDealership(e);
                                          setCreateData({
                                            ...createData,
                                            dealershipID: e.target.value
                                          })
                                        }}>
                                          <option value='' >Dealership List</option>
                                          {
                                            AllDealearships &&
                                            AllDealearships.map((dealer) => (
                                              <option value={dealer.uuid} selected={createData.dealershipID === dealer.uuid}>{dealer.displayName}</option>
                                            ))

                                          }
                                        </select>
                                      </div>
                                    }
                                    {(modalTitle === "Department" || modalTitle === "Role" || modalTitle === "User") &&
                                      <div style="color:#a3a9b1; padding-bottom:15px">
                                        <div>
                                          <label style="font-size:12px !important">Select Branch</label>
                                        </div>
                                        <select name="selectBranch" id="selectBranch" required onChange={e => {
                                          getFilteredDepartment(createData.dealershipID, e.target.value);
                                          // console.log(createData.dealershipID)
                                          let nameOfBranch;
                                          branchList.map(branch => {
                                            if (branch.uuid === e.target.value) {
                                              nameOfBranch = branch.name;
                                            }
                                          })
                                          if (modalTitle === "User") {
                                            setCreateData({
                                              ...createData,
                                              branchID: e.target.value,
                                              branchName: nameOfBranch
                                            })
                                          }
                                          if (modalTitle !== "User") {
                                            setCreateData({
                                              ...createData,
                                              branchID: e.target.value
                                            })
                                          }

                                        }}>
                                          <option value=''>Branch List</option>
                                          {
                                            FilteredBranches &&
                                            FilteredBranches.map(branch => (
                                              <option value={branch.uuid} selected={createData.branchID === branch.uuid}>{branch.displayName}</option>
                                            ))
                                          }

                                        </select>
                                      </div>
                                    }
                                    {(modalTitle === "Role" || modalTitle === "User") &&
                                      <div style="color:#a3a9b1; padding-bottom:15px">
                                        <div>
                                          <label style="font-size:12px !important">Select Department</label>
                                        </div>
                                        <select name="selectDepartment" id="selectDepartment" required onChange={e => {
                                          getFilteredRole(createData.dealershipID, createData.branchID, e.target.value);
                                          let nameOfDepartment;
                                          departmentList.map(department => {
                                            if (department.uuid === e.target.value) {
                                              nameOfDepartment = department.name;
                                            }
                                          })
                                          if (modalTitle === "User") {
                                            setCreateData({
                                              ...createData,
                                              departmentID: e.target.value,
                                              departmentName: nameOfDepartment
                                            })
                                          }
                                          if (modalTitle === "Role") {
                                            setCreateData({
                                              ...createData,
                                              departmentID: e.target.value,
                                            })
                                          }

                                        }}>
                                          <option value=''>Department List</option>
                                          {
                                            FilteredDepartments &&
                                            FilteredDepartments.map(department => (
                                              <option value={department.uuid} selected={createData.departmentID === department.uuid} >{department.displayName}</option>
                                            ))
                                          }

                                        </select>
                                      </div>
                                    }
                                    {(modalTitle === "User") &&
                                      <div style="color:#a3a9b1; padding-bottom:15px">
                                        <div>
                                          <label style="font-size:12px !important">Select Role</label>
                                        </div>
                                        <select name="selectRole" id="selectRole" required onChange={e => {
                                          let nameOfRole;
                                          AllRoles.map(role => {
                                            if (role.uuid === e.target.value) {
                                              nameOfRole = role.name;
                                            }
                                          })
                                          setCreateData({
                                            ...createData,
                                            roleID: e.target.value,
                                            roleName: nameOfRole
                                          })
                                        }}>
                                          <option value=''>Role List</option>
                                          {
                                            FilteredRoles &&
                                            FilteredRoles.map(role => (
                                              <option value={role.uuid} selected={createData.roleID === role.uuid}>{role.displayName}</option>
                                            ))
                                          }

                                        </select>
                                      </div>
                                    }
                                  </div>

                                </div>
                              </div>
                            </div>

                            <div class="profile-content-inner-right" >
                              <div class="profile-container">
                                <form id="myForm1">
                                  <div class="contact-info-container">
                                    <div class="contact-info">
                                      <div class="contact-info-inner">

                                        <div class="contact-info-header">
                                          <div class="contact-info-header-title">
                                            <span class="contact-info-header-text">Contact information</span>
                                            <input class="contact-info-header-text-input" style="display: none;" />
                                            <span class="contact-info-header-edit-icon" style="display: none;" />
                                          </div>
                                          <div class="contact-info-header-actions">
                                            <span class="contact-info-editor-header-edit">Edit</span>
                                          </div>
                                        </div>

                                        <div class="contact-info-content">
                                          <div class="contact-info-content-inner-container">
                                            <div class="content-action" />
                                            <div class="drag-handle-container">
                                              <div class="drag-button" />
                                            </div>
                                            <div class="content-title">
                                              <label class="content-title-text" style="font-size: 12px !important;">Name</label>
                                            </div>
                                            <div class="content-block">
                                              <input type="text" name="name" required placeholder="Enter name" value={createData.name}
                                                onChange={e => {
                                                  setCreateData({
                                                    ...createData,
                                                    name: e.target.value
                                                  })
                                                }} />
                                            </div>
                                            <div class="content-menu" />
                                          </div>
                                          <div class="contact-info-content-inner-container">
                                            <div class="content-action" />
                                            <div class="drag-handle-container">
                                              <div class="drag-button" />
                                            </div>
                                            <div class="content-title">
                                              <label class="content-title-text" style="font-size: 12px !important;">Display Name</label>
                                            </div>
                                            <div class="content-block">
                                              <input type="text" name="displayName" required placeholder="Enter display name" value={createData.displayName}
                                                onChange={e => {
                                                  setCreateData({
                                                    ...createData,
                                                    displayName: e.target.value
                                                  })
                                                }} />
                                            </div>
                                            <div class="content-menu" />
                                          </div>
                                          {(modalTitle !== "Department" && modalTitle !== "Role" && modalTitle !== "User") &&
                                            <div class="contact-info-content-inner-container">
                                              <div class="content-action" />
                                              <div class="drag-handle-container">
                                                <div class="drag-button" />
                                              </div>
                                              <div class="content-title">
                                                <label class="content-title-text" style="font-size: 12px !important;">Short Name</label>
                                              </div>
                                              <div class="content-block">
                                                <input type="text" name="shortName" required pla
                                                  ceholder="Enter short name" value={createData.shortName}
                                                  onChange={e => {
                                                    setCreateData({
                                                      ...createData,
                                                      shortName: e.target.value
                                                    })
                                                  }} />
                                              </div>
                                              <div class="content-menu" />
                                            </div>
                                          }
                                          {(modalTitle === "User") &&
                                            <div>
                                              <div class="contact-info-content-inner-container">
                                                <div class="content-action" />
                                                <div class="drag-handle-container">
                                                  <div class="drag-button" />
                                                </div>
                                                <div class="content-title">
                                                  <label class="content-title-text" style="font-size: 12px !important;">Email</label>
                                                </div>
                                                <div class="content-block">
                                                  <input type="text" name="email" required placeholder="Enter email address" value={createData.email}
                                                    onChange={e => {
                                                      setCreateData({
                                                        ...createData,
                                                        email: e.target.value
                                                      })
                                                    }} />
                                                </div>
                                                <div class="content-menu" />
                                              </div>
                                              <div class="contact-info-content-inner-container">
                                                <div class="content-action" />
                                                <div class="drag-handle-container">
                                                  <div class="drag-button" />
                                                </div>
                                                <div class="content-title">
                                                  <label class="content-title-text" style="font-size: 12px !important;">Mobile</label>
                                                </div>
                                                <div class="content-block">
                                                  <input type="text" name="mobile" required placeholder="Enter mobile number" value={createData.mobile}
                                                    onChange={e => {
                                                      setCreateData({
                                                        ...createData,
                                                        mobile: e.target.value
                                                      })
                                                    }} />
                                                </div>
                                                <div class="content-menu" />
                                              </div>
                                            </div>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>

                              {(modalTitle !== "Department" && modalTitle !== "Role" && modalTitle !== "User") &&
                                <div class="profile-container">
                                  <form id="myForm2">
                                    <div class="contact-info-container">
                                      <div class="contact-info">
                                        <div class="contact-info-inner">
                                          <div class="contact-info-header">
                                            <div class="contact-info-header-title">
                                              <span class="contact-info-header-text">Address</span>
                                              <input class="contact-info-header-text-input" style="display: none;" />
                                              <span class="contact-info-header-edit-icon" style="display: none;" />
                                            </div>
                                            <div class="contact-info-header-actions">
                                              <span class="contact-info-editor-header-edit">Edit</span>
                                            </div>
                                          </div>

                                          <div class="contact-info-content">
                                            <div class="contact-info-content-inner-container">
                                              <div class="content-action" />
                                              <div class="drag-handle-container">
                                                <div class="drag-button" />
                                              </div>
                                              <div class="content-title">
                                                <label class="content-title-text" style="font-size: 12px !important;">Address Line1</label>
                                              </div>
                                              <div class="content-block">
                                                <input type="text" name="addressLine1" required placeholder="Enter address" value={createData.address ? createData.address.line1 : ''}
                                                  onChange={e => {

                                                    setCreateData(prevValue => ({
                                                      ...createData,
                                                      address: {
                                                        ...createData.address,
                                                        line1: e.target.value
                                                      }
                                                    }))
                                                  }} />
                                              </div>
                                              <div class="content-menu" />
                                            </div>
                                            <div class="contact-info-content-inner-container">
                                              <div class="content-action" />
                                              <div class="drag-handle-container">
                                                <div class="drag-button" />
                                              </div>
                                              <div class="content-title">
                                                <label class="content-title-text" style="font-size: 12px !important;">Address Line2</label>
                                              </div>
                                              <div class="content-block">
                                                <input type="text" name="addressLine2" required placeholder="Enter address" value={createData.address ? createData.address.line2 : ''}
                                                  onChange={e => {

                                                    setCreateData(prevValue => ({
                                                      ...createData,
                                                      address: {
                                                        ...createData.address,
                                                        line2: e.target.value
                                                      }
                                                    }))

                                                  }} />
                                              </div>
                                              <div class="content-menu" />
                                            </div>
                                            <div class="contact-info-content-inner-container">
                                              <div class="content-action" />
                                              <div class="drag-handle-container">
                                                <div class="drag-button" />
                                              </div>
                                              <div class="content-title">
                                                <label class="content-title-text" style="font-size: 12px !important;">City</label>
                                              </div>
                                              <div class="content-block">
                                                <input type="text" name="city" required placeholder="Enter city" value={createData.address ? createData.address.city : ''}
                                                  onChange={e => {

                                                    setCreateData(prevValue => ({
                                                      ...createData,
                                                      address: {
                                                        ...createData.address,
                                                        city: e.target.value
                                                      }
                                                    }))

                                                  }} />
                                              </div>
                                              <div class="content-menu" />
                                            </div>
                                            <div class="contact-info-content-inner-container">
                                              <div class="content-action" />
                                              <div class="drag-handle-container">
                                                <div class="drag-button" />
                                              </div>
                                              <div class="content-title">
                                                <label class="content-title-text" style="font-size: 12px !important;">State</label>
                                              </div>
                                              <div class="content-block">
                                                <input type="text" name="state" required placeholder="Enter state" value={createData.address ? createData.address.state : ''}
                                                  onChange={e => {

                                                    setCreateData(prevValue => ({
                                                      ...createData,
                                                      address: {
                                                        ...createData.address,
                                                        state: e.target.value
                                                      }
                                                    }))

                                                  }} />
                                              </div>
                                              <div class="content-menu" />
                                            </div>
                                            <div class="contact-info-content-inner-container">
                                              <div class="content-action" />
                                              <div class="drag-handle-container">
                                                <div class="drag-button" />
                                              </div>
                                              <div class="content-title">
                                                <label class="content-title-text" style="font-size: 12px !important;">Zipcode</label>
                                              </div>
                                              <div class="content-block">
                                                <input type="text" name="zipcode" required placeholder="Enter zipcode" value={createData.address ? createData.address.zipcode : ''}
                                                  onChange={e => {

                                                    setCreateData(prevValue => ({
                                                      ...createData,
                                                      address: {
                                                        ...createData.address,
                                                        zipcode: e.target.value
                                                      }
                                                    }))

                                                  }} />
                                              </div>
                                              <div class="content-menu" />
                                            </div>
                                          </div>


                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              }
                            </div>

                          </div>
                          <div class="profile-content-inner-footer">
                            <span class="password-security-button" style="height: 26px; font-size: 11px" onClick={handleReset} >
                              <span class="password-security-text" >Reset</span>
                            </span>
                            <span class="password-security-button" style="height: 26px; font-size: 11px" onClick={handleCreate}>
                              <span class="password-security-text" >Create</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </form>
              </Modal>

            </div> : ""
          }
        </div>
      </div>
      <Modal title="Add Dealership" modalSize="is-full-height"
        modalDisplay={(isAddDealershipModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddDealershipModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveDealarship(e)}>
            <div class="row">
              <div class="col-xs-12" style="height: 80vh;overflow: scroll;">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p>Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" required value={dealershipData.name} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          name: e.target.value
                        });
                        // setDealershipName(e.target.value);
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={dealershipData.displayName} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Dealer Code<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="dealerCode" required value={dealershipData.dealerCode} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          dealerCode: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Key Person<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="keyPerson" required value={dealershipData.keyPerson} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          keyPerson: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Location<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="location" required value={dealershipData.location} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          location: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>No. Of Branches<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number" name="noOfBranches" required value={dealershipData.noOfBranches} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          noOfBranches: e.target.value
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p>Short Name</p>
                      <input type="text" name="shortName" value={dealershipData.shortName} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          shortName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Status<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="status" required value={dealershipData.status} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          status: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Address Line1<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="addressLine1" value={dealershipData.address && dealershipData.address.line1 && dealershipData.address.line1} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          address: {
                            ...dealershipData.address,
                            line1: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Address line 2</p>
                      <input type="text" name="addressLine2" value={dealershipData.address && dealershipData.address.line2 && dealershipData.address.line2} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          address: {
                            ...dealershipData.address,
                            line2: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>City<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="city" required value={dealershipData.address && dealershipData.address.city && dealershipData.address.city} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          address: {
                            ...dealershipData.address,
                            city: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>State<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="state" required value={dealershipData.address && dealershipData.address.state && dealershipData.address.state} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          address: {
                            ...dealershipData.address,
                            state: e.target.value
                          }
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p>Zipcode<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number" name="zipcode" required value={dealershipData.address && dealershipData.address.zipcode} onInput={(e)=> checkValidation(e,"ZIPCODE","DealershipAddress")}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="type" value={dealershipData.type} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          type: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Sub Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="type" value={dealershipData.subType} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          subType: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>SMS Configured<sup class="star-mandatory-entry">*</sup></p>
                      <input type="checkbox" checked={dealershipData.isSMSConfigured ? true : false} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          isSMSConfigured: true
                        });
                      }} value="true" /> Yes
                        <input type="checkbox" checked={dealershipData.isSMSConfigured ? false : true} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          isSMSConfigured: false
                        });
                      }} value="false" /> No
                    </div>
                    <div style="margin:8px 0;">
                      <p>Email Configured<sup class="star-mandatory-entry">*</sup></p>
                      <input type="checkbox" checked={dealershipData.isEmailConfigured ? true : false} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          isEmailConfigured: true
                        });
                      }} value="true" /> Yes
                        <input type="checkbox" checked={dealershipData.isEmailConfigured ? false : true} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          isEmailConfigured: false
                        });
                      }} value="false" /> No
                    </div>
                    <div style="margin:8px 0;">
                      <p>Scanned Documents</p>
                      <input class='smallDoc' type="file" name="scannedDocuments" value={dealershipData.scannedDocuments} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          scannedDocuments: e.target.files
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Agreement</p>
                    <hr />
                    <div style="margin:8px 0;">
                      <p>Scanned LOO</p>
                      <input class='smallDoc' type="file" name="scannedLOO" value={dealershipData.scannedDocuments} onChange={(e) => {
                        // uploadBrowsedFile(e);
                      }} />
                    </div>
                    <div style="margin:8px 0;width:100%">
                      <p>Scanned Agreement</p>
                      <input class='smallDoc' type="file" name="scannedAgreement" value={dealershipData.scannedDocuments} onChange={(e) => {
                        // uploadBrowsedFile(e);
                      }} />
                    </div>
                    <div style="display:flex;margin:8px 0; justify-content:space-between;">
                      <div style="flex:.48">
                        <p>Start Date<sup class="star-mandatory-entry">*</sup></p>
                        <input type="date" required name="startDate" value={agreement.startDate} format="dd-mm-yyyy" onChange={(e) => {
                          setAgreement({
                            ...agreement,
                            startDate: e.target.value
                          });
                        }} />
                      </div>
                      <div style="flex:.48">
                        <p>End Date<sup class="star-mandatory-entry">*</sup></p>
                        <input type="date" required name="endDate" value={agreement.endDate} format="dd-mm-yyyy" onChange={(e) => {
                          setAgreement({
                            ...agreement,
                            endDate: e.target.value
                          });
                        }} />
                      </div>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Duration<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="duration" value={agreement.duration} onChange={(e) => {
                        setAgreement({
                          ...agreement,
                          duration: e.target.value
                        });
                      }} />
                    </div>
                    <div style="display:flex;margin:8px 0; justify-content:space-between;">
                      <div style="flex:.48">
                        <p>Renewal Date<sup class="star-mandatory-entry">*</sup></p>
                        <input type="date" required name="renewalDate" value={agreement.renewalDate} format="dd-mm-yyyy" onChange={(e) => {
                          setAgreement({
                            ...agreement,
                            renewalDate: e.target.value
                          });
                        }} />
                      </div>
                      <div style="flex:.48">
                        <p>Renewal Reminder<sup class="star-mandatory-entry">*</sup></p>
                        <input type="date" required name="RenewalReminder" value={agreement.renewalReminder} format="dd-mm-yyyy" onChange={(e) => {
                          setAgreement({
                            ...agreement,
                            renewalReminder: e.target.value
                          });
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row form-footer" style="bottom:0;top:90vh;">
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type='submit'>Save</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleAddDealershipModalVisibility(e)}>Cancel</button>

                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Dealership Details" modalSize="is-full-height"
        modalDisplay={(isDealershipDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleDealershipDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateDealarship(e)}>
            <div class="row">
              <div class="col-xs-12" style='overflow:scroll;height:80vh'>
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p>Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="name" value={dealershipData.name} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          name: e.target.value
                        });
                        // setDealershipName(e.target.value);
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="displayName" value={dealershipData.displayName} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Dealer Code<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="dealerCode" required value={dealershipData.dealerCode} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          dealerCode: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Key Person<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="keyPerson" required value={dealershipData.keyPerson} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          keyPerson: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Location<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="location" required value={dealershipData.location} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          location: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>No. Of Branches<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number" name="noOfBranches" required value={dealershipData.noOfBranches} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          noOfBranches: e.target.value
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p>Short Name</p>
                      <input type="text" name="shortName" value={dealershipData.shortName} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          shortName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Status<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="status" value={dealershipData.status} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          status: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Address Line1<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="addressLine1" required value={dealershipData.address && dealershipData.address.line1 && dealershipData.address.line1} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          address: {
                            ...dealershipData.address,
                            line1: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Address line 2</p>
                      <input type="text" value={dealershipData.address && dealershipData.address.line2 && dealershipData.address.line2} name="addressLine2" onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          address: {
                            ...dealershipData.address,
                            line2: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>City<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="city" required value={dealershipData.address && dealershipData.address.city && dealershipData.address.city} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          address: {
                            ...dealershipData.address,
                            city: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>State<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required value={dealershipData.address && dealershipData.address.state && dealershipData.address.state} name="state" onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          address: {
                            ...dealershipData.address,
                            state: e.target.value
                          }
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p>Zipcode<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number" required value={dealershipData.address && dealershipData.address.zipcode } name="zipcode" onInput={(e)=> checkValidation(e,"ZIPCODE","DealershipAddress")}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="type" value={dealershipData.type} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          type: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Sub Type<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="type" value={dealershipData.subType} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          subType: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>SMS Configured<sup class="star-mandatory-entry">*</sup></p>
                      <input type="checkbox" onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          isSMSConfigured: true
                        });
                      }} checked={dealershipData.isSMSConfigured ? true : false} value="true" /> Yes
                      <input type="checkbox" onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          isSMSConfigured: false
                        });
                      }} checked={dealershipData.isSMSConfigured ? false : true} value="false" /> No
                  </div>
                    <div style="margin:8px 0;">
                      <p>Email Configured<sup class="star-mandatory-entry">*</sup></p>
                      <input type="checkbox" onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          isEmailConfigured: true
                        });
                      }} checked={dealershipData.isEmailConfigured ? true : false} /> Yes
                      <input type="checkbox" onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          isEmailConfigured: false
                        });
                      }} checked={dealershipData.isEmailConfigured ? false : true} value="false" /> No
                  </div>
                    <div style="margin:8px 0;">
                      <p>Scanned Documents</p>
                      <input class='smallDoc' type="file" name="scannedDocuments" value={dealershipData.scannedDocuments} onChange={(e) => {
                        setDealershipData({
                          ...dealershipData,
                          scannedDocuments: e.target.value
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <p style="color:#525c69;text-transform: uppercase; font-size:11px; font-weight:600">Agreement</p>
                    <hr />
                    <div style="margin:8px 0;">
                      <p>Scanned LOO</p>
                      <input class='smallDoc' type="file" name="scannedLOO" value={dealershipData.scannedDocuments} onChange={(e) => {
                        // uploadBrowsedFile(e);
                      }} />
                    </div>
                    <div style="margin:8px 0;width:100%">
                      <p>Scanned Agreement</p>
                      <input class='smallDoc' type="file" name="scannedAgreement" value={dealershipData.scannedDocuments} onChange={(e) => {
                        // uploadBrowsedFile(e);
                      }} />
                    </div>
                    <div style="display:flex;margin:8px 0; justify-content:space-between;">
                      <div style="flex:.48">
                        <p>Start Date<sup class="star-mandatory-entry">*</sup></p>
                        <input type="date" required name="startDate" value={agreement.startDate} format="dd-mm-yyyy" onChange={(e) => {
                          setAgreement({
                            ...agreement,
                            startDate: e.target.value
                          });
                        }} />
                      </div>
                      <div style="flex:.48">
                        <p>End Date<sup class="star-mandatory-entry">*</sup></p>
                        <input type="date" required name="endDate" value={agreement.endDate} format="dd-mm-yyyy" onChange={(e) => {
                          setAgreement({
                            ...agreement,
                            endDate: e.target.value
                          });
                        }} />
                      </div>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Duration<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="duration" value={agreement.duration} onChange={(e) => {
                        setAgreement({
                          ...agreement,
                          duration: e.target.value
                        });
                      }} />
                    </div>
                    <div style="display:flex;margin:8px 0; justify-content:space-between;">
                      <div style="flex:.48">
                        <p>Renewal Date<sup class="star-mandatory-entry">*</sup></p>
                        <input type="date" required name="renewalDate" value={agreement.renewalDate} format="dd-mm-yyyy" onChange={(e) => {
                          setAgreement({
                            ...agreement,
                            renewalDate: e.target.value
                          });
                        }} />
                      </div>
                      <div style="flex:.48">
                        <p>Renewal Reminder<sup class="star-mandatory-entry">*</sup></p>
                        <input type="date" required name="RenewalReminder" value={agreement.renewalReminder} format="dd-mm-yyyy" onChange={(e) => {
                          setAgreement({
                            ...agreement,
                            renewalReminder: e.target.value
                          });
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type='submit'>Update</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleDealershipDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Dealership Details" modalSize="is-full-height"
        modalDisplay={(isDealershipHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleDealershipHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-8">
              <div class="row">
                <div class="col-xs-12" style="background-color:#e2e2e2;height:150px;margin-top:20px;">
                  <span>Heading</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12" style="background-color:#e2e2e2;height:150px;margin-top:20px;">
                  <span>Details 1</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12" style="background-color:#e2e2e2;height:150px;margin-top:20px;">
                  <span>Details 2</span>
                </div>
              </div>
            </div>
            <div class="col-xs-4" style="background-color:#e2e2e2;margin-top:20px">
              <span>Vertical col</span>
            </div>
            <div class="col-xs-12" style="background-color:#e2e2e2;margin-left:10px;margin-top:20px">
              <span>Timeline</span>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isDealershipHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleDealershipHistoryEmptyModal(e)}>
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
                  <button type="button" class="button button-cancel" onClick={(e) => toggleDealershipHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal title="Add Branch" modalSize="is-full-height"
        modalDisplay={(isAddBranchModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddBranchModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveBranch(e)}>
            <div class="row">
              <div class="col-xs-12" style='overflow:scroll;height:80vh'>
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p>Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" required value={branchData.name} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          name: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={branchData.displayName} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Short Name</p>
                      <input type="text" name="shortName" value={branchData.shortName} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          shortName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Branch Code<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="status" required value={branchData.branchCode} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          branchCode: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Status<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="status" required value={branchData.status} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          status: e.target.value
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p>Address Line 1<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="line1" required value={branchData.address && branchData.address.line1 && branchData.address.line1} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          address: {
                            ...branchData.address,
                            line1: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Address Line 2</p>
                      <input type="text" name="line2" value={branchData.address && branchData.address.line2 && branchData.address.line2} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          address: {
                            ...branchData.address,
                            line2: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>City<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="city" required value={branchData.address && branchData.address.city && branchData.address.city} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          address: {
                            ...branchData.address,
                            city: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>State<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="state" required value={branchData.address && branchData.address.state && branchData.address.state} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          address: {
                            ...branchData.address,
                            state: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Zipcode<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number" name="zipcode" required value={branchData.address && branchData.address.zipcode} onInput={(e)=> checkValidation(e,"ZIPCODE","BranchAddress")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Select Dealership<sup class="star-mandatory-entry">*</sup></p>
                      <select name="gender" required value={branchData.dealershipID} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          dealershipID: e.target.value
                        });
                      }}>
                        <option value=''>Select Dealership</option>
                        {
                          dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid}>{dealership.name}</option>
                          ))
                        }
                      </select>
                    </div>


                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type='submit' >Save</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleAddBranchModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Branch Details" modalSize="is-full-height"
        modalDisplay={(isBranchDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleBranchDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateBranch(e)}>
            <div class="row">
              <div class="col-xs-12" style='overflow:scroll;height:80vh'>
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p>Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" value={branchData.name} required onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          name: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" value={branchData.displayName} required onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Short Name</p>
                      <input type="text" name="shortName" value={branchData.shortName} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          shortName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Branch Code<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="status" value={branchData.branchCode} required onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          branchCode: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Status<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="status" value={branchData.status} required onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          status: e.target.value
                        });
                      }} />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6" style='background-color:#fff; padding:15px; border:4px solid #003468;'>
                    <div style="margin:8px 0;">
                      <p>Address Line 1<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="line1" required value={branchData.address && branchData.address.line1 && branchData.address.line1} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          address: {
                            ...branchData.address,
                            line1: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Address Line 2</p>
                      <input type="text" name="line2" value={branchData.address && branchData.address.line2 && branchData.address.line2} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          address: {
                            ...branchData.address,
                            line2: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>City<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="city" required value={branchData.address && branchData.address.city && branchData.address.city} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          address: {
                            ...branchData.address,
                            city: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>State<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="state" required value={branchData.address && branchData.address.state && branchData.address.state} onChange={(e) => {
                        setBranchData({
                          ...branchData,
                          address: {
                            ...branchData.address,
                            state: e.target.value
                          }
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Zipcode<sup class="star-mandatory-entry">*</sup></p>
                      <input type="number" name="zipcode" required value={branchData.address && branchData.address.zipcode} onInput={(e)=> checkValidation(e,"ZIPCODE","BranchAddress")}/>
                    </div>
                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type='submit' >Update</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleBranchDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isBranchHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleBranchHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      branchHistoryList.map((attachment, index) => (
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
                  <button type="button" class="button button-cancel" onClick={(e) => toggleBranchHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isBranchHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleBranchHistoryEmptyModal(e)}>
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
                  <button type="button" class="button button-cancel" onClick={(e) => toggleBranchHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal title="Add Department" modalSize="is-full-height"
        modalDisplay={(isAddDepartmentModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleDepartmentModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveDepartment(e)}>
            <div class="row" >
              <div class="col-xs-12" style="height:80vh; overflow:scroll">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" required value={departmentData.name} onChange={(e) => {
                        setDepartmentData({
                          ...departmentData,
                          name: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={departmentData.displayName} onChange={(e) => {
                        setDepartmentData({
                          ...departmentData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Dealership<sup class="star-mandatory-entry">*</sup></p>
                      <select name="gender" required value={departmentData.dealershipID} onChange={(e) => {
                        selectDealership(e);
                        setDepartmentData({
                          ...departmentData,
                          dealershipID: e.target.value
                        });
                      }}>
                        <option value=''>Select Dealership</option>
                        {
                          dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid}>{dealership.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Branch<sup class="star-mandatory-entry">*</sup></p>
                      <select name="gender" required value={departmentData.branchID} onChange={(e) => {
                        selectBranch(e.target.value)
                        setDepartmentData({
                          ...departmentData,
                          branchID: e.target.value
                        });

                        // console.log(e.target.value);
                      }}>
                        <option value=''>Select Branch</option>
                        {/* {
                          branchList &&
                          branchList.map((branch) => (
                            <option value={branch.uuid}>{branch.name}</option>
                          ))
                        } */}
                        {
                          filteredBranchList && filteredBranchList.map((branch) => (
                            <option value={branch.uuid}>{branch.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div>
                      <p>Is Sub-Department</p>
                      <input type="checkbox" checked={departmentData.branchID && departmentData.isSubDepartment ? true : false} onChange={(e) => {
                        setDepartmentData({
                          ...departmentData,
                          isSubDepartment: e.target.checked
                        });

                      }} value="true"  disabled={!departmentData.branchID}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Parent Department<sup class="star-mandatory-entry">*</sup></p>
                      <select disabled={!departmentData.isSubDepartment} name="parentDep" required value={departmentData.parentDepartmentID} onChange={(e) => {
                        setDepartmentData({
                          ...departmentData,
                          parentDepartmentID: e.target.value
                        });
                      }}>
                        <option value=''>Select Department</option>
                        {/* {
                          branchList &&
                          branchList.map((branch) => (
                            <option value={branch.uuid}>{branch.name}</option>
                          ))
                        } */}
                        {
                          filteredDepartmentList &&
                          filteredDepartmentList.map((department) => (
                            <option value={department.uuid} selected={departmentData.parentDepartmentID === department.uuid}>{department.name}</option>
                          ))
                        }

                      </select>
                    </div>

                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type='submit' >Save</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleDepartmentModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Department Details" modalSize="is-full-height"
        modalDisplay={(isDepartmentDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleDepartmentDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateDepartment(e)}>
            <div class="row" >
              <div class="col-xs-12" style="height:80vh; overflow:scroll">
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" value={departmentData.name} required onChange={(e) => {
                        setDepartmentData({
                          ...departmentData,
                          name: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" value={departmentData.displayName} required onChange={(e) => {
                        setDepartmentData({
                          ...departmentData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Dealership<sup class="star-mandatory-entry">*</sup></p>
                      <select name="gender" required onChange={(e) => {
                        selectDealership(e);
                        setDepartmentData({
                          ...departmentData,
                          dealershipID: e.target.value
                        });
                      }}>
                        {
                          dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid} selected={departmentData.dealershipID === dealership.uuid}>{dealership.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Branch<sup class="star-mandatory-entry">*</sup></p>
                      <select name="gender" required onChange={(e) => {
                        selectBranch(e.target.value)
                        setDepartmentData({
                          ...departmentData,
                          branchID: e.target.value
                        });
                      }}>
                        {/* {
                          branchList &&
                          branchList.map((branch) => (
                            <option value={branch.uuid} selected={departmentData.branchID === branch.uuid}>{branch.name}</option>
                          ))
                        } */}

                        {/*
                        Modified By: Pratik
                        Modified On: 10 Jun 2021
                        added filtered branch functionality according to dealership selected
                      */}

                        {
                          filteredBranchList && filteredBranchList.map((branch) => (
                            <option value={branch.uuid} selected={departmentData.branchID === branch.uuid}>{branch.name}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div>
                      <p>Is Sub-Department</p>
                      <input type="checkbox" checked={departmentData.branchID && departmentData.isSubDepartment ? true : false} onChange={(e) => {
                        // setDepartmentData({
                        //   ...departmentData,
                        //   isSubDepartment: e.target.checked
                        // });
                        if (!e.target.checked) {
                          setDepartmentData({
                            ...departmentData,
                            isSubDepartment: e.target.checked,
                            parentDepartmentID: ''
                          });
                        } else {
                          setDepartmentData({
                            ...departmentData,
                            isSubDepartment: e.target.checked
                          });
                        }
                        // selectBranch(departmentData.branchID)

                      }}  disabled={!departmentData.branchID}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Parent Department<sup class="star-mandatory-entry">*</sup></p>
                      <select disabled={!departmentData.isSubDepartment} name="parentDep" onChange={(e) => {
                        setDepartmentData({
                          ...departmentData,
                          parentDepartmentID: e.target.value
                        });
                      }}>
                        <option value=''>Select Department</option>
                        {/* {
                          branchList &&
                          branchList.map((branch) => (
                            <option value={branch.uuid}>{branch.name}</option>
                          ))
                        } */}
                        {
                          filteredDepartmentList &&
                          filteredDepartmentList.map((department) => (
                            <option value={department.uuid} disabled={departmentData.uuid === department.uuid} selected={departmentData.parentDepartmentID === department.uuid}>{department.name}</option>
                          ))
                        }

                      </select>
                    </div>

                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type='submit' >Update</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleDepartmentDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isDepartmentHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleDepartmentHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      departmentHistoryList.map((attachment, index) => (
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
                  <button type="button" class="button button-cancel" onClick={(e) => toggleDepartmentHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isDepartmentHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleDepartmentHistoryEmptyModal(e)}>
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
                  <button type="button" class="button button-cancel" onClick={(e) => toggleDepartmentHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal title="Add Role" modalSize="is-full-height"
        modalDisplay={(isAddRoleModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddRoleModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveRole(e)}>
            <div class="row" >
              <div class="col-xs-12" style="height:80vh; overflow:scroll">
                <div class="row form-elements modal-form">
                  {/*
                    Modified By: Pratik
                    Modified On: 09 Jun 2021
                    added * and required field added to the input boxes and buttons aligned at center
              */}
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="name" required value={roleData.name} onChange={(e) => {
                        setRoleData({
                          ...roleData,
                          name: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={roleData.displayName} onChange={(e) => {
                        setRoleData({
                          ...roleData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Dealership<sup class="star-mandatory-entry">*</sup></p>
                      <select name="gender" required value={roleData.dealershipID} onChange={(e) => {
                        selectDealership(e);
                        setRoleData({
                          ...roleData,
                          dealershipID: e.target.value
                        });
                      }}>
                        <option value=''>Select Dealership</option>
                        {
                          dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid}>{dealership.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Branch</p>
                      <select name="gender" value={roleData.branchID} onChange={(e) => {

                        selectBranch(e.target.value);
                        setRoleData({
                          ...roleData,
                          branchID: e.target.value
                        });
                      }}>
                        <option value=''>Select Branch</option>
                        {/* {
                          branchList &&
                          branchList.map((branch) => (
                            <option value={branch.uuid}>{branch.name}</option>
                          ))
                        } */}
                        {/*
                        Modified By: Pratik
                        Modified On: 10 Jun 2021
                        added filtered branch functionality according to dealership selected
                      */}
                        {
                          filteredBranchList &&
                          filteredBranchList.map((branch) => (
                            <option value={branch.uuid}>{branch.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Department</p>
                      <select name="gender" value={roleData.departmentID} onChange={(e) => {

                        setRoleData({
                          ...roleData,
                          departmentID: e.target.value
                        });
                      }}>
                        <option value=''>Select Department</option>
                        {/* {
                          departmentList &&
                          departmentList.map((department) => (
                            <option value={department.uuid}>{department.name}</option>
                          ))
                        } */}
                        {
                          filteredDepartmentList &&
                          filteredDepartmentList.map((department) => (
                            <option value={department.uuid}>{department.name}</option>
                          ))
                        }
                      </select>
                    </div>

                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type='submit' >Save</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleAddRoleModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Role Details" modalSize="is-full-height"
        modalDisplay={(isRoleDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleRoleDetailsModalVisibilityClosed(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateRole(e)}>
            <div class="row" >
              <div class="col-xs-12" style="height:80vh; overflow:scroll">
                <div class="row form-elements modal-form">
                  {/*
                    Modified By: Pratik
                    Modified On: 09 Jun 2021
                    added * and required field added to the input boxes and buttons aligned at center
              */}
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p class="form-label">Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" required name="name" value={roleData.name} onChange={(e) => {
                        setRoleData({
                          ...roleData,
                          name: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Display Name<sup class="star-mandatory-entry">*</sup></p>
                      <input type="text" name="displayName" required value={roleData.displayName} onChange={(e) => {
                        setRoleData({
                          ...roleData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Dealership<sup class="star-mandatory-entry">*</sup></p>
                      <select name="gender" required onChange={(e) => {
                        selectDealership(e);
                        setRoleData({
                          ...roleData,
                          dealershipID: e.target.value
                        });
                      }}>
                        {
                          dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid} selected={roleData.dealershipID === dealership.uuid} >{dealership.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Branch</p>
                      <select name="gender"  onChange={(e) => {
                        selectBranch(e.target.value);
                        setRoleData({
                          ...roleData,
                          branchID: e.target.value
                        });
                      }}>
                      <option value=''>Select Branch</option>
                        {/* {
                          branchList &&
                          branchList.map((branch) => (
                            <option value={branch.uuid}>{branch.name}</option>
                          ))
                        } */}
                        {/*
                        Modified By: Pratik
                        Modified On: 10 Jun 2021
                        added filtered branch functionality according to dealership selected
                      */}
                        {
                          filteredBranchList &&
                          filteredBranchList.map((branch) => (
                            <option value={branch.uuid} selected={roleData.branchID === branch.uuid}>{branch.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p class="form-label">Select Department</p>
                      <select name="gender"  value={roleData.departmentID} onChange={(e) => {
                        setRoleData({
                          ...roleData,
                          departmentID: e.target.value
                        });
                      }}>
                        {/* {
                          departmentList &&
                          departmentList.map((department) => (
                            <option value={department.uuid}>{department.name}</option>
                          ))
                        } */}
                        <option value=''>Select Department</option>
                        {
                          filteredDepartmentList &&
                          filteredDepartmentList.map((department) => (
                            <option value={department.uuid}>{department.name}</option>
                          ))
                        }
                      </select>
                    </div>

                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type='submit' >Update</button>
                    <button type="button" class="button button-cancel" onClick={(e) => toggleRoleDetailsModalVisibilityClosed(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isRoleHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleRoleHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row" style="height:80vh; overflow:auto">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      roleHistoryList.map((attachment, index) => (
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
                  <button type="button" class="button button-cancel" onClick={(e) => toggleRoleHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isRoleHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleRoleHistoryEmptyModal(e)}>
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
                  <button type="button" class="button button-cancel" onClick={(e) => toggleRoleHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal title="Add User" modalSize="is-full-height"
        modalDisplay={(isAddUserModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddUserModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveUser(e)}>
            <div class="row">
              <div class="col-xs-12" style='overflow:scroll;height:80vh'>
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p>Name</p>
                      <input type="text" name="name" required value={userData.name} onChange={(e) => {
                        setUserData({
                          ...userData,
                          name: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Display Name</p>
                      <input type="text" name="displayName" required value={userData.displayName} onChange={(e) => {
                        setUserData({
                          ...userData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Email</p>
                      <input type="email" name="email" required value={userData.email} onInput={(e)=>checkValidation(e,'EMAIL',"User")}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Mobile</p>
                      <input type="tel" pattern='^[6789]\d{9}$' name="mobile" required value={userData.mobile} onInput={(e)=>checkValidation(e,'MOBILE NUMBER',"User")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Designation</p>
                      <input type="text" name="designation" value={userData.designation} onChange={(e) => {
                        setUserData({
                          ...userData,
                          designation: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Designation Code</p>
                      <input type="text" name="designationCode" value={userData.designationCode} onChange={(e) => {
                        setUserData({
                          ...userData,
                          designationCode: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>EmployeeCode</p>
                      <input type="text" name="employeeCode" value={userData.employeeCode} onChange={(e) => {
                        setUserData({
                          ...userData,
                          employeeCode: e.target.value
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Select Dealership</p>
                      <select name="dealershipID" required value={userData.dealershipID} onChange={(e) => {
                        selectDealership(e)
                        setUserData({
                          ...userData,
                          dealershipID: e.target.value,
                          roleID: ''
                        });
                      }}>
                        <option value='' selected>Select Dealership</option>
                        {
                          dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid} selected={userData.dealershipID === dealership.uuid}>{dealership.name}</option>
                          ))
                        }
                      </select>
                    </div>

                    {/*
                      Modified By: Haresh
                      Modified On: 29-07-2021
                      Modification: add onClick for branch and role
                    */}
                    <div style="margin:8px 0;">
                      <p>Select Branch</p>
                      <select name="branchID" required value={userData.branchID} onChange={(e) => {
                        selectBranch(e.target.value)
                        setUserData({
                          ...userData,
                          branchID: e.target.value,
                          departmentID: ''
                        });
                      }}>
                        <option value='' selected>Select Branch</option>
                        {/* {
                          branchList &&
                          branchList.map((branch) => (
                            <option value={branch.uuid} selected={userData.branchID === branch.uuid}>{branch.name}</option>
                          ))
                        } */}
                        {
                          filteredBranchList &&
                          filteredBranchList.map((branch) => (
                            <option value={branch.uuid} selected={userData.branchID === branch.uuid}>{branch.name}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p>Select Department</p>
                      <select name="department" required value={userData.departmentID} onChange={(e) => {
                        selectDepartment(e, userData.branchID)
                        setUserData({
                          ...userData,
                          departmentID: e.target.value,
                          roleID: ''
                        });
                      }}>
                        <option value='' selected >Select Department</option>
                        {/* {
                          departmentList &&
                          departmentList.map((department) => (
                            <option value={department.uuid} selected={userData.departmentID === department.uuid}>{department.name}</option>
                          ))
                        } */}
                        {
                          filteredDepartmentList &&
                          filteredDepartmentList.map((department) => (
                            <option value={department.uuid} selected={userData.departmentID === department.uuid}>{department.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Select Role</p>
                      <select name="roleId" required value={userData.roleID} onChange={(e) => {
                        setUserData({
                          ...userData,
                          roleID: e.target.value
                        });
                      }}>
                        <option value='' selected>Select Role</option>
                        {/* {
                            roleList &&
                            roleList.map((role) => (
                              <option value={role.uuid} selected={userData.roleID === role.uuid}>{role.name}</option>
                            ))
                          } */}
                        {
                          filteredRoleList &&
                          filteredRoleList.map((role) => (
                            <option value={role.uuid} selected={userData.roleID === role.uuid}>{role.name}</option>
                          ))
                        }

                      </select>

                    </div>
                    <div style="margin:8px 0;">
                      <p>Select Reporting Manager</p>
                      <select name="reportmanagerId" value={userData.reportingManagerID} onChange={(e) => {
                        setUserData({
                          ...userData,
                          reportingManagerID: e.target.value
                        });
                      }}>
                        <option value='' selected>Select Reporting Manager</option>
                        {/* {
                            roleList &&
                            roleList.map((role) => (
                              <option value={role.uuid} selected={userData.roleID === role.uuid}>{role.name}</option>
                            ))
                          } */}
                        {
                          allUsers &&
                          allUsers.map((User) => (
                            <option value={User.uuid} selected={userData.reportingManagerID === User.uuid}>{User.name}</option>
                          ))
                        }

                      </select>

                    </div>
                  </div>
                  <div class="row form-footer" style='bottom:0;top:90vh'>
                    <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type="submit" >Save</button>
                      <button type="button" class="button button-cancel" style="margin-right:10px" onClick={(e) => toggleAddUserModalVisibility(e)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="User Details" modalSize="is-full-height"
        modalDisplay={(isUserDetailsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleUserDetailsModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => updateUser(e)}>
            <div class="row">
              <div class="col-xs-12" style='overflow:scroll;height:80vh'>
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p>Name</p>
                      <input type="text" name="name" value={userData.name} onChange={(e) => {
                        setUserData({
                          ...userData,
                          name: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Display Name</p>
                      <input type="text" name="displayName" value={userData.displayName} onChange={(e) => {
                        setUserData({
                          ...userData,
                          displayName: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Email</p>
                      <input type="email" name="email" value={userData.email} onInput={(e)=>checkValidation(e,'EMAIL',"User")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Mobile</p>
                      <input type="number" name="mobile" value={userData.mobile} onInput={(e)=>checkValidation(e,'MOBILE NUMBER',"User")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Designation</p>
                      <input type="text" name="designation" value={userData.designation} onChange={(e) => {
                        setUserData({
                          ...userData,
                          designation: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Designation Code</p>
                      <input type="text" name="designationCode" value={userData.designationCode} onChange={(e) => {
                        setUserData({
                          ...userData,
                          designationCode: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>EmployeeCode</p>
                      <input type="text" name="employeeCode" value={userData.employeeCode} onChange={(e) => {
                        setUserData({
                          ...userData,
                          employeeCode: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Select Dealership</p>
                      <select name="dealershipID" required value={userData.dealershipID} onChange={(e) => {
                        selectDealership(e)
                        setUserData({
                          ...userData,
                          dealershipID: e.target.value,
                          roleID: ''
                        });
                      }}>
                        <option value='' selected>Select Dealership</option>
                        {
                          dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid} selected={userData.dealershipID === dealership.uuid}>{dealership.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    {

                      /*

                        Modified By: Haresh
                        Modified On: 29-07-2021
                        Modification: add departmentName,branchName,and roleName in popup edit option
                      */

                    }
                    <div style="margin:8px 0;">
                      <p>Select Branch</p>
                      <select name="branchID" onChange={(e) => {
                        // updateDepartmentList(e.target.value)
                        // updateRoleList(e.target.value)
                        selectBranch(e.target.value)
                        setUserData({
                          ...userData,
                          branchID: e.target.value,
                          departmentID: ''
                        });
                      }}>
                        <option value='' selected>Select Branch</option>
                        {/* {
                          branchList &&
                          branchList.map((branch) => (
                            <option value={branch.uuid} selected={userData.branchID === branch.uuid}>{branch.name}</option>
                          ))
                        } */}
                        {
                          filteredBranchList &&
                          filteredBranchList.map((branch) => (
                            <option value={branch.uuid} selected={userData.branchID === branch.uuid}>{branch.name}</option>
                          ))
                        }
                      </select>
                    </div>


                    <div style="margin:8px 0;">
                      <p>Select Department</p>
                      <select name="department" onChange={(e) => {
                        selectDepartment(e, userData.branchID)
                        setUserData({
                          ...userData,
                          departmentID: e.target.value,
                          roleID: ''

                        });
                      }}>
                        <option value='' selected>Select Department</option>
                        {
                          departmentList &&
                          departmentList.map((department) => (
                            <option value={department.uuid} selected={userData.departmentID === department.uuid}>{department.name}</option>
                          ))
                        }
                        {/* {
                          filteredDepartmentList &&
                          filteredDepartmentList.map((department) => (
                            <option value={department.uuid} selected={userData.departmentID === department.uuid}>{department.name}</option>
                          ))
                        } */}
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p>Select Role</p>
                      <select name="roleId" onChange={(e) => {
                        setUserData({
                          ...userData,
                          roleID: e.target.value
                        });
                      }}>
                        <option value='' selected>Select Role</option>
                        {/* {
                          roleList &&
                          roleList.map((role) => (
                            <option value={role.uuid} selected={userData.roleID === role.uuid}>{role.name}</option>
                          ))
                        } */}
                        {
                          filteredRoleList &&
                          filteredRoleList.map((role) => (
                            <option value={role.uuid} selected={userData.roleID === role.uuid}>{role.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Select Reporting Manager</p>
                      <select name="reportmanagerId" value={userData.reportingManagerID} onChange={(e) => {
                        setUserData({
                          ...userData,
                          reportingManagerID: e.target.value
                        });
                      }}>
                        <option value='' selected>Select Reporting Manager</option>
                        {/* {
                            roleList &&
                            roleList.map((role) => (
                              <option value={role.uuid} selected={userData.roleID === role.uuid}>{role.name}</option>
                            ))
                          } */}
                        {
                          allUsers &&
                          allUsers.map((User) => (
                            <option value={User.uuid} selected={userData.reportingManagerID === User.uuid}>{User.name}</option>
                          ))
                        }

                      </select>

                    </div>
                    {
                      /*
                      <div class="row element-row">
                          <p>Select Dealership</p>
                          <select name="dealershipID" onChange = {(e) =>{
                            setUserData({
                              ...userData,
                              dealershipID: e.target.value
                            });
                          }}>
                          {
                            dealershipList &&
                            dealershipList.map((dealership) => (
                              <option value={dealership.uuid}>{dealership.name}</option>
                            ))
                          }
                          </select>
                      </div>

                      */
                    }
                  </div>
                </div>
                <div class="row form-footer" style='bottom:0;top:90vh'>
                  <div class="col-xs-12 has-text-center">
                  <button class="button button-action" type="submit" >Update</button>
                  <button type="button" class="button button-cancel" style="margin-right:10px" onClick={(e) => toggleUserDetailsModalVisibility(e)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isUserHistoryModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleUserHistoryModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row">
            <div class="col-xs-12">
              <div class="row" style="margin-top:10px">
                <div class="col-xs-12 no-padding timeline-column">
                  <div class="timeline-report">
                    {
                      userHistoryList.map((attachment, index) => (
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
                  <button type="button" class="button button-cancel" onClick={(e) => toggleUserHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal title="Transaction and History" modalSize="is-full-height"
        modalDisplay={(isUserHistoryEmpty ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleUserHistoryEmptyModal(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <div class="row">
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
                  <button type="button" class="button button-cancel" onClick={(e) => toggleUserHistoryModal(e)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal> */}


      <Modal title="Add Org User" modalSize="is-full-height"
        modalDisplay={(isAddOrgUserModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => toggleAddOrgUserModalVisibility(e)}>
        <ModalBody modalPadding="noPadding" modalFullHeight="fullHeight">
          <form onSubmit={(e) => saveOrgUser(e)}>
            <div class="row">
              <div class="col-xs-12" style='overflow:scroll;height:80vh'>
                <div class="row form-elements modal-form">
                  <div class="col-sm-12 col-md-6 col-lg-6" style='background-color:#fff; padding:15px;border:4px solid #003468;' >
                    <div style="margin:8px 0;">
                      <p>Name</p>
                      <input type="text" name="name" required value={orgUserData.name} onChange={(e) => {
                        setOrgUserData({
                          ...orgUserData,
                          name: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Email</p>
                      <input type="email" name="email" required value={orgUserData.email} onInput={(e)=>checkValidation(e,'EMAIL',"OrgUser")}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Mobile</p>
                      <input type="tel" pattern='^[6789]\d{9}$' name="mobile" value={orgUserData.mobile} onInput={(e)=>checkValidation(e,'MOBILE NUMBER',"OrgUser")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Personal Email</p>
                      <input type="email" name="personalEmail" value={orgUserData.personalEmail} onInput={(e)=>checkValidation(e,'EMAIL',"OrgUser")}/>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Personal Mobile</p>
                      <input type="tel" pattern='^[6789]\d{9}$' name="personalMobile" value={orgUserData.personalMobile} onInput={(e)=>checkValidation(e,'MOBILE NUMBER',"OrgUser")} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Designation</p>
                      <input type="text" name="designation" value={orgUserData.designation} onChange={(e) => {
                        setOrgUserData({
                          ...orgUserData,
                          designation: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>Designation Code</p>
                      <input type="text" name="designationCode" value={orgUserData.designationCode} onChange={(e) => {
                        setOrgUserData({
                          ...orgUserData,
                          designationCode: e.target.value
                        });
                      }} />
                    </div>
                    <div style="margin:8px 0;">
                      <p>EmployeeCode</p>
                      <input type="text" name="employeeCode" value={orgUserData.employeeCode} onChange={(e) => {
                        setOrgUserData({
                          ...orgUserData,
                          employeeCode: e.target.value
                        });
                      }} />
                    </div>

                    <div style="margin:8px 0;">
                      <p>Select Dealership</p>
                      <select style="text-transform: capitalize;" name="dealershipID" value={orgUserData.dealershipID} onChange={(e) => {
                        selectDealership(e)
                        setOrgUserData({
                          ...orgUserData,
                          dealershipID: e.target.value,
                          roleID: ''
                        });
                      }}>
                        <option value='' selected>Select Dealership</option>
                        {
                          dealershipList &&
                          dealershipList.map((dealership) => (
                            <option value={dealership.uuid} selected={orgUserData.dealershipID === dealership.uuid}>{dealership.name}</option>
                          ))
                        }
                      </select>
                    </div>

                    {/*
                      Modified By: Haresh
                      Modified On: 29-07-2021
                      Modification: add onClick for branch and role
                    */}
                    <div style="margin:8px 0;">
                      <p>Select Branch</p>
                      <select style="text-transform: capitalize;" name="branchID" value={orgUserData.branchID} onChange={(e) => {
                        selectBranch(e.target.value)
                        setOrgUserData({
                          ...orgUserData,
                          branchID: e.target.value,
                          departmentID: ''
                        });
                      }}>
                        <option value='' selected>Select Branch</option>
                        {/* {
                          branchList &&
                          branchList.map((branch) => (
                            <option value={branch.uuid} selected={orgUserData.branchID === branch.uuid}>{branch.name}</option>
                          ))
                        } */}
                        {
                          filteredBranchList &&
                          filteredBranchList.map((branch) => (
                            <option value={branch.uuid} selected={orgUserData.branchID === branch.uuid}>{branch.name}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div style="margin:8px 0;">
                      <p>Select Department</p>
                      <select style="text-transform: capitalize;" name="department" value={orgUserData.departmentID} onChange={(e) => {
                        selectDepartment(e,orgUserData.branchID)
                        setOrgUserData({
                          ...orgUserData,
                          departmentID: e.target.value,
                          roleID: ''
                        });
                      }}>
                        <option value='' selected >Select Department</option>
                        {/* {
                          departmentList &&
                          departmentList.map((department) => (
                            <option value={department.uuid} selected={orgUserData.departmentID === department.uuid}>{department.name}</option>
                          ))
                        } */}
                        {
                          filteredDepartmentList &&
                          filteredDepartmentList.map((department) => (
                            <option value={department.uuid} selected={orgUserData.departmentID === department.uuid}>{titleCase(department.name)}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div style="margin:8px 0;">
                      <p>Select Role</p>
                      <select style="text-transform: capitalize;" name="roleId" value={orgUserData.roleID} onChange={(e) => {
                        setOrgUserData({
                          ...orgUserData,
                          roleID: e.target.value
                        });
                      }}>
                        <option value='' selected>Select Role</option>
                        {/* {
                            roleList &&
                            roleList.map((role) => (
                              <option value={role.uuid} selected={orgUserData.roleID === role.uuid}>{role.name}</option>
                            ))
                          } */}
                        {
                          filteredRoleList &&
                          filteredRoleList.map((role) => (
                            <option value={role.uuid} selected={orgUserData.roleID === role.uuid}>{titleCase(role.name)}</option>
                          ))
                        }

                      </select>

                    </div>
                    <div style="margin:8px 0;">
                      <p>Select Reporting Manager</p>
                      <select style="text-transform: capitalize;" name="reportmanagerId" value={orgUserData.reportingManagerID} onChange={(e) => {
                        setOrgUserData({
                          ...orgUserData,
                          reportingManagerID: e.target.value
                        });
                      }}>
                        <option value='' selected>Select Reporting Manager</option>
                        {/* {
                            roleList &&
                            roleList.map((role) => (
                              <option value={role.uuid} selected={orgUserData.roleID === role.uuid}>{role.name}</option>
                            ))
                          } */}
                        {
                          filteredUserList &&
                          filteredUserList.map((User) => (
                            <option value={User.uuid} selected={orgUserData.reportingManagerID === User.uuid}>{User.name} - {User.roleName}</option>
                          ))
                        }

                      </select>

                    </div>
                  </div>
                  <div class="row form-footer" style='bottom:0;top:90vh'>
                    <div class="col-xs-12 has-text-center">
                    <button class="button button-action" type="submit" >Save</button>
                      <button type="button" class="button button-cancel" style="margin-right:10px" onClick={(e) => toggleAddOrgUserModalVisibility(e)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>

    </div >
  );
};

export default Organization;
