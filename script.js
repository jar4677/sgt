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
    if(dataValidation()) {
        var student = {
            name: $("#studentName").val(),
            course: $("#course").val(),
            grade: parseInt($("#studentGrade").val())
        };
        studentArray.push(student);
    }
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
    if (studentArray.length>0) {
        var total = 0;
        for (var i = 0; i < studentArray.length; i++) {
            total += studentArray[i].grade;
        }
        return Math.round(total / studentArray.length);
    }else {
        return 0;
    }
}

/**
 * updateData - centralized function to update the average and call student list update
 */

function updateData(){
    var average = calculateAverage();
    $(".avgGrade").text(average);
    updateStudentList();
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
////////////extra idea for validation
var validation_params = {
    '#studentName':
    {
        datatype_check:'string',
        length:3
    },
    '#course':
    {
        datatype_check:'string',
        length:5
    },
    '#grade' :
    {
        datatype_check: 'number',
        length: 1
    }

};

function validate_tester(test,value){
    var error_array=[];
    for(var index in test) {
        switch (index) {
            case 'datatype_check':
                //do datatype check here
                break;
            case 'length':
                //do length check here
                if(value.length < test[index]){
                    error_array.push(index);
                }
                break;

        }
    }
    if(error_array.length>0) {
        return error_array;
    }
    return true;
}
/////////////////data validation
function dataValidation() {
    remove_extra_classes();
 if (!isNaN(parseFloat($("#studentName").val()))) {
   $("#student_div").addClass("has-error");
 }
 if(!isNaN(parseFloat($("#course").val()))) {
     $("#course_div").addClass("has-error");
    }
 if(isNaN(parseFloat($("#studentGrade").val()))) {
     $("#grade_div").addClass("has-error");
 }
  if(isNaN(parseFloat($("#studentName").val())) && isNaN(parseFloat($("#course").val())) && !isNaN(parseFloat($("#studentGrade").val())) ) {
      return true;
  }else {
      return false;
  }
}///////end of data validation

function remove_extra_classes() {
    $("#student_div, #course_div, #grade_div").removeClass("has-error");
}////////end of remove extra classes

/**
 * Listen for the document to load and reset the data to the initial state
 */


$(document).ready(function () {
    reset();

    $("tbody").on('click', '.btn', function () {
        var row = $(this).parents()[1];
        var index = $(row).index();
        studentArray.splice(index, 1);
        if (studentArray.length == 0){
            reset();
        } else {
            updateStudentList();
        }
    });//////end of delete click handler
    $("#add").click(addClicked);
    $("#cancel").click(cancelClicked);
});///////end of ready 