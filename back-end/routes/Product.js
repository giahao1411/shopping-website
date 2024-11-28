const express = require("express");
const router = express.Router();

const Product = require("../models/ProductModel");

router.get("/products", async (req, res) => {});

router.post("/products", async (req, res) => {});

router.patch("/products/edit/:id", async (req, res) => {});

router.patch("/products/delete/:id", async (req, res) => {});

module.exports = router;
