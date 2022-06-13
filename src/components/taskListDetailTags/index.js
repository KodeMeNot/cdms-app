import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { formatDateTime } from '../../lib/utils';
import { getItem } from '../../lib/myStore';
import TaskLogModal from "../taskLogModal";
import TaskCommentsModal from "../taskCommentsModal";
import { Modal, ModalBody } from '../rightDrawer';

const TaskListDetailTags = (props) => {
  let userInfo = getItem('userinfo');
  let [userDisplayName, setUserDisplayName] = useState(userInfo.displayName);
  let [userBranchName, setUserBranchName] = useState(userInfo.userBranchName ? userInfo.userBranchName : '');
  let [progress, setProgress] = useState(0);
  let [currentTask, setCurrentTask] = useState({});
  let [isTaskLogsModalOpen, setTaskLogsModalVisibility] = useState(false);
  let [isTaskCommentsModalOpen, setTaskCommentsModalVisibility] = useState(false);


  useEffect(() => {
    setCurrentTask(props.currentRow);
  },[props]);

  function TaskLogModalVisibility(e) {
    e.preventDefault();
    setTaskLogsModalVisibility(true);
  }
  function closeTaskLogsModal(e) {
    e.preventDefault();
    setTaskLogsModalVisibility(false);
  }

  function TaskCommentsModalVisibility(e) {
    e.preventDefault();
    setTaskCommentsModalVisibility(true);
  }
  function closeTaskCommentsModal(e) {
    e.preventDefault();
    setTaskCommentsModalVisibility(false);
  }

  {/*
          modified by Vihang
          modified at 04/05/2022
          modification : responsive changes for task list detail tags components
    */}
  {/*
            modified by Vihang
            modified at 17/05/2022
            modification : loading issue for creation date tag solved
      */}

  {/*
              modified by Vihang
              modified at 17/05/2022
              modification : receiver name added for calls workspace
        */}
  return (
    <div class="display-flex">
      {currentTask.createdAt &&
        <div>
          <p class="fs-10">Creation Date</p>
          <div class="xs-hide task-list-tags m-l-0 display-flex flex-direction-column p-l-10 p-r-10" >
            <div class="text fs-14 first-letter-capital task-list-tags-text">
              {formatDateTime(currentTask.createdAt)}
            </div>
          </div>
        </div>
      }
      {currentTask.callid &&
        <div>
          <p class="fs-10">Due Date</p>
          <div class="xs-hide task-list-tags m-l-0 display-flex flex-direction-column p-l-10 p-r-10" >
            <div class="text fs-14 first-letter-capital task-list-tags-text">
              {currentTask.callid}
            </div>
          </div>
        </div>
      }
      {currentTask.callid &&
        <div>
          <p class="fs-10">Due Date</p>
          <div class="xs-hide task-list-tags m-l-0 display-flex flex-direction-column p-l-10 p-r-10" >
            <div class="text fs-14 first-letter-capital task-list-tags-text">
              {currentTask.callid}
            </div>
          </div>
        </div>
      }
      {currentTask.dueDate &&
        <div>
          <p class="fs-10">Due Date</p>
          <div class="xs-hide task-list-tags m-l-0 display-flex flex-direction-column p-l-10 p-r-10" >
            <div class="text fs-14 first-letter-capital task-list-tags-text">
              {formatDateTime(currentTask.dueDate)}
            </div>
          </div>
        </div>
      }
      {currentTask.assignedUser &&
        <div>
          <p class="fs-10">Assignee</p>
          <div class="xs-hide task-list-tags m-l-0 display-flex flex-direction-column p-l-10 p-r-10" >
            <div class="text fs-14 first-letter-capital task-list-tags-text">
              {currentTask.assignedUser ? currentTask.assignedUser : ''}
            </div>
          </div>
        </div>
      }
      { props.typeOfWorkspace === "callsWorkspace" && currentTask.receiverName &&
        <div>
          <p class="fs-10">Assignee</p>
          <div class="xs-hide task-list-tags m-l-0 display-flex flex-direction-column p-l-10 p-r-10" >
            <div class="text fs-14 first-letter-capital task-list-tags-text">
              {currentTask.receiverName ? currentTask.receiverName : ''}
            </div>
          </div>
        </div>
      }
      {currentTask.userName &&
        <div>
          <p class="fs-10">Assignee</p>
          <div class="xs-hide task-list-tags m-l-0 display-flex flex-direction-column p-l-10 p-r-10" >
            <div class="text fs-14 first-letter-capital task-list-tags-text">
              {currentTask.userName ? currentTask.userName : ''}
            </div>
          </div>
        </div>
      }
      {
        (( props.totalTaskCheckListItemsProgress !== 0) && currentTask.status) && (
          <div class="display-flex flex-direction-column">
            <div>
              <p class="fs-10">Status</p>
              <div class="xs-hide task-list-tags m-l-0 display-flex flex-direction-column p-l-10 p-r-10" >
                <div class="text fs-14 first-letter-capital task-list-tags-text">
                  {currentTask.status }
                </div>
              </div>
            </div>
          </div>
        )
      }
      {/*modified by Vihang
       modifield on 16/05/2022
       modification: view history and view message tags changed to buttons
    */}
      {/*modified by Vihang
     modifield on 18/05/2022
     modification: actions buttons for all the pages
  */}

      {
        props.typeOfWorkspace && (
          <div class="is-hide-mobile m-r-15" style='position: absolute;right: 5px;'>
            <div>
              <p class="fs-10">Actions</p>
              <div class="display-flex align-center">
                <button class="primary-button display-flex align-center min-w-fit-content" title='View History' onClick={(e) => TaskLogModalVisibility(e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="24" width="24"><path d="M12.95 21Q11.25 21 9.637 20.363Q8.025 19.725 6.7 18.4L8.1 17Q9.125 17.975 10.4 18.488Q11.675 19 13 19Q15.9 19 17.95 16.95Q20 14.9 20 12Q20 9.1 17.95 7.05Q15.9 5 13 5Q10.125 5 8.062 7.012Q6 9.025 6 12.2L7.85 10.35L9.25 11.75L5 16L0.75 11.75L2.2 10.35L4 12.2Q4 10.25 4.7 8.562Q5.4 6.875 6.625 5.637Q7.85 4.4 9.488 3.7Q11.125 3 13 3Q14.85 3 16.488 3.712Q18.125 4.425 19.35 5.65Q20.575 6.875 21.288 8.512Q22 10.15 22 12Q22 13.85 21.288 15.488Q20.575 17.125 19.35 18.35Q18.125 19.575 16.475 20.288Q14.825 21 12.95 21ZM15.8 16.2 12 12.4V7H14V11.6L17.2 14.8Z"/></svg>
                </button>
                <button class="primary-button display-flex align-center min-w-fit-content m-l-5" title='View Messages' onClick={(e) => TaskCommentsModalVisibility(e)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="24" width="24"><path d="M6 14H18V12H6ZM6 11H18V9H6ZM6 8H18V6H6ZM22 22 18 18H4Q3.175 18 2.588 17.413Q2 16.825 2 16V4Q2 3.175 2.588 2.587Q3.175 2 4 2H20Q20.825 2 21.413 2.587Q22 3.175 22 4ZM4 4V16Q4 16 4 16Q4 16 4 16H18.825L20 17.175V4Q20 4 20 4Q20 4 20 4H4Q4 4 4 4Q4 4 4 4ZM4 4V17.175V16Q4 16 4 16Q4 16 4 16V4Q4 4 4 4Q4 4 4 4Q4 4 4 4Q4 4 4 4Z"/></svg>
                </button>
              </div>
            </div>
          </div>
        )
      }


      <div class="visitmodalslide">
        <Modal title="View History" modalSize="is-small-right" isProfileModal
          modalDisplay={(isTaskLogsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => closeTaskLogsModal(e)} >
          {
            isTaskLogsModalOpen && (
              <TaskLogModal open={isTaskLogsModalOpen} onClose={(e) => closeTaskLogsModal(e)} />
            )
          }
        </Modal>
      </div>
      <div class="visitmodalslide">
        <Modal title="View Comments" modalSize="is-small-right" isProfileModal
          modalDisplay={(isTaskCommentsModalOpen ? 'show-modal' : 'hide-modal')} onClose={(e) => closeTaskCommentsModal(e)} >
          {
            isTaskCommentsModalOpen && (
              <TaskCommentsModal open={isTaskCommentsModalOpen} onClose={(e) => closeTaskCommentsModal(e)} />
            )
          }
        </Modal>
      </div>
    </div>
  );
};

export default TaskListDetailTags;
