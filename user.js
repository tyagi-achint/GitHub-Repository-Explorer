var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function searchUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var searchInput, apiUrl, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchInput = document.getElementById('userInput').value;
                    if (searchInput.trim() === '') {
                        alert('Please enter a username.');
                        return [2 /*return*/];
                    }
                    apiUrl = "https://api.github.com/search/users?q=".concat(searchInput);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(apiUrl)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [4 /*yield*/, fetchUserDetails(data.items)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function fetchUserDetails(users) {
    return __awaiter(this, void 0, void 0, function () {
        var detailedUsers;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(users.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var userDetailsResponse, userDetails;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fetch(user.url)];
                                case 1:
                                    userDetailsResponse = _a.sent();
                                    return [4 /*yield*/, userDetailsResponse.json()];
                                case 2:
                                    userDetails = _a.sent();
                                    return [2 /*return*/, userDetails];
                            }
                        });
                    }); }))];
                case 1:
                    detailedUsers = _a.sent();
                    displayResults(detailedUsers);
                    return [2 /*return*/];
            }
        });
    });
}
function displayResults(results) {
    var resultsContainer = document.getElementById('results');
    results.forEach(function (result) {
        var resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        var reposCount = result.public_repos !== undefined ? result.public_repos : 0;
        var followersCount = result.followers !== undefined ? result.followers : 0;
        var resultInfo = "\n            <h3>".concat(result.login, "</h3>\n            <p>Followers: ").concat(followersCount, " | Repositories: ").concat(reposCount, "</p>\n            <a href=\"").concat(result.html_url, "\" target=\"_blank\">View on GitHub</a>\n        ");
        resultDiv.innerHTML = resultInfo;
        resultsContainer.appendChild(resultDiv);
    });
}
