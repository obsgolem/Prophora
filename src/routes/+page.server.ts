
import jsonData from "../../data.json";
import letterMap from '../../letterMap.json';

export function load() {
    return { ...jsonData, letterMap: letterMap };
}