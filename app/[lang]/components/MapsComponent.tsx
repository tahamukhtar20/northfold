"use client";
import React, {useEffect, useRef} from "react";
import {Loader} from "@googlemaps/js-api-loader";

export default function MapsComponent() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: "",
                version: "weekly",
            });
            const {Map} = await loader.importLibrary("maps");
            const {Marker} = await loader.importLibrary("marker") as google.maps.MarkerLibrary;
            const position = {lat: 40.73061, lng: -73.935242};
            // map options
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 8,
                mapId: "e7b6b1b6f0b1b1b6",
            };
            // create map
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            // create marker
            const marker = new Marker({
                position,
                map,
                title: "Hello World!",
            });
        }
        initMap().then();
    }, []);
    return (
        <div className="h-[30rem] w-full" ref={mapRef}/>
    )
}