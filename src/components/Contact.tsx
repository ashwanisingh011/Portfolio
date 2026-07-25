import { SplitReveal } from './motion/SplitReveal'
import { Magnetic } from './motion/Magnetic'
import { socials, mailtoCompose, EMAIL, RESUME_URL } from '@/data/socials'

export function Contact() {
  return (
    <section id="contact">
      <span className="section-label">(say hello)</span>

      <SplitReveal as="h2" className="contact-title" type="chars" stagger={0.02}>
        Let&rsquo;s build something
      </SplitReveal>

      <p className="contact-sub">
        I&rsquo;m open to full-time roles and interesting collaborations — remote or on-site.
      </p>

      <Magnetic strength={16}>
        <a className="contact-mail" href={mailtoCompose} target="_blank" rel="noreferrer">
          <span>{EMAIL}</span>
          <i className="ri-arrow-right-up-line" />
        </a>
      </Magnetic>

      <div className="contact-links">
        {socials.map((s) => (
          <Magnetic key={s.href} strength={12}>
            <a href={s.href} target="_blank" rel="noreferrer">
              <i className={s.icon} />
              {s.label}
            </a>
          </Magnetic>
        ))}
        <Magnetic strength={12}>
          <a href={RESUME_URL} target="_blank" rel="noreferrer">
            <i className="ri-file-text-line" />
            Résumé
          </a>
        </Magnetic>
      </div>
    </section>
  )
}
