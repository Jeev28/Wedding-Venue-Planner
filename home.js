function homePageFunctionality() {


    //Randomly Change Image on refresh
    function changeHeaderImages() {

        let headerImages = ['Ashby Castle.jpg', 'Cabin.jpg', 'Central Plaza.jpg', 'Fawlty Towers.jpg', 'Forest Inn.jpg', 'Haslegrave Hotel.jpg', 'Hilltop Mansion.jpg', 'Pacific Towers Hotel.jpg', 'Sea View Tavern.jpg', 'Seaside.jpg', 'Sky Center Complex.jpg', 'Southwestern Estate.jpg', 'Table.jpg'];
        let randomIndexes = [];
        while (randomIndexes.length < 4) {
            let randomIndex = Math.floor(Math.random() * headerImages.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }

        for (let i=0; i < 4; i++) {
            const headerImage = document.querySelector('#headerImage' + (i+1));
            headerImage.src = headerImages[randomIndexes[i]];
        }
    }

    changeHeaderImages();


    //FAQ 
    const faqMenuItems = document.querySelectorAll('.faq .faq-header .faq-menu li');
    const faqContentItems = document.querySelectorAll('.faq-category');

    faqMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            faqMenuItems.forEach(item => item.classList.remove('active'));
            item.classList.add('active');

            faqContentItems.forEach(item => item.classList.remove('show'));
            const faqContentItem = document.querySelector(`#${e.target.id}-content`);
            console.log(faqContentItem);
            faqContentItem.classList.add('show');
        })
    });

    const faqSection = document.querySelector('.faq-content');
    faqSection.addEventListener('click', (e) => {
        const faqHeader = e.target.closest('.faq-group-header');
    
        const faqGroup = faqHeader.parentElement;
        const faqBody = faqGroup.querySelector('.faq-group-body');
        const iconToChange = faqHeader.querySelector('i');

        //change icons plus and minus
        iconToChange.classList.toggle('fa-plus');
        iconToChange.classList.toggle('fa-minus');

        faqBody.classList.toggle('open'); //open/close body
    
        //close other faqs
        const otherFaqs = faqSection.querySelectorAll('.faq-group');
        otherFaqs.forEach((otherFaq) => {
            if (otherFaq !== faqGroup) {
                const otherFaqBody = otherFaq.querySelector('.faq-group-body');
                const otherFaqIcon = otherFaq.querySelector('.faq-group-header i');

                otherFaqBody.classList.remove('open'); //close
                
                otherFaqIcon.classList.remove('fa-minus'); //changes icons
                otherFaqIcon.classList.add('fa-plus');
            }
        })

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
                    const geoNamesResponse = await fetch(`GEONAMES_API_KEY`);
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
        venueCard.classList.add('card','aos-fade-up', 'aos-offset-100');

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
                                    `<p class="text-xs card-description">${venue.name} is a beautiful venue, but <br>is it the perfect one for you?</p>` + 
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
                                        `<li id="venues" class="btn btn-cream text-uppercase more-btn"><a id="venues" href="">More Venues and Info</a></li>` +
                                    `</ul>` +
                                `</div>`;
        return venueCard;
    }



    const topVenuesSection = document.querySelector('.top-venues-grid-container');
    //Fetch Data from PHP
    async function fetchVenueData() {
        try {
            let url = 'topvenues.php';
            

            //Get Venue Data
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch venue data');
            }
            await fetchCities();
            const allVenueData = await response.json();
           
            const venues = allVenueData.venues;
            const catering = allVenueData.catering;
     
            //Create Card
            topVenuesSection.innerHTML = '';
            
            for (const venue of venues) {
                //Get city name
                const city = getCityName(venue.venue_id);

                 // Create venue card
                const venueCard = createVenueCard(venue, city);

                topVenuesSection.appendChild(venueCard);

            };

            const seeMoreVenueCard = document.createElement('div');
            seeMoreVenueCard.classList.add('card','see-more-card', 'aos-fade-up', 'aos-offset-200');
            seeMoreVenueCard.innerHTML ='<div class="see-more-card-inner">' +
                                            '<div class="inner-card-content">' +
                                                '<div class="line-long"></div>' +
                                                '<h2 class="text-sm">See More Venues</h2>' +
                                                '<div class="line-short"></div>' +
                                                '<a class="btn btn-cream text-uppercase" id="venues" href="#">Click Here</a>' +
                                            '</div>' +
                                        '</div>';
            topVenuesSection.appendChild(seeMoreVenueCard);

            

        } catch (error) {
            console.log(error);
        }
    }





}