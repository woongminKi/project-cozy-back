const mongoose = require('mongoose');

const subTransactionHistorySchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  transactionDate: {
    type: Date,
    required: true,
  },
  currencyName: {
    type: String,
    required: true,
  },
  unitsTraded: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  isBuy: {
    type: Boolean,
    required: true,
  },
});

const subAssetSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  cash: {
    type: Number,
    required: true,
    default: 10000000,
  },
  coins: [
    {
      currencyName: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      averagePrice: {
        type: Number,
      },
    },
  ],
});

const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  uid: {
    type: String,
    unique: true,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  imgUrl: { type: String },
  transactionHistory: [subTransactionHistorySchema],
  asset: subAssetSchema,
  round: [
    {
      initialMoney: {
        type: Number,
      },
      finalMoney: {
        type: Number,
      },
      transactionResult: [],
    },
  ],
  create_dt: { type: Date, default: new Date() },
  access_token: { type: String },
  refresh_token: { type: String },
  access_token_expires_in: { type: String },
  refresh_token_expires_in: { type: String },
  login_yn: { type: String, default: 'Y' },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
