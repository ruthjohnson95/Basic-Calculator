
//var indicator = false;

function parse(indicator, text, word){

// Look for "F" in the text
for(var i = 0; i < text.length; i++) {
	if(text[i]==hashtag[0]){
		counsole.log("hashtag");
		hash_count = hash_count + 1 ;	
	}
	
	}
	if (text[i] == word[0]) {
		var j=1;
		i++;
		// If we find it, add characters up to
		// the length of my name to the array
		while(j<word.length)
		{
			if(text[i]==word[j])
			{
				i++;j++;
			}
			else
			break;
		}
		if(j==word.length)
		{
			console.log("FOUND IT");
			basic_count = basic_count + 1; 
			counsole.log(text[i]);
			counsole.log(basic_count);
			indicator.value=true;
		}
	
	}
}}
