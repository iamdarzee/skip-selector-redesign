import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Truck, Calendar, MapPin, Moon, Sun, Recycle, Trash2, Leaf } from 'lucide-react';
import skipGreen from "./assets/skip-green.png";
import skipYellow from "./assets/skip-yellow.png";

const SkipSelectorRedesign = () => {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {fetchSkipData();}, []);

  const fetchSkipData = async () => {
    try {
      const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
      const data = await response.json();
      
      const transformedSkips = data.map((skip, index) => ({
        id: skip.id || index,
        size: skip.size || `${skip.capacity || (index + 1) * 2} Yards`,
        capacity: skip.capacity || (index + 1) * 2,
        price: skip.price || Math.floor(Math.random() * 100) + 200,
        duration: skip.duration || (index % 2 === 0 ? '7 day hire' : '14 day hire'),
        description: skip.description || 'Perfect for household waste and garden clearance',
        wasteTypes: ['General Waste', 'Garden Waste', 'Construction Debris'][Math.floor(Math.random() * 3)],
        eco: index % 2 === 0,
        popular: index === 2
      }));
      
      setSkips(transformedSkips);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching skip data:', error);
      setSkips([
        { id: 1, size: '4 Yards', capacity: 4, price: 227, duration: '7 day hire', description: 'Perfect for small household clearances', wasteTypes: 'General Waste', eco: true, popular: false },
        { id: 2, size: '6 Yards', capacity: 6, price: 300, duration: '14 day hire', description: 'Ideal for medium-sized projects', wasteTypes: 'Garden Waste', eco: false, popular: false },
        { id: 3, size: '8 Yards', capacity: 8, price: 325, duration: '7 day hire', description: 'Great for larger home renovations', wasteTypes: 'Construction Debris', eco: true, popular: true },
        { id: 4, size: '10 Yards', capacity: 10, price: 350, duration: '7 day hire', description: 'Perfect for major clearouts', wasteTypes: 'General Waste', eco: false, popular: false },
        { id: 5, size: '12 Yards', capacity: 12, price: 400, duration: '14 day hire', description: 'Suitable for construction waste', wasteTypes: 'Construction Debris', eco: true, popular: false },
        { id: 6, size: '14 Yards', capacity: 14, price: 450, duration: '7 day hire', description: 'Our largest skip for big projects', wasteTypes: 'General Waste', eco: false, popular: false }
      ]);
      setLoading(false);
    }
  };

  const handleSkipSelect = (skip) => {setSelectedSkip(skip);};

  const toggleDarkMode = () => {setDarkMode(!darkMode);};

  const progressSteps = [
    { name: 'Postcode', completed: true },
    { name: 'Waste Type', completed: true },
    { name: 'Select Skip', completed: false, current: true },
    { name: 'Permit Check', completed: false },
    { name: 'Choose Date', completed: false },
    { name: 'Payment', completed: false }
  ];

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900' : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-emerald-500 border-r-teal-500 mx-auto mb-6"></div>
            <Recycle className="w-8 h-8 text-emerald-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg font-medium`}>Loading eco-friendly options...</p>
          <div className="flex justify-center space-x-1 mt-4">
            {[...Array(3)].map((_, i) => (<div key={i} className={`w-2 h-2 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'} animate-bounce`} style={{ animationDelay: `${i * 0.2}s` }}></div>))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-lime-900 via-black/80 to-teal-600"
          : "bg-gradient-to-br from-amber-500 via-white to-teal-400"
      }`}
    >
      {/* Floating Particles Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 animate-float ${
              darkMode ? "bg-emerald-400" : "bg-emerald-300"
            }`}
            style={{
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 10 + 10 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* Progress Header */}
      <div
        className={`${
          darkMode
            ? "bg-slate-800/90 border-slate-700 shadow-xl"
            : "bg-gray-300 border-gray-200 shadow-lg"
        } backdrop-blur-lg border-b transition-all duration-500      sticky top-0 z-40`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div></div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <h1
                  className={`text-2xl md:text-3xl font-bold font-georgia underline ${
                    darkMode ? "text-white" : "text-gray-900"
                  } transition-colors duration-300`}
                >
                  Choose Your Skip Size
                </h1>
              </div>
              <p
                className={`text-xl sm:text-3xl ${
                  darkMode ? "text-emerald-300" : "text-emerald-600"
                } font-bold font-consolas`}
              >
                Select the skip size that best suits your needs
              </p>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-300 ${
                darkMode
                  ? "bg-yellow-500 text-slate-900 hover:bg-yellow-400 shadow-yellow-500/25"
                  : "bg-slate-700 text-white hover:bg-slate-600 shadow-slate-700/25"
              } shadow-lg hover:shadow-xl hover:scale-105`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto pb-2">
            {progressSteps.map((step, index) => (
              <div key={step.name} className="flex items-center flex-shrink-0">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 ${
                    step.completed
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                      : step.current
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 animate-pulse"
                      : darkMode
                      ? "bg-slate-700 text-slate-400"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <>
                      {step.name === "Postcode" && (
                        <MapPin className="w-4 h-4" />
                      )}
                      {step.name === "Waste Type" && (
                        <Trash2 className="w-4 h-4" />
                      )}
                      {step.name === "Select Skip" && (
                        <Recycle className="w-4 h-4" />
                      )}
                      {step.name === "Permit Check" && (
                        <Check className="w-4 h-4" />
                      )}
                      {step.name === "Choose Date" && (
                        <Calendar className="w-4 h-4" />
                      )}
                      {step.name === "Payment" && (
                        <span className="text-xs">💳</span>
                      )}
                    </>
                  )}
                </div>
                <span
                  className={`ml-2 text-xs md:text-sm font-semibold transition-colors duration-300 ${
                    step.current
                      ? "text-emerald-600"
                      : step.completed
                      ? "text-emerald-500"
                      : darkMode
                      ? "text-slate-400"
                      : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
                {index < progressSteps.length - 1 && (
                  <ChevronRight
                    className={`w-4 h-4 ml-2 ${
                      darkMode ? "text-slate-600" : "text-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`max-w-full px-4 sm:px-6 lg:px-8 py-8 ${selectedSkip ? "pb-24" : ""} transition-all duration-500`}>

        {/* Skip Options Grid */}
        <div className="mb-12">
          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {skips.map((skip, index) => (
              <div
                key={skip.id}
                className={`group relative overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  selectedSkip?.id === skip.id ? "z-10 scale-105" : "hover:z-10"
                }`}
                onClick={() => handleSkipSelect(skip)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Background with Gradient */}
                <div className={`relative rounded-2xl transition-all duration-500 ${
                    selectedSkip?.id === skip.id
                      ? "bg-blue-600 shadow-xl shadow-blue-500/30"
                      : darkMode
                      ? "bg-slate-800 hover:bg-slate-700 shadow-lg"
                      : "bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200"
                  }`}
                >
                  <div className={`relative rounded-2xl p-4 h-full transition-all duration-300 ${
                      darkMode
                        ? "bg-slate-800/90 backdrop-blur-sm"
                        : "bg-white/90 backdrop-blur-sm"
                    }`}
                  >
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                          selectedSkip?.id === skip.id
                            ? "bg-white text-emerald-600 shadow-lg"
                            : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                        }`}
                      >
                        {skip.size}
                      </div>
                      {skip.popular && (
                        <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse">Most Popular</div>
                      )}
                    </div>

                    {/* Eco Badge */}
                    {skip.eco && (
                      <div className="absolute top-4 right-4">
                        <div
                          className={`p-2 rounded-full ${
                            selectedSkip?.id === skip.id
                              ? "bg-white text-emerald-600"
                              : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
                          } transition-all duration-300`}
                        >
                          <Leaf className="w-4 h-4" />
                        </div>
                      </div>
                    )}

                    {/* Selection Check */}
                    {selectedSkip?.id === skip.id && (
                      <div className="absolute -top-2 -right-2 bg-white text-emerald-600 rounded-full p-3 shadow-lg animate-bounce">
                        <Check className="w-6 h-6" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="pt-8 text-center">
                      {/* Skip Image */}
                      <div className={`relative w-full h-64 mx-auto mb-4 rounded-xl overflow-hidden transition-all duration-500 ${
                          selectedSkip?.id === skip.id
                            ? "shadow-2xl shadow-emerald-500/30 ring-4 ring-emerald-400/50"
                            : "shadow-lg group-hover:shadow-xl"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
                            selectedSkip?.id === skip.id
                              ? "from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30"
                              : "from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600"
                          }`}
                        >
                          {/* Skip Image */}
                          <div className="w-full h-full flex items-center justify-center p-4">
                            <img
                              src={darkMode ? skipGreen : skipYellow}
                              alt={`${skip.size} Skip`}
                              className={`w-full h-64 object-contain transition-all duration-500 ${
                                selectedSkip?.id === skip.id
                                  ? "scale-110 drop-shadow-lg"
                                  : "scale-100 group-hover:scale-105"
                              }`}
                              style={{
                                filter:
                                  selectedSkip?.id === skip.id
                                    ? "drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))"
                                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                              }}
                            />
                          </div>

                          {/* Floating particles for selected skip */}
                          {selectedSkip?.id === skip.id && (
                            <div className="absolute inset-0">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-float opacity-60"
                                  style={{
                                    left: `${20 + i * 30}%`,
                                    top: `${30 + i * 20}%`,
                                    animationDelay: `${i * 0.5}s`,
                                    animationDuration: "3s",
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {skip.size} Skip
                      </h3>

                      <div
                        className={`text-sm font-medium mb-3 px-3 py-1 rounded-full inline-block ${
                          darkMode
                            ? "bg-slate-700 text-slate-300"
                            : "bg-gray-100 text-gray-600"
                        } transition-all duration-300`}
                      >
                        {skip.wasteTypes}
                      </div>

                      <p
                        className={`text-sm mb-6 leading-relaxed transition-colors duration-300 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {skip.description}
                      </p>

                      {/* Duration */}
                      <div
                        className={`flex items-center justify-center text-sm mb-6 transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {skip.duration}
                      </div>

                      {/* Price */}
                      <div className="mb-6">
                        <div
                          className={`text-4xl font-bold mb-1 transition-colors duration-300 ${
                            selectedSkip?.id === skip.id
                              ? "text-emerald-600"
                              : darkMode
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          £{skip.price}
                        </div>
                        <div
                          className={`text-xs transition-colors duration-300 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          All inclusive • Eco-friendly
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                          selectedSkip?.id === skip.id
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
                            : darkMode
                            ? "bg-slate-700 text-slate-300 hover:bg-slate-600 shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {selectedSkip?.id === skip.id ? (
                          <span className="flex items-center justify-center">
                            <Check className="w-5 h-5 mr-2" />
                            Selected
                          </span>
                        ) : (
                          "Select This Skip"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll - Visible only on mobile */}
          <div className="sm:hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-4 px-4 pb-4">
                {skips.map((skip, index) => (
                  <div
                    key={skip.id}
                    className={`group relative overflow-hidden transition-all duration-500 cursor-pointer transform active:scale-95 flex-shrink-0 w-72 ${
                      selectedSkip?.id === skip.id ? "z-10 scale-105" : ""
                    }`}
                    onClick={() => handleSkipSelect(skip)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      minWidth: "280px", // Ensure minimum width for touch targets
                    }}
                  >
                    {/* Mobile Card Background */}
                    <div
                      className={`relative rounded-2xl p-1 transition-all duration-500 h-full ${
                        selectedSkip?.id === skip.id
                          ? "bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 shadow-xl shadow-emerald-500/30"
                          : darkMode
                          ? "bg-gradient-to-br from-slate-700 to-slate-800"
                          : "bg-gradient-to-br from-white to-gray-50 shadow-lg"
                      }`}
                    >
                      <div
                        className={`relative rounded-2xl p-4 h-full transition-all duration-300 ${
                          darkMode
                            ? "bg-slate-800/90 backdrop-blur-sm"
                            : "bg-white/90 backdrop-blur-sm"
                        }`}
                      >
                        {/* Mobile Badges */}
                        <div className="absolute top-3 left-3 flex flex-col space-y-1">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                              selectedSkip?.id === skip.id
                                ? "bg-white text-emerald-600 shadow-lg"
                                : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                            }`}
                          >
                            {skip.size}
                          </div>
                          {skip.popular && (
                            <div className="px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              Popular
                            </div>
                          )}
                        </div>

                        {/* Mobile Eco Badge */}
                        {skip.eco && (
                          <div className="absolute top-3 right-3">
                            <div
                              className={`p-1.5 rounded-full ${
                                selectedSkip?.id === skip.id
                                  ? "bg-white text-emerald-600"
                                  : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
                              } transition-all duration-300`}
                            >
                              <Leaf className="w-3 h-3" />
                            </div>
                          </div>
                        )}

                        {/* Mobile Selection Check */}
                        {selectedSkip?.id === skip.id && (
                          <div className="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full p-2 shadow-lg">
                            <Check className="w-4 h-4" />
                          </div>
                        )}

                        {/* Mobile Content */}
                        <div className="pt-6 text-center">
                          {/* Mobile Skip Image */}
                          <div
                            className={`relative w-full h-24 mx-auto mb-3 rounded-xl overflow-hidden transition-all duration-500 ${
                              selectedSkip?.id === skip.id
                                ? "shadow-xl shadow-emerald-500/30 ring-2 ring-emerald-400/50"
                                : "shadow-md"
                            }`}
                          >
                            <div
                              className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
                                selectedSkip?.id === skip.id
                                  ? "from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30"
                                  : "from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600"
                              }`}
                            >
                              <div className="w-full h-full flex items-center justify-center p-2">
                                <img
                                  src={darkMode ? skipGreen : skipYellow}
                                  alt={`${skip.size} Skip`}
                                  className={`w-full h-full object-contain transition-all duration-500 ${
                                    selectedSkip?.id === skip.id
                                      ? "scale-110 drop-shadow-md"
                                      : "scale-100"
                                  }`}
                                  style={{
                                    filter:
                                      selectedSkip?.id === skip.id
                                        ? "drop-shadow(0 2px 8px rgba(16, 185, 129, 0.3))"
                                        : "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <h3
                            className={`text-lg font-bold mb-1 transition-colors duration-300 ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {skip.size} Skip
                          </h3>

                          <div
                            className={`text-xs font-medium mb-2 px-2 py-1 rounded-full inline-block ${
                              darkMode
                                ? "bg-slate-700 text-slate-300"
                                : "bg-gray-100 text-gray-600"
                            } transition-all duration-300`}
                          >
                            {skip.wasteTypes}
                          </div>

                          <p
                            className={`text-xs mb-3 leading-relaxed transition-colors duration-300 px-2 ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {skip.description}
                          </p>

                          {/* Mobile Duration */}
                          <div
                            className={`flex items-center justify-center text-xs mb-3 transition-colors duration-300 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            {skip.duration}
                          </div>

                          {/* Mobile Price */}
                          <div className="mb-4">
                            <div
                              className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                                selectedSkip?.id === skip.id
                                  ? "text-emerald-600"
                                  : darkMode
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              £{skip.price}
                            </div>
                            <div
                              className={`text-xs transition-colors duration-300 ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              All inclusive
                            </div>
                          </div>

                          {/* Mobile Action Button */}
                          <button
                            className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                              selectedSkip?.id === skip.id
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                                : darkMode
                                ? "bg-slate-700 text-slate-300 active:bg-slate-600"
                                : "bg-gray-100 text-gray-700 active:bg-gray-200"
                            }`}
                          >
                            {selectedSkip?.id === skip.id ? (
                              <span className="flex items-center justify-center">
                                <Check className="w-4 h-4 mr-1" />
                                Selected
                              </span>
                            ) : (
                              "Select Skip"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile scroll indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                {skips.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      darkMode ? "bg-slate-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div
                className={`text-xs mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Swipe to see more options
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          className={`${
            selectedSkip ? "fixed bottom-0 left-0 right-0 z-50" : ""
          } ${
            selectedSkip
              ? darkMode
                ? "bg-slate-700 border-lime-200"
                : "bg-slate-200 border-black"
              : ""
          } ${
            selectedSkip ? "backdrop-blur-lg border-t shadow-2xl" : ""
          } transition-all duration-500`}
        >
          <div
            className={`${
              selectedSkip
                ? "max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4"
                : ""
            } flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0`}
          >
            {/* Skip Details - Mobile optimized */}
            {selectedSkip && (
              <div className="flex-1 text-center sm:text-left">
                <div
                  className={`text-2xl sm:text-3xl font-bold font-tahoma ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedSkip.size} Skip
                </div>
                <div
                  className={`text-xl sm:text-2xl font-times ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  £{selectedSkip.price} | {selectedSkip.duration}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                className={`flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xl sm:text-base transition-all duration-300 font-georgia ${
                  darkMode
                    ? "text-white bg-red-900"
                    : "text-amber-400 bg-gray-600"
                } shadow-lg hover:shadow-xl flex-1 sm:flex-none`}
              >
                <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
                Back
              </button>

              <button
                disabled={!selectedSkip}
                className={`flex items-center justify-center px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-bold text-md sm:text-base transition-all duration-300 ${
                  selectedSkip
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40"
                    : darkMode
                    ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } flex-1 sm:flex-none`}
              >
                Continue to Permits
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) rotate(120deg);
          }
          66% {
            transform: translateY(-20px) rotate(240deg);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SkipSelectorRedesign;