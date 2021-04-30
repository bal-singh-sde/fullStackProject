const WGER_API_EXERCISE = "https://wger.de/api/v2/exercise";
const YOUTUBE = "https://www.youtube.com/results?search_query=";

let exerciseFormInfo = document.querySelector("#exercise-info");
exerciseFormInfo.addEventListener("submit", handleFormSubmit);

let equipArr = [];
const cardCont = document.querySelector("#card-container")

async function handleFormSubmit(evt) {
  evt.preventDefault();
  const muscleGroup = exerciseFormInfo.musclegroupradio.value;
  const equipment = document.querySelectorAll('input[type="checkbox"]:checked');
  for (var i = 0; i < equipment.length; i++) {
    equipArr.push(equipment[i].value);
  }
  const equipParam = equipArr.toString();
  const params = `?language=2&musclescategory=${muscleGroup}&equipment=${equipParam}`;

  axios
    .get(WGER_API_EXERCISE + params)
    .then((res) => display(res.data.results));
}

async function display(exercise) {
  cardCont.innerHTML = "";
  for (var i = 0; i < exercise.length; i++) {
    newCard(exercise[i]);
  }
}

function newCard(exercise) {
  const name = exercise.name;
  const description = exercise.description;
  const video = YOUTUBE + name;

  const newCardCont = document.createElement("div");
  newCardCont.setAttribute("class", "col-md-3 exercise-card m-2");
  cardCont.appendChild(newCardCont);

  const newCard = document.createElement("div");
  newCard.setAttribute("class", "card-body text-center");
  newCardCont.appendChild(newCard);

  const cardTitle = document.createElement("h5");
  cardTitle.innerHTML = name;
  cardTitle.setAttribute("class", "card-title")
  newCard.appendChild(cardTitle);

  const desc = document.createElement("p");
  desc.setAttribute("class", "card-text");
  desc.innerHTML = description;
  newCard.appendChild(desc);

  const vidLink = document.createElement("a")
  vidLink.setAttribute("class", "btn btn-primary");
  vidLink.setAttribute("href", YOUTUBE + name);
  vidLink.setAttribute("target", "_blank")
  vidLink.innerHTML = "Show Me How!"
  newCard.appendChild(vidLink)
}

