var weight = new Object();
weight.mainAdjeNoun = 75;
weight.mainSingleNoun = 15;
weight.mainAddress = [10,90,10];

weight.listenAdjeNoun = [50, 50]; // sıfat, isim
weight.listenWhat = [60, 40]; // gerçek, geyik

// Check Function
var weightCheck = function(w)
{
	var mainTotal = w.mainAdjeNoun + w.mainSingleNoun + w.mainAddress[0];
	var mainAddressTotal = w.mainAddress[1] + w.mainAddress[2];
	var listenTotal = w.listenAdjeNoun[0] + w.listenAdjeNoun[1];
	var listenWhatTotal = w.listenWhat[0] + w.listenWhat[1];
	var result;
	if(mainTotal !== 100)
	{
		result = "UYARI: weight.js \"main\" değelerinin ağırlıkları 100 etmiyor.\nSayılar: " + w.mainAdjeNoun.toString() + " " + w.mainSingleNoun.toString() + " " + w.mainAddress[0].toString();
	}
	else if(mainAddressTotal != 100)
	{
		result = "UYARI: weight.js dosyasının \"mainAddress\" değerin son 2 sayısı, " + w.mainAddress[1].toString() + " ve " + w.mainAddress[2].toString() + ", 100 etmiyor";
	}
	else if(listenTotal != 100)
	{
		result = "UYARI: weight.js dosyasının \"listenAdjeNoun\" değerin son 2 sayısı, " + w.listenAdjeNoun[0].toString() + " ve " + w.listenAdjeNoun[1].toString() + ", 100 etmiyor";
	}
	else if(listenWhatTotal != 100)
	{
		result = "UYARI: weight.js dosyasının \"listenWhat\" değerin son 2 sayısı, " + w.listenWhat[0].toString() + " ve " + w.listenWhat[1].toString() + ", 100 etmiyor";
	}
	else
	{
		result = true;
	}
	return result;
}
