'use strict'

const { ipcRenderer } = require('electron');

ipcRenderer.on('car-update', (event, cars) => {
	
	const list = document.getElementById('cars');

	const builtHtml = cars.reduce((html, car) => {
		html += `<tr>
			<td>(${car.number})&nbsp;${car.driver}</td>
			<td>${(car.diffMS/1000).toFixed(4)}</td>
			<td>${car.laps}</td>
		</tr>`;

		return html;
	}, '');

	list.innerHTML = builtHtml;
});