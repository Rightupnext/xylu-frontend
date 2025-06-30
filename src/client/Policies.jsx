import React from "react";

const Policies = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 mt-[130px]">
      <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">Our Store Policies</h1>

      {/* Returns & Refunds */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns & Refunds</h2>
        <p className="mb-2">
          We want you to love what you buy. If you're not satisfied with your purchase, you may request a return or refund within <strong>7 days</strong> of delivery.
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Items must be unused, unwashed, and in original packaging.</li>
          <li>Refunds are processed via Razorpay to the original payment method.</li>
          <li>Shipping charges are non-refundable.</li>
        </ul>
        <p className="mt-2">
          To initiate a return, email us at <strong>xylu@gmail.com</strong> or call <strong>+91 87898 98678</strong>.
        </p>
      </section>

      {/* Terms & Conditions */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Prices are subject to change without prior notice.</li>
          <li>All orders are subject to product availability.</li>
          <li>We reserve the right to cancel or refuse any order at our discretion.</li>
          <li>Payments are securely processed through Razorpay.</li>
        </ul>
      </section>

      {/* Privacy Policy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
        <p className="mb-2">
          We are committed to protecting your privacy. Here's how we use your data:
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>We collect your name, email, phone number, and address to process orders.</li>
          <li>We never sell or share your data with third parties.</li>
          <li>Payments are handled via Razorpay, and no payment data is stored on our servers.</li>
        </ul>
        <p className="mt-2">
          For any concerns, contact us at <strong>xylu@gmail.com</strong>.
        </p>
      </section>

      {/* Shipping Policy */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Policy</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Orders are shipped within <strong>2–3 business days</strong>.</li>
          <li>Delivery time is <strong>4–7 business days</strong> depending on your location.</li>
          <li>We deliver across India using trusted courier partners.</li>
          <li>Tracking information will be provided via email or SMS.</li>
        </ul>
        <p className="mt-2">
          Please make sure your delivery address (<strong>Xyz Address</strong>) is accurate during checkout.
        </p>
      </section>
    </div>
  );
};

export default Policies;
