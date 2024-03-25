<script>
    export let data;

    import Row from "$lib/Row.svelte";
</script>

<div class="w-1/2 pl-4 pt-4 space-y-1">
    <div class="px-4 border text-pretty">
        <h2 class="text-2xl font-medium">{data.name[0]}</h2>
        {data.desc}
    </div>
    <table
        class="text-lg w-full table-fixed border-collapse border border-slate-500"
    >
        <thead>
            <tr>
                <th class="text-center border border-slate-600">Letter</th>
                <th class="text-center border border-slate-600">IPA</th>
                <th class="text-center border border-slate-600"
                    >Name (English)</th
                >
                <th class="text-center border border-slate-600">Name (Greek)</th
                >
                <th class="text-center border border-slate-600">Example Word</th
                >
            </tr>
        </thead>
        <tbody>
            {#if data.pronunciation}
                {#each Object.entries(data.pronunciation) as [letter, elem]}
                    <Row
                        {data}
                        {letter}
                        class="py-1 text-center border border-slate-600"
                    />
                {/each}
            {/if}
        </tbody>
    </table>
</div>
