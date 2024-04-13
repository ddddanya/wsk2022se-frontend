import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getUser} from "../api";

const Profile = () => {
    const {username} = useParams();
    const [user, setUser] = useState({
        authoredGames: [],
        highScores: []
    })

    useEffect(() => {
        document.title = "Profile | WorldSkills Games"
        const token = localStorage.getItem("token")
        if (!token) {
            window.location.href = "/auth"
        } else {
            if (username) {
                const fetchUser = async () => {
                    const data = await getUser(username)
                    setUser(data)
                }
                fetchUser()
            } else {
                const fetchUser = async () => {
                    const data = await getUser(localStorage.getItem("username"))
                    setUser(data)
                }
                fetchUser()
            }
        }
    }, []);

    return (
        <>
            <Header/>
            <PageTitle subtitle={user?.username}>Profile</PageTitle>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
                    {user.authoredGames && <div className="mt-12">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Authored Games</h1>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                        <tr>
                                            <th scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Game
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Slug
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {user.authoredGames.map((game, i) => (
                                            <tr key={game.title}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {game.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{game.slug}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <a href={"/game/" + game.slug} className="text-blue-500">Open</a>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {user.highscores && <div className="mt-12">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Highscores</h1>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                        <tr>
                                            <th scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Game
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Score
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {user.highscores.map((score, i) => (
                                            <tr key={score.game.title}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {score.game.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{score.score}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Profile;