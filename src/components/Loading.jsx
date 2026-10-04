import React, { Component } from "react";

export default class Loading extends Component {
    render() {
        return (
            <div className='d-flex flex-column justify-content-center align-items-center border rounded p-3'>
                <div
                    className="spinner-border text-primary"
                    style={{ width: '2rem', height: '2rem' }}
                    role='status'>
                    <span className='visually-hidden'>Carregando...</span>
                </div>
                <p className="mt-2 text primary">{this.props.mensagem} </p>
            </div>
        )
    }
}

Loading.defaultProps = {
    mensagem: "Carregando..."
}