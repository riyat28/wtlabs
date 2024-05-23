<?php
$servername="localhost";
$username="root";
$password="";
$db="employee";

$conn= new mysqli($servername,$username,$password,$db);

if($conn->connect_error){
    die("Connection failed".$conn->connect_error);
}

if($_POST){
    if(isset($_POST['add'])){
        $name=$_POST['name'];
        $salary=$_POST['salary'];
        $dept=$_POST['dept'];

        $sql="INSERT INTO emp(name, salary ,dept) VALUES ('$name','$salary','$dept')";

        if($conn->query($sql)==TRUE){
            echo "New record added";
        } else {
            echo "Failed: " . $sql . "<br>" . $conn->error;
        }
    }
}

if(isset($_POST['read'])){
    $sql="SELECT * from emp";
    $result=$conn->query($sql);

    if($result->num_rows>0){
        echo '<table style="border-collapse:collapse; width:100%; border:1px solid black;">';
        echo  '<tr><th>ID</th><th>Name</th><th>Salary</th><th>Department</th></tr>';
        while($row=$result->fetch_assoc()){
           echo "<tr><td>{$row['id']}</td><td>{$row['name']}</td><td>{$row['salary']}</td><td>{$row['dept']}</td> </tr>" ;
        }
        echo '</table>';

    }
    else{
        echo "0 results";
    }
}

if(isset($_POST['update'])){
    $id=$_POST['id'];
    $name=$_POST['name'];
    $salary=$_POST['salary'];
    $dept=$_POST['dept'];

    $sql="UPDATE emp SET name= '$name',salary='$salary',dept='$dept' WHERE id=$id";

    if($conn->query($sql)==TRUE){
        echo "New record update";
    } else {
        echo "Failed: " . $sql . "<br>" . $conn->error;
    }
}

if(isset($_POST['delete'])){
    $id=$_POST['id'];
    $sql="DELETE FROM EMP WHERE id=$id";

    if($conn->query($sql)==TRUE){
        echo "Record deleted";
    } else {
        echo "Failed: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();

?>

<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
Name <input type="text" name="name"><br>
Salary <input type="text" name="salary"><br>
Department <input type="text" name="dept"><br>
<input type="submit" name="add" value="Add">
</form>

<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
<input type="submit" name="read" value="Read">
</form>

<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
ID <input type="text" name="id"><br>
Name <input type="text" name="name"><br>
Salary <input type="text" name="salary"><br>
Department <input type="text" name="dept"><br>
<input type="submit" name="update" value="Update">
<input type="submit" name="delete" value="Delete">
</form>




