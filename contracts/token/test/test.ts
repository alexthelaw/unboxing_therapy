import { expect } from "chai";
import { ethers } from "hardhat";

describe("Unboxing", function () {
  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("Unboxing");

    const instance = await ContractFactory.deploy();
    await instance.deployed();

    expect(await instance.name()).to.equal("Unboxing");
  });
});
