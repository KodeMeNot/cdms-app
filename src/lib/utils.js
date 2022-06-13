/**
* @param date - Date to be formatted, need not be JS date, ISO string would be fine as well
* @param isTimeRequired - If set to true, will also return the time of the day component
*/
// import http from 'fetch-bb';
import CONSTANTS from '../lib/constants';
import { AppStore } from '../lib/store';
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
export function formatDateTime(date, isTimeRequired) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone:'Asia/Kolkata'
  };
  let formattedDate = '';
  if (isTimeRequired) {
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.second = 'numeric';
  }
  if (date) {
    formattedDate = new Intl.DateTimeFormat('en-IN', options).format(new Date(date));
  }
  return formattedDate;
}

export function formatDateTimeForDashboard(date, isTimeRequired) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone:'Asia/Kolkata'
  };
  let formattedDate = '';
  if (isTimeRequired) {
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.second = 'numeric';
  }
  if (date) {
    formattedDate = new Intl.DateTimeFormat('en-IN', options).format(new Date(date).setHours(new Date(date).getHours()-5,new Date(date).getMinutes()-30,0));
  }
  // console.log(date,formattedDate);
  return formattedDate;
}

export function getFormattedAmount(amount) {
  if (amount || amount === 0) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount).split('.')[0];
  }
  return '-';
}

export function applyAclForFeedAndChat(actorID,loggedInID) {
  if (actorID === loggedInID){
    return true;
  }
  return false;
}

export function startLoader() {
  let element = document.getElementById('loader-bg');
  element.style.display = 'block';
}

export function stopLoader() {
  let element = document.getElementById('loader-bg');
  element.style.display = 'none';
}

export function getCommaSeparatedValues(list, value) {
  let names = [];
  if (!value) value = 'displayName';
  list.map((row) => {
    row ? names.push(row[value]) : '';
  });
  names = names.join(', ');
  return names;
}

