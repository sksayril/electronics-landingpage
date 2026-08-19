import mongoose, { Schema, Model } from "mongoose";

export interface IPartner {
  name: string;
  email: string;
  mobile: string;
  location: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PartnerSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Requirement description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Partner: Model<IPartner> = mongoose.models.Partner || mongoose.model<IPartner>("Partner", PartnerSchema);

export default Partner;
