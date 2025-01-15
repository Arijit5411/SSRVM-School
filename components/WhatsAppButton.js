import Link from 'next/link';

const WhatsAppButton = () => {
    return (
        <div className="position-fixed bottom-3 end-0 p-3 z-index-1050">
        <Link href="https://wa.me/11234567890" target="_blank">
          <div
            className=""
            aria-label="Chat with us on WhatsApp"
          >
            <i className="fab fa-whatsapp fa-2x"></i>
          </div>
        </Link>
      </div>
    );
};

export default WhatsAppButton;
