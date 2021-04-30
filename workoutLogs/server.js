const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const { getCurrDate } = require("../Services");
ObjectId = require("mongodb").ObjectID;
const moment = require("moment");


const app = express();

app.listen(3000, function () {
  console.log("listening on 3000");
});

//handles reading data from the form
app.use(bodyParser.urlencoded({ extended: true }));

//This tells Express we’re using EJS as the template engine
app.set("view engine", "ejs");


//make the public folder accessible to the public by using a built-in middleware called express.static
app.use(express.static("public"));

//to read JSON
app.use(bodyParser.json());

  //DATABASE
  MongoClient.connect(
    "mongodb+srv://db_User:myWorkouts@cluster0.w9kul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  )
    .then((client) => {
      console.log("Connected to database");
      const db = client.db("users_workouts");
      const workOutsCollection = db.collection("workouts");

      //GET
      app.get("/", (req, res) => {
        workOutsCollection
          .find()
          .sort({ date: -1 })
          .toArray()
          .then((results) => {
            res.render("index.ejs", { workouts: results });
          })
          .catch(console.error);
      });

      app.get("/workouts", (req, res) => {
        workOutsCollection
          .find({ _id: ObjectId(req.body._id) })
          .sort({datefield: -1})
          .toArray()
          .then((results) => {
            res.send(results);
          });
      });

      //POST
      app.post("/workouts", (req, res) => {
         var current_date = moment(req.body.date, "YYYY-MM-DD").format(
          "MMMM DD, YYYY"
        );
        req.body.date = current_date;

        workOutsCollection
          .insertOne(req.body)
          .then((result) => {
            //console.log(result);
            res.redirect("/");
            
          })
          .catch((error) => console.error(error));
      });

      //PUT
      app.put("/workouts", (req, res) => {
        let date = moment(req.body.date, "YYYY-MM-DD").format(
          "MMMM DD, YYYY"
        );
        workOutsCollection
          .findOneAndUpdate(
            { _id: ObjectId(req.body._id)},
            {
              $set: {
                date: date,
                bodyPart: req.body.bodyPart,
                workout: req.body.workout,
                Reps_Interval: req.body.Reps_Interval,
              },
            },
            {
              upsert: true,
            }
          )
          .then((result) => {
            res.json("Success");
          })
          .catch((error) => console.error(error));
      });

      //DELETE
      app.delete("/workouts", (req, res) => {
        workOutsCollection
          .deleteOne(
            { _id: ObjectId(req.body._id)} 
          )
          .then((result) => {
            if (result.deletedCount === 0) {
              console.log();
              return res.json("No workout to delete");
            }

            res.json(`Deleted ${req.body.bodyPart}`);
          })
          .catch((error) => console.error(error));
      });
    })
    .catch(console.error);


 


 
