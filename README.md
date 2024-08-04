# Game of Life

## Usage
The "Timer" button toggles between automated advancement with the number in the textfield being the "intended" time to reach in ms between new frames and a pause state.

During the pause phase you can advance the board by one generation via the "Advance" button

The board can be cleared using the appropriate button to enable easier drawing of owns own construct.

You can click a tile in the boad to toggle its state(best used while in pause mode).

Enabling the preview checkbox displayed a color view of the coming generation:
* gray-> is dead and will stay dead
* light green-> is dead and will be alive
* dark green-> is alive and will stay that way
* red-> is alive and will die next generation

To get a new randomly generated field refresh the browser

## Installation
A live version can be seen on [Github Pages](https://therhodanist.github.io/react-game-of-life/) (for now)

for local installation clone the repo and run either 
- `npm run start` for local development via an integrated webserver on port 3000
- `npm run build` to build a version of the app for deployment on another server(must have a webserver on that server) 
