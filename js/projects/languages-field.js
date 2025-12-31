const badgeBaseURL = 'https://img.shields.io/badge/';
const badgeStyle = 'for-the-badge';

// Format 1 (Standard): 'Tag Name': ['SimpleIconsSlug', 'LogoColor', 'BackgroundColor']
// Format 2 (Local):    'Tag Name': ['LOCAL', 'filename.png', 'BackgroundColor', 'TextColor']
const logo = {
    // --- Standard Shields ---
    'Python': ['python', '3776AB', 'FFE873'],
    'JavaScript': ['javascript', 'f0db4f', '323330'],
    'HTML': ['html5', 'E34F26', 'FFFFFF'],
    'CSS': ['css3', '1572B6', 'FFFFFF'],
    'C': ['c', 'A8B9CC', '282C34'],
    'C++': ['cplusplus', '00599C', 'FFFFFF'],
    'C#': ['csharp', '239120', 'FFFFFF'],
    'n8n': ['n8n', 'FF6584', '222222'],
    
    // --- Local Custom Badges ---
    // [Type, Filename, BackgroundColor, TextColor]
    'Nano Banana Pro': ['LOCAL', 'banana_pro.png', '#FFD700', '#000000'], 
    'Veo 3.1':         ['LOCAL', 'veo.png', '#4285F4', '#FFFFFF'],
    'Suno AI':         ['LOCAL', 'suno.png', '#000000', '#FFFFFF'],
    'Eleven Labs':     ['LOCAL', 'eleven_labs.png', '#333333', '#FFFFFF'],
    'Seedream 4.5':    ['LOCAL', 'seedream.png', '#EA4C89', '#FFFFFF'],
    'VN':              ['LOCAL', 'vn_editor.png', '#0096FF', '#FFFFFF'],
    
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
        return `${badgeBaseURL}-${encodeURIComponent(language)}-lightgrey?style=${badgeStyle}`;
    }
}

function appendLanguageImage(language, index, field) {
    if (!field) field = document.getElementById('projects_languages');
    
    if (field && logo[language]) {
        if (logo[language][0] === 'LOCAL') {
            // --- BUILD CUSTOM HTML BADGE ---
            const container = document.createElement('div');
            container.className = 'custom-badge lang-column-default';
            
            // Apply colors from config
            container.style.backgroundColor = logo[language][2]; 
            container.style.color = logo[language][3];
            
            // 1. The Logo Image
            const img = document.createElement('img');
            img.src = `assets/tech/${logo[language][1]}`;
            img.alt = language;
            
            // 2. The Text Label
            const span = document.createElement('span');
            span.textContent = language.toUpperCase(); // Badges usually use uppercase
            
            container.appendChild(img);
            container.appendChild(span);
            field.appendChild(container);
            
        } else {
            // --- STANDARD SHIELD ---
            const img = document.createElement('img');
            img.src = buildURL(language);
            img.className = 'lang-column-default';
            field.appendChild(img);
        }
    }
}
