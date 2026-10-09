import { GEOAPIFY_KEY } from "../utils/chaves";

const MapaRadar = ({ latitude, longitude, lugares }) => {
    const marcadorUsuario = `lonlat:${longitude},${latitude};color:%23d32f2f;size:48`;
    const marcadoresLugar = lugares.map((lugar, key) => {
        const { lon, lat } = lugar.properties;
        return `lonlat:${lon},${lat};type:circle;color:%231565c0;size:42;contentsize:28;text:${key + 1}`;
    });

    const MARCADORES = marcadorUsuario + "|" + marcadoresLugar.join("|")

    const url =
        `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&marker=${MARCADORES}&apiKey=${GEOAPIFY_KEY}`;

    return (
        <img className="w-full" src={url} alt="Radar com os lugares encontrados" />
    );
};

export default MapaRadar;