import { Send, Mail, MessageSquare, User, CheckCircle2 } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form.');
    }
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
  <section id="contact" className="py-20 bg-white dark:bg-[#181f3a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Have a project in mind or want to discuss ML? Let's connect!
            </p>
          </div>

          <div className="card bg-white dark:bg-[#20243a] rounded-2xl shadow-xl dark:shadow-blue-900/20 border-2 border-gray-100 dark:border-[#334155] p-8 md:p-12">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="flex items-center gap-2 text-gray-700 dark:text-[#f3f4f6] font-semibold mb-2"
                    >
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-[#334155] rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors bg-white dark:bg-[#232a45] text-gray-900 dark:text-[#f3f4f6] placeholder-gray-400 dark:placeholder-[#a3aed0]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="flex items-center gap-2 text-gray-700 dark:text-[#f3f4f6] font-semibold mb-2"
                    >
                      <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-[#334155] rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors bg-white dark:bg-[#232a45] text-gray-900 dark:text-[#f3f4f6] placeholder-gray-400 dark:placeholder-[#a3aed0]"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="flex items-center gap-2 text-gray-700 dark:text-[#f3f4f6] font-semibold mb-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-[#334155] rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors bg-white dark:bg-[#232a45] text-gray-900 dark:text-[#f3f4f6] placeholder-gray-400 dark:placeholder-[#a3aed0]"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="flex items-center gap-2 text-gray-700 dark:text-[#f3f4f6] font-semibold mb-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-[#334155] rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors bg-white dark:bg-[#232a45] text-gray-900 dark:text-[#f3f4f6] placeholder-gray-400 dark:placeholder-[#a3aed0] resize-none"
                    placeholder="Tell me about your project or question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="accent w-full py-4 px-6 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg dark:shadow-blue-900/20 hover:shadow-xl hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#20243a] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
