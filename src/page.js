'use strict'

const path = require('path');
const { BrowserWindow } = require('electron');

const fs = require('fs');

// default window settings
const defaultProps = {
	width: 500,
	height: 600,
	show: false,
	webPreferences: {
		nodeIntegration: true
	}
};

class Page extends BrowserWindow {
	constructor ({ page, ...windowSettings }) {

		// calls new BrowserWindow with these props
		super({ ...defaultProps, ...windowSettings });

		// Make an assumption about where things live
		let root = path.join('src', 'pages');
		let pageRoot = path.join(root, page, page);

		let htmlLocation = pageRoot + '.html';
		let cssLocation = pageRoot + '.css';
		let jsLocation = pageRoot + '.js';

		let globalCssLocation = path.join(root, 'global.css');
		let spectreCssLocation = path.join('node_modules', 'spectre.css', 'dist', 'spectre.min.css');

		// load the html
		this.loadFile(htmlLocation);

		// NOTE: Uncomment the following line to see dev tools
		// this.webContents.openDevTools();

		// gracefully show when ready to prevent flickering
		this.once('ready-to-show', () => {

			// Load css
			this.webContents.insertCSS(fs.readFileSync(spectreCssLocation, 'utf8'));
			this.webContents.insertCSS(fs.readFileSync(globalCssLocation, 'utf8'));
			this.webContents.insertCSS(fs.readFileSync(cssLocation, 'utf8'));

			// Load js			
			this.webContents.executeJavaScript(fs.readFileSync(jsLocation, 'utf8') + ';0');

			this.show();
		});
	}
}

module.exports = Page;