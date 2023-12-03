process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let popsicle = {
    "name": "popsicle",
    "price": 1.45
};

beforeEach(function () {
    items.push(popsicle);
});

afterEach(function () {
    // make sure this *mutates*, not redefines, `cats`
    items.length = 0;
}