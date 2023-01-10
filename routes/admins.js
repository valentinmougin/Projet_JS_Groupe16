
const { Router } = require("express");
const ForbiddenError = require("../errors/ForbiddenError");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const { admin } = require("../models");

const router = new Router();

// Get collection
router.get(
  "/admin",
  checkAuth,
  checkRole({ minRole: checkRole.ROLES.ADMIN }),
  (req, res) => {
    admin.findAll({
      where: req.query,
      attributes: { exclude: ["password"] },
    }).then((data) => res.json(data));
  }
);

// Créer un admin
router.post("/admin", (req, res, next) => {
  const admin = new admin(req.body);
  admin
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});

// Récupérer un admin
router.get("/admin/:id", async (req, res) => {
  const admin = await admin.findByPk(parseInt(req.params.id), {
    attributes: { exclude: "password" },
  });
  if (!admin) {
    res.sendStatus(404);
  } else {
    res.json(admin);
  }
});

// Update un admin
router.put("/admin/:id", checkAuth, (req, res, next) => {
  if (req.admin.id !== parseInt(req.params.id)) throw new ForbiddenError();

  admin.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
    .then(([nbUpdated]) => {
      if (!nbUpdated) return res.sendStatus(404);
      admin.findByPk(parseInt(req.params.id), {
        attributes: { exclude: "password" },
      }).then((admin) => res.json(admin));
    })
    .catch(next);
});

// Delete un utilisateur
router.delete("/admin/:id", checkAuth, (req, res) => {
  if (req.admin.id !== parseInt(req.params.id)) throw new ForbiddenError();
  admin.destroy({
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
