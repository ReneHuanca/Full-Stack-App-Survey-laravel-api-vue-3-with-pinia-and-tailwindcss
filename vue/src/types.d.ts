export interface User {
    name?: string
    email: string
    password: string
    password_confirmation?: string
}

export interface Survey {
    id: number | undefined;
    title: string;
    slug: string;
    status: string;
    description: string;
    image: string | undefined;
    created_at: string;
    updated_at: string;
    expire_date: string | null;
    questions: Question[] | undefined | never[]
}

export interface Question {
    id: number;
    type: string;
    question: string;
    description: string | null;
    data: {
        options: Option[]
    } | Object
}

export interface Option {
    uuid: string;
    text: string
}