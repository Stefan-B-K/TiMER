class Timer {
    constructor(durationInput, inputBlock, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput
        this.inputBlock = inputBlock
        this.startButton = startButton
        this.pauseButton = pauseButton
        if (callbacks) {
            this.onStart = callbacks.onStart
            this.onTick = callbacks.onTick
            this.onComplete = callbacks.onComplete
        }

        this.durationInput.value = '30'
        this.setStartDuration()
        this.pauseButton.disabled = true
        this.startButton.addEventListener('click', this.start)
        this.pauseButton.addEventListener('click', this.pause)
        this.durationInput.addEventListener('input', this.setStartDuration)
        this.inputBlock.addEventListener('click', () => {if (this.durationInput.disabled) this.complete()})
    }
    start = () => {
        if (this.onStart) this.onStart(this.startDuraton)
        this.durationInput.disabled = true
        this.toggleButtons()
        this.tick()
        this.timerID = setInterval(this.tick, this.timeStep)
    }
    pause = () => {
        clearInterval(this.timerID)
        this.toggleButtons()
    }
    tick = () => {
        if (this.timeRemaining <= 0) {
            this.complete()
        } else if (this.timeRemaining - this.timeStep / 1000 <= 0) {
          this.timeRemaining = 0
            if (this.onTick) this.onTick(this.timeRemaining)
        } else {
            this.timeRemaining -= this.timeStep / 1000
            if (this.onTick) this.onTick(this.timeRemaining)
        }
    }
    complete = () => {
      clearInterval(this.timerID)
      this.durationInput.value = '0'
      this.pauseButton.disabled = true
      setTimeout(() => {
          this.durationInput.value = '30'
          this.durationInput.disabled = false
          this.startButton.disabled = false
          this.setStartDuration()
          if (this.onComplete) this.onComplete()
      }, 500)
    }
    get timeRemaining() {
        return parseFloat(this.durationInput.value)
    }
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2)
    }
    toggleButtons() {
        this.startButton.disabled = !this.startButton.disabled
        this.pauseButton.disabled = !this.pauseButton.disabled
    }
    setStartDuration = () => {
        this.startDuraton = this.timeRemaining
        this.timeStep = Math.max(this.startDuraton, 6)
    }
}