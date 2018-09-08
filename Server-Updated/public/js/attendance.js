// A class that helps making Http requests
class Http {
  get(url) {
    return new Promise((resolve, reject) => {
      return fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject("Error: " + err));
    });
  }
}

// UI variables
const studentButton = document.querySelector("#student-attendance-button");
const employeeButton = document.querySelector("#employee-attendance-button");
const resetButton = document.querySelector("#reset-attendance-button");

// function to attach event listeners
(function loadEventListeners() {
  studentButton.addEventListener("click", e => loadTable("Student", e));
  employeeButton.addEventListener("click", e => loadTable("Employee", e));
  resetButton.addEventListener("click", e => resetTable(e));
})();

// Hide the attendance table
function resetTable(e) {
  document.querySelector("#inject").innerHTML = "";
  e.preventDefault();
}

// load all the students and employees in a layout
function loadTable(type, e) {
  // holds the data for one row
  let output = "";

  // http request handler object
  let http = new Http();

  // determine the json file
  let location = type === "Student" ? "students.json" : "employees.json";

  // load the json data from file
  http.get(`data/${location}`).then(data => {
    // build the template row for each student
    data.forEach(student => {
      output += `
        <tr>
          <td>
            <h4 class="ui image header">
              <img src="${student.img_url}" class="ui mini rounded image">
              <div class="content">
                ${student.name}
                <div class="sub header"> ${student.id}
                </div>
              </div>
            </h4>
          </td>
          <td>${student.phone}</td>
          <td>${new Date().toDateString()}</td>
          <td class="right aligned">
            <a href="user-profile.html" class="ui button blue present-btn">Present</a>
            <a href="user-profile.html" class="ui button red absent-btn">Absent</a>
          </td>
        </tr>
      `;
    });

    // whole table template
    let template = `
      <h3 class='heading-tertiary'>${type} Attendance</h3>
      <table class="ui table">
        <thead>
          <tr>
            <th>${type}</th>
            <th>Phone</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${output}
        </tbody>
        <tfoot>
          <tr>
            <th colspan="5">
              <div class="ui right floated pagination menu">
                <a class="icon item">
                  <i class="left chevron icon"></i>
                </a>
                <a class="item active">1</a>
                <a class="item">2</a>
                <a class="item">3</a>
                <a class="item">4</a>
                <a class="icon item">
                  <i class="right chevron icon"></i>
                </a>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    `;

    // insert the table into attendance page
    document.querySelector("#inject").innerHTML = template;

    // prevent the anchors default behavior
    e.preventDefault();
  });
}
