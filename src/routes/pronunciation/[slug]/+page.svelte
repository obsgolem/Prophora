<script>
    export let data;

    import Row from "$lib/Row.svelte";
</script>

<h2>{data.name[0]}</h2>

{data.desc}

<table>
    <tr>
        <th>Letter</th>
        <th>IPA</th>
        <th>Name (English)</th>
        <th>Name (Greek)</th>
        <th>Example Word</th>
    </tr>
    {#if data.pronunciation}
        {#each Object.entries(data.pronunciation) as [letter, elem]}
            <Row {data} {letter} />
        {/each}
    {/if}
</table>
