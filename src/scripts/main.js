'use strict';

const LIST_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const DETAILS_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const ul = document.createElement('ul');
const combinedData = [];

const getData = (url) => {
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`${res.status} and some other error text`)
      };

      if (!res.headers.get('content-type').includes('application/json')) {
        return Promise.reject('Content type is not supported');
      }

      return res.json();
    });
};

const getPhones = () => {
  setTimeout((
    getData(LIST_URL)
      .then(result => {
        return result.map(el => {
          combinedData.push(el);

          return getPhonesDetails(el.id);
        });
      })
  ), 5000);
};

const getPhonesDetails = (id) => {
  getData(`${DETAILS_URL}${id}.json`)
    .then(result => {
      const li = document.createElement('li');

      combinedData.push(result);

      li.innerText = result.name;
      ul.append(li);
    });
};

document.body.append(ul);
getPhones();
console.log({combinedData});
