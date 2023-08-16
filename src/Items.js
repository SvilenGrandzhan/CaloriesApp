class Meal {
  constructor(name, calories) {
    // creating hexadecimal number by generating random number converting to string and slice first 2 symbols Zero and dot
    this.id = Math.random().toString(16).slice(2).toUpperCase()
    this.name = name
    this.calories = calories
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2).toUpperCase()
    this.name = name
    this.calories = calories
  }
}

export { Meal, Workout }
