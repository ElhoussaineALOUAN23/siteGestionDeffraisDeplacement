import React, { useEffect, useState } from 'react';
import './Navbar.css';
import admin from '../../animation/admin.json';
import Lottie from 'lottie-react';
import Modal from 'react-modal';
import { TextField } from '@mui/material';

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if email and password match admin credentials
    if (email === "admin@gmail.com" && password === "12344321") {
      window.location.href = "http://localhost:3000/dommande";
    } else {
      // Handle incorrect credentials (e.g., show an error message)
      console.log("Incorrect credentials");
    }
  };

  return (
    <header className='flex'>
      <button>
        <Lottie onClick={() => setModalOpen(true)} style={{ height: 40, width: 40, marginTop: '-10px', marginBottom: '-10px' }} animationData={admin} />
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--bgHeader)',
            borderRadius: '10px',
            boxShadow: '20px 30px 25px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            width: '30%',
            height: '50%',
            overflow: 'auto'
          }
        }}
      >
        <form onSubmit={handleLogin}>
          <main>
            <section style={{ textAlign: "center", display: "block" }}>
              <Lottie style={{ height: 80, width: 80, marginBottom: 15, marginLeft: 120, marginTop: "-10px" }} animationData={admin} />
              <div>
                <TextField
                  id="filled-email"
                  label="Email"
                  type="email"
                  variant="filled"
                  style={{ marginBottom: 20, width: "300px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="filled-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                  style={{ marginBottom: 20, width: "300px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className='M9Property'>
                Send
              </button>
            </section>
          </main>
        </form>
      </Modal>

      <div />
      <button
        className='menu icon-menu flex'
        onClick={() => {
          const newTheme = theme === "dark" ? "light" : "dark";
          localStorage.setItem("currentMode", newTheme);
          setTheme(newTheme);
        }}
      />
      <nav>
        <ul className='flex'>
          <li>
            <a href='About'>About</a>
          </li>
          <li>
            <a href='Articles'>Login</a>
          </li>
          <li>
            <a href='Projects'>Contact</a>
          </li>
          
        </ul>
      </nav>
      <button onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        localStorage.setItem("currentMode", newTheme);
        setTheme(newTheme);
      }} className='mode flex'>
        <span className={theme === "dark" ? 'icon-moon-o' : 'icon-sun'}></span>
      </button>
      {showModal && (
        <div className='fixed'>
          <ul className='modal'>
            <li>
              <button className="icon-clear" onClick={() => {
                setShowModal(false);
              }} />
            </li>
            <li><a href="/">About</a></li>
            <li><a href="/">Login</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
