import React from "react";
import { Component } from "react";
import { GEOAPIFY_KEY } from '../utils/chaves.js'
import { Button } from "primereact/button";

export default class MeuPonto extends Component {
    state = {
        agora: Date.now()
    }
    timer = null

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                agora: Date.now()
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        console.log("MeuPonto removido")
    }

    render() {
        return (
            <div>
                <img className="w-full" src={`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${this.props.longitude},${this.props.latitude}&zoom=16&marker=lonlat:${this.props.longitude},${this.props.latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`}
                alt="Mapa da sua localização" />
                <p>
                    {`Latitude: ${this.props.latitude.toFixed(4)} | Longitude: ${this.props.longitude.toFixed(4)}`}
                </p>
                <p>
                    {
                        this.props.latitude < 0 ?
                        'Hemisfério Sul'
                        :
                        'Hemisfério Norte'
                    }
                </p>
                <p>
                    {`Localização obtida há ${Math.floor((this.state.agora - this.props.horarioLocalizacao) / 1000)}s`}
                </p>
                <Button onClick={this.props.onAtualizar}>
                    Atualizar localização
                </Button>
            </div>
        )
    }
}