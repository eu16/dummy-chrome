import store from "/src/popup/store"
import VueCookies from 'vue-cookies'
import cryptoJS from 'crypto-js';

const Locale = 'locale'
const Tokenkey = 'token'
const TokenTimestampKey = 'tokenTimestamp'
const EurusDeviceObjects = 'EurusDeviceObjects'
const deviceObjectsAesKey = process.env.VUE_APP_DEVICE_OBJECT_AES_KEY

export function getAppVersion() {
    return '1.0.1'
}

export function setName() {
    return sessionStorage.setItem(Username, 'testing')
}

export function getName() {
    return sessionStorage.getItem(Username)
}

export function clearName() {
    return sessionStorage.removeItem(Username)
}

export function setDontShowRewardDialog(bol) {
    return sessionStorage.setItem(showRewardBol, bol)
}

export function showRewardSchemeBol() {
    return sessionStorage.getItem(showRewardBol)
}

export function setToken(token) {
    const tokenUpdatedTimestamp = Date.now()
    setTokenTimestamp(tokenUpdatedTimestamp)
    return VueCookies.set(Tokenkey, token)
}

export function getToken() {
    return VueCookies.get(Tokenkey)
}

export function clearToken() {
    clearTokenTimestamp()
    return VueCookies.remove(Tokenkey)
}

function setTokenTimestamp(tokenTimestamp) {
    return VueCookies.set(TokenTimestampKey, tokenTimestamp)
}

export function getTokenTimestamp() {
    return VueCookies.get(TokenTimestampKey)
}

export function clearTokenTimestamp() {
    return VueCookies.remove(TokenTimestampKey)
}

export function getLocale() {
    return VueCookies.get(Locale)
}

export function setLocale(locale) {
    return VueCookies.set(Locale, locale)
}

export function setAccounttype(type) {
    // checkScheme()
        // sessionStorage.setItem("walletype", type)
    return store.dispatch('walletType', type)
}

export function getAccounttype() {
    // sessionStorage.getItem("walletype")
    return store.state.wallets.walletype
}


export function setNetwork(type) {
    return store.dispatch("network", type)
}

export function getNetwork() {
    return store.state.wallets.network
}

export function setAddress(address) {
    if (getAddress() && getAddress() != '' && getAddress() != address) {
        store.dispatch('txnMainNet', {})
        store.dispatch('txnSideChain', {})
        store.dispatch('txnDetails', { mainnet: {}, sidechain: {} });

        store.dispatch('mainNet', {})
        store.dispatch('sideChain', {})

        // store.dispatch("setFavouriteAddressList", [])
    }
    return store.dispatch("address", address)
}

export function getAddress() {
    return store.state.wallets.address
}

export function setEurusUserDepositAddress(eurusUserDepositAddress) {
    return store.dispatch("setEurusUserDepositAddress", eurusUserDepositAddress)
}

export function getEurusUserDepositAddress() {
    return store.state.assets.eurusUserDepositAddress
}

export function setPlatformWalletAddress(platformWalletAddress) {
    return store.dispatch("setPlatformWalletAddress", platformWalletAddress)
}

export function getPlatformWalletAddress() {
    return store.state.assets.platformWalletAddress
}

export function setTokenAddressList(list) {
    return store.dispatch("setTokenAddressList", list)
}

export function getTokenAddressList() {
    return store.state.assets.tokenAddressList
}

export function setFavouriteAddressList(list) {
    return store.dispatch("setFavouriteAddressList", list)
}

export function getFavouriteAddressList() {
    return store.state.assets.favouriteAddressList
}

export function setAssetList(network, data) {
    if (network === "mainnet") {
        return store.dispatch('mainNet', data)
    } else if (network === "sidechain") {
        return store.dispatch('sideChain', data)
    }
}

export function getAssetList(network) {
    return store.state.assets[network]
}

export function getAssetDetails(network, currencyCode) {
    return store.state.assets[network][currencyCode]
}

export function setHideAmount(data) {
    return store.dispatch('hideAmount', data)
}

export function getHideAmount() {
    return store.state.global.hideAmount;
}

