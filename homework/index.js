'use strict';

const repoSelector = document.querySelector('#repoSelect');
const contribDiv = document.querySelector('#contribDiv');
const repoDiv = document.querySelector('#repo');

function fetchJSON(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader = 'Catsudemo https://api.github.com';
  xhr.responseType = 'json';
  xhr.onload = () => {
    if (xhr.status < 400) {
      cb(null, xhr.response);
    } else {
      cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
    }
  };
  xhr.onerror = () => cb(new Error('Network request failed'));
  xhr.send();
}

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

function initPage(data, repoSelector) {
  buildSelect(data, repoSelector);
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
  fetchJSON(url, (err, data) => {
    const root = document.getElementById('root');
    if (err) {
      createAndAppend('div', root, { text: err.message, class: 'alert-error' });
    } else {
      // createAndAppend('pre', root, { text: JSON.stringify(data, null, 2) });
      //  buildSelect(data,repoSelector)
      initPage(data, repoSelector);
    }
  });
}

const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

function displayContrib(contributor, contributions, avatar) {
  const eachPersonUl = document.createElement('ul');
  const contributorName = document.createElement('li');
  contributorName.innerText = `Username: ${contributor}`;
  eachPersonUl.appendChild(contributorName);
  const eachContributions = document.createElement('li');
  eachContributions.innerText = `Contributions: ${contributions}`;
  eachPersonUl.appendChild(eachContributions);
  contribDiv.appendChild(eachPersonUl);
  const eachAvatar = document.createElement('IMG');
  eachAvatar.innerhtml = `<img src=${avatar}'>`;
  contribDiv.appendChild(eachAvatar);
}

function displayRepo(repository, description, forks, updated) {
  const eachRepoUl = document.createElement('ul');
  const eachName = document.createElement('li');
  eachName.innerText = `Repository: ${repository}`;
  eachRepoUl.appendChild(eachName);
  const eachDescription = document.createElement('li');
  eachDescription.innerText = `Contributions: ${description}`;
  eachRepoUl.appendChild(eachDescription);
  const eachForks = document.createElement('li');
  eachForks.innerText = `Forks: ${forks}`;
  eachRepoUl.appendChild(eachForks);
  const eachUpdated = document.createElement('li');
  eachUpdated.innerText = `Updated: ${updated}`;
  eachRepoUl.appendChild(eachUpdated);
  repoDiv.appendChild(eachRepoUl);
}

const selectElement = document.querySelector('.selector');

selectElement.addEventListener('change', event => {
  const result = document.querySelector('.result');
  let repo = document.getElementById('repoSelect').value;
  let repoURL = `https://api.github.com/repos/HackYourFuture/${repo}`;
  let contribURL = `https://api.github.com/repos/HackYourFuture/${repo}/contributors`;

  main(HYF_REPOS_URL);

  fetchJSON(repoURL, (err, data) => {
    const root = document.getElementById('root');
    if (err) {
      createAndAppend('div', root, { text: err.message, class: 'alert-error' });
    } else {
      repoDiv.innerHTML = '';
      let repository = data.name;
      let description = data.description;
      let forks = data.forks;
      let updated = data.updated_at;
      displayRepo(repository, description, forks, updated);
    }
    console.log('Here is the repodata');
  });

  fetchJSON(contribURL, (err, data) => {
    const root = document.getElementById('root');
    if (err) {
      createAndAppend('div', root, { text: err.message, class: 'alert-error' });
    } else {
      contribDiv.innerHTML = '';
      data.forEach(object => {
        let contributor = object.login;
        let contributions = object.contributions;
        let avatar = object.avatar_url;
        displayContrib(contributor, contributions, avatar);
      });
      console.log('Here is the contribdata');
    }
  });
});

window.onload = () => main(HYF_REPOS_URL);
