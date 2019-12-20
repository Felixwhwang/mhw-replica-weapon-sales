<?php

$link = get_db_link();
$cartIdinSession = $_SESSION['cart_id'];

if($request['method'] === 'PUT') {
  $cartItemId = intval($request['body']['cartItemId']);
  $quantity = intval($request['body']['quantity']);
  $sqlUpdateCart =
  "UPDATE cartItems
   SET quantity = $quantity
   WHERE cartItemId = $cartItemId";
   $link->query($sqlUpdateCart);

  $sqlGetItem=
  "SELECT cartItemId, quantity
   FROM cartItems
   WHERE cartItemId = $cartItemId";
  $cartItem = mysqli_fetch_assoc($link->query($sqlGetItem));

   $response['body'] = $cartItem;
   send($response);
}

if ($request['method'] === 'DELETE') {
  $cartItemId = intval($request['body']['cartItemId']);
  $sqlDeleteItem =
  "DELETE FROM cartItems
   WHERE cartItemId = $cartItemId";
  $link->query($sqlDeleteItem);
  $response['body'] = $cartItemId;
  send($response);
}

if($request['method'] === 'GET') {
  if(isset($cartIdinSession)) {
    $sqlCartItems =
      "SELECT c.cartItemId, c.quantity, p.name, p.price, p.image, p.productId, p.shortDescription
        FROM products AS p
        JOIN cartItems AS c
          ON p.productId = c.productId
        WHERE c.cartId = $cartIdinSession";
    $result = mysqli_fetch_all($link->query($sqlCartItems), MYSQLI_ASSOC);
    $response['body'] = $result;
  } else {
    $response['body'] = [];
  }

  send($response);
}

if($request['method'] === 'POST') {
  $quantity = intval($request['body']['quantity']);
  $id = intval($request['body']['productId']);
  if (isset($id) && is_numeric($id) && $id !== 0) {
    $sqlGetPrice =
      "SELECT price FROM products WHERE products.productId = $id";
    $priceAssoc = mysqli_fetch_assoc( $link->query($sqlGetPrice) );

    if ($priceAssoc === null) {
      throw new ApiError('No such product instock', 404);
    } else {
      $price = $priceAssoc['price'];

      if(!isset($cartIdinSession)) {
        $sqlInsertTime =
          "INSERT INTO carts (createdAt) VALUES (CURRENT_TIMESTAMP)";
        $link->query($sqlInsertTime);
        $cartId = $link->insert_id;
        $_SESSION['cart_id'] = $cartId;
      } else {
        $cartId = $cartIdinSession;
      }

      $sqlCheckItem=
        "SELECT quantity, cartItemId
         FROM cartItems
         WHERE productId = $id AND cartId = $cartId";
      $item = mysqli_fetch_assoc($link->query($sqlCheckItem));
      if($item['quantity']) {
        $cartItemId = $item['cartItemId'];
        $quantity = $item['quantity'] + $quantity;
        $sqlUpdateQuantity=
        "UPDATE cartItems
         SET quantity = $quantity
         WHERE cartItemId = $cartItemId";
        $link->query($sqlUpdateQuantity);
      } else {
        $sqlInsertIntoCartItems =
        "INSERT INTO cartItems (cartId, productId, price, quantity)
         VALUES ($cartId, $id, $price, $quantity)";
        $link->query($sqlInsertIntoCartItems);
        $cartItemId = $link->insert_id;
      }

      $sqlGetCartItem =
        "SELECT c.cartItemId,
                c.cartId,
                p.productId,
                p.name,
                p.price,
                p.image,
                p.shortDescription,
                c.quantity
        FROM products AS p
        JOIN cartItems AS c
          ON p.productId = c.productId
        WHERE c.cartItemId = $cartItemId";
      $addedItem = mysqli_fetch_assoc($link->query($sqlGetCartItem));

      $response['body'] = $addedItem;
    }
  } else {
    throw new ApiError('Something wrong with request query', 400);
  }

  send($response);
}
