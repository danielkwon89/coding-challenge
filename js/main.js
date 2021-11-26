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
        renderAppName(data.app)
        // call function here to render course information
        renderCourses(data.courses)
    });
}

function renderAppName(appName) {
    // creating h1 element for app name header and appending to DOM
    const header = document.createElement('h1')
    header.id = 'app-name-header'
    header.innerHTML = appName
    document.body.appendChild(header)
}

function renderCourses(courses) {
    // rendering courses container div element
    const coursesContainer = document.createElement('div')
    coursesContainer.id = 'courses-container'
    document.body.appendChild(coursesContainer)

    courses.forEach(course => {
        // creating a div element for each course
        const courseDiv = document.createElement('div')
        courseDiv.id = 'course'

        // creating h3, img, and p elements for course title, image, and description, respectively
        const courseName = document.createElement('h3')
        courseName.innerText = course.name
        courseName.id = 'course-header'

        const courseImage = document.createElement('img')
        courseImage.id = 'course-img'
        courseImage.src = course.screenshot

        const courseDescription = document.createElement('p')
        courseDescription.innerText = course.description

        // appending h3, img, and p elements to course div
        courseDiv.appendChild(courseName)
        courseDiv.appendChild(courseImage)
        courseDiv.appendChild(courseDescription)

        // appending course div to courses container
        coursesContainer.appendChild(courseDiv)
    })
}