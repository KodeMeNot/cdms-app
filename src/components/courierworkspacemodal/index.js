import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import CONSTANTS from '../../lib/constants';
import { getItem } from '../../lib/myStore';
import Axios from 'axios';
import toastr from "toastr";

const Courierworkspacemodal = (props) => {
  const userInfo = getItem('userinfo');
  let [usersList, setUsersList] = useState([])
  let [allUserList, setAllUserList] = useState([])
  const imageTypeExtension = ['png', 'jpg', 'jpeg'];
  let [isEditDocket, setIsEditDocket] = useState(false);
  let [isHandoverDocket, setIsHandoverDocket] = useState(false);
  let [isAddDocket, setAddDocket] = useState(false);
  let [courierData, setCourierData] = useState({})
  let [departmentList, setDepartmentList] = useState([]);
  let [courierDataSet, setCourierDataSet] = useState({
    columns: [],
    rows: []
  });
  let [importantsCourierDataSet, setImportantCourierDataSet] = useState({
    columns: [],
    rows: []
  });
  let [courierActionButton, setCourierActionButton] = useState('Save')
  let [courierImgDelete, setCourierImgDelete] = useState(false)
  let [todayDate, setTodayDate] = useState('')
  let [uploadImgArray, setUploadImgArry] = useState([])
  let [defaultCurrentDate, setDefaultCurrentDate] = useState(new Date().toISOString().slice(0, 10))
  let [areAllRequiredFieldsEntered, setAreAllRequiredFieldsEntered] = useState(false)
  let [isCallClicked, setIsCallClicked] = useState(false)
  let [requiredFields, setRequiredFields] = useState([])

  useEffect(()=>{
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-bottom-left",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "slideDown",
      "hideMethod": "slideUp"
    };
  },[]);

  useEffect(()=>{
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
  },[])

   useEffect(async() =>  {
     let departlist = await axios.get(`${CONSTANTS.API_URL}/api/v1/getDepartmentMapping?branchID=${userInfo.userBranchID}&dealershipID=${userInfo.dealership}`)
     setDepartmentList(departlist.data)
  }, [])

  async function getUsersList() {
    let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/users?dealershipIDs=${userInfo.dealership}`);
    let responseAllUser = await axios.get(`${CONSTANTS.API_URL}/api/v1/users`);
    await setAllUserList(responseAllUser.data)
    await setUsersList(response.data)
  }


  async function getRowsListForCurier(data) {
    const colList = [{
      label: 'Received From',
      field: 'receivedFrom',
      width: '250px',
      sort: 'asc'
    }, {
      label: 'Receiving Date',
      field: 'receivedFormatedDate',
      sort: 'asc'
    }, {
      label: 'Description',
      field: 'courierDescription',
      sort: 'asc'
    }, {
      label: 'To Whom',
      field: 'whomTo',
      sort: 'asc'
    }, {
      label: 'Department',
      field: 'departmentDisplayName',
      sort: 'asc'
    }, {
      label: 'Handed over to',
      field: 'handOverToUserName',
      sort: 'asc'
    }, {
      label: 'Action',
      field: 'extraModalForNotification',
      sort: 'asc'
    }];

    const rowList = data.map((p) => {
      let caseID = p.caseID ? p.caseID : "COUR #133"
      let receivedFormatedDate = p.receivedDate ? p.receivedDate.split('T')[0] : p.receivedFormatedDate
      let obej = { receivedFormatedDate, caseID, ...p };
      return obej;
    });
    const listObj = {
      columns: colList, rows: rowList
    };
    return listObj;
  }


  async function removeImg(e) {
  let removeIndex
  let remainingImg = uploadImgArray.filter(async (img, index) => {
    if (img[0].name === e.target.id) {
      removeIndex = index
    }
  })
  if (removeIndex || removeIndex === 0) {
    uploadImgArray.splice(removeIndex, 1)
    await setUploadImgArry(uploadImgArray)
    document.getElementById(`uploadImg${e.target.id}`).remove()
  } else {
    return
  }

}

async function preview_image(event, type) {
  if (type === 'packagePhoto') {
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
  } else if (type === 'handOverPhoto') {
    for (let i = 0; i < event.target.files.length; i++) {
      let reader = new FileReader();
      let outer_perview_div_h = document.getElementById('uploadHandoverPhotoPreview')
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
      outer_perview_div_h.append(inside_perview_div)
      reader.onload = function () {
        output.src = reader.result;
      }
      reader.readAsDataURL(event.target.files[i]);
    }
  }
}


async function updateCouier() {
  let modal = document.getElementById("myModal");
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
    let selectedCourier = courierData.uuid
    // let detailsFiles = file.fileDetails
    delete file.fileDetails
    let payload = {
      file: file,
      courierID: selectedCourier
    }

    if (!isHandoverDocket) {
      let fileDetails
      await Axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payload).then(async res => {
        if (res && res.data) {
          fileDetails = res.data;
          let uploadPackagePhotoIDs = courierData.uploadPackagePhotoIDs ? courierData.uploadPackagePhotoIDs : []
          await uploadPackagePhotoIDs.push(fileDetails.uuid);
          courierData.uploadPackagePhotoIDs = await uploadPackagePhotoIDs

          try {
            //  Save File on S3
            const opts = {
              headers: {
                name: 'Content-Type',
                value: 'multipart/form-data',
              }
            };
            const fileUpload = await Axios.put(fileDetails.signedURL, fileDetailArry[index], opts);
          } catch (e) {
            console.error(e);
          }
        }
      });

    }
    if (isHandoverDocket) {
      let fileDetails
      await Axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payload).then(async res => {
        if (res && res.data) {
          fileDetails = res.data;

          let uploadHandoverPhotoIDs = courierData.uploadHandoverPhotoIDs ? courierData.uploadHandoverPhotoIDs : []
          await uploadHandoverPhotoIDs.push(fileDetails.uuid);
          courierData.uploadHandoverPhotoIDs = await uploadHandoverPhotoIDs

          try {
            //  Save File on S3
            const opts = {
              headers: {
                name: 'Content-Type',
                value: 'multipart/form-data'
              }
            };

            const fileUpload = await Axios.put(fileDetails.signedURL, fileDetailArry[index], opts);
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  })).then(async () => {
    let selectedCourier = courierData.uuid
    delete courierData.caseID
    delete courierData.departmentDisplayName
    delete courierData.handOverToUserName
    delete courierData.receivedFormatedDate
    delete courierData.uuid;
    delete courierData.updatedAt;
    delete courierData.updatedBy;
    delete courierData._id;
    delete courierData.createdBy;
    delete courierData.createdAt;
    delete courierData.deletedAt;
    delete courierData.__v;
    delete courierData.version;
    delete courierData.uploadPackagePhotoSrc;
    delete courierData.uploadHandoverPhotoSrc;

    let responseCreateCourier = await axios.put(`${CONSTANTS.API_URL}/api/v1/updateCourier/${selectedCourier}`, courierData);
    if (responseCreateCourier.status === 200) {
      let courierResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/courier`);
      const tableDataList = await getRowsListForCurier(courierResponse.data);
      await setCourierDataSet(tableDataList);
      let importantCourierData = await getRowsListForCurier(tableDataList.rows.filter((courier) => courier.isImportant === true))
      await setImportantCourierDataSet(importantCourierData)
      modal.style.display = "none";
      setIsHandoverDocket(false);
      setIsEditDocket(false);
      setAddDocket(!isAddDocket);
      setCourierImgDelete(false)
      setUploadImgArry([])

      await setCourierData({
        departmentID: '',
        receivedDate: null,
        receivedFrom: '',
        courierDescription: '',
        typeOfCourier: '',
        whomTo: '',
        isImportant: false,
        departmentID: '',
        handOverTo: '',
        timeOfHandOver: '',
        remarks: '',
        uploadHandoverPhotoIDs: [],
        uploadPackagePhotoIDs: []
      })
    }
  }).catch((err) => {
    console.log(err)
  })
}


