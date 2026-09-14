"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  name: string;
  acceptedAnswer: { text: string };
}

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx} 
            className="border border-neutral-800/60 rounded-2xl bg-neutral-900/40 overflow-hidden transition-all duration-300 backdrop-blur-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-800/60 transition-colors"
            >
              <h4 className="text-lg font-medium text-white pr-8">{faq.name}</h4>
              <ChevronDown 
                className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
              />
            </button>
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 text-neutral-400 leading-relaxed pt-2 border-t border-neutral-800/30">
                  {faq.acceptedAnswer.text}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
