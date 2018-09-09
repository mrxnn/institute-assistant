// Delete course method
document
  .querySelector('.delete-course-button')
  .addEventListener('click', removeCourse);

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
