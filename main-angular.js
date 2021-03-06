/**
 * app - main Angular application
 * @type {angular.Module|module}
 */
var app = angular.module('sgtApp', []);

app.controller('mainController', function ($http, $log) {
    var self = this;
    self.averageGrade = 0;
    self.data = [];
    self.detailModalId = 'details';
    self.editModalId = 'edit';
    self.detailStudent = {};
    
    self.getAvgGrade = function (array) {
        if (array.length > 0) {
            var sum = 0;
            var count = 0;
            for (var i = 0; i < array.length; i++) {
                sum += parseInt(array[i].grade);
                count++;
            }
            return Math.round(sum / count);
        }
        return 0;
    };
    
    self.clearForm = function () {
        self.newName = '';
        self.newAssignment = '';
        self.newGrade = '';
    };
    
    self.submitForm = function () {
        if (self.validateInputs()) {
            self.addStudent();
        } else {
            //TODO better input error handling
            $log.log('do something else here');
        }
    };
    
    self.validateInputs = function () {
        return (
        self.newName.length >= 3 &&
        self.newAssignment.length >= 3 &&
        parseInt(self.newGrade) >= 0 &&
        parseInt(self.newGrade) <= 100)
    };
    
    self.addStudent = function () {
        var student = {
            'name': self.newName,
            'assignment': self.newAssignment,
            'grade': self.newGrade
        };
        
        $http({
            url: 'http://jonrasmussen.me/sgt/apis/add_student.php',
            data: $.param(student),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            dataType: 'json'
        })
            .then(function (response) {
                $log.info(response.data);
                self.getStudents();
                self.averageGrade = self.getAvgGrade(self.data);
            }, function (response) {
                $log.warn(response);
            });
    };
    
    self.getStudentDetail = function (index) {
        self.detailStudent = self.data[index];
    };
    
    //get data from server
    self.getStudents = function () {
        $http({
            url: 'apis/get_students.php',
            method: 'get'
        })
            .then(function (response) {
                self.data = response.data;
                self.averageGrade = self.getAvgGrade(self.data);
                self.clearForm();
            }, function (response) {
                $log.warn(response);
            })
    };
    
    //call on load
    self.getStudents();
    
    //update data on server
    self.updateStudent = function (student) {
        $http({
            url: 'apis/update_student.php',
            method: 'post',
            data: $.param(student),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(function (response) {
                self.getStudents();
                self.averageGrade = self.getAvgGrade(self.data);
                $log.info(response);
            }, function (response) {
                $log.warn(response);
            })
    };
    
    //delete data on server
    self.deleteStudent = function (student) {
        $http({
            url: 'apis/delete_student.php',
            method: 'post',
            data: $.param(student),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(function (response) {
                self.getStudents();
                self.averageGrade = self.getAvgGrade(self.data);
                $log.info(response);
            }, function (response) {
                $log.warn(response);
            })
    };
    
    //TODO sort results by field
    
    //TODO limited number of entries
})
    .directive('modal', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/modal.html',
            transclude: true,
            scope: {
                header: '@',
                modalId: '@'
            }
        }
    });
