window.addEventListener("DOMContentLoaded", (event) => {
     createInnerHTML();
})

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
     let employeePayrollData= createEmployeePayrollJSON()[0];
     const innerHTMLData = `
     ${headerHTML}
                    <tr>
                         <td><img src="${employeePayrollData._profilePic}" alt="" class="profile"></td>
                         <td>${employeePayrollData._name}</td>
                         <td>${employeePayrollData._salary}</td>
                         <td>
                              <div class="dept-label">${employeePayrollData._department[0]}</div>
                              <div class="dept-label">${employeePayrollData._department[1]}</div>
                         </td>
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
     document.querySelector("#display").innerHTML = innerHTMLData;
}


// JSON Data
const createEmployeePayrollJSON = () =>{
     let employeePayrollListLocal=[
          {
               _name: "Naman Ajmera",
               _gender : "Male",
               _department:[
                    "HR",
                    "Engineering"
               ],
               _salary: "3000000",
               _startDate: "29 Oct 2020",
               _note:'',
               _id:new Date().getTime(),
               _profilePic:"/assets/profile-images/Ellipse -2.png"
          },
          {
               _name: "Anuradha Duriya",
               _gender : "Female",
               _department:[
                    "HR"
               ],
               _salary: "4000000",
               _startDate: "29 Nov 2020",
               _note:'',
               _id:new Date().getTime()+1,
               _profilePic:"/assets/profile-images/Ellipse 1.png"
          }
     ];
     return employeePayrollListLocal;
}