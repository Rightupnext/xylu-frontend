import React from "react";
import { Typography, Collapse, Image } from "antd";
import { motion } from "framer-motion";
import faqimg from "../assets/faq/faq.png";
const { Title } = Typography;
const { Panel } = Collapse;

const faqs = [
  {
    question: "Where can I see in my Shopping Cart?",
    answer: `Click the “View Cart” icon in the top-right corner. Adjust item quantities, update, or remove items directly in your cart.`,
  },
  {
    question: "Where Can I Get Details on Sizes?",
    answer: `Under the sizes section on the product page, click “Size Chart” to view complete measurements.`,
  },
  {
    question: "Can I Track My Order?",
    answer: `Absolutely! Once shipped, you'll receive a tracking number. If not received within 48 hours, contact DENMONK support via email or their website.`,
  },
  {
    question:
      "How Can I Exchange The Order For Incorrect Size, Color Or Item Itself?",
    answer: `Email DENMONK within 14 days for returns. Items must have original tags and packaging. Defective or incorrect items qualify for free swaps.`,
  },
  {
    question: "How Do I Know If The Order Is Successfully Placed?",
    answer: `You’ll get a confirmation email. Also, a message may be sent to your WhatsApp number with relevant details.`,
  },
];

const FaqSection = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10 mt-[120px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title level={2} className="text-center mb-8">
            Frequently Asked Questions
          </Title>

          <Collapse
            accordion
            bordered={false}
            className="bg-white"
            expandIconPosition="right"
          >
            {faqs.map((faq, index) => (
              <Panel
                header={
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <strong>
                      {index + 1}. {faq.question}
                    </strong>
                  </motion.div>
                }
                key={index}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </motion.div>
              </Panel>
            ))}
          </Collapse>
        </motion.div>
      </div>
      <img
        src={faqimg}
        className="w-full h-[360px] object-co"
      />
    </>
  );
};

export default FaqSection;
