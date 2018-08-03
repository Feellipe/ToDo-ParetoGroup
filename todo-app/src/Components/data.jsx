const DataApp = {
    tarefas: {
        'tarefa-1': {id: 'tarefa-1', content: 'Pesquisar planos DS', description: 'Planos estão em Scarif'},
        'tarefa-2': {id: 'tarefa-2', content: 'Encontrar falha de segurança', description: 'Something'},
        'tarefa-3': {id: 'tarefa-3', content: 'Ataque R. a DS', description: 'Something something'},
        'tarefa-4': {id: 'tarefa-4', content: 'Use the Force Luke', description: ''},
    },
    colunas: {
        'coluna-1' : {
            id: 'coluna-1',
            title: 'ToDo',
            'tarefaIds' : ['tarefa-1', 'tarefa-2', 'tarefa-3', 'tarefa-4'] // Track de onde estão as tarefas e em que ordem
        },
        'coluna-2' : {
            id: 'coluna-2',
            title: 'Doing',
            'tarefaIds' : [], 
        },
        'coluna-3' : {
            id: 'coluna-3',
            title: 'Done',
            'tarefaIds' : [], 
        },
    },
    ordemColunas: ['coluna-1', 'coluna-2', 'coluna-3'] // Ordem das colunas
};

export default DataApp;