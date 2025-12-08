import React from 'react';

const TopScholarships = () => {
    return (
      <div>
        <div class="group bg-gray-900/95 border border-purple-800/30 rounded-2xl p-6 hover:bg-gray-900/100 hover:border-purple-500/50 transition-all duration-300 shadow-md shadow-black/30 hover:shadow-purple-500/10">
          <div class="flex justify-between items-start mb-5">
            <div>
              <h3 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gates Scholarship
              </h3>
              <p class="text-purple-400 text-sm mt-1">
                Bill & Melinda Gates Foundation
              </p>
            </div>
            <div class="text-3xl font-black text-white">$40,000</div>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed mb-6">
            Full-ride for minority students—covers everything.
          </p>
          <div class="flex items-center gap-3 mb-6">
            <div class="flex text-yellow-400">★★★★★</div>
            <span class="text-gray-500 text-xs">4.9</span>
          </div>
          <div class="flex gap-2 mb-6">
            <span class="px-3 py-1 bg-purple-500/15 text-purple-300 text-xs rounded-full border border-purple-500/30">
              No Essay
            </span>
          </div>
          <a
            href="#"
            class="w-full py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 block text-center"
          >
            View Details →
          </a>
        </div>
      </div>
    );
};

export default TopScholarships;