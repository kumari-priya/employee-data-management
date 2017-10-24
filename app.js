
  // Initialize Firebase
var config = {
  apiKey: "AIzaSyCNpkMouFHxEPIB-wTqFxsf3rsS7SuNhv4",
  authDomain: "timesheet-327a3.firebaseapp.com",
  databaseURL: "https://timesheet-327a3.firebaseio.com",
  projectId: "timesheet-327a3",
  storageBucket: "",
  messagingSenderId: "336745741798"
};
firebase.initializeApp(config);

var database = firebase.database();

var name;
var role;
var startDate;
var rate;
var totalBilled = 0;
var monthsWorked = 0;

$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#name").val().trim();
  role = $("#role").val().trim();
  startDate = $("#date").val().trim();
  rate = $("#rate").val().trim();
  monthsWorked = calculateMonths(startDate);
  totalBilled = calculateTotalBilled(monthsWorked, rate);

  // Code for handling the push
  database.ref().push({
    name: name,
    role: role,
    startDate: startDate,
    rate: rate,
    totalBilled: totalBilled,
    monthsWorked: monthsWorked,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $("#name").val("");
  $("#role").val("");
  $("#date").val("");
  $("#rate").val("");

  console.log(name);
  console.log(role);
  console.log(startDate);
  console.log(rate);
});

// var data = database.ref();
// data.remove();


database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();
  var tableBody = $("#employee-table");
  var tableRow = $("<tr>");

  var tdName = $("<td>");
  var tdRole = $("<td>");
  var tdStartDate = $("<td>");
  var tdRate = $("<td>");
  var tdTotalBilled = $("<td>");
  var tdMonthsWorked = $("<td>");


  tdName.text(snapshot.val().name);
  tdRole.text(snapshot.val().role);
  tdStartDate.text(snapshot.val().startDate);
  tdRate.text(snapshot.val().rate);
  tdTotalBilled.text(snapshot.val().totalBilled);
  tdMonthsWorked.text(snapshot.val().monthsWorked);

  tableRow.prepend(tdTotalBilled);
  tableRow.prepend(tdRate);
  tableRow.prepend(tdMonthsWorked);
  tableRow.prepend(tdStartDate);
  tableRow.prepend(tdRole);
  tableRow.prepend(tdName);

  tableBody.prepend(tableRow);



});

function calculateMonths(startDate) {

  return Math.floor(moment().diff(moment(startDate), 'months', true));

}

function calculateTotalBilled(monthsWorked, rate) {

  return monthsWorked * rate;

}



