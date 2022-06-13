import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import axios from "axios";
import { route } from "preact-router";
import ApexCharts from 'apexcharts';
import CaseCommitment from "../../routes/caseCommitment";

const SalesWorkspace = () => {

  /*
      modified by Vihang
      modified at 13/05/2022
      modification : donut and bar chart sizes adjusted for mobile view
*/
  useEffect(async () => {
    let donutChartElement = document.querySelector("#donutChartSales");
    while (donutChartElement.firstChild) {
      donutChartElement.removeChild(donutChartElement.firstChild);
    }
    let barMarksChartElement = document.querySelector("#barMarksChartSales");
    while (barMarksChartElement.firstChild) {
      barMarksChartElement.removeChild(barMarksChartElement.firstChild);
    }
    let barMarkOptions = {
      series: [
        {
          name: 'Actual',
          color: '#cbcbcb',
          data: [
            {
              x: 'i20 N Line',
              y: 1292,
              goals: [
                {
                  name: 'Target',
                  value: 1400,
                  strokeHeight: 5,
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'Alcazar',
              y: 4432,
              goals: [
                {
                  name: 'Target',
                  value: 5400,
                  strokeHeight: 5,
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'Santro',
              y: 5423,
              goals: [
                {
                  name: 'Target',
                  value: 5200,
                  strokeHeight: 5,
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'Grand i10 Nios',
              y: 6653,
              goals: [
                {
                  name: 'Target',
                  value: 6500,
                  strokeHeight: 5,
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'Aura',
              y: 8133,
              goals: [
                {
                  name: 'Target',
                  value: 6600,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'All New i20',
              y: 7132,
              goals: [
                {
                  name: 'Target',
                  value: 7500,
                  strokeHeight: 5,
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'Venue',
              y: 7332,
              goals: [
                {
                  name: 'Target',
                  value: 8700,
                  strokeHeight: 5,
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'Next Gen Verna',
              y: 6553,
              goals: [
                {
                  name: 'Target',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'New Creta',
              y: 7332,
              goals: [
                {
                  name: 'Target',
                  value: 8700,
                  strokeHeight: 5,
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'Tucson',
              y: 7332,
              goals: [
                {
                  name: 'Target',
                  value: 8700,
                  strokeHeight: 5,
                  strokeColor: '#f08080'
                }
              ]
            },
            {
              x: 'Kona EV',
              y: 7332,
              goals: [
                {
                  name: 'Target',
                  value: 8700,
                  strokeHeight: 5,
                  strokeColor: '#f08080'
                }
              ]
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          columnWidth: '60%'
        }
      },
      colors: ['#00E396'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['Actual', 'Target'],
        markers: {
          fillColors: ['#00E396', '#f08080']
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width:180,
            height:250
          },
          legend: {
            position: 'bottom'
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '7px'
              }
            }
          }
        }
      }]
    };
    let barMarksChartSales = new ApexCharts(document.querySelector("#barMarksChartSales"), barMarkOptions);
    barMarksChartSales.render();

    let donutOptions = {
      series: [50, 30, 15, 5],
      chart: {
        type: 'donut',
        width: 400,
        height: 400
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%'
          }
        }
      },
      labels: ['5 Star', '4 Star', '3 Star', '2 Star'],
      colors: ['#f79256','#666d77' ,'#63e0f3','#f08080'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width:230,
            height:250
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
    let donutChartSales = new ApexCharts(document.querySelector("#donutChartSales"), donutOptions);
    donutChartSales.render();
  }, []);

  return (
    <div>
      <div class="workspace-cards col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class='row display-flex justify-between'>
          <div>
            <p class="fs-17">Sales Summary</p>
            <p class="fs-10">January 1, 2022 - February 1, 2022</p>
          </div>
          <div class="display-flex flex-direction-row">
            <button class="primary-button m-r-5 m-l-5">Weekly</button>
            <button class="primary-button m-r-5 m-l-5">Monthly</button>
          </div>
        </div>
        <div class="display-flex flex-direction-row" />
        <div class="display-flex flex-direction-row justify-between">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 display-flex m-t-20" style="align-self: top;justify-content:center">
            <div id="donutChartSales" />
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div class="cursor-pointer">
              <div id="barMarksChartSales" />
            </div>
          </div>
        </div>
      </div>
      <div class='row'>
        <div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 m-t-20 p-l-0' >
          <div class="workspace-cards fadeMoveUpAnimation">
            <div class="row justify-between align-center">
              <div>
                <span class="fs-14 cursor-pointer" onClick={(e) => route('/workspacedetails/visitWorkspace')}>CASE</span>
                <span class="workspace-cardsnumber fs-16 f-w-500 m-l-5">60</span>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0" >
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g/><g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/></g></svg>
                    <span class="fs-14">Enquiry</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">10</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g /><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
                    <span class="fs-14">Booking</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">10</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g><path d="M19,14V6c0-1.1-0.9-2-2-2H3C1.9,4,1,4.9,1,6v8c0,1.1,0.9,2,2,2h14C18.1,16,19,15.1,19,14z M17,14H3V6h14V14z M10,7 c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S11.66,7,10,7z M23,7v11c0,1.1-0.9,2-2,2H4c0-1,0-0.9,0-2h17V7C22.1,7,22,7,23,7z"/></g></svg>
                    <span class="fs-14">Retail</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">05</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                    <span class="fs-14">Delivery</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">05</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    <span class="fs-14">New</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">20</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg  class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><g/><path d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z"/></g></svg>
                    <span class="fs-14">Repeat</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">10</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 m-t-20 p-l-0'>
          <div class="workspace-cards fadeMoveUpAnimation">
            <div class="row justify-between align-center">
              <div>
                <span class="fs-14" onClick={(e) => route('//workspacedetails/visitWorkspace')}>DELIVERIES</span>
                <span class="workspace-cardsnumber fs-15 f-w-500 m-l-5">45</span>
              </div>
              {/*<button class=" primary-border-button m-l-13" onClick={(e) => route('/deliveryworkspace')}>VIEW DELIVERIES</button>*/}
            </div>
            <div class="row m-t-10">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0" >
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g/><g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/></g></svg>
                    <span class="fs-14">Completed</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">10</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><g><circle cx="9" cy="10.5" r="1"/><circle cx="15" cy="10.5" r="1"/><path d="M5.78,16h0.44C6.65,16,7,15.64,7,15.19V14h10v1.19c0,0.45,0.34,0.81,0.78,0.81h0.44c0.43,0,0.78-0.36,0.78-0.81v-6.5 c0,0-1.34-4.03-1.56-4.69c-0.05-0.16-0.12-0.29-0.19-0.4c-0.02-0.02-0.03-0.04-0.05-0.07C16.82,3.01,16.28,3,16.28,3H7.72 c0,0-0.54,0.01-0.92,0.54C6.78,3.56,6.77,3.58,6.75,3.6C6.68,3.71,6.61,3.84,6.56,4C6.34,4.66,5,8.69,5,8.69v6.5 C5,15.64,5.35,16,5.78,16z M8.33,5h7.34l0.23,0.69L16.33,7H7.67L8.33,5z M7,9.01V9h10v0.01V12H7V9.01z"/><polygon points="4,17.01 4,19 11,19 11,22 13,22 13,19 20,19 20,17.01"/></g></g></g></svg>
                    <span class="fs-14">Ongoing</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">20</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,20H4V4h16V20z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M5.78,18.5h0.44C6.65,18.5,7,18.14,7,17.69V16.5h10v1.19c0,0.45,0.34,0.81,0.78,0.81h0.44c0.43,0,0.78-0.36,0.78-0.81 v-6.5c-0.82-2.46-1.34-4.03-1.56-4.69c-0.05-0.16-0.12-0.29-0.19-0.4c-0.02-0.02-0.03-0.04-0.05-0.07 c-0.38-0.52-0.92-0.53-0.92-0.53H7.72c0,0-0.54,0.01-0.92,0.54C6.78,6.06,6.77,6.08,6.75,6.1C6.68,6.21,6.61,6.34,6.56,6.5 C6.34,7.16,5.82,8.72,5,11.19v6.5C5,18.14,5.35,18.5,5.78,18.5z M8.33,7.5h7.34l0.23,0.69l0.43,1.31H7.67L8.33,7.5z M7,11.51V11.5 h10v0.01v2.99H7V11.51z"/></g></g></svg>
                    <span class="fs-14">Postponed</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">05</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                    <span class="fs-14">View Tommorow's Delivery</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">10</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 m-t-20 p-l-0'>
          <div class="workspace-cards fadeMoveUpAnimation">
            <div class="row justify-between align-center">
              <div>
                <span class="fs-14">CONVERSION RATE</span>
                <span class="workspace-cardsnumber fs-15 f-w-500 m-l-5">31%</span>
              </div>
            </div>
            <div class="row m-t-10">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0" >
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M1 21h12v2H1v-2zM5.24 8.07l2.83-2.83 14.14 14.14-2.83 2.83L5.24 8.07zM12.32 1l5.66 5.66-2.83 2.83-5.66-5.66L12.32 1zM3.83 9.48l5.66 5.66-2.83 2.83L1 12.31l2.83-2.83z"/></svg>
                    <span class="fs-14">Legal</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">06</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><path d="M0 0h24v24H0z" fill="none"/><path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zm0 16H2V5h20v14zM21 6h-7v5h7V6zm-1 2l-2.5 1.75L15 8V7l2.5 1.75L20 7v1zM9 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.59c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V18h12v-1.41zM5.48 16c.74-.5 2.22-1 3.52-1s2.77.49 3.52 1H5.48z"/></svg>
                    <span class="fs-14">Individual</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">10</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z"/></svg>
                    <span class="fs-14">Total Handover</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">05</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L11.77 14H3v-2l3-7h9v10zm4-12h4v12h-4z"/></svg>
                    <span class="fs-14">Rejected</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">05</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.99 14.04V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10.05c.28 1.92 2.1 3.35 4.18 2.93 1.34-.27 2.43-1.37 2.7-2.71.25-1.24-.16-2.39-.94-3.18zm-2-9.04L12 8.5 5 5h13.99zm-3.64 10H5V7l7 3.5L19 7v6.05c-.16-.02-.33-.05-.5-.05-1.39 0-2.59.82-3.15 2zm5.15 2h-4v-1h4v1z"/></svg>
                    <span class="fs-14">On Hold</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">05</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 m-t-20 p-l-0 p-r-0'>
          <div class="workspace-cards fadeMoveUpAnimation">
            <div class="row justify-between align-center">
              <div>
                <span class="fs-14 cursor-pointer" onClick={(e) => route('/displaycarsworkspace')}>TEST DRIVE</span>
                <span class="workspace-cardsnumber fs-15 f-w-500 m-l-5">20</span>
              </div>
              {/*<button class=" primary-border-button m-l-13" onClick={(e) => route('/displaycarsworkspace')} >VIEW FLEET</button>*/}
            </div>
            <div class="row m-t-10">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0" >
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 5c.83 0 1.5-.67 1.5-1.5 0-1-1.5-2.7-1.5-2.7s-1.5 1.7-1.5 2.7c0 .83.67 1.5 1.5 1.5zm-5 0c.83 0 1.5-.67 1.5-1.5 0-1-1.5-2.7-1.5-2.7s-1.5 1.7-1.5 2.7c0 .83.67 1.5 1.5 1.5zM7 5c.83 0 1.5-.67 1.5-1.5C8.5 2.5 7 .8 7 .8S5.5 2.5 5.5 3.5C5.5 4.33 6.17 5 7 5zm11.92 3.01C18.72 7.42 18.16 7 17.5 7h-11c-.66 0-1.21.42-1.42 1.01L3 14v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 9h10.29l1.04 3H5.81l1.04-3zM19 19H5v-4.66l.12-.34h13.77l.11.34V19z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></svg>
                    <span class="fs-14">Cleaned cars</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">35</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M18,1c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S20.76,1,18,1z M18.5,7h-1V3h1V7z M18.5,8v1h-1V8H18.5z M6,13.5 C6,12.67,6.67,12,7.5,12S9,12.67,9,13.5S8.33,15,7.5,15S6,14.33,6,13.5z M19,12.93c0.65-0.09,1.34-0.28,2-0.6h0V19 c0,0.55-0.45,1-1,1h-1c-0.55,0-1-0.45-1-1v-1H6v1c0,0.55-0.45,1-1,1H4c-0.55,0-1-0.45-1-1v-8l2.08-5.99C5.29,4.42,5.84,4,6.5,4 l4.79,0C11.1,4.63,11,5.31,11,6H6.85L5.81,9h5.86v0c0.36,0.75,0.84,1.43,1.43,2L5,11v5h14L19,12.93z M17.91,13 c-0.89-0.01-1.74-0.19-2.53-0.51C15.15,12.76,15,13.11,15,13.5c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5 C18,13.32,17.97,13.16,17.91,13z"/></g></g></svg>
                    <span class="fs-14">Dirty Cars</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">05</span></span>
                </div>
                <div class="flex-sb borderteambottom p-b-8 p-t-8">
                  <div class="flex-sb">
                    <svg class="m-r-8" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B8BBB"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M20,3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V5 C22,3.9,21.1,3,20,3z M20,19H4V5h16V19z" fill-rule="evenodd"/><polygon fill-rule="evenodd" points="19.41,10.42 17.99,9 14.82,12.17 13.41,10.75 12,12.16 14.82,15"/><rect fill-rule="evenodd" height="2" width="5" x="5" y="7"/><rect fill-rule="evenodd" height="2" width="5" x="5" y="11"/><rect fill-rule="evenodd" height="2" width="5" x="5" y="15"/></g></g></svg>
                    <span class="fs-14">Out for Display</span>
                  </div>
                  <span class="color-header-blue p-l-12 p-r-24 "><span class="fs-14">10</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesWorkspace;
