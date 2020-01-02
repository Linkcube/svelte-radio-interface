<script>
    import { update_past_recordings, past_recordings_object } from './stores.js';

    function get_date(seconds) {
    var measuredTime = new Date(null);
    measuredTime.setSeconds(seconds);
    return measuredTime.toString();
}
</script>

<style>
    .sub-text {
        color: gray;
        max-width: 75%
    }
    .column-display {
        display: flex;
        flex-direction: column;
        margin: auto;
    }
    .recording-group {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .folder-title {
        min-width: 200px;
        width: 30%;
    }
    .song-list {
        max-height: 400px;
        overflow-y: scroll;
        min-width: 400px;
        width: 60%;
    }
</style>

<div class="column-display">
    <h1>Past Recordings</h1>
    {#await $past_recordings_object}
        <p>Fetching recordings</p>
    {:then value}
        {#each value.data.past_recordings.recordings as {folder, songs}}
            <div class="recording-group">
                <div class="folder-title">
                    <p>{folder}</p>
                    <p class="sub-text">{get_date(folder.split(' ')[0])}</p>
                </div>
                <div class="song-list">
                    {#each songs as title}
                        <p>{title}</p>
                    {:else}
                        <p>Empty recording.</p>
                    {/each}
                </div>
            </div>
        {:else}
            <p>No recordings yet.</p>
        {/each}
    {:catch error}
    <p>Caught error: {error}</p>
    {/await}
</div>
