export default function getConfig(env: string) {
    switch (env) {
        case 'testnet':
            return {
                // UPFI_ADDRESS: "0x817b95fA8eE4C44511d6D49f6Cd4AeDD55c4eB6e",
                // USDC_ADDRESS: "0xAC1EFC00FbE0F1ea4ddF4DbE0a043A324689b3Fd",
                // ROSE_ADDRESS: "",
                // ETH_ADDRESS: "0x443818790FF630E130D93F5F49d31BA249908C07",
                // UPO_ADDRESS: "0x0A6129E28B42928d4CF936BCdFc5284B0994616F",
                UPFI: '0x43E7A150FABdBB613dA446b07DB42dcAa3a1ef1c',
                UPO: '0x0F3C47a687960eCBad9E969Ea483E5E8b4D22Fb1',
                USDC: '0xfe2c9efd1A63aA254ACaE60Bd4F37e657413f4E6',
                BTC: '0xB0104dfC501b0C0aAd7d394692a1c9Dbd5C72b4E',
                ETH: '0x627670a7f376E6f8B502Bce7D2bbbFEdAa7cCaa8',
                ROSE: '0xA5b83F3808b597FD030801007Bc975E1d227C054',
                TREASURY: '0x2715abDBD52ec08576a14764A51C22Aa21C8CC9d',
                MINT_REDEEM: '0x9cc449142243947D70933bA9e19F6100Ac54d29B',
                MIN_ABI: [
                    {
                        constant: true,
                        inputs: [{ name: "_owner", type: "address" }],
                        name: "balanceOf",
                        outputs: [{ name: "balance", type: "uint256" }],
                        type: "function",
                    }
                ]
            }
        default:
            return {};
    }
}