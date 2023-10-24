import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    youtube: String,
    website: String,
    book: [{
        title: { type:String, required:true},
        author: String,
        page_start: { type: Number, min: 0},
        page_end: Number
    }],
    concept: { type: mongoose.Schema.Types.ObjectId, ref: 'Concept', required: true}
});

export default mongoose.model('Note', NoteSchema);