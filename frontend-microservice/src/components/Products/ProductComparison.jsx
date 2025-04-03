import { useState, useEffect } from 'react';
import { useCompare } from '../../hooks/useCompare';
import PriceChart from './PriceChart';

const ProductCompare = ({ products }) => {
  const [selectedStore, setSelectedStore] = useState(null);
  const { comparePrices, loading, error } = useCompare();
  const [comparisonData, setComparisonData] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const fetchComparison = async () => {
        const productIds = products.map(p => p.id);
        const data = await comparePrices(productIds);
        setComparisonData(data);
        
        if (data && data.stores && data.stores.length > 0) {
          setSelectedStore(data.stores[0].id);
        }
      };
      
      fetchComparison();
    }
  }, [products, comparePrices]);

  if (loading) {
    return <div className="text-center py-8">Loading comparison data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading comparison: {error}</div>;
  }

  if (!comparisonData || !products || products.length === 0) {
    return <div className="text-center py-8">Select products to compare</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Price Comparison</h2>
        
        <div className="mt-4 sm:mt-0">
          <label htmlFor="store-select" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Store:
          </label>
          <select 
            id="store-select"
            value={selectedStore || ''}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            {comparisonData.stores.map(store => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              {comparisonData.stores.map(store => (
                <th 
                  key={store.id} 
                  scope="col" 
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    store.id === selectedStore ? 'text-green-700 bg-green-50' : 'text-gray-500'
                  }`}
                >
                  {store.name}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Best Deal
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => {
              // Find the best price for this product
              const productPrices = comparisonData.prices.filter(
                price => price.productId === product.id
              );
              
              const bestPrice = productPrices.reduce(
                (best, current) => (current.currentPrice < best.currentPrice ? current : best),
                { currentPrice: Infinity }
              );
              
              const bestStore = comparisonData.stores.find(
                store => store.id === bestPrice.storeId
              );

              return (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={product.image || '/images/placeholders/product.png'} 
                          alt={product.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.size}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {comparisonData.stores.map(store => {
                    const priceData = productPrices.find(
                      price => price.storeId === store.id
                    );

                    return (
                      <td 
                        key={`${product.id}-${store.id}`} 
                        className={`px-6 py-4 whitespace-nowrap ${
                          store.id === selectedStore ? 'bg-green-50' : ''
                        }`}
                      >
                        {priceData ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              ${priceData.currentPrice.toFixed(2)}
                            </div>
                            {priceData.onSale && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                SALE
                              </span>
                            )}
                            {priceData.regularPrice > priceData.currentPrice && (
                              <div className="text-xs text-gray-500 line-through">
                                ${priceData.regularPrice.toFixed(2)}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Not available</span>
                        )}
                      </td>
                    );
                  })}
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bestStore ? (
                      <div className="text-sm text-green-600 font-medium">
                        ${bestPrice.currentPrice.toFixed(2)} at {bestStore.name}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No data</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Price History</h3>
        <PriceChart 
          productId={products[0].id} 
          storeId={selectedStore} 
        />
      </div>

      <div className="mt-8 bg-green-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Potential Savings</h3>
        <p className="text-green-700">
          By shopping at the cheapest store for each item, you could save 
          approximately <span className="font-bold">${comparisonData.potentialSavings.toFixed(2)}</span>.
        </p>
      </div>
    </div>
  );
};

export default ProductCompare;