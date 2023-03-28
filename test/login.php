<?php  
$host = "localhost";
$user = "lakshman_student";
$password = "deepesh@!@#$";
$db = "lakshman_admins";

$con = mysqli_connect($host,$user,$password,$db);
if($con)
{
	echo "<p> the connection to database is established </p>";
}

$user_name = $_POST['username'];
$password = $_POST['password'];
echo $user_name." ".$password;
$query = "select user_name,password from Users where user_name=\'".$user_name."\' and password=\'".$password."\'";

$result = mysqli_query(query);
echo $result;
$data=mysqli_fetch_assoc($result);
if ($data["user_name"]==$user_name and $data["password"]==$password)
 {
	echo "<p> login successful</p>";
}
mysqli_close($con)
?>