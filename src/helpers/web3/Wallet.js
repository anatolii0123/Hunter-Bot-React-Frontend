import { connect } from 'react-redux';

import { clearWalletProvider, connectToWallet, web3ModalProvider } from "./Web3Modal";
import walletActions from '../../reducers/wallet/actions';

import store from '../../store'

export let accountAddress = undefined
export let web3Modal = undefined

async function updateAccount() {
  const accounts = await web3Modal.eth.getAccounts()
  updateAccountAddress(accounts)

  if (web3ModalProvider !== undefined && web3ModalProvider !== null) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      updateAccountAddress(accounts)
      store.dispatch({ type: walletActions.CHANGE_WALLET, payload: accounts[0] })
    });
    web3ModalProvider.on("chainChanged", (id) => {
      window.location.reload()
    });
  }
}

export async function initWallet() {
  if (web3Modal === undefined) {
    try {
      web3Modal = await connectToWallet()
      await updateAccount()
    } catch (e) {
      console.log("wallet connect error, reconnecting")
    }
  }
}



export function updateAccountAddress(accounts) {
  if (accounts !== undefined && accounts.length > 0) {
    accountAddress = accounts[0]
  } else if (accountAddress !== undefined) {
    clearWalletProvider()
    accountAddress = undefined
  }
}
