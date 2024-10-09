document.addEventListener('DOMContentLoaded', function() {
	
    loadPage("home"); 
    

    //======Fetch Page + Load======

    
    function getPageToLoad(clickedOn) {
        clickedOn.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === "A") {
                e.preventDefault();
                let pageToLoad = e.target.id;
                footer.style.display = 'none';
                loadPage(pageToLoad);
                
                window.scrollTo(0,0);

                if (clickedOn === footerLinks) {
                    navItems.forEach(item => item.classList.remove('active'));
                    /*navItems.forEach(item => {
                        if (item.id === pageToLoad) { 
                            item.classList.add('active');
                        }
                    })*/
                    const activeNavItem = Array.from(navItems).find(item => item.id === pageToLoad);
                    activeNavItem.classList.add('active');
                }
               
            }
        })
    }



    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const footerLinks = document.querySelector('.footer-group-body-links');
    const navItems = document.querySelectorAll('.navbar-nav li a');
    getPageToLoad(navbar);
    getPageToLoad(footerLinks);



    //Loads page clicked on
    async function loadPage(pageToLoad) {
        try {
            const response = await fetch(pageToLoad + ".php");
            if (response.ok) {
                const content = await response.text();
                document.getElementById("content").innerHTML = content;

                removeError();
                loadJavascript(pageToLoad);
                AOS.init({
                    once: true,
                    duration: 800,
                    easing: 'ease-in-out',
                });
                AOS.refresh();
               
                footer.style.display = 'block';//reshow footer after new page loads in
            } else {
                throw new Error("Failed to load page: " + pageToLoad);
            }
        } catch (error) {
            document.getElementById("content").innerHTML = '';
            displayError(error.message);
            footer.style.display = 'none';
            console.error("Issue with Fetch:", error);
        }
    }

    //Loads Javascript for each page + relevent functions - used above
    function loadJavascript(pageToLoad) {
        const script = document.createElement("script");
        script.src = pageToLoad + ".js";
        document.body.appendChild(script);
        script.onload = () => {
            if (pageToLoad === 'home') {
                homePageFunctionality();
                //gets page to load for any buttons on home page
                document.body.addEventListener('click', (e) => {
                    if (e.target.id === 'venues') {
                        e.preventDefault(); 
                    
                        const venuesBtn = document.getElementById('venues');
                        if (venuesBtn) {
                            venuesBtn.click(); //calls getPageToLoad
                        } 
                    }
                });
                document.body.addEventListener('click', (e) => {
                    if (e.target.id === 'contact') {
                        e.preventDefault(); 
                    
                        const contactBtn = document.getElementById('contact');
                        if (contactBtn) {
                            contactBtn.click(); //calls getPageToLoad
                        } 
                    }
                });
                
            } else if (pageToLoad === 'venues') {
                venuesPageFunctionality();
            }
        } 
    }

    //Displays error - used above 
    function displayError(msg) {
        removeError();
        //display new error message 
        let container = document.createElement('div');
        container.id = 'error-container';
        //document.body.appendChild(container);
        document.getElementById('content').appendChild(container);

        container.innerHTML = '';

        const message = document.createElement('p');
        message.textContent = msg;
        container.appendChild(message);
    }

    /*Removes error - used when more than one error occurs or 
    when going back to working webpage - used above*/
    function removeError() {
        const activeContainer = document.getElementById('error-container');
        if (activeContainer) {
            activeContainer.remove();
        }
    }



    //======NAVBAR UNDERLINES======    

    //Adds active states
    function navbarUnderline(navType) {
        navType[0].classList.add('active');
        navType.forEach(item => {
            item.addEventListener('click', (e) => {
                navType.forEach(item => item.classList.remove('active'));
                let currentPageId = e.target.id;
                const activeNavItem = Array.from(navType).find(item => item.id === currentPageId); // Find the clicked item
                activeNavItem.classList.add('active');
            })
        })
    }

    const mobileNavItems = document.querySelectorAll('.mobile-menu.navbar-nav ul li a');
    navbarUnderline(navItems);
    navbarUnderline(mobileNavItems);


    //search for underline with active class (ie current page)
    function getActiveUnderline(navType) {
        return Array.from(navType).find(item => item.classList.contains('active'));
    }

    //switches the corresponding underlines - used in hamburger menu section 
    function switchNavUnderline(fromNavType, toNavType) {
        const activeNavItem = getActiveUnderline(fromNavType);
        const mobileItem = Array.from(toNavType).find(item => item.id === activeNavItem.id);
        mobileItem.classList.add('active');
    }        




    //======EMAIL VALIDATION======
    const emailForm = document.querySelector('#email');
    const emailErrorMsg = document.querySelector('.emailErrorMsg');
    const emailBtn = document.querySelector('#emailBtn');

    //validates email:
    function validateEmail() {

        const emailAddress = emailForm.value; 
        const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
        const isValidEmail = emailRegex.test(emailAddress);

        if (emailForm.value === '') { //empty: default styles
            emailForm.style.borderBottomColor = "var(--dark-brown)";
            emailErrorMsg.style.display = 'none';
        } else if (isValidEmail) { //valid: green, button shows
            emailForm.style.borderBottomColor = "green";
            emailBtn.disabled = false;
            emailErrorMsg.style.display = 'none';

        } else {  //invalid: red, error shows
            emailForm.style.borderBottomColor = "red";
            emailBtn.disabled = true;
            emailErrorMsg.innerText = "Enter a valid email address";
            emailErrorMsg.style.display = 'block';
        }
    }

    emailForm.addEventListener('input', validateEmail);
    emailForm.addEventListener('focus', validateEmail);

    //On off click (blur), default styling 
    emailForm.addEventListener('blur', () => {
        emailForm.style.borderBottomColor = "var(--cream)";
        emailErrorMsg.style.display = 'none';
        if (emailForm.value === '') {
            emailBtn.disabled = false;
        }
    });



    //======FOOTER ACCORDIAN======
    const footerContainer = document.querySelector('.footer-grid-container');

    footerContainer.addEventListener("click", (e) => {
        const footerGroupHeader = e.target.closest('.footer-group-header');

        const group = footerGroupHeader.parentElement;
        const groupBody = group.querySelector('.footer-group-body');
        const icon = group.querySelector('i');

        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');

        groupBody.classList.toggle('open');

        const otherGroups = footerContainer.querySelectorAll('.footer-group');
        otherGroups.forEach(otherGroup => {
            if(otherGroup != group) {
                const otherGroupBody = otherGroup.querySelector('.footer-group-body');
                const otherIcon = otherGroup.querySelector('.footer-group-header i');

                otherGroupBody.classList.remove('open');
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
            }
        })
    });



    //======HAMBURGER MENU======
    const hamburgerBtn = document.querySelector('.hamburger');

    const hamburgerMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');

    //open and closes mobile menu
    function toggleMobileMenu() {
        hamburgerBtn.classList.toggle('open');
        hamburgerMenu.classList.toggle('hidden');
        overlay.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    }
    hamburgerBtn.addEventListener('click', toggleMobileMenu);


    //applies underline function for desktop to mobile menu
    hamburgerBtn.addEventListener('click', () => {
        switchNavUnderline(navItems, mobileNavItems);
    });

    //if mobile menu link clicked, close menu 
    hamburgerMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            toggleMobileMenu();
        }
    })

    //Hide mobile menu if 768px and it's open 
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addListener((mediaQuery) => {
        if (mediaQuery.matches) {
            hamburgerBtn.classList.remove('open');
            hamburgerMenu.classList.add('hidden');
            overlay.classList.remove('show');
            document.body.classList.remove('no-scroll');

   
        }
    });

    //Close mobile menu on click outside 
    window.addEventListener('click', (e) => {
        if (e.target !== hamburgerMenu && e.target !== hamburgerBtn) {
            hamburgerBtn.classList.remove('open');
            hamburgerMenu.classList.add('hidden');
            overlay.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });



});










