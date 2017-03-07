'use strict';

const electron = require('electron');

const DOM_VK_A = 0x41; // (65) "A" key.
const DOM_VK_C = 0x43; // (67) "C" key.
const DOM_VK_V = 0x56; // (86) "V" key.
const DOM_VK_X = 0x58; // (88) "X" key.
const DOM_VK_Z = 0x5A; // (90) "Z" key.

const menuTemplate = [{
	label: 'Undo',
	role: 'undo'
}, {
	label: 'Redo',
	role: 'redo'
}, {
	type: 'separator'
}, {
	label: 'Cut',
	role: 'cut'
}, {
	label: 'Copy',
	role: 'copy'
}, {
	label: 'Paste',
	role: 'paste'
}, {
	type: 'separator'
}, {
	label: 'Select all',
	role: 'selectall'
}];

function action(name, evt) {
	const win = electron.remote.getCurrentWindow();
	win.webContents[name]();
	evt.preventDefault();
	return false;
}

function defaultIsEditable(node) {
	return node.matches('input, textarea, [contenteditable]');
}

function mkInputMenu(isEditable = defaultIsEditable) {
	function inputMenu(ctx, next) {
		let node = ctx.elm;

		while (node) {
			if (isEditable(node)) {
				[].push.apply(ctx.menu, menuTemplate);
				break;
			}
			node = node.parentElement;
		}
		next();
	}

	function handleInputShortcuts(evt) {
		const c = evt.keyCode;
		const ctrlDown = evt.ctrlKey || evt.metaKey; // OSX support
		const altDown = evt.altKey;
		const shiftDown = evt.shiftKey;

		if (altDown) {
			return true;
		}

		if (!isEditable(evt.target)) {
			return true;
		}

		if (ctrlDown && !shiftDown && c === DOM_VK_C) {
			return action('copy', evt);
		}

		if (ctrlDown && !shiftDown && c === DOM_VK_V) {
			return action('paste', evt);
		}

		if (ctrlDown && !shiftDown && c === DOM_VK_X) {
			return action('cut', evt);
		}

		if (ctrlDown && !shiftDown && c === DOM_VK_A) {
			return action('selectAll', evt);
		}

		if (ctrlDown && !shiftDown && c === DOM_VK_Z) {
			return action('undo', evt);
		}

		if (ctrlDown && shiftDown && c === DOM_VK_Z) {
			return action('redo', evt);
		}

		return true;
	}

	function registerShortcuts() {
		if (document.body) {
			document.body.addEventListener('keydown', handleInputShortcuts);
		} else {
			document.addEventListener('DOMContentLoaded', () => {
				document.body.addEventListener('keydown', handleInputShortcuts);
			});
		}
	}

	inputMenu.registerShortcuts = registerShortcuts;
	return inputMenu;
}

const defaultInputMenu = mkInputMenu();
defaultInputMenu.mkInputMenu = mkInputMenu;
defaultInputMenu.defaultIsEditable = defaultIsEditable;
module.exports = defaultInputMenu;
