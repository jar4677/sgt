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
    for (var i = 0; i < studentArray.length; i++){
        total += studentArray[i].grade;
    }
    return Math.round(total / studentArray.length);
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
    });

    $("#get-data").click(function () {
        // $.ajax({
        //     datatype: 'json',
        //     url: 's-apis.learningfuze.com/sgt/get',
        //     api_key: '',
        //     success: function (result) {
        //         console.log(result);
        //     }
        // })
    });
    
    $(function() {
        var courses = getCourses();
        $("#course").autocomplete({
            source: courses
        });
    });

    $(function() {
        var names = getNames();
        $("#studentName").autocomplete({
            source: names
        });
    });
});

//// TEST DATA FOR AUTOCOMPLETE /////

function getCourses (){
    var courses = [];
    for (var i = 0; i < testData.length; i++){
        if (courses.indexOf(testData[i].course) == -1){
            courses.push(testData[i].course);
        }
    }
    return courses;
}

function getNames (){
    var names = [];
    for (var i = 0; i < testData.length; i++){
        if (names.indexOf(testData[i].name) == -1){
            names.push(testData[i].name);
        }
    }
    return names;
}

var testData = [
    {
        id: 123456,
        name: 'Jon Rasmussen',
        course: 'JavaScript',
        grade: 100
    },
    {
        id: 123457,
        name: 'Pearl Mozafarian',
        course: 'HTML',
        grade: 100
    },
    {
        id: 123458,
        name: "Erika O\'Neal",
        course: CSS,
        grade: 100
    },
    {
        id: 123459,
        name: 'John Doe',
        course: 'Underwater Basketweaving',
        grade: 54
    },
    {
        id: 123460,
        name: 'Alan Smithee',
        course: 'Film Making',
        grade: 10
    },
    {
        id: 123461,
        name: 'Barack Obama',
        course: 'Presidenting',
        grade: 50
    },
    {
        id: 123462,
        name: 'Cristen Rasmussen',
        course: 'Teaching',
        grade: 100
    },
    {
        id: 123463,
        name: 'Donald Drumpf',
        course: 'Human Decency',
        grade: 0
    },
    {
        id: 123464,
        name: 'Dan Paschal',
        course: 'Teaching',
        grade: 100
    },
    {
        id: 123465,
        name: 'Josh Hall',
        course: 'Muggle Studies',
        grade: 84
    }
];