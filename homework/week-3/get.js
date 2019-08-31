function get(url) {
  return fetch(url)
    .then(response => {
      if (response.ok)
        return response;
      throw new Error(response.statusText);
    })
    .then(response => response.json())
    .then(repoSelector.innerHTML = '')
    .then(json => buildSelect(json, repoSelector))
    .catch(error => createAndAppend('div', root, { text: error, class: 'alert-error' }));
}
