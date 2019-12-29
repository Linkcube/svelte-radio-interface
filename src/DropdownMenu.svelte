<script>
    import { current_page } from './stores.js';
    import { hover_color, text_on_color, highlight } from './theme.js';

    let menu_open = false;
    let main_page = true;

    function openMenu() {
        menu_open = !menu_open;
    }

    function serverSettings() {

    }

    function pastRecordings() {
        current_page.set("recordings");
    }

    function mainPage() {
        current_page.set("main");
    }
</script>

<style>
    .material-icons {
        color: var(--primary-color);
        margin-top: 5px;
        margin-right: 15px;
        cursor: pointer;
        transition: 0.3s;
        border: none;
        background-color: rgba(0,0,0,0);
        padding: 0;
    }

    .material-icons:hover {
        box-shadow: 8px 8px  var(--shadow-color);
    }

    .dropdown-content {
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        
        z-index: 1;
        right: 30px;
        top: 30px;
    }

    span {
        padding: 10px;
        text-align: center;
    }

    span:hover {
        background-color: lightgray;
        transition-duration: 400ms;
        
    }
</style>

<button on:click={openMenu} class="material-icons" style="--primary-color:{$text_on_color}; --shadow-color:{$highlight}">
    { menu_open ? 'menu_open' : 'menu' }
</button>

{#if menu_open}
    <div class="dropdown-content">
        <span on:click={serverSettings} style="--hover-color:{$hover_color}">Change Server Settings</span>
        {#if $current_page == "main"}
            <span on:click={pastRecordings} style="--hover-color:{$hover_color}">Show Past Recordings</span>
        {:else}
            <span on:click={mainPage} style="--hover-color:{$hover_color}">Show Controls</span>
        {/if}
    </div>
{/if}