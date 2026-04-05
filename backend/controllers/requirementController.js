const Requirement = require('../models/Requirement');

const createRequirement = async (req, res) => {
    try {
        console.log("Call received in createRequirement.");
        const { name, eventType, startDate, endDate, location, venue, category, specificFields } = req.body;

        if (!name || !eventType || !startDate || !location || !category) {
            return res.status(400).json({ message: 'Please include all required fields' });
        }

        // Validate startDate is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(startDate) < today) {
            return res.status(400).json({ message: 'Start date cannot be in the past' });
        }

        // Validate endDate >= startDate
        if (endDate && new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({ message: 'End date cannot be earlier than start date' });
        }

        // Validate numeric fields inside specificFields
        if (specificFields) {
            if (specificFields.budget !== undefined) {
                const bud = Number(specificFields.budget);
                if (isNaN(bud) || bud <= 0) {
                    return res.status(400).json({ message: 'Budget must be a positive number' });
                }
                specificFields.budget = bud;
            }
            if (specificFields.performanceDuration !== undefined) {
                const dur = Number(specificFields.performanceDuration);
                if (isNaN(dur) || dur < 1) {
                    return res.status(400).json({ message: 'Performance Duration must be a number of at least 1 hour' });
                }
                specificFields.performanceDuration = dur;
            }
            if (specificFields.shiftHours !== undefined) {
                const sh = Number(specificFields.shiftHours);
                if (isNaN(sh) || sh < 1) {
                    return res.status(400).json({ message: 'Shift Hours must be a number of at least 1 hour' });
                }
                specificFields.shiftHours = sh;
            }
        }
        
        const requirement = await Requirement.create({
            name,
            eventType,
            startDate,
            endDate,
            location,
            venue,
            category,
            specificFields,
        });
        
        console.log("Created requirement...");
        res.status(201).json(requirement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

const getRequirements = async (req, res) => {
    try {
        const requirements = await Requirement.find({}).sort({ createdAt: -1 });
        res.status(200).json(requirements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

module.exports = {
    createRequirement,
    getRequirements
};
