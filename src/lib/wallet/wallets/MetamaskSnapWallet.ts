import {
    type AbstractWallet,
    type WalletArgument,
    WalletName,
    keyType,
    type Account,
} from '../Wallet';
import {
    fromBase64,
    fromBech32,
    toBase64,
    toHex,
} from '@cosmjs/encoding';
import {
    Registry,
    type TxBodyEncodeObject,
    makeAuthInfoBytes,
    makeSignDoc,
} from '@cosmjs/proto-signing';
import type { Transaction } from '../../utils/type';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
// import { AminoTypes, createDefaultAminoConverters } from '@cosmjs/stargate';
import { Any } from 'cosmjs-types/google/protobuf/any';
import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys';

import { connectSnap, getKey, getSnap, CosmjsOfflineSigner } from '@leapwallet/cosmos-snap-provider';
import { ethermintToEth } from '../../utils/format';
// import { createWasmAminoConverters } from "@cosmjs/cosmwasm-stargate";

export class MetamaskSnapWallet implements AbstractWallet {
    name: WalletName.MetamaskSnap;
    chainId: string;
    registry: Registry;
    prefix: string;    
    // aminoTypes = new AminoTypes( {...createDefaultAminoConverters(), ...createWasmAminoConverters()});

    constructor(arg: WalletArgument, registry: Registry) {
        this.name = WalletName.MetamaskSnap
        this.chainId = arg.chainId || 'cosmoshub';
        this.registry = registry;
        this.prefix = arg.prefix || 'cosmos';
    }

    async getAccounts(): Promise<Account[]> {
        const snapInstalled = await getSnap().catch(() => {
            throw new Error('Metamask snap not installed');
        });
        if (!snapInstalled) {
            await connectSnap()
        }
        const key = await getKey(this.chainId)
        const account = {
            address: key.address,
            pubkeyBase64: toBase64(key.pubkey),
            evmAddress: ethermintToEth(key.address),
            algo: key.algo
        } as Account
        return [account]
    }

    async supportCoinType(coinType?: string): Promise<boolean> {
        if(coinType) {
            //
        }
        return true;
    }

    async sign(transaction: Transaction): Promise<TxRaw | Uint8Array> {
        const accouts = await this.getAccounts();
        const hex = toHex(fromBech32(transaction.signerAddress).data);
        const accountFromSigner = accouts.find(
            (account) => toHex(fromBech32(account.address).data) === hex
        );
        if (!accountFromSigner) {
            throw new Error('Failed to retrieve account from signer');
        }

        const pubkey = Any.fromPartial({
            typeUrl: keyType(transaction.chainId),
            value: PubKey.encode({
                key: new Uint8Array(Object.values(fromBase64(accountFromSigner.pubkeyBase64))),
            }).finish(),
        });
        const txBodyEncodeObject: TxBodyEncodeObject = {
            typeUrl: '/cosmos.tx.v1beta1.TxBody',
            value: {
                messages: transaction.messages,
                memo: transaction.memo,
            },
        };
        const txBodyBytes = this.registry.encode(txBodyEncodeObject);
        const gasLimit = Number(transaction.fee.gas);

        const authInfoBytes = makeAuthInfoBytes(
            [{ pubkey, sequence: transaction.signerData.sequence }],
            transaction.fee.amount,
            gasLimit,
            transaction.fee.granter,
            transaction.fee.payer
        );
        const signDoc = makeSignDoc(
            txBodyBytes,
            authInfoBytes,
            transaction.chainId,
            transaction.signerData.accountNumber
        );

        const offlineSigner = new CosmjsOfflineSigner(this.chainId);
        const { signature, signed } = await offlineSigner.signDirect(transaction.signerAddress, signDoc);

        return TxRaw.fromPartial({
            bodyBytes: signed.bodyBytes,
            authInfoBytes: signed.authInfoBytes,
            signatures: [fromBase64(signature.signature)],
        });
    }
}
