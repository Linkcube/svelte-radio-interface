<script>
    import { update_past_recordings, past_recordings_object, query_full_recordings } from './stores.js';
    import { sub_text_color } from './theme.js';
    import RecordingCard from './RecordingCard.svelte';
    import ServerSettingsModal from './ServerSettingsModal.svelte';
    import RecordedSong from './RecordedSong.svelte';

    function open_recording(folder) {
        songs_promise = query_full_recordings(folder);
        show_recording_modal = true;
        modal_title = folder.split(' ')[1];
        modal_date = get_date(folder.split(' ')[0]);
        modal_folder = folder;
    }

    function get_date(seconds) {
        var date = new Date(null);
        date.setSeconds(seconds);
        return date.toString();
    }

    let show_recording_modal = false;
    let modal_title = "";
    let modal_date = "";
    let modal_folder = "";
    let songs_promise;
</script>

<style>
    .card-display {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: auto;
        justify-content: center;
    }

    .song-list {
        display: flex;
        flex-direction: column;
        max-height: 600px;
        overflow-y: auto;
    }

    .modal-title {
        font-size: 20px;
    }

    .full-date {
        color: var(--primary-color);
    }

    .columns {
        display: flex;
        flex-direction: column;
    }

    h1 {
        text-align: center;
    }
</style>

<div class="columns">
    <h1>Past Recordings</h1>

    <div class="card-display">
        {#await $past_recordings_object}
            <p>Fetching recordings</p>
        {:then value}
            {#each value.data.past_recordings.recordings as {folder, songs, cover}}
                <RecordingCard 
                    background_source={`http://localhost:4000/${cover}`}
                    folder={folder}
                    songs={songs}
                    on:open="{() => open_recording(folder)}"
                >
                </RecordingCard>
            {:else}
                <p>No recordings yet.</p>
            {/each}
        {:catch error}
        <p>Caught error: {error}</p>
        {/await}
    </div>
</div>

{#if show_recording_modal}
    <ServerSettingsModal on:close="{() => show_recording_modal = false}" use_submission={false}>
        {#await songs_promise}
            loading
        {:then value}
            <div slot="header">
                <div class="modal-title">
                    {modal_title}
                </div>
                <div class="full-date" style="--primary-color:{$sub_text_color}">
                    {modal_date}
                </div>
            </div>
            <div class="song-list">
                {#each value.data.full_recording.songs as song, index}
                    <RecordedSong src={`http://localhost:4000/${modal_folder}/${song.file}`} {song} {index}></RecordedSong>
                {:else}
                    <p>No songs found.</p>
                {/each}
            </div>
        {:catch error}
            {error.message}
        {/await}
    </ServerSettingsModal>
{/if}