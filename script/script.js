let currentDate = new Date();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = currentDate.getDate();
let day = days[currentDate.getDay()];
let month = months[currentDate.getMonth()];
let year = currentDate.getFullYear();

let dateTitle = document.getElementById("current-date");
dateTitle.innerHTML = `${day} , ${date} ${month} ${year}`;
