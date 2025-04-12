// import mongoose from 'mongoose';

// const fieldSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   label: { type: String, required: true },
//   options: { type: [String], default: [] },
//   required: { type: Boolean, required: true},
//   html_element: { type: Boolean },
//   placeholder: { type: String },
//   type: { type: String, required: true },
// });

// const formSchema = new mongoose.Schema({
//   form: {
//     title:{ type: String, default: "Title" },
//     fields: [fieldSchema]
//   },
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now }
// });

// const FormModel = mongoose.model('Form', formSchema);
// export default FormModel;


import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  options: { type: [String], default: undefined }, // Changed from [] to undefined
  required: { type: Boolean, default: false },
  html_element: { 
    type: String,  // Changed from Boolean to String
    required: true,
    enum: ['text', 'checkbox', 'email', 'number'] // Add all allowed types
  },
  placeholder: { type: String },
  type: { 
    type: String, 
    required: true,
    enum: ['text', 'boolean', 'number'] // Data types for validation
  }
}, { _id: false });

const formSchema = new mongoose.Schema({
  form: {
    title: { type: String, required: true }, // Made title required
    fields: [fieldSchema]
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Update timestamp before saving
formSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const FormModel = mongoose.model('Form', formSchema);
export default FormModel;