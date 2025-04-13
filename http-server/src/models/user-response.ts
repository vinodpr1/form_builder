import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FormModel',
    required: true,
  },

  responses: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  submittedAt: {
    type: Date,
    default: Date.now
  },
}, { 
  timestamps: true 
});

responseSchema.index({ formId: 1, submittedAt: -1 });

const UserResponse = mongoose.model('Response', responseSchema);
export default UserResponse;