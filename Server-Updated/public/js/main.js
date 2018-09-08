// Delete students method
document
  .querySelector('.delete-student-button')
  .addEventListener('click', removeStudent);

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
