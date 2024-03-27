<script lang="ts">
    import { page } from "$app/stores";

    const letterMap = $page.data.letterMap;

    export let data;
    export let letter: string;

    let cclass: string;
    export { cclass as class };

    export let rowClass: string;

    let nameData = letterMap[letter];
    let letterData = data.pronunciation[letter];
</script>

<tbody class={rowClass}>
    {#if letterData.contextSensitive}
        <tr>
            <td rowspan={letterData.contextSensitive.length} class={cclass}>
                {letter}
            </td>
            <td title={letterData.contextSensitive[0].desc} class={cclass}>
                {letterData.contextSensitive[0].ipa}
            </td>
            {#if nameData}
                <td
                    rowspan={letterData.contextSensitive.length}
                    class="hidden sm:table-cell {cclass}"
                >
                    {nameData.english}
                </td>
                <td
                    rowspan={letterData.contextSensitive.length}
                    class="hidden sm:table-cell {cclass}"
                >
                    {nameData.greek}
                </td>
            {:else}
                <td
                    rowspan={letterData.contextSensitive.length}
                    class="hidden sm:table-cell {cclass}"
                ></td>
                <td
                    rowspan={letterData.contextSensitive.length}
                    class="hidden sm:table-cell {cclass}"
                ></td>
            {/if}
            <td class={cclass}>
                {letterData.contextSensitive[0].example
                    ? letterData.contextSensitive[0].example
                    : ""}
            </td>
        </tr>
        {#each letterData.contextSensitive.slice(1) as item}
            <tr>
                <td title={item.desc} class={cclass}>
                    {item.ipa}
                </td>
                <td class={cclass}>
                    {item.example ? item.example : ""}
                </td>
            </tr>
        {/each}
    {:else}
        <tr>
            <td class={cclass}>{letter}</td>
            <td class={cclass}>{letterData.ipa}</td>
            {#if nameData}
                <td class="hidden sm:table-cell {cclass}">{nameData.english}</td
                >
                <td class="hidden sm:table-cell {cclass}">{nameData.greek}</td>
            {:else}
                <td class="hidden sm:table-cell {cclass}"></td>
                <td class="hidden sm:table-cell {cclass}"></td>
            {/if}
            <td class={cclass}
                >{letterData.example ? letterData.example : ""}</td
            >
        </tr>
    {/if}
</tbody>
