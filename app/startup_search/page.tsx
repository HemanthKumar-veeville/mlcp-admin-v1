"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, User, Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store/store";
import { getAllStartups } from "../../lib/store/slices/authSlice";

// Figma design assets
const imgEllipse = "/ellipse.png";

export default function StartupSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStartup, setSelectedStartup] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Get startups data from Redux store
  const { startups, startupLoading, startupError, currentPage, totalPages } =
    useSelector((state: RootState) => state.auth);

  // Fetch startups on component mount
  useEffect(() => {
    dispatch(
      getAllStartups({
        count: 20,
        page_no: 1,
        sort_by: "name",
      })
    );
  }, [dispatch]);

  // Filter startups based on search query
  const filteredStartups = startups.filter(
    (startup) =>
      startup.startup_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search with API call
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Only make API call if query has minimum 3 characters or is empty
    if (query.trim().length >= 3) {
      dispatch(
        getAllStartups({
          count: 20,
          page_no: 1,
          sort_by: "name",
          search: query,
        })
      );
    } else if (query.trim().length === 0) {
      // Reset to initial state when search is cleared
      dispatch(
        getAllStartups({
          count: 20,
          page_no: 1,
          sort_by: "name",
        })
      );
    }
    // If query length is 1-2 characters, don't make API call - just filter locally
  };

  return (
    <div className="bg-[#fdfaf6] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 pb-8 max-w-md mx-auto w-full">
        {/* Back Button and Title */}
        <div className="flex flex-col gap-4 mb-4">
          <Link href="/startupform" className="w-full">
            <button className="flex items-center gap-2 w-full text-left">
              <ArrowLeft className="text-[#2a2a2a] text-2xl" />
              <span className="font-medium text-[#2a2a2a] text-xs">Retour</span>
            </button>
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[#2a2a2a] text-2xl leading-tight">
              Votre startup
            </h1>
          </div>
        </div>

        {/* Search Container */}
        <div className="flex-1 flex flex-col bg-white rounded-lg overflow-hidden">
          {/* Search Input */}
          <div className="p-1">
            <div className="flex items-center h-10 px-3 py-2 border border-neutral-300 rounded-md">
              <input
                type="text"
                placeholder="Recherchez votre startup"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 text-sm text-neutral-500 bg-transparent border-none outline-none placeholder-neutral-500"
              />
              <Search className="text-neutral-500 w-4 h-4 ml-2" />
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-neutral-300 w-full my-4"></div>

          {/* Loading State */}
          {startupLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-neutral-500">Chargement...</div>
            </div>
          )}

          {/* Error State */}
          {startupError && (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-red-500">Erreur: {startupError}</div>
            </div>
          )}

          {/* Startup List */}
          {!startupLoading && !startupError && (
            <div className="flex flex-col gap-2">
              {filteredStartups.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-sm text-neutral-500">
                    {searchQuery
                      ? "Aucune startup trouvée"
                      : "Aucune startup disponible"}
                  </div>
                </div>
              ) : (
                filteredStartups.map((startup, index) => (
                  <div key={startup.id}>
                    <button
                      onClick={() => setSelectedStartup(startup.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3 min-h-11 hover:bg-neutral-50 transition-colors ${
                        selectedStartup === startup.id ? "bg-neutral-50" : ""
                      }`}
                    >
                      <img
                        src={startup.logo}
                        alt={startup.startup_name}
                        className="w-16 h-auto object-contain rounded-xs"
                        onError={(e) => {
                          e.currentTarget.src = imgEllipse;
                        }}
                      />
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-sm text-neutral-600 text-left">
                          {startup.startup_name}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {startup.email}
                        </span>
                      </div>
                    </button>
                    {index < filteredStartups.length - 1 && (
                      <div className="h-px bg-neutral-300 w-full"></div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            disabled={!selectedStartup}
            className={`w-full h-10 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              selectedStartup
                ? "bg-[#cf4326] text-white hover:bg-[#b83a22]"
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
            onClick={() => {
              if (selectedStartup) {
                router.push(`/startupform?startupId=${selectedStartup}`);
              }
            }}
          >
            Continuer
          </button>
          <button
            className="w-full h-10 px-4 py-2 bg-neutral-100 rounded-md font-medium text-sm text-[#cf4326] hover:bg-neutral-200 transition-colors"
            onClick={() => {
              router.push("/startup_signup");
            }}
          >
            Créer mon startup
          </button>
        </div>
      </div>
    </div>
  );
}
