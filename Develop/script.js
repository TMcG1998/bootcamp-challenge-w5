// Use moment.js to get the current date, format it correctly, then display it on load
var currentDay = moment().format("dddd, MMMM Do");
var currentDayEl = $("#currentDay").text(currentDay);

var blockContainerEl = $("#block-container");


var row = $("<div>").addClass("row");
var desc = $("<p>").addClass("description").text("Description");


//blockContainerEl.append(row);