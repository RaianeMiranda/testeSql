import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios, { Axios } from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        idEmail: props.idEmail,
        nome: props.nome,
        senha: props.senha,
    });

    const handleEditUsuario = () => {
        axios
            .put("http://localhost:3306/editUsuario", {
                idEmail: props.idEmail,
                nome: editValues.nome,
                senha: editValues.senha,
            })
            .then((response) => {
                console.log(response.data);
                if (props.setListCard) {
                    props.setListCard(
                        props.listCard.map((card) => {
                            if (card.idEmail === props.idEmail) {
                                return {
                                    ...card,
                                    nome: editValues.nome,
                                    senha: editValues.senha,
                                };
                            } else {
                                return card;
                            }
                        })
                    );
                }
                handleClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteUsuario = () => {
        axios.delete(`http://localhost:3306/delete/${editValues.idEmail}`).then(() => {
          if (props.setListCard && props.listCard) {
            props.setListCard(
              props.listCard.filter((value) => {
                return value.idEmail !== editValues.idEmail;
              })
            );
          }
          handleClose();
          window.location.reload(); // Reload the page
        });
      };
      

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = (event) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [event.target.id]: event.target.value,
        }));
    };

    return (
        <>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Editar</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="idEmail"
                        label="Email"
                        value={editValues.idEmail}
                        onChange={handleChangeValues}
                        type="email"
                        fullWidth
                        variant="standard"
                        disabled
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Nome"
                        value={editValues.nome}
                        onChange={handleChangeValues}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="senha"
                        label="Senha"
                        value={editValues.senha}
                        onChange={handleChangeValues}
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleDeleteUsuario}>Exlcuir</Button>
                    <Button onClick={handleEditUsuario}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
