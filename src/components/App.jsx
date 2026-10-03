import React from "react";

const estiloSubtitulo = {
    color: '#0c4707',
    fontSize: '20px',
}

const obterAno = () => {
    return new Date().getFullYear()
}

function App() {

    return (
        <div>
            <h1 className="titulo">RolêRadar</h1>
            <p style={estiloSubtitulo}>
                Descubra o que existe perto de você
            </p>
            <footer>
                RolêRadar © {obterAno()}
            </footer>
        </div>
    )
}

export default App