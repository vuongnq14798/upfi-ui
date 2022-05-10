import React, { useState } from 'react';
import './index.css';
import Redeem from './Redeem';
import Mint from './Mint';

export default function App() {
  const [tab, setTab] = useState(1);
  return (
    <>
      <div className={'stable-content'}>
        <div className='stake-main'>
          <div className='tabs'>
            <div onClick={() => setTab(1)} className={tab === 1 ? 'tab tab-active' : 'tab'}>Mint</div>
            <div onClick={() => setTab(2)} className={tab === 2 ? 'tab tab-active' : 'tab'}>Redeem</div>
          </div>
          <div>
            <div className='tab-content'>
              {
                tab == 1 ?
                  <Mint />
                  :
                  <Redeem/>
              }
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
