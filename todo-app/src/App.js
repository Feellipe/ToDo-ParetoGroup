import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd'; //Contexto que encapsula onde pode ser usado Drag&Drop(DnD)
import Coluna from './Components/coluna';
import AddNotes from './Components/addNotes';
import DataApp from './Components/data';
import Timer from './Components/stopwatch';


const tarefas = DataApp.tarefas;
const ordemColunas = DataApp.ordemColunas;
const colunas = DataApp.colunas;

class App extends React.Component {
	
	constructor(props) {
		super(props);
	
		this.state = { tarefas,
					   ordemColunas,
					   colunas,	
		}
	}
	
	//Recebe a Nova Tarefa do addNotes e modela o objeto para fazer o set do State  
	newTarefaSubmited = (criandoTarefa) => {
		
		const criandoTarefaName = criandoTarefa[0];
		const criandoTarefaDesc = criandoTarefa[1];
		const tarefaArr = Object.keys(this.state.tarefas);
		const tarefaN = 'tarefa-' + (tarefaArr.length + 1);
		console.log(tarefaN)
		const newTarefas =  {
			...this.state.tarefas,
			[tarefaN]:{id:tarefaN, content:criandoTarefaName, description: criandoTarefaDesc},
		};
		
		const newTarefaIds = Array.from(this.state.colunas["coluna-1"].tarefaIds);
			newTarefaIds.splice(0, 0, tarefaN);
		
		const newTarefaToDo = {
			...this.state.colunas,
			["coluna-1"]:{
				...this.state.colunas["coluna-1"],
				tarefaIds: newTarefaIds
			}
			 
		};
		
		console.log(newTarefaToDo);

		const newState = { //Mantem o State só adicionando a Tarefas nova e o TarefaId atualizado
			...this.state,			
				tarefas:{
					...newTarefas
				},
				colunas: {
					...newTarefaToDo,					 
					
				},
		};

		
		this.setState(newState);
		console.log(newState);
		return;

	};

	onDragEnd = result => {  //Persiste as mudanças feitas ao Arrastar a Tarefa
		
		
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const startColuna = this.state.colunas[source.droppableId];
		const finishColuna = this.state.colunas[destination.droppableId];

		if (startColuna === finishColuna) { //Se a coluna for igual a de origem, lida apenas com a reordem de tarefas
			const newTarefaIds = Array.from(startColuna.tarefaIds);
			newTarefaIds.splice(source.index, 1);
			newTarefaIds.splice(destination.index, 0, draggableId); //Adicionando o Id da Tarefa arrastada 

			const newColuna = {
				...startColuna,
				tarefaIds: newTarefaIds,
			};

			const newState = { //Mantemos o State só mudando as Colunas alteradas
				...this.state,
				colunas: {
					...this.state.colunas,
					[newColuna.id]: newColuna,
				},
			};

			this.setState(newState);
			return;
			
		}

		//Mover de uma coluna para a outra
		const startTarefaIds = Array.from(startColuna.tarefaIds);
		startTarefaIds.splice(source.index, 1);
		const newStart = {
			...startColuna,
			tarefaIds: startTarefaIds,
		};

		const finishTarefaIds = Array.from(finishColuna.tarefaIds);
		finishTarefaIds.splice(destination.index, 0, draggableId); //Insert do Id novo de Coluna
		const newFinish = {
			...finishColuna,
			tarefaIds: finishTarefaIds,
		};

		const newState = {
			...this.state,
			colunas: {
				...this.state.colunas,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};

		this.setState(newState);

	};


	render() {
		return (

			<DragDropContext onDragEnd={this.onDragEnd}>
				<div className="master-grid">
					{this.state.ordemColunas.map((colunaIds) => {
						const coluna = this.state.colunas[colunaIds];
						const tarefas = coluna.tarefaIds.map(tarefaId => this.state.tarefas[tarefaId]);

						return <Coluna 	className={ coluna.title }
										key={ coluna.id } 
										coluna={ coluna } 
										tarefas={ tarefas } />;
					})}
				</div>
				<AddNotes submitTarefa={this.newTarefaSubmited}>
				</AddNotes>
				<Timer />
			</DragDropContext>
			
		);
	}

}

export default App;
