/**
 * app - main Angular application
 * @type {angular.Module|module}
 */
var app = angular.module('sgtApp', []);

app.controller('mainController', function () {
    var self = this;
    self.averageGrade = 0;
    self.data = [];
    
    self.addStudent = function () {
        var student = {
            'name': self.newName,
            'course': self.newCourse,
            'grade': self.newGrade
        };
        self.data.push(student);
        self.clearForm();
    };

    self.clearForm = function () {
        self.newName = '';
        self.newCourse = '';
        self.newGrade = '';
    }
});