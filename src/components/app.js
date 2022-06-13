import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Match } from 'preact-router/src/match';
import NetworkInformationApiPolyfill from '../../node_modules/network-information-api-polyfill/src';
import { useEffect, useState } from 'preact/hooks';

import SlowInternetSpeed from '../components/slowInternet';
import BrowserNotSupported from '../routes/pages/browserNotSupport';
import NoInternet from '../components/noInternet';
import { RightInfoPanel } from '../components/rightInfoPanel';
import Createvisitmodal from "../components/createvisitmodal";
import CountryCode from "../components/countryCode";
import Login from '../routes/login';
import LoginPage from '../routes/loginPage';
import Workspace from '../routes/workspace';
import SetNewPassword from '../routes/setNewPassword';
import SetPasswordToVerify from '../routes/setPasswordToVerify';
import Profile from '../routes/profile';
import Workspacedetails from '../routes/workspacedetails';
import SiloAdministration from '../routes/siloAdministration';
import Organization from '../routes/organization';
import CaseDetail from '../routes/caseDetail';

const App = () => {
// export default class App extends Component {
/** Gets fired when the route changes.
 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
 *	@param {string} event.url	The newly routed URL
 */
  const [isBrowserNotSupported, setIsBrowserNotSupported] = useState(false);
  const [isLeftNavExpanded, setIsLeftNavExpanded] = useState(false);
  const [isOuterDivNeeded, setIsOuterDivNeeded] = useState(false);
  const [isSlowInternetSpeed, setIsSlowInternetSpeed] = useState(false);
  const [slowInternet, setSlowInternet] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.screen.availWidth <= 425 ? true : false);

  useEffect(() => {
    let connection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
    console.log(connection);
    let type;
    if (connection) {
      type = connection.effectiveType;
      if (parseFloat(connection.downlink) <= 0.6) {
        console.log('innnnnnnnnnn');
        setIsSlowInternetSpeed(true);
        console.log("slow internet", isSlowInternetSpeed);
      } else {
        console.log('elseeeeeeeeeeee');
        setIsSlowInternetSpeed(false);
      }
    } else {
      new NetworkInformationApiPolyfill().then(async (connection) => {
        if (parseFloat(connection.downlink) <= 0.6){
          setSlowInternet(true);
        }
        if (parseFloat(connection.downlink) > 0.6){
          setSlowInternet(false);
        }
      });
    }

    function updateConnectionStatus() {
      if (connection) {
        type = connection.effectiveType;
        if (parseFloat(connection.downlink) <= 0.6) {
          setIsSlowInternetSpeed(true);
          // that.setState({isSlowInternetSpeed: true});
        } else {
          setIsSlowInternetSpeed(false);
          // that.setState({isSlowInternetSpeed: false});
        }
      } else {
        new NetworkInformationApiPolyfill().then(async (connection) => {
          console.log("conntttttttt", connection);
          if (parseFloat(connection.downlink) <= 0.6){
            setSlowInternet(true);
            // await this.setState({slowInternet:true});
          }
          if (parseFloat(connection.downlink) > 0.6){
            setSlowInternet(false);
            // await this.setState({slowInternet:false});
          }
        });
      }
    }

    if (connection) {
      connection.addEventListener('change', updateConnectionStatus);
    }
    let isOnline = window.navigator.onLine;
    if (isOnline) {
      setIsOffline(false);
    } else {
      setIsOffline(true);
      // this.setState({ isOffline: true });
    }
    window.addEventListener('offline', () => {
      setIsOffline(true);
      setIsSlowInternetSpeed(false);
      // this.setState({ isOffline: true, isSlowInternetSpeed:false });
      return;
    });
    window.addEventListener('online', () => {
      setIsOffline(false);
      window.location.reload();
    });
  },[]);
  useEffect(() => {
    let browserResult = getBrowserVersion();
    console.log("browserResult",browserResult);
    // need to add userAgent value for MS Edge
    if (browserResult === "Other") {
      setIsBrowserNotSupported(false);
      console.log(isBrowserNotSupported);
      // this.setState({isBrowserNotSupported:false});
    } else if ((browserResult === "Edge") || (browserResult >= 9 && browserResult < 10) || (browserResult >= 11 && browserResult < 12)) {
      setIsBrowserNotSupported(true);
    }
  }, []);

  function getBrowserVersion() {
    let detectIEregexp, isEdge;
    console.log("navigator.userAgent",navigator.userAgent);
    if (navigator.userAgent.indexOf('MSIE') !== -1) {
      detectIEregexp = /MSIE (\d+\.\d+);/; //test for MSIE x.x
    }
    else if (navigator.userAgent.indexOf('Edg') !== -1) {
      detectIEregexp = /Edg/;
      isEdge = true;
    }
    else {
      detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/; //test for rv:x.x or rv x.x where Trident string exists
    } // if no "MSIE" string in userAgent
    console.log("detectIEregexp.test(navigator.userAgent)",detectIEregexp.test(navigator.userAgent));
    if (detectIEregexp.test(navigator.userAgent)){ //if some form of IE
      if (isEdge) {
        return 'Edge';
      }
      let ieversion=new Number(RegExp.$1); // capture x.x portion and store as a number
      if (ieversion>=11 && ieversion<12)
        return (ieversion);
      else if (ieversion>=9 && ieversion<10)
        return (ieversion);

    } else {
      return ("Other");
    }
  }

  return (
    <div>
      {
        !isBrowserNotSupported  && (
          <div id="app">
            <link rel="manifest" href="/manifest.json" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link rel="stylesheet" href="/assets/js/mobiscrollDesktop.css" />
            <link rel="stylesheet" href="/assets/js/toastr.css" />
            <link rel="stylesheet" href="/assets/dist/jsonview.bundle.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            {/*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css"/>*/}
            <script src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/vfs_fonts.js' />
            <script src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/pdfmake.js' />
            <script src='/assets/js/toastr.min.js' />
            <script src='/assets/js/mobiscroll.javascript.min.js' />
            <script src='/assets/dist/jsonview.bundle.js' />

            <Match path="/">
              {
                ({ path }) => {
                  if (path !== '/' && path !== '/readEmails' && path !== '/set-new-password' && path !== '/set-password' && path !== '/parineetihonda' && path !== '/kotharihyundai' && path !== '/loginPage'){
                    return (
                      <div>
                        {
                          isOffline && (
                            <NoInternet />
                          )
                        }
                        {
                          isSlowInternetSpeed && (
                            <SlowInternetSpeed />
                          )
                        }
                      </div>
                    );
                  }
                }
              }
            </Match>
            <div>
              <Router>
                <Login path="/:tenant?" />
                <LoginPage path="/loginPage/:tenant?" />
                <Workspace path="/workspace"/>
                <SetNewPassword path="/set-new-password/:token?" />
                <SetPasswordToVerify path="/set-password" />
                <Profile path="/profile" />
                <SiloAdministration path="/siloAdministration" />
                <Organization path="/organization" />
                <CaseDetail path="/caseDetails/:id" />
                <Workspacedetails path="/workspacedetails/:type"/>
              </Router>
            </div>
          </div>
        )}
      {
        isBrowserNotSupported && (
          <div>
            <BrowserNotSupported path="/browserNotSupported" />
          </div>
        )
      }
    </div>
  );
  // }
};
export default App;
