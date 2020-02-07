<script>
    export let storage;

    const color_index = {
        "error": "#f44336",
        "warning": "#ff9800",
        "info": "#2196f3",
        "success": "#4caf50"
    }

    const icon_index = {
        "error": "error_outline",
        "warning": "warning",
        "info": "error_outline",
        "success": "check_circle_outline"
    }

    let snackbar_color = "green";
    let snackbar_text = "test";
    let snackbar;
    let show_snackbar = false;
    let snackbar_icon = "warning";
    let snackbar_timeout = false;

    

    const unsub = storage.subscribe((value) => {
        if (value) {
            snackbar_color = color_index[value.severity];
            snackbar_icon = icon_index[value.severity];
            snackbar_text = value.msg;
            show_snackbar = true;
            snackbar_timeout = setTimeout(() => show_snackbar = false, 3000);
        } else if (snackbar_timeout) {
            clearTimeout(snackbar_timeout);
            show_snackbar = false;
        }
    });
    

</script>

<style>
    #snackbar {
        min-width: 250px;
        margin-left: -125px;
        background-color: var(--background-color);
        color: #fff;
        position: fixed;
        z-index: 1;
        left: 50%;
        bottom: 80px;
        opacity: 1;
        animation: fade-in 0.5s ease, fade-out .5s ease 2.5s;
        display: flex;
        justify-content: start;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
            bottom: 0;
        }
        100% {
            opacity: 1;
            bottom: 80px;
        }
    }

    @keyframes fade-out {
        0% {
            opacity: 1;
            bottom: 80px;
        }
        100% {
            opacity: 0;
            bottom: 0px;
        }
    }

    .material-icons {
        padding: 12px;
    }
</style>

{#if show_snackbar}
    <div class="" id="snackbar" bind:this={snackbar} style="--background-color:{snackbar_color}">
        <div class="material-icons">{snackbar_icon}</div>
        <p>{snackbar_text}</p>
    </div>
{/if}