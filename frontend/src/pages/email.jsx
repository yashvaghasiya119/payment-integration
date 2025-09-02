import { useState } from "react";

export function Email() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();

    // Required Web3Forms Access Key (make sure it's set in your .env file)
    form.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    // Custom subject for the email
    form.append("subject", `New submission from ${formData.name}`);

    // Optional: redirect after submission
    form.append("redirect", "https://yourwebsite.com/thank-you");

    // Actual form fields
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("mobile", formData.mobile);
    form.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });

      const result = await response.json();

      if (result.success) {
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form className="modern-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="mobile">Mobile</label>
        <input
          type="tel"
          name="mobile"
          id="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}


// import React from 'react';

// export const Email = () => {
//   return (
//     <div className="container">
//       <h1>FormSubmit Demo</h1>
//       <form
//         target="_blank"
//         action="https://formsubmit.co/foyeki3725@lanipe.com"
//         method="POST"
//       >
//         <div className="form-group">
//           <div className="form-row">
//             <div className="col">
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 placeholder="Full Name"
//                 required
//               />
//             </div>
//             <div className="col">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 placeholder="Email Address"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <div className="form-group">
//           <textarea
//             placeholder="Your Message"
//             className="form-control"
//             name="message"
//             rows="10"
//             required
//           ></textarea>
//         </div>
//         <button type="submit" className="btn btn-lg btn-dark btn-block">
//           Submit Form
//         </button>
//       </form>
//     </div>
//   );
// };


