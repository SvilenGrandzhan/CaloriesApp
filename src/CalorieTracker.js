import App from './app'
import Storage from './storage'

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit()
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
    this._displayNewMeal(meal)
    this._render()
  }

  addWorkout(workout) {
    this._workouts.push(workout)
    this._totalCalories -= workout.calories
    this._displayNewWorkout(workout)
    this._render()
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id)
    // checking for result of findIndex()
    // if findIndex() finds an index it is passing to variable
    // in this case index
    // if findIndex() does not find index it is === -1
    if (index !== -1) {
      const meal = this._meals[index]
      this._totalCalories -= meal.calories
      this._meals.splice(index, 1)
      this._render()
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id)
    if (index !== -1) {
      const workout = this._workouts[index]
      this._totalCalories += workout.calories
      this._workouts.splice(index, 1)
      this._render()
    }
  }

  reset() {
    this._totalCalories = 0
    this._meals = []
    this._workouts = []
    this._render()
  }

  setLimit(limit) {
    this._calorieLimit = limit
    Storage.setCalorieLimit(limit)
    this._displayCaloriesLimit()
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

  _displayNewMeal(meal) {
    const mealItems = document.getElementById('meal-items')
    const mealItem = document.createElement('div')
    mealItem.classList.add('card', 'my-2')
    mealItem.setAttribute('data-id', meal.id)
    mealItem.innerHTML = `<div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${meal.name}</h4>
      <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">${meal.calories}</div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>`
    mealItems.appendChild(mealItem)
  }

  _displayNewWorkout(workout) {
    const workoutItems = document.getElementById('workout-items')
    const workoutItem = document.createElement('div')
    workoutItem.classList.add('card', 'my-2')
    workoutItem.setAttribute('data-id', workout.id)
    workoutItem.innerHTML = `<div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${workout.name}</h4>
      <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">${workout.calories}</div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>`
    workoutItems.appendChild(workoutItem)
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
