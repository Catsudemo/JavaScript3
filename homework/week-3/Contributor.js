'use strict';

class Contributor {
  constructor(contributor) {
    this.contributor = contributor;
  }

  name() {
    return this.contributor.login;
  }

  render(container) {
    const contributorDiv = Util.createAndAppend('div', container, { id: 'contribDiv' });
    const contributorList = Util.createAndAppend('ul', contributorDiv, { id: 'contribList' });
    Util.createAndAppend('ul', contributorDiv, { id: +this.name() });
    Util.createAndAppend('li', contributorList, { text: 'Name: ' + this.name() });
    Util.createAndAppend('li', contributorList, {
      text: 'Contributions: ' + this.contributor.contributions,
    });
    Util.createAndAppend('IMG', contributorDiv, {
      src: this.contributor.avatar_url,
      id: `${this.name()}Avatar`,
    });
  }
}
