# Timetacle Notifier

Termin-Überwachung mit WhatsApp-Benachrichtigungen für Timeacle-basierte Buchungssysteme.

## Funktionen

- **Automatische Überprüfung**: Cron-Job prüft alle 5 Minuten die Timeacle-API nach freien Terminen.
- **WhatsApp-Benachrichtigungen**: Sendet Nachrichten über CallMeBot API bei verfügbaren Slots.
- **Konfigurierbare Settings**: Alle URLs, API-Keys und Optionen werden aus der DB geladen.
- **Debug-Modus**: Logging nur aktiv, wenn `debug: true` gesetzt ist.

## Voraussetzungen

- Node.js (Version 16+)
- npm oder yarn
- Convex-Konto (kostenloses Konto möglich)

## Installation

1. Klone oder lade das Projekt herunter.
2. Installiere Abhängigkeiten:
   ```bash
   npm install
   ```

## Konfiguration

Bevor du startest, konfiguriere die Settings in der Convex-Datenbank (lokal oder Cloud):

1. Öffne das Convex-Dashboard (`npx convex dashboard` für lokal, oder online nach Deployment).
2. Gehe zur `settings` Tabelle.
3. Füge ein Dokument mit diesen Feldern hinzu:
   - `callmebotApiKey`: Dein CallMeBot API-Key (von https://www.callmebot.com/).
   - `phoneNumber`: Deine Telefonnummer (z.B. "+491234567890").
   - `bookingUrl`: URL zur Buchungsseite (z.B. Timeacle-Buchungslink).
   - `timacleUrl`: Die Timeacle-API-URL, die ein JSON-Array mit verfügbaren Terminen zurückgibt (z.B. `https://timeacle.com/api/booking/getFirstBookableTimes?queueId=3278&services=[...]&count=9`). Passe queueId, services und count an deine Bedürfnisse an.
   - `debug`: `true` für Logging-Ausgabe, `false` für Produktion (keine Logs).

Ohne vollständige Settings laufen die Funktionen nicht.

## Lokale Entwicklung

1. Starte den lokalen Convex-Server:
   ```bash
   npx convex dev
   ```
   - Für das Dashboard: `npx convex dashboard` (öffnet im Browser).

2. Konfiguriere die Settings (siehe Abschnitt "Konfiguration").

3. Teste die Funktionen:
   - Die Cron-Jobs laufen automatisch.
   - Überprüfe Logs im Terminal (nur wenn `debug: true`).

## Deployment in die Cloud

1. Melde dich bei Convex an (falls noch nicht):
   ```bash
   npx convex login
   ```

2. Erstelle oder wähle ein Projekt:
   ```bash
   npx convex dev --configure existing
   ```
   - Wähle dein Team und Projekt.

3. Deploye die Funktionen:
   ```bash
   npx convex deploy
   ```

4. Konfiguriere die Settings (siehe Abschnitt "Konfiguration").

5. Die Cron-Jobs laufen nun in der Cloud und senden Benachrichtigungen.

## Konfiguration

- **Cron-Intervall**: In `convex/crons.ts` auf 5 Minuten gesetzt. Ändere bei Bedarf.
- **Timeacle-URLs**: Passe die `timacleUrl` und `bookingUrl` in den Settings an.
- **WhatsApp**: Stelle sicher, dass CallMeBot konfiguriert ist (API-Key und Nummer).

## Fehlerbehebung

- **Server startet nicht**: Stelle sicher, dass Port 3210 frei ist. Verwende `--port 3211` für alternativen Port.
- **Keine Benachrichtigungen**: Prüfe, ob alle Settings gesetzt sind und `debug: true` für Logs.
- **API-Fehler**: Überprüfe URLs und API-Keys im Dashboard.

## Sicherheit

- Speichere API-Keys und sensible Daten nur in der DB (nicht im Code).
- Verwende für Produktion immer die Cloud-Deployment.

## Lizenz

Dieses Projekt ist privat und nur für persönliche Nutzung.