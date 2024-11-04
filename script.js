function renderRestaurantActions() {
    const container = document.querySelector('.containers');
    
    /* Outer div */
    const actionsDiv = document.createElement('div');
    actionsDiv.className = "actions";
    
    /* Title */
    const title = document.createElement('h2');
    title.innerHTML = 'Restaurant Actions';

    /* Buttons */
    const buttons = document.createElement('div');
    buttons.className = "buttons";
    const acceptButton = document.createElement('button');
    acceptButton.id = "accept-btn";
    acceptButton.innerHTML = "Accept Offer";

    const declineButton = document.createElement('button');
    declineButton.id = "decline-btn";
    declineButton.innerHTML = "Decline Offer";

    buttons.appendChild(acceptButton);
    buttons.appendChild(declineButton);

    /* Informational text */
    const infoText = document.createElement('span');
    infoText.innerText = "Restaurant is reviewing the order...";

    actionsDiv.appendChild(title);
    actionsDiv.appendChild(buttons);
    actionsDiv.appendChild(infoText);

    container.appendChild(actionsDiv);
}

async function placeOrder() {
    
    renderRestaurantActions();

    const orderStatus = document.getElementById('orderStatus');
    orderStatus.innerHTML = "Order placed! Waiting for restaurant response...";

    console.log("Place order");
    try {
        const orderResponse = await new Promise((resolve, reject) => {
            const acceptButton = document.getElementById('accept-btn');
            const declineButton = document.getElementById('decline-btn');
            
            acceptButton.addEventListener('click', () => resolve('Approved'));
            declineButton.addEventListener('click', () => reject('Declined'));
            setTimeout(() => reject("Time ran out"), 60000);
        });

        console.log(orderResponse);
    } catch (error) {
        const actionsDiv = document.querySelector('.actions');
        actionsDiv.remove();

        const orderStatusDiv = document.getElementById('orderStatus');
        orderStatusDiv.innerHTML = "Order declined. Please try again!";

        console.log(error);
    }
}

function load() {
    var orderBtn = document.getElementById('order-btn');
    orderBtn.addEventListener('click', (event) => {
        placeOrder();
    });
}

window.onload = function() { load(); }