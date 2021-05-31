window.addEventListener("DOMContentLoaded", () => {

  const name = document.querySelector("#name");
  const nameError = document.querySelector(".name-error");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      nameError.textContent = "";
    } else {
      try {
        (new EmployeePayrollData).name = name.value;
        nameError.textContent = "";
      } catch (error) {
        nameError.textContent = error;
      }
    }
  });

  const salary = document.querySelector("#salary");
  const output = document.querySelector(".salary-output");
  salary.oninput = function () {
    output.textContent = salary.value;
  };
});

const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
  } catch (submitError) {
    alert(submitError);
    return;
  }
};

function createAndUpdateStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

  if (employeePayrollList != undefined) {
    employeePayrollList.push(employeePayrollData)
  } else {
    employeePayrollList = [employeePayrollData];
  }

  alert("Store in Local Storage...!!!")
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();

  employeePayrollData.name = getValue("#name");
  employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
  employeePayrollData.profilePicture = getSelectedValues("[name=profile]").pop();
  employeePayrollData.salary = getValue("#salary");
  dateString = document.querySelector("#month").value + " " + document.querySelector("#day").value + ", " + document.querySelector("#year").value;
  employeePayrollData.startDate = new Date(dateString);
  employeePayrollData.note = getValue("#notes");
  try {
    employeePayrollData.departments = getSelectedValues("[name=department]");
  } catch (error) {
    alert(error);
    return;
  }
  alert("Employee Added Successfully!\n" + employeePayrollData.toString());
  return employeePayrollData;
}

const getSelectedValues = (propertyName) => {
  let allValues = document.querySelectorAll(propertyName);
  let selectedValues = [];
  allValues.forEach(input => {
    if (input.checked) selectedValues.push(input.value);
  });
  return selectedValues;
};

const getValue = (propertyId) => {
  let value = document.querySelector(propertyId).value;
  return value;
};