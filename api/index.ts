import { supervisor } from './models/supervisor';
import { supervisorForm } from './models/supervisorForm';

const axios = require('axios')
const express = require('express')

const app = new express()
app.use(express.json()) 

app.use(function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// This is the compare function for supervisors to be sorted.
// The supervisors are sorted in alphabetical order, first by jurisdiction, then by last
// name, and finally by first name.
const compareSupervisor = (a: supervisor, b: supervisor) => {
    if (a.jurisdiction > b.jurisdiction) {
        return 1
    } 
    if (a.jurisdiction < b.jurisdiction) {
        return -1
    } 
    if (a.jurisdiction === b.jurisdiction) {
        if (a.lastName && b.lastName){
            const alname = a.lastName.toUpperCase()
            const blname = b.lastName.toUpperCase()
            if (alname > blname) {
                return 1
            }
            if (alname < blname) {
                return -1
            }
        }
        if (a.firstName && b.firstName) {
            const afname = a.firstName.toUpperCase()
            const bfname = b.firstName.toUpperCase()
            if (afname > bfname) {
                return 1
            }
            if (afname < bfname) {
                return -1
            }
        }
    }
    return 0 
}

// This function is used by GET /supervisor
// It will return the formatted and sorted clientSupervisorList from the loaded supervisors. 
const generateSupervisorList = (supervisors: supervisor[]): string[] => {
    const regex = /[^0-9]/g
    const supervisorList: supervisor[] = supervisors.filter( supervisor => (supervisor.jurisdiction.match(regex)) )
    return supervisorList.sort(compareSupervisor)
    .map( (spv: supervisor) => `${spv.jurisdiction} - ${spv.lastName}, ${spv.firstName}` )
}

// This function is used by POST /submit
// It will return whether the submitted form information is valid and a warning message if it is not valid.
// 'firstname', 'lastname', and 'supervisor' are required fields to validate.  
const validateSupervisor = (supervisorData: supervisorForm) => {
    const retInfo = {
        isValid: false,
        warningMessage: '',
    }
    if (!supervisorData.firstname) {
        retInfo.warningMessage = 'Please include a First Name before submitting.'
        return retInfo
    }
    if (!supervisorData.lastname) {
        retInfo.warningMessage = 'Please include a Last Name before submitting.'
        return retInfo
    }
    if (!supervisorData.supervisor) {
        retInfo.warningMessage = 'Please include a Supervisor before submitting.'
        return retInfo
    }
    retInfo.isValid = true
    return retInfo
}

// Retrieve supervisor data from the endpoint and use it to generate a supervisor list for client Select.
// Respond with an array of strings in sorted format '<jurisdiction> - <lastName>, <firstName>”
app.get('/supervisors', async (req: any, res: any) => {
    try {
        const clientSupervisorList = await axios.get('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers')
            .then((res: any) => generateSupervisorList(res.data))
            .catch((err: any) => console.log(err));
        res.json(clientSupervisorList)
    }
    catch(e: any) {
        res.json({
            'error': e.message
        })
    }
})

// Recieve the supervisor form data and validate that all required fields are included. 
// Respond with a warning message if validation failed, and an empty message if form passes validation. 
app.post('/submit', async (req: any, res: any) => {
    try {
        const retInfo = validateSupervisor(req.body)
        if (retInfo.isValid) {
            res.json(retInfo.warningMessage)
            console.log(req.body)
        } 
        if (!retInfo.isValid) {
            res.json(retInfo.warningMessage)
        }
    } catch(e: any) {
        res.json({
            'error': e.message
        })
    }
})

app.listen(8080, () => {
    console.log('Listening on 8080. Ctrl+c to stop this server.')
})