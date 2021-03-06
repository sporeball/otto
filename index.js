/*
  index.js
  otto entry point
  copyright (c) 2021 sporeball
  MIT license
*/

const {app, BrowserWindow, Menu} = require("electron");

// note: must match `build.appId` in package.json
app.setAppUserModelId("com.sporeball.otto");

// prevent window from being garbage collected
let mainWindow;

const createMainWindow = async () => {
	const win = new BrowserWindow({
		title: app.name,
		show: false,
		width: 600,
		height: 400,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
	});

	win.on("ready-to-show", () => {
		win.show();
	});

	win.on("closed", () => {
		// dereference the window
		mainWindow = undefined;
	});

	await win.loadFile("index.html");

	return win;
};

// prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on("second-instance", () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

app.on("activate", async () => {
	if (!mainWindow) {
		mainWindow = await createMainWindow();
	}
});

(async () => {
	await app.whenReady();
	mainWindow = await createMainWindow();
})();
