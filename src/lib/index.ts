import keyOrder from "../../keyOrder.json";

export enum TableCols {
    Letter,
    IPA,
    EnglishName,
    GreekName,
    Example,
}

export interface IpaData {
    ipa?: string,
    ipaAudio?: string,
    example?: string,
    exampleAudio?: string,
}

export interface ContextIpa extends IpaData {
    desc?: string,
}

export type ContextSensitiveRow = {
    contextSensitive: ContextIpa[]
};

export type Row = | ContextSensitiveRow | IpaData;

export interface Pronunciation {
    shortname: string,
    name: string[] | string,
    desc: string,
    pronunciation?: { [letter: string]: Row | undefined },
}

export type PronunciationData = {
    pronunciations: Pronunciation[]
};

let audioCache: Map<string, HTMLAudioElement> = new Map();

export function playIpa(row?: string) {
    if (!row) {
        return;
    }

    row = '/' + row;

    let audio = audioCache.get(row);
    if (!audio) {
        audio = new Audio(row);
        audioCache.set(row, audio);
    }

    audio.currentTime = 0;
    audio.play();
}

export function makeContextSensitiveRow(row: Row): ContextSensitiveRow {
    if ("contextSensitive" in row) {
        return row;
    }
    return {
        "contextSensitive": [
            row
        ]
    };
}

export function findCommonDenominatorRows(pronunciations: Pronunciation[]): Pronunciation[] {
    let letters = new Set<string>();
    for (let pronunciation of pronunciations) {
        if (!pronunciation.pronunciation) {
            pronunciation.pronunciation = {};
        }

        for (let letter in pronunciation.pronunciation) {
            letters.add(letter)
        }
    }

    for (let pronunciation of pronunciations) {
        for (let letter of letters) {
            if (!(letter in pronunciation.pronunciation!)) {
                pronunciation.pronunciation![letter] = {};
            }
        }
    }

    return pronunciations;
}

export function* pronunciationInOrder(pronunciation: Pronunciation): Generator<[string, Row]> {
    if (!pronunciation.pronunciation) {
        return;
    }

    for (let key of keyOrder.keyOrder) {
        if (key in pronunciation.pronunciation) {
            yield [key, pronunciation.pronunciation[key] as Row];
        }
    }
}