import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import DefaultIcon from '../../logo.svg';
import IcAdd from '../../assets/image/ic_add.png';
import IcArrow from '../../assets/image/ic_arrow.png';
import { formatCurrency } from "../../utils/Format";
import { LoadingButton } from '@mui/lab';
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function Mint(props: any) {
    const { web3Store } = useStore()
    const { upfiBalance, usdcBalance, roseBalance, mint, loading} = web3Store

    const { tcr, rosePrice } = props
    const [usdcInput, setUsdcInput] = useState(0);
    const [roseInput, setRoseInput] = useState(0);
    const [output, setOutput] = useState(0);
    const PRECISION = 0.001

    useEffect(() => {
        if (tcr !== 100) {
            let rate = tcr / (100 - tcr)
            let usdc = ((roseInput * rosePrice) * rate)
            let op = usdc * 100 / tcr
            if (Math.abs(usdcInput - usdc) > PRECISION || !roseInput || !usdcInput) {
                setOutput(parseFloat(op.toFixed(6)))
                setUsdcInput(parseFloat(usdc.toFixed(6)))
            }
        }
    }, [roseInput])

    useEffect(() => {
        if (tcr !== 100) {
            let rate = tcr / (100 - tcr)
            let rose = (usdcInput / rate) / rosePrice
            let op = usdcInput * 100 / tcr
            if (Math.abs(roseInput - rose) > PRECISION || !roseInput || !usdcInput) {
                setOutput(parseFloat(op.toFixed(6)))
                setRoseInput(parseFloat(rose.toFixed(6)))
            }
        }
    }, [usdcInput])

    return (
        <div>
            <div className='input-amount'>
                <div className='input-top'>
                    <span>Input <span className='input-rate'>{tcr}%</span></span>
                    <span>Balance: {formatCurrency(usdcBalance)}</span>
                </div>
                <div className='input-number'>
                    <NumberFormat
                        value={usdcInput}
                        placeholder='0.0'
                        className='flex-max number-format'
                        onValueChange={value => {
                            const { floatValue } = value
                            setUsdcInput(floatValue!);
                        }}
                    />
                    <div>
                        <span className='half' onClick={() => setUsdcInput(usdcBalance / 2)}>HALF </span>
                        <span className='half' onClick={() => setUsdcInput(usdcBalance)}>MAX</span>
                        <img src={DefaultIcon} className='input-logo' alt=""/>
                        <span className='token-name bold'>USDC</span>
                    </div>
                </div>
            </div>

            <img src={IcAdd} className='add-arrow-ic' alt=""/>

            <div className='input-amount'>
                <div className='input-top'>
                    <span>Input <span className='input-rate'>{100 - tcr}%</span></span>
                    <span>Balance: {formatCurrency(roseBalance)}</span>
                </div>
                <div className='input-number'>
                    <NumberFormat
                        value={roseInput}
                        placeholder='0.0'
                        className='flex-max number-format'
                        onValueChange={value => {
                            const { floatValue } = value
                            setRoseInput(floatValue!)
                        }} />
                    <div>
                        <span className='half' onClick={() => setRoseInput(roseBalance / 2)}>HALF </span>
                        <span className='half' onClick={() => setRoseInput(roseBalance)}>MAX</span>
                        <img src={DefaultIcon} className='input-logo' alt=""/>
                        <span className='token-name bold'>ROSE</span>
                    </div>
                </div>
            </div>

            <img src={IcArrow} className='add-arrow-ic' alt=""/>

            <div className='input-amount'>
                <div className='input-top'>
                    <span>Output (estimated)</span>
                    <span>Balance: {formatCurrency(upfiBalance)}</span>
                </div>
                <div className='input-number'>
                    <NumberFormat
                        value={output}
                        disabled
                        className='flex-max number-format'
                    />
                    <div>
                        <img src={DefaultIcon} className='input-logo' alt=""/>
                        <span className='token-name bold'>UPFI</span>
                    </div>
                </div>
            </div>

            <div className='stable-fees tab-content '>
                <div>
                    <span>Mint fee</span>
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
                disabled={usdcInput !== undefined
                    && roseInput !== undefined
                    && !(usdcInput > 0 && usdcInput <= usdcBalance && roseInput > 0 && roseInput <= roseBalance)
                }
                variant="contained"
                color="success"
                style={{ width: '100%', height: '46px' }}
                onClick={() => mint("Faucet", "0x42Ca7a12A2EEb3A62217C7B2c811018f7EA7e035")}
            >
                Mint
            </LoadingButton>
        </div>
    )
})
