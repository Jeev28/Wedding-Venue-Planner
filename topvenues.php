<?php
    $servername = 'SERVER_NAME';
    $username = 'DB_USERNAME';
    $password = 'DB_PASSWORD';
    $dbname = 'DB_NAME';

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    header('Content-Type: application/json');
    
    $sql = "SELECT v.venue_id, v.name, v.capacity, AVG(r.score) AS average_rating, v.latitude, v.longitude, v.weekend_price, v.weekday_price 
            FROM venue v 
            LEFT JOIN venue_review_score r ON v.venue_id = r.venue_id 
            GROUP BY v.venue_id, v.name, v.capacity, v.weekend_price, v.weekday_price, v.latitude, v.longitude 
            ORDER BY average_rating DESC 
            LIMIT 3;";
    
    $result = mysqli_query($conn, $sql);

    $venueArray = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $venueArray[] = $row;
    }

    // + Catering
    $cateringSql = "SELECT * FROM catering";
    $cateringResult = mysqli_query($conn, $cateringSql);

    $cateringArray = array();
    while ($row = mysqli_fetch_array($cateringResult, MYSQLI_ASSOC)) {
        $cateringArray[] = $row;
    }

    //Combined
    $allVenueData = array("venues" => $venueArray, "catering" => $cateringArray);


    

    mysqli_close($conn);
    
    echo json_encode($allVenueData);

?>