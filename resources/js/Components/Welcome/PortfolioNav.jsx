import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ApplicationLogo from '../ApplicationLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faUserSecret } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ auth }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Detecta scroll para mudar o estilo do nav
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href={route('welcome')} className="flex items-center space-x-2">
                            <ApplicationLogo />
                        </Link>
                    </div>

                    {/* Versão Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 hover:bg-slate-600 rounded-lg text-white transition-colors"
                            >
                                <FontAwesomeIcon icon={faUserSecret} />
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="px-4 py-2 hover:bg-slate-600 rounded-lg text-white transition-colors"
                            >
                                <FontAwesomeIcon icon={faDoorOpen} />
                            </Link>
                        )
                        }
                    </div>

                    {/* Versão Mobile */}
                    <div className="md:hidden flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors"
                            >
                                <FontAwesomeIcon icon={faUserSecret} />
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="px-4 py-2 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors"
                            >
                                <FontAwesomeIcon icon={faDoorOpen} />
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;