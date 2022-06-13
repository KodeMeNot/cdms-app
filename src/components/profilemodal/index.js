import { h } from "preact";
import { Link } from "preact-router/match";
import axios from "axios";
import { route } from "preact-router";
import { getItem, setItem, removeAll } from "../../lib/myStore";
import { useState, useEffect, useLayoutEffect } from "preact/hooks";
import CONSTANTS from "../../lib/constants";
import SubNavigation from "../subNavigation";
import { Modal, ModalBody } from "../rightDrawer";
import Tabs from "../../components/tabs";
import MenuDropDown from "../menuDropDown";
import Profile from "../../routes/profile";
import { rateSystem } from "../../lib/rating";

const Profilemodal = (props) => {
  console.log(props, "FFFFFFFFF");
  const userInfo = getItem("userinfo");
  let [userDisplayName, setUserDisplayName] = useState(userInfo.displayName);
  let [dealershipID, setDealershipID] = useState(userInfo.userDealershipID ? userInfo.userDealershipID : '');
  let [branchID, setBranchID] = useState(userInfo.userBranchID ? `${userInfo.userBranchID}!${userInfo.userBranchName}` : '');
  let [branchList, setBranchList] = useState([]);
  let [departmentID, setDepartmentID] = useState(userInfo.userDepartmentID ? `${userInfo.userDepartmentID}!${userInfo.userDepartmentName}` : '');
  let [departmentList, setDepartmentList] = useState([]);
  let [subDepartmentID, setSubDepartmentID] = useState(userInfo.userSubDepartmentID ? `${userInfo.userSubDepartmentID}!${userInfo.userSubDepartmentName}` : '');
  let [subDepartmentList, setSubDepartmentList] = useState([]);
  let [roleID, setRoleID] = useState(userInfo.userRoleID ? `${userInfo.userRoleID}!${userInfo.userRoleName}` : '');
  let [roleList, setRoleList] = useState([]);
  let [dealershipList, setDealershipList] = useState([]);
  let [isShowUserMenu, setShowUserMenu] = useState(props.open);
  let [isShowSecurityMenu, setShowSecurityMenu] = useState(false);
  let [mainTabOptions, setMainTabOptions] = useState([]);
  let [activeTab, setActiveTab] = useState("General");
  let [moreTabOptions, setMoreTabOptions] = useState([]);
  let [projectTrackerSubNav, setProjectTrackerSubNav] = useState([]);
  let [siloAdministrationSubNav, setSiloAdministrationSubNav] = useState([]);
  let [organizationSubNav, setOrganizationSubNav] = useState([]);

  async function showUserMenu(e) {
    setShowUserMenu(!isShowUserMenu);
    props.onClose(e);
    if (!isShowUserMenu) {
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
    }
  }
  function changeActiveTab(tabName) {
    setActiveTab(tabName);
  }
  async function showSecurityMenu(e) {
    setShowSecurityMenu(!isShowSecurityMenu);
    let x = document.getElementById("userProfileMenu");
    if (isShowSecurityMenu) {
      document.getElementById("userProfileMenu").style.top = "14px";
    } else {
      document.getElementById("userProfileMenu").style.top = "64px";
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
        let classNameService = "ratingSystemService";
        await rateSystem(
          classNameService,
          properties,
          (rating, ratingTargetElement) => {
            ratingTargetElement.parentElement.parentElement.getElementsByClassName(
              "ratingHolder"
            )[0].innerHTML = rating;
          }
        );
      }, 500);
    }
  }
  useEffect(async () => {
    let mainTabOptions = [
      {
        label: "General",
        isAddItem: false,
        isCounter: false,
        isEditable: false,
        isDraggable: false
      },
      {
        label: "Security",
        isAddItem: false,
        isCounter: false,
        isPercentage: false,
        isEditable: false,
        isDraggable: false
      }
    ];

    let moreTabOptions = [
      {
        label: "Contacts",
        isAddItem: true,
        isCounter: true,
        isEditable: true,
        isDraggable: true,
        counter: 4
      },
      {
        label: "Companies",
        isAddItem: true,
        isCounter: true,
        isEditable: true,
        isDraggable: true,
        counter: 1
      }
    ];

    await setMainTabOptions(mainTabOptions);
    await setMoreTabOptions(moreTabOptions);

    let projectTrackerSubNavList = [
      {
        label: "Milestone 1",
        path: "/projectTracker",
        icon: "icon icon-cogs"
      }
    ];
    setProjectTrackerSubNav(projectTrackerSubNavList);
    let siloAdminSubNavList = [
      {
        label: "OEM",
        path: "/oem",
        icon: "icon icon-settings"
      },
      {
        label: "ThirdParty",
        path: "/thirdParty",
        icon: "icon icon-cube"
      },
      {
        label: "Catalogue",
        path: "/productCatalogue",
        icon: "icon icon-building"
      },
      {
        label: "Catalogue Item",
        path: "/catalogueItem",
        icon: "icon icon-vcard"
      },
      {
        label: "Stock",
        path: "/stock",
        icon: "icon icon-building"
      },
      {
        label: "Stock Item",
        path: "/stockItem",
        icon: "icon icon-vcard"
      },
      {
        label: "Schemes",
        path: "/schemes",
        icon: "icon icon-file-text"
      },
      {
        label: "Offer",
        path: "/offer",
        icon: "icon icon-file-text"
      },
      {
        label: "Tenant",
        path: "/tenants",
        icon: "icon icon-vcard"
      }
    ];
    setSiloAdministrationSubNav(siloAdminSubNavList);

    let organizationSubNavList = [
      {
        label: "Organization Chart",
        path: "/organizationChart",
        icon: "icon icon-sitemap"
      },
      {
        label: "Dealership",
        path: "/dealerships",
        icon: "icon icon-building"
      },
      {
        label: "Branch",
        path: "/branches",
        icon: "icon icon-flow-branch"
      },
      {
        label: "Department",
        path: "/departments",
        icon: "icon icon-puzzle-piece"
      },
      {
        label: "Role",
        path: "/roles",
        icon: "icon icon-users"
      },
      {
        label: "User",
        path: "/users",
        icon: "icon icon-users-1"
      }
    ];
    setOrganizationSubNav(organizationSubNavList);
    await getDealershipListByCondition();
    await getBranchListByCondition();
    await getDepartmentListByCondition();
    await getSubDepartmentListByCondition();
    await getRoleListByCondition();
  }, []);
  async function getDealershipListByCondition() {
    try {
      let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDealership?activationStatus=active`);
      await setDealershipList(response.data);
      console.log(response.data);
    } catch (HTTPException) {
      console.log(HTTPException);
    }
  }

  async function getBranchListByCondition() {
    try {
      let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?userID=${userInfo.uuid}&dealershipID=${dealershipID}&activationStatus=active`);
      await setBranchList(response.data);
      console.log(response.data);
    } catch (HTTPException) {
      console.log(HTTPException);
    }
  }

  async function getDepartmentListByCondition() {
    try {
      let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?userID=${userInfo.uuid}&dealershipID=${dealershipID}&branchID=${branchID.split('!')[0]}&activationStatus=active`);
      await setDepartmentList(response.data);
      console.log(response.data);
    } catch (HTTPException) {
      console.log(HTTPException);
    }
  }

  async function getSubDepartmentListByCondition() {
    try {
      let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?userID=${userInfo.uuid}&dealershipID=${dealershipID}&branchID=${branchID.split('!')[0]}&departmentID=${departmentID.split('!')[0]}&isSubDepartment=true&activationStatus=active`);
      await setSubDepartmentList(response.data);
      console.log(response.data);
    } catch (HTTPException) {
      console.log(HTTPException);
    }
  }

  async function getRoleListByCondition() {
    try {
      let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/userOrganization?userID=${userInfo.uuid}&dealershipID=${dealershipID}&branchID=${branchID.split('!')[0]}&departmentID=${departmentID.split('!')[0]}&subDepartmentID=${subDepartmentID.split('!')[0]}&activationStatus=active`);
      await setRoleList(response.data);
      console.log(response.data);
    } catch (HTTPException) {
      console.log(HTTPException);
    }
  }

  async function setUserInfo(value, type) {
    let userData = userInfo;
    if (type === 'Dealership') {
      await setDealershipID(value);
      userData.userDealershipID = value;
      setItem('userinfo', userData);
      props.updateUserInfo();
      await setBranchID('');
      await setDepartmentID('');
      await setSubDepartmentID('');
      await setRoleID('');
      await getBranchListByCondition();
    } else if (type === 'Branch') {
      await setBranchID(value);
      userData.userBranchID = value.split('!')[0];
      userData.userBranchName = value.split('!')[1];
      setItem('userinfo', userData);
      props.updateUserInfo();
      await setDepartmentID('');
      await setSubDepartmentID('');
      await setRoleID('');
      await getDepartmentListByCondition();
    } else if (type === 'Department') {
      await setDepartmentID(value);
      userData.userDepartmentID = value.split('!')[0];
      userData.userDepartmentName = value.split('!')[1];
      setItem('userinfo', userData);
      props.updateUserInfo();
      await setSubDepartmentID('');
      await setRoleID('');
      await getSubDepartmentListByCondition();
      await getRoleListByCondition();
    } else if (type === 'Sub Department') {
      await setSubDepartmentID(value);
      userData.userSubDepartmentID = value.split('!')[0];
      userData.userSubDepartmentName = value.split('!')[1];
      setItem('userinfo', userData);
      props.updateUserInfo();
      await setRoleID('');
      await getRoleListByCondition();
    } else if (type === 'Role') {
      await setRoleID(value);
      userData.userRoleID = value.split('!')[0];
      userData.userRoleName = value.split('!')[1];
      setItem('userinfo', userData);
      props.updateUserInfo();
    }
  }
  return (
    <div class="profilemodalslide">
      {isShowUserMenu && (
        <div class="profile-modal-container" >
          <div class="profile-modal">
            <div class="profile-header-container">
              <div class="profile-header">
                <div class="profile-left-header-container">
                  <div>
                    <span class="profile-left-header-text p-t-5">
                      {userDisplayName}
                    </span>
                  </div>
                  <div>
                    <div class="starRatingContainer">
                      <div class={`ratingSystem`} style="cursor:pointer;" />
                    </div>
                    <div class="ratingHolder" style="display: none;" />
                  </div>
                </div>
                <div class="header-right-buttons">
                  <button class="extension-button">
                    <span
                      style="font-size: 12px !important"
                      class="password-security-text"
                    >
                      Extensions
                    </span>
                  </button>
                  <div class="extra" />
                  <button class="dropDown-button"> </button>
                </div>
                <span
                  class="password-security-button"
                  onClick={(e) => showSecurityMenu(e)}
                >
                  <span
                    style="font-size: 12px !important"
                    class="password-security-text"
                  >
                    Passwords
                  </span>
                </span>
              </div>
            </div>
            {mainTabOptions && mainTabOptions.length !== 0 && (
              <Tabs
                mainTabOptions={mainTabOptions}
                isMarginTopRequired={"no"}
                activePageTabItem={activeTab}
                changeActiveTab={changeActiveTab}
              />
            )}
            <div class="profile-content-container">
              <div>
                {activeTab && activeTab === "General" && (
                  <div class="profile-content-inner">
                    <div class="profile-content-inner-content-container">
                      <div class="profile-content-inner-left">
                        <div class="profile-container">
                          <div class="profile-rank-container">
                            <div class="profile-rank">
                              <span> {userInfo.roleName} </span>
                              <span class="profile-rank-span" />
                            </div>
                          </div>
                          <div class="profile-status">
                            <div class="status">ONLINE</div>
                            <div class="under-div" />
                          </div>
                          <div class="profile-photo">
                            <i class="photo" />
                            <div class="change-container">
                              <div class="take-photo">Take a photo</div>
                              <div class="upload-photo">Upload a photo</div>
                            </div>
                            <div class="remove-photo" />
                          </div>
                        </div>
                        <div class="profile-container">
                          <div class="measurement">
                            <div class="measurement-details">
                              <div class="heading p-l-20">Score </div>
                            </div>
                          </div>
                          <div class="measurement-details">
                            <div class="heading fs-35">350 </div>
                            {/*
                                  <span class="measurement-button">HOW TO MEASURE </span>
                                */}
                          </div>
                        </div>
                        {/*<div class="profile-container">
                              <div class="applications-container">
                                <div class="applications-inner">
                                  <div class="text">Mobile application</div>
                                  <span class="android" />
                                  <span class="appstore" />
                                </div>
                                <div class="applications-inner">
                                  <div class="text">Desktop application</div>
                                  <span class="windows" />
                                  <span class="apple" />
                                </div>
                              </div>
                            </div>
                            <div class="profile-container">
                              <div class="appreciation-header">
                                <span> Appreciations </span>
                              </div>
                              <div class="appreciation-content">
                                <div class="badge-container thumbsup" />
                                <div class="badge-container gift" />
                                <div class="badge-container trophy" />
                                <div class="badge-container money" />
                                <div class="badge-container crown" />
                                <div class="badge-container juice" />
                                <div class="badge-container cake" />
                                <div class="badge-container one" />
                                <div class="badge-container flag" />
                                <div class="badge-container star" />
                                <div class="badge-container heart" />
                                <div class="badge-container beer" />
                                <div class="badge-container flower" />
                                <div class="badge-container smiley" />
                              </div>
                              <div class="appreciation-footer" />
                            </div>*/}
                      </div>
                      <div class="profile-content-inner-right">
                        <div class="profile-container" style="display:flex;">
                          <form>
                            <div class="contact-info-container">
                              <div class="contact-info">
                                <div class="contact-info-inner">
                                  <div
                                    class="contact-info-header"
                                    style="width: 28vw;"
                                  >
                                    <div class="contact-info-header-title">
                                      <span class="contact-info-header-text">
                                        Contact information
                                      </span>
                                      <input
                                        class="contact-info-header-text-input"
                                        style="display: none;"
                                      />
                                      <span
                                        class="contact-info-header-edit-icon"
                                        style="display: none;"
                                      />
                                    </div>
                                    {/*<div class="contact-info-header-actions">
                                      <span class="contact-info-editor-header-edit">
                                        Edit
                                      </span>
                                    </div>*/}
                                  </div>
                                  <div class="contact-info-content">
                                    <div class="contact-info-content-inner-container">
                                      <div class="content-action" />
                                      <div class="drag-handle-container">
                                        <div class="drag-button" />
                                      </div>
                                      <div class="content-title">
                                        <label
                                          class="content-title-text"
                                          style="font-size: 12px !important;"
                                        >
                                          First name
                                        </label>
                                      </div>
                                      <div class="content-block first-letter-capital">
                                        {userDisplayName}
                                      </div>
                                      <div class="content-menu" />
                                    </div>
                                    {/*<div class="contact-info-content-inner-container">
                                      <div class="content-action" />
                                      <div class="drag-handle-container">
                                        <div class="drag-button" />
                                      </div>
                                      <div class="content-title">
                                        <label
                                          class="content-title-text"
                                          style="font-size: 12px !important;"
                                        >
                                          Last name
                                        </label>
                                      </div>
                                      <div class="content-block">
                                        field is empty
                                      </div>
                                      <div class="content-menu" />
                                    </div>*/}
                                    <div class="contact-info-content-inner-container">
                                      <div class="content-action" />
                                      <div class="drag-handle-container">
                                        <div class="drag-button" />
                                      </div>
                                      <div class="content-title">
                                        <label
                                          class="content-title-text"
                                          style="font-size: 12px !important;"
                                        >
                                          Contact email
                                        </label>
                                      </div>
                                      <div class="content-block-mail">
                                        {userInfo.email}
                                      </div>
                                      <div class="content-menu" />
                                    </div>
                                    {userInfo.userDepartmentName && <div class="contact-info-content-inner-container">
                                      <div class="content-action" />
                                      <div class="drag-handle-container">
                                        <div class="drag-button" />
                                      </div>
                                      <div class="content-title">
                                        <label
                                          class="content-title-text"
                                          style="font-size: 12px !important;"
                                        >
                                          Department
                                        </label>
                                      </div>
                                      <div
                                        class="content-block"
                                        style="opacity: 1;"
                                      >
                                        {userInfo.userDepartmentName}
                                      </div>
                                      <div class="content-menu" />
                                    </div>}
                                    <div class="contact-info-content-inner-container">
                                      <div class="content-action" />
                                      <div class="drag-handle-container">
                                        <div class="drag-button" />
                                      </div>
                                      <div class="content-title">
                                        <label
                                          class="content-title-text"
                                          style="font-size: 12px !important;"
                                        >
                                          Mobile phone
                                        </label>
                                      </div>
                                      {userInfo.personalMobile && <div class="content-block-phone">
                                        +91 {userInfo.personalMobile}
                                        <div class="content-phone-icon" />
                                      </div>}
                                      <div class="content-menu" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div class="contact-info-container">
                            <div class="contact-info">
                              <div
                                class="contact-info-inner"
                                style="padding-left: 36px;width: 28vw;margin-top: 26px;}"
                              >
                                <div class="contact-info-content">
                                  <label for="dealearship" style="color:black;fs-10;font-weight:400;font-size: 15px;">Dealership</label>
                                  <select name="dealearship" id="dealearship" value={dealershipID} onChange={(e) => {
                                    setUserInfo(e.target.value, 'Dealership');
                                  }}>
                                    <option value=''>Select Dealership</option>
                                    {
                                      dealershipList &&
                                      dealershipList.map((dealership) => (
                                        <option class="first-letter-capital" value={dealership.uuid}>{dealership.displayName}</option>
                                      ))
                                    }
                                  </select>
                                  <label for="branch" style="color:black;fs-10;font-weight:400;font-size: 15px;">Branch</label>
                                  <select name="branch" id="branch" value={branchID} onChange={(e) => {
                                    setUserInfo(e.target.value, 'Branch');
                                  }}>
                                    <option value=''>Select Branch</option>
                                    {
                                      branchList &&
                                      branchList.map((branch) => (
                                        <option class="first-letter-capital" value={`${branch.branchID}!${branch.branchName}`}>{branch.branchName}</option>
                                      ))
                                    }
                                  </select>
                                  <label for="department" style="color:black;fs-10;font-weight:400;font-size: 15px;">Department</label>
                                  <select name="department" id="department" value={departmentID} onChange={(e) => {
                                    setUserInfo(e.target.value, 'Department');
                                  }}>
                                    <option value=''>Select Department</option>
                                    {
                                      departmentList &&
                                      departmentList.map((department) => (
                                        <option class="first-letter-capital" value={`${department.departmentID}!${department.departmentName}`}>{department.departmentName}</option>
                                      ))
                                    }
                                  </select>
                                  <label for="subdepartment" style="color:black;fs-10;font-weight:400;font-size: 15px;">Sub Department</label>
                                  <select name="subdepartment" id="subdepartment" value={subDepartmentID} onChange={(e) => {
                                    setUserInfo(e.target.value, 'Sub Department');
                                  }}>
                                    <option value=''>Select Sub Department</option>
                                    {
                                      subDepartmentList &&
                                      subDepartmentList.map((subDepartment) => (
                                        <option class="first-letter-capital" value={`${subDepartment.subDepartmentID}!${subDepartment.subDepartmentName}`}>{subDepartment.subDepartmentName}</option>
                                      ))
                                    }
                                  </select>
                                  <label for="role" style="color:black;fs-10;font-weight:400;font-size: 15px;">Role</label>
                                  <select name="role" id="role" value={roleID} onChange={(e) => {
                                    setUserInfo(e.target.value, 'Role');
                                  }}>
                                    <option value=''>Select Role</option>
                                    {
                                      roleList &&
                                      roleList.map((role) => (
                                        <option class="first-letter-capital" value={`${role.roleID}!${role.roleName}`}>{role.roleName}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*<div class="profile-container">
                          <div class="about-me-container">
                            <div class="about-me-container-title">About me</div>
                            <a class="about-me-container-edit">edit</a>
                          </div>
                          <div class="about-me-container-content">
                            <div style="display: block;">
                              <div class="about-me-container-content-text">
                                I am the Avenger!
                              </div>
                              <div class="about-me-container-about" />
                            </div>
                          </div>
                        </div>*/}
                      </div>
                    </div>
                    <div class="profile-content-inner-footer">
                      <span
                        class="password-security-button"
                        style="height: 26px; font-size: 11px"
                      >
                        <span class="password-security-text">
                          Change Background
                        </span>
                      </span>
                      <span
                        class="password-security-button"
                        style="height: 26px; font-size: 11px"
                      >
                        <span class="password-security-text">
                          Custom Profile View
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                {activeTab && activeTab === "Security" && (
                  <div class="m-t-7">
                    <Profile />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profilemodal;
