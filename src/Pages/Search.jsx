import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CreatorCard from '@/components/cards/CreatorCard';
import { sampleInfluencers, categories } from '@/components/data/sampleInfluencers';

const SidebarFilters = ({
    className = "",
    selectedCategory,
    setSelectedCategory,
    platforms,
    selectedPlatform,
    setSelectedPlatform,
    priceRange,
    setPriceRange,
}) => (
    <div className={`space-y-6 ${className}`}>
        <div>
            <h3 className="font-semibold mb-3">Category</h3>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="cat-all"
                        name="category"
                        checked={selectedCategory === 'All'}
                        onChange={() => setSelectedCategory('All')}
                        className="text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="cat-all" className="text-sm text-gray-700">All Categories</label>
                </div>
                {categories.map(cat => (
                    <div key={cat} className="flex items-center gap-2">
                        <input
                            type="radio"
                            id={`cat-${cat}`}
                            name="category"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                            className="text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={`cat-${cat}`} className="text-sm text-gray-700">{cat}</label>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h3 className="font-semibold mb-3">Platform</h3>
            <div className="flex flex-wrap gap-2">
                {platforms.map(p => (
                    <button
                        key={p}
                        onClick={() => setSelectedPlatform(p)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selectedPlatform === p
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Price Range</h3>
                <span className="text-xs text-gray-500">₹{priceRange[0]} - ₹{priceRange[1]}+</span>
            </div>
            <Slider
                defaultValue={[0, 50000]}
                max={100000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-4"
            />
        </div>
    </div>
);

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [selectedPlatform, setSelectedPlatform] = useState('All');
    const creators = useMemo(() => {
        let filtered = sampleInfluencers;
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(c => c.category === selectedCategory);
        }
        if (selectedPlatform !== 'All') {
            filtered = filtered.filter(c => c.platform === selectedPlatform);
        }
        filtered = filtered.filter(c => {
            const price = parseInt(c.price.replace(/[^\d]/g, ''));
            return price >= priceRange[0] && price <= priceRange[1];
        });
        if (searchTerm) {
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [searchTerm, selectedCategory, priceRange, selectedPlatform]);

    const platforms = ['All', 'Instagram', 'YouTube', 'TikTok'];

    // derived state above

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-bold text-lg">Filters</h2>
                                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                            </div>
                            <SidebarFilters
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                platforms={platforms}
                                selectedPlatform={selectedPlatform}
                                setSelectedPlatform={setSelectedPlatform}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search Bar & Mobile Filter */}
                        <div className="flex gap-3 mb-6">
                            <div className="relative flex-1">
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search creators, categories, services..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="md:hidden h-full aspect-square rounded-xl p-0">
                                        <Filter className="w-5 h-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-8">
                                        <SidebarFilters
                                            selectedCategory={selectedCategory}
                                            setSelectedCategory={setSelectedCategory}
                                            platforms={platforms}
                                            selectedPlatform={selectedPlatform}
                                            setSelectedPlatform={setSelectedPlatform}
                                            priceRange={priceRange}
                                            setPriceRange={setPriceRange}
                                        />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Results */}
                        <div className="mb-4 text-sm text-gray-500 font-medium">
                            Showing {creators.length} creators
                        </div>

                        {creators.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {creators.map((creator) => (
                                    <CreatorCard key={creator.id} creator={creator} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                                <div className="text-gray-300 mb-4">
                                    <SearchIcon className="w-12 h-12 mx-auto" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No creators found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('All');
                                        setSelectedPlatform('All');
                                        setPriceRange([0, 50000]);
                                    }}
                                    className="text-purple-600 mt-2"
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
