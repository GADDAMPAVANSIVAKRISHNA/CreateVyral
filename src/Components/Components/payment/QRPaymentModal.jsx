import React from 'react';

const QRPaymentModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded">
                <h2>Scan QR to Pay</h2>
            </div>
        </div>
    );
};

export default QRPaymentModal;
