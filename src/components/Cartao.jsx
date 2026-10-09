import { Card } from "primereact/card"

function Cartao(props) {
    return (
        <div className="border-1 border-round-lg p-3">
            <div className="text-sm text-500">
                {props.cabecalho}
            </div>
            <hr/>
            {props.children}
        </div>
    )
}

export default Cartao