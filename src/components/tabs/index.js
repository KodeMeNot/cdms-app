import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import MenuDropDown from '../menuDropDown';

const Tabs = (props) => {

  let [activePageTabItem, setActivePageTabItem] = useState('');
  let [isPopupWindowVisible, setPopupWindowVisibility] = useState(false);
  let [isConfigureMenuSettingVisible, setConfigureMenuSettingVisibility] = useState(false);
  let [mainTabOptions, setMainTabOptions] = useState([]);
  let [moreTabOptions, setMoreTabOptions] = useState([]);
  let [isMarginTopRequired, setIsMarginTopRequired] = useState('yes');
  let [menuDropDownOptions, setMenuDropDownOptions] = useState([]);
  let [positions, setPositions] = useState({});
  let [isMenuDropDownConfigurable, setIsMenuDropDownConfigurable] = useState(false);

  useEffect(async () => {

    setActivePageTabItem(props.activePageTabItem);
    setMainTabOptions(props.mainTabOptions);
    setMenuDropDownOptions(props.moreTabOptions);
    setPositions(props.menuDropdownPositions);
    setIsMenuDropDownConfigurable(props.isMenuDropDownConfigurable);

    if (props.isMarginTopRequired) {
      setIsMarginTopRequired(props.isMarginTopRequired);
    }

  }, [props]);

  async function getActivePageTabItem(tabName) {
    setActivePageTabItem(tabName);
    props.changeActiveTab(tabName);
    if (tabName === 'More') {
      togglePopupWindow();
    }
  }

  async function togglePopupWindow() {
    setPopupWindowVisibility(!isPopupWindowVisible);
  }

  async function toggleConfigureMenuSetting() {
    setConfigureMenuSettingVisibility(!isConfigureMenuSettingVisible);
  }

  return (
    <div class="page-tabs">
      <div class="page-tabs-container" style={props.backgroundColor ? `background-color:${props.backgroundColor}` : ""}>
        {
          mainTabOptions && mainTabOptions.length !== 0 && mainTabOptions.map((mainTab) => (
            <div class={'main-buttons-item' + (activePageTabItem === mainTab.label ? ' main-buttons-item-active' : '')} id={mainTab.label} onClick={() => getActivePageTabItem(mainTab.label)}>
              <a class="main-buttons-item-link">
                <span class="main-buttons-item-text">
                  {
                    mainTab.isEditable && isConfigureMenuSettingVisible && (
                      <span class="main-buttons-item-edit-button" />
                    )
                  }
                  <span class="main-buttons-item-text-title">{mainTab.label}</span>
                  {
                    mainTab.isDraggable && isConfigureMenuSettingVisible && (
                      <span class="main-buttons-item-drag-button" />
                    )
                  }
                  {
                    mainTab.isCounter && (
                      <span class="main-buttons-item-counter">{mainTab.counter}</span>
                    )
                  }
                  {
                    mainTab.isPercentage && (
                      <span class="main-buttons-item-percentage">{mainTab.percentage}%</span>
                    )
                  }
                </span>
              </a>
              {
                mainTab.isAddItem && (
                  <a class="main-buttons-item-sublink" />
                )
              }
            </div>
          ))
        }
        {
          menuDropDownOptions && menuDropDownOptions.length !== 0 && (
            <div class={'main-buttons-item main-buttons-item-more' + (activePageTabItem === 'More' ? ' main-buttons-item-active' : '')} onClick={() => getActivePageTabItem('More')}>
              <a class="main-buttons-item-link">
                <span class="main-buttons-item-text">
                  <span class="main-buttons-item-text-title">More</span>
                </span>
              </a>
              {
                isPopupWindowVisible && (
                  <MenuDropDown menuDropDownOptions={menuDropDownOptions} isConfigureMenuSettingVisible={isConfigureMenuSettingVisible} toggleConfigureMenuSetting={toggleConfigureMenuSetting} positions={positions} isMenuDropDownConfigurable={isMenuDropDownConfigurable} />
                )
              }
            </div>
          )
        }

      </div>
    </div>
  );
};

export default Tabs;
