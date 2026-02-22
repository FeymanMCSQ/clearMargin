import Image from "next/image";
import CTAButton from "@/components/CTAButton";

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
                <CTAButton style={{ padding: '8px 16px', fontSize: '14px' }}>Get Access</CTAButton>
            </div>
        </nav>
    );
}
