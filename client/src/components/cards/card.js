import React from "react";
import "./card.css";

export default function Card(props) {
return <div className="card-container">

<h1 className="card-title">{props.idEmail}</h1>
<p className="card-cost">{props.nome}</p>
<p className="category">{props.senha}</p>

</div>
}
