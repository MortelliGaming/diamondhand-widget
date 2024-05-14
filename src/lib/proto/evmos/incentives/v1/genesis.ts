/* eslint-disable */
import { Incentive, GasMeter } from "./incentives";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "evmos.incentives.v1";
/** GenesisState defines the module's genesis state. */
export interface GenesisState {
  /** params are the incentives module parameters */
  params: Params;
  /** incentives is a slice of active incentives */
  incentives: Incentive[];
  /** gas_meters is a slice of active Gasmeters */
  gasMeters: GasMeter[];
}
/** Params defines the incentives module params */
export interface Params {
  /** enable_incentives is the parameter to enable incentives */
  enableIncentives: boolean;
  /** allocation_limit is the maximum percentage an incentive can allocate per denomination */
  allocationLimit: string;
  /** incentives_epoch_identifier for the epochs module hooks */
  incentivesEpochIdentifier: string;
  /** reward_scaler is the scaling factor for capping rewards */
  rewardScaler: string;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    incentives: [],
    gasMeters: [],
  };
}
export const GenesisState = {
  typeUrl: "/evmos.incentives.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.incentives) {
      Incentive.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.gasMeters) {
      GasMeter.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.incentives.push(Incentive.decode(reader, reader.uint32()));
          break;
        case 3:
          message.gasMeters.push(GasMeter.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    const obj = createBaseGenesisState();
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    if (Array.isArray(object?.incentives))
      obj.incentives = object.incentives.map((e: any) => Incentive.fromJSON(e));
    if (Array.isArray(object?.gasMeters))
      obj.gasMeters = object.gasMeters.map((e: any) => GasMeter.fromJSON(e));
    return obj;
  },
  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.incentives) {
      obj.incentives = message.incentives.map((e) => (e ? Incentive.toJSON(e) : undefined));
    } else {
      obj.incentives = [];
    }
    if (message.gasMeters) {
      obj.gasMeters = message.gasMeters.map((e) => (e ? GasMeter.toJSON(e) : undefined));
    } else {
      obj.gasMeters = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    message.incentives = object.incentives?.map((e) => Incentive.fromPartial(e)) || [];
    message.gasMeters = object.gasMeters?.map((e) => GasMeter.fromPartial(e)) || [];
    return message;
  },
};
function createBaseParams(): Params {
  return {
    enableIncentives: false,
    allocationLimit: "",
    incentivesEpochIdentifier: "",
    rewardScaler: "",
  };
}
export const Params = {
  typeUrl: "/evmos.incentives.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enableIncentives === true) {
      writer.uint32(8).bool(message.enableIncentives);
    }
    if (message.allocationLimit !== "") {
      writer.uint32(18).string(message.allocationLimit);
    }
    if (message.incentivesEpochIdentifier !== "") {
      writer.uint32(26).string(message.incentivesEpochIdentifier);
    }
    if (message.rewardScaler !== "") {
      writer.uint32(34).string(message.rewardScaler);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enableIncentives = reader.bool();
          break;
        case 2:
          message.allocationLimit = reader.string();
          break;
        case 3:
          message.incentivesEpochIdentifier = reader.string();
          break;
        case 4:
          message.rewardScaler = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Params {
    const obj = createBaseParams();
    if (isSet(object.enableIncentives)) obj.enableIncentives = Boolean(object.enableIncentives);
    if (isSet(object.allocationLimit)) obj.allocationLimit = String(object.allocationLimit);
    if (isSet(object.incentivesEpochIdentifier))
      obj.incentivesEpochIdentifier = String(object.incentivesEpochIdentifier);
    if (isSet(object.rewardScaler)) obj.rewardScaler = String(object.rewardScaler);
    return obj;
  },
  toJSON(message: Params): unknown {
    const obj: any = {};
    message.enableIncentives !== undefined && (obj.enableIncentives = message.enableIncentives);
    message.allocationLimit !== undefined && (obj.allocationLimit = message.allocationLimit);
    message.incentivesEpochIdentifier !== undefined &&
      (obj.incentivesEpochIdentifier = message.incentivesEpochIdentifier);
    message.rewardScaler !== undefined && (obj.rewardScaler = message.rewardScaler);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.enableIncentives = object.enableIncentives ?? false;
    message.allocationLimit = object.allocationLimit ?? "";
    message.incentivesEpochIdentifier = object.incentivesEpochIdentifier ?? "";
    message.rewardScaler = object.rewardScaler ?? "";
    return message;
  },
};
