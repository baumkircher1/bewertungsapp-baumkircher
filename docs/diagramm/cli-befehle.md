# Einheit 2: Verwendete CLI-Befehle

## Projekt aufsetzen

```
npm init -y
npm install express cors morgan sequelize cookie-parser mysql2
npm install --save-dev sequelize-cli
npx sequelize-cli init
```

## Datenbank-Verbindung testen

```
npx sequelize-cli db:create
```

## Modelle generieren

```
npx sequelize-cli model:generate --name Team --attributes name:string,klasse:string
npx sequelize-cli model:generate --name Member --attributes teamId:integer,vorname:string,nachname:string
npx sequelize-cli model:generate --name Project --attributes teamId:integer,titel:string,beschreibung:text,praesentiertAm:date
```

## Migration ausführen

```
npx sequelize-cli db:migrate
```

Ergebnis: Tabellen `Teams`, `Members`, `Projects` wurden angelegt (siehe Screenshot in `docs/screenshots/einheit2-tabellen.png`).
