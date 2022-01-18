import { ethers } from 'ethers';
import { uuidv4 } from './index';
import { getEurusApiUrl } from './network';

const { ethereum } = window;


export async function getAccount() {
    return ethereum.request({ method: 'eth_requestAccounts' })
}

export async function personalSign(walletAddress, message) {
    let signature = '';
    try {
        const ethResult = await ethereum.request({
            method: 'personal_sign',
            params: [walletAddress, message],
        })
        signature = ethResult;
    } catch (err) {
        console.error('#### sign err: ', err);
    }
    return signature;
}

export function generateWallet(serect, mnemonic = '') {
    let mnemonic2 = process.env.VUE_APP_LOGIN_MNEMONIC;
    var path = "m/44'/60'/0'/0/0";
    if (mnemonic != '') {
        mnemonic2 = mnemonic;
        path = "m/44'/60'/1'/0/0";
    }
    let mnemonicWallet2 = ethers.utils.HDNode.fromMnemonic(mnemonic2, serect);
    mnemonicWallet2 = mnemonicWallet2.derivePath(path);

    let wallet = {
        walletAddress: mnemonicWallet2.address,
        privateKey: mnemonicWallet2.privateKey,
        publicKey: mnemonicWallet2.publicKey
    }
    return wallet;
}

export async function importWallet(inputWalletAddress) {
    let url = getEurusApiUrl() + '/user/importWallet';
    const nonce = uuidv4();
    const ts = Date.now();
    const deviceId = "";
    const walletAddress = inputWalletAddress.toLowerCase().substring(2);
    const message = 'deviceId=' + deviceId + '&timestamp=' + ts + '&walletAddress=' + walletAddress;
    // const messageHash = EthCrypto.hash.keccak256(message);
    // let signature = await sign(inputWalletAddress, messageHash);

    const rpcUrl = getSideChainNetworks().url;
    const web3Utils = (new Web3(rpcUrl)).utils;
    const initialBuffer = Buffer.from(web3Utils.hexToBytes(web3Utils.utf8ToHex(message), 'hex'));
    const preamble = Buffer.from(`\x19Ethereum Signed Message:\n${initialBuffer.length}`);
    const messageBuffer = Buffer.concat([preamble, initialBuffer]);
    const messageHash = web3Utils.sha3(messageBuffer);

    let signature = await personalSign(inputWalletAddress, message);

    let publicKey = '';
    if (signature) {
        const recoverPublicKey = EthCrypto.recoverPublicKey(
            signature, // signature
            messageHash // message hash
        );
        publicKey = EthCrypto.publicKey.compress(recoverPublicKey)
        signature = signature.substring(2, 130);
    }
    let body = {
        "nonce": nonce,
        "timestamp": ts,
        "walletAddress": walletAddress,
        "publicKey": publicKey,
        "deviceId": "",
        "sign": signature,
        "isPersonalSign": true,
    };

    const headers = {
        "Content-Type": "application/json",
    };

    return axios.post(url, body, { headers: headers });
}