export function amountInWordsConversion(amount) {
  let mapping = {
    '0': '',
    '1': 'एक',
    '2': 'दोन',
    '3': 'तीन',
    '4': 'चार',
    '5': 'पाच',
    '6': 'सहा',
    '7': 'सात',
    '8': 'आठ',
    '9': 'नऊ',
    '10': 'दहा',
    '11': 'अकरा',
    '12': 'बारा',
    '13': 'तेरा',
    '14': 'चौदा',
    '15': 'पंधरा',
    '16': 'सोळा',
    '17': 'सतरा',
    '18': 'अठरा',
    '19': 'एकोणीस',
    '20': 'वीस',
    '21': 'एकवीस',
    '22': 'बावीस',
    '23': 'तेवीस',
    '24': 'चोवीस',
    '25': 'पंचवीस',
    '26': 'सव्वीस',
    '27': 'सत्तावीस',
    '28': 'अठ्ठावीस',
    '29': 'एकोणतीस',
    '30': 'तीस',
    '31': 'एकतीस',
    '32': 'बत्तीस',
    '33': 'तेहेतीस',
    '34': 'चौतीस',
    '35': 'पस्तीस',
    '36': 'छत्तीस',
    '37': 'सदतीस',
    '38': 'अडतीस',
    '39': 'एकोणचाळीस',
    '40': 'चाळीस',
    '41': 'एक्केचाळीस',
    '42': 'बेचाळीस',
    '43': 'त्रेचाळीस',
    '44': 'चव्वेचाळीस',
    '45': 'पंचेचाळीस',
    '46': 'सेहेचाळीस',
    '47': 'सत्तेचाळीस',
    '48': 'अठ्ठेचाळीस',
    '49': 'एकोणपन्नास',
    '50': 'पन्नास',
    '51': 'एक्कावन्न',
    '52': 'बावन्न',
    '53': 'त्रेपन्न',
    '54': 'चोपन्न',
    '55': 'पंचावन्न',
    '56': 'छप्पन्न',
    '57': 'सत्तावन्न',
    '58': 'अठ्ठावन्न',
    '59': 'एकोणसाठ',
    '60': 'साठ',
    '61': 'एकसष्ठ',
    '62': 'बासष्ठ',
    '63': 'त्रेसष्ठ',
    '64': 'चौसष्ठ',
    '65': 'पासष्ठ',
    '66': 'सहासष्ठ',
    '67': 'सदुसष्ठ',
    '68': 'अडुसष्ठ',
    '69': 'एकोणसत्तर',
    '70': 'सत्तर',
    '71': 'एक्काहत्तर',
    '72': 'बाहत्तर',
    '73': 'त्र्याहत्तर',
    '74': 'चौर्‍याहत्तर',
    '75': 'पंच्याहत्तर',
    '76': 'शहात्तर',
    '77': 'सत्याहत्तर',
    '78': 'अठ्ठ्याहत्तर',
    '79': 'एकोण ऐंशी',
    '80': 'ऐंशी',
    '81': 'एक्क्याऐंशी',
    '82': 'ब्याऐंशी',
    '83': 'त्र्याऐंशी',
    '84': 'चौऱ्याऐंशी',
    '85': 'पंच्याऐंशी',
    '86': 'शहाऐंशी',
    '87': 'सत्त्याऐंशी',
    '88': 'अठ्ठ्याऐंशी',
    '89': 'एकोणनव्वद',
    '90': 'नव्वद',
    '91': 'एक्क्याण्णव',
    '92': 'ब्याण्णव',
    '93': 'त्र्याण्णव',
    '94': 'चौऱ्याण्णव',
    '95': 'पंच्याण्णव',
    '96': 'शहाण्णव',
    '97': 'सत्त्याण्णव',
    '98': 'अठ्ठ्याण्णव',
    '99': 'नव्व्याण्णव'
  };
  let amountInWords = '';
  // let amountArray = amount.toString().split('.');
  // console.log(amountArray, 'amountArray');
  let splitAmount = amount.toString().split('');
  // console.log(splitAmount, 'splitAmount');
  let length = splitAmount.length;

  if (length === 1) {
    amountInWords = mapping[amount.toString()];
  }

  if (length === 2) {
    amountInWords = mapping[amount.toString()];
  }

  if (length === 3) {
    let array1 = splitAmount.splice(0, 1);

    if (splitAmount[0] === '0') {
      amountInWords = mapping[array1[0]] + 'शे ' + mapping[splitAmount[1]];
    } else {
      amountInWords = mapping[array1[0]] + 'शे ' + mapping[splitAmount.join('')];
    }
  }

  if (length === 4 || length === 5) {
    let array1 = (length === 4) ? splitAmount.splice(0, 1) : splitAmount.splice(0, 2);
    let array2 = splitAmount.splice(0, 1);

    amountInWords = (length === 4) ? (mapping[array1[0]] + ' हजार ') : (mapping[array1.join('')] + ' हजार ');

    if (array2[0] !== '0') {
      amountInWords += mapping[array2[0]] + 'शे ';
    }
    if (splitAmount[0] === '0') {
      amountInWords += mapping[splitAmount[1]];
    } else {
      amountInWords += mapping[splitAmount.join('')];
    }
  }

  if (length === 6 || length === 7) {
    let array1 = (length === 6) ? splitAmount.splice(0, 1) : splitAmount.splice(0, 2);
    let array2 = splitAmount.splice(0, 2);
    let array3 = splitAmount.splice(0, 1);

    amountInWords = (length === 6) ? (mapping[array1[0]] + ' लाख ') : (mapping[array1.join('')] + ' लाख ');

    if (array2[0] === '0' && array2[1] !== '0') {
      amountInWords += mapping[array2[1]] + ' हजार ';
    } else if (array2[0] !== '0'){
      amountInWords += mapping[array2.join('')] + ' हजार ';
    }
    if (array3[0] !== '0') {
      amountInWords += mapping[array3[0]] + 'शे ';
    }
    if (splitAmount[0] === '0') {
      amountInWords += mapping[splitAmount[1]];
    } else {
      amountInWords += mapping[splitAmount.join('')];
    }
  }

  if (length === 8 || length === 9) {
    let array1 = (length === 8) ? splitAmount.splice(0, 1) : splitAmount.splice(0, 2);
    let array2 = splitAmount.splice(0, 2);
    let array3 = splitAmount.splice(0, 2);
    let array4 = splitAmount.splice(0, 1);

    amountInWords = (length === 8) ? (mapping[array1[0]] + ' करोड ') : (mapping[array1.join('')] + ' करोड ');

    if (array2[0] === '0' && array2[1] !== '0') {
      amountInWords += mapping[array2[1]] + ' लाख ';
    } else if (array2[0] !== '0'){
      amountInWords += mapping[array2.join('')] + ' लाख ';
    }
    if (array3[0] === '0' && array3[1] !== '0') {
      amountInWords += mapping[array3[1]] + ' हजार ';
    } else if (array3[0] !== '0'){
      amountInWords += mapping[array3.join('')] + ' हजार ';
    }
    if (array4[0] !== '0') {
      amountInWords += mapping[array4[0]] + 'शे ';
    }
    if (splitAmount[0] === '0') {
      amountInWords += mapping[splitAmount[1]];
    } else {
      amountInWords += mapping[splitAmount.join('')];
    }
  }
  return amountInWords;
}

