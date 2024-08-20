const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeOffSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true }
}, {
  _id: false
});


module.exports = timeOffSchema;
