<?php
 
//connection to the database
$servername = 'SERVER_NAME';
$username = 'DB_USERNAME';
$password = 'DB_PASSWORD';
$dbname = 'DB_NAME';

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
header('Content-Type: application/json');

$venue_id = isset($_GET['venueID']) ? $_GET['venueID'] : null;
$catering_grade = isset($_GET['cateringGrade']) ? $_GET['cateringGrade'] : null;
$date = isset($_GET['date']) ? $_GET['date'] : null;
$capacity = isset($_GET['capacity']) ? $_GET['capacity'] : null;
$budget = isset($_GET['budget']) ? $_GET['budget'] : null;

//Errors with Budget and Capacity
$errors = [];

if (!filter_var($capacity, FILTER_VALIDATE_INT) || $capacity <= 0) {
    $errors[] = 'Capacity must be greater than 0.';
}
if (!filter_var($budget, FILTER_VALIDATE_INT) || $budget < 0) {
    $errors[] = 'Budget must be greater than 0.';
}

if (count($errors) > 0) {
    echo json_encode(['error' => implode(' ', $errors)]);
    exit; //send errors back to JS and don't continue
}

//No errors so get data for venue inputted
$sql = "SELECT v.venue_id, v.name, v.capacity, v.latitude, v.longitude, v.weekend_price, v.weekday_price, c.grade, c.cost as catering_cost, (CASE WHEN WEEKDAY('$date') >= 5 THEN v.weekend_price ELSE v.weekday_price END) AS venue_price
        FROM venue v 
        LEFT JOIN venue_booking b ON v.venue_id = b.venue_id
        LEFT JOIN catering c ON v.venue_id = c.venue_id
        WHERE v.venue_id = $venue_id AND c.grade = $catering_grade
        AND v.venue_id NOT IN ( /*check ID isn't in table for date*/
                                                SELECT venue_id
                                                FROM venue_booking
                                                WHERE booking_date = '$date')
        GROUP BY v.venue_id, v.name, v.capacity, v.weekend_price, v.weekday_price, v.licensed ,v.latitude, v.longitude, c.cost";


$venueResult = mysqli_query($conn, $sql);

$venueArray = array();
while ($row = mysqli_fetch_array($venueResult, MYSQLI_ASSOC)) {
    $venueArray[] = $row;
}

mysqli_close($conn);
    
echo json_encode($venueArray);

?>