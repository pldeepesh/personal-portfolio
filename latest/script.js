function works(work)
{
	if (work==1) 
	{
		document.getElementById("heading").innerHTML = "DATA ANALYST";
		document.getElementById("content").innerHTML = "I am a Data Analyst currently working at <a href=\"https://practo.com\" target=\"blank\">practo</a>.<br>Some of my works includes<br><br>1.Machine learning<br>2.Creating business models<br>3.Data interpretation<br>4.Regression<br>5.cluster Analysis";
	}

	else if (work==2) 
	{
		document.getElementById("heading").innerHTML = "WEB DEVELOPER";
		document.getElementById("content").innerHTML = "I am a WEB Developer by DNA. Here are some of the skills i know.You can find more <a href = \"http://www.github.com/pldeepesh\" target=\"_blank\">here</a>.<br><br>1.HTML<br>2.CSS<br>3.Bootstrap<br>4.Jquery<br>5.Javascript<br>6.MySQL "
	}

	else if (work==3) 
	{
		document.getElementById("heading").innerHTML = "ENTREPRENEUR";
		document.getElementById("content").innerHTML = "From dealing pokemon cards from childhood to building products for a living at a large scale, I have been and entrepreneur by birth and being a Data analyst comes handy all the time.Here are some of the thinks i can do.<br><br>1.Martket research<br>2.Strategy planning<br>3.Implementation and Analysis"		
	}

}

function contact_me()
{
	document.getElementById("address").className = "content-pane"
}