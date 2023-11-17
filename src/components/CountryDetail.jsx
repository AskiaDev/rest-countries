import { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

const CountryDetail = ({ isDark }) => {
    const { countryCode } = useParams();
    const [countryDetails, setCountryDetails] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    function formatPopulation(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function formatCurrencies(currencies) {
        // Get an array of the currency objects
        const currencyArray = Object.values(currencies);

        // Map over the array and return the name of each currency
        return currencyArray.map(currency => currency.name).join(', ');
    }

    function formatLanguages(languages) {
        // Get an array of the language names
        const languageArray = Object.values(languages);

        // Join the array into a string, with each name separated by a comma
        return languageArray.join(', ');
    }

    const goBack = () => {
        // Go back to the previous page
        navigate('/');
    };
    useEffect(() => {
        // Fetch detailed information for the specific country using countryCode
        const fetchCountryDetails = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                const data = await response.json();
                setCountryDetails(data);
            } catch (error) {
                console.error('Error fetching country details:', error);
            }
        };

        fetchCountryDetails();
    }, [countryCode]);

    if (!countryDetails) {
        return <p>Loading...</p>;
    }
    return (
        <div className={`md:p-24 w-full h-screen ${isDark ? "darker" : ""}`}>
            <Link to={location.state ? location.state.from : '/'}>
                <button className={`m-4 px-8 py-2 shadow-md ${isDark ? "dark" : ""}`} onClick={goBack}>Back</button>
            </Link>
            <div className={`flex  p-4 flex-col md:flex-row md:items-center md:w-full md:mx-auto md:gap-24 ${isDark ? 'darker' : ""}`}>
                <img className="my-10 object-cover md:w-1/2" src={countryDetails[0].flags.png} alt={countryDetails[0].name.common} />

                <div className={`md:w-1/2 ${isDark ? "darker" : 'first-letter:'}`}>
                    <h2 className='text-2xl mb-5 font-bold'>{countryDetails[0]?.name?.common}</h2>
                    <div className='md:flex md:gap-24'>
                        <div className='flex flex-col gap-2'>
                            <p><strong>Native Name: </strong>{countryDetails[0]?.name?.nativeName?.eng?.common}</p>
                            <p><strong>Population: </strong>{formatPopulation(countryDetails[0]?.population)}</p>
                            <p><strong>Region: </strong>{formatPopulation(countryDetails[0]?.region)}</p>
                            <p><strong>Sub Region: </strong>{formatPopulation(countryDetails[0]?.subregion)}</p>
                        </div>
                        <div className='my-10 md:my-0 flex flex-col gap-2'>
                            <p><strong>Top Level Domain: </strong>{countryDetails[0]?.tld[0]}</p>
                            <p><strong>Currencies: </strong>{formatCurrencies(countryDetails[0]?.currencies)}</p>
                            <p><strong>Languages: </strong>{formatLanguages(countryDetails[0]?.languages)}</p>
                        </div>
                    </div>
                    {countryDetails[0].borders && <div>
                        <h2 className='font-bold mb-5 md:mt-24'>Border Countries:</h2>
                        <ul className=' grid grid-cols-2 md:grid-cols-6 gap-3'>
                            {countryDetails[0]?.borders?.map((border, idx) => {
                                return (
                                    <li key={idx}>
                                        <button className={`px-8 py-2 shadow-md ${isDark ? "dark" : ""}`} onClick={() => navigate(`/country/${border}`)}>
                                            {border}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default CountryDetail;
