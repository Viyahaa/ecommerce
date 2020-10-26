[![Netlify Status](https://api.netlify.com/api/v1/badges/4cfbbdc3-e5aa-4187-aaa0-dedd5bd8c6c9/deploy-status)](https://app.netlify.com/sites/blissful-volhard-ce0075/deploys)

# 3Bay

3Bay is a web-based decentralized marketplace built with 3Box + IPFS + web3, using the DAI stablecoin as the medium-of-exchange.

![image](https://user-images.githubusercontent.com/3887694/95544636-09e2ad80-0a3f-11eb-9a02-06864654024e.png)

### Features

- Submarkets => topically themed markets that aggregate similar goods and services
- Offline asynchronous messaging and orders (i.e. you can get messages/orders while you're AFK)
- Store data (i.e. listings, orders, messages) follow your ETH account
- Web and mobile-web accessible

### To do

- [x] Switch some of the public threads to private for production
  - [x] `demo-testnet-receipts-private` => user's purchase history
  - [x] Individual orders
- [ ] Support escrowed payments
- [ ] Generalized chat messaging
- [ ] Custom store name, header image etc
- [x] Prompt for shipping address in purchase flow
- [x] Display shipping address in order message
- [ ] Support layer-2 payments (e.g. optimisic rollup, Loopring, xDAI etc)
- [x] Create About page
- [ ] Submarket directory
- [x] URL paths for stores and listings
- [ ] Integrate [Web3 modal](https://github.com/Web3Modal/web3modal)
- [ ] Make the site more mobile friendly

### Architecture

- 3Bay is built on top of [3Box](https://3box.io), a decentralized user identity and data storage system built with [IPFS](https://ipfs.io/) and [OrbitDB](https://github.com/orbitdb/orbit-db)
  - 3Box leverages popular web3 wallets to create decentralized identity and storage provision over IPFS and OrbitDB, the latter enabling serverless storage and messaging for decentralized applications
  - In short, using a web3 wallet like Metamask allows you to create public and private storage/messaging spaces for your account and for decentralized applications
- 3Bay is using temporary a decentralized storage space during its testing phase: `demo_marketplace`
- Within this space, data as key-value pairs and threads in both public and private spaces.

#### Key-value store

| Key                      |   Type    |                               Description                                |
| :----------------------- | :-------: | :----------------------------------------------------------------------: |
| `storeName`              | `public`  |                         Name of the user's store                         |
| `storeDescription`       | `public`  |                     Description of the user's store                      |
| `testnetReceiptsAddress` | `private` | Address for the _private_ thread containing the user's purchase history. |

#### Threads

| Name                            |   Type    |                                                      Description                                                      |   Write-access   |
| :------------------------------ | :-------: | :-------------------------------------------------------------------------------------------------------------------: | :--------------: |
| `listing_list`                  | `public`  |                                      A _thread_ containing the user's listings.                                       |       User       |
| `inboxTestnet`                  | `public`  | A _thread_ containing message notifications for _private_ threads the user has been added to, created by other users. |       All        |
| `demo-testnet-receipts-private` | `private` |                                  A _thread_ containing the user's purchase history.                                   |       User       |
| `globalListChat`                | `public`  |                     A _thread_ containing the global trollbox chat messages for the marketplace.                      |       All        |
| `_order_[timestamp]`            | `public`  |         A _thread_ containing an individual order's purchase order and messages between the buyer and seller.         | Buyer and seller |

⭐️ Both `demo-orders-public` and <s>`demo-testnet-receipts-public`</s> need to be switched to `private` encrypted threads prior to launch.

⭐️⭐️ Even though anyone can leave you a message in `inboxTestnet`, it must adhere to a specific format that is filtered client-side. The approved format doesn't reveal the message contents, but does publicly display the sender and type of message (order, chat). This isn't an ideal approach from a privacy perspective, but presently there isn't any other way for the user to know they've been added to a thread a public or private thread.

### Ideas

#### Governing DAO for the marketplace

- Membership in DAO based on holding a token
- Tokens are distributed to buyers/sellers interacting via escrow smart contract
- Marketplace takes a transaction fee that goes into DAO treasury
- DAO members vote on spending treasury funds for maintenance of the protocol
  - Treasury can be used to supply liquidity to other DeFi protocols, earning interest pro-rata for DAO members

#### Account receivable market

- Alice is a seller
- Alice makes a sale of \$20 DAI to Bob (the buyer)
- Bob deposits \$20 DAI into the escrow smart contract
- This \$20 DAI, which is an account receivable, isn't released to the Alice until after 30 days
  - Bob has 30 days to dispute the transaction if something goes wrong
- Alice turns around and sells her $20 DAI account receivable for $18 DAI
  - She needs to stake collateral in another stablecoin to do this (e.g \$20 of USDC)
- Charlie comes along and pays $18 DAI immediately to Alice in exchange for $20 DAI to be delivered in 30 days
- If the order isn't disputed after 30 days:
  - Charlie gets $20 DAI, and he only had to pay $18 DAI and wait 30 days to get it
  - Alice gets her collateral back, which she can reuse for future transactions
- If the order is disputed and Alice is found at fault:
  - Charlie would still receive \$20 DAI
  - Charlie would have her collateral (i.e. \$20 USDC) slashed to reimburse Bob

### License

MIT licensed

### Build instructions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

`npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
