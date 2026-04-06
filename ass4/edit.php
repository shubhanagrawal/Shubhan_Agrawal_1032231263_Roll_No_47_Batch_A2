<?php
// Include the database connection
include 'db.php';

// Get the student ID from the URL
$id = $_GET['id'];

// Fetch the current data for this student
$fetch_query = "SELECT * FROM student WHERE id = $id";
$result = mysqli_query($conn, $fetch_query);
$student = mysqli_fetch_assoc($result);

// Handle the form submission for updating
if(isset($_POST['update'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    // SQL query to update the data
    $update_query = "UPDATE student SET name='$name', email='$email', mobile='$mobile', department='$department' WHERE id=$id";
    
    if(mysqli_query($conn, $update_query)){
        // Alert the user and redirect back to the main page
        echo "<script>
                alert('Student record updated successfully!');
                window.location.href = 'index.php';
              </script>";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Student</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .form-container { padding: 15px; border: 1px solid #ccc; width: 300px; }
        input[type="text"], input[type="email"] { width: 100%; margin-bottom: 10px; padding: 5px; }
        .back-link { display: inline-block; margin-top: 15px; text-decoration: none; color: blue; }
    </style>
</head>
<body>

<h2>Edit Student Record</h2>
<div class="form-container">
    <form method="POST" action="">
        <label>Name:</label>
        <input type="text" name="name" value="<?php echo $student['name']; ?>" required>
        
        <label>Email:</label>
        <input type="email" name="email" value="<?php echo $student['email']; ?>" required>
        
        <label>Mobile:</label>
        <input type="text" name="mobile" value="<?php echo $student['mobile']; ?>" required>
        
        <label>Department:</label>
        <input type="text" name="department" value="<?php echo $student['department']; ?>" required>
        
        <input type="submit" name="update" value="Update Student">
    </form>
</div>

<a href="index.php" class="back-link">← Back to Home</a>

</body>
</html>