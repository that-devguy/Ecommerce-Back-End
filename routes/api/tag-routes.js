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

router.post("/", async (req, res) => {
  try {
    // create a new tag
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    res.json(updatedTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json({ message: 'Tag deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
