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

  static getTotalCalories(defaultCalories = 0) {
    let totalCalories
    localStorage.getItem('totalCalories') === null ? (totalCalories = defaultCalories) : (totalCalories = +localStorage.getItem('totalCalories'))
    return totalCalories
  }

  static setTotalCalories(totalCalories) {
    localStorage.setItem('totalCalories', totalCalories)
  }

  static getMeals() {
    let meals
    // ToDo find out why is not working with ternary operator
    if (localStorage.getItem('meals') === null) {
      meals = []
    } else {
      meals = JSON.parse(localStorage.getItem('meals'))
    }
    return meals
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals()
    meals.push(meal)
    localStorage.setItem('meals', JSON.stringify(meals))
  }

  static removeMeal(id) {
    const meals = Storage.getMeals()
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1)
      }
    })
    localStorage.setItem('meals', JSON.stringify(meals))
  }

  static getWorkouts() {
    let workouts
    if (localStorage.getItem('workouts') === null) {
      workouts = []
    } else {
      workouts = JSON.parse((workouts = localStorage.getItem('workouts')))
    }
    return workouts
  }

  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts()
    workouts.push(workout)
    localStorage.setItem('workouts', JSON.stringify(workouts))
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkouts()
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1)
      }
    })
    localStorage.setItem('workouts', JSON.stringify(workouts))
  }

  static clearAll() {
    localStorage.removeItem('totalCalories')
    localStorage.removeItem('meals')
    localStorage.removeItem('workouts')
  }
}

export default Storage
