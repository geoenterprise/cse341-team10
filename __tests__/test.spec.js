// Import required modules and dependencies
const { getAll } = require('../controllers/index'); // Controller function to get all records
const request = require('supertest'); // Supertest for testing HTTP requests
const express = require('express'); // Express framework for building the app
const routes = require('../routes/index') // App routes
const collections = require('../helpers/collections'); // Helper functions for collections
const { MongoMemoryServer } = require('mongodb-memory-server'); // In-memory MongoDB server for testing
const { MongoClient } = require('mongodb'); // MongoDB client to interact with the database
const mongodb = require('../data/database'); // MongoDB database setup
const controller = require('../controllers/index'); // Controller methods
const { ObjectId } = require('mongodb'); // ObjectId from MongoDB for unique identifiers

let db; // Database variable for the test
let mongoServer; // MongoDB server instance for in-memory database
let app; // Express app instance for testing
let app2 = new express(); // Another express instance for different routing

// Middleware setup for the test app
app2.use('/', routes);

describe('responds to /Logged Out', () => {
    // Test for checking if user is logged out when accessing root
    test('It should fetch if user is logged out', async () => {
        const res = await request(app2).get('/'); // Send GET request to the root URL
        
        // Log expected vs. actual response for debugging
        console.log(`Expected: Logged Out \nReceived: ${res.text}`);

        // Assertions to check if the response matches the expected result
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('Logged Out');
    
    }, 60000); // Increase timeout for slow tests

});

// Setup before all tests
beforeAll(async () => {
    // Initialize in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri(); // Get the MongoDB URI
    const client = new MongoClient(mongoUri); // Connect to the in-memory MongoDB
    await client.connect();
    db = client.db(); // Assign the in-memory database

    // Mock the MongoDB database method in the mongodb module
    mongodb.getDatabase = () => ({ db: () => db });

    // Initialize express app and define routes
    app = express();
    app.use(express.json());
    app.get('/departments', (req, res) => {
        // Use controller to fetch all departments
        controller.getAll(req, res, collections.departments(req));
    });

    // Route for fetching a single department by ID
    app.get('/departments/:id', (req, res) => {
        controller.getSingle(req, res, collections.departments(req));
    });
});

// Setup before each test (to insert mock data)
beforeEach(async () => {
    const departmentCollection = db.collection('departments');
    // Insert mock departments into the database before each test
    await departmentCollection.insertMany([
        { name: 'HR', contactInfo: 'hr@example.com', budget: 50000, teamSize: 10 },
        { name: 'IT', contactInfo: 'it@example.com', budget: 100000, teamSize: 20 }
    ]);
});

// Clean up after each test (delete data inserted)
afterEach(async () => {
    // Delete all departments after each test to keep tests isolated
    await db.collection('departments').deleteMany({});
});

// Clean up after all tests (stop in-memory MongoDB server)
afterAll(async () => {
    await mongoServer.stop();
});

// Test for fetching all departments
test('GET /departments should return all departments', async () => {
    const res = await request(app).get('/departments'); // Send GET request to fetch all departments
    expect(res.status).toBe(200); // Assert that the status code is 200 (OK)
    expect(res.body.length).toBe(2); // Assert that there are 2 departments in the response
    expect(res.body[0]).toHaveProperty('name', 'HR'); // Assert that the first department is HR
    expect(res.body[1]).toHaveProperty('name', 'IT'); // Assert that the second department is IT
});

// Test for adding a new department and verifying its inclusion
test('GET /departments should include a mock department in the database', async () => {
    const mockDepartment = { name: 'Finance', contactInfo: 'finance@example.com', budget: 75000, teamSize: 15 };
    await db.collection('departments').insertOne(mockDepartment); // Insert mock department into DB
    
    const res = await request(app).get('/departments'); // Fetch all departments again
    expect(res.status).toBe(200); // Check if status is OK
    const departmentNames = res.body.map(dept => dept.name); // Get the department names from the response
    expect(departmentNames).toContain(mockDepartment.name); // Assert that the mock department name is in the response
});

// Test for fetching a department by its ID
test('GET /departments/:id should return a single department by ID', async () => {
    const department = { name: 'Marketing', contactInfo: 'marketing@example.com', budget: 60000, teamSize: 12 };
    const inserted = await db.collection('departments').insertOne(department); // Insert a department into DB
    const departmentId = inserted.insertedId.toString(); // Get the inserted department's ID

    const res = await request(app).get(`/departments/${departmentId}`); // Send GET request to fetch by ID
    expect(res.status).toBe(200); // Assert that the status is 200
    expect(res.body).toHaveProperty('name', 'Marketing'); // Assert that the returned department is 'Marketing'
});

// Test for invalid ID format
test('GET /departments/:id should return 400 for an invalid ID', async () => {
    const res = await request(app).get('/departments/invalidid'); // Send GET request with invalid ID
    expect(res.status).toBe(400); // Assert that the response status is 400 (Bad Request)
    expect(res.body).toBe('Must be valid ID'); // Assert that the error message matches
});

// Test for non-existent department ID
test('GET /departments/:id should return 400 if ID does not exist', async () => {
    const nonExistentId = new ObjectId().toString(); // Create a non-existent ID
    const res = await request(app).get(`/departments/${nonExistentId}noExsit`); // Send request with non-existent ID
    expect(res.status).toBe(400); // Assert that the response status is 400 (Bad Request)
    expect(res.body).toBe("Must be valid ID"); // Assert that the error message matches
});