import { h } from 'preact';
import { useState } from 'preact/hooks';
import axios from 'axios';
let distance = 60000, distanceFailedAttempts = 60000, distanceForgot = 60000, distanceVerification = 29000;
import { route } from 'preact-router';
import { getItem, setItem } from '../../lib/myStore';

/*
Modified On: 7 Dec 2020
Modification: Declared x and interval.
*/
let x, interval;

import CONSTANTS from '../../lib/constants';

const Login = (props) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isDomainInvalid, setIsDomainInvalid] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isLoaderDisplayed, setIsLoaderDisplayed] = useState(false);
  const [tenantDetails, setTenantDetails] = useState({});
  const [visibleForm, setVisibleForm] = useState('login');
  const [isAttemptsOver, setIsAttemptsOver] = useState(false);
  const [userLocked, setUserLocked] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [invalidAttempts, setInvalidAttempts] = useState(0);
  const [forgotPasswordValue, setForgotPasswordValue] = useState('');
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const [isFirstTimeLinkSent, setIsFirstTimeLinkSent] = useState(false);
  const [isGoogleAuthenticator, setIsGoogleAuthenticator] = useState(false)
  const [isPin, setPin] = useState('');
  const [token, setToken] = useState('');
  const [userID, setUserID] = useState('');
  const [isGAuthErrorShown, setGAuthErrorShown] = useState(false);
  const [isGAuthConfiguredSuccess, setIsGAuthConfiguredSuccess] = useState(false);
  const [gAuthErrorMessage, setGAuthErrorMessage] = useState('');
  const [isVerificationLinkSent, setIsVerificationLinkSent] = useState(false);
  const [userName, setUserName] = useState('');
  const [tenantName, setTenantName] = useState(props.matches.tenant ? props.matches.tenant : 'crystal-honda');
  const authRegex = /^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))|([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
  // const [isForgotPassword, setIsForgotPassword] = useState(false);
  // const increment = () => setCount(count + 1);
  // // You can also pass a callback to the setter

  async function checkEmailValidation(e) {
    if (e.target.value) {
      e.target.value = e.target.value.trim();
    }
    setIsEmailInvalid(false);
    setIsEmailEmpty(false);
    setIsEmailCorrect(false);
    setEmail(e.target.value);

    // let regex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,3}/;
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]{2,}\.)+[a-zA-Z]{2,}))$/;



    if (e.target.value && e.target.value.length && !e.target.value.match(authRegex)) {
      return setIsEmailInvalid(true);
    }
    if (!e.target.value) {
      return;
    }
    setIsEmailCorrect(true);
    //Modified By: Yashvi
    //Modified On: 8 Dec 2020
    //Modification: Called checkUserStatus api and recalled user lock time.
    let response = await axios.get(`${CONSTANTS.API_URL}/api/user/checkUserStatus/${e.target.value.trim()}`);
    if (response.data.statusCode === 707) {
      if (response.data.user.lockUntill) {
        // console.log(response.data.user.lockUntill);
        // console.log(((new Date(response.data.user.lockUntill).getTime() - new Date().getTime())));
        distanceFailedAttempts = (new Date(response.data.user.lockUntill).getTime() - new Date().getTime());
      }
      setUserLocked(true);
      setIsLoginButtonDisabled(true);
      setEmail(e.target.value.trim());
      // setEmail(response.data.user.email.trim().toLowerCase());
      x = setInterval(() => {
        distanceFailedAttempts = distanceFailedAttempts - 1000;
        let seconds = Math.floor((distanceFailedAttempts % (1000 * 60)) / 1000);
        if (seconds < 10) {
          document.getElementById("time-failed").innerHTML = "0" + seconds;
        }
        else {
          document.getElementById("time-failed").innerHTML = seconds;
        }
        if (distanceFailedAttempts < 0) {
          document.getElementById("time-failed").innerHTML = "60";
          clearInterval(x);
          distanceFailedAttempts = 60000;
          setUserLocked(false);
        }
      }, 1000);
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'deactivated user logging in', typeOfVisit: 'error', errorCode: response.data.statusCode, errorMessage: 'User is deactivated', email: e.target.email.value.toLowerCase() });
      // route('/emailChecks?userDeactivated=true');
    }
  }

  async function setPasswordtoState(e) {
    setPassword(e.target.value);
  }

  async function login(e) {
    e.preventDefault();
    console.log('loginnnnnnnnnn');
    if (isAttemptsOver || userLocked) {
      console.log('inside if');
      return;
    }
    setIsAttemptsOver(false);
    setIsPasswordIncorrect(false);
    setIsPasswordEmpty(false);
    if (!e.target.uniquePassword.value) {
      setIsPasswordEmpty(true);
    }
    /*
      Modified By: Vihang
      Modified On: 3 Feb 2022
      Modification: email validation check for empty value for  login page
    */
    if (!e.target.email.value) {
      setIsEmailEmpty(true);
    }
    setIsLoginButtonDisabled(true);
    try {
      let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/login`, {
        username: email,
        password
      });
      console.log(response.data);
      setToken(response.data.token);
      // let userinfo = await axios.get(`${CONSTANTS.API_URL}/api/user/me`);
      setUserID(response.data.user.uuid);
      setIsLoginButtonDisabled(false);
      if (response.data.statusCode === 700) {
        console.log("loginAttempts",response.data.user.loginAttempts);
        setInvalidAttempts(response.data.user.loginAttempts);
        setIsPasswordIncorrect(true);
        // this.setState({invalidAttempts: response.data.user.loginAttempts});
        // this.setState({isPasswordIncorrect:true});
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'failed login', typeOfVisit: 'error', errorCode: response.data.statusCode, errorMessage: response.data.message, email });
      } else if (response.data.user.googleAuthenticator) {
        setIsGoogleAuthenticator(true);
      } else {
        setItem('token', {
          token: response.data.token
        });
        let userinfo = await axios.get(`${CONSTANTS.API_URL}/api/user/me`);
        let userData = userinfo.data;
        console.log(userData);

        userData['roleID'] = response.data.user.roleID;
        userData['role'] = response.data.user.roleName;
        userData['rolePermission'] = response.data.user.rolePermission;
        userData['userPermission'] = response.data.user.userPermission;
        userData['dealershipLocation'] = response.data.user.dealershipLocation;
        setItem('userinfo', userData);
        // setUserID(response.data.token);
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'login', typeOfVisit: 'success', email });
        console.log(userData.roleName, 'userData.roleNameuserData.roleNameuserData.roleName');
        // if (userData.email === "ashkothari00@hotmail.com") {
        //   route(`/projectTracker`);
        // } else if (userData.roleName === 'Admin' || userData.roleName === 'admin') {
        //   route(`/homeReception`);
        // } else if (userData.roleName === 'Receptionist' || userData.roleName === 'receptionist') {
        //   route(`/homeReception`);
        // } else {
        //   route(`/homeSE`);
        // }
        route('/workspace')
        // else if (userData.roleName === 'Logistics' || userData.roleName === 'logistics') {
        //   route(`/stockDashboard`);
        // } else if (userData.roleName === 'Management' || userData.roleName === 'management') {
        //   route(`/homeReception`);
        // }
      }
    } catch (HTTPException) {
      //this.setState({isLoginButtonDisabled: true});
      setIsLoginButtonDisabled(true);

      if (HTTPException.response.data.statusCode === 700) {
        console.log('innnnnnnnnnnnnnnnnnnnnnnkjhgkjhghjgjhg');
        //set invalid password as error
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'login failure', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: HTTPException.response.data.message, email });
        // this.setState({isPasswordIncorrect:true});
        setIsPasswordIncorrect(true);
        // this.setState({invalidAttempts: response.data.user.loginAttempts});
        // this.setState({isPasswordIncorrect:true});
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'failed login', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCod, errorMessage: 'Invalid Credentials', email });
      }
      if (HTTPException.response.data.statusCode === 702 && HTTPException.response.data.error === 'Unauthorized') {
        console.log('innnnnnnnnnnnnnnn', HTTPException.response.data);
        let response = await axios.post(`${CONSTANTS.API_URL}/api/v1/verifyUser`, {
          userEmail: email,
          typeOfEmail: 'verificationEmail'
        });

        setVisibleForm('userNotVerified');
        if (response && response.data && response.data.length) {
          setUserName(response.data[0].displayName);
        }
      }
      if (HTTPException.response.data.statusCode === 703) {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'user account locked', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, errorMessage: 'Account locked', email });
        setIsAttemptsOver(true);
        // this.setState({isAttemptsOver:true});
        let x = setInterval(() => {
          distance = distance - 1000;
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          if (seconds < 10) {
            document.getElementById("time").innerHTML = "0" + seconds;
          }
          else {
            document.getElementById("time").innerHTML = seconds;
          }

          if (distance < 0) {
            document.getElementById("time").innerHTML = "60";
            clearInterval(x);
            distance = 60000;
            //Modified By: Yashvi.
            //Modified On: 8 Dec 2020.
            //Modification: Replaced this.setState.
            setIsAttemptsOver(false);
            setIsLoginButtonDisabled(true);
            //Modified By: Haresh.
            //Modified On: 7 Sept 2021.
            //Modification: userLock set false to remove timer msg
            setUserLocked(false);
            // this.setState({isAttemptsOver:false, isLoginButtonDisabled: false});
          }
        }, 1000);
      }
    }
    return;
  }
  async function goToForgotPasswordPage() {
    setVisibleForm('forgotPassword');
    setIsEmailInvalid(false);
    // this.setState({ isOverlayDisplayed: true, isLoaderDisplayed: true});
    // axios.get(`${CONSTANTS.API_URL}/api/user/checkUserStatus/${this.state.userEmail}`)
    //   .then(async (response) => {
    //     console.log(response);
    //     if (response && response.data && response.data.userStatus === 'verified'){
    // await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,{
    //         action:'request password reset',
    //         email: this.state.userEmail
    //       });
    //
    //       await axios.post(`${CONSTANTS.API_URL}/api/v1/forgotPassword`, {
    //         email: this.state.userEmail
    //       })
    //         .then(() => {
    //           console.log("goToForgotPasswordPage",this.state.visibleForm);
    //
    //           this.setState({visibleForm: 'forgotPassword', isLoaderDisplayed: false, isOverlayDisplayed: false});
    //           console.log("goToForgotPasswordPage later",this.state.visibleForm);
    //
    //           setTimeout(() => {
    //             //this.setState({isLoaderDisplayed:false});
    //           }, 300);
    //
    //         }).catch(HTTPException => {
    //           this.setState({isLoaderDisplayed: false, isOverlayDisplayed: false});
    //           if (HTTPException.response.data.statusCode === 800){
    // axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,{
    //               action:'failed forgot password request',
    //               typeOfVisit:'error',
    //               errorCode:HTTPException.response.data.statusCode
    //             });
    //             this.setState({userNotFound:true});
    //             // route('/emailChecks?userNotFound=true');
    //           }
    //           if (HTTPException.response.data.statusCode === 702){
    // axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,{
    //               action:'user not verified',
    //               typeOfVisit:'error',
    //               errorCode:HTTPException.response.data.statusCode,
    //               email: this.state.userEmail
    //             });
    //             route('/emailChecks?userNotVerified=true');
    //           }
    //         });
    //     } else if (response.data && response.data.statusCode === 707) {
    //       await axios.post(`${CONSTANTS.API_URL}/api/v1/forgotPassword`, {
    //         email: this.state.userEmail
    //       })
    //         .then(() => {
    //           console.log("goToForgotPasswordPage",this.state.visibleForm);
    //
    //           this.setState({visibleForm: 'forgotPassword', isLoaderDisplayed: false, isOverlayDisplayed: false});
    //           console.log("goToForgotPasswordPage later",this.state.visibleForm);
    //
    //           setTimeout(() => {
    //             //this.setState({isLoaderDisplayed:false});
    //           }, 300);
    //
    //         }).catch(HTTPException => {
    //           this.setState({isLoaderDisplayed: false, isOverlayDisplayed: false});
    //           if (HTTPException.response.data.statusCode === 800){
    // axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,{
    //               action:'failed forgot password request',
    //               typeOfVisit:'error',
    //               errorCode:HTTPException.response.data.statusCode
    //             });
    //             this.setState({userNotFound:true});
    //             // route('/emailChecks?userNotFound=true');
    //           }
    //           if (HTTPException.response.data.statusCode === 702){
    // axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`,{
    //               action:'user not verified',
    //               typeOfVisit:'error',
    //               errorCode:HTTPException.response.data.statusCode,
    //               email: this.state.userEmail
    //             });
    //             route('/emailChecks?userNotVerified=true');
    //           }
    //         });
    //     }
    //   })
    //   .catch((HTTPException) => {
    //     this.setState({isLoaderDisplayed: false, isOverlayDisplayed: false});
    //     if (HTTPException.response.data.statusCode === 800){
    //       this.setState({userNotFound:true});
    //       // route('/emailChecks?userNotFound=true');
    //     }
    //     if (HTTPException.response.data.statusCode === 702){
    //       axios.post(`${CONSTANTS.API_URL}/api/v1/verifyUser`, {
    //         userEmail: getItem('userEmail'),typeOfEmail:'verificationEmail'
    //       });
    //       route('/emailChecks?userNotVerified=true');
    //     }
    //     console.error(HTTPException);
    //   });
  }
  async function sendResetPasswordLink(e) {
    e.preventDefault();
    try {
      let response = await axios.get(`${CONSTANTS.API_URL}/api/v1/user/checkUserStatusForForgotPassword/${forgotPasswordValue}`);
      // .then(async (response) => {
      if (response && response.data && response.data.userStatus === 'verified') {
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, {
          action: 'request password reset',
          email: forgotPasswordValue
        });

        await axios.post(`${CONSTANTS.API_URL}/api/v1/forgotPassword`, {
          email: forgotPasswordValue
        })
          .then(() => {
            //Disable 'Send Reset Password Link' button.
            //By Yashvi
            setIsEmailCorrect(false);
            setIsFirstTimeLinkSent(true);
            setUserNotFound(false);

            // this.setState({visibleForm: 'forgotPassword', isLoaderDisplayed: false, isOverlayDisplayed: false});
            // console.log("goToForgotPasswordPage later",this.state.visibleForm);

            // setTimeout(() => {
            //this.setState({isLoaderDisplayed:false});
            // }, 300);

          }).catch(HTTPException => {
            // this.setState({isLoaderDisplayed: false, isOverlayDisplayed: false});
            if (HTTPException.response.data.statusCode === 800) {
              axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, {
                action: 'failed forgot password request',
                typeOfVisit: 'error',
                errorCode: HTTPException.response.data.statusCode,
                email: forgotPasswordValue
              });
              // this.setState({userNotFound:true});
              // route('/emailChecks?userNotFound=true');
            }
            if (HTTPException.response.data.statusCode === 702) {
              axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, {
                action: 'user not verified',
                typeOfVisit: 'error',
                errorCode: HTTPException.response.data.statusCode,
                email: forgotPasswordValue
              });
              // route('/emailChecks?userNotVerified=true');
            }
          });
      } else if (response.data && response.data.statusCode === 707) {
        await axios.post(`${CONSTANTS.API_URL}/api/v1/forgotPassword`, {
          email: forgotPasswordValue
        })
          .then(() => {

            // setTimeout(() => {
            //this.setState({isLoaderDisplayed:false});
            // }, 300);

          }).catch(HTTPException => {
            // this.setState({isLoaderDisplayed: false, isOverlayDisplayed: false});
            if (HTTPException.response.data.statusCode === 800) {
              axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, {
                action: 'failed forgot password request',
                typeOfVisit: 'error',
                errorCode: HTTPException.response.data.statusCode,
                email: forgotPasswordValue
              });
              // this.setState({userNotFound:true});
              // route('/emailChecks?userNotFound=true');
            }
            if (HTTPException.response.data.statusCode === 702) {
              axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, {
                action: 'user not verified',
                typeOfVisit: 'error',
                errorCode: HTTPException.response.data.statusCode,
                email: forgotPasswordValue
              });
              // route('/emailChecks?userNotVerified=true');
            }
          });
      }
    } catch (HTTPException) {
      // this.setState({isLoaderDisplayed: false, isOverlayDisplayed: false});
      console.log(HTTPException.response, "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
      if (HTTPException.response.data.statusCode === 800) {
        // this.setState({userNotFound:true});
        /*
          Modified By: Vihang
          Modified On: 3 Feb 2022
          Modification: disabled the first time link message when user not found
        */
        setUserNotFound(true);
        setIsFirstTimeLinkSent(false);
        // route('/emailChecks?userNotFound=true');
      }
      if (HTTPException.response.data.statusCode === 702) {
        // axios.post(`${CONSTANTS.API_URL}/api/v1/verifyUser`, {
        //   userEmail: getItem('userEmail'),typeOfEmail:'verificationEmail'
        // });
        // route('/emailChecks?userNotVerified=true');
      }
      console.error(HTTPException);
    }

    // })
    // .catch((HTTPException) => {
    //
    // });
  }
  async function checkEmailValidationForgot(e) {
    if (e.target.value) {
      e.target.value = e.target.value.trim();
    }
    setIsEmailInvalid(false);
    setIsEmailEmpty(false);
    setIsEmailCorrect(false);
    setForgotPasswordValue(e.target.value);

    // let regex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,3}/;
    // let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]{2,}\.)+[a-zA-Z]{2,}))$/;

    if (e.target.value && e.target.value.length && !e.target.value.match(authRegex)) {
      return setIsEmailInvalid(true);
    }
    if (!e.target.value) {
      return;
    }
    setIsEmailCorrect(true);
  }

  async function goToPreviousForm() {
    if (visibleForm === 'forgotPassword' || visibleForm === 'userNotVerified') {
      setVisibleForm('login');
    }
  }
  async function requestForResetLink(e) {
    e.preventDefault();
    try {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'request password reset', email: forgotPasswordValue });

      // this.setState({isLoaderDisplayed:true});
      await axios.post(`${CONSTANTS.API_URL}/api/v1/forgotPassword`, {
        email: forgotPasswordValue
      }).then(() => {
        setIsResetLinkSent(true);
        /*
        Disable 'Send reset password link' button.
        Modified On: 7 Dec 2020
        Modification: setIsEmailCorrect to false.
        */
        setIsEmailCorrect(false);
        let x = setInterval(() => {
          distanceForgot = distanceForgot - 1000;
          let seconds = Math.floor((distanceForgot % (1000 * 60)) / 1000);
          if (seconds < 10) {
            document.getElementById("timeForgot").innerHTML = "0" + seconds;
          }
          else {
            document.getElementById("timeForgot").innerHTML = seconds;
          }
          if (distanceForgot < 0) {
            document.getElementById("timeForgot").innerHTML = "29";
            clearInterval(x);
            distanceForgot = 29000;
            setIsResetLinkSent(false);
          }
        }, 1000);
      });
    }
    catch (HTTPException) {
      console.error(HTTPException);
      // this.setState({isLoaderDisplayed:false});
      if (HTTPException.response.data.statusCode === 800) {
        // route('/emailChecks?userNotFound=true');
        // this.setState({userNotFound:true});
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'failed forgot password request', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCode, email: forgotPasswordValue });
      }
      return false;
    }
  }
  function setPinInState(e) {
    setPin(e.target.value);
  }
  /*
      T1014
      Modified By:  Sagar Patil
      Modified On: 17/11/2020
      Modification : Add afterGoogleAuthentication function
      */

  async function afterGoogleAuthentication() {
    setGAuthErrorShown(false);
    // setIsGAuthConfiguredSuccess(false);
    setGAuthErrorMessage('');
    try {

      let encryptedData = {
        totp: isPin,
        token,
        userID
      };
      await axios.put(`${CONSTANTS.API_URL}/api/v1/varifyTOTPGoogleAuthenticatorAtLogin`, encryptedData).then(async (response) => {
        setIsGoogleAuthenticator(false);
        setItem('token', {
          token: response.data.token
        });
        let userinfo = await axios.get(`${CONSTANTS.API_URL}/api/user/me`);
        let userData = userinfo.data;
        setItem('userinfo', userData);
        axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'login', typeOfVisit: 'success', email });
        // route(`/homeReception`);
        if (userData.roleName === 'Admin' || userData.roleName === 'admin') {
          route(`/homeReception`);
        } else if (userData.roleName === 'Sales' || userData.roleName === 'sales') {
          route(`/homeSE`);
        } else if (userData.roleName === 'Logistics' || userData.roleName === 'logistics') {
          route(`/stockDashboard`);
        } else if (userData.roleName === 'Management' || userData.roleName === 'management') {
          route(`/homeReception`);
        } else if (userData.roleName === 'Receptionist' || userData.roleName === 'receptionist') {
          route(`/homeReception`);
        }
      });

    } catch (err) {
      if (err) {
        setGAuthErrorShown(true);
        setIsGAuthConfiguredSuccess(false);
        setGAuthErrorMessage('Google Authenticator PIN does not match. Please try again');
      }
    }
  }

  async function requestForVerificationLink() {
    try {
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'request resend verification', email });

      await axios.put(`${CONSTANTS.API_URL}/api/v1/resendLink/${email}`
      ).then(() => {
        setIsVerificationLinkSent(true);
        let x = setInterval(() => {
          distanceVerification = distanceVerification - 1000;
          let seconds = Math.floor((distanceVerification % (1000 * 60)) / 1000);
          if (seconds < 10) {
            document.getElementById("time-verification").innerHTML = "0" + seconds;
          }
          else {
            document.getElementById("time-verification").innerHTML = seconds;
          }
          if (distanceVerification < 0) {
            document.getElementById("time-verification").innerHTML = "29";
            clearInterval(x);
            distanceVerification = 29000;
            setIsVerificationLinkSent(false);
          }
        }, 1000);
        // console.log(response);
      }).catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
        } else {
          console.log('Something Went Wrong');
        }
      });
    }
    catch (HTTPException) {
      console.error(HTTPException);
      return false;
    }
  }

  // ModifiedBy: Vihang Kale
  // Date: 24/12/2021
  // Modification: On line 602 -602, new background image added for login page and some minor changes

    /*
      Modified By: Vihang
      Modified On: 3 Feb 2022
      Modification: added min height for login form changes  and padding added for initial page, line changes 625,729,802,
    */

  return (
    <div class="login-container">
      <div style="position: absolute;width: 100%;height: 100%;background: #00000047;z-index: 0;"> </div>
      <img src={`/assets/images/logo/${tenantName ? tenantName : 'crystal-honda'}.png`} class="login-logo" style='z-index: 2;' />
      {visibleForm === 'login' && (
        <form class="login-form pos-relative min-h-70vh p-t-50" onSubmit={(e) => login(e)}>
          <div class="login-row">
            <h1 class="m-t-0">Sign in</h1>
            <span>Welcome to {tenantName === "parineetihonda" ? 'Crystal Honda' : 'Crystal Honda'}!</span>
          </div>
          <div class="input-field">
            <input style='background-image: none !important;' class="login-input p-l-20" onInput={(e) => checkEmailValidation(e)} value={email} type="text" name="email" placeholder="Enter Email ID / Mobile" autofocus />
            {
              isEmailCorrect && (
                <img class="email-green-check" src='/assets/icons/passwordCheck/Green_Check.svg' />
              )
            }
            {
              isEmailInvalid && (
                <img class="email-green-check" src='/assets/icons/passwordCheck/Red_Cross.svg' />
              )
            }
          </div>
          <div class="input-field m-b-0">
            <input class="login-input" type="password" value={password} name="uniquePassword" placeholder="Enter Your Password" id="passwordField"
              onInput={(e) => setPasswordtoState(e)} disabled={isAttemptsOver || userLocked} />
          </div>
          <div class="button-block" style="height: 10px;">
            {
              isGoogleAuthenticator && (
                <div class="input-field">
                  <input type="text" placeholder="Enter the Authenticator PIN" onInput={(e) => setPinInState(e)} disabled={isAttemptsOver || userLocked} />
                </div>
              )
            }
            {
              isPasswordIncorrect && (
                <p class="error-message inline-block float-left">
                  <em class="icon icon-exclamation" /> Incorrect Credentials
                </p>
              )

            }
            {
              isPasswordIncorrect && (
                <p class="error-message inline-block float-right">
                  Attempt {invalidAttempts} of 6
                </p>
              )
            }
            {
              isEmailEmpty && (
                <p class="error-message">
                  <em class="icon icon-exclamation" /> Please enter your Email / Mobile
                </p>
              )
            }
            {
              isEmailInvalid && (
                <p class="error-message">
                  <em class="icon icon-exclamation" /> Invalid Email/Mobile format
                </p>
              )
            }
            {
              isPasswordEmpty && (
                <p class="error-message">
                  <em class="icon icon-exclamation" />Please enter your password.
                </p>
              )
            }
            {
              isAttemptsOver && (
                <p class="error-message">
                  <em class="icon icon-exclamation" /> Oops! Too many incorrect credentials attempts.
                  Please wait for 00:<span id="time">60</span> secs and retry
                </p>
              )
            }
            {
              userLocked && (
                <p class="error-message">
                  <em class="icon icon-exclamation" /> Oops! Too many incorrect credentials attempts. Please wait for 00:<span id="time-failed">{parseInt(distanceFailedAttempts.toString().substring(0, 2), 0)}</span> secs and retry
                </p>
              )
            }
            {
              isGAuthErrorShown && (
                <p class="error-message">
                  <em class="icon icon-exclamation" />{gAuthErrorMessage}
                </p>
              )
            }
          </div>
          <label class="login-label m-t-6 cursor-pointer" onClick={() => goToForgotPasswordPage(this)}>Forgot password?</label>
          {
            !isGoogleAuthenticator && (
              <button style={(!isEmailCorrect ? '' : 'background-color:#d5352e; color:#fff;')} class="login-button" name="emailButton" type="submit">Login</button>
            )
          }
          {
            isGoogleAuthenticator && (
              <button class="login-button" name="emailButton" type="submit" onClick={() => afterGoogleAuthentication()}>Authenticate</button>
            )
          }
        </form>
      )}
      {
        visibleForm === 'forgotPassword' && (
          <div class="login-form min-h-70vh" style='z-index: 2;'>
            <div class={'login-row cursor-pointer' + (visibleForm === 'login' || isAttemptsOver || isVerificationLinkSent ? ' visibility-none' : '')}
              onClick={(e) => goToPreviousForm(e)}>
              <p>
                <em class="icon icon-arrow-1-left" />
                Back
              </p>
            </div>
            <div class="welcome-block">
              <label>
                Forgot your password?
              </label>
            </div>
            <div class="login-row">
              <span class="fs-0-9rem">
                No worries! Please enter your Email ID  OR Mobile <break />
                 in the field below. We will send you a reset password link.
              </span>
            </div>
            <form onSubmit={(e) => sendResetPasswordLink(e)}>
              <div class="input-field">
                <input class="login-input" onInput={(e) => checkEmailValidationForgot(e)} value={forgotPasswordValue} type="text" name="forgotPasswordValue" placeholder="Enter Email ID / Mobile" id="emailFieldForgotPassword" autofocus />
              </div>
              <div class="login-row">
                <button class="login-button" name="emailButton" disabled={isEmailInvalid || !forgotPasswordValue} type="submit">Send reset password link</button>
              </div>
            </form>
            <div class="login-row">
              {
                isEmailInvalid && (
                  <p class="error-message">
                    <em class="icon icon-exclamation" /> Invalid Email/Mobile format
                  </p>
                )
              }
              {
                userNotFound && (
                  <p class="error-message no-weight fs-12">
                    Sorry, we could not find your account.<br /> Please verify your Email/Mobile and retry
                  </p>
                )
              }
              {
                isResetLinkSent && (
                  <p class="question">
                    Please check your inbox.<br />
                    Didn’t receive the Reset Password email?
                  </p>
                )
              }
              {
                !isResetLinkSent && isFirstTimeLinkSent && (
                  <p class="question">
                    We have sent a reset password link on your email ID / Mobile. <br />
                    Please check your inbox.<br />
                    Didn’t receive the Reset Password email? <br />
                  </p>
                )
              }
              {
                !isResetLinkSent && isFirstTimeLinkSent && (
                  <p class="link" onClick={(e) => requestForResetLink(e)} style="width: 75px">

                    Resend link
                  </p>
                )
              }
              {
                isResetLinkSent && (
                  <p class="error-message no-weight fs-12">
                    Please wait 00:<span id="timeForgot">60</span> secs to request<br />another reset password email
                  </p>
                )
              }
            </div>
          </div>
        )
      }
      {
        visibleForm === 'userNotVerified' && (
          <div class="login-form min-h-70vh" style='z-index: 2;'>
            <div class="login-row">
              <label>
                Hi {userName},<br />
                we have sent you
                a verification link
              </label>
              <span>
                Please check your email for the
                verification link we sent you
              </span>
            </div>
            <div class="button-block">
              <p class="question">
                Didn’t receive a verification email?
              </p>
              {
                !isVerificationLinkSent && (
                  <label class="login-label cursor-pointer" onClick={(e) => requestForVerificationLink(e)} style="width: 75px">
                    Resend link
                  </label>
                )
              }
              {
                isVerificationLinkSent && (
                  <p class="error-message no-weight fs-12">
                    Please wait 00:<span id="time-verification">29</span> secs to resend<br />another verification email
                  </p>
                )
              }
            </div>
          </div>
        )
      }
      <div class="login-footer">
        <h6>Powered By</h6>
        <span class="m-l-0">TECHNATIVE @ 2021</span>
        <span>User Agreement</span>
        <span>Privacy Policy</span>
        <span>Community Guidelines</span>
        <span>Cookie Policy</span>
        <span>Copyright Policy</span>
        <span>Send Feedback</span>
      </div>
    </div>
  );
};

export default Login;