async function saveCourier(e){
  e.preventDefault();
  setAreAllRequiredFieldsEntered(!areAllRequiredFieldsEntered);
  if(!courierData.receivedFrom && !courierData.typeOfCourier){
    document.getElementById('receivedFromError').style['display'] = 'block'
    document.getElementById('typeOfCourierError').style['display'] = 'block'
  } else if(!courierData.receivedFrom){
    document.getElementById('receivedFromError').style['display'] = 'block'
  } else if(!courierData.typeOfCourier){
    document.getElementById('typeOfCourierError').style['display'] = 'block'
  } else {

    let modal = document.getElementById("myModal");
    let courierModal = document.getElementById('courierModal')
    let responseCreateCourier = await axios.post(`${CONSTANTS.API_URL}/api/v1/courier`, courierData);
    console.log("responseCreateCourierresponseCreateCourier",responseCreateCourier);
    if (responseCreateCourier.data.messageResponses) {
      await Promise.all(responseCreateCourier.data.messageResponses.map(async (messageObj) => {
        if (messageObj.sendTo) {
          let messageNotification = await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, messageObj);
          if (messageNotification.status === 200) {
            // props.triggerNotifications(true)
          }
          if (messageObj.group === "message") {
            toastr.success(messageObj.message);
          } else {
            toastr.info(messageObj.message);
          }
        } else {
          if (messageObj.group === "message") {
            toastr.success(messageObj.message);
          } else {
            toastr.info(messageObj.message);
          }
        }
      }))
    }
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
      let selectedCourier = courierData.uuid
      delete file.fileDetails
      let payload = {
        file: file,
        courierID: responseCreateCourier.data.Courier.uuid
      }

      let fileDetails
      await Axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payload).then(async res => {
        if (res && res.data) {
          fileDetails = res.data;
          let uploadPackagePhotoIDs = courierData.uploadPackagePhotoIDs ? courierData.uploadPackagePhotoIDs : []
          await uploadPackagePhotoIDs.push(fileDetails.uuid);
          courierData.uploadPackagePhotoIDs = await uploadPackagePhotoIDs

          try {
            //  Save File on S3
            const opts = {
              headers: {
                name: 'Content-Type',
                value: 'multipart/form-data',
              }
            };
            const fileUpload = await Axios.put(fileDetails.signedURL, fileDetailArry[index], opts);
          } catch (e) {
            console.error(e);
          }
        }
      });
    })).then(async () => {
      delete courierData.caseID
      delete courierData.departmentDisplayName
      delete courierData.handOverToUserName
      delete courierData.receivedFormatedDate
      delete courierData.uuid;
      delete courierData.updatedAt;
      delete courierData.updatedBy;
      delete courierData._id;
      delete courierData.createdBy;
      delete courierData.createdAt;
      delete courierData.deletedAt;
      delete courierData.__v;
      delete courierData.version;
      delete courierData.uploadPackagePhotoSrc;
      delete courierData.uploadHandoverPhotoSrc;
      /*
        Modification: Corrected the key to key flow after responseCreateCourier in below api call
        By: Devang
        Date: 27/05/2022
      */
      await axios.put(`${CONSTANTS.API_URL}/api/v1/updateCourier/${responseCreateCourier.data.Courier.uuid}`, courierData);
    }).catch((err) => {
      console.log(err)
    })

    if (responseCreateCourier.status === 200) {
      modal.style.display = "none";
      await setCourierData({
        departmentID: '',
        receivedDate: null,
        receivedFrom: '',
        courierDescription: '',
        typeOfCourier: '',
        whomTo: '',
        isImportant: false,
        handOverTo: '',
        timeOfHandOver: '',
        remarks: '',
        uploadPackagePhotoIDs: [],
        uploadHandoverPhotoIDs: [],
      })
    }

  }
}

    function toggleDocketPopupVisibility(type, action, data) {
      console.log('88888888888888888888888888888888');
     setAddDocket(!isAddDocket);
    if (type === 'edit' || type === 'handover') {
       setCourierActionButton("Update")
    } else {
       setCourierActionButton("Save")
    }
    setAddDocket(!isAddDocket);
    if (type === 'edit' || type === 'handover') {
       setCourierActionButton("Update")
    } else {
       setCourierActionButton("Save")
    }
    let modal = document.getElementById("myModal");
    if (!isAddDocket) {

      modal.style.display = "block";
      if (type === 'edit') {
        setCourierData(data)
        setIsEditDocket(true);
        setIsHandoverDocket(false);
      } else if (type === 'handover') {
        setCourierData(data)
        setIsEditDocket(false);
        setIsHandoverDocket(true);
      } else {
        setIsHandoverDocket(false);
        setIsEditDocket(false);
      }
    }  else {
      modal.style.display = "none";

      setCourierData({})
      setCourierImgDelete(false)
      setUploadImgArry([])
    }
  }

  async function uploadPackageImage(e, type) {
    uploadImgArray.push(e.target.files);
    await setUploadImgArry(uploadImgArray)
    await preview_image(e, type)
  }

  async function getCouirerDetailsData(data) {
    await setCourierData({
      departmentID: '',
      receivedDate: null,
      receivedFrom: '',
      courierDescription: '',
      typeOfCourier: '',
      whomTo: '',
      isImportant: false,
      departmentID: '',
      handOverTo: '',
      timeOfHandOver: '',
      remarks: '',
    })
    await toggleDocketPopupVisibility('edit', 'else', data)
  }
  async function saveAllRequiredFilled(id) {
    requiredFields.push(id);
    setRequiredFields(requiredFields);
    if (requiredFields.length === 2) {
      setAreAllRequiredFieldsEntered(true);
    }
  }
  return (
    <div class={`profilemodalslide ${props.open ? "display-block": "display-none"}`} >
        <div class="profile-modal-container" >
          <div class="profile-modal">
          <div class="profile-content-container">
            <div class='orgChartModal'>
              <div id="myModal" class="org-chart-modal">
                <div class="org-chart-modal-content org-chart-width" id='courierModal' style='height:90%; padding-top:10px !important'>
                {
                <div>



                  <div class="org-chart-modal-header p-t-5" style="height: 40px;">
                  <span class=""><span class="" style="font-size: 22px;">{courierData && courierData.caseID ? courierData.caseID : "New Courier"}</span></span>
                    <span class="org-chart-close" onClick={(e) => props.onClose(e)}>&times;</span>
                  </div>
                  <div class="org-chart-modal-body background-transparent" style="height: 78vh; overflow: auto; padding-top: 10px !important;">
                    <div class="row" >
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div class="row">
                          {/*<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                            <label class="modal-label">{courierData && courierData.caseID ? courierData.caseID : "New Courier"}</label>
                </div>*/}
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                            <img src="/assets/images/undraw_deliveries_131a.svg" class="wizard-imgs" alt="" />
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-t-5 display-flex justify-center flex-column">
                        <div class="p-b-10" >
                          <p class="fs-12 p-b-5">Received Date<sup class="star-mandatory-entry">*</sup></p>
                          <input type="date" id="receivedDate" disabled={isHandoverDocket} value={ courierData && courierData.receivedDate ? courierData.receivedDate : defaultCurrentDate} onChange={(e) => {
                            setCourierData({
                              ...courierData,
                              receivedDate: e.target.value
                            })
                            saveAllRequiredFilled(e.target.id)

                          }}  />
                        </div>
                        <div class="p-b-10" >
                          <p class="fs-12 p-b-5">Received From<sup class="star-mandatory-entry">*</sup></p>
                          <input type="text" id="receivedFrom" placeholder="Received From" disabled={isHandoverDocket} value={courierData && courierData.receivedFrom ? courierData.receivedFrom : ''} onChange={(e) => {
                            setCourierData({
                              ...courierData,
                              receivedFrom: e.target.value
                            })
                            saveAllRequiredFilled(e.target.id)
                          }}  />
                        </div>
                        <div class="p-b-10" >
                          <p class="fs-12 p-b-5">Description</p>
                          <div style='display: inline-flex;'>
                            <input type="radio" name="courierDescription" id="courierDescription" placeholder="Courier description" disabled={isHandoverDocket} checked={(courierData && courierData.courierDescription === "Envelop") ? true: false } value={courierData && courierData.courierDescription ? courierData.courierDescription : ''} onInput={(e) => {
                              setCourierData({
                                ...courierData,
                                courierDescription: "Envelop"
                              })
                              saveAllRequiredFilled(e.target.id)
                            }}/><label> Envelop</label>
                          </div>
                          <div style='display: inline-flex;'>
                            <input type="radio" name="courierDescription" id="courierDescription" placeholder="Courier description" disabled={isHandoverDocket} checked={(courierData && courierData.courierDescription === "Parcel") ? true: false } value={courierData && courierData.courierDescription ? courierData.courierDescription : ''} onChange={(e) => {
                              setCourierData({
                                ...courierData,
                                courierDescription: "Parcel"
                              })
                              saveAllRequiredFilled(e.target.id)
                            }}/><label> Parcel</label>
                          </div>
                          {/*<input type="text" id="courierDescription" placeholder="Courier description" disabled={isHandoverDocket} value={courierData && courierData.courierDescription ? courierData.courierDescription : ''} onChange={(e) => {
                            setCourierData({
                              ...courierData,
                              courierDescription: e.target.value
                            });
                          }} />*/}
                        </div>
                        <div class="p-b-10" >
                          <p class="fs-12 p-b-5">Type of Courier<sup class="star-mandatory-entry">*</sup></p>
                          <select type="text" id="typeOfCourier" value={courierData && courierData.typeOfCourier ? courierData.typeOfCourier : ''} disabled={(isHandoverDocket)} onChange={(e) => {
                            setCourierData({
                              ...courierData,
                              whomTo: '',
                              typeOfCourier: e.target.value
                            })
                            saveAllRequiredFilled(e.target.id)
                          }} >
                            <option selected={(!isHandoverDocket && !isEditDocket)} >Select Type of Courier</option>
                            <option value={'HMIL'}>{'HMIL'}</option>
                            <option value={'Director'}>{'Director'}</option>
                            {/*<option value={'Legal'}>{'Legal'}</option>*/}
                            <option value={'Company'}>{'Company'}</option>
                            {/* <option value={'Employee (Personal)'}>{'Employee (Personal)'}</option> */}
                          </select>
                        </div>
                        <div class="fw-600 fs-1rem p-b-10 display-flex" >
                          <p class="fs-12 p-b-5">Legal?</p>
                          <input type="checkbox" disabled={isHandoverDocket} checked={courierData &&courierData.isImportant} onChange={(e) => {
                            setCourierData({
                              ...courierData,
                              isImportant: e.target.checked
                            });
                          }} />
                        </div>
                        {
                          courierData && courierData.isImportant && (
                            <div>
                              {
                                !isCallClicked && (
                                  <p class="fs-12 p-b-5">Please call MD and check whether to accept the courier or not</p>
                                )
                              }
                              {
                                isCallClicked && (
                                  <p class="fs-12 p-b-5">Please select one of the below options as per MD's instructions</p>
                                )
                              }
                              <div class="fw-600 fs-1rem p-b-10 display-flex" >
                                {
                                  !isCallClicked && (
                                    <button onclick={(e) => setIsCallClicked(true)} class="fs-10 h-20 f-normal primary-button m-r-8">Call</button>
                                  )
                                }
                                {
                                  isCallClicked && (
                                    <div>
                                      <div class="display-flex">
                                        <input type="radio" name="acceptOrReject" id="acceptOrReject" placeholder="MD Accept / Reject" checked={(courierData && courierData.acceptOrReject === "accept") ? true: false } value={courierData && courierData.acceptOrReject ? courierData.acceptOrReject : ''} onInput={(e) => {
                                          setCourierData({
                                            ...courierData,
                                            acceptOrReject: "accept"
                                          });
                                        }}/><label> MD Accepted</label>
                                      </div>
                                      <div class="display-flex">
                                        <input type="radio" name="acceptOrReject" id="acceptOrReject" placeholder="MD Accept / Reject" checked={(courierData && courierData.acceptOrReject === "reject") ? true: false } value={courierData && courierData.acceptOrReject ? courierData.acceptOrReject : ''} onChange={(e) => {
                                          setCourierData({
                                            ...courierData,
                                            acceptOrReject: "reject"
                                          })
                                          setAreAllRequiredFieldsEntered(true);
                                        }}/><label> MD Rejected</label>
                                      </div>
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                          )
                        }
                        {
                          (courierData && courierData.isImportant && courierData.acceptOrReject === "reject") && (
                            <p class="fs-12 p-b-5 m-b-5">MD Rejected the courier. Click on Save.</p>
                          )
                        }
                        {courierData && ((courierData.acceptOrReject === "accept" && courierData.isImportant) || !courierData.isImportant) && (courierData.typeOfCourier === 'HMIL' && !courierData.isImportant) && (
                          <div class="p-b-10" >
                            <p class="fs-12 p-b-5">Whom To?</p>
                            <select type="text" value={courierData && courierData.whomTo ? courierData.whomTo: ''} id="whomTo" disabled={(isHandoverDocket)} onChange={(e) => {
                              setCourierData({
                                ...courierData,
                                whomTo: e.target.value
                              });
                            }}>
                              <option value="" selected={(!isHandoverDocket && !isEditDocket)}>To Whom</option>
                              <option value={'Ashish Kothari'} selected={(isHandoverDocket || isEditDocket)}>{'Ashish Kothari'}</option>
                              <option value={'Kiran Halijwale'}>{'Kiran Halijwale'}</option>
                              <option value={'Ajay Nagpure'}>{'Ajay Nagpure'}</option>
                              <option value={'Manjushree Raut'}>{'Manjushree Raut'}</option>
                              <option value={'Prajakta Rajderkar'}>{'Prajakta Rajderkar'}</option>
                              <option value={'Vrushali Thite'}>{'Vrushali Thite'}</option>
                            </select>
                          </div>
                        )}
                        {courierData && ((courierData.acceptOrReject === "accept" && courierData.isImportant) || !courierData.isImportant) && courierData.typeOfCourier === 'Legal' && (
                          <div class="p-b-10" >
                            <p class="fs-12 p-b-5">Whom To?</p>
                            <select type="text" value={courierData && courierData.whomTo ? courierData.whomTo: ''} id="whomTo" disabled={(isHandoverDocket)} onChange={(e) => {
                              setCourierData({
                                ...courierData,
                                whomTo: e.target.value
                              });
                            }}>
                              <option value="" selected={(!isHandoverDocket && !isEditDocket)}>To Whom</option>
                              <option value={'Ashish Kothari'} selected={(isHandoverDocket || isEditDocket)}>{'Ashish Kothari'}</option>
                              <option value={'Rajendra Kothari'}>{'Rajendra Kothari'}</option>
                              <option value={'Kiran Halijwale'}>{'Kiran Halijwale'}</option>
                              <option value={'Ajay Nagpure'}>{'Ajay Nagpure'}</option>
                            </select>
                          </div>
                        )}
                        {courierData && ((courierData.acceptOrReject === "accept" && courierData.isImportant) || !courierData.isImportant) && (courierData.typeOfCourier === 'Director' || courierData.isImportant) && (
                          <div class="p-b-10" >
                            <p class="fs-12 p-b-5">Whom To?</p>
                            <select type="text" value={courierData && courierData.whomTo ? courierData.whomTo: ''} id="whomTo" disabled={(isHandoverDocket)} onChange={(e) => {
                              setCourierData({
                                ...courierData,
                                whomTo: e.target.value
                              });
                            }}>
                              <option value="" selected={(!isHandoverDocket && !isEditDocket)}>To Whom</option>
                              <option value={'Ashish Kothari'} selected={(isHandoverDocket || isEditDocket)}>{'Ashish Kothari'}</option>
                              <option value={'Rajendra Kothari'}>{'Rajendra Kothari'}</option>
                            </select>
                          </div>
                        )}
                        {courierData && ((courierData.acceptOrReject === "accept" && courierData.isImportant) || !courierData.isImportant) && (courierData.typeOfCourier === 'Company' && !courierData.isImportant) && (
                          <div class="p-b-10" >
                            <p class="fs-12 p-b-5">Whom To?</p>
                            <select type="text" value={courierData && courierData.whomTo ? courierData.whomTo: ''} id="whomTo" disabled={(isHandoverDocket)} onChange={(e) => {
                              setCourierData({
                                ...courierData,
                                whomTo: e.target.value
                              });
                            }}>
                              <option value="" selected={(!isHandoverDocket && !isEditDocket)}>To Whom</option>
                              <option value={'Ajay Nagpure'} selected={(isHandoverDocket || isEditDocket)}>{'Ajay Nagpure'}</option>
                            </select>
                          </div>
                        )}
                        {/* {courierData.typeOfCourier === 'Employee (Personal)' && (
                          <div>
                            <div class="p-b-10" >
                              <select type="text" value={courierData && courierData.whomTo ? courierData.whomTo: ''} id="whomTo" disabled={(isHandoverDocket)} onChange={(e) => {
                                setCourierData({
                                  ...courierData,
                                  whomTo: e.target.value
                                });
                              }}>
                                <option value="" selected={(!isHandoverDocket && !isEditDocket)}>To Whom</option>
                                <option value={'Ashish Kothari'} selected={(isHandoverDocket || isEditDocket)}>{'Ashish Kothari'}</option>
                                <option value={'Kiran Halijwale'}>{'Kiran Halijwale'}</option>
                                <option value={'Ajay Nagpure'}>{'Ajay Nagpure'}</option>
                                <option value={'Manjushree Raut'}>{'Manjushree Raut'}</option>
                                <option value={'Prajakta Rajderkar'}>{'Prajakta Rajderkar'}</option>
                                <option value={'Vrushali Thite'}>{'Vrushali Thite'}</option>
                                <option value={'Yuvraj Pawar'}>{'Yuvraj Pawar'}</option>
                                <option value={'Dheeraj'}>{'Dheeraj'}</option>
                                <option value={'Shubham'}>{'Shubham'}</option>
                              </select>
                            </div>
                          </div>
                        )} */}
                        {
                          courierData && ((courierData.acceptOrReject === "accept" && courierData.isImportant) || !courierData.isImportant) && (
                            <div class="p-b-10" >
                              <p class="fs-12 p-b-5">Department</p>
                              <select class="first-letter-capital" id="departmentID" disabled={(isHandoverDocket)} value={courierData && courierData.departmentID ? courierData.departmentID: ''} onChange={(e) => {
                                setCourierData({
                                  ...courierData,
                                  departmentID: e.target.value
                                });
                              }}>
                                <option value="" selected={(!isHandoverDocket && !isEditDocket)}>Select Department</option>
                                {departmentList.map((dept) => (
                                  <option class="first-letter-capital" value={dept.uuid}>{dept.displayName.toLowerCase()}</option>
                                ))}
                              </select>
                            </div>
                          )
                        }
                        {
                          courierData && ((courierData.acceptOrReject === "accept" && courierData.isImportant) || !courierData.isImportant) && (
                            <div>
                              <div class="fw-600 fs-1rem p-b-10" >
                                <p class="fs-12 p-b-5">Upload Package photo</p>
                                <input type="file" disabled={isHandoverDocket} onChange={e => uploadPackageImage(e, 'packagePhoto')} />
                              </div>
                              <div class="fw-600 fs-1rem p-b-10 display-flex" id='uploadPackagePhotoPreview'>
                              </div>
                              {
                                courierData && courierData.uploadPackagePhotoSrc && courierData.uploadPackagePhotoSrc.length !== 0 ? <div class="fw-600 fs-1rem p-b-10 " >
                                  <div class="fw-600 fs-1rem p-b-10 display-flex flex-direction-row flex-wrap-wrap" >
                                    {
                                      courierData && courierData.uploadPackagePhotoSrc.map((packagePhotoSrc) => (
                                        <div className='courierImg'>
                                          <img id='uploadPackagePhotoSrc' src={packagePhotoSrc} className='w-80 h-80  m-all border-black ' />
                                          <span className={!isHandoverDocket ? "crossTip" : 'crossTipNone'} id={packagePhotoSrc} onClick={(e) => {
                                            if (!isHandoverDocket) {
                                              let uploadPackagePhotoID = e.target.id.split('/')[5]
                                              let remainingUploadPackagePhotoSrc = courierData.uploadPackagePhotoSrc.filter((packagePhotoSrc) => packagePhotoSrc !== e.target.id)
                                              let remainingUploadPackagePhotoIDs = courierData.uploadPackagePhotoIDs.filter((packagePhotoIDs) => packagePhotoIDs !== uploadPackagePhotoID)
                                              setCourierImgDelete(true)
                                              setCourierData({
                                                ...courierData,
                                                uploadPackagePhotoSrc: remainingUploadPackagePhotoSrc,
                                                uploadPackagePhotoIDs: remainingUploadPackagePhotoIDs
                                              })
                                            }
                                          }} >×</span>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                                  : ''
                              }
                            </div>
                          )
                        }

                        {
                          isHandoverDocket && (
                        <div>
                          <div class="fw-600 fs-1rem p-b-10" >
                            <label>Upload Hand Over photo</label>
                            <input type="file" disabled={!isHandoverDocket} onChange={async (e) => uploadPackageImage(e, "handOverPhoto")} />
                          </div>
                          <div class="fw-600 fs-1rem p-b-10 display-flex" id='uploadHandoverPhotoPreview'>

                          </div>
                          {
                            courierData && courierData.uploadHandoverPhotoSrc && courierData.uploadHandoverPhotoSrc.length !== 0 ? <div class="fw-600 fs-1rem p-b-10 min-h-80 min-w-100" >
                              <div class="fw-600 fs-1rem p-b-10 display-flex flex-direction-row flex-wrap-wrap" >
                                {
                                  courierData && courierData.uploadHandoverPhotoSrc.map((handoverPhotoSrc) => (
                                    <div className='courierImg'>
                                      <img id='uploadHandoverPhotoSrc' src={handoverPhotoSrc} className='w-80 h-80 m-all border-black ' />
                                      <span className={isHandoverDocket ? "crossTip" : 'crossTipNone'} id={handoverPhotoSrc} onClick={(e) => {
                                        if (isHandoverDocket) {
                                          let uploadHandoverPhotoID = e.target.id.split('/')[5]
                                          let remainingUploadHandoverPhotoSrc = courierData.uploadHandoverPhotoSrc.filter((handoverPhotoSrc) => handoverPhotoSrc !== e.target.id)
                                          let remainingUploadHandoverPhotoIDs = courierData.uploadHandoverPhotoIDs.filter((handoverPhotoIDs) => handoverPhotoIDs !== uploadHandoverPhotoID)
                                          setCourierImgDelete(true)
                                          setCourierData({
                                            ...courierData,
                                            uploadHandoverPhotoSrc: remainingUploadHandoverPhotoSrc,
                                            uploadHandoverPhotoIDs: remainingUploadHandoverPhotoIDs
                                          })
                                        }
                                      }}>×</span>
                                    </div>

                                  ))
                                }
                              </div>
                            </div> : ''
                          }

                        </div>
                          )
                        }
                        {
                          isHandoverDocket && (
                            <div class="p-b-10" >
                              <select type="text" id="orderSource" disabled={(!isHandoverDocket)} value={courierData && courierData.handOverTo ? courierData.handOverTo: ''} onChange={(e) => {
                                setCourierData({
                                  ...courierData,
                                  handOverTo: e.target.value
                                });
                              }}>
                                <option value="" selected={(!isHandoverDocket && !isEditDocket)}>Handed over to</option>
                                {allUserList.map((user) => (
                                  <option value={user.uuid}>{user.displayName}</option>
                                ))}
                              </select>
                            </div>
                          )
                        }
                       {
                         isHandoverDocket && (
                            <div class="p-b-10" >
                              <input type="time" id="timeOfHandOver" disabled={(!isHandoverDocket)} value={courierData.timeOfHandOver} onChange={(e) => {
                                setCourierData({
                                  ...courierData,
                                  timeOfHandOver: e.target.value
                                });
                              }} />
                            </div>
                         )
                       }

                       {courierActionButton === "Update" && (
                          <div class="p-b-10" >
                            <input type="text" id="name" placeholder="Remarks" disabled={(isHandoverDocket)} value={courierData.remarks} onChange={(e) => {
                              setCourierData({
                                ...courierData,
                                remarks: e.target.value
                              });
                            }} />
                          </div>
                        )}
                        {courierActionButton === "Update" && (
                          <div class="fw-600 fs-1rem p-b-10" >
                            <span class="w-full full-width-button" onClick={(e) => updateCouier()}>Update</span>
                          </div>
                        )}
                        {courierActionButton === "Save" && (
                          <div class="fw-600 fs-1rem p-b-10" >
                            <button disabled={!areAllRequiredFieldsEntered} class="fs-10 h-20 f-normal primary-button w-full" onClick={async (e) => {
                              saveCourier(e)
                            }}>Save</button>
                          </div>
                        )}

                      </div>
                    </div>
                    </div>
                  </div>
                 }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courierworkspacemodal;
