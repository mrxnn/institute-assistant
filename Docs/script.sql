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