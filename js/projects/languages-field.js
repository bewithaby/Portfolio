const badgeBaseURL = 'https://img.shields.io/badge/';
const style = 'for-the-badge'

// Format: 'Tag Name': ['SimpleIconsSlug', 'LogoColor', 'BackgroundColor']
// You can find icon names (slugs) at https://simpleicons.org/
var logo = {
    'Python': ['Python', '3776AB', 'FFE873'],
    'C': ['c', 'FFFFFF', '00599C'],
    'C++': ['cplusplus', '00599C', 'FFE873'],
    'C#': ['csharp','239120', 'FFE873'],
    'HTML': ['HTML5', 'f06529', 'ebebeb'],
    'CSS': ['CSS3', '2965f1', 'ebebeb'],
    'Shell': ['gnu-bash', 'FFFFFF', '4EAA25'],
    'JavaScript': ['javascript', 'f0db4f', '323330'],
    'n8n': ['n8n', '00017E', 'ebebeb'],
    'Java': ['java', 'f89820', 'ebebeb'],
    'Nano Banana Pro': ['raspberrypi', 'C51A4A', 'FFD700'], // Yellow/Red (Banana Pi style)
    'Runway': ['artstation', 'FFFFFF', '7C3AED'], // Purple (Creative AI)
    'Veo 3.1': ['google', 'FFFFFF', '4285F4'], // Google Blue
    'Suno AI': ['soundcloud', 'FFFFFF', '000000'], // Black/White (Music vibe)
    'Eleven Labs': ['googleassistant', 'FFFFFF', '333333'], // Dark/Voice vibe
    'Photoshop': ['adobephotoshop', '001E36', '31A8FF'], // Official PS Blue
    'VN': ['ios', 'FFFFFF', '0096FF'], // Blue (Mobile Video Editor vibe)
    'Seedream 4.5': ['openai', 'FFFFFF', 'FF6B6B'], // Coral/Pink (Dreamy AI)
    'Seedance 1.0 Pro': ['tiktok', '000000', '69C9D0'], // Teal/Black (Motion/Dance)
    'Krea': ['behance', 'FFFFFF', '525252'], // Grey (Design tool)
};

function clearLanguagesField() {
    var field = document.getElementById('projects_languages');
    if (field) field.innerHTML = '';
}

function buildURL(language) {
    if (logo[language]) {
        logoName = logo[language][0];
        logoColor = logo[language][1];
        backgroundColor = logo[language][2];
        return `${badgeBaseURL}-${encodeURIComponent(language)}-${backgroundColor}?logo=${logoName}&style=${style}&logoColor=${logoColor}`;
    } else {
        // Fallback for missing tags
        console.warn(`Language '${language}' not found in logo definitions.`);
        return `${badgeBaseURL}-${encodeURIComponent(language)}-lightgrey?style=${style}`;
    }
}

function appendLanguageImage(language, index) {
    var img = document.createElement('img');
    img.src = buildURL(language);
    img.className = 'lang-column-default';
    var field = document.getElementById('projects_languages');
    if (field) field.appendChild(img);
}
