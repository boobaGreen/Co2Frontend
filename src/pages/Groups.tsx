import { useState } from "react";
import Header from "../components/Header";
import { useGetGroups } from "../hooks/useGetAllGroups";
import { Group } from "../types/Group";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import GroupCard from "../components/GroupCard";
import { useMain } from "../contexts/MainContext";

const Groups = () => {
  const { jwt } = useMain();
  const { groups = [], isLoading, error } = useGetGroups(jwt);
  const [onlyFavourite, setOnlyFavourite] = useState(false);
  console.log("groups", groups);
  // Utilizza il tuo hook useLocalStorageState per gestire i preferiti
  const [favourites, setFavourites] = useLocalStorageState(
    {}, // Stato iniziale
    "favourites" // Chiave per localStorage
  );

  // Funzione per gestire il click sul pulsante "Show All" / "Show Favourites"
  const handleOnlyFavouriteClick = () => {
    setOnlyFavourite(!onlyFavourite);
  };

  // Funzione per aggiungere o rimuovere un gruppo dai preferiti
  const toggleFavourite = (groupId: string) => {
    setFavourites((prevFavourites) => ({
      ...prevFavourites,
      [groupId]: !prevFavourites[groupId],
    }));
  };

  // Filtraggio dei gruppi in base alla visualizzazione solo dei preferiti
  const filteredGroups = onlyFavourite
    ? groups.filter((group) => favourites[group.groupId])
    : groups;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative bg-gray-100 flex flex-col min-h-screen overflow-auto">
      <img
        src={`/background.webp`}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      <Header />

      <main className="relative flex flex-col items-center justify-center md:pt-0 pt-0">
        <h1 className="font-poppins text-3xl font-bold text-center bg-yellow-200 text-green-800 py-3 px-4 shadow-lg">
          Groups
        </h1>

        <button
          onClick={handleOnlyFavouriteClick}
          className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
        >
          {onlyFavourite ? "Show All " : "Show Favourites"}
        </button>

        <div className="flex flex-col items-center space-y-3 w-full px-4 mb-8">
          {filteredGroups.map((group: Group) => (
            <GroupCard
              key={group.groupId}
              group={group}
              isFavourite={!!favourites[group.groupId]}
              toggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Groups;
