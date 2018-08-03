import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class AddNotes extends React.Component {
    constructor(props){
        super(props);
            this.state = {
                open: false,
                newTarefaName: '',
                newTarefaDescription: '', 
            
              };
        }   

    //Handle da abertura do modal Nova Tarefa
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onDescInputChange(newTarefaDescription) {
      this.setState({newTarefaDescription});
};
  
  onNameInputChange(newTarefaName) {
    this.setState({newTarefaName});
};



//Submit que passa a prop com os States da nova tarefa para o App.js


  render() {
    return (
      <div className="div-add-notes">
        <Button 
            className="button-add-notes"
            variant="fab" 
            color="primary" 
            aria-label="Add" 
            onClick={this.handleClickOpen}
            >
            <AddIcon/>
            </Button>
        <Dialog 
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Nova Atividade </DialogTitle>
          <DialogContent className="add-notes-dialog">
            <DialogContentText>
              Título da sua atividade
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Título"
              type="text"
              fullWidth
              value= {this.state.newTarefaName}
              onChange= {event => this.onNameInputChange(event.target.value)}
            />

            <DialogContentText>
              Descreva aqui sua atividade
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Descrição"
              type="text"
              fullWidth
              value= {this.state.newTarefaValue}
              onChange= {event => this.onDescInputChange(event.target.value)}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onAddTarefa} color="primary">
              Adicionar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  //Callback para o Parent que leva as informações da nova Tarefa e limpa os states
  onAddTarefa = () => {
    const newTarefaObj = [this.state.newTarefaName, this.state.newTarefaDescription ]
    this.props.submitTarefa( newTarefaObj );
    this.setState({ open: false,
                    newTarefaName: '',
                    newTarefaDescription: ''
    });

 };

  
}