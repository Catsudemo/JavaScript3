'use strict';

class App {
  constructor(url) {
    this.initialize(url);
  }

  async initialize(url) {
    this.makeDomElements();

    try {
      const repos = await Util.fetchJSON(url);
      this.repos = repos.map(repo => new Repository(repo));
      this.addReposToSelectElement();
    } catch (error) {
      this.renderError(error);
    }
  }

  makeDomElements() {
    const root = document.getElementById('root');
    let header = Util.createAndAppend('div', root, { class: 'header' });
    Util.createAndAppend('select', header, { id: 'repoSelector' });
    Util.createAndAppend('div', root, { id: 'container', class: 'flex-wrapper' });
  }

  addReposToSelectElement() {
    const selectorElement = document.getElementById('repoSelector');
    for (const repo of this.repos) {
      Util.createAndAppend('option', selectorElement, { text: repo.name() });
    }
    selectorElement.addEventListener('change', event => {
      const repoName = event.target.value;
      const chosenRepo = this.repos.filter(repo => repo.name() === repoName)[0];
      this.fetchContributorsAndRender(chosenRepo);
    });
  }

  static clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  async fetchContributorsAndRender(chosenRepo) {
    try {
      const repo = chosenRepo;
      const contributors = await repo.fetchContributors();

      const bigContainer = document.getElementById('container');
      App.clearContainer(container);

      const leftDiv = Util.createAndAppend('div', bigContainer, { id: 'repoInfo' });
      const rightDiv = Util.createAndAppend('div', bigContainer, { id: 'repoContributors' });

      const contributorList = Util.createAndAppend('ul', rightDiv);

      repo.render(leftDiv);

      contributors
        .map(contributor => new Contributor(contributor))
        .forEach(contributor => contributor.render(contributorList));
    } catch (error) {
      this.renderError(error);
    }
  }

  renderError(error) {
    console.log(error);
  }
}

const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

window.onload = () => new App(HYF_REPOS_URL);
