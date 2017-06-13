class metropolitanSchema   = {
  name: String,
  company: String
};

// Export the Mongoose model
module.exports = mongoose.model('Invoice', metropolitanSchema);