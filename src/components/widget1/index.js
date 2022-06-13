import { h } from 'preact';
import { useState, useEffect,useRef } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { startLoader, stopLoader, formatDateTime, getFormattedAmount, applyAclForFeedAndChat } from '../../lib/utils';
import { getItem, setItem, removeAll } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import ApexCharts from 'apexcharts';
import Tabs from '../tabs';
import { Tooltip } from 'highcharts';

// modified by Vihang
// modified on 17-02-2022
// modification: changed the width and height of the graph to 100%

// data for the sparklines that appear below header area
// let sparklineData = [47, 45, 54, 38, 56, 24, 65, 31];
// let date = ['2018-09-01', '2018-09-02', '2018-09-03', '2018-09-04','2018-09-05', '2018-09-06', '2018-09-07', '2018-09-08'];

const Widget1 = (props) => {
  useEffect(() => {
    let sparklineData = props.data;
    let label = props.label;
    let dataName = props.dataName;
    // let data = randomizeArray(sparklineData);
    let spark3 = {
      chart: {
        id: props.graphID,
        // to make the allthe  graphs synchronised
        // group: 'sparklines',
        type: 'area',
        height:"100%",
        width:"100%",
        sparkline: {
          enabled: true
        }
      },

      stroke: {
        curve: 'smooth',
        width:1
      },
      fill: {
        opacity: 1
      },
      series: [{
        name: dataName,
        data: sparklineData
      }],
      labels: label,
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        min: 0
      },

      colors: [props.graphColor],

      subtitle: {
        text: '',
        offsetX: 30,
        style: {
          fontSize: '14px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      tooltip: {
        enabled: true,
        fixed: {
          enabled: true,
          position: 'topRight',
          offsetX: 0,
          offsetY: -60
        }
      }
    };
    if (document.querySelector('#' + props.graphID)){
      new ApexCharts(document.querySelector('#' + props.graphID), spark3).render();
    }

  },[]);


  let randomizeArray = function (arg) {
    let array = arg.slice();
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  function activeTab() {
    props.setActivePageMenu(props.activeTab);
    props.setActiveSubTab(props.activeSubTab);
  }
  return (
    <div>
      <div class="MuiPaper-root flex-wrap MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root w-full rounded-20 shadow muiltr-1kiq63u display-flex flex-direction-column cursor-pointer" onClick={(e) => activeTab()}  style={`height:${props.height}`}>
        <div class="p-8 p-b-2" style={`height:${props.contentHeight}`}>
          <p class="MuiTypography-root MuiTypography-body1 fs-16 font-medium muiltr-ehddlr">{props.widgetTitle}</p>
          <div class="flex flex-wrap items-center m-t-5" style="justify-content: space-between;">
            <p class={`MuiTypography-root MuiTypography-body1 ${props.targetFontSize} text-black font-semibold leading-none tracking-tighter muiltr-ehddlr`} style={`color:${props.totalTargetColor}`}>{props.totalTarget}</p>
            <div class="flex m-l-5">

              <div class="m-l-5 flex items-center flex-col" style="align-items: self-end;">
                <p class="fs-12 MuiTypography-root MuiTypography-body1 font-semibold muiltr-1nr4w8u">{props.target}</p>
                <p class="fs-14 MuiTypography-root MuiTypography-body1 whitespace-nowrap mx-4 muiltr-1nr4w8u m-r-0">{props.targetDays}</p>
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex;position:absolute;margin-top:75px">
          <div class="bookmarkRibbon"><span style="color: white;
    display: flex;
    position: relative;
    top: -6px;
    padding-left: 2px;">Completed</span></div>
        </div>
        { props.isGraph && (
          <div class="" style={`height:${props.graphHeight}`}>
            <div id={props.graphID}/>
          </div>
        )
        }
      </div>
    </div>
  );
};

export default Widget1;
