let employeePayrollDataList;
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
                              <td>${employeePayrollData._startDate}</td>
                              <td>
                                   <img name="${employeePayrollData._id}" src="/assets/design-icons/delete_black_24dp.svg" alt="delete" id="1" class="actions"
                                        onclick="remove(this)">
                                   <img name="${employeePayrollData._id}" src="/assets/design-icons/edit_black_24dp.svg" alt="edit" id="2" class="actions"
                                        onclick="update(this)">
                              </td>
                         </tr>
          `;
     }
     console.log("Working11")
     document.querySelector("#display").innerHTML = innerHTMLData;
}

const getHTMLDepartment = (deptList) => {
     let deptHTML = ''
     for (const dept of deptList) {
          deptHTML = `${deptHTML} <div class="dept-label">${dept}</div>`
     }
     return deptHTML;
}