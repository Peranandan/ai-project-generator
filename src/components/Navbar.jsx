import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [projectOpen, setProjectOpen] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState(null);

  const projects = [

    {
      title: "AI Chatbot Assistant",

      image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",

      short:
      "NLP-powered intelligent chatbot system.",

      description:
      "An AI-powered chatbot platform using Natural Language Processing and Machine Learning for automated customer support, query analysis, and smart conversations.",

      stack:
      "React, Python, FastAPI, OpenAI API",

      modules:
      "Authentication, Chat Engine, AI Responses, Dashboard",
    },

    {
      title: "Smart Traffic Monitoring",

      image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",

      short:
      "AI-based traffic prediction system.",

      description:
      "A smart city traffic management platform using cameras and AI analytics to monitor traffic congestion and predict vehicle density.",

      stack:
      "React, TensorFlow, Node.js, MongoDB",

      modules:
      "Vehicle Detection, Analytics, Admin Dashboard",
    },

    {
      title: "IoT Smart Farming",

      image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",

      short:
      "Smart agriculture automation system.",

      description:
      "IoT-based farming system with sensors for monitoring soil, water, humidity, and crop conditions using cloud connectivity.",

      stack:
      "IoT Sensors, Firebase, React",

      modules:
      "Sensor Tracking, Irrigation Automation, Reports",
    },

    {
      title: "Cybersecurity Detection",

      image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",

      short:
      "Threat detection using AI security.",

      description:
      "Cybersecurity monitoring platform for detecting threats, unusual behavior, and malicious activity using Artificial Intelligence.",

      stack:
      "Python, AI Models, FastAPI, React",

      modules:
      "Threat Scanner, Detection Engine, Security Reports",
    },

  ];

  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}

        <Link
          to="/"
          className="logo"
        >
          ⚡ AI Project Generator
        </Link>

        {/* NAVIGATION */}

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          {/* PROJECTS */}

          <div className="dropdown">

            <button
              className="nav-btn"
              onClick={() =>
                setProjectOpen(!projectOpen)
              }
            >
              Projects ▾
            </button>

            {
              projectOpen && (

                <div className="mega-dropdown">

                  {/* LEFT SIDE */}

                  <div className="project-list">

                    {
                      projects.map((project, index) => (

                        <div
                          key={index}
                          className="project-card"
                          onClick={() =>
                            setSelectedProject(project)
                          }
                        >

                          <img
                            src={project.image}
                            alt={project.title}
                          />

                          <div>

                            <h4>
                              {project.title}
                            </h4>

                            <p>
                              {project.short}
                            </p>

                          </div>

                        </div>

                      ))
                    }

                  </div>

                  {/* RIGHT SIDE */}

                  <div className="project-preview">

                    {
                      selectedProject ? (

                        <>

                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="preview-image"
                          />

                          <h2>
                            {selectedProject.title}
                          </h2>

                          <p>
                            {selectedProject.description}
                          </p>

                          <div className="preview-box">

                            <h4>
                              Tech Stack
                            </h4>

                            <span>
                              {selectedProject.stack}
                            </span>

                          </div>

                          <div className="preview-box">

                            <h4>
                              Modules
                            </h4>

                            <span>
                              {selectedProject.modules}
                            </span>

                          </div>

                        </>

                      ) : (

                        <div className="empty-preview">

                          <h3>
                            Select a Project
                          </h3>

                          <p>
                            Click any project to
                            view detailed generated
                            project information.
                          </p>

                        </div>

                      )
                    }

                  </div>

                </div>

              )
            }

          </div>

          <Link to="/blogs">
            Blogs
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/privacy">
            Privacy
          </Link>

          <Link to="/terms">
            Terms
          </Link>

          <Link to="/disclaimer">
            Disclaimer
          </Link>

        </div>

        {/* MOBILE */}

        <button
          className="mobile-menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

      </div>

    </nav>
  );
}