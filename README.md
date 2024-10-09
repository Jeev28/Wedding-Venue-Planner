# E-Commerce Stock Management System
#### Full Stack Development - Grade: 95%

## Table of Contents
- [Summary](#summary)
- [Important Files](#important-files)
- [Tech Stack](#tech-stack)
- [Specification](#specification)
- [Demo](#demonstration)


## Summary
A multi-page, fully responsive wedding venue planner that calls venue data from an external database with PHP, uses JavaScript to make API calls with Fetch and provides graphical analysis, and uses SQL to provide filters.

## Important Files
**All files are in the root directory as required by the specification**
1. wedding.php, script.js, index-style.css -> Files containing the header/footer with a dynamic content section, base functions and styling such as loading in content to the webpage. Allows for the header and footer to not be reloaded on page change.
2. media-queries.css -> Provides all media queries for the webpages
3. home.php, home-style.css, home.js -> Home page features
4. venues.php, venues-style.css, venues.js -> Venue page features
5. topvenues.php -> Connection to database to return the top 3 rated venues for the home page functionality
6. all-venues.php -> Connection to database to provide a dynamic way to build an SQL statement depending on filters inputted, to return venues for the venue page functionality
7. compare-venues.php, calculator-venues.php -> Connection to database for create SQL statements for the comparison and calculator sections on the Venue page.
8. email.php -> Validation for the email input


## Tech Stack
Languages -> JavaScript, PHP, HTML/CSS, SQL
Libraries -> AOS for load-in animations, Leaflet JS with OpenStreetMap API, Chart JS
APIs -> OpenStreetMap, GeoNames, Open Weather API
Tools -> Figma and Affinity Designer for design, Unsplash for copyright-free images

## Specification

**Home Page Features**
- Header contains 4 images at the bottom which upon reload are different
- Displays the top 3 rated venues within a card. The location uses the latitude and longitude from the database and GeoNames to get the nearest populated area
- Frequently asked questions section split into 3 categories, displayed as an accordian.

**Venue Page Features**
- Upon load, all venues are displayed. By default, you are in the List Tab.
- Each venue card opens a modal upon clicking on the button which contains more details.
- In the List Tab, you can add Order By filters, and more advanced Filters via the modal.
- Within the Budget Tab, you can enter details of your proposed wedding date, and it will check the venue availability, the weather on that day and the total cost and if it is over your personal budget.
- Within the Map Tab, you can view all venues graphically, with a drop down list for easy access and a modified card design for more information.
- Within the Compare Tab, a bar chart of venue prices is displayed automatically. Beneath this, you can choose a venue and display a horizontal bar chart of the count of user ratings separated by score, and a line graph showing number of bookings per month.

## Demonstration
**This project currently has no live version, and API keys have been removed on upload**

**View the video here:** <a href="https://drive.google.com/file/d/1R_U7XPEjsD4rzN0TMcBAffjcEiOtxW-W/view?usp=share_link">Wedding Planner Demonstration</a>

<div align="center">
  <img width="30%" alt="Screenshot 2024-10-09 at 08 24 02" src="https://github.com/user-attachments/assets/5a75c1f5-2d7b-499b-9277-29635d4a8a9c">

<img width="30%" alt="Screenshot 2024-10-09 at 08 32 50" src="https://github.com/user-attachments/assets/dfa27105-63ad-4882-abf3-fd95564b06cf">

<img width="30%" alt="Screenshot 2024-10-09 at 08 25 28" src="https://github.com/user-attachments/assets/4f3bd079-c612-42b2-b576-cf5ac96e92f9">

</div>

<div align="center">
  <img width="30%" alt="Screenshot 2024-10-09 at 08 25 42" src="https://github.com/user-attachments/assets/67d82cfc-0b99-443b-acc8-dbf5e0db2f0c">
<img width="30%" alt="Screenshot 2024-10-09 at 08 26 03" src="https://github.com/user-attachments/assets/e798bf0a-3d3c-4e24-98c2-0c5439fd4ed6">
<img width="30%" alt="Screenshot 2024-10-09 at 08 26 19" src="https://github.com/user-attachments/assets/43f00356-1bc4-4425-8902-77d375b24ec2">

</div>
