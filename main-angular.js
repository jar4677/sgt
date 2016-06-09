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
    
    //TODO fix get average grade (returns NaN)
    self.getAvgGrade = function (array) {
        if(array.length > 0){
            var sum = 0;
            var count = 0;
            for (var x in array){
                sum += parseInt(x.grade);
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
        if(self.validateInputs()){
            self.addStudent();
        }  else {
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
                // self.averageGrade = self.getAvgGrade(self.data);
            }, function (response) {
                $log.warn(response);
            });
    };
    
    self.getStudentDetail = function (index) {
        self.detailStudent = self.data[index];
    };
    
    //TODO send data to server
    
    //TODO get data from server
    self.getStudents = function () {
        $http({
            url: 'apis/get_students.php',
            method: 'get'
        })
            .then(function (response) {
                self.data = response.data;
            }, function (response) {
                $log.warn(response);
            })
    };

    self.getStudents();

    //TODO update data on server
    
    //TODO delete data on server
    
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