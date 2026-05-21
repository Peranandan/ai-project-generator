export default function Privacy() {
  return (
    <div className="page">
      <div className="container">
        <div className="static-page">

          <h2>Privacy Policy</h2>
          <p className="static-date">Last updated: January 2026</p>

          <h3>Data We Collect</h3>
          <p>
            We do not collect or store any personal data. Your inputs
            (department, technology, difficulty) are sent to our backend
            only to generate a project response and are not saved anywhere.
          </p>

          <h3>Third-Party Services</h3>
          <p>
            We use Google Gemini API to generate project content. Your
            inputs are processed by Google's API. Please refer to
            Google's Privacy Policy for their data practices.
          </p>

          <h3>Cookies</h3>
          <p>
            We do not use cookies or any tracking technologies on this
            website.
          </p>

          <h3>Changes</h3>
          <p>
            We may update this policy from time to time. Continued use
            of the site means you accept any changes.
          </p>

        </div>
      </div>
    </div>
  );
}