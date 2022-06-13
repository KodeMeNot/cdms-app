import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import axios from "axios";
import { route } from "preact-router";
let Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require("highcharts/highcharts-3d")(Highcharts);
require("highcharts/modules/gantt")(Highcharts);
require('highcharts/modules/funnel3d')(Highcharts);
require('highcharts/modules/drilldown')(Highcharts);
require('highcharts/modules/cylinder')(Highcharts);
import CaseCommitment from "../../routes/caseCommitment";
const Teamsworkspace = () => {

  useEffect(async () => {
    if (document.getElementById("container-pie-ordered")) {
      await Highcharts.chart('container-pie-ordered', {
        chart: {
          style: {
            fontFamily: 'PTSerif, sans-serif'
          },
          renderTo: 'container',
          type: 'pie',
          // width: 630,
          height: 250
          // borderWidth: 2
        },
        title: {
          style: {
            fontSize: '15px',
            color: 'rgb(64, 139, 139)'
          },
          text: 'Active Cases'
        },

        credits: {
          enabled: false
        },
        legend: {
          layout: 'vertical',
          // align: 'right',
          verticalAlign: 'top',
          y: 10,
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
        series: [{
          name: 'Active Cases',
          data: [
            { name: 'Enquiry', y: 40 },
            { name: 'Pre-Booking', y: 20 },
            { name: 'Booking', y: 30 },
            { name: 'Delivery', y: 50 },
            { name: 'Retail', y: 10 }
          ]
        }]
      });
    }
    if (document.getElementById("container-pie-orderedtask")) {
      await Highcharts.chart('container-pie-orderedtask', {
        chart: {
          style: {
            fontFamily: 'PTSerif, sans-serif'
          },
          renderTo: 'container',
          type: 'pie',
          // width: 630,
          height: 250
          // borderWidth: 2
        },
        title: {
          style: {
            fontSize: '15px',
            color: 'rgb(64, 139, 139)'
          },
          text: 'In-Process'
        },

        credits: {
          enabled: false
        },
        legend: {
          layout: 'vertical',
          // align: 'right',
          verticalAlign: 'top',
          y: 10,
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
        series: [{
          name: 'Total',
          data: [
            { name: 'Delayed', y: 40 },
            { name: 'On-Time', y: 20 },
            { name: 'Postponed', y: 30 },
            { name: 'Escalated', y: 60 }
          ]
        }]
      });
    }
    if (document.getElementById("container-target-chart")) {
      Highcharts.chart('container-target-chart', {
        chart: {
          type: 'column',
          height: 200
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: [
            'Santro',
            'NIOS',
            'Aura',
            'Verna',
            'Venue',
            'New Creta',
            'Elantra',
            'Tuscan',
            'Kona',
            'All New i20',
            'Alcazar'
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
        // plotOptions: {
        //   column: {
        //     pointPadding: 0.2,
        //     borderWidth: 0
        //   }
        // },
        series: [{
          name: 'Achieved',
          data: [49, 71, 49, 71, 50, 106, 49, 95, 90, 14, 71]
        }, {
          name: 'Target',
          data: [83, 78, 83, 78, 89, 98, 83, 88, 35, 28, 78]

        }]
      });
    }
    if (document.getElementById("container-funnel")) {
      await Highcharts.chart('container-funnel', {
        chart: {
          type: 'funnel3d',
          height: 300,
          // borderWidth: 2,
          options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 50
          },
          style: {
            fontFamily: 'PTSerif, sans-serif'
          }
        },
        title: {
          text: 'Sales Funnel'
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b> ({point.y:,.0f})',
              allowOverlap: true,
              y: 1
            },
            neckWidth: '30%',
            neckHeight: '25%',
            width: '50%',
            height: '70%'
          }
        },
        series: [{
          name: 'Total',
          data: [
            ['Total Leads', 40],
            ['Total Enquiries', 30],
            ['Total Bookings', 50]
          ]
        }]
      });
    }
  }, []);
  return (
    <div class="mainBodyContainerteamworkspace">
      <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 p-l-0">
          <div class="row p-15 borderteambottom">
            <span class="fs-20 col-xs-6 col-sm-6 col-md-6 col-lg-6 p-l-0">TEAMS</span>
            <span class="fs-12 col-xs-6 col-sm-6 col-md-6 col-lg-6 align-self-center display-flex justify-right">All Teams<svg class="p-l-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" /></svg></span>
          </div>
          <div class="teamscroll">
            <div class="row" >
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6  p-15 borderteambottom selectedbackground">
                <div class="round_iconteams">
                  <p class="fs-12 p-b-10">YN</p>
                </div>
                <div class="p-t-10">
                  <span>Yash Nadkarni</span>
                </div>
                <div>
                  <span class="fs-12"> Sub-Title <svg class="p-l-6 verticalalignbot" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" /></svg></span>
                </div>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6  p-15 borderteambottom borderteamleft" >
                <div class="round_iconteams">
                  <p class="fs-12 p-b-10">MS</p>
                </div>
                <div class="p-t-10">
                  <span>Manohar Sule</span>
                </div>
                <div>
                  <span class="fs-12"> Sub-Title <svg class="p-l-6 verticalalignbot" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" /></svg></span>
                </div>
              </div>
            </div>
            <div class="row" >
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6  p-15 borderteambottom " >
                <div class="round_iconteams">
                  <p class="fs-12 p-b-10">GS</p>
                </div>
                <div class="p-t-10">
                  <span>Ganesh Shinde</span>
                </div>
                <div>
                  <span class="fs-12"> Sub-Title <svg class="p-l-6 verticalalignbot" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" /></svg></span>
                </div>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6  p-15 borderteambottom borderteamleft" >
                <div class="round_iconteams">
                  <p class="fs-12 p-b-10">VM</p>
                </div>
                <div class="p-t-10">
                  <span>Vaibhav Mathkari</span>
                </div>
                <div>
                  <span class="fs-12"> Sub-Title <svg class="p-l-6 verticalalignbot" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" /></svg></span>
                </div>
              </div>
            </div>
            <div class="row" >
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6  p-15 borderteambottom " >
                <div class="round_iconteams">
                  <p class="fs-12 p-b-10">RD</p>
                </div>
                <div class="p-t-10">
                  <span>Rutuja Dahatonde</span>
                </div>
                <div>
                  <span class="fs-12"> Sub-Title <svg class="p-l-6 verticalalignbot" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" /></svg></span>
                </div>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6  p-15 borderteambottom borderteamleft" >
                <div class="round_iconteams">
                  <p class="fs-12 p-b-10">YC</p>
                </div>
                <div class="p-t-10">
                  <span>Yashvi Choudhary</span>
                </div>
                <div>
                  <span class="fs-12"> Sub-Title <svg class="p-l-6 verticalalignbot" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" /></svg></span>
                </div>
              </div>
            </div>
            <div class="row" >
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6  p-15 borderteambottom " >
                <div class="round_iconteams">
                  <p class="fs-12 p-b-10">VK</p>
                </div>
                <div class="p-t-10">
                  <span>Vihaang Kale</span>
                </div>
                <div>
                  <span class="fs-12"> Sub-Title <svg class="p-l-6 verticalalignbot" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" /></svg></span>
                </div>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6  p-15 borderteambottom borderteamleft" >
                <div class="round_iconteams">
                  <p class="fs-12 p-b-10">PB</p>
                </div>
                <div class="p-t-10">
                  <span>Pratik Bagmare</span>
                </div>
                <div>
                  <span class="fs-12"> Sub-Title <svg class="p-l-6 verticalalignbot" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><rect fill="none" height="24" width="24" /><path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" /></svg></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 p-r-0 borderteamleft">
          <div class="row p-15">
            <span class="fs-15 col-xs-5 col-sm-5 col-md-5 col-lg-5">Yash Nadkarni-Details</span>
            <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 display-flex p-l-0 justify-right">
              {/* Add Date picker */}<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
            </div>
          </div>
          <div class="teamscroll">
            <div class="row justify-around">
              <span class="col-xs-3 col-sm-3 col-md-3 col-lg-3  text-align-center filterteamborder cursor-pointer">Weekly</span>
              <span class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-align-center filterteamborder cursor-pointer color-white">Monthly</span>
              <span class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-align-center filterteamborder cursor-pointer">Yearly</span>
            </div>
            <div>
              <div class="row p-l-25 p-r-25 p-t-0">
                <div class="workspace-cards cursor-pointer col-xs-12 col-sm-12 col-md-12 col-lg-12 p-b-20 p-t-10">
                  <div class="display-flex flex-direction-row">
                    <div class="casetext col-xs-4 col-sm-4 col-md-4 col-lg-4 display-flex flex-direction-column">
                      <span class="fs-15 p-t-4">CASES</span>
                      <div class="display-flex p-t-20 flex-direction-column">

                        <div class="display-flex flex-direction-row">
                          <span class="colorcodedot bg-teal" />
                          <span class="fs-15 p-l-10">
                            200
                          </span>
                        </div>
                        <span class="fs-12 p-l-20">
                          Total Cases
                        </span>
                      </div>
                      <div class="display-flex p-t-20 flex-direction-column">
                        <div class="display-flex flex-direction-row">
                          <span class="colorcodedot bg-green" />
                          <span class="fs-15 p-l-10">
                            150
                          </span>
                        </div>
                        <span class="fs-12 p-l-20">
                          Active Cases
                        </span>
                      </div>
                      <div class="display-flex p-t-20 flex-direction-column">
                        <div class="display-flex flex-direction-row">
                          <span class="colorcodedot bg-red" />
                          <span class="fs-15 p-l-10">
                            50
                          </span>
                        </div>
                        <span class="fs-12 p-l-20">
                          Dropped Cases
                        </span>
                      </div>
                    </div>
                    <div class="casegraph col-xs-8 col-sm-8 col-md-8 col-lg-8">
                      <div id="container-pie-ordered" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row p-l-25 p-r-25 p-t-0">
                <div class="workspace-cards cursor-pointer col-xs-12 col-sm-12 col-md-12 col-lg-12 p-b-20 p-t-10">
                  <div class="display-flex flex-direction-row">
                    <div class="casetext col-xs-4 col-sm-4 col-md-4 col-lg-4 display-flex flex-direction-column">
                      <div class=" cursor-pointer">
                        <div class="display-flex workspace-cards flex-direction-column">
                          <span class="fs-14  p-10" >Average Time To Complete a Case</span>
                          <div class="display-flex flex-direction-row">
                            <span class="fs-15 color-header-blue ls-1 p-t-30 p-l-10 p-b-15 p-r-22"><span class="fs-20">4</span> Months</span>
                            <svg class="align-self-center flex-grow-1" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="darkseagreen"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z" /></svg>
                          </div>
                        </div>
                      </div>
                      <div class=" cursor-pointer p-t-20">
                        <div class="display-flex workspace-cards flex-direction-column ">
                          <span class="fs-14  p-10" >Average Follow Up's Per Case</span>
                          <div class="display-flex flex-direction-row">
                            <span class="fs-20 color-header-blue ls-1 p-t-30 p-l-10 p-b-15 p-r-68">20</span>
                            <svg class="align-self-center flex-grow-1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="40px" viewBox="0 0 24 24" width="40px" fill="skyblue"><rect fill="none" height="24" width="24" /><path d="M9.5,5.5c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S8.4,5.5,9.5,5.5z M5.75,8.9L3,23h2.1l1.75-8L9,17v6h2v-7.55L8.95,13.4 l0.6-3C10.85,12,12.8,13,15,13v-2c-1.85,0-3.45-1-4.35-2.45L9.7,6.95C9.35,6.35,8.7,6,8,6C7.75,6,7.5,6.05,7.25,6.15L2,8.3V13h2 V9.65L5.75,8.9 M13,2v7h3.75v14h1.5V9H22V2H13z M18.01,8V6.25H14.5v-1.5h3.51V3l2.49,2.5L18.01,8z" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                      <div id="container-funnel" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row p-l-25 p-r-25 p-t-0" onClick={(e) => route('/caseCommitment')}>
                <div class="workspace-cards cursor-pointer col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="display-flex flex-direction-row p-5 ">
                    <div className=" col-xs-4 col-sm-4 col-md-4 col-lg-4 text-align-center borderbottomgrey p-b-3"><span>Enquiry</span></div>
                    <div className=" col-xs-4 col-sm-4 col-md-4 col-lg-4 text-align-center"><span>Booking</span></div>
                    <div className=" col-xs-4 col-sm-4 col-md-4 col-lg-4 text-align-center"><span>Retail</span></div>
                  </div>
                  <div class="p-t-10" id="container-target-chart"  />
                </div>
              </div>
              <div class="row p-l-25 p-r-25 p-t-0">
                <div class="workspace-cards cursor-pointer col-xs-12 col-sm-12 col-md-12 col-lg-12 p-b-20 p-t-10">
                  <div class="display-flex flex-direction-row">
                    <div class="casetext col-xs-4 col-sm-4 col-md-4 col-lg-4 display-flex flex-direction-column">
                      <span class="fs-15 p-t-4">TASKS</span>
                      <div class="display-flex p-t-20 flex-direction-column">
                        <div class="display-flex flex-direction-row">
                          <span class="colorcodedot bg-teal" />
                          <span class="fs-15 p-l-10">
                            200
                          </span>
                        </div>
                        <span class="fs-12 p-l-20">
                          Total Tasks
                        </span>
                      </div>
                      <div class="display-flex p-t-20 flex-direction-column">
                        <div class="display-flex flex-direction-row">
                          <span class="colorcodedot bg-green" />
                          <span class="fs-15 p-l-10">
                            150
                          </span>
                        </div>
                        <span class="fs-12 p-l-20">
                          In Progress
                        </span>
                      </div>
                      <div class="display-flex p-t-20 flex-direction-column">
                        <div class="display-flex flex-direction-row">
                          <span class="colorcodedot bg-red" />
                          <span class="fs-15 p-l-10">
                            50
                          </span>
                        </div>
                        <span class="fs-12 p-l-20">
                          Completed Tasks
                        </span>
                      </div>
                    </div>
                    <div class="casegraph col-xs-8 col-sm-8 col-md-8 col-lg-8">
                      <div id="container-pie-orderedtask" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row p-l-25 p-r-25 p-t-0">
                <div class=" cursor-pointer col-xs-12 col-sm-12 col-md-12 col-lg-12 p-l-0 p-r-0 display-flex flex-direction-row justify-around">
                  <div class="workspace-cards col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <span class="fs-14  p-10 justify-centercontent display:flex" >Working Days</span>
                    <div class="display-flex flex-direction-row">
                      <span class="fs-15 color-header-blue ls-1 p-t-30 p-l-10 p-b-15 p-r-22"><span class="fs-25 p-r-10">20</span></span>
                      <svg class="align-self-center flex-grow-1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="40px" viewBox="0 0 20 20" width="40px" fill="darkseagreen"><g /><g><g><g><path d="M16.5,6H12V3.5C12,2.67,11.33,2,10.5,2h-1C8.67,2,8,2.67,8,3.5V6H3.5C2.67,6,2,6.67,2,7.5v9C2,17.33,2.67,18,3.5,18h13 c0.83,0,1.5-0.67,1.5-1.5v-9C18,6.67,17.33,6,16.5,6z M9.5,3.5h1v4h-1V3.5z M16.5,16.5h-13v-9H8C8,8.33,8.67,9,9.5,9h1 C11.33,9,12,8.33,12,7.5h4.5V16.5z" /></g><g><rect height="1.5" width="3" x="12" y="10" /></g><g><rect height="1.5" width="3" x="12" y="12.5" /></g><g><circle cx="7.5" cy="11.25" r="1.25" /></g><g><path d="M9.24,13.36C8.7,13.13,8.12,13,7.5,13c-0.62,0-1.2,0.13-1.74,0.36C5.3,13.56,5,14.01,5,14.52V15h5v-0.48 C10,14.01,9.7,13.56,9.24,13.36z" /></g></g></g></svg>
                    </div>
                  </div>
                  <div class="workspace-cards col-xs-3 col-sm-3 col-md-3 col-lg-3 justify-centercontent display:flex"> <span class="fs-14  p-10">Leaves</span>
                    <div class="display-flex flex-direction-row">
                      <span class="fs-15 color-header-blue ls-1 p-t-30 p-l-10 p-b-15 p-r-22"><span class="fs-25 p-r-10">10</span></span>
                      <svg class="align-self-center flex-grow-1" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="darkseagreen"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                    </div></div>
                  <div class="workspace-cards col-xs-3 col-sm-3 col-md-3 col-lg-3"> <span class="fs-14  p-10 justify-centercontent display:flex">Appriciations</span>
                    <div class="display-flex flex-direction-row">
                      <span class="fs-15 color-header-blue ls-1 p-t-30 p-l-10 p-b-15 p-r-22"><span class="fs-25 p-r-10">5</span></span>
                      <svg class="align-self-center flex-grow-1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="40px" viewBox="0 0 20 20" width="40px" fill="darkseagreen"><g /><g><g><path d="M13.16,13.29l-2.27-0.19l-0.56-1.31l2.45-1.63C12.92,10.06,13,9.9,13,9.73V3H7v6.73c0,0.17,0.08,0.32,0.22,0.42l2.45,1.63 l-0.56,1.31l-2.27,0.19l1.72,1.49L8.05,17L10,15.82L11.95,17l-0.52-2.22L13.16,13.29z M10.5,4H12v5.46l-1.5,1V4z M9.5,10.46 l-1.5-1V4h1.5V10.46z" /></g></g></svg>
                    </div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teamsworkspace;
