const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use JavaScript to explore programming fundamentals.',
    technology: ['JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 110 should be completed first. This course will introduce students to programming with functions. It will use the JavaScript programming language to explore programming fundamentals including functions, events, and DOM manipulation.',
    technology: ['JavaScript'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

const courseList = document.querySelector('#course-list');

function displayCourses(filteredCourses) {
  courseList.innerHTML = '';

  filteredCourses.forEach((course) => {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    courseCard.textContent = `${course.subject} ${course.number}${course.completed ? ' ✓' : ''}`;

    if (course.completed) {
      courseCard.classList.add('completed');
    }

    courseList.appendChild(courseCard);
  });

  const totalCredits = filteredCourses.reduce(
    (total, course) => total + course.credits,
    0
  );

  document.querySelector('#total-credits').textContent = totalCredits;
}

const allButton = document.querySelector('#all-courses');
const cseButton = document.querySelector('#cse-courses');
const wddButton = document.querySelector('#wdd-courses');

allButton.addEventListener('click', () => {
  displayCourses(courses);
});

cseButton.addEventListener('click', () => {
  const cseCourses = courses.filter((course) => course.subject === 'CSE');
  displayCourses(cseCourses);
});

wddButton.addEventListener('click', () => {
  const wddCourses = courses.filter((course) => course.subject === 'WDD');
  displayCourses(wddCourses);
});

displayCourses(courses);