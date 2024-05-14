// // DbHelper.js

import dotenv from 'dotenv';
dotenv.config();

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
  dialectOptions: {
    connectTimeout: 90000,
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
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
    quantity: {
      type: DataTypes.INTEGER,
    },
    payment_id: {
      type: DataTypes.UUID,
    },
    address_id: {
      type: DataTypes.UUID,
    },
    shipping_fee: {
      type: DataTypes.DECIMAL(18, 2),
    },
    message: {
      type: DataTypes.STRING(255),
    },
    street_address: {
      type: DataTypes.STRING(255),
    },
    district: {
      type: DataTypes.STRING(255),
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
    status_detail: {
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
    avatar: {
      type: DataTypes.STRING(255),
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'product_gallery',
    timestamps: false,
  },
);
// tbl.form_factor
export const FormFactor = sequelize.define(
  'form_factor',
  {
    id: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    form_factor: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'form_factor',
    timestamps: false,
  },
);

// tbl.storage_interface
export const StorageInterface = sequelize.define(
  'storage_interface',
  {
    id: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    storage_interface: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'storage_interface',
    timestamps: false,
  },
);

// tbl.graphics_interface
export const GraphicsInterface = sequelize.define(
  'graphics_interface',
  {
    id: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    interface_type: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'graphics_interface',
    timestamps: false,
  },
);

// tbl.graphics_model
export const GraphicsModel = sequelize.define(
  'graphics_model',
  {
    id: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    graphics_model: {
      type: DataTypes.TEXT,
    },
    priority: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    graphics_chipset: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'graphics_model',
    timestamps: false,
  },
);

// tbl.case_specification
export const CaseSpecification = sequelize.define(
  'case_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      unique: true,
    },
    cabinet_type: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    side_panel_type: {
      type: DataTypes.TEXT,
    },
    internal_drive_size: {
      type: DataTypes.TEXT,
    },
    front_panel: {
      type: DataTypes.TEXT,
    },
    cpu_cooler_support_size: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    case_cooler_support_size: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'case_specification',
    timestamps: false,
  },
);

// tbl.graphics_specification
export const GpuSpecification = sequelize.define(
  'graphics_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      unique: true,
    },
    chipset: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    memory: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    max_power_consumption: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    base_clock_speed: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    length: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    cooler_type: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    interface: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'graphics_specification',
    timestamps: false,
  },
);

// tbl.ram_specification
export const RamSpecification = sequelize.define(
  'ram_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      unique: true,
    },
    memory: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    ram_type: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },

    cas_latency: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    dimm_type: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    voltage: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'ram_specification',
    timestamps: false,
  },
);

// tbl.storage_specification
export const StorageSpecification = sequelize.define(
  'storage_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      unique: true,
    },
    model: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    type: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },

    interface: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    form_factor: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    capacity: {
      type: DataTypes.NUMBER,
      typeAttributes: { JSONB: true },
    },
    voltage: {
      type: DataTypes.NUMBER,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'storage_specification',
    timestamps: false,
  },
);

// tbl.case_cooler_specification
export const CaseCoolerSpecification = sequelize.define(
  'case_cooler_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      unique: true,
    },
    model: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    airflow: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    fan_rpm: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    size: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    voltage: {
      type: DataTypes.NUMBER,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'case_cooler_specification',
    timestamps: false,
  },
);

// tbl.cooler_specification
export const CpuCoolerSpecification = sequelize.define(
  'cooler_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      unique: true,
    },
    model: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    cpu_cooler: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    fan_rpm: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    noise_level: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    fan_number: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    cpu_cooler_size: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    fan_cfm: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    voltage: {
      type: DataTypes.NUMBER,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'cooler_specification',
    timestamps: false,
  },
);

// tbl.power_supply_specification
export const PsuSpecification = sequelize.define(
  'power_supply_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      unique: true,
    },
    model: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    power: {
      type: DataTypes.NUMBER,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'power_supply_specification',
    timestamps: false,
  },
);

