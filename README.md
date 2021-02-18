# Shopping Cart

We need to create a solution for an online shopping cart.

The rules and requirements are described in the sections below.

![Wireframe](https://cdn.discordapp.com/attachments/649961050287898655/653636464080453632/shopping-cart-challenge.jpg)

### Available Products

We should be able to list the products that are available. The quantity of each product should be updated as the user adds units to the shopping cart. Also, we expect that a product becomes unavailable if its out of stock or all of its units were added to the shopping cart.

Examples:

- Banana, price: $10 per kg, available: 10
- Apple, price: $20 per kg, available: 15
- Orange, price: $30 per kg, available: 8
- Mango, price: $15 per kg, available: 20

### Shipping rules

All shipping calculations are made over the subtotal WITHOUT the shipping costs and WITHOUT any discounts.

- For purchases above R$400.00 the shipping is free!
- For purchases below or equal 10kg the shipping price is: $30.
- Each 5kg above 10kg will add $7 to the shipping price.

### The system should support these kinds of vouchers

- Percentual voucher: vouchers that reduce an amount in percentage of the cost on subtotal.
- Fixed voucher: vouchers with fixed amounts that should reduce over the TOTAL.
- Free Shipping: make the shipping price become 0 when applied, and should have a minimum subtotal requirement

Examples:

- #30OFF: percentual voucher of 30%
- #100DOLLARS: fixed voucher of $100.00
- #SHIPIT: free shipping voucher with minimum value of $300.50

### BACK-END

Use the API online at https://shielded-wildwood-82973.herokuapp.com/.

Here are the available endpoints:

#### https://shielded-wildwood-82973.herokuapp.com/products.json

```json
{
  "products": [
    { "id": 1, "name": "Banana", "price": 10.0, "available": 10 },
    { "id": 2, "name": "Apple", "price": 20.0, "available": 15 },
    { "id": 3, "name": "Orange", "price": 30.0, "available": 8 },
    { "id": 4, "name": "Mango", "price": 15.0, "available": 20 }
  ]
}
```

#### https://shielded-wildwood-82973.herokuapp.com/vouchers.json

```json
{
  "vouchers": [
    { "id": 1, "code": "#30OFF", "type": "percentual", "amount": 30.0 },
    { "id": 2, "code": "#100DOLLARS", "type": "fixed", "amount": 100.0 },
    {
      "id": 3,
      "code": "#SHIPIT",
      "type": "shipping",
      "amount": 0,
      "minValue": 300.5
    }
  ]
}
```

### FRONT-END

Try to perform all calculations in real time without any server request, except by the products and vouchers.

Take care of validations and build a facelit interface if you can. Please use the wireframe as a guide.

_PS: The submit/checkout button doesn't need to submit anything. You also can just show a flash message of successful sent._

### Requirements

1. You must use React.JS, Vue.JS or Angular.JS, no other frameworks are accepted
1. You must manage your application state in a maintanable way (_Hooks, Redux, VueX, NgRx or similar_)
1. You must create the CSS from scratch, you can not use a CSS Framework like Bootstrap, Foundation or similar ones (_You can use CSS in JS if you want, but it is not required_) (_We don't need you to be a designer but at least implement a decent UI_)
1. You must add unit specs
1. You must add acceptance specs (end-to-end)
1. You must handle API failures for all endpoints (_our API will eventually fail with HTTP 500 on purpose_)
1. You must version your work using Git and the repository must be private (_Do not make one commit with all of your work, we need to see your work in logical commits to follow your work logic_)
1. You must deliver the solution in 3 days

In any violation of those requirements you will be disclassified.

### Nice to have

1. Deploy your solution somewhere like Heroku or Netlify
