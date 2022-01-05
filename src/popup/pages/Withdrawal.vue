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
import { mapState } from "vuex";
import moment from "moment-timezone";
import helper from "mixins/helper";
import { Unit } from "@harmony-js/utils";
import {
  getTransfers,
  getNetworkLink,
  getTransactionCount,
  removeDups,
  getHarmony,
} from "services/AccountService";
import { decodeInput } from "services/Hrc20Service";
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
    // token: {
    //   "EUN": 'EUN',
    //   "ETH": "ETH"
    // }
  }),

  // computed: mapState({
  //   address: (state) => state.wallets.active.address,
  //   history: (state) => state.account.history,
  // }),

  // async mounted() {
  //   this.$store.commit("loading", true);
  //   await this.loadHistory();
  // },

  // methods: {
  //   async pushHistory(transactions) {
  //     let txns = [];
  //     for (const txn of removeDups(transactions)) {
  //       const params = await decodeInput(txn.to, txn.input);
  //       const result = {
  //         from: txn.from,
  //         to: params ? params.to : txn.to,
  //         amount: params
  //           ? params.amount
  //           : new Unit(txn.value)
  //               .asWei()
  //               .toEther()
  //               .toString(),
  //         hash: txn.hash,
  //         symbol: params ? params.symbol : "ONE",
  //         timestamp: txn.timestamp,
  //         shardID: txn.shardID,
  //         toShardID: txn.toShardID,
  //       };
  //       txns.push(result);
  //     }
  //     this.$store.commit("account/pushHistory", txns);
  //   },
  //   async loadHistory() {
  //     this.$store.commit("account/initHistory");
  //     this.txCount = await getTransactionCount(this.address);
  //     this.page = 0;
  //     const transfersData = await getTransfers(
  //       this.address,
  //       this.page,
  //       this.limit
  //     );
  //     await this.pushHistory(transfersData.transactions);
  //     this.$store.commit("loading", false);
  //   },

  //   async loadMore(e) {
  //     e.preventDefault();
  //     this.loadMoreLoading = true;
  //     this.page += 1;
  //     const transfersData = await getTransfers(
  //       this.address,
  //       this.page,
  //       this.limit
  //     );
  //     await this.pushHistory(transfersData.transactions);
  //     // BUG: hmy_getTransactionCount does not return correct count, so use this to stop showing "LOAD MORE"
  //     if (transfersData.transactions.length == 0) {
  //       this.txCount = this.history.length;
  //       //console.log(this.txCount, this.history.length);
  //     }

  //     this.loadMoreLoading = false;
  //   },

  //   async refreshHistory() {
  //     this.$store.commit("loading", true);
  //     await this.loadHistory();
  //   },

  //   getTransferLink(hash) {
  //     const path = "/tx/" + hash;

  //     return getNetworkLink(path);
  //   },

  //   isOutgoingTransfer(transfer) {
  //     return transfer.from === this.address;
  //   },

  //   formatTimestamp(timestamp) {
  //     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //     return moment(timestamp)
  //       .tz(timezone)
  //       .format("MM/DD/YYYY HH:mm:ss z");
  //   },
  //   formatTokenAmount(transfer) {
  //     return transfer.amount + " " + transfer.symbol;
  //   },
  //   formatShard(transfer) {
  //     return (
  //       "Shard " +
  //       transfer.shardID.toString() +
  //       " to Shard " +
  //       transfer.toShardID.toString()
  //     );
  //   },
  // },
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
