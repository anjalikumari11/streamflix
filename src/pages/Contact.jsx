import React, { useState } from 'react';

function Contact({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thanks for contacting us!');
    onClose();

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
              <h5 className="modal-title text-danger">Contact Us</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-danger w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
