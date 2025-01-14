import { ConnectButton } from '@rainbow-me/rainbowkit';
import './App.css';
import EtherWallet from './artifacts/contracts/EtherWallet.sol/EtherWallet.json'
import { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContract, useContractRead, useSigner } from 'wagmi';
import { ethers } from 'ethers';

function App() {
  const contractAddress = '0x66702223D7582cD0141CB5A5aA5e68D1EeCcceef';

  //EtherWallet Smart Contract handling
  const [scBalance, setScBalnce] = useState(0)
  const [ethToUseForDeposit, setEthToUseForDeposit] = useState(0)

  const { data: contractBalance} = useContractRead({
    addressOrName: contractAddress,
    contractInterface: EtherWallet.abi,
    functionName: 'balanceOf',
    watch: true
  })

  useEffect(() => {
    if(contractBalance) {
      let temp = contractBalance / 10**18
      setScBalnce(temp)
    }
  }, [contractBalance])

  const {data: signer} = useSigner()
  const depositETH = useContract({
    addressOrName: contractAddress,
    contractInterface: EtherWallet.abi,
    signerOrProvider: signer
  })
  const depositToEtherWalletContract = async() => {
    await depositETH.deposit({
      value: ethers.utils.parseEther(ethToUseForDeposit)
    })
  }


  return (
    <div className='container flex flex-col items-center mt-10'>
      <div className='flex-mb-6'>
        <ConnectButton />
      </div>
      <h3 className='text=5x1 font-bold mb-20'>
        {"Deposit to Ether Wallet Smart Contract"}
      </h3>

      <Form>
        <Form.Group className='mb-3' controlID='numberInEth'>
          <FormControl type='text' placeholder='Amount in ETH'
            onChange={(e) => setEthToUseForDeposit(e.target.value)} 
          />
        </Form.Group>
        <Button variant='primary' 
          onClick={depositToEtherWalletContract} 
        >
          Deposit to Ether Wallet Smart Contract
        </Button>
      </Form>

      <div>Ether Wallet Smart Contract Address: {contractAddress}</div>
      <div>Ether Wallet Smart Contract Balance: {scBalance}</div>
    </div>
  );
}

export default App;
