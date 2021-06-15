const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'perntodo',
    password: 'samar123',
    port: 5432,
});

module.exports = {
    /**
     * GET TODO LIST
     * 
     */
    getTodos: (request, response) => {
        pool.query('SELECT * FROM todo', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    },

    getTodosV2: async (request, response) => {
        try {
            const allTodos = await pool.query("SELECT * FROM todo");
            response.status(200).json(allTodos.rows)
        } catch (err) {
            console.error(err.message);
            response.status(500).json(err.message)
        }
    },

    getTodoById: async (request, response) => {
        try {
            const { id } = request.params;
            const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
                id
            ]);
            response.status(200).json(todo.rows)
        } catch (err) {
            console.error(err.message);
            response.status(500).json(err.message)
        }
    },

    /**
     * POST TODO LIST
     */
    createTodo: async (request, response) => {
        try {
            const { description } = request.body;
            const newTodo = await pool.query(
                "INSERT INTO todo (description) VALUES($1) RETURNING *",
                [description]
            );
            response.status(200).json(newTodo.rows[0])
        } catch (err) {
            console.error(err.message);
            response.status(500).json(err.message)
        }
    },

    updateTodo: async (request, response) => {
        try {
            const { id } = request.params;
            const { description } = request.body;
            const updateTodo = await pool.query(
                "UPDATE todo SET description = $1 WHERE todo_id = $2",
                [description, id]
            );
            response.status(200).json(updateTodo);
        } catch (err) {
            console.error(err.message);
            response.status(500).json(err.message);
        }
    },

    /**
     * DELETE A TODO LIST
     * 
     */
    deleteTodo: async (request, response) => {
        try {
            const { id } = request.params;
            const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
                id
            ]);
            response.status(200).json(deleteTodo);
        } catch (err) {
            console.error(err.message);
            response.status(500).json(err.message);
        }
    },


}

