import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

const RESUME = {
  projects: [
    {
      "name": "Nextjs project",
      "features": [
        "Write my own Tailwind style CSS for project",
        "Implement graphql server with mongoose",
        "Build expense tracking page with React and Chart.js"
      ]
    },
    {
      "name": "Samliweisen Resume",
      "features": [
        "Design and implement with HTML5/CSS3 with mobile first design",
        "Created with React, React Router, React Redux",
        "Implemented styled-component in react component",
        "Host with Nodejs, expressJs, MongoDB as backend microsserver"
      ]
    }
  ],
  experiences: [
    {
      "duty": [
        "Lead team members to rewrite MRIS portal from Jquery to React.js",
        "Lead team members to build reusable HTML components with tailwind style for lottery ticket design",
        "Conduct code reviews and provide constructive feedback to ensure code quality and adherence to best practices",
        "Created detailed design documentation, unit test plans, and well-documented Java code with Summerboot framework.",
        "Learned company standards of application software development, Agile, and iterative development methodologies."
      ],
      "title": "Front End Developer",
      "company": "OLG",
      "start_date": "2022-11",
      "end_date": "",
    },
    {
      "duty": [
        "Write semantic well structure HTML5/CSS3, SASS, Bootstrap with responsive design",
        "Designs, develops scalable, reusable, innovative solutions with Vuejs,ReactJs,React Native",
        "Build and maintained Nodejs server APIs, implementing RESTful endpoints and handling database interactions",
        "Successfully implement basic elasticsearch engine for millions data search feature",
        "Generate thousand of map static image with Mapbox Geocoding api, reduce api call",
        "Train and help new employees to be familiar with project structure"
      ],
      "title": "Front End Developer",
      "company": "Real Master Inc",
      "start_date": "2018-10-23",
      "end_date": "2022-11-17",
    },
    {
      "duty": [
        "Convert product image to use Cloudinary"
      ],
      "title": "Front End Deveploer",
      "company": "Canada Goose",
      "start_date": "2018-05-01",
      "end_date": "2018-10-22",
    },
    {
      "duty": [
        "Create REST web services and implement restful api with Ajax",
        "Build interactive user interface with angularJS and jQuery",
        "Work with designer to create and implement modernized user interface with HTML5/CSS3",
        "Successfully created web pages and test on BrowserStack and make sure they are compatible with popular web browsers",
        "Train and help new employees to be familiar with project structure"
      ],
      "title": "Web Developer",
      "company": "JMIR",
      "start_date": "2017-08-01",
      "end_date": "2018-04-30",
    },
    {
      "duty": [
        "Took the initiative and a self-directed approach to learning to understand and build complex interact UIs with ReactJS",
        "Translate photoshop designs into pixel perfect HTML5/CSS3",
        "Build maintainable and scalable CSS with BEM architecture pattern",
        "Help build platforms that enable clients to create purposeful, goal-oriented websites to support their marketing needs",
        "Successfully developed and maintained CMS web application for Starwood Hotels and Resorts, Design Hotels and New Castle Hotel brands",
        "Develop web application using Google Map API and also implemented AutoNavi Map to make sure users in China are able to access map features (note that the majority of Google API’s have been banned in China, fortifying the need for alternate APIs)"
      ],
      "title": "Web Developer",
      "company": "Web Canada Inc.",
      "start_date": "2013-10-01",
      "end_date": "2016-07-01",
    },
    {
      "duty": [
      ],
      "title": "Intern student web developer",
      "company": "SCMA",
      "start_date": "2013-05-01",
      "end_date": "2013-08-30",
    }
  ]
};

interface Experience {
  _id?: string
  duty: Array<string>,
  title: string,
  company: string,
  start_date: string,
  end_date: string
};

const emptyExperience: Experience = {
  _id: '',
  title: '',
  duty: [],
  company: '',
  start_date: '',
  end_date: ''
};

const EXPERIENCE_FORM_FIELDS = ['title', 'company', 'start_date', 'end_date'];

const ResumePage: NextPage = () => {
  const [resume, setResume] = useState(RESUME);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(emptyExperience);

  const handleExperience = (ex: any) => {
    setShowExperienceForm(true);
    setCurrentExperience(ex);
  }

  const experiencesHTML = resume.experiences.map((e) =>
    <article className='my-3' key={e.company} onClick={() => handleExperience(e)}>
      <h3 className='font-bold border-l-2 border-black pl-2'>{e.title} - {e.company}</h3>
      <p className='text-gray-600'>{e.start_date} - {e.end_date || 'Present'}</p>
      {e.duty &&
        <ul className='list-disc list-inside text-slate-900 dark:text-slate-600'>
          {e.duty.map((duty) => <li key={duty}>{duty}</li>)}
        </ul>
      }
    </article>
  )

  const projectsHTML = resume.projects.map((p) =>
    <article className='my-3' key={p.name}>
      <h3 className='font-bold border-l-2 border-black pl-2'>{p.name}</h3>
      {p.features &&
        <ul className='list-disc list-inside text-slate-900 dark:text-slate-600'>
          {p.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
      }
    </article>
  );

  return (
    <>
      {/* <section className='fixed top-0 left-0 w-full h-full bg-black-300'>    </section> */}
      {/* {showExperienceForm &&
      <form className='fixed top-1/2 left-1/2 mx-auto w-96 bg-white p-2'>
        {EXPERIENCE_FORM_FIELDS.map((field)=>
        <input key={field} className='p-2 mb-3 w-full border rounded' placeholder={field} value={currentExperience[field]} />
        )}
      </form>
      } */}
      <h1 className='text-center font-bold text-2xl font-mono'>Sam Resume</h1>
      <section className='mt-4'>
        <p>Linkedin</p>
        <p>weisen.li@mail.utoronto.ca</p>
        <p>Toronto, ON</p>
      </section>
      <section className='mt-4'>
        <h2 className='p-2 text-white bg-black text-lg inline-block'>Summary</h2>
        <p className='font-sans'>Passionate front-end web developer with <span className='underline decoration-sky-700'>8 years</span> of experience using <span className='underline decoration-pink-500'>JavaScript, React, Vue, HTML5, and CSS3</span> to build all aspects of the user experience and user interface for client-facing web applications.
          Able to provide technical solutions and work under pressure to achieve company goals</p>
      </section>
      <section className='mt-4'>
        <h2 className='p-2 text-white bg-black text-lg inline-block'>Technical Skills</h2>
        <p><b>Web Front End:</b> HTML5, CSS3, JavaScript, ReactJs, VueJs, Angular, JQuery, SASS, Bootstrap, Tailwind</p>
        <p><b>Server Side:</b> NodeJs, Express, REST API, NextJs, Java, Python, PHP</p>
        <p><b>Database:</b> MongoDB, MySQL</p>
        <p><b>Operating System and Tools:</b> MacOS, Window, VS Code, Jira, Github, Bitbucket, GitLab</p>
      </section>
      <section className='mt-4'>
        <h2 className='p-2 text-white bg-black text-lg inline-block'>Experience</h2>
        {experiencesHTML}
      </section>
      <section className='mt-4'>
        <h2 className='p-2 text-white bg-black text-lg inline-block'>Projects</h2>
        {projectsHTML}
      </section>
    </>
  );
}

export default ResumePage;