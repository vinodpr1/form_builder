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



const FormModel = mongoose.model('Form', formSchema);
export default FormModel;
































// formSchema.pre('save', function(next) {
//   this.updated_at = new Date();
//   next();
// });

















































// form structure 

// form: {
//   title: "Title of the form",
//   fields: [
//     name: "Field name",
//     label: "Field Label",
//     options: { type: ["Op1", "op2", "op3"]},
//     required: "true/false",
//     html_element: "text",
//     placeholder: "Field Placeholder",
//     type: "text"
//   ]
// },
// userid: "9483774yuhjdoof8ydui",
// created_at: "2025-04-12T13:12:27.620+00:00",
// updated_at: "2025-04-12T13:12:27.620+00:00"