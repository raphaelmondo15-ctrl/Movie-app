import { createContext, useState } from "react";

export const MyListContext = createContext();

export function MyListProvider({ children }) {
    const [myList, setMyList] = useState([])

    const addToMyList = (movie) => {
        setMyList((prev) => {
            if (prev.find((m) => m.id === movie.id)) {
                return prev
            } else {
                return [...prev, movie]
            }
        })
    }

    const removeFromMyList = (movieId) => {
        setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId));
    }
    return (
        <MyListContext.Provider value={{ myList, setMyList, addToMyList, removeFromMyList }}>
            {children}
        </MyListContext.Provider>
    );
}