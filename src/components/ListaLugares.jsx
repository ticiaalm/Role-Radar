import Lugar from "./Lugar";

const ListaLugares = ({ lugares }) => {
    return (
        <div>
           {lugares.map((lugar, key) => (
                <Lugar
                    key={lugar.properties.place_id}
                    numero={key + 1}
                    nome={lugar.properties.name}
                    endereco={lugar.properties.address_line2}
                    distancia={lugar.properties.distance} />
            ))}
        </div>
    )
}

export default ListaLugares