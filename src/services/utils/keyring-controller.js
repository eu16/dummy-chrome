import KeyringController from 'eth-keyring-controller';
import { ObservableStore } from '@metamask/obs-store';
const passworder = require('browser-passworder');

export function keyringControllerFunction (initState) {
    const keyringController =  new KeyringController ({
        initState: initState
    })
    this.store = new ObservableStore(keyringController)
    this.memStore = new ObservableStore({

    })
}

