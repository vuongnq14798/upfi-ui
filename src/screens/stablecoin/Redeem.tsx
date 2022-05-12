import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import DefaultIcon from '../../logo.svg';
import IcAdd from '../../assets/image/ic_add.png';
import IcArrow from '../../assets/image/ic_arrow.png';
import { formatCurrency } from "../../utils/Format";
import { LoadingButton } from "@mui/lab";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export default observer(function Redeem(props: any) {
    const { web3Store } = useStore()
    const { upfiBalance, usdcBalance, roseBalance, loading} = web3Store

    const { tcr, redeem, rosePrice } = props
    const [input, setInput] = useState(0);
    const [usdcOutput, setUsdcOutput] = useState(0);
    const [roseOutput, setRoseOutput] = useState(0);

    useEffect(() => {
        if (tcr !== 100) {
            let rate = tcr / (100 - tcr)
            let usdc = input * tcr / 100
            let rose = usdc / (rate * rosePrice)
            setUsdcOutput(parseFloat(usdc.toFixed(6)))
            setRoseOutput(parseFloat(rose.toFixed(6)))
        }
    }, [input])

    return (
        <div>
            <div className='input-amount'>
                <div className='input-top'>
                    <span>Input</span>
                    <span>Balance: {formatCurrency(upfiBalance)}</span>
                </div>
                <div className='input-number'>
                    <NumberFormat
                        value={input}
                        placeholder='0.0'
                        className='flex-max number-format'
                        onValueChange={value => {
                            const { floatValue } = value
                            setInput(floatValue!);
                        }}
                    />
                    <div>
                        <span className='half' onClick={() => setInput(upfiBalance / 2)}>HALF </span>
                        <span className='half' onClick={() => setInput(upfiBalance)}>MAX</span>
                        <img src={DefaultIcon} className='input-logo' alt=""/>
                        <span className='token-name bold'>UPFI</span>
                    </div>
                </div>
            </div>

            <img src={IcArrow} className='add-arrow-ic' alt=""/>

            <div className='input-amount'>
                <div className='input-top'>
                    <span>Output (Estimated) <span className='input-rate'>{tcr}%</span></span>
                    <span>Balance: {formatCurrency(usdcBalance)}</span>
                </div>
                <div className='input-number'>
                    <NumberFormat
                        value={usdcOutput}
                        disabled
                        className='flex-max number-format'
                    />
                    <div>
                        <img src={DefaultIcon} className='input-logo' alt=""/>
                        <span className='token-name bold'>USDC</span>
                    </div>
                </div>
            </div>

            <img src={IcAdd} className='add-arrow-ic' alt=""/>

            <div className='input-amount'>
                <div className='input-top'>
                    <span>Output (Estimated) <span className='input-rate'>{100 - tcr}%</span></span>
                    <span>Balance: {formatCurrency(roseBalance)}</span>
                </div>
                <div className='input-number'>
                    <NumberFormat
                        value={roseOutput}
                        disabled
                        className='flex-max number-format' />
                    <div>
                        <img src={DefaultIcon} className='input-logo' alt=""/>
                        <span className='token-name bold'>ROSE</span>
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
            <LoadingButton
                loading={loading}
                disabled={input !== undefined && !(input > 0 && input <= upfiBalance)}
                variant="contained"
                color="success"
                style={{ width: '100%', height: '46px' }}
                onClick={() => redeem()}
            >
                Redeem
            </LoadingButton>

        </div>
    )
})
