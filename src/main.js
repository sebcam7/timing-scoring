'use strict'

const { app } = require('electron');

const Page = require('./page');

const fakeData = require('./fake-data.json');

let mainPage, loadingPage;

function main () {

	// Display loading screen for a few seconds
	loadingPage = new Page({
		page: 'loading'
	});

	setTimeout(()=> {

		mainPage = new Page({
			page: 'dashboard'
		});

		// Once dashboard is loaded
		mainPage.once('show', () => {

			// Close the loading window
			loadingPage.close();

			// Send it some fake data
			mainPage.webContents.send('car-update', fakeData.cars);

			// Make fake data dance
			setInterval(dance, 1000);
		});

	}, 3000);
}

function dance() {
	// fakely calculate time between cars

	let lastTime = 0;

	fakeData.cars.forEach((car, index) => {
		if (index > 0) {
			lastTime += Math.floor(Math.random() * 100) + 1;
			car.diffMS = lastTime;
		}
	});

	mainPage.webContents.send('car-update', fakeData.cars);
}

app.on('ready', main);
app.on('window-all-closed', function () {
	app.quit()
})