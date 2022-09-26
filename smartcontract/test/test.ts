import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Contract } from '@ethersproject/contracts'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import * as chai from 'chai'
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
import { keccak256 } from 'ethers/lib/utils'

function parseEther(amount: Number) {
  return ethers.utils.parseUnits(amount.toString(), 18)
}

describe('Vault', function () {
  let owner: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress,
    carol: SignerWithAddress

  let vault: Contract
  let token: Contract

  beforeEach(async () => {
    await ethers.provider.send('hardhat_reset', [])
    ;[owner, alice, bob, carol] = await ethers.getSigners()

    const Vault = await ethers.getContractFactory('Vault', owner)
    vault = await Vault.deploy()
    const Token = await ethers.getContractFactory('Crown', owner)
    token = await Token.deploy()
    await vault.setToken(token.address)
  })

  // Happy path
  it('Should deposit into the Vault', async () => {
    await token.transfer(alice.address, parseEther(1 * 10 ** 6))
    await token
      .connect(alice)
      .approve(vault.address, token.balanceOf(alice.address))
    await vault.connect(alice).deposit(parseEther(500 * 10 ** 3))
    expect(await token.balanceOf(vault.address)).equal(
      parseEther(500 * 10 ** 3)
    )
  })

  it('Should withdraw from the Vault', async () => {
    //grant withdrawer role to Bob
    let WITHDRAWER_ROLE = keccak256(Buffer.from('WITHDRAWER_ROLE')).toString()
    await vault.grantRole(WITHDRAWER_ROLE, bob.address)

    // setter vault function
    await vault.setWithdrawEnable(true)
    await vault.setMaxWithdrawAmount(parseEther(1 * 10 ** 6))

    // Alice -> deposit into vault
    await token.transfer(alice.address, parseEther(1 * 10 ** 6))
    await token
      .connect(alice)
      .approve(vault.address, token.balanceOf(alice.address))
    await vault.connect(alice).deposit(parseEther(500 * 10 ** 3))

    // Bob -> withdraw from vault
    await vault.connect(bob).withdraw(parseEther(300 * 10 ** 3), alice.address)

    expect(await token.balanceOf(vault.address)).equal(
      parseEther(200 * 10 ** 3)
    )
    expect(await token.balanceOf(alice.address)).equal(
      parseEther(800 * 10 ** 3)
    )
  })
})
