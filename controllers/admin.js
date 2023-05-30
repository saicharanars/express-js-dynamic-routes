const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};
exports.postEditProduct = (req, res, next) => {
  console.log("Tried to edit!");
  const prodID = req.body.productID;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log(prodID);
  const product = new Product(prodID, title, imageUrl, description, price);
  console.log(product);
  product.save();
  res.redirect("/admin/products");
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  console.log(req.body);
  Product.deleteById(prodId)
    .then((product) => {
      console.log(product);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([row, fieldData]) => {
      res.render("admin/products", {
        prods: row,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
