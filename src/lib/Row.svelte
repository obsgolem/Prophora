<script lang="ts">
    import { page } from "$app/stores";

    const letterMap = $page.data.letterMap;

    export let data;
    export let letter: string;

    let nameData = letterMap[letter];
    let letterData = data.pronunciation[letter];
</script>

{#if Array.isArray(letterData.ipa)}
    <tr>
        <td rowspan={letterData.ipa.length}>{letter}</td>
        <td title={letterData.ipa[0].desc}>{letterData.ipa[0].value}</td>
        {#if nameData}
            <td rowspan={letterData.ipa.length}>{nameData.english}</td>
            <td rowspan={letterData.ipa.length}>{nameData.greek}</td>
        {/if}
    </tr>
    {#each letterData.ipa.slice(1) as ipa}
        <tr>
            <td title={ipa.desc}>{ipa.value}</td>
        </tr>
    {/each}
{:else}
    <tr>
        <td>{letter}</td>
        <td>{letterData.ipa}</td>
        {#if nameData}
            <td>{nameData.english}</td>
            <td>{nameData.greek}</td>
        {/if}
    </tr>
{/if}
