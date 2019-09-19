'use strict';

/* global Util, Repository, Contributor */

class App {
  constructor(url) {
    this.initialize(url);
  }

  /**
   * Initialization
   * @param {string} url The GitHub URL for obtaining the organization's repositories.
   */
  async initialize(url) {
    this.makeDomElements()



    // Add code here to initialize your app
    // 1. Create the fixed HTML elements of your page
    // 2. Make an initial XMLHttpRequest using Util.fetchJSON() to populate your <select> element


    try {
      const repos = await Util.fetchJSON(url);
      this.repos = repos.map(repo => new Repository(repo));
      this.addReposToSelectElement()
    } catch (error) {
      this.renderError(error);
    }
  }

  makeDomElements() {
    const root = document.getElementById('root');
    let header = Util.createAndAppend('div', root, { class: 'header' });
    Util.createAndAppend('select', header, { id: 'repoSelector' });
    Util.createAndAppend('div', root, { id: 'container', class: 'flex-wrapper' });
    // Util.createAndAppend('div', root, { id: 'repoInfo' });
    // Util.createAndAppend('div', root, { id: 'repoContributors' });
  }

  addReposToSelectElement() {
    const selectorElement = document.getElementById('repoSelector');
    for (const repo of this.repos) {
      Util.createAndAppend('option', selectorElement, { text: repo.name() });
    }
    selectorElement.addEventListener('change', event => {
      const repoName = event.target.value;
      const chosenRepo = this.repos.filter(repo => repo.name() === repoName)[0];
      this.fetchContributorsAndRender(chosenRepo)

    })

  }

  /**
   * Removes all child elements from a container element
   * @param {*} container Container element to clear
   */
  static clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  /**
   * Fetch contributor information for the selected repository and render the
   * repo and its contributors as HTML elements in the DOM.
   * @param {number} index The array index of the repository.
   */
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

  /**
   * Render an error to the DOM.
   * @param {Error} error An Error object describing the error.
   */
  renderError(error) {
    console.log(error); // TODO: replace with your own code
  }
}

const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

window.onload = () => new App(HYF_REPOS_URL);