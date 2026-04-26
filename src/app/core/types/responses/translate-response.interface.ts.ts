
export interface TranslationResponse {
    translation: TranslationDetail;
}

export interface TranslationDetail {
    id: number;
    text: string;
    translation: string;
    sourceLanguage: Language;
    targetLanguage: Language;
    characterCount: number;
    createdAt: string;
}

export interface Language {
    id: number;
    code: string;
    name: string;
    localizedName: string;
}