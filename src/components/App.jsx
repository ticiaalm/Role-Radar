import React, { Component } from "react"
import Cartao from "./Cartao"
import Creditos from "./Creditos"
import Loading from "./Loading"
import MeuPonto from "./MeuPonto"
import geoapifyClient from "../utils/geoapifyClient"
import { Button } from "primereact/button"
import Busca from "./Busca"

const estiloSubtitulo = {
    color: '#626262',
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
                    horarioLocalizacao: Date.now(),
                    mensagemDeErro: null
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

    onBuscaRealizada = async (categoria, raio) => {
        const result = await geoapifyClient.get("/places", {
            params: {
                categories: categoria,
                filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
                bias: `proximity:${this.state.longitude},${this.state.latitude}`,
                limit: 20
            }
        })
        console.log(result.data.features)
    }

    render() {
        return (
            <div>
                <div className='flex flex-column align-items-center p-3'>
                    <div className='flex flex-column align-items-center gap-1'>
                        <div className='flex align-items-center gap-2'>
                            <h1 className="titulo"><i className="pi pi-map-marker pin"></i>
                                RolêRadar
                            </h1>
                        </div>
                    </div>
                    <div className="flex align-items-center">
                        <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
                    </div>

                    <Creditos />

                    <div className="mt-4"> {
                        this.state.mensagemDeErro ?
                            <p className="border border-round p-3 text-center text-red-500">
                                {this.state.mensagemDeErro}
                            </p>
                            :
                            !this.state.latitude ?
                                <Loading mensagem="Aguardando permissão de localização..." />
                            :
                            <div>
                                <Cartao cabecalho="Você está aqui!">
                                    <MeuPonto
                                        latitude={this.state.latitude}
                                        longitude={this.state.longitude}
                                        horarioLocalizacao={this.state.horarioLocalizacao}
                                        onAtualizar={this.obtemLocalizacao} />
                                </Cartao>
                                <br />
                                <div className="mt-3">
                                    <Cartao cabecalho="O que você procura?">
                                        <Busca onBuscaRealizada={this.onBuscaRealizada} />
                                    </Cartao>
                                </div>
                            </div>
                    }
                    </div>
                    <br />
                    <footer>
                        RolêRadar © {obterAno()}
                    </footer>
                </div>
            </div>
        )
    }
}