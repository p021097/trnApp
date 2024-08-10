import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  sold: { type: Boolean },
  dateOfSale: { type: String },
});

const transactionModel = mongoose.models.trn || mongoose.model('trn', transactionSchema)

export default transactionModel