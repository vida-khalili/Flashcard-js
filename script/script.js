//Date in title part
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

//Form
let qaForm = document.querySelector(".qa-input-form");

//the Question input
let questionInput = document.getElementById("question-input");

//the Answer input
let answerInput = document.getElementById("answer-input");

//Add button
let addButton = document.querySelector(".submit-btn");

//Delete button
let deleteButton = document.querySelector(".delete-btn");

//Edit button
let editButton = document.querySelector(".edit-btn");

let flashcardItems = [];
let count = 0;

const getCardInput = (event) => {
  event.preventDefault();
  count += 1;
  let flashcardItem = {
    id: count,
    question: questionInput.value,
    answer: answerInput.value,
  };

  flashcardItems.push(flashcardItem);
  console.log(flashcardItems);
  let cardsElement = document.querySelector(".cards-part");
  let cardContent = `<div class="cards" aria-hidden="false">`;
  for (let i = 0; i < flashcardItems.length; i++) {
    let cardId = flashcardItems[i].id;
    let cardQuestion = flashcardItems[i].question;
    let cardAnswer = flashcardItems[i].answer;
    cardContent =
      cardContent +
      ` <div class="card">
    <div class="card-id"><span id="card-id-number">${cardId}</span>-</div>
          <div class="question">${cardQuestion}</div>
          <div class="answer">${cardAnswer}</div>
          <button type="button" class="btn edit-btn">
            <img src="./images/pencil.svg" alt="edit button" />
          </button>
          <button type="button" class="btn delete-btn">
            <img src="./images/eraser.svg" alt="delete button" />
          </button>
        </div>`;
  }
  cardContent = cardContent + `</div>`;
  cardsElement.innerHTML = cardContent;
};

qaForm.addEventListener("submit", getCardInput);
