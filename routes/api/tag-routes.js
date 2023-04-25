const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags and includes their associated products
  try {
    const tagsData = await Tag.findAll({
      include: { model: Product, through: ProductTag },
    });
    res.json(tagsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id` and includes its associated products
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: Product,
      ProductTag,
    });
    if (!tagsData) {
      res.status(404).json({ message: "Tag not found" });
    }
    res.json(tagsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body).then(tag);
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
