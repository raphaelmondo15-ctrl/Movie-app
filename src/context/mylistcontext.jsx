import { createContext, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userContext.jsx";

export const MyListContext = createContext();

export function MyListProvider({ children }) {
    const { currentUser } = useContext(UserContext)
    const storageKey = `myList_${currentUser}`

    const [myList, setMyList] = useState(() => {
        const userId = localStorage.getItem('currentUser') || 'guest'
        const savedList = localStorage.getItem(`myList_${userId}`)
        return savedList ? JSON.parse(savedList) : []
    })

    const prevStorageKey = useRef(storageKey)

    useEffect(() => {
        if (prevStorageKey.current !== storageKey) {
            localStorage.setItem(prevStorageKey.current, JSON.stringify(myList))
            prevStorageKey.current = storageKey
            const savedList = localStorage.getItem(storageKey)
            setMyList(savedList ? JSON.parse(savedList) : [])
        }
    }, [storageKey, myList])

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(myList))
    }, [storageKey, myList])

    const addToMyList = (movie) => {
        setMyList((prev) => {
            if (prev.find((m) => m.id === movie.id)) {
                return prev
            }

            return [...prev, movie]
        })
    }

    const removeFromMyList = (movieId) => {
        setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId));
    }

    const isInMyList = (movieId) => myList.some((movie) => movie.id === movieId)

    return (
        <MyListContext.Provider value={{ myList, setMyList, addToMyList, removeFromMyList, isInMyList, currentUser }}>
            {children}
        </MyListContext.Provider>
    );
}