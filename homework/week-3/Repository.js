'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
const repoDiv = document.querySelector('#repo');

class Repository {
  constructor(name, description, forks, updated, liveDiv) {
    this.name = name;
    this.description = description;
    this.forks = forks;
    this.updated = updated;
    this.container = liveDiv;
  }

  /**
   * Render the repository info to the DOM.
   * @param {HTMLElement} container The container element in which to render the repository.
   */
  render(repoDiv) {
    // TODO: replace the next line with your code.
    Util.createAndAppend('ul', repoDiv, JSON.stringify(this.repository, null, 2));
  }

  /**
   * Returns an array of contributors as a promise
   */
  fetchContributors() {
    return Util.fetchJSON(this.repository.contributors_url);
  }

  /**
   * Returns the name of the repository
   */
  name() {
    return this.repository.name;
  }
}
