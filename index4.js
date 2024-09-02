import express from "express"; // Importiert das Express-Framework, das zur Erstellung von Webanwendungen in Node.js verwendet wird.
import bodyParser from "body-parser"; // Importiert das Body-Parser-Modul, das verwendet wird, um Daten aus HTTP-Anforderungen zu analysieren und verfügbar zu machen.
import { dirname } from "path"; // Importiert die dirname-Funktion aus dem integrierten path-Modul, die den Verzeichnisnamen eines Pfades zurückgibt.
import { fileURLToPath } from "url"; // Importiert die fileURLToPath-Funktion aus dem integrierten url-Modul, die eine Datei-URL in einen Dateipfad konvertiert.

const __dirname = dirname(fileURLToPath(import.meta.url)); // Hier wird __dirname erstellt, indem der Dateipfad des aktuellen Moduls (durch import.meta.url) in einen Dateipfad 
//umgewandelt wird. Dies ermöglicht den Zugriff auf das aktuelle Verzeichnis.

const app = express(); // Erstellt eine Express-Anwendung und weist sie der Variable app zu.
const port = 3000; // Legt den Port fest, auf dem die Anwendung hören wird.
var bandName = ""; // Deklariert eine Variable namens bandName, die später im Code verwendet wird, um den generierten Bandnamen zu speichern.

app.use(bodyParser.urlencoded({ extended: true })); // Verwendet das Body-Parser-Middleware, um Anforderungsdaten im URL-kodierten Format zu verarbeiten.

function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next(); // Definiert eine Middleware-Funktion namens bandNameGenerator, die aufgerufen wird, wenn eine HTTP-Anforderung verarbeitet wird. 
  //Diese Funktion liest die Daten aus dem Request-Body und generiert einen Bandnamen, indem sie Straßennamen und Haustiernamen aus dem Formular kombiniert.
}

app.use(bandNameGenerator); // Registriert die bandNameGenerator-Middleware, um bei allen eingehenden HTTP-Anforderungen aufgerufen zu werden.

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
}); // Definiert eine Route für HTTP-GET-Anforderungen auf dem Wurzelpfad ("/"). Wenn ein Benutzer die Wurzelseite besucht, wird die HTML-Datei "index.html" zurückgesendet.

app.post("/submit", (req, res) => {
  res.send(`<h1>Your bandname is: </h1><h2>${bandName}🤩</h2>`);
}); // Definiert eine Route für HTTP-POST-Anforderungen auf dem Pfad "/submit". Wenn ein Benutzer das Formular auf dieser Seite sendet, 
// wird eine HTML-Antwort generiert und der generierte Bandname wird angezeigt.

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
}); // Startet den Express-Server und lässt ihn auf Port 3000 lauschen. Wenn der Server gestartet wird, wird eine Nachricht in der Konsole angezeigt.

// Das ist eine grundlegende Express-Anwendung, die eine HTML-Datei serviert und einen generierten Bandnamen anzeigt, 
// wenn Benutzer ein Formular auf der Seite senden. Die Middleware body-parser wird verwendet, um die Formulardaten zu verarbeiten, 
// und die express-App verwendet Routen, 
//um verschiedene HTTP-Anforderungen zu verarbeiten.
// Die Reiehfolge des Codes ist bei der Middleware besonders wichtig!