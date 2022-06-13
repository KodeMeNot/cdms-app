import { h, Component } from 'preact';
import { useState } from 'preact/hooks';
import { route } from "preact-router";
/*
        modified by Vihang
        modified at 13/05/2022
        modification : mobile bottom Navigation component
  */
const MobileBottomNavigation = (props) => {
  return (
    <nav class="mobile-bottom-nav is-hide-Desktop">
      <div class={`mobile-bottom-nav__item ${props.props.path === "/workspace" ? "bor-t-479393":""}`} onClick={(e)=> route(`/workspace`)}>
        <div class="mobile-bottom-nav__item-content align-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill={props.props.path === "/workspace" ? "#479393":"#808080"}><g><rect fill="none" height="24" width="24" /></g><g><g><path d="M6,15c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S4.9,15,6,15 M6,13c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S8.2,13,6,13z M12,5 c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S10.9,5,12,5 M12,3C9.8,3,8,4.8,8,7s1.8,4,4,4s4-1.8,4-4S14.2,3,12,3z M18,15 c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S16.9,15,18,15 M18,13c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S20.2,13,18,13z" /></g></g></svg>
          <span class={props.props.path === "/workspace" ? "text-479393" : ""}>Workspace</span>
        </div>
      </div>
      <div class={`mobile-bottom-nav__item ${props.props.type === "dayPlanWorkspace" ? "bor-t-479393":""}`} onClick={(e)=> route('/workspacedetails/dayPlanWorkspace')}>
        <div class="mobile-bottom-nav__item-content align-center justify-center"  >
          <svg xmlns='http://www.w3.org/2000/svg' version='1.1'  class='NavIcon SidebarTopNavLinks-typeIcon CheckNavIcon' viewBox='0 0 40 40' width='24' height='24'><path d='M20,2.5C10.4,2.5,2.5,10.4,2.5,20S10.4,37.5,20,37.5S37.5,29.6,37.5,20S29.6,2.5,20,2.5z M20,34.5C12,34.5,5.5,28,5.5,20S12,5.5,20,5.5S34.5,12,34.5,20S28,34.5,20,34.5z M27.7,15c0.6,0.6,0.6,1.5,0,2.1l-10,10c-0.2,0.2-0.6,0.3-1,0.3c-0.4,0-0.8-0.1-1.1-0.4l-4.1-4.1c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l3.1,3.1l8.9-8.9C26.2,14.4,27.1,14.4,27.7,15z' fill={props.props.type === "dayPlanWorkspace" ? "#479393":"#808080"} /></svg>
          <span class={props.props.type === "dayPlanWorkspace" ? "text-479393" : ""}>Day Plan</span>
        </div>
      </div>
      <div class={`mobile-bottom-nav__item ${props.props.type === "inboxWorkspace" ? "bor-t-479393":""}`} onClick={(e)=> route('/workspacedetails/inboxWorkspace')}>
        <div class="mobile-bottom-nav__item-content align-center justify-center"  >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill={props.props.type === "inboxWorkspace" ? "#479393":"#808080"}><path d="M4 20Q3.175 20 2.588 19.413Q2 18.825 2 18V6Q2 5.175 2.588 4.588Q3.175 4 4 4H20Q20.825 4 21.413 4.588Q22 5.175 22 6V18Q22 18.825 21.413 19.413Q20.825 20 20 20ZM12 13 4 8V18Q4 18 4 18Q4 18 4 18H20Q20 18 20 18Q20 18 20 18V8ZM12 11 20 6H4ZM4 8V6V8V18Q4 18 4 18Q4 18 4 18Q4 18 4 18Q4 18 4 18Z"/></svg>
          <span class={props.props.type === "inboxWorkspace" ? "text-479393" : ""}>Inbox</span>
        </div>
      </div>

      <div class={`mobile-bottom-nav__item ${props.props.type === "callsWorkspace" ? "bor-t-479393":""}`} onClick={(e)=> route('/workspacedetails/callsWorkspace')}>
        <div class="mobile-bottom-nav__item-content align-center justify-center">
          <svg xmlns='http://www.w3.org/2000/svg' version='1.1' class='NavIcon SidebarTopNavLinks-typeIcon GoalNavIcon' viewBox='0 0 40 40' width='24' height='24'><path d='M35.6,30.1l-6.2-9.6C31,18.5,32,15.9,32,13c0-6.6-5.4-12-12-12C13.4,1,8,6.4,8,13c0,2.9,1,5.5,2.7,7.6l-6.2,9.6  c-1.2,1.8-1.3,4-0.2,5.9c1,1.9,2.9,3,5.1,3h21.5c2.1,0,4-1.1,5.1-3S36.7,31.9,35.6,30.1z M11,13c0-5,4-9,9-9c5,0,9,4,9,9  c0,1.8-0.5,3.5-1.4,4.9l-2.7-4.2c-1.1-1.6-2.9-2.6-4.8-2.6c-1.9,0-3.7,1-4.8,2.6l-2.7,4.2C11.5,16.5,11,14.8,11,13z M25.5,20.2  C23.9,21.3,22.1,22,20,22s-3.9-0.7-5.5-1.9l3.2-4.8c0.5-0.8,1.4-1.2,2.3-1.2c0.9,0,1.8,0.5,2.3,1.2L25.5,20.2z M33.2,34.6  c-0.5,0.9-1.4,1.4-2.4,1.4H9.2c-1,0-1.9-0.5-2.4-1.4c-0.5-0.9-0.4-1.9,0.1-2.8l6-9.1c2,1.5,4.4,2.3,7.1,2.3c2.7,0,5.1-0.9,7.1-2.3  l6,9.1C33.6,32.6,33.7,33.7,33.2,34.6z' fill={props.props.type === "callsWorkspace" ? "#479393":"#808080"} /></svg>
          <span class={props.props.type === "callsWorkspace" ? "text-479393" : ""}>Calls</span>
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;
