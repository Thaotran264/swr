import React from 'react'

const Header = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <header>
            <nav className='nav'>
                <div className='header-logo'>
                    <a>SWR</a>
                </div>
                <div className='header-search'>
                    <form onSubmit={handleSubmit}>
                        <input />
                        <button>Search</button>
                    </form>
                </div>
                <div className='header-cta'>
                    <div className='header-pageNumber'>
                        <button>-</button>
                        <span>0</span>
                        <button>+</button>
                    </div>
                    <div className='header-pageSize'>
                        <select name="size" id="pagesize">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header