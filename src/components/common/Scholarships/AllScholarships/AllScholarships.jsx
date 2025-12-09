import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "../Card/ScholarshipCard";
import Loader from "../../Loader/Loader";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [selectedScholarshipCategory, setSelectedScholarshipCategory] =
    useState("");
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: [
      "scholarships",
      searchText,
      selectedScholarshipCategory,
      selectedSubjectCategory,
      selectedLocation,
    ],
    queryFn: async () => {
      const text = searchText?.trim() || "";
      const params = new URLSearchParams();

      if (text) params.append("searchText", text);
      if (selectedScholarshipCategory)
        params.append("scholarshipCategory", selectedScholarshipCategory);
      if (selectedSubjectCategory)
        params.append("subjectCategory", selectedSubjectCategory);
      if (selectedLocation)
        params.append("universityCountry", selectedLocation);

      const res = await axiosSecure.get(`/scholarships?${params.toString()}`);
      return res.data;
    },
  });

  // Extract unique filter options from all scholarships
  const { data: allScholarships = [] } = useQuery({
    queryKey: ["all-scholarships-for-filters"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  const scholarshipCategories = [
    ...new Set(allScholarships.map((s) => s.scholarshipCategory)),
  ].filter(Boolean);
  const subjectCategories = [
    ...new Set(allScholarships.map((s) => s.subjectCategory)),
  ].filter(Boolean);
  const locations = [
    ...new Set(allScholarships.map((s) => s.universityCountry)),
  ].filter(Boolean);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchText("");
    setSelectedScholarshipCategory("");
    setSelectedSubjectCategory("");
    setSelectedLocation("");
  };

  // Count active filters
  const activeFiltersCount = [
    selectedScholarshipCategory,
    selectedSubjectCategory,
    selectedLocation,
  ].filter(Boolean).length;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-base-300 text-base-content p-6 md:p-10 lg:p-20">
      {/* Header Area */}
      <div className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-5xl text-center font-extrabold text-white mb-4">
          Our All Scholarships
        </h1>
        <p className="text-lg text-gray-400 text-center">
          Discover thousands of scholarships tailored for you. ScholarStream
          connects you with opportunities they might miss and streamlines the
          application review process for administrators.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body p-6">
            {/* Search Bar */}
            <div className="mb-4">
              <label className="input w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="grow"
                  placeholder="Search Scholarship Name, University Name, or Degree"
                />
              </label>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Scholarship Category Filter */}
              <select
                value={selectedScholarshipCategory}
                onChange={(e) => setSelectedScholarshipCategory(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Scholarship Categories</option>
                {scholarshipCategories.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Subject Category Filter */}
              <select
                value={selectedSubjectCategory}
                onChange={(e) => setSelectedSubjectCategory(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Subject Categories</option>
                {subjectCategories.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Locations</option>
                {locations.map((location, i) => (
                  <option key={i} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-base-content/70">
                  Active filters:
                </span>
                {selectedScholarshipCategory && (
                  <div className="badge badge-primary gap-2">
                    {selectedScholarshipCategory}
                    <button
                      onClick={() => setSelectedScholarshipCategory("")}
                      className="hover:text-error"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {selectedSubjectCategory && (
                  <div className="badge badge-primary gap-2">
                    {selectedSubjectCategory}
                    <button
                      onClick={() => setSelectedSubjectCategory("")}
                      className="hover:text-error"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {selectedLocation && (
                  <div className="badge badge-primary gap-2">
                    {selectedLocation}
                    <button
                      onClick={() => setSelectedLocation("")}
                      className="hover:text-error"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Results Count and Clear Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm text-base-content/70">
                {searchText || activeFiltersCount > 0 ? (
                  <>
                    Found{" "}
                    <span className="font-bold text-primary">
                      {scholarships.length}
                    </span>{" "}
                    scholarship{scholarships.length !== 1 ? "s" : ""}
                    {searchText && ` matching "${searchText}"`}
                    {activeFiltersCount > 0 &&
                      ` with ${activeFiltersCount} filter${
                        activeFiltersCount !== 1 ? "s" : ""
                      } applied`}
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-bold text-primary">
                      {scholarships.length}
                    </span>{" "}
                    scholarship{scholarships.length !== 1 ? "s" : ""}
                  </>
                )}
              </div>
              {(searchText || activeFiltersCount > 0) && (
                <button
                  onClick={handleClearFilters}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships Grid */}
      {scholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-base-content/30 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-2xl font-bold text-base-content/70 mb-2">
            No scholarships found
          </h3>
          <p className="text-base-content/50 mb-4">
            {searchText || activeFiltersCount > 0
              ? "No results match your search and filters. Try adjusting your criteria."
              : "Try adjusting your search"}
          </p>
          {(searchText || activeFiltersCount > 0) && (
            <button
              onClick={handleClearFilters}
              className="btn btn-primary btn-sm"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
