'use strict';

const repoSelector = document.querySelector('#repoSelect');
const contribDiv = document.querySelector('#contributorsDiv');
const repoDiv = document.querySelector('#repo');

const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

//fetch the data from the URL and convert to json
// create the select element and populate with options. These should be the name of the repos in the json.
// when the user changes the selector go to the URL for that repo and get the json
// create a ul showing relevant data
// go to the URL of each contributor in the repo and fetch the data
// create a ul showing relevant data


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

function buildSelect(data, repoSelector) {
  data
    .map(repo => repo.name)
    .sort()
    .forEach(name => {
      createAndAppend('OPTION', repoSelector, { text: name, value: name });
    });
}

function main(url) {

  fetch(url)
    .then(response => {
      if (response.ok) return response
      throw new Error(response.statusText)
    })
    .then(response => response.json())
    .then(json => buildSelect(json, repoSelector))
    .catch(error => createAndAppend('div', root, { text: error, class: 'alert-error' }))
}


//ul contribDiv

function displayContrib(contributor, contributions, avatar) {

  // createAndAppend(ul, contribDiv, { id = })
  let eachPersonUl = createAndAppend('ul', contribDiv)

  createAndAppend('IMG', eachPersonUl, { src: avatar, width: "42", id: 'avatar' })

  createAndAppend('li', eachPersonUl, { class: "badge", id: 'contbadge', text: `${contributions}` })
  createAndAppend('li', eachPersonUl, { text: `${contributor}` })
  // createAndAppend('li', eachPersonUl, { text: `Contributions: ${contributions}`, id: 'contributionNumber' })

}

function displayRepo(repository, description, forks, updated) {

  let eachRepoUl = createAndAppend('ul', repoDiv)


  createAndAppend('li', eachRepoUl, { text: `Repository: ${repository}` })
  createAndAppend('li', eachRepoUl, { text: `Description: ${description}` })
  createAndAppend('li', eachRepoUl, { text: `Forks: ${forks}` })
  createAndAppend('li', eachRepoUl, { text: `Updated: ${updated}` })


}

const selectElement = document.querySelector('.selector');

selectElement.addEventListener('change', event => {
  const result = document.querySelector('.result');
  let repo = document.getElementById('repoSelect').value;
  let repoURL = `https://api.github.com/repos/HackYourFuture/${repo}`;
  let contribURL = `https://api.github.com/repos/HackYourFuture/${repo}/contributors`;

  main(HYF_REPOS_URL);

  fetch(repoURL)
    .then(response => {
      if (response.ok) return response
      throw new Error(response.statusText)
    })
    .then(response => response.json())
    .then(data => {
      repoDiv.innerHTML = '';
      let repository = data.name;
      let description = data.description;
      let forks = data.forks;
      let updated = data.updated_at.split("T", 1);
      displayRepo(repository, description, forks, updated);
    })
    .catch(error => createAndAppend('div', root, { text: error, class: 'alert-error' }));

  fetch(contribURL)
    .then(response => {
      if (response.ok) return response
      throw new Error(response.statusText)
    })
    .then(response => response.json())
    .then(data => {
      contribDiv.innerHTML = '';
      data.forEach(object => {
        let contributor = object.login;
        let contributions = object.contributions;
        let avatar = object.avatar_url;
        displayContrib(contributor, contributions, avatar);
      });
      console.log('Here is the contribdata');
    })
    .catch(error => createAndAppend('div', root, { text: error, class: 'alert-error' }))
})



window.onload = () => main(HYF_REPOS_URL)
