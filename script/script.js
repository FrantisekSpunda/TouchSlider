const slider = document.querySelector('.slider-container'),
    slides = document.querySelectorAll('.slide')

// určení základních proměnných
let isDragging = false
let startPos = 0
let currentTranslate = 0
let prevTranslate = 0
let animationID = 0
let currentIndex = 0

// spuštění animací po eventu
slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart', (e) => e.preventDefault());

    // touch events (pro telefony)
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    // mouse events (pro pc)
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)

})


// znemožnění označení textu a obrázku
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

// funkce při zmáčknutí
function touchStart(index) {
    return function(event) {
        isDragging = true
        currentIndex = index
        startPos = getPositionX(event)

        animationID = requestAnimationFrame(animation)
    }
}

function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)

    const movedBy = currentTranslate - prevTranslate

    if(movedBy < -100 && currentIndex < slides.length - 1) {
    currentIndex += 1
    }
    if(movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1
    }

    setPositionByIndex()
}

function touchMove(event) {
    if(isDragging) {
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPos
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX :event.touches[0].clientX
}

function animation() {
    setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
}