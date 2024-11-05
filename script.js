function getActionsDiv() {
    let actionsDiv = document.querySelector(".actions");

    /* If actionsDiv already exists, reset it */
    if(actionsDiv !== null) {
        actionsDiv.innerHTML = "";
    } else {
        actionsDiv = document.createElement('div');
        actionsDiv.className = "actions";
    }

    return actionsDiv;
}

function renderRestaurantActions() {
    const container = document.querySelector('.containers');

    /* Outer div */
    let actionsDiv = getActionsDiv();
    
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

function renderDeliveryPartnerActions() {
    const container = document.querySelector('.containers');
    
    /* Outer div */
    const actionsDiv = getActionsDiv();
    
    /* Title */
    const title = document.createElement('h2');
    title.innerHTML = 'Delivery Partner Actions';

    /* Buttons */
    const buttons = document.createElement('div');
    buttons.className = "buttons";
    buttons.id = "delivery-btns"

    const assignButton = document.createElement('button');
    assignButton.id = "assign-btn";
    assignButton.innerHTML = "Assign Delivery Partner";

    buttons.appendChild(assignButton);

    /* Informational text */
    const infoText = document.createElement('span');
    infoText.id = "delivery-info-text";
    infoText.innerText = "Delivery partner is being assigned...";

    actionsDiv.appendChild(title);
    actionsDiv.appendChild(buttons);
    actionsDiv.appendChild(infoText);

    container.appendChild(actionsDiv);
}

function updateOrderStatus(status) {
    const orderStatus = document.getElementById("orderStatus");
    orderStatus.innerHTML = status;
}

async function placeOrder() {
    
    renderRestaurantActions();

    const orderStatus = document.getElementById('orderStatus');
    orderStatus.innerHTML = "Order placed! Waiting for restaurant response...";

    console.info("Placing order...");
    try {
        const orderResponse = await new Promise((resolve, reject) => {
            const acceptButton = document.getElementById('accept-btn');
            const declineButton = document.getElementById('decline-btn');
            
            acceptButton.addEventListener('click', () => resolve('Order approved'));
            declineButton.addEventListener('click', () => reject('Order declined'));

            setTimeout(() => reject("Time ran out"), 60000);
        });

        updateOrderStatus("Order accepted by restaurant. Waiting for delivery partner...");
        
        console.info(orderResponse);

        const actionsDiv = document.querySelector('.actions');

        renderDeliveryPartnerActions();

        const deliveryResponse = await new Promise((resolve, reject) => {
            const assignButton = document.getElementById('assign-btn');
            assignButton.addEventListener('click', () => resolve("Delivery partner assigned"));
            setTimeout(() => reject("Time ran out"), 60000);
        });

        console.info(deliveryResponse);

        updateOrderStatus("Delivery partner assigned. Waiting for delivery...")

        /* Update Delivery Partner Actions Div */
        const buttonsDiv = document.getElementById('delivery-btns');
        
        const outForDeliveryBtn = document.createElement('button');
        outForDeliveryBtn.id = "out-for-delivery-btn";
        outForDeliveryBtn.innerHTML = "Out for Delivery";
        
        buttonsDiv.appendChild(outForDeliveryBtn);

        const infoText = document.getElementById("delivery-info-text");
        infoText.innerHTML = "Delivery partner assigned!";

        const outForDeliveryResponse = await new Promise((resolve, reject) => {
            outForDeliveryBtn.addEventListener('click', () => resolve("Order out for delivery"));
            setTimeout(() => reject("Time ran out"), 60000);
        });

        console.info(outForDeliveryResponse);

        infoText.innerHTML = "Order is out for delivery!";
        updateOrderStatus("Order is out for delivery! It will arrive soon.");

    } catch (error) {
        const actionsDiv = document.querySelector('.actions');
        actionsDiv.remove();

        const orderStatusDiv = document.getElementById('orderStatus');
        orderStatusDiv.innerHTML = "Order cancelled. Please try again!";

        console.warn(error);
    }
}

function load() {
    var orderBtn = document.getElementById('order-btn');
    orderBtn.addEventListener('click', (event) => {
        placeOrder();
    });
}

window.onload = function() { load(); }