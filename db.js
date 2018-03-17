const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'example-webapp';

class MongoDatabase {
  constructor() {
    this.db = null;
    this.client = null;

    this.connect();
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(url);
      console.log('db connected!');

      this.db = this.client.db(dbName);
    } catch (err) {
      console.log(err.stack);
    }
  }

  async post(item) {
    let r;
    try {
      r = await this.db.collection('data').insertOne(item);
      assert.equal(1, r.result.ok);
    } catch (err) {
      r = err;
      console.log(err.stack);
    }
    return r;
  }

  async getAll() {
    let r;
    try {
      r = await this.db.collection('data').find({}).toArray();
    } catch (err) {
      r = err;
      console.log(err.stack);
    }
    return r;
  }

  async drop() {
    let r;
    try {
      r = await this.db.collection('data').deleteMany({});
      assert.equal(1, r.result.ok);
    } catch (err) {
      r = err;
      console.log(err.stack);
    }

    return r;
  }
}

module.exports = new MongoDatabase;
