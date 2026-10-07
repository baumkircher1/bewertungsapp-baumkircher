const express = require('express');
const router = express.Router();
const { fn, col } = require('sequelize');
const db = require('../models');
const { Project, Team, Evaluation, Criterion } = db;

// alle Projekte inkl. Team
router.get('/', async (req, res) => {
  const projects = await Project.findAll({ include: Team });
  res.json(projects);
});

// ein Projekt per ID
router.get('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id, { include: Team });
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  res.json(project);
});

// Durchschnitt der Punktzahl pro Kriterium für ein Projekt
router.get('/:id/durchschnitt', async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  const ergebnis = await Evaluation.findAll({
    where: { projectId: req.params.id },
    attributes: ['criterionId', [fn('AVG', col('score')), 'durchschnitt']],
    include: { model: Criterion, attributes: ['name'] },
    group: ['criterionId', 'Criterion.id']
  });
  res.json(ergebnis);
});

// neues Projekt anlegen
router.post('/', async (req, res) => {
  const { teamId, titel, beschreibung, praesentiertAm } = req.body;
  if (!teamId || !titel) {
    return res.status(400).json({ error: 'teamId und titel sind Pflichtfelder' });
  }
  const team = await Team.findByPk(teamId);
  if (!team) return res.status(404).json({ error: 'Team nicht gefunden' });
  const project = await Project.create({ teamId, titel, beschreibung, praesentiertAm });
  res.status(201).json(project);
});

// Projekt aktualisieren
router.put('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  if (req.body.teamId) {
    const team = await Team.findByPk(req.body.teamId);
    if (!team) return res.status(404).json({ error: 'Team nicht gefunden' });
  }
  await project.update(req.body, { fields: ['teamId', 'titel', 'beschreibung', 'praesentiertAm'] });
  res.json(project);
});

// Projekt löschen
router.delete('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  await project.destroy();
  res.status(204).send();
});

module.exports = router;
