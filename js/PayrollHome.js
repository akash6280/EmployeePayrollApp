window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
  });

const createInnerHtml = () => {
    const headerHtml = `<tr>
                        <th></th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Start Date</th>
                        <th>Actions</th>
                        </tr>`;
    let innerHtml=`${headerHtml}`;
    let employeePayrollList=createEmployeePayrollJSON();
    for(const employeePayrollData of employeePayrollList){              
        innerHtml = `${innerHtml}
                        <tr>
                            <td><img class="profile" alt="" src="${employeePayrollData._profile}"></td>
                            <td>${employeePayrollData._name}</td>
                            <td>${employeePayrollData._gender}</td>
                            <td>${getDeptHtml(employeePayrollData._department)}
                            </td>
                            <td>${employeePayrollData._salary}</td>
                            <td>${employeePayrollData._startDate}</td>
                            <td>
                                <img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                                <img id="1" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
                            </td>
                        </tr>
                      `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
};

const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
        {
            _name: "Kobe",
            _gender: "Male",
            _department: ["Finance", "Engineering"],
            _salary: "500000",
            _startDate: "29 Oct 2019",
            _note: "",
            _id: new Date().getTime(),
            _profile: "../assets/profile-images/Ellipse -2.png",
        },
        {
            _name: "Amarpa",
            _gender: "Female",
            _department: ["Sales"],
            _salary: "510000",
            _startDate: "1 Dec 2020",
            _note: "",
            _id: new Date().getTime() + 1,
            _profile: "../assets/profile-images/Ellipse -1.png",
        },
    ];
    return employeePayrollListLocal;
};

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
    }
    return deptHtml;
};