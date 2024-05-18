const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let workoutHistory = [];

const workouts = [
    { name: "Push-ups", muscleGroup: "Chest" },
    { name: "Pull-ups", muscleGroup: "Back" },
    { name: "Squats", muscleGroup: "Legs" },
    { name: "Deadlifts", muscleGroup: "Back" },
    { name: "Bench Press", muscleGroup: "Chest" },
    { name: "Bicep Curls", muscleGroup: "Arms" },
    { name: "Tricep Dips", muscleGroup: "Arms" },
    { name: "Lunges", muscleGroup: "Legs" },
    { name: "Plank", muscleGroup: "Core" },
    { name: "Burpees", muscleGroup: "Full Body" },
    { name: "Dips", muscleGroup: "Arms" },
    { name: "Overhead Press", muscleGroup: "Shoulders" },
    { name: "Dead Bug", muscleGroup: "Core" },
    { name: "Mountain Climbers", muscleGroup: "Full Body" },
    { name: "Russian Twists", muscleGroup: "Core" },
    { name: "Jumping Jacks", muscleGroup: "Full Body" },
    { name: "High Knees", muscleGroup: "Full Body" },
    { name: "Cable Rows", muscleGroup: "Back" },
    { name: "Leg Press", muscleGroup: "Legs" },
    { name: "Calf Raises", muscleGroup: "Legs" },
    { name: "Chest Flyes", muscleGroup: "Chest" },
    { name: "Lat Pulldowns", muscleGroup: "Back" },
    { name: "Face Pulls", muscleGroup: "Shoulders" },
    { name: "Bicycle Crunches", muscleGroup: "Core" },
    { name: "Hanging Leg Raises", muscleGroup: "Core" },
    { name: "Bulgarian Split Squats", muscleGroup: "Legs" },
    { name: "Glute Bridges", muscleGroup: "Legs" },
    { name: "Incline Bench Press", muscleGroup: "Chest" },
    { name: "Decline Bench Press", muscleGroup: "Chest" },
    { name: "Sumo Deadlifts", muscleGroup: "Back" },
    { name: "Romanian Deadlifts", muscleGroup: "Legs" },
    { name: "Skull Crushers", muscleGroup: "Arms" },
    { name: "Preacher Curls", muscleGroup: "Arms" },
    { name: "Farmer's Walk", muscleGroup: "Full Body" },
    { name: "Battle Ropes", muscleGroup: "Full Body" },
    { name: "Box Jumps", muscleGroup: "Legs" },
    { name: "Treadmill Sprints", muscleGroup: "Full Body" },
    { name: "Rowing Machine", muscleGroup: "Full Body" },
    { name: "Elliptical Trainer", muscleGroup: "Full Body" },
    { name: "Kettlebell Swings", muscleGroup: "Full Body" },
    { name: "Medicine Ball Slams", muscleGroup: "Full Body" },
    { name: "Resistance Band Pull Aparts", muscleGroup: "Shoulders" }
];

app.get('/workouts', (req, res) => {
    res.json(workouts);
});

app.get('/workoutHistory', (req, res) => {
    res.json(workoutHistory);
});

app.post('/workoutHistory', (req, res) => {
    const workout = req.body;
    workoutHistory.push(workout);
    res.json({ message: 'Workout added!' });
});

app.post('/resetHistory', (req, res) => {
    workoutHistory = [];
    res.json({ message: 'Workout history reset!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
