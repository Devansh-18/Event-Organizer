const mongoose = require('mongoose');

const requirementSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add an event name'],
        },
        eventType: {
            type: String,
            required: [true, 'Please add an event type'],
        },
        startDate: {
            type: Date,
            required: [true, 'Please add a start date'],
        },
        endDate: {
            type: Date,
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
        venue: {
            type: String,
        },
        category: {
            type: String,
            required: [true, 'Please select a hiring category'],
            enum: ['Event Planner', 'Performer', 'Crew'],
        },
        specificFields: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true,
    }
);

const Requirement = mongoose.model('Requirement', requirementSchema);

module.exports = Requirement;
