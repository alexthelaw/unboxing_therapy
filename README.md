# Unboxing Therapy

The Unboxing Therapy app is built by Ngage.Space team for the HackOnChain hackathon

## Motivation

Today, while user attention is a valuable commodity, the importance of engagement and retention cannot be overstated. It is no longer sufficient for a product to merely attract users; the key lies in fostering an active and loyal community around the product. This sense of community not only enhances user satisfaction but also fuels long-term success. 

To achieve these goals, we have chosen the widget format as our preferred solution. This decision is based on several compelling factors, including:
- ease of integration
- the  immense potential for gamification
- the ability to implement on-chain mechanics on any site  out of the box. 

We choosed the case of mystery boxes as a part of our PoC. Mystery boxes have gained significant popularity, captivating users with the allure of surprises and rewards. By integrating this concept into our widget, we aim to offer an engaging and interactive experience for our users.

We have opted to utilize **Mantle network** for on-chain functionallity. The latter includes the account system and mystery box randomizer.

Through the combination of the mystery boxes use case, the utilization of the Mantle network for on-chain operations, and the implementation of new Account Abstraction, we strive to deliver an immersive and user-friendly experience. Our goal is to not only captivate users with rewards but also showcase the potential of web3 technology in user engagement and retention instruments.

## Our use case
Our app features a widget that enables Mantle users to participate in mystery box offers and potentially win valuable prizes. 

Here's how it works:

1. Users sign in to the app using their web3 wallet
2. Users place a Bid: A user can enter a raffle by paying in BIT tokens
3. Users are proposed to open three mystery boxes, each containing a potential prize.

Following the concept of mystery boxes, the potential prizes vary in value, with the chance of winning a more valuable prize being lower:

- A Symbolic NFT from Unboxing Therapy team
- 10 USDT
- 10Inch Subscription: an 1-month subscription to 10Inch on assumed DEX

## How it works

We implemented ERC-4337 as the basis of the account system, enabling gas subsidization and abstracting operations from the user's perspective. This intuitive approach ensures a seamless experience for non-web3 native users, while harnessing the transparency of web3 technology for our gambling randomness mechanic. By leveraging these functionalities, the following drawbacks of onchain gambling solution can be eliminated fully or partially:

- Transaction counts: actually, each user action (like a spin) should be authenticated. Without account abstraction it requires signing transaction in wallet which is of poor UX in comparison with web2 casino. Abstract accounts can reduce such friction by making all this under the hood.
- Transaction price and time: as it follows from prevoius part, numerous transactions may be a problem in terms of time and costs. Abstract account isolates all this from the user. From the moment he made the bet, everything else could be managed under the hood without direct user interaction. In particular, several transactions can be squased into one in order to reduce costs.
- Privacy: abstract accounts can offer more privacy for those who do not wish to disclose their web3 wallet.

Random is implemented with a ERC-721 collection modified for the needs of our case:

- We added a function to get a random token from the collection. We used `block.prevrandao` and `block.timestamp` block params used as randomness for prize generation.
- Each prize is a preminted NFT token with speficied weight attribute. This weight determines the probability of winning the prize. We have the fixed weights in this solution: 60 for UT NFT as for the cheapest prize, 25 for 10 USDT prize; and 15 for 10nch Premium.
- Added `widthdraw` function.

It was critical for us to find some onchain randomness solution to ensure transparency and fairness in the prize selection process. This shuld eliminate any doubts or concerns regarding the manipulation of results and enhances user trust and satisfaction. However, all existing solutions for randomization in Solidity have their drawbacks.

### Widget
Built with Preact, ether.js. Login via Metamask

Installation:
```
npm install
cp .env_example .env
Edit .env
npm run build
npm run start
```

Add to a site:  
```
<script defer>
    (function (w, d, s, o, f, js, fjs) {
        w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
        js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
        js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
    }(window, document, 'script', 'ut', './widget.js'));
    ut('init', { debug: true });
</script>
```

### Contracts
For our solution, we deployed several smart contracts:

- **AccoutFactory** for generating abstract accounts.
`0x125Bc01b9e6c83d9406e9A11A7bb3cEA56e64479`

- **EntryPoint** to store and manage user bids.
`0xe6170714AeeC6C692142c150E6Fb1B0E0a4411cf`

- Modified ERC-721 collection for prizes distribution.
`0x0413C77f075c1586E06D49997F4368Aa8DB74f6a`
