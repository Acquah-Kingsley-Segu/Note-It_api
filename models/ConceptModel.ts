import mongoose from "mongoose";

const ConceptSchema = new mongoose.Schema({
    name: { type:String, required:true},
    start: { type: Date, default: Date.now()},
    end: Date,
    reopen: { type: Date, default: Date.now()},
    description: String,
    topic: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    }
});

export default mongoose.model('Concept', ConceptSchema);