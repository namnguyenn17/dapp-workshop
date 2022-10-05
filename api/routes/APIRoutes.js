'use strict'
module.exports = function (app) {
  const APIcontroller = require('../controllers/APIcontroller')

  app.route('/api/withdraw').post(APIcontroller.withdraw)
}
