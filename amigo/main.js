// Ankara Mekan �smi Geli�tirme

main.prev = null; // static
function main()
{
	res = weightCheck(weight); 
	if(res != true)
	{
		document.getElementById('name').innerHTML = res;
	}
	else
	{
		res = chooseMain(weight);
		if(res == main.prev)
		{
			res += " (Israrc�y�m.)";
		}
		document.getElementById('name').innerHTML = res;
		main.prev = res;
	}
}

// Ne dinelnir?
function listen()
{
	res = weightCheck(weight); 
	if(res != true)
	{
		document.getElementById('listen').innerHTML = res;
	}
	else
	{
		res = chooseListen(weight);
		document.getElementById('listen').innerHTML = res;
	}
}
