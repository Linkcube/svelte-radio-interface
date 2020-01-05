<script>
    import { send_stream_action } from './stores.js';
    
    function stream_action(action) {
        let promise = send_stream_action(action);
        promise.then(value => console.log(value));
    }
</script>

<style>
    .material-icons {
        font-size: 24px;
        color: grey;
        background-color: rgba(0,0,0,0);
        border: none;
        padding-left: 15px;
        padding-right: 15px;
        cursor: pointer;
        transition: 0.3s;
    }

    .material-icons:hover {
        box-shadow: 0px 8px  rgba(0,0,0,0.6);
        border-radius:100px;
    }
</style>

<h2>Recording Controls</h2>

<button class="material-icons" on:click={() => stream_action("stop")}>not_interested</button>
<button class="material-icons" on:click={() => stream_action("start")}>play_arrow</button>
<button class="material-icons" on:click={() => stream_action("refresh")}>refresh</button>