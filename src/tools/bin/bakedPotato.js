// Require the Blessed API. 
var Blessed = require('blessed'); 

// Initialize the screen widget.
var screen = Blessed.screen({
	// Example of optional settings:
	smartCSR: true,
	useBCE: true,
	cursor: {
		artificial: true,
		blink: true,
		shape: 'underline'
	},
	log: `${__dirname}/application.log`,
	debug: true,
	dockBorders: true
});

// Specify the title of the application.
screen.title = 'Baked Potato Script Editor';


var box = Blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

// Creating a textarea on the bottom of the screen.
var input = Blessed.textarea({ 
	bottom: 0,        
	height: 3,        
	inputOnFocus: true,
	padding: {        
		top: 1,
		left: 2
	},
	style: {          
		fg: '#ffffff',
		bg: '#000000',  

		focus: {        
			fg: '#f6f6f6',
			bg: '#353535' 
		}
	}
});

screen.append(box);
// Append the widget to the screen.
screen.append(input);

// Render the screen.
screen.render();

input.focus();



// Quit on `q`, or `Control-C` when the focus is on the screen.
screen.key(['q', 'C-c'], function(ch, key) {
	process.exit(0);
});

// Focus on `escape` or `i` when focus is on the screen.
screen.key(['escape', 'i'], function() {
	// Set the focus on the input.
	input.focus();
});
    
// If box is focused, handle `Control+s`.
input.key('C-s', function(ch, key) {
	var message = this.getValue();
	// Send the message somehow.
	this.clearValue();
	screen.render();
});  
