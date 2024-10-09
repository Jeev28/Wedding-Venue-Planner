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
    <link rel="stylesheet" href="home-style.css">
    <link rel="stylesheet" href="media-queries.css">
    <!--Link to AOS Library-->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    

</head>
    <body>


        <!--Header-->
        <header class="header" >
            <div class="header-top">
                <div class="header-top-left">
                    <div class="header-txt">
                        <!--<h1 class="text-xl text-uppercase">Perfect<br>Wedding Venues</h1>-->
                        <div class="heading-text text-xl text-uppercase">Perfect <br>Wedding Venues</div>
                        <p class="text-md">Make your dream wedding a reality</p>
                    </div>
                    <div class="header-btns">
                        <ul>
                            <li><a id="venues" class="btn btn-cream search-btn">Search Now</a></li>
                            <li><a href="#footer-bottom-link" class="btn btn-brown contact-btn" href="">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="header-top-right">
                    <img src="Header-Img.jpg" alt="Table of Flowers">
                </div>
            </div>

            <div class="header-bottom">
                <div class="images-slide">
                    <img  id="headerImage1">
                    <img  id="headerImage2">
                    <img  id="headerImage3">
                    <img  id="headerImage4">
                </div>
            </div>
        </header>

        <!--Intro Text Section-->
        <section data-aos="fade-up" data-aos-delay="100">
            <div class="line-vertical"></div>
            <div class="intro-text">
                <p >Discover the <span>perfect</span> place to say <span>'I Do'</span>,<br>
                from lush <span>floral paradises</span> to idyllic <span>countryside estates</span>.<br><span>We offer it all.</span>
            </p>
            </div>
            <div class="line-vertical"></div>
        </section>

        <!--Venue Selection Box--> 
        <section class="container" data-aos="fade-right" data-aos-delay="100" data-aos-offset="200" data-aos-anchor-placement="top-bottom">
            <div class="grid-container">
                <div class="left">
                    <h2 class="text-lg">Venue Selection</h2>
                    <p class="text-md">Explore a magical array of enchanting Venues
                        until you find the perfect backdrop for your love story.</p>
                    <p class="text-md">And don't ever settle for anything less!<br>
                            Because why should you?</p>
                    <p class="text-md">Browse and filter by
                            location, type, rating, price, and much more...</p>
                </div>

                <div class="right">
                    <img src="Table.jpg" alt="Table of wine glasses">
                    <a id="venues" class="btn text-uppercase selection-search-btn" href="#">
                        <div id="venues" class="hover-up"></div>
                        <span id="venues" >Search Now<i class="fa fa-solid fa-arrow-right fa-sm"></i></span>
                    </a>
                </div>
                
            </div>
        </section>


       
    

        <!--Top Venues--> 
        <section class="top-venues-container" data-aos="fade-in">
            <div class="top-venues-header" data-aos="fade-left">
                <div class="line1"></div>
                <h2 class="text-md">Our Top Venues</h2>
                <div class="line2"></div>
                <i class="fa fa-solid fa-arrow-right fa-sm"></i>
            </div>

            <!--USE PHP HERE TO SELECT 3 TOP VENUES-->
            <div class="top-venues-grid-container"></div>

        </section>

        <!--Testimonial Slider-->
<!--
        <section>
            <div class="testimonial-container"></div>
            <button class="btn prev"><i class="fa fa-solid fa-arrow-left fa-sm"></i></button>
            <button class="btn next"><i class="fa fa-solid fa-arrow-right fa-sm"></i></button>
        </section> 
