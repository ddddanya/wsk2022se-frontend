import Header from "../components/Header";
import {useEffect} from "react";

const SignOut = () => {
    useEffect(() => {
        document.title = "Sign Out | WorldSkills Games";
    }, []);
    return (
        <>
            <Header/>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-900">You have been signed out</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignOut;