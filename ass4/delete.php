<?php
// Include the database connection
include 'db.php';

// Get the student ID from the URL
$id = $_GET['id'];

// SQL query to delete the data
$delete_query = "DELETE FROM student WHERE id = $id";

if(mysqli_query($conn, $delete_query)){
    // Alert the user and redirect back to the main page
    echo "<script>
            alert('Student deleted successfully!');
            window.location.href = 'index.php';
          </script>";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}
?>