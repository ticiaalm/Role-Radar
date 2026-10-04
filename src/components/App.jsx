import React, { Component } from "react"
import Cartao from "./Cartao"
import Creditos from "./Creditos"
import Loading from "./Loading"

const estiloSubtitulo = {
    color: '#0c4707',
    fontSize: '20px',
}

const obterAno = () => {
    return new Date().getFullYear()
}

export default class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null

    }

    componentDidMount() {
        this.obtemLocalizacao()
    }

    obtemLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    horarioLocalizacao: Date.now()
                })
            },
            (erro) => {
                console.log(`Erro: ${erro}`)
                this.setState({
                    mensagemDeErro: "Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página."
                })
            }
        )
    }

    render() {
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

                <div className="mt-4">
                    {
                        this.state.mensagemDeErro ?
                            <p className="border border-round p-3 text-center text-red-500">
                                {this.state.mensagemDeErro}
                            </p>
                        :
                        !this.state.latitude ?
                            <Loading mensagem="Aguardando permissão de localização..." />
                        :
                        <p className="text-center font-medium">
                            Localização obtida: {this.state.latitude}, {this.state.longitude}
                        </p>
                    }
                </div>

                <footer>
                    RolêRadar © {obterAno()}
                </footer>
            </div>
        )
    }
}