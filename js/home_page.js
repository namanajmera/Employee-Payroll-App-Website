window.addEventListener("DOMContentLoaded", (event) => {
     createInnerHTML();
})

const createInnerHTML = () => {
     const headerHTML = `
     <tr>
          <th></th>
          <th>Name</th>
          <th>Gender</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Start Date</th>
          <th>Actions</th>
     </tr>
     `
     const innerHTML = `${headerHTML}
                    <tr>
                         <td><img src="/assets/profile-images/Ellipse -2.png" alt="" class="progile"></td>
                         <td>Naman Ajmera</td>
                         <td>Male</td>
                         <td>
                              <div class="dept-label">HR</div>
                              <div class="dept-label">Finance</div>
                         </td>
                         <td>₹ 3000000</td>
                         <td>1 Nov 2020</td>
                         <td>
                              <img src="/assets/design-icons/delete_black_24dp.svg" alt="delete" id="1" class="actions"
                                   onclick="remove(this)">
                              <img src="/assets/design-icons/edit_black_24dp.svg" alt="edit" id="2" class="actions"
                                   onclick="update(this)">
                         </td>
                    </tr>
     `
     document.querySelector("#display").innerHTML = innerHTML;
}