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
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */

function cancelClicked() {
    
}

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */

function addStudent() {
    var student = {
        name: $(studentName).val(),
        course: $(course).val(),
        grade: $(studentGrade).val()
    };
    studentArray.push(student);
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

function clearAddStudentForm(){
    $(studentName, course, studentGrade).text('');
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */

function calculateAverage() {
    var total = 0;
    for (var i = 0; i < studentArray.length; i++){
        total += studentArray[i].grade;
    }
    return total / studentArray.length;
}

/**
 * updateData - centralized function to update the average and call student list update
 */

function updateData(){
    
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

function updateStudentList() {
    
}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

function addStudentToDom(studentObj) {
    
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */

function reset() {
    studentArray = [];
    $(tableBody).html('');
}

/**
 * Listen for the document to load and reset the data to the initial state
 */

$(document).ready(reset());