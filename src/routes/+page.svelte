<script lang="ts">
    import {
        findCommonDenominatorRows,
        pronunciationInOrder,
        type Pronunciation,
        TableCols,
    } from "$lib";
    import CompareRow from "$lib/CompareRow.svelte";

    export let data;

    let pronunciations: Pronunciation[] = findCommonDenominatorRows(
        data.pronunciations,
    );
</script>

<svelte:head>
    <title>ΠΡΟΦΟΡΑΙ ΕΛΛΗΝΙΚΑΙ</title>
</svelte:head>

<ul class="md:hidden flex flex-col w-full py-14">
    {#each pronunciations as pro}
        <li class="active:bg-sky-300 bg-sky-50 h-14 border-slate-300 border-b">
            <a
                class="flex justify-center items-center h-full w-full"
                href="/pronunciation/{pro.shortname}">{pro.name[0]}</a
            >
        </li>
    {/each}
</ul>

<div
    class="py-20 max-md:hidden flex w-full h-full"
    style="justify-content: safe center"
>
    <table class="w-1 h-fit text-lg table-fixed rounded-table border-slate-300">
        <thead>
            <tr class="sticky z-10 top-14">
                <th
                    class="sticky left-0 bg-sky-200 p-1 w-36 text-center border-slate-300"
                    >Letter</th
                >
                {#each pronunciations as pro}
                    <th class="w-36 text-center border-slate-300 bg-sky-200"
                        ><a
                            class="p-1 flex justify-center items-center h-full w-full"
                            href="/pronunciation/{pro.shortname}"
                            >{pro.name[0]}</a
                        ></th
                    >
                {/each}
            </tr>
        </thead>
        {#each Array.from(pronunciationInOrder(pronunciations[0])).entries() as [index, [letter, _]]}
            <CompareRow
                data={pronunciations}
                {letter}
                cellClass="font-semibold border-slate-300 hover:bg-blue-200 active:bg-sky-300"
                rowClass="even:bg-sky-50 odd:bg-sky-100"
                buttonClass="p-1 w-full h-full select-text"
                nonButtonClass="p-1 w-full h-full flex justify-center items-center text-center"
                englishCellClass=""
                greekCellClass=""
                ipaCellClass="font-ipa"
                exampleCellClass=""
                letterCellClass="sticky left-0 {index % 2 === 0
                    ? 'bg-sky-50'
                    : 'odd:bg-sky-100'}"
                enabledColumns={[TableCols.Letter, TableCols.IPA]}
            />
        {/each}
    </table>
</div>
