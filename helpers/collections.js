const departments = (req, fullReq = true) => {
    let item;
    fullReq === true ? item = req.body : item = req;
    return {
        name: 'departments',
        rules: {
            name: item.name,
            contactInfo: item.contactInfo,
            budget: item.budget,
            teamSize: item.teamSize
        }
    }
}

const employees = (req, fullReq = true) => {
    let item;
    fullReq === true ? item = req.body : item = req;
    return {
        name: 'employees',
        rules: {
            firstName: item.firstName,
            lastName: item.lastName,
            badgeNumber: item.badgeNumber,
            department: item.department,
            shift: item.shift,
            location: item.location,
            status: item.status
        }
    }
}

const facilities = (req, fullReq = true) => {
    let item;
    fullReq === true ? item = req.body : item = req;
    return {
        name: 'facilities',
        rules: {
            facilityLocation: item.facilityLocation,
            facilityName: item.facilityName,
            facilityStatus: item.facilityStatus
        }
    }
}

const locations = (req, fullReq = true) => {
    let item;
    fullReq === true ? item = req.body : item = req;
    return {
        name: 'locations',
        rules: {
            locationName: item.locationName,
            adds: item.adds,
            hours: item.hours
        }
    }
}

const managers = (req, fullReq = true) => {
    let item;
    fullReq === true ? item = req.body : item = req;
    return {
        name: 'managers',
        rules: {
            firstName: item.firstName,
            lastName: item.lastName,
            badgeNumber: item.badgeNumber,
            email: item.email
        }
    }
}

// this one is for copy paste
// do not include in exports
const collectionDraft = (req, fullReq = true) => {
    let item;
    fullReq === true ? item = req.body : item = req;
    return {
        name: '',
        rules: {
           use: item
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