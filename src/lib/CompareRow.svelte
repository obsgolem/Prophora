<script lang="ts">
    import { page } from "$app/stores";
    import {
        playIpa,
        TableCols,
        type Pronunciation,
        makeContextSensitiveRow,
    } from "$lib";
    import { error } from "@sveltejs/kit";

    const letterMap = $page.data.letterMap;

    export let data: Pronunciation[];
    export let letter: string;
    export let cellClass: string;
    export let rowClass: string;
    export let buttonClass: string;
    export let nonButtonClass: string;
    export let letterCellClass: string = "";
    export let ipaCellClass: string = "";
    export let englishCellClass: string = "";
    export let greekCellClass: string = "";
    export let exampleCellClass: string = "";
    export let enabledColumns: TableCols[] = [
        TableCols.Letter,
        TableCols.IPA,
        TableCols.EnglishName,
        TableCols.GreekName,
        TableCols.Example,
    ];

    let nameData = letterMap[letter] ?? {};

    let letterDatas = data.map((i) =>
        makeContextSensitiveRow(i.pronunciation?.[letter]!),
    );
    let rowSpans = letterDatas.map((i) => i.contextSensitive.length);
    let rowspan = rowSpans.reduce((a, b) => Math.max(a, b), 1);
    if (rowspan > 2) {
        throw error(
            500,
            "Invalid data in data.json. Maximum two entries allowed in contextSensitive.",
        );
    }

    function computeRowSpan(
        maxRowSpan: number,
        currentRowSpan: number,
    ): number {
        if (maxRowSpan === 1) {
            return 1;
        } else if (currentRowSpan === 2) {
            return 1;
        } else {
            return 2;
        }
    }
</script>

<tbody class={rowClass}>
    <tr>
        {#if TableCols.Letter in enabledColumns}
            <td {rowspan} class="{letterCellClass} {cellClass}"
                ><div class={nonButtonClass}>{letter}</div></td
            >
        {/if}
        {#each letterDatas.entries() as [index, letterData]}
            {#if TableCols.IPA in enabledColumns}
                <td
                    title={letterData.contextSensitive[0].desc}
                    rowspan={computeRowSpan(rowspan, rowSpans[index])}
                    class="{ipaCellClass} {cellClass}"
                    ><button
                        class={buttonClass}
                        on:click={() =>
                            playIpa(letterData.contextSensitive[0].ipaAudio)}
                        >{letterData.contextSensitive[0].ipa ?? ""}</button
                    ></td
                >
            {/if}
            {#if TableCols.EnglishName in enabledColumns}
                <td
                    rowspan={rowSpans[index]}
                    class="{englishCellClass} {cellClass}"
                    ><div class={nonButtonClass}>
                        {nameData.english ?? ""}
                    </div></td
                >
            {/if}
            {#if TableCols.GreekName in enabledColumns}
                <td
                    rowspan={rowSpans[index]}
                    class="{greekCellClass} {cellClass}"
                >
                    {#if "greek" in nameData}
                        <button class={buttonClass}>{nameData.greek}</button>
                    {/if}
                </td>
            {/if}
            {#if TableCols.Example in enabledColumns}
                <td
                    rowspan={computeRowSpan(rowspan, rowSpans[index])}
                    class="{exampleCellClass} {cellClass}"
                    ><button
                        class={buttonClass}
                        on:click={() =>
                            playIpa(
                                letterData.contextSensitive[0].exampleAudio,
                            )}
                        >{letterData.contextSensitive[0].example ?? ""}</button
                    ></td
                >
            {/if}
        {/each}
    </tr>
    {#if rowspan == 2}
        <tr>
            {#each letterDatas.entries() as [index, letterData]}
                {#if rowSpans[index] == 2}
                    {#if TableCols.IPA in enabledColumns}
                        <td
                            title={letterData.contextSensitive[1].desc}
                            class="{ipaCellClass} {cellClass}"
                            on:click={() =>
                                playIpa(
                                    letterData.contextSensitive[1].ipaAudio,
                                )}
                        >
                            <button class={buttonClass}
                                >{letterData.contextSensitive[1].ipa ??
                                    ""}</button
                            >
                        </td>
                    {/if}
                    {#if TableCols.Example in enabledColumns}
                        <td
                            class="{exampleCellClass} {cellClass}"
                            on:click={() =>
                                playIpa(
                                    letterData.contextSensitive[1].exampleAudio,
                                )}
                        >
                            <button class={buttonClass}
                                >{letterData.contextSensitive[1].example ??
                                    ""}</button
                            >
                        </td>
                    {/if}
                {/if}
            {/each}
        </tr>
    {/if}
</tbody>
