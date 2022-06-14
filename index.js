//onclick hamburger handler

const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click",() => {
    const visibility = nav.getAttribute("data-visible");

    if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expended", true);
    } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expended", false);
    }
    // console.log(visibility);
});


//connect ke metamask start

// const ethereumButton = document.querySelector('.enableEthereumButton');
// const showAccount = document.querySelector('.showAccount');

// ethereumButton.addEventListener('click', () => {
//     getAccount();
// });

// async function getAccount() {
//     const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//     const account = accounts[0];
//     showAccount.innerHTML = account;
// }

// ------------------------------------------------------------//

// "use strict";

// /**
//  * Example JavaScript code that interacts with the page and Web3 wallets
//  */

// // Unpkg imports
// const Web3Modal = window.Web3Modal.default;
// const WalletConnectProvider = window.WalletConnectProvider.default;
// const Fortmatic = window.Fortmatic;
// const evmChains = window.evmChains;

// // Web3modal instance
// let web3Modal

// // Chosen wallet provider given by the dialog window
// let provider;


// // Address of the selected account
// let selectedAccount;


/**
 * Setup the orchestra
 */
// function init() {

//     console.log("Initializing example");
//     console.log("WalletConnectProvider is", WalletConnectProvider);
//     console.log("Fortmatic is", Fortmatic);
//     console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

//     // Check that the web page is run in a secure context,
//     // as otherwise MetaMask won't be available
//     // if (location.protocol !== 'https:') {
//     //     // https://ethereum.stackexchange.com/a/62217/620
//     //     const alert = document.querySelector("#alert-error-https");
//     //     alert.style.display = "block";
//     //     document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
//     //     return;
//     // }

//     // Tell Web3modal what providers we have available.
//     // Built-in web browser provider (only one can exist as a time)
//     // like MetaMask, Brave or Opera is added automatically by Web3modal
//     const providerOptions = {
//         walletconnect: {
//             package: WalletConnectProvider,
//             options: {
//                 // Mikko's test key - don't copy as your mileage may vary
//                 infuraId: "19a279417be8498eb0825dde17d8acee",
//                 rpc: {
//                     56: "https://bsc-dataseed.binance.org/"
//                 }
//             }
//         }, 
//         fortmatic: {
//             package: Fortmatic,
//             options: {
//                 // Mikko's TESTNET api key
//                 key: "pk_test_C7D278FE9CCF4C09"
//             }
//         }
//     };
//     providerOptions.chainId = 56;

//     web3Modal = new Web3Modal({
//         cacheProvider: false, // optional
//         providerOptions, // required
//         disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
//     });

//     console.log("Web3Modal instance is", web3Modal);
// }


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
// async function fetchAccountData() {

//     // Get a Web3 instance for the wallet
//     const web3 = new Web3(provider);

//     console.log("Web3 instance is", web3);

//     // Get connected chain id from Ethereum node
//     const chainId = await web3.eth.getChainId();
//     // Load chain information over an HTTP API
//     const chainData = evmChains.getChain(chainId);
//     document.querySelector("#network-name").textContent = chainData.name;

//     // Get list of accounts of the connected wallet
//     const accounts = await web3.eth.getAccounts();

//     // MetaMask does not give you all accounts, only the selected account
//     console.log("Got accounts", accounts);
//     selectedAccount = accounts[0];

//     document.querySelector("#selected-account").textContent = selectedAccount;

//     // Get a handl
//     const template = document.querySelector("#template-balance");
//     const accountContainer = document.querySelector("#accounts");

//     // Purge UI elements any previously loaded accounts
//     accountContainer.innerHTML = '';

//     // Go through all accounts and get their ETH balance
//     const rowResolvers = accounts.map(async (address) => {
//         const balance = await web3.eth.getBalance(address);
//         // ethBalance is a BigNumber instance
//         // https://github.com/indutny/bn.js/
//         const ethBalance = web3.utils.fromWei(balance, "ether");
//         const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
//         // Fill in the templated row and put in the document
//         const clone = template.content.cloneNode(true);
//         clone.querySelector(".address").textContent = address;
//         clone.querySelector(".balance").textContent = humanFriendlyBalance;
//         accountContainer.appendChild(clone);
//     });

//     // Because rendering account does its own RPC commucation
//     // with Ethereum node, we do not want to display any results
//     // until data for all accounts is loaded
//     await Promise.all(rowResolvers);

//     // Display fully loaded UI for wallet data
//     document.querySelector("#prepare").style.display = "none";
//     document.querySelector("#connected").style.display = "block";
// }



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
// async function refreshAccountData() {

