import Image from "next/image";
import { BriefcaseBusiness, Code2, Download, ExternalLink, GitFork, Mail, Plus } from "lucide-react";
import { Header } from "../components/header";
import PaperCrumple from "../components/PaperCrumple";
import { SectionMotion } from "../components/section-motion";
import { education, experience, expertise, person, projects } from "../content/portfolio";

const skillLogos: Record<string, string> = {
  TypeScript: "typescript/typescript-original",
  "JavaScript (ES6+)": "javascript/javascript-original",
  Java: "java/java-original",
  SQL: "azuresqldatabase/azuresqldatabase-original",
  "Next.js": "nextjs/nextjs-original",
  "React.js": "react/react-original",
  Redux: "redux/redux-original",
  "React Hooks": "react/react-original",
  "React Router": "reactrouter/reactrouter-original",
  "Tailwind CSS": "tailwindcss/tailwindcss-original",
  "Material UI": "materialui/materialui-original",
  NestJS: "nestjs/nestjs-original",
  "Node.js": "nodejs/nodejs-original",
  "Express.js": "express/express-original",
  "Prisma ORM": "prisma/prisma-original",
  "WebSockets (Socket.IO)": "socketio/socketio-original",
  PostgreSQL: "postgresql/postgresql-original",
  MySQL: "mysql/mysql-original",
  MongoDB: "mongodb/mongodb-original",
  Redis: "redis/redis-original",
  Docker: "docker/docker-original",
  DigitalOcean: "digitalocean/digitalocean-original",
  "Cloudflare Turnstile": "cloudflare/cloudflare-original",
  Git: "git/git-original",
  Jira: "jira/jira-original",
  Postman: "postman/postman-original",
};

