import React, { useState, useEffect } from 'react';
const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://dummyjson.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.products || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching products:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const searchProducts = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            setError('Search term cannot be empty');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Failed to search products');
            }
            const data = await response.json();
            setProducts(data.products || []);
        } catch (err) {
            setError(err.message);
            console.error('Error searching products:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (error === 'Search term cannot be empty' && e.target.value.trim()) {
            setError(null);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Product Catalog</h1>

            <form onSubmit={searchProducts} className="flex gap-2 mb-6 max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Search
                </button>
            </form>
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}

            {isLoading && <div className="text-center text-gray-600 mb-4">Loading products...</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2 truncate">{product.title}</h3>
                                <p className="text-blue-600 font-bold mb-2">${product.price}</p>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                                <div className="text-amber-500">
                                    Rating: {product.rating} ★
                                </div>
                            </div>
                        </div>
                    ))
                ) : !isLoading && (
                    <div className="col-span-full text-center text-gray-500 py-8">No products found</div>
                )}
            </div>


            {searchTerm && (
                <div className="text-center mt-6">
                    <button
                        onClick={fetchProducts}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition duration-200"
                    >
                        Show All Products
                    </button>
                </div>
            )}
        </div>
    );
};

export default Product;