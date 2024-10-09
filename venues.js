function venuesPageFunctionality() {

    //Venues Tab Buttons + Content 
    venuesTabButtons = document.querySelectorAll('.venues-buttons .right .right-btn-container ul li');
    venuesTabContents = document.querySelectorAll('.venues-content .venues-tab-content');


    //Basic Filters Tab
    const basicFilters = document.querySelector('.basic-filters');
    const resetFiltersBtn = document.querySelector('.filter-modal-buttons #reset-btn');
    const venueErrorSection = document.querySelector('.no-venues-error');
    const overlay = document.querySelector('.over-lay');

    resetFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        basicFilters.style.display = 'block';
        resetFilters();
    });

    //Venue Tabs
    venuesTabButtons.forEach(item => {


        item.addEventListener('click', (e) => {
            venuesTabButtons.forEach(item => item.classList.remove('active'));
            item.classList.add('active');

            venuesTabContents.forEach(item => item.classList.remove('showTab'));
            const venuesTabContent = document.querySelector(`#${e.target.id}-content`);
            venuesTabContent.classList.add('showTab');

            if (item.id !== 'list-tab') {
                venueErrorSection.style.display = 'none';
            } 

            if (item.id === 'cost-tab') {
                fetchVenuesForCalculator()        
            }

            if (item.id === 'compare-tab') {
                fetchVenuesForCompare();
            }

            //hide/show filters buttons 
            if (item.id === 'cost-tab' || item.id === 'compare-tab') {
                filtersToggleOpacity(0,0);
                basicFilters.style.display = 'none';
            } else if (item.id === 'map-tab') {
                filtersToggleOpacity(0,1);
                fetchVenueData();
                resetFilters();
                basicFilters.style.display = 'none';
                resetFiltersBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    basicFilters.style.display = 'none';
                    resetFilters();
                });

            } else {
                resetFiltersBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    basicFilters.style.display = 'block';
                    resetFilters();
                });
                filtersToggleOpacity(1,1);
                basicFilters.style.display = 'block';
            }
        })
    })

    function filtersToggleOpacity(basicOpacity,advancedOpacity) {
        const basicFilters = document.querySelector('.basic-filters');
        const advancedFilters = document.querySelector('.venues-buttons .left');
        basicFilters.style.opacity = `${basicOpacity}`;
        advancedFilters.style.opacity = `${advancedOpacity}`;
    }
    
    //Map View 
    let map = L.map('map').setView([52.5, -0.09], 7);
    let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    osm.addTo(map);
    setTimeout(function () { map.invalidateSize() }, 5000);
    let markersLayer = L.layerGroup().addTo(map);
    let tooltip = L.tooltip().setLatLng([54, -1]).setContent('Click Markers to View Venues').addTo(map);

  

    //Filter Modal
    function updateModal(modal, modalDisplay, overflow, classOption) {
        modal.style.display = modalDisplay;
        document.body.style.overflow = overflow;
        if (classOption === 'add') {
            overlay.classList.add('show');
        } else if (classOption === 'remove') {
            overlay.classList.remove('show');
        }
    }


    const filterModal = document.querySelector('.filter-modal');
    const filterBtn = document.querySelector('.venue-filter-btn');
    const filterCloseIcon = document.querySelector('.filter-modal .filter-modal-header i');    

    filterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateModal(filterModal, 'block', 'hidden', 'add');
    })
    
    filterCloseIcon.addEventListener('click', () => {
        updateModal(filterModal, 'none', '', 'remove');
    })

    window.addEventListener('click', (e) => {
        if (e.target === overlay) {
            updateModal(filterModal, 'none', '', 'remove');
        }
    });


    fetchVenueData();

    //GeoNames API - gets city names in array 
    let citiesArray = [];
    async function fetchCities() {
        try {
            const response = await fetch('all-venues.php'); //gets all venues
            if (!response.ok) {
                throw new Error('Failed to fetch geoname venue data');
            }
            const allVenueData = await response.json();
            const venues = allVenueData.venues;

            const geoPromise = venues.map(async (venue) => {
                try {
                    const geoNamesResponse = await fetch(`GEONAME_API_KEY`);
                    if (!geoNamesResponse.ok) {
                        throw new Error('Failed to fetch GeoNames Data');
                    }
                    const geoNamesData = await geoNamesResponse.json();
                    const city = geoNamesData.geonames[0].name;
                    citiesArray.push({venue: venue.venue_id, city: city});
                } catch(error) {
                    console.log(error);
                }
            })

           await Promise.all(geoPromise); //wait for all to complete

        } catch(error) {
            console.log(error);
        }
    }

    function getCityName(venueID) {
        const cityName = citiesArray.find(item => item.venue === venueID);
        return cityName ? cityName.city : 'England';
    }

    //Add star rating CSS widths for each possible rating
    const ratingStyle = document.createElement('style');
    document.head.appendChild(ratingStyle);
    
    for (let i = 0.1; i <= 5.0; i += 0.1) {
      const roundedNum = i.toFixed(1);
      const width = Math.round(i * 20); //0.1 = 2% - 5.0 = 100%
      const cssStyle = `[rating^="${roundedNum}"]::after { width: ${width}%; }`;
      ratingStyle.sheet.insertRule(cssStyle, 0);
    }

    //Create Venue Card
    function createVenueCard(venue, city) {
        const venueCard = document.createElement('div');
        venueCard.classList.add('card');

        //Get image src
        const imageSrc = venue.name + '.jpg';
        //Get Rating
        let ratingHalved = venue.average_rating /2;
        let starRating = Math.round(ratingHalved * 10) / 10;

        //Create card 
        venueCard.innerHTML =   `<div class="card-top">` + 
                                    `<img src="${imageSrc}" alt="Venue">` + 
                                    `<div class="card-border"></div>` + 
                                `</div>` + 
                                `<div class="card-bottom">` + 
                                    `<h2 class="text-sm">${venue.name}</h2>` + 
                                    `<p class="text-xs card-description">${venue.name} is a beautiful venue, but is it your perfect one?</p>` + 
                                    `<div class="card-rating-container">` + 
                                        `<div class="stars">` +
                                            `<i rating="${starRating}"></i>` +
                                        `</div>` +
                                        `<p>${starRating}</p>` + 
                                    `</div>` +
                                

                                    `<div class="line-long"></div>` +
                                    `<div class="card-location-container">` + 
                                        `<i class="fa fa-solid fa-location-dot"></i>` +
                                        `<h4 class="text-xs">${city}</h4>` +
                                    `</div>` +
                                    `<div class="line-short"></div>` +
                                    `<ul>` +
                                        `<!--<li class="btn btn-brown text-uppercase contact-top-btn"><a href="#">Contact</a></li>-->` +
                                        `<li class="btn btn-cream text-uppercase more-btn"><a href="">More Info</a></li>` +
                                    `</ul>` +
                                `</div>`;
        return venueCard;
    }

    //Create Map Card
    function createMapVenueCard(venue, city) {
        const mapVenueCard = document.createElement('div');
        mapVenueCard.classList.add('card', 'map-venue-card');

        //Get image src
        const imageSrc = venue.name + '.jpg';
        //Get Rating
        let ratingHalved = venue.average_rating /2;
        let starRating = Math.round(ratingHalved * 10) / 10;

        mapVenueCard.innerHTML =   `<div class="card-top">` + 
                                    `<img src="${imageSrc}" alt="Venue">` + 
                                    `<div class="card-border"></div>` + 
                                `</div>` + 
                                `<div class="card-bottom">` + 
                                    `<h2 class="text-sm">${venue.name}</h2>` + 
                                    `<div class="card-rating-container">` + 
                                        `<div class="stars">` + 
                                            `<i rating="${starRating}"></i>` +
                                        `</div>` +
                                        `<p>${venue.average_rating}</p>` + 
                                    `</div>` +
                                    `<div class="card-location-container">` + 
                                        `<i class="fa fa-solid fa-location-dot"></i>` +
                                        `<h4 class="text-xs">${city}</h4>` +
                                    `</div>` +
                                    `<ul>` +
                                        `<li class="btn btn-brown text-uppercase directions-top-btn"><a href="">Directions</a></li>` +
                                        `<li class="btn btn-cream text-uppercase more-btn"><a href="">More</a></li>` +
                                    `</ul>` +
                                `</div>`;     
        return mapVenueCard;  
    }

    //Create Venue Modal
    function createVenueModal(venue, catering) {
        const imageSrc = venue.name + '.jpg';

        //Venue Modal Tables
        const venueCatering = catering.filter(item => item.venue_id === venue.venue_id);
        let cateringGrades = '';
        venueCatering.forEach(item => {
            cateringGrades += `<th>${item.grade}</th>`;
        })

        let cateringCosts = '';
        venueCatering.forEach(item => {
            cateringCosts += `<td>£${item.cost}pp</td>`;
        })

        let license = '';
        if (venue.licensed === '1') {
            license = 'Y';
        } else {
            license = 'N';
        }

        //style modal
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.backgroundImage = `url('${imageSrc}')`;

        modal.innerHTML =   `<div class="modal-content">` + 
                                `<div class="modal-close-icon">` +
                                    `<div class="circle">` +
                                        `<div class="cross-line"></div>` +
                                        `<div class="cross-line"></div>` +
                                    `</div>` +
                                `</div>` +
                                `<h2>${venue.name}</h2>` +
                                `<table class="venue-price-table">` +
                                    `<thead>` +
                                        `<tr>` +
                                            `<th colspan="2">Venue Costs</th>` +
                                        `</tr>` +
                                        `<tr>` +
                                            `<th>Weekdays</th>` +
                                            `<th>Weekends</th>` +
                                        `</tr>` +
                                    `</thead>` +

                                    `<tbody>` +
                                        `<tr>` + 
                                            `<td>£${venue.weekday_price}</td>` +
                                            `<td>£${venue.weekend_price}</td>` +
                                        `</tr>` +
                                    `</tbody>` +
                                `</table>` +
                                
                                `<table class="venue-catering-price-table">` +
                                    `<thead>` +
                                        `<tr>` +
                                            `<th colspan="${venueCatering.length}">Catering Grades</th>` +
                                        `</tr>` +
                                        `<tr>` +
                                            `${cateringGrades}` +
                                        `</tr>` +
                                    `</thead>` +
                                    `<tbody>` +
                                        `<tr>` +
                                            `${cateringCosts}` +
                                        `</tr>` +
                                    `</tbody>` +
                                `</table>` +

                                `<div class="extra-info">` +
                                    `<h4>Capacity: ${venue.capacity}</h4>` +
                                    `<h4>Licensed: ${license}</h4>` +
                                `</div>` +
                            `</div>`;
       
        return modal;
    }

    //Card - Event Listeners
    function handleModalClicks(modal, overlay, mapVenueCard, venueCard) {
        //open + close modal
        const mapMoreInfoBtn = mapVenueCard.querySelector('.more-btn');
        const moreInfoBtn = venueCard.querySelector('.more-btn');
        const closeModal = modal.querySelector('.modal-close-icon');


        mapMoreInfoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            updateModal(modal, 'block', 'hidden', 'add');
        })

        moreInfoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            updateModal(modal, 'block', 'hidden', 'add');
        })

        closeModal.addEventListener('click', () => {
            updateModal(modal, 'none', '', 'remove');
        })

        window.addEventListener('click', (e) => {
            if (e.target === overlay) {
                updateModal(modal, 'none', '', 'remove');
            }
        })
    }

    function handleMapList(venue, markers, routingControl, mapVenueCard) {
        const mapList = document.querySelector('#venues-map-list');
        mapList.addEventListener('change', (e) => {
            const selectedVenueID = e.target.value;
            if (selectedVenueID === 'all') {
                map.closePopup();
                map.setView([52.5, -0.09], 7);
            } else {
                markers[selectedVenueID].openPopup();
            }
            routingControl.remove();
        });

        //Leaflet - add routing 
        const directionsBtn = mapVenueCard.querySelector('.directions-top-btn');
        directionsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            map.closePopup();

            //close open routes
            if (routingControl) {
                routingControl.remove();
            }

            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(52.770771, -1.204350),
                    L.latLng(venue.latitude, venue.longitude)
                ],
                routeWhileDragging: true
            }).addTo(map);
        })
                
    }

    //Fetch Data from PHP
    async function fetchVenueData(filters = {}) {
        try {
            let url = 'all-venues.php';
            
            const filterQuery = new URLSearchParams(filters).toString();
            url += filterQuery ? (url.includes('?') ? `&${filterQuery}` : `?${filterQuery}`) : '';
            
            console.log(url);

            const params = {
                method: "GET",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }

            //Get Venue Data
            const response = await fetch(url, params);

            if (!response.ok) {
                throw new Error('Failed to fetch venue data');
            }
            await fetchCities();
            const allVenueData = await response.json();
           
            const venues = allVenueData.venues;
            const catering = allVenueData.catering;

            //Number of venues
            const numberOfVenues = document.querySelector('.numReturns');
            numberOfVenues.innerHTML = `${venues.length}` + ' RESULTS';

            //Edit Map
            markersLayer.clearLayers();
            let routingControl; //used to close open routes
     
            //Create Card
            const allVenuesSection = document.querySelector('.venues-content #list-tab-content');
            allVenuesSection.innerHTML = '';
            
            const mapList = document.querySelector('#venues-map-list');
            mapList.innerHTML = '';
            const mapListOption = document.createElement('option');
            mapListOption.textContent = 'All Venues';
            mapListOption.value = 'all';
            mapList.appendChild(mapListOption);
            const markers = {};

            if (venues.length === 0) {
                venueErrorSection.style.display = 'block';
                basicFilters.style.display = 'none';
            }

            for (const venue of venues) {
                //Get city name
                const city = getCityName(venue.venue_id);

                 // Create venue card
                const venueCard = createVenueCard(venue, city);

                // Create map venue card
                const mapVenueCard = createMapVenueCard(venue, city);

                //Leaflet - Map Markers
                const marker = L.marker([venue.latitude, venue.longitude]).addTo(markersLayer);
                marker.bindPopup(mapVenueCard);
                markers[venue.venue_id] = marker;

                //Map List
                const mapListOption = document.createElement('option');
                mapListOption.textContent = `${venue.name}`;
                mapListOption.value = venue.venue_id;
                mapList.appendChild(mapListOption);

                 // Create modal
                const modal = createVenueModal(venue, catering);
                document.body.appendChild(modal);

                handleModalClicks(modal, overlay, mapVenueCard, venueCard);

                allVenuesSection.appendChild(venueCard);

                handleMapList(venue, markers, routingControl, mapVenueCard);
            };

            

        } catch (error) {
            console.log(error);
        }
    }


    //ORDER BY buttons
    const allBasicFilters = document.querySelectorAll('.basic-filter-btn');


    const filterErrorMsg = document.querySelector('.filter-error-msg');
    const applyFiltersBtn = document.querySelector('.filter-modal-buttons #apply-btn');

    const resetFiltersBtnError = document.querySelector('.no-venues-error .error-txt #reset-btn');
    const price = document.querySelector('#price');
    const capacity = document.querySelector('#capacity');
    const rating = document.querySelector('#rating');
    const cateringGrade = document.querySelector('#catering');
    const licensed = document.querySelector('#licensed');



    allBasicFilters.forEach((filterButton) => {
        filterButton.addEventListener('click', (e) => {
            e.preventDefault();

            const priceValue = price.value;
            const capacityValue = capacity.value;
            const ratingValue = rating.value;
            const cateringGradeValue = cateringGrade.value;
            const licensedValue = licensed.value;
            const dateSelectorValue = dateSelector.value;
            const dateTypeValue = dateType.value;
        

            // if click and has active, remove active and filter with no order
            if (filterButton.classList.contains('active')) {
                filterButton.classList.remove('active');
                fetchVenueData({
                    price: priceValue, 
                    capacity: capacityValue, 
                    rating: ratingValue, 
                    cateringGrade: cateringGradeValue, 
                    licensed: licensedValue, 
                    dateSelectorValue: dateSelectorValue, 
                    dateTypeValue: dateTypeValue});
            } else {
                // remove active class from other filters
                allBasicFilters.forEach(button => {
                    if (button !== filterButton) {
                        button.classList.remove('active');
                    }
                });

                filterButton.classList.add('active');

                // find order
                let order;
                switch(filterButton.id) {
                    case 'capacity-basic-filter':
                        order = 'capacityOrder';
                        break;
                    case 'capacity-basic-filter-reverse':
                        order = 'capacityOrderReverse';
                        break;
                    case 'price-basic-filter':
                        order = 'priceOrder';
                        break;
                    case 'price-basic-filter-reverse':
                        order = 'priceOrderReverse';
                        break;
                    case 'rating-basic-filter':
                        order = 'ratingOrder';
                        break;
                    case 'popularity-basic-filter':
                        order = 'popularityOrder';
                        break;
                    default:
                        order = null;
                }


                // Fetch venues with order + any advanced filters already applied
                fetchVenueData({order: order,
                    price: priceValue, 
                    capacity: capacityValue, 
                    rating: ratingValue, 
                    cateringGrade: cateringGradeValue, 
                    licensed: licensedValue, 
                    dateSelectorValue: dateSelectorValue, 
                    dateTypeValue: dateTypeValue});
            }
        });
    });


    //Advanced Filters
    const dateType = document.querySelector('#dateType');
    const dateTypeContainer = document.querySelector('.date-type-filter');
    const dateSelector = document.querySelector('#availability');
    const dateSelectorContainer = document.querySelector('.date-selector-filter');

    dateSelector.addEventListener('change', () => {
        if (dateSelector.value) {
            dateTypeContainer.style.display = 'none';
        } else {
            dateTypeContainer.style.display = 'block';
        }
    })

    dateType.addEventListener('change', () => {
        if (dateType.value !== 'any') {
            dateSelectorContainer.style.display = 'none';
        } else {
            dateSelectorContainer.style.display = 'flex';
        }
    })



    applyFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();

  
        venueErrorSection.style.display = 'none';
    
        allBasicFilters.forEach(filterButton => {
            filterButton.classList.remove('active');
        })


        //get values inputted
        const priceValue = price.value;
        const capacityValue = capacity.value;
        const ratingValue = rating.value;
        const cateringGradeValue = cateringGrade.value;
        const licensedValue = licensed.value;
        const dateSelectorValue = dateSelector.value;
        const dateTypeValue = dateType.value;


        if (priceValue !== '0') {
            if (!dateSelectorValue && dateTypeValue === 'any') {
                filterErrorMsg.innerHTML = '*Enter a specific Date or Price Type';
                updateModal(filterModal, 'block', 'hidden', 'add');
                return;
            }
        }
        filterErrorMsg.innerHTML = '';
    
        updateModal(filterModal, 'none', '', 'remove');
        
        //fetch data
        fetchVenueData({
            price: priceValue, 
            capacity: capacityValue, 
            rating: ratingValue, 
            cateringGrade: cateringGradeValue, 
            licensed: licensedValue, 
            dateSelectorValue: dateSelectorValue, 
            dateTypeValue: dateTypeValue
        });
    });
    
    function resetFilters() {
        updateModal(filterModal, 'none', '', 'remove');

        const venueErrorSection = document.querySelector('.no-venues-error');
        venueErrorSection.style.display = 'none';

    

        allBasicFilters.forEach(filterButton => {
            filterButton.classList.remove('active');
        });
    
        dateTypeContainer.style.display = 'block';
        dateSelectorContainer.style.display = 'flex';
        filterErrorMsg.innerHTML = '';
        
        //reset filter values
        price.value = '0';
        document.querySelector('#priceValue').innerHTML = 'All Prices';
        capacity.value = '0';
        document.querySelector('#capacityValue').innerHTML = 'No Limit';
        rating.value = 0;
        document.querySelector('#ratingValue').innerHTML = 'All Ratings';
        cateringGrade.value = 'any';
        licensed.value = 'any';
        dateSelector.value = '';
        dateType.value = 'any';
    
        fetchVenueData();
    }
    

    resetFiltersBtnError.addEventListener('click', (e) => {
        e.preventDefault();
        basicFilters.style.display = 'block';
        resetFilters();
    })
    
    //BUDGET TAB
    const calculatorDate = document.querySelector('#date');
    const calculatorCapacity = document.querySelector('#calc-capacity');
    const calculatorBudget = document.querySelector('#budget');
    const calculatorApplyBtn = document.querySelector('#calculate-btn');
    const calculatorVenueDropDown = document.querySelector('#venuesList');
    const calculatorCateringGrade = document.querySelector('#cateringGradeList');
    const calculatorError = document.querySelector('.calculator-error-msg');


    async function fetchVenuesForCalculator() {
        try {
            //Get Venue Data
            
            const response = await fetch('all-venues.php');

            if (!response.ok) {
                throw new Error('Failed to fetch venue data');
            }
            const allVenueData = await response.json();
           
            const venues = allVenueData.venues;
            const catering = allVenueData.catering;

            calculatorVenueDropDown.innerHTML = '';
            calculatorCateringGrade.innerHTML = '';

            //Default options in dropdowns
            const venueChooseOption = document.createElement('option');
            venueChooseOption.value = 'choose';
            venueChooseOption.textContent = 'Choose';
            venueChooseOption.setAttribute('disabled', true);
            venueChooseOption.setAttribute('selected', true);
            calculatorVenueDropDown.appendChild(venueChooseOption);

            const gradeChooseOption = document.createElement('option');
            gradeChooseOption.value = 'choose';
            gradeChooseOption.textContent = 'Choose';
            gradeChooseOption.setAttribute('disabled', true);
            gradeChooseOption.setAttribute('selected', true);
            calculatorCateringGrade.appendChild(gradeChooseOption);

            //populate venue names dropdown
            for (const venue of venues) {
                const venueOption = document.createElement('option');
                venueOption.value = venue.venue_id;
                venueOption.textContent = venue.name;
                calculatorVenueDropDown.appendChild(venueOption);
            }

            //populate venue catering grades dropdown
            calculatorVenueDropDown.addEventListener('change', () => {
                const selectedVenue = calculatorVenueDropDown.value;
                calculatorCateringGrade.innerHTML = '';
       
                const gradeChooseOption = document.createElement('option');
                gradeChooseOption.value = 'choose';
                gradeChooseOption.textContent = 'Choose';
                gradeChooseOption.setAttribute('disabled', true);
                gradeChooseOption.setAttribute('selected', true);
                calculatorCateringGrade.appendChild(gradeChooseOption);

                const venueCatering = catering.filter(item => item.venue_id === selectedVenue);
                venueCatering.forEach(grade => {
                    const gradeOption = document.createElement('option');
                    gradeOption.value = grade.grade;
                    gradeOption.textContent = grade.grade;
                    calculatorCateringGrade.appendChild(gradeOption);
                })
            })

        } catch (error) {
            console.log(error);
        }
    }

    const bookingResultSection = document.querySelector('.calc-result-container');
    calculatorApplyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const selectedVenue = calculatorVenueDropDown.value;
        const selectedGrade = calculatorCateringGrade.value;
        const dateValue = calculatorDate.value;
        const capacityValue = calculatorCapacity.value;
        const budgetValue = calculatorBudget.value;
        calculatorError.innerHTML = '';
        weatherResultSection.innerHTML = '';


        const emptyFields = [];
        //get an empty fields not filled in
        if (selectedVenue === 'choose') {
            emptyFields.push('a venue');
        }
        if (selectedGrade === 'choose') {
            emptyFields.push('a catering grade');
        }
        if (!dateValue) {
            emptyFields.push('a date');
        }
        if (!capacityValue) {
            emptyFields.push('the number of guests');
        }
        if (!budgetValue) {
            emptyFields.push('a budget');
        }
         if (emptyFields.length > 0) {
            calculatorError.innerHTML = `*Please enter ${emptyFields.join(', ')}.`;
            return;
         }

        const params = new URLSearchParams({
            venueID : selectedVenue,
            cateringGrade : selectedGrade,
            date : dateValue,
            capacity : capacityValue,
            budget : budgetValue
        });
        
        try {
            
            const response = await fetch(`calculator-venues.php?${params.toString()}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch venue calculator data');
            }

            const venueData = await response.json();
            //print php error
            bookingResultSection.innerHTML = '';
            if (venueData.error) {
                calculatorError.innerHTML = `*${venueData.error}`;
                return;
            }

            //get venue details + display if no errors
            const venueDetails = venueData[0];

            if (venueData.length === 0) {
                calculatorError.innerHTML = `*${calculatorVenueDropDown.options[calculatorVenueDropDown.selectedIndex].text} is not available on this date.`;
   
            } else if (venueDetails.capacity < parseInt(capacityValue)) {
                calculatorError.innerHTML = `*${venueDetails.name}'s capacity is ${venueDetails.capacity}. Lower your number of guests, or pick a new venue.`;

            } else {
                calculatorError.innerHTML = '';
                displayBookingInfo(venueDetails, selectedVenue, selectedGrade, dateValue, capacityValue, budgetValue);
                
                //Weather API 
                const today = new Date();
                const inputtedDate = new Date(dateValue);

                const timeDiff = inputtedDate.getTime() - today.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000*3600*24));

                //If date is within 16 days, use 16 day weather forcast - else, historical data 
                if (daysDiff >= 0 && daysDiff <= 16) {
                    try {
                        const weatherResponse = await fetch(`WEATHER_API_16_DAY`);
                        if (!weatherResponse.ok) {
                            throw new Error('Fialed to fetch weather data');
                        }
                        const weatherData = await weatherResponse.json();
                        const weatherList = weatherData.list;
                        const weatherArrayIndex = daysDiff; //index of list of 16 days for the inputted date is the difference between today and inputted date
                        const inputtedDateWeather = weatherList[weatherArrayIndex];
                        displayForecastedWeather(inputtedDateWeather);
                    } catch (error) {
                        console.log(error);
                    }
                    
                } else {
                    try {
                        const month = inputtedDate.getMonth() + 1;
                        const day = inputtedDate.getDate();
                        const weatherHistoryResponse = await fetch(`WEATHER_API_HISTORICAL`);
                        if (!weatherHistoryResponse.ok) {
                            throw new Error('Fialed to fetch weather data');
                        }
                        const weatherHistoryData = await weatherHistoryResponse.json();
                        const weatherHistoryList = weatherHistoryData.result;
                        displayHistoricalWeather(weatherHistoryList);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }

    })

    const weatherResultSection = document.querySelector('.calc-weather-container');

    function displayHistoricalWeather(weatherOnDate) {
        const avgTemp = Math.round((weatherOnDate.temp.mean - 273.15) * 100) / 100; //convert kelvin to celcius
        const minTemp = Math.round((weatherOnDate.temp.average_min - 273.15) * 100) / 100;;
        const maxTemp = Math.round((weatherOnDate.temp.average_max - 273.15) * 100) / 100;

         weatherResultSection.innerHTML =    `<div class="calc-weather-inner">` +
                                                `<div class="weather-info">` +
                                                    `<p>Temperatures are estimated to be ${avgTemp}\u00B0C, with them ranging from ${minTemp}\u00B0C to ${maxTemp}\u00B0C throughout the day.</p>` +
                                                    `<p>These estimates are based on historical data. Check back within 16 days of your wedding date for more accurate weather data.</p>` +
                                                `</div>` +
                                            `</div>`;

    }

    function displayForecastedWeather(weatherOnDate) {
        const weatherDescription = weatherOnDate.weather[0].description;
        const weatherIconCode = weatherOnDate.weather[0].icon;
        const weatherIcon = "http://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";
        //Weather at times of day
        const dayTemp = weatherOnDate.temp.day;
        const eveTemp = weatherOnDate.temp.eve;
        const nightTemp = weatherOnDate.temp.night;
        const mornTemp = weatherOnDate.temp.morn;
        const avgTemp = Math.round(((dayTemp + eveTemp + nightTemp + mornTemp) / 4) * 100) / 100;
        //weather extremes
        const minTemp = weatherOnDate.temp.min;
        const maxTemp = weatherOnDate.temp.max;
        //weather others 
        const windSpeed = weatherOnDate.speed;
        const cloudiness = weatherOnDate.clouds;
        const pop = weatherOnDate.pop;

        let windSpeedDescription = '';
        let cloudinessDescription = '';
        if (cloudiness > 90) {
            cloudinessDescription = 'cloudy';
        } else if (cloudiness > 70) {
            cloudinessDescription = 'mostly cloudy';
        } else if (cloudiness > 30) {
            cloudinessDescription = 'partly cloudy';
        } else if (cloudiness > 10) {
            cloudinessDescription = 'mostly clear';
        } else if (cloudiness > 0) {
            cloudinessDescription = 'clear';
        }

        if (windSpeed > 13.5) {
            windSpeedDescription = 'strong breeze';
        } else if (windSpeed > 7) {
            windSpeedDescription = 'moderate breeze';
        } else if (windSpeed > 3) {
            windSpeedDescription = 'gentle breeze';
        } else {
            windSpeedDescription = 'light breeze';
        }

        

        weatherResultSection.innerHTML =    `<div class="calc-weather-inner">` +
                                                `<div class="weather-info">` +
                                                    `<p>You will experience ${weatherDescription} on this day.</p><p>Temperatures will range from ${minTemp}\u00B0C to ${maxTemp}\u00B0C throughout the day. See below for more detail.</p>` +
                                                    `<table>` +
                                                        `<thead>` +
                                                            `<tr>` +
                                                                `<th>Morn</th>` +
                                                                `<th>Day</th>` +
                                                                `<th>Eve</th>` +
                                                                `<th>Night</th>` +
                                                                `<th>Avg</th>` +
                                                            `</tr>` +
                                                        `</thead>` +

                                                        `<tbody>` +
                                                            `<tr>` +
                                                                `<td>${mornTemp}\u00B0C</td>` +
                                                                `<td>${dayTemp}\u00B0C</td>` +
                                                                `<td>${eveTemp}\u00B0C</td>` +
                                                                `<td>${nightTemp}\u00B0C</td>` +
                                                                `<td>${avgTemp}\u00B0C</td>` +
                                                            `</tr>` +
                                                        `</tbody>` +
                                                    `</table>` +

                                                    `<p>You will experience a ${windSpeedDescription}, with wind speeds reaching ${windSpeed}m/s.</p><p>Skies will be ${cloudinessDescription} with it being ${cloudiness}% cloudy, and there is a ${pop*100}% chance of rain.</p>` +
                                                `</div>` +

                                                `<div class="weather-icon">` +
                                                    `<img src="${weatherIcon}" alt="">` +
                                                `</div>` +
                                            `</div>`;


    }

    function displayBookingInfo(venueDetails, selectedVenue, selectedGrade, dateValue, capacityValue, budgetValue) {
        const venuePrice = venueDetails.venue_price;
        const cateringCost = venueDetails.catering_cost * capacityValue;
        const totalCost = parseInt(venuePrice) + parseInt(cateringCost);

        let priceComparison = '';
        if (totalCost > parseInt(budgetValue)) {
            const costDifference = totalCost - parseInt(budgetValue);
            priceComparison = `This is over budget by £${costDifference}. Choose a different date, or a lower catering grade.`;
        } else {
            priceComparison = "This is within your budget. Head to the venue's website to book.";
        }

        const imageSrc = venueDetails.name + '.jpg';

        bookingResultSection.innerHTML =    `<div class="calc-result-container-inner">` +
                                                `<div class="calculator-venue-image">` + 
                                                    `<img src="${imageSrc}" alt="">` +
                                                `</div>` +

                                                `<div class="calc-venue-details">` +
                                                    `<h3>Booking ${venueDetails.name}</h3>` +
                                                    `<p>${venueDetails.name} is available for booking on 21/07/2024.</p>` +
                                                    `<table>` +
                                                        `<thead>` +
                                                            `<tr>` +
                                                                `<th>Venue Price</th>` +
                                                                `<th>Catering Price</th>` +
                                                                `<th>Total Price</th>` +
                                                            `</tr>` +
                                                        `</thead>` +
                                                        `<tbody>` +
                                                            `<tr>` +
                                                                `<td>£${venuePrice}</td>` +
                                                                `<td>£${cateringCost}</td>` +
                                                                `<td>£${totalCost}</td>` +
                                                            `</tr>` +
                                                        `</tbody>` +
                                                    `</table>` +
                                                    `<p>${priceComparison}</p>` +
                                                `</div>` +
                                            `</div>`;  
        
        const costTabContent = document.querySelector('#cost-tab-content');
        costTabContent.appendChild(bookingResultSection);

    }


    //GRAPHS
    const compareList = document.querySelector('#venues-compare-list');
    const ratingCanvas = document.querySelector('#ratingChart');
    let ratingChart;
    const bookingCanvas = document.querySelector('#bookingChart');
    let bookingChart;
    const priceCanvas = document.querySelector('#priceChart');
    let priceChart;


    async function fetchVenuesForCompare() {
        try {
            const response = await fetch('all-venues.php');

            if (!response.ok) {
                throw new Error('Failed to fetch venue data');
            }
            const allVenueData = await response.json();
           
            const venues = allVenueData.venues;
            createPriceChart(venues);

            //Venue Drop Down
            const compareList = document.querySelector('#venues-compare-list');
            compareList.innerHTML = '';
            const compareListOption = document.createElement('option');
            compareListOption.textContent = 'Choose';
            compareListOption.value = 'choose';
            compareList.appendChild(compareListOption);

            for (const venue of venues) {
                //Compare List
                const compareListOption = document.createElement('option');
                compareListOption.textContent = `${venue.name}`;
                compareListOption.value = venue.venue_id;
                compareList.appendChild(compareListOption);
            }

            return venues;
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchVenueGraphData(venueID) {
        try {
            const response = await fetch(`compare-venues.php?venue_id=${venueID}`);

            if (!response.ok) {
                throw new Error('Failed to fetch venue data');
            }
            const venueData = await response.json();
   
            //returns booking and rating data
            return venueData;

        } catch (error) {
            console.log(error);
        }
    }

    function createRatingChart(ratingData) {
        const scores = ['0 Star', '1 Star', '2 Star', '3 Star', '4 Star', '5 Star', '6 Star', '7 Star', '8 Star', '9 Star', '10 Star'];
        const scoreCounts = [
            ratingData[0].score_0_count,
            ratingData[0].score_1_count,
            ratingData[0].score_2_count,
            ratingData[0].score_3_count,
            ratingData[0].score_4_count,
            ratingData[0].score_5_count,
            ratingData[0].score_6_count,
            ratingData[0].score_7_count,
            ratingData[0].score_8_count,
            ratingData[0].score_9_count,
            ratingData[0].score_10_count
        ];

        if(ratingChart) {
            ratingChart.destroy();
        }

        //create rating chart 
        ratingChart = new Chart(ratingCanvas, {
            type: 'bar',
            data: {
                labels: scores,
                datasets: [{
                    label: `Count of User Ratings for ${ratingData[0].name}`,
                    data: scoreCounts,
                    backgroundColor: '#F3EEE7',
                    borderColor: '#331300',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of People who Rated that Score',
                 
                        }
                    }, 
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Ratings (0-10)',
            
                        }
                    }
                }
            }
        });

    }

    function createPriceChart(venueData) {
        const venues = venueData.map(venue => venue.name);
        const weekendPrice = venueData.map(venue => venue.weekend_price);
        const weekdayPrice = venueData.map(venue => venue.weekday_price);

        if(priceChart) {
            priceChart.destroy();
        }


        priceChart = new Chart(priceCanvas, {
            type: 'bar',
            data: {
                labels: venues,
                datasets: [{
                    label: 'Weekend Price',
                    data: weekendPrice,
                    backgroundColor: '#937A6C',
                    borderColor: '#331300',
                    borderWidth: 1
                }, {
                    label: 'Weekday Price',
                    data: weekdayPrice,
                    backgroundColor: '#F3EEE7',
                    borderColor: '#331300',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Venues',
                 
                        }
                    }, 
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Prices',
            
                        }
                    },
                }
            }
        })



    }

    function createBookingChart(bookingData, venueName) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const bookings = bookingData.map(item => item.bookings);

        if (bookingChart) {
            bookingChart.destroy();
        }
        //create booking line chart
        bookingChart = new Chart(bookingCanvas, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: `Number of Bookings per Month for ${venueName}`,
                    data: bookings,
                    backgroundColor: '#F3EEE7',
                    borderColor: '#331300',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Months',
                 
                        }
                    }, 
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Bookings',
            
                        }
                    }
                }
            }

        })
    }

    compareList.addEventListener('change', async (e) => {
        let venueID = compareList.value;
        if (venueID !== 'choose') {
            const venueGraphData = await fetchVenueGraphData(venueID); //get all data
            createRatingChart(venueGraphData.rating); //only use rating data
            createBookingChart(venueGraphData.booking, compareList.options[compareList.selectedIndex].text); //only use booking data
        }
        if (venueID === 'choose') {
            ratingChart.destroy();
            bookingChart.destroy();
        }
    })

    //fix leaflet tiles not loading: 
    setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
     }, 1000);


}