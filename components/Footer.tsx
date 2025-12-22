import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.columns}>
        <div>
          <h4>Lumina Market</h4>
          <p>Curated goods for an intentional lifestyle. Designed in San Francisco, serving customers worldwide.</p>
        </div>
        <div>
          <h4>Need help?</h4>
          <ul>
            <li>
              <a href="mailto:support@luminamarket.com">support@luminamarket.com</a>
            </li>
            <li>
              <a href="tel:+18885551234">+1 (888) 555-1234</a>
            </li>
            <li>
              <a href="#filters">Order tracking</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#top">About</a>
            </li>
            <li>
              <a href="#featured-products">Partners</a>
            </li>
            <li>
              <a href="#top">Sustainability</a>
            </li>
          </ul>
        </div>
      </div>
      <p className={styles.copy}>&copy; {currentYear} Lumina Market. All rights reserved.</p>
    </footer>
  );
};

export default Footer;