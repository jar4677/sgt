/**
 * Define all global variables here
 */
/**
 * studentArray - global array to hold student objects
 * @type {Array}
 */

var sgt = {
    index: 0,
    displayArray: [],
    studentArray: []
};

function next(){
    //put current displayArray back into studentArray
    var tempArray = sgt.studentArray.splice(sgt.index);
    sgt.studentArray = sgt.studentArray.concat(sgt.displayArray, tempArray);
    sgt.index += sgt.displayArray.length;
    sgt.displayArray = [];

    //set the number of items to splice
    var numberOfItems = 10;
    //reduce the number of items if there aren't enough
    if (((sgt.studentArray.length - 1) - sgt.index) < 10){
        numberOfItems = (sgt.studentArray.length - 1) - sgt.index;
    }

    sgt.displayArray = sgt.studentArray.splice(sgt.index, numberOfItems);
    updateData();

    if(sgt.index > 0){
        $("#prev").show();
    } else {
        $("#prev").hide();
    }

    if((sgt.studentArray.length - sgt.index) < 10){
        $("#next").hide();
    } else {
        $("#next").show();
    }
}

function prev(){
    //put current displayArray back into studentArray
    var tempArray = sgt.studentArray.splice(sgt.index);
    sgt.studentArray = sgt.studentArray.concat(sgt.displayArray, tempArray);
    //set index
    if(sgt.index >= 10){
        sgt.index -= 10;
    } else {
        sgt.index = 0;
    }
    sgt.displayArray = [];

    //set the number of items to splice
    var numberOfItems = 10;
    //reduce the number of items if there aren't enough
    if (((sgt.studentArray.length - 1) - sgt.index) < 10){
        numberOfItems = (sgt.studentArray.length - 1) - sgt.index;
    }

    sgt.displayArray = sgt.studentArray.splice(sgt.index, numberOfItems);
    updateData();

    if(sgt.index > 0){
        $("#prev").show();
    } else {
        $("#prev").hide();
    }

    if((sgt.studentArray.length - sgt.index) < 10){
        $("#next").hide();
    } else {
        $("#next").show();
    }
}

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
//TODO wasn't working. may revisit
// var studentName = $("#studentName");
// var course = $("#course");
// var studentGrade = $("#studentGrade");
// var tableBody = $("tbody");

/**
 * addClicked - Event Handler when user clicks the add button
 */
//consolidated into addStudent ajax call

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
//redundant
// function cancelClicked() {
//     clearAddStudentForm();
// }

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
                if (!result.success) {
                    $("#myModal").modal("show");
                    $("#modal_text").text(result.errors[0]);
                } else {
                    student.id = result.new_id;
                    sgt.studentArray.push(student);
                    updateData();
                    clearAddStudentForm();
                }
            }
        });
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
    if ((sgt.studentArray.length + sgt.displayArray.length) > 0) {
        var total = 0;
        for (var i = 0; i < sgt.studentArray.length; i++) {
            total += sgt.studentArray[i].grade;
        }
        for (var j = 0; j < sgt.displayArray.length; j++) {
            total += sgt.displayArray[j].grade;
        }
        return Math.round(total / (sgt.studentArray.length + sgt.displayArray.length));
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
    
    //TODO check for compatability with next/previous
    if (sgt.studentArray.length == 0) {
        reset();
    }
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    $('tbody').html('');
    for (var i = 0; i < sgt.displayArray.length; i++) {
        addStudentToDom(sgt.displayArray[i]);
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
    var infoBtn = $("<button>").text('Info').addClass('btn btn-primary info');
    var delBtn = $("<button>").text('Delete').addClass('btn btn-danger delete col-xs-offset-1');
    
    var row = $("<tr>");

    $(del).append(infoBtn, delBtn);
    $(row).append(name, course, grade, del);
    $("tbody").append(row);
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    sgt.studentArray = [];
    sgt.displayArray = [];
    sgt.index = 0;
    $("#unavailable").show();
    $("#next").hide();
    $("#prev").hide();
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
    
    if (isNaN(parseFloat(grade)) || grade == '' || (parseFloat(grade))>101 || (parseFloat(grade)) < 0) {
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
    var studentId = sgt.displayArray[index].id;
    
    $.ajax({
        dataType: 'json',
        method: 'post',
        cached: false,
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
            } else {
                sgt.displayArray.splice(index, 1);
                updateData();
            }
        }
    });
}

/**
 * sort - takes the id of the column button to be sorted. sorts array by the appropriate property. resets the list
 * */
function sort(object) {
    var tempArray = sgt.studentArray.splice(sgt.index);
    sgt.studentArray = sgt.studentArray.concat(sgt.displayArray, tempArray);
    sgt.index = 0;
    sgt.displayArray = [];

    switch ($(object).attr('column')) {
        case 'name-col':
            sgt.studentArray.sort(function (a, b) {
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
            sgt.studentArray.sort(function (a, b) {
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
            sgt.studentArray.sort(function (a, b) {
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
    next();
}

function sort_reverse(object) {
    var tempArray = sgt.studentArray.splice(sgt.index);
    sgt.studentArray = sgt.studentArray.concat(sgt.displayArray, tempArray);
    sgt.index = 0;
    sgt.displayArray = [];

    switch ($(object).attr('column')) {
        case 'name-col':
            sgt.studentArray.sort(function (a, b) {
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
            sgt.studentArray.sort(function (a, b) {
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
            sgt.studentArray.sort(function (a, b) {
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
    next();
}

//functions get arrays for autocomplete
function updateCourseOptions() {
    $("#course-list").html('');
    var courses = [];
    for (var i = 0; i < sgt.studentArray.length; i++) {
        if (courses.indexOf(sgt.studentArray[i].course) == -1) {
            courses.push(sgt.studentArray[i].course);
        }
    }
    for (var k = 0; k < sgt.displayArray.length; k++) {
        if (courses.indexOf(sgt.displayArray[k].course) == -1) {
            courses.push(sgt.displayArray[k].course);
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
    for (var i = 0; i < sgt.studentArray.length; i++) {
        if (names.indexOf(sgt.studentArray[i].name) == -1) {
            names.push(sgt.studentArray[i].name);
        }
    }
    for (var k = 0; k < sgt.displayArray.length; k++) {
        if (names.indexOf(sgt.displayArray[k].name) == -1) {
            names.push(sgt.displayArray[k].name);
        }
    }
    for (var j = 0; j < names.length; j++){
        var option = $("<option>").val(names[j]);
        $("#student-list").append(option);
    }
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    reset();
    updateData();
    
    $("tbody").on('click', '.delete', removeStudent);
    
    $("#get-data").click(function () {
        $.ajax({
            dataType: 'json',
            method: 'post',
            url: 'http://s-apis.learningfuze.com/sgt/get',
            data: {'api_key': '51RgIfcfBz'},
            success: function (result) {
                if (!result.success) {
                    $("#modal_text").text(result.errors[0]);
                    $("#myModal").modal("show");
                } else {
                    console.log(result);
                    reset();
                    sgt.studentArray = result.data;
                    updateData();
                    next();
                }
            }
        })
    });

    $("#add").click(addStudent);
    $("#cancel").click(clearAddStudentForm());

    //TODO: consolidate sort functions
    $('.sort-reverse').hide();
    $('.sort').click(function() {

        sort(this);
        $(this).siblings(0).show();
        $(this).hide();
    });

    $('.sort-reverse').click(function() {
        sort_reverse(this);
        $(this).siblings(0).show();
        $(this).hide();
    });

    $("#prev").click(prev);
    $("#next").click(next);
});