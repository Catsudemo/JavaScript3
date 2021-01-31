

//fetch the data from the URL and convert to json
// create the select element and populate with options. These should be the name of the repos in the json.
// when the user changes the selector go to the URL for that repo and get the json
// create a ul showing relevant data
// go to the URL of each contributor in the repo and fetch the data
// create a ul showing relevant data

const repoSelector = document.querySelector('#repoSelect');
const contribDiv = document.querySelector('#contributorsDiv');
const repoDiv = document.querySelector('#repo');
const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';



function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.keys(options).forEach(key => {
    const value = options[key];
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

// Makes new repository objects

// class Repository {
//   constructor(name, description, forks, updated, liveDiv) {
//     this.repository = name;
//     this.description = description;
//     this.forks = forks;
//     this.updated = updated;
//     this.location = liveDiv;
//     this.prototype.attach = function displayRepo() {
//       let eachRepoUl = createAndAppend('ul', liveDiv)
//       createAndAppend('li', eachRepoUl, { text: `Repository: ${repository}` })
//       createAndAppend('li', eachRepoUl, { text: `Description: ${description}` })
//       createAndAppend('li', eachRepoUl, { text: `Forks: ${forks}` })
//       createAndAppend('li', eachRepoUl, { text: `Updated: ${updated}` })
//     }
//   }
// }

// Makes new contributor objects

// class Contributor {
//   constructor(name, contributions, avatar, containDiv) {
//     this.contributor = name;
//     this.contributions = contributions;
//     this.avatar = avatar;
//     this.location = containDiv
//     this.prototype.attach = function displayContrib() {
//       const eachPersonUl = createAndAppend('ul', containDiv)
//       createAndAppend('li', eachPersonUl, { class: 'avatarli', id: `avatarli${contributor}` })
//       createAndAppend('li', eachPersonUl, { class: "badge", text: `${contributions}` })
//       createAndAppend('li', eachPersonUl, { text: `${contributor}` })
//       let myAvatar = document.querySelector(`#avatarli${contributor}`);
//       createAndAppend('IMG', myAvatar, { src: avatar, class: 'avatar' })
//     }
//   }
// }

function displayContrib(contributor, contributions, avatar) {
  let eachPersonUl = createAndAppend('ul', contribDiv)
  createAndAppend('IMG', eachPersonUl, { src: avatar, id: 'avatar' })
  createAndAppend('li', eachPersonUl, { class: "badge", id: 'contbadge', text: `${contributions}` })
  createAndAppend('li', eachPersonUl, { text: `${contributor}` })
}

function displayRepo(repository, description, forks, updated) {
  let eachRepoUl = createAndAppend('ul', repoDiv)
  createAndAppend('li', eachRepoUl, { text: `Repository: ${repository}` })
  createAndAppend('li', eachRepoUl, { text: `Description: ${description}` })
  createAndAppend('li', eachRepoUl, { text: `Forks: ${forks}` })
  createAndAppend('li', eachRepoUl, { text: `Updated: ${updated}` })
}

//gets data from URL and converts to json
async function getJson(url) {
  const response = await fetch(url);
  const returnedJson = await response.json();
  return returnedJson
}

function buildSelect(data, repoSelector) {
  clearHTML(repoSelector)
  data
    .map(repo => repo.name)
    .map(repo => repo.toUpperCase())
    .sort()
    .forEach(name => {
      createAndAppend('OPTION', repoSelector, { text: name, value: name });
    })
}


function doRepo(givenRepoData) {
  clearHTML(repoDiv)
  let repository = givenRepoData.name;
  let description = givenRepoData.description;
  let forks = givenRepoData.forks;
  let updated = givenRepoData.updated_at.split("T", 1);
  displayRepo(repository, description, forks, updated);
}

function doContributors(givenContribData) {
  clearHTML(contribDiv);
  givenContribData.forEach(object => {
    let contributor = object.login;
    let contributions = object.contributions;
    let avatar = object.avatar_url;
    displayContrib(contributor, contributions, avatar);
  });
}

function clearHTML(elementToClear) {
  const el = elementToClear
  while (el.firstChild) el.removeChild(el.firstChild);
}

async function displayPage(repoURL, contribURL) {
  let foundRepoData = await getJson(repoURL)
  let foundContribData = await getJson(contribURL)
  doRepo(foundRepoData);
  doContributors(foundContribData);

}

async function main(url) {
  const homepageJson = await getJson(url)
  buildSelect(homepageJson, repoSelector)

  const selectElement = document.querySelector('.selector');
  selectElement.addEventListener('change', event => {
    let repo = document.getElementById('repoSelect').value;
    let repoURL = `https://api.github.com/repos/HackYourFuture/${repo}`;
    let contribURL = `https://api.github.com/repos/HackYourFuture/${repo}/contributors`;
    displayPage(repoURL, contribURL);
  })

}


window.onload = () => main(HYF_REPOS_URL)
