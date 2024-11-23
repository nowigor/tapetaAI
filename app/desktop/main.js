import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
// import * as wallpaper from 'wallpaper';
import {setWallpaper} from "wallpaper";

import fs from 'fs';
import axios from 'axios';
import { fileURLToPath } from 'url';

// Zmienna do uzyskiwania katalogu, w którym znajduje się skrypt
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icona.ico')
  });

  // win.loadURL('http://localhost:3000');
    win.loadFile(path.join(__dirname, 'build', 'index.html'))
}

app.whenReady().then(() => {
  createWindow();

  // Zmienione na ipcMain.handle
  ipcMain.handle('set-wallpaper', (event, imageUrl) => {
    console.log("Pobieram obraz:", imageUrl);
    return axios.get(imageUrl, { responseType: 'arraybuffer' })
      .then(response => {
        const filePath = path.join(__dirname, 'temp-wallpaper.jpg');
        fs.writeFileSync(filePath, response.data);

        setWallpaper(filePath).then(()=>{
          console.log("cxos");
        });
        // return wallpaper.set(filePath)
        //   .then(() => {
        //     console.log('Tapeta została ustawiona!');
        //     return 'Tapeta została ustawiona!';
        //   })
        //   .catch(err => {
        //     console.error('Błąd ustawiania tapety:', err);
        //     throw err;
        //   });
      })
      .catch(error => {
        console.error('Błąd pobierania obrazu:', error);
        throw error;
      });
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});