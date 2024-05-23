<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "form";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function calculate($units)
{
    $bill = 0.0;
    $unit_first = 3.50;
    $unit_second = 4.00;
    $unit_third = 5.20;
    $unit_fourth = 6.50;

    if ($units <= 50) {
        $bill = $units * $unit_first;
    } elseif ($units <= 150) {
        $bill = (50 * $unit_first) + (($units - 50) * $unit_second);
    } elseif ($units <= 250) {
        $bill = (50 * $unit_first) + (100 * $unit_second) + (($units - 150) * $unit_third);
    } else {
        $bill = (50 * $unit_first) + (100 * $unit_second) + (100 * $unit_third) + (($units - 250) * $unit_fourth);
    }

    return number_format($bill, 2, '.', '');
}

$result_str = '';

if (isset($_POST['submit'])) {
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $mobileno = $_POST['mobileno'];
    $payment = $_POST['payment'];
    $units = $_POST['units'];
    $result = calculate($units);
    $result_str = "BILL FOR " . $units . " UNITS is " . $result;

    $sql = "INSERT INTO bill_entry (firstname, lastname, email, mobileno, payment, units, result) VALUES ('$firstname', '$lastname', '$email', '$mobileno', '$payment', '$units', '$result')";
    if ($conn->query($sql) === TRUE) {
        echo '<div>'.$result_str.'</div>';
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Calculate Bill Using PHP and MySQL</title>
</head>
<body>
    <h3>Bill Calculator using PHP and MySQL</h3>
    <form method="post" action="">
        <div>
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname">
        </div>
        <div>
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname">
        </div>
        <div>
            <label for="email">Email</label>
            <input type="text" id="email" name="email">
        </div>
        <div>
            <label for="mobileno">Mobile Number</label>
            <input type="tel" id="mobileno" name="mobileno">
        </div>
        <div>
            <label for="payment">Payment Mode</label>
            <select id="payment" name="payment">
                <option value="upi">UPI</option>
                <option value="cash">CASH</option>
                <option value="netbanking">NET BANKING</option>
                <option value="debitcard">DEBIT CARD</option>
            </select>
        </div>
        <div>
            <label for="units">Electricity Units</label>
            <input type="number" id="units" name="units">
        </div>
        <button type="submit" name="submit">Calculate</button>
    </form>
</body>
</html>
