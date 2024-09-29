import React , {useEffect} from 'react';

function PrivacyPolicy() {
  // when uesr click then page show on the top every time
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className='px-6 lg:px-32 py-5'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Privacy Policy</h1>
      <p className='mb-4'>
        At Hennakart, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website and make purchases.
      </p>
      <p className='mb-4'>
        AT HENNAKART, WE ARE COMMITTED TO PROTECTING YOUR PRIVACY. THIS POLICY OUTLINES HOW WE COLLECT, USE, AND SAFEGUARD YOUR PERSONAL INFORMATION.
      </p>

      <h2 className='text-xl font-bold mb-2'>1. Information We Collect</h2>
      <p className='mb-4'>We collect various types of information to provide a better customer experience.</p>

      <h3 className='text-lg font-bold mb-2'>a. Personal Information:</h3>
      <ul className='list-disc pl-5 mb-4'>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Shipping and billing address</li>
        <li>Payment information (processed securely via trusted partner Razorpay)</li>
      </ul>

      <h3 className='text-lg font-bold mb-2'>b. Non-Personal Information:</h3>
      <ul className='list-disc pl-5 mb-4'>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>IP address</li>
        <li>Referring website</li>
        <li>Pages visited on our site</li>
        <li>Date and time of visit</li>
      </ul>

      <h2 className='text-xl font-bold mb-2'>2. How We Use Your Information</h2>
      <p className='mb-4'>We use your information for the following purposes:</p>
      <ul className='list-disc pl-5 mb-4'>
        <li>To process your orders</li>
        <li>To communicate with you regarding your orders</li>
        <li>To improve our website, products, and services</li>
        <li>To enhance security</li>
      </ul>

      <h2 className='text-xl font-bold mb-2'>3. Sharing Your Information</h2>
      <p className='mb-4'>We do not sell or otherwise transfer your personal information to outside parties except as described below:</p>
      <h3 className='text-lg font-bold mb-2'>a. Service Providers:</h3>
      <p className='mb-4'>
        We may share your information with third-party service providers who assist us in operating our website, processing payments, and delivering orders. These service providers are required to keep your information confidential.
      </p>
      <h3 className='text-lg font-bold mb-2'>b. Legal Requirements:</h3>
      <p className='mb-4'>
        We may disclose your information if required by law or in response to valid requests by public authorities.
      </p>

      <h2 className='text-xl font-bold mb-2'>4. Data Security</h2>
      <p className='mb-4'>We implement various security measures to protect your personal information:</p>
      <ul className='list-disc pl-5 mb-4'>
        <li>Secure Socket Layer (SSL) technology to encrypt your payment information</li>
        <li>Regular security assessments and updates to our systems</li>
        <li>Restricted access to personal information to authorized personnel only</li>
      </ul>

      <h2 className='text-xl font-bold mb-2'>5. Cookies and Tracking Technologies</h2>
      <p className='mb-4'>
        We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us remember your preferences and understand how you use our site.
      </p>
      <p className='mb-4'>
        You can manage your cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our website.
      </p>

      <h2 className='text-xl font-bold mb-2'>6. Third-Party Links</h2>
      <p className='mb-4'>
        Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
      </p>

      <h2 className='text-xl font-bold mb-2'>7. Children's Privacy</h2>
      <p className='mb-4'>
        Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently received personal information from a child under 13, we will delete such information from our records.
      </p>

      <h2 className='text-xl font-bold mb-2'>8. Changes to This Privacy Policy</h2>
      <p className='mb-4'>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
      </p>

      <h2 className='text-xl font-bold mb-2'>9. Contact Us</h2>
      <p className='mb-4'>
        If you have any questions or concerns about this Privacy Policy, please contact us at:
      </p>
      <ul className='list-disc pl-5 mb-4'>
        <li>Email: <a href="mailto:careyumimehandi@gmail.com" className='text-blue-500 underline'>careyumimehandi@gmail.com</a></li>
        <li>Phone: +919256432475</li>
        <li>Address: Yumi Mehandi, Bera Maylat, Sojat City, 306104 Pali, Rajasthan, India</li>
      </ul>

      <p className='mt-4'>
        Thank you for choosing Hennakart. Your privacy is important to us, and we are committed to protecting your personal information.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
