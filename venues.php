<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <!--Font: Font Awesome-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css" integrity="sha256-PF6MatZtiJ8/c9O9HQ8uSUXr++R9KBYu4gbNG5511WE=" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha384-..." crossorigin="anonymous">
        <!--Font: Josephin Sans-->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
        <!--Judson Font-->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Judson:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
        <title>Wedding Planner</title>
        <!--Favicon-->
        <link rel="icon" type="image/x-icon" href="House.ico">
        <!--Link to CSS-->
        <link rel="stylesheet" href="venues-style.css">
        <link rel="stylesheet" href="home-style.css">
        <link rel="stylesheet" href="media-queries.css">
        <!--Link to AOS Library-->
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
        <!--Leaflet CSS-->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
    </head>



    <body>
    
        <div class="over-lay"></div>


        <header class="venues-header">
            <div class="venues-header-text">
                <h2 class="text-xl">Search Venues</h2>
                <p class="text-sm">Browse by various filters to find 
                   your perfect venue!
                </p>
                <!--Add Icons, Images, Line art into this-->
            </div>
        </header>

        <section class="venues-buttons">
            <div class="left">
                <!--Filters btn + Number of venues-->
                <a class="btn btn-cream venue-filter-btn" href=""><i class="fa fa-solid fa-sliders"></i>Filters</a>
                <p class="numReturns"></p>
            </div>

            <div class="right">
                <!--Tabs-->
                <div class="right-btn-container">
                    <ul>
                        <li id="list-tab" class="btn btn-brown active"><i id="list-tab" class="fa fa-solid fa-grip"></i>List</li>
                        <li id="cost-tab" class="btn btn-brown"><i id="cost-tab" class="fa fa-solid fa-sterling-sign"></i>Budget</li>
                        <li id="map-tab" class="btn btn-brown"><i id="map-tab" class="fa fa-solid fa-location-dot"></i>Map</li>
                        <li id="compare-tab" class="btn btn-brown" href=""><i id="compare-tab" class="fa fa-solid fa-chart-line"></i>Compare</li>
                    </ul>
                </div>
            </div>
        </section>

    
        <!--Order By Filters Section-->
        <section class="basic-filters">
            <div class="basic-filters-header">
                <h4>Sort By</h4>
            </div>
            <div class="basic-filters-body">
                <div class="basic-filters-body-content">
                    <div>
                        <a class="btn btn-cream text-uppercase basic-filter-btn" id="capacity-basic-filter" href="">Capacity (High to Low)</a>
                        <a class="btn btn-cream text-uppercase basic-filter-btn" id="capacity-basic-filter-reverse" href="">Capacity (Low to High)</a>
                    </div>

                    <div>
                        <a class="btn btn-cream text-uppercase basic-filter-btn" id="price-basic-filter" href="">Price (High to Low)</a>
                        <a class="btn btn-cream text-uppercase basic-filter-btn" id="price-basic-filter-reverse" href="">Price (Low to High)</a>
                    </div>

                    <div>
                        <a class="btn btn-cream text-uppercase basic-filter-btn" id="rating-basic-filter" href="">Rating</a>
                        <a class="btn btn-cream text-uppercase basic-filter-btn" id="popularity-basic-filter" href="">Popularity</a>
                    </div>
                </div>
               
            </div>
          
        </section>
      

        <section class="venues-content">
            <!--List of Venues-->
            <div id="list-tab-content" class="venues-tab-content showTab" data-aos="fade-up">
                <!--cards of venues-->
            </div>

            <!--Budget Calculator-->
            <div id="cost-tab-content" class="venues-tab-content">
                <div class="budget-intro">
                    <p>Provide us with the details of your dream wedding, and we'll help you ensure that it fits within your budget.
                        Simply enter the venue you have in mind, your desired date, catering preferences, the number of guests, and your budget. Let us do the rest to make your special day unforgettable.
                    </p>
                    <div class="line-long"></div>
                </div>

                <form class="calculator-form">
                    <div class="calculator-form-header">
                        <h4>Enter Details</h4>
                        <i class="fa fas fa-minus fa-sm"></i>
                    </div>

                    <div class="calculator-form-body">

                        <div>
                            <div class="calculator-form-filter">
                                <h4>Venue</h4>
                                <select required name="venues" id="venuesList">
                                </select>
                            </div>

                            <div class="calculator-form-filter">
                                <h4>Num of Guests</h4>
                                <input required min="1" id="calc-capacity" type="number">
                            </div>
                        </div>

                        <div>
                            <div class="calculator-form-filter">
                                <h4>Catering Grade</h4>
                                <select required name="catering" id="cateringGradeList">
                                </select>
                            </div>

                            <div class="calculator-form-filter">
                                <h4>Budget</h4>
                                <div class="calculator-budget-inner">
                                    <h4>£</h4>
                                    <input required min="1" id="budget" type="number">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="calculator-form-filter">
                                <h4>Date</h4>
                                <input required id="date" type="date">
                            </div>

                            <div class="calculator-form-filter">
                                <a href="" class="btn btn-brown text-uppercase" id="calculate-btn">Apply</a>
                            </div>

        
                        </div>

                    </div>

                    <p class="calculator-error-msg"></p>
                </form>

                <!--Calculator Result-->
                <div class="calc-result-container"></div>

                <div class="calc-weather-container">
                </div>

            </div>

            <!--Map View-->
            <div  id="map-tab-content" class="venues-tab-content">
                <div class="map-filter-list">
                    <h3>Choose Venues</h3>
                    <select name="venues-list" id="venues-map-list"></select>
                </div>
                
                <div id="map"></div>
                <p style="color:gray;margin-top:0.4rem;">If the map doesn't intially load after several seconds, resize your screen.</p>
            </div>

            <!--Data Vis-->
            <div id="compare-tab-content" class="venues-tab-content">
                <div style="height: 500px">
                    <canvas id="priceChart" style="width:100%;max-width: 100%;margin-top: 1rem;"></canvas>
                </div>

                <div class="compare-filter-list">
                    <h3>Choose Venues</h3>
                    <select name="venues-list-compare" id="venues-compare-list"></select>
                </div>
                <p>Choose a venue, and see a breakdown of the ratings and bookings over time.</p>

                <div style="height: 500px">
                    <canvas id="ratingChart" style="width:100%;max-width: 100%;"></canvas>
                </div>

                <div style="height: 500px">
                    <canvas id="bookingChart" style="width:100%;max-width: 100%;"></canvas>
                </div>
            </div>
        </section>

        <!--Error if no venues-->
        <section class="no-venues-error">
            <div class="error-txt">
                <p>Sorry, we found no venues matching your search.<br>Please try again, and refine your filters.</p>
                <a href="" id="reset-btn" class="btn btn-cream text-uppercase">Reset</a>
            </div>
        </section>

        <!--Filter Modal-->
        <form class="filter-modal" id="filter-form">
            <div class="filter-modal-header">
                <h2 class="text-sm">Filters</h2>
                <i class="fa fa-x"></i>
            </div>

            <div class="filter">
                <div class="filter-info">
                    <h3 class="filter-header">Venue Price</h3>
                    <p id="priceValue">All Prices</p>
                </div>
                <input id="price" type="range" class="slider" min="0" max="8000" value="0" step="250" oninput="priceValue.innerText = `£0 - £${this.value}`">
            </div>

            <div class="filter">
                <div class="filter-info">
                    <h3 class="filter-header">Number of Guests</h3>
                    <p id="capacityValue">No Limit</p>
                </div>
                <input id="capacity" type="range" class="slider" min="0" max="1000" value="0" step="50" oninput="capacityValue.innerText = `${this.value}+ Guests`">
            </div>

            <div class="filter">
                <div class="filter-info">
                    <h3 class="filter-header">Rating</h3>
                    <p id="ratingValue">All Ratings</p>
                </div>
                <input id="rating" type="range" class="slider" min="0" max="10" value="0" step="1" oninput="ratingValue.innerText = `${this.value}+`">
            </div>

            <div class="filter-bottom">
                <div class="filter">
                    <div class="filter-info">
                        <h3 class="filter-header">Serves Alcohol</h3>
                    </div>
                    <select name="licensed" id="licensed">
                        <option value="any">Any</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div class="filter">
                    <div class="filter-info">
                        <h3 class="filter-header">Catering</h3>
                    </div>
                    <select name="catering" id="catering">
                        <option value="any">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div class="filter date-type-filter">
                    <div class="filter-info">
                        <h3 class="filter-header">Price Type</h3>
                    </div>
                    <select name="dateType" id="dateType">
                        <option value="any">Any</option>
                        <option value="weekend">Weekend</option>
                        <option value="weekday">Weekday</option>
                    </select>
                </div>
            </div>

            <div class="filter date-selector-filter">
                <div class="filter-info">
                    <h3 class="filter-header">Available On</h3>
                </div>
                <input type="date" name="availability" id="availability">
            </div>


            
            <div class="filter-bottom-text">
                <p class="filter-error-msg"></p>
                <P>Pick a date and we will provide pricing for that date. Otherwise, if the date 
                    is unknown, choose between Weekend or Weekday prices.
                </P>
            </div>

            <div class="filter-modal-buttons">
                <ul>
                    <li id="reset-btn" class="btn btn-cream text-uppercase"><a id="reset-btn" href="">Reset</a></li>
                    <li id="apply-btn" class="btn btn-brown text-uppercase"><a href="">Apply</a></li>
                </ul>
            </div>
        </form>
 


        
        <!--Leaflet JS-->
        <script src="
https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
        <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
        <script src="venues.js" defer></script>
    </body>
</html>
