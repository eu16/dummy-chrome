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
import { generateWallet } from './web3';
import { uuidv4 } from './index'

// const eurusApiUrl = getEurusApiUrl();
const eurusApiUrl = "http://besudevapi.eurus.network:80";


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
    // if (getEurusDeviceId(email)) {
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
            if (response && response.status === 200) {
                if (response.data) {
                    console.log(response.data)
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
    // }
    return result;
}

export async function forgotLoginPassword(email) {
    let result = null;
    try {
        const nonce = uuidv4();
        var request = {
            nonce: nonce,
            email: email,
        };
        let url = eurusApiUrl + "/user/forgetLoginPassword";
        const headers = {
            "Content-Type": "application/json",
        };
        let response = await axios.post(url, request, { headers: headers });
        if (response && response.status === 200) {
            if (response.data) {
                result = response.data;
            }
        }
    } catch (error) {
        console.error(error);
    }
    return result;
}

export async function verification(email, code, publicKey) {
    let result = null;
    if (getEurusDeviceId(email)) {
        const deviceId = getEurusDeviceId(email);
        try {
            const nonce = uuidv4();
            var request = {
                nonce: nonce,
                email: email,
                code: code,
                deviceId: deviceId,
                publicKey: publicKey,
            };

            let url = eurusApiUrl + "/user/verification";
            const headers = {
                "Content-Type": "application/json",
            };
            let response = await axios.post(url, request, { headers: headers });
            if (response && response.status === 200) {
                if (response.data) {
                    let data = response.data;
                    result = data;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    return result;
}

export async function verifyForgetLoginPassword(email, code) {
    let result = null;
    try {
        const nonce = uuidv4();
        var request = {
            nonce: nonce,
            email: email,
            code: code,
        };

        let url = eurusApiUrl + "/user/verifyForgetLoginPassword";
        const headers = {
            "Content-Type": "application/json",
        };
        let response = await axios.post(url, request, { headers: headers });
        if (response && response.status === 200) {
            if (response.data) {
                let data = response.data;
                result = data;
            }
        }
    } catch (error) {
        console.error(error);
    }
    return result;
}

export async function resetLoginPassword(token, email, loginPassword) {
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
                sign: signature2,
                publicKey: publicKey,
            };

            let url = eurusApiUrl + "/user/resetLoginPassword";
            const headers = {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            };
            let response = await axios.post(url, request, { headers: headers });
            if (response && response.status === 200) {
                if (response.data) {
                    result = {
                        result: true
                    };
                }
            } else if (response && response.status === 404) {
                result = {
                    result: false, 
                    isServerMaintenance: true
                };
            }
        } catch (error) {
            console.error("resetLoginPassword error:", error);
            if (error && error.response && error.response.status === 404){
                result = {
                    result: false, 
                    isServerMaintenance: true
                };
            }
        }
    }
    return result;
}

export async function forgetPaymentPassword() {
    let result = null;
    try {
        const nonce = uuidv4();
        var request = {
            nonce: nonce,
        };

        let url = eurusApiUrl + "/user/forgetPaymentPassword";
        const headers = {
            Authorization: "Bearer " + getToken(),
            "Content-Type": "application/json",
        };
        let response = await axios.post(url, request, { headers: headers });
        if (response && response.status === 200) {
            if (response.data) {
                let data = response.data;
                result = data;
            }
        }
    } catch (error) {
        console.error(error);
    }
    return result;
}

export async function verifyForgetPaymentPassword(email, code) {
    let result = null;
    try {
        const nonce = uuidv4();
        var request = {
            nonce: nonce,
            code: code,
            deviceId: getEurusDeviceId(email),
        };

        let url = eurusApiUrl + "/user/verifyForgetPaymentPassword";
        const headers = {
            Authorization: "Bearer " + getToken(),
            "Content-Type": "application/json",
        };
        let response = await axios.post(url, request, { headers: headers });
        if (response && response.status === 200) {
            if (response.data) {
                let data = response.data;
                result = data;
            }
        }
    } catch (error) {
        console.error(error);
    }
    return result;
}

export async function resetPaymentPassword(
    token,
    email,
    encryptedMnemonicString,
    newPaymentPassword
) {
    let result = null;
    if (getEurusPrivateKey() && getEurusDeviceId(email)) {
        try {
            let mnemonicString = decryptMnemonic(
                encryptedMnemonicString,
                getEurusPrivateKey()
            );
            let newPaymentWallet = generateWallet(
                email + newPaymentPassword,
                mnemonicString
            );
            const ownerWalletAddress = newPaymentWallet.walletAddress
                .substring(2)
                .toLowerCase();
            const publicKey = newPaymentWallet.publicKey.substring(2).toLowerCase();
            const privateKey = newPaymentWallet.privateKey.toLowerCase();

            const nonce = uuidv4();
            const ts = Date.now();
            const deviceId = getEurusDeviceId(email);

            const message =
                "deviceId=" +
                deviceId +
                "&timestamp=" +
                ts +
                "&walletAddress=" +
                ownerWalletAddress;
            const messageHash = ethCrypto.hash.keccak256(message).substring(2);
            const signature = ethCrypto.sign(privateKey, messageHash);
            const signature2 = signature.substring(2, 130);

            var request = {
                nonce: nonce,
                timestamp: ts,
                deviceId: deviceId,
                ownerWalletAddress: ownerWalletAddress,
                sign: signature2,
                publicKey: publicKey,
            };

            let url = eurusApiUrl + "/user/resetPaymentPassword";
            const headers = {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            };
            let response = await axios.post(url, request, { headers: headers });
            if (response && response.status === 200) {
                result = response.data;
                result.ownerWalletAddress = newPaymentWallet.walletAddress.toLowerCase();
            }
        } catch (error) {
            console.error(error);
        }
    }
    return result;
}

export async function resendVerificationEmail(email, userId) {
    let result = null;
    try {
        const nonce = uuidv4();
        var request = {
            nonce: nonce,
            email: email,
            userId: userId,
        };

        let url = eurusApiUrl + "/user/resendVerificationEmail";
        const headers = {
            "Content-Type": "application/json",
        };
        let response = await axios.post(url, request, { headers: headers });
        if (response && response.status === 200) {
            if (response.data) {
                let data = response.data;
                result = data;
            }
        }
    } catch (error) {
        console.error(error);
    }
    return result;
}

export async function getEmailWalletAddress(receiver) {
    let result = null;
    try {
        const nonce = uuidv4();
        const walletAddress = "";
        var request = {
            nonce: nonce,
            email: receiver,
            walletAddress: walletAddress,
        };

        let url = eurusApiUrl + "/user/findEmailWalletAddress";
        const headers = {
            Authorization: "Bearer " + getToken(),
            "Content-Type": "application/json",
        };
        let response = await axios.post(url, request, { headers: headers });
        if (response && response.status === 200) {
            if (response.data) {
                let data = response.data;
                result = data;
            }
        }
    } catch (error) {
        console.error(error);
    }
    return result;
}

export async function getRecentTransaction(currencyCode, network = 'sidechain') {
    let chainId = getSideChainNetworks().chainId;
    if (network == 'mainnet') {
        chainId = getMainnetNetworks().chainId;
    }
    let url = getEurusApiUrl() + "/user/recentTransaction";
    const nonce = uuidv4();
    let body = {
        nonce: nonce,
        currencySymbol: currencyCode,
        chainId: chainId,
    };
    const headers = {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
    };
    return axios.post(url, body, { headers: headers });
}

export async function getFaucetAssetList() {
    let url = getEurusApiUrl() + "/user/testnet/asset/faucet";
    const headers = {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
    };
    return axios.get(url, { headers: headers });
}

export async function faucetAsset(currencyCode) {
    let url = getEurusApiUrl() + "/user/testnet/asset/faucet/" + currencyCode;
    let body = {};
    const headers = {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
    };
    return axios.post(url, body, { headers: headers });
}
