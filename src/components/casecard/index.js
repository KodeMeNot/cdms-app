// modified by Vihang
// modifield on 18/02/2022
// modfication:created new case card component

export const CaseCard = (props) => {
  return (
    <div class="card pos-relative" style={`min-height:140px;background:${props.bgColor};color:#fff`}>
      <p>{props.caseName}</p>
      <p class="pos-absolute" style="top:5px; right:5px">Status</p>
    </div>
  );
};
