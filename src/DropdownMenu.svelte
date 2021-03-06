<script>
    import ServerSettingsModal from './ServerSettingsModal.svelte';
    import { current_page, query_config, change_config, update_past_recordings, snackbar_store, post_stream_action } from './stores.js';
    import { hover_color, text_on_color, highlight } from './theme.js';
    import FancyInput from './FancyInput.svelte';

    const using_electron = navigator.userAgent.indexOf('Electron') >= 0;

    let menu_open = false;
    let main_page = true;
    let open_modal = false;
    let config_data = {};
    let config_promise;
    let exit_modal = false;
    

    function openMenu() {
        menu_open = !menu_open;
    }

    function serverSettings() {
        config_promise = query_config().then((value) => {
            config_data = value.data.config;
            config_data.excluded_djs = JSON.stringify(config_data.excluded_djs);
        });
        menu_open = false;
        open_modal = true;
    }

    function pastRecordings() {
        menu_open = false;
        update_past_recordings();
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

    function submit() {
        snackbar_store.set(false);
        config_data.excluded_djs = JSON.parse(config_data.excluded_djs);
        change_config(config_data).then(result => {
            if (result.data.updateConfig === "Changed") {
                snackbar_store.set({
                    severity: "success",
                    msg: "Settings Changed"
                });
            } else {
                snackbar_store.set({
                    severity: "error",
                    msg: "Settings not Changed"
                });
            }
            console.log(result);
            update_past_recordings();
        }).then(() => post_stream_action());
    }
</script>

<svelte:window on:keydown={handle_keydown}/>

<style>
    .menu-container {
        -webkit-app-region: no-drag;
    }

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

    .material-icons:focus {
        background-color: rgba(0, 0, 0, 0);
    }

    .open-menu-icon {
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
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        text-align: left;
    }

    span:hover {
        background-color: var(--hover-color);
        transition-duration: 400ms;
        
    }

    .exit-page {
        color: red;
    }

    .exit-page:hover {
        background: rgb(253, 229, 232);
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

    .exit-title {
        font-size: 20px;
        text-align: center;
    }
</style>

<div class="menu-container">
    <button on:click={openMenu} class="{menu_open ? 'material-icons open-menu-icon' : 'material-icons'}" style="--primary-color:{$text_on_color}; --shadow-color:{$highlight}">
        { menu_open ? 'menu_open' : 'menu' }
    </button>

    {#if menu_open}
        <div class="dropdown-content">
            <span on:click={serverSettings} style="--hover-color:{$hover_color}">Change Server Settings</span>
            {#if $current_page == "main"}
                <span on:click={pastRecordings} style="--hover-color:{$hover_color}">Show Past Recordings</span>
            {:else}
                <span on:click={mainPage}>Show Controls</span>
            {/if}
            {#if using_electron}
                <span on:click={() => exit_modal = true} class="exit-page">Exit Program</span>
            {/if}
        </div>
        <div class="menu-background" on:click={() => menu_open = false}></div>
    {/if}

    {#if open_modal}
        <ServerSettingsModal on:close={() => open_modal = false} on:submission={submit}>
            <div class="modal-title" slot="header">Change your server settings</div>
            {#await config_promise}
                loading
            {:then value}
                <div class="form-input">
                    <FancyInput id="api_uri" label="API URI" bind:value={config_data.api_uri}></FancyInput>
                    <FancyInput id="server_uri" label="Server URI" bind:value={config_data.server_uri}></FancyInput>
                    <FancyInput id="stream_uri" label="Stream URI" bind:value={config_data.stream_uri}></FancyInput>
                    <FancyInput id="poll_interval" label="Poll Interval" bind:value={config_data.poll_interval}></FancyInput>
                    <FancyInput id="excluded_djs" label="Excluded DJs" hint_text="JSON array of strings" bind:value={config_data.excluded_djs}></FancyInput>
                    <FancyInput id="export_folder" label="Export Folder" hint_text="Leave empty for same directory as file" bind:value={config_data.export_folder}></FancyInput>
                </div>
            {:catch error}
                {error.message}
            {/await}
        </ServerSettingsModal>
    {/if}

    {#if exit_modal}
        <ServerSettingsModal on:close={() => exit_modal = false} on:submission={() => window.close()}>
            <div class="exit-title" slot="header">Exit the program?</div>
        </ServerSettingsModal>
    {/if}
</div>