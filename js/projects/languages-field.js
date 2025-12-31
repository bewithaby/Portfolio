const badgeBaseURL = 'https://img.shields.io/badge/';
const badgeStyle = 'for-the-badge'; // Renamed to avoid generic 'style' conflict

// Format: 'Tag Name': ['SimpleIconsSlug', 'LogoColor', 'BackgroundColor']
const logo = {
    // --- Coding ---
    'Python': ['python', '3776AB', 'FFE873'],
    'JavaScript': ['javascript', 'f0db4f', '323330'],
    'HTML': ['html5', 'E34F26', 'FFFFFF'],
    'CSS': ['css3', '1572B6', 'FFFFFF'],
    'C': ['c', 'A8B9CC', '282C34'],
    'C++': ['cplusplus', '00599C', 'FFFFFF'],
    'C#': ['csharp', '239120', 'FFFFFF'],
    'n8n': ['n8n', 'FF6584', '222222'],
    'Java': ['java', 'f89820', 'ebebeb'],
    'Shell': ['gnu-bash', 'FFFFFF', '4EAA25'],

    // --- Hardware ---
    'Nano Banana Pro': ['arm', '0091BD', 'FFD700'], 

    // --- AI Tools ---
    'Veo 3.1': ['google', '4285F4', 'FFFFFF'], 
    'Suno AI': ['soundcloud', 'FF5500', '000000'], 
    'Eleven Labs': ['googleassistant', 'FFFFFF', '333333'], 
    'Runway': ['youtube', 'FF0000', 'FFFFFF'], 
    'Seedream 4.5': ['dribbble', 'EA4C89', 'FFFFFF'], 
    'Krea': ['behance', 'FFFFFF', '525252'],

    // --- Editing ---
    'VN': ['ios', 'FFFFFF', '0096FF'], 
    'Photoshop': ['adobephotoshop', '31A8FF', '001E36'],
};

function clearLanguagesField() {
    const field = document.getElementById('projects_languages');
    if (field) field.innerHTML = '';
}

function buildURL(language) {
    if (logo[language]) {
        // FIXED: Added 'const' to prevent global variable leakage
        const logoName = logo[language][0];
        const logoColor = logo[language][1];
        const backgroundColor = logo[language][2];
        return `${badgeBaseURL}-${encodeURIComponent(language)}-${backgroundColor}?logo=${logoName}&style=${badgeStyle}&logoColor=${logoColor}`;
    } else {
        console.warn(`Language '${language}' not found in logo definitions.`);
        return `${badgeBaseURL}-${encodeURIComponent(language)}-lightgrey?style=${badgeStyle}`;
    }
}

// Optimized: 'field' is now optional. If passed, we don't need to search DOM again.
function appendLanguageImage(language, index, field) {
    // If field wasn't passed, find it (fallback)
    if (!field) field = document.getElementById('projects_languages');
    
    if (field) {
        const img = document.createElement('img');
        img.src = buildURL(language);
        img.className = 'lang-column-default';
        field.appendChild(img);
    }
}
