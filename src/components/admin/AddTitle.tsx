import { Button, ButtonGroup, Tooltip } from "@mui/material"
import { addDoc } from "firebase/firestore"
import { useState } from "react"
import { titleRef } from "../../firebase"
import { defaultTitle, ITitle } from "../../models/titles"

export const AddTitle = () => {
    const [title, setTitle] = useState<ITitle>(defaultTitle)

    const handleForm = (id: string, value: string) => {
        console.log(id, value)

        setTitle(prev => {
            return {
                ...prev,
                [id]: value
            }
        })
    }

    const handleSubmit = () => {
        addDoc(titleRef, title)
        setTitle(defaultTitle)
    }

    return (
        <div className="addTitleContainer">
            <h3>Add title</h3>
            <form id="form">
                <label htmlFor="titleSwedish">Title Swedish</label>
                <input type="text" id="titleSwedish" value={title.titleSwedish} onChange={(e) => handleForm("titleSwedish", e.target.value)} />

                <label htmlFor="titleEnglish">Title English</label>
                <input type="text" id="titleEnglish" value={title.titleEnglish} onChange={(e) => handleForm("titleEnglish", e.target.value)} />

                <label htmlFor="imgUrl">Image URL</label>
                <input type="text" id="imgUrl" value={title.imgUrl} onChange={(e) => handleForm("imgUrl", e.target.value)} />

                <Tooltip placement="top" arrow title="Ex. 597928037 (https://vimeo.com/597928037)">
                    <label htmlFor="videoUrl">Video URL</label>
                </Tooltip>
                <input type="text" id="videoUrl" value={title.videoUrl} onChange={(e) => handleForm("videoUrl", e.target.value)} />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" value={title.description} onChange={(e) => handleForm("description", e.target.value)} />

                <label htmlFor="category">Genre</label>

                <br />
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={() => handleForm("category", "culture")}>Culture</Button>
                    <Button onClick={() => handleForm("category", "science")}>Science & Tech</Button>
                    <Button onClick={() => handleForm("category", "history")}>History</Button>
                </ButtonGroup>
                <br />
                <button type='button' onClick={handleSubmit}>Send</button>
            </form>

            title.titleSwedish: {title.titleSwedish}
            <br />
            title.titleEnglish: {title.titleEnglish}
            <br />
            title.imgUrl: {title.imgUrl}
            <br />
            title.videoUrl: {title.videoUrl}
            <br />
            title.category: {title.category}
            <br />
            title.description: {title.description}
        </div>
    )
}