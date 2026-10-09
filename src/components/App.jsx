import React, { Component } from "react"
import Cartao from "./Cartao"
import Creditos from "./Creditos"
import Loading from "./Loading"
import MeuPonto from "./MeuPonto"
import geoapifyClient from "../utils/geoapifyClient"
import Busca from "./Busca"
import ListaLugares from "./ListaLugares"
import MapaRadar from "./MapaRadar"

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
        mensagemDeErro: null,
        lugares: null,
        buscando: false,
        erroBusca: null,
        raioBuscado: null
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
        this.setState({ buscando: true, erroBusca: null, raioBuscado: raio })
        const result = await geoapifyClient.get("/places", {
            params: {
                categories: categoria,
                filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
                bias: `proximity:${this.state.longitude},${this.state.latitude}`,
                limit: 20
            }
        })
            .then(result => {
                this.setState({ lugares: result.data.features, buscando: false })
            })
            .catch(erro => {
                console.log(erro)
                this.setState({
                    buscando: false,
                    erroBusca: "Não foi possível consultar os lugares. Tente novamente."
                })
            })
    }

    obtemResumo = () => {
        const quantidade = this.state.lugares.length
        return quantidade == 1 ?
            `1 Lugar encontrado em até ${this.state.raioBuscado} m`
            :
            `${quantidade} lugares encontrados em até ${this.state.raioBuscado} m`
    }

    render() {
        return (
            <div>
                <div className='flex flex-column align-items-center p-3'>
                    <div className='flex flex-column align-items-center gap-1'>
                        <h1 className="titulo"><i className="pi pi-map-marker pin"></i>
                            RolêRadar
                        </h1>
                    </div>
                    <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>

                    <Creditos />

                    <div className="grid w-full mt-4">
                        <div className="col-12 md:col-6"> {
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

                                        <div className="mt-3">
                                            <Cartao cabecalho="O que você procura?">
                                                <Busca onBuscaRealizada={this.onBuscaRealizada} />
                                            </Cartao>
                                        </div>
                                    </div>
                        }
                        </div>
                        <div className="col-12 md:col-6"> {
                            this.state.buscando ?
                                <Loading mensagem="Procurando lugares..." />
                                : this.state.erroBusca ?
                                    <p>${this.state.erroBusca}</p>
                                    : !this.state.lugares ?
                                        null
                                        : this.state.lugares.length === 0 ?
                                            <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
                                            :
                                            <div>
                                                <p><strong>{this.obtemResumo()}</strong></p>
                                                <Cartao cabecalho="Radar">
                                                    <MapaRadar
                                                        latitude={this.state.latitude}
                                                        longitude={this.state.longitude}
                                                        lugares={this.state.lugares}
                                                    />
                                                </Cartao>
                                                <div className="mt-3">
                                                    <ListaLugares lugares={this.state.lugares} />
                                                </div>
                                            </div>
                        }
                        </div>
                    </div>

                    <footer className="w-full text-center mt-4">
                        RolêRadar © {obterAno()}
                    </footer>
                </div>
            </div>
        )
    }
}