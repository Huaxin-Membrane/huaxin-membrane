/* =====================================================================
   HUAXIN — EDITABLE CONTENT
   Edit this file to add certifications or customer logos. No rebuild needed:
   save the file, upload it to your host, and the pages update.
   ===================================================================== */

window.HUAXIN_CONFIG = {
  /* Inquiry form. Submissions are sent by FormSubmit (formsubmit.co) to the address
     below. Set formEndpoint to "" to fall back to opening the visitor's email app. */
  formEndpoint: "https://formsubmit.co/ajax/service@huaxinmembrane.com",
  /* ACTIVATION (one time): the first inquiry sent from the live site triggers an
     email from FormSubmit to service@huaxinmembrane.com. Click "Activate Form" in
     it; until then, visitors see a "could not be sent, please email us" message.
     After activation FormSubmit also emails a random alias (e.g.
     https://formsubmit.co/ajax/a1b2c3...) — paste it here to hide the address
     from the page source. To switch services, replace this URL (e.g. Formspree). */
  email: "service@huaxinmembrane.com"
};

window.HUAXIN_CONTENT = {
  /* CERTIFICATIONS
     Add one entry per certificate. Put the PDF in assets/docs/certificates/.
     The "Certifications" sections on Company, Resources and every product page
     stay hidden until at least one entry exists.
     Example:
       { name: "ISO 9001:2015 Quality Management", issuer: "SGS", scope: "Design and manufacture of RO/NF membrane elements",
         valid: "2028-06", file: "assets/docs/certificates/iso-9001.pdf" }
     Paths are relative to the site root; product pages fix them automatically. */
  certifications: [
  ],

  /* CUSTOMERS
     Logos appear on the Company page only when approved: true.
     Put logo files (SVG or PNG on transparent background) in assets/img/customers/.
     Example:
       { name: "Example Group", logo: "assets/img/customers/example.svg", approved: true } */
  customers: [
  ]
};
