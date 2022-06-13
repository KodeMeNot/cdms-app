{/*   modified by Vihang
       modified on 19/05/2022
       modification: drag drop tag component
*/}
import interact from 'interactjs';
import { useState, useEffect } from 'preact/hooks';

const DraggableTag = () => {

  useEffect(()=> {
    draggableButton();
  },[]);

  function draggableButton(e) {
    let element = document.getElementById('floating-button');
    let x = 0; let y = 0;

    interact(element)
      .draggable({
        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: 30, y: 30 })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
          }),
          interact.modifiers.restrict({
            restriction: element.parentNode,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
            endOnly: true
          })
        ],
        inertia: true
      })
      .on('dragmove', (event) => {
        x += event.dx;
        y += event.dy;

        event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      });
  }

  return (
    <div id="floating-button" class="drag-drop-floating-button rippleAnimation" data-toggle="tooltip" data-placement="left" data-original-title="Create"
    >
       Case
      <span id="dragIcon" onClick={(e) => e.stopPropagation()} class="cursor-move pos-absolute" style="left: -18px;top: -8px;" />
    </div>
  );
};
export default DraggableTag;
