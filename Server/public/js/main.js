document.querySelectorAll(".delete-student").forEach(btn => {
  btn.addEventListener("click", e => {
    const id = e.target.getAttribute("data-id");
    alert("deleting " + id);
  });
});

document.querySelector("#comment-button").addEventListener("click", e => {
  $(".ui.accordion").accordion();
});
document.querySelector(".circular-button").addEventListener("click", () => {
  $("#question-form-modal").modal("show");
});
