export const WorkspaceCard = (props) => {

  function changeActiveTabCard(tabName) {
    props.changeActiveTab(tabName);
    props.setTaskData ? props.setTaskData(tabName): null;
    props.callTask ? props.setCallTask(tabName) : null;
  }

  return (
    <div class={`newWorkSpaceCard pos-relative ${props.activePageTabItem === props.activeTab ? 'listCardActive' : ''}`} onClick={() => changeActiveTabCard(props.activeTab)}
      // style={`background:${props.cardBgColor};`}
    >
      <div class="display-flex align-center h-full">
        <div class="p-5 pos-relative display-flex flex-direction-column h-full">
          <span class="newWorkSpaceCard-header">{props.cardText}</span>
          <span id={props.countId} class="newWorkSpaceCard-count">
            {props.cardCount}
          </span>
        </div>
        <span class="newWorkSpaceCard-icon">
          {props.cardIcon}
        </span>
      </div>
    </div>
  );
};
