import React, { useEffect, useState } from 'react';
import './index.css';
import Redeem from './Redeem';
import Mint from './Mint';
import { useStore } from '../../stores/store';
import detectEthereumProvider from '@metamask/detect-provider';
import { observer } from 'mobx-react-lite';
import getConfig from '../../configs/config';
import { Button } from '@mui/material';

export default observer(function StableCoin() {

  const { web3Store } = useStore();
  const { web3, setWeb3, setProvider, getAccount, getBalance, air_drop } = web3Store;
  const [tab, setTab] = useState(1);
  const [tcr, setTcr] = useState(0);
  const [rosePrice, setRosePrice] = useState(0);
  const config = getConfig('testnet');

  useEffect(() => {
    setTcr(99.75)
    setRosePrice(0.007)
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setProvider(provider)
        setWeb3(provider)
      } else {
        console.log("Please install MetaMask")
      }
    }
    loadProvider()
  }, [])

  useEffect(() => {
    web3 && getAccount()
      && getBalance(config.ETH!)
      && getBalance(config.ROSE!)
      && getBalance(config.UPFI!)
      && getBalance(config.USDC!)
  }, [web3])

  return (
    <div className={'stable-content'}>
      <Button onClick={() => {
        air_drop("erc20", config.USDC!)
      }}>Get Airdrop</Button>
      <div className='stake-main'>
        <div className='tabs'>
          <div onClick={() => setTab(1)} className={tab === 1 ? 'tab tab-active' : 'tab'}>Mint</div>
          <div onClick={() => setTab(2)} className={tab === 2 ? 'tab tab-active' : 'tab'}>Redeem</div>
        </div>
        <div>
          <div className='tab-content'>
            {
              tab === 1 ?
                <Mint tcr={tcr}
                  rosePrice={rosePrice} />
                :
                <Redeem tcr={tcr}
                  rosePrice={rosePrice} />
            }
          </div>
        </div>
      </div>
    </div>
  );
})
