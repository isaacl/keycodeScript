// ==UserScript==
// @name           Disable website keyboard hooks
// @description    Stop websites from hijacking keyboard shortcuts.
// @author         Isaac Levy
// @run-at         document-start
// @include        *
// @grant          none
// @version        0.0.1
// @namespace      https://isaacrlevy.com
// ==/UserScript==

var keycodes = [ // Add keycodes as desired, keep sorted.
    37, 38, 39, 40 // Arrow keys.
]

var meta_keycodes = [ // Disable these when meta key is pressed.
    70
];

// Don't change below this line.

var isMac = navigator.platform.toLowerCase().indexOf('mac') >= 0;

// Create a fast lookup.
// This saves work during normal typing. Maybe unnecessary.
var keycode_offset = keycodes[0];
var keycode_arr = Array(keycodes[keycodes.length - 1] - keycode_offset)
for (var i = 0, len = keycodes.length; i < len; i++) {
    keycode_arr[keycodes[i] - keycode_offset] = true;
}

document.addEventListener('keydown', function(e) {
    //console.log(e);
    if ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) {
        if (meta_keycodes.indexOf(e.keyCode) >= 0) {
            e.stopImmediatePropagation();
        }
    } else if (keycode_arr[e.keyCode - keycode_offset]) {
        e.stopImmediatePropagation();
    }
    return false;
});