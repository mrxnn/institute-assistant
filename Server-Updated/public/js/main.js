// UI vars
const loginBtns = document.querySelectorAll('.login-button');
const loginForm = document.querySelector('#login-form');
const deleteStudentBtn = document.querySelector('.delete-student-button');
const deleteCourseBtn = document.querySelector('.delete-course-button');
const deleteEmployeeBtn = document.querySelector('.delete-employee-button');

// Add event listeners
if (deleteStudentBtn != null) deleteStudentBtn.addEventListener('click', removeStudent);
if (deleteCourseBtn != null) deleteCourseBtn.addEventListener('click', removeCourse);
if (deleteEmployeeBtn != null) deleteEmployeeBtn.addEventListener('click', removeEmployee);

// Function to display the login modal
loginBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    $('.ui.modal').modal('show');
  });
});

// Function to navigate to the dashboard when logged in
loginForm.addEventListener('submit', e => {
  window.location.href = '/dashboard';
  e.preventDefault();
});


// Function to remove course
function removeCourse(e) {
  const id = e.target.getAttribute('data-id');
  if (confirm('Are you sure you want to delete')) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/courses/delete/${id}`, true);
    xhr.onload = () => {
      console.log(JSON.parse(xhr.responseText).message);
      window.location.href = '/courses';
    };
    xhr.send();
  }
}

// Function to remove employee
function removeEmployee(e) {
  const id = e.target.getAttribute('data-id');
  if (confirm('Are you sure you want to delete')) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/employees/delete/${id}`, true);
    xhr.onload = () => {
      console.log(JSON.parse(xhr.responseText).message);
      window.location.href = '/employees';
    };
    xhr.send();
  }
}

// Function to remove student
function removeStudent(e) {
  const id = e.target.getAttribute('data-id');
  if (confirm('Are you sure you want to delete')) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', `/students/delete/${id}`, true);
    xhr.onload = () => {
      console.log(JSON.parse(xhr.responseText).message);
      window.location.href = '/students';
    };
    xhr.send();
  }
}
