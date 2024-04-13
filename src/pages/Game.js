import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import {useNavigate, useParams} from "react-router-dom";
import {API_BASE_URL, getGame, getGameScores} from "../api";
import {useEffect, useState} from "react";

const Game = () => {
    const nav = useNavigate()
    const { id } = useParams();
    const [game, setGame] = useState(null)
    const [scores, setScores] = useState([])

    useEffect(() => {
        document.title = "Game | WorldSkills Games"
        const fetchGame = async () => {
            const data = await getGame(id)
            setGame(data)
            document.title = data.title + " | WorldSkills Games"

            const scores = await getGameScores(id)
            setScores(scores.scores)
        }

        fetchGame()
    }, [])

    return (
        <>
            <Header/>
            <PageTitle>{game?.title}</PageTitle>

            {/* iframe with game */}
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">

                    <iframe
                        src={API_BASE_URL + game?.gamePath}
                        title={game?.title}
                        width="700px"
                        height="400px"
                        frameBorder="0"
                    />


                    <div className="mt-12">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Game Information</h3>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{game?.description}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Author</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {game?.author}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Top-10 Users</h1>
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
                                                #
                                            </th>
                                            <th scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Username
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Score
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {scores.slice(0, 10).map((score, i) => (
                                            <tr key={score.username} onClick={() => {
                                                nav("/profile/" + score.username)
                                            }}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {i + 1}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {score.username}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{score.score}</td>
                                            </tr>
                                        ))}
                                        <tr key={"you"}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-blue-500">
                                                You
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {localStorage.getItem("username")}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {scores && scores.filter(score => score.username === localStorage.getItem("username"))[0]?.score || 0}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Game;