-->

        <!-- FAQ -->
        <section class="faq">
                <div class="container-faq">
                    <!--Menu-->
                    <div class="faq-header" data-aos="fade-up" data-aos-delay="100" data-aos-offset="150" data-aos-anchor-placement="center-bottom">
                    
                        <div class="line1"></div>
                        <h3 class="text-md">Frequently Asked Questions</h3>
                        <div class="line2"></div>
                
                        <div class="faq-header-mobile">
    
                            <h3 class="text-md">Frequently Asked Questions</h3>
                    
                        </div>
                    
                
                        <ul class="faq-menu">
                            <li id="category-1" class="active">General</li>
                            <li id="category-2">Venue Details</li>
                            <li id="category-3">Venue Booking</li>
                        </ul>
                        <div class="line3"></div>
                    </div>

        
                    
                    <div class="faq-content" data-aos="fade-in" data-aos-delay="300" data-aos-offset="200">

                        <div id="category-1-content" class="faq-category show">

                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">What services do you offer as a wedding planner?</h4>
                                    <i class="fa fas fa-minus"></i>
                                </div>
                                <div class="faq-group-body open">
                                    <p>Helping you find the perfect venue is at the heart of what we do.
                                        Our platform hosts an extensive array of venues, carefully chosen to
                                        suit diverse preferences and needs. With multiple filters, navigating
                                        through our venues becomes a smoother experience. From quiet log cabins
                                        to beautiful sandy beaches, we ensure that every couple finds their 
                                        perfect venue.
                                    </p>
                                </div>
                            </div>

                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">What should we be looking for in our perfect venue?</h4>
                                    <i class="fa fas fa-plus"></i>
                                </div>
                                <div class="faq-group-body">
                                    <p>Finding your perfect venue deeply depends on your own personal preference
                                        and unique vision for your special day to remember. Whether you dream
                                        of exchanging vows with the beautiful views of nature, or within a more 
                                        traditional church, your preferences are what shape your search. Alongside this,
                                        you should also consider things like budget, venue capacity, and catering options.
                                        Try out of search tool utilising several filters to make things easier.
                                    </p>
                                </div>
                            </div>

                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">Do you provide detailed information about each venue?</h4>
                                    <i class="fa fas fa-plus"></i>
                                </div>
                                <div class="faq-group-body">
                                    <p>We pride ourselves on providing accessible and detailed information
                                        about each venue in our catalog. These range from price per day, 
                                        catering costs, availablility, venue capacity, and much more.
                                    </p>
                                </div>
                            </div>

                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">Can you provide guidance on any specific venue restrictions we should be aware of?</h4>
                                    <i class="fa fas fa-plus"></i>
                                </div>
                                <div class="faq-group-body">
                                    <p>While we strive to provide as much detail as possible about each venue in our catalog,
                                        very specific venue restrictions may not be directly addressed. For any further queries
                                        regarding each venue, we encourage you to direct them towards the venue administration themselves 
                                        using the contact link provided. This will ensure you recieve the most accuate and up-to-date information.
                                    </p>
                                </div>
                            </div>

                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">Do you offer a direct way to book our chosen venue?</h4>
                                    <i class="fa fas fa-plus"></i>
                                </div>
                                <div class="faq-group-body">
                                    <p>While we offer the convenience of checking venue availability, 
                                        we do not provide direct booking through our platform. Instead, we provide 
                                        a contact link for you to be able to converse with the venue's admin team, allowing 
                                        you to negotiate factors such as cost and discuss any special requests or arrangements. This way, 
                                        you can rest assured that you are recieving the most 
                                        up-to-date information, and have the opportunity to negotiate terms that 
                                        best suit your needs.
                                    </p>
                                </div>
                            </div>
                        
                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">Can you assist us with understanding the venue's policies regarding 
                                        any additional services they offer?
                                    </h4>
                                    <i class="fa fas fa-plus"></i>
                                </div>
                                <div class="faq-group-body">
                                    <p>Our platform offers detailed information regarding each venue, and we are 
                                        more than happy to help with any further details if you reach out to our 
                                        customer service. However, we strongly encourage you to reach out directly 
                                        to the venue's administration team using the provided contact link. 
                                        They will be able to provide more detailed and accurate insights into their 
                                        specific policies and guidelines.
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div id="category-2-content" class="faq-category">
                            
                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">Do you provide detailed information about each venue?</h4>
                                    <i class="fa fas fa-minus"></i>
                                </div>
                                <div class="faq-group-body open">
                                    <p>We pride ourselves on providing accessible and detailed information
                                        about each venue in our catalog. These range from price per day, 
                                        catering costs, availablility, venue capacity, and much more.
                                    </p>
                                </div>
                            </div>

                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">Can you provide guidance on any specific venue restrictions we should be aware of?</h4>
                                    <i class="fa fas fa-plus"></i>
                                </div>
                                <div class="faq-group-body">
                                    <p>While we strive to provide as much detail as possible about each venue in our catalog,
                                        very specific venue restrictions may not be directly addressed. For any further queries
                                        regarding each venue, we encourage you to direct them towards the venue administration themselves 
                                        using the contact link provided. This will ensure you recieve the most accuate and up-to-date information.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div id="category-3-content" class="faq-category">
                        
                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">Do you offer a direct way to book our chosen venue?</h4>
                                    <i class="fa fas fa-minus"></i>
                                </div>
                                <div class="faq-group-body open">
                                    <p>While we offer the convenience of checking venue availability, 
                                        we do not provide direct booking through our platform. Instead, we provide 
                                        a contact link for you to be able to converse with the venue's admin team, allowing 
                                        you to negotiate factors such as cost and discuss any special requests or arrangements. This way, 
                                        you can rest assured that you are recieving the most 
                                        up-to-date information, and have the opportunity to negotiate terms that 
                                        best suit your needs.
                                    </p>
                                </div>
                            </div>
                        
                            <div class="faq-group">
                                <div class="faq-group-header">
                                    <h4 class="text-sm">Can you assist us with understanding the venue's policies regarding 
                                        any additional services they offer?
                                    </h4>
                                    <i class="fa fas fa-plus"></i>
                                </div>
                                <div class="faq-group-body">
                                    <p>Our platform offers detailed information regarding each venue, and we are 
                                        more than happy to help with any further details if you reach out to our 
                                        customer service. However, we strongly encourage you to reach out directly 
                                        to the venue's administration team using the provided contact link. 
                                        They will be able to provide more detailed and accurate insights into their 
                                        specific policies and guidelines.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </section>

        <div id="footer-bottom-link"></div>
        

        <script src="home.js" defer></script>
        <script src="script.js" defer></script>
        
        <!--initiate AOS library-->
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script> 
            AOS.init({
                    once: true,
                    duration: 800,
                });
        </script>

    </body>
</html>