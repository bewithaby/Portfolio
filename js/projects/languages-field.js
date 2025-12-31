const badgeBaseURL = 'https://img.shields.io/badge/';
const badgeStyle = 'for-the-badge';

// Format 1 (Standard): 'Tag Name': ['SimpleIconsSlug', 'LogoColor', 'BackgroundColor']
// Format 2 (Local):    'Tag Name': ['LOCAL', 'filename.png']
const logo = {
    // --- Standard Shields (Auto-Generated) ---
    'Python': ['python', '3776AB', 'FFE873'],
    'JavaScript': ['javascript', 'f0db4f', '323330'],
    'HTML': ['html5', 'E34F26', 'FFFFFF'],
    'CSS': ['css3', '1572B6', 'FFFFFF'],
    'C': ['c', 'A8B9CC', '282C34'],
    'C++': ['cplusplus', '00599C', 'FFFFFF'],
    'C#': ['csharp', '239120', 'FFFFFF'],
    'n8n': ['n8n', 'FF6584', '222222'],
    
    // --- Local Images (Files in assets/tech/) ---
    'Nano Banana Pro': ['LOCAL', 'banana.png'], 
    'Veo 3.1':         ['LOCAL', 'veo.png'],
    'Suno AI':         ['LOCAL', 'suno.png'],
    'Eleven Labs':     ['LOCAL', '11.png'],
    'Seedream 4.5':    ['LOCAL', 'seedream.png'],
    'VN':              ['LOCAL', 'vn.png'],
    
    // --- Mixed ---
    'Photoshop': ['adobephotoshop', '31A8FF', '001E36'],
};

function clearLanguagesField() {
    const field = document.getElementById('projects_languages');
    if (field) field.innerHTML = '';
}

function buildURL(language) {
    if (logo[language]) {
        const logoName = logo[language][0];
        const logoColor = logo[language][1];
        const backgroundColor = logo[language][2];
        return `${badgeBaseURL}-${encodeURIComponent(language)}-${backgroundColor}?logo=${logoName}&style=${badgeStyle}&logoColor=${logoColor}`;
    } else {
        console.warn(`Language '${language}' not found in logo definitions.`);
        return `${badgeBaseURL}-${encodeURIComponent(language)}-lightgrey?style=${badgeStyle}`;
    }
}

function appendLanguageImage(language, index, field) {
    if (!field) field = document.getElementById('projects_languages');
    
    if (field && logo[language]) {
        const img = document.createElement('img');
        
        // CHECK: Is this a local file or a shield?
        if (logo[language][0] === 'LOCAL') {
            // It is a local file
            img.src = `assets/tech/${logo[language][1]}`;
            img.alt = language; // Good for accessibility
        } else {
            // It is a standard shield
            img.src = buildURL(language);
        }
        
        img.className = 'lang-column-default';
        field.appendChild(img);
    }
}
