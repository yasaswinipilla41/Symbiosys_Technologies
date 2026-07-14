import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import SectionHeading from './ui/SectionHeading';

const roles = [
  {
    title: '.NET Full-Stack Developer',
    exp: 'Experienced',
    stack: '.NET · ASP.NET Core · MVC · Web API · Angular · MS SQL Server',
  },
  {
    title: 'Front-End Web Developer',
    exp: '4+ Years',
    stack: 'HTML · CSS · JavaScript · jQuery · DOM · JSON · AJAX',
  },
];

const CV_EMAIL = 'itservices@symbiosystech.com';

export default function Careers() {
  return (
    <section id="careers" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionHeading
              index="08"
              label="Careers"
              title={<>Grow with a team that values knowledge and perfection.</>}
            />
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-sm text-muted">
              Send your CV to
              <br className="hidden md:block" />{' '}
              <a href={`mailto:${CV_EMAIL}`} className="link-arrow !text-ink">
                {CV_EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-line">
          {roles.map((r, i) => (
            <motion.a
              key={r.title}
              href={`mailto:${CV_EMAIL}?subject=Application: ${encodeURIComponent(r.title)}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex items-center justify-between gap-6 border-b border-line py-8"
            >
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="heading-lg transition-transform duration-500 group-hover:translate-x-2">{r.title}</h3>
                  <span className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-wider text-muted">
                    {r.exp}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">{r.stack}</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <HiArrowUpRight />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
