
import { error } from "@sveltejs/kit";
import jsonData from "../../../../data.json";
import letterMap from '../../../../letterMap.json';

export function load({ params }) {
    const pronunciation = jsonData.pronunciations.find((pro) => pro.shortname === params.slug);

    let len = pronunciation?.name?.length ?? 0;
    if (!pronunciation || len === 0) {
        throw error(404);
    }

    return { ...pronunciation, letterMap: letterMap };
}