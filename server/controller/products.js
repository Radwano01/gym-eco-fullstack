const {db} = require("../database/mysql");
const productsModel = require("../models/products");

const addProduct = async (req, res) => {
  const addProductQuery =
    "INSERT INTO `products` (`p_name`, `p_price`, `p_category`, `p_sizes`, `p_colors`, `p_arms`, p_code) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.name,
    req.body.price,
    req.body.category,
    JSON.stringify(req.body.sizes),
    JSON.stringify(req.body.colors),
    JSON.stringify(req.body.arms),
    req.body.code,
  ];

  try {
    db.query(addProductQuery, values, async(err, data) => {
      if (err) {
        return res.status(400).json(err);
      }
      const {name, imageone, imagetwo, code} = req.body;
      await productsModel
        .create({name, imageone, imagetwo, code})
        .then(() => {
          res.status(200).json({ message: 'Images added successfully' });
        })
        .catch((err) => {
          console.log("Error uploading image:", err);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getProduct = (req, res) => {
  const getProducts = "SELECT * FROM `products`";

  db.query(getProducts, async(err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      const promises = data.map(async (product) => {
        const productCode = product.p_code;
        const images = await productsModel.find({ code: productCode });

        if (images && images.length > 0) {
          const imageOne = images[0].imageone[0];

          return {
            p_id: product.p_id,
            p_name: product.p_name,
            p_price: product.p_price,
            imageone: imageOne,
            p_category: product.p_category,
            p_code: product.p_code
          };
        } else {
          return null;
        }
      });
      const productData = await Promise.all(promises);
      res.status(200).json(productData);
    }
  });
};



const getSingleProduct = (req, res) => {
  const { id } = req.params;
  const getProduct = "SELECT * FROM `products` WHERE p_id = ?";

  db.query(getProduct,[id], async(err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if(data.length > 0){
        const codeOfProduct = data[0].p_code
        const images = await productsModel.findOne({code:codeOfProduct})
        const updatedData = {
          ...data[0],
          imageone: images?.imageone[0],
          imagetwo: images?.imagetwo[0],
        }
        res.status(200).json([updatedData])
      }
    }
  });
};

const editProduct = (req, res) => {
  const { id } = req.params;
  const editProducts =
    "UPDATE `products` SET `p_name`=?, `p_price`=?, `p_category`=?, `p_sizes`=?, `p_colors`=?, `p_arms`=? WHERE `p_id`=?";

  const values = [
    req.body.name,
    req.body.price,
    req.body.category,
    JSON.stringify(req.body.sizes),
    JSON.stringify(req.body.colors),
    JSON.stringify(req.body.arms),
    id,
  ];

  db.query(editProducts, values, async(err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      const productName = req.body.name;
      const imageone = req.body.imageone;
      const imagetwo = req.body.imagetwo;
      const changeImages = await productsModel.findOneAndUpdate({name:productName}, {imageone:imageone, imagetwo:imagetwo})
      if(!changeImages){
        res.status(200).json("images change failed")
      }else{
        res.status(200).json("images updated")
      }
    }
  });
};

const deleteProduct = (req, res) => {
  const {id} = req.params;
  const {code} = req.body;
  const values = [
    id
  ]
  const deleteProduct = "DELETE FROM `products` WHERE `p_id`=?";
  db.query(deleteProduct, values, async(err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      try{
        const deleteImages = await productsModel.deleteOne({code})
        if(deleteImages){
          res.status(200).json("Product deleted")
        }else{
          res.status(400).json("issue unsuccessful")
        }
      }catch(err){
        console.error("Error in MySQL deleteProduct try-catch:", err);
        res.status(500).json("Internal server error in MySQL deleteProduct")
      }
    }
  });
};

module.exports = {
  addProduct,
  getProduct,
  getSingleProduct,
  editProduct,
  deleteProduct,
};
