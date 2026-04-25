import mongoose, { Schema, Document } from 'mongoose';

export interface IKnowledge extends Document {
  title: string;
  definition: string;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}

const KnowledgeSchema: Schema = new Schema({
  title: { type: String, required: true },
  definition: { type: String, required: true },
  categories: { type: [String], required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Knowledge || mongoose.model<IKnowledge>('Knowledge', KnowledgeSchema);