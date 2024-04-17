import fetch from 'cross-fetch'
import type { Coin, CoinMetadata, GovProposalStatus, TxResponse } from './type'

export async function get(url: string) {
    return (await fetch(url)).json()
}

export async function post(url: string, data: any) {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // credentials: 'same-origin', // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers: {
          'Content-Type': 'text/plain',
          Accept: '*/*',
          // 'Accept-Encoding': 'gzip, deflate, br',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      // const response = axios.post((config ? config.api : this.config.api) + url, data)
      return response.json() // parses JSON response into native JavaScript objects
}

// /cosmos/base/tendermint/v1beta1/blocks/latest
export async function getLatestBlock(endpoint: string) {
    const url = `${endpoint}/cosmos/base/tendermint/v1beta1/blocks/latest`
    return get(url)
}

export async function getAccount(endpoint: string, address: string) {
    const url = `${endpoint}/cosmos/auth/v1beta1/accounts/${address}`
    try{
        const res = await get(url)
        const account = {
            account_number: 0,
            sequence: 0,
        }
        if(res.account?.base_vesting_account?.base_account) {
            account.account_number = res.account.base_vesting_account.base_account.account_number
            account.sequence = res.account.base_vesting_account.base_account.sequence
        }
        else if(res.account?.base_account) {
            account.account_number = res.account.base_account.account_number
            account.sequence = res.account.base_account.sequence
        }
        else if(res.account) {
            account.account_number = res.account.account_number
            account.sequence = res.account.sequence
        }
        return {
            account
        }      
    }catch(err) {
        throw new Error(err as any)
    }

}

export async function getBalance(endpoint: string, address: string): Promise<{balances: Coin[]}> {
    const url = `${endpoint}/cosmos/bank/v1beta1/balances/${address}`
    return get(url)
}

export async function getBalanceMetadata(endpoint: string, denom: string): Promise<{metadata: CoinMetadata }> {
    const url = `${endpoint}/cosmos/bank/v1beta1/denoms_metadata/${denom}`
    return get(url)
}

export async function getIBCDenomMetadata(denom: string): Promise<CoinMetadata> {
    const url = `https://metadata.ping.pub/metadata/${denom.replace("ibc/", "")}`
    return get(url)
}

export async function getCoinMetadata(endpoint: string, denom: string) {
    const url = `${endpoint}/cosmos/bank/v1beta1/denoms_metadata/${denom}`
    return get(url)
}

export async function getDelegateRewards(endpoint: string, address: string) {
    const url = `${endpoint}/cosmos/distribution/v1beta1/delegators/${address}/rewards`
    return get(url)
}

export async function getDelegations(endpoint: string, validator_addr: string,  address: string) : Promise< {
    delegation_response: {
        balance: Coin,
        delegation: {
            delegator_address: string,
            shares: string,
            validator_address: string
        }
    }
}> {
    const url = `${endpoint}/cosmos/staking/v1beta1/validators/${validator_addr}/delegations/${address}`
    return get(url)
}

export async function getDelegationsByDelegator(endpoint: string, delegator_addr: string) : Promise< {
    delegation_responses: [{
        balance: Coin,
        delegation: {
            delegator_address: string,
            shares: string,
            validator_address: string
        }
    }]
}> {
    const url = `${endpoint}/cosmos/staking/v1beta1/delegations/${delegator_addr}`
    return get(url)
}

export async function getActiveValidators(endpoint: string) {
    const url = `${endpoint}/cosmos/staking/v1beta1/validators?pagination.limit=300&status=BOND_STATUS_BONDED`
    return get(url)
}

export async function getInactiveValidators(endpoint: string) {
    const url = `${endpoint}/cosmos/staking/v1beta1/validators?pagination.limit=300&status=BOND_STATUS_UNBONDED`
    return get(url)
}

// /ibc/apps/transfer/v1/denom_traces/{hash}
export async function getDenomTraces(endpoint: string, hash: string) : Promise<{
    denom_trace: {
        path: string;
        base_denom: string;
    };
}> {
    const url = `${endpoint}/ibc/apps/transfer/v1/denom_traces/${hash}`
    return get(url)
}
// /cosmos/tx/v1beta1/txs/{hash}
export async function getTxByHash(endpoint: string, hash: string) : Promise<{
    tx_response: TxResponse;
}> {
    const url = `${endpoint}/cosmos/tx/v1beta1/txs/${hash}`
    return get(url)
}
// /cosmos/staking/v1beta1/params
export async function getStakingParam(endpoint: string) : Promise<{
    params: {
        unbonding_time: string;
        max_validators: number;
        max_entries: number;
        historical_entries: number;
        bond_denom: string;
    };
}> {
    const url = `${endpoint}/cosmos/staking/v1beta1/params`
    return get(url)
}

export async function getOsmosisPools(endpoint: string) {
    const url = `${endpoint}/osmosis/gamm/v1beta1/pools?pagination.limit=1000`
    return get(url)
}
// https://lcd.osmosis.zone
// /osmosis/gamm/v1beta1/{pool_id}/estimate/swap_exact_amount_in
export async function estimateSwapAmountIn(endpoint: string, poolId: string, token: Coin) {
    const url = `${endpoint}/osmosis/gamm/v1beta1/${poolId}/estimate/swap_exact_amount_in?token_in=${token.amount}${token.denom}`
    return get(url)
}

export async function getGovProposals(endpoint: string, status: GovProposalStatus) {
    const url = `${endpoint}/cosmos/gov/v1beta1/proposals?pagination.limit=300&proposal_status=${status}`
    return get(url)
}
