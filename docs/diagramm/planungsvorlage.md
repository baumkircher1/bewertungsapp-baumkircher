# Planungsvorlage – Datenmodell Einheit 2 (Team, Member, Project)

## Team

| Spaltenname | Datentyp | Constraint |
|---|---|---|
| id | INTEGER | Primärschlüssel, automatisch |
| name | STRING | — |
| klasse | STRING | — |

**Beispieldaten Team**

| id | name | klasse |
|---|---|---|
| 1 | Scan2Order | 4a APC |

## Member

| Spaltenname | Datentyp | Constraint |
|---|---|---|
| id | INTEGER | Primärschlüssel, automatisch |
| teamId | INTEGER | Fremdschlüssel → Team.id |
| vorname | STRING | — |
| nachname | STRING | — |

**Beispieldaten Member**

| id | teamId | vorname | nachname |
|---|---|---|---|
| 1 | 1 | Maria | Baumkircher |

## Project

| Spaltenname | Datentyp | Constraint |
|---|---|---|
| id | INTEGER | Primärschlüssel, automatisch |
| teamId | INTEGER | Fremdschlüssel → Team.id |
| titel | STRING | — |
| beschreibung | TEXT | — |
| praesentiertAm | DATE | — |

**Beispieldaten Project**

| id | teamId | titel | beschreibung | praesentiertAm |
|---|---|---|---|---|
| 1 | 1 | Web-App | Web-App online Bestellungen für Kleinunternehmen | 2026-09-30 |

## Beziehungen

- Team 1 — n Project (ein Team hat mehrere Projects)
- Team 1 — n Member (ein Team hat mehrere Members)
