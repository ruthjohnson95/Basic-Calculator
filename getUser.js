////////TODO: FEED THE SUBMIT RESULT HERE 

function getUserInfo() 
{
	FB.api('/me', function(response) 
	{
		var str="<p>"+response.name+"</p>";
	  	var str2 ="Logout";
	  	document.getElementById("status").innerHTML=str;
		document.getElementById("demo").innerHTML=str2;
	 	getPhoto();	 
	 	
	 	var strtab="<div id='content'>"+"<ul id='tabs' class='nav nav-tabs nav-justified' data-tabs='tabs'>"
	 	+"<li class='active'><a href='#red' onclick='forYou()' data-toggle='tab'>Events for You</a></li>"
	 	+"<li><a href='#green' onclick='getFeed()' data-toggle='tab'>Events in UCLA</a></li>"
	 	+"<li><a href='#yellow' onclick='noInput()' data-toggle='tab'>" 
	 	+"<form id= 'myForm'><div class='form-group'>"
	 	+"<input type='text' id = 'input' class='form-control' placeholder='Events Around the world..' >"
	 	+"</div> <button onclick='getWorld()' class='btn btn-default'>Go!</button>"
	 	+"</form></a></li>"
	 	+"</ul><div id='my-tab-content' class='tab-content'>"
	 	+"<div class='tab-pane active' id='red'><br><br><p id='forya'></p></div>"
	 	+"<div class='tab-pane' id='green'><br><br><p id='foreveryone'></p></div>"
	 	+"<div class='tab-pane' id='yellow'><br><br><p id='forworld'></p></div></div></div>";
	 	
	 	document.getElementById("container2").innerHTML=strtab;
	 	forYou();
	 	
	 	/*
	 	+"<div class='row'>"
  +"<div class='col-lg-6'>"
    +"<div class='input-group'>"
      +"<span class='input-group-btn'>"+
        +"<button class='btn btn-default' type='button'>Go!</button></span>"
      +"<input type='text' class='form-control' placeholder='Search for...'>"
    +"</div></div></div>"
	 	*/
	 	
    	});
}
///handles search

function noInput() {
	var str = "Search for free stuff in the search bar" 
	document.getElementById("forworld").innerHTML=str;
}
var wordOpt={value:" "};

function getWorld()
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
function forYou()
{
	getUserGroups();
	getNotif();
}
function getFeed()
{
	wordOpt.value=" ";
	for(var a=0; a<openGroups.length;a++)
	{
	id=openGroups[a];
	FB.api('/'+id+'/?fields=feed', function(response) 
	{
		var str="";
		for(var i=0; i<10; i++)
		{
			var indicatorMust = {value : false};
			var indicatorOpt = {value : false};
			for(var j=0; j<3;j++)
			{
				parse(indicatorMust,response.feed.data[i].message,wordMusthave[j]);
			}
			parse(indicatorOpt,response.feed.data[i].message,wordOpt.value);
			var str="";
			if(indicatorMust.value==true &&indicatorOpt.value==true )
			{
	  		str="<div class='row'><div class='col-sm-6 col-md-10'>"
	  		+"<div class='thumbnail'><div class='caption'>"
	  		+"<h2><font color='black'>Group: " +response.feed.data[i].to.data[0].name+"</font></h2><br>"
	  		+"<p>Message: "+response.feed.data[i].message+"</p>"
	  		+"<p><a href="+ response.feed.data[i].actions[0].link 
	  		+" class='btn btn-default btn-lg' role='button'>Original Post</a></p></div></div></div></div>";
	  			document.getElementById("foreveryone").innerHTML+=str;
	  		}
		}
	
	
	});
	}
	
}
///////////////////////////////////////////////////
function getPhoto()
{
	FB.api('/me/picture?type=normal', function(response) 
	{
		  var str="<br/><img src='"+response.data.url+"'/>";
	  	  document.getElementById("status").innerHTML+=str;
    	});
}
//////////////////////////////////////////////////
//get the groupID of all the groups the user is in and print out the events created inside
function getUserGroups(){
	FB.api('me/groups', function(response){
		for (var i=0; i<10; i++)
		{
			getMemberEvents(response.data[i].id);
		}
	});
}
///////////////////////////////////////////////////////////
//get the eventID of a given groupID
function getMemberEvents(id) {
	FB.api('/'+id+'/events ', function(response){
		for(var i = 0; i<10; i++) 
		{
			traceEvent(response.data[i].id,"forya");
		}	
	});

}
//////////////////////////////////////////////////
//get the notification of events
function getNotif()
{
	FB.api('me/?fields=notifications{application}', function(response) 
	{
		for(var i = 0; i<10;i++) 
		{
			if(response.notifications.data[i].application.name=="Events")
			{
				console.log(response.notifications.data[i]);
				traceNotif(response.notifications.data[i].id);
			}
		}
    	});
}
//return the eventID from a notification of an invitation
function traceNotif(id)
{
	FB.api('/'+id+'', function(response)
	{
		console.log(response);
		traceEvent(response.object.id,"forya");
	});
}
//print out event info from a given eventID
var img = {ad:null};
function traceEvent(id,domain)
{
	FB.api('/'+id+'', function(response)
	{	var str = "";
		var indicatorMust = {value: false};
		var indicatorOpt = {value: false};
		for (var j=0; j<3; j++)
		{
			parse(indicatorMust, response.description, wordMusthave[j]);
		}
		parse(indicatorOpt, response.description, wordOpt.value);
		if(indicatorMust.value == true && indicatorOpt.value== true)
		{
	  	/////////////////////
	  //	console.log("printed");
	  //	getCover(id,img);
	  	str= "<div class='row'><div class='col-sm-6 col-md-10'><div class='thumbnail'>"
	  	+"<p id='vivian'></p><div class='caption'>"
	  	+"<h2><font color='black'>" +response.name+"</font></h2>"
	  	+"<p>"+response.description+"</p>"
	  	+"<p><a href='https://www.facebook.com/events/"+response.id+"/' class='btn btn-primary' role='button'>"
	  	+"Event Page</a> </p></div></div></div></div>";
		}
	//	console.log(response.name);
		if(domain=="forya")
		{document.getElementById("forya").innerHTML+=str;}
		else if(domain=="forworld")
		{console.log("PLEASE WORK!");
		document.getElementById("forworld").innerHTML+=str;}
		
		
	});
}
/*
function getCover(id,ob)
{
	FB.api('/'+id+'?fields=cover', function(response)
	{
		ob.ad ="<img src="+response.cover.source+" alt='...'>";
	//	document.getElementById("vivian").innerHTML+=str;
	})
}
*/

/////I don't know what it is. Load the SDK asynchronously
 (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
 }(document));

