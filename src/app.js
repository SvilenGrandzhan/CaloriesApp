import CalorieTracker from './calorieTracker'
import { Meal, Workout } from './items'
import { Modal, Collapse } from 'bootstrap'
import '@fortawesome/fontawesome-free/js/all'
import './css/bootstrap.css'
import './css/style.css'

class App {
  constructor() {
    this._tracker = new CalorieTracker()
    document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this))
    document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this))
  }

  _newMeal(e) {
    e.preventDefault()
    const name = document.getElementById('meal-name')
    const calories = document.getElementById('meal-calories')
    if (name.value === '' || calories.value === '') {
      alert('Alert!')
      return
    }
    // in this case calories is coming as a string and it is adding a Zero in front.
    // to converted back to number add + sign in front
    const meal = new Meal(name.value, +calories.value)
    this._tracker.addMeal(meal)
    name.value = ''
    calories.value = ''
    const collapseMeal = document.getElementById('collapse-meal')
    const bootstrapCollapse = new bootstrap.Collapse(collapseMeal, {
      toggle: true,
    })
  }
  // To continue here. Bootstrap is Not collapsing
  _newWorkout(e) {
    e.preventDefault()
    const name = document.getElementById('workout-name')
    const calories = document.getElementById('workout-calories')
    if (name.value === '' || calories.value === '') {
      alert('Alert!')
      return
    }
    const workout = new Workout(name.value, +calories.value)
    this._tracker.addWorkout(workout)
    name.value = ''
    calories.value = ''
    const collapseWorkout = document.getElementById('collapse-workout')
    const bootstrapCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    })
  }
}

const app = new App()
