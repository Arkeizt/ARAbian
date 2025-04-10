import { SVGAttributes } from 'react';

interface AppLogoIconProps extends SVGAttributes<SVGElement> {
    className?: string; // Allow custom className to be passed
}

export default function AppLogoIcon({ className = '' }: AppLogoIconProps) {
    return (
        <div className={`bg-white rounded-md ${className}`}>
            <img src="/asc.svg" alt="App Logo" className="w-20" />
        </div>
    );
}
