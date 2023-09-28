const nFloors = +document.querySelector('.noOfFloors').value
const nLifts = +document.querySelector('.noOfLifts').value
const floors = document.querySelector('.floors')
const lifts = document.querySelector('.lifts')
const generateBtn = document.querySelector('.generate')



// function to create lifts and floors
function generate(NoOffloors, NoOflifts) {
    console.log('construction started')
    let floorCount = 0
    let liftCount = 0
    while (floorCount < NoOffloors) {
        const floor = document.createElement('div')
        floor.classList.add('floor')
        floors.appendChild(floor)
        floorCount++
    }
    while (liftCount < NoOflifts) {
        const lift = document.createElement('div')
        lift.classList.add('floor')
        lifts.appendChild(lift)
        liftCount++
    }


}

//function call
generateBtn.addEventListener('click', (e) => {
    generate(nFloors, nLifts)
})