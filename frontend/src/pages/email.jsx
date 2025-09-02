// import { useState } from "react";


// export function Email() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     message: ""
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const form = new FormData();

//     // Required Web3Forms Access Key (make sure it's set in your .env file)
//     form.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

//     // Custom subject for the email
//     form.append("subject", `New submission from ${formData.name}`);

//     // Optional: redirect after submission
//     form.append("redirect", "https://yourwebsite.com/thank-you");

//     // Actual form fields
//     form.append("name", formData.name);
//     form.append("email", formData.email);
//     form.append("mobile", formData.mobile);
//     form.append("message", formData.message);

//     try {
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         body: form
//       });

//       const result = await response.json();

//       if (result.success) {
//         alert("Form submitted successfully!");
//         setFormData({ name: "", email: "", mobile: "", message: "" });
//       } else {
//         alert("Form submission failed. Please try again.");
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//       console.error(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <form className="modern-form" onSubmit={handleSubmit}>
//         <label htmlFor="name">Full Name</label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="mobile">Mobile</label>
//         <input
//           type="tel"
//           name="mobile"
//           id="mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//         />

//         <label htmlFor="message">Message</label>
//         <textarea
//           name="message"
//           id="message"
//           value={formData.message}
//           onChange={handleChange}
//         ></textarea>

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser'
export const Email = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_mfeppma', 'template_f0elfgn', form.current, {
        publicKey: 'ZyCay5Z6yi00LiHzt',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

