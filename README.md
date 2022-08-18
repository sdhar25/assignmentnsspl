# Steps #
1. Clone 
2. npm install
3. Mongo db should be there
4. Run using nodemon src/index
5. In postman create new collection 
    a. set environment and environment variable {{url}} whose value is localhost:3000 
5. Q1 you have given a productId and Write a single MongoDB query to find the count of tagSpecial and 
    maximum value of rating, which have tagSpecial true and given productId is not included.
    Ex: Input = { productId: 1 };
    Result = { countTagSpecial: 1, maxRating: 3 }
    api GET - {{url}}/products
    body raw, json
    { 
        "productId": 1 
    }
6. .you have given a productId, tagging year and tagId, write a mongoDB query to update tagging of 
    given productId.
    Ex: Input = { productId: 2, year: 2006, tagId: 3652 };
    Result = {
    productId: 2,
    name: "bike",
    description: "here is some description",
    tagSpecial: false,
    rating: 4,
    tagging: [{ year: 2003, tagId: "22632" }, { year: 2007, tagId: "27632" }, { year: 2004, tagId: "25652" 
    }, { year: 2005, tagId: "25632" }, { year: 2009, tagId: "25632" }, { year: 2006, tagId: 3652 }],
    }

    api Patch - {{url}}/products
    body raw json
    { 
    "productId": 5, 
     "year": 2006, 
     "tagId": 3652 
    }

7. You have given a productId and tagging year, write a mongoDB query to remove tagging which is 
    greater than the given year.

    Ex: Input = { productId: 3, year: 2010 };
    Result = {
    productId: 3,
    Name: "Scooter",
    Description: "here is some description",
    TagSpecial: true,
    Rating: 3,
    Tagging: [{ year: 2006, tagId: "22632" }, { year: 2003, tagId: "27632" }, { year: 2004, tagId: "25652" 
    }, { year: 2010, tagId: "25632" }],
    }


    api Patch - {{url}}/products_tag
    body raw json
    { 
    "productId": 5, 
    "year": 2010 
    }


8. create product 
 api Post - {{url}}/products
 body raw json
 {
"productId":5,
"name": "Scooter1",
"description": "here is some description",
"tagSpecial": false,
"rating": 10,
"tagging": [
    { "year": 2006, "tagId": 22632 },
    { "year": 2012, "tagId": 28632 }, 
    { "year": 2003, "tagId": 27632 }, 
    { "year": 2004, "tagId": 25652 }, 
    { "year": 2013, "tagId": 25632 },
    { "year": 2010, "tagId": 25632 }
    ]
}