function SelectedWork() {
  return (
    <section id="work" tabIndex={-1} className="shell section work" aria-labelledby="work-heading">
      <div className="section-heading" data-reveal>
        <h2 id="work-heading">Selected work</h2>
        <p className="eyebrow">{experience.company}</p>
      </div>
      {projects.map(({ id, name, category, description, features, technologies, diagram, url }) => (
        <article className={`project project--${id}`} key={id} aria-labelledby={`${id}-heading`} data-reveal>
          <div className="project-copy">
            <p className="eyebrow">{category}</p>
            <h3 id={`${id}-heading`} tabIndex={-1}>{name}</h3>
            <p className="project-description">{description}</p>
            {url && <a className="text-link" href={url}>Visit project <ExternalLink size={14} aria-hidden="true" /></a>}
          </div>
          <figure className="project-diagram">
            <figcaption className="eyebrow">{diagram.label}</figcaption>
            <ul className="diagram-nodes">
              {diagram.nodes.map((node) => <li key={node}><span>{node}</span></li>)}
            </ul>
          </figure>
          <details className="project-details">
            <summary>Contributions & technology <Plus size={18} aria-hidden="true" /></summary>
            <div className="project-expanded">
              <dl className="feature-list">
                {features.map(({ title, text }) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}
              </dl>
              <ul className="tech-list" aria-label="Project technologies">
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </div>
          </details>
        </article>
      ))}
    </section>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="sticky-header"><Header /></div>
      <main id="main" tabIndex={-1}>
        <section className="shell hero" aria-labelledby="hero-heading">
          <div className="hero-profile">
            <div className="portrait">
              <Image src="/vraj-comic.webp" alt="Comic-style portrait of Vraj Raval" width={384} height={384} loading="eager" />
            </div>
            <div>
              <h1 id="hero-heading">Vraj <em>Raval</em></h1>
              <p className="hero-role">{person.role}</p>
            </div>
          </div>
          <p className="hero-intro">{person.intro}</p>
          <div className="hero-actions">
            <ul className="hero-socials" aria-label="Social and contact links">
              <li><a href={person.github}><GitFork size={16} aria-hidden="true" /> GitHub</a></li>
              <li><a href={person.linkedin}><BriefcaseBusiness size={16} aria-hidden="true" /> LinkedIn</a></li>
              <li><a href={`mailto:${person.email}`}><Mail size={16} aria-hidden="true" /> Email</a></li>
            </ul>
            <a className="hero-resume" href="https://drive.google.com/file/d/1LZXXr4OysZ5X3mdw7rO_RYE3yfySw1TQ/view?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="View résumé (opens in a new tab)">
              <Download size={16} aria-hidden="true" /> Résumé
            </a>
          </div>
        </section>

        <SelectedWork />

        <section id="expertise" tabIndex={-1} className="shell section" aria-labelledby="expertise-heading">
          <div className="section-heading" data-reveal><h2 id="expertise-heading">Technical expertise</h2></div>
          <dl className="expertise-list">
            {expertise.map(([category, skills], group) => (
              <div key={category} data-reveal>
                <dt>{category}</dt>
                <dd>
                  <ul>{skills.map((skill, index) => (
                    <li id={`skill-${group}-${index}`} key={skill} tabIndex={-1}>
                      {skillLogos[skill] ? (
                        <Image
                          className="skill-logo"
                          src={`https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/${skillLogos[skill]}.svg`}
                          width={16}
                          height={16}
                          alt=""
                          loading="lazy"
                          unoptimized
                        />
                      ) : <Code2 size={16} aria-hidden="true" />}
                      {skill}
                    </li>
                  ))}</ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="experience" tabIndex={-1} className="shell section" aria-labelledby="experience-heading">
          <div className="section-heading" data-reveal><h2 id="experience-heading">Experience</h2></div>
          <div className="record" data-reveal>
            <div className="record-meta"><p>{experience.dates}</p><p>{experience.location}</p></div>
            <div><h3>{experience.company}</h3><p className="record-role">{experience.role}</p><p className="record-description">{experience.summary}</p></div>
          </div>
        </section>

        <section id="about" tabIndex={-1} className="shell section about" aria-labelledby="about-heading">
          <div className="section-heading" data-reveal><h2 id="about-heading">About me</h2></div>
          <p className="about-copy" data-reveal>{person.about}</p>
          <div id="education" className="education" tabIndex={-1} data-reveal>
            <h3 className="eyebrow">Education</h3>
            <div><p className="degree">{education.degree}</p><p>{education.institution}</p></div>
            <div className="record-meta"><p>{education.dates}</p><p>{education.location}</p></div>
          </div>
        </section>
      </main>
      <footer id="contact" tabIndex={-1} className="contact" aria-labelledby="contact-heading">
        <div className="shell">
          <h2 id="contact-heading">Get in touch</h2>
          <a className="contact-email" href={`mailto:${person.email}`}>{person.email}</a>
          <ul className="contact-links">
            <li><a href={person.linkedin}>LinkedIn <ExternalLink size={14} aria-hidden="true" /></a></li>
            <li><a href={person.github}>GitHub <ExternalLink size={14} aria-hidden="true" /></a></li>
            <li><a href={`tel:${person.telephone}`}>{person.phone}</a></li>
          </ul>
          <figure className="closing-quote" data-reveal>
            <blockquote className="sr-only">
              <p>“The most we want is what the most we can&apos;t have, and what the most we can&apos;t have is what we already had and lost.”</p>
            </blockquote>
            <PaperCrumple
              src="/closing-quote.png"
              alt="Printed closing quote"
              width={560}
              height={350}
              sceneHeight={398}
              releaseBehavior="restore"
              crumpleAmount={0.85}
              crumpleDuration={0.55}
              releaseDuration={0.4}
              foldCount={6}
              foldSharpness={0.6}
              wrinkleDepth={0.65}
              creaseStrength={0.18}
              paperColor="#f4f0e8"
              paperTexture={0.08}
              draggable
              returnToOrigin
              imageFit="contain"
              roughness={0.92}
              lightIntensity={1.8}
              lightAngle={-35}
              shadow
              shadowOpacity={0.16}
              dragRotation={10}
              dragRadius={180}
              rotation={0}
              seed={7}
              detail={64}
              disabled={false}
            />
            <figcaption className="sr-only">— Odysseus, <cite>The Odyssey</cite></figcaption>
          </figure>

          <div className="footer-bottom"><span>{person.name} · {person.role}</span><a href="#top">Back to top</a></div>
        </div>
      </footer>
      <div className="viewport-fade" aria-hidden="true" />
      <SectionMotion />
    </>
  );
}
