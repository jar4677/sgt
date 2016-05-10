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

var studentName = $("#studentName");
var course = $("#course");
var studentGrade = $("#studentGrade");
var tableBody = $("tbody");

/**
 * addClicked - Event Handler when user clicks the add button
 */

function addClicked(){
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
    var student = {
        name: $("#studentName").val(),
        course: $("#course").val(),
        grade: parseInt($("#studentGrade").val())
    };
    studentArray.push(student);
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

function clearAddStudentForm(){
    $("#studentName, #course, #studentGrade").val('');
    $("#studentName").focus();
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */

function calculateAverage() {
    var total = 0;
    var average = 0;

    for (var i = 0; i < studentArray.length; i++){
        total += studentArray[i].grade;
        average = Math.round(total / studentArray.length);
    }
    
    return average;
}

/**
 * updateData - centralized function to update the average and call student list update
 */

function updateData(){
    var average = calculateAverage();
    $(".avgGrade").text(average);
    updateStudentList();

    if (studentArray.length == 0) {
        reset();
    }
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

function updateStudentList() {
    $('tbody').html('');
    for (var i = 0; i < studentArray.length; i++){
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
    var delBtn = $("<button>").text('Delete').addClass('btn btn-danger').data(studentObj);

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
    $("tbody").html("<h3>User Info Unavailable<h3>");
}

/**
 * remove student
 * */
function removeStudent() {
    var row = $(this).parents()[1];
    var index = $(row).index();
    studentArray.splice(index, 1);
    updateData();
}

/** sort function*/

function sort() {
    switch ($(this).attr('id')) {
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
                console.log("something");
            });
            break;
    }
    updateData();
}

/**
 * Listen for the document to load and reset the data to the initial state
 */

$(document).ready(function () {
    reset();
    updateData();
    $('tbody').on('click', '.btn', removeStudent);
    $('.sort').click(sort);
});