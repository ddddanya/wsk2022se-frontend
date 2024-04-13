import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import {signin, signup} from "../api";
import {useEffect, useState} from "react";

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({})

    useEffect(() => {
        document.title = "Register | WorldSkills Games"
        const token = localStorage.getItem("token")
        if (token) {
            window.location.href = "/"
        }
    }, [])

    const register = async (e) => {
        e.preventDefault()
        try {
            const data = await signup(username, password)
            console.log(data)

            if (data.status == "invalid") {
                setErrors(data.violations)
            } else {
                localStorage.setItem("token", data.token)
                localStorage.setItem("username", username)
                window.location.reload()
            }
        } catch (error) {
            console.error("Register error:", error)
        }
    }

    return (
        <>
            <Header/>
            <PageTitle>Registration</PageTitle>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={register}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username <div id={"username-error"}
                                              className={"text-red-500"}>{errors.username?.message}</div>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password <div id={"password-error"}
                                                  className={"text-red-500"}>{errors.password?.message}</div>
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;