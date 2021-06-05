let employeePayrollDataList;
let site_properties = {
     home_page: "../pages/employee_payroll_home.html",
     add_emp_payroll_page: "../pages/employee_payroll_form.html"
}
window.addEventListener("DOMContentLoaded", (event) => {
     employeePayrollDataList = getEmployeePayrollDataFromStorage();
     document.querySelector(".emp-count").innerHTML = employeePayrollDataList.length;
     createInnerHTML();
     localStorage.removeItem('editEmp')
})

const getEmployeePayrollDataFromStorage = () => {
     return localStorage.getItem('EmployeePayrollList') ?
          JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

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
                              <td>${employeePayrollData._salary}</td>
                              <td>${getHTMLDepartment(employeePayrollData._departments)}</td>
                              <td>₹ ${employeePayrollData._salary}</td>
                              <td>${stringifyDate(employeePayrollData._startDate)}</td>
                              <td>
                                   <img id="${employeePayrollData._id}" src="/assets/design-icons/delete_black_24dp.svg" alt="delete" class="actions"
                                        onclick="remove(this)">
                                   <img id="${employeePayrollData._id}" src="/assets/design-icons/edit_black_24dp.svg" alt="edit" class="actions"
                                        onclick="update(this)">
                              </td>
                         </tr>
          `;
     }
     document.querySelector("#display").innerHTML = innerHTMLData;
}

const getHTMLDepartment = (deptList) => {
     let deptHTML = ''
     for (const dept of deptList) {
          deptHTML = `${deptHTML} <div class="dept-label">${dept}</div>`
     }
     return deptHTML;
}

const remove = (node) => {
     let employeePayrollData = employeePayrollDataList.find(empData => empData._id == node.id);
     if (!employeePayrollData) return
     const index = employeePayrollDataList.map(empData => empData._id)
          .indexOf(employeePayrollData._id);
     employeePayrollDataList.splice(index, 1);
     localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollDataList));
     document.querySelector(".emp-count").innerHTML = employeePayrollDataList.length;
     createInnerHTML();
}

const update = (node) => {
     let employeePayrollData = employeePayrollDataList.find(empData => empData._id == node.id);
     if (!employeePayrollData) return
     localStorage.setItem('editEmp', JSON.stringify(employeePayrollData))
     window.location.replace(site_properties.add_emp_payroll_page)
}

const stringifyDate = (date) => {
     const options = { day: 'numeric', month: 'short', year: 'numeric' };
     const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
     return newDate;
}
