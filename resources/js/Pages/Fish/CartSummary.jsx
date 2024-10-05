import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaShoppingCart } from 'react-icons/fa';

export default function CartSummary({ cart, handlePayment, user, apiKey }) { 
    const [shippingOptions, setShippingOptions] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [voucherOptions, setVoucherOptions] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cityMap, setCityMap] = useState({});

    const totalPrice = cart.reduce((total, item) => total + (item.price_kg * item.quantity), 0);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const { data } = await axios.get('/city', { params: { key: apiKey } });

                if (data.rajaongkir.status.code === 200) {
                    const cityMapTemp = data.rajaongkir.results.reduce((map, city) => {
                        map[city.city_name] = city.city_id;
                        return map;
                    }, {});
                    setCityMap(cityMapTemp);
                } else {
                    showError('Failed to fetch cities', data.rajaongkir.status.description);
                }
            } catch (error) {
                showError('Error fetching cities.');
            }
        };

        fetchCity();
    }, [apiKey]);

    const fetchShippingCost = async (selectedFish) => {
        try {
            setLoading(true);
            const originCityId = cityMap[selectedFish.city];
            const destinationCityId = cityMap[user.city];

            if (!originCityId || !destinationCityId) {
                showWarning('City not found', `Please check the cities: ${selectedFish.city} or ${user.city}`);
                return;
            }

            const { data } = await axios.post('/shipping-cost', {
                origin: originCityId,
                destination: destinationCityId,
                weight: selectedFish.quantity * 1000,
                courier: 'jne'
            });

            if (data.status === 'success') {
                setShippingOptions(data.data);
                setSelectedShipping(data.data[0]);
            } else {
                showError('Shipping cost retrieval failed', 'Unable to retrieve shipping cost.');
            }
        } catch (error) {
            showError('Error checking shipping cost.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (cart.length > 0 && Object.keys(cityMap).length > 0) {
            fetchShippingCost(cart[0]);
        }
    }, [cart, cityMap]);

    const handleShippingChange = (event) => {
        const selectedService = shippingOptions.find(option => option.service === event.target.value);
        setSelectedShipping(selectedService);
    };

    const handleVoucherChange = (event) => {
        const selected = voucherOptions.find(option => option.code === event.target.value);
        setSelectedVoucher(selected);
    };

    const totalWithShipping = totalPrice + (selectedShipping ? selectedShipping.cost[0].value : 0);
    const totalWithVoucher = totalWithShipping - (selectedVoucher ? selectedVoucher.discount : 0);

    const proceedToPayment = () => {
        if (!selectedShipping) {
            Swal.fire('Error!', 'Please select a shipping option.', 'error');
            return;
        }
        handlePayment(totalWithVoucher);
    };

    const showError = (title, text = 'An error occurred') => {
        Swal.fire({
            icon: 'error',
            title,
            text,
        });
    };

    const showWarning = (title, text) => {
        Swal.fire({
            icon: 'warning',
            title,
            text,
        });
    };

    return (
        <div className="relative bg-white rounded-lg shadow-lg p-6 mt-8 max-w-xl mx-auto">
            <FaShoppingCart className="absolute top-4 right-4 text-2xl text-gray-700 cursor-pointer" />

            <h2 className="text-lg font-bold mb-4">Cart Summary</h2>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Delivery Address</h3>
                <p className="text-gray-700 mt-2">
                    {user.address}
                </p>
            </div>

            {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                    <span>{item.name} ({item.quantity} kg)</span>
                    <span>Rp {(item.price_kg * item.quantity).toLocaleString()}</span>
                </div>
            ))}

            <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-4">
                <span className="font-semibold">Total Price</span>
                <span className="font-semibold">Rp {totalPrice.toLocaleString()}</span>
            </div>

            <div className="flex flex-col mt-4">
                <label className="font-semibold mb-2">Shipping Cost</label>
                <select
                    value={selectedShipping ? selectedShipping.service : ''}
                    onChange={handleShippingChange}
                    className="border rounded px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    <option value="" disabled>Select shipping option</option>
                    {shippingOptions.map((option, index) => (
                        <option key={index} value={option.service}>
                            {option.description} - Rp {option.cost[0].value.toLocaleString()} (ETD: {option.cost[0].etd} days)
                        </option>
                    ))}
                </select>
                {loading && <p className="mt-2 text-gray-500">Loading...</p>}
                {selectedShipping && (
                    <div className="mt-2 p-2 border border-gray-300 rounded bg-gray-50">
                        <h4 className="font-semibold">Selected Shipping Option:</h4>
                        <p>{selectedShipping.description}</p>
                        <p>Cost: Rp {selectedShipping.cost[0].value.toLocaleString()}</p>
                        <p>Estimated Delivery Time: {selectedShipping.cost[0].etd} days</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col mt-4">
                <label className="font-semibold mb-2">Voucher</label>
                <select
                    value={selectedVoucher ? selectedVoucher.code : ''}
                    onChange={handleVoucherChange}
                    className="border rounded px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>Select voucher</option>
                    {voucherOptions.map((voucher, index) => (
                        <option key={index} value={voucher.code}>
                            {voucher.description} - Rp {voucher.discount.toLocaleString()}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-4">
                <span className="font-bold text-lg">Total Payment</span>
                <span className="font-bold text-lg">Rp {totalWithVoucher.toLocaleString()}</span>
            </div>

            <button
                onClick={proceedToPayment}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none mt-4 w-full"
                disabled={!selectedShipping} 
            >
                Proceed to Payment
            </button>
        </div>
    );
}
