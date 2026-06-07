
export interface SaveTranslationResponse {
    response: SaveTranslationDetail;
}

export interface SaveTranslationDetail {
    id: number;
    text: string;
    translationText: string;
    userId: number;
    createdAt: string;
}
