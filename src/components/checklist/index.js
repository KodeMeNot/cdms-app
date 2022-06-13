import { h } from 'preact';
import { useState, useEffect, useRef} from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { startLoader, stopLoader, formatDateTime, getFormattedAmount, applyAclForFeedAndChat } from '../../lib/utils';
import { getItem, setItem, removeAll } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import ChatComment from "../../components/chatComment";
import toastr from "toastr";
import Icons from '../../components/icons';
import moment from 'moment';
import imageCompression from 'browser-image-compression';

// modified by Vihang
// modified at 06/05/2022
// modification : selected and not selected checklist ui revamp, alignment changes and responsive changes

const ChecklistComponent = (props) => {
  const userInfo = getItem('userinfo');
  let [taskComment, setTaskComment] = useState([]);
  let [checkListTaskComment, setCheckListTaskComment] = useState([]);
  let [selectedChecklistItem, setSelectedChecklistItem] = useState({});
  let [selectedChecklistItemIndex, setSelectedChecklistItemIndex] = useState(null);
  let [isChecklistItemSelected, setIsChecklistItemSelected] = useState(false);
  let [editorImages, setEditorImages] = useState([]);
  let [notokayModelOpen,setNotokayModal] = useState(false);
  let [selectedNotokayItem,setSelectedNotokayItem] = useState('');
  let [uploadNotokayImgFileSet,setUploadNotokayImgFileSet] = useState([]);
  let [isPreviewModalOpen,setIsPreviewModalOpen] = useState(false);
  let [previewModalDataSet,setPreviewModalDataSet]=useState({});
  let [toasterChecklistTaskStatus, setToasterChecklistStatus] = useState(false);
  let [uploadedImages, setUploadedImages] = useState([]);
  let [uploadImgArray, setUploadImgArry] = useState([]);
  let [taskRemark, setTaskRemark] = useState(props.currentRow.taskRemark ? props.currentRow.taskRemark: "");
  let [isBothChecklistExists, setIsBothChecklistExists] = useState(false);
  let [isAttemptedChecklistExists, setIsAttemptedChecklistExists] = useState(false);
  let [isNotAttemptedChecklistExists, setIsNotAttemptedChecklistExists] = useState(false);
  let [checkListArrayList,setCheckListArrayList] = useState(false);
  let [isTaskCheckListCompleted,setIsTaskCheckListCompleted] = useState(false);
  let [taskStatus, setTaskStatus] = useState(props.currentRow.status ? props.currentRow.status: "");
  let [isCompleteDisable,setIsCompleteDisable] = useState(false);

  const imageTypeExtension = ['png', 'jpg', 'jpeg'];
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

  useEffect(() => {
    getTaskComments();
  },[]);

  useEffect(() => {
    console.log(props,'props.totalTaskCheckListItemsProgress');
    if (props.currentRow.taskRemark) {
      setTaskRemark(props.currentRow.taskRemark);
      console.log(props.currentRow.taskRemark,'props.currentRow.taskRemarkprops.currentRow.taskRemarkprops.currentRow.taskRemarkprops.currentRow.taskRemark');
    } else {
      setTaskRemark('');
    }
    /*
          modified by Vihang
          modified at 02/05/2022
          modification : hr tag is shown when both attempted and not attempted checklist exists
    */
    /*
          modified by Vihang
          modified at 10/05/2022
          modification : not attempted and attempted checklist separation fix
    */
    if(props.taskCheckListItems) {
        let isTaskCheckListCompleted = true;
        props.taskCheckListItems.map((item) => {
          if (!item.isOkSelected && !item.isNotOkSelected) {
            isTaskCheckListCompleted = false;
          }
        });
        setIsTaskCheckListCompleted(isTaskCheckListCompleted);
        const notAttemptedChecklistExists = (item) => (!item.isOkSelected && !item.isNotOkSelected)
        const attemptedChecklistExists = (item) =>  (item.isOkSelected || item.isNotOkSelected)
        isAttemptedChecklistExists =  props.taskCheckListItems.some(attemptedChecklistExists)
        setIsAttemptedChecklistExists(isAttemptedChecklistExists)
        isNotAttemptedChecklistExists = props.taskCheckListItems.some(notAttemptedChecklistExists);
        setIsNotAttemptedChecklistExists(isNotAttemptedChecklistExists)
    }
  },[props.taskCheckListItems]);



  // modified by Vihang
  // modified at 09/05/2022
  // modification : refreshed the selected checklist page after selected checklist is attempted

  useEffect(() => {
    if(isChecklistItemSelected) {
      // setSelected("e",props.taskCheckListItems[selectedChecklistItemIndex],selectedChecklistItemIndex,props.taskCheckListItems)
      props.setChecklistItemSelected(true)
      props.taskCheckListItems ? setCheckListArrayList(props.taskCheckListItems) : null
      setSelectedChecklistItem(props.taskCheckListItems[selectedChecklistItemIndex]);
      axios.get(`${CONSTANTS.API_URL}/api/v1/comment?checklistItemID=${props.taskCheckListItems[selectedChecklistItemIndex].uuid}`)
        .then((res) => {
          setCheckListTaskComment(res.data);
        });
      setSelectedChecklistItemIndex(selectedChecklistItemIndex);
      setIsChecklistItemSelected(true);
    }
  },[props.taskCheckListItems]);


  useEffect(() => {
     if(isChecklistItemSelected) {
        setIsChecklistItemSelected(false)
     }
  },[props.currentRow.uuid]);

  function getTaskComments() {
    if (props.currentRow.uuid) {

    axios.get(`${CONSTANTS.API_URL}/api/v1/comment?taskID=${props.currentRow.uuid}`)
    .then((res) => {
      setTaskComment(res.data);
    })
  }
  }
  function viewAllImages(e,id, index) {
    // modified by Vihang
    // modified at 16/05/2022
    // modification : remove rotate and flip options from image viewer

    let options = {
      rotatable:false,
      scalable:false
    }
    const gallery = new Viewer(document.getElementById(`image-${index}-${id}`), options);
    gallery.show();
  }
  function toggleNotokayModal(itemID){
    if (!notokayModelOpen){
      selectedNotokayItem = itemID;
    } else {
      setUploadNotokayImgFileSet([]);
      selectedNotokayItem='';
      document.getElementById("preview123").innerHTML = '';
      document.getElementById("uploadNotokayInput").value = null;
    }

    setNotokayModal(!notokayModelOpen);
    setSelectedNotokayItem(selectedNotokayItem);
    console.log(selectedNotokayItem,"++++++++++++++");

  }


  async function ChecklistNotOkay(e, task, itemID) {
    let elem = document.getElementById(task);
    let button = document.getElementById(`${task}-notokay`);
    let button1 = document.getElementById(`${task}-okay`);

    if (elem.style.textDecorationColor !== 'red') {
      let payload = {};
      // if (props.totalTaskCheckListItemsProgress && props.totalTaskCheckListItemsProgress == 100) {
      //   payload['status']= 'completed';
      // }
      // axios.put(`${CONSTANTS.API_URL}/api/v1/checklist/${itemID}/notOk`, payload).then(async(res)=> {
      //   if(res.data.isRepairRequestTask) {
      //     let notificationObj = {
      //       typeOfNotification : "push",
      //       message : "Request Repair Task Created",
      //       taskID : props.currentRow.taskID,
      //       group : "task",
      //       isSent : true,
      //       isRead : false,
      //       sendTo : res.data.assignedUserID
      //     };
      //     let repairRequestTaskNotification= await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, notificationObj);
      //     await toastr.success('Request Repair Task Created and assigned to ' + res.data.assignedUser);
      //     if(repairRequestTaskNotification.status === 200) {
      //       props.setNewNotification(true)
      //     }
      //
      //     setTimeout(() => {
      //       setToasterChecklistStatus(false);
      //     }, 2000);
      //    }
      // });
      elem.classList.add("checkListNotOkText");
      elem.classList.remove("checkListOkText");
      button.classList.add("checkListNotOkButton");
      button1.classList.remove("checkListOkButton");
      toggleNotokayModal(itemID);
    } else {
    }
    await props.triggerNotifications(true);
  }
  async function removeImg(e) {
    let removeIndex;
    let remainingImg = uploadImgArray.filter(async (img, index) => {
      if (img[0].name === e.target.id) {
        removeIndex = index;
      }
    });
    if (removeIndex || removeIndex === 0) {
      uploadImgArray.splice(removeIndex, 1);
      await setUploadImgArry(uploadImgArray);
      document.getElementById(`uploadImg${e.target.id}`).remove();
    } else {
      return;
    }
  }
  async function ChecklistOkay(e, task, itemID) {
    console.log("ok selected");
    let elem = document.getElementById(task);
    let button = document.getElementById(`${task}-okay`);
    let button1 = document.getElementById(`${task}-notokay`);

    if (elem.style.textDecorationColor !== 'green') {
      let payload = {};
      // if (props.totalTaskCheckListItemsProgress && props.totalTaskCheckListItemsProgress == 100) {
      //   payload['status']= 'completed';
      // }
      await axios.put(`${CONSTANTS.API_URL}/api/v1/checklist/${itemID}/ok`, payload).then(async(res)=> {
        if (res.data.isRepairRequestTask) {
          await toastr.success('Request Repair Task Created and assigned to ' + res.data.assignedUser);
        } else if (props.totalTaskCheckListItemsProgress && props.totalTaskCheckListItemsProgress == 100) {
          await toastr.success('Task ' + props.currentRow.displayName + ' completed. You can check the same in Done section');
        }
        // if(res.data) {
        //  let notificationObj = {
        //    typeOfNotification : "push",
        //    message : "Request Repair Task Created",
        //    taskID : "2c627954-8759-4569-90aa-44988d047c60",
        //    group : "task",
        //    isSent : true,
        //    isRead : false,
        //    sendTo : "ec4c56dd-dced-46bc-b4c2-e575271a4a11"
        //  };
        //  let repairRequestTaskNotification= await axios.post(`${CONSTANTS.API_URL}/api/v1/notification`, notificationObj);
        //  if(repairRequestTaskNotification.status == 200) {
        //     props.setNewNotification(true)
        //  }
        //
        //  toastr.success('Request Repair Task Created');
        //  setTimeout(() => {
        //    setToasterChecklistStatus(false);
        //  }, 2000);
        // }
      });

      elem.classList.add("checkListOkText");
      elem.classList.remove("checkListNotOkText");
      button.classList.add("checkListOkButton");
      button1.classList.remove("checkListNotOkButton");

    } else {
      console.log("ekseeeeee");
    }
    await props.triggerNotifications(true);

  }
  function setSelected(e, item, index, checklistArray) {
    props.setChecklistItemSelected(true)
    checklistArray ? setCheckListArrayList(checklistArray) : null
    setSelectedChecklistItem(item);
    axios.get(`${CONSTANTS.API_URL}/api/v1/comment?checklistItemID=${item.uuid}`)
      .then((res) => {
        setCheckListTaskComment(res.data);
      });
    setSelectedChecklistItemIndex(index);
    setIsChecklistItemSelected(true);
  }

  async function goBackToList () {
    console.log("go back");
    await setIsChecklistItemSelected(!isChecklistItemSelected);
    await setSelectedChecklistItem({});
    await setSelectedChecklistItemIndex(null);
    if (props.currentRow.uuid) {
      await axios.get(`${CONSTANTS.API_URL}/api/v1/comment?taskID=${props.currentRow.uuid}`)
        .then(async (res) => {
          console.log(res.data);
          await setTaskComment(res.data);
          await props.triggerNotifications(true);
        });
    }
    await props.setChecklistItemSelected(false);
  }


  function handleNotokayImg(e){
    uploadNotokayImgFileSet.push(e.target.files);
    setUploadNotokayImgFileSet(uploadNotokayImgFileSet);
    preview_image(e,'checklistItem','123');
  }
  async function preview_image(event,type,itemID) {
    // if (type === 'packagePhoto') {
    for (let i = 0; i < event.target.files.length; i++) {
      let reader = new FileReader();
      let outer_perview_div;
      if (type==='handOverPhoto') {
        outer_perview_div = document.getElementById('uploadHandoverPhotoPreview');
      } else if (type==='checklistItem'){
        outer_perview_div = document.getElementById(`preview${itemID}`);
      } else {
        outer_perview_div = document.getElementById('uploadPackagePhotoPreview');
      }
      let inside_perview_div = document.createElement('div');
      let crossTip_span = document.createElement('span');
      let output = document.createElement('img');
      inside_perview_div.setAttribute('class', 'courierImg');
      if (type==='checklistItem'){
        inside_perview_div.setAttribute('id', `checklistItem${event.target.files[i].name}`);
        crossTip_span.setAttribute('id', `${event.target.files[i].name}`);
      } else {
        inside_perview_div.setAttribute('id', `uploadImg${event.target.files[i].name}`);
        crossTip_span.setAttribute('id', `${event.target.files[i].name}`);
      }
      crossTip_span.setAttribute('class', 'crossTip');
      crossTip_span.innerHTML = '×';
      crossTip_span.addEventListener('click', async (e) => removeImg(e,type));
      output.setAttribute('class', 'w-80 h-80  m-all border-black  min-h-80 min-w-100');
      inside_perview_div.append(output);
      inside_perview_div.append(crossTip_span);
      outer_perview_div.append(inside_perview_div);
      reader.onload = function () {
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[i]);
    }
    // }
  }
  function handleNotokayBtn(){
    let fileArr = [];
    let fileDetailArry = [];
    let fileIds = [];
    if (uploadNotokayImgFileSet.length !== 0) {
      for (let i = 0; i < uploadNotokayImgFileSet.length; i++) {
        let files = uploadNotokayImgFileSet[i][0];
        if (!files) return;
        const fileName = files.name;
        const extension = fileName.split('.').pop();
        if (imageTypeExtension.includes(extension.toLowerCase())) {
          const fileObj = {
            name: files.name,
            size: files.size,
            type: files.type,
            value: files.name
          };
          fileArr.push(fileObj);
          fileDetailArry.push(files);
        } else {
          alert('Looks like the file you tried to upload did not match the system. Kindly upload only a .png, .jpg, .jpeg file');
          return;
        }
      }
    }

    Promise.all(fileArr.map(async (file, index) => {
      // let detailsFiles = file.fileDetails
      delete file.fileDetails;
      let payload = {
        file,
        courierID: selectedNotokayItem
      };

      // if (!isHandoverDocket) {
      let fileDetails;
      await axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payload).then(async res => {
        if (res && res.data) {
          fileDetails = res.data;
          fileIds.push(fileDetails.uuid);
          try {
            //  Save File on S3
            const opts = {
              headers: {
                name: 'Content-Type',
                value: 'multipart/form-data'
              }
            };
            const fileUpload = await axios.put(fileDetails.signedURL, fileDetailArry[index], opts);
            // console.log(fileUpload);
          } catch (e) {
            console.error(e);
          }
        }
      });

      // }
    })).then(async () => {
      let payload = {
        fileIDs:fileIds
      };
      console.log(fileIds,"fileidsss");
      if (props.totalTaskCheckListItemsProgress && props.totalTaskCheckListItemsProgress == 100) {
        payload['status']= 'completed';
      }
      console.log(selectedNotokayItem,"selectedNotokayItemselectedNotokayItem");
      await axios.put(`${CONSTANTS.API_URL}/api/v1/checklist/${selectedNotokayItem}/notOk`, payload).then(async (res)=> {
        if (res.data.isRepairRequestTask) {
          await toastr.success('Request Repair Task Created and assigned to ' + res.data.assignedUser);
        } else if (props.totalTaskCheckListItemsProgress && props.totalTaskCheckListItemsProgress == 100) {
          await toastr.success('Task ' + currentRow.displayName + ' completed. You can check the same in Done section');
        }
        setNotokayModal(false);
        setSelectedNotokayItem('');
        setUploadNotokayImgFileSet([]);
        document.getElementById("preview123").innerHTML = '';
        document.getElementById("uploadNotokayInput").value = null;

        // modified by Vihang
        // modified at 02/05/2022
        // modification : get checklist items functions after not okay is clicked

        await props.getTaskCheckList();
      });
      // modified by Vihang
      // modified at 29/04/2022
      // modification : get api call for checklist item comments to refresh the comments after not okay image upload

      await getTaskComments();
      if (selectedChecklistItem && selectedChecklistItem.uuid) {
        await axios.get(`${CONSTANTS.API_URL}/api/v1/comment?checklistItemID=${selectedChecklistItem.uuid}`)
          .then(async (res) => {
            await setCheckListTaskComment(res.data);
          }).catch((err) => {
            console.log(err);
          });
      }

    }).catch((err) => {
      console.log(err);
    });

  }
  function togglePreviewModal(e,itemID){
    setIsPreviewModalOpen(!isPreviewModalOpen);
    if (itemID){
      previewModalDataSet = props.taskCheckListItems.find((item)=> item.uuid === itemID);
      setPreviewModalDataSet(previewModalDataSet);
    } else {
      setPreviewModalDataSet({});
    }
  }
  function getTaskComment(comment, index) {
    console.log('aaaaaaaaaaaa');
    let id = 'comment-'+index;
    console.log(id,'WWWWWWWWWWWWW');
    setTimeout(() => {
      let a = document.getElementById(id);
      console.log(a,'AAAA');
      if (a) {
        a.innerHTML = comment;
      }
    },0);

  }
  async function handleEditorComment(comment,img) {
    let fileArr = [];
    let fileDetailArry = [];
    let fileIds = [];
    if (img.length !== 0) {
      for (let i = 0; i < img.length; i++) {
        let files = img[i][0];
        if (!files) return;
        const fileName = files.name;
        const extension = fileName.split('.').pop();
        if (imageTypeExtension.includes(extension.toLowerCase())) {
          const fileObj = {
            name: files.name,
            size: files.size,
            type: files.type,
            value: files.name
          };
          fileArr.push(fileObj);
          fileDetailArry.push(files);
        } else {
          alert('Looks like the file you tried to upload did not match the system. Kindly upload only a .png, .jpg, .jpeg file');
          return;
        }
      }
    }

    let payloadImg = {};
    let fileDetails;
    Promise.all(fileArr.map(async (src, index) => {
      payloadImg = { file :src};
      await axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payloadImg).then(async res => {
        if (res && res.data) {
          fileDetails = res.data;
          fileIds.push(fileDetails.uuid);
          try {
            //  Save File on S3
            const opts = {
              headers: {
                name: 'Content-Type',
                value: 'multipart/form-data'
              }
            };
            const fileUpload = await axios.put(fileDetails.signedURL, fileDetailArry[index], opts);
          } catch (e) {
            console.error(e);
          }
        }
      });

    })).then(async () => {
      if (fileArr.length) {
        let imagePayload = {
          comment: "Uploaded image",
          typeOfComment: 'message',
          taskID: props.currentRow ? props.currentRow.uuid : '',
          commentByID: userInfo ? userInfo.uuid : '',
          commentByName: userInfo ? userInfo.displayName : '',
          fileIDs:fileIds
        };
        await axios.post(`${CONSTANTS.API_URL}/api/v1/comment`, imagePayload)
          .then((res) => {
            getTaskComments();
          });
      } else  {
        getTaskComments();
      }

    }).catch((err) => {
      console.log(err);
    });

    if (comment) {
      let commentPayload = {
        comment,
        typeOfComment: 'message',
        taskID: props.currentRow ? props.currentRow.uuid : '',
        commentByID: userInfo ? userInfo.uuid : '',
        commentByName: userInfo ? userInfo.displayName : ''

      };
      await axios.post(`${CONSTANTS.API_URL}/api/v1/comment`, commentPayload)
        .then(async (res) => {
          console.log(res);
          if (props.currentRow.uuid) {
            await axios.get(`${CONSTANTS.API_URL}/api/v1/comment?taskID=${props.currentRow.uuid}`)
              .then((res) => {
                console.log(res.data);
                 setTaskComment(res.data);
              });
          }

        });
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
  async function getCompressedImageFileEditor(fileToBeUploaded) {
    let imageFileToBeCompressed = fileToBeUploaded;
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 900
    };
    let compressedFile = await imageCompression(imageFileToBeCompressed, options);
    let fileData = '';
    let fileObj = {};
    if (fileToBeUploaded.size > 30000) {
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
  async function handleEditorComment1(comment,img) {
    console.log("comment",img);
    let fileArr = [];
    let fileDetailArry = [];
    let fileIds = [];
    if (img.length !== 0) {
      for (let i = 0; i < img.length; i++) {
        let files = img[i][0];
        if (!files) return;
        const fileName = files.name;
        const extension = fileName.split('.').pop();
        if (imageTypeExtension.includes(extension.toLowerCase())) {
          const fileObj = {
            name: files.name,
            size: files.size,
            type: files.type,
            value: files.name
          };
          fileArr.push(fileObj);
          fileDetailArry.push(files);
        } else {
          alert('Looks like the file you tried to upload did not match the system. Kindly upload only a .png, .jpg, .jpeg file');
          return;
        }
      }
    }

    let payloadImg = {};
    let fileDetails;
    Promise.all(fileArr.map(async (src, index) => {
      payloadImg = { file :src,
      courierID: selectedChecklistItem.uuid};
      await axios.post(`${CONSTANTS.API_URL}/api/v1/file/getSignedUrl`, payloadImg).then(async res => {
        if (res && res.data) {
          fileDetails = res.data;
          fileIds.push(fileDetails.uuid);
          try {
            //  Save File on S3
            const opts = {
              headers: {
                name: 'Content-Type',
                value: 'multipart/form-data'
              }
            };
            let fileData = await getCompressedImageFileEditor(fileDetailArry[index]);
            const fileUpload = await axios.put(fileDetails.signedURL, fileData, opts);
          } catch (e) {
            console.error(e);
          }
        }
      });

    })).then(async () => {
      if (img.length) {
        let imagePayload = {
          comment: "Uploaded image",
          typeOfComment: 'message',
          checklistItemID: selectedChecklistItem ? selectedChecklistItem.uuid : '',
          commentByID: userInfo ? userInfo.uuid : '',
          commentByName: userInfo ? userInfo.displayName : '',
          fileIDs:fileIds
        };
        await axios.post(`${CONSTANTS.API_URL}/api/v1/comment`, imagePayload)
          .then(async (res) => {
            console.log(res,"ressssssssssssssssssssss");
            await axios.get(`${CONSTANTS.API_URL}/api/v1/comment?checklistItemID=${selectedChecklistItem.uuid}`)
              .then(async (res) => {
                console.log(res.data,'111111111111');
                await setCheckListTaskComment(res.data);
              });
          });
      } else {
        await axios.get(`${CONSTANTS.API_URL}/api/v1/comment?checklistItemID=${selectedChecklistItem.uuid}`)
          .then(async (res) => {
            console.log(res.data,'111111111111');
            await setCheckListTaskComment(res.data);
          });
      }

    }).catch((err) => {
      console.log(err);
    });

    if (comment) {
      let payloadComment = {
        comment,
        typeOfComment: 'message',
        checklistItemID: selectedChecklistItem ? selectedChecklistItem.uuid : '',
        commentByID: userInfo ? userInfo.uuid : '',
        commentByName: userInfo ? userInfo.displayName : ''

      };
      await axios.post(`${CONSTANTS.API_URL}/api/v1/comment`, payloadComment)
        .then((res) => {
          console.log(res);
          axios.get(`${CONSTANTS.API_URL}/api/v1/comment?checklistItemID=${selectedChecklistItem.uuid}`)
            .then((res) => {
              setCheckListTaskComment(res.data);
            });
        });
    }
  }
  async function udpateRemark(remark) {
    await axios.put(`${CONSTANTS.API_URL}/api/v1/updateTask/${props.currentRow.uuid}`, {taskRemark: remark}).then(async(res)=> {
      setTaskRemark(res.taskRemark);
      await props.triggerNotifications(true);
    });
  }
  async function setNextTask() {
    let nextTask = await getItem("nextRowID");
    props.setNextTask(nextTask);
  }

  async function completeTask() {
    setIsCompleteDisable(true)
    await axios.put(`${CONSTANTS.API_URL}/api/v1/task/${props.currentRow.uuid}/complete`).then(async(res)=> {
      // await props.triggerNotifications(true);
      await toastr.success('Task Completed');
      let nextTask = await getItem("nextRowID");
      props.setNextTask(nextTask);
      // setTimeout(() => {
      //   window.location.reload();
      // },1000)
      // await props.getTaskCheckList();
    });
  }

  // modified by Vihang
  // modified at 29/04/2022
  // modification : selected checklist detail view ui changes

  // modified by Vihang
  // modified at 17/05/2022
  // modification : fixed random touch issue by removing cursor-pointer class

  return (
    <div class="Overviewworkshop col-xs-12 col-sm-12 col-md-12 col-lg-12 p-b-0">
      <div class="row p-t-10 semi-detail-summary pos-relative">
        <div class="col-xs-12 p-l-0 p-r-0 display-flex m-b-10 align-center">
          {/*<span class="cursor-pointer goBackToChecklistButton" onClick={(e)=> isChecklistItemSelected ? goBackToList() : null}> {isChecklistItemSelected ? "Go Back To " : ""} Checklist Items</span>*/}
          {isChecklistItemSelected && (
            <span class="h-24px" onClick={(e)=> isChecklistItemSelected ? goBackToList() : null}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 20 4 12 12 4 13.425 5.4 7.825 11H20V13H7.825L13.425 18.6Z"/></svg>
            </span>
          )}
          {/* modified by Vihang
              modified at 12/05/2022
              modification : checklist name first letter capital */}

          <span class={`${isChecklistItemSelected ? "m-l-5" : ""} first-letter-capital cursor-pointer goBackToChecklistButton`}>{isChecklistItemSelected ? selectedChecklistItem.displayName : props.currentRow.displayName}</span>

          {/* <span class="m-l-5 answeredCount tasks-tags border-green"> { "Completed" + props.answeredCount + "/"  + props.taskCheckListItems.length } </span>*/}
          {/*  <button class=" primary-border-button m-l-13">Subscribe</button> */}
        </div>
        <div class="col-xs-12 p-l-0 p-r-0 checklist-detail-container">
          {/*
                modified by Vihang
                modified at 02/05/2022
                modification : not attempted and attempted checklist separation added
          */}
          {/*
                modified by Vihang
                modified at 10/05/2022
                modification : not attempted and attempted checklist separation fix
          */}
          {/*
                modified by Vihang
                modified at 17/05/2022
                modification : checklist sections vertical spacing fixed
          */}
          {!isChecklistItemSelected && (
            <div class="checklistCardsList">
              {isNotAttemptedChecklistExists && (
                <div class="m-b-10">
                <div class="display-flex align-center h-30px bg-408b8f61">
                  <span class="h-24px">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M14.104 18.333Q12.333 18.333 11.104 17.104Q9.875 15.875 9.875 14.104Q9.875 12.333 11.104 11.104Q12.333 9.875 14.104 9.875Q15.875 9.875 17.104 11.104Q18.333 12.333 18.333 14.104Q18.333 15.875 17.104 17.104Q15.875 18.333 14.104 18.333ZM15.438 16.188 16.021 15.604 14.417 14.021V11.604H13.604V14.333ZM4.25 17.5Q3.521 17.5 3.01 16.99Q2.5 16.479 2.5 15.75V4.25Q2.5 3.521 3.01 3.01Q3.521 2.5 4.25 2.5H7.625Q7.896 1.771 8.542 1.302Q9.188 0.833 10 0.833Q10.812 0.833 11.458 1.302Q12.104 1.771 12.375 2.5H15.75Q16.479 2.5 16.99 3.01Q17.5 3.521 17.5 4.25V9.208Q17.125 8.938 16.667 8.719Q16.208 8.5 15.75 8.354V4.25Q15.75 4.25 15.75 4.25Q15.75 4.25 15.75 4.25H14.188V6.771H5.812V4.25H4.25Q4.25 4.25 4.25 4.25Q4.25 4.25 4.25 4.25V15.75Q4.25 15.75 4.25 15.75Q4.25 15.75 4.25 15.75H8.354Q8.5 16.208 8.698 16.667Q8.896 17.125 9.167 17.5ZM10 4.25Q10.354 4.25 10.594 4.01Q10.833 3.771 10.833 3.417Q10.833 3.062 10.594 2.823Q10.354 2.583 10 2.583Q9.646 2.583 9.406 2.823Q9.167 3.062 9.167 3.417Q9.167 3.771 9.406 4.01Q9.646 4.25 10 4.25Z"/></svg>
                  </span>
                    <span class="fs-14 m-l-5 text-white">Items to be checked</span>
                </div>
                {props.taskCheckListItems && props.taskCheckListItems.length > 0 && !isChecklistItemSelected && (props.taskCheckListItems.map((item, index, array) => (
                  <div>
                    {(!item.isNotOkSelected && !item.isOkSelected) && (
                      <div title="Check details" onClick={(e) => setSelected(e, item, index, array)} class=" row m-t-10 cursor-pointer display-flex pos-relative">
                        <div class="checklist-card-container col-xs-12 col-sm-12 col-md-12 col-lg-12 p-10">
                          <div class="row">
                            <div class="wrapper">
                              <div class="badge display-flex">
                                <p>{index+1}</p>
                              </div>
                            </div>
                            {/*hidden for later ui corretions by Vihang*/}
                            {/* <div class="taskDetailContentIcon col-xs-1 sm-2 col-md-1 col-lg-1 display-flex" style="justify-content: flex-end;">
                            <div class="badge display-flex circle-card" >
                              <img src="../assets/images/warning (1).png" style="height: 20px;width: 20px;"></img>
                            </div>
                          </div> */}
                            <div class="taskDetailContent col-xs-11 sm-10 col-md-10 col-lg-9 ">
                              <label className={`checklist-container cursor-pointer ${item.isOkSelected ? "checkListOkText " : ""} ${item.isNotOkSelected ? "checkListNotOkText" : ""}`} id={`${index + 1}-${props.currentRow.displayName}`}>{item.displayName}</label>
                            </div>
                            <div class="taskdetailButtons col-xs-12 sm-12 col-md-1 col-lg-1 display-flex align-center" >
                              <button disabled={props.currentRow.status && props.currentRow.status.toLowerCase() === "completed" ? true: false} className={`notOkBtn fs-10 h-20 f-normal primary-button ${item.isNotOkSelected ? "checkListNotOkButton" : ""}`} id={`${index + 1}-${props.currentRow.displayName}-notokay`}
                                onClick={(e) => {
                                  ChecklistNotOkay(e, `${index + 1}-${props.currentRow.displayName}`, item.uuid);
                                  e.stopPropagation();
                                }}>
                              NOT OK
                              </button>
                              <button disabled={props.currentRow.status && props.currentRow.status.toLowerCase() === "completed" ? true: false} className={`okBtn fs-10 h-20 p-l-30 p-r-30 f-normal m-l-10 primary-button ${item.isOkSelected ? "checkListOkButton " : ""} `} id={`${index + 1}-${props.currentRow.displayName}-okay`}
                                onClick={(e) => {
                                  ChecklistOkay(e, `${index + 1}-${props.currentRow.displayName}`, item.uuid);
                                  e.stopPropagation();
                                }}>
                              OK
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )))}
              </div>
            )}
              <div>
              { isAttemptedChecklistExists && (
                <div class="display-flex align-center h-30px bg-408b8f61">
                  <span class="h-24px">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10 4.25Q10.354 4.25 10.594 4.01Q10.833 3.771 10.833 3.417Q10.833 3.062 10.594 2.823Q10.354 2.583 10 2.583Q9.646 2.583 9.406 2.823Q9.167 3.062 9.167 3.417Q9.167 3.771 9.406 4.01Q9.646 4.25 10 4.25ZM9.208 17.5H4.188Q3.5 17.5 3 17Q2.5 16.5 2.5 15.812V4.208Q2.5 3.521 3.01 3.01Q3.521 2.5 4.208 2.5H7.625Q7.896 1.771 8.542 1.302Q9.188 0.833 10 0.833Q10.812 0.833 11.448 1.302Q12.083 1.771 12.375 2.5H15.792Q16.479 2.5 16.99 3.01Q17.5 3.521 17.5 4.208V8.354H15.75V4.25Q15.75 4.25 15.75 4.25Q15.75 4.25 15.75 4.25H14.188V6.771H5.812V4.25H4.25Q4.25 4.25 4.25 4.25Q4.25 4.25 4.25 4.25V15.75Q4.25 15.75 4.25 15.75Q4.25 15.75 4.25 15.75H9.208ZM12.917 16.583 9.333 13 10.562 11.771 12.917 14.125 17.562 9.479 18.792 10.708Z"/></svg>
                  </span>
                    <span class="fs-14 m-l-5 text-white">Checked Items</span>
                </div>
                )}
                {props.taskCheckListItems && props.taskCheckListItems.length > 0 && !isChecklistItemSelected &&   (props.taskCheckListItems.map((item, index, array) => (
                  <div>
                    {( item.isNotOkSelected || item.isOkSelected) && (
                      <div title="Check details" onClick={(e) => setSelected(e, item, index, array)} class=" row m-t-10 cursor-pointer display-flex pos-relative">
                        <div class="checklist-card-container col-xs-12 col-sm-12 col-md-12 col-lg-12 p-10">
                          <div class="row">
                            <div class="wrapper">
                              <div class="badge display-flex">
                                <p>{index+1}</p>
                              </div>
                            </div>
                            {/*hidden for later ui corretions by Vihang*/}
                            {/* <div class="taskDetailContentIcon col-xs-1 sm-2 col-md-1 col-lg-1 display-flex" style="justify-content: flex-end;">
                          <div class="badge display-flex circle-card" >
                            <img src="../assets/images/warning (1).png" style="height: 20px;width: 20px;"></img>
                          </div>
                        </div> */}
                            <div class="taskDetailContent col-xs-11 sm-10 col-md-10 col-lg-9 ">
                              <label className={`checklist-container cursor-pointer ${item.isOkSelected ? "checkListOkText " : ""} ${item.isNotOkSelected ? "checkListNotOkText" : ""}`} id={`${index + 1}-${props.currentRow.displayName}`}>{item.displayName}</label>
                            </div>
                            <div class="taskdetailButtons col-xs-12 sm-12 col-md-1 col-lg-1 display-flex align-center" >
                              <button disabled={props.currentRow.status && props.currentRow.status.toLowerCase() === "completed" ? true: false} className={`notOkBtn fs-10 h-20 f-normal primary-button ${item.isNotOkSelected ? "checkListNotOkButton" : ""}`} id={`${index + 1}-${props.currentRow.displayName}-notokay`}
                                onClick={(e) => {
                                  ChecklistNotOkay(e, `${index + 1}-${props.currentRow.displayName}`, item.uuid);
                                  e.stopPropagation();
                                }}>
                            NOT OK
                              </button>
                              <button disabled={props.currentRow.status && props.currentRow.status.toLowerCase() === "completed" ? true: false} className={`okBtn fs-10 h-20 p-l-30 p-r-30 f-normal m-l-10 primary-button ${item.isOkSelected ? "checkListOkButton " : ""} `} id={`${index + 1}-${props.currentRow.displayName}-okay`}
                                onClick={(e) => {
                                  ChecklistOkay(e, `${index + 1}-${props.currentRow.displayName}`, item.uuid);
                                  e.stopPropagation();
                                }}>
                            OK
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )))}
              </div>
            </div>
          )}
          <div >
            {!isChecklistItemSelected && (
              <div  class="p-b-10">
                {/*<div class="row m-t-20">
                  <div class="col-xs-12 col-lg-12 display-flex p-l-0">
                    <label class="checklist-container p-l-0 m-b-3">Quality / Condition /Cleanliness </label>
                  </div>
                  <div class="col-xs-12 col-lg-6 display-flex p-l-0">
                    <textarea  rows='3' style='padding: 5px; height: auto;' defaultValue={props.currentRow.taskQualityDesc} onChange={(e) => {
                        props.setCurrentRow({
                        ...props.currentRow,
                        taskQualityDesc: e.target.value,
                        });
                    }} />
                  </div>
                </div>*/}
                {/*
                      modified by Vihang
                      modified at 05/05/2022
                      modification : Alignment and sizing of the button and remark field
                */}
                <div class="row p-t-10">
                  <div class="col-xs-12 col-lg-12 display-flex p-l-0">
                    <label class="checklist-container p-l-0 m-b-3">Remarks</label>
                  </div>
                  <div class="col-xs-12 col-lg-12 display-flex p-l-0">
                    <div class="row w-full">
                      <div class="col-xs-12 col-lg-6 p-l-0">
                        <textarea disabled={props.currentRow.status && props.currentRow.status.toLowerCase() === "completed" ? true: false} rows='3' style='padding: 5px; height: auto;' value={taskRemark} onBlur={(e) => {
                          setTaskRemark(e.target.value);
                          udpateRemark(e.target.value);
                        }} />
                      </div>
                      <div class="col-xs-12 col-lg-6 display-flex justify-flex-end align-center">
                      {/*
                          By: Vihang
                          On: 16 May 2022
                          Modification: make complete task disable when task is completed and there is any not attempted checklist,after completion enable it
                        */}
                        {/*
                            By: Vihang
                            On: 16 May 2022
                            Modification: action buttons for mobile view added
                          */}
                        <div class="m-r-auto align-self-baseline is-hide-Desktop">
                          <p class="fs-10">Actions</p>
                          <div class="display-flex align-center">
                            <button class="primary-button display-flex align-center min-w-fit-content" title='View History' onClick={(e) => TaskLogModalVisibility(e)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="20" width="20"><path d="M10.812 17.5Q9.375 17.5 8.052 16.969Q6.729 16.438 5.646 15.333L6.875 14.104Q7.688 14.896 8.74 15.323Q9.792 15.75 10.854 15.75Q13.25 15.75 14.917 14.073Q16.583 12.396 16.583 10Q16.583 7.604 14.917 5.927Q13.25 4.25 10.854 4.25Q8.479 4.25 6.812 5.906Q5.146 7.562 5.146 10.188L6.688 8.646L7.896 9.854L4.25 13.5L0.625 9.875L1.854 8.646L3.396 10.188Q3.396 8.562 3.979 7.156Q4.562 5.75 5.583 4.719Q6.604 3.688 7.958 3.094Q9.312 2.5 10.854 2.5Q12.396 2.5 13.75 3.094Q15.104 3.688 16.125 4.719Q17.146 5.75 17.74 7.104Q18.333 8.458 18.333 10Q18.333 11.521 17.729 12.885Q17.125 14.25 16.104 15.281Q15.083 16.312 13.719 16.906Q12.354 17.5 10.812 17.5ZM13.125 13.521 9.979 10.333V5.833H11.729V9.646L14.354 12.292Z"/></svg>
                            </button>
                            <button class="primary-button display-flex align-center m-l-5 min-w-fit-content" title='View Messages' onClick={(e) => TaskCommentsModalVisibility(e)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="20" width="20"><path d="M5 11.646H15V9.896H5ZM5 9.188H15V7.438H5ZM5 6.729H15V4.979H5ZM18.333 18.333 15 15H3.417Q2.688 15 2.177 14.49Q1.667 13.979 1.667 13.25V3.417Q1.667 2.688 2.177 2.177Q2.688 1.667 3.417 1.667H16.583Q17.312 1.667 17.823 2.177Q18.333 2.688 18.333 3.417ZM3.417 3.417V13.25Q3.417 13.25 3.417 13.25Q3.417 13.25 3.417 13.25H15.729L16.583 14.104V3.417Q16.583 3.417 16.583 3.417Q16.583 3.417 16.583 3.417H3.417Q3.417 3.417 3.417 3.417Q3.417 3.417 3.417 3.417ZM3.417 3.417V14.104V13.25Q3.417 13.25 3.417 13.25Q3.417 13.25 3.417 13.25V3.417Q3.417 3.417 3.417 3.417Q3.417 3.417 3.417 3.417Q3.417 3.417 3.417 3.417Q3.417 3.417 3.417 3.417Z"/></svg>                            </button>
                          </div>
                        </div>
                      {/*
                        isTaskCheckListCompleted && ( props.currentRow.status === 'Pending') && (*/}
                          <button class="primary-button m-l-10 first-letter-capital" disabled={ isTaskCheckListCompleted && props.currentRow.status === 'Pending' ? false : true} onClick={(e) => completeTask()}>Complete Task</button>
                        {/*)
                      }*/}
                       {
                         ( props.currentRow.status === 'Completed') && (
                           <button class="primary-button m-l-5" onClick={(e) => setNextTask()}>Go to next task</button>
                         )
                       }


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isChecklistItemSelected && (
            <div class="checklist-card-container  col-xs-12 col-sm-12 col-md-10 col-lg-12 pos-relative">
              {/* <div class="wrapper">
                    <div class="badge display-flex">
                    <p style='color:slategray'>{selectedChecklistItemIndex+1}</p>
                    </div>
                </div> */}
              <div class="wrapper">
                <div class="badge display-flex w-30px">
                  <p>{selectedChecklistItemIndex + 1}</p>
                </div>
              </div>
              <div class="row m-t-30">
                <div class="col-lg-12">
                  <div class="row m-t-15 border-bottom-lightgrey-thin p-b-15">
                    <div class="col-xs-12">
                      <p class="fs-12">Description</p>
                      <p class="taskDescription">{(selectedChecklistItem && selectedChecklistItem.description) ? selectedChecklistItem.description: "There's no description for this checklist Item"}</p>
                    </div>
                  </div>
                  <div class="row m-t-15">
                    <div class="col-xs-12">
                      <p class="fs-12">Item to Check</p>
                    </div>
                  </div>
                  <div class="row border-bottom-lightgrey-thin p-b-15">
                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 display-flex align-center">
                      <label className={`checklist-container p-l-0 ${selectedChecklistItem.isOkSelected ? "checkListOkText " : ""} ${selectedChecklistItem.isNotOkSelected ? "checkListNotOkText" : ""}`} id={`${selectedChecklistItemIndex + 1}-${props.currentRow.displayName}`}>{selectedChecklistItem.displayName}</label>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4 display-flex">
                      <div class="taskdetailButtons display-flex w-80" style='flex-direction:column;'>
                        <button disabled={props.currentRow.status && props.currentRow.status.toLowerCase() === "completed" ? true: false} className={`notOkBtn fs-10 h-20 f-normal primary-button ${selectedChecklistItem.isNotOkSelected ? "checkListNotOkButton" : ""}`} id={`${selectedChecklistItemIndex + 1}-${props.currentRow.displayName}-notokay`}
                          onClick={(e) => {
                            ChecklistNotOkay(e, `${selectedChecklistItemIndex + 1}-${props.currentRow.displayName}`, selectedChecklistItem.uuid);
                            e.stopPropagation();
                          }}>
                            NOT OK
                        </button>
                      </div>
                      <div class="taskdetailButtons display-flex m-l-5 w-80" style='flex-direction:column;'>
                        <button disabled={props.currentRow.status && props.currentRow.status.toLowerCase() === "completed" ? true: false} className={`okBtn fs-10 h-20 p-l-30 p-r-30 f-normal m-l-10 primary-button ${selectedChecklistItem.isOkSelected ? "checkListOkButton " : ""} `} id={`${selectedChecklistItemIndex + 1}-${props.currentRow.displayName}-okay`}
                          onClick={(e) => {
                            ChecklistOkay(e, `${selectedChecklistItemIndex + 1}-${props.currentRow.displayName}`, selectedChecklistItem.uuid);
                            e.stopPropagation();
                          }}>
                            OK
                        </button>
                      </div>
                    </div>
                  </div>
                  <span class={`checklistStatus is-hide-Desktop align-self-center m-l-5 answeredCount tasks-tags h-fit-content fs-10 p-t-b-4-l-r-8 ${ selectedChecklistItem.isOkSelected  || selectedChecklistItem.isNotOkSelected ?  "border-green": !selectedChecklistItem.isOkSelected && !selectedChecklistItem.isNotOkSelected ? "border-yellow": ""}`}> { selectedChecklistItem.isOkSelected  || selectedChecklistItem.isNotOkSelected ? "Completed" : !selectedChecklistItem.isOkSelected && !selectedChecklistItem.isNotOkSelected ? "Pending": ""  } </span>
                  {isChecklistItemSelected && (
                    <div class="row m-t-10 selectedChecklistNavigation display-flex align-center">
                      {/*<button disabled={selectedChecklistItemIndex === 0 ?  true : false} onClick={(e)=> setSelected(e, checkListArrayList[selectedChecklistItemIndex - 1], selectedChecklistItemIndex - 1)}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10 22 0 12 10 2 11.775 3.775 3.55 12 11.775 20.225Z"/></svg>
                        </button> */}
                      <button class="display-flex align-center justify-center" disabled={selectedChecklistItemIndex === 0 ?  true : false} onClick={(e)=> setSelected(e, checkListArrayList[selectedChecklistItemIndex - 1], selectedChecklistItemIndex - 1)} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10 22 0 12 10 2 11.775 3.775 3.55 12 11.775 20.225Z"/></svg>
                      </button>
                      <span class="m-l-10">{ (selectedChecklistItemIndex + 1) + "/" + checkListArrayList.length }</span>
                      <button class="m-l-10" disabled={checkListArrayList.length === selectedChecklistItemIndex + 1 ?  true : false} onClick={(e)=> checkListArrayList.length - 1 === selectedChecklistItemIndex ? null : setSelected(e, checkListArrayList[selectedChecklistItemIndex + 1], selectedChecklistItemIndex + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M8.025 22 6.25 20.225 14.475 12 6.25 3.775 8.025 2 18.025 12Z"/></svg>
                      </button>

                    </div>
                  )}
                  {/*<div class="row">
                      <div class="col-xs-12 display-flex justify-flex-end m-t-5">
                        <p><span class="cursor-pointer" onClick={(e)=> isChecklistItemSelected ? goBackToList() : null}> {isChecklistItemSelected ? "Go Back To " : ""} Checklist Items</span></p>
                      </div>
                    </div>*/}
                </div>
              </div>
              <div class="row checklist-chat-container">
                <div class="taskDetailContent col-xs-12 p-l-0 p-r-0 h-inherit">
                  {/* <div class="row">
                      <div class="col-xs-6">
                        {
                            selectedChecklistItem.isNotOkSelected && (
                            <button id={selectedChecklistItem.uuid} className={`checkListOkButton fs-12 h-40 p-l-30 p-r-30 h-20 f-normal`} style='margin-left:5%;font-weight:600;font-size:13px' >Assign</button>
                            )
                        }
                      </div>
                      <div class="col-xs-6">
                      {
                          selectedChecklistItem.uploadFileSrc && (
                              <button className={`checkListOkButton fs-12 h-40 p-l-30 p-r-30 h-20 f-normal`} style='margin-left:5%;font-weight:600;font-size:13px' onClick={(e)=> togglePreviewModal(e,selectedChecklistItem.uuid)} >Preview Image</button>
                          )
                      }
                      </div>
                    </div> */}
                  {/*
                      By: Yashvi
                      On: 14th April 2022
                      Modification: Commented Chat related code for now
                    */}
                  <div class="row h-inherit">
                    <div class="w-full h-inherit" style="overflow: hidden auto;">
                      {checkListTaskComment.map((item, index) => (
                        <div>
                          <div class="display-flex m-all m-t-10 m-b-10">
                            <Icons userDisplayName={item.commentByName} title={item.commentByName} classes={'secondary fs-10 m-l-5 m-r-5'}/>
                            <div style="font-size:1rem;">
                              <p>
                                {item.commentByName}
                                <span class="p-l-20 fs-12">{moment(item.createdAt).fromNow()}</span>
                              </p>
                              <span id={`comment-${index}`}>{getTaskComment(item.comment, index)}</span>
                            </div>
                          </div>
                          <div class="display-flex">
                            {item.uploadedFileImages && item.uploadedFileImages.map((imgSrc,id) => (
                              <div style="margin-left: calc(1rem + 5px)">
                                <img id={`image-${index}-${id}`} class="cursor-pointer object-fit-contain w-full" src={imgSrc} width="100" height="100" onClick={(e)=> viewAllImages(e,id, index)}/>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/*
                  By: Yashvi
                  On: 14th April 2022
                  Modification: Commented Chat related code for now
                */}
              <div class="row h-92">
                <ChatComment onHandleEditorComment={(comment,img) => handleEditorComment1(comment,img)}/>
              </div>
            </div>
          )}
        </div>
      </div>
      <div class="row semi-detail-footer">
        <div class="col-xs-12">
          {/*<button class="primary-button button-10 m-t-20 m-b-20 float-right">{props.currentRow && props.currentRow.displayName}</button>*/}
        </div>
      </div>
      <div class='orgChartModal'>
        <div id="myAssignModal" class="org-chart-modal" style={notokayModelOpen ? 'display:block':'display:none'}>
          <div class="org-chart-modal-content org-chart-width">
            <div class="org-chart-modal-header">
              <span class="org-chart-close" onClick={(e) => toggleNotokayModal(e)}>&times;</span>
            </div>
            <div class="org-chart-modal-body">
              {/*
                  modified by: Vihang
                  modified at: 29/04/2022
                  modification :new animated image added for not okay upload image modal*/}
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 display-flex justify-center pos-relative">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                      <label class="modal-label">Upload image</label>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 display-flex justify-center">
                      {/*<img src="/assets/images/assignSC.svg" class="wizard-imgs" alt="" />*/}
                      <svg class="animated" id="freepik_stories-video-upload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.com/svgjs"><style>{`svg#freepik_stories-video-upload:not(.animated) `} {`.animable {opacity: 0;}`} {`svg#freepik_stories-video-upload.animated #freepik--Folder--inject-2 {animation: 3s Infinite  linear floating;animation-delay: 0s;}`}            {`@keyframes floating {                0% {                    opacity: 1;                    transform: translateY(0px);                }                50% {                    transform: translateY(-10px);                }                100% {                    opacity: 1;                    transform: translateY(0px);                }            }  `}      </style><g id="freepik--background-complete--inject-2" class="animable" style="transform-origin: 256.452px 254.105px;"><path d="M52.93,237.07l1.89,34.72A2.34,2.34,0,0,0,57.14,274l62.48.46a2.34,2.34,0,0,0,2.36-2.33l.2-27a2.34,2.34,0,0,0-2.34-2.36l-38.43,0a2.31,2.31,0,0,1-1.65-.69l-6.63-6.62a2.33,2.33,0,0,0-1.64-.69l-16.2-.12A2.34,2.34,0,0,0,52.93,237.07Z" style="fill: rgb(235, 235, 235); transform-origin: 87.5544px 254.555px;" id="el603rkv18zm5" class="animable" /><g id="el3tux2q7hq8m"><rect x="53.81" y="238.42" width="68.27" height="40.79" style="fill: rgb(245, 245, 245); transform-origin: 87.945px 258.815px; transform: rotate(0.42deg);" class="animable" id="el7m3ccdols" /></g><path d="M48.5,241.79l4.9,42.58a1.51,1.51,0,0,0,1.49,1.33l66.53.49a1.49,1.49,0,0,0,1.51-1.38l3.66-42.51a1.51,1.51,0,0,0-1.49-1.64L50,240.11A1.51,1.51,0,0,0,48.5,241.79Z" style="fill: rgb(235, 235, 235); transform-origin: 87.543px 263.15px;" id="el822uf92kmvw" class="animable" /><path d="M336.6,243.07l1.63,29.9a2,2,0,0,0,2,1.9l53.8.4a2,2,0,0,0,2-2l.17-23.27a2,2,0,0,0-2-2l-33.08,0a2,2,0,0,1-1.43-.59L354,241.63a2,2,0,0,0-1.41-.59l-13.95-.1A2,2,0,0,0,336.6,243.07Z" style="fill: rgb(235, 235, 235); transform-origin: 366.398px 258.105px;" id="el0254cw0l79c8" class="animable" /><g id="el1g5yw4kzw66"><rect x="337.36" y="244.23" width="58.78" height="35.13" style="fill: rgb(245, 245, 245); transform-origin: 366.75px 261.795px; transform: rotate(0.42deg);" class="animable" id="elqel2g14q0op" /></g><path d="M332.79,247.13,337,283.79a1.29,1.29,0,0,0,1.28,1.15l57.29.42a1.3,1.3,0,0,0,1.3-1.19l3.15-36.6a1.29,1.29,0,0,0-1.28-1.41l-64.66-.48A1.3,1.3,0,0,0,332.79,247.13Z" style="fill: rgb(235, 235, 235); transform-origin: 366.403px 265.52px;" id="el2bo64ivdm8i" class="animable" /><rect x="348.41" y="47.14" width="95.61" height="158.26" style="fill: rgb(224, 224, 224); transform-origin: 396.215px 126.27px;" id="eleycpew8kauk" class="animable" /><rect x="345.23" y="47.14" width="95.61" height="158.26" style="fill: rgb(235, 235, 235); transform-origin: 393.035px 126.27px;" id="el2v7mcqprnxo" class="animable" /><rect x="349.3" y="50.35" width="87.47" height="151.84" style="fill: rgb(255, 255, 255); transform-origin: 393.035px 126.27px;" id="elyvih4gwxbl" class="animable" /><rect x="365.95" y="70.08" width="53.78" height="112.38" style="fill: rgb(235, 235, 235); transform-origin: 392.84px 126.27px;" id="elrxaahl14cc" class="animable" /><path d="M366,142.7c-.12-10.5,9.32-20.75,19.71-22.22,5-.69,10.23.29,14.86-1.61,8.27-3.39,10.9-14.37,19.22-17.63l.38,81.22H366Z" style="fill: rgb(224, 224, 224); transform-origin: 393.084px 141.85px;" id="elw66giij9219" class="animable" /><path d="M438.49,249.9s-7.92-.57-7.19,17.2,2.54,27.22,2.54,27.22-.23,3.94-3.28,3.17-8.79-4.61-11.62-1.74-1.9,7.53,2,12.9,12,17.44,12.74,18.54,1,3.09-1.16,2.89-16.76-5.14-18.69,1.93,11.39,20.24,12.82,21.7,1.5,2.4.92,3.29-5.33-1.24-9.54-2.48-9.3-1.93-10.08,2.24,5.1,16.37,27.07,29.2l10.57,5.28,10-6.38c20.58-15,25.19-27.69,24-31.76s-6.19-2.87-10.26-1.22-8.57,4.24-9.24,3.41-.68-1.75.59-3.36,13.21-16,10.58-22.87-16.65-.46-18.79-.05-2-1.63-1.44-2.77,7.48-14,10.82-19.72,3.93-10.37.7-13-8.43,1.82-11.39,2.89-3.58-2.82-3.58-2.82.86-9.59-.19-27.34-9.07-16.32-9.07-16.32" style="fill: rgb(235, 235, 235); transform-origin: 443.823px 320.569px;" id="el81db793ficf" class="animable" /><path d="M439.12,265.81s0,.13,0,.37,0,.63.09,1.09c.06,1,.16,2.39.28,4.2.24,3.64.55,8.92.91,15.44.73,13,1.58,31,2.44,50.95s1.68,37.93,2.33,51c.33,6.51.6,11.78.78,15.44.09,1.81.16,3.22.21,4.2,0,.47,0,.83.05,1.09v.38s0-.13-.05-.38,0-.62-.08-1.09c-.07-1-.16-2.38-.28-4.19-.25-3.64-.56-8.92-.92-15.44-.72-13-1.57-31-2.44-51s-1.67-37.92-2.32-51c-.33-6.51-.6-11.78-.79-15.44-.09-1.81-.16-3.22-.21-4.2,0-.47,0-.83,0-1.09A3.64,3.64,0,0,1,439.12,265.81Z" style="fill: rgb(224, 224, 224); transform-origin: 442.663px 337.89px;" id="elj58or0tngfc" class="animable" /><path d="M426.75,301.43a3.81,3.81,0,0,1,.66.55c.4.37,1,.92,1.67,1.61,1.4,1.38,3.27,3.34,5.3,5.54l5.17,5.66,1.58,1.7a3.81,3.81,0,0,1,.55.66,3.55,3.55,0,0,1-.66-.54c-.41-.37-1-.93-1.67-1.62-1.39-1.4-3.24-3.38-5.26-5.58l-5.21-5.62-1.58-1.7A3.41,3.41,0,0,1,426.75,301.43Z" style="fill: rgb(224, 224, 224); transform-origin: 434.215px 309.29px;" id="elvc9nibl79fh" class="animable" /><path d="M442.73,316.8c-.08-.08,3.78-4.13,8.63-9s8.84-8.84,8.92-8.76-3.79,4.13-8.63,9S442.81,316.88,442.73,316.8Z" style="fill: rgb(224, 224, 224); transform-origin: 451.505px 307.92px;" id="elyyag7qkfblj" class="animable" /><path d="M442.68,347.43a3.49,3.49,0,0,1,.74-.47l2.07-1.16c1.74-1,4.14-2.34,6.74-3.94s4.91-3.11,6.58-4.23l2-1.31a3.85,3.85,0,0,1,.75-.45,3.36,3.36,0,0,1-.66.57c-.44.35-1.09.84-1.9,1.43-1.62,1.17-3.91,2.74-6.52,4.33s-5.05,2.93-6.83,3.85c-.89.46-1.62.82-2.13,1.05A4.6,4.6,0,0,1,442.68,347.43Z" style="fill: rgb(224, 224, 224); transform-origin: 452.12px 341.65px;" id="el5408dab08eu" class="animable" /><path d="M425.17,336.71a2.69,2.69,0,0,1,.73.34c.46.25,1.12.61,1.92,1.07,1.61.91,3.82,2.2,6.24,3.64s4.62,2.77,6.19,3.75l1.85,1.17a3.82,3.82,0,0,1,.65.48,2.85,2.85,0,0,1-.73-.34c-.46-.24-1.11-.61-1.92-1.07-1.61-.91-3.82-2.2-6.24-3.64s-4.61-2.77-6.19-3.75l-1.85-1.17A3.82,3.82,0,0,1,425.17,336.71Z" style="fill: rgb(224, 224, 224); transform-origin: 433.96px 341.935px;" id="elhzhlkw5w33q" class="animable" /><path d="M421.7,363.74a6.15,6.15,0,0,1,.93.45l2.46,1.36c2.07,1.16,4.91,2.79,8,4.61s5.95,3.49,8,4.71l2.39,1.47a5,5,0,0,1,.85.58,4.35,4.35,0,0,1-.93-.45L441,375.12c-2.06-1.16-4.91-2.79-8-4.61S427,367,425,365.8l-2.4-1.47A5.14,5.14,0,0,1,421.7,363.74Z" style="fill: rgb(224, 224, 224); transform-origin: 433.015px 370.33px;" id="el9oga60micu4" class="animable" /><path d="M443.9,376.46a4.94,4.94,0,0,1,.92-.62l2.57-1.56c2.17-1.32,5.16-3.16,8.4-5.28s6.14-4.09,8.22-5.55l2.47-1.71a5.37,5.37,0,0,1,.93-.59,6.11,6.11,0,0,1-.84.72c-.55.44-1.37,1.06-2.39,1.82-2.05,1.51-4.92,3.54-8.17,5.65s-6.27,3.92-8.48,5.18c-1.1.63-2,1.13-2.63,1.46A6.69,6.69,0,0,1,443.9,376.46Z" style="fill: rgb(224, 224, 224); transform-origin: 455.655px 368.805px;" id="el8d4ck1xobgp" class="animable" /><polygon points="459.79 394.7 430.55 394.7 440.09 466.94 450.24 466.94 459.79 394.7" style="fill: rgb(224, 224, 224); transform-origin: 445.17px 430.82px;" id="eliawtcipmhm" class="animable" /><path d="M432.06,403.58a.78.78,0,0,0,.16.25,1.73,1.73,0,0,0,.7.51A3.53,3.53,0,0,0,436,404c1.18-.65,2.21-1.93,3.79-2.5a8.29,8.29,0,0,1,5.38.11,22.85,22.85,0,0,1,5,2.43,34.82,34.82,0,0,0,4.07,2.18,11.47,11.47,0,0,0,3,.87,6.34,6.34,0,0,0,.85.06c.19,0,.3,0,.3,0a14.81,14.81,0,0,1-4-1.21,39.81,39.81,0,0,1-4-2.25,22.16,22.16,0,0,0-5.09-2.51,8.62,8.62,0,0,0-5.67-.06,7.68,7.68,0,0,0-2.14,1.32,16.67,16.67,0,0,1-1.67,1.3,3.47,3.47,0,0,1-2.85.5A3.17,3.17,0,0,1,432.06,403.58Z" style="fill: rgb(245, 245, 245); transform-origin: 445.225px 403.91px;" id="elibvtf0fypg" class="animable" /><path d="M433.13,416.88s.23-.3.69-.77a6.4,6.4,0,0,1,2.33-1.48,10.26,10.26,0,0,1,4.07-.62,43.16,43.16,0,0,1,5.09.7,17.46,17.46,0,0,0,5.21.21,14,14,0,0,0,4.1-1.17,13.42,13.42,0,0,0,2.46-1.46,3.24,3.24,0,0,0,.78-.71,23.19,23.19,0,0,1-3.38,1.86,14.79,14.79,0,0,1-4,1.05,18.19,18.19,0,0,1-5.09-.25,38.33,38.33,0,0,0-5.15-.67,10.42,10.42,0,0,0-4.2.74,6.17,6.17,0,0,0-2.35,1.67,4.36,4.36,0,0,0-.44.65C433.15,416.79,433.12,416.87,433.13,416.88Z" style="fill: rgb(245, 245, 245); transform-origin: 445.494px 414.23px;" id="el0f9bi95fd8r" class="animable" /><path d="M456.47,424a2.22,2.22,0,0,0-.8-.42,8.41,8.41,0,0,0-2.43-.52,14.86,14.86,0,0,0-3.66.21c-1.36.22-2.82.59-4.36.92a18.48,18.48,0,0,1-4.35.49,9.51,9.51,0,0,1-3.46-.75,7.79,7.79,0,0,1-2.62-1.95,2.23,2.23,0,0,0,.49.77,6.26,6.26,0,0,0,2,1.49,9.19,9.19,0,0,0,3.58.88,17.69,17.69,0,0,0,4.47-.46c1.55-.33,3-.72,4.33-1a17.75,17.75,0,0,1,3.57-.31A12.74,12.74,0,0,1,456.47,424Z" style="fill: rgb(245, 245, 245); transform-origin: 445.63px 423.553px;" id="eltd9p3r9jjl8" class="animable" /><path d="M435.71,434a4.79,4.79,0,0,1,2.84-.28,13.33,13.33,0,0,1,3,1.11,11.36,11.36,0,0,0,3.86,1.06,11.58,11.58,0,0,0,7-1.62,9.91,9.91,0,0,0,1.74-1.34,2.82,2.82,0,0,0,.52-.62A27.42,27.42,0,0,1,452.2,434a12,12,0,0,1-6.78,1.43c-2.77-.16-4.89-1.81-6.81-2a4.33,4.33,0,0,0-2.21.19A1.6,1.6,0,0,0,435.71,434Z" style="fill: rgb(245, 245, 245); transform-origin: 445.19px 434.122px;" id="elnzihpthjbzo" class="animable" /><path d="M437.34,447.89a5.7,5.7,0,0,0,2.44-.48c1.47-.5,3.29-1.62,5.41-2.47a9.12,9.12,0,0,1,3.11-.65,5.8,5.8,0,0,1,2.5.57,5.71,5.71,0,0,1,1.81,1.56,1.31,1.31,0,0,0-.28-.61,4,4,0,0,0-1.37-1.24,5.66,5.66,0,0,0-2.65-.72,8.79,8.79,0,0,0-3.29.65c-2.2.88-4,2-5.36,2.59S437.33,447.81,437.34,447.89Z" style="fill: rgb(245, 245, 245); transform-origin: 444.975px 445.871px;" id="el802ibxwqvb3" class="animable" /><path d="M438.78,454.34a6.71,6.71,0,0,0,1.85.6,34.17,34.17,0,0,0,9.32.92,7,7,0,0,0,1.93-.23c0-.15-3,0-6.58-.38S438.81,454.2,438.78,454.34Z" style="fill: rgb(245, 245, 245); transform-origin: 445.33px 455.104px;" id="el8dk2j05lj4o" class="animable" /><rect x="37.95" y="64.46" width="95.57" height="138.52" style="fill: rgb(224, 224, 224); transform-origin: 85.735px 133.72px;" id="elooxl438iv8" class="animable" /><rect x="33.16" y="64.46" width="95.57" height="138.52" style="fill: rgb(245, 245, 245); transform-origin: 80.945px 133.72px;" id="elujhrtkkikaf" class="animable" /><rect x="45.03" y="79.46" width="71.82" height="108.51" style="fill: rgb(255, 255, 255); transform-origin: 80.94px 133.715px;" id="elpf6qb1ijc5j" class="animable" /><path d="M116.85,188s0-.19,0-.53,0-.87,0-1.54c0-1.37,0-3.36,0-6,0-5.2,0-12.77-.06-22.35,0-19.13-.07-46.23-.12-78.14l.24.24L45,79.72h0l.26-.26c0,40.94,0,78.68,0,108.52l-.21-.21,52.28.11,14.44.05,3.79,0,1.31,0-1.27,0-3.75,0-14.39,0L45,188.18h-.21V188c0-29.84,0-67.58,0-108.52V79.2H45l71.81,0h.24v.24c0,32-.09,59.12-.12,78.3,0,9.55,0,17.11-.06,22.3,0,2.57,0,4.55,0,5.9,0,.66,0,1.16,0,1.51S116.85,188,116.85,188Z" style="fill: rgb(224, 224, 224); transform-origin: 80.92px 133.69px;" id="elx897avj9lo" class="animable" /><path d="M129,64.46a16,16,0,0,1-1.7,2.47c-1.11,1.49-2.69,3.51-4.48,5.69s-3.48,4.12-4.73,5.49a16,16,0,0,1-2.1,2.15,17.38,17.38,0,0,1,1.82-2.39l4.6-5.58c1.75-2.11,3.32-4,4.6-5.58A17.65,17.65,0,0,1,129,64.46Z" style="fill: rgb(224, 224, 224); transform-origin: 122.495px 72.36px;" id="elrtfu5mc6ot" class="animable" /><path d="M117.22,187.63a88.74,88.74,0,0,0,12.52,15.66" style="fill: rgb(255, 255, 255); transform-origin: 123.48px 195.46px;" id="ele0as08hqcmo" class="animable" /><path d="M129.74,203.29a14.4,14.4,0,0,1-2.18-2,70.87,70.87,0,0,1-8.89-11.12,13.73,13.73,0,0,1-1.45-2.56A19.8,19.8,0,0,1,119,190c1,1.48,2.53,3.5,4.26,5.66s3.38,4,4.59,5.4A19.51,19.51,0,0,1,129.74,203.29Z" style="fill: rgb(224, 224, 224); transform-origin: 123.48px 195.45px;" id="elzqh1xzngrvo" class="animable" /><path d="M33.14,202.87l12.52-15.45" style="fill: rgb(255, 255, 255); transform-origin: 39.4px 195.145px;" id="ely8xdhno03xg" class="animable" /><path d="M45.66,187.42a93.18,93.18,0,0,1-6,7.89,92.11,92.11,0,0,1-6.47,7.56A96,96,0,0,1,39.2,195,98,98,0,0,1,45.66,187.42Z" style="fill: rgb(224, 224, 224); transform-origin: 39.425px 195.145px;" id="elles6e42er7m" class="animable" /><path d="M33.16,64.46a86.47,86.47,0,0,1,6.07,7.26,82.74,82.74,0,0,1,5.67,7.59A85.73,85.73,0,0,1,38.83,72,85.84,85.84,0,0,1,33.16,64.46Z" style="fill: rgb(224, 224, 224); transform-origin: 39.03px 71.885px;" id="elx5p35s6fyx8" class="animable" /><rect x="70.43" y="101.49" width="24.05" height="68.28" style="fill: rgb(224, 224, 224); transform-origin: 82.455px 135.63px;" id="elnbyvdg2oe9r" class="animable" /><rect x="178.18" y="41.29" width="75.11" height="78.3" style="fill: rgb(224, 224, 224); transform-origin: 215.735px 80.44px;" id="elozxo9ea13va" class="animable" /><rect x="173.09" y="41.29" width="75.11" height="78.3" style="fill: rgb(250, 250, 250); transform-origin: 210.645px 80.44px;" id="el7885esou6w" class="animable" /><path d="M248.23,119.62H173.07V41.27h75.16Zm-75.11-.05h75.06V41.32H173.12Z" style="fill: rgb(224, 224, 224); transform-origin: 210.65px 80.445px;" id="elk21hfr2upym" class="animable" /><rect x="183.19" y="51.82" width="54.92" height="57.25" style="fill: rgb(255, 255, 255); transform-origin: 210.65px 80.445px;" id="eljr4bpbi8j8l" class="animable" /><path d="M183.19,109.45a9.28,9.28,0,0,1-1.35,1.57c-.88.93-2.11,2.18-3.5,3.54s-2.65,2.58-3.58,3.44a8.57,8.57,0,0,1-1.59,1.32,8.6,8.6,0,0,1,1.35-1.57c.87-.92,2.11-2.18,3.5-3.54s2.65-2.58,3.59-3.45A8.76,8.76,0,0,1,183.19,109.45Z" style="fill: rgb(224, 224, 224); transform-origin: 178.18px 114.385px;" id="elb3vj63molo9" class="animable" /><path d="M238.11,109.31a9.53,9.53,0,0,1,1.58,1.35c.92.88,2.17,2.11,3.54,3.49s2.57,2.66,3.43,3.59a8.57,8.57,0,0,1,1.32,1.59,8.6,8.6,0,0,1-1.57-1.35c-.92-.88-2.18-2.11-3.54-3.5s-2.58-2.65-3.44-3.59A8.61,8.61,0,0,1,238.11,109.31Z" style="fill: rgb(224, 224, 224); transform-origin: 243.045px 114.32px;" id="el7lq5wl9r9fr" class="animable" /><path d="M238,52a9.11,9.11,0,0,1,1.36-1.57c.87-.93,2.1-2.18,3.49-3.54s2.65-2.58,3.58-3.44A8.57,8.57,0,0,1,248,42.1a8.6,8.6,0,0,1-1.35,1.57c-.87.93-2.11,2.18-3.5,3.55s-2.65,2.58-3.59,3.44A8.76,8.76,0,0,1,238,52Z" style="fill: rgb(224, 224, 224); transform-origin: 243px 47.05px;" id="elujkt0dxwvc" class="animable" /><path d="M183,52.11a8.43,8.43,0,0,1-1.58-1.35c-.92-.88-2.17-2.11-3.53-3.49s-2.58-2.65-3.44-3.59a8.57,8.57,0,0,1-1.32-1.59,8.6,8.6,0,0,1,1.57,1.35c.92.88,2.18,2.11,3.54,3.5s2.58,2.66,3.45,3.59A8.76,8.76,0,0,1,183,52.11Z" style="fill: rgb(224, 224, 224); transform-origin: 178.065px 47.1px;" id="elayuu3lyui8n" class="animable" /><path d="M238,109.07s0-.1,0-.28,0-.46,0-.8q0-1.08,0-3.09c0-2.71,0-6.66,0-11.67,0-10-.07-24.31-.11-41.41L238,52l-54.76,0h0l.24-.24c0,21,0,40.67,0,57.25l-.21-.21,39.66.11L234,109l2.94,0,.76,0H237l-2.91,0-11.09,0-39.79.11H183v-.21c0-16.58,0-36.24,0-57.25v-.24h.25l54.76,0h.21v.21c0,17.16-.08,31.49-.11,41.55,0,5,0,8.92-.05,11.62,0,1.32,0,2.34,0,3.05,0,.33,0,.58,0,.77A2.39,2.39,0,0,1,238,109.07Z" style="fill: rgb(224, 224, 224); transform-origin: 210.61px 80.26px;" id="elu87eb94h1nh" class="animable" /><rect x="201.49" y="71.28" width="18.33" height="18.33" style="fill: rgb(235, 235, 235); transform-origin: 210.655px 80.445px;" id="eljm3rqv2kqi" class="animable" /><path d="M138.94,357.9l1.88,34.53a2.33,2.33,0,0,0,2.31,2.21l62.13.45a2.33,2.33,0,0,0,2.35-2.31l.2-26.88a2.34,2.34,0,0,0-2.33-2.35l-38.22,0a2.31,2.31,0,0,1-1.64-.69l-6.6-6.59a2.36,2.36,0,0,0-1.63-.68l-16.11-.12A2.33,2.33,0,0,0,138.94,357.9Z" style="fill: rgb(235, 235, 235); transform-origin: 173.374px 375.28px;" id="elr48g428ql6" class="animable" /><g id="el3y7ljj2ncon"><rect x="139.81" y="359.24" width="67.89" height="40.57" style="fill: rgb(245, 245, 245); transform-origin: 173.755px 379.525px; transform: rotate(0.42deg);" class="animable" id="eln8y80y3k3p" /></g><path d="M134.54,362.59l4.87,42.35a1.49,1.49,0,0,0,1.48,1.32l66.16.49a1.51,1.51,0,0,0,1.51-1.37l3.64-42.28a1.51,1.51,0,0,0-1.49-1.63L136,360.92A1.5,1.5,0,0,0,134.54,362.59Z" style="fill: rgb(235, 235, 235); transform-origin: 173.368px 383.835px;" id="ely5jba8lzkqa" class="animable" /><path d="M246.89,377.35,248.77,412a2.33,2.33,0,0,0,2.31,2.21l62.27.46a2.34,2.34,0,0,0,2.36-2.32l.2-26.94a2.34,2.34,0,0,0-2.34-2.35l-38.3,0a2.32,2.32,0,0,1-1.65-.68l-6.6-6.61a2.36,2.36,0,0,0-1.64-.68l-16.14-.12A2.33,2.33,0,0,0,246.89,377.35Z" style="fill: rgb(235, 235, 235); transform-origin: 281.4px 394.82px;" id="elzk4r7wl52cd" class="animable" /><g id="ely6rs92dqlf"><rect x="247.76" y="378.7" width="68.04" height="40.66" style="fill: rgb(245, 245, 245); transform-origin: 281.78px 399.03px; transform: rotate(0.42deg);" class="animable" id="elpw0eoe3aqe" /></g><path d="M242.47,382.05l4.89,42.44a1.5,1.5,0,0,0,1.48,1.33l66.31.49a1.52,1.52,0,0,0,1.51-1.38l3.65-42.37a1.51,1.51,0,0,0-1.49-1.63L244,380.38A1.51,1.51,0,0,0,242.47,382.05Z" style="fill: rgb(235, 235, 235); transform-origin: 281.388px 403.345px;" id="elga1sjj3ujt" class="animable" /></g><g id="freepik--Plant--inject-2" class="animable" style="transform-origin: 81.0412px 363.263px;"><path d="M93.56,318.85C83.3,303.17,84.8,280.77,97,266.59c3.8-4.4,9.11-8.23,14.91-7.73s10.71,5.59,12.52,11.27,1.17,11.82.11,17.68c-1.48,8.2-4,16.59-9.66,22.69s-14,12.35-21.36,8.35" style="fill: #219EBC; transform-origin: 106.163px 289.464px;" id="elrrwg8l2psqi" class="animable" /><path d="M96.66,394.33a23.43,23.43,0,0,1,6.53-26.61c2.36-1.93,5.44-3.42,8.38-2.64s5,3.86,5.43,6.94-.47,6.2-1.54,9.12c-1.51,4.1-3.55,8.2-7,10.82s-8.36,5.09-11.76,2.37" style="fill: #219EBC; transform-origin: 106.032px 380.191px;" id="elj80zqd2o08t" class="animable" /><path d="M74.5,388.94C77.32,375,70,359.7,57.41,353.16c-3.91-2-8.71-3.24-12.65-1.26s-6,6.93-5.65,11.43S41.59,372,44,375.8c3.34,5.35,7.44,10.56,13.15,13.25s13.35,4.76,17.37-.11" style="fill: #219EBC; transform-origin: 57.0868px 371.387px;" id="elxqrvhhox269" class="animable" /><path d="M76.28,351.35c4.91-15.84-3.41-35-17.29-44.13-4.3-2.82-9.75-4.78-14.56-3s-7.76,7.37-7.91,12.64,1.87,10.34,4.2,15.07c3.26,6.62,7.42,13.16,13.74,17s16.57,7.6,21.82,2.41" style="fill: #219EBC; transform-origin: 57.1061px 328.71px;" id="elgpy2p25dll" class="animable" /><path d="M83.57,428.77a3.29,3.29,0,0,1-.16-.76c-.09-.58-.2-1.31-.33-2.21-.07-.49-.14-1-.22-1.6s-.24-1.21-.37-1.88c-.25-1.35-.52-2.9-1-4.57-.21-.85-.42-1.73-.64-2.64s-.54-1.85-.83-2.83c-.53-2-1.31-4-2-6.17a119.8,119.8,0,0,0-6.11-13.55A120.32,120.32,0,0,0,64,380c-1.4-1.8-2.66-3.58-4-5.11l-1.89-2.25-1.85-2c-1.15-1.3-2.29-2.37-3.28-3.33l-1.36-1.35-1.21-1.06-1.66-1.5c-.38-.35-.57-.54-.55-.56a4.23,4.23,0,0,1,.63.46l1.75,1.4,1.25,1,1.41,1.3c1,.94,2.18,2,3.36,3.28l1.89,2,1.94,2.24c1.37,1.52,2.66,3.29,4.08,5.1a114.45,114.45,0,0,1,8,12.64,113.41,113.41,0,0,1,6.1,13.66c.72,2.19,1.49,4.24,2,6.22.28,1,.54,1.94.8,2.86s.41,1.81.6,2.66c.42,1.69.65,3.25.87,4.61.11.68.22,1.31.31,1.9s.12,1.12.17,1.61c.08.91.15,1.65.2,2.23A3.83,3.83,0,0,1,83.57,428.77Z" style="fill: rgb(38, 50, 56); transform-origin: 65.8914px 395.805px;" id="el9gq80tsvyxf" class="animable" /><path d="M83.21,431.62a1.3,1.3,0,0,1,0-.32c0-.24,0-.54.06-.91.08-.86.19-2,.33-3.52.08-.77.16-1.62.25-2.54s.1-1.95.15-3c.08-2.18.29-4.66.21-7.4,0-1.37,0-2.8,0-4.3s-.15-3.05-.23-4.66c-.11-3.22-.54-6.63-.93-10.24a161.53,161.53,0,0,0-4.86-23,161.81,161.81,0,0,0-8.48-22c-1.64-3.23-3.14-6.34-4.8-9.1-.82-1.39-1.55-2.77-2.35-4S61,334.12,60.21,333c-1.43-2.35-3-4.31-4.2-6.09-.64-.88-1.22-1.71-1.78-2.46s-1.12-1.38-1.6-2l-2.19-2.77c-.22-.3-.41-.54-.56-.73s-.18-.26-.17-.27.09.07.23.22l.6.69,2.29,2.7,1.65,2c.58.73,1.17,1.56,1.83,2.43,1.28,1.76,2.84,3.71,4.3,6L63,336.31c.82,1.26,1.56,2.64,2.39,4,1.69,2.76,3.21,5.86,4.87,9.1a155.61,155.61,0,0,1,8.57,22,156,156,0,0,1,4.83,23.15c.37,3.62.79,7.05.88,10.28.06,1.62.19,3.18.19,4.68s0,2.94,0,4.32c0,2.75-.2,5.23-.31,7.41-.08,1.09-.12,2.1-.21,3s-.22,1.78-.31,2.54l-.45,3.51c0,.37-.1.67-.13.91A1.49,1.49,0,0,1,83.21,431.62Z" style="fill: rgb(38, 50, 56); transform-origin: 67.2191px 375.15px;" id="eltlx8o5nfybk" class="animable" /><path d="M109.9,277.8a1.86,1.86,0,0,1-.13.29l-.45.82L107.57,282c-.37.68-.83,1.42-1.26,2.26l-1.37,2.76c-.5,1-1,2-1.58,3.16s-1,2.36-1.61,3.63-1.17,2.6-1.74,4-1.11,2.89-1.7,4.41c-.29.77-.59,1.54-.89,2.33L96.59,307c-.55,1.65-1.13,3.35-1.71,5.09-2.18,7-4.24,14.85-6,23.16S86,351.62,85.17,358.93s-1.3,13.93-1.45,19.49c-.14,2.78-.17,5.3-.18,7.51s-.05,4.11,0,5.67,0,2.71,0,3.59c0,.37,0,.68,0,.93a1.14,1.14,0,0,1,0,.32,1.19,1.19,0,0,1,0-.32c0-.25,0-.55-.06-.93,0-.87-.1-2.07-.17-3.58s-.13-3.47-.13-5.68,0-4.74.08-7.53c.09-5.57.6-12.2,1.31-19.54s2-15.36,3.7-23.7,3.82-16.18,6-23.22c.59-1.74,1.18-3.44,1.74-5.1.29-.82.57-1.64.85-2.44l.91-2.33,1.75-4.41c.58-1.41,1.21-2.73,1.77-4s1.11-2.49,1.66-3.62l1.63-3.15,1.43-2.74c.45-.84.92-1.57,1.31-2.24l1.87-3.07c.2-.32.36-.58.5-.79S109.89,277.79,109.9,277.8Z" style="fill: rgb(38, 50, 56); transform-origin: 96.54px 337.119px;" id="elsel20dclcq" class="animable" /><path d="M106.41,374a13.1,13.1,0,0,1-1.09,1.92c-.75,1.19-1.78,3-3,5.18s-2.54,4.92-3.89,8-2.62,6.5-3.77,10.17-2,7.26-2.62,10.53-1,6.26-1.29,8.77-.4,4.56-.46,6a13,13,0,0,1-.18,2.19,13.55,13.55,0,0,1-.08-2.2c0-1.42,0-3.47.25-6a86.22,86.22,0,0,1,1.15-8.84,90.71,90.71,0,0,1,6.44-20.84c1.38-3.06,2.76-5.75,4-7.95s2.36-3.94,3.18-5.1A15,15,0,0,1,106.41,374Z" style="fill: rgb(38, 50, 56); transform-origin: 98.2132px 400.38px;" id="el58zwb74ooy" class="animable" /><polygon points="63.43 421.72 108.47 421.72 103.02 467.71 69.04 467.71 63.43 421.72" style="fill: rgb(69, 90, 100); transform-origin: 85.95px 444.715px;" id="elt6wt6a8qbos" class="animable" /><polygon points="65.08 462.75 68.9 467.71 103.02 467.71 106.95 462.9 65.08 462.75" style="fill: rgb(38, 50, 56); transform-origin: 86.015px 465.23px;" id="eld3bp3c2qgom" class="animable" /><path d="M106.71,435.24c0,.19-9.34.34-20.87.34S65,435.43,65,435.24s9.34-.33,20.87-.33S106.71,435.06,106.71,435.24Z" style="fill: rgb(255, 255, 255); transform-origin: 85.855px 435.245px;" id="elhn5kt7pg6p" class="animable" /><path d="M106.71,438.31c0,.18-9.34.33-20.87.33S65,438.49,65,438.31s9.34-.34,20.87-.34S106.71,438.12,106.71,438.31Z" style="fill: rgb(255, 255, 255); transform-origin: 85.855px 438.305px;" id="ellqfo957bjqf" class="animable" /><path d="M106.15,441.27c0,.19-9,.34-20.14.34s-20.14-.15-20.14-.34,9-.34,20.14-.34S106.15,441.09,106.15,441.27Z" style="fill: rgb(255, 255, 255); transform-origin: 86.01px 441.27px;" id="elqshr3hl9tbh" class="animable" /></g><g id="freepik--Floor--inject-2" class="animable" style="transform-origin: 244px 467.76px;"><path d="M461.82,467.76c0,.15-97.53.26-217.81.26s-217.83-.11-217.83-.26,97.51-.26,217.83-.26S461.82,467.62,461.82,467.76Z" style="fill: rgb(38, 50, 56); transform-origin: 244px 467.76px;" id="el8e0o3dnawpp" class="animable" /></g><g id="freepik--Character--inject-2" class="animable" style="transform-origin: 353.33px 282.16px;"><path d="M443.94,149.85c-3.36-4.25-3.43-12-3.32-14.07.26-4.71-10.24-32.2-36.26-20.85v0c-9.33,0-9.48,9.21-11.25,11.06s-3.74,3.78-4.21,6.3c-.82,4.47,3.42,8.81,2.34,13.22-.4,1.65-1.51,3.06-2.29,4.57h0c-.84,1.35-1.5,3.55-1.14,4.77a15.72,15.72,0,0,0,1.77,3.37,5.47,5.47,0,0,1,.95,3.62c-.41,2.26-3,3.52-3.74,5.71s.66,4.37,1.89,6.26,2.41,4.28,1.42,6.31a11.21,11.21,0,0,1-2.41,2.65,9.3,9.3,0,0,0-1.84,10.11l15-3q1-10.69,2-21.4c4.38,1.09,9.17-1.71,11.25-2.24l2.55-1.38c5.58,1,11.6.63,16.49-2.22s12.14.8,11.19-4.79C443.8,155.17,445.65,152,443.94,149.85Z" style="fill: rgb(38, 50, 56); transform-origin: 414.89px 152.543px;" id="el1nel58sml1v" class="animable" /><path d="M426.88,123.84l-20.37-6c-6.56-1-11.26,7-11.95,13.56-.76,7.33-1.39,16.31-.74,21.82,1.3,11.1,9.69,12.84,9.69,12.84s-1.47,15.71-1.6,19.64L427,172.82l3.17-44.91A3.88,3.88,0,0,0,426.88,123.84Z" style="fill: rgb(255, 211, 193); transform-origin: 411.863px 151.727px;" id="el2iedys4rmjt" class="animable" /><path d="M395.83,140.41a1.41,1.41,0,0,0,1.3,1.48,1.35,1.35,0,0,0,1.51-1.21,1.41,1.41,0,0,0-1.3-1.48A1.34,1.34,0,0,0,395.83,140.41Z" style="fill: rgb(38, 50, 56); transform-origin: 397.235px 140.544px;" id="elet87xat2lt" class="animable" /><path d="M395.07,137.18a27,27,0,0,1,2.84.36,28,28,0,0,1,2.65,1.24c.1,0,0-.33-.42-.73a5.27,5.27,0,0,0-2.08-1.15,4.85,4.85,0,0,0-2.31-.13C395.22,136.9,395,137.09,395.07,137.18Z" style="fill: rgb(38, 50, 56); transform-origin: 397.827px 137.734px;" id="el82k3yw6vf6g" class="animable" /><path d="M409.93,141.56a1.42,1.42,0,0,0,1.31,1.48,1.36,1.36,0,0,0,1.51-1.22,1.43,1.43,0,0,0-1.31-1.48A1.36,1.36,0,0,0,409.93,141.56Z" style="fill: rgb(38, 50, 56); transform-origin: 411.34px 141.69px;" id="elerfig9swqbn" class="animable" /><path d="M410.19,139.18c.22.1,1.31-.63,3-.87s3.05.13,3.21,0-.16-.29-.75-.46a6.32,6.32,0,0,0-2.6-.14,5.61,5.61,0,0,0-2.37.86C410.21,138.87,410.08,139.13,410.19,139.18Z" style="fill: rgb(38, 50, 56); transform-origin: 413.297px 138.412px;" id="el6jc4hxx8q7f" class="animable" /><path d="M404.93,149.11a9.71,9.71,0,0,0-2.45-.55c-.39-.05-.75-.15-.8-.41A1.92,1.92,0,0,1,402,147c.4-.93.83-1.9,1.27-2.92,1.76-4.14,3.06-7.56,2.89-7.63s-1.73,3.24-3.5,7.38c-.42,1-.83,2-1.22,2.93a2.26,2.26,0,0,0-.26,1.52,1,1,0,0,0,.61.59,2.57,2.57,0,0,0,.66.12A10.16,10.16,0,0,0,404.93,149.11Z" style="fill: rgb(38, 50, 56); transform-origin: 403.659px 142.793px;" id="elxllzgc7mh0k" class="animable" /><path d="M403.51,166a26.64,26.64,0,0,0,14.77-3.19c-.13,0-4.52,7.67-15,6.11Z" style="fill: rgb(244, 175, 155); transform-origin: 410.78px 165.97px;" id="el8y8tfmea7sl" class="animable" /><path d="M405.43,152.8a2.75,2.75,0,0,1,2.5-.92,2.51,2.51,0,0,1,1.69,1,1.58,1.58,0,0,1,.05,1.81,1.86,1.86,0,0,1-2,.43,5.89,5.89,0,0,1-1.9-1.24,1.53,1.53,0,0,1-.41-.47.5.5,0,0,1,0-.56" style="fill: rgb(244, 175, 155); transform-origin: 407.602px 153.547px;" id="elv8o9zaoulp" class="animable" /><path d="M409.37,150.34c-.25,0-.32,1.63-1.78,2.74s-3.21.86-3.23,1.09.38.34,1.12.39a4.13,4.13,0,0,0,2.69-.82,3.62,3.62,0,0,0,1.39-2.3C409.65,150.75,409.48,150.33,409.37,150.34Z" style="fill: rgb(38, 50, 56); transform-origin: 406.972px 152.453px;" id="elmt66zeirx6" class="animable" /><path d="M410.38,133.77c.14.41,1.66.28,3.44.57s3.2.83,3.45.47c.11-.18-.12-.57-.69-1a6.06,6.06,0,0,0-5.25-.79C410.67,133.25,410.33,133.57,410.38,133.77Z" style="fill: rgb(38, 50, 56); transform-origin: 413.836px 133.836px;" id="el4ll1ifhy8j3" class="animable" /><path d="M396.71,132.78c.25.36,1.31,0,2.57.08s2.32.32,2.58,0c.12-.17,0-.52-.49-.87a3.75,3.75,0,0,0-4.16,0C396.76,132.26,396.59,132.61,396.71,132.78Z" style="fill: rgb(38, 50, 56); transform-origin: 399.288px 132.191px;" id="el0nhdfh7xh1vj" class="animable" /><path d="M404.11,116.37A104,104,0,0,1,428,123.13c1.78.75,3.64,1.62,4.64,3.26s.92,3.92.75,6L430.84,162l-1.06-.06c-3,.5-3.26-1.06-5.45-3.25a10,10,0,0,1-2.72-8.51c.44-2.69,2-5.39,1.16-8-1.11-3.44-5.82-4.66-6.95-8.09-.65-2,.09-4.26-.67-6.22s-2.57-3-4.4-3.7-3.8-1.28-5.31-2.55S403,118,404.11,116.37Z" style="fill: rgb(38, 50, 56); transform-origin: 418.558px 139.202px;" id="elbcpbay7qmgm" class="animable" /><rect x="250.6" y="96.53" width="92.62" height="76.78" rx="5.95" style="fill: rgb(38, 50, 56); transform-origin: 296.91px 134.92px;" id="elpjr8t70g16" class="animable" /><circle cx="296.91" cy="133.43" r="13.35" style="fill: #219EBC; transform-origin: 296.91px 133.43px;" id="elkhy9kr16x3l" class="animable" /><path d="M293.7,137.34v-7.88a.5.5,0,0,1,.74-.44l7,4a.51.51,0,0,1,0,.88l-7,3.9A.49.49,0,0,1,293.7,137.34Z" style="fill: rgb(255, 255, 255); transform-origin: 297.695px 133.414px;" id="eln50vr84r59" class="animable" /><path d="M380.68,431.54,383,453.79s-21.84,9.82-21.82,14l43.3-2.92L402.3,430Z" style="fill: rgb(69, 90, 100); transform-origin: 382.83px 448.895px;" id="eldcfly41iwng" class="animable" /><g id="elj1b0tutt3bp"><g style="opacity: 0.3; transform-origin: 382.83px 448.895px;" class="animable" id="ellxti039azrb"><path d="M380.68,431.54,383,453.79s-21.84,9.82-21.82,14l43.3-2.92L402.3,430Z" id="elkzmns9lfkuo" class="animable" style="transform-origin: 382.83px 448.895px;" /></g></g><g id="el1kkq48x9vphi"><g style="opacity: 0.6; transform-origin: 395.939px 452.649px;" class="animable" id="elcv2iky6jy5w"><path d="M396.25,451a1.77,1.77,0,0,1,1.36,1.93,1.71,1.71,0,0,1-1.91,1.37,1.88,1.88,0,0,1-1.43-2.06,1.77,1.77,0,0,1,2.14-1.2" style="fill: rgb(255, 255, 255); transform-origin: 395.939px 452.649px;" id="eln06a7q7ne0h" class="animable" /></g></g><g id="elo2oa1msuwzj"><g style="opacity: 0.6; transform-origin: 382.803px 464.545px;" class="animable" id="eljt5janwoc6s"><path d="M404.47,464.84l-.35-3.51-41.39,4.12s-1.87,1-1.56,2.31Z" style="fill: rgb(255, 255, 255); transform-origin: 382.803px 464.545px;" id="elszqstqjogd9" class="animable" /></g></g><path d="M382.27,453.62c0,.21,1.09.23,2.17.84s1.7,1.46,1.89,1.37-.21-1.3-1.54-2S382.21,453.43,382.27,453.62Z" style="fill: rgb(38, 50, 56); transform-origin: 384.321px 454.613px;" id="elspdu24yxnjo" class="animable" /><path d="M377.86,455.8c0,.21.9.51,1.68,1.35s1,1.78,1.26,1.76.26-1.23-.73-2.26S377.85,455.6,377.86,455.8Z" style="fill: rgb(38, 50, 56); transform-origin: 379.403px 457.306px;" id="el0v1hrzmilhle" class="animable" /><path d="M375.64,461.41c.2,0,.42-1-.2-2.16s-1.64-1.52-1.72-1.34.58.76,1.07,1.69S375.43,461.41,375.64,461.41Z" style="fill: rgb(38, 50, 56); transform-origin: 374.78px 459.638px;" id="el1wcy2uh8qlhj" class="animable" /><path d="M382.31,448.49c.1.18,1.05-.17,2.25-.17s2.16.31,2.25.12-.84-.88-2.26-.86S382.19,448.33,382.31,448.49Z" style="fill: rgb(38, 50, 56); transform-origin: 384.558px 448.061px;" id="elg50cdfec2nj" class="animable" /><path d="M381.92,444a4.07,4.07,0,0,0,2.17-.16,9.59,9.59,0,0,0,2.22-.85,10.23,10.23,0,0,0,1.2-.74,2.59,2.59,0,0,0,.62-.56.91.91,0,0,0,0-1.13,1.15,1.15,0,0,0-.95-.42,2.63,2.63,0,0,0-.81.17,8.29,8.29,0,0,0-1.32.55,7.76,7.76,0,0,0-1.91,1.45c-.94,1-1.23,1.81-1.15,1.85s.54-.63,1.51-1.47a8.56,8.56,0,0,1,1.86-1.22,8.83,8.83,0,0,1,1.22-.47c.45-.15.84-.18,1,0s.06.11,0,.25a2.68,2.68,0,0,1-.45.41c-.37.27-.74.51-1.11.73a11.94,11.94,0,0,1-2,.94A15.49,15.49,0,0,0,381.92,444Z" style="fill: rgb(38, 50, 56); transform-origin: 385.123px 442.15px;" id="el6hhqke6omxw" class="animable" /><path d="M382.22,444.28a3.52,3.52,0,0,0,.43-2.14,7.05,7.05,0,0,0-.46-2.35,6.65,6.65,0,0,0-.64-1.28,1.79,1.79,0,0,0-1.46-1,1,1,0,0,0-.86.66,3.46,3.46,0,0,0-.17.81,5,5,0,0,0,1.18,3.64c.92,1.07,1.82,1.26,1.83,1.19s-.7-.47-1.42-1.51a5,5,0,0,1-.83-2,4.72,4.72,0,0,1,0-1.25c0-.47.18-.85.36-.82s.6.31.81.66a7.91,7.91,0,0,1,.61,1.14,7.6,7.6,0,0,1,.57,2.14C382.27,443.44,382.1,444.25,382.22,444.28Z" style="fill: rgb(38, 50, 56); transform-origin: 380.859px 440.895px;" id="el5fn2gwcfnsy" class="animable" /><path d="M376.92,268.7s-19.18,87.08-19.77,94.86,23.78,74.9,23.78,74.9l21-4s-1.33-99.13-2-101.07,5.35-50.67,5.35-50.67Z" style="fill: rgb(38, 50, 56); transform-origin: 381.21px 353.58px;" id="elahboeb4r7er" class="animable" /><path d="M390.32,432.58l.23,22.36s-22.66,7.75-23,11.89l43.38.45L412,433.07Z" style="fill: rgb(69, 90, 100); transform-origin: 389.775px 449.93px;" id="elvtv823b2joj" class="animable" /><g id="el0s68pthqj23"><g style="opacity: 0.6; transform-origin: 403.557px 454.966px;" class="animable" id="el0d7rhfmisw3b"><path d="M404,453.41a1.77,1.77,0,0,1,1.18,2,1.71,1.71,0,0,1-2,1.18,1.87,1.87,0,0,1-1.23-2.18,1.76,1.76,0,0,1,2.24-1" style="fill: rgb(255, 255, 255); transform-origin: 403.557px 454.966px;" id="el2q3i6kyl3zr" class="animable" /></g></g><g id="el98pizy3ldz"><g style="opacity: 0.6; transform-origin: 389.224px 465.85px;" class="animable" id="elzefmd9i5cxe"><path d="M410.91,467.28l0-2.86-41.59.25s-1.95.79-1.77,2.16Z" style="fill: rgb(255, 255, 255); transform-origin: 389.224px 465.85px;" id="els4tadnlar99" class="animable" /></g></g><path d="M389.85,454.71c0,.21,1.06.33,2.09,1s1.55,1.61,1.75,1.53-.09-1.31-1.34-2.14S389.81,454.51,389.85,454.71Z" style="fill: rgb(38, 50, 56); transform-origin: 391.798px 455.881px;" id="elx85kxlq4ebj" class="animable" /><path d="M385.25,456.47c-.05.21.86.59,1.55,1.5s.89,1.87,1.1,1.87.37-1.2-.51-2.32S385.26,456.27,385.25,456.47Z" style="fill: rgb(38, 50, 56); transform-origin: 386.656px 458.116px;" id="ele3xtipeet2d" class="animable" /><path d="M382.53,461.85c.19,0,.51-1,0-2.17s-1.49-1.66-1.59-1.49.5.81.91,1.78S382.32,461.83,382.53,461.85Z" style="fill: rgb(38, 50, 56); transform-origin: 381.867px 460.004px;" id="elcpxzcqufi5q" class="animable" /><path d="M390.37,449.6c.08.2,1.06-.07,2.25,0s2.12.52,2.24.34-.76-1-2.17-1.07S390.27,449.43,390.37,449.6Z" style="fill: rgb(38, 50, 56); transform-origin: 392.617px 449.423px;" id="el2v95rgtna4x" class="animable" /><g id="elljf5f7zd4pf"><g style="opacity: 0.3; transform-origin: 401.11px 439.175px;" class="animable" id="elqag6az1iuml"><polygon points="390.37 437.01 390.4 440.99 411.73 441.34 411.85 437.75 390.37 437.01" id="elnubqgurkm4" class="animable" style="transform-origin: 401.11px 439.175px;" /></g></g><path d="M390.4,445.09a4,4,0,0,0,2.17,0,9.71,9.71,0,0,0,2.3-.64,9.87,9.87,0,0,0,1.26-.63,2.63,2.63,0,0,0,.67-.49.94.94,0,0,0,.13-1.13,1.16,1.16,0,0,0-.92-.5,2.58,2.58,0,0,0-.82.09,7.2,7.2,0,0,0-1.36.43,7.58,7.58,0,0,0-2,1.26c-1,.91-1.39,1.69-1.32,1.73s.6-.58,1.64-1.32a8.61,8.61,0,0,1,2-1,7.73,7.73,0,0,1,1.26-.36c.46-.1.85-.1,1,.11s.05.11-.05.24a2.07,2.07,0,0,1-.49.36,11.15,11.15,0,0,1-1.17.63,11.59,11.59,0,0,1-2.12.75A14.74,14.74,0,0,0,390.4,445.09Z" style="fill: rgb(38, 50, 56); transform-origin: 393.731px 443.468px;" id="ell2331lhxh5e" class="animable" /><path d="M390.67,445.4a3.54,3.54,0,0,0,.63-2.08,7.18,7.18,0,0,0-.24-2.39,6.65,6.65,0,0,0-.52-1.33,1.8,1.8,0,0,0-1.36-1.14,1,1,0,0,0-.92.59,2.71,2.71,0,0,0-.24.79,4.5,4.5,0,0,0,0,1.46,5,5,0,0,0,.87,2.27c.82,1.14,1.7,1.42,1.71,1.35s-.65-.53-1.27-1.63a5.05,5.05,0,0,1-.64-2.06,4.44,4.44,0,0,1,.08-1.25c.08-.46.26-.83.43-.78s.57.36.74.73a8,8,0,0,1,.51,1.19,8.15,8.15,0,0,1,.37,2.18C390.8,444.58,390.56,445.36,390.67,445.4Z" style="fill: rgb(38, 50, 56); transform-origin: 389.639px 441.93px;" id="el1ckffmwsgvw" class="animable" /><path d="M425.67,267.36l-48.75,1.34,7,86.74,4.34,83.61,25.29.88c1.29-16.14,1.38-73.17,1.38-73.17L420,332.32c1.18-9.29,4.91-19.05,6.71-27.39,1.05-4.89,2.59-11.24,2.92-13.32C430.64,285.48,425.67,267.36,425.67,267.36Z" style="fill: rgb(38, 50, 56); transform-origin: 403.343px 353.645px;" id="elgkhow32ata6" class="animable" /><path d="M379.76,288.66a2.29,2.29,0,0,1,0,.39q0,.42,0,1.14c0,1-.1,2.5-.17,4.38s-.18,4.23-.26,6.93-.22,5.78-.28,9.18c-.19,6.8-.29,14.9-.25,23.9s.28,18.88.79,29.25,1.31,20.24,2.21,29.19c.49,4.47.92,8.72,1.46,12.69.26,2,.48,3.9.74,5.74s.53,3.6.78,5.28c.46,3.37,1,6.4,1.43,9.07s.84,5,1.2,6.83l.77,4.31c.08.48.15.85.19,1.12a2.33,2.33,0,0,1,0,.39,2.58,2.58,0,0,1-.1-.38c-.05-.27-.13-.64-.23-1.11-.21-1-.5-2.45-.87-4.3s-.83-4.15-1.28-6.82-1-5.69-1.51-9.06q-.39-2.52-.81-5.28c-.27-1.84-.5-3.76-.77-5.74-.56-4-1-8.22-1.51-12.7-.92-8.95-1.72-18.82-2.25-29.2s-.71-20.28-.75-29.28.13-17.11.36-23.91c.08-3.4.24-6.48.35-9.18s.23-5,.34-6.93.21-3.35.27-4.38c0-.48.06-.85.08-1.13A2.33,2.33,0,0,1,379.76,288.66Z" style="fill: rgb(69, 90, 100); transform-origin: 383.331px 363.555px;" id="eljewyf0dyno" class="animable" /><polygon points="352.01 172.66 339.53 159.33 329.69 166.22 339.53 180.78 352.01 172.66" style="fill: rgb(255, 211, 193); transform-origin: 340.85px 170.055px;" id="eluu70mr3t3v" class="animable" /><path d="M430.94,177.58l-.6-8.45-28.19-.4-.24,10.61s-13.84,15-18.87,31.75c-8.44,28.22-11.5,64.14-11.5,64.14h57.69c-.6-9.94-4.7-32.18-4.7-32.18l12.82-38.25C440.54,191.05,430.94,177.58,430.94,177.58Z" style="fill: #219EBC; transform-origin: 404.77px 221.98px;" id="elrfk99giydrn" class="animable" /><path d="M361.14,215.77s.16.16.48.43a12,12,0,0,0,1.47,1.14,15.11,15.11,0,0,0,6.32,2.43,15.49,15.49,0,0,0,4.7-.05c1.67-.19,3.46-.42,5.34-.67,3.77-.51,7.9-1.15,12.22-1.88l22.1-3.87,6.71-1.1,1.83-.29.63-.12-.64.08-1.83.25c-1.59.22-3.89.57-6.73,1-5.67.91-13.47,2.35-22.11,3.82-4.32.73-8.44,1.37-12.2,1.89-1.88.25-3.67.49-5.35.69a15.43,15.43,0,0,1-10.95-2.27,16.69,16.69,0,0,1-1.48-1.1C361.32,215.9,361.14,215.77,361.14,215.77Z" style="fill: rgb(38, 50, 56); transform-origin: 392.04px 215.858px;" id="elmorz1ts3uc" class="animable" /><path d="M432.72,202.14a.79.79,0,0,0,.06-.23c0-.2.09-.42.14-.65.11-.57.25-1.39.4-2.42a21.54,21.54,0,0,0-.21-8.05,11.25,11.25,0,0,0-4.49-6.58,7.47,7.47,0,0,0-2.23-1,5,5,0,0,0-.88-.17,9.32,9.32,0,0,1,3,1.31,11.32,11.32,0,0,1,4.36,6.5,22.19,22.19,0,0,1,.26,8c-.12,1-.24,1.85-.33,2.42q0,.36-.09.66A.86.86,0,0,0,432.72,202.14Z" style="fill: rgb(38, 50, 56); transform-origin: 429.556px 192.59px;" id="elf3b4rztuyv" class="animable" /><path d="M372.71,209a4.18,4.18,0,0,0,0-.63l-.16-1.72a54.94,54.94,0,0,1-.17-5.67,55.6,55.6,0,0,1,.45-5.66c.09-.61.17-1.17.25-1.7a4.07,4.07,0,0,0,.07-.63,4.78,4.78,0,0,0-.16.61c-.09.4-.2,1-.31,1.7a43.31,43.31,0,0,0-.29,11.37c.08.72.16,1.31.23,1.71A3.13,3.13,0,0,0,372.71,209Z" style="fill: rgb(38, 50, 56); transform-origin: 372.648px 200.995px;" id="eldjnnyeli6gq" class="animable" /><path d="M402.24,179.18a18,18,0,0,1,3.08-5.39c2-2.73,4.2-5.59,7.35-6.88,2.14-.87,7.67-.39,9.15-2.17,4.6-5.58-2.14-9,.3-16.71,2.69-8.39,1.3-7.1,1.51-13.71l10.21-4.41c1.61,1.2,6.07,5.53,5.58,7.48a11.64,11.64,0,0,0,.39,6.42c1.57,4.93,7,7.83,9.56,12.32s-.34,10.69-.41,16,1.93,11.66,7.1,12.81a20,20,0,0,1-9.06,9l-3.24-4.41a8.64,8.64,0,0,1-6,9.35c-1.09-4.65-2.23-9.43-5.05-13.29S425,179,420.39,180.24c-3.09.82-5.47,3.2-8.23,4.81s-6.66,2.3-8.86,0A6.06,6.06,0,0,1,402.24,179.18Z" style="fill: rgb(38, 50, 56); transform-origin: 428.981px 164.395px;" id="elfik451w7ru" class="animable" /><g id="elldrs0oadmxh"><g style="opacity: 0.3; transform-origin: 406.371px 214.452px;" class="animable" id="el0etnx6ald4z9"><path d="M383,218.38c13.3-2.42,31-5.32,44.3-7.75a2.73,2.73,0,0,1,1.5,0,1.82,1.82,0,0,1,.74,2.43,4.39,4.39,0,0,1-2.08,1.86c-4.37,2.28-9.48,2.47-14.4,2.6l-30.06.85Z" id="elxtv2lb33z2n" class="animable" style="transform-origin: 406.371px 214.452px;" /></g></g><path d="M373.33,219.71c4.14.08,51.74-8.62,51.74-8.62" style="fill: #219EBC; transform-origin: 399.2px 215.4px;" id="elnorhgj9luvd" class="animable" /><path d="M424.26,181.37c3.49.43,5.76,1,9.84,5.4a8.6,8.6,0,0,1,1.21,1.71c4.54,8,1.26,19-7.44,22.05l-8.42,1.73-46.12,7.45s-9.82,2.2-18.26-10.89c-3.09-4.81-24.4-36.59-24.4-36.59l14-9.37,28.22,30.19Z" style="fill: #219EBC; transform-origin: 384.01px 191.355px;" id="eluldsmgyxan8" class="animable" /><path d="M361.14,215.77s.16.16.48.43a12,12,0,0,0,1.47,1.14,15.11,15.11,0,0,0,6.32,2.43,15.49,15.49,0,0,0,4.7-.05c1.67-.19,3.46-.42,5.34-.67,3.77-.51,7.9-1.15,12.22-1.88l22.1-3.87,6.71-1.1,1.83-.29.63-.12-.64.08-1.83.25c-1.59.22-3.89.57-6.73,1-5.67.91-13.47,2.35-22.11,3.82-4.32.73-8.44,1.37-12.2,1.89-1.88.25-3.67.49-5.35.69a15.43,15.43,0,0,1-10.95-2.27,16.69,16.69,0,0,1-1.48-1.1C361.32,215.9,361.14,215.77,361.14,215.77Z" style="fill: rgb(38, 50, 56); transform-origin: 392.04px 215.858px;" id="elj5vflojhlu" class="animable" /><path d="M432.72,202.14a.79.79,0,0,0,.06-.23c0-.2.09-.42.14-.65.11-.57.25-1.39.4-2.42a21.54,21.54,0,0,0-.21-8.05,11.25,11.25,0,0,0-4.49-6.58,7.47,7.47,0,0,0-2.23-1,5,5,0,0,0-.88-.17,9.32,9.32,0,0,1,3,1.31,11.32,11.32,0,0,1,4.36,6.5,22.19,22.19,0,0,1,.26,8c-.12,1-.24,1.85-.33,2.42q0,.36-.09.66A.86.86,0,0,0,432.72,202.14Z" style="fill: rgb(38, 50, 56); transform-origin: 429.556px 192.59px;" id="elrmloyer7a2" class="animable" /><path d="M372.71,209a4.18,4.18,0,0,0,0-.63l-.16-1.72a54.94,54.94,0,0,1-.17-5.67,55.6,55.6,0,0,1,.45-5.66c.09-.61.17-1.17.25-1.7a4.07,4.07,0,0,0,.07-.63,4.78,4.78,0,0,0-.16.61c-.09.4-.2,1-.31,1.7a43.31,43.31,0,0,0-.29,11.37c.08.72.16,1.31.23,1.71A3.13,3.13,0,0,0,372.71,209Z" style="fill: rgb(38, 50, 56); transform-origin: 372.648px 200.995px;" id="el1uub5lm6bk1" class="animable" /><path d="M339.47,149a28.7,28.7,0,0,1-.26-5.74.65.65,0,0,0-.73-.71,3.08,3.08,0,0,0-2.57,2.24,8.28,8.28,0,0,0-.29,3.23c0,1.78,0,3.19,0,3.19s-8.88-10.63-10.68-11.11a1.25,1.25,0,0,0-1.68.6c-.33.53.33,1.77.33,1.77l5,7.16s-7.57-8.9-8.94-8.88-2,1-1.11,2.65c.65,1.21,7.26,9,7.26,9s-7.07-6.82-8.48-6.77-1.17,1.55-.43,2.17,6,6.71,6,6.71-5.11-4.32-6.14-4-.59,1.48-.05,2.41,13.36,13.74,13.36,13.74l11.12-5.58h0a10.81,10.81,0,0,0-.17-4.7A58.43,58.43,0,0,1,339.47,149Z" style="fill: rgb(255, 211, 193); transform-origin: 328.744px 153.317px;" id="elhprks5cww3f" class="animable" /></g><g id="freepik--Folder--inject-2" class="animable animator-active" style="transform-origin: 241.435px 215.045px;"><path d="M176.19,275.31A10.23,10.23,0,0,1,166,265.08V176.14a8.49,8.49,0,0,1,8.75-8.19h8.36a8.81,8.81,0,0,0,8-4.76l1.79-3.65a8.81,8.81,0,0,1,7.95-4.76h39.69a8.89,8.89,0,0,1,7.54,4l1.95,3.09a8.88,8.88,0,0,0,7.53,4h50.6a8.48,8.48,0,0,1,8.75,8.2v91a10.23,10.23,0,0,1-10.23,10.23Z" style="fill: #219EBC; transform-origin: 241.455px 215.045px;" id="el0flhae1hsv6r" class="animable" /><g id="elnooukhlkhw"><g style="opacity: 0.3; transform-origin: 241.455px 215.045px;" class="animable" id="el8abfrf9scnk"><path d="M176.19,275.31A10.23,10.23,0,0,1,166,265.08V176.14a8.49,8.49,0,0,1,8.75-8.19h8.36a8.81,8.81,0,0,0,8-4.76l1.79-3.65a8.81,8.81,0,0,1,7.95-4.76h39.69a8.89,8.89,0,0,1,7.54,4l1.95,3.09a8.88,8.88,0,0,0,7.53,4h50.6a8.48,8.48,0,0,1,8.75,8.2v91a10.23,10.23,0,0,1-10.23,10.23Z" id="elgy82qx72p9a" class="animable" style="transform-origin: 241.455px 215.045px;" /></g></g><path d="M252.48,165.92l-32.2-.07-2.87-5.38a11.11,11.11,0,0,0-9.84-5.69H176.1c-5.6,0-10.14,4.25-10.14,9.5V264.52c0,6,5.16,10.79,11.52,10.79H305.3c6.37,0,11.52-4.83,11.52-10.79V173.29a7.37,7.37,0,0,0-7.37-7.37Z" style="fill: #219EBC; transform-origin: 241.39px 215.045px;" id="el4iwnppkr6lp" class="animable" /><path d="M268.71,241.88H254.46a1,1,0,0,1,0-2h14.25a14.17,14.17,0,0,0,.78-28.32,1,1,0,0,1-.92-.75A22.64,22.64,0,0,0,229,202.31a1,1,0,0,1-.91.37,17,17,0,0,0-2.16-.14,18.67,18.67,0,0,0,0,37.33h11.55a1,1,0,1,1,0,2H225.88a20.68,20.68,0,1,1,0-41.36,17.12,17.12,0,0,1,1.84.1,24.66,24.66,0,0,1,42.61,9,16.18,16.18,0,0,1-1.62,32.29Z" style="fill: rgb(255, 255, 255); transform-origin: 245.106px 216.837px;" id="elcs8gjgaa19u" class="animable" /><path d="M245.67,251a1,1,0,0,1-1-1V224a1,1,0,1,1,2,0v26A1,1,0,0,1,245.67,251Z" style="fill: rgb(255, 255, 255); transform-origin: 245.67px 237px;" id="el529mhz8lay" class="animable" /><path d="M253.27,234.35a1,1,0,0,1-.81-.4l-6.62-8.88a.25.25,0,0,0-.2-.09.26.26,0,0,0-.19.09l-7,8.63a1,1,0,1,1-1.57-1.27l7-8.63a2.34,2.34,0,0,1,1.8-.84,2.25,2.25,0,0,1,1.76.89l6.64,8.89a1,1,0,0,1-.21,1.41A1,1,0,0,1,253.27,234.35Z" style="fill: rgb(255, 255, 255); transform-origin: 245.467px 228.655px;" id="el2piw1g9qox6" class="animable" /></g><g id="freepik--Progress--inject-2" class="animable" style="transform-origin: 243.911px 309.87px;"><path d="M226.16,296.38V291.9H227v4.45c0,1.86.87,2.71,2.39,2.71s2.4-.85,2.4-2.71V291.9h.81v4.48c0,2.25-1.21,3.41-3.21,3.41S226.16,298.63,226.16,296.38Z" style="fill: rgb(38, 50, 56); transform-origin: 229.38px 295.845px;" id="eltyjpx580zj8" class="animable" /><path d="M240.87,296.79a2.84,2.84,0,0,1-2.93,3,2.58,2.58,0,0,1-2.24-1.16v3.28h-.79v-8h.76V295a2.57,2.57,0,0,1,2.27-1.21A2.85,2.85,0,0,1,240.87,296.79Zm-.79,0a2.2,2.2,0,1,0-2.2,2.29A2.17,2.17,0,0,0,240.08,296.79Z" style="fill: rgb(38, 50, 56); transform-origin: 237.892px 297.849px;" id="elr22dfa9qoyk" class="animable" /><path d="M242.49,291.43h.79v8.3h-.79Z" style="fill: rgb(38, 50, 56); transform-origin: 242.885px 295.58px;" id="el2silj731cs4" class="animable" /><path d="M244.9,296.79a3,3,0,1,1,3,3A2.9,2.9,0,0,1,244.9,296.79Zm5.18,0a2.19,2.19,0,1,0-2.18,2.29A2.15,2.15,0,0,0,250.08,296.79Z" style="fill: rgb(38, 50, 56); transform-origin: 247.899px 296.791px;" id="elnszjku4422" class="animable" /><path d="M256.91,296.08v3.65h-.76v-.92a2.22,2.22,0,0,1-2,1c-1.33,0-2.14-.69-2.14-1.71s.58-1.66,2.27-1.66h1.86v-.36c0-1-.57-1.56-1.66-1.56a3,3,0,0,0-2,.7l-.36-.6a3.77,3.77,0,0,1,2.39-.79A2.09,2.09,0,0,1,256.91,296.08Zm-.8,1.88v-1h-1.84c-1.14,0-1.51.45-1.51,1.05s.55,1.11,1.49,1.11A1.88,1.88,0,0,0,256.11,298Z" style="fill: rgb(38, 50, 56); transform-origin: 254.464px 296.81px;" id="elzxqq5jlemw" class="animable" /><path d="M264.45,291.43v8.3h-.76v-1.17a2.54,2.54,0,0,1-2.27,1.22,3,3,0,0,1,0-6,2.57,2.57,0,0,1,2.24,1.16v-3.53Zm-.78,5.36a2.19,2.19,0,1,0-2.18,2.29A2.16,2.16,0,0,0,263.67,296.79Z" style="fill: rgb(38, 50, 56); transform-origin: 261.435px 295.596px;" id="elwtn2l5rjkvn" class="animable" /><path d="M266.15,299.17a.59.59,0,0,1,.59-.61.6.6,0,0,1,.6.61.61.61,0,0,1-.6.61A.6.6,0,0,1,266.15,299.17Z" style="fill: rgb(38, 50, 56); transform-origin: 266.745px 299.17px;" id="eltkg8hphcnqm" class="animable" /><path d="M268.52,299.17a.6.6,0,0,1,.59-.61.6.6,0,0,1,.6.61.61.61,0,0,1-.6.61A.6.6,0,0,1,268.52,299.17Z" style="fill: rgb(38, 50, 56); transform-origin: 269.115px 299.17px;" id="el1tmdyqnsi63" class="animable" /><path d="M270.89,299.17a.59.59,0,0,1,.59-.61.6.6,0,0,1,.6.61.61.61,0,0,1-.6.61A.6.6,0,0,1,270.89,299.17Z" style="fill: rgb(38, 50, 56); transform-origin: 271.485px 299.17px;" id="elo396s7rotza" class="animable" /><rect x="159.22" y="313.11" width="169.22" height="15.19" rx="6.63" style="fill: rgb(224, 224, 224); transform-origin: 243.83px 320.705px;" id="eli60gti04s2" class="animable" /><rect x="159.22" y="313.11" width="84.61" height="15.19" rx="6.63" style="fill: #219EBC; transform-origin: 201.525px 320.705px;" id="elefgydvo2u86" class="animable" /><g id="elxavqnc9pax"><g style="opacity: 0.3; transform-origin: 170.66px 320.705px;" class="animable" id="el32apuzzdmg7"><path d="M172,313.11l-9,14.29,1.41.63a3.08,3.08,0,0,0,1.27.27h2.86l9.78-15.19Z" style="fill: rgb(255, 255, 255); transform-origin: 170.66px 320.705px;" id="elythske5940n" class="animable" /></g></g><g id="el1wc1pcg21p7"><g style="opacity: 0.3; transform-origin: 186.47px 320.705px;" class="animable" id="elfecod45nitu"><polygon points="188.1 313.11 178.53 328.3 184.64 328.3 194.41 313.11 188.1 313.11" style="fill: rgb(255, 255, 255); transform-origin: 186.47px 320.705px;" id="elc5gkds1xiwe" class="animable" /></g></g><g id="ellfqr14qknm"><g style="opacity: 0.3; transform-origin: 202.565px 320.705px;" class="animable" id="el5iqms03berr"><polygon points="204.19 313.11 194.62 328.3 200.73 328.3 210.51 313.11 204.19 313.11" style="fill: rgb(255, 255, 255); transform-origin: 202.565px 320.705px;" id="elluvs9xk060k" class="animable" /></g></g><g id="elo5eprriuema"><g style="opacity: 0.3; transform-origin: 218.655px 320.705px;" class="animable" id="el1ctjexv1e22"><polygon points="220.29 313.11 210.71 328.3 216.82 328.3 226.6 313.11 220.29 313.11" style="fill: rgb(255, 255, 255); transform-origin: 218.655px 320.705px;" id="eleln4ewvprbw" class="animable" /></g></g><g id="el3bun5tfqiue"><g style="opacity: 0.3; transform-origin: 234.175px 320.705px;" class="animable" id="el998j6sttanv"><path d="M236.38,313.11l-9.57,15.19h6.11l7.7-12,.92-1.3C240.36,313.73,238.55,313.2,236.38,313.11Z" style="fill: rgb(255, 255, 255); transform-origin: 234.175px 320.705px;" id="elom9aud9063i" class="animable" /></g></g><path d="M322,328.3s.31,0,.91-.1a6.37,6.37,0,0,0,2.51-.91,6.6,6.6,0,0,0,2.73-3.3,6.94,6.94,0,0,0,.44-2.72,11.77,11.77,0,0,0-.24-3.15,6.56,6.56,0,0,0-5.14-4.77,11.78,11.78,0,0,0-2.08-.11h-6.84l-21.82,0-126.32.07a6.44,6.44,0,0,0-6.31,5.18,11.54,11.54,0,0,0-.12,2.22,10,10,0,0,0,.15,2.21A6.41,6.41,0,0,0,166,328H179.3l33.54,0,56.79.06,38.29.08,10.41.05,2.71,0,.92,0-.92,0-2.71,0-10.41,0-38.29.09-56.79.05-33.54,0H166a6.94,6.94,0,0,1-6.72-5.47,10.15,10.15,0,0,1-.16-2.32,11.41,11.41,0,0,1,.13-2.32,6.94,6.94,0,0,1,6.82-5.6l126.32.08,21.82,0h6.84a10.79,10.79,0,0,1,2.13.13,6.78,6.78,0,0,1,5.29,4.95,12.34,12.34,0,0,1,.22,3.21,7.32,7.32,0,0,1-.47,2.78,6.77,6.77,0,0,1-2.82,3.33,6.54,6.54,0,0,1-2.56.88A4.9,4.9,0,0,1,322,328.3Z" style="fill: rgb(38, 50, 56); transform-origin: 243.911px 320.475px;" id="elzkey2m3z33n" class="animable" /></g><defs>     <filter id="active" height="200%">         <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2" />                <feFlood flood-color="#32DFEC" flood-opacity="1" result="PINK" />        <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE" />        <feMerge>            <feMergeNode in="OUTLINE" />            <feMergeNode in="SourceGraphic" />        </feMerge>    </filter>    <filter id="hover" height="200%">        <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2" />                <feFlood flood-color="#ff0000" flood-opacity="0.5" result="PINK" />        <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE" />        <feMerge>            <feMergeNode in="OUTLINE" />            <feMergeNode in="SourceGraphic" />        </feMerge>            <feColorMatrix type="matrix" values="0   0   0   0   0                0   1   0   0   0                0   0   0   0   0                0   0   0   1   0 " />    </filter></defs></svg>
                    </div>

                  </div>
                  <a class="display-flex justify-center fs-8 pos-absolute" style="bottom:-10px" href="https://storyset.com/user">User illustrations by Storyset</a>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-t-5 display-flex  flex-column">
                  <div class="m-b-10">
                    <div class="fw-600 fs-1rem p-b-10"  onChange={(e)=>handleNotokayImg(e)}>
                      <label>Image for Not Ok Item </label>
                      <input type="file" accept='.png, .jpg, .jpeg, .webm' id='uploadNotokayInput' />
                    </div>
                    <div class="fw-600 fs-1rem p-b-10 display-flex flex-wrap" id='preview123' />
                  </div>
                  <div style="margin-top: 5px;" onClick={() => handleNotokayBtn()}>
                    <a class="w-full full-width-button" style="font-size: 1rem;" >
                        Save
                    </a>
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

export default ChecklistComponent;
