
// when we call api here are some methods 

// GET >> to get data from database
// POST >> to create/send new data in database
// DELETE >> to delete/remove data from database
// PATCH/PUT >> to update data in database

// myFlipkart.com/api >> Base API Url
// myFlipkart.com/api/products >> to access data of products
// myFlipkart.com/api/products/123 >> to access any one product by its id
// myFlipkart.com/api/users >> to access data about users
// myFlipkart.com/api/users/5 >> to access data of any user by his id



// xhr.status >> 200 or 201 >> API success
// 200 while using GET method
// 201 while using POST method 

// 404 >> URL not found
// 403 >> Forbidden
// 503 >> service not available

// xhr.readyState (value from 0-4)
// 0 >> Unset >> Open method is not called yet
// 1 >> OPENED >> Open method is called
// 2 >> send method is called
// 3 >> Server is working on your request
// 4 >> DONE >> Operation is completed