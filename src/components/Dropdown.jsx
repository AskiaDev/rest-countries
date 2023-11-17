
const Dropdown = ({ setSelectedRegion, region, isDark }) => {
    return (
        <div>
            <select value={region} onChange={(e) => setSelectedRegion(e.target.value)} className={`shadow-xl p-4 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ${isDark ? 'dark' : ''}`}>
                <option disabled={true} value="filter-by-region">
                    Filter by Region
                </option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
            </select>
        </div>
    )
}

export default Dropdown
