<script>
    import { send_stream_action, snackbar_store } from './stores.js';

    const msg_success = {
        "start": "Started Recording",
        "stop": "Recording Stopped",
        "refresh": "Refreshed the Recording"
    };
    
    function stream_action(action) {
        let promise = send_stream_action(action);
        promise.then((value) => {
            if (value.data.streamAction) {
                return "success";
            }
            return "error";
        }).catch((err) => false).then((value) => {
            let severity;
            if (value) {
                severity = value;
            } else {
                severity = "warning";
            }
            let msg;
            if (severity === "success") {
                msg = msg_success[action];
            } else if (severity === "error") {
                msg = `Failed to ${action}.`;
            } else {
                msg = "Could not contact Nora";
            }
            snackbar_store.set({severity, msg});
        });
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
        border-radius:100px;
    }

    .material-icons:hover {
        box-shadow: 0px 8px  rgba(0,0,0,0.6);
    }

    .material-icons::-moz-focus-inner {
        border: 0;
    }

    .controls-container {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10+ and Edge */
        user-select: none; /* Standard syntax */
    }
</style>

<div class="controls-container">
    <h2>Recording Controls</h2>

    <button class="material-icons" on:click={() => stream_action("stop")}>not_interested</button>
    <button class="material-icons" on:click={() => stream_action("start")}>play_arrow</button>
    <button class="material-icons" on:click={() => stream_action("refresh")}>refresh</button>
</div>