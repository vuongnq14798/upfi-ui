import { makeAutoObservable, runInAction } from "mobx"
import Web3 from "web3";
import { config } from "..";

export default class Web3Store {
    provider: any
    web3: any
    account: any
    contract: any
    upfiBalance: number = 0.0
    usdcBalance: number = 0.0
    roseBalance: number = 0.0
    loading: boolean = false

    constructor() {
        makeAutoObservable(this);
    }

    setWeb3 = (provider: any) => {
        this.web3 = new Web3(provider)
    }

    setProvider = (provider: any) => {
        this.provider = provider
    }

    getAccount = async () => {
        try {
            const accounts = await this.web3.eth.requestAccounts()
            runInAction(() => {
                this.account = accounts[0]
            })
            console.log(accounts)
        } catch (error) {
            console.log(error)
        }
        return this.account
    }

    getBalance = async (tokenAddress: string) => {
        try {
            const accounts = await this.web3.eth.requestAccounts()
            runInAction(() => {
                this.account = accounts[0]
            })
            if (tokenAddress === "") {
                const balance = await this.web3.eth.getBalance(this.account)
                runInAction(() => {
                    this.roseBalance = this.web3.utils.fromWei(balance, "ether")
                })
                return
            }

            const contract = new this.web3.eth.Contract(config.MIN_ABI, tokenAddress)
            const ret = await contract.methods.balanceOf(this.account).call()
            const balance = this.web3.utils.fromWei(ret)
            console.log(balance)
            runInAction(() => {
                switch (tokenAddress) {
                    case config.ROSE:
                        this.roseBalance = balance
                        break
                    case config.UPFI:
                        this.upfiBalance = balance
                        break
                    case config.USDC:
                        this.usdcBalance = balance
                        break
                }
            })
            return balance;
        } catch (error) {
            console.log(error)
            return 0
        }
    }

    loadContract = async (contractName: string, contractAddress: string) => {
        try {
            const source = await fetch(`/contracts/${contractName}.json`)
            const artifact = await source.json()
            const contract = await new this.web3.eth.Contract(artifact, contractAddress)
            return contract
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    mint = async (contractName: string, contractAddress: string) => {
        this.loading = true
        try {
            const contract = await this.loadContract(contractName, contractAddress)
            await contract.methods.mint().call()
            debugger
            runInAction(() => { this.loading = false })
        } catch (error) {
            console.log(error)
            runInAction(() => { this.loading = false })
        }
    }

    redeem = async (contractName: string, contractAddress: string) => {
        this.loading = true
        try {
            const contract = await this.loadContract(contractName, contractAddress)
            await contract.methods.redeem().call()
            debugger
            runInAction(() => { this.loading = false })
        } catch (error) {
            console.log(error)
            runInAction(() => { this.loading = false })
        }
    }

    air_drop = async (contractName: string, contractAddress: string) => {
        try {
            const contract = await this.loadContract(contractName, contractAddress)
            debugger
            const ret = await contract.methods.airdrop(this.account).call()
        } catch (error) {
            console.log(error)
        }
    }
}
