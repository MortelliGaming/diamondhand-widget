/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, Rpc } from "../../../helpers";
export const protobufPackage = "evmos.vesting.v2";
/** QueryBalancesRequest is the request type for the Query/Balances RPC method. */
export interface QueryBalancesRequest {
  /** address of the clawback vesting account */
  address: string;
}
/**
 * QueryBalancesResponse is the response type for the Query/Balances RPC
 * method.
 */
export interface QueryBalancesResponse {
  /** locked defines the current amount of locked tokens */
  locked: Coin[];
  /** unvested defines the current amount of unvested tokens */
  unvested: Coin[];
  /** vested defines the current amount of vested tokens */
  vested: Coin[];
}
function createBaseQueryBalancesRequest(): QueryBalancesRequest {
  return {
    address: "",
  };
}
export const QueryBalancesRequest = {
  typeUrl: "/evmos.vesting.v2.QueryBalancesRequest",
  encode(message: QueryBalancesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBalancesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalancesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBalancesRequest {
    const obj = createBaseQueryBalancesRequest();
    if (isSet(object.address)) obj.address = String(object.address);
    return obj;
  },
  toJSON(message: QueryBalancesRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBalancesRequest>, I>>(object: I): QueryBalancesRequest {
    const message = createBaseQueryBalancesRequest();
    message.address = object.address ?? "";
    return message;
  },
};
function createBaseQueryBalancesResponse(): QueryBalancesResponse {
  return {
    locked: [],
    unvested: [],
    vested: [],
  };
}
export const QueryBalancesResponse = {
  typeUrl: "/evmos.vesting.v2.QueryBalancesResponse",
  encode(message: QueryBalancesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.locked) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.unvested) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.vested) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBalancesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalancesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.locked.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.unvested.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.vested.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBalancesResponse {
    const obj = createBaseQueryBalancesResponse();
    if (Array.isArray(object?.locked)) obj.locked = object.locked.map((e: any) => Coin.fromJSON(e));
    if (Array.isArray(object?.unvested)) obj.unvested = object.unvested.map((e: any) => Coin.fromJSON(e));
    if (Array.isArray(object?.vested)) obj.vested = object.vested.map((e: any) => Coin.fromJSON(e));
    return obj;
  },
  toJSON(message: QueryBalancesResponse): unknown {
    const obj: any = {};
    if (message.locked) {
      obj.locked = message.locked.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.locked = [];
    }
    if (message.unvested) {
      obj.unvested = message.unvested.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.unvested = [];
    }
    if (message.vested) {
      obj.vested = message.vested.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.vested = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryBalancesResponse>, I>>(object: I): QueryBalancesResponse {
    const message = createBaseQueryBalancesResponse();
    message.locked = object.locked?.map((e) => Coin.fromPartial(e)) || [];
    message.unvested = object.unvested?.map((e) => Coin.fromPartial(e)) || [];
    message.vested = object.vested?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};
/** Query defines the gRPC querier service. */
export interface Query {
  /** Balances retrieves the unvested, vested and locked tokens for a vesting account */
  Balances(request: QueryBalancesRequest): Promise<QueryBalancesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Balances = this.Balances.bind(this);
  }
  Balances(request: QueryBalancesRequest): Promise<QueryBalancesResponse> {
    const data = QueryBalancesRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.vesting.v2.Query", "Balances", data);
    return promise.then((data) => QueryBalancesResponse.decode(new BinaryReader(data)));
  }
}
