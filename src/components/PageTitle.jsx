export default function PageTitle({
                                      children,
                                      subtitle
                                  }) {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {children}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-sm leading-5 text-gray-500">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
