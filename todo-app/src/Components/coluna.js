import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd'; //Onde pode ser Dropado os items. Ele necessita de uma função que retorna um Cpn React
import Tarefa from './tarefa.js';
import DataApp from './data';

const Container = styled.div`
    width: 220px;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    flex:direction: column;
`;
const Title = styled.h3`
    padding: 8px;
    padding-left: 38%;
`;
//Map das tarefas
const ListaTarefas = styled.div` 
    padding: 0 8px;
    flex-grow: 1;
    height: 400px;
    overflow: auto;
    transition: background-color 0.3 ease;
    background-color: ${props => (props.isDraggingOver ? '#3ab8b0' : 'white')}
    border-top: ${props => (props.isDraggingOver ? '1px #d3d3d3 solid' : 'white')}

`;



export default class Coluna extends React.Component {

    
    render() {
        return (
            <Container className={"coluna " + this.props.coluna.title}>
                <Title>{this.props.coluna.title}</Title>
                <Droppable droppableId={this.props.coluna.id}>
                    {(provided, snapshot) =>(
                        <ListaTarefas
                            className="Lista"
                            innerRef={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver} //Prop indica se a tarefa está sendo arrastada em cima da Lista 
                            {...provided.droppableProps}
                        >
                            {this.props.tarefas.map((tarefa, index) => <Tarefa key={tarefa.id} tarefa={tarefa} index={index}/>)}
                            {provided.placeholder}
                        </ListaTarefas>
                    )}
                     
                </Droppable>
            </Container>
        )
    }

}