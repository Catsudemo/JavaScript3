'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Repository {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Render the repository info to the DOM.
   * @param {HTMLElement} container The container element in which to render the repository.
   */
  render(container) {
    const updated = this.repository.updated_at.split('T')[0]
    const created = this.repository.created_at.split('T')[0]
    App.clearContainer(container);
    Util.createAndAppend('h3', container, { text: this.name() });
    const detailsUL = Util.createAndAppend('ul', container, { id: 'detailsList' });
    Util.createAndAppend('li', detailsUL, { text: `Forks: ${this.repository.forks}` });
    Util.createAndAppend('li', detailsUL, { text: `Description: ${this.repository.description}` });
    Util.createAndAppend('li', detailsUL, { text: 'Created: ' + created });
    Util.createAndAppend('li', detailsUL, { text: 'Last updated: ' + updated });
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