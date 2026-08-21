import "./footer.css";

export const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-section">
          <h3>K-Tech Shop</h3>
          <p>
            A simple e-commerce application built with
            React and Laravel for portfolio purposes.
          </p>
        </div>

        <div className="footer-section">
          <h3>About</h3>
          <p>Company</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            <a 
              href="mailto:febrianto.kudadiri.04@gmail.com"
              className="footer-link"
            >
              Email
            </a>
          </p>
          <p>
            <a 
              href="https://github.com/EgoEquusFebrianto"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
          </p>
          <p>
            <a 
              href="https://www.linkedin.com/in/febrianto-kudadiri-9098a2254/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
          </p>
          <p>
            <a 
              href="https://wa.me/6282163306070"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              WhatsApp
            </a>
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 K-Tech Shop. All rights reserved.
      </div>

    </footer>
  );
};