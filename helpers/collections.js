const departments = (req, res) => {
    return {
        name: 'departments',
        rules: {
            name: req.body.name,
            contactInfo: req.body.contactInfo,
            budget: req.body.budget,
            teamSize: req.body.teamSize
        }
    }
}

const employees = (req, res) => {
    return {
        name: 'employees',
        rules: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            badgeNumber: req.body.badgeNumber,
            department: req.body.department,
            shift: req.body.shift,
            location: req.body.location,
            status: req.body.status
        }
    }
}

const facilities = (req, res) => {
    return {
        name: 'facilities',
        rules: {
            facilityLocation: req.body.facilityLocation,
            facilityName: req.body.facilityName,
            facilityStatus: req.body.facilityStatus
        }
    }
}

const locations = (req, res) => {
    return {
        name: 'locations',
        rules: {
            locationName: req.body.locationName,
            address: req.body.address,
            hours: req.body.hours
        }
    }
}

const managers = (req, res) => {
    return {
        name: 'managers',
        rules: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            badgeNumber: req.body.badgeNumber,
            email: req.body.email
        }
    }
}

// this one is for copy paste
// do not include in exports
const collectionDraft = (req, res) => {
    return {
        name: '',
        rules: {
        
        }
    }
}

module.exports = {
    departments,
    employees,
    facilities,
    locations,
    managers,
}