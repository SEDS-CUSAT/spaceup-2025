// ! /upi/spaceup-payment-qr-{a}-{b=0,1}.jpeg; a= user index, b=0 for 499, b=1 for 449

const paymentQRs = [
  {
    id: 0,
    name: "Mesac",
    upi: "mesac550@sbi",
    qr_499_url: "/mesac550sbi.jpeg",
    qr_449_url: "/mesac550sbi.jpeg",
  },
  {
    id: 1,
    name: "Jaanaky",
    upi: "jaanakyrenjith@oksbi",
    qr_499_url: "/upi/spaceup-payment-qr-0-0.jpeg",
    qr_449_url: "/upi/spaceup-payment-qr-0-1.jpeg",
  },
  {
    id: 2,
    name: "Deepak",
    upi: "deepakmk010@oksbi",
    qr_499_url: "/upi/spaceup-payment-qr-1-0.jpeg",
    qr_449_url: "/upi/spaceup-payment-qr-1-1.jpeg",
  },
];

const MAX_REGISTRATIONS = 500;

export { paymentQRs, MAX_REGISTRATIONS };