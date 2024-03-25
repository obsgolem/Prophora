<script>
    export let data;

    import Row from "$lib/Row.svelte";
</script>

<div class="w-1/2 pl-4 py-4 space-y-4">
    <div
        class="px-4 py-2 border text-pretty bg-sky-50 rounded border-slate-300"
    >
        <h2 class="text-2xl font-medium">{data.name[0]}</h2>
        {data.desc}
    </div>
    <table class="text-lg w-full table-fixed rounded-table border-slate-300">
        <thead class="bg-sky-200 shadow-2xl">
            <tr>
                <th class="text-center border-slate-300">Letter</th>
                <th class="text-center border-slate-300">IPA</th>
                <th class="text-center border-slate-300">Name (English)</th>
                <th class="text-center border-slate-300">Name (Greek)</th>
                <th class="text-center border-slate-300">Example Word</th>
            </tr>
        </thead>
        {#if data.pronunciation}
            {#each Object.entries(data.pronunciation) as [letter, elem]}
                <Row
                    {data}
                    {letter}
                    class="py-1 text-center border-slate-300 hover:bg-blue-200"
                    rowClass="even:bg-sky-50 odd:bg-sky-100"
                />
            {/each}
        {/if}
    </table>
</div>

<style lang="postcss">
    :global(.rounded-table) {
        @apply border-separate border-spacing-0;
    }

    :global(.rounded-table thead:first-child tr:first-child th) {
        @apply border-t;
    }

    :global(.rounded-table tr th, .rounded-table tr td) {
        @apply border-b border-r;
    }

    :global(
            .rounded-table tr th:first-child,
            .rounded-table tr td:first-child
        ) {
        @apply border-l;
    }

    /* top-left border-radius */
    :global(.rounded-table thead:first-child tr:first-child th:first-child) {
        @apply rounded-tl;
    }

    /* top-right border-radius */
    :global(.rounded-table thead:first-child tr:first-child th:last-child) {
        @apply rounded-tr;
    }

    /* bottom-left border-radius */
    :global(.rounded-table tbody:last-child tr:last-child td:first-child) {
        @apply rounded-bl;
    }

    /* bottom-right border-radius */
    :global(.rounded-table tbody:last-child tr:last-child td:last-child) {
        @apply rounded-br;
    }
</style>
