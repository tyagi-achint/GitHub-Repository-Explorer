async function searchUsers() {
    const searchInput = (<HTMLInputElement>document.getElementById('userInput')).value;

    if (searchInput.trim() === '') {
        alert('Please enter a username.');
        return;
    }

    const apiUrl = `https://api.github.com/search/users?q=${searchInput}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        await fetchUserDetails(data.items);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchUserDetails(users: any[]) {
    const detailedUsers = await Promise.all(
        users.map(async user => {
            const userDetailsResponse = await fetch(user.url);
            const userDetails = await userDetailsResponse.json();
            return userDetails;
        })
    );

    displayResults(detailedUsers);
}

function displayResults(results: any[]) {
    const resultsContainer = <HTMLDivElement>document.getElementById('results');


    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        const reposCount = result.public_repos !== undefined ? result.public_repos : 0;
        const followersCount = result.followers !== undefined ? result.followers : 0;

        const resultInfo = `
            <h3>${result.login}</h3>
            <p>Followers: ${followersCount} | Repositories: ${reposCount}</p>
            <a href="${result.html_url}" target="_blank">View on GitHub</a>
        `;

        resultDiv.innerHTML = resultInfo;
        resultsContainer.appendChild(resultDiv);
    });
}
