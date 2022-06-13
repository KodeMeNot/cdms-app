export const WorkspaceSubCard = (props) => {

  function changeActiveSubTabCard(tabName) {
    props.setTaskData(tabName);
  }
  return (
    <div class={`subfilterCard p-l-5 cursor-pointer ${props.activeFilter === props.activeFilterTab ? 'subfilterCardActive' : ''}`}
      onClick={e => changeActiveSubTabCard(props.activeFilterTab)} style={`height${props.height};`}>
      <div class="display-flex align-center">
        <p id={props.countId} class="fs-2rem subfilterCard-count">
          {props.cardCount}
        </p>
        <p class="fs-10 m-l-5 subfilterCard-header">{props.cardText}</p>
      </div>
    </div>
  );
};
