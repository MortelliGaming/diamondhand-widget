import { fromBase64, fromBech32, toBase64, toHex } from "@cosmjs/encoding";
import { type OfflineSigner, Registry, type TxBodyEncodeObject, makeAuthInfoBytes, makeSignDoc } from '@cosmjs/proto-signing';
import { type AbstractWallet, type Account, type WalletArgument, WalletName, keyType } from "../Wallet"
import type { Transaction } from "../../utils/type"
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";
import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys'
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { AminoTypes, createDefaultAminoConverters } from "@cosmjs/stargate";
import { makeSignDoc as makeSignDocAmino, type AminoMsg } from '@cosmjs/amino';
import { createWasmAminoConverters } from "@cosmjs/cosmwasm-stargate";
import { ethermintToEth } from "../../utils/format";

export class LeapWallet implements AbstractWallet {
    name: WalletName.Leap
    chainId: string
    registry: Registry
    conf: WalletArgument
    signer: OfflineSigner|null
    aminoTypes = new AminoTypes( {...createDefaultAminoConverters(), ...createWasmAminoConverters()})
    constructor(arg: WalletArgument, registry: Registry) {
        this.chainId = arg.chainId || "cosmoshub"
        this.name = WalletName.Leap
        this.signer = null
        // @ts-ignore
        if (!window.getOfflineSigner || !window.leap) {
            throw new Error('Please install Leap extension')
        }
        this.registry = registry
        this.conf = arg
    }
    async getAccounts(): Promise<Account[]> {
        // const chainId = 'cosmoshub'
        // @ts-ignore
        await window.leap.enable(this.chainId);

        // @ts-ignore
        this.signer = await window.leap.getOfflineSigner(this.chainId);
        const signerAccounts = await this.signer?.getAccounts();
        return signerAccounts?.map(account => {
            return {
                address: account.address,
                pubkeyBase64: toBase64(account.pubkey),
                evmAddress: ethermintToEth(account.address),
                algo: account.algo
            } as Account
        }) || [];
    }
    supportCoinType(coinType?: string | undefined): Promise<boolean> {
        if(coinType) {
            // 
        }
        return Promise.resolve(true);
    }
    isEthermint() {
        return this.conf.hdPath && this.conf.hdPath.startsWith("m/44'/60")
    }
    async sign(transaction: Transaction): Promise<TxRaw> {
        return this.signAmino(transaction)
    }
    // @deprecated use signAmino instead
    // because signDirect is not supported ledger wallet
    async signDirect(transaction: Transaction): Promise<TxRaw> {
        const accouts = await this.getAccounts()
        const hex = toHex(fromBech32(transaction.signerAddress).data)
        const accountFromSigner = accouts.find((account) => toHex(fromBech32(account.address).data) === hex);
        if (!accountFromSigner) {
            throw new Error("Failed to retrieve account from signer");
        }
        const pubkey = Any.fromPartial({
            typeUrl: keyType(transaction.chainId),
            value: PubKey.encode({
                key: fromBase64(accountFromSigner.pubkeyBase64),
            }).finish()
        })
        const txBodyEncodeObject: TxBodyEncodeObject = {
            typeUrl: "/cosmos.tx.v1beta1.TxBody",
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
            transaction.fee.payer,
        );
        const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, transaction.chainId, transaction.signerData.accountNumber);

        // @ts-ignore
        // const offlineSigner = await window.leap.getOfflineSignerAuto(this.chainId);
        // console.log(offlineSigner)
        const { signature, signed } = await this.signer.signDirect(transaction.signerAddress, signDoc);
        return TxRaw.fromPartial({
            bodyBytes: signed.bodyBytes,
            authInfoBytes: signed.authInfoBytes,
            signatures: [fromBase64(signature.signature)],
        });
    }

    async signAmino(tx: Transaction): Promise<TxRaw> {
        const accouts = await this.getAccounts()
        const hex = toHex(fromBech32(tx.signerAddress).data)
        const accountFromSigner = accouts.find((account) => toHex(fromBech32(account.address).data) === hex);
        if (!accountFromSigner) {
            throw new Error("Failed to retrieve account from signer");
        }
        // const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
        const pubkey = Any.fromPartial({
            typeUrl: keyType(tx.chainId),
            value: PubKey.encode({
                key: fromBase64(accountFromSigner.pubkeyBase64),
            }).finish()
        })
        const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
        const msgs = tx.messages.map((msg) => this.aminoTypes.toAmino(msg));
        const signDoc = makeSignDocAmino(msgs, tx.fee, tx.chainId, tx.memo, tx.signerData.accountNumber, tx.signerData.sequence);
        
        // @ts-ignore
        // const offlineSigner = window.getOfflineSigner(this.chainId)
        const { signature, signed } = await this.signer.signAmino(tx.signerAddress, signDoc);

        // console.log(signature, 'signature', signed)

        const signedTxBody = {
            messages: signed.msgs.map((msg: AminoMsg) => this.aminoTypes.fromAmino(msg)),
            memo: signed.memo,
        };
        const signedTxBodyEncodeObject: TxBodyEncodeObject = {
            typeUrl: "/cosmos.tx.v1beta1.TxBody",
            value: signedTxBody,
        };
        const signedTxBodyBytes = this.registry.encode(signedTxBodyEncodeObject);

        const signedGasLimit = Number(signed.fee.gas);
        const signedSequence = Number(signed.sequence);
        const signedAuthInfoBytes = makeAuthInfoBytes(
            [{ pubkey, sequence: signedSequence }],
            signed.fee.amount,
            signedGasLimit,
            signed.fee.granter,
            signed.fee.payer,
            signMode,
        );
        return TxRaw.fromPartial({
            bodyBytes: signedTxBodyBytes,
            authInfoBytes: signedAuthInfoBytes,
            signatures: [fromBase64(signature.signature)],
        });
    }
}
