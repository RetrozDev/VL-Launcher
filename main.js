const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");
const { Client } = require("discord-rpc");

// Remplacez par votre propre ID d'application
const clientId = '1255675059243192410';

// Créez une instance de client RPC
const rpc = new Client({ transport: 'ipc' });

// Fonction pour configurer le Rich Presence
function setRichPresence() {
  rpc.setActivity({
    details: 'Je vais jouer au meilleur serveur rp !',
    state: 'En attente de connexion...',
    startTimestamp: Date.now(),
    largeImageKey: 'vida-loca', 
    largeImageText: 'Vida Loca',
    smallImageKey: 'vida-loca-nobg', 
    smallImageText: 'Petit texte de l\'image',
    instance: false,
  });
}

rpc.on('ready', () => {
  setRichPresence();
  console.log('Rich Presence est actif!');
});

rpc.login({ clientId }).catch(console.error);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + './assets/icon.ico',
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
