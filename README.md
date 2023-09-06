# mycart E-commerce API Documentation

## Base URL
- `http://localhost:8080`

## User Routes (Not authenticated)
| Route        | Method | Description               | Request Body                    |
|--------------|--------|---------------------------|---------------------------------|
| `/user/signup`    | POST   | User registration         | `{ Name, Email, mobile_no, address, password }` |
| `/user/login`     | POST   | User login                | `{ Email, password }` |

## Category Routes (Not authenticated)
| Route            | Method | Description          | Request Body       |
|------------------|--------|----------------------|--------------------|
| `/category/allcategory`   | GET    | Get all categories   | `{}`               |
| `/category/addcategory`   | POST   | Add a category       | `{ Name }`         |

## Product Routes (Authenticate)
| Route                   | Method | Description                   | Request Body                                                      |
|-------------------------|--------|-------------------------------|-------------------------------------------------------------------|
| `/product/allproduct`           | GET    | Get all products              | `{}`                                                              |
| `/product/getproductbyid/:id`   | GET    | Get product by ID             | `{}`                                                              |
| `/product/addproduct`           | POST   | Add a new product             | `{ title, price, description, image, brand, color, rating, availability, category }` |
| `/product/updateproduct/:id`    | PATCH  | Update a product by ID       | `{}`                                                              |
| `/product/deleteproduct/:id`    | DELETE | Delete a product by ID       | `{}`                                                              |

## Wishlist Routes (Authenticate)
| Route             | Method | Description             | Request Body            |
|-------------------|--------|-------------------------|-------------------------|
| `/wishlist/addtowish`      | POST   | Add to wishlist         | `{ productID, userID }` |
| `/wishlist/allwishlist`    | GET    | Get all wishlist items | `{}`                    |
| `/wishlist/deletewish/:id` | DELETE | Delete wishlist item    | `{}`                    |

## Cart Routes (Authenticate)
| Route            | Method | Description                | Request Body                   |
|------------------|--------|----------------------------|--------------------------------|
| `/cart/addtocart`     | POST   | Add to cart                 | `{ productid, userid, quantity, total_price }` |
| `/cart/allcart`       | GET    | Get all cart items          | `{}`                           |
| `/cart/update/:id`    | PATCH  | Update cart item quantity   | `{ quantity }`                 |
| `/cart/deletecart/:id`| DELETE | Delete cart item            | `{}`                           |
| `/cart/totalprice`    | GET    | Get total cart price        | `{}`                           |

## Order Routes (Authenticate)
| Route              | Method | Description             | Request Body |
|--------------------|--------|-------------------------|--------------|
| `/order/placeorder`      | POST   | Place a new order       | `{}`         |
| `/order/allorders`       | GET    | Get all orders          | `{}`         |
| `/order/product/:id`     | GET    | Get order by product ID | `{}`         |
| `/order/deleteorder/:id` | DELETE | Delete an order by ID   | `{}`         |