function convertArrayOfObjectsToCSV(args) {
  function isNumber (n) {
    let t;
    if (n) {t = parseFloat(n.toString().replace(/[^a-zA-Z ]/g, ""));}
    return isFinite(t) && +t === t;
  }
  let result, ctr, keys, columnDelimiter, lineDelimiter, data;
  data = args.data || null;
  if (data === null || !data.length) {
    return null;
  }
  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';
  keys = Object.keys(data[0]);
  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;
  data.forEach(item => {
    ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;
      if (isNumber(item[key]) === true) {
        result += parseFloat((item[key].toString()).replace(/[^a-zA-Z ]/g, ""));
      } else {
        result += "\"" + item[key] + "\"";
      }
      ctr++;
    });
    result += lineDelimiter;
  });
  return result;
}

export function downloadCSV(csvArray, fileName) {
  let link;
  let csv = convertArrayOfObjectsToCSV({
    data: csvArray
  });
  if (csv === null)
    return;
  if (!fileName.includes('.csv')) fileName = fileName + '.csv';
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, fileName);
  } else {
    link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection, Browsers that support HTML5 download attribute
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style = "visibility:hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

export function stripEmpty(object) {
  Object.keys(object).forEach(key => {
    if (object[key] && typeof object[key] === 'object') stripEmpty(object[key]);
    else if (object[key] === undefined || object[key] === '' || object[key] === null) delete object[key];
  });
}

export function removeEmptyObjects(object) {
  Object.keys(object).forEach(key => {
    if (object[key] && typeof object[key] === 'object' && !Object.keys(object[key]).length) {
      delete object[key];
    }
  });
}

//Modified By: Yashvi.
//Modification Date: 8 Dec 2020
//Modification: Changed passwordErrorMessageText function with all the validations.
export function passwordErrorMessageText(data, action){
  const regexCaptial = /^(.*?[A-Z])+$/;
  const regexSmall = /^(.*?[a-z])+$/;
  const regexSpCharacter = /^(.*?[#?!@$%^&*-])+$/;
  const regexNumber = /^(.*?[0-9])+$/;
  const regexLength = /^.{6,20}$/;
  const errorMsgForUppercase = ' Uppercase character';
  const errorMsgForLowercase = ' Lowercase character';
  const errorMsgForNumber = ' Number';
  const errorMsgForSpCharacter = ' Symbol';
  const errorMsgForLength = ' and password length should be at least 6 characters long';
  let passwordErrorMessage = 'Password must contain atleast one';

  let mapCompleted = false;
  let capitalTested = false;
  let smallTested = false;
  let spCharacterTested = false;
  let numberTested = false;
  let lengthTested = false;
  let string = data.split('');
  passwordErrorMessage = 'Password must contain atleast one';
  if (data.length>0){
    string.map((letter,index) => {
      if (letter.match(regexCaptial)){
        capitalTested = true;
      }
      if (letter.match(regexSmall)){
        smallTested = true;
      }
      if (letter.match(regexSpCharacter)){
        spCharacterTested = true;
      }
      if (letter.match(regexNumber)){
        numberTested = true;
      }
      if (index === string.length -1){
        mapCompleted = true;
      }
      return '';
    });
    if (data.match(regexLength)){
      lengthTested = true;
    }
    if (mapCompleted){
      if (action === 'setPassword' || action === 'resetPassword') {
        return {capitalTested, smallTested, spCharacterTested, numberTested, lengthTested};
      }

      if (action === 'changePassword') {
        if (!capitalTested){
          passwordErrorMessage = (!smallTested || !spCharacterTested || !numberTested || !lengthTested) ? passwordErrorMessage + errorMsgForUppercase +',' : passwordErrorMessage + errorMsgForUppercase;
        }
        if (!smallTested){
          passwordErrorMessage = (!spCharacterTested || !numberTested || !lengthTested) ?  passwordErrorMessage + errorMsgForLowercase + "," : passwordErrorMessage + errorMsgForLowercase;
        }
        if (!spCharacterTested){
          passwordErrorMessage = (!numberTested || !lengthTested) ?  passwordErrorMessage + errorMsgForSpCharacter + "," : passwordErrorMessage + errorMsgForSpCharacter;
        }
        if (!numberTested){
          passwordErrorMessage = (!lengthTested) ? passwordErrorMessage + errorMsgForNumber + "," : passwordErrorMessage + errorMsgForNumber;
        }
        if (!lengthTested){
          passwordErrorMessage = passwordErrorMessage + errorMsgForLength;
        }
        return passwordErrorMessage;
      }
    }
  }
  else {
    passwordErrorMessage = '';
  }
}

export function setTenantBrandColor() {
  let allElements = document.querySelectorAll('.tenant-brand-color');
  let allOpacityElements = document.querySelectorAll('.tenant-brand-color-opacity');

  if (allElements && allElements.length) {
    for (let i=0; i<=allElements.length-1; i++) {
      allElements[i].style.setProperty('--tenant-color', AppStore.get('brandColor'));
    }
  }
  if (allOpacityElements && allOpacityElements.length) {
    for (let i=0; i<=allOpacityElements.length-1; i++) {
      allOpacityElements[i].style.setProperty('--tenant-color-opacity', AppStore.get('brandColorOpacity'));
    }
  }
}

/*
Comment: check condition for titanDefAdmin role and return
Developer: Manohar
Date: 21/05/2020
*/

export function aclWisePermissionAccess(coreEntity, action) {
  let userInfo1 = userInfo;
  if (!userInfo) userInfo1 = JSON.parse(localStorage.getItem('userInfo'));
  if(userInfo1 && (userInfo1.role === 'Silo Admin')) {
    return true;
  }
  else if (userInfo1 && userInfo1.userPermission && Object.keys(userInfo1.userPermission).length > 0 && userInfo1.userPermission[coreEntity]) {
    if (userInfo1.userPermission[coreEntity].length > 0 &&  this.hasPermission(userInfo1.userPermission[coreEntity], action)) {
      return true;
    } else {
      if ((userInfo.role === 'Silo Admin') && coreEntity === 'acl') {
        return true;
      }
      return false;
    }
  } else if (userInfo1 && userInfo1.rolePermission && Object.keys(userInfo1.rolePermission).length > 0 && userInfo1.rolePermission[coreEntity]) {
    if (this.hasPermission(userInfo1.rolePermission[coreEntity], action)) {
      return true;
    } else {
      return false;
    }
  } else if (userInfo1 && userInfo1.departmentPermission && Object.keys(userInfo1.departmentPermission).length > 0 && userInfo1.departmentPermission[coreEntity]) {
    if (this.hasPermission(userInfo1.departmentPermission[coreEntity], action)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (userInfo1 && (userInfo.role === 'Silo Admin') && coreEntity === 'acl') {
      return true;
    }
    return false;
  }
}

/*
  Comment: Get Initials of DisplayName for Avatars
  Developer: Yashvi
  Date: 5 Feb 2022
*/
export function getInitials(displayName) {
  let splitDisplayName = displayName ? displayName.split(' '): '';
  let firstName = splitDisplayName[0].split('')[0].toUpperCase();
  let lastName = splitDisplayName[1] ? splitDisplayName[1].split('')[0].toUpperCase() : '';
  return firstName + lastName;
}


export function getDay(date) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[ date.getDay() ];
}
export function getMonth(date) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[ date.getMonth() ];
}
