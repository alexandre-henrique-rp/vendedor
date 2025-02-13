import { DataTypes } from "sequelize";
import db from "../database.js";

const Product = db.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    timestamps: true, // Habilita createdAt e updatedAt automaticamente
    underscored: true // Usa snake_case para nomes de colunas
  }
);
Product.sync();
export default Product;