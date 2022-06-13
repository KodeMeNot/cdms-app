import { h } from 'preact';
import { route } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
import queryString from 'query-string';
import axios from 'axios';
import CONSTANTS from '../../lib/constants';
import { AppStore } from '../../lib/store';
import { passwordErrorMessageText } from '../../lib/utils';
let distanceVerification = 29000;

const SetPasswordToVerify = (props) => {
  let token = ((props.url).split('='))[1];

  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [isPasswordCriteriaMismatched, setIsPasswordCriteriaMismatched] = useState(false);
  const [isNewPasswordSet, setIsNewPasswordSet] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoaderDisplayed, setIsLoaderDisplayed] = useState(false);
  const [isOverlayDisplayed, setIsOverlayDisplayed] = useState(false);
  const [isVerificationLinkExpired, setIsVerificationLinkExpired] = useState(false);
  const [isBothPasswordsMismatched, setIsBothPasswordsMismatched] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
  const [password, setPassword] = useState(false);
  const [isPasswordSameAsBefore, setIsPasswordSameAsBefore] = useState(false);
  const [isFocusInSetPassword, setIsFocusInSetPassword] = useState(false);
  const [isFocusInConfirmPassword, setIsFocusInConfirmPassword] = useState(false);
  const [confirmPassword, setIsConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isPasswordCriteriaMismatchedMsg, setIsPasswordCriteriaMismatchedMsg] = useState(false);
  const [checkOfLengthOfCharacters, setCheckOfLengthOfCharacters] = useState(false);
  const [lengthOfCharacters, setLengthOfCharacters] = useState(true);
  const [crossOfLengthOfCharacters, setCrossOfLengthOfCharacters] = useState(false);
  const [lengthOfCharactersColor, setLengthOfCharactersColor] = useState('black');
  const [checkOfuppercaseCharacter, setCheckOfuppercaseCharacter] = useState(false);
  const [uppercaseCharacter, setUppercaseCharacter] = useState(true);
  const [crossOfuppercaseCharacter, setCrossOfuppercaseCharacter] = useState(false);
  const [uppercaseCharacterColor, setUppercaseCharacterColor] = useState('black');
  const [checkOflowercaseCharacter, setCheckOflowercaseCharacter] = useState(false);
  const [lowercaseCharacter, setLowercaseCharacter] = useState(true);
  const [crossOflowercaseCharacter, setCrossOflowercaseCharacter] = useState(false);
  const [lowercaseCharacterColor, setLowercaseCharacterColor] = useState('black');
  const [checkOfspecialCharacter, setCheckOfspecialCharacter] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(true);
  const [crossOfspecialCharacter, setCrossOfspecialCharacter] = useState(false);
  const [specialCharacterColor, setSpecialCharacterColor] = useState('black');
  const [checkOfnumberCharacter, setCheckOfnumberCharacter] = useState(false);
  const [numberCharacter, setNumberCharacter] = useState(true);
  const [crossOfnumberCharacter, setCrossOfnumberCharacter] = useState(false);
  const [numberCharacterColor, setNumberCharacterColor] = useState('black');
  const [isUserAlreadyVerified, setIsUserAlreadyVerified] = useState(false);
  const [isUserDeactivated, setIsUserDeactivated] = useState(false);
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [isVerificationLinkSent, setIsVerificationLinkSent] = useState(false);

  useEffect(() => {
    if (AppStore.get('token') && Object.keys(AppStore.get('token')).length) {
      AppStore.remove('token');
      verifyUserToken();
    } else {
      verifyUserToken();
      setTimeout(() => {
        if (document.getElementById('setPassword')) {
          document.getElementById('setPassword').focus();
        }
      }, 0);
    }

  }, []);

  function setPasswordd(e) {
    e.preventDefault();
    if (e.target.value) {
      setIsPasswordEmpty(false);
    }
    let result = passwordErrorMessageText(e.target.value, 'setPassword');
    if (e.target.value && !(result.capitalTested && result.smallTested && result.numberTested && result.lengthTested && result.spCharacterTested)) {
      setPassword('');
      setIsPasswordCriteriaMismatched(true);
      if (result.capitalTested) {
        setCheckOfuppercaseCharacter(true);
        setUppercaseCharacter(false);
        setCrossOfuppercaseCharacter(false);
        setUppercaseCharacterColor('#406C3A');
      }
      else {
        setCheckOfuppercaseCharacter(false);
        setUppercaseCharacter(false);
        setCrossOfuppercaseCharacter(true);
        setUppercaseCharacterColor('red');
      }
      if (result.smallTested) {
        setCheckOflowercaseCharacter(true);
        setLowercaseCharacter(false);
        setCrossOflowercaseCharacter(false);
        setLowercaseCharacterColor('#406C3A');
      }
      else {
        setCheckOflowercaseCharacter(false);
        setLowercaseCharacter(false);
        setCrossOflowercaseCharacter(true);
        setLowercaseCharacterColor('red');
      }
      if (result.numberTested) {
        setCheckOfnumberCharacter(true);
        setNumberCharacter(false);
        setCrossOfnumberCharacter(false);
        setNumberCharacterColor('#406C3A');
      }
      else {
        setCheckOfnumberCharacter(false);
        setNumberCharacter(false);
        setCrossOfnumberCharacter(true);
        setNumberCharacterColor('red');
      }
      if (result.spCharacterTested) {
        setCheckOfspecialCharacter(true);
        setSpecialCharacter(false);
        setCrossOfspecialCharacter(false);
        setSpecialCharacterColor('#406C3A');
      }
      else {
        setCheckOfspecialCharacter(false);
        setSpecialCharacter(false);
        setCrossOfspecialCharacter(true);
        setSpecialCharacterColor('red');
      }
      if (result.lengthTested) {
        setCheckOfLengthOfCharacters(true);
        setLengthOfCharacters(false);
        setCrossOfLengthOfCharacters(false);
        setLengthOfCharactersColor('#406C3A');
      }
      else {
        setCheckOfLengthOfCharacters(false);
        setLengthOfCharacters(false);
        setCrossOfLengthOfCharacters(true);
        setLengthOfCharactersColor('red');
      }
    }
    else if (!e.target.value) {
      setPassword('');
      setIsPasswordCriteriaMismatched(false);
      setIsPasswordCriteriaMismatchedMsg(false);
      setCheckOfLengthOfCharacters(false);
      setLengthOfCharacters(true);
      setCrossOfLengthOfCharacters(false);
      setLengthOfCharactersColor('black');
      setCheckOfnumberCharacter(false);
      setNumberCharacter(true);
      setCrossOfnumberCharacter(false);
      setNumberCharacterColor('black');
      setCheckOfspecialCharacter(false);
      setSpecialCharacter(true);
      setCrossOfspecialCharacter(false);
      setSpecialCharacterColor('black');
      setCheckOflowercaseCharacter(false);
      setLowercaseCharacter(true);
      setCrossOflowercaseCharacter(false);
      setLowercaseCharacterColor('black');
      setCheckOfuppercaseCharacter(false);
      setUppercaseCharacter(true);
      setCrossOfuppercaseCharacter(false);
      setUppercaseCharacterColor('black');
    }
    else {
      setPassword(e.target.value);
      setIsPasswordCriteriaMismatched(false);
      setIsPasswordCriteriaMismatchedMsg(false);
      setIsPasswordEmpty(false);
      setCheckOfLengthOfCharacters(true);
      setLengthOfCharacters(false);
      setCrossOfLengthOfCharacters(false);
      setLengthOfCharactersColor('#406C3A');
      setCheckOfnumberCharacter(true);
      setNumberCharacter(false);
      setCrossOfnumberCharacter(false);
      setNumberCharacterColor('#406C3A');
      setCheckOfspecialCharacter(true);
      setSpecialCharacter(false);
      setCrossOfspecialCharacter(false);
      setSpecialCharacterColor('#406C3A');
      setCheckOflowercaseCharacter(true);
      setLowercaseCharacter(false);
      setCrossOflowercaseCharacter(false);
      setLowercaseCharacterColor('#406C3A');
      setCheckOfuppercaseCharacter(true);
      setUppercaseCharacter(false);
      setCrossOfuppercaseCharacter(false);
      setUppercaseCharacterColor('#406C3A');
    }
  }

  async function verifyUserToken() {
    await axios.put(`${CONSTANTS.API_URL}/api/v1/verifyToken`, { verificationToken: token }
    ).then(response => {
      setIsLinkValid(true);
      if (response.data && response.data.statusCode) {
        if (response.data.statusCode === 900 || response.data.statusCode === 820) {
          return setIsVerificationLinkExpired(true);
        }
        if (response.data.statusCode === 805) {
          return setIsUserAlreadyVerified(true);
          //route('/verifyEnterPassword?userAlreadyVerified=true');
        }
        if (response.data.statusCode === 701) {
          return setIsUserDeactivated(true);
          //route('/emailChecks?userDeactivated=true');
        }
        if (response.data.statusCode === 800) {
          return setIsUserNotFound(true);
          //route('/emailChecks?userNotFound=true');
        }
        if (response.data.user) {
          setUserEmail(response.data.user.email);
          setUserName(response.data.user.displayName);
          AppStore.set('userEmail', response.data.user.email);
          AppStore.set('userName', response.data.user.displayName);
        } else {
          AppStore.remove('userEmail', '');
          AppStore.remove('userName', '');
        }

      }
    }).catch(error => {
      if (error.response.data.statusCode === 900) {
        setUserEmail(error.response.data.message);
        setUserName('');
        AppStore.set('userEmail', error.response.data.message);
        AppStore.set('userName', '');
        setIsVerificationLinkExpired(true);
      }
    });
  }

  function setNewPassword(e) {
    e.preventDefault();
    document.getElementById('setPassword').focus();
    setIsPasswordEmpty(false);
    if (!e.target.newPassword.value) {
      setIsPasswordEmpty(true);
    }
    if (isPasswordCriteriaMismatched) {
      return setIsPasswordCriteriaMismatchedMsg(true);
    }
    // if (!isPasswordCriteriaMismatched) {
    setIsPasswordCriteriaMismatchedMsg(false);
    // }
    //Condition to check whether password criteria is mismatched - set isPasswordCriteriaMismatched to true and return
    setIsNewPasswordSet(true);
    setIsPasswordVisible(false);
    setIsLoaderDisplayed(true);
    setIsOverlayDisplayed(true);
    setTimeout(() => {
      setIsLoaderDisplayed(false);
      setIsOverlayDisplayed(false);
    }, 300);
    setTimeout(() => {
      if (isNewPasswordSet && document.getElementById('setConfirmPassword')) {
        document.getElementById('setConfirmPassword').focus();
      }
    }, 600);
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  }

  function toggleSetPasswordIcon() {
    setIsFocusInSetPassword(!isFocusInSetPassword);
  }

  function toggleConfirmPasswordIcon() {
    setIsFocusInConfirmPassword(!isFocusInConfirmPassword);
  }

  function confirmPasswordd(e) {
    e.preventDefault();
    document.getElementById('setConfirmPassword').focus();
    setIsConfirmPasswordEmpty(false);
    setIsBothPasswordsMismatched(false);

    if (!e.target.confirmPassword.value) {
      return setIsConfirmPasswordEmpty(true);
    }
    if (e.target.prevNewPassword.value !== e.target.confirmPassword.value) {
      return setIsBothPasswordsMismatched(true);
    }
    axios.post(`${CONSTANTS.API_URL}/api/v1/setPassword`,
      {
        newPassword: e.target.prevNewPassword.value,
        confirmNewPassword: e.target.confirmPassword.value,
        verificationToken: token
      }
    ).then(async response => {
      await axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'set first time password', email: userEmail });
      setIsPasswordSet(true);
    }).catch(error => {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      } else {
        console.log('Something Went Wrong', error);
      }
    });
  }

  function setConfirmPassword(e) {
    e.preventDefault();
    setIsConfirmPassword(e.target.value);
    if (e.target.value) {
      setIsConfirmPasswordEmpty(false);
    }
    if ((password === confirmPassword) || !e.target.value) {
      setIsBothPasswordsMismatched(false);
    }
  }

  function hideConfirmPasswordField() {
    setIsNewPasswordSet(false);
    setIsConfirmPasswordVisible(false);
    setIsPasswordSameAsBefore(false);
    setIsPasswordVisible(false);
    setIsConfirmPasswordEmpty(false);
    setIsBothPasswordsMismatched(false);
    setTimeout(() => {
      if (!isNewPasswordSet && document.getElementById('setPassword')) {
        document.getElementById('setPassword').focus();
      }
    }, 0);
  }

  async function requestForVerificationLink() {
    try {
      axios.put(`${CONSTANTS.API_URL}/api/v1/user/pageVisitUserInformation`, { action: 'request resend verification', userEmail });

      await axios.put(`${CONSTANTS.API_URL}/api/v1/resendLink/${userEmail}`
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
    <div >
      {
        !isVerificationLinkExpired && isLinkValid && (
          <div class="auth-container-form">
            <div class={'loader-bar tenant-brand-color' + (isLoaderDisplayed ? ' start' : ' no-color')} />
            <div class={'go-back ' + (!isNewPasswordSet ? ' visibility-none' : '')} onClick={(e) => hideConfirmPasswordField(e)}>
              <em class="icon icon-arrow-1-left" />
              <p>Back</p>
            </div>
            <div class={'inner-container-form set-form-container' + (!isNewPasswordSet ? ' show-container' : ' hide-container')}>
              <div class="welcome-block">
                <p>
                  Welcome, {userName}
                </p>
              </div>
              <div class="description-block">
                <p>
                  Please create your password in the field
                  below to authenticate your account
                </p>
              </div>
              <div class="input-field-value">
                <p>{userEmail}</p>
                <img class="email-svg-text" src="/assets/images/Email.svg" />
              </div>
              <form onSubmit={(e) => setNewPassword(e)}>
                <div class="input-field">
                  <input id='setPassword' type={isPasswordVisible ? 'text' : 'password'} name="newPassword" placeholder="Create Your Password" autofocus onInput={(e) => setPasswordd(e)} disabled={isNewPasswordSet} onfocusin={(e) => toggleSetPasswordIcon(e)} onfocusout={(e) => toggleSetPasswordIcon(e)} />
                  <svg class="lock-svg-input-focus" width="18" height="18">
                    <path xmlns="http://www.w3.org/2000/svg" class="st0" d="M3.6,7.6L3.4,8.9c0,0.1,0.1,0.2,0.2,0.3c0,0,0,0,0,0h0.9c0.1,0,0.2-0.1,0.2-0.2c0,0,0,0,0,0L4.7,7.6  C4.9,7.4,5,7.1,5,6.8C5,6.3,4.6,5.9,4.1,6C3.6,6,3.2,6.4,3.2,6.8C3.2,7.1,3.3,7.4,3.6,7.6z M4.1,6.4c0.3,0,0.5,0.2,0.5,0.5  c0,0.2-0.1,0.3-0.3,0.4c-0.1,0-0.1,0.1-0.1,0.2l0.1,1.2H3.9L4,7.5c0-0.1,0-0.2-0.1-0.2C3.7,7.2,3.6,6.9,3.7,6.7  C3.8,6.5,3.9,6.4,4.1,6.4L4.1,6.4z" style={isFocusInSetPassword ? 'fill:#353535' : 'fill:#555555'} />
                    <path xmlns="http://www.w3.org/2000/svg" class="st0" d="M8,4.1H7.3V3.2C7.4,1.4,6-0.1,4.2-0.1S1,1.2,0.9,2.9c0,0.1,0,0.2,0,0.3v0.9H0.2C0.1,4.1,0,4.2,0,4.3v5.7  C0,10.6,0.4,11,0.9,11h6.4c0.5,0,0.9-0.4,0.9-0.9V4.3C8.2,4.2,8.1,4.1,8,4.1C8,4.1,8,4.1,8,4.1z M1.4,3.2c0-1.5,1.2-2.7,2.7-2.7  c1.5,0,2.7,1.2,2.7,2.7v0.9l0,0V3.2C6.7,1.8,5.5,0.6,4.1,0.5C2.7,0.6,1.5,1.8,1.4,3.2v0.9l0,0V3.2z M6.9,3.2v0.9H1.4V3.2  c0.3-1.3,1.4-2.4,2.7-2.7C5.5,0.8,6.5,1.9,6.9,3.2z M7.8,10.1c0,0.3-0.2,0.5-0.5,0.5H0.9c-0.3,0-0.5-0.2-0.5-0.5V4.6h7.3V10.1z" style={isFocusInSetPassword ? 'fill:#353535' : 'fill:#555555'} />
                  </svg>
                  {
                    !isPasswordVisible && (
                      <img class="open-eye-svg cursor-pointer" src="/assets/images/Open_Eye.svg" onClick={(e) => togglePasswordVisibility(e)} />
                    )
                  }
                  {
                    isPasswordVisible && (
                      <img class="unseen-eye-svg cursor-pointer" src="/assets/images/Unseen_Eye.svg" onClick={(e) => togglePasswordVisibility(e)} />
                    )
                  }
                </div>
                <div class="button-block">
                  {
                    isPasswordEmpty && (
                      <p class="error-message">
                        <em class="icon icon-exclamation" /> Please create a password
                      </p>
                    )
                  }
                  {
                    isPasswordCriteriaMismatchedMsg && (
                      <p class="error-message">
                        <em class="icon icon-exclamation" /> Password doesn’t meet the criteria
                      </p>
                    )
                  }
                  {!isNewPasswordSet &&
                    <p class="forgot-passwprd cursor-text">
                      Password must include:
                    <ul style='list-style-type: none;'>
                        <li style={`color:${lengthOfCharactersColor}`}>
                          {
                            lengthOfCharacters && (
                              <span class='list-dot' />
                            )
                          }
                          {
                            crossOfLengthOfCharacters && (
                              <img id='crossOfLengthOfCharacters' class="red-cross" src='/assets/icons/passwordCheck/Red_Cross.svg' />
                            )
                          }
                          {
                            checkOfLengthOfCharacters && (
                              <img id='checkOfLengthOfCharacters' class="green-check" src='/assets/icons/passwordCheck/Green_Check.svg' />
                            )
                          }
                       8 to 15 characters</li>
                        <li style={`color:${uppercaseCharacterColor}`}>
                          {
                            uppercaseCharacter && (
                              <span class='list-dot' />
                            )
                          }
                          {
                            crossOfuppercaseCharacter && (
                              <img id='crossOfuppercaseCharacter' class="red-cross" src='/assets/icons/passwordCheck/Red_Cross.svg' />
                            )
                          }
                          {
                            checkOfuppercaseCharacter && (
                              <img id='checkOfuppercaseCharacter' class="green-check" src='/assets/icons/passwordCheck/Green_Check.svg' />
                            )
                          }
                       one UPPERCASE letter (A - Z)</li>

                        <li style={`color:${lowercaseCharacterColor}`}>
                          {
                            lowercaseCharacter && (
                              <span class='list-dot' />
                            )
                          }
                          {
                            crossOflowercaseCharacter && (
                              <img id='crossOflowercaseCharacter' class="red-cross" src='/assets/icons/passwordCheck/Red_Cross.svg' />
                            )
                          }
                          {
                            checkOflowercaseCharacter && (
                              <img id='checkOflowercaseCharacter' class="green-check" src='/assets/icons/passwordCheck/Green_Check.svg' />
                            )
                          }
                       one LOWERCASE letter (a - z)</li>

                        <li style={`color:${numberCharacterColor}`}>
                          {
                            numberCharacter && (
                              <span class='list-dot' />
                            )
                          }
                          {
                            crossOfnumberCharacter && (
                              <img id='crossOfnumberCharacter' class="red-cross" src='/assets/icons/passwordCheck/Red_Cross.svg' />
                            )
                          }
                          {
                            checkOfnumberCharacter && (
                              <img id='checkOfnumberCharacter' class="green-check" src='/assets/icons/passwordCheck/Green_Check.svg' />
                            )
                          }
                       one Number (0 - 9)</li>

                        <li style={`color:${specialCharacterColor}`}>
                          {
                            specialCharacter && (
                              <span class='list-dot' />
                            )
                          }
                          {
                            crossOfspecialCharacter && (
                              <img id='crossOfspecialCharacter' class="red-cross" src='/assets/icons/passwordCheck/Red_Cross.svg' />
                            )
                          }
                          {
                            checkOfspecialCharacter && (
                              <img id='checkOfspecialCharacter' class="green-check" src='/assets/icons/passwordCheck/Green_Check.svg' />
                            )
                          }
                       one SPECIAL character (!,@, #, $, %, ^ etc.)</li>

                      </ul>
                    </p>
                  }
                  {
                    isPasswordSameAsBefore && (
                      <p class="error-message">
                        <em class="icon icon-exclamation" /> Password cannot be the same as your last two passwords
                      </p>
                    )
                  }
                  {/*
                <p class="forgot-passwprd">
                  Password must include:
                  <ul>
                    <li>8 to 15 characters</li>
                    <li>one UPPERCASE letter (A - Z)</li>
                    <li>one LOWERCASE letter (a - z)</li>
                    <li>one Number (0 - 9)</li>
                    <li>one SPECIAL character (!,@, #, $, %, ^ etc.)</li>
                  </ul>
                </p>
                */}
                  <button type="submit" class={'next-button tenant-brand-color' + (!password ? ' invalid-bg' : '')}>Confirm</button>
                </div>
              </form>
            </div>

            <div class={'inner-container-form set-confirm-form-container' + (isNewPasswordSet ? ' show-container' : ' hide-container')}>
              <div class="welcome-block">
                <p>
                  {userName}, please<br />
                  confirm your password
                </p>
              </div>
              <div class="input-field-value">
                <p>{userEmail}</p>
                <img class="email-svg-text" src="/assets/images/Email.svg" />
              </div>
              <form onSubmit={(e) => confirmPasswordd(e)}>
                <div class="input-field">
                  <input value={password} type={isPasswordVisible ? 'text' : 'password'} name="prevNewPassword" placeholder="Create Your Password" disabled />
                  <svg class="lock-svg-input-focus" width="18" height="18">
                    <path xmlns="http://www.w3.org/2000/svg" class="st0" d="M3.6,7.6L3.4,8.9c0,0.1,0.1,0.2,0.2,0.3c0,0,0,0,0,0h0.9c0.1,0,0.2-0.1,0.2-0.2c0,0,0,0,0,0L4.7,7.6  C4.9,7.4,5,7.1,5,6.8C5,6.3,4.6,5.9,4.1,6C3.6,6,3.2,6.4,3.2,6.8C3.2,7.1,3.3,7.4,3.6,7.6z M4.1,6.4c0.3,0,0.5,0.2,0.5,0.5  c0,0.2-0.1,0.3-0.3,0.4c-0.1,0-0.1,0.1-0.1,0.2l0.1,1.2H3.9L4,7.5c0-0.1,0-0.2-0.1-0.2C3.7,7.2,3.6,6.9,3.7,6.7  C3.8,6.5,3.9,6.4,4.1,6.4L4.1,6.4z" style={'fill:#555555'} />
                    <path xmlns="http://www.w3.org/2000/svg" class="st0" d="M8,4.1H7.3V3.2C7.4,1.4,6-0.1,4.2-0.1S1,1.2,0.9,2.9c0,0.1,0,0.2,0,0.3v0.9H0.2C0.1,4.1,0,4.2,0,4.3v5.7  C0,10.6,0.4,11,0.9,11h6.4c0.5,0,0.9-0.4,0.9-0.9V4.3C8.2,4.2,8.1,4.1,8,4.1C8,4.1,8,4.1,8,4.1z M1.4,3.2c0-1.5,1.2-2.7,2.7-2.7  c1.5,0,2.7,1.2,2.7,2.7v0.9l0,0V3.2C6.7,1.8,5.5,0.6,4.1,0.5C2.7,0.6,1.5,1.8,1.4,3.2v0.9l0,0V3.2z M6.9,3.2v0.9H1.4V3.2  c0.3-1.3,1.4-2.4,2.7-2.7C5.5,0.8,6.5,1.9,6.9,3.2z M7.8,10.1c0,0.3-0.2,0.5-0.5,0.5H0.9c-0.3,0-0.5-0.2-0.5-0.5V4.6h7.3V10.1z" style={'fill:#555555'} />
                  </svg>
                  {
                    !isPasswordVisible && (
                      <img class="open-eye-svg cursor-pointer" src="/assets/images/Open_Eye.svg" onClick={(e) => togglePasswordVisibility(e)} />
                    )
                  }
                  {
                    isPasswordVisible && (
                      <img class="unseen-eye-svg cursor-pointer" src="/assets/images/Unseen_Eye.svg" onClick={(e) => togglePasswordVisibility(e)} />
                    )
                  }
                  <input autofocus id='setConfirmPassword' type={isConfirmPasswordVisible ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Your Password" onInput={(e) => setConfirmPassword(e)} onfocusin={(e) => toggleConfirmPasswordIcon(e)} onfocusout={(e) => toggleConfirmPasswordIcon(e)}
                  // onInput={(e) => LinkState(this, 'confirmPassword')}
                  />
                  {/*<em class="icon confirm-password-icon icon-lock" />*/}
                  <svg class="lock-svg-input-focus confirm-password-focus" width="18" height="18">
                    <path xmlns="http://www.w3.org/2000/svg" class="st0" d="M3.6,7.6L3.4,8.9c0,0.1,0.1,0.2,0.2,0.3c0,0,0,0,0,0h0.9c0.1,0,0.2-0.1,0.2-0.2c0,0,0,0,0,0L4.7,7.6  C4.9,7.4,5,7.1,5,6.8C5,6.3,4.6,5.9,4.1,6C3.6,6,3.2,6.4,3.2,6.8C3.2,7.1,3.3,7.4,3.6,7.6z M4.1,6.4c0.3,0,0.5,0.2,0.5,0.5  c0,0.2-0.1,0.3-0.3,0.4c-0.1,0-0.1,0.1-0.1,0.2l0.1,1.2H3.9L4,7.5c0-0.1,0-0.2-0.1-0.2C3.7,7.2,3.6,6.9,3.7,6.7  C3.8,6.5,3.9,6.4,4.1,6.4L4.1,6.4z" style={isFocusInConfirmPassword ? 'fill:#353535' : 'fill:#555555'} />
                    <path xmlns="http://www.w3.org/2000/svg" class="st0" d="M8,4.1H7.3V3.2C7.4,1.4,6-0.1,4.2-0.1S1,1.2,0.9,2.9c0,0.1,0,0.2,0,0.3v0.9H0.2C0.1,4.1,0,4.2,0,4.3v5.7  C0,10.6,0.4,11,0.9,11h6.4c0.5,0,0.9-0.4,0.9-0.9V4.3C8.2,4.2,8.1,4.1,8,4.1C8,4.1,8,4.1,8,4.1z M1.4,3.2c0-1.5,1.2-2.7,2.7-2.7  c1.5,0,2.7,1.2,2.7,2.7v0.9l0,0V3.2C6.7,1.8,5.5,0.6,4.1,0.5C2.7,0.6,1.5,1.8,1.4,3.2v0.9l0,0V3.2z M6.9,3.2v0.9H1.4V3.2  c0.3-1.3,1.4-2.4,2.7-2.7C5.5,0.8,6.5,1.9,6.9,3.2z M7.8,10.1c0,0.3-0.2,0.5-0.5,0.5H0.9c-0.3,0-0.5-0.2-0.5-0.5V4.6h7.3V10.1z" style={isFocusInConfirmPassword ? 'fill:#353535' : 'fill:#555555'} />
                  </svg>
                  {
                    !isConfirmPasswordVisible && (
                      <img class="open-eye-svg cursor-pointer confirm-password" src="/assets/images/Open_Eye.svg" onClick={(e) => toggleConfirmPasswordVisibility(e)} />
                    )
                  }
                  {
                    isConfirmPasswordVisible && (
                      <img class="unseen-eye-svg cursor-pointer confirm-password" src="/assets/images/Unseen_Eye.svg" onClick={(e) => toggleConfirmPasswordVisibility(e)} />
                    )
                  }
                </div>
                <div class="button-block" style="height:45px">
                  {
                    isConfirmPasswordEmpty && (
                      <p class="error-message">
                        <em class="icon icon-exclamation" /> Please confirm your password
                      </p>
                    )
                  }
                  {
                    isBothPasswordsMismatched && (
                      <p class="error-message">
                        <em class="icon icon-exclamation" /> Please ensure your passwords match
                      </p>
                    )
                  }
                  <button type="submit" class={'next-button tenant-brand-color' + (!confirmPassword ? ' invalid-bg' : '')}>Confirm</button>

                </div>
                {
                  isPasswordSet && (
                    <p> Your Password has been set. Please click <a href="/">here</a> to Login.</p>
                  )
                }
                {
                  isUserAlreadyVerified && (
                    <p style="color:red"> User already Verified.</p>
                  )
                }
                {
                  isUserDeactivated && (
                    <p style="color:red"> User is deactivated.</p>
                  )
                }
                {
                  isUserNotFound && (
                    <p style="color:red">User not found.</p>
                  )
                }
              </form>
            </div>

            <div class="auth-conatiner-form-overlay-transition" style={isOverlayDisplayed ? 'width:100%' : 'width:0'} />
          </div>
        )
      }
      {
        isVerificationLinkExpired && (
          <div class="auth-container-form">
            <div class='go-back visibility-none'>
              <em class="icon icon-arrow-1-left" />
              <p>Back</p>
            </div>
            <div class="inner-container-form">
              <div class="welcome-block">
                <p>
                  Oops!
                </p>
              </div>
              <div class="description-block">
                <p>
                  The verification link,<br />
                  requested by you has expired
                </p>
              </div>
              <div class="input-field-value">
                <p>{userEmail}</p>
                <img class="email-svg-text" src="/assets/images/Email.svg" />
              </div>
              <div class="button-block">
                {
                  !isVerificationLinkSent && (
                    <p class="question">
                      Didn’t receive the verification link?
                    </p>
                  )
                }
                {
                  !isVerificationLinkSent && (
                    <p class="link" onClick={(e) => requestForVerificationLink(e)} style="width: 75px">
                      Resend link
                    </p>
                  )
                }
                {
                  isVerificationLinkSent && (
                    <p class="question">
                      Didn’t receive a verification email
                    </p>
                  )
                }
                {
                  isVerificationLinkSent && (
                    <p class="error-message no-weight fs-12">
                      Please wait 00:29 secs to resend another verification email
                    </p>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};
export default SetPasswordToVerify;
