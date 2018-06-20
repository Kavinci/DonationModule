// JavaScript source code

var Data = {
    GoalAmount: 5000,
    CurrentAmount: 3000,
    EndDate: new Date(2018, 5, 25, 23, 59),
    NumDonors: 70,
    TimeEnded: false
};

document.addEventListener("DOMContentLoaded", function () {
    UpdateStatus();
    UpdateWording();
});

function UpdateStatus() {
    var statusElem = document.getElementById("status");
    var percent = Math.floor((Data.CurrentAmount / Data.GoalAmount) * 100);

    if (Data.CurrentAmount >= Data.GoalAmount) {
        statusElem.style.width = "100%";
        statusElem.style.borderTopRightRadius = "inherit";
    }
    else {
        statusElem.style.width = percent.toString() + "%";
    } 
}

function UpdateWording() {
    var dateElem = document.getElementById("time-left");
    var goalAmElem = document.getElementById("goal-amount");
    var goalMessElem = document.getElementById("goal-message");
    var donElem = document.getElementById("donors");

    //Update the Date related data
    var daysLeft = DateMath();
    if (daysLeft > 1) {
        dateElem.innerHTML = "Only " + daysLeft.toString() + " days left";
    }
    else if (daysLeft == 1) {
        dateElem.innerHTML = "Only " + daysLeft.toString() + " day left";
    }
    else {
        dateElem.innerHTML = "Donation period has ended";
        Data.TimeEnded = true;
    }

    // Update the goal total
    if (!Data.TimeEnded) {
        goalAmElem.innerHTML = " to reach $" + Data.GoalAmount.toString();
    }
    else {
        goalAmElem.innerHTML = "";
    }

    //Update the goal left to go
    if (Data.GoalAmount > Data.CurrentAmount) {
        goalMessElem.innerHTML = "We need $" + (Data.GoalAmount - Data.CurrentAmount).toString() + " more to reach our goal!";
    }
    else if (Data.GoalAmount == Data.CurrentAmount) {
        goalMessElem.innerHTML = "We have met our goal!";
    }
    else {
        goalMessElem.innerHTML = "We have exceeded our goal by $" + (Data.CurrentAmount - Data.GoalAmount).toString() + "!";
    }

    //Update number of donors
    donElem.innerHTML = Data.NumDonors;
}

function DateMath() {
    var Today = new Date();
    var daysLeft = 0;
    if (Data.EndDate.getMonth() == Today.getMonth()) {
        if (Data.EndDate.getDate() > Today.getDate()) {
            daysLeft = Data.EndDate.getDate() - Today.getDate();
        }
    }
    return daysLeft;
}

//Show/Hode message on mouseover
function ShowMessage() {
    var container = document.getElementById("goal-message-container");
    container.style.display = "block";
}

function HideMessage() {
    var container = document.getElementById("goal-message-container");
    container.style.display = "none";
}

//Handle form submission
function UpdateData() {
    var amountElem = document.getElementById("amount");
    var amount = parseInt(amountElem.value);

    var remainder = amount / 50;
    if (amount >= 50 && remainder - Math.floor(remainder) === 0) {
        console.log(Data.CurrentAmount);
        Data.CurrentAmount = Data.CurrentAmount + amount;
        console.log(amount);
        console.log(Data.CurrentAmount);
        Data.NumDonors += 1;
        UpdateStatus();
        UpdateWording();
    }
    else {
        alert("Input must be a multiple of $50");
    }
}