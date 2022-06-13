import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const MenuDropDown = (props) => {
  let [isConfigureMenuSettingVisible, setConfigureMenuSettingVisibility] = useState(false);
  let [menuDropDownOptions, setMenuDropDownOptions] = useState([]);
  let [positions, setPositions] = useState({});
  let [isMenuDropDownConfigurable, setIsMenuDropDownConfigurable] = useState(false);

  useEffect(async () => {
    setMenuDropDownOptions(props.menuDropDownOptions);
    setPositions(props.positions);
    setIsMenuDropDownConfigurable(props.isMenuDropDownConfigurable);
  },[props]);

  return (
    <div>
      <div class="popup-window-angly popup-window-angly-top" style={positions && positions.arrow ? `top:${positions.arrow.top}; right:${positions.arrow.right};` : ''} />
      <div class="popup-window" style={positions && positions.menu ? `top:${positions.menu.top}; right:${positions.menu.right};` : ''}>
        <div class="popup-window-content">
          <div class="menu-popup">
            <div class="menu-popup-items">
              {
                menuDropDownOptions && menuDropDownOptions.length !== 0 && menuDropDownOptions.map((moreTab) => (
                  <a class="menu-popup-item main-buttons-submenu-item crm-menu-more-settings item7  " draggable="true" data-sortable="true">
                    <span class="menu-popup-item-text">
                      <span class="main-buttons-item-text">
                        {
                          moreTab.isEditable && isConfigureMenuSettingVisible && (
                            <span class="main-buttons-item-edit-button" />
                          )
                        }
                        <span class="main-buttons-item-text-title">{moreTab.label}</span>
                        {
                          moreTab.isDraggable && isConfigureMenuSettingVisible && (
                            <span class="main-buttons-item-drag-button" />
                          )
                        }
                      </span>
                    </span>
                  </a>
                ))
              }
              {/*
              <span class="menu-popup-item main-buttons-submenu-separator main-buttons-submenu-item main-buttons-hidden-label ">
                <span class="menu-popup-item-icon"></span>
                <span class="menu-popup-item-text">
                  <span>Hidden</span>
                </span>
              </span>
              <a class="menu-popup-item main-buttons-submenu-item crm-menu-more-settings item7 main-buttons-disabled " draggable="true" data-sortable="true">
                <span class="menu-popup-item-text">
                  <span class="main-buttons-item-text">
                    {
                      isConfigureMenuSettingVisible && (
                        <span class="main-buttons-item-edit-button" />
                      )
                    }
                    <span class="main-buttons-item-text-title">Invoices</span>
                      {
                        isConfigureMenuSettingVisible && (
                          <span class="main-buttons-item-drag-button" />
                        )
                      }
                  </span>
                </span>
              </a>
              <a class="menu-popup-item main-buttons-submenu-item crm-menu-more-settings item7 main-buttons-disabled " draggable="true" data-sortable="true">
                <span class="menu-popup-item-text">
                  <span class="main-buttons-item-text">
                    {
                      isConfigureMenuSettingVisible && (
                        <span class="main-buttons-item-edit-button" />
                      )
                    }
                    <span class="main-buttons-item-text-title">Quotes</span>
                      {
                        isConfigureMenuSettingVisible && (
                          <span class="main-buttons-item-drag-button" />
                        )
                      }
                  </span>
                </span>
              </a>
              <a class="menu-popup-item main-buttons-submenu-item crm-menu-more-settings item7 main-buttons-disabled " draggable="true" data-sortable="true">
                <span class="menu-popup-item-text">
                  <span class="main-buttons-item-text">
                    {
                      isConfigureMenuSettingVisible && (
                        <span class="main-buttons-item-edit-button" />
                      )
                    }
                    <span class="main-buttons-item-text-title">Recycle Bin</span>
                      {
                        isConfigureMenuSettingVisible && (
                          <span class="main-buttons-item-drag-button" />
                        )
                      }
                  </span>
                </span>
              </a>
              <a class="menu-popup-item main-buttons-submenu-item crm-menu-more-settings item7 main-buttons-disabled " draggable="true" data-sortable="true">
                <span class="menu-popup-item-text">
                  <span class="main-buttons-item-text">
                    {
                      isConfigureMenuSettingVisible && (
                        <span class="main-buttons-item-edit-button" />
                      )
                    }
                    <span class="main-buttons-item-text-title">Reports</span>
                      {
                        isConfigureMenuSettingVisible && (
                          <span class="main-buttons-item-drag-button" />
                        )
                      }
                  </span>
                </span>
              </a>
              */}
              {
                isMenuDropDownConfigurable && (
                  <span class="menu-popup-item main-buttons-submenu-separator main-buttons-submenu-item main-buttons-hidden-label ">
                    <span class="menu-popup-item-icon" />
                    <span class="menu-popup-item-text">
                      <span>Settings</span>
                    </span>
                  </span>
                )
              }

              {
                isMenuDropDownConfigurable && !isConfigureMenuSettingVisible && (
                  <span class="menu-popup-item main-buttons-submenu-setting main-buttons-submenu-item ">
                    <span class="menu-popup-item-icon" />
                    <span class="menu-popup-item-text" onClick={() => props.toggleConfigureMenuSetting()}>Configure Menu</span>
                  </span>
                )
              }
              {
                isMenuDropDownConfigurable && isConfigureMenuSettingVisible && (
                  <span class="menu-popup-item main-buttons-submenu-settings-apply main-buttons-submenu-item ">
                    <span class="menu-popup-item-icon" />
                    <span class="menu-popup-item-text" onClick={() => props.toggleConfigureMenuSetting()}>Finish customization</span>
                  </span>
                )
              }
              {
                isMenuDropDownConfigurable && (
                  <span class="menu-popup-item main-buttons-submenu-settings-reset main-buttons-submenu-item ">
                    <span class="menu-popup-item-icon" />
                    <span class="menu-popup-item-text" onClick={() => props.toggleConfigureMenuSetting()}>Reset menu</span>
                  </span>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDropDown;
