function createProductCard(imageSrc, title, description, price) {
    // Create a new 'div' element for the product card
    const productCard = document.createElement('div');
    productCard.className = 'col-md-3 p-3 productcard';

    // Create the card's inner 'div' element
    const cardInner = document.createElement('div');
    cardInner.className = 'card border-0';

    // Create the product inner image box
    const productInnerImgBox = document.createElement('div');
    productInnerImgBox.className = 'product_inner_imgbox px-2';
    productInnerImgBox.style.height = '40vh';

    // Create the 'img' element for the product image
    const productImage = document.createElement('img');
    productImage.src = imageSrc;
    productImage.className = 'card-img-top px-0';
    productImage.alt = 'Product 1';
    productImage.style.height = '40vh';

    // Append the image to the product inner image box
    productInnerImgBox.appendChild(productImage);

    // Create the 'div' element for the cart button
    const cartButton = document.createElement('div');
    cartButton.className = 'cart-btn';

    // Create the 'button' element for adding to cart
    const addButton = document.createElement('button');
    addButton.className = 'btn btn-white shadow-sm rounded-pill';
    addButton.innerHTML = '<span>Add to </span><i class="fa-solid fa-cart-shopping"></i>';

    // Append the button to the cart button div
    cartButton.appendChild(addButton);

    // Create the 'div' element for the card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create the 'h5' element for the card title
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title;

    // Create the 'p' element for the card text
    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = description;

    // Create the 'div' element for the product price
    const productPrice = document.createElement('div');
    productPrice.className = 'product-price';

    // Create the price symbol and value
    const priceSymbol = document.createElement('span');
    priceSymbol.innerHTML = '&#8377';
    const priceValue = document.createElement('span');
    priceValue.textContent = price;

    // Append the price symbol and value to the product price div
    productPrice.appendChild(priceSymbol);
    productPrice.appendChild(priceValue);

    // Append the title, text, and price elements to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(productPrice);

    // Append the product inner image box, cart button, and card body to the card inner div
    cardInner.appendChild(productInnerImgBox);
    cardInner.appendChild(cartButton);
    cardInner.appendChild(cardBody);

    // Append the card inner div to the product card div
    productCard.appendChild(cardInner);

    return productCard;
}

// Example usage of the function

// Define a 2D array where each 1D array contains four values
const productDataDict = {
    BodyBeltBraces:[['./img/products/BodyBelts Braces/Abdominal Support.jpg', 'Abdominal support 9"', 'A-01 S,M,L,XL,XXL', '100'],
    ['./img/products/BodyBelts Braces/Contoured L.S. Support.jpg', 'Abdominal Belt', 'A-01 S,M,L,XL,XXL', '100'],
    ['./img/products/BodyBelts Braces/Dorsolumbar Taylors Brace.jpg', 'LS Belt Lumbopore', 'A-01 S,M,L,XL,XXL', '100'],
    ['./img/products/BodyBelts Braces/Lumbo Sacral Support.jpg', 'Lumbo Sacral Belt', 'A-01 S,M,L,XL,XXL', '100'],
    ['./img/products/BodyBelts Braces/Rib Belt.jpg', 'Contoured L.S. Support', 'A-01 S,M,L,XL,XXL', '100'],
    ['./img/products/BodyBelts Braces/Sternal Support.jpg', 'Rib Belt', 'A-01 S,M,L,XL,XXL', '100']],

    CervicalAcids:[['./img/products/Cervical Acids/Cervical Colllar Hard.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Cervical Acids/Contoured Cervical Pillow.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Cervical Acids/Philadelphia Collar.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Cervical Acids/Soft Cervical Collar With Support.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Cervical Acids/Soft Cervical Collar.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300']],

    EconomyRange:[['./img/products/Economy Range of Product/Contoured L.S. Support.jpg', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Economy Range of Product/Lumbo Sacral Support.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Economy Range of Product/Rib Belt.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300']],

    Fingers:[['./img/products/Fingers wrist arms support/Execrise Gel Ball Soft.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fingers wrist arms support/Finger Cot splint.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fingers wrist arms support/Frog Splint.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fingers wrist arms support/Mallet Splint.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300']],

    wristArms:[['./img/products/Fingers wrist arms support/Elastic Wrist Splint (Left Right).jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fingers wrist arms support/Elbow Support.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fingers wrist arms support/Tennis Elbow Support.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fingers wrist arms support/Thumb Spica Splint.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fingers wrist arms support/Wrist and Forearm Splint.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fingers wrist arms support/Wrist Support With Thumb.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fingers wrist arms support/Wrist Support.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300']],

    FootCare:[['./img/products/Foot Care Products/Medial Arch Support (Pair).jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Foot Care Products/Silicone Heel Cushion (Pair).jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Foot Care Products/Silicone Insole (Pair).jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Foot Care Products/Toe Spreader with Loop.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300']],

    FractureAcids:[['./img/products/Fracture Acids/Arm Pouch Sling (Baggy).jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fracture Acids/Arm Pouch Sling (Tropical).jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fracture Acids/Cast Shoe.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fracture Acids/Clavicle Brace.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fracture Acids/Elastic Shoulder Immobilizer with Cup.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Fracture Acids/Universal Shoulder Immobilizer.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300']],

    kneeAnkle:[['./img/products/Knee & Ankle Support/Elastic Knee Support.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Knee & Ankle Support/Knee Cap (Pair).jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Knee & Ankle Support/Knee Cap Hinged.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Knee & Ankle Support/Knee Cap With Open Patella.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Knee & Ankle Support/Knee Immobilizer Long.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Knee & Ankle Support/Knee Immobilizer Short.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300']],

    other:[['./img/products/Other Product/Coccyx Cushion (Foam).jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Other Product/Hot & Cold Gel Pack.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Other Product/Leg Traction Brace.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Other Product/Ortho Stockinette.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Other Product/Osteo Roll.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Other Product/Skin Traction Set (Puff Liner).jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Other Product/Tourniquet.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300'],
    ['./img/products/Other Product/Weigth Cuff.jpg', 'Abdominal support', '9"/23cm, grey, 1 unit', '300']]

};

// Find the productContainer by its id
let productContainer = document.getElementById('productContainer');

// for empty previous div when click other button

function removeData() {
    // Get a reference to the child element you want to remove
    let parentDiv = document.getElementById('productContainer');

    // Remove all child elements from the parent
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
}



function specificpro(whichproshow){
    removeData();
    for(let data of productDataDict[whichproshow]){
        let newProductCard = createProductCard(...data);
        productContainer.appendChild(newProductCard);
    }
}

for(let data of productDataDict.BodyBeltBraces){
    console.log('pawan');
    let newProductCard = createProductCard(...data);
    productContainer.appendChild(newProductCard);
}


