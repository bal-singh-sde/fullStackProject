let today = new Date();
var date = today.toLocaleString("default", {
  month: "long",
  day: "2-digit",
  year: "numeric",
});

let id;

$(".update").on("click", function (evt){
     evt.preventDefault();
    if(evt.target.type==="button"){
        id = evt.target.value;      
    }
    else{
        let date = evt.target.parentElement.date.value;
        let bodyPart = evt.target.parentElement.bodypartSelect.value;
        let workout = evt.target.parentElement.workout.value;
        let Reps_Interval = evt.target.parentElement.Reps_Interval.value;
        

        // Send PUT Request here
        fetch("/workouts", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: id,
            date: date,
            bodyPart: bodyPart,
            workout: workout,  
            Reps_Interval: Reps_Interval, 
          }),
        })
          // .then((res) => {
          //   if (res.ok) return res.json();
          // })
          .then((response) => {
            window.location.reload(true);
          });  
    }
    
});

$(".delete").on("click", function (evt) {
 
    evt.preventDefault();
    let id = evt.target.value;
  fetch("/workouts", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     _id:`${id}`,
    }),
  })
    // .then((res) => {
    //   if (res.ok) return res.json();
    // })
    .then((data) => {
      window.location.reload();
    });

    //document.querySelector("#user_input123").reset();
}
);


