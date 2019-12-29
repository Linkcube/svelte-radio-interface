<script>
    import { sub_text_color } from './theme.js';
    import { misc_object, api_object } from './stores';

    function format_seconds(seconds) {
        var measuredTime = new Date(null);
        measuredTime.setSeconds(seconds);
        return measuredTime.toISOString().substr(11, 5);
    }
</script>

<style>
    .column-display {
        display: flex;
        flex-direction: column;
        margin: auto;
        min-width: 300px;
    }
    .lp-time {
        color: var(--primary-color);
        padding-left: 10px;
    }

    .lp-list {
        padding-left: 20px;
    }

    p {
        font-size: 20px;
    }
</style>

<div class="column-display">
    <p>Last Played</p>
    <div class="lp-list">
        {#if $api_object !== null && $api_object.lp !== null}
            {#each $api_object.lp as {meta, time, type, timestamp}, i}
            <div class="lp-title">
                {i + 1}. {meta}
            </div>
            <div class="lp-time" style="--primary-color:{$sub_text_color}">
                {format_seconds($api_object.current_time - timestamp)} minutes ago
            </div>
            <br>
            {/each}
        {/if}
    </div>
</div>
