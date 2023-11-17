import { Link } from "react-router-dom"
import Card from "./Card"

const Countries = ({ countries, isDark }) => {
    return (
        <div className={`${isDark ? 'darker' : ''} h-screen`}>
            <ul className={`mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10 ${isDark ? 'darker' : ''}`}>
                {countries.map((country, idx) => {
                    return (
                        <li key={idx}>
                            <Link to={`/country/${country.cca2}`}>
                                <Card isDark={isDark} country={country} />
                            </Link>
                        </li>
                    )
                })

                }
            </ul>
        </div>
    )
}

export default Countries
