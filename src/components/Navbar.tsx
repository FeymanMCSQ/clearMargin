import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <Image
                        src="/logo.png"
                        alt="ClearMargin Logo"
                        width={32}
                        height={32}
                    />
                    <span>ClearMargin</span>
                </div>
                <button type="button" style={{ padding: '8px 16px', fontSize: '14px' }}>Get Access</button>
            </div>
        </nav>
    );
}
