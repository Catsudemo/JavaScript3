'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Contributor {
  constructor(contributor) {
    this.contributor = contributor;
    this.contributions = contributions;
    this.avatar = avatar;
    this.prototype.attach = function displayContrib(contributor, contributions, avatar) {
      const contribDiv = document.querySelector('#contributorsDiv');
      const eachPersonUl = createAndAppend('ul', contribDiv)
      createAndAppend('li', eachPersonUl, { src: avatar, width: "42", id: 'avatar' })
      createAndAppend('li', eachPersonUl, { class: "badge", id: 'contbadge', text: `${contributions}` })
      createAndAppend('li', eachPersonUl, { text: `${contributor}` })
    }
  }
}
