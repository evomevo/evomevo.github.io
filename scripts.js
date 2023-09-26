//image preloader
function preloadImage(src) {
  const image = new Image();
  image.src = src;
}

const images = document.querySelectorAll('.galimg');

for (const image of images) {
  preloadImage(image.src);
}



//banner parallax scroll
var parallaxElements = document.querySelectorAll("#parallax");

window.addEventListener("scroll", function() {
  var scrollY = window.scrollY;

  parallaxElements.forEach(function(element) {
    var foregroundTransform = "translateY(" + scrollY / 1.5 + "px)";
    element.style.transform = foregroundTransform;
  });
});



//header scroll
document.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const logo = document.querySelector('.logo');
  const bars = document.querySelectorAll('.bar');

  if (window.scrollY > 0) {
    header.classList.add('scrolled');
    logo.classList.add('scrolled');
    bars.forEach(bar => bar.classList.add('scrolled'));
  } else {
    header.classList.remove('scrolled');
    logo.classList.remove('scrolled');
    bars.forEach(bar => bar.classList.remove('scrolled'));
  }
});



//hamburger menu
const hamburger = document.querySelector('.hamburger');
const navmenu = document.querySelector('.navmenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navmenu.classList.toggle('active');
});

document.body.addEventListener('click', (event) => {
  if (event.target !== hamburger && event.target !== navmenu && event.target.closest('.hamburger') !== hamburger) {
    hamburger.classList.remove('active');
    navmenu.classList.remove('active');
  }
});



//container hover effect
const parentCont = document.querySelectorAll(".container");

parentCont.forEach(parentCont => {
  parentCont.addEventListener('mousemove', (event) => {
    const containers = document.querySelectorAll(".radgradient");
    containers.forEach(container => {
      const rect = container.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;

      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    });
  });
});



//dropdown gallery
const dropbtnA = document.querySelectorAll("#dropbtnA");
const imglayoutA = document.querySelector("#imglayoutA");

const dropbtnB = document.querySelectorAll("#dropbtnB");
const imglayoutB = document.querySelector("#imglayoutB");

dropbtnA.forEach(dropbtnA => {
  dropbtnA.addEventListener('click', function() {
    if (dropbtnA.textContent === 'Click to reveal') {
      dropbtnA.innerHTML = '<p>Click to hide</p>';
    } else {
      dropbtnA.innerHTML = '<p>Click to reveal</p>';
    };
    setTimeout(() => {
      imglayoutA.classList.toggle('active');
    }, 200);
  });
});

dropbtnB.forEach(dropbtnB => {
  dropbtnB.addEventListener('click', function() {
    if (dropbtnB.textContent === 'Click to reveal') {
      dropbtnB.innerHTML = '<p>Click to hide</p>';
    } else {
      dropbtnB.innerHTML = '<p>Click to reveal</p>';
    };
    setTimeout(() => {
      imglayoutB.classList.toggle('active');
    }, 200);
  });
});



//gallery image
const galimg = document.querySelectorAll('.galimg');
const imgmodal = document.querySelector('.imgmodal');

galimg.forEach(galimg => {
  galimg.addEventListener('click', () => {
    const activeGalimg = document.querySelector('.galimg.active');
    if (activeGalimg) {
      setTimeout(() => {
        activeGalimg.remove();
      }, 100);
    }

    const clone = galimg.cloneNode(true);
    clone.classList.add('active');
    clone.id = 'tilt';

    imgmodal.appendChild(clone);
    imgmodal.style.display = 'flex';

    setTimeout(() => {
      imgmodal.style.opacity = 1;
    }, 100);
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.classList.contains('galimg')) {
    const activeGalimg = document.querySelector('.galimg.active');
    if (activeGalimg) {
      imgmodal.style.opacity = 0;
      setTimeout(() => {
        activeGalimg.remove();
        imgmodal.style.display = 'none';
      }, 100);
    }
  }
});