import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import express from 'express';

const supabaseUrl = 'https://tblbbfisfxqldcrtivsj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibGJiZmlzZnhxbGRjcnRpdnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MjA1MTEsImV4cCI6MjA0OTM5NjUxMX0.yayJofEn2C7zH86prXV2_pmiwuauewcfQdNQkOPNEoE"
const supabase = createClient(supabaseUrl, supabaseKey)


const app = express();
app.use(cors())
app.use(express.json())

app.post('/api/register', async (req, res) => {

    const { username, email, password } = req.body

    const { data: users, error } = await supabase.from("users").select("*").eq("email", email)

    if (error) {
        console.error("Error", error.message)
    }

    if (users.length > 0) {
        return res.status(200).json({ message: "already have account" })
    }

    const { data: user_create, error: create_error } = await supabase
        .from('users')
        .insert([
            { email: email, username: username, password: password },
        ])
        .select()


    return res.status(201).json({ message: "created the account" })
});


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body

    const { data: users, error } = await supabase.from("users").select("*").eq("email", email).eq("password", password)

    if (error) {
        console.error("Error", error.message)
    }

    if (users.length > 0) {
        return res.status(200).json({ message: "login success" })
    }

    return res.status(204).json({ message: "username or password invalid" })

})

app.post("/api/getdevice", async (req, res) => {
    const { room } = req.body

    const { data: users, error } = await supabase.from("devices").select("*").eq("room", room).order("id", { ascending: true })

    if (error) {
        console.error("Error", error.message)
    }

    if (users.length > 0) {
        return res.status(200).json({ message: "login success", data: users })
    }

    return res.status(204).json({ message: "username or password invalid" })
})


app.post("/api/enable", async (req, res) => {
    const { name } = req.body


    const { data, error } = await supabase
        .from('devices')
        .update({ name: name, enable: true })
        .eq("id", 3)
        .select()


})


app.post("/api/change", async (req, res) => {
    const { id, open } = req.body

    const { data, error } = await supabase
        .from('devices')
        .update({ open: !open })
        .eq("id", id)
        .select()

    console.log(req.body)
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


