const BASE_URL = "https://243c-46-42-244-203.ngrok-free.app"

const callApi = async (endpoint, method, data, extraHeaders = {}) => {
    try {
        const requestOptions = {
            method,
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
                ...extraHeaders
            }
        }

        if (method !== "GET") {
            requestOptions.body = JSON.stringify(data)
        } else {
            const params = new URLSearchParams(data)
            endpoint += `?${params.toString()}`
        }

        const response = await fetch(`${BASE_URL}/api/v1/${endpoint}`, requestOptions)
        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error("API call error:", error)
        throw error
    }
}

const getGames = async ({
                            sortBy = "popular",
                            sortDir = "desc",
                            page = 0,
                            size = 10
                        }) => {
    try {
        const data = await callApi("games", "GET", {sortBy, sortDir, page, size})
        return data
    } catch (error) {
        console.error("getGames error:", error)
        throw error
    }
}

const getGame = async (gameId) => {
    try {
        const data = await callApi(`games/${gameId}`, "GET", {})
        return data
    } catch (error) {
        console.error("getGame error:", error)
        throw error
    }
}

const getGameScores = async (gameId) => {
    try {
        const data = await callApi(`games/${gameId}/scores`, "GET", {})
        return data
    } catch (error) {
        console.error("getGame error:", error)
        throw error
    }
}


const signup = async (username, password) => {
    try {
        const data = await callApi("auth/signup", "POST", {username, password})
        return data
    } catch (error) {
        console.error("signup error:", error)
        throw error
    }
}

const signin = async (username, password) => {
    try {
        const data = await callApi("auth/signin", "POST", {username, password})
        return data
    } catch (error) {
        console.error("signup error:", error)
        throw error
    }
}

const getUser = async (username) => {
    try {
        const data = await callApi("users/" + username, "GET", {}, {
            "Authorization": "Bearer " + localStorage.getItem("token")
        })
        return data
    } catch (error) {
        console.error("getUser error:", error)
        throw error
    }
}

export {
    getGames,
    getGame,
    getUser,
    signup,
    signin,
    getGameScores,
    BASE_URL as API_BASE_URL
}