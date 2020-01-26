function Student(name, age) {
  this.name = name;
  this.age = age;
}

var first = new Student("John", 26);

Student.prototype.sayInfo = function() {
  console.log(this.name + " is " + this.age + " years old");
};

second.sayInfo();
// Jeff is 50 years old

var third = new Student("Tracy", 15);
// Now if we log third out, we see the object only has two
// properties, age and name. Yet, we still have access to the
// sayInfo function:
third;
// Student {name: "Tracy", age: 15}
third.sayInfo();
// Tracy is 15 years old

var name = {
  toString: function() {
    console.log("Not a good idea");
  }
};
name.toString();
// Not a good idea
