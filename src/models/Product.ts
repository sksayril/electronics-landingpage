import mongoose, { Schema, Model } from "mongoose";

export interface IProduct {
  name: string;
  model: string;
  category: "tvs" | "appliances" | "ac" | "monitors";
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  mrp: number;
  price: number;
  badge?: string;
  tab: "trending" | "new" | "bestseller";
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Product model number is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["tvs", "appliances", "ac", "monitors"],
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"],
    },
    rating: {
      type: Number,
      required: true,
      default: 5,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      required: true,
      default: 0,
    },
    features: {
      type: [String],
      default: [],
    },
    mrp: {
      type: Number,
      required: [true, "MRP is required"],
      min: 0,
    },
    price: {
      type: Number,
      required: [true, "Selling price is required"],
      min: 0,
    },
    badge: {
      type: String,
      trim: true,
    },
    tab: {
      type: String,
      required: [true, "Display tab is required"],
      enum: ["trending", "new", "bestseller"],
      default: "trending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent compiling model multiple times in Next.js development
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
