<script lang="ts">
    import { page } from "$app/stores";

    const letterMap = $page.data.letterMap;

    export let data;
    export let letter: string;

    let cclass: string;
    export { cclass as class };

    let nameData = letterMap[letter];
    let letterData = data.pronunciation[letter];
</script>

{#if Array.isArray(letterData.ipa)}
    <tr>
        <td rowspan={letterData.ipa.length} class={cclass}>
            {letter}
        </td>
        <td title={letterData.ipa[0].desc} class={cclass}>
            {letterData.ipa[0].value}
        </td>
        {#if nameData}
            <td rowspan={letterData.ipa.length} class={cclass}>
                {nameData.english}
            </td>
            <td rowspan={letterData.ipa.length} class={cclass}>
                {nameData.greek}
            </td>
        {:else}
            <td rowspan={letterData.ipa.length} class={cclass}></td>
            <td rowspan={letterData.ipa.length} class={cclass}></td>
        {/if}
        <td rowspan={letterData.ipa.length} class={cclass}></td>
    </tr>
    {#each letterData.ipa.slice(1) as ipa}
        <tr>
            <td title={ipa.desc} class={cclass}>
                {ipa.value}
            </td>
        </tr>
    {/each}
{:else}
    <tr>
        <td class={cclass}>{letter}</td>
        <td class={cclass}>{letterData.ipa}</td>
        {#if nameData}
            <td class={cclass}>{nameData.english}</td>
            <td class={cclass}>{nameData.greek}</td>
        {:else}
            <td class={cclass}></td>
            <td class={cclass}></td>
        {/if}
        <td class={cclass}></td>
    </tr>
{/if}
