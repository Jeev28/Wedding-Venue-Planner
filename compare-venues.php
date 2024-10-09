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

//RATING GRAPH
$venue_id = intval($_GET['venue_id']);

//No errors so get data for venue inputted
$ratingSql = "SELECT DISTINCT v.venue_id, v.name, v.capacity, v.latitude, v.longitude, v.weekend_price, v.weekday_price,
                SUM(CASE WHEN r.score = 0 THEN 1 ELSE 0 END) as score_0_count,
                SUM(CASE WHEN r.score = 1 THEN 1 ELSE 0 END) as score_1_count,
                SUM(CASE WHEN r.score = 2 THEN 1 ELSE 0 END) as score_2_count,
                SUM(CASE WHEN r.score = 3 THEN 1 ELSE 0 END) as score_3_count,
                SUM(CASE WHEN r.score = 4 THEN 1 ELSE 0 END) as score_4_count,
                SUM(CASE WHEN r.score = 5 THEN 1 ELSE 0 END) as score_5_count,
                SUM(CASE WHEN r.score = 6 THEN 1 ELSE 0 END) as score_6_count,
                SUM(CASE WHEN r.score = 7 THEN 1 ELSE 0 END) as score_7_count,
                SUM(CASE WHEN r.score = 8 THEN 1 ELSE 0 END) as score_8_count,
                SUM(CASE WHEN r.score = 9 THEN 1 ELSE 0 END) as score_9_count,
                SUM(CASE WHEN r.score = 10 THEN 1 ELSE 0 END) as score_10_count
                FROM venue v 
                LEFT JOIN venue_review_score r ON v.venue_id = r.venue_id
                WHERE v.venue_id = $venue_id
                GROUP BY v.venue_id, v.name, v.capacity, v.weekend_price, v.weekday_price, v.licensed ,v.latitude, v.longitude";


$ratingResult = mysqli_query($conn, $ratingSql);

$ratingArray = array();
while ($row = mysqli_fetch_array($ratingResult, MYSQLI_ASSOC)) {
    $ratingArray[] = $row;
}


//BOOKINGS GRAPH
$bookingSql = "SELECT MONTH(b.booking_date) as month, COUNT(b.booking_date) as bookings
                FROM venue_booking b
                WHERE b.venue_id = $venue_id
                GROUP BY MONTH(b.booking_date)";

$bookingResult = mysqli_query($conn, $bookingSql);

$bookingArray = array();
while ($row = mysqli_fetch_array($bookingResult, MYSQLI_ASSOC)) {
    $bookingArray[] = $row;
}

//Combined
$allGraphData = array("rating" => $ratingArray, "booking" => $bookingArray);


mysqli_close($conn);

echo json_encode($allGraphData);


?>