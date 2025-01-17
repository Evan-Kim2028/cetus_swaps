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
  ctx.eventLogger.emit("cetus_swap_event", {
      atob: event.data_decoded.atob,
      pool: event.data_decoded.pool,
      partner: event.data_decoded.partner,
      amount_in: event.data_decoded.amount_in,
      amount_out: event.data_decoded.amount_out,
      ref_amount: event.data_decoded.ref_amount,
      fee_amount: event.data_decoded.fee_amount,
      vault_a_amount: event.data_decoded.vault_a_amount,
      vault_b_amount: event.data_decoded.vault_b_amount,
      before_sqrt_price: event.data_decoded.before_sqrt_price,
      after_sqrt_price: event.data_decoded.after_sqrt_price,
      steps: event.data_decoded.steps,
      sender: event.sender,
      storage_cost: ctx.transaction.effects?.gasUsed.storageCost,
      gas_computation: ctx.transaction.effects?.gasUsed.computationCost,
      nonrefundable_storage_fee: ctx.transaction.effects?.gasUsed.nonRefundableStorageFee,
      storage_rebate: ctx.transaction.effects?.gasUsed.storageRebate
  })
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

