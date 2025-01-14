import { ConnectButton } from '@rainbow-me/rainbowkit';
import './App.css';
import EtherWallet from './artifacts/contracts/EtherWallet.sol/EtherWallet.json'
import { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  //EtherWallet Smart Contract handling
  const [scBalance, setScBalnce] = useState(0)
  const [ethToUseForDeposit, setEthToUseForDeposit] = useState(0)

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
                  //onChange={(e) => setEthToUseForDeposit(e.target.value)} 
                  />
              </Form.Group>
              <Button variant='primary' 
              //onClick={depositToEtherWalletContract} 
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
