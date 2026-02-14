var myCarousel = new bootstrap.Carousel(document.getElementById('banner'), {
    interval: 2000 // Set the interval (in milliseconds) for the carousel to automatically advance
});



function createProductCard(img, title, description, price, rating) {
    // main box in product card
    const productCard = document.createElement('div');
    productCard.className = 'col-md-3 mb-4  d-flex position-relative';

    // create inner div
    const ProInnerDiv = document.createElement('div');
    ProInnerDiv.className = 'card  d-flex pb-4';
    ProInnerDiv.style.height = '90%';
    ProInnerDiv.style.width = '120%'

    // create product image
    const productImg = document.createElement('img');
    productImg.src = img;
    productImg.className = 'card-img-top ';
    productImg.style.height = '60%';
    productImg.style.width = '100%';
    productImg.alt = 'Product 1';

    // append img in inner div
    ProInnerDiv.appendChild(productImg);

    // create a div for card body
    const CardBody = document.createElement('div');
    CardBody.className = 'card-body h-50 d-flex flex-column justify-content-end';

    // create h5 for title
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title overflow-hidden d-flex';
    cardTitle.textContent = title;

    // append cardTitle in CardBody
    CardBody.appendChild(cardTitle);

    // create p for description
    const cardDesc = document.createElement('p');
    cardDesc.className = 'card-text d-flex';
    cardDesc.textContent = description;

    // append cardDesc in CardBody
    CardBody.appendChild(cardDesc);

    // create rating outer div
    const outRating = document.createElement('div');
    outRating.className = 'd-flex flex-column justify-content-end';

    // create rating div
    const Rating = document.createElement('div');
    Rating.className = 'rating';

    // rating stars and append in rating
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            let star = document.createElement('span');
            star.className = 'star fs-3';
            star.innerHTML = `${'&#9733'}`;
            star.style.color='yellow';
            Rating.appendChild(star);
        }
        else {
            let star = document.createElement('span');
            star.className = 'star fs-3';
            star.innerHTML = `${'&#9734'}`;
            star.style.color='yellow';
            Rating.appendChild(star);
        }
    }

    // Append Rating in outRating
    outRating.appendChild(Rating);

    // create price h5
    const pricePro = document.createElement('h5');
    pricePro.className = 'price overflow-hidden';
    pricePro.innerHTML = `${'&#8377'} ${price}`;

    // append pricePro in outRating
    outRating.appendChild(pricePro);

    // append outRating in CardBody
    CardBody.appendChild(outRating);

    // append CardBody in ProInnerDiv
    ProInnerDiv.appendChild(CardBody);


    // create add to card button
    const Add = document.createElement('img');
    Add.className = 'overflow-hidden position-absolute end-0';
    Add.style.width = '2em';
    Add.style.height = '2em';
    Add.style.borderRadius = '50%';
    Add.style.display = 'none';
    Add.src = '../img/add.jpg';

    // append CardBody in ProInnerDiv
    ProInnerDiv.appendChild(Add);

    // append ProInnerDiv in productCard
    productCard.appendChild(ProInnerDiv);


    return productCard;
}


// Define a 2D array where each 1D array contains five values
const productDataDict = {
    AllPro: [['../img/Coconut.webp', 'Beejras Virgin Unrefined Coconut Oil(1 Ltr/33.81 oz)', 'Oils', '499', '3'],
    ['../img/Black Mustrad.webp', 'Beejras Virgin Black Mustrad Oil(1 Ltr/33.81 oz)', 'Oils', '499', '5'],
    ['../img/Peanut.webp', 'Beejras Virgin Peanut Oil(1 Ltr/33.81 oz)', 'Oils', '499', '5'],
    ['../img/Sesame.webp', 'Beejras Virgin Sesame Oil(1 Ltr/33.81 oz)', 'Oils', '499', '5']]
}


