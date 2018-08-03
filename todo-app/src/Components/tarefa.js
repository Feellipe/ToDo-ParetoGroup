import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { Draggable } from 'react-beautiful-dnd'; 

const Container = styled.div`
    margin: 8px;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    background-color: ${props => (props.isDragging ? '#6457C9' : 'white')};
`;

export default class Tarefa extends React.Component {
    render() {
        return(
            <Draggable draggableId={this.props.tarefa.id} index={this.props.index}>
                {(provided, snapshot) => (
                    
                        <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        isDragging={snapshot.isDragging} //Para saber se a Tarefa está sendo movida 
                        >
                            <h3 className="titulo-tarefa">{this.props.tarefa.content}</h3>
                            
                            <p>
                            {this.props.tarefa.description}
                            </p> 
                        </Container>
                    
                )}
            </Draggable>
        )   
    }
}