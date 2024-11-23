const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  setWallpaper: async (imageUrl) => {
    // Wywołanie z renderera do procesu głównego
    return ipcRenderer.invoke('set-wallpaper', imageUrl);
  }
});