import Image from "next/image";

export default function Profile({
                                    profile
                                }: {
    profile: {
        image: string
        name: string
        description: string
    }
}) {
    return (
        <>
            <div className="text-center flex flex-col items-center">
                <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                            <stop id="stop1" stopColor="rgba(157.223, 157.223, 157.223, 1)" offset="0%"></stop>
                            <stop id="stop2" stopColor="rgba(31, 247.273, 251, 1)" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <mask id="mask1" mask-type="alpha">
                        <path fill="url(#sw-gradient)"
                              d="M20.7,-35.5C27.9,-31.8,35.3,-28.2,38.7,-22.3C42.2,-16.4,41.8,-8.2,40.9,-0.5C40,7.1,38.6,14.3,35.6,21.1C32.6,27.9,28,34.3,21.9,37.6C15.7,40.9,7.8,41.1,0.3,40.6C-7.3,40.2,-14.6,39.1,-21.6,36.2C-28.5,33.4,-35.1,28.7,-39.2,22.4C-43.3,16,-45,8,-44.3,0.4C-43.6,-7.2,-40.4,-14.4,-36.2,-20.4C-31.9,-26.4,-26.4,-31.3,-20.2,-35.5C-13.9,-39.6,-7,-43,-0.1,-42.9C6.8,-42.8,13.6,-39.1,20.7,-35.5Z"
                              width="100%" height="100%" transform="translate(50 50)" strokeWidth="0"
                              style={{transition: "all 0.3s ease 0s", stroke: "url(#sw-gradient)"}}></path>
                    </mask>
                    <g mask="url(#mask1)">
                        <path fill="url(#sw-gradient)"
                              d="M20.7,-35.5C27.9,-31.8,35.3,-28.2,38.7,-22.3C42.2,-16.4,41.8,-8.2,40.9,-0.5C40,7.1,38.6,14.3,35.6,21.1C32.6,27.9,28,34.3,21.9,37.6C15.7,40.9,7.8,41.1,0.3,40.6C-7.3,40.2,-14.6,39.1,-21.6,36.2C-28.5,33.4,-35.1,28.7,-39.2,22.4C-43.3,16,-45,8,-44.3,0.4C-43.6,-7.2,-40.4,-14.4,-36.2,-20.4C-31.9,-26.4,-26.4,-31.3,-20.2,-35.5C-13.9,-39.6,-7,-43,-0.1,-42.9C6.8,-42.8,13.6,-39.1,20.7,-35.5Z"
                              width="100%" height="100%" transform="translate(50 50)" strokeWidth="0"
                              style={{transition: "all 0.3s ease 0s", stroke: "url(#sw-gradient)"}}></path>
                        <image href={profile.image} className="w-10 h-10" x="30" y="30"/>
                    </g>
                </svg>
                <h1 className="font-semibold sm:text-3xl xs:text-xl text-lg">
                    {profile.name}
                </h1>
                <p className="sm:text-xl xs:text-lg text-md">
                    {profile.description}
                </p>
            </div>
        </>
    )
}