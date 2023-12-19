const { addOrder, getOrders, getSingleOrder, updateStatus, deleteOrder, getSingleOrderImages, getOrderByCode } = require("../controller/orders");

const router = require("express").Router();

router.post("/order", addOrder)
router.get("/get-orders", getOrders)
router.get("/get-single-order/:id", getSingleOrder)
router.get('/get-single-order-images', getSingleOrderImages)
router.put("/change-status/:id", updateStatus)
router.post("/delete-order/:id", deleteOrder)
router.get("/get-order-by-code", getOrderByCode)

module.exports = {router}