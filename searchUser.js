var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function searchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchInput = document.getElementById('userInput').value;
        if (searchInput.trim() === '') {
            alert('Please enter a username.');
            return;
        }
        const apiUrl = `https://api.github.com/search/users?q=${searchInput}`;
        try {
            const response = yield fetch(apiUrl);
            const data = yield response.json();
            yield fetchUserDetails(data.items);
            if (data.items.length === 0) {
                const resultsContainer = document.getElementById('results');
                resultsContainer.innerHTML = '<p class="noResult">No user found</p>';
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
function fetchUserDetails(users) {
    return __awaiter(this, void 0, void 0, function* () {
        const detailedUsers = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
            const userDetailsResponse = yield fetch(user.url);
            const userDetails = yield userDetailsResponse.json();
            return userDetails;
        })));
        displayResults(detailedUsers);
    });
}
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        const reposCount = result.public_repos !== undefined ? result.public_repos : 0;
        const followersCount = result.followers !== undefined ? result.followers : 0;
        const resultInfo = `
            <img src="${result.avatar_url}"/>
            <div class="details">
            <h3>${result.login}</h3>
            <p>Followers: ${followersCount} | Repositories: ${reposCount}</p>
            <div class="githubLink"><a href="${result.html_url}" target="_blank">GitHub</a></div></div>
        `;
        resultDiv.innerHTML = resultInfo;
        resultsContainer.appendChild(resultDiv);
    });
}
