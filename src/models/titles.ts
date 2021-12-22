import digital from '../assets/thumbnails/var-digitala-planet.jpg';
import automation from '../assets/thumbnails/automation.jpg';
import mobile from '../assets/thumbnails/mobila-revolutionen.jpg';
import humanity from '../assets/thumbnails/humanity.jpg';
import buildings from '../assets/thumbnails/buildings.jpg';
import sport from '../assets/thumbnails/sport.jpg';
import film from '../assets/thumbnails/film.jpg';
import tv from '../assets/thumbnails/tv.jpg';
import music from '../assets/thumbnails/music.jpg';
import same from '../assets/thumbnails/same.jpg';
import science from '../assets/thumbnails/pics-science.jpg';
import homo from '../assets/thumbnails/homo.jpg';


export interface ITitle {
    imgUrl: string;
    titleSwedish: string;
    titleEnglish: string;
    videoUrl: string;
    category: string;
    description: string;
}

export const titles: ITitle[] = [
    { imgUrl: digital, titleSwedish: "Vår Digitala Planet", titleEnglish: "Digital Planet", videoUrl: "597926310", category: "science", description: "" },
    { imgUrl: automation, titleSwedish: "Den Automatiserade Framtiden", titleEnglish: "Automation and the Future of Jobs", videoUrl: "597927557", category: "science", description: "" },
    { imgUrl: mobile, titleSwedish: "Den Mobila Revolutionen", titleEnglish: "The mobile revolution", videoUrl: "597928037", category: "science", description: "" },
    { imgUrl: humanity, titleSwedish: "Mänsklighetens sista dagar", titleEnglish: "Last days of Man/10 ways to end the world", videoUrl: "597928705", category: "science", description: "" },
    { imgUrl: buildings, titleSwedish: "Byggnaderna som förändrade staden", titleEnglish: "", videoUrl: "597887741", category: "culture", description: "" },
    { imgUrl: sport, titleSwedish: "Ögonblicken som förändrade sporten", titleEnglish: "", videoUrl: "597888719", category: "culture", description: "" },
    { imgUrl: film, titleSwedish: "Scenerna som förändrade filmen", titleEnglish: "", videoUrl: "597889401", category: "culture", description: "" },
    { imgUrl: tv, titleSwedish: "Programmen som förändrade TV", titleEnglish: "", videoUrl: "597890653", category: "culture", description: "" },
    { imgUrl: music, titleSwedish: "Låtarna som förändrade musiken", titleEnglish: "", videoUrl: "597893641", category: "culture", description: "" },
    { imgUrl: same, titleSwedish: "Samernas tid", titleEnglish: "Laponia - The age of the Sami", videoUrl: "597759068", category: "history", description: "" },
    { imgUrl: science, titleSwedish: "Bilderna som förändrade vetenskapen", titleEnglish: "Shocking Exposures", videoUrl: "597742203 ", category: "history", description: "" },
    { imgUrl: homo, titleSwedish: "På resa med Homo Sapiens", titleEnglish: "On the road with Homo Sapiens", videoUrl: "597756310 ", category: "history", description: "" }
]