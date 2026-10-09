import React from "react";
import { Component } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const categorias = [
    { rotulo: 'Cafés', chave: 'catering.cafe' },
    { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
    { rotulo: 'Parques', chave: 'leisure.park' },
    { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
    { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
    { rotulo: 'Museus', chave: 'entertainment.museum' }
]

export default class Busca extends Component {
    state = {
        categoria: null,
        raio: '1000',
        erro: null
    }

    onRaioAlterado = (evento) => {
        this.setState({ raio: evento.target.value })
    }

    onFormSubmit = (evento) => {
        evento.preventDefault()
        const raio = Number(this.state.raio)
        if (!this.state.categoria) {
            this.setState({ erro: 'Escolha uma categoria' })
        } else if (!Number.isInteger(raio) || raio < 100 || raio > 5000) {
            this.setState({ erro: 'Informe um raio inteiro entre 100 e 5000 metros.' })
        } else {
            this.setState({ erro: null })
            this.props.onBuscaRealizada(this.state.categoria, raio)
        }
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="flex flex-column">
                    <div>
                        {
                            categorias.map((categoria) => {
                                return (
                                    <Button
                                        key={categoria.chave}
                                        type="button"
                                        className='mr-2 mt-2'
                                        variant={this.state.categoria === categoria.chave ? undefined : "outlined"}
                                        onClick={() => this.setState({ categoria: categoria.chave })}>
                                        {categoria.rotulo}
                                    </Button>
                                )
                            })
                        }
                    </div>
                    <InputText
                        value={this.state.raio}
                        onChange={this.onRaioAlterado}
                        className="w-full mt-3"
                        placeholder={this.props.dica}
                    />
                    <Button type="submit" className='mt-3'>
                        Buscar
                    </Button>
                    {
                        this.state.erro && (
                            <p style={{ color: 'red' }}>
                                {this.state.erro}
                            </p>
                        )
                    }
                </div>
            </form>
        )
    }
}

Busca.defaultProps = {
    dica: 'Raio em metros (100 a 5000)'
}