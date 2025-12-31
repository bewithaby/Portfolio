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
    
    card1.onclick = function() { checkClick(card1) };
    card2.onclick = function() { checkClick(card2) };
    card3.onclick = function() { checkClick(card3) };

    projectsData = data;

    // Initial Load
    updateCard(cardsPosition[0]['card'], data[prevIndex(currentIndex, data.length)]);
    updateCard(cardsPosition[1]['card'], data[currentIndex]);
    updateCard(cardsPosition[2]['card'], data[nextIndex(currentIndex, data.length)]);
    
    refreshLanguages();
}

// --- NEW Helper Function to remove redundancy ---
function refreshLanguages() {
    clearLanguagesField();
    const field = document.getElementById('projects_languages');
    const currentLangs = projectsData[currentIndex]['languages'] || [];
    
    // Pass 'field' to avoid looking it up in the DOM for every single language
    currentLangs.forEach((lang, idx) => appendLanguageImage(lang, idx, field));
}

function updateCard(card, data) {
    card.children[0].textContent = data['title'];
    card.children[1].src = data['logo'];
    card.children[2].textContent = data['description'];

    // Robust button finding logic
    let buttonContainer = card.children[3];
    let button = buttonContainer.tagName === 'A' ? buttonContainer : buttonContainer.querySelector('a');
    if (!button) button = buttonContainer;

    button.innerHTML = ""; // Clear old icons/text

    let buttonText = "View Project";
    const url = (data['url'] || "").toLowerCase();

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        buttonText = "Watch Video";
    } else if (url.includes("github.com")) {
        buttonText = "View Code";
    } else if (url.includes("drive.google.com")) {
        buttonText = "View Document";
    }

    button.textContent = buttonText;
    button.href = data['url'];
    
    button.onclick = function(e) {
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
    }
}

function leftClick() {
    currentIndex = prevIndex(currentIndex, projectsData.length);
    refreshLanguages(); // Replaced duplicate code
    updateCard(cardsPosition[0]['card'], projectsData[prevIndex(currentIndex, projectsData.length)]);
}

function rightClick() {
    currentIndex = nextIndex(currentIndex, projectsData.length);
    refreshLanguages(); // Replaced duplicate code
    updateCard(cardsPosition[2]['card'], projectsData[nextIndex(currentIndex, projectsData.length)]);
}

function prevIndex(index, size) {
    return index === 0 ? size - 1 : index - 1;
}

function nextIndex(index, size) {
    return index === size - 1 ? 0 : index + 1;
}

function rotateLeft(arr) {
    arr.push(arr.shift());
    return arr;
}

function rotateRight(arr) {
    arr.unshift(arr.pop());
    return arr;
}
