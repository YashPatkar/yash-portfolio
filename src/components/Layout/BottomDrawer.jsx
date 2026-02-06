import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  Minimize2,
  Maximize2,
  Terminal,
  Mail,
  Linkedin,
  Github,
  Check,
  Copy,
} from "lucide-react";

const BottomDrawer = ({ isOpen, setIsOpen, currentSection, data }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [copied, setCopied] = useState(false);

  // FORM LOGIC
  const [formStatus, setFormStatus] = useState("idle"); // idle, loading, success

  // --- FIX 1: SCROLL LOCKING (PREVENT BACKGROUND SCROLL) ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Lock background
    } else {
      document.body.style.overflow = ""; // Unlock background
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("yash.patkar2004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  // --- NEW FORMSPREE LOGIC (No Database Keys) ---
  const handleSend = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    // 1. Get the data from the form event
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const formId = import.meta.env.VITE_FORMSPREE_ID;
    try {
      // 2. Send POST request to Formspree
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error(error);
      alert("Transmission failed. Even backend engineers have network issues.");
      setFormStatus("idle");
    }
  };

  const getContent = () => {
    switch (currentSection) {
      case "home":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT COLUMN: Summary + Education */}
            <div>
              <h3 className="text-accent font-mono mb-4 text-xl">
                SUMMARY
              </h3>
              <p className="text-white/80 leading-relaxed mb-8">
                {data.home.details.bio}
              </p>

              <h3 className="text-accent font-mono mb-4 text-xl">EDUCATION</h3>
              <div className="border-l-2 border-white/10 pl-4 text-white/80">
                <div className="text-lg font-bold">
                  {data.home.details.education}
                </div>
                <div className="text-sm text-white/50 mt-1">
                  GPA: {data.home.details.gpa}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-accent font-mono mb-4 text-xl">
                ACHIEVEMENTS
              </h3>
              <ul className="space-y-4 mb-8">
                {data.home.details.achievements.map((ach, i) => (
                  <li key={i} className="flex gap-3 text-white/70">
                    <span className="text-accent">🏆</span> {ach}
                  </li>
                ))}
              </ul>

              <h3 className="text-accent font-mono mb-4 text-xl">LOCATION</h3>
              <div className="border-l-2 border-white/10 pl-4 text-white/80">
                <div className="text-lg font-bold">
                  {data.home.details.address}
                </div>
              </div>
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.skills.details.map((group, i) => (
              <motion.div 
                key={i} 
                className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-accent font-bold mb-3 group-hover:text-accent/80 transition-colors">{group.cat}</h4>
                <p className="text-white/80 font-mono text-sm leading-relaxed group-hover:text-white/90 transition-colors">{group.items}</p>
              </motion.div>
            ))}
          </div>
        );
      case "projects":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((p, i) => (
              <motion.div
                key={i}
                className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="font-mono text-accent text-xs mb-2">
                  {p.tech}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-xl">{p.name}</h4>
                    {p.status && (
                      <div className="text-xs text-accent font-mono mt-1">
                        {p.status}
                      </div>
                    )}
                  </div>
                  {p.link && (
                    <div className="mt-auto ml-4">
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 md:gap-2 text-[10px] md:text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-2 py-1 md:px-4 md:py-2 rounded-md md:rounded-lg transition-colors"
                      >
                        <Github size={12} /> OPEN
                      </a>
                    </div>
                  )}
                </div>
                <div className="w-full h-px bg-white/10 mb-3 group-hover:bg-accent/30 transition-colors"></div>
                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                  {p.fullDetails}
                </p>
              </motion.div>
            ))}
          </div>
        );
      case "experience":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.experience.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all"
              >
                <h3 className="text-2xl font-bold text-white mb-1">
                  {exp.company}
                </h3>
                <div className="font-mono text-accent text-sm mb-4">
                  {exp.role}
                </div>
                <ul className="space-y-3 mt-4">
                  {exp.details.map((point, j) => (
                    <motion.li 
                      key={j} 
                      className="flex gap-3 text-white/70 text-sm group/item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + j * 0.1 }}
                    >
                      <span className="text-accent mt-1 group-hover/item:text-accent/80 transition-colors">▹</span>
                      <span className="group-hover/item:text-white/90 transition-colors">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        );

      // --- UPDATED CONTACT SECTION ---
      case "contact":
        return (
          <div className="space-y-10">
            {/* 1. Contact Links */}
            <div>
              <h3 className="text-accent font-mono mb-4 text-xl">
                GET /api/contact
              </h3>
              <div className="flex flex-wrap gap-6 text-white/80">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 hover:text-white transition-colors group"
                  title="Click to Copy"
                >
                  {copied ? (
                    <Check className="text-green-500" />
                  ) : (
                    <Mail className="text-accent" />
                  )}
                  <span className={copied ? "text-green-500 font-bold" : ""}>
                    {copied
                      ? "Copied to Clipboard!"
                      : "yash.patkar2004@gmail.com"}
                  </span>
                </button>

                <a
                  href="https://linkedin.com/in/yash-patkar"
                  target="_blank"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Linkedin className="text-blue-500" />{" "}
                  linkedin.com/in/yash-patkar
                </a>
                <a
                  href="https://github.com/yashpatkar"
                  target="_blank"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Github className="text-white/60" /> github.com/yashpatkar
                </a>
              </div>
            </div>

            <div className="w-full h-px bg-white/10"></div>

            {/* 2. THE FUN FORM */}
            <div>
              <h3 className="text-accent font-mono mb-4 text-xl">
                POST /api/contact
              </h3>

              {formStatus === "success" ? (
                <div className="bg-black/50 border border-green-500/50 p-6 rounded-lg font-mono text-sm text-left shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  <div className="text-gray-500 mb-2">
                    // Response Headers: 200 OK
                  </div>
                  <div className="text-green-400">
                    {`{`}
                    <br />
                    &nbsp;&nbsp;"status": "success",
                    <br />
                    &nbsp;&nbsp;"message": "Data received. I'll reach out
                    shortly!",
                    <br />
                    &nbsp;&nbsp;"timestamp": "{new Date().toISOString()}"
                    <br />
                    {`}`}
                  </div>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-4 text-xs text-accent underline hover:text-white"
                  >
                    POST /another-request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSend}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* THE JOKE */}
                  <div className="md:col-span-2 bg-[#0d0d0d] border-l-4 border-accent p-4 rounded-r-lg flex flex-col gap-2">
                    <div className="text-accent font-bold text-xs tracking-widest">
                      NOTE:
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed font-sans">
                      Form made by a backend dev — go ahead and give it a test.
                      😄
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 font-mono">
                      var name: String
                    </label>
                    {/* Font changed to font-sans */}
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Type your name here..."
                      className="bg-black/50 border border-white/10 p-4 rounded-lg text-white outline-none focus:border-accent transition-colors text-sm font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 font-mono">
                      var email: String
                    </label>
                    {/* Font changed to font-sans */}
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="Type your email address..."
                      className="bg-black/50 border border-white/10 p-4 rounded-lg text-white outline-none focus:border-accent transition-colors text-sm font-sans"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-xs text-white/40 font-mono">
                      const message = ...
                    </label>
                    {/* Font changed to font-sans */}
                    <textarea
                      required
                      name="message"
                      placeholder="Type your message here..."
                      rows="3"
                      className="bg-black/50 border border-white/10 p-4 rounded-lg text-white outline-none focus:border-accent transition-colors text-sm font-sans"
                    ></textarea>
                  </div>

                  <button
                    disabled={formStatus === "loading"}
                    className="bg-white hover:bg-accent text-black font-bold py-4 rounded-lg transition-all md:col-span-2 disabled:opacity-50 flex items-center justify-center gap-2 group font-mono"
                  >
                    {formStatus === "loading" ? (
                      <span className="animate-pulse">SENDING DATA...</span>
                    ) : (
                      <>
                        <Terminal
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                        GIT PUSH
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        );
      default:
        return (
          <p className="text-white/50 font-mono">
            Scroll to a section to view its decrypted logs.
          </p>
        );
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 pointer-events-none">
        <motion.button
          layout
          onClick={() => setIsOpen(!isOpen)}
          className="bg-surface border-t border-x border-white/10 px-8 py-1.5 md:py-2 rounded-t-xl text-white font-mono text-sm flex items-center gap-2 hover:bg-white/5 transition-colors pointer-events-auto min-w-[140px] justify-center"
        >
          {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}{" "}
          {isOpen ? "CLOSE" : "VIEW DETAILS"}
        </motion.button>
      </div>

            <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            // UPDATED CLASSES:
            // 1. Dynamic Height: h-[80vh] when full, h-[50vh] when minimized (better contrast)
            // 2. Glow Effect: shadow-[0_0_50px...] adds the "focused" look
            // 3. Border: border-white/20 normally, border-accent/30 when fullscreen to highlight it
            className={`
                            fixed bottom-0 left-4 right-4 md:left-10 md:right-10 
                            bg-[#0A0A0A]/98 backdrop-blur-[10px]
                            border-t border-x 
                            ${
                              isFullScreen
                                ? "border-accent/30 shadow-[0_0_50px_rgba(34,197,94,0.25)] h-[90vh]"
                                : "border-white/20 shadow-[0_0_30px_rgba(34,197,94,0.1)] h-[50vh]"
                            }
                            z-40 p-6 md:p-8 lg:p-12 
                            rounded-t-[40px] overflow-hidden 
                            transition-all duration-500 ease-in-out
                        `}
          >
            <div className="max-w-6xl mx-auto flex flex-col h-full">
              <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
                <div>
                  <div className="font-mono text-accent text-xs mb-1">
                    SECTION LOGS
                  </div>
                  <h2 className="text-4xl font-display text-white">
                    {currentSection.toUpperCase()}
                  </h2>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-accent transition-all border border-white/5 hover:border-accent"
                  title={isFullScreen ? "Minimize" : "Expand"}
                >
                  {isFullScreen ? (
                    <Minimize2 size={18} />
                  ) : (
                    <Maximize2 size={18} />
                  )}
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-4 custom-scroll">
                {getContent()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomDrawer;
