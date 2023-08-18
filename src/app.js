import CalorieTracker from './calorieTracker'
import Storage from './storage'
import { Meal, Workout } from './items'
import { Modal, Collapse } from 'bootstrap'
import '@fortawesome/fontawesome-free/js/all'
import './css/bootstrap.css'
import './css/style.css'

class App {
  constructor() {
    this._tracker = new CalorieTracker()
    document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'))
    document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'))
    document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'))
    document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'))
    document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'))
    document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'))
    document.getElementById('reset').addEventListener('click', this._resetDay.bind(this))
    document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this))
  }

  _newItem(type, e) {
    e.preventDefault()
    const name = document.getElementById(`${type}-name`)
    const calories = document.getElementById(`${type}-calories`)
    if (name.value === '' || calories.value === '') {
      alert('Alert!')
      return
    }
    if (type === 'meal') {
      // in this case calories is coming as a string and it is adding a Zero in front.
      // to converted back to number add + sign in front
      const meal = new Meal(name.value, +calories.value)
      this._tracker.addMeal(meal)
    } else {
      const workout = new Workout(name.value, +calories.value)
      this._tracker.addWorkout(workout)
    }
    name.value = ''
    calories.value = ''
    const collapse = document.getElementById(`collapse-${type}`)
    const bootstrapCollapse = new Collapse(collapse, {
      toggle: true,
    })
  }

  _removeItem(type, e) {
    // delete is the class of button, fa-xmark is clase of i tag
    if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
      if (confirm('Are you sure?')) {
        // closest() is checking for closest element with that class
        // To check if it is working with IDs and tags?
        const id = e.target.closest('.card').getAttribute('data-id')
        type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id)
        e.target.closest('.card').remove()
      }
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase()
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent.toLowerCase()
      // indexOf is returning -1 if not a match
      name.indexOf(text) !== -1 ? (item.style.display = 'block') : (item.style.display = 'none')
    })
  }

  _resetDay() {
    this._tracker.reset()
    document.getElementById('meal-items').innerHTML = ''
    document.getElementById('workout-items').innerHTML = ''
    document.getElementById('filter-meals').value = ''
    document.getElementById('filter-workouts').value = ''
  }

  _setLimit(e) {
    e.preventDefault()
    const limit = document.getElementById('limit')
    if (limit.value === '') {
      alert('Please add limit')
      return
    }
    this._tracker.setLimit(+limit.value)
    limit.value = ''
    const modalElement = document.getElementById('limit-modal')
    const modal = Modal.getInstance(modalElement)
    modal.hide()
  }
}

const app = new App()
