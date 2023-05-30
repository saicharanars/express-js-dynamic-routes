const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const db = require("../util/database");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products(title,imageUrl,description,price) VALUES(?,?,?,?)",
      [this.title, this.imageUrl, this.description, this.price]
    );
  }
  static deleteById(id) {
    return db.execute("DELETE FROM products WHERE id = ?", [id]);
  }

  static fetchAll(cb) {
    return db.execute("SELECT * FROM products");
  }
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      console.log(product);
      cb(product);
    });
  }
};
