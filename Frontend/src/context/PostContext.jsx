import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAxios } from "../hooks/UseAxios"


export const PostContext = createContext(undefined)

export const usePost = () => {
    const context = useContext(PostContext)
    if (!context) {
        throw new Error("useCoctel no esta dentro del contexto")
    }
    return context
}

export const PostProvider = ({ children }) => {

    const { fetchData, loading, error } = useAxios()

    const [posts, setposts] = useState([]);

    const postPost = async (data) => {
        await fetchData({
            url: '/post/postPosts',
            method: 'post',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    const getPosts = useCallback(async () => {
        const res = await fetchData({
            url: `/post/getPosts`,
            method: 'get',
        });
        setposts(res);
    }, [fetchData]);

    return (
        <PostContext.Provider value={{ loading, error, posts, postPost, getPosts}}>
            {children}
        </PostContext.Provider>
    )
}
