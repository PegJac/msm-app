import { AdminTitles } from "./AdminTitles"
import { AdminMessages } from "./AdminMessages"
import { useState } from "react"
import { ToggleButton, ToggleButtonGroup, Fab } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const Admin = () => {

    const [tab, setTab] = useState<string>("titles")

    const changeTab = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        if (value) {
            return setTab(value)
        }
    }

    const navigate = useNavigate()

    return (
        <div className="adminContainer">
            <h1>Admin</h1>
            <ToggleButtonGroup
                color="primary"
                value={tab}
                exclusive
                onChange={changeTab}>
                <ToggleButton value="titles">Titles</ToggleButton>
                <ToggleButton value="messages">Messages</ToggleButton>
            </ToggleButtonGroup>
            {tab === "titles" ? <AdminTitles /> : <AdminMessages />}
            <Fab href="/admin/add">add</Fab>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}