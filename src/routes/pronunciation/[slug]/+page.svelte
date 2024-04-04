<script lang="ts">
    import { pronunciationInOrder, type Pronunciation } from "$lib";
    import CompareRow from "$lib/CompareRow.svelte";

    export let data: Pronunciation;
</script>

<svelte:head>
    <title>{data.name[0]}</title>
</svelte:head>

<div class="flex w-full justify-center">
    <div class="py-4 sm:space-y-4 md:w-[720px] group">
        <div
            class="px-4 py-2 border-t border-b md:border text-pretty bg-sky-50 md:rounded border-slate-300"
        >
            <h2 class="text-2xl font-medium">{data.name[0]}</h2>
            {data.desc}
        </div>

        <input
            class="hidden"
            type="radio"
            id="letter-pronunciations-menu"
            name="mobile-table-selector"
            checked
        />
        <input
            class="hidden"
            type="radio"
            id="letter-names-menu"
            name="mobile-table-selector"
        />

        <menu
            class="sm:hidden h-14 flex flex-row text-xl font-medium text-slate-600"
        >
            <li
                class="group-has-[#letter-pronunciations-menu:checked]:border-b-4 group-has-[#letter-pronunciations-menu:checked]:text-slate-950 border-slate-300 flex-1 h-full"
            >
                <label
                    class="w-full h-full flex items-center justify-center"
                    for="letter-pronunciations-menu"
                    >Letter Pronunciations</label
                >
            </li>
            <li
                class="group-has-[#letter-names-menu:checked]:border-b-4 group-has-[#letter-names-menu:checked]:text-slate-950 border-slate-300 flex-1 h-full"
            >
                <label
                    class="w-full h-full flex items-center justify-center"
                    for="letter-names-menu">Letter Names</label
                >
            </li>
        </menu>

        <table
            class="h-fit text-lg table-fixed w-full md:w-[720px] rounded-table border-slate-300"
        >
            <thead class="bg-sky-200">
                <tr>
                    <th class="p-1 md:w-36 text-center border-slate-300"
                        >Letter</th
                    >
                    <th
                        class="p-1 md:w-36 text-center border-slate-300 max-sm:group-has-[#letter-names-menu:checked]:hidden"
                        >IPA</th
                    >
                    <th
                        class="p-1 md:w-36 text-center border-slate-300 max-sm:group-has-[#letter-pronunciations-menu:checked]:hidden"
                        >Name (English)</th
                    >
                    <th
                        class="p-1 md:w-36 text-center border-slate-300 max-sm:group-has-[#letter-pronunciations-menu:checked]:hidden"
                        >Name (Greek)</th
                    >
                    <th
                        class="p-1 md:w-36 text-center border-slate-300 max-sm:group-has-[#letter-names-menu:checked]:hidden"
                        >Example Word</th
                    >
                </tr>
            </thead>
            {#each pronunciationInOrder(data) as [letter, _]}
                <CompareRow
                    data={[data]}
                    {letter}
                    cellClass="font-semibold border-slate-300 hover:bg-blue-200 active:bg-sky-300"
                    rowClass="even:bg-sky-50 odd:bg-sky-100"
                    buttonClass="p-1 w-full h-full"
                    nonButtonClass="p-1 w-full h-full flex justify-center items-center text-center"
                    englishCellClass="max-sm:group-has-[#letter-pronunciations-menu:checked]:hidden"
                    greekCellClass="max-sm:group-has-[#letter-pronunciations-menu:checked]:hidden"
                    ipaCellClass="max-sm:group-has-[#letter-names-menu:checked]:hidden"
                    exampleCellClass="max-sm:group-has-[#letter-names-menu:checked]:hidden"
                />
            {/each}
        </table>
    </div>
</div>
