import { FiMoon } from 'react-icons/fi'

const Header = ({handleDarkMode, isDark}) => {
    return (
        <div className={`flex justify-between items-center p-4 shadow-md ${isDark ? "dark" : ''} `}>
            <h1 className="font-nunito font-bold">Where in the world?</h1>
            <div className='flex gap-2 items-center'>
                <button onClick={handleDarkMode}><FiMoon /></button>
                <span>Dark Mode</span>
            </div>
        </div>
    )
}

export default Header
