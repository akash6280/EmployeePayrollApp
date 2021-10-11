var output = document.querySelector(".salary-output");
var salary = document.querySelector("#salary");
salary.addEventListener("input", function () {
  output.textContent = salary.value;
});
