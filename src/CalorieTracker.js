import { Meal, Workout } from './Items'

class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000
    this._totalCalories = 0
    this._meals = []
    this._workouts = []
  }

  addMeal(meal) {
    this._meals.push(meal)
    this._totalCalories += meal.calories
  }

  addWorkout(workout) {
    this._workouts.push(workout)
    this._totalCalories -= workout.calories
  }
}

const tracker = new CalorieTracker()
const breakfast = new Meal('Breakfast', 400)
tracker.addMeal(breakfast)
const run = new Workout('Run', 200)
tracker.addWorkout(run)

console.log(tracker._meals)
console.log(tracker._workouts)
console.log(tracker._totalCalories)

export default CalorieTracker
