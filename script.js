/**
 * Define all global variables here
 */
/**
 * studentArray - global array to hold student objects
 * @type {Array}
 */
var studentArray = [];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
// var studentName = $("#studentName");
// var course = $("#course");
// var studentGrade = $("#studentGrade");
// var tableBody = $("tbody");

/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked() {
    addStudent();
    updateData();
    clearAddStudentForm();
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked() {
    clearAddStudentForm();
}

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent() {
    if (dataValidation()) {
        var student = {
            name: $("#studentName").val(),
            course: $("#course").val(),
            grade: parseInt($("#studentGrade").val())
        };

        $.ajax({
            dataType: 'json',
            method: 'post',
            url: 'http://s-apis.learningfuze.com/sgt/create',
            data: {
                'api_key': '51RgIfcfBz',
                'name': student.name,
                'course': student.course,
                'grade': student.grade
            },
            success: function (result) {
                student.id = result.new_id;
            },
            errors: function (result) {
                console.log(result);
            }
        });

        studentArray.push(student);
    }
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm() {
    $("#studentName, #course, #studentGrade").val('');
    $("#studentName").focus();
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    if (studentArray.length > 0) {
        var total = 0;
        for (var i = 0; i < studentArray.length; i++) {
            total += studentArray[i].grade;
        }
        return Math.round(total / studentArray.length);
    } else {
        return 0;
    }
}

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    var average = calculateAverage();
    $(".avgGrade").text(average);
    updateStudentList();
    updateCourseOptions();
    updateNameOptions();
    $("#unavailable").hide();
    if (studentArray.length == 0) {
        reset();
    }
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    $('tbody').html('');
    for (var i = 0; i < studentArray.length; i++) {
        addStudentToDom(studentArray[i]);
    }
}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj) {
    var name = $("<td>").text(studentObj.name);
    var course = $("<td>").text(studentObj.course);
    var grade = $("<td>").text(studentObj.grade);
    
    var del = $("<td>");
    var delBtn = $("<button>").text('Delete').addClass('btn btn-danger');
    
    var row = $("<tr>");
    
    $(del).append(delBtn);
    $(row).append(name, course, grade, del);
    $("tbody").append(row);
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    studentArray = [];
    $("#unavailable").show();
}

/**
 * dataValidation - clears inputs of bootstrap classes. validates data from inputs, adding bootstrap classes as
 * appropriate
 * @return {boolean}
 */
function dataValidation() {
    removeExtraClasses();
    
    var name = $("#studentName").val();
    var course = $("#course").val();
    var grade = $("#studentGrade").val();
    
    if (!isNaN(parseFloat(name)) || name == '') {
        $("#student_div").addClass("has-error");
        name = false;
    }
    
    if (!isNaN(parseFloat(course)) || course == '') {
        $("#course_div").addClass("has-error");
        course = false;
    }
    
    if (isNaN(parseFloat(grade)) || grade == '') {
        $("#grade_div").addClass("has-error");
        grade = false;
    }
    
    return (name && course && grade);
}///////end of data validation

/**
 * removeExtraClasses - clears class "has-error" from all input fields
 */
function removeExtraClasses() {
    $("#student_div, #course_div, #grade_div").removeClass("has-error");
}////////end of remove extra classes


// ////////////extra idea for validation
// var validation_params = {
//     '#studentName': {
//         datatype_check: 'string',
//         length: 3
//     },
//     '#course': {
//         datatype_check: 'string',
//         length: 5
//     },
//     '#grade': {
//         datatype_check: 'number',
//         length: 1
//     }
// };
//
// function validate_tester(test, value) {
//     var error_array = [];
//     for (var index in test) {
//         switch (index) {
//             case 'datatype_check':
//                 //do datatype check here
//                 break;
//             case 'length':
//                 //do length check here
//                 if (value.length < test[index]) {
//                     error_array.push(index);
//                 }
//                 break;
//         }
//     }
//     if (error_array.length > 0) {
//         return error_array;
//     }
//     return true;
// }

/**
 * removeStudent - gets index of the row to be removed. removes corresponding student from studentArray. resets the
 * list
 * */
function removeStudent() {
    var row = $(this).parents()[1];
    var index = $(row).index();
    var studentId = studentArray[index].id;
    console.log(studentId);
    studentArray.splice(index, 1);
    updateData();

    $.ajax({
        dataType: 'json',
        method: 'post',
        url: 'http://s-apis.learningfuze.com/sgt/delete',
        data: {
            'api_key': '51RgIfcfBz',
            'student_id': studentId
        },
        success: function (result) {
            console.log(result);
            if (!result.success) {
                $("#myModal").modal("show");
                $("#modal_text").text(result.errors[0]);
            }
        }
    });
}

/**
 * sort - takes the id of the column button to be sorted. sorts array by the appropriate property. resets the list
 * */
function sort(object) {
    switch ($(object).attr('column')) {
        case 'name-col':
            studentArray.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                else if (a.name < b.name) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            break;
        case 'course-col':
            studentArray.sort(function (a, b) {
                if (a.course > b.course) {
                    return 1;
                }
                else if (a.course < b.course) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            break;
        case 'grade-col':
            studentArray.sort(function (a, b) {
                if (a.grade < b.grade) {
                    return 1;
                }
                else if (a.grade > b.grade) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            break;
    }
    updateData();
}

function sort_reverse(object) {
    console.log('fired');
    switch ($(object).attr('column')) {
        case 'name-col':
            studentArray.sort(function (a, b) {
                if (a.name < b.name) {
                    return 1;
                }
                else if (a.name > b.name) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            break;
        case 'course-col':
            studentArray.sort(function (a, b) {
                if (a.course < b.course) {
                    return 1;
                }
                else if (a.course > b.course) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            break;
        case 'grade-col':
            studentArray.sort(function (a, b) {
                if (a.grade > b.grade) {
                    return 1;
                }
                else if (a.grade < b.grade) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            break;
    }
    updateData();
}

//functions get arrays for autocomplete
function updateCourseOptions() {
    $("#course-list").html('');
    var courses = [];
    for (var i = 0; i < studentArray.length; i++) {
        if (courses.indexOf(studentArray[i].course) == -1) {
            courses.push(studentArray[i].course);
        }
    }
    for (var j = 0; j < courses.length; j++){
        var option = $("<option>").val(courses[j]);
        $("#course-list").append(option);
    }
}

function updateNameOptions() {
    $("#student-list").html('');
    var names = [];
    for (var i = 0; i < studentArray.length; i++) {
        if (names.indexOf(studentArray[i].name) == -1) {
            names.push(studentArray[i].name);
        }
    }
    for (var j = 0; j < names.length; j++){
        var option = $("<option>").val(names[j]);
        $("#student-list").append(option);
    }
}

/**
 *
 */

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    reset();
    updateData();
    
    $("tbody").on('click', '.btn', removeStudent);
    
    $("#get-data").click(function () {
        $.ajax({
            dataType: 'json',
            method: 'post',
            url: 'http://s-apis.learningfuze.com/sgt/get',
            data: {'api_key': '51RgIfcfBz'},
            success: function (result) {
                studentArray = result.data;
                console.log(result.data);
                updateData();
            },
            error: function () {
            }
        })
    });

    $("#add").click(addClicked);
    $("#cancel").click(cancelClicked);

    $('.sort-reverse').hide();
    $('.sort').click(function() {

        sort(this);
        $(this).siblings(0).show();
        $(this).hide();
    });
    //TODO: consolidate sort functions
    $('.sort-reverse').click(function() {
        sort_reverse(this);
        $(this).siblings(0).show();
        $(this).hide();
    });
});