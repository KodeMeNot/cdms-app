import { h, Component } from 'preact';
import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import CONSTANTS from '../../lib/constants';
import ChatComment from "../../components/chatComment";

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';




const TaskCommentsModal = (props) => {
  let iconClass = 'primary';
  let [notificationList, setNotificationList] = useState([]);
  let [editorImages, setEditorImages] = useState([]);
  let [editorText, setEditorText] = useState("");



  useEffect(async () => {
    await getNotification();
  }, []);


  async function getNotification() {
    let notificationResponse = await axios.get(`${CONSTANTS.API_URL}/api/v1/notification?sortBy=createdAt&pageSize=10&pageNo=1`);
    await setNotificationList(notificationResponse.data);
  }

  function viewAllImages(e) {
    // modified by Vihang
    // modified at 16/05/2022
    // modification : remove rotate and flip options from image viewer

    let options = {
      rotatable:false,
      scalable:false
    };
    let imageId = e.target.id;
    const gallery = new Viewer(document.getElementById(imageId), options);
    gallery.show();
  }
  async function handleEditorComment(comment,img) {
    await setEditorText(comment);
    await setEditorImages(img);
    document.getElementById("editorText").innerHTML = await comment;
    // let payload = {
    //   comment,
    //   typeOfComment: 'message',
    //   taskID: props.currentRow ? props.currentRow.uuid : '',
    //   commentByID: userInfo ? userInfo.uuid : '',
    //   commentByName: userInfo ? userInfo.displayName : ''

    // };
    // await axios.post(`${CONSTANTS.API_URL}/api/v1/comment`, payload)
    //   .then((res) => {
    //     console.log(res);
    //     axios.get(`${CONSTANTS.API_URL}/api/v1/comment?taskID=${props.currentRow.uuid}`)
    //       .then((res) => {
    //         console.log(res.data);
    //         setTaskComment(res.data);
    //       });
    //   });
  }



  return (
    <div class="profilemodalslide">
      <div class="profile-modal-container pos-relative" style='overflow: hidden; background: white'>
        <div class="profile-modal">
          <div class="profile-header-container">
            <div class="profile-header">
              <div class="profile-left-header-container">
                <span class="profile-left-header-text p-t-5 font-bold fs-20 text-408b8b" style="height: fit-content;">
                  Comments
                </span>
              </div>
            </div>
          </div>
          <div class="profile-content-container" style='overflow: hidden'>

            <div>
              <div class="" style="height: calc( 100vh - 100px ); position:relative" >
                <div class="display-flex m-t-10" style="height: calc( 100vh - 200px ); overflow: auto;" >
                  <div class="p-r-15 p-t-10 p-b-20 w-full">
                    <div class="display-flex m-t-10">
                      <div class="display-flex imgBox w-full">
                        <div class="round_icons m-t-5 m-l-5 ">
                          <p class="fs-10">RD</p>
                        </div>
                        <div class="display-flex flex-direction-column w-full">
                          <p class="m-l-5">Vihang</p>
                          <div class="display-flex align-center w-full">
                            <div class="m-l-5 w-half">
                              <img
                                id="image1"
                                class="galleryImages cursor-pointer w-full"
                                width="200"
                                height="130"
                                src="../assets/images/Hyundai-Verna.jpg"
                                onClick={(e)=> viewAllImages(e)}
                                style="border-radius:8px;object-fit:cover"
                              />
                            </div>
                            <div class=" m-l-5 w-half">
                              <img
                                id="image2"
                                class="galleryImages cursor-pointer w-full"
                                width="200"
                                height="130"
                                src="../assets/images/common_bg.jpg"
                                onClick={(e)=> viewAllImages(e)}
                                style="border-radius:8px;object-fit:cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="display-flex m-t-10">
                        <div class="round_icons m-t-5 m-l-5 ">
                          <p class="fs-10">RD</p>
                        </div>
                        <div class="m-l-5" style="font-size:1em;">
                          <p>
                      Rutuja
                            <span class="p-l-20 fs-12">1 hour ago</span>
                          </p>
                          <p>
                            <a>@Yashvi</a> Whats the status on quiz functionality?
                          </p>
                        </div>
                      </div>
                      <div class="display-flex m-t-10">
                        <div class="round_icons m-t-5 m-l-5 ">
                          <p class="fs-10">RD</p>
                        </div>
                        <div class="m-l-5" style="font-size:1em;">
                          <p>
                      Rutuja
                            <span class="p-l-20 fs-12">1 hour ago</span>
                          </p>
                          <p>
                            <a>@Yashvi</a> Whats the status on quiz functionality?
                          </p>
                        </div>
                      </div>
                      <div class="display-flex m-t-10">
                        <div class="round_icons m-t-5 m-l-5 ">
                          <p class="fs-10">YD</p>
                        </div>
                        <div class="m-l-5" style="font-size:1em;">
                          <p>
                      Yashvi
                            <span class="p-l-20 fs-12">45 mins ago</span>
                          </p>
                          <p>
                            <a>@Rutuja</a> Work in Progress
                          </p>
                        </div>
                      </div>
                      <div class="display-flex m-t-10">
                        <div class="round_icons m-t-5 m-l-5 ">
                          <p class="fs-10">RD</p>
                        </div>
                        <div class="m-l-5" style="font-size:1em;">
                          <p>
                      Rutuja
                            <span class="p-l-20 fs-12">15 mins ago</span>
                          </p>
                          <p>
                            <a>@YashvI</a> Okay, let me know if you have any doubt
                          </p>
                        </div>
                      </div>
                      {(editorText !== "" || editorImages.length) > 0 && (
                        <div class="display-flex m-t-10">
                          <div class="round_icons m-t-5 m-l-5 ">
                            <p class="fs-10">VK</p>
                          </div>
                          <div class="display-flex flex-direction-column">
                            <p class="m-l-5">
                      Vihang
                              <span class="p-l-20 fs-12">1 hour ago</span>
                            </p>
                            <div id="editorText" class="m-l-5" />
                            <div class ="row">
                              <div class="col-lg-3">
                                {editorImages.length > 0 &&
                              editorImages.map((img,index) => (
                                <img
                                  id={"image" + index}
                                  class="cursor-pointer"
                                  width="200"
                                  height="200"
                                  src={"../assets/images/" + img}
                                  onClick={(e) => viewAllImages(e)}
                                />
                              ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row" style="height:96px; position:absolute; width: 100%; bottom:0">
                  <div class="col-xs-12 col-md-12 col-sm-12 col-lg-12 p-l-0 p-r-0 pos-relative">
                    <ChatComment onHandleEditorComment={(comment,img) => handleEditorComment(comment,img)}/>
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

export default TaskCommentsModal;
