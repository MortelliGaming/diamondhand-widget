/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "evmos.inflation.v1";
/**
 * InflationDistribution defines the distribution in which inflation is
 * allocated through minting on each epoch (staking, incentives, community). It
 * excludes the team vesting distribution, as this is minted once at genesis.
 * The initial InflationDistribution can be calculated from the Evmos Token
 * Model like this:
 * mintDistribution1 = distribution1 / (1 - teamVestingDistribution)
 * 0.5333333         = 40%           / (1 - 25%)
 */
export interface InflationDistribution {
  /**
   * staking_rewards defines the proportion of the minted minted_denom that is
   * to be allocated as staking rewards
   */
  stakingRewards: string;
  /**
   * Deprecated: usage_incentives defines the proportion of the minted minted_denom that is
   * to be allocated to the incentives module address
   */
  /** @deprecated */
  usageIncentives: string;
  /**
   * community_pool defines the proportion of the minted minted_denom that is to
   * be allocated to the community pool
   */
  communityPool: string;
}
/**
 * ExponentialCalculation holds factors to calculate exponential inflation on
 * each period. Calculation reference:
 * periodProvision = exponentialDecay       *  bondingIncentive
 * f(x)            = (a * (1 - r) ^ x + c)  *  (1 + max_variance - bondedRatio *
 * (max_variance / bonding_target))
 */
export interface ExponentialCalculation {
  /** a defines the initial value */
  a: string;
  /** r defines the reduction factor */
  r: string;
  /** c defines the parameter for long term inflation */
  c: string;
  /** bonding_target */
  bondingTarget: string;
  /** max_variance */
  maxVariance: string;
}
function createBaseInflationDistribution(): InflationDistribution {
  return {
    stakingRewards: "",
    usageIncentives: "",
    communityPool: "",
  };
}
export const InflationDistribution = {
  typeUrl: "/evmos.inflation.v1.InflationDistribution",
  encode(message: InflationDistribution, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stakingRewards !== "") {
      writer.uint32(10).string(message.stakingRewards);
    }
    if (message.usageIncentives !== "") {
      writer.uint32(18).string(message.usageIncentives);
    }
    if (message.communityPool !== "") {
      writer.uint32(26).string(message.communityPool);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): InflationDistribution {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInflationDistribution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stakingRewards = reader.string();
          break;
        case 2:
          message.usageIncentives = reader.string();
          break;
        case 3:
          message.communityPool = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): InflationDistribution {
    const obj = createBaseInflationDistribution();
    if (isSet(object.stakingRewards)) obj.stakingRewards = String(object.stakingRewards);
    if (isSet(object.usageIncentives)) obj.usageIncentives = String(object.usageIncentives);
    if (isSet(object.communityPool)) obj.communityPool = String(object.communityPool);
    return obj;
  },
  toJSON(message: InflationDistribution): unknown {
    const obj: any = {};
    message.stakingRewards !== undefined && (obj.stakingRewards = message.stakingRewards);
    message.usageIncentives !== undefined && (obj.usageIncentives = message.usageIncentives);
    message.communityPool !== undefined && (obj.communityPool = message.communityPool);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<InflationDistribution>, I>>(object: I): InflationDistribution {
    const message = createBaseInflationDistribution();
    message.stakingRewards = object.stakingRewards ?? "";
    message.usageIncentives = object.usageIncentives ?? "";
    message.communityPool = object.communityPool ?? "";
    return message;
  },
};
function createBaseExponentialCalculation(): ExponentialCalculation {
  return {
    a: "",
    r: "",
    c: "",
    bondingTarget: "",
    maxVariance: "",
  };
}
export const ExponentialCalculation = {
  typeUrl: "/evmos.inflation.v1.ExponentialCalculation",
  encode(message: ExponentialCalculation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.a !== "") {
      writer.uint32(10).string(message.a);
    }
    if (message.r !== "") {
      writer.uint32(18).string(message.r);
    }
    if (message.c !== "") {
      writer.uint32(26).string(message.c);
    }
    if (message.bondingTarget !== "") {
      writer.uint32(34).string(message.bondingTarget);
    }
    if (message.maxVariance !== "") {
      writer.uint32(42).string(message.maxVariance);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ExponentialCalculation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExponentialCalculation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.string();
          break;
        case 2:
          message.r = reader.string();
          break;
        case 3:
          message.c = reader.string();
          break;
        case 4:
          message.bondingTarget = reader.string();
          break;
        case 5:
          message.maxVariance = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ExponentialCalculation {
    const obj = createBaseExponentialCalculation();
    if (isSet(object.a)) obj.a = String(object.a);
    if (isSet(object.r)) obj.r = String(object.r);
    if (isSet(object.c)) obj.c = String(object.c);
    if (isSet(object.bondingTarget)) obj.bondingTarget = String(object.bondingTarget);
    if (isSet(object.maxVariance)) obj.maxVariance = String(object.maxVariance);
    return obj;
  },
  toJSON(message: ExponentialCalculation): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a);
    message.r !== undefined && (obj.r = message.r);
    message.c !== undefined && (obj.c = message.c);
    message.bondingTarget !== undefined && (obj.bondingTarget = message.bondingTarget);
    message.maxVariance !== undefined && (obj.maxVariance = message.maxVariance);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ExponentialCalculation>, I>>(object: I): ExponentialCalculation {
    const message = createBaseExponentialCalculation();
    message.a = object.a ?? "";
    message.r = object.r ?? "";
    message.c = object.c ?? "";
    message.bondingTarget = object.bondingTarget ?? "";
    message.maxVariance = object.maxVariance ?? "";
    return message;
  },
};
