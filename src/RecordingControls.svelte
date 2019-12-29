<script>
    function forceStop() {
        fetch(`http://localhost:8080/stop`, {
            method: 'GET',
        });
    }

    function startRecording() {
        fetch(`http://localhost:8080/start`, {
            method: 'GET',
        });
    }

    function refreshRecording() {
        fetch(`http://localhost:8080/refresh`, {
            method: 'GET',
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
    }

    .material-icons:hover {
        box-shadow: 0px 8px  rgba(0,0,0,0.6);
        border-radius:100px;
    }
</style>

<h2>Recording Controls</h2>

<button class="material-icons" on:click={forceStop}>not_interested</button>
<button class="material-icons" on:click={startRecording}>play_arrow</button>
<button class="material-icons" on:click={refreshRecording}>refresh</button>