async function searchRepositories() {
    const searchInput = (<HTMLInputElement>document.getElementById('searchInput')).value;

    if (searchInput.trim() === '') {
        alert('Please enter a repository name.');
        return;
    }

    const apiUrl = `https://api.github.com/search/repositories?q=${searchInput}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRepositories(data.items);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayRepositories(repositories: any[]) {
    const repositoriesList = <HTMLDivElement>document.getElementById('repositoriesList');
    repositoriesList.innerHTML = '';

    repositories.forEach(repo => {
        const repositoryDiv = document.createElement('div');
        repositoryDiv.classList.add('repository');

        const repositoryInfo = `
            <h3>${repo.full_name}</h3>
            <p>${repo.description || 'No description available.'}</p>
            <p>Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;

        repositoryDiv.innerHTML = repositoryInfo;
        repositoriesList.appendChild(repositoryDiv);
    });
}
