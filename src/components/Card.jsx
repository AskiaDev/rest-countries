
const Card = ({ country, isDark }) => {
    return (
        <div className={`rounded-md shadow-2xl w-full h-full ${isDark ? "dark" : ""}`}>
            <img className="object-cover w-full rounded-t-md" src={country.flags.png} alt={country.name.common} />
            <div className="p-6">
                <h2 className="font-nunito font-bold text-2xl my-2">{country.name.common}</h2>
                <p className="font-nunito"><strong>Population:</strong> {country.population}</p>
                <p className="font-nunito"><strong>Region: </strong>{country.region}</p>
                <p className="font-nunito"><strong>Capital: </strong>{country.capital}</p>
            </div>
        </div>
    )
}

export default Card
