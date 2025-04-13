import React, { useState, useEffect } from 'react';
import axiosInstance from '../services';
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX, FiUpload, FiCheck } from 'react-icons/fi';
import { FaGoogle, FaMicrosoft, FaAmazon, FaApple } from 'react-icons/fa';

const Admin = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        deadline: '',
        CGPA: '',
        description: '',
        type: 'FTE',
        link: '',
        eligibility: '',
        batch: '23-27',
        isActive: true
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axiosInstance.get('news/get-all');
            setNews(response.data.news);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'isActive' ? e.target.checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentNews) {
                await axiosInstance.put(`news/update/${currentNews._id}`, formData);
                setSuccessMessage('News updated successfully!');
            } else {
                await axiosInstance.post('news/add-news', formData);
                setSuccessMessage('News added successfully!');
            }
            resetForm();
            fetchNews();
        } catch (error) {
            console.error("Error saving news:", error);
        }
    };

    const handleEdit = (newsItem) => {
        setCurrentNews(newsItem);
        setFormData({
            company: newsItem.company,
            title: newsItem.title,
            deadline: newsItem.deadline.split('T')[0],
            CGPA: newsItem.CGPA,
            description: newsItem.description,
            type: newsItem.type,
            link: newsItem.link,
            eligibility: newsItem.eligibility.join(', '),
            batch: newsItem.batch,
            isActive: newsItem.isActive
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this news item?')) {
            try {
                await axiosInstance.delete(`news/delete/${id}`);
                setSuccessMessage('News deleted successfully!');
                fetchNews();
            } catch (error) {
                console.error("Error deleting news:", error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            company: '',
            title: '',
            deadline: '',
            CGPA: '',
            description: '',
            type: 'FTE',
            link: '',
            eligibility: '',
            batch: '23-27',
            isActive: true
        });
        setCurrentNews(null);
        setIsEditing(false);
        setPreviewImage(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getCompanyIcon = (company) => {
        switch(company.toLowerCase()) {
            case 'google': return <FaGoogle className="text-red-500 text-xl" />;
            case 'microsoft': return <FaMicrosoft className="text-blue-500 text-xl" />;
            case 'amazon': return <FaAmazon className="text-yellow-500 text-xl" />;
            case 'apple': return <FaApple className="text-gray-500 text-xl" />;
            default: return <span className="text-xl">🏢</span>;
        }
    };

    const filteredNews = news.filter(item => 
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#0f2d46] pt-[80px] pb-12 px-4 sm:px-6 lg:px-8">
            {/* Animated background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] to-[#FF9E7D] mb-2">
                            News Management
                        </h1>
                        <p className="text-gray-400">Add, edit, and manage career opportunity listings</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center px-4 py-2 bg-[#FF6D52] text-white rounded-lg hover:bg-[#e04323] transition duration-300"
                    >
                        {isEditing ? (
                            <>
                                <FiX className="mr-2" />
                                Cancel
                            </>
                        ) : (
                            <>
                                <FiPlus className="mr-2" />
                                Add New Opportunity
                            </>
                        )}
                    </button>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 p-3 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg text-green-300 text-sm flex items-center animate-fadeIn">
                        <FiCheck className="mr-2" />
                        {successMessage}
                        <button 
                            onClick={() => setSuccessMessage('')} 
                            className="ml-auto text-gray-400 hover:text-white"
                        >
                            <FiX />
                        </button>
                    </div>
                )}

                {/* Form */}
                {isEditing && (
                    <div className="bg-[#112240] bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden border border-[#1e2a3a] mb-8 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            {currentNews ? 'Edit Opportunity' : 'Add New Opportunity'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Deadline</label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Minimum CGPA</label>
                                    <input
                                        type="number"
                                        name="CGPA"
                                        value={formData.CGPA}
                                        onChange={handleInputChange}
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Opportunity Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                                    >
                                        <option value="FTE">Full Time</option>
                                        <option value="Intern">Internship</option>
                                        <option value="PPO">PPO</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Batch Eligibility</label>
                                    <input
                                        type="text"
                                        name="batch"
                                        value={formData.batch}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Eligibility Criteria</label>
                                    <input
                                        type="text"
                                        name="eligibility"
                                        value={formData.eligibility}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                                        placeholder="Separate with commas"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Application Link</label>
                                    <input
                                        type="url"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center md:col-span-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#FF6D52] bg-[#0a192f] border-[#1e2a3a] rounded focus:ring-[#FF6D52]"
                                />
                                <label htmlFor="isActive" className="ml-2 text-sm text-gray-300">
                                    Active Listing
                                </label>
                            </div>
                            <div className="md:col-span-2 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center px-4 py-2 bg-[#FF6D52] text-white rounded-lg hover:bg-[#e04323] transition duration-300"
                                >
                                    <FiSave className="mr-2" />
                                    {currentNews ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Search and Filter */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search opportunities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 rounded-lg bg-[#112240] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="px-4 py-2 bg-[#112240] text-gray-300 rounded-lg hover:bg-[#1e2a3a] transition duration-300"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* News Table */}
                <div className="bg-[#112240] bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden border border-[#1e2a3a]">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6D52]"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-[#1e2a3a]">
                                <thead className="bg-[#0a192f]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Company</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Deadline</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#112240] divide-y divide-[#1e2a3a]">
                                    {filteredNews.map((item) => (
                                        <tr key={item._id} className="hover:bg-[#0a192f] transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        {getCompanyIcon(item.company)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-white">{item.company}</div>
                                                        <div className="text-sm text-gray-400">{item.batch}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-white">{item.title}</div>
                                                <div className="text-sm text-gray-400 truncate max-w-xs">{item.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    item.type === 'FTE' 
                                                        ? 'bg-green-900 text-green-300'
                                                        : item.type === 'Intern' 
                                                            ? 'bg-blue-900 text-blue-300'
                                                            : 'bg-purple-900 text-purple-300'
                                                }`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {new Date(item.deadline).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    item.isActive ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                                                }`}>
                                                    {item.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-[#FF6D52] hover:text-[#e04323] mr-4"
                                                >
                                                    <FiEdit className="inline" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="text-red-400 hover:text-red-600"
                                                >
                                                    <FiTrash2 className="inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Empty state */}
                {!loading && filteredNews.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-[#112240] rounded-full flex items-center justify-center mb-4">
                            <FiPlus className="text-4xl text-[#FF6D52]" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No opportunities found</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            {searchTerm 
                                ? "No results match your search criteria." 
                                : "There are currently no opportunities listed."}
                        </p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 flex items-center mx-auto px-4 py-2 bg-[#FF6D52] text-white rounded-lg hover:bg-[#e04323] transition duration-300"
                        >
                            <FiPlus className="mr-2" />
                            Add New Opportunity
                        </button>
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
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Admin;