//     // If any current data is displayed when
//     // the user is switching acounts in the wallet
//     // immediate hide this data
//     document.querySelector("#connected").style.display = "none";
//     document.querySelector("#prepare").style.display = "block";

//     // Disable button while UI is loading.
//     // fetchAccountData() will take a while as it communicates
//     // with Ethereum node via JSON-RPC and loads chain data
//     // over an API call.
//     document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
//     await fetchAccountData(provider);
//     document.querySelector("#btn-connect").removeAttribute("disabled")
// }


/**
 * Connect wallet button pressed.
 */
// async function onConnect() {

//     console.log("Opening a dialog", web3Modal);
//     try {
//         provider = await web3Modal.connect();
//     } catch (e) {
//         console.log("Could not get a wallet connection", e);
//         return;
//     }

//     // Subscribe to accounts change
//     provider.on("accountsChanged", (accounts) => {
//         fetchAccountData();
//     });

//     // Subscribe to chainId change
//     provider.on("chainChanged", (chainId) => {
//         fetchAccountData();
//     });

//     // Subscribe to networkId change
//     provider.on("networkChanged", (networkId) => {
//         fetchAccountData();
//     });

//     await refreshAccountData();
// }

/**
 * Disconnect wallet button pressed.
 */
// async function onDisconnect() {

//     console.log("Killing the wallet connection", provider);

//     // TODO: Which providers have close method?
//     if (provider.close) {
//         await provider.close();

//         // If the cached provider is not cleared,
//         // WalletConnect will default to the existing session
//         // and does not allow to re-scan the QR code with a new wallet.
//         // Depending on your use case you may want or want not his behavir.
//         await web3Modal.clearCachedProvider();
//         provider = null;
//     }

//     selectedAccount = null;

//     // Set the UI back to the initial state
//     document.querySelector("#prepare").style.display = "block";
//     document.querySelector("#connected").style.display = "none";
// }


/**
 * Main entry point.
 */
// window.addEventListener('load', async () => {
//     init();
//     document.querySelector("#btn-connect").addEventListener("click", onConnect);
//     document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
// });


//connect ke metamask end



