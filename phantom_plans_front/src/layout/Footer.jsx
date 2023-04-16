import React from 'react'
import '../styling/footer.css';
import footerLogo from '../assets/navBarLogo.svg';
import linkedInLogo from '../assets/linkedin.svg';
import githubLogo from '../assets/github.svg';
import instagramLogo from '../assets/instagram.svg';

export default function Footer() {
  return (
    <div className="d-flex flex-column">
    <footer className='text-center footer mt-auto'>
      <div className="d-flex container-fluid align-items-center justify-content-center h-100">
        <img src={footerLogo} alt="" />
        <div>
          <div className='container-fluid'>
            <p className='footer-email-text mt-2'>E-mail:<a className='footer-email' href="mailto:mainclau22@gmail.com">mainclau22@gmail.com</a></p>
            <div className="d-flex icons-container mb-4">
              <a href="https://www.instagram.com/restanta2.0/" target='_blank' rel='noreferrer'><img src={instagramLogo} alt="" /></a>
              <a href="https://github.com/CrashMtfk" target='_blank' rel='noreferrer'><img src={githubLogo} alt="" /></a>
              <a href="https://www.linkedin.com/in/rusclaudiu/" target='_blank' rel='noreferrer'><img src={linkedInLogo} alt="" /></a>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
    </div>
  )
}
