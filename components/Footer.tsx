const Footer = () => {
    return (
        <footer className="bg-black text-white py-8 border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} HSTORE. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
