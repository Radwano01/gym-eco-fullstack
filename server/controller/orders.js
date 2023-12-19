const { db } = require("../database/mysql");
const ordersModel = require("../models/orders");
const productsModel = require("../models/products");

const addOrder = (req, res) => {
  const addOrders =
    "INSERT INTO `orders` (`o_userid`, `o_name`,`o_email`, `o_price`, `o_items`,`o_status`,`o_address`, `o_date`, `o_code`) VALUES (?,?,?,?,?,?,?,?,?)";

  const values = [
    req.body.userID,
    req.body.name,
    req.body.email,
    req.body.price,
    JSON.stringify(req.body.items),
    req.body.status,
    req.body.address,
    req.body.date,
    req.body.code,
  ];

  db.query(addOrders, values, async (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      const clientName = req.body.name;
      const clientEmail = req.body.email;
      const clientBill = req.body.bill;
      const clientCode = req.body.code;
      await ordersModel
        .create({
          name: clientName,
          email: clientEmail,
          code: clientCode,
          bill: clientBill,
        })
        .then(() => {
          res.status(200).json("bill uploaded");
        })
        .catch((err) => {
          console.error("MongoDB error:", err);
          res.status(400).json({ error: "bill upload failed", details: err });
        });
    }
  });
};

const getOrders = (req, res) => {
  const getOrders = "SELECT * FROM `orders`";
  db.query(getOrders, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json([data]);
    }
  });
};

const getSingleOrder = (req, res) => {
  const { id } = req.params;
  const getSingleOrder = "SELECT * FROM `orders` WHERE `p_id`=?";
  db.query(getSingleOrder, [id], (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      const updatedData = {
        ...data[0],
        o_items: JSON.parse(data[0].o_items),
      };
      res.status(200).json(updatedData);
    }
  });
};

const getSingleOrderImages = async (req, res) => {
  const { code, name } = req.body;
  try {
    const images = await productsModel.find(name);
    const bill = await ordersModel.find(code);
    if (images && bill) {
      res.status(200).json({ images, bill });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = (req, res) => {
  const { id } = req.params;
  const getSingleOrder = "DELETE FROM `orders` WHERE `p_id`=?";
  db.query(getSingleOrder, [id], async (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      const code = req.body.code;
      const deleteProduct = await ordersModel.deleteOne({code});
      if (deleteProduct) {
        res.status(200).json("Product deleted");
      } else {
        res.status(400).json("issue unsuccessful");
      }
    }
  });
};

const updateStatus = (req, res) => {
  const { id } = req.params;
  const updateStatus = "UPDATE `orders` SET `o_status`=? WHERE `p_id`=?";

  const values = [req.body.status, id];
  db.query(updateStatus, values, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

const getOrderByCode = (req,res)=>{
  const {code} = req.body;
  const getOrder = "SELECT * FROM `orders` WHERE `o_code`=?"
  const values = [
    code,
  ]
  db.query(getOrder, values, (err,data)=>{
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(data)
    }
  })
}

module.exports = {
  addOrder,
  getOrders,
  getSingleOrder,
  getSingleOrderImages,
  updateStatus,
  deleteOrder,
  getOrderByCode
};
