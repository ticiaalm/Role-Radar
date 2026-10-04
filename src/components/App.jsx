import Cartao from "./Cartao"
import Creditos from "./Creditos"

const estiloSubtitulo = {
    color: '#0c4707',
    fontSize: '20px',
}

const obterAno = () => {
    return new Date().getFullYear()
}

function App() {
    return (
        <div className='flex flex-column align-items-center p-3'>
            <div className='flex flex-column align-items-center gap-1'>
                <div className='flex align-items-center gap-2'>
                    <h1 className="titulo"><i className="pi pi-map-marker"></i>
                        RolêRadar
                    </h1>
                </div>
            </div>
            <div className="flex align-items-center">
                <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
            </div>

            <Creditos />

            <div className="mt-5">
                <Cartao cabecalho="Teste">
                    Conteúdo do cartão
                </Cartao>
            </div>
            <br/>
            <footer>
                RolêRadar © {obterAno()}
            </footer>
        </div>
    )
}

export default App