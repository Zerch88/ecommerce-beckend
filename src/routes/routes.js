const express = require('express');
const router = express.Router();

const { Product } = require("../models/product");

router.get("/", (req, res) => {
  res.status(200).send("Hola desde rutas");
});

// Create
router.post("/weeds/v1/product", (req, res) => {
  const json = req.body;
  const nuevoProduct = Product(json);

  nuevoProduct.save((err, product) => {
    err ? res.status(409).send(err) : res.status(200).send(product);
  });
});

// read
router.get("/weeds/v1/product", (req, res) => {
  Product.find()
    .exec()
    .then(product => {
      res.status(200).send(product);
    })
    .catch(error => res.status(404).error(error));
});

// read an specific element by ID
router.get("/weeds/v1/product/:id", (req, res) => {
  const productId = req.params.id;
  Product.findById(productId)
    .exec()
    .then(product => {
      res.status(200).send(product);
    })
    .catch(error => res.status(404).error(error));
});

//update

router.put("/weeds/v1/product/:id", (req, res) => {
  const productId = req.params.id;
  const json = req.body;
  Product.findOneAndUpdate(
    productId,
    {
      $set: json
    },
    {
      new: true
    }
  )
    .exec()
    .then(productActualizado => {
      res.status(200).send(productActualizado);
    })
    .catch(error => res.status(400).send(error));
});

//delete

router.delete("/weeds/v1/product/:id", (req, res) => {
  const productId = req.params.id;
  Product.findByIdAndRemove(productId)
    .exec()
    .then(productEliminado => {
      res.status(204).send({
        message: "El producto se borró exitosamente"
      });
    })
    .catch(error => res.status(404).send(error));
});

module.exports = router;