<?php
// Include the database connection file we made earlier
include 'db.php';

// Handle form submission for adding a new student
if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    // SQL query to insert data
    $sql = "INSERT INTO student (name, email, mobile, department) VALUES ('$name', '$email', '$mobile', '$department')";
    
    if(mysqli_query($conn, $sql)){
        echo "<script>alert('New student added successfully!');</script>";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student CRUD Application</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .form-container { margin-bottom: 30px; padding: 15px; border: 1px solid #ccc; width: 300px; }
        input[type="text"], input[type="email"] { width: 100%; margin-bottom: 10px; padding: 5px; }
    </style>
</head>
<body>

<h2>Add New Student</h2>
<div class="form-container">
    <form method="POST" action="">
        <label>Name:</label>
        <input type="text" name="name" required>
        
        <label>Email:</label>
        <input type="email" name="email" required>
        
        <label>Mobile:</label>
        <input type="text" name="mobile" required>
        
        <label>Department:</label>
        <input type="text" name="department" required>
        
        <input type="submit" name="submit" value="Save Student">
    </form>
</div>

<hr>

<h2>Student Records</h2>
<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Department</th>
        <th>Action</th>
    </tr>

    <?php
    // SQL query to fetch all students
    $fetch_data = "SELECT * FROM student";
    $result = mysqli_query($conn, $fetch_data);

    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>" . $row['id'] . "</td>";
            echo "<td>" . $row['name'] . "</td>";
            echo "<td>" . $row['email'] . "</td>";
            echo "<td>" . $row['mobile'] . "</td>";
            echo "<td>" . $row['department'] . "</td>";
            // These links will point to the edit and delete files we are about to make
            echo "<td>
                    <a href='edit.php?id=" . $row['id'] . "'>Edit</a> | 
                    <a href='delete.php?id=" . $row['id'] . "' onclick='return confirm(\"Are you sure you want to delete this record?\");'>Delete</a>
                  </td>";
            echo "</tr>";
        }
    } else {
        echo "<tr><td colspan='6'>No students found in the database.</td></tr>";
    }
    ?>
</table>

</body>
</html>