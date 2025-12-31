async function getProjects() {
// Directly fetch the local configuration file
const projects = await getJson('js/projects/filter.json');
return projects;
}

async function getJson(url) {
    const response = await fetch(url);
    return response.json();
}

