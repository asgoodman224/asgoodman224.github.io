// Project data - easy to add new projects here
const projectsData = [
  {
    id: 1,
    title: "Sintax Platformer Game",
    description: "Play from a handful of the Quinnipiac Computer Science professors in a 2D platformer game called \"Escape From Hell\". Created completely in Java.",
    image: "Images/Sintax.png",
    tags: ["Java", "Team Project", "Game Dev", "Software Development"],
    github: "https://github.com/asgoodman224/Sintax--Andrew-s-Copy",
    featured: true
  },
  {
    id: 2,
    title: "Bobcat Brawlers",
    description: "Fight against your friends in a Quinnipiac-themed multiplayer platformer game. Made completely in Java.",
    image: "Images/Bobcat.png",
    tags: ["Java", "Game Development", "Team Project", "Software Development"],
    github: "https://github.com/asgoodman224/Bobcat-Brawlers",
    featured: true
  },
  {
    id: 3,
    title: "NFL Predictor Website",
    description: "A machine learning-powered NFL game predictor that analyzes team statistics and historical data to forecast game outcomes using API integration and predictive algorithms.",
    image: "Images/NFL.png",
    tags: ["Python", "API", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/asgoodman224/NFL-Predictor",
    inProgress: true,
    featured: true
  }
];

// 3D Tilt Card Component
const ProjectCard = ({ project, index, isVisible }) => {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
    transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
    animationDelay: `${index * 0.15}s`
  };

  return (
    <div
      ref={cardRef}
      className={`react-project-card ${isVisible ? 'card-visible' : ''}`}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-glow"></div>
      <div className="card-inner">
        <div className="card-image-wrapper">
          <img src={project.image} alt={project.title} />
          <div className="image-overlay">
            <span className="view-project">View Details</span>
          </div>
          {project.inProgress && (
            <div className="status-badge pulse">
              <span className="dot"></span>
              In Progress
            </div>
          )}
          {project.featured && !project.inProgress && (
            <div className="featured-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Featured
            </div>
          )}
        </div>
        <div className="card-content">
          <h3 className="card-title">
            {project.title}
          </h3>
          <p className="card-description">{project.description}</p>
          <div className="card-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="card-tag" style={{ animationDelay: `${i * 0.1}s` }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="card-actions">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View Code</span>
              <div className="btn-shine"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Projects Section Component
const ProjectsSection = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  // Intersection Observer for scroll animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="react-projects-wrapper">
      {/* Animated background elements */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="projects-header">
        <h2 className={`section-title ${isVisible ? 'title-visible' : ''}`}>
          <span className="title-line"></span>
          My Projects
          <span className="title-line"></span>
        </h2>
        <p className={`section-subtitle ${isVisible ? 'subtitle-visible' : ''}`}>
          Explore my latest work and creative experiments
        </p>
      </div>

      {/* Project cards grid */}
      <div className="react-projects-grid">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

// Mount the React app
const root = ReactDOM.createRoot(document.getElementById('react-projects-root'));
root.render(<ProjectsSection />);
