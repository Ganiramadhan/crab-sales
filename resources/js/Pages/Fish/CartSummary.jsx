export default function CartSummary({ cart, handlePayment }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mt-8">
            {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                    <span>{item.name} ({item.quantity} kg)</span>
                    <span>Rp {(item.price_kg * item.quantity).toLocaleString()}</span>
                </div>
            ))}
            <button
                onClick={handlePayment}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none mt-4"
            >
                Proceed to Payment
            </button>
        </div>
    );
}
