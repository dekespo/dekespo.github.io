function getCurrentTime() 
{
    var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDay();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = digitCheck(minute);
    second = digitCheck(second);
    document.getElementById('currentTime').innerHTML = 
		dayNames(day) + ", "
		+ (day - 1) + " " + monthNames(month) + " "
		+ year + ", " 
		+ hour + ":" + minute + ":" + second;
    var t = setTimeout(getCurrentTime, 500);
}

function digitCheck(i) 
{
    if (i < 10) {i = "0" + i};  
    return i;
}

function monthNames(val)
{
	var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	return months[val];
}

function dayNames(val)
{
	var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	return days[val];
}
