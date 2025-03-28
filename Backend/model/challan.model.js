import mongoose from "mongoose";

const productDetailSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  shadeNumber: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  details: [productDetailSchema],
});

const challanSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    date: { type: String, required: true },
    driverName: { type: String, required: true },
    challanNumber: { type: String, required: true },
    products: [productSchema],
    totalQuantity: { type: Number },
    totalRollQty: { type: Number, required: true },
    basicAmount: { type: Number, required: true },
    GSTNumber: { type: Number, required: true },
    reciverName: { type: String, required: true },
    totalWeight: { type: String, required: true },
    totalBags: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    totalAmount: { type: Number, required: true, default: 0 },
    tCSOrFARE: { type: Number, required: true },
    invoiceNumber: { type: Number, required: true },
    price1:{type: Number},
    price2:{type: Number },
    price3:{type: Number },
  },
  { timestamps: true }
);

challanSchema.pre("save", async function (next) {
  if (
    this.isModified("GSTNumber") ||
    this.isModified("tCSOrFARE") ||
    this.isModified("basicAmount")
  ) {
    this.totalAmount = this.basicAmount + this.tCSOrFARE + this.GSTNumber;
    next();
  } else {
    next();
  }
});

export const Challan = mongoose.model("Challan", challanSchema);
