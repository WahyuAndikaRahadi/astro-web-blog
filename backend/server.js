const express = require("express")
const supabase = require("@supabase/supabase-js")

const app = express()
const port = 3001 || process.env.PORT
app.use(express.json())

const supabase_url = "https://iwuxwaqxtqemqohseixx.supabase.co"
const supabase_service_role = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3dXh3YXF4dHFlbXFvaHNlaXh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjA2MzU2NiwiZXhwIjoyMDI3NjM5NTY2fQ.Ro--gyGQnQ5pcaDcujTb3HqmUyqlfsxi89VgdMZ11hc"

const db = supabase.createClient(supabase_url, supabase_service_role)

app.get("/", async (req,res) => {
    const getBlog = await db.from("blog").select()
    res.json({getBlog})

})

app.post("/", async (req,res) => {
    const {title, description, type} = req.body
    const createPost = await db.from("blog").insert({title, description, type})
    console.log("🚀~ app.post ~ createPost:", createPost)
    res.send("OK")
})

app.delete("/:id", async (req,res) => {
    const {error} = await db.from("blog").delete().eq('id', req.params.id)
    if (error) {
        res.send(error)
    
    }
    res.send("deleted")
})

app.listen(port, () => {
    console.log("Server running on port", port)
})