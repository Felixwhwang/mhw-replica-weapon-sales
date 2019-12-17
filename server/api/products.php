<?php
if ($request['method'] === 'GET') {
  $link = get_db_link();
  $id = intval($request['query']['productId']);

  if(empty($request['query'])) {
    $data = get_products($link);
  } else {
    $data = get_product_by_id($link, $id);
  }

  $response['body'] = $data;
  send($response);
}

function get_product_by_id($link, $id){
  if (isset($id) && is_numeric($id) && $id !== 0) {
    $sql = 'SELECT * FROM products WHERE products.productId = ' . $id;
    $result = $link->query($sql);
    if ($result === null) {
      throw new ApiError('No such product instock', 404);
    } else {
      return mysqli_fetch_assoc($result);
    }
  } else {
    throw new ApiError('Something wrong with request query', 400);
  }
}

function get_products($link)
{
  $sql = 'SELECT productid, name, price, image, shortDescription FROM products';
  $result = $link->query($sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);
}
