import { useState, useEffect } from 'preact/hooks';
import { setItem, getItem } from '../../lib/myStore';
import { formatDateTime, getFormattedAmount } from '../../lib/utils';
import LinearProgress from 'preact-material-components/LinearProgress';
import { NewPopupModal, NewPopupModalBody } from '../../components/newPopupModal';
import ListSingleCard from '../../components/listSingleCard';
import moment from 'moment';

const FormWizard = (props) => {
  console.log("welllllllllll",props);
  let [isScrolledToTheBottom, setIsScrolledToTheBottom] = useState(props.isScrolledToTheBottom);
  let [cartNumber, setCartNumber] = useState(props.cartNumber);
  let [progress, setProgress] = useState(props.progress);
  let [actions, setActions] = useState(props.actions);
  let [dynamicProps, setDynamicProps] = useState(props.dynamicProps);
  let [interactionObj, setInteraction] = useState(props.interactionObj);
	let [areaList, setAreaList] = useState(props.areaList);
  let [exchangEvaluators, setExchangeEvaluators] = useState(props.exchangEvaluators);
  let [financeExecutives, setFinanceExecutives] = useState(props.financeExecutives);
  let [offers, setOffers] = useState(props.offers);
  let [schemes, setSchemes] = useState(props.schemes);
  let [lastQuotation, setLastQuotation] = useState(props.lastQuotation);
  let [selectedModel, setSelectedModel] = useState(props.selectedModel);
  let [modelMapping, setModelMapping] = useState(props.modelMapping);
  let [listofManufacturers, setListOfManufacturers] = useState(props.listofManufacturers);
  let [catalogoueItemList, setCatalogoueItemList] = useState(props.catalogoueItemList);
  let [variantList, setVariantList] = useState(props.variantList);
  let [testDriveCars, setTestDriveCars] = useState(props.testDriveCars);
  let [cartProducts, setCartProducts] = useState(props.cartProducts);
  let [assignUserList, setAssignUserList] = useState(props.assignUserList);
  let [currentAction, setCurrentAction] = useState(props.currentAction);
  let [currentRow, setCurrentRow] = useState(props.currentRow);
  let [courierData, setCourierData] = useState(props.courierData);
  let [testDriveQueue, setTestDriveQueue] = useState(props.testDriveQueue);
  let [selectedProducts, setSelectedProducts] = useState(props.selectedProducts);
  let [selectedColor, setSelectedColor] = useState(props.selectedColor);
  let [availableStock, setAvailableStock] = useState(props.availableStock);
  let [allUserList, setAllUserList] = useState(props.allUserList);
  let [isHandoverDocket, setIsHandoverDocket] = useState(props.isHandoverDocket);
  let [isEditDocket, setIsEditDocket] = useState(props.isEditDocket);
  let [courierImgDelete, setCourierImgDelete] = useState(props.courierImgDelete);
  let [selectedActionIndex, setSelectedActionIndex] = useState(props.selectedActionIndex);
  let [isBackModalDisable, setIsBackModalDisable] = useState(props.isBackModalDisable);
  let [isNextModalDisable, setIsNextModalDisable] = useState(props.isNextModalDisable);
  let [isSaveModalDisable, setIsSaveModalDisable] = useState(props.isSaveModalDisable);
  let [isFormEditable, setIsFormEditable] = useState(true);
  let [insuranceCompanies, setInsuranceCompanies] = useState([{
    displayName: "Insurance Company 1",
    uuid: "35c12118-2a2d-45ce-9435-b2a59c357e82"
  },{
    displayName: "Insurance Company 2",
    uuid: "fa098365-39a0-47fd-befd-9a31abf2b7fc"
  }]);
  // saveFormInputRadioDefault={(e) => saveFormInputRadioDefault}
  // checkAction={(e) => checkAction(e)}
  // DownloadProformaInvoice={(e) => DownloadProformaInvoice(e)}
  // toggleProformaFormPopover={(e) => toggleProformaFormPopover(e)}
  // toggleFormPopover={(e) => toggleFormPopover(e)}
  // scrollToTheBottom={(e) => scrollToTheBottom(e)}
  // setIsScrolledToTheBottom={(e) => setIsScrolledToTheBottom(e)}
  // setIsSaveModalDisable={(e) => setIsSaveModalDisable(e)}
  // setIsNextModalDisable={(e) => setIsNextModalDisable(e)}
  // setIsBackModalDisable={(e) => setIsBackModalDisable(e)}
  // submitFormNew={(e) => submitFormNew(e)}
  // setFormValueInput={(e) => setFormValueInput(e)}
  // saveFormInput={(e) => saveFormInput(e)}
  // inputClicked={(e) => inputClicked(e)}
  // deleteUploadedFile={(e) => deleteUploadedFile(e)}
  // saveFormInputCheckbox={(e) => saveFormInputCheckbox(e)}
  // saveAreaFromForm={(e) => saveAreaFromForm(e)}
  // uploadFile={(e) => uploadFile(e)}
  // viewAllImages={(e) => viewAllImages(e)}
  // dynamicButtonClicked={(e) => dynamicButtonClicked(e)}
  // setSelectedMake={(e) => setSelectedMake(e)}
  // saveSelectedVariant={(e) => saveSelectedVariant(e)}
  // saveSelectedTestDriveModel={(e) => saveSelectedTestDriveModel(e)}
  // saveSelectedTestDriveVariant={(e) => saveSelectedTestDriveVariant(e)}
  // saveSelectedTestDriveCar={(e) => saveSelectedTestDriveCar(e)}
  // getSelectedTypeUserList={(e) => getSelectedTypeUserList(e)}
  // submitFormOnStep={(e) => submitFormOnStep(e)}
  useEffect(async() => {
    setIsScrolledToTheBottom(props.isScrolledToTheBottom);
    setCartNumber(props.cartNumber);
    setProgress(props.progress);
    setActions(props.actions);
    setDynamicProps(props.dynamicProps);
    setInteraction(props.interactionObj);
    setAreaList(props.areaList);
    setExchangeEvaluators(props.exchangEvaluators);
    setFinanceExecutives(props.financeExecutives);
    setOffers(props.offers);
    setSchemes(props.schemes);
    setLastQuotation(props.lastQuotation);
    setSelectedModel(props.selectedModel);
    setModelMapping(props.modelMapping);
    setListOfManufacturers(props.listofManufacturers);
    setCatalogoueItemList(props.catalogoueItemList);
    setVariantList(props.variantList);
    setTestDriveCars(props.testDriveCars);
    setCartProducts(props.cartProducts);
    setAssignUserList(props.assignUserList);
    setCurrentAction(props.currentAction);
    setCurrentRow(props.currentRow);
    setCourierData(props.courierData);
    setTestDriveQueue(props.testDriveQueue);
    setSelectedProducts(props.selectedProducts);
    setSelectedColor(props.selectedColor);
    setAvailableStock(props.availableStock);
    setAllUserList(props.allUserList);
    setIsHandoverDocket(props.isHandoverDocket);
    setIsEditDocket(props.isEditDocket);
    setCourierImgDelete(props.courierImgDelete);
    setSelectedActionIndex(props.selectedActionIndex);
    setIsBackModalDisable(props.isBackModalDisable);
    setIsNextModalDisable(props.isNextModalDisable);
    setIsSaveModalDisable(props.isSaveModalDisable);
    console.log('updateeeeeeeeeeee', props);
  }, [props]);

  useEffect(async() => {
    let element = await document.getElementById("formModalContainer");
    if (element && (element.offsetHeight + element.scrollTop < element.scrollHeight)) {
      //element.style.boxShadow = "inset 3px -14px 11px -10px rgb(0 0 0 / 20%)";
      await props.setIsScrolledToTheBottom(false);
    }
    async function checkScrolledBottom () {
      if(element.offsetHeight + element.scrollTop >= element.scrollHeight) {
        await props.setIsScrolledToTheBottom(true)
        await props.setIsSaveModalDisable(false)
        await props.setIsNextModalDisable(false)
        await props.setIsBackModalDisable(false)
        element.style.boxShadow = "none";
     } else {
       await props.setIsScrolledToTheBottom(false)
       //element.style.boxShadow = "inset 3px -14px 11px -10px rgb(0 0 0 / 20%)";
     }
    }
    element.addEventListener("scroll",checkScrolledBottom);

    return () => {
        element.removeEventListener("scroll", checkScrolledBottom);
    }
  },[props.currentAction])


function stepClick(index) {
  console.log(index,'index', selectedActionIndex,'selectedActionIndex');
  if (index > selectedActionIndex) {
    console.log('next');
    props.setSelectedActionIndex(index)
    props.setCurrentAction(actions[index])
    props.checkAction(actions[index],index - 1, 'next' )
  }
  if (index < selectedActionIndex) {
    console.log('back');
    props.setSelectedActionIndex(index)
    props.setCurrentAction(actions[index])
    props.checkAction(actions[index],index - 1, 'back' )
  }
}

  return (
    <NewPopupModal classes="formModal" modalWidth={"65%"} modalDisplay={('show-formPopover')} onClose={(e) => props.toggleFormPopover(e)}>
      <div class="enquiryForm background-transparent">
        <div class="row p-t-10 p-l-30 p-r-30 p-b-10" style="background:#f7f7f7;border-bottom:1px solid lightgrey">
          <div class="col-xs-9 col-sm-10">
            <span class="formHeader display-flex">
              <h4 class="m-t-5 m-b-0">{currentRow && currentRow.displayName} </h4>
              {/*currentRow && currentRow.caseID && (
                <h4 class="m-t-5 m-b-0"> | {currentRow.caseID}</h4>
              )*/}
            </span>
            {
              currentRow && currentRow.caseID && (
                <div class="display-flex align flex-direction-column">
                  <p class="fs-12">{currentRow.caseID} </p>
                </div>
              )
            }
            {/*
              currentRow && currentRow.description && (
                <div class="display-flex align flex-direction-column">
                  <p class="fs-12">{currentRow.description} </p>
                </div>
              )
            */}
            {
              currentAction && currentAction.name === "product selection" && (
                <div class="display-flex flex-direction-column">
                  <span class="pos-absolute" style="right: 0px;top: 0px;">
                    <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 0 24 24" width="70px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                  </span>
                  <p style="right: 3px;top: 5px;z-index: 1;" class="pos-absolute datecircletemp">{cartNumber}</p>
                </div>
              )
            }
          </div>
          <div class="col-xs-3 col-sm-2 display-flex justify-flex-end align-center p-r-2">
            <button onClick={(e) => props.submitFormNew(e)} class="primary-button m-l-10" disabled={isSaveModalDisable}>Mark Complete</button>
          </div>
        </div>
        <div>
          {/*<LinearProgress progress={progress} barcolor="#63e0f3" />*/}
          <form>
            <ul class="stepper parallel horizontal" style='margin:0 !important'>
            {actions && actions.map((action, actionIndex) => (
              <li className={`step ${actionIndex === selectedActionIndex ? "active" : ""}`} onClick={(e) => {
                stepClick(actionIndex)
              }}>
                <div class="step-title waves-effect waves-dark">{action.displayName}</div>
              </li>
              ))}
            </ul>
          </form>
        </div>
        <div id="formModalContainer" class="formModalContainer">
        {
          ((actions.length === 1 && !actions[0].displayName && actions[0]['dynamicProps'].length === 0) || actions.length === 0) && (
            <div class="w-full">
              {
                isFormEditable && dynamicProps && dynamicProps.length !== 0 && dynamicProps.map((dynamicProp, propIndex) => (
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-t-15">
                    <div >
                      {
                        dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.formType !== "radio" && dynamicProp.formType !== "checkbox" && !dynamicProp.dependentProp && (
                          <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" || dynamicProp.formType === "checkbox") && !dynamicProp.dependentProp && (
                          <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                        )
                      }
                      {
                        ((dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && !dynamicProp.dependentProp) && (
                          <input class="first-letter-capital" disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => props.inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)} onFocusout={(e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }

                      {
                        dynamicProp.name === "licenseNumber" && (
                          <div>
                            <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                            <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => props.inputClicked(e)} maxlength="15" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj['dynamicProperties_'+dynamicProp.name]} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)} />
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "date" || dynamicProp.formType === "time") && !dynamicProp.dependentProp && (
                          <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class="w-30" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name] || moment(new Date()).format('YYYY-MM-DD')} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)} onFocusout={(e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }
                      {
                        (dynamicProp.formType === "file") && (!dynamicProp.dependentProp && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA"))) && (
                             <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => props.uploadFile(e, dynamicProp.name)} />
                        )
                      }
                      {
                        dynamicProp.formType === "file" && !dynamicProp.dependentProp && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && (
                          <div class="uploaded-image">
                            <img id={`image-0-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,0)}/>
                            <p class="delete-file-icon" title="Delete file" onClick={(e) => props.deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && !dynamicProp.dependentProp && (
                          <div class="display-flex p-r-10 align-center">
                            <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-yes`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "yes" ? true : false} value="yes" onChange={(e) => props.saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-yes`}>Yes </label>
                            <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-no`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "no" ? true : false} value="no" onChange={(e) => props.saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-no`}>No </label>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
                          <div class="display-flex align-center">
                            {
                              dynamicProp.enum.map((enumVal) => (
                                <div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => props.saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-${enumVal}`}>{enumVal}</label></div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "checkbox" && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
                          <div class="formCheckbox display-flex">
                            {
                              dynamicProp.enum.map((enumVal) => (
                                <div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} defaultChecked={interactionObj["dynamicProperties_"+dynamicProp.name] ? interactionObj["dynamicProperties_"+dynamicProp.name].split(",").includes(enumVal) : ""} onChange={(e) =>  props.saveFormInputCheckbox(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>{enumVal}</label></div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        ((dynamicProp.name === "area" || dynamicProp.name === "companyArea") && (!dynamicProp.dependentEnum || dynamicProp.dependentEnum.length === 0) && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={(e) =>  props.saveAreaFromForm(e, dynamicProp.name)} >
                              {
                                areaList.map((enumVal) => (
                                  <option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal.officeName} value={enumVal.officeName}>{enumVal.officeName}</option>
                                ))
                              }
                            </select>
                          </div>
                        )
                      }
                      {
                        ((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser")  && dynamicProp.formType === "select" && (dynamicProp.dependentProp && dynamicProp.dependentPropValue) && (dynamicProp.enum && dynamicProp.enum.length !== 0)) &&(interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <div>
                            <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
                            <div class="display-flex">
                              <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={ (e) => props.saveFormInput(e, dynamicProp.name, "select", 0)} >
                                <option value=''>Select {dynamicProp.displayName}</option>
                                {
                                  dynamicProp.enum.map((enumVal) => (
                                    <option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                        )
                      }
                      {
                        ((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser")  && dynamicProp.formType === "select" && (!dynamicProp.dependentEnum || dynamicProp.dependentEnum.length === 0) && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
                          <div>
                            <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
                            <div class="display-flex">
                              <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={ (e) => props.saveFormInput(e, dynamicProp.name, "select", 0)} >
                                <option value=''>Select {dynamicProp.displayName}</option>
                                {
                                  dynamicProp.enum.map((enumVal) => (
                                    <option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                        )
                      }
                      {
                        ((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser")  && dynamicProp.formType === "select" && (dynamicProp.dependentEnum && dynamicProp.dependentEnum.length !== 0) && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && (dynamicProp.dependentEnum.findIndex((d) => d.isSelected) > -1) && !dynamicProp.dependentProp && (
                          <div>
                            <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
                            <div class="display-flex">
                              <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={ (e) => props.saveFormInput(e, dynamicProp.name)} >
                                <option value=''>Select {dynamicProp.displayName}</option>
                                {
                                  dynamicProp.dependentEnum[dynamicProp.dependentEnum.findIndex((d) => d.isSelected)].dependentEnums.map((enumVal) => (
                                    <option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                        )
                      }
                      {
                        dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}<span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                        )
                      }
                      {
                        dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.dependentProp && !dynamicProp.dependentPropValue && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
                          <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}<span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                        )
                      }
                      {
                        dynamicProp.formType === "file" && dynamicProp.dependentProp  && dynamicProp.dependentPropValue && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA")) && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <input required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} onChange={(e) => props.uploadFile(e, dynamicProp.name)} />
                        )
                      }

                      {
                        dynamicProp.formType === "file" && dynamicProp.dependentProp  && dynamicProp.dependentPropValue && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <div class="uploaded-image">
                            <img id={`image-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
                            <p class="delete-file-icon" title="Delete file" onClick={(e) => props.deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
                          </div>
                        )
                      }
                      {
                        dynamicProp.formType === "file" && dynamicProp.dependentProp  && !dynamicProp.dependentPropValue && ((interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA") || !interactionObj['dynamicProperties_'+dynamicProp.name]) && ((dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp]))) && (
                          <input required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} onChange={(e) => props.uploadFile(e, dynamicProp.name)} />
                        )
                      }

                      {
                        dynamicProp.formType === "file" && dynamicProp.dependentProp  && !dynamicProp.dependentPropValue && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && ((dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp]))) && (
                          <div class="uploaded-image">
                            <img id={`image-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
                            <p class="delete-file-icon" title="Delete file" onClick={(e) => props.deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => props.inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)}  onFocusout={ (e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }
                      {
                        (dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && dynamicProp.dependentPropValues && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
                          <input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => props.inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)}  onFocusout={ (e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }
                      {
                        (dynamicProp.formType === "date" || dynamicProp.formType === "time") && dynamicProp.dependentProp && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <input class="w-30" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name] || moment(new Date()).format('YYYY-MM-DD')} onChange={ (e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && dynamicProp.dependentProp && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <div class="display-flex p-r-10 align-center">
                            <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-yes`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "yes" ? true : false} value="yes" onChange={(e) => props.saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-yes`}>Yes </label>
                            <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-no`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "no" ? true : false} value="no" onChange={(e) => props.saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-no`}>No </label>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (dynamicProp.enum || dynamicProp.enum.length !== 0)) && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <div class="display-flex formRadioButtons">
                            {
                              dynamicProp.enum.map((enumVal) => (
                                <div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => props.saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-${enumVal}`}>{enumVal}</label></div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (dynamicProp.enum || dynamicProp.enum.length !== 0)) && dynamicProp.dependentProp && dynamicProp.dependentPropValues && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
                          <div class="display-flex formRadioButtons">
                            {
                              dynamicProp.enum.map((enumVal) => (
                                <div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => props.saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>{enumVal}</label></div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "interestedModel" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            {/*<select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={model} onChange={e => {
                                    props.getVariantForSelectedModel(e.target.value)
                                    setModel(e.target.value)
                                    saveFormInput(e, dynamicProp.name)
                                    }
                                    }>
                                    <option style="text-transform:capitalize" value="" selected>Select Model</option>
                                    {catalogoueItemList.map((item)=>(
                                      <option style="text-transform:capitalize;" value={item.uuid}>{item.displayName}</option>
                                    ))}
                                    </select>
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 m-0" >
                                      <div class="row">
                                          <div class="col-xs-12 p-l-0">
                                            <p class="fs-15 p-b-3">{dynamicProp.displayName}</p>
                                          </div>
                                      </div>
                                  </div>*/}
                          </div>
                        )
                      }
                      {/*
                              (dynamicProp.name === "interestedModel" && dynamicProp.formType === "select") && model && variantList && (
                                <div class="display-flex">
                                  <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id='variant' value={variant} onChange={e => {
                                    props.getVariantDetails(e.target.value)
                                    setVariant(e.target.value)
                                    saveFormInput(e, dynamicProp.name)
                                  }}>
                                    <option value="" selected>Select Variant</option>
                                    {
                                      variantList.map((variant)=>(
                                        <option style="text-transform:capitalize" value={variant.uuid}>{variant.variant}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              )
                            */}
                      {
                        (dynamicProp.name === "exchangeEvaluator" && dynamicProp.formType === "select") && (
                          <div class="display-block">
                            <p class="fs-15 formLabel">Exchange Evaluator</p>
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_exchangeEvaluator']} onChange={e => {
                              props.saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Exchange Evaluator<span class="star-mandatory-entry p-l-2"></span></option>
                              {exchangEvaluators.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.userID} value={item.userID}>{item.userName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedScheme" && dynamicProp.formType === "select") && (
                          <div class="display-block">
                            <p class="formLabel fs-15 first-letter-capital">{dynamicProp.displayName + " "  }</p>
                            {
                              schemes.map((scheme, index) => (
                                <div class="display-flex">
                                  <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} type="checkbox" value={scheme.uuid} defaultChecked={interactionObj["dynamicProperties_"+dynamicProp.name] === scheme.uuid} default={interactionObj["dynamicProperties_" + dynamicProp.name]} disabled={(scheme.displayName.includes("Exchange") && interactionObj["dynamicProperties_typeOfBuyer"] !== "Exchange Buyer")} onChange={(e) => props.saveFormInputRadio(e, dynamicProp.name, scheme.uuid, index)} />
                                  <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>{scheme.displayName + " - " + getFormattedAmount(scheme.discountAfterGST)  }</label>
                                </div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedOffer" && dynamicProp.formType === "select") && (
                          <div class="display-block">
                            <p class="formLabel fs-15">Dealer Offer</p>
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_selectedOffer']} onChange={e => {
                              props.saveFormInput(e, dynamicProp.name);
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Offer</option>
                              {offers.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.uuid} value={item.uuid}>{item.displayName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "manufacturer" && dynamicProp.formType === "select") && (
                          <div>
                            <p class="formLabel fs-15">Select Manufacturer</p>

                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_manufacturer']} onChange={e => {
                              props.setSelectedMake(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Manufacturer</option>
                              {listofManufacturers.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_manufacturer'] === item} value={item}>{item}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "otherCars" && dynamicProp.formType === "select") && (
                          <div>
                            <p class="formLabel fs-15">{dynamicProp.displayName}</p>
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_otherCars']} onChange={e => {
                              // setSelectedMake(e)
                              props.saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Manufacturer</option>
                              {listofManufacturers.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_otherCars'] === item} value={item}>{item}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {/*
                        (dynamicProp.name === "exchangeCarModel" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_exchangeCarModel']} onChange={e => {
                              props.setSelectedExchangeModel(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Model</option>
                              {listOfModels && listOfModels.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_exchangeCarModel'] === item.Model + " - " + item.Category + " - " + item.Year} value={item.Model + " - " + item.Category + " - " + item.Year}>{item.Model + " - " + item.Category + " - " + item.Year}</option>
                              ))}
                            </select>
                          </div>
                        )
                      */}

                      {
                        (dynamicProp.name === "selectedModel" && (!dynamicProp.dependentProp || (dynamicProp.dependentProp && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue))) && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
                              props.saveSelectedModel(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Model</option>
                              {catalogoueItemList.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedModel'] === item.uuid} value={item.uuid}>{modelMapping[item.displayName.toLowerCase()]}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedVariant" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
                              props.saveSelectedVariant(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Variant</option>
                              {variantList.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedVariant'] === item.uuid} value={item.uuid}>{item.variant}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedTestDriveModel"  && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
                              props.saveSelectedTestDriveModel(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Model</option>
                              {catalogoueItemList.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={(interactionObj['dynamicProperties_selectedModel'] === item.uuid) || (interactionObj['dynamicProperties_selectedTestDriveModel'] === item.uuid)} value={item.uuid}>{modelMapping[item.displayName.toLowerCase()]}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedTestDriveVariant" && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
                              props.saveSelectedTestDriveVariant(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Variant</option>
                              {variantList.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedTestDriveVariant'] === item.uuid} value={item.uuid}>{item.variant}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedTestDriveCarID" && (interactionObj["dynamicProperties_typeOfTestDriveCar"] === "Test Drive Car") && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj["dynamicProperties_selectedTestDriveCarID"]} onChange={e => {
                              props.saveSelectedTestDriveCar(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Car</option>
                              {testDriveCars.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" value={item.uuid}>{item.variant + " - " + item.registrationNumber}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "testDriveApprovalRole" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <p class="formLabel fs-15 p-b-3"> Select Responsible Role</p>
                            <select class="text-4b4d51 background-white border-none" type="text" id="employee2" value={interactionObj['dynamicProperties_testDriveApprovalRole']} onChange={e => {
                              props.getSelectedTypeUserList(e.target.value)
                            }}
                            style="text-shadow:none"
                            >
                              <option selected value=''>{'Select Responsible Role'}</option>
                              <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'BRANCH MANAGER'} value={'BRANCH MANAGER'}>{'Branch Manager'}</option>
                              <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'SALES MANAGER'} value={'SALES MANAGER'}>{'Sales Manager'}</option>
                              <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'ASST.SALES MANAGER'} value={'ASST.SALES MANAGER'}>{'Sales Assistant Manager'}</option>
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "testDriveAssignedUser" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <p class="formLabel fs-15 p-b-3"> Select Responsible Person</p>
                            <select type="text" id="employee" class="m-t-10  first-letter-capital background-white border-none text-4b4d51" onChange={(e => props.saveFormInput(e, dynamicProp.name, "select", index))} style="text-shadow:none">
                              <option class="first-letter-capital" value='' selected>{`Select ${interactionObj['dynamicProperties_testDriveApprovalRole']}`}</option>
                              { assignUserList.map((user) => (
                                <option selected={interactionObj['dynamicProperties_testDriveAssignedUser'] === user.userID } value={user.userID}>{user.userName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        ((dynamicProp.name === "insuranceCompanyID") && dynamicProp.formType === "select") && (
                          <div class="display-block">
                            <p class="formLabel fs-15">{dynamicProp.displayName}</p>
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj[dynamicProp.name]} onChange={e => {
                              props.saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Insurance Company</option>
                              {insuranceCompanies.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.userID} value={item.userID}>{item.userName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        selectedModel && currentAction.name === "product selection" && (
                          variantList && variantList.map((item, index) => (
                            <div class="listCard fadeAnimationText m-b-5" >
                              <div class='p-l-10 p-r-10 p-t-10 p-b-10 msgContainer cursor-pointer animatedHover'>
                                <div class='row'>
                                  <div class='col-xs-12 col-lg-5'>
                                    <div class='display-flex m-all'>
                                      <div>
                                        <p style='text-transform: capitalize;font-size:15px;'>{item.variant}</p>
                                      </div>
                                      <div>

                                      </div>
                                    </div>
                                    {
                                      <div class="fp-b-10 flex-w">
                                        {item.colors && item.colors.map((color) => (
                                          <span title={color.split("-").join(" ")} class='p-r-10 cursor-pointer inline-block' onClick={e => props.setSelectedProductColor(e, item, color)} >
                                            <div id={item.uuid + "-" + color} style="border:none;height:34px;">
                                              {/*<img src={`https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}/Color/${color}.jpg`} width='30' height='30' />*/}
                                                <img class="border-grey" src={`https://api.hyundai.co.in/service/download/colors/${color}.jpg`} width='30' height='30' />
                                            </div>
                                          </span>
                                        ))}
                                      </div>
                                    }
                                  </div>
                                  <div class='col-xs-5 col-lg-3'>
                                    <div class=" p-b-10 m-all" >
                                      {
                                        ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1) && (selectedProducts[selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor))]['quantity'] === 0 || !selectedProducts[selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor))]['quantity'])) && (
                                          <div >
                                            {
                                              ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
                                                <span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>{selectedDisplayColor.split('-').join(' ')}</span>

                                              )
                                            }
                                            {
                                              ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
                                                <span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>Available Cars: <span style="font-size: 15px;color:#2a457e;font-weight:600">{availableStock}</span></span>
                                              )
                                            }
                                            <button class="cart-add-btn" onClick={(e) => addQuantity(e, item, index)
                                            }>Add</button>
                                          </div>
                                        )
                                      }
                                      {
                                        (selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor) > -1 && selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)]['quantity'] > 0) && (
                                          <div >
                                            {
                                              ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
                                                <span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>{selectedDisplayColor.split('-').join(' ')}</span>
                                              )
                                            }
                                            {
                                              ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
                                                <span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>Available Cars: <span style="font-size: 15px;color:#2a457e;font-weight:600">{availableStock}</span></span>
                                              )
                                            }
                                            <div class="qty-input">
                                              <button class="qty-count qty-count--minus m-r-5" style="color:grey" id={'qty-count--minus' + index} type="button" onclick={(e) => removeQuantity(e, item, index)}>-</button>
                                              <input class="product-qty" type="number" style="color:green" name="product-qty" id={'product-qty' + index} min="0" max="10000" value={selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)]['quantity'] : 0} onChange={(e) => updateQuantity(e, item)} />
                                              <button class="qty-count qty-count--add m-l-5" style="color:green" id={'qty-count--add' + index} type="button" onclick={(e) => addQuantity(e, item, index)}>+</button>
                                            </div>
                                          </div>
                                        )
                                      }

                                    </div>
                                  </div>
                                  <div class='col-xs-7 col-lg-4'>
                                    <div class=" p-b-10 m-all" >
                                      <span class='display-flex p-r-10 align-center'>
                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForAccessories'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForAccessories'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedForAccessories")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Accessories</label>
                                      </span>
                                      <span class='display-flex p-r-10 align-center'>
                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForRsa'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForRsa'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedForRsa")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>RSA</label>
                                      </span>
                                      <span class='display-flex p-r-10 align-center'>

                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedFor3M'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedFor3M'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedFor3M")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>3M</label>
                                      </span>
                                      <span class='display-flex p-r-10 align-center'>

                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForSheildOfTrust'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForSheildOfTrust'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedForSheildOfTrust")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Shield of Trust Warranty</label>
                                      </span>
                                      <span class='display-flex p-r-10 align-center'>

                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForExtendedWarranty'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForExtendedWarranty'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedForExtendedWarranty")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Extended Warranty</label>
                                      </span>
                                    </div>


                                    {/*
                                            selectedProducts.findIndex(d => d.productID === item.uuid) > -1 && selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid)]['quantity'] > 0 && (
                                              <div class='display-flex m-t-5' style='float: right'>
                                                <button class="primary-button" onclick={(e) => removeQuantity(e, item, index)}>Remove</button>
                                              </div>
                                            )
                                            */}

                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )
                      }
                      {
                        (currentAction.displayName === "Need Assessment" && (propIndex === action.dynamicProps.length - 1)) && (
                          <div class="display-block">
                            <p class="formLabel fs-15">Finance Manager<span class="star-mandatory-entry p-l-2"></span></p>
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_financeExecutive']} onChange={e => {
                              props.saveFormInput(e, "financeExecutive")
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Finance Manager</option>
                              {financeExecutives.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_financeExecutive"] === item.userID} value={item.userID}>{item.userName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      <span id={`error-`+dynamicProp.name} class="text-color-red fs-10" style="display:none;">Please enter {dynamicProp.displayName}</span>
                    </div>
                  </div>
                ))
              }
              {
                currentRow && currentRow.buttons && currentRow.buttons.length !== 0 && currentRow.buttons.map((button) => (
                  <button id={button} class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => props.dynamicButtonClicked(e, button)}>{button}</button>
                ))
              }
              {
                currentRow.containerType === 'Form and Approval' && (currentRow.displayName !== "Handover Courier") && (currentRow.displayName !== "Close Visit") && (
                  <div class="taskDetailsSection" style="overflow-y:auto">
                    <button id="approve-button" class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => props.dynamicButtonClicked(e, "Approve")}>Approve</button>
                    {/*!currentRow.quorum || currentRow.quorum === 1 && <button class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => props.dynamicButtonClicked(e, "Submit")}>Submit for Approval {currentRow.quorum}</button>*/}
                    <button id="reject-button" class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => props.dynamicButtonClicked(e, "Reject")}>Reject</button>
                  </div>
                )
              }

            </div>
          )
        }
        {
          currentAction.name !== "summary" && (actions && actions.length > 0) && [actions[selectedActionIndex]].map((action, index) => (
            <div class="row">
              {
                !isFormEditable && action.dynamicPropsData && Object.keys(action.dynamicPropsData).map((key) => (
                  <div class="col-xs-12 col-sm-6">
                    <ListSingleCard typeOfCard={'formCard'} group={key} groupProps={action.dynamicPropsData[key]} interactionObj={interactionObj} />
                  </div>
                ))
              }
              { /*<p style="color:#7a7a7a; width: 100%;">{action.displayName}</p> */}
              {
                isFormEditable && action.displayName === 'Discount Adjustment' && (
                  <div class="row" style="width:100%">
                  <div className={`col-xs-12 m-t-15 ${action.displayName === 'Discount Adjustment' ? 'col-sm-6 col-md-6 col-lg-6' : 'col-sm-12 col-md-12 col-lg-12'}`}>
                    <p>Discount Amount: <span style='margin-left: 10px; font-weight:600'> { interactionObj['dynamicProperties_discount'] ? getFormattedAmount(interactionObj['dynamicProperties_discount']) : '₹ 0' }</span></p>
                  </div>
                  <div className={`col-xs-12 m-t-15 ${action.displayName === 'Discount Adjustment' ? 'col-sm-6 col-md-6 col-lg-6' : 'col-sm-12 col-md-12 col-lg-12'}`}>
                    <p>Discount to Adjust Amount: <span style='margin-left: 10px; font-weight:600'> { interactionObj['dynamicProperties_discountToBeAdjusted'] ? getFormattedAmount(interactionObj['dynamicProperties_discountToBeAdjusted']) : interactionObj['dynamicProperties_discount'] ? getFormattedAmount(interactionObj['dynamicProperties_discount']) : '₹ 0' }</span></p>
                  </div>
                  </div>
                )
              }
              {

                isFormEditable && action.dynamicProps && action.dynamicProps.length !== 0 && action.dynamicProps.map((dynamicProp, propIndex) => (
                  <div className={`col-xs-12 m-t-15 ${action.displayName === 'Discount Adjustment' ? 'col-sm-6 col-md-6 col-lg-6' : 'col-sm-12 col-md-12 col-lg-12'}`}>
                    <div>
                      {
                        dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.formType !== "radio" && dynamicProp.formType !== "checkbox" && !dynamicProp.dependentProp && (
                          <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" || dynamicProp.formType === "checkbox") && !dynamicProp.dependentProp && (
                          <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                        )
                      }
                      {
                        ((dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && !dynamicProp.dependentProp) && (
                          <input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => props.inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)} onFocusout={ (e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }

                      {
                        dynamicProp.name === "licenseNumber" && (
                          <div>
                            <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName} <span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                            <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => props.inputClicked(e)} maxlength="15" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj['dynamicProperties_'+dynamicProp.name]} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)} />
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "date" || dynamicProp.formType === "time") && !dynamicProp.dependentProp && (
                          <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} className={`${action.displayName === 'Discount Adjustment' ? '' : 'w-30'}`} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name] || moment(new Date()).format('YYYY-MM-DD')} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)} onFocusout={ (e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }
                      {
                        (dynamicProp.formType === "file") && (!dynamicProp.dependentProp && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA"))) && (
                             <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => props.uploadFile(e, dynamicProp.name)} />
                        )
                      }
                      {
                        dynamicProp.formType === "file" && !dynamicProp.dependentProp && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && (
                          <div class="uploaded-image">
                            <img id={`image-${index}-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
                            <p class="delete-file-icon" title="Delete file" onClick={(e) => props.deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && !dynamicProp.dependentProp && (
                          <div class="display-flex formRadioButtons">
                            <div class="display-flex p-r-10 align-center">
                              <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? true : false} name={dynamicProp.name} id={`${dynamicProp.name}-yes`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "yes" ? true : false} value="yes" onChange={(e) => props.saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-yes`}>Yes</label>
                              <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? true : false} name={dynamicProp.name} id={`${dynamicProp.name}-no`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "no" ? true : false} value="no" onChange={(e) => props.saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-no`}>No </label>
                            </div>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
                          <div class="display-flex formRadioButtons">
                            {
                              dynamicProp.enum.map((enumVal) => (
                                <div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => props.saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-${enumVal}`}>{enumVal}</label></div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "checkbox" && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
                          <div class="formCheckbox display-flex">
                            {
                              dynamicProp.enum.map((enumVal) => (
                                <div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} defaultChecked={interactionObj["dynamicProperties_"+dynamicProp.name] ? interactionObj["dynamicProperties_"+dynamicProp.name].split(",").includes(enumVal) : ""} onChange={(e) =>  props.saveFormInputCheckbox(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>{enumVal}</label></div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        ((dynamicProp.name === "area" || dynamicProp.name === "companyArea") && (!dynamicProp.dependentEnum || dynamicProp.dependentEnum.length === 0) && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={(e) =>  props.saveAreaFromForm(e,dynamicProp.name)} >
                              {
                                areaList.map((enumVal) => (
                                  <option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal.officeName} value={enumVal.officeName}>{enumVal.officeName}</option>
                                ))
                              }
                            </select>
                          </div>
                        )
                      }
                      {
                        ((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser")  && dynamicProp.formType === "select" && (!dynamicProp.dependentEnum || dynamicProp.dependentEnum.length === 0) && (dynamicProp.enum && dynamicProp.enum.length !== 0)) && !dynamicProp.dependentProp && (
                          <div>
                            <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
                            <div class="display-flex">
                              <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={ (e) => props.saveFormInput(e, dynamicProp.name, "select", index)} >
                                <option value=''>Select {dynamicProp.displayName}</option>
                                {
                                  dynamicProp.enum.map((enumVal) => (
                                    <option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                        )
                      }
                      {
                        ((dynamicProp.name !== "interestedModel" && dynamicProp.name !== "testDriveApprovalRole" && dynamicProp.name !== "testDriveAssignedUser") && dynamicProp.formType === "select" && (dynamicProp.dependentEnum && dynamicProp.dependentEnum.length !== 0) && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && (dynamicProp.dependentEnum.findIndex((d) => d.isSelected) > -1) && !dynamicProp.dependentProp && (
                          <div>
                            <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
                            <div class="display-flex">
                              <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' type="text" id={`field-${dynamicProp.name}`} onChange={ (e) => props.saveFormInput(e, dynamicProp.name)} >
                                <option value=''>Select {dynamicProp.displayName}</option>
                                {
                                  dynamicProp.dependentEnum[dynamicProp.dependentEnum.findIndex((d) => d.isSelected)].dependentEnums.map((enumVal) => (
                                    <option selected={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={enumVal}>{enumVal}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                        )
                      }
                      {
                        dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.dependentProp && dynamicProp.dependentPropValue && dynamicProp.dependentPropValue !== "NA" && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}<span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                        )
                      }
                      {
                        dynamicProp.formType !== "select" && (dynamicProp.name !== "licenseNumber") && dynamicProp.dependentProp && !dynamicProp.dependentPropValue && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
                          <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}<span class="star-mandatory-entry p-l-2">{dynamicProp.isRequired ? "*" : ""}</span></p>
                        )
                      }
                      {
                        dynamicProp.formType === "file" && dynamicProp.dependentProp  && dynamicProp.dependentPropValue && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA")) && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} onChange={(e) => props.uploadFile(e, dynamicProp.name)} />
                        )
                      }


                      {
                        dynamicProp.formType === "file" && dynamicProp.dependentProp  && dynamicProp.dependentPropValue && (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA") && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <div class="uploaded-image">
                            <img id={`image-${index}-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
                            <p class="delete-file-icon" title="Delete file" onClick={(e) => props.deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
                          </div>
                        )
                      }
                      {
                        dynamicProp.formType === "file" && dynamicProp.dependentProp  && !dynamicProp.dependentPropValue && (!interactionObj['dynamicProperties_'+dynamicProp.name] || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name] === "NA") || (interactionObj['dynamicProperties_'+dynamicProp.name] && interactionObj['dynamicProperties_'+dynamicProp.name].length === 0)) && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp]) && (
                          <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} onChange={(e) => props.uploadFile(e, dynamicProp.name)} />
                        )
                      }
                      {
                        dynamicProp.formType === "file" && dynamicProp.dependentProp  && !dynamicProp.dependentPropValue && (interactionObj['dynamicProperties_'+dynamicProp.name] && (interactionObj['dynamicProperties_'+dynamicProp.name] !== "NA" && interactionObj['dynamicProperties_'+dynamicProp.name].length !== 0)) && (
                          <div class="uploaded-image">
                            <img id={`image-${index}-${propIndex}`} class="cursor-pointer object-fit-contain w-half" src={dynamicProp.signedUrl} width="100" height="100" onClick={(e)=> viewAllImages(e, propIndex,index)}/>
                            <p class="delete-file-icon" title="Delete file" onClick={(e) => props.deleteUploadedFile(e, dynamicProp.name)}>{'x'}</p>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => props.inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)}  onFocusout={ (e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }
                      {
                        (dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && dynamicProp.dependentPropValues && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
                          <input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => props.inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)}  onFocusout={ (e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }
                      {
                        (dynamicProp.name !== "licenseNumber") && (dynamicProp.formType === "text" || dynamicProp.formType === "number" || dynamicProp.formType === "month") && dynamicProp.dependentProp && !dynamicProp.dependentPropValue && dynamicProp.dependentPropValues && interactionObj["dynamicProperties_" + dynamicProp.dependentProp] && (
                          (interactionObj["dynamicProperties_" + dynamicProp.dependentProp].indexOf(dynamicProp.dependentPropValues.toString()) > -1)
                          || (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp].substring(1)))
                          || (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp].split(',')[1]))
                          ) && (
                          <div>
                            <p class="formLabel fs-15 p-b-3">{dynamicProp.displayName}</p>
                            <input class="first-letter-capital"  disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} onClick={(e) => props.inputClicked(e)} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_"+dynamicProp.name] ? true : false} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onInput={(e) => props.setFormValueInput(e, dynamicProp.name)}  onFocusout={ (e) => props.saveFormInput(e, dynamicProp.name)} />
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "date" || dynamicProp.formType === "time") && dynamicProp.dependentProp && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class="w-30" required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}`} type={dynamicProp.formType} value={interactionObj["dynamicProperties_" + dynamicProp.name] || moment(new Date()).format('YYYY-MM-DD')} onChange={ (e) => props.saveFormInput(e, dynamicProp.name)} />
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (!dynamicProp.enum || dynamicProp.enum.length === 0)) && dynamicProp.dependentProp && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <div class="display-flex p-r-10 align-center">
                            <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-yes`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "yes" ? true : false} value="yes" onChange={(e) => props.saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-yes`}>Yes </label>
                            <input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} required={dynamicProp.isRequired ? "true" : "false"} name={dynamicProp.name} id={`${dynamicProp.name}-no`} type={dynamicProp.formType} checked={currentRow['dynamicProperties_' + dynamicProp.name] === "no" ? true : false} value="no" onChange={(e) => props.saveFormInputRadioDefault(e, dynamicProp.name)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-no`}>No </label>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (dynamicProp.enum || dynamicProp.enum.length !== 0)) && dynamicProp.dependentProp && dynamicProp.dependentPropValue && (interactionObj["dynamicProperties_" + dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && (
                          <div class="display-flex formRadioButtons">
                            {
                              dynamicProp.enum.map((enumVal) => (
                                <div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => props.saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; ' for={`${dynamicProp.name}-${enumVal}`}>{enumVal}</label></div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        (dynamicProp.formType === "radio" && (dynamicProp.enum || dynamicProp.enum.length !== 0)) && dynamicProp.dependentProp && dynamicProp.dependentPropValues && (dynamicProp.dependentPropValues.includes(interactionObj["dynamicProperties_" + dynamicProp.dependentProp])) && (
                          <div class="display-flex formRadioButtons">
                            {
                              dynamicProp.enum.map((enumVal) => (
                                <div class="display-flex p-r-10 align-center"><input disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} name={dynamicProp.name} id={`${dynamicProp.name}-${enumVal}`} type={dynamicProp.formType} checked={interactionObj["dynamicProperties_" + dynamicProp.name] === enumVal} value={interactionObj["dynamicProperties_" + dynamicProp.name]} onChange={(e) => props.saveFormInputRadio(e, dynamicProp.name, enumVal)} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>{enumVal}</label></div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "interestedModel" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            {/*<select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={model} onChange={e => {
                                    props.getVariantForSelectedModel(e.target.value)
                                    setModel(e.target.value)
                                    saveFormInput(e, dynamicProp.name)
                                    }
                                    }>
                                    <option style="text-transform:capitalize" value="" selected>Select Model</option>
                                    {catalogoueItemList.map((item)=>(
                                      <option style="text-transform:capitalize;" value={item.uuid}>{item.displayName}</option>
                                    ))}
                                    </select>
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 m-0" >
                                      <div class="row">
                                          <div class="col-xs-12 p-l-0">
                                            <p class=" fs-15 p-b-3">{dynamicProp.displayName}</p>
                                          </div>
                                      </div>
                                  </div>*/}
                          </div>
                        )
                      }
                      {/*
                              (dynamicProp.name === "interestedModel" && dynamicProp.formType === "select") && model && variantList && (
                                <div class="display-flex">
                                  <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id='variant' value={variant} onChange={e => {
                                    props.getVariantDetails(e.target.value)
                                    setVariant(e.target.value)
                                    saveFormInput(e, dynamicProp.name)
                                  }}>
                                    <option value="" selected>Select Variant</option>
                                    {
                                      variantList.map((variant)=>(
                                        <option style="text-transform:capitalize" value={variant.uuid}>{variant.variant}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              )
                            */}
                      {
                        (dynamicProp.name === "exchangeEvaluator" && dynamicProp.formType === "select") && (
                          <div class="display-block">
                            <p class="formLabel fs-15">Exchange Evaluator</p>
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_exchangeEvaluator']} onChange={e => {
                              props.saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Exchange Evaluator</option>
                              {exchangEvaluators.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.userID} value={item.userID}>{item.userName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedScheme" && dynamicProp.formType === "select") && (
                          <div class="display-block">
                            <p class="fs-15 first-letter-capital">{dynamicProp.displayName + " " }</p>
                            {
                              schemes.map((scheme, index) => (
                                <div class="display-flex">
                                  <input type="checkbox" value={scheme.uuid} defaultChecked={interactionObj["dynamicProperties_"+dynamicProp.name] === scheme.uuid} default={interactionObj["dynamicProperties_" + dynamicProp.name]} disabled={(scheme.displayName.includes("Exchange") && interactionObj["dynamicProperties_typeOfBuyer"] !== "Exchange Buyer")} onChange={(e) => props.saveFormInputRadio(e, dynamicProp.name, scheme.uuid, index)} />
                                  <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>{scheme.displayName + " - " + getFormattedAmount(scheme.discountAfterGST)  }</label>
                                </div>
                              ))
                            }
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedOffer" && dynamicProp.formType === "select") && (
                          <div class="display-block">
                            <p class="formLabel fs-15">Dealer Offer</p>
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_selectedOffer']} onChange={e => {
                              props.saveFormInput(e, dynamicProp.name);
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Offer</option>
                              {offers.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.uuid} value={item.uuid}>{item.displayName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "manufacturer" && dynamicProp.formType === "select") && (
                          <div>
                          <p class="formLabel fs-15">Select Manufacturer</p>

                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_manufacturer']} onChange={e => {
                              props.setSelectedMake(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Manufacturer</option>
                              {listofManufacturers.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_manufacturer'] === item} value={item}>{item}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }

                      {
                        (dynamicProp.name === "otherCars" && dynamicProp.formType === "select") && (
                          <div>
                          <p class="formLabel fs-15">{dynamicProp.displayName}</p>

                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_otherCars']} onChange={e => {
                              // setSelectedMake(e)
                              props.saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Manufacturer</option>
                              {listofManufacturers.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_otherCars'] === item} value={item}>{item}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {/*
                        (dynamicProp.name === "exchangeCarModel" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj['dynamicProperties_exchangeCarModel']} onChange={e => {
                              props.setSelectedExchangeModel(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Model</option>
                              {listOfModels && listOfModels.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_exchangeCarModel'] === item.Model + " - " + item.Category + " - " + item.Year} value={item.Model + " - " + item.Category + " - " + item.Year}>{item.Model + " - " + item.Category + " - " + item.Year}</option>
                              ))}
                            </select>
                          </div>
                        )
                      */}

                      {
                        (dynamicProp.name === "selectedModel" && (!dynamicProp.dependentProp || (dynamicProp.dependentProp && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue))) && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
                              props.saveSelectedModel(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Model</option>
                              {catalogoueItemList.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedModel'] === item.uuid} value={item.uuid}>{modelMapping[item.displayName.toLowerCase()]}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedVariant" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
                              props.saveSelectedVariant(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Variant</option>
                              {variantList.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedVariant'] === item.uuid} value={item.uuid}>{item.variant}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedTestDriveModel"  && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
                              props.saveSelectedTestDriveModel(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Model</option>
                              {catalogoueItemList.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={(interactionObj['dynamicProperties_selectedModel'] === item.uuid) || (interactionObj['dynamicProperties_selectedTestDriveModel'] === item.uuid)} value={item.uuid}>{modelMapping[item.displayName.toLowerCase()]}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedTestDriveVariant" && (interactionObj["dynamicProperties_"+dynamicProp.dependentProp] === dynamicProp.dependentPropValue) && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={selectedModel} onChange={e => {
                              props.saveSelectedTestDriveVariant(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Variant</option>
                              {variantList.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj['dynamicProperties_selectedTestDriveVariant'] === item.uuid} value={item.uuid}>{item.variant}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "selectedTestDriveCarID" && (interactionObj["dynamicProperties_typeOfTestDriveCar"] === "Test Drive Car") && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj["dynamicProperties_selectedTestDriveCarID"]} onChange={e => {
                              props.saveSelectedTestDriveCar(e)
                              // saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" >Select Test Drive Car</option>
                              {testDriveCars.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" value={item.uuid}>{item.variant + " - " + item.registrationNumber}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "testDriveApprovalRole" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <p class="formLabel fs-15 p-b-3"> Select Responsible Role</p>
                            <select class="text-4b4d51 background-white border-none" type="text" id="employee2" value={interactionObj['dynamicProperties_testDriveApprovalRole']} onChange={e => {
                              props.getSelectedTypeUserList(e.target.value)
                            }}
                            style="text-shadow:none"
                            >
                              <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] == "NA"} value=''>{'Select Responsible Role'}</option>
                              <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'Branch Manager'} value={'BRANCH MANAGER'}>{'Branch Manager'}</option>
                              <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'Sales Manager'} value={'SALES MANAGER'}>{'Sales Manager'}</option>
                              <option selected={interactionObj['dynamicProperties_testDriveApprovalRole'] === 'Assistant Sales Manager'} value={'ASST.SALES MANAGER'}>{'Assistant Sales Manager'}</option>
                            </select>
                          </div>
                        )
                      }
                      {
                        (dynamicProp.name === "testDriveAssignedUser" && dynamicProp.formType === "select") && (
                          <div class="display-flex">
                            <p class="formLabel fs-15 p-b-3"> Select Responsible Person</p>
                            <select type="text" id="employee" class="m-t-10  first-letter-capital background-white border-none text-4b4d51" onChange={(e => props.saveFormInput(e, dynamicProp.name, "select", index))} style="text-shadow:none">
                              <option class="first-letter-capital" value='' selected>{`Select ${interactionObj['dynamicProperties_testDriveApprovalRole']}`}</option>
                              { assignUserList.map((user) => (
                                <option selected={interactionObj['dynamicProperties_testDriveAssignedUser'] === user.userID } value={user.userID}>{user.userName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        ((dynamicProp.name === "insuranceCompanyID") && dynamicProp.formType === "select") && (
                          <div class="display-block">
                            <p class="formLabel fs-15">{dynamicProp.displayName}</p>
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={interactionObj[dynamicProp.name]} onChange={e => {
                              props.saveFormInput(e, dynamicProp.name)
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Insurance Company</option>
                              {insuranceCompanies.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_" + dynamicProp.name] === item.userID} value={item.userID}>{item.userName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      {
                        selectedModel && currentAction.name === "product selection" && (
                          variantList && variantList.map((item, index) => (
                            <div class="listCard fadeAnimationText m-b-5" >
                              <div class='p-l-10 p-r-10 p-t-10 p-b-10 msgContainer cursor-pointer animatedHover'>
                                <div class='row'>
                                  <div class='col-xs-12 col-sm-5 col-md-5 col-lg-5'>
                                    <div class='display-flex m-all'>
                                      <div>
                                        <p style='text-transform: capitalize;font-size:15px;'>{item.variant}</p>
                                      </div>
                                      <div>

                                      </div>
                                    </div>
                                    {
                                      <div class="fp-b-10 flex-w">
                                        {item.colors && item.colors.map((color) => (
                                          <span title={color.split("-").join(" ")} class='p-r-10 cursor-pointer inline-block' onClick={e => props.setSelectedProductColor(e, item, color)} >
                                            <div id={item.uuid + "-" + color} style="border:none;height:34px;">
                                              {/*<img src={`https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}/Color/${color}.jpg`} width='30' height='30' />*/}
                                                <img class="border-grey" src={`https://api.hyundai.co.in/service/download/colors/${color}.jpg`} width='30' height='30' />
                                            </div>
                                          </span>
                                        ))}
                                      </div>
                                    }
                                  </div>
                                  <div class='col-xs-5 col-sm-3 col-md-3 col-lg-3'>
                                    <div class=" p-b-10 m-all" >
                                      {
                                        ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1) && (selectedProducts[selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor))]['quantity'] === 0 || !selectedProducts[selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor))]['quantity'])) && (
                                          <div >
                                            {
                                              ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
                                                <span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>{selectedDisplayColor.split('-').join(' ')}</span>

                                              )
                                            }
                                            {
                                              ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
                                                <span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>Available Cars: <span style="font-size: 15px;color:#2a457e;font-weight:600">{availableStock}</span></span>
                                              )
                                            }
                                            <button class="cart-add-btn" onClick={(e) => addQuantity(e, item, index)
                                            }>Add</button>
                                          </div>
                                        )
                                      }
                                      {
                                        (selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor) > -1 && selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)]['quantity'] > 0) && (
                                          <div >
                                            {
                                              ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
                                                <span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>{selectedDisplayColor.split('-').join(' ')}</span>
                                              )
                                            }
                                            {
                                              ((selectedProducts.findIndex(d => ((d.productID === item.uuid) && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)) > -1)) && (
                                                <span class='first-letter-capital' style='display: block; margin-bottom: 5px;font-size: 12px;'>Available Cars: <span style="font-size: 15px;color:#2a457e;font-weight:600">{availableStock}</span></span>
                                              )
                                            }
                                            <div class="qty-input">
                                              <button class="qty-count qty-count--minus m-r-5" style="color:grey" id={'qty-count--minus' + index} type="button" onclick={(e) => removeQuantity(e, item, index)}>-</button>
                                              <input class="product-qty" type="number" style="color:green" name="product-qty" id={'product-qty' + index} min="0" max="10000" value={selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && d.color && (item.uuid + "-" + d.color.split(" ").join("-")) === selectedColor)]['quantity'] : 0} onChange={(e) => updateQuantity(e, item)} />
                                              <button class="qty-count qty-count--add m-l-5" style="color:green" id={'qty-count--add' + index} type="button" onclick={(e) => addQuantity(e, item, index)}>+</button>
                                            </div>
                                          </div>
                                        )
                                      }

                                    </div>
                                  </div>
                                  <div class='col-xs-7 col-sm-4 col-md-4 col-lg-4'>
                                    <div class=" p-b-10 m-all" >
                                      <span class='display-flex p-r-10 align-center'>
                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForAccessories'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForAccessories'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedForAccessories")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Accessories</label>
                                      </span>
                                      <span class='display-flex p-r-10 align-center'>
                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForRsa'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForRsa'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedForRsa")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>RSA</label>
                                      </span>
                                      <span class='display-flex p-r-10 align-center'>

                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedFor3M'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedFor3M'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedFor3M")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>3M</label>
                                      </span>
                                      <span class='display-flex p-r-10 align-center'>

                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForSheildOfTrust'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForSheildOfTrust'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedForSheildOfTrust")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Shield of Trust Warranty</label>
                                      </span>
                                      <span class='display-flex p-r-10 align-center'>

                                        <input type="checkbox" disabled={(selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? false : true)} checked={selectedColor && selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForExtendedWarranty'] ? true : false : false} value={selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor))) > -1 ? selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid && (d.color && selectedColor && (item.uuid + "-" + d.color.split(" ").join("-") === selectedColor)))]['isOptedForExtendedWarranty'] : false} onChange={e => props.setSelectedProduct(e, item, "isOptedForExtendedWarranty")} />
                                        <label class='p-l-10 p-r-10' style='font-weight: 100; font-size: 11px;'>Extended Warranty</label>
                                      </span>
                                    </div>


                                    {/*
                                            selectedProducts.findIndex(d => d.productID === item.uuid) > -1 && selectedProducts[selectedProducts.findIndex(d => d.productID === item.uuid)]['quantity'] > 0 && (
                                              <div class='display-flex m-t-5' style='float: right'>
                                                <button class="primary-button" onclick={(e) => removeQuantity(e, item, index)}>Remove</button>
                                              </div>
                                            )
                                            */}

                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )
                      }
                      {
                        (currentAction.displayName === "Need Assessment" && (propIndex === action.dynamicProps.length - 1)) && (
                          <div class="display-block">
                            <p class="formLabel fs-15">Finance Manager</p>
                            <select disabled={(dynamicProp.isDisabled || (currentRow.status && currentRow.status.toLowerCase() === "completed")) ? true: false} class='select' style="text-transform:capitalize" type="text" id="orderSource" value={currentRow['dynamicProperties_financeExecutive']} onChange={e => {
                              props.saveFormInput(e, "financeExecutive")
                            }
                            }>
                              <option style="text-transform:capitalize;font-size:16px" value="" selected>Select Finance Manager</option>
                              {financeExecutives.map((item) => (
                                <option style="text-transform:capitalize;font-size:16px;" selected={interactionObj["dynamicProperties_financeExecutive"] === item.userID} value={item.userID}>{item.userName}</option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      <span id={`error-`+dynamicProp.name} class="text-color-red fs-10" style="display:none;">Please enter {dynamicProp.displayName}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }

        {
          currentAction.name === "summary" && (
            <div class="display-block">
              <p style="color:#7a7a7a">Summary</p>
              {
                cartProducts && cartProducts.length !== 0 && cartProducts.map((cartItem, index) => (
                  <div class="quotationCarSummary row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10" style="background: #bfe1ff;">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/car.png" class="m-r-5" height="20" style="height: 20px; width: 20px;"/>*/}
                          <span class="color-darkgrey">
                            <span class="first-letter-capital">{cartItem.variant}</span>
                            <span class="color-black p-l-5 p-r-5 m-l-10 first-letter-capital">{cartItem.color.toLowerCase()}</span><br/>
                            {/*<span class="color-black p-l-5 p-r-5 m-l-10 first-letter-capital">Ex-showroom</span>*/}
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                              <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.quantity}</span></span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{/*getFormattedAmount(cartItem.exShowroom ? cartItem.exShowroom : 1000000)*/}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
                          <span class="color-darkgrey">
                            EX SHOWROOM
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                              <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.exShowroom ? cartItem.exShowroom : 1000000)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      cartItem.exShowroom >= 1000000 && (
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                          <div class="row">
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                              {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
                              <span class="color-darkgrey">
                                TCS @ 1% ON EX SHOWROOM
                              </span>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                              <div class="row">
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                                  <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                                  <span class="color-darkgrey f-600 p-t-10 p-b-10">{props.quotationData.selectedProducts &&  props.quotationData.selectedProducts[0] ? getFormattedAmount(props.quotationData.selectedProducts[0].tcsOnExShowroom) : '-'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
                          <span class="color-darkgrey">
                            Comprehensive + ' O ' Dept
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                              <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{props.quotationData.selectedProducts && props.quotationData.selectedProducts[0] ? getFormattedAmount(props.quotationData.selectedProducts[0].insuranceCalculated) : '-'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}{/*
                          <span class="color-darkgrey">
                            Additional Premium for Engine Protection (EP) &Consumable (CM)
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                              <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{props.quotationData.selectedProducts && props.quotationData.selectedProducts[0] ? getFormattedAmount(props.quotationData.selectedProducts[0].additionalPremiumForEngineProtection) : '-'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
                          <span class="color-darkgrey">
                            Additional Premium for Return to Invoice( RTI)
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                              <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{props.quotationData.selectedProducts && props.quotationData.selectedProducts[0] ? getFormattedAmount(props.quotationData.selectedProducts[0].additionalPremiumForRTI) : '-'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
                          <span class="color-darkgrey">
                            RTO TAX + REG FEE + FAST TAG FOR INDIVIDUAL
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                              <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{props.quotationData.selectedProducts && props.quotationData.selectedProducts[0] ? getFormattedAmount(props.quotationData.selectedProducts[0].rtoIndividual) : '-'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
                          <span class="color-darkgrey">
                            EXTENDED WARRANTY : (4th Yr) OR (4th + 5th Yr)
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                              <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;"><span class="f-600 m-l-5"></span></span>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{props.quotationData.selectedProducts && props.quotationData.selectedProducts[0] ? getFormattedAmount(props.quotationData.selectedProducts[0].fourthAnd5thYearExtendedWarranty) : '-'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          <img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>
                          <span class="color-darkgrey">
                            <span class="f-600"> #{index + 1}.11 </span>
                            | EXTENDED WARRANTY : (4th Yr) OR (4th + 5th Yr)
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            {
                              cartItem.quantity && (
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                                  <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedForExtendedWarranty ? cartItem.quantity : 0}</span></span>
                                </div>
                              )
                            }
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedForExtendedWarranty ? cartItem.fourthAnd5thYearExtendedWarranty ? cartItem.fourthAnd5thYearExtendedWarranty : 10000 : 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>*/}
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/> */}
                          <span class="color-darkgrey">
                            Basic Accessories Kit
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            {
                              cartItem.quantity && (
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                                  <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedForAccessories ? cartItem.quantity : 0}</span></span>
                                </div>
                              )
                            }
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedForAccessories ? cartItem.basicAccessoriesKit ? cartItem.basicAccessoriesKit : 20000 : 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
                          <span class="color-darkgrey">
                            RSA
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            {
                              cartItem.quantity && (
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                                  <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedForRsa ? cartItem.quantity : 0}</span></span>
                                </div>
                              )
                            }
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedForRsa ? cartItem.rsa ? cartItem.rsa : 2300 : 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
                          <span class="color-darkgrey">
                            3M
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            {
                              cartItem.quantity && (
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                                  <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedFor3M ? cartItem.quantity : 0}</span></span>
                                </div>
                              )
                            }
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedFor3M ? cartItem.rsa ? cartItem.rsa : 10000 : 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          {/*<img src="/assets/images/seat.png" class="m-r-5" height="20"  style="height: 20px; width: 20px;"/>*/}
                          <span class="color-darkgrey">
                            Shield of Trust
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            {
                              cartItem.quantity && (
                                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                                  <span class="color-darkgrey p-t-10 p-b-10 display-flex" style="align-items: center;">x <span class="f-600 m-l-5"> {cartItem.isOptedForSheildOfTrust ? cartItem.quantity : 0}</span></span>
                                </div>
                              )
                            }
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.isOptedForSheildOfTrust ? cartItem.sheildOfTrust ? cartItem.sheildOfTrust : 12999 : 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10" style="background: #bfe1ff;">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          <span class="color-darkgrey">
                            <span class="first-letter-capital">Sub Total</span>
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 m-0 p-0">
                            </div>
                            <div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartItem.totalOnRoadPrice ? cartItem.totalOnRoadPrice : cartItem.totalIndividual)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
              <div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
                {
                  currentRow['dynamicProperties_selectedOffer'] && (
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          <span class="color-darkgrey">
                            Offer Discount
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0">
                            </div>
                            <div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(currentRow['dynamicProperties_selectedOffer'] ? 10000 : 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                {
                  currentRow['dynamicProperties_selectedScheme'] && (
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          <span class="color-darkgrey">
                            Scheme Discount
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0">
                            </div>
                            <div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(interactionObj['dynamicProperties_schemeDiscount'] ? interactionObj['dynamicProperties_schemeDiscount'] : 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                {
                  (currentRow['dynamicProperties_discount'] !== 0) && (
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                      <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 m-0 p-0 display-flex" style="align-items: center;">
                          <span class="color-darkgrey">
                            Cash Discount (Approval under Process)
                          </span>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 m-0 p-r-10">
                          <div class="row">
                            <div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0">
                            </div>
                            <div class="col-xs-6 col-sm-12 col-md-12 col-lg-12 m-0 p-0 display-flex justify-flex-end">
                              <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(currentRow['dynamicProperties_discount'] ? currentRow['dynamicProperties_discount'] : 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
              <div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                  <div class="row">
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-0 display-flex">
                      <span class="color-darkgrey p-t-10 p-b-10">
                        Booking Amount
                      </span>
                    </div>
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-r-10 display-flex justify-flex-end">
                      <span class="color-darkgrey f-600 p-t-10 p-b-10">{getFormattedAmount(cartProducts[0].bookingAmount)}</span>
                    </div>
                    <div class="waitingPeriodText col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 display-flex" style="border-left: 1px solid #e2e2e2">
                      <span class="color-darkgrey p-t-10 p-b-10">
                        Waiting Period
                      </span>
                    </div>
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-r-10 display-flex justify-flex-end">
                      <span class="color-darkgrey f-600 p-t-10 p-b-10">{`${cartProducts[0].waitingPeriodMin} to ${cartProducts[0].waitingPeriodMax} Days`}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                  <div class="row">
                    <div class="col-xs-2 col-sm-4 col-md-4 col-lg-4 m-0 p-0 display-flex">
                      <span class="color-darkgrey p-t-10 p-b-10">
                        Quotation
                      </span>
                    </div>
                    <div class="col-xs-10 col-sm-8 col-md-8 col-lg-8 m-0 display-flex quotationCarSummary">
                      <button class="primary-button m-l-5 m-t-10" onClick={(e) => props.toggleProformaFormPopover(e)}>
                        Generate
                      </button>
                      <button class="primary-button m-l-5 m-t-10" disabled={!props.quotationData.uuid} onClick={(e) => props.DownloadProformaInvoice(e)}>
                        Send Email
                      </button>
                      <button class="whatsAppButton primary-button m-l-5 m-t-10 display-flex align-center justify-center" disabled>
                        <p class="is-hide-mobile">Send Via WhatsApp</p>
                        <svg class="is-hide-Desktop" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-l-10 display-flex">
                  <span class="color-darkgrey p-t-10 p-b-10">
                    Last generated By:
                  </span>
                </div>
                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 display-flex justify-flex-end">
                  <span class="color-darkgrey f-600 p-t-10 p-b-10">{lastQuotation.generatedBy}</span>
                </div>
                <div class="p-l-10 lastGeneratedText col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 display-flex" style="border-left: 1px solid #e2e2e2">
                  <span class="color-darkgrey p-t-10 p-b-10">
                    Last generated On:
                  </span>
                </div>
                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 display-flex justify-flex-end text-end">
                  <span class="color-darkgrey f-600 p-t-10 p-b-10">{`${formatDateTime(lastQuotation.generatedOn, true)}. Valid Upto ${formatDateTime(lastQuotation.validUpto)}`}</span>
                </div>
              </div>
              <div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                  <div class="row">
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-0 display-flex">
                      <span class="color-darkgrey p-t-10 p-b-10">
                        Exchange Selected?
                      </span>
                    </div>
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-t-10 display-flex">
                      <input disabled type="checkbox" checked={interactionObj['dynamicProperties_exchangeEvaluator']} />
                    </div>
                    <div class="financeText col-xs-6 col-sm-3 col-md-3 col-lg-3 display-flex" style="border-left: 1px solid #e2e2e2">
                      <span class="color-darkgrey p-t-10 p-b-10">
                        Finance Selected?
                      </span>
                    </div>
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-t-10 display-flex">
                      <input disabled type="checkbox" checked={interactionObj['dynamicProperties_financeExecutive']} />
                    </div>
                  </div>
                </div>
              </div>
              <div class="quotationCarSummary row" style="border: 1px solid #e2e2e2">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 p-l-10 p-r-10">
                  <div class="row">
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-0 p-0 display-flex">
                      <span class="color-darkgrey p-t-10 p-b-10">
                        Customer wants to pay booking amount?
                      </span>
                    </div>
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 m-t-10 display-flex align-center">
                      <input name="customerChoseToBook" id={`$customerChoseToBook-Yes`} type="radio" checked={interactionObj['dynamicProperties_customerChoseToBook'] === "yes" ? true : false} value="yes" onChange={(e) => props.saveFormInputRadioDefault(e, "customerChoseToBook")} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>Yes </label>
                      <input name="customerChoseToBook" id={`$customerChoseToBook-No`} type="radio" checked={interactionObj['dynamicProperties_customerChoseToBook'] === "no" ? true : false} value="no" onChange={(e) => props.saveFormInputRadioDefault(e, "customerChoseToBook")} /> <label class='p-l-10 p-r-10' style='font-weight: 100; '>No </label>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )
        }

        {
          currentAction && currentAction.buttons && currentAction.buttons.length !== 0 && currentAction.buttons.map((button) => (
            <button id={button} class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" onClick={e => props.dynamicButtonClicked(e, button)}>{button}</button>
          ))
        }
        {/*
          currentRow.displayName === 'Finance Enquiry' && (actions && actions.length !== 0 && (selectedActionIndex === actions.length - 1)) && (
            <div class="taskDetailsSection" style="overflow-y:auto">
              <button id="approve-button" class="primary-button m-t-20 m-b-20 m-l-20 m-r-20" disabled={currentRow.status === 'Pending'} onClick={e => props.dynamicButtonClicked(e, "Finance Quotation")}>Generate Finance Quotation</button>
            </div>
          )
        */}
        {
          testDriveQueue > 0 &&
          <div>
            <label>Test Drive Queue Number:</label><span>{testDriveQueue}</span>
          </div>
        }
        {
          (currentRow && currentRow.displayName == "Handover Courier") && (
            <div>
            <div class="row">
              <div class="m-b-10">
              <div class="fw-600 fs-1rem p-b-10" >
                  <label>Received From</label>
                  <input type="text" value={courierData.receivedFrom} disabled/>
                </div>
                <div class="fw-600 fs-1rem p-b-10" >
                  <label>Description</label>
                  <div class="display-flex">
                    <input type="radio" name="courierDescription" id="courierDescription" placeholder="Courier description" disabled={isHandoverDocket} checked={(courierData && courierData.courierDescription === "Envelop") ? true: false } value={courierData && courierData.courierDescription ? courierData.courierDescription : ''} onChange={(e) => {
                      props.setCourierData({
                        ...courierData,
                        courierDescription: e.target.value
                      });
                    }}/><label> Envelop</label>
                  </div>
                  <div class="display-flex">
                    <input type="radio" name="courierDescription" id="courierDescription" placeholder="Courier description" disabled={isHandoverDocket} checked={(courierData && courierData.courierDescription === "Parcel") ? true: false } value={courierData && courierData.courierDescription ? courierData.courierDescription : ''} onChange={(e) => {
                      props.setCourierData({
                        ...courierData,
                        courierDescription: e.target.value
                      });
                    }}/><label> Parcel</label>
                  </div>
                </div>
                <div class="fw-600 fs-1rem p-b-10" >
                  <label>Upload Hand Over photo</label>
                  <input type="file" id='uploadHandoverPhotoIDs' onChange={async (e) => props.uploadPackageImage(e, "handOverPhoto")} />
                </div>
                <div class="fw-600 fs-1rem p-b-10 display-flex" id='uploadHandoverPhotoPreview'>

                </div>
                {
                  courierData.uploadHandoverPhotoSrc && courierData.uploadHandoverPhotoSrc.length !== 0 ? <div class="fw-600 fs-1rem p-b-10 min-h-80 min-w-100" >
                    <div class="fw-600 fs-1rem p-b-10 display-flex flex-direction-row flex-wrap-wrap" >
                      {
                        courierData.uploadHandoverPhotoSrc.map((handoverPhotoSrc) => (
                          <div className='courierImg'>
                            <img id='uploadHandoverPhotoSrc' src={handoverPhotoSrc} className='w-80 h-80 m-all border-black ' />
                            <span className={isHandoverDocket ? "crossTip" : 'crossTipNone'} id={handoverPhotoSrc} onClick={(e) => {
                              if (isHandoverDocket) {
                                let uploadHandoverPhotoID = e.target.id.split('/')[5]
                                let remainingUploadHandoverPhotoSrc = courierData.uploadHandoverPhotoSrc.filter((handoverPhotoSrc) => handoverPhotoSrc !== e.target.id)
                                let remainingUploadHandoverPhotoIDs = courierData.uploadHandoverPhotoIDs.filter((handoverPhotoIDs) => handoverPhotoIDs !== uploadHandoverPhotoID)
                                props.setCourierImgDelete(true)
                                props.setCourierData({
                                  ...courierData,
                                  uploadHandoverPhotoSrc: remainingUploadHandoverPhotoSrc,
                                  uploadHandoverPhotoIDs: remainingUploadHandoverPhotoIDs
                                })
                              }
                            }}>×</span>
                          </div>

                        ))
                      }
                    </div>
                  </div> : ''
                }

              </div>
            </div>
            <div class="row">
              <div class="m-b-10">
                <div class="p-b-10" >
                  <select type="text" id="orderSource" disabled={(isHandoverDocket)} value={courierData.handOverTo} onChange={(e) => {
                    props.setCourierData({
                      ...courierData,
                      handOverTo: e.target.value
                    });
                  }}>
                    <option value="" selected={(!isHandoverDocket && !isEditDocket)}>Handed over to</option>
                    {allUserList.map((user) => (
                      <option value={user.uuid}>{user.userName  }</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="m-b-10">
                <div class="p-b-10" >
                  <input type="time" id="timeOfHandOver" disabled={(isHandoverDocket)} value={courierData.timeOfHandOver} onChange={(e) => {
                    props.setCourierData({
                      ...courierData,
                      timeOfHandOver: e.target.value
                    });
                  }} />
                </div>
              </div>
              </div>
              <div class="row">
                <div class="m-b-10">
                  <div class="p-b-10" >
                    <input type="text" id="name" placeholder="Remarks" disabled={(isHandoverDocket)} value={courierData.remarks} onChange={(e) => {
                      props.setCourierData({
                        ...courierData,
                        remarks: e.target.value
                      });
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )
        }
        <div class="button-container display-flex p-l-30 m-t-10 p-b-10 justify-flex-end">
          {
            actions && actions.length !== 0 && selectedActionIndex !== 0 && (
              <button class="primary-button" disabled={isBackModalDisable} onClick={(e) => {
                props.setSelectedActionIndex(selectedActionIndex - 1)
                props.setCurrentAction(actions[selectedActionIndex - 1])
                props.checkAction(actions[selectedActionIndex - 1],selectedActionIndex, 'back' )
              }
              }>Back</button>
            )
          }
          {
            actions && actions.length !== 0 && (selectedActionIndex !== actions.length - 1) && (
              <button class="primary-button m-l-10" disabled={isNextModalDisable} type="submit" onClick={(e) => {
                props.submitFormOnStep(e)
              }
              }>Next</button>
            )
          }
        </div>
        </div>
        {/*<div class="button-container display-flex p-l-30 p-r-30 m-t-10 p-b-10 pos-absolute w-full justify-flex-end">
          {
            actions && actions.length !== 0 && selectedActionIndex !== 0 && (
              <button class="primary-button" disabled={isBackModalDisable} onClick={(e) => {
                props.setSelectedActionIndex(selectedActionIndex - 1)
                props.setCurrentAction(actions[selectedActionIndex - 1])
                props.checkAction(actions[selectedActionIndex - 1],selectedActionIndex, 'back' )
              }
              }>Back</button>
            )
          }
          {
            actions && actions.length !== 0 && (selectedActionIndex !== actions.length - 1) && (
              <button class="primary-button m-l-10" disabled={isNextModalDisable} type="submit" onClick={(e) => {
                props.submitFormOnStep(e)
              }
              }>Next</button>
            )
          }
          <button onClick={(e) => props.submitFormNew(e)} class="primary-button m-l-10" disabled={isSaveModalDisable}>Save</button>
        </div>*/}
        {
          currentAction.displayName === "Product Selection" && cartProducts && cartProducts.length > 0 && (
            <div class="carCart">
              <div class='row'>
                <div class='col-xs-4 col-sm-4 col-md-4 col-lg-4' >
                  <span class="selectedText">Selected</span> <span class="selectedCarCount">{cartNumber}</span>
                </div>
                <div class='col-xs-5 col-sm-5 col-md-5 col-lg-5' >
                  <span class="carCost">Cost<span class="cartValue">{getFormattedAmount(cartValue)}</span> </span>
                </div>
                <div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 display-flex justify-center' >
                  <span class="viewCart"><p>View Cart </p><span class="m-l-5 h-24px" style="right: 0px;top: 0px;">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ddf0f3"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                  </span></span>
                </div>
              </div>

            </div>
          )
        }
        {/*
              modified by Vihang
              modified at 25/05/2022
              modification : scroll button to inidcate that page is not ful;y scrolled to the bottom
        */}
        {/*
              modified by Vihang
              modified at 26/05/2022
              modification : added cursor pointer for scroll button
        */}
          {!isScrolledToTheBottom &&
            <svg class="scrollButton bounceAnimation cursor-pointer pos-absolute" onClick={(e)=> props.scrollToTheBottom("formModalContainer")} fill="#808080" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M20 25.542 27.292 18.208 25.333 16.292 20 21.583 14.667 16.292 12.708 18.208ZM20 36.667Q16.5 36.667 13.458 35.375Q10.417 34.083 8.167 31.833Q5.917 29.583 4.625 26.542Q3.333 23.5 3.333 20Q3.333 16.5 4.625 13.458Q5.917 10.417 8.167 8.167Q10.417 5.917 13.458 4.625Q16.5 3.333 20 3.333Q23.5 3.333 26.542 4.625Q29.583 5.917 31.833 8.167Q34.083 10.417 35.375 13.458Q36.667 16.5 36.667 20Q36.667 23.5 35.375 26.542Q34.083 29.583 31.833 31.833Q29.583 34.083 26.542 35.375Q23.5 36.667 20 36.667Z"/></svg>
          }


      </div>
    </NewPopupModal>
  );
};

export default FormWizard;
