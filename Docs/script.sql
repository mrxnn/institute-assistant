create database KingsAcademyStorage;
use KingsAcademyStorage;

/* Students table */
Create table Students
(
  id int primary key auto_increment,
  firstName varchar(64) not null,
  lastName varchar(64) not null,
  gender varchar(1) not null,
  phone varchar(10) not null,
  email varchar(64),
  location varchar(128) not null,
  dateOfBirth date not null,
  password varchar(16) not null
);