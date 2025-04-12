import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: Date,
        required: true
    },
    CGPA: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Internship', 'FTE', 'Both'],
        default: 'Internship'
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    eligibility: {
        type: [String],
        default: []
    },
    batch: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});


const News = mongoose.model('News', newsSchema);

export default News;