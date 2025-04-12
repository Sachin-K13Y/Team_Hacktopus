import React, { useState, useEffect } from "react";

import { 
  FiPlus, 
  FiX, 
  FiThumbsUp, 
  FiUser,

  FiBriefcase, 
  FiClock,
  FiAward,
  FiBarChart2,
  FiTrendingUp,
  FiChevronDown,
  FiChevronUp,
  FiArrowUp,
  FiBookmark,
  FiShare2,
  FiArrowRight ,
  FiMessageSquare
} from "react-icons/fi";
import { 
  FaUserSecret, 
  FaRegGem,
  FaRegStar,
  FaStar,
  FaRegLightbulb,

  FaChartLine,
  FaLaptopCode,
  FaUserTie,
  FaGraduationCap,
  FaFire
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axiosInstance from "../services";

function Experience() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    description: "",
    anonymous: false,
    difficulty: "medium",
    offerStatus: "accepted",
    tags: []
  });
  const [experiences, setExperiences] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Available tags for suggestions


  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/experience/find-all-experiences");
      setExperiences(response.data.experiences);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/experience/add-experience", formData);
      setExperiences([response.data.experience, ...experiences]);
      setFormData({ 
        name: "", 
        company: "", 
        description: "", 
        anonymous: false,
        difficulty: "medium",
        offerStatus: "accepted",
        tags: []
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpvote = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await axiosInstance.post(`/experience/add-upvote/${id}`);
      setExperiences(
        experiences.map((exp) => (exp._id === id ? response.data.experience : exp))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const toggleExpandExperience = (id) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'text-emerald-400';
      case 'medium': return 'text-amber-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getOfferStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'text-emerald-400';
      case 'rejected': return 'text-red-400';
      case 'waiting': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };





  const filteredExperiences = experiences
    .filter(exp => {
      if (filter === "all") return true;
      if (filter === "anonymous") return exp.anonymous;
      if (filter === "recent") return new Date(exp.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "upvotes") return b.upvotes.length - a.upvotes.length;
      return 0;
    });

  const stats = {
    totalExperiences: experiences.length,
    totalUpvotes: experiences.reduce((acc, exp) => acc + exp.upvotes.length, 0),
    anonymousCount: experiences.filter(exp => exp.anonymous).length,
    topCompany: experiences.length > 0 
      ? [...new Set(experiences.map(exp => exp.company))]
        .map(company => ({
          name: company,
          count: experiences.filter(exp => exp.company === company).length
        }))
        .sort((a, b) => b.count - a.count)[0]?.name 
      : "None",
    
  };

  // Extract all unique companies for filtering
  const allCompanies = [...new Set(experiences.map(exp => exp.company))];

  return (
    <section className="min-h-screen mt-[60px] bg-gradient-to-br from-[#082032] via-[#0a1a3a] to-[#0a142f] py-12 px-4 sm:px-6 text-gray-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            transition: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FF6D52]/10 filter blur-[100px]"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-[#0f2d46]/10 filter blur-[120px]"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] via-[#FF8D52] to-[#FF9E52] animate-gradient">
              <Typewriter
                words={['Share Your Placement Journey', 'Inspire Your Peers', 'Build Community Knowledge']}
                loop={true}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Contribute to our growing repository of interview experiences and help thousands of students prepare better
          </p>
          
          {/* Stats Cards with Enhanced Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <motion.div 
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-[#1e293b]/80 backdrop-blur-sm border border-[#334155] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-3 bg-[#FF6D52]/10 rounded-xl mr-4">
                  <FiBriefcase className="text-2xl text-[#FF6D52]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Experiences</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalExperiences}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-[#1e293b]/80 backdrop-blur-sm border border-[#334155] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-3 bg-[#FF8D52]/10 rounded-xl mr-4">
                  <FiThumbsUp className="text-2xl text-[#FF8D52]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Upvotes</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalUpvotes}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-[#1e293b]/80 backdrop-blur-sm border border-[#334155] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-3 bg-[#FF6D52]/10 rounded-xl mr-4">
                  <FaUserSecret className="text-2xl text-[#FF6D52]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Anonymous</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.anonymousCount}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-[#1e293b]/80 backdrop-blur-sm border border-[#334155] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-3 bg-[#FF9E52]/10 rounded-xl mr-4">
                  <FaRegGem className="text-2xl text-[#FF9E52]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Top Company</p>
                  <p className="text-2xl font-bold text-white mt-1 truncate">{stats.topCompany}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Add Experience Button with Enhanced Animation */}
        <div className="max-w-3xl mx-auto mb-12 flex justify-center">
          <motion.button
            onClick={toggleFormVisibility}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 109, 82, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-center px-10 py-4 rounded-xl font-semibold transition-all duration-300 ${
              isFormVisible 
                ? 'bg-[#334155] hover:bg-[#3e4a61] text-gray-300 shadow-inner' 
                : 'bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] hover:from-[#FF6D52] hover:to-[#FF6D52] shadow-lg text-white'
            }`}
          >
            {isFormVisible ? (
              <>
                <FiX className="mr-3 text-xl" /> Cancel Submission
              </>
            ) : (
              <>
                <FiPlus className="mr-3 text-xl" /> Share Your Experience
              </>
            )}
          </motion.button>
        </div>

        {/* Experience Form with Enhanced Design */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto mb-16 overflow-hidden"
            >
              <div className="bg-[#1e293b]/90 backdrop-blur-sm border border-[#334155] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="p-3 bg-[#FF6D52]/10 rounded-xl mr-4">
                    <FiBriefcase className="text-2xl text-[#FF6D52]" />
                  </div>
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#FF6D52] to-[#FF9E52] bg-clip-text text-transparent">
                    Share Your Valuable Experience
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                        <FiUser className="mr-2 text-[#FF6D52]" /> Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-[#0f172a] border border-[#334155] focus:border-[#FF6D52] focus:ring-2 focus:ring-[#FF6D52]/30 focus:outline-none transition-all"
                        placeholder="Enter your name"
                        required={!formData.anonymous}
                        disabled={formData.anonymous}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                        <FiBriefcase className="mr-2 text-[#FF6D52]" /> Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-[#0f172a] border border-[#334155] focus:border-[#FF6D52] focus:ring-2 focus:ring-[#FF6D52]/30 focus:outline-none transition-all"
                        placeholder="Company you interviewed with"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                        <FiTrendingUp className="mr-2 text-[#FF6D52]" /> Interview Difficulty
                      </label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-[#0f172a] border border-[#334155] focus:border-[#FF6D52] focus:ring-2 focus:ring-[#FF6D52]/30 focus:outline-none transition-all"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                        <FiAward className="mr-2 text-[#FF6D52]" /> Offer Status
                      </label>
                      <select
                        name="offerStatus"
                        value={formData.offerStatus}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-[#0f172a] border border-[#334155] focus:border-[#FF6D52] focus:ring-2 focus:ring-[#FF6D52]/30 focus:outline-none transition-all"
                      >
                        <option value="accepted">Offer Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="waiting">Waiting</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <FaRegLightbulb className="mr-2 text-[#FF6D52]" /> Your Experience
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-4 rounded-xl bg-[#0f172a] border border-[#334155] focus:border-[#FF6D52] focus:ring-2 focus:ring-[#FF6D52]/30 focus:outline-none transition-all"
                      rows="8"
                      placeholder="Describe your interview process in detail. You can use Markdown formatting:\n\n- **Preparation strategy**\n- Questions asked\n- Technical rounds details\n- HR rounds experience\n- Tips for future candidates"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">Supports Markdown formatting</p>
                  </div>
                  
             
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#334155]">
                    <label className="flex items-center space-x-3 text-sm text-gray-300 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="anonymous"
                          checked={formData.anonymous}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          formData.anonymous ? 'bg-[#FF6D52] border-[#FF6D52]' : 'bg-[#0f172a] border-[#334155]'
                        }`}>
                          {formData.anonymous && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="flex items-center">
                        <FaUserSecret className="mr-2 text-[#FF6D52]" /> Post anonymously
                      </span>
                    </label>
                    
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center shadow-lg hover:shadow-[#FF6D52]/40 group"
                    >
                      <span>Submit Experience</span>
                      <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Experiences Section with Enhanced Filtering */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] to-[#FF9E52]">
                Community Experiences
              </span>
            </h2>
            
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            
              
              <div className="flex gap-2">

                

                
                <button
                  onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                  className="px-3 py-2.5 bg-[#0f172a] border border-[#334155] rounded-xl hover:bg-[#1e293b] transition-colors"
                >
                  {viewMode === 'list' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Expanded Filters Panel */}

          {/* Active Filters Display */}

          
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center mb-6"
              >
                <div className="w-16 h-16 border-4 border-[#FF6D52] border-t-transparent rounded-full"></div>
              </motion.div>
              <p className="text-gray-400 text-lg">Loading experiences...</p>
              <p className="text-gray-500 mt-2">Fetching the latest shared experiences</p>
            </div>
          ) : filteredExperiences.length > 0 ? (
            viewMode === 'list' ? (
              <div className="space-y-6">
                {filteredExperiences.map((exp) => (
                  <motion.div
                    key={exp._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#1e293b]/80 backdrop-blur-sm border border-[#334155] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#FF6D52]/10 transition-all duration-300 group"
                    onClick={() => toggleExpandExperience(exp._id)}
                  >
                    <div className="p-6 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-[#FF6D52] transition-colors duration-300 flex items-center">
                            {exp.company}
                            {exp.upvotes.length > 10 && (
                              <span className="ml-3 px-2 py-1 text-xs bg-[#FF6D52]/10 text-[#FF6D52] rounded-full flex items-center">
                                <FaStar className="mr-1 text-yellow-400" /> Top Rated
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-4 mt-3">
                            <span className={`text-sm flex items-center ${getDifficultyColor(exp.difficulty || 'medium')}`}>
                              <FiBarChart2 className="mr-1.5" />
                              {exp.difficulty ? exp.difficulty.charAt(0).toUpperCase() + exp.difficulty.slice(1) : 'Medium'} Difficulty
                            </span>
                            <span className={`text-sm flex items-center ${getOfferStatusColor(exp.offerStatus || 'accepted')}`}>
                              <FiAward className="mr-1.5" />
                              {exp.offerStatus ? 
                                exp.offerStatus.charAt(0).toUpperCase() + exp.offerStatus.slice(1) : 
                                'Accepted'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={(e) => handleUpvote(exp._id, e)}
                            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg ${
                              exp.upvotes.length > 0 
                                ? 'bg-[#FF6D52]/10 text-[#FF6D52]' 
                                : 'bg-[#1e293b] text-gray-400'
                            } hover:bg-[#FF6D52]/20 transition-colors group/upvote`}
                          >
                            <FiThumbsUp className="group-hover/upvote:animate-bounce" />
                            <span>{exp.upvotes.length}</span>
                          </button>
                          
                          <button className="text-gray-400 hover:text-white transition-colors">
                            {expandedExperience === exp._id ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedExperience === exp._id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                          >
                            <div className="pt-6 border-t border-[#334155]">
                              <div className="prose prose-invert max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {exp.description}
                                </ReactMarkdown>
                              </div>
                              
                              {(exp.description.toLowerCase().includes('leetcode') || 
                                exp.description.toLowerCase().includes('dsa') || 
                                exp.description.toLowerCase().includes('system design')) && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                  {exp.description.toLowerCase().includes('leetcode') && (
                                    <span className="px-3 py-1 bg-[#f59e0b]/10 text-[#f59e0b] rounded-full text-sm flex items-center">
                                      <FaLaptopCode className="mr-1.5" /> LeetCode
                                    </span>
                                  )}
                                  {exp.description.toLowerCase().includes('dsa') && (
                                    <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-sm flex items-center">
                                      <FaChartLine className="mr-1.5" /> Data Structures
                                    </span>
                                  )}
                                  {exp.description.toLowerCase().includes('system design') && (
                                    <span className="px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm flex items-center">
                                      <FiBriefcase className="mr-1.5" /> System Design
                                    </span>
                                  )}
                                </div>
                              )}
                              
                              <div className="mt-8 flex justify-between items-center">
                                <div className="flex items-center text-sm text-gray-400">
                                  {exp.anonymous ? (
                                    <>
                                      <FaUserSecret className="mr-2.5 text-[#f472b6]" />
                                      <span>Anonymous Contributor</span>
                                    </>
                                  ) : (
                                    <>
                                      <FiUser className="mr-2.5 text-[#FF6D52]" />
                                      <span className="font-medium">{exp.name}</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center space-x-4">
                                  <button className="flex items-center text-sm text-gray-400 hover:text-[#FF6D52] transition-colors">
                                    <FiBookmark className="mr-1.5" /> Save
                                  </button>
                                  <button className="flex items-center text-sm text-gray-400 hover:text-[#FF6D52] transition-colors">
                                    <FiShare2 className="mr-1.5" /> Share
                                  </button>
                                  <button className="flex items-center text-sm text-gray-400 hover:text-[#FF6D52] transition-colors">
                                    <FiMessageSquare className="mr-1.5" /> Comment
                                  </button>
                                  <div className="text-xs text-gray-500 flex items-center">
                                    <FiClock className="mr-1.5" />
                                    {formatDate(exp.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExperiences.map((exp) => (
                  <motion.div
                    key={exp._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#1e293b]/80 backdrop-blur-sm border border-[#334155] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#FF6D52]/10 transition-all duration-300 group"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#FF6D52] transition-colors duration-300">
                          {exp.company}
                        </h3>
                        {exp.upvotes.length > 0 && (
                          <button
                            onClick={(e) => handleUpvote(exp._id, e)}
                            className="flex items-center space-x-1 px-2.5 py-1.5 bg-[#FF6D52]/10 text-[#FF6D52] rounded-lg hover:bg-[#FF6D52]/20 transition-colors"
                          >
                            <FiThumbsUp />
                            <span className="text-sm">{exp.upvotes.length}</span>
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        <span className={`text-xs flex items-center ${getDifficultyColor(exp.difficulty || 'medium')}`}>
                          <FiBarChart2 className="mr-1" />
                          {exp.difficulty ? exp.difficulty.charAt(0).toUpperCase() + exp.difficulty.slice(1) : 'Medium'}
                        </span>
                        <span className={`text-xs flex items-center ${getOfferStatusColor(exp.offerStatus || 'accepted')}`}>
                          <FiAward className="mr-1" />
                          {exp.offerStatus ? 
                            exp.offerStatus.charAt(0).toUpperCase() + exp.offerStatus.slice(1) : 
                            'Accepted'}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {exp.description.substring(0, 150)}{exp.description.length > 150 ? '...' : ''}
                      </p>
                      
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#334155]">
                        <div className="flex items-center text-xs text-gray-400">
                          {exp.anonymous ? (
                            <FaUserSecret className="text-[#f472b6]" />
                          ) : (
                            <FiUser className="text-[#FF6D52]" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(exp.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-[#1e293b]/30 rounded-xl border-2 border-dashed border-[#334155]"
            >
              <div className="inline-flex p-5 bg-[#FF6D52]/10 rounded-full mb-5">
                <FiBriefcase className="text-4xl text-[#FF6D52]" />
              </div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">No experiences found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery 
                  ? "No experiences match your search. Try different keywords."
                  : filter === "recent"
                    ? "No recent experiences shared yet. Be the first!"
                    : "The community hasn't shared any experiences yet. Be the pioneer!"}
              </p>
              <div className="mt-6">
                <button
                  onClick={toggleFormVisibility}
                  className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <FiPlus className="mr-2" /> Share Your Experience
                </button>
              </div>
            </motion.div>
          )}
          

        </div>
      </div>
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 space-y-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFormVisibility}
          className="w-16 h-16 bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl hover:shadow-[#FF6D52]/40 transition-all"
        >
          <FiPlus className="text-2xl" />
        </motion.button>
        
        {filteredExperiences.length > 5 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-[#1e293b] border border-[#334155] rounded-full shadow-lg flex items-center justify-center text-gray-300 hover:text-[#FF6D52] hover:border-[#FF6D52] transition-all"
          >
            <FiArrowUp className="text-xl" />
          </motion.button>
        )}
      </div>
    </section>
  );
}

export default Experience;