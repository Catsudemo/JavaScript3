'use strict';

class Repository {
  constructor(repository) {
    this.repository = repository;
  }

  render(container) {
    const updated = this.repository.updated_at.split('T')[0];
    const created = this.repository.created_at.split('T')[0];
    App.clearContainer(container);
    Util.createAndAppend('div', container, { id: 'repoInnerContainer' });
    let repoInnerContainer = document.getElementById('repoInnerContainer');
    Util.createAndAppend('h3', repoInnerContainer, { text: this.name() });
    const detailsUL = Util.createAndAppend('ul', repoInnerContainer, { id: 'detailsList' });
    Util.createAndAppend('li', detailsUL, { text: `Forks: ${this.repository.forks}` });
    Util.createAndAppend('li', detailsUL, { text: `Description: ${this.repository.description}` });
    Util.createAndAppend('li', detailsUL, { text: 'Created: ' + created });
    Util.createAndAppend('li', detailsUL, { text: 'Last updated: ' + updated });
  }

  fetchContributors() {
    return Util.fetchJSON(this.repository.contributors_url);
  }

  name() {
    return this.repository.name;
  }
}
