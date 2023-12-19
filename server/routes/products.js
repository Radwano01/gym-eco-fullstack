const {
  addProduct,
  getProduct,
  getSingleProduct,
  editProduct,
  deleteProduct,
} = require("../controller/products");
const router = require("express").Router();

router.post("/add-products", addProduct);
router.get("/get-products", getProduct);
router.get("/get-single-product/:id", getSingleProduct);
router.post("/edit-product/:id", editProduct);
router.post("/delete-product/:id", deleteProduct);


module.exports = {
  router
}
