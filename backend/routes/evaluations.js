const express = require('express');
const router = express.Router();
const db = require('../models');
const { Evaluation, Project, Criterion, Juror } = db;

// neue Bewertung speichern
router.post('/', async (req, res) => {
  const { projectId, criterionId, jurorId, score, comment } = req.body;
  if (!projectId || !criterionId || !jurorId || score === undefined) {
    return res.status(400).json({ error: 'projectId, criterionId, jurorId und score sind Pflichtfelder' });
  }

  const project = await Project.findByPk(projectId);
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  const criterion = await Criterion.findByPk(criterionId);
  if (!criterion) return res.status(404).json({ error: 'Kriterium nicht gefunden' });
  const juror = await Juror.findByPk(jurorId);
  if (!juror) return res.status(404).json({ error: 'Juror nicht gefunden' });

  // Punktzahl muss zwischen 0 und maxScore liegen
  if (!Number.isInteger(score) || score < 0 || score > criterion.maxScore) {
    return res.status(400).json({ error: `score muss eine ganze Zahl zwischen 0 und ${criterion.maxScore} sein` });
  }

  // Juror darf dasselbe Kriterium beim selben Projekt nur einmal bewerten
  const vorhanden = await Evaluation.findOne({ where: { projectId, criterionId, jurorId } });
  if (vorhanden) {
    return res.status(409).json({ error: 'Bewertung existiert bereits' });
  }

  const evaluation = await Evaluation.create({ projectId, criterionId, jurorId, score, comment });
  res.status(201).json(evaluation);
});

module.exports = router;
