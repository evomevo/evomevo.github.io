const tiltEffectSettings = {
  max: 3,
  perspective: 1000,
  scale: 1,
  speed: 500,
  easing: "cubic-bezier(0, 1, .5, 1)"
};

const tiltelements = document.querySelectorAll("#tilt");

tiltelements.forEach(tiltelement => {
  tiltelement.addEventListener("mouseenter", tiltelementMouseEnter);
  tiltelement.addEventListener("mousemove", tiltelementMouseMove);
  tiltelement.addEventListener("mouseleave", tiltelementMouseLeave);
});

function tiltelementMouseEnter(event) {
  setTransition(event);
}

function tiltelementMouseMove(event) {
  const tiltelement = event.currentTarget;
  const tiltelementWidth = tiltelement.offsetWidth;
  const tiltelementHeight = tiltelement.offsetHeight;
  const tiltelementBound = tiltelement.getBoundingClientRect();
  const centerX = tiltelementBound.left + tiltelementWidth/2;
  const centerY = tiltelementBound.top + tiltelementHeight/2;
  const mouseX = event.clientX - centerX;
  const mouseY = event.clientY - centerY;
  const rotateXUncapped = (+1)*tiltEffectSettings.max*mouseY/(tiltelementHeight/2);
  const rotateYUncapped = (-1)*tiltEffectSettings.max*mouseX/(tiltelementWidth/2);
  const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                  (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
  const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                  (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);

  tiltelement.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                          scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
                          setTransition(event);
}

function tiltelementMouseLeave(event) {
  event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  setTransition(event);
}

function setTransition(event) {
  const tiltelement = event.currentTarget;
  clearTimeout(tiltelement.transitionTimeoutId);
  tiltelement.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
  tiltelement.transitionTimeoutId = setTimeout(() => {
    tiltelement.style.transition = "";
  }, tiltEffectSettings.speed);
}