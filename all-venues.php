<?php
   ini_set('display_errors', 1);
   ini_set('display_startup_errors', 1);
   error_reporting(E_ALL);
   
    
    $servername = 'SERVER_NAME';
    $username = 'DB_USERNAME';
    $password = 'DB_PASSWORD';
    $dbname = 'DB_NAME';

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    header('Content-Type: application/json');

    //Value Filters
    $price = isset($_GET['price']) ? $_GET['price'] : null;
    $capacity = isset($_GET['capacity']) ? $_GET['capacity'] : null;
    $rating = isset($_GET['rating']) ? $_GET['rating'] : null;
    $cateringGrade = isset($_GET['cateringGrade']) ? $_GET['cateringGrade'] : null;
    $licensed = isset($_GET['licensed']) ? $_GET['licensed'] : null;
    $dateSelector = isset($_GET['dateSelectorValue']) ? $_GET['dateSelectorValue'] : null;
    $dateType = isset($_GET['dateTypeValue']) ? $_GET['dateTypeValue'] : 'any';

    //SQL Statment - build up depending on filters added
    $venuesSql = "SELECT v.venue_id, v.name, v.capacity, AVG(r.score) AS average_rating,v.licensed, v.latitude, v.longitude, v.weekend_price, v.weekday_price, COUNT(b.venue_id) AS popularity";

    if (!empty($cateringGrade) && $cateringGrade !== 'any') {
        $venuesSql .= ", c.grade";
    }

    $venuesSql .=  " FROM venue v 
                    LEFT JOIN venue_review_score r ON v.venue_id = r.venue_id
                    LEFT JOIN venue_booking b ON v.venue_id = b.venue_id";
    
    if (!empty($cateringGrade) && $cateringGrade !== 'any') {
        $venuesSql .= " LEFT JOIN catering c ON v.venue_id = c.venue_id";
    }

    $venuesSql .= " WHERE 1=1";

    if ($price !== '0') {
        if (!empty($dateSelector)) {
            $venuesSql .= " AND (CASE
                                    WHEN WEEKDAY('$dateSelector') >= 5 THEN v.weekend_price
                                    ELSE v.weekday_price END)
                                    <= $price";
        } else if ($dateType !== 'any') {
            if ($dateType === 'weekend') {
                $priceType = 'v.weekend_price';
            } else if ($dateType === 'weekday') {
                $priceType = 'v.weekday_price';
            }
            $venuesSql .= " AND $priceType <= $price";
        }
    }

    if (!empty($dateSelector)) {
        $venuesSql .= " AND v.venue_id NOT IN ( /*check ID isn't in table for date*/
                                                SELECT venue_id
                                                FROM venue_booking
                                                WHERE booking_date = '$dateSelector')";
    }

    if (!empty($cateringGrade) && $cateringGrade !== 'any') {
        $venuesSql .= " AND c.grade = $cateringGrade";
    }

    if (!empty($capacity)) {
        $venuesSql .= " AND v.capacity >= $capacity";
    }

    if (!empty($licensed) && $licensed !== 'any') {
        if ($licensed === 'yes') {
            $venuesSql .= " AND v.licensed = 1";
        } else {
            $venuesSql .= " AND v.licensed = 0";
        }    
    }
    
    $venuesSql .= " GROUP BY v.venue_id, v.name, v.capacity, v.weekend_price, v.weekday_price, v.licensed ,v.latitude, v.longitude";

    if (!empty($cateringGrade) && $cateringGrade !== 'any') {
        $venuesSql .= ", c.grade";
    }

    if (!empty($rating)) {
        $venuesSql .= " HAVING average_rating >= $rating";
    }

    //Order Filters
    $order = isset($_GET['order']) ? $_GET['order'] : null;

    if ($order == 'capacityOrder') {
        $venuesSql .= " ORDER BY v.capacity DESC";
    }

    if ($order == 'capacityOrderReverse') {
        $venuesSql .= " ORDER BY v.capacity ASC";
    }

    if ($order == 'ratingOrder') {
        $venuesSql .= " ORDER BY average_rating DESC";
    }

    if ($order == 'popularityOrder') {
        $venuesSql .= " ORDER BY popularity DESC";
    }

    if ($order === 'priceOrder') {
        $venuesSql .= " ORDER BY (v.weekend_price + v.weekday_price) / 2 DESC";
    }

    if ($order === 'priceOrderReverse') {
        $venuesSql .= " ORDER BY (v.weekend_price + v.weekday_price) / 2 ASC";
    }


    $venuesResult = mysqli_query($conn, $venuesSql);
   


    $venuesArray = array();
    while ($row = mysqli_fetch_array($venuesResult, MYSQLI_ASSOC)) {
        $venuesArray[] = $row;
    }

    // + Catering
    $cateringSql = "SELECT * FROM catering";
    $cateringResult = mysqli_query($conn, $cateringSql);

    $cateringArray = array();
    while ($row = mysqli_fetch_array($cateringResult, MYSQLI_ASSOC)) {
        $cateringArray[] = $row;
    }

    //Combined
    $allVenueData = array("venues" => $venuesArray, "catering" => $cateringArray);


    mysqli_close($conn);
    
    echo json_encode($allVenueData);

?>