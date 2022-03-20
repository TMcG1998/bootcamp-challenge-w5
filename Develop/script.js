// Use moment.js to get the current date, format it correctly, then display it on load
var currentDay = moment();
var currentDayEl = $("#currentDay").text(currentDay.format("dddd, MMMM Do"));
var currentHour = currentDay.hours();

// store array of items to save and load later
var times = [];
// store value to append time blocks to 
var blockContainerEl = $("#block-container");

// allow ability to edit tasks on click
$(".time-block").on("click", "p", function() {
    var text = $(this)
    .text()
    .trim();
    var textInput = $("<textarea>")
    .attr('id', $(this).attr('id'))
    .addClass("form-control")
    .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

// save the new task value when clicking off of the textarea
$(".time-block").on("blur", "textarea", function() {
    var text = $(this)
    .val()
    .trim();
    var id = $(this)
    .attr('id');
// store the id to later use to save and load data
    id = id.charAt(id.length - 1);

    var blockP = $("<p>")
    .addClass("description")
    .attr('id', 'row-' + id)
    .text(text);
    $(this).replaceWith(blockP);
})

// save the row corresponding to a button click
$(".row .saveBtn").click(function() {
    var id = $(this)
    .attr('id');
    id = id.charAt(id.length - 1);

    var blockP = $("#row-" + id);

    times[id - 1].task = blockP.text();
    saveTimes();
    console.log(times);
})

// loop to display each timeblock
var displayTimeBlocks = function() {
    for(var i = 0; i < times.length; i++) {
        // store what hour we're working with
        var hourBlock = times[i].time;
        var taskDesc = times[i].task;

        var currentTimeBlock = $("#row-" + (i + 1).toString());
        currentTimeBlock.text(taskDesc);
        // check the hour to update color of time block
        if(hourBlock < currentHour) {
            currentTimeBlock.parent().addClass("past");
        } else if (hourBlock > currentHour) {
            currentTimeBlock.parent().addClass("future");
        } else {
            currentTimeBlock.parent().addClass("present");
        }

    }
}

// used to periodically check times, remove color-related class and then add them back
var checkTime = function() {
    console.log("working");
    for(var i = 0; i < times.length; i++) {
        var hourBlock = times[i].time;
        var currentTimeBlock = $("#row-" + (i + 1).toString());
        currentTimeBlock.parent().removeClass("past future present");

        if(hourBlock < currentHour) {
            currentTimeBlock.parent().addClass("past");
        } else if (hourBlock > currentHour) {
            currentTimeBlock.parent().addClass("future");
        } else {
            currentTimeBlock.parent().addClass("present");
        }
    }
}

setInterval(checkTime, 300000);

// Save the data
var saveTimes = function() {
    localStorage.setItem("times", JSON.stringify(times));
}

// Load the data from local storage
var loadTimes = function() {
    // parse the localstorage into a usable array
    times = JSON.parse(localStorage.getItem("times"));

    // if nothing in localStorage, create new array as default
    if(!times) {
        times = [
            {
                time: 9,
                task: 'Edit Time Slot'
            },
            {
                time: 10,
                task: 'Edit Time Slot'
            },
            {
                time: 11,
                task: 'Edit Time Slot'
            },
            {
                time: 12,
                task: 'Edit Time Slot'
            },
            {
                time: 13,
                task: 'Edit Time Slot'
            },
            {
                time: 14,
                task: 'Edit Time Slot'
            },
            {
                time: 15,
                task: 'Edit Time Slot'
            },
            {
                time: 16,
                task: 'Edit Time Slot'
            },
            {
                time: 17,
                task: 'Edit Time Slot'
            }
        ];
    }

    // display the corresponding descriptions to each time block
    for(var i = 0; i < times.length; i++) {
        var currTask = times[i].task;
        var corrDesc = $("#row-" + (i + 1).toString());
        corrDesc.text(currTask);

        console.log(currTask);
    }
}

// load from the local storage, then display the information we got 
// as mentioned in the loadTimes function, if nothing is retrieved we will
// display a default state
loadTimes();
displayTimeBlocks();