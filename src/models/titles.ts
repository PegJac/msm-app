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
    id: string;
    titleSwedish: string;
    titleEnglish: string;
    videoUrl: string;
    category: string;
    descriptionSV: string;
    descriptionEN: string;
    imDbId: string;
}

export const defaultTitle: ITitle = {
    imgUrl: "",
    id: "",
    titleSwedish: "",
    titleEnglish: "",
    videoUrl: "",
    category: "",
    descriptionSV: "",
    descriptionEN: "",
    imDbId: ""
}