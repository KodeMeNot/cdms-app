import Icons from "../icons";

{/*
        modified by Vihang
        modified at 17/05/2022
        modification : removed animation for task logs notification
  */}
export const TaskLogs = (props) => {
  return (
    <div class="display-flex p-t-10 p-b-10" style="align-items: center;border-top: 0.5px solid #dfebf0">
      <Icons userDisplayName={props.profileIcon} title={props.profileIcon} classes={`${props.iconClass} fs-10 m-0`}/>
      <div class="display-flex flex-direction-column">
        <div class="display-flex m-l-5 m-b-5" style="align-items:center">
          {props.statusIcon}
          <p class="m-l-5 fs-12" style={`font-weight: 600;color:${props.statusTextColor}`}>{props.statusText}</p>
        </div>
        <p class="m-l-10 fs-12" style="font-size:12px"><b>{props.assigneeName}</b> {props.notificationText}</p>
        <p class="m-l-10" style="font-size:10px">{props.notificationTime}</p>
      </div>
    </div>
  );
};