// tbl.case_support_form_factor
export const CaseSupportFormFactor = sequelize.define(
  'case_support_form_factor',
  {
    profile_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    case_id: {
      type: DataTypes.UUID,
    },
    form_factor: {
      type: DataTypes.NUMBER,
      typeAttributes: { JSONB: true },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'case_support_form_factor',
    timestamps: false,
  },
);

// tbl.proccessor_support_ram
export const ProcessorSupportRam = sequelize.define(
  'proccessor_support_ram',
  {
    profile_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    processor_id: {
      type: DataTypes.UUID,
    },
    ram_type: {
      type: DataTypes.NUMBER,
      typeAttributes: { JSONB: true },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'proccessor_support_ram',
    timestamps: false,
  },
);

// Define the build_purpose model
export const BuildPurpose = sequelize.define(
  'build_purpose',
  {
    purpose_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    purpose_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    cpu_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    motherboard_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    ram_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    storage_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    psu_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    gpu_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cpu_minimum: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cpu_maximum: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ram_minimum: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ram_maximum: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    storage_type: {
      type: DataTypes.INTEGER, // Assuming storage_type is an integer; adjust if it's different
      defaultValue: 0,
    },
    storage_capacity_minimum_required: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    graphics_minimum: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    graphics_maximum: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
  },
  {
    tableName: 'build_purpose',
    timestamps: false,
  },
);

// tbl.monitor_specification
export const MonitorSpecification = sequelize.define(
  'monitor_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      typeAttributes: { JSONB: true },
      unique: true,
    },
    model: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    screen_size: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    resolution: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    response_time: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    aspect_ratio: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },

    refresh_rate: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },

    panel_type: {
      type: DataTypes.TEXT,
      typeAttributes: { JSONB: true },
    },
    voltage: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'monitor_specification',
    timestamps: false,
  },
);

// tbl.proccessor_model
export const ProccessorModel = sequelize.define(
  'proccessor_model',
  {
    id: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    model: {
      type: DataTypes.TEXT,
    },
    priority: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    chipset: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    cores: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    threads: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    model_number: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'proccessor_model',
    timestamps: false,
  },
);

// tbl.processor_specification
export const ProcessorSpecification = sequelize.define(
  'processor_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
      type: DataTypes.UUID,
      unique: true,
    },
    model: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    micro_architecture: {
      type: DataTypes.TEXT,
    },
    clock_speed: {
      type: DataTypes.NUMBER,
    },
    boost_speed_max: {
      type: DataTypes.NUMBER,
    },
    cache: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    memory_support: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    chipset: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    power: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'processor_specification',
    timestamps: false,
  },
);

// tbl.motherboard_specification
export const MotherboardSpecification = sequelize.define(
  'motherboard_specification',
  {
    specification_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_id: {
      type: DataTypes.UUID,
      unique: true,
    },
    cpu_socket: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    usb_details: {
      type: DataTypes.TEXT,
    },
    audio: {
      type: DataTypes.TEXT,
    },
    memory_slots: {
      type: DataTypes.NUMBER,
      typeAttributes: { JSONB: true },
    },
    sata: {
      type: DataTypes.TEXT,
    },
    m2: {
      type: DataTypes.TEXT,
    },
    power_connectors: {
      type: DataTypes.TEXT,
    },
    wifi: {
      type: DataTypes.TEXT,
    },
    form_factor: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    storage_interface: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    gpu_interface: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    chipset: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    power: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
  },
  {
    tableName: 'motherboard_specification',
    timestamps: false,
  },
);

// tbl.motherboard_chipset
export const MotherboardChipset = sequelize.define(
  'motherboard_chipset',
  {
    id: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    chipset: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'motherboard_chipset',
    timestamps: false,
  },
);

// tbl.ram_model
export const RamModel = sequelize.define(
  'ram_model',
  {
    id: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    model: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'ram_model',
    timestamps: false,
  },
);

// tbl.motherboard_support_processor
export const MotherboardSupportProcessor = sequelize.define(
  'motherboard_support_processor',
  {
    profile_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    motherboard_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    support_proccessor_type: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'motherboard_support_processor',
    timestamps: false,
  },
);

// tbl.motherboard_support_ram
export const MotherboardSupportRam = sequelize.define(
  'motherboard_support_ram',
  {
    profile_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    motherboard_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    support_ram_type: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'motherboard_support_ram',
    timestamps: false,
  },
);

// tbl.ram_type
export const RamType = sequelize.define(
  'ram_type',
  {
    id: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    ram_type: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    data_rate: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    data_transfer_rate: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'ram_type',
    timestamps: false,
  },
);

// tbl.processor_socket
export const ProcessorSocket = sequelize.define(
  'processor_socket',
  {
    id: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
      primaryKey: true,
    },
    socket: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'processor_socket',
    timestamps: false,
  },
);
// tbl.processor_chipset
export const ProcessorChipset = sequelize.define(
  'processor_chipset',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    processor_socket: {
      type: DataTypes.INTEGER,
      typeAttributes: { JSONB: true },
    },
    processor_chipset: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'processor_chipset',
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
    address_id: {
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
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
