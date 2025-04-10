import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <div className="bg-white rounded-md">
            <img src="/asc.svg" alt="App Logo" className="w-20" />
        </div>
    );
}
