const nFloors = document.querySelector('.noOfFloors')
const nLifts = document.querySelector('.noOfLifts')
const floors = document.querySelector('.floors')
const lifts = document.querySelector('.lifts')
const generateBtn = document.querySelector('.generate')
const toasts = document.querySelector('.toast')
const liftsArr = []



// function to create lifts and floors
function generate(NoOffloors, NoOflifts) {
    const buildingHeight = NoOffloors * 150
    floors.innerHTML = ''
    lifts.innerHTML = ''
    let floorCount = 0
    let liftCount = 0
    while (floorCount < NoOffloors) {
        const floor = document.createElement('div')
        floor.classList.add('floor')
        floor.id = floorCount + 1
        floor.setAttribute('data-floor', NoOffloors - floorCount - 1)
        floor.setAttribute('data-lift-on-floor', false)
        floors.appendChild(floor)
        createButtons(floorCount, floor, NoOffloors)
        if (floorCount == NoOffloors - 1) { floor.setAttribute('data-lift-on-floor', true) }
        floorCount++
    }
    while (liftCount < NoOflifts) {
        const lift = document.createElement('div')
        lift.classList.add('lift')
        lift.setAttribute('data-isfree', 'true')
        lift.setAttribute('data-position', 1)
        lifts.appendChild(lift)
        liftsArr.push(lift)
        liftCount++
    }
    document.querySelectorAll('.up-down').forEach(button => button.addEventListener('click', (e) => {
        let floorHeight = e.target.parentElement.getBoundingClientRect().top
        if (liftsArr.some((lift, i) => +-liftsArr[i].style.transform.slice(11, -1).replace('px', '') == (buildingHeight - 150) - e.target.parentElement.offsetTop)) {
            const reqLift = liftsArr.find((lift, i) => +-liftsArr[i].style.transform.slice(11, -1).replace('px', '') == (buildingHeight - 150) - e.target.parentElement.offsetTop)
            reqLift.setAttribute("data-isfree", "false")
            reqLift.classList.add('animation')
            setTimeout(() => {
                reqLift.setAttribute("data-isfree", "true")
                reqLift.classList.remove('animation')
            }, 4000)
            toast("There is already a lift")
        }

        else {
            liftMove(e)
        }
        console.log(liftsArr.map((lift, i) => +-liftsArr[i].style.transform.slice(11, -1).replace('px', '')))
        console.log((buildingHeight - 150) - e.target.parentElement.offsetTop)
    }))
}
// function for creating up and down buttons
function createButtons(count, parent, total) {
    if (count === 0) {
        const down = document.createElement('button')
        down.classList.add('down', 'up-down')
        down.innerText = 'down';
        parent.appendChild(down)
    }
    else if (count === total - 1) {
        // console.log(count, total)
        const up = document.createElement('button')
        up.classList.add('up', 'up-down')
        up.innerText = 'up';
        parent.appendChild(up)
    }
    else {
        const down = document.createElement('button')
        down.classList.add('down', 'up-down')
        down.innerText = 'down';
        const up = document.createElement('button')
        up.classList.add('up', 'up-down')
        up.innerText = 'up'
        parent.append(up, down)
    }

}

function liftMove(e) {
    // const liftsArr = Array.from(document.querySelectorAll('.lift'))
    // console.log(liftsArr)
    // console.log(e.target.parentElement.getAttribute('data-floor'))
    const calledFloor = +e.target.parentElement.getAttribute('data-floor')
    let height = 150 * calledFloor
    for (let lift of liftsArr) {
        if (lift.getAttribute('data-isfree') === 'true') {
            lift.setAttribute('data-isfree', 'false')
            const liftPosition = +lift.getAttribute('data-position')
            const time = Math.abs(liftPosition - calledFloor) + 1
            // console.log('time taken is', time)
            lift.style.transform = `translateY(-${height}px)`
            lift.style.transition = `transform ${time}s linear`
            lift.setAttribute('data-position', calledFloor)
            // console.log(lift.getAttribute('data-isfree'))
            setTimeout(() => {
                lift.classList.add('animation')
                setTimeout(() => {
                    lift.classList.remove('animation')
                }, 4000)
            }, 1000 * time) // door opening closing

            setTimeout(() => {
                lift.setAttribute('data-isfree', 'true')
                console.log(lift.getAttribute('data-isfree'))
            }, 1000 * time + 4000)
            break
            // now lift is in use so just break the loop to not start other lift
        }

    }
}
//function call
generateBtn.addEventListener('click', (e) => {
    const n = nFloors.value
    const m = nLifts.value
    generate(n, m)
})

function toast(message) {
    const notif = document.createElement('div')
    notif.innerText = message
    toasts.appendChild(notif)

    setTimeout(() => {
        notif.remove()
    }, 1000)
}