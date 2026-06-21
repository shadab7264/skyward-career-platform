import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How does the ATS Resume Analyzer work?',
    answer: 'Our analyzer uses advanced parsing algorithms similar to those used by major applicant tracking systems (Workday, Greenhouse, etc.). It scores your resume based on keyword density, formatting constraints, and section completeness.',
  },
  {
    question: 'Are the interview questions generated specifically for me?',
    answer: 'Yes! When you input your target role, our system generates a tailored set of technical, behavioral, and scenario-based questions that are commonly asked for that specific position and seniority level.',
  },
  {
    question: 'Can I export my career roadmap?',
    answer: 'Currently, you can track your roadmap directly within the platform. PDF export functionality is coming in our next major update.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use Supabase for secure authentication and database storage. Your resumes and personal information are encrypted and never shared with third parties.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-semibold text-slate-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
