
//Apple ID login
window.fbAsyncInit = function() 
{
    FB.init({
      appId      : '823637307672462',
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
var permission = "email,read_friendlists,user_status,user_likes,user_relationships,user_about_me,user_birthday,friends_status,read_stream,manage_notifications,publish_actions,user_groups,user_events";
function Login()
{
	FB.login(function(response) 
	{
		if (response.authResponse) 
		{
		   	var access_token = FB.getAuthResponse()['accessToken'];
		   	//console.log('Access Token = '+ access_token);
		   	FB.api('/me', function(response)
		   	{
		   		console.log('Good to see you, '+ response.name+ '.');
		   	});
		    	getUserInfo();
		    	//getPermissions();
  			}
  			else 
  			{
  	    	 		console.log('User cancelled login or did not fully authorize.');
   			}
	},{scope: permission});
}
//////////////////////////////////////////////////
function Logout()
{
	FB.logout(function(){document.location.reload();});
}
///////////////////////////////////////////////////
/*
function getPermissions() 
{
	FB.api('/me/permissions', function(response) {
			console.log(response);
	  	  	    
    });
}*/
