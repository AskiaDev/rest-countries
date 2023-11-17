import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import Header from "./components/Header";
import Input from "./components/Input";
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false)
  const [region, setSelectedRegion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDark, setIsDark] = useState(false)

  function handleDarkMode() {
    setIsDark(prevState => !prevState)
  }

  const fetchData = async (region = '') => {
    try {
      setIsLoading(true)
      const url = region
        ? `https://restcountries.com/v3.1/region/${region}`
        : 'https://restcountries.com/v3.1/all';

      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false)
    }
  };


  useEffect(() => {
    fetchData(region);
  }, [region]);

  useEffect(() => {
    const fetchCountry = async () => {
      if (query.length > 2) {
        try {
          setIsLoading(true)
          const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setCountries(data);
            setError(false);
          } else {
            setCountries([]);
            setError(true);
          }
        } catch (error) {
          setError(true);
        } finally {
          setIsLoading(false)
        }
      } else if (query.length === 0) {
        fetchData()
        setError(false)
      }
    }
    fetchCountry();
  }, [query])

  return (
    <Router>
      <Header handleDarkMode={handleDarkMode} isDark={isDark} />
      <Routes>
        <Route path="/" element={
          <main className={`p-21 ${isDark ? "darker" : ""}`}>
            <div className={` pt-10 flex flex-col gap-10 px-10 md:pt-0 md:flex-row md:items-center md:justify-between ${isDark ? "darker" : ""}`}>
              <Input isDark={isDark} query={query} setQuery={setQuery} />
              <Dropdown isDark={isDark} region={region} setSelectedRegion={setSelectedRegion} />
            </div>
            {isLoading && <p className="flex justify-center items-center">Loading....</p>}
            {!error && !isLoading && <Countries isDark={isDark} countries={countries} />}
            {error && <p className={`text-center text-red-500`}>Country not found</p>}
          </main>
        } />
        <Route path="/country/:countryCode" element={<CountryDetail isDark={isDark} />} />
      </Routes>
    </Router>
  )
}