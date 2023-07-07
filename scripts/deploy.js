
const hre = require("hardhat");

async function main() {

  const NFTMarketplace = await hre.ethers.deployContract("NFTMarketplace");

  await NFTMarketplace.waitForDeployment();

  console.log(
    `deployed contract Address ${NFTMarketplace.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
