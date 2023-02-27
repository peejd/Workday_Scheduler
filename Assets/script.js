// Set global variables
var displayDateTime = document.getElementById('currentDay');
var now = dayjs().format('dddd, MMMM D, YYYY');
var btnSave = document.getElementsByClassName("saveBtn");
var Hours = ['9','10','11','12','13','14','15','16']

// Function to display current date in page header
function setHeaderDateTime() {
  displayDateTime.innerHTML = now;
};

// Event listener to run code after page is loaded
document.addEventListener("DOMContentLoaded", function() {

  // Call function to display Current Date in header
  setHeaderDateTime();

  // Set variable for current hour in 24-hour format
  var currentHour = parseInt(dayjs().format('H'));

  // Loop through workday Hours array
  for (var i = 0; i < Hours.length; i++) {

    // Set variables for each hour in array and perform actions on that hour
    var Hour = parseInt(Hours[i]);
    var SavedData = JSON.parse(localStorage.getItem("WDScheduler-Hour-" + Hour));
    var displayScheduleItem = document.getElementById('item-' + Hour);
    
    // Determine if current hour is earlier, same, or later than loop array display hour,
    // and adjust display color style of that cell accordingly
    if (currentHour < Hour) {
      displayScheduleItem.classList.remove("past", "present", "future");
      displayScheduleItem.classList.add("future");
      }
    else if (currentHour == Hour) {
      displayScheduleItem.classList.remove("past", "present", "future");
      displayScheduleItem.classList.add("present");
      }
    else {
      displayScheduleItem.classList.remove("past", "present", "future");
      displayScheduleItem.classList.add("past");
      }

    // If there is saved data (notes) for this loop hour, display it in the page
    if (SavedData) {
      displayScheduleItem.textContent = SavedData;
    }
  }
});

// Function to update schedule notes/itmes for each hour on scheduler
function writeScheduleItems(event) {
  var scheduleHour = "WDScheduler-Hour-" + this.parentElement.id;
  var scheduleItem = this.previousElementSibling.value;

  localStorage.setItem(scheduleHour , JSON.stringify(scheduleItem));
};

// Event listener to update saved data/notes for each scheduler hour
// on click of corresponding Save button.
for (var i = 0; i < btnSave.length; i++) {
  btnSave[i].addEventListener('click', writeScheduleItems, false);
};
