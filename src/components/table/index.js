import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getFormattedAmount } from '../../../src/lib/utils';


export const Table = ({ entityName, dataset, resizable, settings, addEntity, editEntity, searchFilterHeader, actionFooter, infomodel, paginationFppter, pageSize, checkboxes, menu, hoverArrows, doubleClickEdit, onNameEdit, actionsFooter, checkedEntries, totalEntries, extraModal, extraModalName, getEntityDetail, selectedRows }) => {
  let timeout;
  let [isSettingsDropdownOpen, setSettingsDropdownVisibility] = useState(false);
  let [isAddDropdownOpen, setAddDropdownVisibility] = useState(false);
  let [isSearchFilterPopup, setSearchFilterPopup] = useState(false);
  let [newDataSet, setDataset] = useState(dataset);
  let [maxHeightOfTable, setMaxHeightOfTable] = useState("50vh");
  let [leadStageMappingObj] = useState({
    unassigned: {
      bgColor: '#39a8ef',
      label: 'Unassigned'

    },
    inprogress: {
      bgColor: '#31c5f4',
      label: 'In Progress'
    },
    processed: {
      bgColor: '#49e2c3',
      label: 'Processed'
    },
    completed: {
      bgColor: '#b9e322',
      label: 'Completed'
    },
    junk: {
      bgColor: '#ed5552',
      label: 'Junk'
    }
  });
  let [dealStageMappingObj] = useState({
    booking: {
      bgColor: '#2fc6f6',
      label: 'Booking'
    },
    enquiry: {
      bgColor: '#8fdc68',
      label: 'Enquiry'
    },
    backOffice: {
      bgColor: '#39a8ef',
      label: 'Back Office'
    },
    finance: {
      bgColor: '#a3a9c3',
      label: 'Finance'
    },
    exchange: {
      bgColor: '#8fdc68',
      label: 'Exchange'
    },
    retail: {
      bgColor: '#55d0e0',
      label: 'Accessories'
    },
    accessories: {
      bgColor: '#55d0e0',
      label: 'Accessories'
    },
    fullPayment: {
      bgColor: '#39a8ef',
      label: 'Full Payment'
    },
    delivery: {
      bgColor: '#ffa900',
      label: 'Delivery'
    }
  });
  let [checkedIDs, setCheckedIDs] = useState([]);

  useEffect(() => {
    // let element = document.getElementById('table-scroll');
    // let tableDim = element.getBoundingClientRect();
    // let top = tableDim.height*(3/4);
    // let leftArrow = document.getElementById('left');
    // leftArrow.style.top = top + 'px';
    // leftArrow.style.transform = 'translateY(-50%)';
    // leftArrow.style.display = 'block';
    // let rightArrow = document.getElementById('right');
    // rightArrow.style.top = top + 'px';
    // rightArrow.style.transform = 'translateY(-50%)';
    // rightArrow.style.display = 'block';
    // setMaxHeightOfTable(`${window.innerHeight - 300}px`);
    setMaxHeightOfTable(`${window.innerHeight - 220}px`);
  }, []);
  useEffect(() => {
    setDataset(dataset);
  }, [dataset]);


  // useEffect(()=>{
  //    const handler = (event)=>{
  //     let element = document.getElementById('table-scroll');
  //     let yPosition = element.getBoundingClientRect().top;
  //     let leftArrow = document.getElementById('left');
  //     let rightArrow = document.getElementById('right');
  //     let height = window.innerHeight;

  //     // if(yPosition>=0){
  //       leftArrow.style.top = (height/2-yPosition) + 'px';
  //       leftArrow.style.transform = 'translateY(-50%)';
  //       leftArrow.style.display = 'block'
  //       rightArrow.style.top = (height/2-yPosition) + 'px';
  //       rightArrow.style.transform = 'translateY(-50%)';
  //       rightArrow.style.display = 'block'
  //     }
  //     document.getElementById('app').onscroll = handler;
  //     return ()=>{
  //       document.getElementById('app').removeEventListener('scroll',handler);
  //     }
  // },[])

  useEffect(() => {
    // document.getElementById('main-body').onscroll = function(event) {
    //   let top;
    // console.log(document.getElementById('row').clientHeight, 'document.getElementById("row").clientHeight');
    // console.log(document.getElementById('12row').clientHeight, 'document.getElementById("12row").clientHeight');
    // console.log(document.getElementById('outer-container-div').clientHeight, 'document.getElementById("outer-container-div").clientHeight');
    // console.log(document.getElementById('table-scroll').clientHeight, 'document.getElementById("table-scroll").clientHeight');
    // console.log(document.getElementById('main-table').clientHeight, 'document.getElementById("main-table").clientHeight');
    //   let pos = document.getElementById('table-scroll').getBoundingClientRect();
    //   if (pos.top <1) {
    //     if ( document.getElementById('main-table').clientHeight < document.getElementById('outer-container-div').clientHeight) {
    //       top = ( document.getElementById('main-table').clientHeight) / 2;
    //     } else {
    //       top = ( document.getElementById('outer-container-div').clientHeight) / 2;
    //     }
    //     let leftArrow = document.getElementById('left');
    //     leftArrow.style.top = top + 'px';
    //     leftArrow.style.transform = 'translateY(-50%)';
    //     leftArrow.style.display = 'block';
    //     let rightArrow = document.getElementById('right');
    //     rightArrow.style.top = top + 'px';
    //     rightArrow.style.transform = 'translateY(-50%)';
    //     rightArrow.style.display = 'block';
    //   }

    // }.bind(this);
    let table = document.getElementById('main-table');
    resizeableTable(table);
  }, []);

  // let table = document.getElementById('main-table');
  // resizeableTable(table);

  async function resizeableTable(table) {
    let row = table.getElementsByTagName('tr')[0];
    let cols = row ? row.children : undefined;
    if (!cols) return;
    for (let i = 2; i < cols.length; i++) {
      let div = await createDiv(table.offsetHeight);
      cols[i].appendChild(div);
      // cols[i].style.position = 'relative';
      await setListeners(div);
    }
  }

  async function createDiv(height) {
    let div = document.createElement('div');
    div.style.top = 0;
    div.style.right = 0;
    div.style.width = '8px';
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    div.style.zIndex = '9999';
    /* remove backGroundColor later */
    // div.style.background = 'red';
    // div.style.borderRight = '';
    div.style.userSelect = 'none';
    /* table height */
    div.style.height = height + 'px';
    return div;
  }

  async function setListeners(div) {
    let pageX, curCol, nxtCol, curColWidth, nxtColWidth;
    div.addEventListener('mousedown', (e) => {
      curCol = e.target.parentElement;
      // nxtCol = curCol.nextElementSibling;
      pageX = e.pageX;
      curColWidth = curCol.offsetWidth;
      // if (nxtCol)
      //  nxtColWidth = nxtCol.offsetWidth
    });

    document.addEventListener('mousemove', (e) => {
      if (curCol) {
        let diffX = e.pageX - pageX;

        // if (nxtCol)
        //  nxtCol.style.width = (nxtColWidth - (diffX))+'px';
        if (curColWidth + diffX > 80) {
          curCol.style.width = (curColWidth + diffX) + 'px';
        }
      }
    });

    div.addEventListener('mouseover', (e) => {
      e.target.style.borderRight = '4px solid #eef2f4';
    });

    div.addEventListener('mouseout', (e) => {
      e.target.style.borderRight = '';
    });
    document.addEventListener('mouseup', (e) => {
      curCol = undefined;
      nxtCol = undefined;
      pageX = undefined;
      nxtColWidth = undefined;
      curColWidth = undefined;
    });
  }

  function scroll(type) {
    clearTimeout(timeout);
    let elem = document.getElementById('table-scroll');
    if (type === 'right') {
      elem.scrollLeft += 5;
    }
    else if (type === 'left') {
      elem.scrollLeft -= 5;
      type = 'left';
    }
    timeout = setTimeout(() => {
      scroll(type);
    }, 5);
  }

  function scrollStop() {
    clearTimeout(timeout);
  }

  function showScroll(e) {
    let pos = document.getElementById('table-scroll').getBoundingClientRect();

    // if (pos.top <1) {
    //   let children = document.getElementById('table-head').childNodes;
    //   for (let i = 0; i < children.length; i++) {
    //     children[i].style.position = 'fixed';
    //     children[i].style.top = '0px';
    //     children[i].style.zIndex = '99999';
    //   }
    // document.getElementById('table-head').style.position = 'fixed';
    // document.getElementById('table-head').style.top = '0px';
    // document.getElementById('table-head').style.zIndex = '99999';
    // document.getElementById('table-head').style.width = 'calc(100% - 130px)';
    // }
    let elem = document.getElementById('table-scroll');
    if (elem.scrollLeft !== 0) {
      document.getElementById('left').style.display = 'block';
    }
    if (elem.offsetWidth + elem.scrollLeft !== elem.scrollWidth) {
      document.getElementById('right').style.display = 'block';
    }
  }

  function showSortResize(e, id) {
    e.preventDefault();
    document.getElementById(id).childNodes[1].style.opacity = 1;
  }
  function hideSortResize(e, id) {
    e.preventDefault();
    document.getElementById(id).childNodes[1].style.opacity = 0;
  }

  function toggleSettingsDropdown(e) {
    e.preventDefault();
    setSettingsDropdownVisibility(!isSettingsDropdownOpen);
  }

  function toggleAddDropdown(e) {
    e.preventDefault();
    setAddDropdownVisibility(!isAddDropdownOpen);
  }

  function toggleSearchFilterPopup(e) {
    e.preventDefault();
    setSearchFilterPopup(!isSearchFilterPopup);
  }

  async function changeStage(row, index) {
    newDataSet.rows[index].stage = 'inprogress';
    await setDataset(newDataSet);
  }

  async function selectAllCheckboxes(e) {
    if (e.target.checked) {
      let checkedList = [];
      newDataSet.rows.map((row, index) => {
        checkedList.push(`checkbox-${index}`);
      });
      await setCheckedIDs(checkedList);
      await selectedRows(checkedList);
    } else {
      await setCheckedIDs([]);
      await selectedRows([]);
    }
  }

  async function selectSingleCheckbox(e) {
    let checkedList = checkedIDs;
    if (e.target.checked) {
      if (!checkedIDs.includes(e.target.id)) {
        checkedList.push(e.target.id);
      }
    } else {
      const index = checkedList.indexOf(e.target.id);
      if (index > -1) {
        checkedList.splice(index, 1);
      }
    }
    await setCheckedIDs(checkedList);
    if (newDataSet.rows.length === checkedIDs.length) {
      document.getElementById('checkbox-all').checked = true;
    } else {
      document.getElementById('checkbox-all').checked = false;
    }
    await selectedRows(checkedList);
  }

  // ModifiedBy: Vihang Kale
  // Date: 24/12/2021
  // Modification: deadline days function to calculate the difference between active and deadline date in days

  function deadlineDays(row) {
    let deadlineFormattedDay = row['deadline'].split('/')[0];
    let deadlineFormattedMonth = row['deadline'].split('/')[1];
    let deadlineFormattedYear = row['deadline'].split('/')[2];
    let deadlineFormattedDate = deadlineFormattedMonth + "/" + deadlineFormattedDay + "/" + deadlineFormattedYear;
    const activeDate = new Date(row['createdAt']);
    const deadlineDate = new Date(deadlineFormattedDate);
    const diffTime = Math.abs(deadlineDate - activeDate);
    const DeadlinedaysDifference = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return DeadlinedaysDifference;
  }

  return (
    <div class='row'>
      {searchFilterHeader === 'true' && (
        <div class="main-header">
          <div class="main-header-container">
            <div class="header-title">
              <p class="header-title-name" title={entityName}>{entityName}</p>
              <p class="header-title-star active" title="Add page to left menu" />
              {/*<p class="header-title-star deactive" title="Remove page from left menu"></p>
            <img class="header-title-star" title="Add page to left menu" src="/assets/images/deactiveStar.svg"></img>
            <img class="header-title-star" title="Remove page from left menu" src="/assets/images/activeStar.svg"></img>*/}
            </div>
            <div class="header-filter-search-flexible">
              <div class="header-filter-search" onClick={(e) => toggleSearchFilterPopup(e)}>
                <div class="inner-search">
                  <div class="text">
                    All in progress
                  </div>
                  <div class="cross" />
                </div>
                <input class="search-input" type="text" placeholder="search" title="Search" />
                <div class="search-cross">
                  <div class="search-icon" />
                  <div class="cross-icon" />
                </div>
              </div>
              {
                isSearchFilterPopup && (
                  <div class="search-popup-main-body">
                    <div class="search-popup-outer">
                      <div class="search-popup-inner">
                        <div class="search-popup-inner-padding">
                          <div class="search-popup-inner-filter-container">
                            <div class="filter-header">
                              <h5>FILTERS</h5>
                            </div>
                            <div class="filter-content">
                              <div class="filter-content-item filter-selected-item">
                                <p class="filter-item-icons filter-icon-drag" />
                                <p class="filter-item-container">
                                  <p class="filter-item-text">My leads in progress</p>
                                </p>
                                <p class="filter-item-icons filter-icon-pin" />
                                <p class="filter-item-icons filter-icon-edit" />
                                <p class="filter-item-icons filter-icon-delete" />
                                <div class="filter-item-settings filter-item-settings-selected" />
                              </div>
                              <div class="filter-content-item">
                                <p class="filter-item-icons filter-icon-drag" />
                                <p class="filter-item-container">
                                  <p class="filter-item-text">All in progress</p>
                                </p>
                                <p class="filter-item-icons filter-icon-pin" />
                                <p class="filter-item-icons filter-icon-edit" />
                                <p class="filter-item-icons filter-icon-delete" />
                                <div class="filter-item-settings" />
                              </div>
                              <div class="filter-content-item">
                                <p class="filter-item-icons filter-icon-drag" />
                                <p class="filter-item-container">
                                  <p class="filter-item-text">All closed</p>
                                </p>
                                <p class="filter-item-icons filter-icon-pin" />
                                <p class="filter-item-icons filter-icon-edit" />
                                <p class="filter-item-icons filter-icon-delete" />
                                <div class="filter-item-settings" />
                              </div>
                            </div>
                          </div>
                          <div class="filter-create-container">
                            <div>
                              <div class="field-container field-title-position">
                                <p class="field-title">Name</p>
                                <input class="input-field" value="Rutuja" />
                                <div class="clear-input-field-container">
                                  <p class="clear-input-icon" />
                                </div>
                                <p class="field-delete-icon" />
                                <p class="field-drag-icon" />
                              </div>
                              <div class="field-container field-title-position">
                                <p class="field-title">Communication</p>
                                <div class="field-style field-select-div" />
                                <p class="field-delete-icon" />
                                <p class="field-drag-icon" />
                              </div>
                              <div class="field-container field-title-position">
                                <p class="field-title">Source</p>
                                <div class="field-style field-select-div" />
                                <p class="field-delete-icon" />
                                <p class="field-drag-icon" />
                              </div>
                              <div class="field-container field-title-position">
                                <p class="field-title">Status</p>
                                <div class="field-style field-select-div" />
                                <p class="field-delete-icon" />
                                <p class="field-drag-icon" />
                              </div>
                              <div class="field-container field-title-position">
                                <p class="field-title">Activities</p>
                                <div class="field-style field-select-div" />
                                <p class="field-delete-icon" />
                                <p class="field-drag-icon" />
                              </div>
                            </div>
                          </div>
                          <div class="popup-footer">
                            <div class="save-filter">
                              <p class="title">Save filter</p>
                              <p class="gear" />
                              <p class="reset-filter">Reset Filter</p>
                            </div>
                            <div class="buttons-container">
                              <div class="buttons-inner">
                                <button class="search-button"><img src="/assets/images/search.svg" />Search</button>
                                <button class="reset-button">Reset</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            <div class="header-right-buttons">
              <button class="settings-button" onclick={(e) => toggleSettingsDropdown(e)}>
                <svg version="1.1" width="16px" height="16px" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" class="table-icon">
                  <g>
                    <path d="M500.6,212.6l-59.9-14.7c-3.3-10.5-7.5-20.7-12.6-30.6l30.6-51c3.6-6,2.7-13.5-2.1-18.3L414,55.4    c-4.8-4.8-12.3-5.7-18.3-2.1l-51,30.6c-9.9-5.1-20.1-9.3-30.6-12.6l-14.4-59.9C297.9,4.8,291.9,0,285,0h-60    c-6.9,0-12.9,4.8-14.7,11.4l-14.4,59.9c-10.5,3.3-20.7,7.5-30.6,12.6l-51-30.6c-6-3.6-13.5-2.7-18.3,2.1L53.4,98    c-4.8,4.8-5.7,12.3-2.1,18.3l30.6,51c-5.1,9.9-9.3,20.1-12.6,30.6l-57.9,14.7C4.8,214.1,0,220.1,0,227v60    c0,6.9,4.8,12.9,11.4,14.4l57.9,14.7c3.3,10.5,7.5,20.7,12.6,30.6l-30.6,51c-3.6,6-2.7,13.5,2.1,18.3L96,458.6    c4.8,4.8,12.3,5.7,18.3,2.1l51-30.6c9.9,5.1,20.1,9.3,30.6,12.6l14.4,57.9c1.8,6.6,7.8,11.4,14.7,11.4h60    c6.9,0,12.9-4.8,14.7-11.4l14.4-57.9c10.5-3.3,20.7-7.5,30.6-12.6l51,30.6c6,3.6,13.5,2.7,18.3-2.1l42.6-42.6    c4.8-4.8,5.7-12.3,2.1-18.3l-30.6-51c5.1-9.9,9.3-20.1,12.6-30.6l59.9-14.7c6.6-1.5,11.4-7.5,11.4-14.4v-60    C512,220.1,507.2,214.1,500.6,212.6z M255,332c-41.4,0-75-33.6-75-75c0-41.4,33.6-75,75-75c41.4,0,75,33.6,75,75    C330,298.4,296.4,332,255,332z" fill="#fff" data-original="#000000" style="" />
                  </g>
                </svg>
              </button>
              <div class="header-right-right-buttons">
                <button class="add-button" onClick={(e) => addEntity(e)}>ADD</button>
                <div class="extra" />
                <button class="dropDown-button" onclick={(e) => toggleAddDropdown(e)}> </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div class="row" style="width: 100%;" id="row">
        <div class="col-lg-12 no-padding" id="12row">
          <div class="outer" id="outer-container-div" style='position: relative;'>
            <div id="container" onmouseover={(e) => showScroll(e)}>
              {/* <div id="table-scroll" class="table-scroll"> */}
              <div id="table-scroll" class="table-scroll" style={`overflow-y:scroll; max-height:${maxHeightOfTable};`}>
                <table id="main-table" class='modified-table'>
                  <thead style="position: relative;">
                    <tr id="table-head">
                      {
                        (entityName === 'Tasks' || entityName === 'VisitReception') && (
                          <th style="min-width: 30px; width: 30px;" />
                        )}
                      {(entityName === 'Enquiry' || entityName === 'Booking' || entityName === 'Retail') && (
                        <th style="min-width: 40px; width: 40px;" />
                      )}
                      {
                        checkboxes === 'true' && (
                          <th style="min-width: 40px; width: 40px;"> <input type="checkbox" style="cursor: pointer; margin: 8px;" onClick={(e) => selectAllCheckboxes(e)} id="checkbox-all" /></th>
                        )}
                      {
                        settings === 'true' && (
                          <th style="min-width: 31px; width: 31px;">
                            <svg version="1.1" width="16px" height="16px" x="0" y="0" viewBox="0 0 512 512" style="cursor: pointer; margin: 5px 6px 0px; enable-background:new 0 0 512 512" class="table-icon">
                              <g>
                                <path d="M500.6,212.6l-59.9-14.7c-3.3-10.5-7.5-20.7-12.6-30.6l30.6-51c3.6-6,2.7-13.5-2.1-18.3L414,55.4    c-4.8-4.8-12.3-5.7-18.3-2.1l-51,30.6c-9.9-5.1-20.1-9.3-30.6-12.6l-14.4-59.9C297.9,4.8,291.9,0,285,0h-60    c-6.9,0-12.9,4.8-14.7,11.4l-14.4,59.9c-10.5,3.3-20.7,7.5-30.6,12.6l-51-30.6c-6-3.6-13.5-2.7-18.3,2.1L53.4,98    c-4.8,4.8-5.7,12.3-2.1,18.3l30.6,51c-5.1,9.9-9.3,20.1-12.6,30.6l-57.9,14.7C4.8,214.1,0,220.1,0,227v60    c0,6.9,4.8,12.9,11.4,14.4l57.9,14.7c3.3,10.5,7.5,20.7,12.6,30.6l-30.6,51c-3.6,6-2.7,13.5,2.1,18.3L96,458.6    c4.8,4.8,12.3,5.7,18.3,2.1l51-30.6c9.9,5.1,20.1,9.3,30.6,12.6l14.4,57.9c1.8,6.6,7.8,11.4,14.7,11.4h60    c6.9,0,12.9-4.8,14.7-11.4l14.4-57.9c10.5-3.3,20.7-7.5,30.6-12.6l51,30.6c6,3.6,13.5,2.7,18.3-2.1l42.6-42.6    c4.8-4.8,5.7-12.3,2.1-18.3l-30.6-51c5.1-9.9,9.3-20.1,12.6-30.6l59.9-14.7c6.6-1.5,11.4-7.5,11.4-14.4v-60    C512,220.1,507.2,214.1,500.6,212.6z M255,332c-41.4,0-75-33.6-75-75c0-41.4,33.6-75,75-75c41.4,0,75,33.6,75,75    C330,298.4,296.4,332,255,332z" fill="#535c69" data-original="#000000" style="" />
                              </g>
                            </svg>
                          </th>
                        )}
                      {
                        newDataSet &&
                        newDataSet.columns.map((column, index) => (
                          column.field !== 'caseID' && (
                            <th style={column.width ? `width:  ${column.width}` : ''} id={index} onmouseover={(e) => showSortResize(e, index)} onmouseleave={(e) => hideSortResize(e, index)}>
                              <div class='display-flex'>
                                <p class="table-title first-letter-capital" style={(entityName === 'Products' && (column.field === 'name' || column.field === 'images')) ? 'margin-left: 32px ' + (column.label === "displayName") ? 'cursor:pointer' : '' : ' ' + (column.label === "displayName") ? 'cursor:pointer' : ''}>{column.label}</p>
                                {
                                  (column.sort && column.sort === 'asc') && (
                                    <img style="width: 10px" src="/assets/images/up.svg" class="table-sort" />
                                  )}
                                {
                                  (column.sort && column.sort === 'desc') && (
                                    <img style="width: 10px" src="/assets/images/down.svg" class="table-sort" />
                                  )}
                              </div>

                              <p class="resize-button" onmouseover={(e) => showSortResize(e, index)} onmouseleave={(e) => hideSortResize(e, index)} onclick={(e) => stopPropagation(e)} />
                            </th>
                          )
                        ))}
                    </tr>
                  </thead>
                  <tbody>

                    {
                      newDataSet && newDataSet.columns && newDataSet.rows.length === 0 && (
                        // <h2 style='width: 100vw;margin: 1rem;color: #e7e6e6;font-size: 2.6rem;'>No data available</h2>
                        <h2 style='color: #e7e6e6;font-size: 2.6rem;position: relative;left: 4em;'>No data available</h2>
                      )
                    }
                    {
                      newDataSet && newDataSet.columns &&
                      newDataSet.rows.map((row, index) => (
                        <tr title="Double click to edit element" ondblclick={(e) => editEntity(row)} class={row.isRead ? 'background-grey first-letter-capital' : 'background-white first-letter-capital'} style={entityName === 'Sales Notifications' ? 'border-bottom: 1px solid #cdd3d6' : ''}>
                          {
                            entityName === 'Tasks' && (
                              <td class="has-text-center p-r-0"><img src="/assets/images/clipboard.png" width="30" /></td>
                            )}
                          {
                            (entityName === 'Enquiry' || entityName === 'Booking' || entityName === 'Retail') && (
                              <td class="has-text-right p-r-0"><img src="/assets/images/folder.png" width="30" /></td>
                            )}
                          {
                            (entityName === 'VisitReception') && (
                              <td class="has-text-right p-r-0"><img src="/assets/images/visitor.png" width="30" /></td>
                            )}
                          {
                            checkboxes === 'true' && (
                              <td style="min-width: 40px; width: 40px;"> <input type="checkbox" style="cursor: pointer; margin: 22px 0px 0px 8px;" id={`checkbox-${index}`} checked={checkedIDs.includes(`checkbox-${index}`)} onClick={(e) => selectSingleCheckbox(e)} /></td>
                            )}
                          {
                            settings === 'true' && (
                              <td>
                                <svg version="1.1" width="16px" height="16px" x="0" y="0" viewBox="0 0 384 384" style="cursor: pointer; margin: 20px 6px 0px; enable-background:new 0 0 512 512" class="table-icon">
                                  <g transform="matrix(1,0,0,1,0,50)" class="table-icon">
                                    <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" fill="#535c69" data-original="#000000" style="" />
                                    <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" fill="#535c69" data-original="#000000" style="" />
                                    <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" fill="#535c69" data-original="#000000" style="" />
                                  </g>
                                </svg>
                              </td>
                            )}
                          {
                            newDataSet.columns.map((column) => (
                              column.field !== 'caseID' && (
                                <td data-label={column.label}>
                                  <p class={`column-label ${(entityName === 'Sales Notifications' && !row.isRead) ? 'f-600' : ''}`} style={column.field === 'stage' ? 'color: #a5a9ab; font-size: 11px; line-height: 14px !important;' : column.field === 'receivedFrom' ? 'margin-left: 0;' : ((entityName === 'Leads' || entityName === 'Deals' || entityName === 'VisitReception') && column.field === 'displayName') ? 'margin-left: 0; cursor: pointer' : ''}>
                                    {
                                      entityName === 'Leads' && column.field === 'stage' && row[column.field] === 'unassigned' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Unassigned" onclick={(e) => getEntityDetail(row)} style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="In Progress">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Processed">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Complete Lead">
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Leads' && column.field === 'stage' && row[column.field] === 'inprogress' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Unassigned" style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="In Progress" style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Processed">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Complete Lead">
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Leads' && column.field === 'stage' && row[column.field] === 'processed' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Unassigned" style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="In Progress" style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Processed" style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Complete Lead">
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Leads' && column.field === 'stage' && (row[column.field] === 'completed' || row[column.field] === 'junk') && (
                                        <div class="stage-container">
                                          <div class="stage" title="Unassigned" style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="In Progress" style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Processed" style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Complete Lead" style={`background-color:${leadStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Deals' && column.field === 'stage' && row[column.field] === 'enquiry' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Enquiry" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Finance">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Exchange">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Accessories">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Full Payment">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Delivery">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Back Office">
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Deals' && column.field === 'stage' && row[column.field] === 'booking' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Enquiry" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Booking" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Exchange">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Accessories">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Full Payment">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Delivery">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Back Office">
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Deals' && column.field === 'stage' && row[column.field] === 'exchange' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Booking" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Finance" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Exchange" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Accessories">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Full Payment">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Delivery">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Back Office">
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Deals' && column.field === 'stage' && row[column.field] === 'accessories' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Booking" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Finance" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Exchange" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Accessories" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Full Payment">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Delivery">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Back Office">
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Deals' && column.field === 'stage' && row[column.field] === 'fullPayment' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Booking" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Finance" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Exchange" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Accessories" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Full Payment" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Delivery">
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Back Office">
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Deals' && column.field === 'stage' && row[column.field] === 'delivery' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Booking" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Finance" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Exchange" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Accessories" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Full Payment" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Delivery" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Back Office">
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      entityName === 'Deals' && column.field === 'stage' && row[column.field] === 'backOffice' && (
                                        <div class="stage-container">
                                          <div class="stage" title="Booking" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Finance" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Exchange" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Accessories" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Full Payment" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Delivery" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                          <div class="stage" title="Back Office" style={`background-color:${dealStageMappingObj[row[column.field]].bgColor}`}>
                                            <div class="inner-hover" />
                                          </div>
                                        </div>
                                      )
                                    }
                                    {
                                      column.field === 'typeOfCatalogue' && (
                                        <a style="cursor:pointer;" onclick={(e) => getEntityDetail(row)}>{row[column.field]}</a>
                                      )
                                    }
                                    {
                                      column.field === 'name' && (entityName !== 'Tasks' || entityName !== 'Leads' && entityName !== 'Deals' && entityName !== 'VisitReception') && (
                                        <p><a style="cursor:pointer;" onclick={(e) => editEntity(row)}>{row[column.field]}</a>{row.isImportant && (<img src='/assets/images/Star_selected.svg' class="important-notification" />)} </p>
                                      )
                                    }
                                    {
                                      column.field === 'displayName' && (entityName === 'Tasks' || entityName === 'Leads' || entityName === 'Deals' || entityName === 'VisitReception') && (
                                        <div>
                                          {
                                            row.caseID && (
                                              <p class="stage-label"><a style="cursor:pointer;color: red" onclick={(e) => editEntity(row)}>{row.caseID ? row.caseID : ''}</a></p>
                                            )
                                          }

                                          <p>
                                            {
                                              entityName === 'Tasks' && (
                                                <p class="cursor-pointer"  onclick={(e) => editEntity(row)}>{row[column.field1]} </p>
                                              )
                                            }
                                            {
                                              entityName !== 'Tasks' && (
                                                <p class="cursor-pointer" style={entityName === 'VisitReception' ? 'display:none;':''} onclick={(e) => editEntity(row)}>{row[column.field]}{row.isImportant && (<p class="task-priority-high m-l-5" />)} </p>
                                              )
                                            }
                                          </p>

                                        </div>
                                      )
                                    }
                                    {
                                      column.field === 'displayName' && (entityName === 'Enquiry' || entityName === 'Booking' || entityName === 'Retail') && (
                                        <div>
                                          <p class="stage-label cursor-pointer" onclick={(e) => editEntity(row)}>{row[column.field]}</p>
                                          <p class="cursor-pointer"><a style="color: #5292ac;" onclick={(e) => editEntity(row)}>{row.caseID ? row.caseID : ''}</a>{row.isImportant && (<img src='/assets/images/Star_selected.svg' class="important-notification" />)} </p>
                                        </div>
                                      )
                                    }
                                    {
                                      column.field === 'receivedFrom' && (entityName === 'Courier') && (
                                        <div>
                                          <p class="stage-label"><a style="cursor:pointer;color: red" onclick={(e) => editEntity(row)}>{row.caseID ? row.caseID : ''}</a></p>
                                          <p class="cursor-pointer" onclick={(e) => editEntity(row)}>{row[column.field]}{row.isImportant && (<img src='/assets/images/Star_selected.svg' class="important-notification" />)} </p>
                                        </div>
                                      )
                                    }
                                    {
                                      column.field === 'coreEntityName' && (
                                        <p><a style="cursor:pointer;" onclick={(e) => editEntity(row)}>{row[column.field]}</a> <p class="task-priority-high" /> </p>
                                      )
                                    }
                                    {
                                      // ModifiedBy: Vihang Kale
                                      // Date: 24/12/2021
                                      // Modifiation: added functionality to display tag colors according to the conditions using the deadline function
                                      column.field === 'deadline' && (
                                        <div>
                                          <p class={'tasks-tags ' + (deadlineDays(row) >= 0 ? 'yellow':'red')} style="color: #fff !important;"> {deadlineDays(row) + " Days"}</p>
                                        </div>
                                      )
                                    }
                                    {
                                      column.field === 'typeOfEnquiry' && row[column.field] && (
                                        <p class={'tasks-tags ' + row[column.field].toLowerCase()} style="color: #fff !important;">{row[column.field]}</p>
                                      )
                                    }
                                    {
                                      column.field === 'typeOfEnquiry' && !row[column.field] && (
                                        <p style="color: #fff !important;">-</p>
                                      )
                                    }
                                    {
                                      (column.field === 'price' || column.field === 'amount' || column.field === "exShowroom" || column.field === "totalIndividual") && (
                                        <p >{getFormattedAmount(row[column.field])}</p>
                                      )
                                    }
                                    {
                                      column.field !== 'displayame' && column.field !== 'name' && column.field !== 'stage' && column.field !== 'modelName' && column.field !== 'typeOfCatalogue' && column.field !== 'deadline' && column.field !== 'typeOfEnquiry' && column.field !== 'coreEntityName' && column.field !== 'price' && column.field !== 'exShowroom' && column.field !== 'totalIndividual' && column.field !== 'amount' && column.field !== 'receivedFrom' && (
                                        <p >{row[column.field] ? row[column.field] : column.field === 'extraModalForNotification' || column.field === "extraModal" ? '':"-"}</p>
                                      )
                                    }
                                    {
                                      entityName === 'Leads' && column.field !== 'name' && column.field !== 'typeOfCatalogue' && column.field === 'stage' && (
                                        <p class="stage-label">{leadStageMappingObj[row.stage].label}</p>
                                      )
                                    }
                                    {
                                      entityName === 'Deals' && column.field !== 'name' && column.field !== 'typeOfCatalogue' && column.field === 'stage' && (
                                        <p class="stage-label">{dealStageMappingObj[row.stage].label}</p>
                                      )
                                    }
                                    {
                                      entityName === 'BookingModel' && column.field === 'modelName' && (
                                        <p>
                                          <p ><p>{row[column.field]} <em class="icon icon-bell cursor-pointer" style="vertical-align: middle; margin-left: 5px;" onClick={(e) => infomodel(row)} /></p></p>
                                        </p>
                                      )
                                    }
                                    {
                                      entityName === 'Notification' && column.field === 'isDefault' && (
                                        <p>
                                          <p ><p>{row[column.field] ? 'Yes' : 'No'}</p></p>
                                        </p>
                                      )
                                    }
                                    {
                                      entityName === 'Notification' && column.field === 'srNo' && (
                                        <p>
                                          <p ><p>{index + 1}</p></p>
                                        </p>
                                      )
                                    }
                                    {extraModalName && column.field === 'extraModal' && (
                                      <button class="add-button" onClick={(e) => extraModal(row)}>{extraModalName}</button>
                                    )}
                                    {
                                      extraModalName && column.field === 'extraModalForNotification' && (entityName === 'Courier') && (
                                        <p class="m-l-0 m-r-0 display-flex">
                                          <button class="add-button" onClick={(e) => extraModal('handover', '', row)}>{extraModalName}</button>
                                          <div class="display-flex align-center">
                                            <img src="/assets/images/edit.svg" height="15" class="m-l-5 m-r-5 cursor-pointer" onClick={(e) => extraModal('edit', '', row)} />
                                          </div>
                                        </p>
                                      )}
                                    {extraModalName && column.field === 'extraModalForNotification' && (entityName !== 'VisitReception' && entityName !== 'Courier') && (
                                      <button class="add-button" onClick={(e) => extraModal(row.extraModalName)}>{extraModalName}</button>
                                    )}
                                    {
                                      extraModalName && column.field === 'extraModalForNotification' && (entityName === 'VisitReception') && (
                                        <p class="m-l-0 m-r-0 display-flex">
                                          <button class="add-button" onClick={(e) => extraModal(row.extraModalName, row)}>{row.extraModalName}</button>
                                          {/*row.extraModalName === 'View Status' && (
                                            <div class="display-flex align-center">
                                              <img src="/assets/images/telephone.png" height="15" class="m-l-5 m-r-5 cursor-pointer"/>
                                              <img src="/assets/images/whatsapp.png" height="15" class="m-l-5 m-r-5 cursor-pointer"/>
                                              <img src="/assets/images/chat.png" height="15" class="m-l-5 m-r-5 cursor-pointer"/>
                                            </div>
                                          )*/}
                                        </p>
                                      )}
                                  </p>
                                </td>
                              )
                            ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div id="left" class="sm-hidden" onmouseleave={(e) => scrollStop()} onmouseover={(e) => scroll('left')} style='left: 0px; border-bottom-right-radius: 50px; border-top-right-radius: 50px; position:absolute; top: 40%;' ><img src='/assets/images/prev.svg' style='width: 29px; margin: 37px 0px 0px 15px;' /></div>
            <div id="right" class="sm-hidden" onmouseleave={(e) => scrollStop()} onmouseover={(e) => scroll('right')} style='right: 0px; border-bottom-left-radius: 50px; border-top-left-radius: 50px; position:absolute; top: 40%;' ><img src='/assets/images/next.svg' style='width: 29px; margin: 37px 0px 0px 15px;' /></div>
          </div>
        </div>
        {actionFooter === 'true' && (
          <form style="display: contents">
            <table class="actions-block">
              <tbody>
                <tr>
                  <th>
                    <button class="table-title first-letter-capital no-padding" disabled style="margin: 0px 5px; border: 0px;">
                      <img style="width: 11px; margin-right: 5px;" src="/assets/images/pencil.svg" />
                      <p>Edit</p>
                    </button>
                  </th>
                  <th>
                    <button class="table-title first-letter-capital no-padding" disabled style="margin: 0px 5px; border: 0px;">
                      <img style="width: 10px; margin-right: 5px;" src="/assets/images/cross.svg" />
                      <p>Delete</p>
                    </button>
                  </th>
                  <th>
                    <select name="records" id="actions" disabled style="width: 100%" onchange={(e) => onPageSizeClick(e)}>
                      <option value="Actions" disabled selected>- Actions -</option>
                      <option value="Activate">Activate</option>
                      <option value="Deactivate">Deactivate</option>
                    </select>
                  </th>
                  <th style="padding: 0px;">
                    <div style="display: flex; padding: 10px;">
                      <input type="checkbox" title="Applies actions for all records on all pages" style="cursor: pointer; margin: 8px;" />
                      <p style="padding-top: 9px;" class="table-title first-letter-capital">FOR ALL</p>
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
          </form>
        )}
      </div>
    </div >
  );
};
