<script>
    import DropdownMenu from './DropdownMenu.svelte';
    import { primary, background, base_text_color, text_on_color } from './theme.js';
    import { server_object, api_object } from './stores';
</script>

<style>
    header {
		flex-shrink: 0;
        background: var(--primary-color);
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-end;
        line-height: 40px;
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10+ and Edge */
        user-select: none; /* Standard syntax */
        -webkit-app-region: drag;
    }
    
    p {
        color: var(--primary-color);
        margin: auto;
        text-align: center;
        font-size: 20px;
    }

    .text-alignment {
        display: inline-flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }
</style>

<header style="--primary-color:{$primary}">
    <div class="text-alignment">
        <div>
            <p style="--primary-color:{$text_on_color}">
                {$server_object.server_name} - {$server_object.server_description}
            </p>
        </div>
        <div>
            <p style="--primary-color:{$text_on_color}">
                {$server_object.audio_format} | {$server_object.bitrate}kb/s | {$server_object.sample_rate}Hz
            </p>
        </div>
        <div>
            <p style="--primary-color:{$text_on_color}">
                Listeners: {$api_object.listeners}
            </p>
        </div>
    </div>
    <div>
        <DropdownMenu></DropdownMenu>
    </div>
</header>