export function setPendingConfirmationTxn(data) {
    return store.dispatch('setPendingConfirmationTxn', data)
}

export function getPendingConfirmationTxn() {
    return store.state.transactions.pendingConfirmationTxn;
}

// export function setSubmittedAllDocs(data) {
//     return store.dispatch('submittedAllDocs', data)
// }

// export function getSubmittedAllDocs() {
//     return store.state.global.submittedAllDocs;
// }

export function setTxnHistory(network, data) {
    let txnHistory = store.state.transactions[network];
    let aaa = { txn_id: data.txn_id, date: data.date };
    if (txnHistory[data.currencyCode] == undefined) {
        txnHistory[data.currencyCode] = [aaa];
    } else {
        // check exist
        const found = txnHistory[data.currencyCode].some(el => el.txn_id === data.txn_id);
        if (!found) {
            txnHistory[data.currencyCode].push(aaa);

            // sort
            txnHistory[data.currencyCode].sort(function(a, b) {
                return b.date - a.date;
            });
        }
    }
    setTxnDetails(network, data);
    if (network === "mainnet") {
        return store.dispatch('txnMainNet', txnHistory)
    } else if (network === "sidechain") {
        return store.dispatch('txnSideChain', txnHistory)
    }
}

export function getTxnHistory(network) {
    return store.state.transactions[network]
}

export function getTxnDetails(network, txn_id) {
    return store.state.transactions.txnDetails[network][txn_id];
}

export function setTxnDetails(network, data) {
    let old = store.state.transactions.txnDetails;
    old[network][data.txn_id] = data;
    return store.dispatch('txnDetails', old);
}

export function timestampToDateString(timestamp) {
    var current_datetime = new Date(timestamp);
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1).toString().padStart(2, '0') +
        "-" +
        current_datetime.getDate().toString().padStart(2, '0') +
        " " +
        current_datetime.getHours().toString().padStart(2, '0') +
        ":" +
        current_datetime.getMinutes().toString().padStart(2, '0');
    return formatted_date;
}

export function setFaucetList(list) {
    return store.dispatch("setFaucetList", list)
}

export function getFaucetList() {
    return store.state.assets.faucetList;
}

export function setGasTooLowAlertMsgNotShowAgain(showBol) {
    return store.dispatch("setGasTooLowAlertMsgNotShowAgain", showBol)
}

export function getGasTooLowAlertMsgNotShowAgain() {
    return store.state.assets.gasTooLowAlertMsgNotShowAgain;
}

export function setAssetAllocationAlertMsgNotShowAgain(address) {
    return store.dispatch('setAssetAllocationAlertMsgNotShowAgain', address)
}

export function getAssetAllocationAlertMsgNotShowAgain() {
    return store.state.assets.assetAllocationAlertMsgNotShowAgain;
}

export function setMainnetWalletAddress(address) {
    return store.dispatch('setMainnetWalletAddress', address)
}

export function getMainnetWalletAddress() {
    return store.state.wallets.mainnetWalletAddress
}

export function setOwnerWalletAddress(address) {
    return store.dispatch('setOwnerWalletAddress', address)
}

export function getOwnerWalletAddress() {
    return store.state.wallets.ownerWalletAddress
}

export function setOwnerWalletMnemonic(mnemonic) {
    return store.dispatch('setOwnerWalletMnemonic', mnemonic)
}

export function getOwnerWalletMnemonic() {
    return store.state.wallets.ownerWalletMnemonic
}

export function setEmail(email) {
    return store.dispatch('setEmail', email.toLowerCase())
}

export function getEmail() {
    return store.state.wallets.email
}

export function setUserId(userId) {
    return store.dispatch('setUserId', userId)
}

export function getUserId() {
    return store.state.wallets.userId
}

export function addPendingMoveGasTx(pendingMoveGasTx) {
    console.log("addPendingMoveGasTx pendingMoveGasTx:", pendingMoveGasTx)
        // return store.dispatch('setUserId', userId)
}

export function getPendingMoveGasTx() {
    // return store.state.wallet.userId
}

