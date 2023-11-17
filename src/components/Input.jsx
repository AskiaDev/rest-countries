import { AiOutlineSearch } from 'react-icons/ai'

const Input = ({ query, setQuery, isDark }) => {
    return (
        <div className={`px-5 py-2 rounded-lg shadow-2xl md:my-10 flex items-center ${isDark ? "dark" : ''} max-w-lg`}>
            <span><AiOutlineSearch /></span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className={`outline-none px-3 py-2 font-nunito ${isDark ? "dark" : ''}`} placeholder='Search for a country...' type="text" />
        </div>
    )
}

export default Input
