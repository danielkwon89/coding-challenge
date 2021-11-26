const catalogEndpoint = 'https://s3-us-west-1.amazonaws.com/assets.interplay-learning.com/interview-tests/simple-catalog/catalog.json'

document.addEventListener('DOMContentLoaded', () => {
    // making API call once DOM is loaded
    fetchCourses()
    
});

// defining function to make API call
function fetchCourses() {
    fetch(catalogEndpoint)
    .then(response => response.json())
    .then(data => {
        // call function here to render app name at top of page
        console.log(data.app)
        // call function here to render course information
        console.log(data.courses)
    });
}

function renderAppName() {

}

function renderCourses() {

}