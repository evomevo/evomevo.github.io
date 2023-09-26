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



//header height and menu offset
const header = document.querySelector('header');
const navmenu = document.querySelector('.navmenu');

window.addEventListener('resize', function() {
  navmenu.style.setProperty('--header-height', header.offsetHeight + 'px');
});

navmenu.style.setProperty('--header-height', header.offsetHeight + 'px');



//hamburger menu
const hamburger = document.querySelector('.hamburger');
//const navmenu = document.querySelector('.navmenu');

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
const parentCont = document.querySelectorAll('.container');

parentCont.forEach(parentCont => {
  parentCont.addEventListener('mousemove', (event) => {
    const containers = document.querySelectorAll('.radgradient');
    containers.forEach(container => {
      const rect = container.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});



//dropdown gallery
const dropbtnA = document.querySelectorAll('#dropbtnA');
const imglayoutA = document.querySelector('#imglayoutA');

const dropbtnB = document.querySelectorAll('#dropbtnB');
const imglayoutB = document.querySelector('#imglayoutB');

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



//year calculation since specific month
function calculateYearsAndMonthsSinceMonth(month, year) {
  const today = new Date();
  const monthDate = new Date(year, month - 1, 1);

  const yearsSinceMonth = today.getFullYear() - monthDate.getFullYear() - (
    (today.getMonth() < month - 1) || (
      (today.getMonth() === month - 1) && (today.getDate() < monthDate.getDate())
    )
  );

  const monthsSinceMonth = (today.getMonth() - monthDate.getMonth()) + (yearsSinceMonth * 12);

  const monthsRemainder = monthsSinceMonth % 12;

  if (yearsSinceMonth === 0) {
    return `${monthsRemainder} months of experience`;
  }

  if (yearsSinceMonth === 1) {
    return `${yearsSinceMonth} year and ${monthsRemainder} months of experience`;
  }

  return `${yearsSinceMonth} years and ${monthsRemainder} months of experience`;
}

const graphicAndMotionDesign = calculateYearsAndMonthsSinceMonth(6, 2020);
const photography = calculateYearsAndMonthsSinceMonth(3, 2022);
const webDesign = calculateYearsAndMonthsSinceMonth(4, 2023);

document.getElementById('graphicDesign').innerHTML = graphicAndMotionDesign;
document.getElementById('motionDesign').innerHTML = graphicAndMotionDesign;
document.getElementById('photography').innerHTML = photography;
document.getElementById('webDesign').innerHTML = webDesign;