import { Registry } from '@cosmjs/proto-signing'
import { defaultRegistryTypes } from "@cosmjs/stargate";
import type { Transaction } from "../utils/type";
import { KeplerWallet } from './wallets/KeplerWallet';
import { LedgerWallet } from './wallets/LedgerWallet';
import { MetamaskWallet } from './wallets/MetamaskWallet';
import { MetamaskSnapWallet } from './wallets/MetamaskSnapWallet';
import { LeapWallet } from './wallets/LeapWallet';
import { isEthermint } from './UniClient';

export enum WalletName {
    Keplr = "Keplr",
    Ledger = "LedgerUSB",
    LedgerBLE = "LedgerBLE",
    Metamask = "Metamask",
    MetamaskSnap = "MetamaskSnap",
    Leap = "Leap",
    // None Signning
    Address = "Address",
    NameService = "Nameservice",
}

export interface ConnectedWallet {
    wallet: WalletName,
    cosmosAddress: string
    evmAddress: string
    hdPath: string,
    accounts: Account[]
}

export interface Account {
    address: string,
    evmAddress: string,
    algo: string,
    pubkeyBase64: string,
}

export interface WalletArgument {
    chainId?: string,
    hdPath?: string,
    address?: string,
    name?: string,
    transport?: string
    prefix?: string,
}

export interface AbstractWallet {
    name: WalletName
    /**
     * The the accounts from the wallet (addresses)
     */
    getAccounts(): Promise<Account[]>
    supportCoinType(coinType?: string): Promise<boolean>
    sign(transaction: Transaction): Promise<any>
}

export const DEFAULT_HDPATH = "m/44'/118/0'/0/0";

export function keyType(chainId: string) {
    switch (true) {
        case isEthermint(chainId):   // ethermint like chain: evmos_9002-1
            return "/ethermint.crypto.v1.ethsecp256k1.PubKey"
        case chainId.startsWith("injective"):
            return "/injective.crypto.v1beta1.ethsecp256k1.PubKey";
        default:
            return "/cosmos.crypto.secp256k1.PubKey"
    }
}

export function readWallet(walletName: WalletName, hdPath?: string) {
    return JSON.parse(
        localStorage.getItem((hdPath || DEFAULT_HDPATH) + walletName) || '{}'
    ) as ConnectedWallet
}
export function writeWallet(connected: ConnectedWallet) {
    localStorage.setItem((connected.hdPath || DEFAULT_HDPATH) + connected.wallet, JSON.stringify(connected))
}

export function removeWallet(walletName: WalletName, hdPath?: string) {
    localStorage.removeItem((hdPath || DEFAULT_HDPATH) + walletName);
}

export function extractChainId(chainId: string) {
    const start = chainId.indexOf('_')
    const end = chainId.indexOf('-')
    if (end > start && start > 0) {
      return Number(chainId.substring(start + 1, end))
    }
    return 0
}

export function createWallet(name: WalletName, arg: WalletArgument, registry?: Registry): AbstractWallet {
    const reg = registry || new Registry(defaultRegistryTypes)
    switch (name) {
        case WalletName.Keplr:
            return new KeplerWallet(arg, reg)
        case WalletName.Ledger:
            return new LedgerWallet(arg, reg)
        case WalletName.Leap:
            return new LeapWallet(arg, reg)
        case WalletName.MetamaskSnap:
            return new MetamaskSnapWallet(arg, reg)
        case WalletName.Metamask:
            return arg.hdPath && 
            (arg.hdPath.startsWith('m/44/60') || arg.hdPath.startsWith("m/44'/60")) 
            ? new MetamaskWallet(arg, reg) : new MetamaskSnapWallet(arg, reg)
    }
    throw new Error("No wallet connected")
}
