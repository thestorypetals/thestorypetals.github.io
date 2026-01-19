/* cart.js - COMPACT CARDS, PADDING FIX, & FONTS */

const SHOPIFY_DOMAIN = 'the-story-petals.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = '7faa695d3fc67f34912d984bd3b265f5';
const COLLECTION_ID = '510529339714';

const productElement = document.getElementById('product-collection');

if (productElement) {
    productElement.innerHTML = ''; 

    var client = ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
    });

    var ui = ShopifyBuy.UI.init(client);

    ui.createComponent('collection', {
        id: COLLECTION_ID,
        node: productElement,
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
            product: {
                iframe: false,
                contents: {
                    img: false,
                    imgWithCarousel: true,
                    title: true,
                    price: true,
                    button: true,
                },
                styles: {
                    product: {
                        // --- CARD STYLE (COMPACT) ---
                        'background-color': '#f2efeb',
                        'border-radius': '12px',
                        'box-shadow': '0 4px 15px rgba(93, 50, 21, 0.1)',
                        'text-align': 'center',
                        'overflow': 'hidden',
                        'transition': 'transform 0.3s ease',
                        
                        // FIX 1: Add Padding to Top
                        'padding-top': '15px', 
                        'padding-bottom': '0px',
                        
                        // FIX 2: Reduce Card Height (Was 480px)
                        'min-height': '420px', 
                        
                        // Spacing between cards
                        'margin-bottom': '50px',
                        'margin-left': '20px',

                        // --- RESPONSIVE WIDTHS ---
                        '@media (min-width: 601px)': {
                            'width': 'calc(33.33% - 20px)',
                        },
                        '@media (max-width: 600px)': {
                            'width': 'calc(100% - 0px)',
                            'margin-left': '0px',
                        }
                    },
                    
                    // --- IMAGE STYLING ---
                    carousel: {
                        'margin-bottom': '5px',
                    },
                    
                    img: { 
                         // FIX 2: Smaller Image (Was 350px)
                         'height': '280px', 
                         'width': '100%', 
                         'object-fit': 'contain', 
                         'background-color': '#f2efeb',
                         'display': 'block' 
                    },

                    // --- TITLE STYLING (FIX 3: FONT) ---
                    title: {
                        // We use the exact name from your CSS @font-face
                        'font-family': 'DisplayFont, serif', 
                        'font-size': '1.4rem',
                        'color': '#5d3215',
                        'margin-bottom': '5px',
                        'font-weight': 'normal'
                    },

                    // --- PRICE STYLING ---
                    price: {
                        'font-family': '"Josefin Sans", sans-serif',
                        'font-weight': '600',
                        'color': '#8c7b70',
                        'font-size': '1rem',
                        'margin-bottom': '10px'
                    },

                    // --- BUTTON STYLING ---
                    button: {
                        'font-family': '"Josefin Sans", sans-serif',
                        'font-weight': '700',
                        'text-transform': 'uppercase',
                        'letter-spacing': '1px',
                        'background-color': '#deb887',
                        'color': '#ffffff',
                        'padding': '15px 0',
                        'width': '100%',
                        'border-radius': '0',
                        'margin-top': 'auto', 
                        ':hover': {
                            'background-color': '#c9a77d'
                        }
                    }
                },
                text: { button: 'Add to Cart' }
            },
            
            // --- CART ICONS ---
            toggle: {
                styles: {
                    toggle: {
                        'background-color': '#deb887',
                        ':hover': { 'background-color': '#c9a77d' }
                    },
                    count: {
                        'color': '#5d3215',
                        'font-size': '12px'
                    }
                }
            },

            // --- CART SIDEBAR ---
            cart: {
                styles: {
                    button: {
                        'background-color': '#deb887',
                        'font-family': '"Josefin Sans", sans-serif',
                        ':hover': { 'background-color': '#c9a77d' }
                    },
                    title: {
                        'color': '#5d3215',
                        'font-family': 'DisplayFont, serif'
                    },
                    header: {
                        'color': '#5d3215',
                        'font-family': 'DisplayFont, serif'
                    },
                    footer: { 'background-color': '#f9f6f3' }
                }
            }
        }
    });
}