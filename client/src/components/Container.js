function Container({ children }) {
    return (
        <div className="px-4 py-12 bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {children}
        </div>
    )
}

export default Container
