import React, { Component } from "react"
import Cartao from "./Cartao"
import Creditos from "./Creditos"
import Loading from "./Loading"
import MeuPonto from "./MeuPonto"
import geoapifyClient from "../utils/geoapifyClient"
import Busca from "./Busca"
import ListaLugares from "./ListaLugares"

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
        lugares: null
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
        try {
            const result = await geoapifyClient.get("/places", {
                params: {
                    categories: categoria,
                    filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
                    bias: `proximity:${this.state.longitude},${this.state.latitude}`,
                    limit: 20
                }
            })
            this.setState({ lugares: result.data.features })
            console.log({ lugares: result.data.features })
        } catch(erro) {
            "Nenhum lugar encontrado",
            erro.response?.data || erro.message
        }
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
                            !this.state.lugares ?
                                null
                                :
                                this.state.lugares.length < 1 ?
                                    <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
                                    :
                                    <ListaLugares lugares={this.state.lugares} />
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