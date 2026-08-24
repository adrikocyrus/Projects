/* =========================================================
   CYRUS PERSONAL PORTFOLIO
   Main JavaScript File
   ========================================================= */


/* =========================================================
   1. SELECT HTML ELEMENTS
   ========================================================= */

// Header
const header = document.querySelector(".site-header");

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Back-to-top button
const backToTop = document.querySelector("#backToTop");

// Copyright year
const year = document.querySelector("#year");

// Contact form
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");


/* =========================================================
   2. AUTOMATICALLY SET CURRENT YEAR
   ========================================================= */

// Gets the current year from the user's computer
// and places it inside the footer.

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================================
   3. MOBILE NAVIGATION MENU
   ========================================================= */

// Check that the menu button and navigation exist
// before adding event listeners.

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        // Add/remove the "open" class
        navLinks.classList.toggle("open");

        // Check whether the menu is currently open
        const menuIsOpen = navLinks.classList.contains("open");

        // Update accessibility information
        menuToggle.setAttribute(
            "aria-expanded",
            menuIsOpen
        );

    });


    /* -----------------------------------------------------
       CLOSE MOBILE MENU WHEN A LINK IS CLICKED
       ----------------------------------------------------- */

    const mobileNavItems =
        document.querySelectorAll(".nav-links a");

    mobileNavItems.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   4. HEADER SCROLL EFFECT
   ========================================================= */

// When the visitor scrolls down,
// the header receives the "scrolled" class.

window.addEventListener("scroll", () => {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   5. BACK TO TOP BUTTON
   ========================================================= */

// Display the back-to-top button after
// the user scrolls down the page.

window.addEventListener("scroll", () => {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

});


/* ---------------------------------------------------------
   BACK TO TOP BUTTON FUNCTION
   --------------------------------------------------------- */

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   6. ACTIVE NAVIGATION LINK
   ========================================================= */

// Get all major sections on the page.

const sections = [
    ...document.querySelectorAll("main section[id]")
];


// Get all navigation links.

const navigationLinks = [
    ...document.querySelectorAll(".nav-links a")
];


/* ---------------------------------------------------------
   INTERSECTION OBSERVER
   --------------------------------------------------------- */

// This watches sections as they enter the viewport.

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            // Ignore sections that are not currently visible
            if (!entry.isIntersecting) {
                return;
            }


            // Remove "active" from every navigation link
            navigationLinks.forEach((link) => {

                link.classList.remove("active");

            });


            // Find the navigation link corresponding
            // to the visible section.

            const currentLink = document.querySelector(
                `.nav-links a[href="#${entry.target.id}"]`
            );


            // Add active class to the matching link

            if (currentLink) {

                currentLink.classList.add("active");

            }

        });

    },

    {
        rootMargin: "-35% 0px -55% 0px"
    }

);


// Start observing every section.

sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   7. REVEAL ANIMATIONS
   ========================================================= */

// Elements with the "reveal" class start hidden.
// When they enter the viewport, JavaScript adds
// the "visible" class.

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                // Stop observing once the animation
                // has happened.

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


// Find every element with the reveal class.

const revealElements =
    document.querySelectorAll(".reveal");


// Observe each element.

revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   8. CONTACT FORM
   ========================================================= */

// The current version does not send data to a server.
// Instead, it demonstrates the front-end behavior.
//
// Later, this can be connected to:
// - Formspree
// - EmailJS
// - Web3Forms
// - Your own backend/API

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        // Prevent the browser from refreshing the page
        event.preventDefault();


        // Get the user's name

        const nameInput =
            document.querySelector("#name");


        const name =
            nameInput.value.trim();


        // Make sure the form note exists

        if (!formNote) {
            return;
        }


        // Display a success message

        formNote.textContent =
            `Thanks, ${name}. Your message is ready to be connected to your email service.`;


        // Clear the form

        contactForm.reset();

    });

}


/* =========================================================
   9. ESCAPE KEY
   ========================================================= */

// If the mobile menu is open and the user
// presses Escape, close the menu.

window.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }


    if (!navLinks || !menuToggle) {
        return;
    }


    navLinks.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

});


/* =========================================================
   10. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

// This improves the mobile experience.
//
// Example:
// User opens the menu and then clicks somewhere
// outside the menu. The menu closes.

document.addEventListener("click", (event) => {

    if (!navLinks || !menuToggle) {
        return;
    }


    const clickedInsideMenu =
        navLinks.contains(event.target);


    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================================================
   11. SMOOTH SCROLLING FOR INTERNAL LINKS
   ========================================================= */

// Find links that point to sections on this page.

const internalLinks =
    document.querySelectorAll('a[href^="#"]');


internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetID =
            link.getAttribute("href");


        // Ignore a link that only contains "#"

        if (
            !targetID ||
            targetID === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetID);


        // If the target section doesn't exist,
        // let the browser handle it normally.

        if (!target) {
            return;
        }


        event.preventDefault();


        // Account for the fixed navigation header.

        const headerHeight =
            header ? header.offsetHeight : 0;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   12. PROJECT CARD INTERACTION
   ========================================================= */

// Add a small accessibility enhancement.
//
// When project cards receive keyboard focus,
// they can behave similarly to hover interactions.

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    card.setAttribute("tabindex", "0");


    card.addEventListener("focus", () => {

        card.classList.add("keyboard-focus");

    });


    card.addEventListener("blur", () => {

        card.classList.remove("keyboard-focus");

    });

});


/* =========================================================
   13. PAGE LOAD
   ========================================================= */

// Make sure the page starts at the top when loaded.

window.addEventListener("load", () => {

    // Remove any accidental hash scrolling
    // only when there is no intended section.

    if (!window.location.hash) {

        window.scrollTo(0, 0);

    }

});


/* =========================================================
   14. REDUCED MOTION SUPPORT
   ========================================================= */

// Respect users who have enabled
// "Reduce Motion" in their operating system.

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";

}


/* =========================================================
   END OF MAIN.JS
   ========================================================= */