// Function to initialize and render product cards
function initializeProductCards() {
    // Find the product container by its ID
    const productContainer = document.getElementById('product');

    // Create a div for the row
    const productInnerRow = document.createElement('div');
    productInnerRow.className = 'row';

    // Create and append product cards
    for (let data of productDataDict.AllPro) {
        const newProductCard = createProductCard(...data);
        productInnerRow.appendChild(newProductCard);
    }

    // Append the row to the product container
    productContainer.appendChild(productInnerRow);
}

// Add event listeners after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize and render product cards
    initializeProductCards();

    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.card');
    productCards.forEach(productCard => {
        const Add = productCard.querySelector('.position-absolute.end-0');
        const Img = productCard.querySelector('.card-img-top');
        productCard.addEventListener('mouseenter', () => {
            Add.style.display = 'block';

            var substringToReplace = ".webp";

            // String to replace it with
            var replacementString = " back.webp";

            // Find the last index of the substring to replace
            var lastIndex = Img.src.lastIndexOf(substringToReplace);

            // Extract the part of the string before the last occurrence of the substring
            var part1 = Img.src.substring(0, lastIndex);

            // Extract the part of the string after the last occurrence of the substring
            var part2 = Img.src.substring(lastIndex + substringToReplace.length);

            // Create the result string by concatenating the parts and the replacement string
            var result = part1 + replacementString + part2;

            Img.src =  result;
        });

        productCard.addEventListener('mouseleave', () => {
            Add.style.display = 'none';
            var substringToReplace = "back.webp";

            // String to replace it with
            var replacementString = ".webp";

            // Find the last index of the substring to replace
            var lastIndex = Img.src.lastIndexOf(substringToReplace);

            // Extract the part of the string before the last occurrence of the substring
            var part1 = Img.src.substring(0, lastIndex);

            // Extract the part of the string after the last occurrence of the substring
            var part2 = Img.src.substring(lastIndex + substringToReplace.length);

            // Create the result string by concatenating the parts and the replacement string
            var result = part1.slice(0,part1.length-3) + replacementString + part2;
            Img.src =  result;
        });
    });


});

// Review Section

// Create the main container
function review_card() {
    const reviewContainer = document.getElementById('review');
    const firstSlideRow = document.createElement('div')
    firstSlideRow.className = 'row';

    // Create the first card
    for (let i = 0; i < 3; i++) {
        // Create the first card
        const firstCard = document.createElement('div');
        firstCard.className = 'col-md-4 ';
        const firstCardBody = document.createElement('div');
        firstCardBody.className = 'card h-100 pt-1 px-1';
        const firstCardText = document.createElement('p');
        firstCardText.className = 'card-text';
        firstCardText.textContent = 'Dolor, sit amet consectetur adipisicing elit. Recusandae, nihil hic. Similique unde reiciendsdignissimos fugit assumenda molestiae non, vero obcaecati sequi placeat quod consequuntur magnam quibusdam        soluta suscipit debitis commodi rerum mollitia quas, porro ab voluptatum, animi dolor molestias. Repellat        quisquam deserunt laboriosam nobis corporis sint natus rerum non.';

        // Create the rating stars
        const firstRating = document.createElement('div');
        firstRating.className = 'rating';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.className = 'star fs-3';
            star.innerHTML = '&#9733;';
            star.style.color='yellow';
            firstRating.appendChild(star);
        }

        // Create the name
        const firstName = document.createElement('p');
        firstName.className = 'card-text';
        firstName.textContent = 'Name 1';

        // Append elements to the first card
        firstCardBody.appendChild(firstCardText);
        firstCardBody.appendChild(firstRating);
        firstCardBody.appendChild(firstName);
        firstCard.appendChild(firstCardBody);

        // Append the first card to the row
        firstSlideRow.appendChild(firstCard);
    }

    // Add two more cards for the first slide here in a similar way

    // Append the first slide to the carousel inner
    reviewContainer.appendChild(firstSlideRow);
}


review_card();
