import React, { useState, useEffect } from "react";
import axiosInstance from "../services";
import { 
  FiMessageSquare, 
  FiChevronUp, 
  FiPlus, 
  FiX, 
  FiSend,
  FiHeart,
  FiClock,
  FiChevronDown,
  FiArrowUp
} from "react-icons/fi";
import { 
  FaUserCircle,
  FaRegStar,
  FaRegLightbulb,
  FaRegGem,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from "react-toastify";

function DoubtForum() {
  const [formData, setFormData] = useState({
    question: "",
    tags: []
  });
  const [answerData, setAnswerData] = useState({
    answer: ""
  });
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedDoubtId, setSelectedDoubtId] = useState(null);
  const [expandedDoubt, setExpandedDoubt] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/doubts/find-all-Doubts");
      setDoubts(response.data?.doubts || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch doubts");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setAnswerData({ ...answerData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/doubts/add-doubt', {
        question: formData.question,

      });
      console.log(response.data);
      if(response.data.success){
        toast.success("Question Asked Successfully");
      }
      if (response.data?.doubt) {
        setDoubts([response.data.doubt, ...doubts]);
        setFormData({ question: "", tags: [] });
        setIsFormVisible(false);
        setError("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in asking question ")
      setError("Failed to post doubt");
    }
  };

  const handleAnswerSubmit = async (e, doubtId) => {
    e.preventDefault();
    if (!doubtId) return;
    
    try {
      const response = await axiosInstance.post(`/doubts/add-answer/${doubtId}`, {
        answeredText: answerData.answer,
      });
      if (response.data?.doubt) {
        setDoubts(
          doubts.map((doubt) =>
            doubt?._id === doubtId ? response.data.doubt : doubt
          )
        );
        console.log(response.data);
        if(response.data.success){
          toast.success("Answer Added Successfully")
        }
        setAnswerData({ answer: "" });
        setSelectedDoubtId(null);
        setError("");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to post answer");
    }
  };

  const handleUpvote = async (id, e) => {
    e.stopPropagation();
    if (!id) return;
    
    try {
      const response = await axiosInstance.post(`/doubts/add-upvote/${id}`);
      console.log(response.data);
      if(response.data.success){
        toast.success("Upvote Successfull");
      }
      if (response.data?.doubt) {
        setDoubts(
          doubts.map((doubt) => (doubt?._id === id ? response.data.doubt : doubt))
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('Upvote Failed')
      setError("Failed to upvote doubt");
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setError("");
  };

  const toggleAnswerWindow = (doubtId) => {
    if (!doubtId) return;
    setSelectedDoubtId(selectedDoubtId === doubtId ? null : doubtId);
    setAnswerData({ answer: "" });
    setExpandedDoubt(expandedDoubt === doubtId ? null : doubtId);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredDoubts = doubts
    .filter(doubt => doubt)
  
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "upvotes") return (b.upvote?.length || 0) - (a.upvote?.length || 0);
      return 0;
    });

  const stats = {
    totalDoubts: doubts.filter(doubt => doubt).length,
    totalAnswers: doubts.reduce((acc, doubt) => acc + (doubt?.answers?.length || 0), 0),
    totalUpvotes: doubts.reduce((acc, doubt) => acc + (doubt?.upvote?.length || 0), 0),
    unansweredCount: doubts.filter(doubt => (doubt?.answers?.length || 0) === 0).length,
  };

  return (
    <section className="min-h-screen mt-[60px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 text-gray-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            transition: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-500/10 filter blur-[100px]"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-pink-500/10 filter blur-[120px]"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <FiMessageSquare className="text-5xl text-indigo-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">
                <Typewriter
                  words={['Doubt Forum', 'Knowledge Hub', 'Community Discussions']}
                  loop={true}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ask questions, share knowledge, and collaborate with peers to solve placement-related doubts
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <motion.div 
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-3 bg-indigo-500/10 rounded-xl mr-4">
                  <FiMessageSquare className="text-2xl text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Questions</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalDoubts}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-3 bg-purple-500/10 rounded-xl mr-4">
                  <FaRegLightbulb className="text-2xl text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Answers</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalAnswers}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-3 bg-pink-500/10 rounded-xl mr-4">
                  <FiHeart className="text-2xl text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Upvotes</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalUpvotes}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="p-3 bg-indigo-500/10 rounded-xl mr-4">
                  <FaRegGem className="text-2xl text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Unanswered</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.unansweredCount}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-12 flex justify-center">
          <motion.button
            onClick={toggleFormVisibility}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-center px-10 py-4 rounded-xl font-semibold transition-all duration-300 ${
              isFormVisible 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 shadow-inner' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg text-white'
            }`}
          >
            {isFormVisible ? (
              <>
                <FiX className="mr-3 text-xl" /> Cancel
              </>
            ) : (
              <>
                <FiPlus className="mr-3 text-xl" /> Ask a Question
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto mb-16 overflow-hidden"
            >
              <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="p-3 bg-indigo-500/10 rounded-xl mr-4">
                    <FiMessageSquare className="text-2xl text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Post Your Question
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <FaRegLightbulb className="mr-2 text-indigo-400" /> Your Question
                    </label>
                    <textarea
                      name="question"
                      value={formData.question}
                      onChange={handleChange}
                      className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition-all"
                      placeholder="Be specific and clear for better answers. You can use Markdown formatting..."
                      rows="5"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Tags (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag, index) => (
                        <span key={index} className="flex items-center px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                tags: formData.tags.filter((_, i) => i !== index)
                              });
                            }}
                            className="ml-2 text-indigo-300 hover:text-white"
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="flex-1 p-3 rounded-l-xl bg-gray-900/50 border border-gray-700 focus:border-indigo-500 focus:outline-none"
                        placeholder="Add tags (e.g. javascript, react)"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 bg-indigo-600 text-white rounded-r-xl hover:bg-indigo-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t border-gray-700">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center shadow-lg hover:shadow-indigo-500/40 group"
                    >
                      <span>Post Question</span>
                      <FiSend className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-8 bg-red-900/50 border border-red-700 text-red-100 px-6 py-4 rounded-xl"
          >
            {error}
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Community Questions
              </span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Search questions..."
                />
                <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <span>Filters</span>
                  {isFiltersOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                </button>
                
                <div className="flex">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 rounded-l-xl border border-gray-700 ${viewMode === "list" ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 rounded-r-xl border border-gray-700 ${viewMode === "grid" ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    Grid
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Filter by</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setFilter("all")}
                          className={`px-4 py-2 rounded-xl text-sm ${filter === "all" ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          All Questions
                        </button>
                        <button
                          onClick={() => setFilter("popular")}
                          className={`px-4 py-2 rounded-xl text-sm ${filter === "popular" ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          Popular
                        </button>
                        <button
                          onClick={() => setFilter("unanswered")}
                          className={`px-4 py-2 rounded-xl text-sm ${filter === "unanswered" ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          Unanswered
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Sort by</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSortBy("newest")}
                          className={`px-4 py-2 rounded-xl text-sm ${sortBy === "newest" ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          Newest
                        </button>
                        <button
                          onClick={() => setSortBy("oldest")}
                          className={`px-4 py-2 rounded-xl text-sm ${sortBy === "oldest" ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          Oldest
                        </button>
                        <button
                          onClick={() => setSortBy("upvotes")}
                          className={`px-4 py-2 rounded-xl text-sm ${sortBy === "upvotes" ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          Most Upvotes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {loading ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center mb-6"
              >
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
              </motion.div>
              <p className="text-gray-400 text-lg">Loading questions...</p>
              <p className="text-gray-500 mt-2">Fetching the latest discussions</p>
            </div>
          ) : filteredDoubts.length > 0 ? (
            viewMode === 'list' ? (
              <div className="space-y-6">
                {filteredDoubts.map((doubt) => (
                  <motion.div
                    key={doubt?._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleAnswerWindow(doubt?._id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white">
                            {doubt?.question}
                          </h3>
                          
                          {doubt?.tags && doubt.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {doubt.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center mt-3 space-x-4">
                            <div className="flex items-center text-sm text-gray-400">
                              <FaUserCircle className="mr-2 text-indigo-400" />
                              <span>{doubt?.askedBy?.name || 'Anonymous'}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                              <FiClock className="mr-1.5" />
                              <span>{formatDate(doubt?.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 ml-4">
                          <button
                            onClick={(e) => handleUpvote(doubt?._id, e)}
                            className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl ${doubt?.upvote?.length > 0
                              ? 'bg-indigo-500/10 text-indigo-400'
                              : 'bg-gray-700 text-gray-400'
                            } hover:bg-indigo-500/20 transition-colors group/upvote`}
                          >
                            <FiChevronUp className="text-lg group-hover/upvote:animate-bounce" />
                            <span className="text-xs font-medium mt-1">{doubt?.upvote?.length || 0}</span>
                          </button>
                          
                          <button 
                            className="text-gray-400 hover:text-white transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAnswerWindow(doubt?._id);
                            }}
                          >
                            {expandedDoubt === doubt?._id ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={`border-t border-gray-700 transition-all duration-300 ${
                      expandedDoubt === doubt?._id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      {selectedDoubtId === doubt?._id && (
                        <div className="p-6 bg-gray-900/30">
                          <form onSubmit={(e) => handleAnswerSubmit(e, doubt?._id)} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Your Answer
                              </label>
                              <textarea
                                name="answer"
                                value={answerData.answer}
                                onChange={handleAnswerChange}
                                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition-all"
                                rows="4"
                                placeholder="Write your detailed answer here. You can use Markdown formatting..."
                                required
                              />
                            </div>
                            <div className="flex justify-end space-x-3">
                              <button
                                type="button"
                                onClick={() => toggleAnswerWindow(doubt?._id)}
                                className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center group"
                              >
                                <FiSend className="mr-2 transition-transform duration-300 group-hover:translate-x-1" /> 
                                Post Answer
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {doubt?.answers?.length > 0 && (
                        <div className="p-6 pt-0">
                          <h4 className="text-sm font-medium text-gray-400 mb-4 flex items-center">
                            <FiMessageSquare className="mr-2" /> Answers ({doubt.answers.length})
                          </h4>
                          <div className="space-y-5">
                            {doubt.answers.map((answer, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-5 bg-gray-900/30 rounded-xl border border-gray-700"
                              >
                                <div className="prose prose-invert max-w-none">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {answer?.answeredText || ''}
                                  </ReactMarkdown>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
                                  <div className="flex items-center text-sm text-gray-400">
                                    <FaUserCircle className="mr-2 text-indigo-400" />
                                    <span>{answer?.answeredBy?.name || 'Anonymous'}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {formatDate(answer?.answeredAt)}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoubts.map((doubt) => (
                  <motion.div
                    key={doubt?._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                        {doubt?.question}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <FaUserCircle className="mr-2 text-indigo-400" />
                          <span>{doubt?.askedBy?.name || 'Anonymous'}</span>
                        </div>
                        <button
                          onClick={(e) => handleUpvote(doubt?._id, e)}
                          className="flex items-center space-x-1 px-2.5 py-1 bg-gray-700 rounded-lg hover:bg-indigo-500/10 transition-colors"
                        >
                          <FiChevronUp className={`text-sm ${doubt?.upvote?.length > 0 ? 'text-indigo-400' : 'text-gray-400'}`} />
                          <span className="text-xs">{doubt?.upvote?.length || 0}</span>
                        </button>
                      </div>
                      
                      {doubt?.tags && doubt.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {doubt.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{doubt?.answers?.length || 0} answers</span>
                        <span>{formatDate(doubt?.createdAt)}</span>
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
              className="text-center py-16 bg-gray-800/30 rounded-xl border-2 border-dashed border-gray-700"
            >
              <div className="inline-flex p-5 bg-indigo-500/10 rounded-full mb-5">
                <FiMessageSquare className="text-4xl text-indigo-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">No questions found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery 
                  ? "No questions match your search. Try different keywords."
                  : filter === "unanswered"
                    ? "No unanswered questions right now!"
                    : "The community hasn't asked any questions yet. Be the first!"}
              </p>
              <div className="mt-6">
                <button
                  onClick={toggleFormVisibility}
                  className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <FiPlus className="mr-2" /> Ask a Question
                </button>
              </div>
            </motion.div>
          )}
          
          {filteredDoubts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex items-center space-x-2">
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors">
                  3
                </button>
                <span className="px-2 text-gray-400">...</span>
                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      
      <div className="fixed bottom-8 right-8 z-50 space-y-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFormVisibility}
          className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl hover:shadow-indigo-500/40 transition-all"
        >
          <FiPlus className="text-2xl" />
        </motion.button>
        
        {filteredDoubts.length > 5 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-300 hover:text-indigo-400 hover:border-indigo-400 transition-all"
          >
            <FiArrowUp className="text-xl" />
          </motion.button>
        )}
      </div>
    </section>
  );
}

export default DoubtForum;