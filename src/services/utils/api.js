import store from '/src/popup/store'
import ethCrypto from "eth-crypto";
import axios from "axios";
import {
    getEurusApiUrl
} from "./network"
import {
    createEurusDeviceObject,
    getEurusDeviceId
} from "./auth"

const eurusApiUrl = getEurusApiUrl();


export async function registerByEmail(email, loginPassword) {
    let result = null;
    createEurusDeviceObject(email);
    if (getEurusDeviceId(email)) {
        try {
            let loginWallet = generateWallet(email + loginPassword);
            const walletAddress = loginWallet.walletAddress
                .substring(2)
                .toLowerCase();
            const publicKey = loginWallet.publicKey.substring(2).toLowerCase();
            const privateKey = loginWallet.privateKey.toLowerCase();

            const nonce = uuidv4();
            const ts = Date.now();
            const deviceId = getEurusDeviceId(email);
            const message =
                "deviceId=" +
                deviceId +
                "&timestamp=" +
                ts +
                "&walletAddress=" +
                walletAddress;
            const messageHash = ethCrypto.hash.keccak256(message).substring(2);

            const signature = ethCrypto.sign(
                privateKey, // privateKey
                messageHash // hash of message
            );
            const signature2 = signature.substring(2, 130);
            var request = {
                nonce: nonce,
                timestamp: ts,
                deviceId: deviceId,
                email: email,
                loginAddress: walletAddress,
                signature: signature2,
                publicKey: publicKey,
            };

            let url = eurusApiUrl + "/user/registerByEmail";
            const headers = {
                "Content-Type": "application/json",
            };
            let response = await axios.post(url, request, {
                headers: headers
            });
            if (response && response.status === 200) {
                if (response.data) {
                    let data = response.data;
                    result = data;
                }
            } else if (response && response.status === 404) {
                result = {
                    result: false,
                    isServerMaintenance: true
                };
            }
        } catch (error) {
            console.error("registerByEmail error:", error);
            if (error && error.response && error.response.status === 404) {
                result = {
                    result: false,
                    isServerMaintenance: true
                };
            }
        }
    }
    return result;
}


export async function loginBySignature(email, loginPassword) {
    let result = null;
    // createEurusDeviceObject(email);
    console.log("trying")
    if (getEurusDeviceId(email)) {
        try {
            console.log("tried")
            let loginWallet = generateWallet(email + loginPassword);
            const walletAddress = loginWallet.walletAddress
                .substring(2)
                .toLowerCase();
            const publicKey = loginWallet.publicKey.substring(2).toLowerCase();
            const privateKey = loginWallet.privateKey.toLowerCase();

            const nonce = uuidv4();
            const ts = Date.now();
            const deviceId = getEurusDeviceId(email);
            const message =
                "deviceId=" +
                deviceId +
                "&timestamp=" +
                ts +
                "&walletAddress=" +
                walletAddress;
            const messageHash = ethCrypto.hash.keccak256(message).substring(2);

            const signature = ethCrypto.sign(
                privateKey, // privateKey
                messageHash // hash of message
            );
            const signature2 = signature.substring(2, 130);

            var request = {
                nonce: nonce,
                timestamp: ts,
                deviceId: deviceId,
                walletAddress: walletAddress,
                sign: signature2,
                publicKey: publicKey,
            };

            let url = eurusApiUrl + "/user/loginBySignature";
            const headers = {
                "Content-Type": "application/json",
            };
            let response = await axios.post(url, request, {
                headers: headers
            });
            console.log("response", response)
            if (response && response.status === 200) {
                if (response.data) {
                    let data = response.data;
                    result = data;
                }
            } else if (response && response.status === 404) {
                result = {
                    result: false,
                    isServerMaintenance: true
                };
            }
        } catch (error) {
            console.error("loginBySignature error:", error);
            if (error && error.response && error.response.status === 404) {
                result = {
                    result: false,
                    isServerMaintenance: true
                };
            }
        }
    }
    return result;
}