const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const address_schema= new Schema({
    line1: { type: String },
    city: { type: String ,required:true},
    state: { type: String },
    zipcode: { type: String,required:true }
});

const profile_schema = new Schema({
  emailid:{type:String,required:true,unique:true},
  address:[address_schema],
  phoneno: { type: Number ,required: true,unique:true},
  fathername:{type:String },
  heighestqual:{type: String}
});

let Profile = mongoose.model("profile", profile_schema);

module.exports = Profile;
