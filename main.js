const nFloors = document.querySelector('.noOfFloors')
const nLifts = document.querySelector('.noOfLifts')
const floors = document.querySelector('.floors')
const lifts = document.querySelector('.lifts')
const generateBtn = document.querySelector('.generate')



// function to create lifts and floors
function generate(NoOffloors, NoOflifts) {

    floors.innerHTML = ''
    lifts.innerHTML = ''
    let floorCount = 0
    let liftCount = 0
    while (floorCount < NoOffloors) {
        const floor = document.createElement('div')
        floor.classList.add('floor')
        floors.appendChild(floor)
        createButtons(floorCount, floor, NoOffloors)
        floorCount++
    }
    while (liftCount < NoOflifts) {
        const lift = document.createElement('div')
        lift.classList.add('lift')
        lifts.appendChild(lift)
        liftCount++
    }


}
// function for creating up and down buttons
function createButtons(count, parent, total) {
    if (count === 0) {
        const down = document.createElement('button')
        down.classList.add('down')
        down.innerText = 'down';
        parent.appendChild(down)
    }
    else if (count === total - 1) {
        console.log(count, total)
        const up = document.createElement('button')
        up.classList.add('up')
        up.innerText = 'up';
        parent.appendChild(up)
    }
    else {
        const down = document.createElement('button')
        down.classList.add('down')
        down.innerText = 'down';
        const up = document.createElement('button')
        up.classList.add('up')
        up.innerText = 'up'
        parent.append(up, down)
    }
}

//function call
generateBtn.addEventListener('click', (e) => {
    const n = nFloors.value
    const m = nLifts.value
    generate(n, m)
})