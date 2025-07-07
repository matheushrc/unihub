
import React, { useState } from 'react';
import { Search, Plus, User, Home, ShoppingBag, MessageCircle, Star, MapPin, Filter, ArrowLeft, Heart, Share2, ShoppingCart, Camera, DollarSign, TrendingUp, Users, Package } from 'lucide-react';
import { products, Product } from './products';

const UnihubApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [institutionFilter, setInstitutionFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [showSell, setShowSell] = useState(false);

  // Sample data agora está em products.ts

  // Calculate category counts dynamically
  const categoryIcons: Record<string, string> = {
    "Alimentação": "🍕",
    "Educação": "📚",
    "Moda": "👕",
    "Serviços": "🔧",
    "Tecnologia": "💻"
  };
  const categoryNames = Object.keys(categoryIcons);
  // Função para obter as categorias filtradas por instituição
  const getCategories = () => {
    return categoryNames.map(name => ({
      name,
      icon: categoryIcons[name],
      count: institutionFilter
        ? products.filter(p => p.category === name && p.location === institutionFilter).length
        : products.filter(p => p.category === name).length
    }));
  };
  const categories = getCategories();

  // Get unique institutions from products
  // Map institution names to logo files
  const institutionLogos: Record<string, string> = {
    'UFFS - Campus Chapecó': 'logos/uffs.png',
    'UNOESC - Chapecó': 'logos/unoesc.png',
    'Unochapecó': 'logos/unochapeco.png',
  };
  const institutions = Array.from(new Set(products.map(p => p.location)));

  const toggleFavorite = (productId: number) => {
    setFavorites((prev: number[]) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  interface HeaderComponentProps {
    title: string;
    showBack?: boolean;
  }
  const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, showBack = false }) => (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        {showBack && (
          <ArrowLeft 
            className="mr-3 cursor-pointer" 
            size={24} 
            onClick={() => setCurrentScreen('home')}
          />
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-white/20 rounded-full p-2">
          <MessageCircle size={20} />
        </div>
        <div
          className="bg-white/20 rounded-full p-2 relative cursor-pointer"
          onClick={() => setCurrentScreen('cart')}
          title="Ver carrinho"
        >
          <ShoppingCart size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const NavigationBar = () => (
    <div className="bg-white border-t border-gray-200 p-4 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
      <div className="flex justify-around">
        <button 
          className={`flex flex-col items-center ${currentScreen === 'home' ? 'text-purple-600' : 'text-gray-400'}`}
          onClick={() => setCurrentScreen('home')}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Início</span>
        </button>
        <button 
          className={`flex flex-col items-center ${currentScreen === 'cart' ? 'text-purple-600' : 'text-gray-400'}`}
          onClick={() => setCurrentScreen('cart')}
        >
          <ShoppingCart size={24} />
          <span className="text-xs mt-1">Carrinho</span>
        </button>
        <button 
          className={`flex flex-col items-center ${currentScreen === 'profile' ? 'text-purple-600' : 'text-gray-400'}`}
          onClick={() => setCurrentScreen('profile')}
        >
          <User size={24} />
          <span className="text-xs mt-1">Perfil</span>
        </button>
      </div>
    </div>
  );

  interface ProductCardProps {
    product: Product;
  }
  const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <span className="text-4xl mr-3">{product.image}</span>
          <div>
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.seller}</p>
          </div>
        </div>
        <button 
          className="text-red-500"
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart 
            size={20} 
            fill={favorites.includes(product.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
      
      <div className="flex items-center mb-3">
        <MapPin size={16} className="text-gray-400 mr-1" />
        <span className="text-sm text-gray-600">{product.location}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Star className="text-yellow-400 mr-1" size={16} fill="currentColor" />
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-purple-600">R$ {product.price.toFixed(2)}</span>
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
            onClick={() => addToCart(product)}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );

  const HomeScreen = () => {
    // Filtros de ordenação e intervalo de preço
    const [sortFilter, setSortFilter] = useState<'none' | 'asc' | 'desc'>('none');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    // Aplica filtros de ordenação e intervalo de preço
    let filteredProducts = products;
    if (institutionFilter) {
      filteredProducts = filteredProducts.filter(p => p.location === institutionFilter);
    }
    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }
    if (minPrice !== '') {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    if (sortFilter === 'asc') {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortFilter === 'desc') {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    return (
      <div className="bg-gray-50 min-h-screen">
        <HeaderComponent title="Unihub" />
        {/* User Type Toggle */}
        <div className="p-4 bg-white">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                userType === 'buyer' && !showSell ? 'bg-purple-600 text-white' : 'text-gray-600'
              }`}
              onClick={() => { setUserType('buyer'); setShowSell(false); }}
            >
              Comprar
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                (userType === 'seller' || showSell) ? 'bg-purple-600 text-white' : 'text-gray-600'
              }`}
              onClick={() => { setUserType('seller'); setShowSell(true); }}
            >
              Vender
            </button>
          </div>
        </div>
        {showSell ? (
          <div className="p-4">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Cadastrar Produto</h2>
              {/* Photo Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto do Produto</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-sm text-gray-500">Toque para adicionar foto</p>
                </div>
              </div>
              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Ex: Brigadeiros Gourmet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder="Descreva seu produto..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 text-gray-400" size={16} />
                      <input 
                        type="number" 
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Alimentação</option>
                      <option>Educação</option>
                      <option>Moda</option>
                      <option>Serviços</option>
                      <option>Tecnologia</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Ex: UFFS - Campus Chapecó"
                  />
                </div>
              </div>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium mt-6">
                Publicar Produto
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="p-4 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar produtos ou serviços..." 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            {/* Institution Filter */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-3">Instituição</h2>
            <div className="relative">
              {/* Carousel Buttons - Minimalist */}
              <button
                type="button"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-0.5 flex items-center justify-center border border-gray-200 shadow-sm"
                style={{ display: 'block', width: 24, height: 24 }}
                onClick={() => {
                  const el = document.getElementById('institution-carousel');
                  if (el) el.scrollBy({ left: -120, behavior: 'smooth' });
                }}
                aria-label="Scroll left"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="10 13 5 8 10 3" /></svg>
              </button>
              <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-0.5 flex items-center justify-center border border-gray-200 shadow-sm"
                style={{ display: 'block', width: 24, height: 24 }}
                onClick={() => {
                  const el = document.getElementById('institution-carousel');
                  if (el) el.scrollBy({ left: 120, behavior: 'smooth' });
                }}
                aria-label="Scroll right"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 13 11 8 6 3" /></svg>
              </button>
              <div
                id="institution-carousel"
                className="flex gap-2 pb-2 snap-x snap-mandatory overflow-x-auto scrollbar-hide scroll-smooth"
                style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth', paddingLeft: 32, paddingRight: 32 }}
              >
                <button
                  className={`px-4 py-2 rounded-lg text-sm border flex items-center justify-center min-w-[100px] h-12 snap-center ${!institutionFilter ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-200'}`}
                  onClick={() => { setInstitutionFilter(''); setCategoryFilter(''); }}
                >
                  Todas
                </button>
                {institutions.map((inst, idx) => (
                  <button
                    key={idx}
                    className={`px-2 py-2 rounded-lg text-sm border flex items-center justify-center min-w-[100px] h-12 snap-center ${institutionFilter === inst ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-200'}`}
                    onClick={() => setInstitutionFilter(inst)}
                  >
                    <img
                      src={institutionLogos[inst]}
                      alt={inst}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
            </div>
            {/* Categories */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-3">Categorias</h2>
              <div className="relative">
                {/* Carousel Buttons - Minimalist */}
                <button
                  type="button"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-0.5 flex items-center justify-center border border-gray-200 shadow-sm"
                  style={{ display: 'block', width: 24, height: 24 }}
                  onClick={() => {
                    const el = document.getElementById('category-carousel');
                    if (el) el.scrollBy({ left: -120, behavior: 'smooth' });
                  }}
                  aria-label="Scroll left"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="10 13 5 8 10 3" /></svg>
                </button>
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-0.5 flex items-center justify-center border border-gray-200 shadow-sm"
                  style={{ display: 'block', width: 24, height: 24 }}
                  onClick={() => {
                    const el = document.getElementById('category-carousel');
                    if (el) el.scrollBy({ left: 120, behavior: 'smooth' });
                  }}
                  aria-label="Scroll right"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 13 11 8 6 3" /></svg>
                </button>
                <div
                  id="category-carousel"
                  className="flex gap-3 pb-2 snap-x snap-mandatory overflow-x-auto scrollbar-hide scroll-smooth"
                  style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth', paddingLeft: 32, paddingRight: 32 }}
                >
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 bg-white rounded-lg p-3 text-center min-w-[80px] snap-center border ${categoryFilter === category.name ? 'border-purple-600 ring-2 ring-purple-200' : 'border-gray-200'}`}
                      onClick={() => setCategoryFilter(category.name === categoryFilter ? '' : category.name)}
                    >
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="text-xs font-medium text-gray-700">{category.name}</div>
                      <div className="text-xs text-gray-500">{category.count}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Products */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Produtos em Destaque</h2>
                <div className="relative">
                  <button
                    className="text-gray-500 text-sm font-medium flex items-center gap-1 focus:outline-none hover:text-purple-600"
                    onClick={() => setFilterMenuOpen((open) => !open)}
                  >
                    Filtrar
                    <span className="ml-1">
                      {filterMenuOpen ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 10 8 6 12 10" /></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 6 8 10 12 6" /></svg>
                      )}
                    </span>
                  </button>
                  {filterMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-3">
                        <div className="mb-2 font-semibold text-gray-700">Ordenar por</div>
                        <button className={`block w-full text-left px-2 py-1 rounded ${sortFilter === 'asc' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`} onClick={() => setSortFilter('asc')}>Menor preço</button>
                        <button className={`block w-full text-left px-2 py-1 rounded ${sortFilter === 'desc' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`} onClick={() => setSortFilter('desc')}>Maior preço</button>
                        <button className={`block w-full text-left px-2 py-1 rounded ${sortFilter === 'none' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`} onClick={() => setSortFilter('none')}>Sem ordenação</button>
                        <div className="mt-3 mb-1 font-semibold text-gray-700">Intervalo de preço</div>
                        <div className="flex gap-2">
                          <input type="number" min="0" placeholder="Mín" className="w-1/2 px-2 py-1 border border-gray-200 rounded" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                          <input type="number" min="0" placeholder="Máx" className="w-1/2 px-2 py-1 border border-gray-200 rounded" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                        </div>
                        <button className="mt-3 w-full bg-purple-600 text-white py-1 rounded" onClick={() => { setMinPrice(''); setMaxPrice(''); setSortFilter('none'); }}>Limpar filtros</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  Nenhum produto encontrado para este filtro.
                </div>
              ) : (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </>
        )}
        <NavigationBar />
      </div>
    );
  };

  const ProfileScreen = () => (
    <div className="bg-gray-50 min-h-screen">
      <HeaderComponent title="Meu Perfil" showBack={true} />
      
      <div className="p-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 mb-4">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              JD
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">João Doe</h2>
              <p className="text-gray-600">Estudante UFFS</p>
              <div className="flex items-center mt-1">
                <Star className="text-yellow-400 mr-1" size={16} fill="currentColor" />
                <span className="text-sm text-gray-600">4.8 (23 avaliações)</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xl font-bold text-purple-600">15</div>
              <div className="text-sm text-gray-600">Produtos</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xl font-bold text-green-600">R$ 1.250</div>
              <div className="text-sm text-gray-600">Vendas</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xl font-bold text-blue-600">89</div>
              <div className="text-sm text-gray-600">Seguidores</div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendas Hoje</p>
                <p className="text-xl font-bold text-green-600">R$ 125</p>
              </div>
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Visualizações</p>
                <p className="text-xl font-bold text-blue-600">432</p>
              </div>
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        {/* Menu Options */}
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <Package className="text-gray-400 mr-3" size={20} />
              <span>Meus Produtos</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
          
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="text-gray-400 mr-3" size={20} />
              <span>Histórico de Vendas</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
          
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="text-gray-400 mr-3" size={20} />
              <span>Relatórios Financeiros</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <User className="text-gray-400 mr-3" size={20} />
              <span>Configurações</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </div>
      </div>
      
      <NavigationBar />
    </div>
  );

  // SearchScreen removido

  // Cart Page
  const CartScreen = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const removeFromCart = (id: number) => {
      setCart(prev => prev.filter(item => item.id !== id));
    };
    return (
      <div className="bg-gray-50 min-h-screen">
        <HeaderComponent title="Carrinho" showBack={true} />
        <div className="p-4">
          {cart.length === 0 ? (
            <div className="text-gray-500 text-center py-16">Seu carrinho está vazio.</div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4">Produtos no Carrinho</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 flex items-center justify-between shadow">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.image}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.seller}</div>
                        <div className="text-xs text-gray-400">{item.location}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-purple-600 font-bold">R$ {item.price.toFixed(2)}</span>
                      <button
                        className="text-xs text-red-500 mt-2 hover:underline"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-700">Total</span>
                <span className="text-xl font-bold text-purple-600">R$ {total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium text-lg">Finalizar Compra</button>
            </>
          )}
        </div>
        <NavigationBar />
      </div>
    );
  };

  const renderScreen = () => {
    switch(currentScreen) {
      case 'home':
        return <HomeScreen />;
      // case 'search':
      //   return <SearchScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'cart':
        return <CartScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative pb-24">
      {renderScreen()}
      <NavigationBar />
    </div>
  );
};

export default UnihubApp;