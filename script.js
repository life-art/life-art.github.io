/* ---------------------------------------------------------------------------------------------------- */
/* slideshow */
/* ---------------------------------------------------------------------------------------------------- */

var current = 0,
    slides = document.getElementsByClassName("slide");

setInterval(function() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;
  }
  current = (current != slides.length - 1) ? current + 1 : 0;
  slides[current].style.opacity = 1;
}, 5000);

/* ---------------------------------------------------------------------------------------------------- */
/* smooth scroll */
/* ---------------------------------------------------------------------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
        });
    });
});

/* ---------------------------------------------------------------------------------------------------- */
/*carousel */
/* ---------------------------------------------------------------------------------------------------- */


let counter = 1;
let slider = document.querySelector(".slider-review");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

const checkCounter = () => {
    console.log(counter);
    if (counter > 1 && counter < 3) {
        next.style.display = "";
        prev.style.display = "";
    } else if (counter == 1) {
        next.style.display = "";
        prev.style.display = "none";
    } else if (counter == 3) {
        next.style.display = "none";
        prev.style.display = "";
    }
}

const nextSlide = () => {
    if (counter == 1)
        slider.style.transform = "translateX(-33.3%)";
    else 
    slider.style.transform = "translateX(-66.6%)";
    counter++;
    checkCounter();
}

const prevSlide = () => {
    if (counter == 2)
        slider.style.transform = "translateX(0%)";
    else 
    slider.style.transform = "translateX(-33.3%)";
    counter--;
    checkCounter();
}

//events

checkCounter();
next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

/* ---------------------------------------------------------------------------------------------------- */
/* menu */
/* ---------------------------------------------------------------------------------------------------- */


let menuButton = document.querySelector(".navbar--menu");
let menu = document.querySelector(".menu");
let menuLinks = document.querySelectorAll(".menu--link");

const showMenu = () => {
    menu.style.right = "0";
    if (screen.width < 700) {
        document.body.style.overflow = "hidden";
    }
}

const hideMenu = () => {
    if (screen.width < 700) {
        menu.style.right = "-100%";
        document.body.style.overflow = "";
    } else {
        menu.style.right = "-10%" 
    }
}

//events

menuButton.addEventListener('click', (event) => {
    event.preventDefault();
    showMenu();
})

menuLinks.forEach(function(elem) {
    elem.addEventListener('click', hideMenu);
})

menu.addEventListener('mouseleave', hideMenu);

/* ---------------------------------------------------------------------------------------------------- */
/*  form */
/* ---------------------------------------------------------------------------------------------------- */


let formInput = document.querySelector(".input");
let sendButton = document.querySelector("#send");
let popupSendOverlay = document.querySelector(".popup-send-overlay");
let closePopupSend = document.querySelector(".popup-send-btn");
let dataToSend;
let templateParams = {
    contactdata: dataToSend
};

const saveData = () => {
    templateParams.dataToSend = formInput.value;
    console.log(dataToSend);
}

const clearInput = () => {
    formInput.value = "";
}

const sendData = () => {
    if(formInput.value == "") {
        return false;
    }
    saveData();
    clearInput();
    emailjs.send( "default_service", "userdata", templateParams, "user_bpqMFY7XslgLpgO85TaO3").then(function(response) {console.log('SUCCESS!', response.status, response.text);}, function(error) {console.log('FAILED...', error);});
    setTimeout(showSendOverlay, 1000);
}

const showSendOverlay = () => {
    popupSendOverlay.style.display = "grid";
    popupSendOverlay.classList.add("fade-in");
    document.body.style.overflow = "hidden";
}

const hideSendOverlay = () => {
    popupSendOverlay.style.display = "none";
    popupSendOverlay.classList.remove("fade-in");
    document.body.style.overflow = "";
}

//events 

formInput.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) {
        event.preventDefault();
        sendData();
    }
})

sendButton.addEventListener('click', (event) => {
    event.preventDefault();
    sendData();
});

closePopupSend.addEventListener ('click', hideSendOverlay);

/* ---------------------------------------------------------------------------------------------------- */
/*  collages */
/* ---------------------------------------------------------------------------------------------------- */

let collages = document.querySelectorAll(".popup-stuff");
let stuffItems = document.querySelectorAll(".stuff-item");
let closeCollage = document.querySelectorAll(".stuff-collage-close");

const showCollage = (collage) => {
    collage.style.display = "grid";
    collage.classList.add("fade-in");
    document.body.style.overflow = "hidden";
}

const hideCollage = () => {
    collages.forEach( (elem) => { 
        elem.style.display = "none";
        elem.classList.remove("fade-in");
    });
    document.body.style.overflow = "";
}

//events

stuffItems[0].addEventListener('click', () => { showCollage(collages[0]) });
stuffItems[1].addEventListener('click', () => { showCollage(collages[1]) });
stuffItems[2].addEventListener('click', () => { showCollage(collages[2]) });
stuffItems[3].addEventListener('click', () => { showCollage(collages[3]) });
closeCollage.forEach( (elem) => {
    elem.addEventListener('click', hideCollage);
})