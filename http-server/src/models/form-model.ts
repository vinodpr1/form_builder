import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  options: { type: [String], default: undefined },
  required: { type: Boolean, default: false },
  html_element: { 
    type: String,
    required: true,
    enum: ['text', 'checkbox', 'email', 'number']
  },
  placeholder: { type: String },
  type: { 
    type: String, 
    required: true,
    enum: ['text', 'boolean', 'number'] 
  }
}, { _id: false });

const formSchema = new mongoose.Schema({
  form: {
    title: { type: String, required: true },
    fields: [fieldSchema]
  },
  userid: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

formSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const FormModel = mongoose.model('Form', formSchema);
export default FormModel;