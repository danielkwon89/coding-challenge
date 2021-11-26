// fetch request to API endpoint

fetch('https://s3-us-west-1.amazonaws.com/assets.interplay-learning.com/interview-tests/simple-catalog/catalog.json')
  .then(response => response.json())
  .then(data => console.log(data));