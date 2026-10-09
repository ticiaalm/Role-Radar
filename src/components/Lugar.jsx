import Cartao from "./Cartao";

const estiloCirculo = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
    flexShrink: 0,
    color: '#ffffff',
    backgroundColor: '#3a86ff',
}

const formatarDistancia = (distancia) => {
    if (distancia == null) {
        return "Distância indisponível"
    }
    if (distancia < 1000) {
        return `${Math.round(distancia)} m`
    }
    return `${(distancia / 1000).toFixed(1).replace('.', ',')} km`
}

const Lugar = ({numero, nome, lugar, endereco, distancia}) => {
    return (
        <div className="mb-3">
            <Cartao cabecalho={formatarDistancia(distancia)}>
                <div className="flex align-items-center">
                    <div style={estiloCirculo}>
                        {numero}
                    </div>
                    <div className="ml-3">
                        <strong>
                            {nome || 'Sem nome'}
                        </strong>
                        <p>{endereco || 'Endereço indisponível'}</p>
                    </div>
                </div>
            </Cartao>
        </div>
    )
}

export default Lugar