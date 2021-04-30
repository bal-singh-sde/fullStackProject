document.querySelector("#user_input").addEventListener("submit", handleClick);

function handleClick(evt) {
  let dayOfWeek = prompt("Add workout day");
  let bodyPart = prompt("Body part you are working on");
  let workout = prompt("Enter the workout performed:");
  let interval = prompt("Enter the repitition or duration of the exercise");
  evt.preventDefault();
  let today = new Date();
  var date = today.toLocaleString("default", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  displayWorkout(date, bodyPart, workout, interval);
}

function displayWorkout(date, bodyPart, workout, interval) {
  let display_workout = document.createElement("div");
  display_workout.innerHTML = `<div class="card border-info mb-3" style="max-width: 30rem;">
        <div class="card-header">Workout Summary</div>
        <div class="card-body text-info">
            <h5 class="card-title">Workout - ${date}</h5>
            <p class="card-text">${
              bodyPart + " " + workout + " " + interval
            }</p>
        </div>`;

  // `<div class="card text-white bg-info mb-3" style="max-width: 30rem;">
  //   <div class="card-header">Workout Summary</div>
  //   <div class="card-body">
  //     <h5 class="card-title">Workout - ${date}</h5>
  //     <p class="card-text">${bodyPart + " " + workout + " " + interval}</p>
  //   </div>`;

  document.querySelector("#no_workout").innerHTML = "";
  document.querySelector("#input_area").appendChild(display_workout);
}
