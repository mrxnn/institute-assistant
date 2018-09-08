// Student model
class Student {
  constructor(firstName, lastName, gender, nic, dateOfBirth, phone, email, location, bio) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.nic = nic;
    this.dateOfBirth = dateOfBirth;
    this.phone = phone;
    this.email = email;
    this.location = location;
    this.bio = bio;
  }
}

// export the Student model
module.exports = Student;
