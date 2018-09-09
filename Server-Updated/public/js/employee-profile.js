// Delete employee method
document
  .querySelector('.delete-employee-button')
  .addEventListener('click', removeEmployee);

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
