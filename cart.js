/* cart.js - RESPONSIVE TITLE FIX */

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
                        // --- CARD BASE STYLES ---
                        'background-color': '#f2efeb',
                        'border-radius': '12px',
                        'box-shadow': '0 4px 15px rgba(93, 50, 21, 0.1)',
                        'text-align': 'center',
                        'overflow': 'hidden',
                        'transition': 'transform 0.3s ease',
                        'box-sizing': 'border-box', 
                        
                        // Layout
                        'padding-top': '15px', 
                        'padding-bottom': '0px',
                        'min-height': '420px', 
                        'margin-bottom': '50px',
                        'margin-left': '20px', 

                        // --- RESPONSIVE WIDTHS ---
                        '@media (min-width: 601px)': {
                            'width': 'calc(33.33% - 20px)',
                        },
                        
                        // --- MOBILE OVERFLOW FIX ---
                        '@media (max-width: 600px)': {
                            'width': 'calc(100vw - 40px)', 
                            'margin-left': '0px', 
                            'margin-right': '0px',
                            'margin-bottom': '30px'
                        }
                    },
                    
                    // --- IMAGE STYLING ---
                    carousel: {
                        'margin-bottom': '5px',
                    },
                    
                    img: { 
                         'height': '280px', 
                         'width': '100%', 
                         'object-fit': 'contain', 
                         'background-color': '#f2efeb',
                         'display': 'block' 
                    },

                    // --- TITLE STYLING (UPDATED) ---
                    title: {
                        'font-family': 'DisplayFont, serif', 
                        'color': '#5d3215',
                        'font-weight': 'normal',
                        'line-height': '1.2',
                        'margin-bottom': '5px',
                        
                        // 1. Responsive Font Size (Scales between 1.2rem and 1.8rem)
                        'font-size': 'clamp(1.2rem, 5vw, 1.8rem)',

                        // 2. Fixed Height Container (Prevents div resizing)
                        'height': '3em', 
                        'overflow': 'hidden', 
                        'display': 'block',
                        'padding': '0 5px'
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