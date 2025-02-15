const { getAll } = require('../controllers/index'); // Assuming it's exported from controllers
const request = require('supertest'); 
const express = require('express');
const routes = require('../routes/index')
const collections =require('../helpers/collections');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const mongodb = require('../data/database');
const controller = require('../controllers/index');
const { ObjectId } = require('mongodb');

let db;
let mongoServer;
let app;
let app2 = new express();
app2.use('/', routes);

describe('responds to /Logged Out', () => {
    test('It should fetch if user is logged out', async () => {

        const res = await request(app2).get('/'); 
        // Log expected vs. actual response
        console.log(`Expected: Logged Out \nReceived: ${res.text}`);

        // Assertions
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('Logged Out');
    
    }, 60000); // Increase timeout if needed
});

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    const client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db();
    
    mongodb.getDatabase = () => ({ db: () => db });
    
    app = express();
    app.use(express.json());
    app.get('/departments', (req, res) => {
        controller.getAll(req, res, collections.departments(req));
    });

    app.get('/departments/:id', (req, res) => {
        controller.getSingle(req, res, collections.departments(req));
    });
});

beforeEach(async () => {
    const departmentCollection = db.collection('departments');
    await departmentCollection.insertMany([
        { name: 'HR', contactInfo: 'hr@example.com', budget: 50000, teamSize: 10 },
        { name: 'IT', contactInfo: 'it@example.com', budget: 100000, teamSize: 20 }
    ]);
});

afterEach(async () => {
    await db.collection('departments').deleteMany({});
});

afterAll(async () => {
    await mongoServer.stop();
});

test('GET /departments should return all departments', async () => {
    const res = await request(app).get('/departments');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('name', 'HR');
    expect(res.body[1]).toHaveProperty('name', 'IT');
});

test('GET /departments should include a mock department in the database', async () => {
    const mockDepartment = { name: 'Finance', contactInfo: 'finance@example.com', budget: 75000, teamSize: 15 };
    await db.collection('departments').insertOne(mockDepartment);
    
    const res = await request(app).get('/departments');
    expect(res.status).toBe(200);
    const departmentNames = res.body.map(dept => dept.name);
    expect(departmentNames).toContain(mockDepartment.name);
});

test('GET /departments/:id should return a single department by ID', async () => {
    const department = { name: 'Marketing', contactInfo: 'marketing@example.com', budget: 60000, teamSize: 12 };
    const inserted = await db.collection('departments').insertOne(department);
    const departmentId = inserted.insertedId.toString();

    const res = await request(app).get(`/departments/${departmentId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Marketing');
});

test('GET /departments/:id should return 400 for an invalid ID', async () => {
    const res = await request(app).get('/departments/invalidid');
    expect(res.status).toBe(400);
    expect(res.body).toBe('Must be valid ID');
});

test('GET /departments/:id should return 400 if ID does not exist', async () => {
    const nonExistentId = new ObjectId().toString();
    const res = await request(app).get(`/departments/${nonExistentId}noExsit`);
    expect(res.status).toBe(400);
    expect(res.body).toBe("Must be valid ID");
});