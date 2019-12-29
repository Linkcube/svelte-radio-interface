<script>
    import ProgressBar from './progress_bar.svelte';
    import StreamStatus from './StreamStatus.svelte';
    import { primary, text_on_color } from './theme.js';
    import { api_object, misc_object } from './stores';

    function format_seconds(seconds) {
        var measuredTime = new Date(null);
        measuredTime.setSeconds(seconds);
        return measuredTime.toISOString().substr(11, 8);
    }

    let current_time = format_seconds(0);
    let current_stamp = 0;
    let end_time = format_seconds(0);
    let total_time = format_seconds(0);
    let total_stamp = 0;

    const unsub_api = api_object.subscribe((value) => {
        current_stamp = value.current_time - value.start_time;
        current_time = format_seconds(current_stamp);
        end_time = format_seconds(value.end_time - value.start_time);
        if ($misc_object.rec_start !== null) {
            total_stamp = value.current_time - $misc_object.rec_start;
            total_time = format_seconds(total_stamp);
        }
    });

    setInterval(() => {
        current_stamp += 1;
        current_time = format_seconds(current_stamp);
        if ($misc_object.rec_start !== null) {
            total_stamp += 1;
            total_time = format_seconds(total_stamp);
        }
    }, 1000);
</script>

<style>
    footer {
		flex-shrink: 0;
		background: var(--primary-color);
		display: flex;
        flex-direction: column;
        font-size: 30px;
        line-height: 100%;
    }
    
    p {
        color: var(--primary-color);
        margin: auto;
    }

    .text-row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .record-times {
        display: flex;
        flex-direction: column;
        font-size: 15px;
        text-align: center;
    }

    .song-name {
        width: 70%;
        margin: auto;
    }
</style>

<footer style="--primary-color:{$primary}">
    <ProgressBar></ProgressBar>
    <div class="text-row">
        <div class="song-name">
            <p style="--primary-color:{$text_on_color}">{$api_object.np}</p>
        </div>
        <div class="record-times">
            <p style="--primary-color:{$text_on_color}">
                {current_time} /  {end_time}
            </p>
            {#if $misc_object.rec_start !== null}
            <p style="--primary-color:{$text_on_color}">Recorded: {total_time}</p>
            {:else}
            <p style="--primary-color:{$text_on_color}">Not Recording</p>
            {/if}
        </div>
        <StreamStatus></StreamStatus>
    </div>
</footer>