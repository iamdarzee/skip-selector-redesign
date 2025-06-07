{/* Skip Options Grid */}
<div className="block sm:hidden mb-12">
<div className="flex space-x-6 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-hide">
  {skips.map((skip, index) => (
    <div className="flex-shrink-0 w-80 snap-center">
      {/* Move the entire skip card content here for mobile */}
      <div
        key={skip.id}
        className={`group relative overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105 ${
          selectedSkip?.id === skip.id
            ? 'z-10 scale-105'
            : 'hover:z-10'
        }`}
        onClick={() => handleSkipSelect(skip)}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Include the full card content from the desktop version */}
      </div>
    </div>
  ))}
</div>
</div>

{/* Desktop Grid */}
<div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">