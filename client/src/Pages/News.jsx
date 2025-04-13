import React, { useEffect, useState } from 'react'
import axiosInstance from '../services'
import { FiExternalLink, FiClock, FiAward, FiCalendar } from 'react-icons/fi'
import { FaGoogle, FaMicrosoft, FaAmazon, FaApple } from 'react-icons/fa'

function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axiosInstance.get('news/get-all');
                setNews(response.data.news);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    const getCompanyIcon = (company) => {
        switch(company.toLowerCase()) {
            case 'google': return <FaGoogle className="text-red-500" />;
            case 'microsoft': return <FaMicrosoft className="text-blue-500" />;
            case 'amazon': return <FaAmazon className="text-yellow-500" />;
            case 'apple': return <FaApple className="text-gray-500" />;
            default: return <FiAward className="text-[#FF6D52]" />;
        }
    }
console.log(news)
    const filteredNews = activeTab === 'all' 
        ? news 
        : news.filter(item => item.type === activeTab);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#0f2d46] pt-[80px] pb-12 px-4 sm:px-6 lg:px-8">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full bg-[#FF6D52] opacity-10"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] to-[#FF9E7D] mb-4">
                        Career Opportunities
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover the latest job openings, internships, and placement news from top companies
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {['all', 'FTE', 'Both', 'Internship'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeTab === tab
                                    ? 'bg-[#FF6D52] text-white shadow-lg'
                                    : 'bg-[#112240] text-gray-300 hover:bg-[#1e2a3a]'
                            }`}
                        >
                            {tab === 'all' ? 'All Opportunities' : tab}
                        </button>
                    ))}
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6D52]"></div>
                    </div>
                )}

                {/* News Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredNews.map((item) => (
                        <div 
                            key={item._id}
                            className="bg-[#112240] bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden border border-[#1e2a3a] hover:border-[#FF6D52] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6D52]/20 transform hover:-translate-y-1"
                        >
                            {/* Card Header */}
                            <div className="p-6 pb-0">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">
                                            {getCompanyIcon(item.company)}
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">{item.company}</h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        item.type === 'FTE' 
                                            ? 'bg-green-900 text-green-300'
                                            : item.type === 'Intern' 
                                                ? 'bg-blue-900 text-blue-300'
                                                : 'bg-purple-900 text-purple-300'
                                    }`}>
                                        {item.type}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
                                
                                <div className="flex items-center text-gray-400 text-sm mb-4">
                                    <FiCalendar className="mr-1" />
                                    <span>Posted: {formatDate(item.postedOn)}</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 pt-0">
                                <p className="text-gray-300 mb-4">{item.description}</p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-[#0a192f] p-3 rounded-lg">
                                        <p className="text-gray-400 text-xs">Batch</p>
                                        <p className="text-white font-medium">{item.batch}</p>
                                    </div>
                                    <div className="bg-[#0a192f] p-3 rounded-lg">
                                        <p className="text-gray-400 text-xs">Min CGPA</p>
                                        <p className="text-white font-medium">{item.CGPA}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-400">
                                        <FiClock className="mr-1" />
                                        <span>Deadline: {formatDate(item.deadline)}</span>
                                    </div>
                                    <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center px-4 py-2 bg-[#FF6D52] text-white rounded-lg hover:bg-[#e04323] transition duration-300"
                                    >
                                        <span>Apply</span>
                                        <FiExternalLink className="ml-2" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {!loading && filteredNews.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-[#112240] rounded-full flex items-center justify-center mb-4">
                            <FiAward className="text-4xl text-[#FF6D52]" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No opportunities found</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            {activeTab === 'all' 
                                ? "There are currently no opportunities available." 
                                : `There are no ${activeTab} opportunities at the moment.`}
                        </p>
                    </div>
                )}
            </div>

            {/* Global styles for animations */}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                    100% { transform: translateY(0) translateX(0); }
                }
            `}</style>
        </div>
    )
}

export default News