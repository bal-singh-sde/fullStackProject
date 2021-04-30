const API = "https://workout-planner-team2.herokuapp.com/";

document.getElementById("userForm").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  if (document.getElementById("desc")) {
    removeDestination(document.getElementById("desc"));
  }

  const age = e.target.age.value;
  const height = Math.round(
    lengthConverterFeet(e.target.height.value) +
      lengthConverterInches(e.target.heightInches.value)
  );
  const weight = weightConverter(e.target.weight.value);
  const activity = e.target.activity.value;
  const gender = e.target.gender.value;
  const calculate = e.target.calculate.value;
  const neck = lengthConverterInches(e.target.neck.value);
  const waist = lengthConverterInches(e.target.waist.value);
  const hip = lengthConverterInches(e.target.hip.value);

  document.getElementById("userForm").reset();

  if (calculate === "bmi") {
    var options = {
      method: "GET",
      url: "https://workout-planner-team2.herokuapp.com/bmi",
      params: {
        age: age,
        height: height,
        weight: weight,
      },
    };

    axios
      .request(options)
      .then((data) => display(data))
      .catch((err) => console.log(err));

    function display(data) {
      const cardCont = document.getElementById("cardCont");
      const newCardCont = document.createElement("div");
      newCardCont.setAttribute("class", "col-md-3 calories-card m-2");
      newCardCont.setAttribute("id", "newCardCont");
      cardCont.appendChild(newCardCont);

      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card text-center");
      newCard.setAttribute(
        "style",
        "width: 50rem; box-shadow: 2px 2px 2px 2px gray;"
      );
      newCardCont.appendChild(newCard);

      const cardTitle = document.createElement("h5");
      cardTitle.innerHTML = `BMI = ${Math.round(data.data.results.bmi)}`;
      cardTitle.setAttribute("class", "card-title");
      newCard.appendChild(cardTitle);

      const desc = document.createElement("p");
      desc.setAttribute("class", "card-text");
      desc.setAttribute("id", "desc");
      desc.innerText = `Healthy bmi range = ${data.data.results.healthy_bmi_range}`;
      newCard.appendChild(desc);
    }
  } else if (calculate === "calorie") {
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
      .then((data) => display0(data.data.calories))
      .catch((err) => console.log(err));

    function display0(data) {
      const cardCont = document.getElementById("cardCont");
      const newCardCont = document.createElement("div");
      newCardCont.setAttribute("class", "col-md-3 calories-card m-2");
      newCardCont.setAttribute("id", "newCardCont");
      cardCont.appendChild(newCardCont);

      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card-body text-center");
      newCard.setAttribute(
        "style",
        "width: 50rem; box-shadow: 2px 2px 2px 2px gray;"
      );
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
  } else if (calculate === "advanced") {
    var options = {
      method: "GET",
      url: "https://workout-planner-team2.herokuapp.com/bodyFat",
      params: {
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        activity: activity,
        neck: neck,
        waist: waist,
        hip: hip,
      },
    };

    axios
      .request(options)
      .then((data) => display1(data))
      .catch((err) => console.log(err));

    function display1(data) {
      const cardCont = document.getElementById("cardCont");
      const newCardCont = document.createElement("div");
      newCardCont.setAttribute("class", "col-md-3 calories-card m-2");
      newCardCont.setAttribute("id", "newCardCont");
      cardCont.appendChild(newCardCont);

      const newCard = document.createElement("div");
      newCard.setAttribute("class", "card-body text-center");
      newCard.setAttribute(
        "style",
        "width: 50rem; box-shadow: 2px 2px 2px 2px gray;"
      );
      newCardCont.appendChild(newCard);

      const cardTitle = document.createElement("h5");
      cardTitle.innerHTML = `Body Fat Mass = ${Math.round(
        data.data.results["Body Fat Mass"]
      )} -- Lean Body Mass = ${Math.round(
        data.data.results["Lean Body Mass"]
      )} -- Body Fat (BMI method) = ${Math.round(
        data.data.results["Body Fat (BMI method)"]
      )}`;
      cardTitle.setAttribute("class", "card-title");
      newCard.appendChild(cardTitle);

      const desc = document.createElement("p");
      desc.setAttribute("class", "card-text");
      desc.setAttribute("id", "desc");
      desc.innerText = `${data.data.results["Message"]}`;
      newCard.appendChild(desc);
    }
  }

  function removeDestination(event) {
    var cardBody = event.parentElement;
    var card = cardBody.parentElement;
    card.remove();
  }

  // lbs to kg
  function weightConverter(valNum) {
    return valNum / 2.2046;
  }

  //feet to cm
  function lengthConverterFeet(valNum) {
    return valNum / 0.032808;
  }

  // inches to cm
  function lengthConverterInches(valNum) {
    return valNum / 0.3937;
  }
}
