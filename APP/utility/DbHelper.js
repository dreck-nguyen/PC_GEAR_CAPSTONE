// // DbHelper.js

// import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// const { Pool } = pkg;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

console.log(
  '~~~~DB_HOST',
  DB_HOST,
  '~~~~DB_PORT',
  DB_PORT,
  '~~~~DB_DATABASE',
  DB_DATABASE,
  '~~~~DB_USER',
  DB_USER,
  '~~~~DB_PASSWORD',
  DB_PASSWORD,
);

// const pool = new Pool({
//   host: DB_HOST,
//   port: DB_PORT,
//   database: DB_DATABASE,
//   user: DB_USER,
//   password: DB_PASSWORD,
// });

// export { pool };

import { Sequelize, DataTypes } from 'sequelize';

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  sync: false,
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
// tbl.Category
const Category = sequelize.define(
  'Category',
  {
    category_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    parent_id: {
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    status: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'category',
    timestamps: false,
  },
);
// tbl.Order
const Order = sequelize.define(
  'Order',
  {
    order_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    status_id: {
      type: DataTypes.UUID,
    },
    total: {
      type: DataTypes.DECIMAL(18, 2),
    },
    payment_id: {
      type: DataTypes.UUID,
    },
    shipping_fee: {
      type: DataTypes.DECIMAL(18, 2),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'order',
    timestamps: false,
  },
);
// tbl.order_status
const OrderStatus = sequelize.define(
  'OrderStatus',
  {
    status_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    status_details: {
      type: DataTypes.STRING(255),
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'order_status',
    timestamps: false,
  },
);
// tbl.customer_configuration_profile
const CustomerConfigurationProfile = sequelize.define(
  'CustomerConfigurationProfile',
  {
    customer_configuration_profile_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'customer_configuration_profile',
    timestamps: false,
  },
);
// tbl.customer_configuration_profile_details
const CustomerConfigurationProfileDetails = sequelize.define(
  'CustomerConfigurationProfileDetails',
  {
    customer_configuration_profile_detail_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    customer_configuration_profile_id: {
      type: DataTypes.UUID,
    },
    product_category_id: {
      type: DataTypes.UUID,
    },
    product_id: {
      type: DataTypes.UUID,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(18, 2),
    },
  },
  {
    tableName: 'customer_configuration_profile_detail',
    timestamps: false,
  },
);
// tbl.review
const Review = sequelize.define(
  'Review',
  {
    review_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
      type: DataTypes.UUID,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING(255),
    },
    content: {
      type: DataTypes.TEXT,
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'review',
    timestamps: false,
  },
);
// tbl.product
const Product = sequelize.define(
  'Product',
  {
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    category_id: {
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.TEXT,
    },
    unit_price: {
      type: DataTypes.DECIMAL(18, 2),
    },
    discount: {
      type: DataTypes.DECIMAL(18, 2),
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    sold: {
      type: DataTypes.INTEGER,
    },
    product_brand_id: {
      type: DataTypes.UUID,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'product',
    timestamps: false,
  },
);
// tbl.product_brand
const ProductBrand = sequelize.define(
  'ProductBrand',
  {
    product_brand_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_brand_name: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'product_brand',
    timestamps: false,
  },
);
// tbl.product_specification
const ProductSpecification = sequelize.define(
  'ProductSpecification',
  {
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    technical_specification: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: 'product_specification',
    timestamps: false,
  },
);
// tbl.order_detail
const OrderDetail = sequelize.define(
  'OrderDetail',
  {
    order_detail_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    order_id: {
      type: DataTypes.UUID,
    },
    product_id: {
      type: DataTypes.UUID,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'order_detail',
    timestamps: false,
  },
);
// tbl.payment

const Payment = sequelize.define(
  'Payment',
  {
    payment_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    payment_method: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'payment',
    timestamps: false,
  },
);
// tbl.user

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING(255),
    },
    last_name: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
    },
    phone_number: {
      type: DataTypes.STRING(20),
    },
    role_id: {
      type: DataTypes.UUID,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'user',
    timestamps: false,
  },
);
// tbl.product_gallery
const ProductGallery = sequelize.define(
  'ProductGallery',
  {
    product_gallery_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
      type: DataTypes.UUID,
    },
    image: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'product_gallery',
    timestamps: false,
  },
);
// tbl.cart
const Cart = sequelize.define(
  'Cart',
  {
    cart_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    status: {
      type: DataTypes.STRING(20),
    },
  },
  {
    tableName: 'cart',
    timestamps: false,
  },
);
// tbl.cart_items
const CartItem = sequelize.define(
  'CartItem',
  {
    cart_item_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    cart_id: {
      type: DataTypes.UUID,
    },
    product_id: {
      type: DataTypes.UUID,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'cart_item',
    timestamps: false,
  },
);
// tbl.warehouse
const Warehouse = sequelize.define(
  'Warehouse',
  {
    warehouse_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
      type: DataTypes.UUID,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'warehouse',
    timestamps: false,
  },
);
// tbl.shipping_addresses
const ShippingAddress = sequelize.define(
  'ShippingAddress',
  {
    AddressID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    recipient_name: {
      type: DataTypes.STRING(255),
    },
    street_address: {
      type: DataTypes.STRING(255),
    },
    city: {
      type: DataTypes.STRING(255),
    },
    country: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: 'shipping_address',
    timestamps: false,
  },
);
// tbl.messages
const Message = sequelize.define(
  'Message',
  {
    message_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    sender_id: {
      type: DataTypes.UUID,
    },
    receiver_id: {
      type: DataTypes.UUID,
    },
    content: {
      type: DataTypes.TEXT,
    },
    create_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'message',
    timestamps: false,
  },
);
// tbl.user_role
const UserRole = sequelize.define(
  'UserRole',
  {
    role_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    role: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: 'user_role',
    timestamps: false,
  },
);

User.belongsTo(UserRole, { foreignKey: 'role_id', as: 'userRole' });
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });

Product.belongsTo(ProductBrand, { foreignKey: 'product_brand_id' });
ProductBrand.hasMany(Product, { foreignKey: 'product_brand_id' });

Product.hasMany(ProductGallery, { foreignKey: 'product_id' });
ProductGallery.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasOne(ProductSpecification, { foreignKey: 'product_id' });
ProductSpecification.belongsTo(Product, { foreignKey: 'product_id' });

Category.hasMany(Category, { foreignKey: 'parent_id', as: 'Children' });
Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'Parent' });

export {
  sequelize as SequelizeInstance,
  Payment,
  User,
  ProductGallery,
  Cart,
  CartItem,
  Warehouse,
  ShippingAddress,
  Message,
  UserRole,
  Category,
  Order,
  OrderStatus,
  CustomerConfigurationProfile,
  CustomerConfigurationProfileDetails,
  Review,
  Product,
  ProductBrand,
  ProductSpecification,
  OrderDetail,
};
