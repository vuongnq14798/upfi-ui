import { Button } from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";
import DefaultIcon from '../../logo.svg';
import IcAdd from '../../assets/image/ic_add.png';
import IcArrow from '../../assets/image/ic_arrow.png';

export default function Redeem() {
    return (
        <div>
            <div className='input-amount'>
                <div className='input-top'>
                    <span>Input <span className='input-rate'>99%</span></span>
                    <span>Balance: 100</span>
                </div>
                <div className='input-number'>
                    <NumberFormat
                        value='0'
                        placeholder='0.0'
                        className='flex-max number-format'
                    />
                    <div>
                        <span className='half'>Half</span>
                        <img src={DefaultIcon} className='input-logo' />
                        <span className='token-name bold'>UPFI</span>
                    </div>
                </div>
            </div>

            <img src={IcArrow} className='add-arrow-ic' />

            <div className='input-amount'>
                <div className='input-top'>
                    <span>Output (Estimated) <span className='input-rate'>99%</span></span>
                    <span>Balance: 100</span>
                </div>
                <div className='input-number'>
                    <NumberFormat
                        value='0'
                        disabled
                        className='flex-max number-format' />
                    <div>
                        <img src={DefaultIcon} className='input-logo' />
                        <span className='token-name bold'>ROSE</span>
                    </div>
                </div>
            </div>

            <img src={IcAdd} className='add-arrow-ic' />

            <div className='input-amount'>
                <div className='input-top'>
                <span>Output (Estimated) <span className='input-rate'>99%</span></span>
                    <span>Balance: 0</span>
                </div>
                <div className='input-number'>
                    <NumberFormat
                        value='0'
                        disabled
                        className='flex-max number-format'

                    />
                    <div>
                        <img src={DefaultIcon} className='input-logo' />
                        <span className='token-name bold'>USDC</span>
                    </div>
                </div>
            </div>
            <div className='stable-fees tab-content'>
                <div>
                    <span>Redemption fee</span>
                    <span>{'0.3%'}</span>
                </div>
                <div>
                    <span>Slippage tolerance</span>
                    <span>{'0.2%'}</span>
                </div>
                <div>
                    <span>Rate</span>
                    <span>1 USDC = 1 USD</span>
                </div>
            </div>
            <Button variant="contained" color="success" style={{
                width: '100%',
                height: '46px'
            }}>
                Redeem
            </Button>

        </div>
    )
}
