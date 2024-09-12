import { useEffect } from 'react';

export default function CartModal({ currentFish, selectedKg, setSelectedKg, setShowCartModal, handleAddToCartConfirm }) {
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            setShowCartModal(false);
        }
    };

    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            setShowCartModal(false);
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/3 p-4">
                <h2 className="text-xl font-semibold mb-4">Select Quantity (kg)</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Quantity (kg)</label>
                    <input
                        type="number"
                        value={selectedKg}
                        onChange={(e) => setSelectedKg(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        min="1"
                        max={currentFish ? currentFish.stock : 1}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => setShowCartModal(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddToCartConfirm}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
