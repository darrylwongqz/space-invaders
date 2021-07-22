# space-invaders
My shot at recreating &amp; iterating on the classic space invaders game

Instructions:
Left & Right keys to navigate shooter
Spacebar to shoot
Your goal to win is to remove all the aliens by shooting them down

Logic behind the creation of the game - 
Expanded logic is written in the script.js file where I comment on how each step contributes to the entire thing working

Creating the grid:
1) Put in the boilerplate html first
2) Create a div class called "grid" to contain the game - I chose a 400px by 400px grid in this case
3) Fill in the CSS of the grid - in this case it was a bit of a trial & error
4) Create 400 squares within the grid and make it into an Array - so we can use the position of each Array to put either the invader or shooter

Creating the aliens & shooters:
1) Create the alien invaders initial position and then draw the aliens out
2) Create the shooter with the same logic
3) Create motion in the shooter and and motion in the invaders
(Detailed pseudocode is in the javascript doc about the formula and intuition behind the formula used)

Creating the laser:
1) Laser index will be initally = shooter index
2) At a specific time interval, we move the laser up by the width of the grid
3) When laser index coincides with alien index, remove the laser and add an explosion
4) Remove the explosion after a set time interval
5) Score updates at the top of the grid

Win-lose scenario:
1) Lose if shooter and invader collide
2) Lose if last alien in the array reaches the bottom of the grid
3) Win if all the aliens are removed i.e. aliensRemoved.length === alieninvaders.length
