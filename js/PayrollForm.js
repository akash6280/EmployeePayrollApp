var output = document.querySelector(".salary-output");
var salary = document.querySelector("#salary");
salary.addEventListener("input", function () {
  output.textContent = salary.value;
});

const save = (event) => {
  let employeePayrollData;
  try {
      employeePayrollData = createEmployeePayroll();
  } catch (e) {
      return;
  }
}

const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  employeePayrollData.name = getInputValueById('#name');
  employeePayrollData.profile = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.notes = getInputValueById('#notes');
  let year = getInputValueById('#year');
  let month = parseInt(getInputValueById('#month')) - 1;
  let day = getInputValueById('#day');
  employeePayrollData.startDate = new Date(year, month, day);
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