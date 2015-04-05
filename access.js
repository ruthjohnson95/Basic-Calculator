//Apple ID login
window.fbAsyncInit = function() 
{
    FB.init({
      appId      : '684343951691384',
      xfbml      : true,
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      version    : 'v2.2'
    });
};
//don't know what this does but don't touch it
(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//login
//login
var wordOpt={value:" "};
var permission = "email,read_friendlists,user_status,user_likes,user_relationships,user_about_me,user_birthday,friends_status,read_stream,manage_notifications,publish_actions,user_groups,user_events";
function Login() //current version
{
	FB.login(function(response) 
	{
		if (response.authResponse) 
		{
		   	var access_token = FB.getAuthResponse()['accessToken'];
		   	//console.log('Access Token = '+ access_token);
		   	
		   	//publishing 
		   	/* make the API call */
		   	wordOpt.value=document.getElementById("input").value;
    			console.log(wordOpt.value);
    				
			FB.api("/me/feed", "POST",
    			{
    				
				"message": wordOpt.value
			 },
				 function (response) {
				 	console.log("Testing");
			   if (response && !response.error) {
			   		console.log("Testing2");
				  /* handle the result */
      			}
			  }
			); 
		   	
		   	FB.api('/me', function(response)
		   		{
		   			console.log('Good to see you, '+ response.name+ '.');
		   		});
		    //	getUserInfo();
		    	//getPermissions();
  		}

	},{scope: permission});
}

///////////////////////////////////////////////////////////////////////////
/*function PostMessage()*/ 
var wordOpt={value:" "};

 function PostMessage()
{
	FB.login(function(response) 
	{
		if (response.authResponse) 
		{
		   	var access_token = FB.getAuthResponse()['accessToken'];
		   	//console.log('Access Token = '+ access_token);
		   	console.log("testing...");
		   	//publishing 
		   	wordOpt.value=document.getElementById("input").value;
			console.log(document.getElementById("input").value);
		   	
		   	/* make the API call */
			FB.api("/me/feed", "POST",
    			{
				  "message": wordOpt.value
			 },
				 function (response) {
				 	console.log("Testing");
			   if (response && !response.error) {
			   		console.log("Testing2");
				  /* handle the result */
      			}
			  }
			);
		   	
		   	FB.api('/me', function(response)
		   		{
		   			console.log('Good to see you, '+ response.name+ '.');
		   		});
		    //	getUserInfo();
		    	//getPermissions();
  		}

	},{scope: permission});
}
/////////////////////////////////////////////////
/*
var wordOpt={value:" "};

function message()
{	
	wordOpt.value=document.getElementById("input").value;
	console.log(document.getElementById("input").value);
	FB.api('/search?q='+wordOpt.value+'&type=event', function(response) 
	{
		for(var r=0;r<50;r++)
		{
			console.log(response.data[r].id);
			traceEvent(response.data[r].id,"forworld");
		}	
    	});
    	
}
*/

///////////////////////////////////////////////////
/*
function getPermissions() 
{
	FB.api('/me/permissions', function(response) {
			console.log(response);
	  	  	    
    });
}*/
