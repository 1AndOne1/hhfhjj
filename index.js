const sqlite3 = require("sqlite3")
const express = require("express")
const config = require("config")
const { abort } = require("process")

const app = express()
const port = config.get("PORT")



const db = new sqlite3.Database('test.db')

//employees(employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commision_pct, manager_id, departament_id)

db.serialize(async () => {
    db.run('CREATE TABLE IF NOT EXISTS employees(employee_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, email TEXT, phone_number INTEGER UNIQUE, hire_date TEXT, job_id INTEGER, salary INTEGER, commision_pct INTEGER, manager_id INTEGER, departament_id INTEGER)')
    app.listen(port, () => {
        console.log('server start at:' + port)
    })
})
app.get("/employees", async (req, res) => {
    const result = await db.all("SELECT * FROM employees")
    res.json(result)
    console.log(result)
})
app.get("/employees_id", async (req, res) => {
    const result = await db.all("SELECT employee_id FROM employees")
    res.json(result)
    console.log(result)
})
const start = async () => {
    app.use(express.json())
    app.post('/employeer_add', async (req, res) => {
        const {
            first_name, last_name, email, phone_number, hire_date, job_id, salary, commision_pct, manager_id, departament_id
        } = req.body
        await db.run('INSERT INTO employees(first_name, last_name, email, phone_number, hire_date, job_id, salary, commision_pct, manager_id, departament_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'), [first_name, last_name, email, phone_number, hire_date, job_id, salary, commision_pct, manager_id, departament_id], async function (err) {
            if (err) {
                return res.json({ message: "Error with adding employeer" })
            } else {
                return res.json(body)
            }
        }
    })
}

start()
