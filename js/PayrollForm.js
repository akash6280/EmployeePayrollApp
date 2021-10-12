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
          textError.textContent = "";
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
  const day  = document.querySelector('#day');
  const month  = document.querySelector('#month');
  const year  = document.querySelector('#year');
  const startDate = document.querySelector('.startDate');
  startDate.addEventListener('input', function(){
      let date=new Date(year.value, month.value-1, day.value);
      try{
          (new EmployeePayrollData()).startDate = date;
          dateError.textContent = "";
      } catch(e) {
      dateError.textContent = e;
    }
  });
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
  alert(employeePayrollList.toString());
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
  employeePayrollData.name = getInputValueById('#name');
  employeePayrollData.profile = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.notes = getInputValueById('#notes');
  let year = getInputValueById('#year');
  let month = getInputValueById('#month') - 1;
  let day = getInputValueById('#day');
  try {
    employeePayrollData.startDate = new Date(year, month, day);
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
