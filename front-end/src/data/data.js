import kant from "../img/kant.gif";
import notes from "../img/notes.gif";
import trueBusiness from "../img/true.gif";

export const packages = [
  {
    name: "Axios",
    username: "axios",
  },
  {
    name: "Chai",
    username: "chaijs",
  },
  {
    name: "Django",
    username: "django",
  },
  {
    name: "Express",
    username: "expressjs",
  },
  {
    name: "JavaScript",
    username: "javascript",
  },
  {
    name: "Mocha",
    username: "mochajs",
  },
  {
    name: "MongoDB",
    username: "mongodb",
  },
  {
    name: "Node",
    username: "nodejs",
  },
  {
    name: "Python",
    username: "python",
  },
  {
    name: "React",
    username: "reactjs",
  },
  {
    name: "Redux",
    username: "reduxjs",
  },
];

export const projects = [
  {
    name: "True Business",
    git: "https://github.com/Lambda-School-Labs/CS10-business-review",
    deployed: "https://www.realbusinessreviews.net/",
    description: [
      "A business review website that I and three others made as our capstone project for Lambda School.",
      "It is a project made with a MERN stack.",
      "We utilize the Google API (Places, Place Details, Photos) to retrieve real search results and the Cloudinary API in order to store uploaded photos for reviews.",
      "This was a group project, and my contribution was primarily on the front-end, as well as the Google API calls.",
    ],
    gif: trueBusiness,
  },
  {
    name: "Kant, the Paladin",
    git: "https://github.com/cwindeknecht/phil",
    deployed: "https://kantthepaladin.netlify.com/",
    description: [
      "This is a point-and-click game that was thrown together for my brother, a professor at the University of Tennessee at Knoxville, to use in his philosophy class.",
      "It was made with React and Redux.",
      "There are admittedly plenty of UI/UX problems, as well as some design inconsistencies.",
      "He was happy with the state of the project, and I was just about to start Lambda Labs, so I left it be.",
      "Whether or not he wants more of these or this is just a one-off, I plan to clean it up.",
      "I also want to add an admin page (Python/Django refactor?) and connect a backend DB.",
    ],
    gif: kant,
  },
  {
    name: "Lambda Notes",
    git: "",
    deployed: "https://lambdanotescw.netlify.com/",
    description: [
      "A note-taking app made early on in my tenure at Lambda",
      "The MERN stack, with Redux, was used to make this application.",
      "Despite being a bit ugly, I was pretty proud of this considering I had only known React and the like for a couple of months.",
    ],
    gif: notes,
  },
];
