import {ethers} from "hardhat";

async function main() {
    const ContractFactory = await ethers.getContractFactory("Unboxing");

    const wallet = (await ethers.getSigners())[0];
    const wallet2 = (await ethers.getSigners())[1];

    const contract = await ContractFactory.deploy(wallet.address);
    await contract.deployed();

    console.log(`Contract deployed to ${contract.address}`);
    const tokenUris = Array.from({length: 100}, (_, i) => 'uri_' + String(i + 1))
    const probablities = Array.from({length: 100}, (_, i) => 10)
    console.log(tokenUris, probablities);
    await contract.safeMultiMint(
        tokenUris,
        probablities,
        wallet.address,
        {gasLimit: 10000000}
    );

    console.log('minted',
        await contract.balanceOf(wallet.address)
    );

    const test = await contract.tokenURI(77);
    console.log('zeroToken', test);

    const tokenCount = await contract._tokenIdCounter();
    console.log('tokenCount', tokenCount.toString());

    const sendResult = await contract.sendRandomToken(wallet2.address, {
        gasLimit: 10000000,
        value: ethers.utils.parseEther('20')
    });
    console.log('tokenId', sendResult.data);

    console.log(
        'sendRandomToken',
        await contract.balanceOf(wallet.address),
        await contract.balanceOf(wallet2.address)
    );

    for (let i = 0; i < 99; i++) {
        await contract.sendRandomToken(wallet2.address, {
            gasLimit: 10000000,
            value: ethers.utils.parseEther('20')
        });
        console.log(
            'sendRandomToken',
            i,
            await contract.balanceOf(wallet.address),
            await contract.balanceOf(wallet2.address)
        );
    }

    console.log('Done');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
