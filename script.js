"use strict"
const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 350 //Sets the initial shooter position
let width = 20
let direction = 1
let invadersId
let movingRight = true
let aliensRemoved = []
let results = 0

for (let i = 0; i < 400; i++) { //create 400 squares within the grid
  const square = document.createElement('div') //Each square is a div
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div')) 
//Since we created the squares as grid divs, we are now making an array out of the squares (or divs) that we created above

const alienInvaders = [ //initial positioning of aliens
  0,1,2,3,4,5,6,7,8,9,10,
  20,21,22,23,24,25,26,27,28,29,30,
  40,41,42,43,44,45,46,47,48,49,50,
  60,61,62,63,64,65,66,67,68,69,70
] //aliens are put in the indexes of the array

function draw() { //draw the aliens
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

draw() // draws the invaders

function remove() { //remove the invaders with remove function
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

squares[currentShooterIndex].classList.add('shooter') //adds the shooter in the grid based on the "CurrentShooterIndex"


function moveShooter(e) { //move the shooter
  squares[currentShooterIndex].classList.remove('shooter') // removes the shooter from its current position
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1 
      // As long as shooter is not at the left most of the grid line, can move left 
      // Logic is that if the current shooter index is not divisible by the width of the grid, 
      // Then shooter is not at the leftmost edge and can move left
      break
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      // As long as shooter is not at the right most of the grid line, can move right
      // width < width -1 ==> there is still room to go right
      break
  }
  squares[currentShooterIndex].classList.add('shooter') // adds back the shooter to its new position
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  //same logic as move shooter as above in terms of determining left and right edges
  remove()

  if (rightEdge && movingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1 //move it down by one row 
      direction = -1 //change direction to left
      movingRight = false
    }
  }

  if(leftEdge && !movingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1 //move it down by one row
      direction = 1 //change direction to right
      movingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  // Win-lose scenario
  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    //if shooter and invader collide ==> game over
    resultsDisplay.innerHTML = 'GAME OVER PRESS REFRESH TO RESTART'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienInvaders.length; i++) { 
    //if last alien greater than the number of squares in the grid ==> game over
    if(alienInvaders[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER PRESS REFRESH TO RESTART'
      clearInterval(invadersId)
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = 'YOU WIN BUT YOU LOST TIME PLAYING THIS GAME'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(moveInvaders, 200) // how fast the aliens moves

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex //current laser index will be wherever our current shooter is at
  function moveLaser() { //function exists to move laser
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width //move laser up by 1 whole width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('explosion')
      // if laser is in same square as invader, remove the laser and invader and add a explosion

      setTimeout(()=> squares[currentLaserIndex].classList.remove('explosion'), 300)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      results++
      resultsDisplay.innerHTML = results
      console.log(aliensRemoved)

    }

  }
  switch(e.key) {
    case ' ':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)
// The keydown and keyup events provide a code indicating which key is pressed, 
// while keypress indicates which character was entered. 
// For example, a lowercase "a" will be reported as 65 by keydown and keyup, but as 97 by keypress. 
// An uppercase "A" is reported as 65 by all events.
