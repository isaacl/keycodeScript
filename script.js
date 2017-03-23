// ==UserScript==
// @name           Disable website keyboard hooks
// @description    Stop websites from hijacking keyboard shortcuts.
// @author         Isaac Levy, Jonas Singe
// @run-at         document-start
// @include        *
// @grant          none
// @version        0.0.2
// @namespace      https://gist.github.com/isaacl
// ==/UserScript==

// Disable these keys when no keyboard modifier is pressed
var keycodes = new Set([
    // Add keycodes as desired
    37, 38, 39, 40 // Arrow Keys.
]);

// Disable these keys when Meta key is pressed.
var meta_keycodes = new Set([
	// Add keycodes as desired
	70 // Ctrl + F
]);

// Disable these keys when Alt key is pressed.
var alt_keycodes = new Set([
	// Add keycodes as desired
	83 // Alt + S
]); 


// Don't change below this line.

var isMac = navigator.platform.toLowerCase().indexOf('mac') >= 0;


document.addEventListener('keydown', function(e) {
    //console.log(e);
    if ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) {
        if (meta_keycodes.has(e.keyCode)) {
            e.stopImmediatePropagation();
        }
    } else if (e.altKey) {
        if (alt_keycodes.has(e.keyCode)) {
            e.stopImmediatePropagation();
        }
    } else if (keycodes.has(e.keyCode)) {
        e.stopImmediatePropagation();
    }
    return false;
});