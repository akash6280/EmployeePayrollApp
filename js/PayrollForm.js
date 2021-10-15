let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded',(event) => {
  

  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input',function(){
      if(name.value.length == 0){
          textError.textContent = "";
          return;
      }
      try{
          (new EmployeePayrollData()).name = name.value;
          
      } catch(e){
          textError.textContent = e;
      }
  })

  var output = document.querySelector(".salary-output");
  var salary = document.querySelector("#salary");
  salary.addEventListener("input", function () {
    output.textContent = salary.value;
  });

  const dateError = document.querySelector('.date-error');
  const month  = document.querySelector('#month');
  const year  = document.querySelector('#year');
  const date  = document.querySelector('#day');
  date.addEventListener("change",validateDate);
  month.addEventListener("change",validateDate);
  year.addEventListener("change",validateDate);
    function validateDate() {
        let startDate = Date.parse(year.value + "-" + month.value + "-" + date.value);
        try{
            (new EmployeePayrollData()).startDate = startDate;
            dateError.textContent = "";
        } catch(e) {
          dateError.textContent = e;
        }
    }


  checkForUpdate();
});


const save = () => {
  let employeePayrollData;
  try {
      employeePayrollData = createEmployeePayroll();
      createAndUpdateStorage(employeePayrollData);
  } catch (e) {
      return;
  }
}

function createAndUpdateStorage(employeePayrollData){
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList != undefined){
      employeePayrollList.push(employeePayrollData);
  }else{
      employeePayrollList = [employeePayrollData]
  }
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  try {
    employeePayrollData.name = getInputValueById('#name');
  } catch (e) {
    setTextValue('.text-error',e);
    throw e;
  }
  employeePayrollData.id = new Date().getTime();
  employeePayrollData.name = getInputValueById('#name');
  employeePayrollData.profile = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.notes = getInputValueById('#notes');
  let date = getInputValueById('#day')+ " "+ getInputValueById('#month')+" "+getInputValueById('#year');
  try {
    employeePayrollData.startDate = new Date();
  } catch (error) {
    setTextValue('.date-error',e);
    throw e;
  }
  
  console.log(employeePayrollData.toString());

  alert(employeePayrollData.toString());
  return employeePayrollData;
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selectedItems = [];
  allItems.forEach(item => {
      if (item.checked)
          selectedItems.push(item.value);
  });
  return selectedItems;
}

const resetForm = () => {
  setValue('#name','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary','');
  setTextValue('.salary-output','40000');
  setValue('#notes','');
  setSelectedIndex('#day',0);
  setSelectedIndex('#month',0);
  setSelectedIndex('#year',0);
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item =>{
      item.checked = false;
  });
}
const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
} 

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if(!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
}

const setForm = () => {
  setValue('#name',employeePayrollObj._name);
  setSelectedValues('[name=profile]',employeePayrollObj._profile);
  setSelectedValues('[name=gender]',employeePayrollObj._gender);
  setSelectedValues('[name=department]',employeePayrollObj._department);
  setValue('#salary',employeePayrollObj._salary);
  setTextValue('.salary-output',employeePayrollObj._salary);
  setValue('#notes',employeePayrollObj._notes);
  let date = stringifyDate(employeePayrollObj._startDate).split(" ");
  console.log(date);
  setValue('#day',date[0]);
  setValue('#month',date[1]);
  setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      if(Array.isArray(value)){
          if(value.includes(item.value)){
              item.checked = true;
          }
      }
      else if (item.value === value)
          item.checked = true;
  });
}


const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}
