// Classes
function generateN(arr)
{
	var res = "";
	var r;
	for(var i = 0; i < arr.length; i++)
	{
		r = Math.round(Math.random() * (arr[i].length - 1));
		res += arr[i][r];
		res += " ";
	}
	this.getResults = function()
	{
		return res;
	}
}

// Name (main)
var generateAddress = function(w)
{
	var r = Math.round(Math.random() * 100);
	var n1 = Math.round(Math.random() * 19) + 10;
	var result;
	if(r < w[1])
	{
		var n2 = Math.round(Math.random() * 19) + 1;
		result = n1.toString() + "/" + n2.toString();
	}
	else
	{
		var r = Math.round(Math.random());
		var letter;
		if(r == 0)
			letter = "A";
		else
			letter = "B";
		result = n1.toString() + letter;
	}
	return result;
}

var chooseMain = function(w)
{
	var r = Math.round(Math.random() * 100);
	var result;
	if(r < w.mainAdjeNoun)
	{
		var arr = [mainAdje, mainNoun];
		var res = new generateN(arr);
		result = res.getResults();
	}
	else if(r >= w.mainAdjeNoun && (r < (w.mainAdjeNoun + w.mainSingleNoun)))
	{
		var arr = [mainSinglenoun];
		var res = new generateN(arr);
		result = res.getResults();
	}
	else
	{
		result = generateAddress(w.mainAddress);
	}
	return result;
}

// Listen
var chooseListen = function(w)
{
	var r = Math.round(Math.random() * 100);
	var result;
	if(r < w.listenWhat[0])
	{
		r = Math.round(Math.random() * 100);
		if(r < w.listenAdjeNoun[1])
		{
			var arr = [listenNoun];
			var res = new generateN(arr);
			result = res.getResults();
		}
		else
		{
			var arr = [listenAdje, listenNoun];
			var res = new generateN(arr);
			result = res.getResults();
		}
	}
	else
	{
		var arr = listenGroup;
		var res = new generateN(arr);
		result = res.getResults();
	}
	return result;
}
