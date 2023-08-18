import App from './app'
import CalorieTracker from './calorieTracker'

class Storage {
  // bc it will only one instance of this class, methods will be static
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit
    localStorage.getItem('calorieLimit') === null ? (calorieLimit = defaultLimit) : (calorieLimit = +localStorage.getItem('calorieLimit'))
    return calorieLimit
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit)
  }
}

export default Storage
