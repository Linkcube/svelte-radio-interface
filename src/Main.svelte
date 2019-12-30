<script>
    import { primary, background, base_text_color, text_on_color } from './theme.js';
    import { misc_object, api_object } from './stores';
    import LastPlayed from './LastPlayed.svelte';
    import RecordingControls from './RecordingControls.svelte';
</script>

<style>
    main {
        flex-grow: 1;
        overflow-y: auto;
		background: var(--primary-color);
        display: flex;
        flex-direction: column;
        /* justify-content: flex-start; */
        height: 100%;
    }
    
    .dj-pic {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
    }

    .top {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .bottom {
        text-align: center;
    }

    img {
        max-width: 90%;
        margin-top: 5%;
    }
</style>


<main style="--primary-color:{$background}">
    <div class="top">
        <div class="dj-pic">
            <img src={$misc_object.dj_image_link} alt="dj_pic" class="dj-pic" />
        </div>
        <LastPlayed></LastPlayed>
    </div>
    <div class="bottom">
        <h1>Current DJ: {$api_object.dj_name}</h1>
        <RecordingControls></RecordingControls>
    </div>
</main>