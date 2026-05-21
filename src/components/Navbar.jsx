import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

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
      "AI chatbot platform using Natural Language Processing and Machine Learning for automated customer conversations and support systems.",

      stack:
      "React, Python, FastAPI, OpenAI API",

      modules:
      "Authentication, AI Chat Engine, Dashboard, Analytics",
    },

    {
      title: "Smart Traffic Monitoring",

      image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",

      short:
      "AI-based traffic prediction system.",

      description:
      "Advanced smart city traffic monitoring system using AI camera analysis and real-time traffic prediction algorithms.",

      stack:
      "TensorFlow, React, Node.js",

      modules:
      "Vehicle Detection, Live Monitoring, Prediction Engine",
    },

    {
      title: "IoT Smart Farming",

      image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",

      short:
      "Smart agriculture automation platform.",

      description:
      "IoT-based farming solution with automated irrigation, sensor tracking, humidity monitoring, and cloud reports.",

      stack:
      "React, Firebase, IoT Sensors",

      modules:
      "Sensor Dashboard, Irrigation, Reports",
    },

    {
      title: "Cybersecurity Detection",

      image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",

      short:
      "AI-powered threat detection platform.",

      description:
      "Cybersecurity intelligence platform for monitoring suspicious behavior and AI-based attack detection systems.",

      stack:
      "Python, FastAPI, AI Models",

      modules:
      "Threat Scanner, AI Detection, Reports",
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
                            Click a project to view
                            generated project details.
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

      </div>

    </nav>
  );
}