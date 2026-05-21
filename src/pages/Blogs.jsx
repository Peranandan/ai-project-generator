export default function Blogs() {

  return (

    <div className="page">

      <div className="container">

        {/* HEADER */}

        <section className="hero">

          <div className="hero-left">

            <span className="badge">
              📘 Latest AI & Engineering Blogs
            </span>

            <h1>
              Technology Insights
              & Engineering Articles
            </h1>

            <p>
              Explore Artificial Intelligence,
              Cloud Computing, IoT,
              Cybersecurity, and modern
              engineering innovations through
              expert-written technical blogs.
            </p>

          </div>

        </section>

        {/* BLOGS */}

        <section className="features">

          {/* BLOG 1 */}

          <div className="feature-box">

            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
              alt="AI"
              style={{
                width:"100%",
                height:"220px",
                objectFit:"cover",
                borderRadius:"18px",
                marginBottom:"18px",
              }}
            />

            <h3>
              Top AI Engineering Projects
            </h3>

            <p>
              Artificial Intelligence projects
              are transforming industries with
              automation, predictive analytics,
              and intelligent systems. Explore
              the best AI projects for students
              and developers.
            </p>

          </div>

          {/* BLOG 2 */}

          <div className="feature-box">

            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
              alt="Cloud"
              style={{
                width:"100%",
                height:"220px",
                objectFit:"cover",
                borderRadius:"18px",
                marginBottom:"18px",
              }}
            />

            <h3>
              Future of Cloud Computing
            </h3>

            <p>
              Cloud computing continues
              to evolve with scalable
              infrastructure, serverless
              applications, and enterprise
              AI integration across industries.
            </p>

          </div>

          {/* BLOG 3 */}

          <div className="feature-box">

            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
              alt="IoT"
              style={{
                width:"100%",
                height:"220px",
                objectFit:"cover",
                borderRadius:"18px",
                marginBottom:"18px",
              }}
            />

            <h3>
              IoT Applications in 2026
            </h3>

            <p>
              Internet of Things technology
              powers smart cities, healthcare,
              agriculture, industrial automation,
              and real-time intelligent systems.
            </p>

          </div>

          {/* BLOG 4 */}

          <div className="feature-box">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="Cybersecurity"
              style={{
                width:"100%",
                height:"220px",
                objectFit:"cover",
                borderRadius:"18px",
                marginBottom:"18px",
              }}
            />

            <h3>
              Cybersecurity Project Ideas
            </h3>

            <p>
              Learn how cybersecurity
              engineering protects systems,
              networks, and applications
              using threat detection,
              encryption, and monitoring.
            </p>

          </div>

          {/* BLOG 5 */}

          <div className="feature-box">

            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop"
              alt="Machine Learning"
              style={{
                width:"100%",
                height:"220px",
                objectFit:"cover",
                borderRadius:"18px",
                marginBottom:"18px",
              }}
            />

            <h3>
              AI vs Machine Learning
            </h3>

            <p>
              Understand the difference
              between Artificial Intelligence
              and Machine Learning,
              including real-world
              engineering applications.
            </p>

          </div>

          {/* BLOG 6 */}

          <div className="feature-box">

            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"
              alt="Projects"
              style={{
                width:"100%",
                height:"220px",
                objectFit:"cover",
                borderRadius:"18px",
                marginBottom:"18px",
              }}
            />

            <h3>
              Best Final Year Projects
            </h3>

            <p>
              Discover modern final-year
              engineering project ideas
              using AI, IoT, Cloud,
              Robotics, and Automation.
            </p>

          </div>

        </section>

      </div>

    </div>
  );
}