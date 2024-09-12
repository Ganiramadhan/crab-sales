import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserLayout from '@/Layouts/UserLayout';
import axios from 'axios';
import Swal from 'sweetalert2';
import FishCard from './FishCard';
import CartModal from './CartModal';
import CartSummary from './CartSummary';
import AddEditFishModal from './AddEditFishModal'; 
import ConfirmDeleteModal from './ConfirmDeleteModal'; 
import { FaPlus } from 'react-icons/fa';


export default function FishProducts({ user, title, fishProducts: initialFishProducts }) {
    const Layout = user.role === 'admin' ? AuthenticatedLayout : UserLayout;
    const [showCartModal, setShowCartModal] = useState(false);
    const [currentFish, setCurrentFish] = useState(null);
    const [cart, setCart] = useState([]);
    const [selectedKg, setSelectedKg] = useState(1);
    const [fishProducts, setFishProducts] = useState(initialFishProducts);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingFish, setEditingFish] = useState(null);
    const [deletingFishId, setDeletingFishId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); 

    // Filter out products with stock 0 and based on search query
    const availableFishProducts = fishProducts
        .filter(fish => fish.stock > 0)
        .filter(fish => {
            const query = searchQuery.toLowerCase();
            return (
                fish.name.toLowerCase().includes(query) ||
                fish.description.toLowerCase().includes(query) ||
                fish.price_kg.toString().includes(query)
            );
        });

    const handleAddToCart = (fish) => {
        setCurrentFish(fish);
        setShowCartModal(true);
    };

    const handleAddToCartConfirm = () => {
        if (selectedKg > currentFish.stock) {
            Swal.fire('Error!', 'Cannot add more than available stock.', 'error');
            return;
        }

        const existingProductIndex = cart.findIndex(item => item.id === currentFish.id);
        if (existingProductIndex >= 0) {
            const updatedCart = [...cart];
            const newQuantity = updatedCart[existingProductIndex].quantity + selectedKg;
            if (newQuantity > currentFish.stock) {
                Swal.fire('Error!', 'Cannot add more than available stock.', 'error');
                return;
            }
            updatedCart[existingProductIndex].quantity = newQuantity;
            setCart(updatedCart);
        } else {
            const fishWithKg = { ...currentFish, quantity: selectedKg };
            setCart([...cart, fishWithKg]);
        }
        setShowCartModal(false);
        Swal.fire('Added!', 'Fish product has been added to the cart.', 'success');
    };

    const handlePayment = async () => {
        try {
            const totalAmount = cart.reduce((sum, item) => sum + item.price_kg * item.quantity, 0);
    
            const response = await axios.post('/create-snap-token', {
                order_id: `order-${Date.now()}`, 
                gross_amount: totalAmount,
                fish_id: currentFish.id, 
                price_kg: selectedKg 
            });
    
            const snapToken = response.data.snap_token;
    
            window.snap.pay(snapToken, {
                onSuccess: function(result) {
                    // Reduce stock and reset cart
                    const updatedFishProducts = fishProducts.map(fish => {
                        if (fish.id === currentFish.id) {
                            return { ...fish, stock: fish.stock - selectedKg };
                        }
                        return fish;
                    });
                    setFishProducts(updatedFishProducts);
                    setCart([]);
                    setSelectedKg(1);
                    Swal.fire('Success!', 'Payment successful!', 'success');
                },
                onPending: function(result) {
                    Swal.fire('Pending!', 'Waiting for payment confirmation!', 'info');
                },
                onError: function(result) {
                    Swal.fire('Error!', 'Payment failed!', 'error');
                },
                onClose: function() {
                    Swal.fire('Cancelled!', 'Payment cancelled!', 'warning');
                }
            });
        } catch (error) {
            console.error('Error initiating payment:', error);
            Swal.fire('Error!', 'Failed to initiate payment.', 'error');
        }
    };

    const handleAddFish = () => {
        setEditingFish(null);
        setShowAddEditModal(true);
    };

    const handleEditFish = (fish) => {
        setEditingFish(fish);
        setShowAddEditModal(true);
    };

    const handleDeleteFish = (id) => {
        setDeletingFishId(id);
        setShowDeleteModal(true);
    };

    const onAddEditModalClose = () => {
        setShowAddEditModal(false);
        // Optionally refetch data here
    };

    const onDeleteModalClose = () => {
        setShowDeleteModal(false);
    };

    return (
        <Layout
            user={user}
            header={<h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>}
        >
            <div className="container mx-auto py-8">
                {user.role === 'admin' && (
                    <button
                        onClick={handleAddFish}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none mb-4 flex items-center"
                    >
                        <FaPlus className="mr-2" /> Add Fish
                    </button>
                )}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search fish by name, description, or price..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                </div>

                <div className="mt-4">
                    {availableFishProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {availableFishProducts.map(fish => (
                                <FishCard
                                    key={fish.id}
                                    fish={fish}
                                    user={user}
                                    handleAddToCart={handleAddToCart}
                                    handleEdit={() => handleEditFish(fish)}
                                    handleDelete={() => handleDeleteFish(fish.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No fish products found.</p>
                    )}
                </div>

                {showCartModal && (
                    <CartModal
                        currentFish={currentFish}
                        selectedKg={selectedKg}
                        setSelectedKg={setSelectedKg}
                        setShowCartModal={setShowCartModal}
                        handleAddToCartConfirm={handleAddToCartConfirm}
                    />
                )}

                {cart.length > 0 && (
                    <CartSummary cart={cart} handlePayment={handlePayment} />
                )}

                {showAddEditModal && (
                    <AddEditFishModal
                        fish={editingFish}
                        onClose={onAddEditModalClose}
                        onSave={(updatedFish) => {
                            setFishProducts(prev => {
                                if (updatedFish.id) {
                                    return prev.map(fish => fish.id === updatedFish.id ? updatedFish : fish);
                                }
                                return [...prev, updatedFish];
                            });
                            onAddEditModalClose();
                        }}
                    />
                )}

                {showDeleteModal && (
                    <ConfirmDeleteModal
                        onClose={onDeleteModalClose}
                        onDelete={() => {
                            axios.delete(`/fish/${deletingFishId}`).then(() => {
                                setFishProducts(prev => prev.filter(fish => fish.id !== deletingFishId));
                                onDeleteModalClose();
                                Swal.fire('Deleted!', 'Fish product has been deleted.', 'success');
                            }).catch(error => {
                                console.error('Error deleting fish:', error);
                                Swal.fire('Error!', 'Failed to delete fish product.', 'error');
                            });
                        }}
                    />
                )}
            </div>
        </Layout>
    );
}
