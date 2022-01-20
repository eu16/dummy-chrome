## Features

- [x] Create/Import the wallet with email or Metamask
- [x] Deposit with the QR code.
- [x] Switch the network to Mainnet, Testnet or Localnet.
- [x] Export private key
- [x] View transaction history.
- [x] Provide the api for signing the transaction
- [x] Lock the wallet with the 4/6 digits PIN Code
- [x] Auto lock the wallet after timeout
- [x] Set the pin code, pin digits and lock timer on the settings
- [x] Withdraw and Transfer between Eurus and Ethereum account
- [x] View the token balances on the main page
- [x] Runs as a web extension for Chrome and Firefox

## Development

- Install [node.js](https://nodejs.org/) and npm
- Install dependencies :
  ```
  npm install
  ```
- Run the project :
  ```
  npm run dev
  ```
- Go to Chrome Extensions page and activate the Developer Mode.
- Click `Load Unpacked` button and point it to `/dist` folder, the extension will be autoreloading as you change the codes.

## Build Extension

- Install [node.js](https://nodejs.org/) and npm.
- Install dependencies :
  ```
  npm install
  ```
- Build the project :
  ```
  npm run build
  ```
- Uncompressed build can be found in `/dist` folder, compressed build is `onewallet.zip`.
- Go to Chrome Extensions page and activate the Developer Mode.
- Click `Load Unpacked` button and point it to `/dist` folder.

---