export function clearLocalStorage() {
    store.dispatch('assetsResetState')
    store.dispatch('globalResetState')
    store.dispatch('txnResetState')
    store.dispatch('walletResetState')
}

export function clearAll() {
    // removeEurusObject();
    clearSessionStorage();
    clearToken();
    setAccounttype("centralized");
    // checkScheme()
}

export function createEurusDeviceObject(email = "") {
    let _email = 'default';
    if (email) {
        _email = email;
    } else if (getEmail()) {
        _email = getEmail();
    }
    let eurusObject = createEurusObjectByEmail(_email);
    return eurusObject;
}

export function getEurusDeviceId(email = "") {
    let _email = 'default';
    if (email) {
        _email = email;
    } else if (getEmail()) {
        _email = getEmail();
    }
    let eurusObject = getEurusObjectByEmail(_email);
    return (eurusObject && eurusObject.deviceId ? eurusObject.deviceId : "");
}

export function getEurusPrivateKey() {
    let email = 'default';
    if (getEmail()) {
        email = getEmail();
    }
    let eurusObject = getEurusObjectByEmail(email);
    return (eurusObject && eurusObject.privateKey ? eurusObject.privateKey : "");
}

export function getEurusPublicKey() {
    let email = 'default';
    if (getEmail()) {
        email = getEmail();
    }
    let eurusObject = getEurusObjectByEmail(email);
    return (eurusObject && eurusObject.publicKey ? eurusObject.publicKey : "");
}

export function removeEurusObject(email = "") {
    let _email = "";
    if (email) {
        _email = email;
    } else if (getEmail()) {
        _email = getEmail();
    }
    if (_email) {
        let eurusObjects = getEurusAllObjects();
        if (eurusObjects[_email]) {
            delete eurusObjects[_email];
            setEurusAllObjects(eurusObjects)
        }
    }
}

export function removeEurusAllObjects() {
    localStorage.removeItem(EurusDeviceObjects);
}

function createEurusObjectByEmail(email) {
    let eurusObjects = getEurusAllObjects();
    if (eurusObjects[email] &&
        eurusObjects[email].deviceId &&
        eurusObjects[email].privateKey &&
        eurusObjects[email].publicKey) {
        return eurusObjects[email];
    } else {
        let rsaKeys = generateRsaKeys();
        let eurusObject = {
            deviceId: getDeviceId(),
            privateKey: rsaKeys.privateKey,
            publicKey: rsaKeys.publicKey,
        }
        eurusObjects[email] = eurusObject;
        setEurusAllObjects(eurusObjects);
        return eurusObject
    }
}

function getEurusObjectByEmail(email) {
    let eurusObjects = getEurusAllObjects();
    if (eurusObjects[email] &&
        eurusObjects[email].deviceId &&
        eurusObjects[email].privateKey &&
        eurusObjects[email].publicKey) {
        return eurusObjects[email];
    } else {
        return null;
    }
}

function getEurusAllObjects() {
    try {
        var eurusObjectStr = localStorage.getItem(EurusDeviceObjects);
        if (eurusObjectStr && deviceObjectsAesKey) {
            var decrypted = cryptoJS.AES.decrypt(eurusObjectStr, deviceObjectsAesKey);
            eurusObjectStr = cryptoJS.enc.Utf8.stringify(decrypted);
        }
        if (!eurusObjectStr) {
            eurusObjectStr = "{}"
        }
        var eurusObject = JSON.parse(eurusObjectStr);
        if (typeof eurusObject === 'object' && eurusObject) {
            return eurusObject;
        }
    } catch (error) {
        console.error("getEurusAllObjects error:", error);
        setEurusAllObjects({});
    }
    return {};
}

function setEurusAllObjects(eurusObject) {
    if (typeof eurusObject === 'object' && eurusObject) {
        let eurusObjectStr = JSON.stringify(eurusObject);
        if (deviceObjectsAesKey) {
            var encrypted = cryptoJS.AES.encrypt(eurusObjectStr, deviceObjectsAesKey);
            eurusObjectStr = encrypted.toString();
        }
        localStorage.setItem(EurusDeviceObjects, eurusObjectStr);
    }
}


