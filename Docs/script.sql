create database KingsAcademyStorage;
use KingsAcademyStorage;

/* Application Users */
Create table ApplicationUsers
(
  Id int primary key auto_increment,
  FirstName varchar(32) not null,
  LastName varchar(32) not null,
  Gender varchar(1) not null,
  Phone varchar(10) not null,
  Email varchar(64),
  Address varchar(128) not null,
  DateOfBirth date not null,
  Password varchar(256) not null
);

/* Students */
Create table Students
(
  Id int primary key auto_increment,
  FirstName varchar(32) not null,
  LastName varchar(32) not null,
  Gender varchar(1) not null,
  Phone varchar(10) not null,
  Email varchar(64),
  Address varchar(128) not null,
  DateOfBirth date not null,
  Password varchar(256) not null
);

/* Employees */
Create table Employees
(
  Id int primary key auto_increment,
  FirstName varchar(32) not null,
  LastName varchar(32) not null,
  Gender varchar(1) not null,
  Phone varchar(10) not null,
  Email varchar(64),
  Address varchar(128) not null,
  DateOfBirth date not null,
  Password varchar(256) not null,
  EmpRole int not null
);

/* Events */
Create table Events
(
  Id int primary key auto_increment,
  Title varchar(32) not null,
  Description varchar(256) not null,
  Date date not null,
  Time varchar(32) not null
);

/* Questions */
Create table Questions
(
  Id int primary key auto_increment,
  Content varchar(512) not null,
  PostedUserId int references Students (Id),
  PostedTime datetime default CURRENT_TIMESTAMP
)

/* Answers */
Create table Answers
(
  Id int primary key auto_increment,
  Content varchar(512) not null,
  AnsweredUserId int references Employees (Id),
  PostedTime datetime default CURRENT_TIMESTAMP,
  QuestionId int references Questions (Id)
)

/* Books */
Create table Books
(
  Id int primary key auto_increment,
  Title varchar(64) not null,
  Description varchar(255) not null,
  Author varchar(32) not null,
  Publisher varchar(32) not null
)