import React, { useEffect, useState } from 'react';
import { GoChevronDown } from "react-icons/go";

function FAQ() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  // when uesr click then page show on the top every time
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='px-6 lg:px-32 py-5 bg-neutral-50'>
      <h1 className='text-2xl font-bold text-center mb-8'>FAQ</h1>

      <div className='space-y-4'>
        {/* PRODUCTS Section */}
        <h2 className='text-xl font-bold'>PRODUCTS</h2>
        <div className='px-2 lg:px-10'>
          <div className='QuestionBox'>
            <p className='Question' onClick={() => toggleQuestion(1)}>
              <p>Q: ARE YOUR PRODUCTS ORGANIC? </p>  <GoChevronDown />
            </p>
            <div
              className={`transition-all duration-500 ease-in-out ${openQuestionIndex === 1 ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden pl-4`}
            >
              <p className='text-sm leading-7'>
                YES, OUR HENNA POWDER AND OILS AND HERBAL POWDER ARE MADE FROM ORGANIC AND NATURAL INGREDIENTS. WE PRIORITIZE QUALITY AND SAFETY IN ALL OUR PRODUCTS.
              </p>
            </div>
          </div>
          <div className='QuestionBox'>
            <p className='Question' onClick={() => toggleQuestion(2)}>
              <p>Q: HOW SHOULD I STORE MY HENNA POWDER AND OIL? </p> <GoChevronDown />
            </p>
            <div
              className={`transition-all duration-300 ease-in-out ${openQuestionIndex === 2 ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden pl-4`}
            >
              <p className='text-sm leading-7'>
                STORE HENNA POWDER IN A COOL, DRY PLACE IN AN AIRTIGHT CONTAINER. OIL SHOULD BE STORED IN A COOL AND DRY PLACE TO MAINTAIN THEIR POTENCY.
              </p>
            </div>
          </div>
        </div>

        {/* ORDERING & PAYMENTS Section */}
        <h2 className='text-xl font-bold'>ORDERING & PAYMENTS</h2>
        <div className='px-2 lg:px-10'>

          <div className='QuestionBox'>
            <p className='Question' onClick={() => toggleQuestion(3)}>
              <p>Q: HOW DO I PLACE AN ORDER? </p>  <GoChevronDown />
            </p>
            <div
              className={`transition-all duration-300 ease-in-out ${openQuestionIndex === 3 ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden pl-4`}
            >
              <p className='text-sm leading-7'>
                STEP 1: CLICK YOUR PRODUCT CATEGORY
                <br />STEP 2: CLICK ON ADD TO CART
                <br />STEP 3: GO TO YOUR CART
                <br />STEP 4: MAKE PAYMENT AS PER YOUR CONVENIENCE
              </p>
            </div>
          </div>
          <div className='QuestionBox'>
            <p className='Question' onClick={() => toggleQuestion(4)}>
              <p>Q: IS IT GST INCLUDED? </p>  <GoChevronDown />
            </p>
            <div
              className={`transition-all duration-300 ease-in-out ${openQuestionIndex === 4 ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden pl-4`}
            >
              <p className='text-sm leading-7'>
                YES, ALL PRODUCTS INCLUDE GST.
              </p>
            </div>
          </div>
          <div className='QuestionBox'>
            <p className='Question' onClick={() => toggleQuestion(5)}>
              <p>Q: WHAT PAYMENT TYPES DO YOU OFFER? </p>  <GoChevronDown />
            </p>
            <div
              className={`transition-all duration-300 ease-in-out ${openQuestionIndex === 5 ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden pl-4`}
            >
              <p className='text-sm leading-7'>
                WE ACCEPT ALL CREDIT, DEBIT CARDS, NETBANKING, UPI, PHONEPE, GOOGLE PAY, ETC.
              </p>
            </div>
          </div>
        </div>

        {/* RETURN AND EXCHANGE Section */}
        <h2 className='text-xl font-bold'>RETURN AND EXCHANGE</h2>
        <div className='px-2 lg:px-10'>
          <div className='QuestionBox'>
            <p className='Question' onClick={() => toggleQuestion(6)}>
              <p>Q: HOW WILL I GET A REFUND FOR MY CANCELLED ORDERS AND HOW LONG WILL THIS PROCESS TAKE? </p>  <GoChevronDown />
            </p>
            <div
              className={`transition-all duration-300 ease-in-out ${openQuestionIndex === 6 ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden pl-4`}
            >
              <p className='text-sm leading-7'>
                PLEASE REFER TO THE RETURN AND REFUND POLICY TO UNDERSTAND THE PROCESS FOR A RETURN. THE REFUND AMOUNT WILL REFLECT AS PER BANK GUIDELINES, USUALLY WITHIN 7-10 BUSINESS DAYS. WE DO NOT ENTERTAIN RETURN REQUESTS UNLESS THE ORDER QUALIFIES AS PER OUR RETURNS AND REFUNDS POLICY. FOR ANY SUCH REQUIREMENTS, PLEASE MAIL US AT{' '}
                <a href='mailto:careyumimehandi@gmail.com' className='text-blue-500 underline'>
                  careyumimehandi@gmail.com
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* CUSTOMER SUPPORT Section */}
        <h2 className='text-xl font-bold'>CUSTOMER SUPPORT</h2>
        <div className='px-2 lg:px-10'>
          <div className='QuestionBox'>
            <p className='Question' onClick={() => toggleQuestion(7)}>
              <p>Q: HOW CAN I CONTACT CUSTOMER CARE? </p>  <GoChevronDown />
            </p>
            <div
              className={`transition-all duration-300 ease-in-out ${openQuestionIndex === 7 ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden pl-4`}
            >
              <p className='text-sm leading-7'>
                YOU CAN CONTACT CUSTOMER CARE FOR ANY QUESTIONS AT{' '}
                <a href='mailto:careyumimehandi@gmail.com' className='text-blue-500 underline'>
                  careyumimehandi@gmail.com
                </a>.
              </p>
            </div>
          </div>
          <div className='QuestionBox'>
            <p className='Question' onClick={() => toggleQuestion(8)}>
              <p>Q: WHAT ARE CUSTOMER SERVICE HOURS? </p>  <GoChevronDown />
            </p>
            <div
              className={`transition-all duration-300 ease-in-out ${openQuestionIndex === 8 ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden pl-4`}
            >
              <p className='text-sm leading-7'>
                OUR CUSTOMER SERVICE TEAM IS AVAILABLE MONDAY TO FRIDAY, 9 AM TO 6 PM.
              </p>
            </div>
          </div>
        </div>

        {/* OTHER Section */}
        <h2 className='text-xl font-bold'>OTHER</h2>
        <div className='px-2 lg:px-10'>
          <div className='QuestionBox'>
            <p className='Question' onClick={() => toggleQuestion(9)}>
              <p>Q: DO YOU OFFER BULK BUYING? </p>  <GoChevronDown />
            </p>
            <div
              className={`transition-all duration-300 ease-in-out ${openQuestionIndex === 9 ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden pl-4`}
            >
              <p className='text-sm leading-7'>
                YES, WE OFFER BULK BUYING. IF INTERESTED, PLEASE CONTACT US AT{' '}
                <a href='mailto:careyumimehandi@gmail.com' className='text-blue-500 underline'>
                  careyumimehandi@gmail.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
