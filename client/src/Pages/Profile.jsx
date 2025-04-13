import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services";
import { FiLogOut, FiUser, FiMail, FiThumbsUp, FiAward, FiMessageSquare, FiShare2, FiChevronRight } from "react-icons/fi";
import { FaFire, FaChartLine, FaMedal, FaCode, FaUniversity } from "react-icons/fa";
import { RiSwordFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState(null);
  const [codeforcesData, setCodeForcesData] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [doubts, setDoubts] = useState([]);
  const [ranking, setRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalUser, setTotalUser] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/user/profile');
        const currentUser = response.data.user;
        setUser(currentUser);

        const rankingResponse = await axiosInstance.get('/ranking');
        const allUsers = rankingResponse.data.result;
        setTotalUser(allUsers);
        setCodeForcesData(allUsers);
        const sortedUsers = allUsers.sort((a, b) => b.rating - a.rating);

        const currentUserIndex = sortedUsers.findIndex(
          (user) => user.handle === currentUser.codeforces
        );

        setRanking(currentUserIndex + 1);

        const experienceResponse = await axiosInstance.get('/experience/find-all-experiences');
        const filteredExperiences = experienceResponse.data.experiences.filter((e) => (e.seniorId === currentUser._id))
        setExperiences(filteredExperiences);

        const doubtResponse = await axiosInstance.get('/doubts/find-all-Doubts');
        const filteredDoubts = doubtResponse.data.doubts.filter((e) => (e.askedBy._id === currentUser._id))
        setDoubts(filteredDoubts);

      } catch (error) {
        console.log(error)
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = async(req,res) => {
    const response = await axiosInstance.post('/user/logout');
    console.log(response.data);
    if(response.data.success){
      toast.success("Logout Successfull");
      if(response.data.success){
        navigate('/');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getRankColor = (rank) => {
    if (rank <= 3) return "text-yellow-400";
    if (rank <= 10) return "text-purple-400";
    if (rank <= 25) return "text-blue-400";
    return "text-gray-400";
  };

  const getMedalIcon = (rank) => {
    if (rank === 1) return <FaMedal className="text-yellow-400 text-2xl" />;
    if (rank === 2) return <FaMedal className="text-gray-300 text-2xl" />;
    if (rank === 3) return <FaMedal className="text-amber-600 text-2xl" />;
    return null;
  };

  return (
    <div className="bg-[#082032] mt-[60px] min-h-screen text-white">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-br from-[#0f2d46] to-[#082032] pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] to-[#FF9E52] mb-2">
                My Profile
              </h1>
              <p className="text-lg text-gray-400">Your journey, achievements, and contributions</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-[#FF6D52]/20 hover:bg-[#FF6D52]/30 text-[#FF6D52] rounded-lg transition-all duration-300 border border-[#FF6D52]/50 group"
            >
              <FiLogOut className="mr-2 group-hover:rotate-180 transition-transform duration-300" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-16">
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6D52] mb-4"></div>
            <p className="text-gray-400">Loading your profile...</p>
          </div>
        ) : user ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Card */}
              <div className="bg-[#0f2d46]/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6D52] to-[#FF9E52] flex items-center justify-center">
                      <FiUser className="text-3xl text-white" />
                    </div>
                    {ranking <= 3 && (
                      <div className="absolute -top-2 -right-2">
                        {getMedalIcon(ranking)}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                  <div className="mt-4 w-full">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                      <span>Member since</span>
                      <span className="text-white">{formatDate(user.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Codeforces</span>
                      <span className="text-white">{user.codeforces || "Not linked"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-[#0f2d46]/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-[#FF6D52] flex items-center">
                  <FaChartLine className="mr-2" /> Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaFire className="text-[#FF6D52] mr-2" />
                      <span className="text-gray-400">Questions Asked</span>
                    </div>
                    <span className="font-medium">{doubts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaUniversity className="text-[#FF6D52] mr-2" />
                      <span className="text-gray-400">College Rank</span>
                    </div>
                    <span className={`font-medium ${getRankColor(ranking)}`}>
                      #{ranking} of {totalUser.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <RiSwordFill className="text-[#FF6D52] mr-2" />
                      <span className="text-gray-400">Codeforces Rating</span>
                    </div>
                    <span className="font-medium">
                      {codeforcesData.find(u => u.handle === user.codeforces)?.rating || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Navigation Tabs */}
              <div className="bg-[#0f2d46]/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-all ${activeTab === "overview" ? "text-[#FF6D52] border-b-2 border-[#FF6D52]" : "text-gray-400 hover:text-white"}`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("experiences")}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-all ${activeTab === "experiences" ? "text-[#FF6D52] border-b-2 border-[#FF6D52]" : "text-gray-400 hover:text-white"}`}
                  >
                    Experiences
                  </button>
                  <button
                    onClick={() => setActiveTab("questions")}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-all ${activeTab === "questions" ? "text-[#FF6D52] border-b-2 border-[#FF6D52]" : "text-gray-400 hover:text-white"}`}
                  >
                    My Questions
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === "overview" && (
                  <>
                    {/* Achievements Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-[#0f2d46]/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg"
                    >
                      <h3 className="text-lg font-semibold mb-4 text-[#FF6D52] flex items-center">
                        <FiAward className="mr-2" /> Your Achievements
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#082032]/50 p-4 rounded-lg border border-gray-700 hover:border-[#FF6D52]/30 transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">College Rank</h4>
                              <p className="text-sm text-gray-400">Among coders</p>
                            </div>
                            <span className={`text-2xl font-bold ${getRankColor(ranking)}`}>
                              #{ranking}
                            </span>
                          </div>
                        </div>
                        <div className="bg-[#082032]/50 p-4 rounded-lg border border-gray-700 hover:border-[#FF6D52]/30 transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Questions Asked</h4>
                              <p className="text-sm text-gray-400">In doubt forum</p>
                            </div>
                            <span className="text-2xl font-bold text-[#FF6D52]">
                              {doubts.length}
                            </span>
                          </div>
                        </div>
                        <div className="bg-[#082032]/50 p-4 rounded-lg border border-gray-700 hover:border-[#FF6D52]/30 transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Experiences Shared</h4>
                              <p className="text-sm text-gray-400">Helping peers</p>
                            </div>
                            <span className="text-2xl font-bold text-[#FF6D52]">
                              {experiences.length}
                            </span>
                          </div>
                        </div>
                        <div className="bg-[#082032]/50 p-4 rounded-lg border border-gray-700 hover:border-[#FF6D52]/30 transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Codeforces Rating</h4>
                              <p className="text-sm text-gray-400">Current rating</p>
                            </div>
                            <span className="text-2xl font-bold text-[#FF6D52]">
                              {codeforcesData.find(u => u.handle === user.codeforces)?.rating || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-[#0f2d46]/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg"
                    >
                      <h3 className="text-lg font-semibold mb-4 text-[#FF6D52] flex items-center">
                        <FiMessageSquare className="mr-2" /> Recent Activity
                      </h3>
                      <div className="space-y-4">
                        {doubts.slice(0, 3).map((doubt, index) => (
                          <div key={index} className="p-4 bg-[#082032]/50 rounded-lg border border-gray-700 hover:border-[#FF6D52]/30 transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{doubt.question}</h4>
                                <p className="text-sm text-gray-400 mt-1">
                                  Asked on {formatDate(doubt.createdAt)}
                                </p>
                              </div>
                              <span className="bg-[#FF6D52]/10 text-[#FF6D52] text-xs px-2 py-1 rounded-full">
                                Question
                              </span>
                            </div>
                          </div>
                        ))}
                        {experiences.slice(0, 3).map((exp, index) => (
                          <div key={index} className="p-4 bg-[#082032]/50 rounded-lg border border-gray-700 hover:border-[#FF6D52]/30 transition-all">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{exp.company}</h4>
                                <p className="text-sm text-gray-400 mt-1">
                                  Shared on {formatDate(exp.createdAt)}
                                </p>
                              </div>
                              <span className="bg-[#FF6D52]/10 text-[#FF6D52] text-xs px-2 py-1 rounded-full">
                                Experience
                              </span>
                            </div>
                          </div>
                        ))}
                        {(doubts.length === 0 && experiences.length === 0) && (
                          <p className="text-center text-gray-500 py-4">No recent activity yet</p>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}

                {activeTab === "experiences" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#0f2d46]/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-[#FF6D52] flex items-center">
                        <FiShare2 className="mr-2" /> My Experiences
                      </h3>
                      <Link
                        to="/experience"
                        className="flex items-center text-sm text-[#FF6D52] hover:text-[#FF9E52] transition-colors"
                      >
                        <span>Add New</span>
                        <FiChevronRight className="ml-1" />
                      </Link>
                    </div>
                    {experiences.length > 0 ? (
                      <div className="space-y-4">
                        {experiences.map((exp) => (
                          <div key={exp._id} className="p-5 bg-[#082032]/50 rounded-xl border border-gray-700 hover:border-[#FF6D52]/30 transition-all group">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-xl font-medium group-hover:text-[#FF6D52] transition-colors">
                                  {exp.company}
                                </h4>
                                {!exp.anonymous && (
                                  <p className="text-sm text-gray-400 mt-1">
                                    Shared as {exp.name}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center text-sm text-gray-400">
                                  <FiThumbsUp className="mr-1" />
                                  <span>{exp.upvotes.length}</span>
                                </div>
                              </div>
                            </div>
                            <p className="mt-3 text-gray-300 whitespace-pre-line">{exp.description}</p>
                            <div className="mt-4 pt-3 border-t border-gray-700/50 flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                {formatDate(exp.createdAt)}
                              </span>
                              <Link
                                to={`/experience/${exp._id}`}
                                className="text-xs text-[#FF6D52] hover:underline"
                              >
                                View details
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FiShare2 className="mx-auto text-4xl text-gray-600 mb-3" />
                        <h4 className="text-lg text-gray-400">No experiences shared yet</h4>
                        <p className="text-gray-500 mt-2">Share your first experience to help others!</p>
                        <Link
                          to="/experience"
                          className="inline-block mt-4 px-4 py-2 bg-[#FF6D52] text-white rounded-lg hover:bg-[#FF8D52] transition-colors"
                        >
                          Share Experience
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "questions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#0f2d46]/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg"
                  >
                    <h3 className="text-lg font-semibold mb-6 text-[#FF6D52] flex items-center">
                      <FiMessageSquare className="mr-2" /> My Questions
                    </h3>
                    {doubts.length > 0 ? (
                      <div className="space-y-4">
                        {doubts.map((doubt) => (
                          <div key={doubt._id} className="p-5 bg-[#082032]/50 rounded-xl border border-gray-700 hover:border-[#FF6D52]/30 transition-all group">
                            <h4 className="text-xl font-medium group-hover:text-[#FF6D52] transition-colors">
                              {doubt.question}
                            </h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {doubt.answers.length > 0 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-200">
                                  {doubt.answers.length} answers
                                </span>
                              )}
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-200">
                                {doubt.upvote.length} upvotes
                              </span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-700/50 flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                Asked on {formatDate(doubt.createdAt)}
                              </span>
                            
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FiMessageSquare className="mx-auto text-4xl text-gray-600 mb-3" />
                        <h4 className="text-lg text-gray-400">No questions asked yet</h4>
                        <p className="text-gray-500 mt-2">Ask your first question to get help from peers!</p>
                        <Link
                          to="/doubt-forum"
                          className="inline-block mt-4 px-4 py-2 bg-[#FF6D52] text-white rounded-lg hover:bg-[#FF8D52] transition-colors"
                        >
                          Ask a Question
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;