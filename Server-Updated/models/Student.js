// Student model
class Student {
  constructor(firstName, lastName, gender, phone, address, dateOfBirth) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.phone = phone;
    this.address = address;
    this.dateOfBirth = dateOfBirth;
  }
}

// export the Student model
module.exports = Student;
