var num1 = 0;
var num2 = 0;
var count =0;

function problem()
{
	console.log("opened the function")
	console.log(num1)

	if (count==2)
	{
		console.log(count)
		document.getElementById('answer').addClass = invisible
	}
	else
	{
		if (document.getElementById('answer').value == num1+num2)
		{
			count = count+1
			console.log('correct')
		}
		else
		{
			count=count-1
		}
		number1 = Math.floor(Math.random()*1000);
		number2 = Math.floor(Math.random()*1000);
		num1=number1;
		num2=number2
		document.getElementById('problem_area').innerHTML=number1+"\n+"+number2;
	}
}