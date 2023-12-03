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
})


describe("GET /items & get /items/:name", function () {
    test("get all items", async function () {
        const res = await request(app).get('/cart/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{
            "name": "popsicle",
            "price": 1.45
        }]);
    });

    test("get a specific item", async function () {
        const res = await request(app).get('/cart/items/popsicle');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "name": "popsicle",
            "price": 1.45
        });
    });
});


describe("post to /items", function () {
    test("post request to add a new item, should return added item", async function () {
        const res = await request(app).post('/cart/items').send({"name":"potato", "price": 1.50});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({"added": {"name":"potato", "price": 1.50}});
    });
});


describe("patch to /items", function () {
    test("patch request to update an item", async function () {
        const res = await request(app).patch('/cart/items/popsicle').send({"name":"popsicle", "price": 5.50});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({"updated": {"name":"popsicle", "price": 5.50}});
    });
});


describe("delete to /items", function () {
    test("delete request to delete an item", async function () {
        const res = await request(app).delete('/cart/items/popsicle');
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({"message": "deleted"});
    });
});



// describe("markov machine tests", function() {

//     let markov;
//     let content
//     beforeAll(function() {
//         markov = new MarkovMachine("this is a test this");
//         content = markov.makeText(10);
//     });

//     test("test class creation", function(){ 
//         expect(markov).toEqual(expect.any(MarkovMachine));
//     });

//     test("test chains creation", function(){ 
//         expect(markov.chains['this']).toEqual(['is']);
//     });

//     test("test makeText", function(){ 
//         expect(content).toEqual(expect.any(String));
//     });

// });