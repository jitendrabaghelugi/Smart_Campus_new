const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    // This structure allows for any number of subjects
    academics: [
        {
            subjectName: {
                type: String,
                required: true // e.g., "Mathematics", "Physics"
            },
            attendance: {
                attended: { type: Number, default: 0 },
                total: { type: Number, default: 30 }
            },
            marks: {
                obtained: { type: Number, default: 0 },
                total: { type: Number, default: 100 }
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
