
const durationImp = document.querySelector('#duration')
const inputBlock = document.querySelector('#input-block')
const startBtn = document.querySelector('#start')
const pauseBtn = document.querySelector('#pause')

const svgSize = Math.min(window.innerWidth, window.innerHeight) * 0.90
document.querySelector('#svg').innerHTML = `<svg width="${svgSize}px" height="${svgSize}px">
<circle cx="${svgSize/2}" cy="${svgSize/2}" r="${svgSize/2 - 30}" transform="rotate(-90 ${svgSize/2} ${svgSize/2})" 
fill="transparent" stroke="green" stroke-width="8" />
</svg>`

const circle = document.querySelector('circle')

const preimeter = 2 * Math.PI * circle.getAttribute('r')
circle.setAttribute('stroke-dasharray', preimeter)

let duration;

const timer = new Timer(durationImp, inputBlock, startBtn, pauseBtn, {
    onStart(totalDuration) {
        duration = totalDuration
    },
    onTick(timeRemining) { 
        circle.setAttribute('stroke-dashoffset', preimeter * (timeRemining / duration - 1))
    },
    onComplete() {
      circle.setAttribute('stroke-dashoffset', 0)
      duration = 30
    }
})
