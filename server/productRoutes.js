const router = require('express').Router();

router.get('/products', );
router.get('/products/:product_id', );
router.get('/products/:product_id/styles');
router.get('/products/:product_id/related');

router.route('/cart')
  .get() //200 ok
  .post(); //201 created sku_id: qty

module.exports =  router;