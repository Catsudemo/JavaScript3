'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Contributor {
  constructor(contributor) {
    this.contributor = contributor;
  }

  name() {
    return this.contributor.login;
  }
  /**
   * Render the contributor info to the DOM.
   * @param {HTMLElement} container The container element in which to render the contributor.
   */
  render(container) {
    const contributorDiv = Util.createAndAppend('div', container, { id: 'contribDiv' });
    const contributorList = Util.createAndAppend('ul', contributorDiv, { id: 'contribList' });
    Util.createAndAppend('ul', contributorDiv, { id: + this.name() });
    Util.createAndAppend('li', contributorList, { text: 'Name: ' + this.name() });
    Util.createAndAppend('li', contributorList, { text: 'Contributions: ' + this.contributor.contributions });
    Util.createAndAppend('IMG', contributorDiv, { src: this.contributor.avatar_url, id: `${this.name()}Avatar` });
  }

}