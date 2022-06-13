import { h } from 'preact';
import Header from '../../components/header';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { route } from 'preact-router';
import { getItem, removeAll} from '../../lib/myStore';
import { DropDown } from '../../components/dropDown';
import { Modal, ModalBody } from '../../components/rightDrawer';
import {passwordErrorMessageText} from '../../lib/utils';
// import { getEncryptedData, getDecryptedData } from '../../lib/encryption';

import CONSTANTS from '../../lib/constants';
/*
T1014
Modified By: Sagar Patil
Modified On:  13/11/2020
Modification :  Add Profile Component
*/
const Profile = () => {
  const userInfo = getItem('userinfo');
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [authenticationType, setAuthenticationType] = useState('');
  const [totpGoogleAuthenticator, setTotpGoogleAuthenticator] = useState('');
  const [isGAuthErrorShown, setGAuthErrorShown] = useState(false);
  const [gAuthErrorMessage, setGAuthErrorMessage] = useState('');
  const [isGAuthConfiguredSuccess , setIsGAuthConfiguredSuccess] = useState(false);
  const [isAuthConfiguredSuccess , setIsAuthConfiguredSuccess] = useState(false);
  const [isGoogleAuthenticatorConfigured , setIsGoogleAuthenticatorConfigured] = useState(userInfo.googleAuthenticator);
  const [qrCode, setQrCode] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [selectedType, setSelectedType] = useState('twoFactor');
  //Modified By: Yashvi.
  //Modification Date: 8 Dec 2020
  //Modification: useStates for Change Password.
  //let history = useHistory();
  let [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);
  let [oldPasswordCorrectError, setOldPasswordCorrectError] = useState('');
  let [passwordErrorMessage, setPasswordErrorMessage] = useState('Password must contain atleast one');
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/;
  const [newPassword, setNewPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isChangePasswordSuccess, setIsChangePasswordSuccess] = useState(false);
  const [changePasswordSuccessMsg, setChangePasswordSuccessMsg] = useState('');
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isGoogleAuthenticator, setIsGoogleAuthenticator] = useState(true);

  useEffect(() => {
    // setIsUpdateProfile(false);
    document.getElementById('changePassword').style.color = '#8d99a5';
    setIsAuthConfiguredSuccess(false);
    const request = axios.get(`${CONSTANTS.API_URL}/api/v1/getUserInfoForProfile?uuid=${userInfo.uuid}`);
    request.then( async response => {
      let userProfileInfo = response.data;
      setIsGoogleAuthenticatorConfigured(userProfileInfo.googleAuthenticator);
      // if (userProfileInfo.profileID) {
      //   let userProfile = await axios.get(`${CONSTANTS.API_URL}/api/v1/attachments?attachmentIDs=${userProfileInfo.profileID}`);
      //   userProfile = getDecryptedData(userProfile.data);
      //   setUserProfileLogo(userProfile[0])
      // }
      setUserInfo(userProfileInfo);
    }
    ).catch( error => {
      if (error.response && error.response.data) {

      }
    });
  },[isAuthConfiguredSuccess]);

  //Modified By: Yashvi.
  //Modification Date: 8 Dec 2020
  //Modification: Functions added to validate password, Check current password and change password.
  function checkCurrentPassword(e) {
    e.preventDefault();
    if (!e.target.value ) return;
    let payload = {
      oldPassword: e.target.value
    };
    //let encryptedData = getEncryptedData(payload);
    const request = axios.post(`${CONSTANTS.API_URL}/api/v1/verifyOldPassword`,payload);
    request.then( response => {
      // Add decrypted data logic here for T369

      if (response.status === 200) {
        setIsOldPasswordCorrect(true);
        setOldPasswordCorrectError('');
      }
    }
    ).catch( error => {
      setIsOldPasswordCorrect(false);
      if (error.response && error.response.data) {
        setOldPasswordCorrectError(error.response.data.message);
      }
    });
  }

  function validateThePasswordCriterion (e) {
    setIsPasswordValid(false);
    setIsPasswordValid(regex.test(e.target.value));
    let passwordError = passwordErrorMessageText(e.target.value, 'changePassword');
    if (passwordError){
      console.log(passwordError,'errorrrrr');
      setPasswordErrorMessage(passwordError);
    }
    else {
      setIsPasswordValid(true);
    }
  }

  function validatePasswordSameCriterion (e) {
    if (e.target.value){
      setIsPasswordSame(newPassword === e.target.value);
    }
    else {
      setIsPasswordSame(true);
    }
  }

  function changeNewPassword(e){
    e.preventDefault();
    let payload = {
      newPassword,
      confirmNewPassword: passwordConfirm
    };
    // let encryptedData = getEncryptedData(payload);
    const request = axios.put(`${CONSTANTS.API_URL}/api/v1/changePassword`,payload);
    request.then( async response => {
      // Add decrypted data logic here for T369
      console.log(response,'responseresponse');
      if (response.status === 200) {
        setIsChangePasswordSuccess(true);
        setChangePasswordSuccessMsg('Your password has been changed. You will be logged out of the system for security reasons. Please login again with your new password.');
        setTimeout(async () => {
          await window.localStorage.removeItem('token');
          await window.localStorage.removeItem('userInfo');
          route('/');
        },5000);

      }
    }
    ).catch( error => {
      setIsChangePasswordSuccess(false);
      if (error.response && error.response.data) {
        setChangePasswordSuccessMsg(error.response.data.message);
      }
    });
  }

  function toggleChangePassword(e){
    setIsChangePassword(true);
    document.getElementById('changePassword').style.color = '#000000';
    document.getElementById('googleAuthenticator').style.color = '#8d99a5';
    setIsGoogleAuthenticator(false);
  }

  function onTypeSeclect(type) {
    setIsGoogleAuthenticator(true);
    document.getElementById('changePassword').style.color = '#8d99a5';
    document.getElementById('googleAuthenticator').style.color = '#000000';
    setIsChangePassword(false);
    setSelectedType(type);
  }

  function mfaQrForGoogleAuthenticator(){
    try {
      setTotpGoogleAuthenticator('');
      setGAuthErrorShown(false);
      setIsGAuthConfiguredSuccess(false);
      setAuthenticationType('googleAuthenticator');
      let encryptedData = {
        type: 'googleAuthenticator'
      };

      axios.post(`${CONSTANTS.API_URL}/api/v1/gernerateQRCodeForMFA`,encryptedData).then((result) => {
        if (result && result.data){
          setQrCode(result.data.qrCode);
          setSecretKey(result.data.secret);
        }
      });

    } catch (err){}

  }
  // T1014
  // Modified By:  Sagar Patil
  // Modified On: 17/11/2020
  // Modification : Add verifyTOTPAndActivateGoogleAuthenticator function
  async function verifyTOTPAndActivateGoogleAuthenticator() {
    try {
      let encryptedData = {
        totp: totpGoogleAuthenticator
      };
      setGAuthErrorShown(false);
      setGAuthErrorShown(false);
      setGAuthErrorMessage('');
      let result = await axios.put(`${CONSTANTS.API_URL}/api/v1/varifyTOTPAndActivateMFAUsingGoogleAuthenticator`,encryptedData);
      if (result)
      {
        setIsGoogleAuthenticatorConfigured(true);
        setIsGAuthConfiguredSuccess(true);
        setIsAuthConfiguredSuccess(true);
      }
      // .then((result) => {
      //   setIsGoogleAuthenticatorConfigured(true);
      //   setIsGAuthConfiguredSuccess(true);
      //   setIsAuthConfiguredSuccess(true);
      // });
    } catch (err){
      if (err)
      {

        setGAuthErrorShown(true);
        setIsGAuthConfiguredSuccess(false);
        setGAuthErrorMessage('Google Authenticator PIN does not match. Please try again');
      }

    }

  }
  // T1014
  // Modified By:  Sagar Patil
  // Modified On: 17/11/2020
  // Modification : Add confirmDelete function
  const confirmDelete = () => {
    const delete2FA = window.confirm(
      "Are you sure you want to remove 2FA? This will make your account less secure."
    );
    if (delete2FA) {
      if (isGoogleAuthenticatorConfigured) disableGoogleAutheticator();
    }
  };

  function disableGoogleAutheticator () {
    try {

      axios.put(`${CONSTANTS.API_URL}/api/v1/deactivateMFAForGoogleAuthenticator`).then((result) => {
        setAuthenticationType();
        setIsGoogleAuthenticatorConfigured(false);
      });
    } catch (err){}
  }
  // T1014
  // Modified By:  Sagar Patil
  // Modified On: 13/11/2020
  // Modification : Add render
  return (
    <div>
      <div>
        <div class='row' style="margin-top:40px; display:none;"/>
        <div class='row' >
          <div class='tabs-wrapper column col-sm-12 shadow-soft' style='position: relative; background-color: #fff'>
            <nav>
              <div class="margin-bottom-micro"><a>Your profile</a></div>
              {/*//Modified By: Yashvi.
              //Modification Date: 8 Dec 2020
              //Modification: Added onClick event on 'Change Password'.*/}
              <div class="margin-bottom-micro"><span class='cursor-pointer' id='changePassword' onClick={(e) => toggleChangePassword(e)}>Change Password</span></div>
              <div class="margin-bottom-micro"><span class='cursor-pointer' id='googleAuthenticator' onClick={() => onTypeSeclect('twoFactor')}>Two Factor</span></div>
            </nav>
            {
              isGoogleAuthenticator &&(
                <main>
                  <div class=""><h5 class="">Two-factor authentication</h5><p class="">Set or change your 2FA method.</p>
                    <div class="row" style='margin-top: 2vmax;'>
                      <div class="column col-sm-4">
                        <div class="shape-rounded cursor-pointer" style='border: 2px solid hsl( 210,12%,90%); padding: 16px;' onClick={() => mfaQrForGoogleAuthenticator()}>
                          <div class="img">
                            <img src="/assets/images/google.jpeg"/>
                          </div>
                          <div class="margin-top-nano text-center">Google</div>
                        </div>
                      </div>
                      {
                        (isGoogleAuthenticatorConfigured) && (
                          <div class='margin-top-micro'>
                            <p> <span class='cursor-pointer' onClick={() => confirmDelete()}> Remove 2FA (not recommended)</span> </p><br />
                            <h7>Your account is now protected by Google Authenticator!</h7>
                            <h7>A new PIN will be generated every time you login.</h7>
                          </div>
                        )
                      }
                      {
                        authenticationType  === 'googleAuthenticator' && !isGoogleAuthenticatorConfigured && (
                          <div class="sc-gtssRu btwmVc margin-top-micro medium-gutters">
                            <div class="sc-bdnylx dJdyEA whole">
                              <div class="sc-iwaifL gMCrJm padding-all-medium shape-rounded">
                                <h5 class="">Setup Google Authenticator</h5>
                                <p>1. Install GOOGLE AUTHENTICATOR application on your phone.</p>
                                <p>2. Launch the application on your phone, and add a new entry for this account.</p>
                                <p>3. You can scan above shown QR code or you can manually enter below key.</p>
                                <p>4. Enter the provided PIN in Below textbox and verify PIN.</p>
                                <p><img style={{ width: "unset", height: "150px" }} src={qrCode ? qrCode : ''} /></p>
                                <p class='margin-top-micro'><strong> Key: {secretKey} </strong></p>
                                <br />

                                <input type='text' label="Enter PIN" placeholder= "Enter PIN" name="totpGoogleAuthenticator" value={totpGoogleAuthenticator} onInput={(e) => {setTotpGoogleAuthenticator(e.target.value);}}/>
                                <div class='margin-top-micro'>
                                  <button onClick={() => verifyTOTPAndActivateGoogleAuthenticator()} disabled={!(totpGoogleAuthenticator.length === 6)}> Submit </button>
                                </div>
                                {
                                  isGAuthErrorShown && (
                                    <p style="color:red;">{gAuthErrorMessage}</p>
                                  )
                                }
                              </div>
                            </div>
                          </div>

                        )
                      }
                    </div>
                  </div>
                </main>
              )}
            {/*//Modified By: Yashvi.
          //Modification Date: 8 Dec 2020
          //Modification: Change password tab added.*/}
            {
              isChangePassword &&(
                <main>
                  <div class=""><h5 class="">Change Password</h5>
                    <div class="row" style='margin-top: 2vmax;'>
                      <div class="column col-sm-12 col-md-6">
                        <form>
                          <input type='text' placeholder='Current password' label="Current password" type='password' style="border-radius: 6px; background-color: #fff; color: #a0a0a0; font-size: 13px; margin-bottom: 7px;" onBlur={(e) => checkCurrentPassword(e)}/>
                          <input type='text' required placeholder="New password" label="New password" type='password'  disabled={!isOldPasswordCorrect}
                            style="border-radius: 6px; background-color: #fff; color: #a0a0a0; font-size: 13px; margin-bottom: 7px;"
                            onInput={(e) => {
                            // handleChange(e);
                              setNewPassword(e.target.value);
                              validateThePasswordCriterion(e);
                              if (passwordConfirm && passwordConfirm.length) {
                                setIsPasswordSame(e.target.value === passwordConfirm);
                              }
                            }}/>
                          <input type='text' required placeholder="Re-enter new password" label="Re-enter new password" type='password'  disabled={!isOldPasswordCorrect} style="border-radius: 6px; background-color: #fff; color: #a0a0a0; font-size: 13px; margin-bottom: 7px;"
                            onInput={(e) => {
                              setPasswordConfirm(e.target.value);
                              // handleChange(e);
                              validatePasswordSameCriterion(e);
                            }}/>
                          <button onClick= {(e)=> {changeNewPassword(e);}} kind="primary" shadow="mild" disabled={!(isOldPasswordCorrect && isPasswordValid && isPasswordSame)}>
                              Set new password
                          </button>
                        </form>
                      </div>
                      <div class="column col-sm-12 col-md-6">
                        <div style="color:red; font-size: .8rem;">
                          {oldPasswordCorrectError}
                        </div>
                        {
                          !isPasswordValid && (
                            <div style="color:red; font-size: .8rem;margin-top:40px;">
                              {passwordErrorMessage}
                            </div>
                          )
                        }
                        {
                          !isPasswordSame && (
                            <div style="color:red; font-size: .8rem;margin-top: 85px;">
                                  Please enter same password as above
                            </div>
                          )
                        }
                        {
                          isChangePasswordSuccess && (
                            <div style="color:green; font-size: .8rem;">
                              {changePasswordSuccessMsg}
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </main>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
