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

//
let okButton = document.querySelector(".ok-btn");

// hint div
let hint = document.querySelector(".hint");

let flashcardItems = [];
let count = 0;

//empty the form after submit
const emptyForm = () => {
  questionInput.value = "";
  answerInput.value = "";
};

// generate cards after submit or delete
const generateCard = () => {
  let cardNumber = 0;
  let cardsElement = document.querySelector(".cards-part");
  let cardContent = `<div class="cards">`;
  for (let i = 0; i < flashcardItems.length; i++) {
    cardNumber += 1;
    let cardId = flashcardItems[i].id;
    let cardQuestion = flashcardItems[i].question;
    let cardAnswer = flashcardItems[i].answer;
    cardContent =
      cardContent +
      ` <div class="card" id="${cardNumber}">
    <div class="card-id"><span id="card-id-number">${cardNumber}</span>-</div>
          <div class="question">${cardQuestion}</div>
          <div class="answer">${cardAnswer}</div>
          <button type="button" class="btn edit-btn" onClick="editCard(event, ${cardNumber}, ${cardId})">
            <img src="./images/pencil.svg" alt="edit button" />
          </button>
          <button type="button" class="btn delete-btn" onClick="deleteCard(event, ${cardId})">
            <img src="./images/eraser.svg" alt="delete button"  />
          </button>
        </div>`;
  }
  cardContent = cardContent + `</div>`;
  cardsElement.innerHTML = cardContent;
  hint.style.display = "flex";
};

//get user's input and generate cards
const getCardInput = (event) => {
  event.preventDefault();
  count += 1;
  let flashcardItem = {
    id: count,
    question: questionInput.value,
    answer: answerInput.value,
  };

  flashcardItems.push(flashcardItem);
  flashcardItems.sort(cmpId);
  function cmpId(a, b) {
    return a.id - b.id;
  }
  generateCard();
  emptyForm();
};

//edit selected card
const editCard = (event, cardNumber, cardId) => {
  let previousAnswer = flashcardItems[cardNumber - 1].answer;
  let previousQuestion = flashcardItems[cardNumber - 1].question;
  event.preventDefault();
  const cardToDelete = flashcardItems.findIndex(
    (flashcardItem) => flashcardItem.id === cardId
  );
  flashcardItems.splice(cardToDelete, 1);
  document.getElementById(`${cardNumber}`).innerHTML = ` 
    <div class="card-id"><span id="card-id-number">${cardNumber}</span>-</div>
          <input
          value="${previousQuestion}"
            type="text"
            id="edit-q-input-${cardNumber}"
            placeholder="Write your question"
            autocomplete="off"
          />
          <input
                    value="${previousAnswer}"
            type="text"
            id="edit-a-input-${cardNumber}"
            placeholder="The answer is..."
            autocomplete="off"
          />
          <button type="button" class="btn ok-btn" >
            <img src="./images/thick.svg" alt="thick button"  onClick="submitEditCard(event, ${cardNumber} ,${cardId})"/>
          </button>
          <button type="button" class="btn delete-btn" onClick="deleteCard(event, ${cardId})">
            <img src="./images/eraser.svg" alt="delete button"  />
          </button>
        `;
};

//submit edit card and generate single card
const submitEditCard = (event, cardNumber, cardId) => {
  event.preventDefault();
  let flashcardItem = {
    id: cardId,
    question: document.getElementById(`edit-q-input-${cardNumber}`).value,
    answer: document.getElementById(`edit-a-input-${cardNumber}`).value,
  };
  flashcardItems.push(flashcardItem);
  let cardQuestion = flashcardItem.question;
  let cardAnswer = flashcardItem.answer;
  document.getElementById(`${cardNumber}`).innerHTML = `
     <div class="card-id"><span id="card-id-number">${cardNumber}</span>-</div>
          <div class="question">${cardQuestion}</div>
          <div class="answer">${cardAnswer}</div>
          <button type="button" class="btn edit-btn" onClick="editCard(event, ${cardNumber}, ${cardId})">
            <img src="./images/pencil.svg" alt="edit button" />
          </button>
          <button type="button" class="btn delete-btn" onClick="deleteCard(event, ${cardId})">
            <img src="./images/eraser.svg" alt="delete button"  />
          </button>
        </div>`;
};

// find the selected card and delete it from flashcardItems list and generate new cards
const deleteCard = (event, cardId) => {
  event.preventDefault();
  const cardToDelete = flashcardItems.findIndex(
    (flashcardItem) => flashcardItem.id === cardId
  );

  flashcardItems.splice(cardToDelete, 1);
  generateCard();
  if (flashcardItems.length === 0) {
    hint.style.display = "none";
  }
};

qaForm.addEventListener("submit", getCardInput);
