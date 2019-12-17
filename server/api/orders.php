<?php

$link = get_db_link();
$cartIdinSession = $_SESSION['cart_id'];

if( $request['method'] === 'POST' ) {

  if( $cartIdinSession ) {
    $name = $request['body']['name'];
    $creditCard = $request['body']['creditCard'];
    $shippingAddress = $request['body']['shippingAddress'];

    //check request validation
    $errorMessage = "";
    if(!$name) {
      $errorMessage .= 'empty name/';
    } else if(!$creditCard) {
      $errorMessage .= 'empty credit card/';
    } else if(!$shippingAddress) {
      $errorMessage .= 'empty shipping address/';
    }

    if(!$errorMessage) {
      $sqlInsertOrder =
        "INSERT INTO orders (cartId, name, creditCard, shippingAddress, createdAt)
         VALUES ('$cartIdinSession', '$name', '$creditCard', '$shippingAddress', CURRENT_TIMESTAMP)";
      $link->query($sqlInsertOrder);
      $orderId = $link->insert_id;
      unset($_SESSION['cart_id']);

      $sqlGetOrderInfo =
        "SELECT * FROM orders
         WHERE orders.orderId = $orderId";
      $orderObj = $link->query($sqlGetOrderInfo);
      $orderData = mysqli_fetch_assoc($orderObj);
    } else {
      throw new ApiError("$errorMessage wrong request from client", 400);
    }
  } else {
    throw new ApiError('An active shopping cart is required', 400);
  }

  $response['body'] = $orderData;
  send( $response );
}
