import { h } from 'preact';
import Header from '../../components/header';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { getItem, removeAll} from '../../lib/myStore';
import { Modal, ModalBody } from '../../components/rightDrawer';
import CONSTANTS from '../../lib/constants';
import { startLoader, stopLoader, formatDateTime, getFormattedAmount, applyAclForFeedAndChat} from '../../../src/lib/utils';

let Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require("highcharts/highcharts-3d")(Highcharts);

const CaseCommitment = () => {
  useEffect(async () => {
    window.onclick = function(event) {
      if (!event.target.matches('.month-button')) {
        setDropDownComponent('');
      }
    }.bind(this);
  }, [isDisabled]);

  useEffect(async () => {
    let mainTabOptions = [{
      label: 'Order',
      isAddItem: true,
      isCounter: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Stock',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }];
    setMainTabOptions(mainTabOptions);
    let stockModalTabs = [{
      label: 'Purchased',
      isAddItem: true,
      isCounter: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'In Stock',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }];
    setStockModalTabs(stockModalTabs);
    let orderModalTabs = [{
      label: 'Count Wise',
      isAddItem: true,
      isCounter: false,
      isEditable: true,
      isDraggable: true
    }, {
      label: 'Booking Wise',
      isAddItem: true,
      isCounter: false,
      isPercentage: false,
      isEditable: true,
      isDraggable: true
    }];
    setOrderModalTabs(orderModalTabs);
    // Build the chart
    if (document.getElementById("container-target-chart")) {
      Highcharts.chart('container-target-chart', {
        chart: {
          type: 'column',
          height: 250
        },
        title: {
          text: 'Target'
        },
        xAxis: {
          categories: [
            'August',
            'September',
            'October',
            'November',
            'December',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Achieved',
          data: [49, 71, 49, 71, 50, 106, 49, 95, 90, 14, 71, 10]

        }, {
          name: 'Target',
          data: [83, 78,83, 78, 89,  98, 83, 88, 35, 28, 78, 9]

        }]
      });
    }



    function initAccordion(elem, option){
  		document.addEventListener('click', (e) => {
  			// Daca elementul nu este .acc-title, nu fa nimic
  			if (!e.target.matches(elem+' .acc-title')) return;

  				// Daca parintele (.acc-container) lui .acc-title are clasa .acc-active
  				if (!e.target.parentElement.classList.contains('acc-active')) {
  					// Daca option==true, sterge clasa .acc-active pentru celelalte elemente
  					if (option===true) {
  						let elementList = document.querySelectorAll(elem+' .acc-container');
  						Array.prototype.forEach.call(elementList, (e) => {
  	                        e.classList.remove('acc-active');
  						});
  					}
  					// Daca nu are clasa .acc-active, adauga clasa .acc-active
  					e.target.parentElement.classList.add('acc-active');
  				} else {
  					// Daca are clasa .acc-active, remove clasa .acc-active
  					e.target.parentElement.classList.remove('acc-active');
  				}

  		});
  	}

  	// Deschide doar unul, inchide celelalte
  	initAccordion('.accordion.acc-single-open', true);
  },[activePageTabItem]);
  let [isSearchFilterPopup, setSearchFilterPopup] = useState(false);
  let [isSettingsDropdownOpen, setSettingsDropdownVisibility] = useState(false);
  let [isStatusDropdownOpen, setStatusDropdownVisibility] = useState(false);
  let [isBranchDropdown, setBranchDropdown] = useState(false);
  let [isModel, setModel] = useState(false);
  let [isVariant, setVariant] = useState(false);
  let [mainTabOptions, setMainTabOptions] = useState([]);
  let [activePageTabItem, setActivePageTabItem] = useState('Order');
  let [isStockDetailModalOpen, setIsStockDetailModal] = useState(false);
  let [isOrderDetailModalOpen, setIsOrderDetailModal] = useState(false);
  let [isCarriedForwardModalOpen, setIsCarriedForwardModal] = useState(false);
  let [isHMILModalOpen, setIsHMILModal] = useState(false);
  let [stockModalTabs, setStockModalTabs] = useState([]);
  let [orderModalTabs, setOrderModalTabs] = useState([]);
  let [activeStockTab, setActiveStockTab] = useState('Purchased');
  let [activeOrderTab, setActiveOrderTab] = useState('Count wise');
  let [isShowDetails, setShowDetails] = useState(false);
  let [variant, setVariantName] = useState('');
  let [allocateBookingArray, setAllocateBookingArray] = useState([]);
  let [allocatedBooking, setAllocatedBooking] = useState(0);
  let [orderBookingArray, setOrderBookingArray] = useState([]);
  let [orderBooking, setOrderBooking] = useState(0);
  let [isOrderPopupOpen, setOrderPopupVisibility] = useState(false);
  let [dropDownComponent, setDropDownComponent] = useState('');
  let [selectedMonth, setSelectedMonth] = useState('August 2020');
  let [selectedYear, setSelectedYear] = useState('July 2021');
  let [selectedEditMonth, setSelectedEditMonth] = useState('');
  let [selectedEditYear, setSelectedEditYear] = useState('');
  let [selectedStockType, setSelectedStockType] = useState('Total');
  let [isDisabled, setIsDisabled] = useState(true);
  let [isAddHMILModalOpen, setAddHMILModalVisibility] = useState(false);
  let [isShowSecurityMenu,setShowSecurityMenu] = useState(false);
  let [selectedRole, setSelectedRole] = useState('MD');

  function toggleSearchFilterPopup(e) {
    e.preventDefault();
    setSearchFilterPopup(!isSearchFilterPopup);
  }
  function toggleSettingsDropdown(e) {
    e.preventDefault();
    setSettingsDropdownVisibility(!isSettingsDropdownOpen);
  }
  function toggleStatusDropDown(e) {
    e.preventDefault();
    setStatusDropdownVisibility(!isStatusDropdownOpen);
  }
  function toggleBranch(e) {
    e.preventDefault();
    setBranchDropdown(!isBranchDropdown);
  }
  function toggleModel(e) {
    e.preventDefault();
    setModel(!isModel);
  }
  function toggleVariant(e) {
    e.preventDefault();
    setVariant(!isVariant);
  }
  async function changeActiveTab(tabName) {
    await setActivePageTabItem(tabName);
    if (tabName === "Order") {
      await Highcharts.chart('container-pie-booked', {
        chart: {
          style: {
            fontFamily: 'IBMPlexSansRegular sans-serif'
          },
          renderTo: 'container',
          type: 'pie',
          // width: 500,
          height: 400,
          borderWidth: 2,
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          style: {
            fontSize: '12px'
          },
          text: 'Vehicle Boking Status'
        },

        credits: {
          enabled: false
        },

        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          y: 30,
          labelFormat: '{name} ({y})',
          navigation: {
            activeColor: '#3E576F',
            animation: true,
            arrowSize: 12,
            inactiveColor: '#CCC',
            style: {
              fontWeight: 'bold',
              color: '#333',
              fontSize: '12px'
            }
          }
        },

        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [{
          name: 'Total',
          data: [
            { name: 'Allocated', y: 22 },
            { name: 'Pending Allocation', y: 11 }
          ]
        }]
      });
      await Highcharts.chart('container-pie-pending', {
        chart: {
          style: {
            fontFamily: 'IBMPlexSansRegular sans-serif'
          },
          renderTo: 'container',
          backgroundColor: "transparent",
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          },
          // width: 500,
          height: 400,
          borderWidth: 2
        },
        title: {
          style: {
            fontSize: '12px'
          },
          text: 'Pending Allocation Status'
        },
        credits: {
          enabled: false
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          y: 30,
          labelFormat: '{name} ({y})',
          navigation: {
            activeColor: '#3E576F',
            animation: true,
            arrowSize: 12,
            inactiveColor: '#CCC',
            style: {
              fontWeight: 'bold',
              color: '#333',
              fontSize: '12px'
            }
          }
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },

        series: [{
          name:'Total',
          data: [
            { name: 'Ordered Against Booking', y: 6 },
            { name: 'Pending Order Against Booking', y: 5 }
          ]
        }]
      });
    } else if (tabName === "Stock") {
      if (document.getElementById("container-pie-ordered")) {
        await Highcharts.chart('container-pie-ordered', {
          chart: {
            style: {
              fontFamily: 'IBMPlexSansRegular sans-serif'
            },
            renderTo: 'container',
            type: 'pie',
            // width: 500,
            height: 400,
            borderWidth: 2,
            options3d: {
              enabled: true,
              alpha: 45
            }
          },
          title: {
            style: {
              fontSize: '12px'
            },
            text: 'Vehicle Purchased Status'
          },

          credits: {
            enabled: false
          },

          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 30,
            labelFormat: '{name} ({y})',
            navigation: {
              activeColor: '#3E576F',
              animation: true,
              arrowSize: 12,
              inactiveColor: '#CCC',
              style: {
                fontWeight: 'bold',
                color: '#333',
                fontSize: '12px'
              }
            }
          },

          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 45
            }
          },
          series: [{
            name: 'Total',
            data: [
              { name: 'Ordered', y: 61 },
              { name: 'Invoiced', y: 11 },
              { name: 'In-Transit', y: 10 }
            ]
          }]
        });
      }
      if (document.getElementById("container-pie-in-stock")) {
        await Highcharts.chart('container-pie-in-stock', {
          chart: {
            style: {
              fontFamily: 'IBMPlexSansRegular sans-serif'
            },
            renderTo: 'container',
            backgroundColor: "transparent",
            type: 'pie',
            options3d: {
              enabled: true,
              alpha: 45
            },
            // width: 500,
            height: 400,
            borderWidth: 2
          },
          title: {
            style: {
              fontSize: '12px'
            },
            text: 'Stock Status'
          },
          credits: {
            enabled: false
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 30,
            labelFormat: '{name} ({y})',
            navigation: {
              activeColor: '#3E576F',
              animation: true,
              arrowSize: 12,
              inactiveColor: '#CCC',
              style: {
                fontWeight: 'bold',
                color: '#333',
                fontSize: '12px'
              }
            }
          },
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 45
            }
          },

          series: [{
            name:'Total',
            data: [
              { name: 'Free Stock', y: 20 },
              { name: 'Booked', y: 33 },
              { name: 'Not Available for Sale', y: 10 }
            ]
          }]
        });
      }
    } else if (tabName === "Sales") {
      if (document.getElementById("container-funnel")) {
        await Highcharts.chart('container-funnel', {
          chart: {
            type: 'funnel3d',
            options3d: {
              enabled: true,
              alpha: 10,
              depth: 50,
              viewDistance: 50
            },
            style: {
              fontFamily: 'IBMPlexSansRegular, sans-serif'
            }
          },
          title: {
            text: 'Lead Funnel'
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                allowOverlap: true,
                y: 10
              },
              neckWidth: '30%',
              neckHeight: '25%',
              width: '80%',
              height: '80%'
            }
          },
          series: [{
            name: 'Total',
            data: [
              ['Unassigned', 65],
              ['In Progress', 50],
              ['Processed', 35],
              ['Good Lead', 5]
            ]
          }]
        });
      }
      if (document.getElementById("container-pie-lead-source")) {
        await Highcharts.chart('container-pie-lead-source', {
          chart: {
            style: {
              fontFamily: 'IBMPlexSansRegular sans-serif'
            },
            renderTo: 'container',
            backgroundColor: "transparent",
            type: 'pie',
            options3d: {
              enabled: true,
              alpha: 45
            },
            // width: 500,
            height: 400,
            borderWidth: 2
          },
          title: {
            text: 'Lead Sources'
          },
          credits: {
            enabled: false
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 30,
            labelFormat: '{name} ({y})',
            navigation: {
              activeColor: '#3E576F',
              animation: true,
              arrowSize: 12,
              inactiveColor: '#CCC',
              style: {
                fontWeight: 'bold',
                color: '#333',
                fontSize: '12px'
              }
            }
          },
          plotOptions: {
            pie: {
              depth: 45
            }
          },

          series: [{
            name:'Total',
            data: [
              { name: 'Walk-in', y: 20 },
              { name: 'Tele-in', y: 33 },
              { name: 'Digital', y: 10 },
              { name: 'Field Generation', y: 15 }
            ]
          }]
        });
      }
    } else if (tabName === "Deals") {

      if (document.getElementById("dealFunnelChart-container")) {
        await Highcharts.chart('dealFunnelChart-container', {
          chart: {
            type: 'funnel3d',
            options3d: {
              enabled: true,
              alpha: 10,
              depth: 50,
              viewDistance: 50
            }
          },
          title: {
            text: 'Sales Funnel for Deals'
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                allowOverlap: true,
                y: 10
              },
              neckWidth: '30%',
              neckHeight: '25%',
              width: '80%',
              height: '80%'
            }
          },
          series: [{
            name: 'Total',
            data: [
              ['New', 65],
              ['Booking', 50],
              ['Invoice', 25],
              ['In Progress', 15],
              ['Deal Won', 5]
            ]
          }]
        });
      }
    } else if (tabName === "Sale") {
      if (document.getElementById("container-pie-countwise")) {
        await Highcharts.chart('container-pie-countwise', {
          chart: {
            style: {
              fontFamily: 'IBMPlexSansRegular sans-serif'
            },
            renderTo: 'container',
            type: 'pie',
            // width: 500,
            height: 400,
            borderWidth: 2,
            options3d: {
              enabled: true,
              alpha: 45
            }
          },
          title: {
            style: {
              fontSize: '12px'
            },
            text: 'Count wise Sale'
          },

          credits: {
            enabled: false
          },

          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 30,
            labelFormat: '{name} ({y})',
            navigation: {
              activeColor: '#3E576F',
              animation: true,
              arrowSize: 12,
              inactiveColor: '#CCC',
              style: {
                fontWeight: 'bold',
                color: '#333',
                fontSize: '12px'
              }
            }
          },

          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 45
            }
          },
          series: [{
            name: 'Total',
            data: [
              { name: 'Purchased', y: 100 },
              { name: 'Sale', y: 60 },
              { name: 'Pending', y: 40 }
            ]
          }]
        });
      }
      if (document.getElementById("container-pie-costwise")) {
        await Highcharts.chart('container-pie-costwise', {
          chart: {
            style: {
              fontFamily: 'IBMPlexSansRegular sans-serif'
            },
            renderTo: 'container',
            backgroundColor: "transparent",
            type: 'pie',
            options3d: {
              enabled: true,
              alpha: 45
            },
            // width: 500,
            height: 400,
            borderWidth: 2
          },
          title: {
            style: {
              fontSize: '12px'
            },
            text: 'Cost wise Sale'
          },
          credits: {
            enabled: false
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y: 30,
            labelFormat: '{name} ({y})',
            navigation: {
              activeColor: '#3E576F',
              animation: true,
              arrowSize: 12,
              inactiveColor: '#CCC',
              style: {
                fontWeight: 'bold',
                color: '#333',
                fontSize: '12px'
              }
            }
          },
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 45
            }
          },

          series: [{
            name:'Total',
            data: [
              { name: 'Purchased', y: 2000000 },
              { name: 'Sale', y: 1200000 },
              { name: 'Pending', y: 800000 }
            ]
          }]
        });
      }
    }
    await setIsStockDetailModal(false);
    await setIsOrderDetailModal(false);
  }
  function changeActiveStockTab(tabName) {
    setActiveStockTab(tabName);
    setSelectedStockType('Total');
  }
  async function toggleStockDetailsModal(activeTab) {
    await setActiveStockTab(activeTab);
    await setIsStockDetailModal(!isStockDetailModalOpen);
  }
  async function toggleOrderDetailsModal(activeTab) {
    if (activeTab === 'Carried Forward') {
      await setIsCarriedForwardModal(true);
      await setIsOrderDetailModal(false);
      await setIsHMILModal(false);
    } else if (activeTab === 'Bookings') {
      await setActiveOrderTab('Count Wise');
      await setIsOrderDetailModal(true);
      await setIsCarriedForwardModal(false);
      await setIsHMILModal(false);
    } else if (activeTab === 'HMIL') {
      await setIsOrderDetailModal(false);
      await setIsCarriedForwardModal(false);
      await setIsHMILModal(true);
    }
  }
  async function changeActiveOrderTab(activeTab) {
    await setActiveOrderTab(activeTab);
    await setAllocateBookingArray([]);
    await setAllocatedBooking(0);
  }
  async function setSelectedRow(variantName,e) {
    let row = e.currentTarget;
    if (row) {
      row.style.backgroundColor = "#f0f8ff";
    }
    setShowDetails(true);
    setVariantName(variantName);
  }
  async function setActiveFilterFuel(e) {
    let row = e.currentTarget;
    if (row) {
      row.style.backgroundColor = "#f0f8ff";
    }
  }
  async function setActiveFilterTransmission(e) {
    let row = e.currentTarget;
    if (row) {
      row.style.backgroundColor = "#f0f8ff";
    }
  }
  async function setActiveFilterColor(e) {
    let row = e.currentTarget;
    if (row) {
      row.classList.add('active-color');
    }
  }
  async function resetAllFilters(e) {
    let colorFilters = document.getElementsByClassName('colorFilter');
    let fuelTransmissionFilters = document.getElementsByClassName('fuelTransmissionFilter');
    for (let i = 0; i < colorFilters.length; i++) {
      if (colorFilters[i].classList.contains('active-color')) colorFilters[i].classList.remove('active-color');
    }
    for (let i = 0; i < fuelTransmissionFilters.length; i++) {
      fuelTransmissionFilters[i].style.backgroundColor = "#fff";
    }
  }
  async function selectVariantForAllotment(id, type, e) {
    if (e.target.checked) {
      document.getElementById(`booking-${id}`).style.backgroundColor = "#3eb74d61";
      document.getElementById(`stock-${id}`).style.backgroundColor = "#3eb74d61";
    } else {
      document.getElementById(`booking-${id}`).style.backgroundColor = "#fff";
      document.getElementById(`stock-${id}`).style.backgroundColor = "#fff";
    }
    if (type === 'Booking') {
      let arr = allocateBookingArray;
      const index = arr.indexOf(`booking-${id}`);
      if (index > -1) {
        arr.splice(index, 1);
      } else {
        arr.push(`booking-${id}`);
      }
      setAllocateBookingArray(arr);
      await setAllocatedBooking(arr.length);
    } else {
      let arr = orderBookingArray;
      const index = arr.indexOf(`booking-${id}`);
      if (index > -1) {
        arr.splice(index, 1);
      } else {
        arr.push(`booking-${id}`);
      }
      await setOrderBookingArray(arr);
      await setOrderBooking(arr.length);
    }
  }
  async function toggleOrderPopupVisibility() {
    await setOrderPopupVisibility(!isOrderPopupOpen);
    for (let i = 0; i < orderBooking; i++) {
      document.getElementById(orderBookingArray[i]).style.backgroundColor = "#fff";
      document.getElementById(`stock-${orderBookingArray[i].split('-')[1]}`).style.backgroundColor = "#fff";
    }
    await setOrderBookingArray([]);
    await setOrderBooking(0);
  }
  async function toggleAllocatePopupVisibility() {
    for (let i = 0; i < allocatedBooking; i++) {
      document.getElementById(allocateBookingArray[i]).style.backgroundColor = "#fff";
      document.getElementById(`stock-${allocateBookingArray[i].split('-')[1]}`).style.backgroundColor = "#fff";
    }
    await setAllocateBookingArray([]);
    await setAllocatedBooking(0);
  }
  async function toggleDropDownComponent(e, type) {
    e.preventDefault();
    if (type === dropDownComponent) {
      return setDropDownComponent('');
    }
    dropDownComponent = type;
    setDropDownComponent(dropDownComponent);
  }
  function monthYearFilterSelector(type, value) {
    setIsDisabled(!isDisabled);
    if (type === 'Month') {
      setSelectedMonth(value);
    } else {
      setSelectedYear(value);
    }
  }
  function monthYearFilterEditSelector(type, value) {
    setIsDisabled(!isDisabled);
    if (type === 'Month') {
      setSelectedEditMonth(value);
    } else {
      setSelectedEditYear(value);
    }
  }
  async function toggleAddHMILModal() {
    setAddHMILModalVisibility(!isAddHMILModalOpen);
  }
  async function setActiveStockType(e, type) {
    setSelectedStockType(type);
  }
  async function showSecurityMenu(e) {
    setShowSecurityMenu(!isShowSecurityMenu);
    let x = document.getElementById('userProfileMenu');
    if (isShowSecurityMenu) {
      document.getElementById("userProfileMenu").style.top = "14px";

    } else {
      document.getElementById("userProfileMenu").style.top = "64px";
    }
  }
  return (
    <div class="mainBodyContainer">
      <div class="row m-t-0">
        <div class="col-xs-5 p-l-0 p-r-0 m-t-15">
          <div class="row">
            <div class="col-xs-12 m-t-15 display-flex">
              <div class="pos-relative m-r-15">
                <button class="add-button month-button fs-15" onClick={(e, type='role') => toggleDropDownComponent(e, type)}>
                  {selectedRole}
                </button>
                {
                  (dropDownComponent && dropDownComponent === 'role') && (
                    <div class="drop-down-component-bulkupload drop-down-component-year" style="width: 115px; left: 0px;" position="bulkUpload-filter-section">
                      <div>
                        <p class="drop-down-value" onClick={() => setSelectedRole('MD')}>MD</p>
                        <p class="drop-down-value" onClick={() => setSelectedRole('CEO')}>CEO</p>
                        <p class="drop-down-value" onClick={() => setSelectedRole('Branch Manager')}>Branch Manager</p>
                      </div>
                    </div>
                  )
                }
              </div>
              <div class="pos-relative">
                <button class="add-button month-button m-r-15 fs-15" onClick={(e, type='month') => toggleDropDownComponent(e, type)}>
                  {selectedMonth ? selectedMonth : 'From'}
                </button>
                {
                  (dropDownComponent && dropDownComponent === 'month') && (
                    <div class="drop-down-component-bulkupload drop-down-component-month" style="width: 130px; left: 0px;" position="bulkUpload-filter-section">
                      <div>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'January 2020')}>January 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'February 2020')}>February 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'March 2020')}>March 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'April 2020')}>April 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'May 2020')}>May 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'June 2020')}>June 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'July 2020')}>July 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'August 2020')}>August 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'September 2020')}>September 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'October 2020')}>October 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'November 2020')}>November 2020</p>
                        <p class="drop-down-value" onClick={() => monthYearFilterSelector('Month', 'December 2020')}>December 2020</p>
                      </div>
                    </div>
                  )
                }
              </div>
              {selectedRole === 'MD' && (
                <div class="pos-relative">
                  <button class="add-button month-button fs-15" onClick={(e, type='year') => toggleDropDownComponent(e, type)}>
                    {selectedYear ? selectedYear : 'To'}
                  </button>
                  {
                    (dropDownComponent && dropDownComponent === 'year') && (
                      <div class="drop-down-component-bulkupload drop-down-component-year" style="width: 130px; left: 0px;" position="bulkUpload-filter-section">
                        <div>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'January 2021')}>January 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'February 2021')}>February 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'March 2021')}>March 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'April 2021')}>April 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'May 2021')}>May 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'June 2021')}>June 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'July 2021')}>July 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'August 2021')}>August 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'September 2021')}>September 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'October 2021')}>October 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'November 2021')}>November 2021</p>
                          <p class="drop-down-value" onClick={() => monthYearFilterSelector('Year', 'December 2021')}>December 2021</p>
                        </div>
                      </div>
                    )
                  }
                </div>
              )}
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 m-t-15">
              <table>
                <thead>
                  <tr>
                    <th>{(selectedRole === 'MD' || selectedRole === 'CEO' ) ? 'All Locations' : 'SSR'}</th>
                    <th class="has-text-center" style="width: 52px;">Enquiry</th>
                    <th class="has-text-center" style="width: 52px;">Booking</th>
                    <th class="has-text-center w-45px">Retail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="cursor-pointer" id="9" >
                    <td>Target</td>
                    <td class="has-text-center">130</td>
                    <td class="has-text-center">72</td>
                    <td class="has-text-center">62</td>
                  </tr>
                  <tr class="cursor-pointer" id="10" >
                    <td>Allocated</td>
                    <td class="has-text-center">100</td>
                    <td class="has-text-center">50</td>
                    <td class="has-text-center">42</td>
                  </tr>
                  <tr class="cursor-pointer" id="11" >
                    <td>Pending Allocation</td>
                    <td class="has-text-center" style="color: red;">30</td>
                    <td class="has-text-center" style="color: red;">22</td>
                    <td class="has-text-center" style="color: red;">20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-xs-7 p-l-0 p-r-0 m-t-15">
          <div id = "container-target-chart" style="border: 1px solid #ececec;"/>
        </div>
        <div class="col-xs-12 p-l-0 p-r-0 m-t-0">
          <div class="row">
            <div class="col-xs-12 m-t-15">
              <table>
                <thead>
                  <tr>
                    <th>{(selectedRole === 'MD' || selectedRole === 'CEO' ) ? 'All Locations' : 'SSR'}</th>
                    <th class="has-text-center w-45px">Santro</th>
                    <th class="has-text-center w-45px">NIOS</th>
                    <th class="has-text-center w-45px">Aura</th>
                    <th class="has-text-center w-45px">Verna</th>
                    <th class="has-text-center w-45px">Venue</th>
                    <th class="has-text-center" style="width:75px;">New Creta</th>
                    <th class="has-text-center w-45px">Elantra</th>
                    <th class="has-text-center w-45px">Tuscan</th>
                    <th class="has-text-center w-45px">Kona</th>
                    <th class="has-text-center" style="width:75px;">All New i20</th>
                    <th class="has-text-center w-45px">Alcazar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="cursor-pointer" id="9" >
                    <td>Enquiry</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">30</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                  </tr>
                  <tr class="cursor-pointer" id="10" >
                    <td>Booking</td>
                    <td class="has-text-center">08</td>
                    <td class="has-text-center">03</td>
                    <td class="has-text-center">08</td>
                    <td class="has-text-center">09</td>
                    <td class="has-text-center">03</td>
                    <td class="has-text-center">03</td>
                    <td class="has-text-center">05</td>
                    <td class="has-text-center">07</td>
                    <td class="has-text-center">03</td>
                    <td class="has-text-center">06</td>
                    <td class="has-text-center">03</td>
                  </tr>
                  <tr class="cursor-pointer" id="11" >
                    <td>Retail</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">16</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">18</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">30</td>
                    <td class="has-text-center">10</td>
                    <td class="has-text-center">20</td>
                    <td class="has-text-center">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {selectedRole === 'MD' && (
              <div class="col-xs-12 analytics-right-half-section">
                <div class="row accordian-row overflow-auto p-5 m-t-15">
                  <div class="accordion acc-single-open">
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>SSR</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">10</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Aundh</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">10</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Kharadi</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">10</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Kondhwa</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">10</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                              <td class="has-text-center">05</td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                              <td class="has-text-center">03</td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                              <td class="has-text-center">01</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedRole === 'CEO' && (
              <div class="col-xs-12 analytics-right-half-section">
                <div class="row accordian-row overflow-auto p-5 m-t-15">
                  <div class="accordion acc-single-open">
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>SSR</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Aundh</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Kharadi</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Kondhwa</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedRole === 'Branch Manager' && (
              <div class="col-xs-12 analytics-right-half-section">
                <div class="row accordian-row overflow-auto p-5 m-t-15">
                  <div class="accordion acc-single-open">
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Sales Executive 1</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Sales Executive 2</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Sales Executive 3</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="acc-container">
                      <div class="acc-title row">
                        <div class="col-xs-8">
                          <p>Sales Executive 4</p>
                        </div>
                      </div>
                      <div class="acc-content p-l-0">
                        <table>
                          <thead>
                            <tr>
                              <th>Variant</th>
                              <th class="has-text-center w-45px">Santro</th>
                              <th class="has-text-center w-45px">NIOS</th>
                              <th class="has-text-center w-45px">Aura</th>
                              <th class="has-text-center w-45px">Verna</th>
                              <th class="has-text-center w-45px">Venue</th>
                              <th class="has-text-center" style="width:75px;">New Creta</th>
                              <th class="has-text-center w-45px">Elantra</th>
                              <th class="has-text-center w-45px">Tuscan</th>
                              <th class="has-text-center w-45px">Kona</th>
                              <th class="has-text-center" style="width:75px;">All New i20</th>
                              <th class="has-text-center w-45px">Alcazar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cursor-pointer" id="9" >
                              <td>Enquiry</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="10" >
                              <td>Booking</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                            <tr class="cursor-pointer" id="11" >
                              <td>Retail</td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                              <td><input type="text" value="05"  class="has-text-center" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseCommitment;
