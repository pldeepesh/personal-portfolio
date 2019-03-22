$(document).ready(function()
{
	$(".freelancer").mouseenter(function()
	{
		$(this).removeClass("freelancer")
		$(this).addClass("freelancer-mouseenter")
		$(this).fadeTo("fast",0.6)
	});
	$(".freelancer").mouseleave(function()
	{
		$(this).removeClass("freelancer-mouseenter");
		$(this).addClass("freelancer")
		$(this).fadeTo("slow",1)
	});

});