import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import { Mail, User, MessageSquare, Send, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { contactStyles as styles } from "../assets/dummyStyles";

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.from_name.trim()) {
      newErrors.from_name = "Name is required";
    }

    if (!formData.from_email.trim()) {
      newErrors.from_email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.from_email)) {
        newErrors.from_email = "Please enter a valid email";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await emailjs.send(
        "service_udbli3e", // Service ID
        "template_y7kucx3", // Template ID
        formData,
        "mJm75-bjmULo6btmQ" // Public Key
      );

      toast.success("Message sent successfully!");
      setIsSubmitted(true);
      setFormData({
        from_name: "",
        from_email: "",
        message: "",
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      from_name: "",
      from_email: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Header */}
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.headerTitle}>Contact Us</h1>
            <p className={styles.headerSubtitle}>
              Send us a message and we'll respond as soon as possible
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className={styles.formCard}>
        {isSubmitted && (
          <div className={styles.successMessage}>
            <CheckCircle className={styles.successIcon} />
            <div>
              <p className="font-semibold">Message sent successfully!</p>
              <p className="text-sm">We will respond shortly</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Section */}
          <div className={styles.formSection}>
            <label className={styles.sectionTitle}>
              <User className={styles.sectionIcon} />
              Personal Information
            </label>

            <div className={styles.formGrid}>
              <div>
                <label htmlFor="from_name" className={styles.label}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`${styles.input} ${
                    errors.from_name ? styles.inputError : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.from_name && (
                  <div className={styles.errorText}>
                    <AlertCircle className={styles.errorIcon} />
                    {errors.from_name}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="from_email" className={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`${styles.input} ${
                    errors.from_email ? styles.inputError : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.from_email && (
                  <div className={styles.errorText}>
                    <AlertCircle className={styles.errorIcon} />
                    {errors.from_email}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className={styles.formSection}>
            <label className={styles.sectionTitle}>
              <MessageSquare className={styles.sectionIcon} />
              Your Message
            </label>

            <div>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="6"
                className={`${styles.textarea} ${
                  errors.message ? styles.textareaError : ""
                }`}
                disabled={isLoading}
              />
              <div className="flex justify-between items-start">
                {errors.message && (
                  <div className={styles.errorText}>
                    <AlertCircle className={styles.errorIcon} />
                    {errors.message}
                  </div>
                )}
                <span className={styles.charCount}>
                  {formData.message.length}/500
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <>
                  <Loader2 className={styles.loadingSpinner} />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className={styles.resetButton}
            >
              Clear
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
            Your email will only be used to contact you
          </p>
        </form>
      </div>
    </div>
  );
};

export default Contact;
