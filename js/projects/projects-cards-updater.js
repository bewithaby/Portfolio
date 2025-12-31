var card1, card2, card3, leftSlider, centerSlider, rightSlider, cardsPosition;
var projectsData;
var currentIndex = 0;

function initCarousel(data) {
    card1 = document.getElementById('left_card');
    card2 = document.getElementById('center_card');
    card3 = document.getElementById('right_card');
    leftSlider = document.getElementById('left_slider');
    centerSlider = document.getElementById('center_slider');
    rightSlider = document.getElementById('right_slider');
    cardsPosition = [
        { 'card': card1, 'slider': leftSlider },
        { 'card': card2, 'slider': centerSlider },
        { 'card': card3, 'slider': rightSlider }
    ];
    
    clearLanguagesField();
    
    card1.onclick = function() { checkClick(card1) };
    card2.onclick = function() { checkClick(card2) };
    card3.onclick = function() { checkClick(card3) };

    updateCard(cardsPosition[0]['card'], data[prevIndex(currentIndex, data.length)]);
    updateCard(cardsPosition[1]['card'], data[currentIndex]);
    updateCard(cardsPosition[2]['card'], data[nextIndex(currentIndex, data.length)]);
    
    // SAFETY FIX: Added '|| []' to prevent crashes if 'languages' is missing
    (data[currentIndex]['languages'] || []).forEach(appendLanguageImage);
    
    projectsData = data;
}

function updateCard(card, data) {
    // 1. Update Title, Logo, Description
    card.children[0].textContent = data['title'];
    card.children[1].src = data['logo'];
    card.children[2].textContent = data['description'];

    // 2. Find the correct button element
    // We look at the 4th element (index 3). If it's a link, use it.
    // If it's a wrapper div, look for the link inside it.
    let buttonContainer = card.children[3];
    let button = buttonContainer.tagName === 'A' ? buttonContainer : buttonContainer.querySelector('a');
    
    // Fallback: If we still can't find a specific link tag, just use the container
    if (!button) button = buttonContainer;

    // 3. Determine the button text
    let buttonText = "View Project";
    const url = (data['url'] || "").toLowerCase();

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        buttonText = "Watch Video";
    } else if (url.includes("github.com")) {
        buttonText = "View Code";
    } else if (url.includes("drive.google.com")) {
        buttonText = "View Document";
    }

    // 4. Update text and link
    button.textContent = buttonText; 
    button.href = data['url'];
    
    // 5. Ensure the click opens in a new tab
    button.onclick = function(e) {
        // Allow default Ctrl+Click behavior, otherwise open in new tab
        if(!e.ctrlKey && !e.metaKey){
            e.preventDefault();
            window.open(data['url'], '_blank').focus();
        }
    };
}

function checkClick(card) {
    switch (card) {
        case cardsPosition[0]['card']:
            cardsPosition = rotateRight(cardsPosition);
            leftClick();
            break;
        case cardsPosition[2]['card']:
            cardsPosition = rotateLeft(cardsPosition);
            rightClick();
            break;
        default:
            break;
    }
}

function leftClick() {
    clearLanguagesField();
    currentIndex = prevIndex(currentIndex, projectsData.length);
    // SAFETY FIX: Added '|| []'
    (projectsData[currentIndex]['languages'] || []).forEach(appendLanguageImage);
    updateCard(cardsPosition[0]['card'], projectsData[prevIndex(currentIndex, projectsData.length)]);
}

function rightClick() {
    clearLanguagesField();
    currentIndex = nextIndex(currentIndex, projectsData.length);
    // SAFETY FIX: Added '|| []'
    (projectsData[currentIndex]['languages'] || []).forEach(appendLanguageImage);
    updateCard(cardsPosition[2]['card'], projectsData[nextIndex(currentIndex, projectsData.length)]);
}

function prevIndex(index, size) {
    return index == 0 ? size - 1 : index - 1;
}

function nextIndex(index, size) {
    return index == size - 1 ? 0 : index + 1;
}

function rotateLeft(arr) {
    let first = arr.shift();
    arr.push(first);
    return arr;
}

function rotateRight(arr) {
    let last = arr.pop();
    arr.unshift(last);
    return arr;
}
