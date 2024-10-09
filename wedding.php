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
    <link rel="stylesheet" href="index-style.css">
    <link rel="stylesheet" href="home-style.css">
    <link rel="stylesheet" href="media-queries.css">
     <!--Link to AOS Library-->
     <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
      <!--Leaflet CSS-->
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
</head>
    <body>

        <style> /*to ensure mobile menu translate doesn't show*/
            #content{
                overflow-x: hidden;
            }
        </style>
        
        <div class="overlay"></div>

        <!--Navbar-->
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="index.html"><h2>LUXE AISLE</h2></a>
                </div>

                <ul class="navbar-nav">
                    <li><a href="" id="home">Home</a></li>
                    <li><a href="" id="venues">Venues</a></li>
                
                </ul>

                <button type="button" class="hamburger">
                    <span class="hamburger-top"></span>
                    <span class="hamburger-middle"></span>
                    <span class="hamburger-bottom"></span>
                </button>
            </div>

             <!--Mobile Menu-->
            
            <div class="mobile-menu navbar-nav hidden">
                <h4>Menu</h4>
                <div class="border"></div>
                <ul>
                    <li><a href="" id="home">Home</a></li>
                    <li><a href="" id="venues">Venues</a></li>

                </ul>
            </div>
        </nav>


        <!--Each Separate Page Content Loaded Here-->
        <main id="content"></main>

        <!--Footer-->



        <footer class="footer">
            <section class="footer-top">
                <div class="footer-top-content">
                    <h4>Subscribe to our newsletter to be the first
                        informed about new venues.
                    </h4>
                    <form method="post" action="" id="emailForm">
                        <input type="email" id="email" name="email" value="<?php echo $user_email; ?>" placeholder="email" required>
                        <button type="submit" id="emailBtn" class="btn btn-cream">Send</button>
                    </form>
                    <div class="errorMsgContainer">
                        <p class="emailErrorMsg"> </p>
                    </div>
                
                    <p class="emailSuccessMsg"> </p>

                </div>

                
<script>
    document.getElementById('emailForm').addEventListener('submit', (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        fetch('email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'email=' + encodeURIComponent(email),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.querySelector('.emailErrorMsg').innerHTML = data.error;
                document.querySelector('.emailErrorMsg').style.display = 'block';
                document.querySelector('.emailSuccessMsg').innerHTML = '';
            } else if (data.success) {
                document.querySelector('.emailSuccessMsg').innerHTML = data.success;
                document.querySelector('.emailErrorMsg').innerHTML = '';
            }
        })
        .catch((error) => {
            console.error(error);
        });
    });
</script>

            </section>

            <section  class="footer-bottom">
                <div class="footer-grid-container">

                    <div class="un-footer-group">
                        <h2>LUXE AISLE</h2>
                        <div class="location">
                            <div class="location-flex">
                                <i class="fa fa-solid fa-location-dot"></i>
                                <h4>United Kingdom</h4>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-group">
                        <div class="footer-group-header">
                            <h4>Pages</h4>
                            <i class="fa fas fa-plus"></i>
                        </div>
                        <div class="footer-group-body footer-group-body-links">
                            <ul>
                                <li><a id="home" href="">Home</a></li>
                                <li><a id="venues" href="">Venues</a></li>
                               
                            </ul>
                        </div>
                    </div>

                    <div class="footer-group">
                        <div class="footer-group-header">
                            <h4>Contact</h4>
                            <i class="fa fas fa-plus"></i>
                        </div>
                        <div class="footer-group-body">
                            <ul>
                                <li>Phone:</li>
                                <li><a href="Tel:123456789">123456789</a></li>
                                <li>Email:</li>
                                <li><a href="mailto:contact@luxeaisle.com">contact@luxeaisle.com</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

            </section>

            <section class="footer-lower-bottom">
                <p>Website Design and Development by Jeevan Ganatra</p>
                <p>&#169 2024 Jeevan Ganatra. All rights reserved.</p>
                <p>This work is licensed under a Creative Commons 
                    Attribution-NonCommercial-NoDerivatives 4.0 International License.</p>
                
            </section>

        </footer>
        <script src="
https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
        <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
        <script src="script.js" defer></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
       
    </body>
</html>