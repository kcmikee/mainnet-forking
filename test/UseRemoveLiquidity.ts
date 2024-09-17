import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("UseLiquidity", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployRemoveLiquidity() {
    const [owner] = await hre.ethers.getSigners();
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const UseRemoveLiquidity = await hre.ethers.getContractFactory(
      "UseRemoveLiquidity"
    );
    const useRemoveLiquidity = await UseRemoveLiquidity.deploy(ROUTER_ADDRESS);

    return { useRemoveLiquidity, owner, ROUTER_ADDRESS };
  }

  describe("Deployment", function () {
    it("Should set the right router address", async function () {
      const { useRemoveLiquidity, ROUTER_ADDRESS } = await loadFixture(
        deployRemoveLiquidity
      );

      const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
      const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
      const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

      await helpers.impersonateAccount(TOKEN_HOLDER);
      const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

      const amountOut = ethers.parseUnits("20", 18);
      const amountInMax = ethers.parseUnits("1000", 6);

      const USDC_Contract = await ethers.getContractAt(
        "IERC20",
        USDC,
        impersonatedSigner
      );
      const DAI_Contract = await ethers.getContractAt(
        "IERC20",
        DAI,
        impersonatedSigner
      );
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

      // await DAI_Contract.approve(useSwap, amountInMax);

      const tx1 = await useRemoveLiquidity
        .connect(impersonatedSigner)
        .removeLiquidity(
          USDC,
          DAI,
          ethers.parseUnits("20", 18),
          amountOut,
          amountInMax,
          impersonatedSigner.address,
          deadline
        );

      tx1.wait();

      // expect(await useRemoveLiquidity.uniswapRouter()).to.equal(ROUTER_ADDRESS);
      // expect(await useRemoveLiquidity.swapCount()).to.equal(2);
    });
  });
});
