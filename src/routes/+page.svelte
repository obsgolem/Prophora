<script>
    export let data;
</script>

<ul>
    {#each data.pronunciations as pro}
        <li><a href="/pronunciation/{pro.shortname}">{pro.name[0]}</a></li>
    {/each}
</ul>
