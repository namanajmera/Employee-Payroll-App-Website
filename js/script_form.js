let isUpdate = false
let employeePayrollObj = {};
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

  checkForUpdate();
});

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setEmployeePayrollObject();
    if (site_properties.use_local_storage.match("true")) {
      createAndUpdateStorage();
      resetForm();
      window.location.replace(site_properties.home_page)
    }
    else {
      createOrUpda
    }
  } catch (submitError) {
    alert(submitError);
    return;
  }
};

const setEmployeePayrollObject = () => {
  if (!isUpdate && site_properties.use_local_storage.match("true")) {
    employeePayrollObj.id = createEmployeeId();
  }
  employeePayrollObj._name = getValue("#name");
  employeePayrollObj._profilePicture = getSelectedValues("[name=profile]").pop();
  employeePayrollObj._gender = getSelectedValues("[name=gender]").pop();
  employeePayrollObj._salary = getValue("#salary");
  employeePayrollObj._note = getValue("#notes");
  let dateString = getValue("#day") + " " + getValue("#month") + " " + getValue("#year");
  employeePayrollObj._startDate = new Date(dateString);
  employeePayrollObj._departments = getSelectedValues("[name=department]");
};

const createAndUpdateStorage = () => {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList) {
    let employeePayrollData = employeePayrollList.find(empData => empData.id == employeePayrollObj.id);
    if (!employeePayrollData) {
      employeePayrollList.push(employeePayrollObj);
    } else {
      const index = employeePayrollList.map(empData => empData.id)
        .indexOf(employeePayrollData.id);
      employeePayrollList.splice(index, 1, employeePayrollObj);
    }
  } else {
    employeePayrollList = [employeePayrollObj];
  }

  alert("Store in Local Storage...!!!")
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeeId = () => {
  let employeeId = localStorage.getItem("EmployeeID");
  employeeId = !employeeId ? 1 : (parseInt(employeeId) + 1).toString();
  localStorage.setItem("EmployeeID", employeeId);
  return employeeId;
};


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

const resetForm = () => {
  setDefaultValue("#name", "");
  unsetSelectedValues("[name=profile]");
  unsetSelectedValues("[name=gender]");
  unsetSelectedValues("[name=department]");
  resetRange("#salary", ".salary-output");
  setDefaultValue("#day", "1");
  setDefaultValue("#month", "January");
  setDefaultValue("#year", "2020");
  setDefaultValue("#notes", "");
};

const setDefaultValue = (propertyId, value) => {
  const element = document.querySelector(propertyId);
  element.value = value;
};

const unsetSelectedValues = (propertyName) => {
  allValues = document.querySelectorAll(propertyName);
  allValues.forEach(input => input.checked == false);
};

const resetRange = (propertyId, outputId) => {
  const rangeElement = document.querySelector(propertyId);
  rangeElement.value = 400000;
  const outputElement = document.querySelector(outputId);
  outputElement.textContent = 400000;
};

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp')
  isUpdate = employeePayrollJson ? true : false
  if (!isUpdate) return
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm()
}

const setForm = () => {
  setValue("#name", employeePayrollObj._name);
  setSelectedValues("[name=profile]", employeePayrollObj._profilePicture);
  setSelectedValues("[name=gender]", employeePayrollObj._gender);
  setSelectedValues("[name=department]", employeePayrollObj._departments);
  setRange("#salary", ".salary-output", employeePayrollObj._salary);
  setValue("#notes", employeePayrollObj._note);
  let date = stringifyDate(employeePayrollObj._startDate).split(" ");
  setValue("#day", date[0]);
  setValue("#month", date[1]);
  setValue("#year", date[2]);
}

const stringifyDate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
  return newDate;
}

const setValue = (propertyId, value) => {
  const element = document.querySelector(propertyId);
  element.value = value;
};

const setSelectedValues = (propertyName, values) => {
  let allValues = document.querySelectorAll(propertyName);
  allValues.forEach(input => {
    if (Array.isArray(values)) {
      if (values.includes(input.value)) {
        input.checked = true;
      }
    } else if (input.value == values) {
      input.checked = true;
    }
  });
};

const setRange = (propertyId, outputId, rangeValue) => {
  const rangeElement = document.querySelector(propertyId);
  rangeElement.value = rangeValue;
  const outputElement = document.querySelector(outputId);
  outputElement.textContent = rangeElement.value;
};