'use strict'
const SmartContractDAO = require('../data/SmartContractDAO')
const helper = require('./helper')

exports.withdraw = async function (req, res) {
  try {
    // get the address, amount from request body
    let { address, amount } = req.body
    if (address === undefined || amount === undefined) {
      return res.status(400).json(helper.APIReturn(101, 'Bad request'))
    }
    console.log('call smart contract')

    // send token
    let dao = new SmartContractDAO()
    let txHash = await dao.withdraw(address, amount)
    console.log(txHash)
    return res.status(200).json(
      helper.APIReturn(
        0,
        {
          to: address,
          amount: amount,
          txHash: txHash,
        },
        'success'
      )
    )
  } catch (error) {
    console.log(error)
    return res.status(500).json(helper.APIReturn(101, 'something is wrong'))
  }
}
