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

const LoginPage = (props) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isDomainInvalid, setIsDomainInvalid] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isLoaderDisplayed, setIsLoaderDisplayed] = useState(false);
  const [tenantDetails, setTenantDetails] = useState({});
  const [visibleForm, setVisibleForm] = useState('userNotVerified');
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
  const [tenantName, setTenantName] = useState(props.matches.tenant ? props.matches.tenant : 'kotharihyundai');
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

    if (e.target.value && e.target.value.length && !e.target.value.match(regex)) {
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
      setEmail(response.data.user.email.trim().toLowerCase());
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
        setItem('userinfo', userData);
        // setUserID(response.data.token);
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'login', typeOfVisit: 'success', email });
        console.log(userData.roleName,'userData.roleNameuserData.roleNameuserData.roleName');
        if (userData.roleName === 'Admin' || userData.roleName === 'admin') {
          route(`/home`);
        } else if (userData.roleName === 'Sales' || userData.roleName === 'sales') {
          route(`/sales`);
        } else if (userData.roleName === 'Logistics' || userData.roleName === 'logistics') {
          route(`/stockDashboard`);
        } else if (userData.roleName === 'Management' || userData.roleName === 'management') {
          route(`/home`);
        } else if (userData.roleName === 'Receptionist' || userData.roleName === 'receptionist') {
          route(`/home`);
        }
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
        await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'failed login', typeOfVisit: 'error', errorCode: HTTPException.response.data.statusCod, errorMessage: 'Invalid Password', email });
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
            setIsAttemptsOver(true);
            setIsLoginButtonDisabled(true);
            // this.setState({isAttemptsOver:false, isLoginButtonDisabled: false});
          }
        }, 1000);
      }
    }
    return;
  }
  async function goToForgotPasswordPage() {
    setVisibleForm('forgotPassword')
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
        setUserNotFound(true);
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
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]{2,}\.)+[a-zA-Z]{2,}))$/;

    if (e.target.value && e.target.value.length && !e.target.value.match(regex)) {
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
        // route(`/home`);
        if (userData.roleName === 'Admin' || userData.roleName === 'admin') {
          route(`/home`);
        } else if (userData.roleName === 'Sales' || userData.roleName === 'sales') {
          route(`/sales`);
        } else if (userData.roleName === 'Logistics' || userData.roleName === 'logistics') {
          route(`/stockDashboard`);
        } else if (userData.roleName === 'Management' || userData.roleName === 'management') {
          route(`/home`);
        } else if (userData.roleName === 'Receptionist' || userData.roleName === 'receptionist') {
          route(`/home`);
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

  return (
    <div class="limiter " style='background-color: rgb(77, 77, 80); width: 100%; height:100%;'>
      <div class="" style="background-color:#4d4d50" >
        <img src={`/assets/images/logo/${tenantName ? tenantName : 'kotharihyundai'}.png`} style='position: absolute;width: 10%;left: 3%; top: 3%;' />
        <div class="login100-more" style={`background-image: url(./assets/images/${tenantName ? tenantName : 'kotharihyundai'}.png);background-size: contain;background-position: left center;position: absolute;height: 48%;right: 5%;bottom: 4rem;`} />
        <div class="login100-more" style={`background-image: url(./assets/images/${tenantName ? tenantName : 'kotharihyundai'}.png);background-size: contain;background-position: left center;position: absolute;height: 48%;right: 19%;bottom: 4rem;`} />
        <div class="login100-more" style={`background-image: url(./assets/images/${tenantName ? tenantName : 'kotharihyundai'}.png);background-size: contain;background-position: left center;position: absolute;height: 48%;right: 33%;bottom: 4rem;`} />
        <div class="login100-more" style={`background-image: url(./assets/images/${tenantName ? tenantName : 'kotharihyundai'}.png);background-size: contain;background-position: left center;position: absolute;height: 48%;right: 47%;bottom: 4rem;`} />
        <div class="">
          <div class="auth-container-form" >
            {/*style='background: #155b971a;'*/}
            <div class={'go-back' + (visibleForm === 'login' || isAttemptsOver || isVerificationLinkSent ? ' visibility-none' : '')}
              onClick={(e) => goToPreviousForm(e)}
            >
              <em class="icon icon-arrow-1-left" />
              <p>Back</p>
            </div>
            {
              visibleForm === 'login' && (
                <div class={'inner-container-form login-form-container' + (visibleForm === 'login' ? ' show-container' : ' hide-container')}>
                  <div class="welcome-block">
                    <p>
                      Welcome to {tenantName === "parineetihonda" ? 'Crystal Honda' : 'Crystal Honda'} !
                    </p>
                  </div>
                  {/*
                  <div class="description-block">
                    <p>
                      Some text about KDMS
                    </p>
                  </div>
                  */}
                  <form onSubmit={(e) => login(e)} style='    background: #ffff;padding: 10px;border-radius: 5px;padding-top: 30px;padding-bottom: 30px;'>
                    <div class="input-field">
                      <input onInput={(e) => checkEmailValidation(e)} value={email} type="text" name="email" placeholder="Enter Official Email ID" id="emailField" autofocus />
                      {/*<em class="icon icon-letter-mail" />
                      <svg class="email-svg-input-focus" width="18" height="18">
                        <path xmlns="http://www.w3.org/2000/svg" class="st0" d="M11.1,0H1C0.5,0,0,0.5,0,1v7.1c0,0.6,0.5,1,1,1c0,0,0,0,0,0h10.1c0.6,0,1-0.5,1-1c0,0,0,0,0,0V1  C12.2,0.5,11.7,0,11.1,0z M1,0.5h10.1c0,0,0.1,0,0.1,0C10.4,1.3,7.5,4,6.4,4.9c-0.2,0.2-0.5,0.2-0.7,0c0,0,0,0,0,0  C4.7,4,1.8,1.3,0.9,0.5C0.9,0.5,1,0.5,1,0.5z M0.5,8.1V1c0,0,0-0.1,0-0.1c0.7,0.6,2.7,2.5,4,3.7c-1.3,1.1-3.3,3.1-4,3.7  C0.5,8.2,0.5,8.1,0.5,8.1z M11.1,8.6H1c0,0-0.1,0-0.1,0c0.7-0.7,2.7-2.6,4-3.7l0.4,0.4c0.4,0.4,1,0.4,1.4,0l0.4-0.4  c1.3,1.1,3.3,3,4,3.7C11.2,8.6,11.2,8.6,11.1,8.6L11.1,8.6z M11.6,8.1c0,0,0,0.1,0,0.1c-0.7-0.6-2.7-2.6-4-3.7  c1.3-1.2,3.3-3.1,4-3.7c0,0,0,0.1,0,0.1L11.6,8.1z" />
                      </svg>*/}
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
                    <div class="input-field">
                      <input type="password" value={password} name="uniquePassword" placeholder="Enter Your Password" id="passwordField"
                        onInput={(e) => setPasswordtoState(e)} disabled={isAttemptsOver || userLocked} />
                      {/*<img class="lock-svg-input" src="/assets/images/Lock.svg" />
                      <svg class="lock-svg-input-focus" width="18" height="18">
                        <path xmlns="http://www.w3.org/2000/svg" class="st0" d="M3.6,7.6L3.4,8.9c0,0.1,0.1,0.2,0.2,0.3c0,0,0,0,0,0h0.9c0.1,0,0.2-0.1,0.2-0.2c0,0,0,0,0,0L4.7,7.6  C4.9,7.4,5,7.1,5,6.8C5,6.3,4.6,5.9,4.1,6C3.6,6,3.2,6.4,3.2,6.8C3.2,7.1,3.3,7.4,3.6,7.6z M4.1,6.4c0.3,0,0.5,0.2,0.5,0.5  c0,0.2-0.1,0.3-0.3,0.4c-0.1,0-0.1,0.1-0.1,0.2l0.1,1.2H3.9L4,7.5c0-0.1,0-0.2-0.1-0.2C3.7,7.2,3.6,6.9,3.7,6.7  C3.8,6.5,3.9,6.4,4.1,6.4L4.1,6.4z" style={'fill:#000'}/>
                        <path xmlns="http://www.w3.org/2000/svg" class="st0" d="M8,4.1H7.3V3.2C7.4,1.4,6-0.1,4.2-0.1S1,1.2,0.9,2.9c0,0.1,0,0.2,0,0.3v0.9H0.2C0.1,4.1,0,4.2,0,4.3v5.7  C0,10.6,0.4,11,0.9,11h6.4c0.5,0,0.9-0.4,0.9-0.9V4.3C8.2,4.2,8.1,4.1,8,4.1C8,4.1,8,4.1,8,4.1z M1.4,3.2c0-1.5,1.2-2.7,2.7-2.7  c1.5,0,2.7,1.2,2.7,2.7v0.9l0,0V3.2C6.7,1.8,5.5,0.6,4.1,0.5C2.7,0.6,1.5,1.8,1.4,3.2v0.9l0,0V3.2z M6.9,3.2v0.9H1.4V3.2  c0.3-1.3,1.4-2.4,2.7-2.7C5.5,0.8,6.5,1.9,6.9,3.2z M7.8,10.1c0,0.3-0.2,0.5-0.5,0.5H0.9c-0.3,0-0.5-0.2-0.5-0.5V4.6h7.3V10.1z" style={'fill:#000'}/>
                      </svg>*/}
                      {/*
                        isPasswordVisible && (
                          <img class="unseen-eye-svg cursor-pointer" src="/assets/images/Unseen_Eye.svg"  onClick={this.togglePasswordVisibility.bind(this)} />
                        )
                      */}
                    </div>



                    {
                      // isGoogleAuthenticator && (
                      //   <div class="input-field">
                      //   <input placeholder=" Enter the Authenticator PIN" onInput={(e) => setPinInState(e)} /><br></br><br></br>
                      //
                      //   <button name="emailButton" type="submit"  style="width: 100px;" class={'next-button tenant-brand-color'} onClick={() => afterGoogleAuthentication()}>Authenticate</button>
                      //   </div>
                      // )
                    }
                    {
                      isGoogleAuthenticator && (
                        <div class="input-field">
                          <input type="text" placeholder="Enter the Authenticator PIN" onInput={(e) => setPinInState(e)} disabled={isAttemptsOver || userLocked} />
                        </div>
                      )
                    }
                    {/*
                    Changed height for button-block div.
                    Modified On: 7 Dec 2020
                    Modification: Changed Button Name.
                    */}
                    <div class="button-block" style='height:10px; display: flow-root;'>
                      {
                        isPasswordIncorrect && (
                          <p class="error-message inline-block float-left">
                            <em class="icon icon-exclamation" /> Incorrect Password
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
                            <em class="icon icon-exclamation" /> Please enter your official email id
                          </p>
                        )
                      }
                      {
                        isEmailInvalid && (
                          <p class="error-message">
                            <em class="icon icon-exclamation" /> Invalid email format
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
                          <span class="error-message">
                            <em class="icon icon-exclamation" /> Oops! Too many incorrect password attempts.
                            Please wait for 00:<span id="time">60</span> secs and retry
                          </span>
                        )
                      }
                      {
                        userLocked && (
                          <p class="error-message">
                            <em class="icon icon-exclamation" /> Oops! Too many incorrect password attempts. Please wait for 00:<span id="time-failed">{parseInt(distanceFailedAttempts.toString().substring(0, 2), 0)}</span> secs and retry
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
                    {/*
                    Changed height for button-block div.
                    Modified On: 7 Dec 2020
                    Modification: Changed Button Name.
                    */}
                    <div class="button-block row" style='height:0px; '>
                      <div class="col-lg-6" style="display: inline-block;">
                        <span style='color: #383535' class={'forgot-password cursor-pointer' + (isAttemptsOver ? ' top-45' : ' top-28')} onClick={() => goToForgotPasswordPage(this)}>Forgot password?</span>
                      </div>
                      <div class="col-lg-6" style="display: inline-block;float: right;"><div>
                        {
                          !isGoogleAuthenticator && (
                            <button name="emailButton" type="submit" class={'next-button tenant-brand-color' + (!isEmailCorrect ? ' invalid-bg' : '')} style={(!isEmailCorrect ? '' : 'background-color:#243f7e; color:#fff;')}>Login</button>
                          )
                        }
                        {
                          isGoogleAuthenticator && (
                            <button name="emailButton" type="submit" style="width: 100px;" class={'next-button tenant-brand-color'} onClick={() => afterGoogleAuthentication()}>Authenticate</button>
                          )
                        }
                      </div>
                      </div>



                    </div>
                  </form>

                </div>
              )
            }
            {
              visibleForm === 'forgotPassword' && (
                <div class={'inner-container-form forgot-form-container' + (visibleForm === 'forgotPassword' ? ' show-container' : ' hide-container')}>
                  <div class="welcome-block">
                    <p>
                      Forgot your password?
                    </p>
                  </div>
                  <div class="description-block">
                    {/*
                  Modified On: 7 Dec 2020
                  Modification: Added space after EmailID.
                  */}
                    <p>
                      No worries! Please enter your Email ID <break />
                       in the field below. We will send you a reset password link.
                    </p>
                  </div>
                  <form onSubmit={(e) => sendResetPasswordLink(e)}>
                    <div class="input-field">
                      <input onInput={(e) => checkEmailValidationForgot(e)} value={forgotPasswordValue} type="text" name="forgotPasswordValue" placeholder="Enter Official Email ID" id="emailFieldForgotPassword" autofocus />
                    </div>
                    <div class="button-block">
                      {/*
                    Reset Password.
                    Modified On: 7 Dec 2020
                    Modification: Changed Button Name.
                    */}
                      <button name="emailButton" style="width:165px;" type="submit" class={'next-button tenant-brand-color' + (!isEmailCorrect ? ' invalid-bg' : '')}>Send reset password link</button>

                    </div>
                  </form>
                  <div class="button-block">
                    {
                      userNotFound && (
                        <p class="error-message no-weight fs-12">
                          Sorry, we could not find your account.<br /> Please verify your email and retry
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
                          We have sent a reset password link on your email ID. <br />
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
                <div class={'inner-container-form forgot-form-container' + (visibleForm === 'userNotVerified' ? ' show-container' : ' hide-container')}>
                  <div class="welcome-block" style="height:145px;">
                    <p>
                      Hi {userName},<br />
                      we have sent you<br />
                      a verification link
                    </p>
                  </div>
                  <div class="description-block">
                    <p>
                      Please check your email for the
                      verification link we sent you
                    </p>
                  </div>
                  <div class="button-block">
                    <p class="question">
                      Didn’t receive a verification email?
                    </p>
                    {
                      !isVerificationLinkSent && (
                        <p class="link" onClick={(e) => requestForVerificationLink(e)} style="width: 75px">
                          Resend link
                        </p>
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
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
