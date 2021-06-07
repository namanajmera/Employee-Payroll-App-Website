let employeePayrollDataList;
window.addEventListener("DOMContentLoaded", (event) => {
     if (site_properties.use_local_storage.match("true")) {
          getEmployeePayrollDataFromStorage();
     } else
          getEmployeePayrollDataFromServer();
})

const getEmployeePayrollDataFromStorage = () => {
     employeePayrollDataList = localStorage.getItem("EmployeePayrollList") ?
          JSON.parse(localStorage.getItem("EmployeePayrollList")) : []
     processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () => {
     document.querySelector(".emp-count").innerHTML = employeePayrollDataList.length;
     createInnerHTML();
     localStorage.removeItem('editEmp')
}

const getEmployeePayrollDataFromServer = () => {
     makeServiceCall("GET", site_properties.server_url, true)
          .then(responseText => {
               employeePayrollDataList = JSON.parse(responseText);
               processEmployeePayrollDataResponse();
          })
          .catch(error => {
               console.log("GET Error Status : " + JSON.stringify(error));
               employeePayrollDataList = [];
               processEmployeePayrollDataResponse();
          });
};

const createInnerHTML = () => {
     const headerHTML = `
     <th></th>
     <th>Name</th>
     <th>Gender</th>
     <th>Department</th>
     <th>Salary</th>
     <th>Start Date</th>
     <th>Actions</th>
     `
     if (employeePayrollDataList.length == 0)
          return
     let innerHTMLData = `${headerHTML}`
     for (const employeePayrollData of employeePayrollDataList) {
          innerHTMLData = `${innerHTMLData}
          <tr>
               <td><img src="${employeePayrollData._profilePicture}" alt="" class="profile"></td>
               <td>${employeePayrollData._name}</td>
               <td>${employeePayrollData._gender}</td>
               <td>${getDepartmentHtml(employeePayrollData._departments)}</td>
               <td>₹ ${employeePayrollData._salary}</td>
               <td>${stringifyDate(employeePayrollData._startDate)}</td>
               <td>
                    <img id="${employeePayrollData.id}" src="/assets/design-icons/delete_black_24dp.svg" alt="delete" class="actions"
                         onclick="remove(this)">
                    <img id="${employeePayrollData.id}" src="/assets/design-icons/edit_black_24dp.svg" alt="edit" class="actions"
                         onclick="update(this)">
               </td>
          </tr>
          `;
     }
     document.querySelector("#display").innerHTML = innerHTMLData;
}

// const getHTMLDepartment = (deptList) => {
//      let deptHTML = ''
//      for (let dept of deptList) {
//           deptHTML = `${deptHTML} <div class="dept-label">${dept}</div>`
//      }
//      return deptHTML;
// }
const getDepartmentHtml = (departmentList) => {
     let departmentHtml = "";
     if (departmentList) {
          for (let department of departmentList) {
               departmentHtml = `${departmentHtml} <div class="dept-label">${department}</div>`;
          }
     }
     return departmentHtml;
};
const remove = (node) => {
     let employeePayrollData = employeePayrollDataList.find(empData => empData.id == node.id);
     if (!employeePayrollData) return
     const index = employeePayrollDataList.map(empData => empData.id)
          .indexOf(employeePayrollData.id);
     employeePayrollDataList.splice(index, 1);
     if (site_properties.use_local_storage.match("true")) {
          localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollDataList));
          document.querySelector(".emp-count").innerHTML = employeePayrollDataList.length;
          createInnerHTML();
     } else {
          const deleteURL = site_properties.server_url + employeePayrollData.id.toString();
          makeServiceCall("DELETE", deleteURL, false)
               .then(responseText => {
                    createInnerHTML();
               }).catch(error => {
                    console.log("Delete Error Status " + JSON.stringify(error))
               })
     }
}

const update = (node) => {
     let employeePayrollData = employeePayrollDataList.find(empData => empData.id == node.id);
     if (!employeePayrollData) return
     localStorage.setItem('editEmp', JSON.stringify(employeePayrollData))
     window.location.replace(site_properties.add_emp_payroll_page)
}

const stringifyDate = (date) => {
     const options = { day: 'numeric', month: 'short', year: 'numeric' };
     const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
     return newDate;
}
