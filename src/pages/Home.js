import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import {Fragment, useEffect, useState} from "react";
import {API_BASE_URL, getGames} from "../api";
import {Menu, Transition} from "@headlessui/react";
import {useNavigate} from "react-router-dom";

const sortOptions = [
    {name: 'Popularity: High to Low', sortBy: "popular", sortDirection: "desc", href: '#'},
    {},
    {name: 'Title: A to Z', sortBy: "title", sortDirection: "asc", href: '#'},
    {},
    {name: 'Recently Added', sortBy: "uploaddate", sortDirection: "", href: '#'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Home = () => {
    const nav = useNavigate()
    const [games, setGames] = useState({content: []})
    const [sort, setSort] = useState(sortOptions[0].sortBy)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(9)
    const [sortDirection, setSortDirection] = useState("desc")

    useEffect(() => {
        document.title = "Home | WorldSkills Games"
        const fetchGames = async () => {
            const data = await getGames({
                sortBy: sort.sortBy,
                sortDir: sort.sortDirection,
                page: page,
                size: size
            })
            setGames(data)
        }

        fetchGames()
    }, []);

    const updateSort = (by, dir) => {
        setSort(by)
        setSortDirection(dir)
        updateGames({
            sortBy: by,
            sortDirection: dir
        })

    }

    const updateGames = async (
        {
            sortBy,
            sortDirection,
            ppage = page,
            ssize = size
        }
    ) => {
        const data = await getGames({
            sortBy: sortBy,
            sortDir: sortDirection,
            page: ppage,
            size: ssize
        })
        setGames(data)
    }

    const updateGames2 = async (
        {
            sortBy,
            sortDirection,
            ppage = page,
            ssize = size
        }
    ) => {
        const data = await getGames({
            sortBy: sortBy,
            sortDir: sortDirection,
            page: ppage,
            size: ssize
        })
        setGames({
            content: games.content.concat(data.content)
        })
    }

    // infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
            setPage(page + 1)
            updateGames2({
                sortBy: sort,
                sortDirection: sortDirection,
                page: page + 1,
                size: size
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [page, size, sort, sortDirection])

    return (
        <>
            <Header/>
            <PageTitle subtitle={`${games.totalElements} games available`}>Discover games</PageTitle>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
                    <h2 className="sr-only">Products</h2>

                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <div className={"text-sm font-medium text-gray-900 mb-2"}>{sort.name}</div>
                            <Menu.Button
                                className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 px-6 py-2 mb-6">
                                Sort
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option}>
                                            {({active}) => (
                                                <a
                                                    onClick={() => {
                                                        updateSort(option.sortBy, sortDirection)
                                                    }}
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm font-medium text-gray-900'
                                                    )}
                                                >
                                                    {option.sortBy}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <div className={"text-sm font-medium text-gray-900 mb-2"}>{sort.name}</div>
                            <Menu.Button
                                className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 px-6 py-2 mb-6">
                                Order
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option}>
                                            {({active}) => (
                                                <a
                                                    onClick={() => {
                                                        updateSort(sort, option.sortDirection)
                                                    }}
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm font-medium text-gray-900'
                                                    )}
                                                >
                                                    {option.sortDirection}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <div
                        className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                        {games.content.map((game) => {
                            return (
                                <div
                                    key={game.slug}
                                    onClick={() => {
                                        nav(`/game/${game.slug}`)
                                    }}
                                    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                                >
                                    <div
                                        className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                                        <img
                                            src={`${API_BASE_URL}${game.thumbnail}`}
                                            onError={(e) => {
                                                e.target.src = 'https://s22908.pcdn.co/wp-content/uploads/2023/07/most-hyped-up-games.jpg'
                                            }}
                                            alt={game.slug}
                                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col space-y-2 p-4">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            <a href={game.href}>
                                                <span aria-hidden="true" className="absolute inset-0"/>
                                                {game.title}
                                            </a>
                                        </h3>
                                        <p className="text-sm text-gray-500">{game.description}</p>
                                        <div className="flex flex-1 flex-col justify-end">
                                            <p className="text-sm italic text-gray-500">{game.author}</p>
                                            <p className="text-base font-medium text-gray-900">{game.scoreCount}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;