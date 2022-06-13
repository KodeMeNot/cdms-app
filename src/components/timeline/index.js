import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Tabs from '../tabs';

export const Timeline = ({ children, title }) => {
  let [mainTabOptions, setMainTabOptions] = useState([]);
  let [moreTabOptions, setMoreTabOptions] = useState([]);
  useEffect(async () => {
    let mainTabOptions = [{
      label: 'Comment',
      isAddItem: false,
      isCounter: true,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Wait',
      isAddItem: false,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Zoom',
      isAddItem: false,
      isCounter: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Call',
      isAddItem: false,
      isCounter: false,
      isEditable: false,
      isDraggable: true
    }, {
      label: 'SMS',
      isAddItem: false,
      isCounter: false,
      isEditable: false,
      isDraggable: true
    }, {
      label: 'E-mail',
      isAddItem: false,
      isCounter: false,
      isEditable: false,
      isDraggable: true
    }, {
      label: 'Task',
      isAddItem: false,
      isCounter: false,
      isEditable: false,
      isDraggable: true
    }];

    let moreTabOptions = [{
      label: 'Contacts',
      isAddItem: false,
      isCounter: true,
      isEditable: true,
      isDraggable: true,
      counter: 4
    }, {
      label: 'Companies',
      isAddItem: false,
      isCounter: true,
      isEditable: true,
      isDraggable: true,
      counter: 1
    }];

    await setMainTabOptions(mainTabOptions);
    // await setMoreTabOptions(moreTabOptions);
  },[]);
  return (
    <div class="timeline-container" style={`${(title === 'Contact' || title === 'Task') ? 'width: auto;' : 'width: 58.4%;' } ${title === 'Task' ? 'float: left' : ''}`}>
      { children }
    </div>
  );
};
