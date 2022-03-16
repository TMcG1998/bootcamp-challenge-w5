// Use moment.js to get the current date, format it correctly, then display it on load
var currentDay = moment();
var currentDayEl = $("#currentDay").text(currentDay.format("dddd, MMMM Do"));

var times = [];

var blockContainerEl = $("#block-container");

$(".time-block").on("click", "p", function() {
    var text = $(this)
    .text()
    .trim();
    var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

$(".time-block").on("blur", "textarea", function() {
    var text = $(this)
    .val()
    .trim();
    var blockP = $("<p>")
    .addClass("description")
    .text(text);
    $(this).replaceWith(blockP);
})

var time = moment().hour(9).minute(0).second(0); //sets time to 9AM
console.log(time);
console.log(currentDay);