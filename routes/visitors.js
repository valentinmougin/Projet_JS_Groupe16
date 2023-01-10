const { Router } = require("express");
const ForbiddenError = require("../errors/ForbiddenError");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const { Visitor } = require("../models");

const router = new Router();

// Get collection
router.get(
  "/Visitor",
  checkAuth,
  checkRole({ minRole: checkRole.ROLES.ADMIN }),
  (req, res) => {
    Visitor.findAll({
      where: req.query,
      attributes: { exclude: ["password"] },
    }).then((data) => res.json(data));
  }
);

// Créer un Visitor
router.post("/Visitor", (req, res, next) => {
  const Visitor = new Visitor(req.body);
  Visitor
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});

// Récupérer un Visitor
router.get("/Visitor/:id", async (req, res) => {
  const Visitor = await Visitor.findByPk(parseInt(req.params.id), {
    attributes: { exclude: "password" },
  });
  if (!Visitor) {
    res.sendStatus(404);
  } else {
    res.json(Visitor);
  }
});

// Update un Visitor
router.put("/Visitor/:id", checkAuth, (req, res, next) => {
  if (req.Visitor.id !== parseInt(req.params.id)) throw new ForbiddenError();

  Visitor.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
    .then(([nbUpdated]) => {
      if (!nbUpdated) return res.sendStatus(404);
      Visitor.findByPk(parseInt(req.params.id), {
        attributes: { exclude: "password" },
      }).then((Visitor) => res.json(Visitor));
    })
    .catch(next);
});

// Delete un utilisateur
router.delete("/Visitor/:id", checkAuth, (req, res) => {
  if (req.Visitor.id !== parseInt(req.params.id)) throw new ForbiddenError();
  Visitor.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  }).then((nbDeleted) => {
    if (nbDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
