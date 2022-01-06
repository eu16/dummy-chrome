<template>
  <div>
    <app-header subtitle="send withdrawals" />
    <main class="main">
      <!-- <div v-if="history.length === 0" class="message-empty">
        Withdrawal
      </div> -->
      <div :class="{ row: !isToken }">
            <label class="input-label" :class="{ recipient: !isToken }">
              Wallet Address/Email
              <input
                class="input-field"
                type="text"
                name="address"
                ref="address"
                placeholder="Wallet Address or Email"
                v-model="recipient"
                style="width:340px"
              />
            </label>
            <!-- <label v-if="!isToken" class="input-label shard" :class="{ disabled: isHRCToken }">
              To Shard
              <select class="input-field" v-model="toShard" :disabled="isHRCToken">
                <option v-for="shard in account.shardArray" :key="shard.shardID" :value="shard.shardID">{{
                  shard.shardID
                }}</option>
              </select>
            </label> -->
          </div>
          <div :class="{ row: !isToken }">
            <label class="input-label" :class="{ amount: !isToken }">
              Amount
              <input
                class="input-field"
                type="number"
                name="amount"
                ref="amount"
                step="any"
                placeholder="Amount"
                v-model="amount"
                v-on:keyup.enter="showConfirmDialog"
                style="width:246px"
              />
              <div class="maximum-label" v-show="!loading" @click="setMaxBalance">
                Maximum: 0.00000000 EUN
                <!-- Maximum: {{ getMaxBalance + " " + selectedToken.symbol }} -->
              </div>
            </label>
            <label v-if="!isToken" class="input-label token">
              Token
              <select class="input-field" style="width:82px">
                <option value="" selected>EUN</option>
              </select>
            </label>
          </div>
          <div class="row">
            <label class="input-label gas-price">
              Gas Price
              <input
                class="input-field"
                type="number"
                name="gasprice"
                ref="gasprice"
                placeholder="Gas Price"
                v-model="gasPrice"
                step="any"
              />
            </label>
            <label class="input-label gas-limit">
              Gas Limit
              <input
                class="input-field"
                type="number"
                name="gaslimit"
                ref="gaslimit"
                v-model="gasLimit"
                placeholder="Gas Limit"
              />
            </label>
            <label class="input-label gas-one">
              Gas Fee
              <input class="input-field" type="text" name="gasfee" ref="gasfee" readonly  value="0.000025 e" />
            </label>
          </div>
          <button class="primary flex" type="submit">Send</button>
    </main>
  </div>
</template>

<script>
import helper from "mixins/helper";
import ExternalLink from "components/ExternalLink.vue";

export default {
  mixins: [helper],
  components: {
    ExternalLink,
  },

  data: () => ({
    limit: 8,
    txCount: 1,
    page: 0,
    loadMoreLoading: true,
  }),
};
</script>

<style>
.maximum-label {
  color: red;
  font-size: 12px;
  font-style: italic;
  margin-top: 3px;
  margin-left: 5px;
}
</style>
