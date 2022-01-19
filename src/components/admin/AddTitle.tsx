import { Button, ButtonGroup, FormControlLabel, Radio, RadioGroup, TextField, Tooltip, Typography } from "@mui/material"
import { addDoc } from "firebase/firestore"
import { useState } from "react"
import { titleRef } from "../../firebase"
import { defaultTitle, ITitle } from "../../models/titles"

export const AddTitle = () => {
    const [title, setTitle] = useState<ITitle>(defaultTitle)

    const handleForm = (id: string, value: string) => {
        setTitle(prev => {
            return {
                ...prev,
                [id]: value
            }
        })
    }

    const handleSubmit = () => {
        if (title.titleSwedish && title.titleEnglish && title.imgUrl && title.category && title.descriptionSV && title.descriptionEN && title.category) {
            addDoc(titleRef, title)
            return setTitle(defaultTitle)
        }

        alert("Missing info")
    }

    return (
        <div className="addTitleContainer">
            <Typography variant="h4">Add title</Typography>
            <form id="form" aria-label="form">
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"Title Swedish"}
                    variant="outlined"
                    value={title.titleSwedish}
                    onChange={(e) => handleForm("titleSwedish", e.target.value)} />

                <TextField
                    margin="dense"
                    id="name"
                    label={"Title English"}
                    variant="outlined"
                    value={title.titleEnglish}
                    onChange={(e) => handleForm("titleEnglish", e.target.value)} />

                <TextField
                    margin="dense"
                    id="name"
                    label={"Image URL"}
                    variant="outlined"
                    value={title.imgUrl}
                    onChange={(e) => handleForm("imgUrl", e.target.value)} />

                <Tooltip placement="right" arrow title="Ex. tt4199034 (https://www.imdb.com/title/tt4199034/)">
                    <TextField
                        margin="dense"
                        id="name"
                        label={"ImDb ID"}
                        variant="outlined"
                        value={title.imDbId}
                        onChange={(e) => handleForm("imDbId", e.target.value)} />
                </Tooltip>

                <Tooltip placement="right" arrow title="Ex. 597928037 (https://vimeo.com/597928037)">
                    <TextField
                        margin="dense"
                        id="name"
                        label={"Vimeo URL"}
                        variant="outlined"
                        value={title.videoUrl}
                        onChange={(e) => handleForm("videoUrl", e.target.value)} />
                </Tooltip>

                <TextField
                    margin="dense"
                    id="name"
                    label={"Description Swedish"}
                    multiline
                    variant="outlined"
                    value={title.descriptionSV}
                    onChange={(e) => handleForm("descriptionSV", e.target.value)} />

                <TextField
                    margin="dense"
                    id="name"
                    label={"Description English"}
                    multiline
                    variant="outlined"
                    value={title.descriptionEN}
                    onChange={(e) => handleForm("descriptionEN", e.target.value)} />

                <RadioGroup className="radios" row aria-label="genre" name="row-radio-buttons-group" onChange={((e) => handleForm("category", e.target.value))}>
                    <FormControlLabel value="culture" control={<Radio />} label="Culture" />
                    <FormControlLabel value="science" control={<Radio />} label="Science & Tech" />
                    <FormControlLabel value="history" control={<Radio />} label="History" />
                </RadioGroup>

                <Button className="submitButton" type='button' variant="contained" onClick={handleSubmit}>Submit</Button>
                <Button className="submitButton" type='button' variant="contained" onClick={() => window.history.go(-1)}>Back</Button>
            </form>
        </div >
    )
}