<script>
    import { primary, background, base_text_color, sub_text_color } from './theme.js';
    import { createEventDispatcher } from 'svelte';
    export let background_source;
    export let folder;
    export let songs;

    
    let dj_name = folder.split(' ')[1];
    let date = folder.split(' ')[0]

    function get_date(seconds) {
        var date = new Date(null);
        date.setSeconds(seconds);
        return date.toString().split(' ').splice(0, 4).join(' ');
    }

    const dispatch = createEventDispatcher();
    const open_recording = () => dispatch('open');
</script>

<style>
    .card {
        height: 250px;
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10px;
        transition-duration: 500ms;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
        cursor: pointer;
        border: none;
        outline:none;
    }

    .card:hover {
        transition-duration: 500ms;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
    }

    .hover {
        height: 100%;
    }

    img {
        display: flex;
        max-width: 180px;
        max-height: 200px;
        transition-duration: 500ms;
        margin-left: auto;
        margin-right: auto;
        opacity: .9;
        outline: 1px solid transparent;
    }

    img:hover {
        opacity: 1;
        transition-duration: 500ms;
        outline: 1px solid transparent;
    }

    .dj_name {
        text-align: center;
        color: var(--primary-color);
        font-size: 20px;
    }

    .date {
        text-align: center;
        color: var(--primary-color);
    }

</style>

<button class="card" on:click={open_recording}>
    <div class="hover">
        <img src={background_source} alt="dj_pic">
    </div>
    <div class="footer">
        <div class="dj_name" style="--primary-color:{$base_text_color}">{dj_name} ({songs})</div>
        <div class="date" style="--primary-color:{$sub_text_color}">{get_date(date)}</div>
    </div>
</button>