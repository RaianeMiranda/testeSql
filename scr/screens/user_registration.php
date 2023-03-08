
<?php
 
// Importing DBConfig.php file.
include './scr/config/MySql.php';
 
// Creating connection.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 // Populate User name from JSON $obj array and store into $name.
$nome = $obj['nome'];
 
// Populate User email from JSON $obj array and store into $email.
$idEmail = $obj['idEmail'];
 
// Populate Password from JSON $obj array and store into $password.
$senha = $obj['senha'];

//Checking idEmail is already exist or not using SQL query.
$CheckSQL = "SELECT * FROM usuario WHERE idEmail='$idEmail'";

// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));


if(isset($check)){

 $idEmailExistMSG = 'idEmail Already Exist, Please Try Again !!!';
 
 // Converting the message into JSON format.
$idEmailExistJson = json_encode($idEmailExistMSG);
 
// Echo the message.
 echo $idEmailExistJson ; 

 }
 else{
 
 // Creating SQL query and insert the record into MySQL database table.
$Sql_Query = "insert into usuario (nome,idEmail,senha) values ('$nome','$idEmail','$senha')";
 
 
 if(mysqli_query($con,$Sql_Query)){
 
 // If the record inserted successfully then show the message.
$MSG = 'User Registered Successfully' ;
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }
 }
 mysqli_close($con);
?>
