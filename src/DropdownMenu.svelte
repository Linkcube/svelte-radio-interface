<script>
    import ServerSettingsModal from './ServerSettingsModal.svelte';
    import { current_page, update_config, config_object } from './stores.js';
    import { hover_color, text_on_color, highlight } from './theme.js';
    import FancyInput from './FancyInput.svelte';

    let menu_open = false;
    let main_page = true;
    let open_modal = false;
    let config_promise;

    function openMenu() {
        menu_open = !menu_open;
    }

    function serverSettings() {
        config_promise = update_config();
        menu_open = false;
        open_modal = true;
    }

    function pastRecordings() {
        menu_open = false;
        current_page.set("recordings");
    }

    function mainPage() {
        menu_open = false;
        current_page.set("main");
    }

    const handle_keydown = e => {
        if (menu_open) {
            if (e.key === 'Escape') {
                menu_open = false;
            }
        }
    }
</script>

<svelte:window on:keydown={handle_keydown}/>

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
        box-shadow: 6px 6px  var(--shadow-color);
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

    .menu-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0);
	}

    .form-input {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .modal-title {
        font-size: 20px;
    }

    input {
        width: 250px;
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
    <div class="menu-background" on:click="{() => menu_open = false}"></div>
{/if}

{#if open_modal}
    <ServerSettingsModal on:close="{() => open_modal = false}">
        <div class="modal-title" slot="header">Change your server settings</div>
        {#await config_promise}
            loading
        {:then value}
            <div class="form-input">
                <FancyInput id="api_uri" label="API URI" value={value.data.config.api_uri}></FancyInput>
                <FancyInput id="server_uri" label="Server URI" value={value.data.config.server_uri}></FancyInput>
                <FancyInput id="stream_uri" label="Stream URI" value={value.data.config.stream_uri}></FancyInput>
                <FancyInput id="poll_interval" label="Poll Interval" value={value.data.config.poll_interval}></FancyInput>
                <FancyInput id="excluded_djs" label="Excluded DJs" value={value.data.config.excluded_djs}></FancyInput>
                <FancyInput id="export_folder" label="Export Folder" value={value.data.config.export_folder}></FancyInput>
            </div>
        {:catch error}
            {error.message}
        {/await}
    </ServerSettingsModal>
{/if}