const nFloors = document.querySelector('.noOfFloors')
const nLifts = document.querySelector('.noOfLifts')
const floors = document.querySelector('.floors')
const lifts = document.querySelector('.lifts')
const generateBtn = document.querySelector('.generate')
const liftsArr = []



// function to create lifts and floors
function generate(NoOffloors, NoOflifts) {

    floors.innerHTML = ''
    lifts.innerHTML = ''
    let floorCount = 0
    let liftCount = 0
    while (floorCount < NoOffloors) {
        const floor = document.createElement('div')
        floor.classList.add('floor')
        floor.id = floorCount + 1
        floor.setAttribute('data-floor', NoOffloors - floorCount - 1)
        floors.appendChild(floor)
        createButtons(floorCount, floor, NoOffloors)
        floorCount++
    }
    while (liftCount < NoOflifts) {
        const lift = document.createElement('div')
        lift.classList.add('lift')
        lift.setAttribute('data-isfree', 'true')
        lifts.appendChild(lift)
        liftsArr.push(lift)
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
    document.querySelectorAll('.down').forEach(button => button.addEventListener('click', (e) => {
        liftMove(e)
    }))
    document.querySelectorAll('.up').forEach(button => button.addEventListener('click', (e) => {
        liftMove(e)
    }))
}

function liftMove(e) {
    console.log(e.target.parentElement.getAttribute('data-floor'))
    const calledFloor = +e.target.parentElement.getAttribute('data-floor')
    let height = 150 * calledFloor
    for (lift of liftsArr) {
        if (lift.getAttribute('data-isfree') === 'true') {
            lift.setAttribute('data-isfree', 'false')
            lift.style.transform = `translateY(-${height}px)`
            lift.style.transition = `transform ${2}s linear`
            console.log(lift.getAttribute('data-isfree'))
            setTimeout(() => {
                lift.setAttribute('data-isfree', 'true')
                console.log(lift.getAttribute('data-isfree'))
            }, 2000)
            breaktart // now lift is in use so just break the loop to not start other lift
        }
        else {
            continue // keep repeating until we dont find available lift
        }
    }
}
//function call
generateBtn.addEventListener('click', (e) => {
    const n = nFloors.value
    const m = nLifts.value
    generate(n, m)
})

