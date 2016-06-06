/**
 * app - main Angular application
 * @type {angular.Module|module}
 */
var app = angular.module('sgtApp', []);

app.controller('mainController', function ($http, $log) {
    var self = this;
    self.averageGrade = 0;
    self.data = [];
    
    //TODO update average grade
    self.updateAvgGrade = function () {
        if(self.data.length > 0){
            var sum = 0;
            var count = 0;
            for (var x in self.data){
                sum += x.grade;
                count++;
            }
            self.averageGrade = Math.round(sum / count);
        } else {
            self.averageGrade = 0;
        }
    };
    
    self.clearForm = function () {
        self.newName = '';
        self.newCourse = '';
        self.newGrade = '';
    };
    
    self.addStudent = function () {
        var student = {
            'name': self.newName,
            'course': self.newCourse,
            'grade': self.newGrade
        };

        $http({
            url: 'apis/add_student.php',
            data: student,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            dataType: 'json'
        })
            .then(function (response) {
                $log.info(response.data);
                // self.data.push(student);
                // self.clearForm();
            }, function (response) {
                $log.warn(response);
            });
    };
    
    //TODO send data to server
    
    //TODO get data from server
    
    //TODO update data on server
    
    //TODO delete data on server
    
    //TODO sort results by field
    
    //TODO limited number of entries
});