$.getJSON('data.json', (data) => {
    //destination page start
    const destination = data.destinations;
    $.each(destination, (i, result) => {
        if (i == 0) {
            $('#img-destination').append(`
            <source srcset="`+result.images.webp +`" type="image/webp">
            <img src="`+result.images.png +`" alt="the moon">
            `);
            
            $('#sub-destination').append(`
            <button 
            aria-selected="true" 
            class="jessica uppercase ff-sans-cond text-accent letter-spacing-2" 
            id="sub-destination-category`+i+`">` + result.name + `</button>
            `);
            
            $('#main-destination').append(`
            <h2 class="fs-800 uppercase ff-serif" > `+ result.name +` </h2>
            
            <p>`+result.description+`</p>
            
            <div class="destination-meta flex" >
            <div>
            <h3 class="text-accent fs-200 uppercase"> Avg.distance </h3>
            <p class="ff-serif uppercase" >`+ result.distance +`</p> 
            </div> 
            <div>
            <h3 class="text-accent fs-200 uppercase" > Est.travel </h3> 
            <p class="ff-serif uppercase" > time 3 days </p> 
            </div>
            </div>
            `);
        }
        else  {
            $('#sub-destination').append(`
            <button 
            aria-selected="false" 
            class = "uppercase ff-sans-cond text-accent letter-spacing-2 jessica"
            id="sub-destination-category`+i+`">`+ result.name +`</button>
            `);
        }
        
        $('#sub-destination-category'+i).click( ()=> {
            $('#img-destination').empty();
            $('#main-destination').empty();
            
            $('#img-destination').append(`
            <source srcset="` + result.images.webp + `" type="image/webp">
            <img src="` + result.images.png + `" alt="the moon">
            `);
            
            $('#main-destination').append(`
            <h2 class="fs-800 uppercase ff-serif" > ` + result.name + ` </h2>
            
            <p>` + result.description + `</p>
            
            <div class="destination-meta flex" >
            <div>
            <h3 class="text-accent fs-200 uppercase"> Avg.distance </h3>
            <p class="ff-serif uppercase" >` + result.distance + `</p> 
            </div> 
            <div>
            <h3 class="text-accent fs-200 uppercase" > Est.travel </h3> 
            <p class="ff-serif uppercase" > ` + result.travel + ` </p> 
            </div>
            </div>
            `);
        });    
    });
    
    const SubDestination = document.querySelectorAll('.jessica');
    function activeSub() {
        SubDestination.forEach((item) =>
            item.setAttribute("aria-selected", false)
        );
        this.setAttribute("aria-selected", true);
    }
    SubDestination.forEach((item) => {
        item.addEventListener('click', activeSub);
    });
    //destination page end

    //crew page start
    const crew = data.crew;
    $.each(crew, (i, result) => {
        if (i == 0) {
            $('.dot-indicators').append(`
                <button aria-selected="true" id="sub-crew-category`+i+`" class="sianadewi"><span class="sr-only">The ` + result.role + `</span></button>
            `);

            $('.crew-details').append(`
                <header class="flow flow-space--small">
                    <h2 class="fs-600 ff-serif uppercase">`+result.role+`</h2>
                    <p class="fs-700 uppercase ff-serif">`+ result.name +`</p>
                </header>
                <p>`+ result.bio+`</p>
            `);

            $('#img-crew').append(`
                <source srcset="`+ result.images.webp +`" type="image/webp">
                <img src="`+ result.images.png +`" alt="Douglas Hurley">
            `);
        }
        else {
            $('.dot-indicators').append(`
                <button aria-selected="false" id="sub-crew-category`+i+`" class="sianadewi"><span class="sr-only">The ` + result.role + `</span></button>
            `);
        }
        $('#sub-crew-category'+i).click( ()=> {
            $('.crew-details').empty();
            $('#img-crew').empty();

            $('.crew-details').append(`
                <header class="flow flow-space--small">
                    <h2 class="fs-600 ff-serif uppercase">` + result.role + `</h2>
                    <p class="fs-700 uppercase ff-serif">` + result.name + `</p>
                </header>
                <p>` + result.bio + `</p>
            `);

            $('#img-crew').append(`
                <source srcset="` + result.images.webp + `" type="image/webp">
                <img src="` + result.images.png + `" alt="Douglas Hurley">
            `);
        });
    });

    const SubCrew = document.querySelectorAll('.sianadewi');

    function activeSubCrew() {
        SubCrew.forEach((item) =>
            item.setAttribute("aria-selected", false)
        );
        this.setAttribute("aria-selected", true);
    }
    SubCrew.forEach((item) => {
        item.addEventListener('click', activeSubCrew);
    });
    //crew page end

    // tech page start
    const tech = data.technology;
    $.each (tech, (i, result) => {
        var temp = i+1;
        if ( i == 0) {
            $('.numbered-indicators').append(`
                <div aria-selected="true" class="text-dark hani" id="sub-tech-cat`+i+`">`+ temp +`</div>
            `);

            $('.tech-details').append(`
                <h1 class="numbered-title">The terminology...</h1>

                <h2 class="fs-700 uppercase ff-serif">`+ result.name +`</h2>

                <p>`+ result.description +`</p>
            `);

            if ($(window).width() < 769) {
                $('#img-tech').empty();
                $('#img-tech').append(`
                    <img class="img-asu"
                    alt = ""
                    style = "background-image: url('./assets/technology/image-launch-vehicle-landscape.jpg'); background-repeat: no-repeat; background-size: contain;">
                `);
            }
            else if ( $(window).width() > 769) {
                $('#img-tech').empty();
                $('#img-tech').append(`
                    <img class="img-asu" alt="" style="background-image: url('./assets/technology/image-launch-vehicle-portrait.jpg'); background-repeat: no-repeat; background-size: contain;">
                `);
            }

        }
        else {
            $('.numbered-indicators').append(`
                <div aria-selected="false" class="hani" id="sub-tech-cat`+i+`">` + temp + `</div>
            `);
        }

        $('#sub-tech-cat'+i).click( () => {
            $('.tech-details').empty();
            $('#img-tech').empty();

            $('.tech-details').append(`
                <h1 class="numbered-title">The terminology...</h1>

                <h2 class="fs-700 uppercase ff-serif">`+ result.name +`</h2>

                <p>`+ result.description +`</p>
            `);

            if ($(window).width() < 769) {
                $('#img-tech').empty();
                $('#img-tech').append(`
                    <img class="img-asu" alt="" style="background: url('` + result.images.landscape + `') no-repeat; background-size: contain;">
                `);
            } else if ($(window).width() > 769) {
                $('#img-tech').empty();
                $('#img-tech').append(`
                    <img class="img-asu" alt="" style="background: url('` + result.images.portrait + `') no-repeat; background-size: contain;">
                `);
            }

            
        });
    });

    const numberedIndicator = document.querySelectorAll('.hani');
    
    function activeNumbered() {
        numberedIndicator.forEach( (item) => {
                item.setAttribute("aria-selected",false);
                item.classList.remove('text-dark');
            }
        );
        this.setAttribute("aria-selected",true);
        this.classList.add('text-dark');
    }

    numberedIndicator.forEach( (item) => {
        item.addEventListener('click', activeNumbered);
    });
    // tech page end
});
