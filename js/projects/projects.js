async function getProjects() {
    try {
        const projects = await getJson('js/projects/filter.json');
        return projects;
    } catch (error) {
        console.error("Failed to load project data. Check filter.json formatting.", error);
        return []; // Return empty array to prevent crash
    }
}

async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
