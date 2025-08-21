"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, User, Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store/store";
import { getAllIncubators } from "../../lib/store/slices/authSlice";

// Figma design assets
const imgEllipse = "/ellipse.png";

export default function IncubatorSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncubator, setSelectedIncubator] = useState<string | null>(
    null
  );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Get incubators data from Redux store
  const {
    incubators,
    incubatorLoading,
    incubatorError,
    incubatorCurrentPage,
    incubatorTotalPages,
  } = useSelector((state: RootState) => state.auth);

  // Fetch incubators on component mount
  useEffect(() => {
    dispatch(
      getAllIncubators({
        count: 20,
        page_no: 1,
        sort_by: "name",
      })
    );
  }, [dispatch]);

  // Filter incubators based on search query
  const filteredIncubators = incubators.filter(
    (incubator) =>
      incubator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incubator.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search with API call
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Only make API call if query has minimum 3 characters or is empty
    if (query.trim().length >= 3) {
      dispatch(
        getAllIncubators({
          count: 20,
          page_no: 1,
          sort_by: "name",
          search: query,
        })
      );
    } else if (query.trim().length === 0) {
      // Reset to initial state when search is cleared
      dispatch(
        getAllIncubators({
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
          <Link href="/incubatorform" className="w-full">
            <button className="flex items-center gap-2 w-full text-left">
              <ArrowLeft className="text-[#2a2a2a] text-2xl" />
              <span className="font-medium text-[#2a2a2a] text-xs">Retour</span>
            </button>
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[#2a2a2a] text-2xl leading-tight">
              Votre incubateur
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
                placeholder="Recherchez votre incubateur"
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
          {incubatorLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-neutral-500">Chargement...</div>
            </div>
          )}

          {/* Error State */}
          {incubatorError && (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-red-500">
                Erreur: {incubatorError}
              </div>
            </div>
          )}

          {/* Incubator List */}
          {!incubatorLoading && !incubatorError && (
            <div className="flex flex-col gap-2">
              {filteredIncubators.length === 0 ? (
                <div className="flex items-center justify-center py-8 h-[500px]">
                  <div className="text-sm text-neutral-500">
                    {searchQuery
                      ? "Aucun incubateur trouvé"
                      : "Aucun incubateur disponible"}
                  </div>
                </div>
              ) : (
                filteredIncubators.map((incubator, index) => (
                  <div key={incubator.id}>
                    <button
                      onClick={() => setSelectedIncubator(incubator.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3 min-h-11 hover:bg-neutral-50 transition-colors ${
                        selectedIncubator === incubator.id
                          ? "bg-neutral-50"
                          : ""
                      }`}
                    >
                      <img
                        src={incubator.logo}
                        alt={incubator.name}
                        className="w-16 h-auto object-contain rounded-xs"
                        onError={(e) => {
                          e.currentTarget.src = imgEllipse;
                        }}
                      />
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-sm text-neutral-600 text-left">
                          {incubator.name}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {incubator.email}
                        </span>
                      </div>
                    </button>
                    {index < filteredIncubators.length - 1 && (
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
            disabled={!selectedIncubator}
            className={`w-full h-10 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              selectedIncubator
                ? "bg-[#cf4326] text-white hover:bg-[#b83a22]"
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
            onClick={() => {
              if (selectedIncubator) {
                router.push(`/incubatorform?incubatorId=${selectedIncubator}`);
              }
            }}
          >
            Continuer
          </button>
          <button
            className="w-full h-10 px-4 py-2 bg-neutral-100 rounded-md font-medium text-sm text-[#cf4326] hover:bg-neutral-200 transition-colors"
            onClick={() => {
              router.push("/incubator_signup");
            }}
          >
            Créer mon incubateur
          </button>
        </div>
      </div>
    </div>
  );
}
