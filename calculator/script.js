const API = "https://workout-planner-team2.herokuapp.com/";

document.getElementById("userForm").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  if (document.getElementById("desc")) {
    removeDestination(document.getElementById("desc"));
  }
  e.preventDefault();

  const age = e.target.age.value;
  const height = e.target.height.value;
  const weight = e.target.weight.value;
  const activity = e.target.activity.value;
  const gender = e.target.gender.value;
  const calculate = e.target.calculate.value;

  resetFormValues(e.target);

  if (calculate === "bmi") {
    var options = {
      method: "GET",
      url: "https://workout-planner-team2.herokuapp.com/bmi",
      params: {
        age: age,
        // gender: gender,
        height: height,
        weight: weight,
        // activity: activity,
      },
    };

    axios
      .request(options)
      .then((data) => display(data))
      .catch((err) => console.log(err));

    function display(data) {
      console.log(data.calories);

      const cardCont = document.getElementById("cardCont");
      const newCardCont = document.createElement("div");
      newCardCont.setAttribute("class", "col-md-3 calories-card m-2");
      newCardCont.setAttribute("id", "newCardCont");
      newCardCont.setAttribute(
        "style",
        "max-width: 50rem; margin: auto; border: 3px solid rgb(51, 51, 51); width: 50%; margin-top: 30px; min-width: 20rem;"
      );
      cardCont.appendChild(newCardCont);

      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card-body text-center");
      newCardCont.appendChild(newCard);

      const cardTitle = document.createElement("h5");
      cardTitle.innerHTML = `BMI = ${Math.round(data.data.results.bmi)}`;
      cardTitle.setAttribute("class", "card-title");
      newCard.appendChild(cardTitle);

      const desc = document.createElement("p");
      desc.setAttribute("class", "card-text");
      desc.innerText = `Healthy bmi range = ${data.data.results.healthy_bmi_range}`;
      newCard.appendChild(desc);
    }
  } else {
    var options = {
      method: "GET",
      url: "https://workout-planner-team2.herokuapp.com/calculator",
      params: {
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        activity: activity,
      },
    };

    axios
      .request(options)
      .then((data) => display(data.data.calories))
      .catch((err) => console.log(err));

    function display(data) {
      console.log(data.calories);

      const cardCont = document.getElementById("cardCont");
      const newCardCont = document.createElement("div");
      newCardCont.setAttribute("class", "col-md-3 calories-card m-2");
      newCardCont.setAttribute("id", "newCardCont");
      newCardCont.setAttribute(
        "style",
        "max-width: 50rem; margin: auto; border: 3px solid rgb(51, 51, 51); width: 50%; margin-top: 30px; min-width: 20rem;"
      );
      cardCont.appendChild(newCardCont);

      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card-body text-center");
      newCardCont.appendChild(newCard);

      const cardTitle = document.createElement("h5");
      cardTitle.innerHTML = `Calories = ${data}`;
      cardTitle.setAttribute("class", "card-title");
      newCard.appendChild(cardTitle);

      const desc = document.createElement("p");
      desc.setAttribute("class", "card-text");
      desc.setAttribute("id", "desc");
      desc.innerText = `calories you'll burn`;
      newCard.appendChild(desc);
    }
  }
}

function resetFormValues(form) {
  // Go through all the form values and reset their values

  for (var i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

function removeDestination(event) {
  var cardBody = event.parentElement;
  var card = cardBody.parentElement;
  card.remove();
}
