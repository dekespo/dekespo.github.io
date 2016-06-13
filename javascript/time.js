function getCurrentTime() 
{
    var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();

	Date.prototype.getWeek = function() 
	{
		var firstDayofThisMonth = new Date(this.getFullYear(), month, 1);
		return Math.ceil((((this - firstDayofThisMonth) / 86400000) + firstDayofThisMonth.getDay()) / 7);
	}

	var getSundayGap = function()
	{
		var firstDayofThisMonth = new Date(date.getFullYear(), month, 1);
		return firstDayofThisMonth.getDay() - 1;
	};

	var day = date.getDay();
	var week = date.getWeek();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = digitCheck(minute);
    second = digitCheck(second);
    document.getElementById('currentTime').innerHTML = 
		dayNames(day) + ", "
		+ ( (day - getSundayGap()) + (week - 1) * 7) + " " + monthNames(month) + " " // some problem in day?
		+ year + ", " 
		+ hour + ":" + minute + ":" + second;
    var t = setTimeout(getCurrentTime, 500);

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
}
