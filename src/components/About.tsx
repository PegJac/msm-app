import { Button, Typography } from "@mui/material"

export const About = () => {
    return (
        <div className="aboutContainer">
            <div className="firstSection">
                <img src="https://media-exp1.licdn.com/dms/image/C5103AQGmXL1iQ2b0OA/profile-displayphoto-shrink_800_800/0/1517235139683?e=1646870400&v=beta&t=QszHY-zugOMOhgphIO8GAgM9k1GMGUxwBGV92JOo0S4" alt="Magnus Sjöström" />
                <div className="introduction">
                    <Typography variant='h6'>Magnus Sjöström</Typography>
                    <Typography variant="body1">
                        Director, writer and producer of thought provoking documentaries and factual series.
                        Vivid visual storytelling. Captivating characters and cases.
                    </Typography>
                </div>
            </div>
        </div>
    )
}