import { createContext, useContext } from "react"
import Web3Store from "./web3Store";

interface Store {
    web3Store: Web3Store
}

export const store: Store = {
    web3Store: new Web3Store()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}