
const { Router } = require("express");
const ForbiddenError = require("../errors/ForbiddenError");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const { seller } = require("../models");

const router = new Router();

// Get collection
router.get(
  "/seller",
  checkAuth,
  checkRole({ minRole: checkRole.ROLES.seller }),
  (req, res) => {
    seller.findAll({
      where: req.query,
      attributes: { exclude: ["password"] },
    }).then((data) => res.json(data));
  }
);

// Créer un seller
router.post("/seller", (req, res, next) => {
  const seller = new seller(req.body);
  seller
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});

// Récupérer un seller
router.get("/seller/:id", async (req, res) => {
  const seller = await seller.findByPk(parseInt(req.params.id), {
    attributes: { exclude: "password" },
  });
  if (!seller) {
    res.sendStatus(404);
  } else {
    res.json(seller);
  }
});

// Update un seller
router.put("/seller/:id", checkAuth, (req, res, next) => {
  if (req.seller.id !== parseInt(req.params.id)) throw new ForbiddenError();

  seller.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
    .then(([nbUpdated]) => {
      if (!nbUpdated) return res.sendStatus(404);
      seller.findByPk(parseInt(req.params.id), {
        attributes: { exclude: "password" },
      }).then((seller) => res.json(seller));
    })
    .catch(next);
});

// Delete un utilisateur
router.delete("/seller/:id", checkAuth, (req, res) => {
  if (req.seller.id !== parseInt(req.params.id)) throw new ForbiddenError();
  seller.destroy({
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
