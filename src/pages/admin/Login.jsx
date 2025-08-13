import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login({ onClose }) {
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(localStorage.getItem("user") || "[]");

      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        toast.error("User already exists with the same email");
        return;
      }

      const data = { name, email, password };
      users.push(data);
      localStorage.setItem("user", JSON.stringify(users));
      clearForm();
      toast.success("Registration successful!");
      onClose();
      setShowRegister(false);
      navigate("/")
    } catch (err) {
      console.log(err.message);
      toast.error("Registration failed due to an error.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("user") || "[]");

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      toast.success("Login successful! 👌");
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      clearForm();
      onClose();
      navigate("/");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content bg-light">
          <div className="modal-header">
            <h5 className="modal-title text-danger">
              {showRegister ? "Register" : "Login"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={showRegister ? handleRegister : handleLogin}>
              {showRegister && (
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

              <button type="submit" className="btn btn-danger w-100">
                {showRegister ? "Register" : "Login"}
              </button>
            </form>

            <p className="text-center mt-3 text-muted">
              {showRegister ? (
                <>
                  Already have an account?{" "}
                  <a href="#" onClick={() => setShowRegister(false)}>
                    Login
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <a href="#" onClick={() => setShowRegister(true)}>
                    Register
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
