/* eslint-disable */
import { ExponentialCalculation, InflationDistribution } from "./inflation";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "evmos.inflation.v1";
/** GenesisState defines the inflation module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params: Params;
  /** period is the amount of past periods, based on the epochs per period param */
  period: bigint;
  /** epoch_identifier for inflation */
  epochIdentifier: string;
  /** epochs_per_period is the number of epochs after which inflation is recalculated */
  epochsPerPeriod: bigint;
  /** skipped_epochs is the number of epochs that have passed while inflation is disabled */
  skippedEpochs: bigint;
}
/** Params holds parameters for the inflation module. */
export interface Params {
  /** mint_denom specifies the type of coin to mint */
  mintDenom: string;
  /** exponential_calculation takes in the variables to calculate exponential inflation */
  exponentialCalculation: ExponentialCalculation;
  /** inflation_distribution of the minted denom */
  inflationDistribution: InflationDistribution;
  /** enable_inflation is the parameter that enables inflation and halts increasing the skipped_epochs */
  enableInflation: boolean;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    period: BigInt(0),
    epochIdentifier: "",
    epochsPerPeriod: BigInt(0),
    skippedEpochs: BigInt(0),
  };
}
export const GenesisState = {
  typeUrl: "/evmos.inflation.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.period !== BigInt(0)) {
      writer.uint32(16).uint64(message.period);
    }
    if (message.epochIdentifier !== "") {
      writer.uint32(26).string(message.epochIdentifier);
    }
    if (message.epochsPerPeriod !== BigInt(0)) {
      writer.uint32(32).int64(message.epochsPerPeriod);
    }
    if (message.skippedEpochs !== BigInt(0)) {
      writer.uint32(40).uint64(message.skippedEpochs);
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
          message.period = reader.uint64();
          break;
        case 3:
          message.epochIdentifier = reader.string();
          break;
        case 4:
          message.epochsPerPeriod = reader.int64();
          break;
        case 5:
          message.skippedEpochs = reader.uint64();
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
    if (isSet(object.period)) obj.period = BigInt(object.period.toString());
    if (isSet(object.epochIdentifier)) obj.epochIdentifier = String(object.epochIdentifier);
    if (isSet(object.epochsPerPeriod)) obj.epochsPerPeriod = BigInt(object.epochsPerPeriod.toString());
    if (isSet(object.skippedEpochs)) obj.skippedEpochs = BigInt(object.skippedEpochs.toString());
    return obj;
  },
  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.period !== undefined && (obj.period = (message.period || BigInt(0)).toString());
    message.epochIdentifier !== undefined && (obj.epochIdentifier = message.epochIdentifier);
    message.epochsPerPeriod !== undefined &&
      (obj.epochsPerPeriod = (message.epochsPerPeriod || BigInt(0)).toString());
    message.skippedEpochs !== undefined &&
      (obj.skippedEpochs = (message.skippedEpochs || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = BigInt(object.period.toString());
    }
    message.epochIdentifier = object.epochIdentifier ?? "";
    if (object.epochsPerPeriod !== undefined && object.epochsPerPeriod !== null) {
      message.epochsPerPeriod = BigInt(object.epochsPerPeriod.toString());
    }
    if (object.skippedEpochs !== undefined && object.skippedEpochs !== null) {
      message.skippedEpochs = BigInt(object.skippedEpochs.toString());
    }
    return message;
  },
};
function createBaseParams(): Params {
  return {
    mintDenom: "",
    exponentialCalculation: ExponentialCalculation.fromPartial({}),
    inflationDistribution: InflationDistribution.fromPartial({}),
    enableInflation: false,
  };
}
export const Params = {
  typeUrl: "/evmos.inflation.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.mintDenom !== "") {
      writer.uint32(10).string(message.mintDenom);
    }
    if (message.exponentialCalculation !== undefined) {
      ExponentialCalculation.encode(message.exponentialCalculation, writer.uint32(18).fork()).ldelim();
    }
    if (message.inflationDistribution !== undefined) {
      InflationDistribution.encode(message.inflationDistribution, writer.uint32(26).fork()).ldelim();
    }
    if (message.enableInflation === true) {
      writer.uint32(32).bool(message.enableInflation);
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
          message.mintDenom = reader.string();
          break;
        case 2:
          message.exponentialCalculation = ExponentialCalculation.decode(reader, reader.uint32());
          break;
        case 3:
          message.inflationDistribution = InflationDistribution.decode(reader, reader.uint32());
          break;
        case 4:
          message.enableInflation = reader.bool();
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
    if (isSet(object.mintDenom)) obj.mintDenom = String(object.mintDenom);
    if (isSet(object.exponentialCalculation))
      obj.exponentialCalculation = ExponentialCalculation.fromJSON(object.exponentialCalculation);
    if (isSet(object.inflationDistribution))
      obj.inflationDistribution = InflationDistribution.fromJSON(object.inflationDistribution);
    if (isSet(object.enableInflation)) obj.enableInflation = Boolean(object.enableInflation);
    return obj;
  },
  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mintDenom !== undefined && (obj.mintDenom = message.mintDenom);
    message.exponentialCalculation !== undefined &&
      (obj.exponentialCalculation = message.exponentialCalculation
        ? ExponentialCalculation.toJSON(message.exponentialCalculation)
        : undefined);
    message.inflationDistribution !== undefined &&
      (obj.inflationDistribution = message.inflationDistribution
        ? InflationDistribution.toJSON(message.inflationDistribution)
        : undefined);
    message.enableInflation !== undefined && (obj.enableInflation = message.enableInflation);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.mintDenom = object.mintDenom ?? "";
    if (object.exponentialCalculation !== undefined && object.exponentialCalculation !== null) {
      message.exponentialCalculation = ExponentialCalculation.fromPartial(object.exponentialCalculation);
    }
    if (object.inflationDistribution !== undefined && object.inflationDistribution !== null) {
      message.inflationDistribution = InflationDistribution.fromPartial(object.inflationDistribution);
    }
    message.enableInflation = object.enableInflation ?? false;
    return message;
  },
};
