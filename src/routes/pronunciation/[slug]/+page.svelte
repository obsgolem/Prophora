<script>
    export let data;

    import Row from "$lib/Row.svelte";
</script>

<div class="flex w-full justify-center">
    <div class="md:pl-4 py-4 space-y-4 md:w-[720px]">
        <div
            class="px-4 py-2 border-t border-b md:border text-pretty bg-sky-50 md:rounded border-slate-300"
        >
            <h2 class="text-2xl font-medium">{data.name[0]}</h2>
            {data.desc}
        </div>
        <table class="text-lg table-fixed rounded-table border-slate-300">
            <thead class="bg-sky-200 shadow-2xl">
                <tr>
                    <th class="p-1 w-36 text-center border-slate-300">Letter</th
                    >
                    <th class="p-1 w-36 text-center border-slate-300">IPA</th>
                    <th
                        class="p-1 w-36 text-center border-slate-300 md:table-cell hidden"
                        >Name (English)</th
                    >
                    <th
                        class="p-1 w-36 text-center border-slate-300 md:table-cell hidden"
                        >Name (Greek)</th
                    >
                    <th class="p-1 w-36 text-center border-slate-300"
                        >Example Word</th
                    >
                </tr>
            </thead>
            {#if data.pronunciation}
                {#each Object.entries(data.pronunciation) as [letter, elem]}
                    <Row
                        {data}
                        {letter}
                        class="p-1 text-center border-slate-300 hover:bg-blue-200"
                        rowClass="even:bg-sky-50 odd:bg-sky-100"
                    />
                {/each}
            {/if}
        </table>
    </div>
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
            .rounded-table thead tr:first-child th:first-child,
            .rounded-table tbody tr:first-child td:first-child
        ) {
        @apply md:border-l;
    }

    /* top-left border-radius */
    :global(.rounded-table thead:first-child tr:first-child th:first-child) {
        @apply md:rounded-tl;
    }

    /* top-right border-radius */
    :global(.rounded-table thead:first-child tr:first-child th:last-child) {
        @apply md:rounded-tr;
    }

    /* bottom-left border-radius */
    :global(.rounded-table tbody:last-child tr:last-child td:first-child) {
        @apply md:rounded-bl;
    }

    /* bottom-right border-radius */
    :global(.rounded-table tbody:last-child tr:last-child td:last-child) {
        @apply md:rounded-br;
    }
</style>
