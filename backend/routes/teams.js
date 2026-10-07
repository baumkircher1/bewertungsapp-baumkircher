const express = require('express');
const router = express.Router();
const db = require('../models');
const { Team, Member, Project } = db;

// alle Teams inkl. Mitglieder und Projekte
router.get('/', async (req, res) => {
  const teams = await Team.findAll({ include: [Member, Project] });
  res.json(teams);
});

// ein Team per ID
router.get('/:id', async (req, res) => {
  const team = await Team.findByPk(req.params.id, { include: [Member, Project] });
  if (!team) return res.status(404).json({ error: 'Team nicht gefunden' });
  res.json(team);
});

// neues Team anlegen
router.post('/', async (req, res) => {
  const { name, klasse } = req.body;
  if (!name || !klasse) {
    return res.status(400).json({ error: 'name und klasse sind Pflichtfelder' });
  }
  const team = await Team.create({ name, klasse });
  res.status(201).json(team);
});

// Team aktualisieren
router.put('/:id', async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: 'Team nicht gefunden' });
  await team.update(req.body, { fields: ['name', 'klasse'] });
  res.json(team);
});

// Team löschen
router.delete('/:id', async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).json({ error: 'Team nicht gefunden' });
  await team.destroy();
  res.status(204).send();
});

module.exports = router;
