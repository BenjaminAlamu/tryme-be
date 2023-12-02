import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'in-progress', 'completed', 'deleted']
    }
  },
  { timestamps: true, versionKey: false }
);

export const Task = mongoose.model('Task', taskSchema);
