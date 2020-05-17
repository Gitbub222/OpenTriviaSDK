export declare enum ImageSize {
    ORIGINAL = "original",
    LARGE2X = "large2x",
    LARGE = "large",
    MEDIUM = "medium",
    SMALL = "small",
    PORTRAIT = "portrait",
    LANDSCAPE = "landscape",
    TINY = "tiny"
}
export interface QuestionImage {
    id: string;
    imagesize: ImageSize;
    src: string;
}
