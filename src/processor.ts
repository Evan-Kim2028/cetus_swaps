import { pool as cetus} from "./types/sui/cetus_factory.js";
import { factory } from "./types/sui/cetus_factory.js"; 

import {MoveFetchConfig } from '@sentio/protos'

const fetchConfig: MoveFetchConfig = {
  resourceChanges: true,
  allEvents: true,
  inputs: true
}

// cetus swaps
cetus.bind().onEventSwapEvent((event, ctx) => {
  ctx.eventLogger.emit("single_swap_event", {
    protocol: "cetus",
    protocol_version: "v1",
    pool_id: event.data_decoded.pool || null,
    sender: event.sender,
    coin_in: null,
    coin_out: null,
    amount_in: event.data_decoded.amount_in,
    amount_out: event.data_decoded.amount_out,
    a_to_b: event.data_decoded.atob || null,
    fee_amount: event.data_decoded.fee_amount ?? null,

    // Gas usage
    storage_cost: ctx.transaction.effects?.gasUsed.storageCost,
    gas_computation: ctx.transaction.effects?.gasUsed.computationCost,
    nonrefundable_storage_fee:
      ctx.transaction.effects?.gasUsed.nonRefundableStorageFee,
    storage_rebate: ctx.transaction.effects?.gasUsed.storageRebate,
  });
}, fetchConfig);

// pool info
  // cetus factory events
  factory.bind()
  .onEventCreatePoolEvent((event, ctx) => {
      console.log("[Cetus Factory] CreatePoolEvent triggered:", event);

      ctx.eventLogger.emit("cetus4_create_pool_event", { 
          pool_id: event.data_decoded.pool_id,
          coin_type_a: event.data_decoded.coin_type_a,
          coin_type_b: event.data_decoded.coin_type_b,
          tick_spacing: event.data_decoded.tick_spacing,
          sender: event.sender,
          storage_cost: ctx.transaction.effects?.gasUsed.storageCost,
          gas_computation: ctx.transaction.effects?.gasUsed.computationCost,
          nonrefundable_storage_fee: ctx.transaction.effects?.gasUsed.nonRefundableStorageFee,
          storage_rebate: ctx.transaction.effects?.gasUsed.storageRebate,
          event_sequence: ctx.eventIndex
      });
  }, fetchConfig)

