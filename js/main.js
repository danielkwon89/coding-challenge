const catalogEndpoint = 'https://s3-us-west-1.amazonaws.com/assets.interplay-learning.com/interview-tests/simple-catalog/catalog.json'

document.addEventListener('DOMContentLoaded', () => {
    // making API call on DOM load
    fetchCourses()
});

// defining function to make API call
function fetchCourses() {
    fetch(catalogEndpoint)
    .then(response => response.json())
    .then(data => {
        // call function here to render app name at top of page
        renderAppName(data.app)
        // call function here to sort courses and assign them to the sortedCourses variable
        const sortedCourses = sortCourses(data.courses)
        // call function here to render sorted course information
        renderCourses(sortedCourses)
    });
}

function renderAppName(appName) {
    // creating h1 element for app name header and appending to DOM
    const header = document.createElement('h1')
    header.id = 'app-name-header'
    if (appName === 'SkillMill') {
        // styles 'SKILLMILL' header with orange accent
        header.innerHTML = "<span id='orange'>SKILL</span>MILL"
        document.body.appendChild(header)
    }
    else {
        header.innerHTML = appName.toUpperCase()
        document.body.appendChild(header)
    }
}

function sortCourses(courses) {
    let sortedCourses = []
    const tempObj = {}

    courses.forEach(course => {
        // filling temp object with arrays of courses organized by difficulty level key 
        // e.g. tempObj = {1: [...], 2: [...], 3: [...]}
        const difficultyLevel = `${course.difficulty_level}`
        tempObj[difficultyLevel] ? tempObj[difficultyLevel].push(course) : tempObj[difficultyLevel] = [course]
    })

    // iterating through tempObj keys and sorting each array before merging it into sortedCourses array
    for (const courses in tempObj) {
        // .toLowerCase() called to alphabetically sort the course names correctly
        const sorted = tempObj[courses].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
        sortedCourses = sortedCourses.concat(sorted)
    }

    // returning sortedCourses which should now be sorted by difficulty level then alphabetically
    return sortedCourses
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
        courseDiv.appendChild(courseImage)
        courseDiv.appendChild(courseName)
        courseDiv.appendChild(courseDescription)

        // adding event listener to course div to alert user that the course has been started
        courseDiv.addEventListener('click', function() {
            window.alert(`${course.name} has been chosen!`)
        })

        // appending course div to courses container
        coursesContainer.appendChild(courseDiv)
    })
}