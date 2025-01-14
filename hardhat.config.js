require("@nomicfoundation/hardhat-toolbox");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    const balance = await account.getBalance()
    console.log(account.address, ': ', balance);
  }
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);

    console.log(ethers.formatEther(balance), "ETH");
});

const PRIVATE_KEY = '7c4638d427766a431b28fa3877386c7287ac6402a12ece341e141c5ffb92420f'
const ALCHEMY_KEY = 'iNCPMT_1qim4yc6JMPGm1uiK4cqUgWp-'

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: './contracts',
    artifacts: './src/artifacts'
  },
  defaultNetwork: 'hardhat',
  networks:{
    hardhat:{
      chainId: 1337
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/iNCPMT_1qim4yc6JMPGm1uiK4cqUgWp-',
      accounts: [PRIVATE_KEY]
    }
  }
};
