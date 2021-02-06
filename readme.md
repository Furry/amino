<div style="text-align: center">
    <h1>
        Amino
    </h1>


<a href="https://discord.gg/S8sw2ud">
    <img src="https://discordapp.com/api/guilds/769020183540400128/widget.png?style=banner2" alt="Discord Banner 2"/>
</a>

![Discord Shield](https://img.shields.io/github/commit-activity/m/furry/amino)
![Size](https://img.shields.io/bundlephobia/min/amino)
![Downloads](https://img.shields.io/npm/dw/amino)

</div>

<hr>

<div style="text-align: center">
    <h2>An API wrapper around the Amino app.</h2>
</div>

<h1>Features</h1>

<h2>Chat:</h2>
<ul>
    <li>Message Events</li>
    <li>Join / Leave Events</li>
    <li>Sending text-messages</li>
    <li>Sending image-messages</li>
    <li>Thread & DM support</li>
</ul>

<h2>Utility:</h2>
<ul>
    <li>Thread Searching</li>
    <li>Community Searching</li>
</ul>

<h2>Classes & Documentation:</h2>
<ul>
    <li>
        <a href="https://github.com/Furry/amino/docs/client.md">Client</a>
    </li>
    <li>
        <a href="https://github.com/Furry/amino/docs/wallet.md">Wallet</a>
    </li>
    <li>
        <a href="https://github.com/Furry/amino/docs/community.md">Community</a>
    </li>
    <li>
        <a href="https://github.com/Furry/amino/docs/account.md">Account</a>
    </li>
    <li>
        <a href="https://github.com/Furry/amino/docs/message.md">Message</a>
    </li>
    <li>
        <a href="https://github.com/Furry/amino/docs/thread.md">Thread</a>
    </li>
    <li>
        <a href="https://github.com/Furry/amino/docs/profile.md">Profile</a>
    </li>
</ul>

## Examples:

Search for a community's id
```ts
import * as Amino from "amino";

// Uses default 'g' community if none is specified
const client = new Amino.Client();

client.login("myEmail@gmail.com", "myAccountsPassword")
.then(async () => {
    const overwatchAmino = await client.searchCommunities("overwatch")[0]
    console.log(overwatchAmino.ndcId); // Pull the community ID
})
```

Start a chatbot on a community:
```ts
import * as Amino from "amino";

// Furry Amino's ID (235196899)
const client = new Amino.Client("235196899")

client.login("myEmail@gmail.com", "myAccountsPassword")
.then(() => {
    // Start the websocket listener
    // This is optional if you don't want to use chat features.
    client.listen()
})

client.on("message", async (message) => {
    if (message.content == "!ping") {
        await message.reply(`${message.author.nickname}, Pong!`)
    }
})
```

# Contribution & Requests

## Requests
Enjoying the library? Good! Have something you want to see in it? Awesome! Please make a new issue in the github repository, and I'll get to it promptly!

There's still a lot of things I need to add, so if something's important to you, I'll put it at the top of my amino to-do list!

## I need help!
Okay, join my discord and I can help you with any issue. The discord is at the top of the ReadMe.

## Contribution Guidelines
- All pull requests must provide valid reason for the change / implementation
- All **CORE CHANGES** require an issue made before the PR will be looked at
- All PR's must follow the general structure of this code base.
- New structures must be defined similarely to how they are in the ./src/structs directory, with the typings below the class.
- If you have any questions, feel free to make an issue and i'll answer asap!


<hr>
<div style="text-align: center"> If you enjoy my projects and have a few dollars to spare, buy me a coffee!</div>
<div style="text-align: center">
<a href="https://www.buymeacoffee.com/ether" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</div>