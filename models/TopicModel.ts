import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
    name: { type: String, required: true},
    start: { type: Date, default: Date.now()},
    end: { type: Date, required: true},
    reopen: { type: Date, default: Date.now()},
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
});

export default mongoose.model('Topic', TopicSchema);