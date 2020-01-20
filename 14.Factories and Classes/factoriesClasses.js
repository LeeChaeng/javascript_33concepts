function Vehicle(make, model, color) {
  (this.make = make),
    (this.model = model),
    (this.color = color),
    (this.getName = function() {
      return this.make + " " + this.model;
    });
}
let car = new Vehicle("Toyota", "Corolla", "Black");
let car2 = new Vehicle("Honda", "Civic", "White");

car2.year = "2012";

function Vehicle(make, model, color, year) {
  (this.make = make),
    (this.model = model),
    (this.color = color),
    (this.year = year),
    (this.getName = function() {
      return this.make + " " + this.model;
    });
}

car.__proto__.year = "2016";

class Vehicle {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
  }

  getName() {
    return this.make + " " + this.model;
  }
}

let car = new Vehicle("Toyota", "Corolla", "Black");

function Vehicle(make, model, color) {
  this.make = make;
  this.model = model;
  this.color = color;
}

Vehicle.prototype.getName = function() {
  return this.make + " " + this.model;
};

let car = new Vehicle("Toyota", "Corolla", "Black");

class Vehicle {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
  }

  getName() {
    return this.make + " " + this.model;
  }

  static getColor(v) {
    return v.color;
  }
}

let car = new Vehicle("Honda", "Accord", "Purple");
let ex = new Vehicle("kia", "K5", "RED");

Vehicle.getColor(car); // "purple"
Vehicle.getColor(ex); //"RED"

class Vehicle {
  constructor(model) {
    this.model = model;
  }

  get model() {
    return this._model;
  }

  set model(value) {
    this._model = value;
  }
}

class Vehicle {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
  }

  getName() {
    return this.make + " " + this.model;
  }
}

class Car extends Vehicle {
  getName() {
    return this.make + " " + this.model + " in child class.";
  }
}

let car = new Car("Honda", "Accord", "Purple");

car.getName(); // "Honda Accord in child class."

class Car extends Vehicle {
  getName() {
    return super.getName() + " - called base class function from child class.";
  }
}
