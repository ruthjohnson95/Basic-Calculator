
//var indicator = false;
//like omg srs going with my betches for pumpkin spice lattes while we watch the notebook

function parse(indicator, text, word)
{
	console.log("text: " + text);
	console.log("made it into parse");
	// Look for "F" in the text
	
	//count number of hashtags
	for(var i = 0; i < text.length; i++)
	{
		if(text.charAt(i) == '#')
		{
			hash_count++;
			console.log("Found a #");
		}
	}
	
	var basicWordsRemain = true;
	var searchInd = 0;
	
	while(basicWordsRemain && searchInd < text.length)
	{
		var basicInd = text.indexOf(word,searchInd);
		console.log("Word we want: " + word);
		
		if(basicInd == -1){
			console.log("Breaking");
			break; //couldn't find the word; so stop searching
		} 
		
		console.log("Found the word " + word);
		indicator.value = true; 
		searchInd = basicInd + 1;
		basic_count++;	
	}

	console.log("Ryan Gosling hotness: " + basic_count);
	
	if(word == "goat cheese")
	{
		var str = "<p>" + basic_count + "</p>";
	 	console.log("PH num to send to HTML " + basic_count);
	 	document.getElementById("phNum").innerHTML=str;
	 	//basic_count = 0;
	}
}
