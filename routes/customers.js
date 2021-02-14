const { Customer, validate } = require("../models/customer");
const express = require("express");

const router = express.Router();

const apiEndPoint = "/";
const apiEndPointWithId = `/:id`;

//get generes
router.get(apiEndPoint, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.send(customers);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get generes
router.get(apiEndPointWithId, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(400).send("No record found with the given Id.");
      return;
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//post new genre
router.post(apiEndPoint, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const customer = new Customer(req.body);

  try {
    const result = await customer.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//update existing genre
router.put(apiEndPointWithId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!customer) {
      res.status(400).send("No record found with the given Id.");
      return;
    }
    res.send(customer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//delete existing genre
router.delete(apiEndPointWithId, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) {
      res.status(400).send("No record found with the given Id.");
      return;
    }
    res.send(customer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
