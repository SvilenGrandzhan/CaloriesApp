import App from './app'

class CalorieTracker {
  constructor() {
    this._calorieLimit = 1800
    this._totalCalories = 0
    this._meals = []
    this._workouts = []
    this._displayCaloriesTotal()
    this._displayCaloriesLimit()
    this._displayCaloriesConsumed()
    this._displayCaloriesBurned()
    this._displayCaloriesRemaining()
    this._displayCaloriesProgress()
  }

  addMeal(meal) {
    this._meals.push(meal)
    this._totalCalories += meal.calories
    this._render()
  }

  addWorkout(workout) {
    this._workouts.push(workout)
    this._totalCalories -= workout.calories
    this._render()
  }

  _displayCaloriesTotal() {
    const totalCaloriesElement = document.getElementById('calories-total')
    totalCaloriesElement.innerHTML = this._totalCalories
  }

  _displayCaloriesLimit() {
    const caloriesLimitElement = document.getElementById('calories-limit')
    caloriesLimitElement.innerHTML = this._calorieLimit
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedElement = document.getElementById('calories-consumed')
    caloriesConsumedElement.innerHTML = this._meals.reduce((total, meal) => total + meal.calories, 0)
  }

  _displayCaloriesBurned() {
    const caloriesBurnedElement = document.getElementById('calories-burned')
    caloriesBurnedElement.innerHTML = this._workouts.reduce((total, workout) => total + workout.calories, 0)
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingElement = document.getElementById('calories-remaining')
    const remaining = this._calorieLimit - this._totalCalories
    const parentCardElement = caloriesRemainingElement.parentElement.parentElement
    const progressBar = document.getElementById('calorie-progress')
    // ToDo try to do it with classList.toggle. And maybe with separate method?
    remaining < 0 ? (parentCardElement.classList.remove('bg-light'), parentCardElement.classList.add('bg-danger'), progressBar.classList.add('bg-danger')) : (parentCardElement.classList.remove('bg-danger'), parentCardElement.classList.add('bg-light'), progressBar.classList.remove('bg-danger'))
    caloriesRemainingElement.innerHTML = remaining
  }

  _displayCaloriesProgress() {
    const caloriesProgressBar = document.getElementById('calorie-progress')
    const progressPercentage = (this._totalCalories / this._calorieLimit) * 100
    caloriesProgressBar.style.width = `${progressPercentage}%`
  }

  _render() {
    this._displayCaloriesTotal()
    this._displayCaloriesConsumed()
    this._displayCaloriesBurned()
    this._displayCaloriesRemaining()
    this._displayCaloriesProgress()
  }
}

export default CalorieTracker
