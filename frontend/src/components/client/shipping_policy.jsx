import React from 'react';

function ShippingPolicy() {
  return (
    <div className='px-6 lg:px-32 py-5'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Shipping Policy</h1>
      <p className='mb-4'>
        Thank you for shopping at Hennakart. We are committed to providing you reliable and timely delivery of our high-quality henna powder, essential oils, and face & hair care products. Please review our shipping policy below.
      </p>

      <h2 className='text-xl font-bold mb-2'>1. Shipping Locations</h2>
      <p className='mb-4'>We ship our products all over India.</p>

      <h2 className='text-xl font-bold mb-2'>2. Processing Time</h2>
      <ul className='list-disc pl-5 mb-4'>
        <li>Orders are processed within 1-2 business days after payment confirmation.</li>
        <li>Orders placed on weekends or public holidays will be processed on the next business day.</li>
      </ul>

      <h2 className='text-xl font-bold mb-2'>3. Shipping Methods and Delivery Times</h2>
      <p className='mb-4'>We offer various shipping options to meet your needs:</p>
      <ul className='list-disc pl-5 mb-4'>
        <li><strong>Standard Shipping:</strong> Delivery within 5-10 business days from the date of dispatch.</li>
      </ul>

      <h2 className='text-xl font-bold mb-2'>4. Order Tracking</h2>
      <p className='mb-4'>
        Once your order is shipped, you will receive a shipping confirmation email with a tracking number. You can track your order using the tracking number provided on our website or the courier's website.
      </p>

      <h2 className='text-xl font-bold mb-2'>5. Shipping Address</h2>
      <p className='mb-4'>
        Please ensure that your shipping address is accurate and complete to avoid delays. Hennakart is not responsible for orders shipped to incorrect or incomplete addresses provided by the customer.
      </p>

      <h2 className='text-xl font-bold mb-2'>6. Delays and Issues</h2>
      <p className='mb-4'>
        While we strive to deliver your order within the estimated time frame, there may be unforeseen delays due to factors beyond our control (e.g., weather conditions, customs processing). If you experience any issues with your delivery, please contact our customer service team for assistance.
      </p>

      <h2 className='text-xl font-bold mb-2'>7. Undeliverable Packages</h2>
      <p className='mb-4'>
        If a package is returned to us due to an incorrect address, refusal to accept the package, or other delivery issues, we will contact you to arrange re-shipment. Additional shipping charges may apply for re-shipment.
      </p>

      <h2 className='text-xl font-bold mb-2'>8. Contact Us</h2>
      <p className='mb-4'>
        For any questions or concerns regarding our shipping policy, please contact our customer service team at:
      </p>
      <ul className='list-disc pl-5 mb-4'>
        <li>Email: <a href="mailto:careyumimehandi@gmail.com" className='text-blue-500 underline'>careyumimehandi@gmail.com</a></li>
        <li>Phone: <a href="tel:+919256432475" className='text-blue-500 underline'> +919256432475 </a></li>
        <li>Address: Yumi Mehandi, Bera Maylat, Sojat City, 306104 Pali, Rajasthan, India</li>
      </ul>

      <p className='mt-4'>
        Thank you for choosing Hennakart. We appreciate your business and are dedicated to providing you with a seamless shopping experience.
      </p>
    </div>
  );
}

export default ShippingPolicy;
