import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FiArrowRight, 
  FiTrendingUp, 
  FiAward, 
  FiMessageSquare, 
  FiUser,
  FiPlus,
  FiChevronRight,
  FiExternalLink,
  FiClock,
  FiHeart,
  FiEye,
  FiBarChart2
} from "react-icons/fi";
import { 
  FaFire, 
  FaComments,
  FaUserSecret, 
  FaRegStar, 
  FaStar,
  FaRegGem,
  FaRegLightbulb,
  FaChartLine,
  FaLaptopCode,
  FaUserTie,
  FaUserGraduate,
  FaTrophy
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import axiosInstance from "../services";

function Home() {
  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: false,
      mirror: true
    });
  }, []);

  const [experience, setExperience] = useState();
  const [ranking, setRanking] = useState();
  const [doubt, setDoubt] = useState();
  const [activeTab, setActiveTab] = useState('experiences');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoading, setIsLoading] = useState({
    experiences: true,
    rankings: true,
    doubts: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({...prev, experiences: true}));
        const expResponse = await axiosInstance.get('/experience/find-all-experiences');
        setExperience(expResponse.data.experiences);
        
        setIsLoading(prev => ({...prev, rankings: true}));
        const rankResponse = await axiosInstance.get('/ranking');
        setRanking(rankResponse.data.result);
        
        setIsLoading(prev => ({...prev, doubts: true}));
        const doubtResponse = await axiosInstance.get('/doubts/find-all-Doubts');
        setDoubt(doubtResponse.data.doubts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading({
          experiences: false,
          rankings: false,
          doubts: false
        });
      }
    };
    
    fetchData();
  }, []);

  // Stats data
  const stats = [
    { 
      value: experience?.length || 0, 
      label: "Experiences Shared", 
      icon: <FiTrendingUp className="text-2xl" />,
      color: "text-[#FF6D52]",
      bgColor: "bg-[#FF6D52]/10"
    },
    { 
      value: ranking?.length || 0, 
      label: "Students Ranked", 
      icon: <FiAward className="text-2xl" />,
      color: "text-[#FF9E52]",
      bgColor: "bg-[#FF9E52]/10"
    },
    { 
      value: doubt?.length || 0, 
      label: "Doubts Resolved", 
      icon: <FiMessageSquare className="text-2xl" />,
      color: "text-[#FF6D52]",
      bgColor: "bg-[#FF6D52]/10"
    }
  ];

  // Features data
  const features = [
    {
      title: "Real Experiences",
      description: "Learn from authentic placement experiences shared by your peers",
      icon: <FaUserTie className="text-3xl" />,
      color: "text-[#FF6D52]",
      bgColor: "bg-[#FF6D52]/10"
    },
    {
      title: "Competitive Rankings",
      description: "Track your progress against college peers in coding competitions",
      icon: <FaTrophy className="text-3xl" />,
      color: "text-[#FF9E52]",
      bgColor: "bg-[#FF9E52]/10"
    },
    {
      title: "Peer Discussions",
      description: "Get your doubts resolved by the community",
      icon: <FaComments className="text-3xl" />,
      color: "text-[#FF6D52]",
      bgColor: "bg-[#FF6D52]/10"
    },
    {
      title: "Anonymous Sharing",
      description: "Share your experiences without revealing your identity",
      icon: <FaUserSecret className="text-3xl" />,
      color: "text-[#FF9E52]",
      bgColor: "bg-[#FF9E52]/10"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "MargDarshan helped me crack my dream company interview with real experiences shared by seniors!",
      author: "User1",
      role: "Placed at XYZ",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The ranking system motivated me to practice more and improve my coding skills significantly.",
      author: "User 2",
      role: "Placed at XYZ",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "Got all my technical doubts resolved quickly through the discussion forum. Amazing community!",
      author: "User 3",
      role: "Placed at XYZ",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  return (
    <div className="bg-[#082032] min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#082032] to-[#0a142f] min-h-screen text-white py-16 px-6 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              transition: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FF6D52] filter blur-[100px]"
          ></motion.div>
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              transition: { duration: 25, repeat: Infinity, ease: "linear" }
            }}
            className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-[#0f2d46] filter blur-[120px]"
          ></motion.div>
        </div>

        <div className="text-center max-w-4xl relative z-10" data-aos="fade-up">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] via-[#FF8D52] to-[#FF9E52] animate-gradient">
              <Typewriter
                words={['Welcome to MargDarshan Hub', 'Your Placement Companion', 'College Success Platform']}
                loop={true}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Your exclusive platform for placement experiences, competitive rankings, and peer discussions - all tailored for your college community.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link
              to="/sign-up"
              className="relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6D52]/40 transition-all duration-500 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF8D52] to-[#FF6D52] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 flex items-center">
                Get Started
                <FiArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-500"></span>
            </Link>
            
            <Link
              to="/experience"
              className="relative inline-flex items-center justify-center px-10 py-4 bg-transparent text-[#FF6D52] font-semibold rounded-xl border-2 border-[#FF6D52] hover:bg-[#FF6D52]/10 transition-all duration-500 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Explore Experiences
                <FiExternalLink className="ml-3" />
              </span>
              <span className="absolute inset-0 bg-[#FF6D52]/5 group-hover:bg-transparent transition-all duration-500"></span>
            </Link>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className={`p-6 rounded-2xl backdrop-blur-sm border border-[#1e3a5a] hover:border-[#FF6D52]/50 transition-all duration-300 ${stat.bgColor} shadow-lg`}
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} ${stat.color} mb-6 mx-auto`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[#FF6D52] to-[#FF9E52] bg-clip-text text-transparent">
                {stat.value}+
              </h3>
              <p className="text-lg text-center text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scrolling down indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ 
            y: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1, delay: 1 }
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <FiChevronRight className="text-gray-400 transform rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#082032] to-[#0a1a3a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] to-[#FF9E52]">
                Why Choose MargDarshan?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to ace your placements, all in one platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-[#0f2d46]/60 backdrop-blur-sm border border-[#1e3a5a] rounded-2xl p-8 shadow-lg hover:shadow-xl hover:shadow-[#FF6D52]/10 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} ${feature.color} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Tabs Section */}
      <section className="py-20 px-6 bg-[#082032]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-[#0f2d46] rounded-xl p-1">
              {['experiences', 'rankings', 'discussions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'experiences' && <FaFire className="mr-2" />}
                  {tab === 'rankings' && <FaTrophy className="mr-2" />}
                  {tab === 'discussions' && <FaComments className="mr-2" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'experiences' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(isLoading.experiences ? Array(3).fill({}) : experience?.slice(0, 6)).map((exp, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -10 }}
                        onHoverStart={() => setHoveredCard(`exp-${index}`)}
                        onHoverEnd={() => setHoveredCard(null)}
                        className={`bg-[#0f2d46]/80 backdrop-blur-sm border border-[#1e3a5a] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                          hoveredCard === `exp-${index}` ? 'border-[#FF6D52]/50' : ''
                        }`}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        {isLoading.experiences ? (
                          <div className="p-6">
                            <div className="animate-pulse">
                              <div className="h-6 bg-[#1e3a5a] rounded mb-4 w-3/4"></div>
                              <div className="h-4 bg-[#1e3a5a] rounded mb-3"></div>
                              <div className="h-4 bg-[#1e3a5a] rounded mb-3 w-5/6"></div>
                              <div className="h-4 bg-[#1e3a5a] rounded mb-3 w-2/3"></div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-white group-hover:text-[#FF6D52] transition-colors duration-300">
                                  {exp.company}
                                </h3>
                                {!exp.anonymous && (
                                  <span className="flex items-center text-sm text-gray-400">
                                    <FiUser className="mr-1" /> {exp.name}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-300 mb-4 line-clamp-3">{exp.description}</p>
                              <div className="flex items-center justify-between mt-6">
                                <span className="text-xs text-gray-500 flex items-center">
                                  <FiClock className="mr-1" />
                                  {new Date(exp.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                                <Link
                                  to={`/experience/${exp._id}`}
                                  className="inline-flex items-center text-sm text-[#FF6D52] hover:text-[#FF8D52] font-medium transition-colors duration-300 group"
                                >
                                  <span>Read more</span>
                                  <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                              </div>
                            </div>
                            <div className="px-6 py-3 bg-[#0f2d46] border-t border-[#1e3a5a] flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <FiHeart className="text-gray-400" />
                                <span className="text-sm text-gray-400">{exp.upvotes?.length || 0} upvotes</span>
                              </div>
                              
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-12 text-center">
                    <Link
                      to="/experience"
                      className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6D52]/40 transition-all duration-500 group"
                    >
                      <span>View All Experiences</span>
                      <FiArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}
              
              {activeTab === 'rankings' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(isLoading.rankings ? Array(4).fill({}) : ranking?.slice(0, 6)).map((user, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="bg-[#0f2d46]/80 backdrop-blur-sm border border-[#1e3a5a] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        {isLoading.rankings ? (
                          <div className="animate-pulse">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-full bg-[#1e3a5a]"></div>
                              <div className="flex-1 space-y-3">
                                <div className="h-5 bg-[#1e3a5a] rounded w-3/4"></div>
                                <div className="h-4 bg-[#1e3a5a] rounded w-1/2"></div>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-[#1e3a5a]"></div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-4">
                            <img
                              src={user.avatar || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`}
                              alt={`${user.handle}'s avatar`}
                              className="w-16 h-16 rounded-full border-2 border-[#FF6D52] object-cover"
                            />
                            <div className="flex-1">
                              <h2 className="text-lg font-semibold text-[#FF6D52]">
                                {user.firstName} {user.lastName} <span className="text-gray-400">({user.handle})</span>
                              </h2>
                              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                <div className="flex items-center">
                                  <FiBarChart2 className="mr-1 text-gray-400" />
                                  <span className="text-gray-400">Rank:</span> <span className="ml-1 text-white">{user.rank}</span>
                                </div>
                                <div className="flex items-center">
                                  <FaChartLine className="mr-1 text-gray-400" />
                                  <span className="text-gray-400">Rating:</span> <span className="ml-1 text-white">{user.rating}</span>
                                </div>
                                <div className="flex items-center">
                                  <FaRegStar className="mr-1 text-gray-400" />
                                  <span className="text-gray-400">Max:</span> <span className="ml-1 text-white">{user.maxRating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#FF6D52] to-[#FF9E52] text-white text-lg font-bold rounded-full">
                                #{index + 1}
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-12 text-center">
                    <Link
                      to="/ranking"
                      className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6D52]/40 transition-all duration-500 group"
                    >
                      <span>View Full Rankings</span>
                      <FiArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}
              
              {activeTab === 'discussions' && (
                <div>
                  <div className="space-y-6">
                    {(isLoading.doubts ? Array(4).fill({}) : doubt?.slice(0, 4)).map((discuss, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="bg-[#0f2d46]/80 backdrop-blur-sm border border-[#1e3a5a] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        {isLoading.doubts ? (
                          <div className="animate-pulse">
                            <div className="h-6 bg-[#1e3a5a] rounded mb-4 w-3/4"></div>
                            <div className="flex justify-between">
                              <div className="h-4 bg-[#1e3a5a] rounded w-1/3"></div>
                              <div className="h-4 bg-[#1e3a5a] rounded w-20"></div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h4 className="text-lg font-semibold mb-2 text-white hover:text-[#FF6D52] transition-colors duration-300">
                              {discuss.question}
                            </h4>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-400">
                                <span className="flex items-center">
                                  <FiUser className="mr-1" />
                                  {discuss.askedBy.name} • {new Date(discuss.updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </p>
                              <Link
                                to={`/doubt-forum/${discuss._id}`}
                                className="text-sm text-[#FF6D52] hover:text-[#FF8D52] font-medium flex items-center transition-colors duration-300 group"
                              >
                                <span>Join discussion</span>
                                <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                              </Link>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-12 text-center">
                    <Link
                      to="/doubt-forum"
                      className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6D52]/40 transition-all duration-500 group"
                    >
                      <span>View All Discussions</span>
                      <FiArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0a1a3a] to-[#082032]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] to-[#FF9E52]">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from students who aced their placements with MargDarshan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-[#0f2d46]/80 backdrop-blur-sm border border-[#1e3a5a] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>
                <p className="text-lg italic text-gray-300 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full border-2 border-[#FF6D52] object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.author}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-[#082032] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FF6D52] filter blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-[#0f2d46] filter blur-[120px] animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10" data-aos="zoom-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] to-[#FF9E52]">
              Ready to Boost Your Placement Journey?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students who are already benefiting from MargDarshan Hub
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/sign-up"
              className="relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#FF6D52] to-[#FF8D52] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6D52]/40 transition-all duration-500 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get Started Now
                <FiArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF8D52] to-[#FF6D52] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Link>
          
          </div>
        </div>
      </section>


    
    </div>
  );
}

export default Home;