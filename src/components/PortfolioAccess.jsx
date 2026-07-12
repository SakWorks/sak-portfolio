import { FaFileAlt, FaLock, FaEnvelope } from "react-icons/fa";

function PortfolioAccess() {
  return (
    <section id="portfolio" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
            My <span className="text-purple-500">Portfolios</span>
          </h2>
          <p className="text-gray-400">
            Explore my academic journey, or request access to my professional resume
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-purple-900/40 rounded-2xl p-8 flex flex-col items-center text-center hover:border-purple-500 hover:bg-white/10 transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/40 flex items-center justify-center text-purple-400 text-3xl mb-6">
              <FaFileAlt />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Academic Portfolio</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A public record of my debate achievements, leadership roles, and academic recognitions across national competitions. Open for anyone to view.
            </p>
            <a href="/academic-portfolio.pdf" target="_blank" rel="noopener noreferrer" className="mt-auto px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors duration-300">
              View Portfolio
            </a>
          </div>

          <div className="bg-white/5 border border-purple-900/40 rounded-2xl p-8 flex flex-col items-center text-center hover:border-purple-500 hover:bg-white/10 transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/40 flex items-center justify-center text-purple-400 text-3xl mb-6">
              <FaLock />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Business Resume</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              My detailed professional resume covering work experience, technical skills, and roles. Shared privately on request.
            </p>
            <a href="mailto:sakupwork111@gmail.com?subject=Business Resume Request&body=Hi Subhan, I would like to request a copy of your business resume." className="mt-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold transition-colors duration-300">
              <FaEnvelope /> Request Access
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioAccess;