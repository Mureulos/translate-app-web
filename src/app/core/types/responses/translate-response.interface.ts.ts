import { User } from "../user.interface";

export interface TranslationResponse {
    response: TranslationDetail;
}

export interface TranslationDetail {
    id: number;
    text: string;
    translationText: string;
    sourceLanguageId: number;
    sourceLanguage: Language;
    targetLanguageId: number;
    targetLanguage: Language;
    userId: number;
    user: User | null;
    characterCount: number;
    createdAt: string;
}

export interface Language {
    id: number;
    code: string;
    name: string;
    localizedName: string;
}